#!/usr/bin/env python3
"""
Generate minimal DWG R2000 (AC1015) sample files for MorCad testing.

STATUS: Work-in-progress — the generated file is structurally correct
(valid version string, section locators, CRC) but libredwg returns
INVALIDDWG because it requires pre-defined infrastructure objects
(BLOCK_CONTROL, LAYER_CONTROL, model space, paper space, etc.) that
are not yet included.

For real DWG test files, use one of these alternatives:
  1. Run examples/scripts/get-sample-dwg.sh (requires internet access)
     to download from LibreDWG test suite.
  2. Create a DWG with AutoCAD, LibreCAD, or FreeCAD and save as R2000.
  3. Use any existing .dwg file — drag it into the vanilla demo file picker.

Usage:
    python3 gen-sample-dwg.py

Output:
    ../sample-files/simple.dwg  (currently not parseable by libredwg-web)

References:
  - OpenDesign Alliance DWG Specification (R2000)
  - https://github.com/LibreDWG/libredwg
"""

import struct
import os
import sys
import math

# ---------------------------------------------------------------------------
# CRC16 (DWG uses CRC16-ARC variant, polynomial 0xA001, variable seed)
# ---------------------------------------------------------------------------

_CRC_TABLE = None

def _build_crc_table():
    table = []
    for i in range(256):
        crc = i
        for _ in range(8):
            crc = (crc >> 1) ^ 0xA001 if crc & 1 else crc >> 1
        table.append(crc)
    return table

def dwg_crc16(data: bytes, seed: int = 0xC0C1) -> int:
    global _CRC_TABLE
    if _CRC_TABLE is None:
        _CRC_TABLE = _build_crc_table()
    crc = seed
    for b in data:
        crc = (crc >> 8) ^ _CRC_TABLE[(crc ^ b) & 0xFF]
    return crc & 0xFFFF


# ---------------------------------------------------------------------------
# Bit-level writer (DWG R2000 sections use bit-packed encoding)
# ---------------------------------------------------------------------------

class BitWriter:
    def __init__(self):
        self._buf = bytearray()
        self._cur = 0   # current byte being built
        self._pos = 0   # bits used in current byte (0-7)

    def _flush_byte(self):
        self._buf.append(self._cur)
        self._cur = 0
        self._pos = 0

    def write_bit(self, v: int):
        if v:
            self._cur |= (0x80 >> self._pos)
        self._pos += 1
        if self._pos == 8:
            self._flush_byte()

    def write_bits(self, value: int, count: int):
        for i in range(count - 1, -1, -1):
            self.write_bit((value >> i) & 1)

    # DWG compressed types --------------------------------------------------

    def B(self, v: bool):
        """1-bit boolean"""
        self.write_bit(1 if v else 0)

    def BS(self, v: int):
        """Bit Short: 00=full 16b, 01=8b, 10=0, 11=256"""
        v &= 0xFFFF
        if v == 0:
            self.write_bits(0b10, 2)
        elif v == 256:
            self.write_bits(0b11, 2)
        elif v < 256:
            self.write_bits(0b01, 2)
            self.write_bits(v, 8)
        else:
            self.write_bits(0b00, 2)
            # little-endian 16-bit in bit stream
            lo = v & 0xFF
            hi = (v >> 8) & 0xFF
            self.write_bits(lo, 8)
            self.write_bits(hi, 8)

    def BL(self, v: int):
        """Bit Long: 00=full 32b, 01=8b, 10=0"""
        v &= 0xFFFFFFFF
        if v == 0:
            self.write_bits(0b10, 2)
        elif v < 256:
            self.write_bits(0b01, 2)
            self.write_bits(v, 8)
        else:
            self.write_bits(0b00, 2)
            for shift in (0, 8, 16, 24):
                self.write_bits((v >> shift) & 0xFF, 8)

    def BD(self, v: float):
        """Bit Double: 00=full 64b, 01=1.0, 10=0.0"""
        if v == 0.0:
            self.write_bits(0b10, 2)
        elif v == 1.0:
            self.write_bits(0b01, 2)
        else:
            self.write_bits(0b00, 2)
            packed = struct.pack('<d', v)
            for b in packed:
                self.write_bits(b, 8)

    def _2BD(self, x: float, y: float):
        self.BD(x); self.BD(y)

    def _3BD(self, x: float, y: float, z: float):
        self.BD(x); self.BD(y); self.BD(z)

    def _2RD(self, x: float, y: float):
        """Two raw doubles (16 bytes, byte-aligned in bit stream)"""
        for b in struct.pack('<dd', x, y):
            self.write_bits(b, 8)

    def _3RD(self, x: float, y: float, z: float):
        for b in struct.pack('<ddd', x, y, z):
            self.write_bits(b, 8)

    def TV(self, s: str):
        """Text value"""
        enc = s.encode('ascii', errors='replace') if s else b''
        self.BS(len(enc))
        for b in enc:
            self.write_bits(b, 8)

    def RC(self, v: int):
        self.write_bits(v & 0xFF, 8)

    def RS(self, v: int):
        lo = v & 0xFF
        hi = (v >> 8) & 0xFF
        self.write_bits(lo, 8)
        self.write_bits(hi, 8)

    def RL(self, v: int):
        v &= 0xFFFFFFFF
        for shift in (0, 8, 16, 24):
            self.write_bits((v >> shift) & 0xFF, 8)

    def RD(self, v: float):
        for b in struct.pack('<d', v):
            self.write_bits(b, 8)

    def H(self, code: int, counter: int, value: int):
        """Handle reference: code (4 bits), counter (4 bits), value (variable bytes)"""
        # Determine number of bytes needed for value
        if value == 0:
            nbytes = 0
        elif value < 0x100:
            nbytes = 1
        elif value < 0x10000:
            nbytes = 2
        elif value < 0x1000000:
            nbytes = 3
        else:
            nbytes = 4
        self.write_bits(code, 4)
        self.write_bits(nbytes, 4)
        for i in range(nbytes - 1, -1, -1):
            self.write_bits((value >> (i * 8)) & 0xFF, 8)

    def CMC(self, index: int):
        """Color Management Color (just a BS for index)"""
        self.BS(index)

    def finalize(self) -> bytes:
        if self._pos > 0:
            self._flush_byte()
        return bytes(self._buf)


# ---------------------------------------------------------------------------
# DWG R2000 file builder
# ---------------------------------------------------------------------------

# Section sentinels (16 bytes each)
SENTINEL_HEADER_START = bytes([
    0xCF, 0x7B, 0x1F, 0x23, 0xFD, 0xDE, 0x38, 0xA9,
    0x5F, 0x7C, 0x68, 0xB8, 0x4E, 0x6D, 0x33, 0x5F,
])
SENTINEL_HEADER_END = bytes(b ^ 0xFF for b in SENTINEL_HEADER_START)

SENTINEL_CLASSES_START = bytes([
    0x8D, 0xA1, 0xC4, 0xB8, 0xC4, 0xA9, 0xF8, 0xC5,
    0xC0, 0xDC, 0xF4, 0x5F, 0xE7, 0xCF, 0xB6, 0x8A,
])
SENTINEL_CLASSES_END = bytes(b ^ 0xFF for b in SENTINEL_CLASSES_START)


def build_header_section(next_handle: int = 0x10) -> bytes:
    """
    Build the HEADER VARIABLES section (section 0) for a minimal empty drawing.

    All variables are set to their zero/default values.
    Handle references point to dummy handles (will be unresolved but shouldn't crash).
    """
    bw = BitWriter()

    # --- Unknown bits (R2000: 4 unknown bits) ---
    bw.B(False)   # bit 0 unknown
    bw.B(False)   # bit 1 unknown
    bw.B(False)   # bit 2 unknown
    bw.B(False)   # bit 3 unknown

    # --- Text strings (unknown TVs for R2000) ---
    bw.TV('')   # unknown TV 0
    bw.TV('')   # unknown TV 1
    bw.TV('')   # unknown TV 2
    bw.TV('')   # unknown TV 3

    # --- Unknown BLs ---
    bw.BL(0)   # unknown_8
    bw.BL(0)   # unknown_9

    # --- R2000 unknown BS ---
    bw.BS(0)   # unknown_10
    bw.BS(0)   # unknown_11

    # --- $HANDSEED (next handle seed) as Handle ---
    bw.H(0, 0, next_handle)

    # --- $CLAYER handle (current layer = layer "0", handle 2) ---
    bw.H(5, 0, 2)  # soft-pointer to layer

    # --- $TEXTSTYLE handle ---
    bw.H(5, 0, 3)

    # --- $CELTYPE handle (current linetype) ---
    bw.H(5, 0, 4)

    # --- $DIMSTYLE handle ---
    bw.H(5, 0, 5)

    # --- $CMLSTYLE handle ---
    bw.H(5, 0, 6)

    # --- $PSVPSCALE (paperspace viewport scale) ---
    bw.BD(0.0)

    # --- $INSBASE ---
    bw._3BD(0.0, 0.0, 0.0)

    # --- $EXTMIN, $EXTMAX ---
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)

    # --- $LIMMIN, $LIMMAX (2D points) ---
    bw._2RD(0.0, 0.0)
    bw._2RD(100.0, 100.0)

    # --- $ELEVATION ---
    bw.BD(0.0)

    # --- $UCSORG, $UCSXDIR, $UCSYDIR ---
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(1.0, 0.0, 0.0)
    bw._3BD(0.0, 1.0, 0.0)

    # --- $UCSNAME handle ---
    bw.H(5, 0, 0)

    # --- PUCS data (paper UCS) ---
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(1.0, 0.0, 0.0)
    bw._3BD(0.0, 1.0, 0.0)
    bw.H(5, 0, 0)   # PUCSNAME handle
    bw.BS(0)        # PUCSORTHOVIEW
    bw.H(5, 0, 0)   # PUCSORTHOREF handle
    bw._3BD(0.0, 0.0, 0.0)  # PUCSORGTOP etc.
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)

    # --- UCS ortho view ---
    bw.BS(0)
    bw.H(5, 0, 0)
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)
    bw._3BD(0.0, 0.0, 0.0)

    # --- DIMVARS (dimension variables) ---
    bw.BD(2.5)   # DIMSCALE
    bw.BD(0.18)  # DIMASZ
    bw.BD(0.0625) # DIMEXO
    bw.BD(0.38)  # DIMDLI
    bw.BD(0.28)  # DIMEXE
    bw.BD(0.0)   # DIMRND
    bw.BD(0.0)   # DIMDLE
    bw.BD(0.0)   # DIMTP
    bw.BD(0.0)   # DIMTM

    # --- R2000 DIMTFAC, DIMGAP, DIMALTRND ---
    bw.BD(1.0)   # DIMTFAC
    bw.BD(0.09)  # DIMGAP
    bw.BD(0.0)   # DIMALTRND

    bw.BD(0.0)   # DIMTXT (text height)
    bw.BD(0.0)   # DIMCEN
    bw.BD(0.0)   # DIMTSZ
    bw.BD(1.0)   # DIMALTF (alt units multiplier)
    bw.BD(25.4)  # DIMLFAC
    bw.BD(1.0)   # DIMTVP
    bw.BD(1.0)   # DIMTFAC
    bw.BD(0.09)  # DIMGAP

    bw.TV('')    # DIMPOST
    bw.TV('')    # DIMAPOST
    bw.TV('')    # DIMBLK
    bw.TV('')    # DIMBLK1
    bw.TV('')    # DIMBLK2

    bw.B(False)  # DIMTOL
    bw.B(False)  # DIMLIM
    bw.B(True)   # DIMTIH
    bw.B(True)   # DIMTOH
    bw.B(False)  # DIMSE1
    bw.B(False)  # DIMSE2
    bw.B(False)  # DIMALT
    bw.B(False)  # DIMALTD (was BS)
    bw.B(False)  # DIMTOFL
    bw.B(True)   # DIMSAH
    bw.B(False)  # DIMTIX
    bw.B(False)  # DIMSOXD

    bw.BS(2)     # DIMALTD
    bw.BS(2)     # DIMZIN
    bw.BS(0)     # DIMAZIN
    bw.BS(2)     # DIMALTTZ
    bw.BS(0)     # DIMTZ
    bw.BS(0)     # DIMAUNIT
    bw.BS(2)     # DIMFRAC
    bw.BS(2)     # DIMLUNIT
    bw.BS(44)    # DIMDSEP (decimal sep '.')
    bw.BS(0)     # DIMTMOVE
    bw.BS(1)     # DIMJUST
    bw.BS(1)     # DIMSD1
    bw.BS(1)     # DIMSD2
    bw.BS(0)     # DIMTOLJ
    bw.BS(2)     # DIMFIT
    bw.BS(0)     # DIMUPT
    bw.BS(2)     # DIMTZIN
    bw.BS(0)     # DIMALTZ
    bw.BS(2)     # DIMALTTD
    bw.BS(0)     # DIMTAD
    bw.BS(2)     # DIMUNIT
    bw.BS(2)     # DIMDEC
    bw.BS(2)     # DIMTDEC
    bw.BS(2)     # DIMALTU
    bw.BS(2)     # DIMALTTD (duplicate? keep safe)

    bw.CMC(0)    # DIMCLRD
    bw.CMC(0)    # DIMCLRE
    bw.CMC(0)    # DIMCLRT

    bw.H(5, 0, 0)  # DIMTXSTY handle
    bw.H(5, 0, 0)  # DIMLDRBLK handle
    bw.H(5, 0, 0)  # DIMBLK handle
    bw.H(5, 0, 0)  # DIMBLK1 handle
    bw.H(5, 0, 0)  # DIMBLK2 handle

    # --- $BLOCK_CONTROL_OBJECT handle ---
    bw.H(3, 0, 1)   # hard-owner pointer to block control

    # --- Remaining required handles / variables ---
    bw.H(3, 0, 0)   # LAYER_CONTROL
    bw.H(3, 0, 0)   # STYLE_CONTROL
    bw.H(3, 0, 0)   # LINETYPE_CONTROL
    bw.H(3, 0, 0)   # VIEW_CONTROL
    bw.H(3, 0, 0)   # UCS_CONTROL
    bw.H(3, 0, 0)   # VPORT_CONTROL
    bw.H(3, 0, 0)   # APPID_CONTROL
    bw.H(3, 0, 0)   # DIMSTYLE_CONTROL
    bw.H(3, 0, 0)   # VIEWPORT_ENTITY_HEADER_CONTROL

    bw.H(5, 0, 0)   # DICTIONARY (ACAD_GROUP)
    bw.H(5, 0, 0)   # DICTIONARY (ACAD_MLINE_STYLE)
    bw.H(5, 0, 0)   # NAMED_OBJECTS dictionary

    # --- Various settings ---
    bw.BS(0)     # TSTACKALIGN
    bw.BS(70)    # TSTACKSIZE
    bw.TV('')    # HYPERLINKBASE
    bw.TV('')    # STYLESHEET
    bw.H(5, 0, 0)  # LAYOUTS_DICT
    bw.H(5, 0, 0)  # PLOTSETTINGS_DICT
    bw.H(5, 0, 0)  # PLOTSTYLES_DICT

    bw.BL(0)     # FLAGS
    bw.BS(0)     # INSUNITS
    bw.BS(0)     # CEPSNTYPE
    # CEPSNID handle only if CEPSNTYPE == 3, skip
    bw.TV('')    # FINGERPRINTGUID
    bw.TV('')    # VERSIONGUID

    bw.RC(0)     # SORTENTS
    bw.RC(0)     # INDEXCTL
    bw.RC(0)     # HIDETEXT
    bw.RC(0)     # XCLIPFRAME
    bw.RC(0)     # DIMASSOC
    bw.RC(0)     # HALOGAP
    bw.BS(0)     # OBSCUREDCOLOR
    bw.BS(0)     # INTERSECTIONCOLOR
    bw.RC(0)     # OBSCUREDLTYPE
    bw.RC(0)     # INTERSECTIONDISPLAY
    bw.TV('')    # PROJECTNAME

    bw.H(5, 0, 0)  # PAPER_SPACE block header
    bw.H(5, 0, 0)  # MODEL_SPACE block header
    bw.H(5, 0, 0)  # BYLAYER linetype
    bw.H(5, 0, 0)  # BYBLOCK linetype
    bw.H(5, 0, 0)  # CONTINUOUS linetype

    bw.B(False)  # ADESK unknown
    bw.B(False)
    bw.B(False)
    bw.B(False)
    bw.B(False)
    bw.B(False)
    bw.B(False)
    bw.B(False)
    bw.B(False)
    bw.B(False)
    bw.B(False)

    bw.BL(0)     # another unknown BL
    bw.BS(0)     # another unknown BS

    return bw.finalize()


def wrap_section(sentinel_start: bytes, sentinel_end: bytes, data: bytes) -> bytes:
    """
    Wrap section data with sentinel + size + data + CRC + sentinel.
    """
    size = len(data)
    size_bytes = struct.pack('<I', size)
    crc_val = dwg_crc16(size_bytes + data)
    crc_bytes = struct.pack('<H', crc_val)
    return sentinel_start + size_bytes + data + crc_bytes + sentinel_end


def build_classes_section() -> bytes:
    """Empty classes section (no custom classes)."""
    bw = BitWriter()
    bw.BL(0)   # max class number (0 = no classes)
    bw.BL(0)   # proxy class count
    bw.B(True) # was proxy flag
    return wrap_section(SENTINEL_CLASSES_START, SENTINEL_CLASSES_END, bw.finalize())


def build_handles_section(object_offsets: dict) -> bytes:
    """
    Build the HANDLES (object map) section.
    object_offsets: {handle: file_offset}
    """
    entries = bytearray()
    last_handle = 0
    last_offset = 0
    for handle in sorted(object_offsets.keys()):
        offset = object_offsets[handle]
        dh = handle - last_handle
        do = offset - last_offset
        # Write as modular char (MC)
        entries += _write_mc(dh)
        entries += _write_mc(do)
        last_handle = handle
        last_offset = offset

    # Section consists of one or more "records"
    # Each record: size (2 bytes LE) + data + CRC16
    # Then a 0x0000 terminator record
    if entries:
        section_data = struct.pack('<H', len(entries) + 2) + bytes(entries)
        crc_val = dwg_crc16(section_data)
        section_data += struct.pack('<H', crc_val)
    else:
        section_data = b''
    # Terminator
    section_data += struct.pack('<H', 2)
    crc_val = dwg_crc16(struct.pack('<H', 2))
    section_data += struct.pack('<H', crc_val)
    return section_data


def _write_mc(value: int) -> bytes:
    """Write a modular char (variable length signed integer)."""
    # Convert to unsigned for encoding; handle sign
    is_neg = value < 0
    val = abs(value)
    result = bytearray()
    while True:
        b = val & 0x7F
        val >>= 7
        if val > 0:
            b |= 0x80
        result.append(b)
        if val == 0:
            break
    if is_neg and result:
        result[-1] |= 0x40  # sign bit in last byte
    return bytes(result)


def build_object_data(handle: int, obj_type: int, parent_handle: int,
                      bw_data: bytes) -> bytes:
    """
    Build a single DWG object/entity record.
    """
    bw = BitWriter()
    # MS (modular size) written first, then actual data
    # Object format: size, type, handle, EED data, object data
    bw.BS(obj_type)      # object type
    bw.H(4, 0, handle)   # object handle (code 4 = absolute)
    bw.BL(0)             # EED (extended entity data) size = 0
    # For entities: owner/paper space flags
    if obj_type < 500:   # entity types
        bw.B(False)      # not in paper space
        bw.H(5, 0, parent_handle)  # owner block handle
    return bw.finalize() + bw_data


def build_line_entity(handle: int, owner: int, layer_idx: int,
                      x1: float, y1: float, x2: float, y2: float) -> bytes:
    bw = BitWriter()
    bw.BT(0.0)   # thickness
    bw._3BD(x1, y1, 0.0)   # start point
    bw._3BD(x2, y2, 0.0)   # end point
    bw._3BD(0.0, 0.0, 1.0) # extrusion
    return build_object_data(handle, 19, owner, bw.finalize())


def build_circle_entity(handle: int, owner: int,
                        cx: float, cy: float, r: float) -> bytes:
    bw = BitWriter()
    bw.BT(0.0)              # thickness
    bw._3BD(cx, cy, 0.0)    # center
    bw.BD(r)                # radius
    bw._3BD(0.0, 0.0, 1.0)  # extrusion
    return build_object_data(handle, 18, owner, bw.finalize())


# Patch BitWriter to support BT (bit thickness = BD in non-bit-thickness mode)
BitWriter.BT = lambda self, v: self.BD(v)


def build_dwg_file(entities_data: list) -> bytes:
    """
    Assemble a minimal DWG R2000 file.

    entities_data: list of (handle, raw_bytes) tuples
    """
    # Section sizes we'll fill in
    # Section indices: 0=HEADER, 1=CLASSES, 2=HANDLES(map), 3=unknown, 4=template, 5=AUX_HEADER
    # R2000 minimal: sections 0 and 1 mandatory, section 2 = handles

    # --- Build section data ---
    header_data = build_header_section(next_handle=0x20)
    header_section = wrap_section(SENTINEL_HEADER_START, SENTINEL_HEADER_END, header_data)
    classes_section = build_classes_section()

    # --- Calculate entity data and positions ---
    # File layout:
    # [preamble + section locators + CRC]  = header_end
    # [header_section]
    # [classes_section]
    # [entity data records ...]
    # [handles_section]

    NUM_SECTIONS = 4   # 0=header, 1=classes, 2=handles, 3=2ndheader(minimal)
    # Preamble layout: 26 bytes fixed header + NUM_SECTIONS*9 locators + 2 CRC
    # Fixed: "AC1015"(6) + unknown(7) + image_seeker(4) + 2unknown + codepage(2) + 1unknown + num_sections(4) = 26
    preamble_size = 26 + (NUM_SECTIONS * 9) + 2

    header_offset = preamble_size
    classes_offset = header_offset + len(header_section)
    entities_start = classes_offset + len(classes_section)

    entity_offsets = {}  # handle -> file offset
    entity_blobs = []
    cur_offset = entities_start
    for handle, blob in entities_data:
        entity_offsets[handle] = cur_offset
        entity_blobs.append(blob)
        cur_offset += 2 + len(blob) + 2  # 2-byte size + data + 2-byte CRC

    handles_offset = cur_offset
    handles_section = build_handles_section(entity_offsets)

    # --- Build preamble ---
    preamble = bytearray()
    preamble += b'AC1015'          # version (6 bytes)
    preamble += bytes(7)           # unknown (7 bytes)
    preamble += struct.pack('<I', 0)  # image seeker = 0 (no image)
    preamble += bytes([0x18, 0x00]) # unknown 2 bytes
    preamble += struct.pack('<H', 30) # codepage 30 = ANSI 1252
    preamble += bytes([0x00])      # unknown
    preamble += struct.pack('<I', NUM_SECTIONS)  # number of sections

    # Section locators (9 bytes each): [record_num(1), seeker(4), size(4)]
    header_size   = len(header_section)
    classes_size  = len(classes_section)
    handles_size  = len(handles_section)

    # Section 0: Header variables
    preamble += bytes([0])
    preamble += struct.pack('<I', header_offset)
    preamble += struct.pack('<I', header_size)

    # Section 1: Classes
    preamble += bytes([1])
    preamble += struct.pack('<I', classes_offset)
    preamble += struct.pack('<I', classes_size)

    # Section 2: Handles/object map
    preamble += bytes([2])
    preamble += struct.pack('<I', handles_offset)
    preamble += struct.pack('<I', handles_size)

    # Section 3: Second file header (minimal, point to 0)
    preamble += bytes([3])
    preamble += struct.pack('<I', 0)
    preamble += struct.pack('<I', 0)

    # CRC of preamble
    crc = dwg_crc16(bytes(preamble))
    preamble += struct.pack('<H', crc)

    # --- Assemble entity records ---
    entity_section = bytearray()
    for blob in entity_blobs:
        size = len(blob)
        entity_section += struct.pack('<H', size + 2)  # size includes itself?
        entity_section += blob
        crc = dwg_crc16(bytes(entity_section[-size-2:]))
        entity_section += struct.pack('<H', crc)

    # --- Final assembly ---
    result = bytes(preamble) + header_section + classes_section + bytes(entity_section) + handles_section
    return result


# ---------------------------------------------------------------------------
# Generate sample files
# ---------------------------------------------------------------------------

def generate_simple_dwg() -> bytes:
    """
    Simple mechanical part with a rectangle outline and two circles.
    Dimensions: 100×80mm rectangle, circles at (20,20,r=8) and (80,60,r=8)
    """
    entities = []

    # Rectangle (4 LINE entities), handles 0x10-0x13
    lines = [
        (0x10, 0.0,  0.0,  100.0, 0.0),
        (0x11, 100.0, 0.0,  100.0, 80.0),
        (0x12, 100.0, 80.0, 0.0,  80.0),
        (0x13, 0.0,  80.0, 0.0,   0.0),
    ]
    for h, x1, y1, x2, y2 in lines:
        entities.append((h, build_line_entity(h, 0xFF, 0, x1, y1, x2, y2)))

    # Circles, handles 0x14-0x15
    circles = [
        (0x14, 20.0, 20.0, 8.0),
        (0x15, 80.0, 60.0, 8.0),
    ]
    for h, cx, cy, r in circles:
        entities.append((h, build_circle_entity(h, 0xFF, cx, cy, r)))

    return build_dwg_file(entities)


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def main():
    out_dir = os.path.join(os.path.dirname(__file__), '..', 'sample-files')
    os.makedirs(out_dir, exist_ok=True)

    out_path = os.path.join(out_dir, 'simple.dwg')
    data = generate_simple_dwg()
    with open(out_path, 'wb') as f:
        f.write(data)
    print(f'Written {len(data)} bytes -> {os.path.abspath(out_path)}')
    print()
    print('NOTE: This is a minimal DWG R2000 file generated by MorCad for testing.')
    print('      If libredwg fails to parse it, obtain a real DWG file from:')
    print('      https://github.com/LibreDWG/libredwg/tree/master/test/test-data')
    print()
    print('To test:')
    print('  1. Run the vanilla demo: pnpm dev:demo')
    print('  2. Use the file picker to upload simple.dwg')
    print('     OR place it in examples/sample-files/ and enable the sample option')


if __name__ == '__main__':
    main()
