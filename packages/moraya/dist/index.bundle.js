import { invoke as hc } from "@tauri-apps/api/core";
class uc {
  constructor(e) {
    this._pointer = 0, this._eof = !1, this._data = e;
  }
  /**
   * Gets the next group (code, value) from the array. A group is two consecutive elements
   * in the array. The first is the code, the second is the value.
   * @returns {{code: Number}|*}
   */
  next() {
    if (!this.hasNext())
      throw this._eof ? new Error("Cannot call 'next' after EOF group has been read") : new Error("Unexpected end of input: EOF group not read before end of file. Ended on code " + this._data[this._pointer]);
    const e = {
      code: parseInt(this._data[this._pointer])
    };
    return this._pointer++, e.value = Za(e.code, this._data[this._pointer].trim()), this._pointer++, e.code === 0 && e.value === "EOF" && (this._eof = !0), this.lastReadGroup = e, e;
  }
  peek() {
    if (!this.hasNext())
      throw this._eof ? new Error("Cannot call 'next' after EOF group has been read") : new Error("Unexpected end of input: EOF group not read before end of file. Ended on code " + this._data[this._pointer]);
    const e = {
      code: parseInt(this._data[this._pointer])
    };
    return e.value = Za(e.code, this._data[this._pointer + 1].trim()), e;
  }
  rewind(e = 1) {
    this._pointer = this._pointer - e * 2;
  }
  /**
   * Returns true if there is another code/value pair (2 elements in the array).
   * @returns {boolean}
   */
  hasNext() {
    return !(this._eof || this._pointer > this._data.length - 2);
  }
  /**
   * Returns true if the scanner is at the end of the array
   * @returns {boolean}
   */
  isEOF() {
    return this._eof;
  }
}
function Za(i, e) {
  return i <= 9 ? e : i >= 10 && i <= 59 ? parseFloat(e) : i >= 60 && i <= 99 ? parseInt(e) : i >= 100 && i <= 109 ? e : i >= 110 && i <= 149 ? parseFloat(e) : i >= 160 && i <= 179 ? parseInt(e) : i >= 210 && i <= 239 ? parseFloat(e) : i >= 270 && i <= 289 ? parseInt(e) : i >= 290 && i <= 299 ? fc(e) : i >= 300 && i <= 369 ? e : i >= 370 && i <= 389 ? parseInt(e) : i >= 390 && i <= 399 ? e : i >= 400 && i <= 409 ? parseInt(e) : i >= 410 && i <= 419 ? e : i >= 420 && i <= 429 ? parseInt(e) : i >= 430 && i <= 439 ? e : i >= 440 && i <= 459 ? parseInt(e) : i >= 460 && i <= 469 ? parseFloat(e) : i >= 470 && i <= 481 || i === 999 || i >= 1e3 && i <= 1009 ? e : i >= 1010 && i <= 1059 ? parseFloat(e) : i >= 1060 && i <= 1071 ? parseInt(e) : (console.log("WARNING: Group code does not have a defined type: %j", { code: i, value: e }), e);
}
function fc(i) {
  if (i === "0")
    return !1;
  if (i === "1")
    return !0;
  throw TypeError("String '" + i + "' cannot be cast to Boolean type");
}
const dl = [
  0,
  16711680,
  16776960,
  65280,
  65535,
  255,
  16711935,
  16777215,
  8421504,
  12632256,
  16711680,
  16744319,
  13369344,
  13395558,
  10027008,
  10046540,
  8323072,
  8339263,
  4980736,
  4990502,
  16727808,
  16752511,
  13382400,
  13401958,
  10036736,
  10051404,
  8331008,
  8343359,
  4985600,
  4992806,
  16744192,
  16760703,
  13395456,
  13408614,
  10046464,
  10056268,
  8339200,
  8347455,
  4990464,
  4995366,
  16760576,
  16768895,
  13408512,
  13415014,
  10056192,
  10061132,
  8347392,
  8351551,
  4995328,
  4997670,
  16776960,
  16777087,
  13421568,
  13421670,
  10000384,
  10000460,
  8355584,
  8355647,
  5000192,
  5000230,
  12582656,
  14679935,
  10079232,
  11717734,
  7510016,
  8755276,
  6258432,
  7307071,
  3755008,
  4344870,
  8388352,
  12582783,
  6736896,
  10079334,
  5019648,
  7510092,
  4161280,
  6258495,
  2509824,
  3755046,
  4194048,
  10485631,
  3394560,
  8375398,
  2529280,
  6264908,
  2064128,
  5209919,
  1264640,
  3099686,
  65280,
  8388479,
  52224,
  6736998,
  38912,
  5019724,
  32512,
  4161343,
  19456,
  2509862,
  65343,
  8388511,
  52275,
  6737023,
  38950,
  5019743,
  32543,
  4161359,
  19475,
  2509871,
  65407,
  8388543,
  52326,
  6737049,
  38988,
  5019762,
  32575,
  4161375,
  19494,
  2509881,
  65471,
  8388575,
  52377,
  6737074,
  39026,
  5019781,
  32607,
  4161391,
  19513,
  2509890,
  65535,
  8388607,
  52428,
  6737100,
  39064,
  5019800,
  32639,
  4161407,
  19532,
  2509900,
  49151,
  8380415,
  39372,
  6730444,
  29336,
  5014936,
  24447,
  4157311,
  14668,
  2507340,
  32767,
  8372223,
  26316,
  6724044,
  19608,
  5010072,
  16255,
  4153215,
  9804,
  2505036,
  16383,
  8364031,
  13260,
  6717388,
  9880,
  5005208,
  8063,
  4149119,
  4940,
  2502476,
  255,
  8355839,
  204,
  6710988,
  152,
  5000344,
  127,
  4145023,
  76,
  2500172,
  4129023,
  10452991,
  3342540,
  8349388,
  2490520,
  6245528,
  2031743,
  5193599,
  1245260,
  3089996,
  8323327,
  12550143,
  6684876,
  10053324,
  4980888,
  7490712,
  4128895,
  6242175,
  2490444,
  3745356,
  12517631,
  14647295,
  10027212,
  11691724,
  7471256,
  8735896,
  6226047,
  7290751,
  3735628,
  4335180,
  16711935,
  16744447,
  13369548,
  13395660,
  9961624,
  9981080,
  8323199,
  8339327,
  4980812,
  4990540,
  16711871,
  16744415,
  13369497,
  13395634,
  9961586,
  9981061,
  8323167,
  8339311,
  4980793,
  4990530,
  16711807,
  16744383,
  13369446,
  13395609,
  9961548,
  9981042,
  8323135,
  8339295,
  4980774,
  4990521,
  16711743,
  16744351,
  13369395,
  13395583,
  9961510,
  9981023,
  8323103,
  8339279,
  4980755,
  4990511,
  3355443,
  5987163,
  8684676,
  11382189,
  14079702,
  16777215
];
function dc(i) {
  return dl[i];
}
function Oe(i) {
  const e = {};
  i.rewind();
  let t = i.next(), n = t.code;
  if (e.x = t.value, n += 10, t = i.next(), t.code != n)
    throw new Error("Expected code for point value to be " + n + " but got " + t.code + ".");
  return e.y = t.value, n += 10, t = i.next(), t.code != n ? (i.rewind(), e) : (e.z = t.value, e);
}
function gt(i, e, t) {
  switch (e.code) {
    case 0:
      i.type = e.value;
      break;
    case 5:
      i.handle = e.value;
      break;
    case 6:
      i.lineType = e.value;
      break;
    case 8:
      i.layer = e.value;
      break;
    case 48:
      i.lineTypeScale = e.value;
      break;
    case 60:
      i.visible = e.value === 0;
      break;
    case 62:
      i.colorIndex = e.value, i.color = dc(Math.abs(e.value));
      break;
    case 67:
      i.inPaperSpace = e.value !== 0;
      break;
    case 100:
      break;
    case 101:
      for (; e.code != 0; )
        e = t.next();
      t.rewind();
      break;
    case 330:
      i.ownerHandle = e.value;
      break;
    case 347:
      i.materialObjectHandle = e.value;
      break;
    case 370:
      i.lineweight = e.value;
      break;
    case 420:
      i.color = e.value;
      break;
    case 1e3:
      i.extendedData = i.extendedData || {}, i.extendedData.customStrings = i.extendedData.customStrings || [], i.extendedData.customStrings.push(e.value);
      break;
    case 1001:
      i.extendedData = i.extendedData || {}, i.extendedData.applicationName = e.value;
      break;
    default:
      return !1;
  }
  return !0;
}
class pc {
  constructor() {
    this.ForEntityName = "3DFACE";
  }
  parseEntity(e, t) {
    const n = { type: t.value, vertices: [] };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 70:
          n.shape = (t.value & 1) === 1, n.hasContinuousLinetypePattern = (t.value & 128) === 128;
          break;
        case 10:
          n.vertices = mc(e, t), t = e.lastReadGroup;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function mc(i, e) {
  var t = [], n = !1, r = !1, s = 4;
  for (let a = 0; a <= s; a++) {
    for (var o = {}; !i.isEOF() && !(e.code === 0 || r); ) {
      switch (e.code) {
        case 10:
        // X0
        case 11:
        // X1
        case 12:
        // X2
        case 13:
          if (n) {
            r = !0;
            continue;
          }
          o.x = e.value, n = !0;
          break;
        case 20:
        // Y
        case 21:
        case 22:
        case 23:
          o.y = e.value;
          break;
        case 30:
        // Z
        case 31:
        case 32:
        case 33:
          o.z = e.value;
          break;
        default:
          return t;
      }
      e = i.next();
    }
    t.push(o), n = !1, r = !1;
  }
  return i.rewind(), t;
}
class gc {
  constructor() {
    this.ForEntityName = "ARC";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.center = Oe(e);
          break;
        case 40:
          n.radius = t.value;
          break;
        case 50:
          n.startAngle = Math.PI / 180 * t.value;
          break;
        case 51:
          n.endAngle = Math.PI / 180 * t.value, n.angleLength = n.endAngle - n.startAngle;
          break;
        case 210:
          n.extrusionDirectionX = t.value;
          break;
        case 220:
          n.extrusionDirectionY = t.value;
          break;
        case 230:
          n.extrusionDirectionZ = t.value;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class _c {
  constructor() {
    this.ForEntityName = "ATTDEF";
  }
  parseEntity(e, t) {
    var n = {
      type: t.value,
      scale: 1,
      textStyle: "STANDARD"
    };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 1:
          n.text = t.value;
          break;
        case 2:
          n.tag = t.value;
          break;
        case 3:
          n.prompt = t.value;
          break;
        case 7:
          n.textStyle = t.value;
          break;
        case 10:
          n.startPoint = Oe(e);
          break;
        case 11:
          n.endPoint = Oe(e);
          break;
        case 39:
          n.thickness = t.value;
          break;
        case 40:
          n.textHeight = t.value;
          break;
        case 41:
          n.scale = t.value;
          break;
        case 50:
          n.rotation = t.value;
          break;
        case 51:
          n.obliqueAngle = t.value;
          break;
        case 70:
          n.invisible = !!(t.value & 1), n.constant = !!(t.value & 2), n.verificationRequired = !!(t.value & 4), n.preset = !!(t.value & 8);
          break;
        case 71:
          n.backwards = !!(t.value & 2), n.mirrored = !!(t.value & 4);
          break;
        case 72:
          n.horizontalJustification = t.value;
          break;
        case 73:
          n.fieldLength = t.value;
          break;
        case 74:
          n.verticalJustification = t.value;
          break;
        case 100:
          break;
        case 210:
          n.extrusionDirectionX = t.value;
          break;
        case 220:
          n.extrusionDirectionY = t.value;
          break;
        case 230:
          n.extrusionDirectionZ = t.value;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class vc {
  constructor() {
    this.ForEntityName = "CIRCLE";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.center = Oe(e);
          break;
        case 40:
          n.radius = t.value;
          break;
        case 50:
          n.startAngle = Math.PI / 180 * t.value;
          break;
        case 51:
          const r = Math.PI / 180 * t.value;
          r < n.startAngle ? n.angleLength = r + 2 * Math.PI - n.startAngle : n.angleLength = r - n.startAngle, n.endAngle = r;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class xc {
  constructor() {
    this.ForEntityName = "DIMENSION";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 2:
          n.block = t.value;
          break;
        case 10:
          n.anchorPoint = Oe(e);
          break;
        case 11:
          n.middleOfText = Oe(e);
          break;
        case 12:
          n.insertionPoint = Oe(e);
          break;
        case 13:
          n.linearOrAngularPoint1 = Oe(e);
          break;
        case 14:
          n.linearOrAngularPoint2 = Oe(e);
          break;
        case 15:
          n.diameterOrRadiusPoint = Oe(e);
          break;
        case 16:
          n.arcPoint = Oe(e);
          break;
        case 70:
          n.dimensionType = t.value;
          break;
        case 71:
          n.attachmentPoint = t.value;
          break;
        case 42:
          n.actualMeasurement = t.value;
          break;
        case 1:
          n.text = t.value;
          break;
        case 50:
          n.angle = t.value;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class yc {
  constructor() {
    this.ForEntityName = "ELLIPSE";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.center = Oe(e);
          break;
        case 11:
          n.majorAxisEndPoint = Oe(e);
          break;
        case 40:
          n.axisRatio = t.value;
          break;
        case 41:
          n.startAngle = t.value;
          break;
        case 42:
          n.endAngle = t.value;
          break;
        case 2:
          n.name = t.value;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Mc {
  constructor() {
    this.ForEntityName = "INSERT";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 2:
          n.name = t.value;
          break;
        case 41:
          n.xScale = t.value;
          break;
        case 42:
          n.yScale = t.value;
          break;
        case 43:
          n.zScale = t.value;
          break;
        case 10:
          n.position = Oe(e);
          break;
        case 50:
          n.rotation = t.value;
          break;
        case 70:
          n.columnCount = t.value;
          break;
        case 71:
          n.rowCount = t.value;
          break;
        case 44:
          n.columnSpacing = t.value;
          break;
        case 45:
          n.rowSpacing = t.value;
          break;
        case 210:
          n.extrusionDirection = Oe(e);
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
let Sc = class {
  constructor() {
    this.ForEntityName = "LINE";
  }
  parseEntity(e, t) {
    const n = { type: t.value, vertices: [] };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.vertices.unshift(Oe(e));
          break;
        case 11:
          n.vertices.push(Oe(e));
          break;
        case 210:
          n.extrusionDirection = Oe(e);
          break;
        case 100:
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
};
class Ec {
  constructor() {
    this.ForEntityName = "LWPOLYLINE";
  }
  parseEntity(e, t) {
    const n = { type: t.value, vertices: [] };
    let r = 0;
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 38:
          n.elevation = t.value;
          break;
        case 39:
          n.depth = t.value;
          break;
        case 70:
          n.shape = (t.value & 1) === 1, n.hasContinuousLinetypePattern = (t.value & 128) === 128;
          break;
        case 90:
          r = t.value;
          break;
        case 10:
          n.vertices = bc(r, e);
          break;
        case 43:
          t.value !== 0 && (n.width = t.value);
          break;
        case 210:
          n.extrusionDirectionX = t.value;
          break;
        case 220:
          n.extrusionDirectionY = t.value;
          break;
        case 230:
          n.extrusionDirectionZ = t.value;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function bc(i, e) {
  if (!i || i <= 0)
    throw Error("n must be greater than 0 verticies");
  const t = [];
  let n = !1, r = !1, s = e.lastReadGroup;
  for (let o = 0; o < i; o++) {
    const a = {};
    for (; !e.isEOF() && !(s.code === 0 || r); ) {
      switch (s.code) {
        case 10:
          if (n) {
            r = !0;
            continue;
          }
          a.x = s.value, n = !0;
          break;
        case 20:
          a.y = s.value;
          break;
        case 30:
          a.z = s.value;
          break;
        case 40:
          a.startWidth = s.value;
          break;
        case 41:
          a.endWidth = s.value;
          break;
        case 42:
          s.value != 0 && (a.bulge = s.value);
          break;
        default:
          return e.rewind(), n && t.push(a), e.rewind(), t;
      }
      s = e.next();
    }
    t.push(a), n = !1, r = !1;
  }
  return e.rewind(), t;
}
class Tc {
  constructor() {
    this.ForEntityName = "MTEXT";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 3:
          n.text ? n.text += t.value : n.text = t.value;
          break;
        case 1:
          n.text ? n.text += t.value : n.text = t.value;
          break;
        case 10:
          n.position = Oe(e);
          break;
        case 11:
          n.directionVector = Oe(e);
          break;
        case 40:
          n.height = t.value;
          break;
        case 41:
          n.width = t.value;
          break;
        case 50:
          n.rotation = t.value;
          break;
        case 71:
          n.attachmentPoint = t.value;
          break;
        case 72:
          n.drawingDirection = t.value;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Ac {
  constructor() {
    this.ForEntityName = "POINT";
  }
  parseEntity(e, t) {
    const r = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          r.position = Oe(e);
          break;
        case 39:
          r.thickness = t.value;
          break;
        case 210:
          r.extrusionDirection = Oe(e);
          break;
        case 100:
          break;
        default:
          gt(r, t, e);
          break;
      }
      t = e.next();
    }
    return r;
  }
}
class wc {
  constructor() {
    this.ForEntityName = "VERTEX";
  }
  parseEntity(e, t) {
    var n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.x = t.value;
          break;
        case 20:
          n.y = t.value;
          break;
        case 30:
          n.z = t.value;
          break;
        case 40:
          break;
        case 41:
          break;
        case 42:
          t.value != 0 && (n.bulge = t.value);
          break;
        case 70:
          n.curveFittingVertex = (t.value & 1) !== 0, n.curveFitTangent = (t.value & 2) !== 0, n.splineVertex = (t.value & 8) !== 0, n.splineControlPoint = (t.value & 16) !== 0, n.threeDPolylineVertex = (t.value & 32) !== 0, n.threeDPolylineMesh = (t.value & 64) !== 0, n.polyfaceMeshVertex = (t.value & 128) !== 0;
          break;
        case 50:
          break;
        case 71:
          n.faceA = t.value;
          break;
        case 72:
          n.faceB = t.value;
          break;
        case 73:
          n.faceC = t.value;
          break;
        case 74:
          n.faceD = t.value;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Rc {
  constructor() {
    this.ForEntityName = "POLYLINE";
  }
  parseEntity(e, t) {
    var n = { type: t.value, vertices: [] };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          break;
        case 20:
          break;
        case 30:
          break;
        case 39:
          n.thickness = t.value;
          break;
        case 40:
          break;
        case 41:
          break;
        case 70:
          n.shape = (t.value & 1) !== 0, n.includesCurveFitVertices = (t.value & 2) !== 0, n.includesSplineFitVertices = (t.value & 4) !== 0, n.is3dPolyline = (t.value & 8) !== 0, n.is3dPolygonMesh = (t.value & 16) !== 0, n.is3dPolygonMeshClosed = (t.value & 32) !== 0, n.isPolyfaceMesh = (t.value & 64) !== 0, n.hasContinuousLinetypePattern = (t.value & 128) !== 0;
          break;
        case 71:
          break;
        case 72:
          break;
        case 73:
          break;
        case 74:
          break;
        case 75:
          break;
        case 210:
          n.extrusionDirection = Oe(e);
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n.vertices = Cc(e, t), n;
  }
}
function Cc(i, e) {
  const t = new wc(), n = [];
  for (; !i.isEOF(); )
    if (e.code === 0) {
      if (e.value === "VERTEX")
        n.push(t.parseEntity(i, e)), e = i.lastReadGroup;
      else if (e.value === "SEQEND") {
        Pc(i, e);
        break;
      }
    }
  return n;
}
function Pc(i, e) {
  const t = { type: e.value };
  for (e = i.next(); !i.isEOF() && e.code != 0; )
    gt(t, e, i), e = i.next();
  return t;
}
class Lc {
  constructor() {
    this.ForEntityName = "SOLID";
  }
  parseEntity(e, t) {
    const n = { type: t.value, points: [] };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.points[0] = Oe(e);
          break;
        case 11:
          n.points[1] = Oe(e);
          break;
        case 12:
          n.points[2] = Oe(e);
          break;
        case 13:
          n.points[3] = Oe(e);
          break;
        case 210:
          n.extrusionDirection = Oe(e);
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Dc {
  constructor() {
    this.ForEntityName = "SPLINE";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.controlPoints || (n.controlPoints = []), n.controlPoints.push(Oe(e));
          break;
        case 11:
          n.fitPoints || (n.fitPoints = []), n.fitPoints.push(Oe(e));
          break;
        case 12:
          n.startTangent = Oe(e);
          break;
        case 13:
          n.endTangent = Oe(e);
          break;
        case 40:
          n.knotValues || (n.knotValues = []), n.knotValues.push(t.value);
          break;
        case 70:
          (t.value & 1) != 0 && (n.closed = !0), (t.value & 2) != 0 && (n.periodic = !0), (t.value & 4) != 0 && (n.rational = !0), (t.value & 8) != 0 && (n.planar = !0), (t.value & 16) != 0 && (n.planar = !0, n.linear = !0);
          break;
        case 71:
          n.degreeOfSplineCurve = t.value;
          break;
        case 72:
          n.numberOfKnots = t.value;
          break;
        case 73:
          n.numberOfControlPoints = t.value;
          break;
        case 74:
          n.numberOfFitPoints = t.value;
          break;
        case 210:
          n.normalVector = Oe(e);
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Ic {
  constructor() {
    this.ForEntityName = "TEXT";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.startPoint = Oe(e);
          break;
        case 11:
          n.endPoint = Oe(e);
          break;
        case 40:
          n.textHeight = t.value;
          break;
        case 41:
          n.xScale = t.value;
          break;
        case 50:
          n.rotation = t.value;
          break;
        case 1:
          n.text = t.value;
          break;
        // NOTE: 72 and 73 are meaningless without 11 (second alignment point)
        case 72:
          n.halign = t.value;
          break;
        case 73:
          n.valign = t.value;
          break;
        default:
          gt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function Uc(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Pr = { exports: {} }, Nc = Pr.exports, Ka;
function Fc() {
  return Ka || (Ka = 1, (function(i) {
    (function(e, t) {
      i.exports ? i.exports = t() : e.log = t();
    })(Nc, function() {
      var e = function() {
      }, t = "undefined", n = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), r = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
      ], s = {}, o = null;
      function a(_, p) {
        var u = _[p];
        if (typeof u.bind == "function")
          return u.bind(_);
        try {
          return Function.prototype.bind.call(u, _);
        } catch {
          return function() {
            return Function.prototype.apply.apply(u, [_, arguments]);
          };
        }
      }
      function l() {
        console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
      }
      function c(_) {
        return _ === "debug" && (_ = "log"), typeof console === t ? !1 : _ === "trace" && n ? l : console[_] !== void 0 ? a(console, _) : console.log !== void 0 ? a(console, "log") : e;
      }
      function h() {
        for (var _ = this.getLevel(), p = 0; p < r.length; p++) {
          var u = r[p];
          this[u] = p < _ ? e : this.methodFactory(u, _, this.name);
        }
        if (this.log = this.debug, typeof console === t && _ < this.levels.SILENT)
          return "No console available for logging";
      }
      function f(_) {
        return function() {
          typeof console !== t && (h.call(this), this[_].apply(this, arguments));
        };
      }
      function d(_, p, u) {
        return c(_) || f.apply(this, arguments);
      }
      function m(_, p) {
        var u = this, R, E, y, O = "loglevel";
        typeof _ == "string" ? O += ":" + _ : typeof _ == "symbol" && (O = void 0);
        function w(A) {
          var N = (r[A] || "silent").toUpperCase();
          if (!(typeof window === t || !O)) {
            try {
              window.localStorage[O] = N;
              return;
            } catch {
            }
            try {
              window.document.cookie = encodeURIComponent(O) + "=" + N + ";";
            } catch {
            }
          }
        }
        function b() {
          var A;
          if (!(typeof window === t || !O)) {
            try {
              A = window.localStorage[O];
            } catch {
            }
            if (typeof A === t)
              try {
                var N = window.document.cookie, F = encodeURIComponent(O), H = N.indexOf(F + "=");
                H !== -1 && (A = /^([^;]+)/.exec(
                  N.slice(H + F.length + 1)
                )[1]);
              } catch {
              }
            return u.levels[A] === void 0 && (A = void 0), A;
          }
        }
        function C() {
          if (!(typeof window === t || !O)) {
            try {
              window.localStorage.removeItem(O);
            } catch {
            }
            try {
              window.document.cookie = encodeURIComponent(O) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            } catch {
            }
          }
        }
        function S(A) {
          var N = A;
          if (typeof N == "string" && u.levels[N.toUpperCase()] !== void 0 && (N = u.levels[N.toUpperCase()]), typeof N == "number" && N >= 0 && N <= u.levels.SILENT)
            return N;
          throw new TypeError("log.setLevel() called with invalid level: " + A);
        }
        u.name = _, u.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5
        }, u.methodFactory = p || d, u.getLevel = function() {
          return y ?? E ?? R;
        }, u.setLevel = function(A, N) {
          return y = S(A), N !== !1 && w(y), h.call(u);
        }, u.setDefaultLevel = function(A) {
          E = S(A), b() || u.setLevel(A, !1);
        }, u.resetLevel = function() {
          y = null, C(), h.call(u);
        }, u.enableAll = function(A) {
          u.setLevel(u.levels.TRACE, A);
        }, u.disableAll = function(A) {
          u.setLevel(u.levels.SILENT, A);
        }, u.rebuild = function() {
          if (o !== u && (R = S(o.getLevel())), h.call(u), o === u)
            for (var A in s)
              s[A].rebuild();
        }, R = S(
          o ? o.getLevel() : "WARN"
        );
        var v = b();
        v != null && (y = S(v)), h.call(u);
      }
      o = new m(), o.getLogger = function(p) {
        if (typeof p != "symbol" && typeof p != "string" || p === "")
          throw new TypeError("You must supply a name when creating a logger.");
        var u = s[p];
        return u || (u = s[p] = new m(
          p,
          o.methodFactory
        )), u;
      };
      var g = typeof window !== t ? window.log : void 0;
      return o.noConflict = function() {
        return typeof window !== t && window.log === o && (window.log = g), o;
      }, o.getLoggers = function() {
        return s;
      }, o.default = o, o;
    });
  })(Pr)), Pr.exports;
}
var Oc = Fc();
const Fe = /* @__PURE__ */ Uc(Oc);
Fe.setLevel("error");
function Bc(i) {
  i.registerEntityHandler(pc), i.registerEntityHandler(gc), i.registerEntityHandler(_c), i.registerEntityHandler(vc), i.registerEntityHandler(xc), i.registerEntityHandler(yc), i.registerEntityHandler(Mc), i.registerEntityHandler(Sc), i.registerEntityHandler(Ec), i.registerEntityHandler(Tc), i.registerEntityHandler(Ac), i.registerEntityHandler(Rc), i.registerEntityHandler(Lc), i.registerEntityHandler(Dc), i.registerEntityHandler(Ic);
}
class zc {
  constructor() {
    this._entityHandlers = {}, Bc(this);
  }
  parse(e) {
    return typeof e == "string" ? this._parse(e) : (console.error("Cannot read dxf source of type `" + typeof e), null);
  }
  registerEntityHandler(e) {
    const t = new e();
    this._entityHandlers[t.ForEntityName] = t;
  }
  parseSync(e) {
    return this.parse(e);
  }
  parseStream(e) {
    let t = "";
    const n = this;
    return new Promise((r, s) => {
      e.on("data", (o) => {
        t += o;
      }), e.on("end", () => {
        try {
          r(n._parse(t));
        } catch (o) {
          s(o);
        }
      }), e.on("error", (o) => {
        s(o);
      });
    });
  }
  _parse(e) {
    const t = {};
    let n = 0;
    const r = e.split(/\r\n|\r|\n/g), s = new uc(r);
    if (!s.hasNext())
      throw Error("Empty file");
    const o = this;
    let a;
    function l() {
      for (a = s.next(); !s.isEOF(); )
        if (a.code === 0 && a.value === "SECTION") {
          if (a = s.next(), a.code !== 2) {
            console.error("Unexpected code %s after 0:SECTION", pl(a)), a = s.next();
            continue;
          }
          a.value === "HEADER" ? (Fe.debug("> HEADER"), t.header = c(), Fe.debug("<")) : a.value === "BLOCKS" ? (Fe.debug("> BLOCKS"), t.blocks = h(), Fe.debug("<")) : a.value === "ENTITIES" ? (Fe.debug("> ENTITIES"), t.entities = E(!1), Fe.debug("<")) : a.value === "TABLES" ? (Fe.debug("> TABLES"), t.tables = d(), Fe.debug("<")) : a.value === "EOF" ? Fe.debug("EOF") : Fe.warn("Skipping section '%s'", a.value);
        } else
          a = s.next();
    }
    function c() {
      let w = null, b = null;
      const C = {};
      for (a = s.next(); ; ) {
        if (qt(a, 0, "ENDSEC")) {
          w && (C[w] = b);
          break;
        } else a.code === 9 ? (w && (C[w] = b), w = a.value) : a.code === 10 ? b = { x: a.value } : a.code === 20 ? b.y = a.value : a.code === 30 ? b.z = a.value : b = a.value;
        a = s.next();
      }
      return a = s.next(), C;
    }
    function h() {
      const w = {};
      for (a = s.next(); a.value !== "EOF" && !qt(a, 0, "ENDSEC"); )
        if (qt(a, 0, "BLOCK")) {
          Fe.debug("block {");
          const b = f();
          Fe.debug("}"), O(b), b.name ? w[b.name] = b : Fe.error('block with handle "' + b.handle + '" is missing a name.');
        } else
          Pn(a), a = s.next();
      return w;
    }
    function f() {
      const w = {};
      for (a = s.next(); a.value !== "EOF"; ) {
        switch (a.code) {
          case 1:
            w.xrefPath = a.value, a = s.next();
            break;
          case 2:
            w.name = a.value, a = s.next();
            break;
          case 3:
            w.name2 = a.value, a = s.next();
            break;
          case 5:
            w.handle = a.value, a = s.next();
            break;
          case 8:
            w.layer = a.value, a = s.next();
            break;
          case 10:
            w.position = y(a), a = s.next();
            break;
          case 67:
            w.paperSpace = !!(a.value && a.value == 1), a = s.next();
            break;
          case 70:
            a.value != 0 && (w.type = a.value), a = s.next();
            break;
          case 100:
            a = s.next();
            break;
          case 330:
            w.ownerHandle = a.value, a = s.next();
            break;
          case 0:
            if (a.value == "ENDBLK")
              break;
            w.entities = E(!0);
            break;
          default:
            Pn(a), a = s.next();
        }
        if (qt(a, 0, "ENDBLK")) {
          a = s.next();
          break;
        }
      }
      return w;
    }
    function d() {
      const w = {};
      for (a = s.next(); a.value !== "EOF" && !qt(a, 0, "ENDSEC"); )
        qt(a, 0, "TABLE") ? (a = s.next(), R[a.value] ? (Fe.debug(a.value + " Table {"), w[R[a.value].tableName] = g(a), Fe.debug("}")) : Fe.debug("Unhandled Table " + a.value)) : a = s.next();
      return a = s.next(), w;
    }
    const m = "ENDTAB";
    function g(w) {
      const b = R[w.value], C = {};
      let S = 0;
      for (a = s.next(); !qt(a, 0, m); )
        switch (a.code) {
          case 5:
            C.handle = a.value, a = s.next();
            break;
          case 330:
            C.ownerHandle = a.value, a = s.next();
            break;
          case 100:
            a.value === "AcDbSymbolTable" || Pn(a), a = s.next();
            break;
          case 70:
            S = a.value, a = s.next();
            break;
          case 0:
            a.value === b.dxfSymbolName ? C[b.tableRecordsProperty] = b.parseTableRecords() : (Pn(a), a = s.next());
            break;
          default:
            Pn(a), a = s.next();
        }
      const v = C[b.tableRecordsProperty];
      if (v) {
        let A = (() => {
          if (v.constructor === Array)
            return v.length;
          if (typeof v == "object")
            return Object.keys(v).length;
        })();
        S !== A && Fe.warn("Parsed " + A + " " + b.dxfSymbolName + "'s but expected " + S);
      }
      return a = s.next(), C;
    }
    function _() {
      const w = [];
      let b = {};
      for (Fe.debug("ViewPort {"), a = s.next(); !qt(a, 0, m); )
        switch (a.code) {
          case 2:
            b.name = a.value, a = s.next();
            break;
          case 10:
            b.lowerLeftCorner = y(a), a = s.next();
            break;
          case 11:
            b.upperRightCorner = y(a), a = s.next();
            break;
          case 12:
            b.center = y(a), a = s.next();
            break;
          case 13:
            b.snapBasePoint = y(a), a = s.next();
            break;
          case 14:
            b.snapSpacing = y(a), a = s.next();
            break;
          case 15:
            b.gridSpacing = y(a), a = s.next();
            break;
          case 16:
            b.viewDirectionFromTarget = y(a), a = s.next();
            break;
          case 17:
            b.viewTarget = y(a), a = s.next();
            break;
          case 42:
            b.lensLength = a.value, a = s.next();
            break;
          case 43:
            b.frontClippingPlane = a.value, a = s.next();
            break;
          case 44:
            b.backClippingPlane = a.value, a = s.next();
            break;
          case 45:
            b.viewHeight = a.value, a = s.next();
            break;
          case 50:
            b.snapRotationAngle = a.value, a = s.next();
            break;
          case 51:
            b.viewTwistAngle = a.value, a = s.next();
            break;
          case 79:
            b.orthographicType = a.value, a = s.next();
            break;
          case 110:
            b.ucsOrigin = y(a), a = s.next();
            break;
          case 111:
            b.ucsXAxis = y(a), a = s.next();
            break;
          case 112:
            b.ucsYAxis = y(a), a = s.next();
            break;
          case 110:
            b.ucsOrigin = y(a), a = s.next();
            break;
          case 281:
            b.renderMode = a.value, a = s.next();
            break;
          case 281:
            b.defaultLightingType = a.value, a = s.next();
            break;
          case 292:
            b.defaultLightingOn = a.value, a = s.next();
            break;
          case 330:
            b.ownerHandle = a.value, a = s.next();
            break;
          case 63:
          // These are all ambient color. Perhaps should be a gradient when multiple are set.
          case 421:
          case 431:
            b.ambientColor = a.value, a = s.next();
            break;
          case 0:
            a.value === "VPORT" && (Fe.debug("}"), w.push(b), Fe.debug("ViewPort {"), b = {}, a = s.next());
            break;
          default:
            Pn(a), a = s.next();
            break;
        }
      return Fe.debug("}"), w.push(b), w;
    }
    function p() {
      const w = {};
      let b = {}, C = 0, S;
      for (Fe.debug("LType {"), a = s.next(); !qt(a, 0, "ENDTAB"); )
        switch (a.code) {
          case 2:
            b.name = a.value, S = a.value, a = s.next();
            break;
          case 3:
            b.description = a.value, a = s.next();
            break;
          case 73:
            C = a.value, C > 0 && (b.pattern = []), a = s.next();
            break;
          case 40:
            b.patternLength = a.value, a = s.next();
            break;
          case 49:
            b.pattern.push(a.value), a = s.next();
            break;
          case 0:
            Fe.debug("}"), C > 0 && C !== b.pattern.length && Fe.warn("lengths do not match on LTYPE pattern"), w[S] = b, b = {}, Fe.debug("LType {"), a = s.next();
            break;
          default:
            a = s.next();
        }
      return Fe.debug("}"), w[S] = b, w;
    }
    function u() {
      const w = {};
      let b = {}, C;
      for (Fe.debug("Layer {"), a = s.next(); !qt(a, 0, "ENDTAB"); )
        switch (a.code) {
          case 2:
            b.name = a.value, C = a.value, a = s.next();
            break;
          case 62:
            b.visible = a.value >= 0, b.colorIndex = Math.abs(a.value), b.color = kc(b.colorIndex), a = s.next();
            break;
          case 70:
            b.frozen = (a.value & 1) != 0 || (a.value & 2) != 0, a = s.next();
            break;
          case 0:
            a.value === "LAYER" && (Fe.debug("}"), w[C] = b, Fe.debug("Layer {"), b = {}, C = void 0, a = s.next());
            break;
          default:
            Pn(a), a = s.next();
            break;
        }
      return Fe.debug("}"), w[C] = b, w;
    }
    const R = {
      VPORT: {
        tableRecordsProperty: "viewPorts",
        tableName: "viewPort",
        dxfSymbolName: "VPORT",
        parseTableRecords: _
      },
      LTYPE: {
        tableRecordsProperty: "lineTypes",
        tableName: "lineType",
        dxfSymbolName: "LTYPE",
        parseTableRecords: p
      },
      LAYER: {
        tableRecordsProperty: "layers",
        tableName: "layer",
        dxfSymbolName: "LAYER",
        parseTableRecords: u
      }
    };
    function E(w) {
      const b = [], C = w ? "ENDBLK" : "ENDSEC";
      for (w || (a = s.next()); ; )
        if (a.code === 0) {
          if (a.value === C)
            break;
          const S = o._entityHandlers[a.value];
          if (S != null) {
            Fe.debug(a.value + " {");
            const v = S.parseEntity(s, a);
            a = s.lastReadGroup, Fe.debug("}"), O(v), b.push(v);
          } else {
            Fe.warn("Unhandled entity " + a.value), a = s.next();
            continue;
          }
        } else
          a = s.next();
      return C == "ENDSEC" && (a = s.next()), b;
    }
    function y(w) {
      const b = {};
      let C = w.code;
      if (b.x = w.value, C += 10, w = s.next(), w.code != C)
        throw new Error("Expected code for point value to be " + C + " but got " + w.code + ".");
      return b.y = w.value, C += 10, w = s.next(), w.code != C ? (s.rewind(), b) : (b.z = w.value, b);
    }
    function O(w) {
      if (!w)
        throw new TypeError("entity cannot be undefined or null");
      w.handle || (w.handle = n++);
    }
    return l(), t;
  }
}
function qt(i, e, t) {
  return i.code === e && i.value === t;
}
function Pn(i) {
  Fe.debug("unhandled group " + pl(i));
}
function pl(i) {
  return i.code + ":" + i.value;
}
function kc(i) {
  return dl[i];
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Aa = "170", _i = { ROTATE: 0, DOLLY: 1, PAN: 2 }, pi = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Hc = 0, ja = 1, Vc = 2, ml = 1, Gc = 2, on = 3, wn = 0, At = 1, Kt = 2, Tn = 0, vi = 1, $a = 2, Ja = 3, Qa = 4, Wc = 5, zn = 100, Xc = 101, Yc = 102, qc = 103, Zc = 104, Kc = 200, jc = 201, $c = 202, Jc = 203, Ns = 204, Fs = 205, Qc = 206, eh = 207, th = 208, nh = 209, ih = 210, rh = 211, sh = 212, ah = 213, oh = 214, Os = 0, Bs = 1, zs = 2, Mi = 3, ks = 4, Hs = 5, Vs = 6, Gs = 7, gl = 0, lh = 1, ch = 2, An = 0, hh = 1, uh = 2, fh = 3, dh = 4, ph = 5, mh = 6, gh = 7, _l = 300, Si = 301, Ei = 302, Ws = 303, Xs = 304, Xr = 306, Ys = 1e3, Hn = 1001, qs = 1002, Wt = 1003, _h = 1004, er = 1005, $t = 1006, Jr = 1007, Vn = 1008, dn = 1009, vl = 1010, xl = 1011, Xi = 1012, wa = 1013, Wn = 1014, cn = 1015, Ki = 1016, Ra = 1017, Ca = 1018, bi = 1020, yl = 35902, Ml = 1021, Sl = 1022, Vt = 1023, El = 1024, bl = 1025, xi = 1026, Ti = 1027, Tl = 1028, Pa = 1029, Al = 1030, La = 1031, Da = 1033, Lr = 33776, Dr = 33777, Ir = 33778, Ur = 33779, Zs = 35840, Ks = 35841, js = 35842, $s = 35843, Js = 36196, Qs = 37492, ea = 37496, ta = 37808, na = 37809, ia = 37810, ra = 37811, sa = 37812, aa = 37813, oa = 37814, la = 37815, ca = 37816, ha = 37817, ua = 37818, fa = 37819, da = 37820, pa = 37821, Nr = 36492, ma = 36494, ga = 36495, wl = 36283, _a = 36284, va = 36285, xa = 36286, vh = 3200, xh = 3201, yh = 0, Mh = 1, bn = "", It = "srgb", wi = "srgb-linear", Yr = "linear", Ke = "srgb", jn = 7680, eo = 519, Sh = 512, Eh = 513, bh = 514, Rl = 515, Th = 516, Ah = 517, wh = 518, Rh = 519, ya = 35044, to = "300 es", hn = 2e3, zr = 2001;
class Zn {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const r = this._listeners[e];
    if (r !== void 0) {
      const s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      const r = n.slice(0);
      for (let s = 0, o = r.length; s < o; s++)
        r[s].call(this, e);
      e.target = null;
    }
  }
}
const vt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Fr = Math.PI / 180, Ma = 180 / Math.PI;
function un() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (vt[i & 255] + vt[i >> 8 & 255] + vt[i >> 16 & 255] + vt[i >> 24 & 255] + "-" + vt[e & 255] + vt[e >> 8 & 255] + "-" + vt[e >> 16 & 15 | 64] + vt[e >> 24 & 255] + "-" + vt[t & 63 | 128] + vt[t >> 8 & 255] + "-" + vt[t >> 16 & 255] + vt[t >> 24 & 255] + vt[n & 255] + vt[n >> 8 & 255] + vt[n >> 16 & 255] + vt[n >> 24 & 255]).toLowerCase();
}
function mt(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Ch(i, e) {
  return (i % e + e) % e;
}
function Qr(i, e, t) {
  return (1 - t) * i + t * e;
}
function jt(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function je(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const Ph = {
  DEG2RAD: Fr
};
class se {
  constructor(e = 0, t = 0) {
    se.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(mt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = this.x - e.x, o = this.y - e.y;
    return this.x = s * n - o * r + e.x, this.y = s * r + o * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Le {
  constructor(e, t, n, r, s, o, a, l, c) {
    Le.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, o, a, l, c);
  }
  set(e, t, n, r, s, o, a, l, c) {
    const h = this.elements;
    return h[0] = e, h[1] = r, h[2] = a, h[3] = t, h[4] = s, h[5] = l, h[6] = n, h[7] = o, h[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, o = n[0], a = n[3], l = n[6], c = n[1], h = n[4], f = n[7], d = n[2], m = n[5], g = n[8], _ = r[0], p = r[3], u = r[6], R = r[1], E = r[4], y = r[7], O = r[2], w = r[5], b = r[8];
    return s[0] = o * _ + a * R + l * O, s[3] = o * p + a * E + l * w, s[6] = o * u + a * y + l * b, s[1] = c * _ + h * R + f * O, s[4] = c * p + h * E + f * w, s[7] = c * u + h * y + f * b, s[2] = d * _ + m * R + g * O, s[5] = d * p + m * E + g * w, s[8] = d * u + m * y + g * b, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8];
    return t * o * h - t * a * c - n * s * h + n * a * l + r * s * c - r * o * l;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8], f = h * o - a * c, d = a * l - h * s, m = c * s - o * l, g = t * f + n * d + r * m;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / g;
    return e[0] = f * _, e[1] = (r * c - h * n) * _, e[2] = (a * n - r * o) * _, e[3] = d * _, e[4] = (h * t - r * l) * _, e[5] = (r * s - a * t) * _, e[6] = m * _, e[7] = (n * l - c * t) * _, e[8] = (o * t - n * s) * _, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, r, s, o, a) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(
      n * l,
      n * c,
      -n * (l * o + c * a) + o + e,
      -r * c,
      r * l,
      -r * (-c * o + l * a) + a + t,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, t) {
    return this.premultiply(es.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(es.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(es.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const es = /* @__PURE__ */ new Le();
function Cl(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function kr(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Lh() {
  const i = kr("canvas");
  return i.style.display = "block", i;
}
const no = {};
function ki(i) {
  i in no || (no[i] = !0, console.warn(i));
}
function Dh(i, e, t) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, t);
          break;
        default:
          n();
      }
    }
    setTimeout(s, t);
  });
}
function Ih(i) {
  const e = i.elements;
  e[2] = 0.5 * e[2] + 0.5 * e[3], e[6] = 0.5 * e[6] + 0.5 * e[7], e[10] = 0.5 * e[10] + 0.5 * e[11], e[14] = 0.5 * e[14] + 0.5 * e[15];
}
function Uh(i) {
  const e = i.elements;
  e[11] === -1 ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = -e[14] + 1);
}
const Ge = {
  enabled: !0,
  workingColorSpace: wi,
  /**
   * Implementations of supported color spaces.
   *
   * Required:
   *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
   *	- whitePoint: reference white [ x y ]
   *	- transfer: transfer function (pre-defined)
   *	- toXYZ: Matrix3 RGB to XYZ transform
   *	- fromXYZ: Matrix3 XYZ to RGB transform
   *	- luminanceCoefficients: RGB luminance coefficients
   *
   * Optional:
   *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
   *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
   *
   * Reference:
   * - https://www.russellcottrell.com/photo/matrixCalculator.htm
   */
  spaces: {},
  convert: function(i, e, t) {
    return this.enabled === !1 || e === t || !e || !t || (this.spaces[e].transfer === Ke && (i.r = fn(i.r), i.g = fn(i.g), i.b = fn(i.b)), this.spaces[e].primaries !== this.spaces[t].primaries && (i.applyMatrix3(this.spaces[e].toXYZ), i.applyMatrix3(this.spaces[t].fromXYZ)), this.spaces[t].transfer === Ke && (i.r = yi(i.r), i.g = yi(i.g), i.b = yi(i.b))), i;
  },
  fromWorkingColorSpace: function(i, e) {
    return this.convert(i, this.workingColorSpace, e);
  },
  toWorkingColorSpace: function(i, e) {
    return this.convert(i, e, this.workingColorSpace);
  },
  getPrimaries: function(i) {
    return this.spaces[i].primaries;
  },
  getTransfer: function(i) {
    return i === bn ? Yr : this.spaces[i].transfer;
  },
  getLuminanceCoefficients: function(i, e = this.workingColorSpace) {
    return i.fromArray(this.spaces[e].luminanceCoefficients);
  },
  define: function(i) {
    Object.assign(this.spaces, i);
  },
  // Internal APIs
  _getMatrix: function(i, e, t) {
    return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ);
  },
  _getDrawingBufferColorSpace: function(i) {
    return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
  },
  _getUnpackColorSpace: function(i = this.workingColorSpace) {
    return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
  }
};
function fn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function yi(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const io = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], ro = [0.2126, 0.7152, 0.0722], so = [0.3127, 0.329], ao = /* @__PURE__ */ new Le().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), oo = /* @__PURE__ */ new Le().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
Ge.define({
  [wi]: {
    primaries: io,
    whitePoint: so,
    transfer: Yr,
    toXYZ: ao,
    fromXYZ: oo,
    luminanceCoefficients: ro,
    workingColorSpaceConfig: { unpackColorSpace: It },
    outputColorSpaceConfig: { drawingBufferColorSpace: It }
  },
  [It]: {
    primaries: io,
    whitePoint: so,
    transfer: Ke,
    toXYZ: ao,
    fromXYZ: oo,
    luminanceCoefficients: ro,
    outputColorSpaceConfig: { drawingBufferColorSpace: It }
  }
});
let $n;
class Nh {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      $n === void 0 && ($n = kr("canvas")), $n.width = e.width, $n.height = e.height;
      const n = $n.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = $n;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = kr("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let o = 0; o < s.length; o++)
        s[o] = fn(s[o] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(fn(t[n] / 255) * 255) : t[n] = fn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Fh = 0;
class Pl {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Fh++ }), this.uuid = un(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let o = 0, a = r.length; o < a; o++)
          r[o].isDataTexture ? s.push(ts(r[o].image)) : s.push(ts(r[o]));
      } else
        s = ts(r);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function ts(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Nh.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Oh = 0;
class St extends Zn {
  constructor(e = St.DEFAULT_IMAGE, t = St.DEFAULT_MAPPING, n = Hn, r = Hn, s = $t, o = Vn, a = Vt, l = dn, c = St.DEFAULT_ANISOTROPY, h = bn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Oh++ }), this.uuid = un(), this.name = "", this.source = new Pl(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = o, this.anisotropy = c, this.format = a, this.internalFormat = null, this.type = l, this.offset = new se(0, 0), this.repeat = new se(1, 1), this.center = new se(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Le(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== _l) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case Ys:
          e.x = e.x - Math.floor(e.x);
          break;
        case Hn:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case qs:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case Ys:
          e.y = e.y - Math.floor(e.y);
          break;
        case Hn:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case qs:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
St.DEFAULT_IMAGE = null;
St.DEFAULT_MAPPING = _l;
St.DEFAULT_ANISOTROPY = 1;
class lt {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    lt.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = this.w, o = e.elements;
    return this.x = o[0] * t + o[4] * n + o[8] * r + o[12] * s, this.y = o[1] * t + o[5] * n + o[9] * r + o[13] * s, this.z = o[2] * t + o[6] * n + o[10] * r + o[14] * s, this.w = o[3] * t + o[7] * n + o[11] * r + o[15] * s, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, s;
    const l = e.elements, c = l[0], h = l[4], f = l[8], d = l[1], m = l[5], g = l[9], _ = l[2], p = l[6], u = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(f - _) < 0.01 && Math.abs(g - p) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(f + _) < 0.1 && Math.abs(g + p) < 0.1 && Math.abs(c + m + u - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const E = (c + 1) / 2, y = (m + 1) / 2, O = (u + 1) / 2, w = (h + d) / 4, b = (f + _) / 4, C = (g + p) / 4;
      return E > y && E > O ? E < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(E), r = w / n, s = b / n) : y > O ? y < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(y), n = w / r, s = C / r) : O < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(O), n = b / s, r = C / s), this.set(n, r, s, t), this;
    }
    let R = Math.sqrt((p - g) * (p - g) + (f - _) * (f - _) + (d - h) * (d - h));
    return Math.abs(R) < 1e-3 && (R = 1), this.x = (p - g) / R, this.y = (f - _) / R, this.z = (d - h) / R, this.w = Math.acos((c + m + u - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Bh extends Zn {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new lt(0, 0, e, t), this.scissorTest = !1, this.viewport = new lt(0, 0, e, t);
    const r = { width: e, height: t, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: $t,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const s = new St(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    s.flipY = !1, s.generateMipmaps = n.generateMipmaps, s.internalFormat = n.internalFormat, this.textures = [];
    const o = n.count;
    for (let a = 0; a < o; a++)
      this.textures[a] = s.clone(), this.textures[a].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let n = 0, r = e.textures.length; n < r; n++)
      this.textures[n] = e.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new Pl(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Xn extends Bh {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class Ll extends St {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = Wt, this.minFilter = Wt, this.wrapR = Hn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class zh extends St {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = Wt, this.minFilter = Wt, this.wrapR = Hn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Yn {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  static slerpFlat(e, t, n, r, s, o, a) {
    let l = n[r + 0], c = n[r + 1], h = n[r + 2], f = n[r + 3];
    const d = s[o + 0], m = s[o + 1], g = s[o + 2], _ = s[o + 3];
    if (a === 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = f;
      return;
    }
    if (a === 1) {
      e[t + 0] = d, e[t + 1] = m, e[t + 2] = g, e[t + 3] = _;
      return;
    }
    if (f !== _ || l !== d || c !== m || h !== g) {
      let p = 1 - a;
      const u = l * d + c * m + h * g + f * _, R = u >= 0 ? 1 : -1, E = 1 - u * u;
      if (E > Number.EPSILON) {
        const O = Math.sqrt(E), w = Math.atan2(O, u * R);
        p = Math.sin(p * w) / O, a = Math.sin(a * w) / O;
      }
      const y = a * R;
      if (l = l * p + d * y, c = c * p + m * y, h = h * p + g * y, f = f * p + _ * y, p === 1 - a) {
        const O = 1 / Math.sqrt(l * l + c * c + h * h + f * f);
        l *= O, c *= O, h *= O, f *= O;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = f;
  }
  static multiplyQuaternionsFlat(e, t, n, r, s, o) {
    const a = n[r], l = n[r + 1], c = n[r + 2], h = n[r + 3], f = s[o], d = s[o + 1], m = s[o + 2], g = s[o + 3];
    return e[t] = a * g + h * f + l * m - c * d, e[t + 1] = l * g + h * d + c * f - a * m, e[t + 2] = c * g + h * m + a * d - l * f, e[t + 3] = h * g - a * f - l * d - c * m, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, r = e._y, s = e._z, o = e._order, a = Math.cos, l = Math.sin, c = a(n / 2), h = a(r / 2), f = a(s / 2), d = l(n / 2), m = l(r / 2), g = l(s / 2);
    switch (o) {
      case "XYZ":
        this._x = d * h * f + c * m * g, this._y = c * m * f - d * h * g, this._z = c * h * g + d * m * f, this._w = c * h * f - d * m * g;
        break;
      case "YXZ":
        this._x = d * h * f + c * m * g, this._y = c * m * f - d * h * g, this._z = c * h * g - d * m * f, this._w = c * h * f + d * m * g;
        break;
      case "ZXY":
        this._x = d * h * f - c * m * g, this._y = c * m * f + d * h * g, this._z = c * h * g + d * m * f, this._w = c * h * f - d * m * g;
        break;
      case "ZYX":
        this._x = d * h * f - c * m * g, this._y = c * m * f + d * h * g, this._z = c * h * g - d * m * f, this._w = c * h * f + d * m * g;
        break;
      case "YZX":
        this._x = d * h * f + c * m * g, this._y = c * m * f + d * h * g, this._z = c * h * g - d * m * f, this._w = c * h * f - d * m * g;
        break;
      case "XZY":
        this._x = d * h * f - c * m * g, this._y = c * m * f - d * h * g, this._z = c * h * g + d * m * f, this._w = c * h * f + d * m * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], r = t[4], s = t[8], o = t[1], a = t[5], l = t[9], c = t[2], h = t[6], f = t[10], d = n + a + f;
    if (d > 0) {
      const m = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / m, this._x = (h - l) * m, this._y = (s - c) * m, this._z = (o - r) * m;
    } else if (n > a && n > f) {
      const m = 2 * Math.sqrt(1 + n - a - f);
      this._w = (h - l) / m, this._x = 0.25 * m, this._y = (r + o) / m, this._z = (s + c) / m;
    } else if (a > f) {
      const m = 2 * Math.sqrt(1 + a - n - f);
      this._w = (s - c) / m, this._x = (r + o) / m, this._y = 0.25 * m, this._z = (l + h) / m;
    } else {
      const m = 2 * Math.sqrt(1 + f - n - a);
      this._w = (o - r) / m, this._x = (s + c) / m, this._y = (l + h) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(mt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, r = e._y, s = e._z, o = e._w, a = t._x, l = t._y, c = t._z, h = t._w;
    return this._x = n * h + o * a + r * c - s * l, this._y = r * h + o * l + s * a - n * c, this._z = s * h + o * c + n * l - r * a, this._w = o * h - n * a - r * l - s * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, r = this._y, s = this._z, o = this._w;
    let a = o * e._w + n * e._x + r * e._y + s * e._z;
    if (a < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1)
      return this._w = o, this._x = n, this._y = r, this._z = s, this;
    const l = 1 - a * a;
    if (l <= Number.EPSILON) {
      const m = 1 - t;
      return this._w = m * o + t * this._w, this._x = m * n + t * this._x, this._y = m * r + t * this._y, this._z = m * s + t * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, a), f = Math.sin((1 - t) * h) / c, d = Math.sin(t * h) / c;
    return this._w = o * f + this._w * d, this._x = n * f + this._x * d, this._y = r * f + this._y * d, this._z = s * f + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      s * Math.sin(t),
      s * Math.cos(t)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class P {
  constructor(e = 0, t = 0, n = 0) {
    P.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(lo.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(lo.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6] * r, this.y = s[1] * t + s[4] * n + s[7] * r, this.z = s[2] * t + s[5] * n + s[8] * r, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements, o = 1 / (s[3] * t + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * t + s[4] * n + s[8] * r + s[12]) * o, this.y = (s[1] * t + s[5] * n + s[9] * r + s[13]) * o, this.z = (s[2] * t + s[6] * n + s[10] * r + s[14]) * o, this;
  }
  applyQuaternion(e) {
    const t = this.x, n = this.y, r = this.z, s = e.x, o = e.y, a = e.z, l = e.w, c = 2 * (o * r - a * n), h = 2 * (a * t - s * r), f = 2 * (s * n - o * t);
    return this.x = t + l * c + o * f - a * h, this.y = n + l * h + a * c - s * f, this.z = r + l * f + s * h - o * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * r, this.y = s[1] * t + s[5] * n + s[9] * r, this.z = s[2] * t + s[6] * n + s[10] * r, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x, r = e.y, s = e.z, o = t.x, a = t.y, l = t.z;
    return this.x = r * l - s * a, this.y = s * o - n * l, this.z = n * a - r * o, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return ns.copy(this).projectOnVector(e), this.sub(ns);
  }
  reflect(e) {
    return this.sub(ns.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(mt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const ns = /* @__PURE__ */ new P(), lo = /* @__PURE__ */ new Yn();
class ji {
  constructor(e = new P(1 / 0, 1 / 0, 1 / 0), t = new P(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(zt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(zt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = zt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let o = 0, a = s.count; o < a; o++)
          e.isMesh === !0 ? e.getVertexPosition(o, zt) : zt.fromBufferAttribute(s, o), zt.applyMatrix4(e.matrixWorld), this.expandByPoint(zt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), tr.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), tr.copy(n.boundingBox)), tr.applyMatrix4(e.matrixWorld), this.union(tr);
    }
    const r = e.children;
    for (let s = 0, o = r.length; s < o; s++)
      this.expandByObject(r[s], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, zt), zt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Di), nr.subVectors(this.max, Di), Jn.subVectors(e.a, Di), Qn.subVectors(e.b, Di), ei.subVectors(e.c, Di), _n.subVectors(Qn, Jn), vn.subVectors(ei, Qn), Ln.subVectors(Jn, ei);
    let t = [
      0,
      -_n.z,
      _n.y,
      0,
      -vn.z,
      vn.y,
      0,
      -Ln.z,
      Ln.y,
      _n.z,
      0,
      -_n.x,
      vn.z,
      0,
      -vn.x,
      Ln.z,
      0,
      -Ln.x,
      -_n.y,
      _n.x,
      0,
      -vn.y,
      vn.x,
      0,
      -Ln.y,
      Ln.x,
      0
    ];
    return !is(t, Jn, Qn, ei, nr) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !is(t, Jn, Qn, ei, nr)) ? !1 : (ir.crossVectors(_n, vn), t = [ir.x, ir.y, ir.z], is(t, Jn, Qn, ei, nr));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, zt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(zt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (tn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), tn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), tn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), tn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), tn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), tn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), tn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), tn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(tn), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const tn = [
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P()
], zt = /* @__PURE__ */ new P(), tr = /* @__PURE__ */ new ji(), Jn = /* @__PURE__ */ new P(), Qn = /* @__PURE__ */ new P(), ei = /* @__PURE__ */ new P(), _n = /* @__PURE__ */ new P(), vn = /* @__PURE__ */ new P(), Ln = /* @__PURE__ */ new P(), Di = /* @__PURE__ */ new P(), nr = /* @__PURE__ */ new P(), ir = /* @__PURE__ */ new P(), Dn = /* @__PURE__ */ new P();
function is(i, e, t, n, r) {
  for (let s = 0, o = i.length - 3; s <= o; s += 3) {
    Dn.fromArray(i, s);
    const a = r.x * Math.abs(Dn.x) + r.y * Math.abs(Dn.y) + r.z * Math.abs(Dn.z), l = e.dot(Dn), c = t.dot(Dn), h = n.dot(Dn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > a)
      return !1;
  }
  return !0;
}
const kh = /* @__PURE__ */ new ji(), Ii = /* @__PURE__ */ new P(), rs = /* @__PURE__ */ new P();
class qr {
  constructor(e = new P(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : kh.setFromPoints(e).getCenter(n);
    let r = 0;
    for (let s = 0, o = e.length; s < o; s++)
      r = Math.max(r, n.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Ii.subVectors(e, this.center);
    const t = Ii.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(Ii, r / n), this.radius += r;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (rs.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Ii.copy(e.center).add(rs)), this.expandByPoint(Ii.copy(e.center).sub(rs))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const nn = /* @__PURE__ */ new P(), ss = /* @__PURE__ */ new P(), rr = /* @__PURE__ */ new P(), xn = /* @__PURE__ */ new P(), as = /* @__PURE__ */ new P(), sr = /* @__PURE__ */ new P(), os = /* @__PURE__ */ new P();
class Ia {
  constructor(e = new P(), t = new P(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, nn)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = nn.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (nn.copy(this.origin).addScaledVector(this.direction, t), nn.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, r) {
    ss.copy(e).add(t).multiplyScalar(0.5), rr.copy(t).sub(e).normalize(), xn.copy(this.origin).sub(ss);
    const s = e.distanceTo(t) * 0.5, o = -this.direction.dot(rr), a = xn.dot(this.direction), l = -xn.dot(rr), c = xn.lengthSq(), h = Math.abs(1 - o * o);
    let f, d, m, g;
    if (h > 0)
      if (f = o * l - a, d = o * a - l, g = s * h, f >= 0)
        if (d >= -g)
          if (d <= g) {
            const _ = 1 / h;
            f *= _, d *= _, m = f * (f + o * d + 2 * a) + d * (o * f + d + 2 * l) + c;
          } else
            d = s, f = Math.max(0, -(o * d + a)), m = -f * f + d * (d + 2 * l) + c;
        else
          d = -s, f = Math.max(0, -(o * d + a)), m = -f * f + d * (d + 2 * l) + c;
      else
        d <= -g ? (f = Math.max(0, -(-o * s + a)), d = f > 0 ? -s : Math.min(Math.max(-s, -l), s), m = -f * f + d * (d + 2 * l) + c) : d <= g ? (f = 0, d = Math.min(Math.max(-s, -l), s), m = d * (d + 2 * l) + c) : (f = Math.max(0, -(o * s + a)), d = f > 0 ? s : Math.min(Math.max(-s, -l), s), m = -f * f + d * (d + 2 * l) + c);
    else
      d = o > 0 ? -s : s, f = Math.max(0, -(o * d + a)), m = -f * f + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, f), r && r.copy(ss).addScaledVector(rr, d), m;
  }
  intersectSphere(e, t) {
    nn.subVectors(e.center, this.origin);
    const n = nn.dot(this.direction), r = nn.dot(nn) - n * n, s = e.radius * e.radius;
    if (r > s) return null;
    const o = Math.sqrt(s - r), a = n - o, l = n + o;
    return l < 0 ? null : a < 0 ? this.at(l, t) : this.at(a, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, r, s, o, a, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, f = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), h >= 0 ? (s = (e.min.y - d.y) * h, o = (e.max.y - d.y) * h) : (s = (e.max.y - d.y) * h, o = (e.min.y - d.y) * h), n > o || s > r || ((s > n || isNaN(n)) && (n = s), (o < r || isNaN(r)) && (r = o), f >= 0 ? (a = (e.min.z - d.z) * f, l = (e.max.z - d.z) * f) : (a = (e.max.z - d.z) * f, l = (e.min.z - d.z) * f), n > l || a > r) || ((a > n || n !== n) && (n = a), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, nn) !== null;
  }
  intersectTriangle(e, t, n, r, s) {
    as.subVectors(t, e), sr.subVectors(n, e), os.crossVectors(as, sr);
    let o = this.direction.dot(os), a;
    if (o > 0) {
      if (r) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    xn.subVectors(this.origin, e);
    const l = a * this.direction.dot(sr.crossVectors(xn, sr));
    if (l < 0)
      return null;
    const c = a * this.direction.dot(as.cross(xn));
    if (c < 0 || l + c > o)
      return null;
    const h = -a * xn.dot(os);
    return h < 0 ? null : this.at(h / o, s);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class st {
  constructor(e, t, n, r, s, o, a, l, c, h, f, d, m, g, _, p) {
    st.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, o, a, l, c, h, f, d, m, g, _, p);
  }
  set(e, t, n, r, s, o, a, l, c, h, f, d, m, g, _, p) {
    const u = this.elements;
    return u[0] = e, u[4] = t, u[8] = n, u[12] = r, u[1] = s, u[5] = o, u[9] = a, u[13] = l, u[2] = c, u[6] = h, u[10] = f, u[14] = d, u[3] = m, u[7] = g, u[11] = _, u[15] = p, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new st().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, n = e.elements, r = 1 / ti.setFromMatrixColumn(e, 0).length(), s = 1 / ti.setFromMatrixColumn(e, 1).length(), o = 1 / ti.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * o, t[9] = n[9] * o, t[10] = n[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z, o = Math.cos(n), a = Math.sin(n), l = Math.cos(r), c = Math.sin(r), h = Math.cos(s), f = Math.sin(s);
    if (e.order === "XYZ") {
      const d = o * h, m = o * f, g = a * h, _ = a * f;
      t[0] = l * h, t[4] = -l * f, t[8] = c, t[1] = m + g * c, t[5] = d - _ * c, t[9] = -a * l, t[2] = _ - d * c, t[6] = g + m * c, t[10] = o * l;
    } else if (e.order === "YXZ") {
      const d = l * h, m = l * f, g = c * h, _ = c * f;
      t[0] = d + _ * a, t[4] = g * a - m, t[8] = o * c, t[1] = o * f, t[5] = o * h, t[9] = -a, t[2] = m * a - g, t[6] = _ + d * a, t[10] = o * l;
    } else if (e.order === "ZXY") {
      const d = l * h, m = l * f, g = c * h, _ = c * f;
      t[0] = d - _ * a, t[4] = -o * f, t[8] = g + m * a, t[1] = m + g * a, t[5] = o * h, t[9] = _ - d * a, t[2] = -o * c, t[6] = a, t[10] = o * l;
    } else if (e.order === "ZYX") {
      const d = o * h, m = o * f, g = a * h, _ = a * f;
      t[0] = l * h, t[4] = g * c - m, t[8] = d * c + _, t[1] = l * f, t[5] = _ * c + d, t[9] = m * c - g, t[2] = -c, t[6] = a * l, t[10] = o * l;
    } else if (e.order === "YZX") {
      const d = o * l, m = o * c, g = a * l, _ = a * c;
      t[0] = l * h, t[4] = _ - d * f, t[8] = g * f + m, t[1] = f, t[5] = o * h, t[9] = -a * h, t[2] = -c * h, t[6] = m * f + g, t[10] = d - _ * f;
    } else if (e.order === "XZY") {
      const d = o * l, m = o * c, g = a * l, _ = a * c;
      t[0] = l * h, t[4] = -f, t[8] = c * h, t[1] = d * f + _, t[5] = o * h, t[9] = m * f - g, t[2] = g * f - m, t[6] = a * h, t[10] = _ * f + d;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(Hh, e, Vh);
  }
  lookAt(e, t, n) {
    const r = this.elements;
    return Rt.subVectors(e, t), Rt.lengthSq() === 0 && (Rt.z = 1), Rt.normalize(), yn.crossVectors(n, Rt), yn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Rt.x += 1e-4 : Rt.z += 1e-4, Rt.normalize(), yn.crossVectors(n, Rt)), yn.normalize(), ar.crossVectors(Rt, yn), r[0] = yn.x, r[4] = ar.x, r[8] = Rt.x, r[1] = yn.y, r[5] = ar.y, r[9] = Rt.y, r[2] = yn.z, r[6] = ar.z, r[10] = Rt.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, o = n[0], a = n[4], l = n[8], c = n[12], h = n[1], f = n[5], d = n[9], m = n[13], g = n[2], _ = n[6], p = n[10], u = n[14], R = n[3], E = n[7], y = n[11], O = n[15], w = r[0], b = r[4], C = r[8], S = r[12], v = r[1], A = r[5], N = r[9], F = r[13], H = r[2], X = r[6], W = r[10], q = r[14], V = r[3], te = r[7], oe = r[11], me = r[15];
    return s[0] = o * w + a * v + l * H + c * V, s[4] = o * b + a * A + l * X + c * te, s[8] = o * C + a * N + l * W + c * oe, s[12] = o * S + a * F + l * q + c * me, s[1] = h * w + f * v + d * H + m * V, s[5] = h * b + f * A + d * X + m * te, s[9] = h * C + f * N + d * W + m * oe, s[13] = h * S + f * F + d * q + m * me, s[2] = g * w + _ * v + p * H + u * V, s[6] = g * b + _ * A + p * X + u * te, s[10] = g * C + _ * N + p * W + u * oe, s[14] = g * S + _ * F + p * q + u * me, s[3] = R * w + E * v + y * H + O * V, s[7] = R * b + E * A + y * X + O * te, s[11] = R * C + E * N + y * W + O * oe, s[15] = R * S + E * F + y * q + O * me, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[12], o = e[1], a = e[5], l = e[9], c = e[13], h = e[2], f = e[6], d = e[10], m = e[14], g = e[3], _ = e[7], p = e[11], u = e[15];
    return g * (+s * l * f - r * c * f - s * a * d + n * c * d + r * a * m - n * l * m) + _ * (+t * l * m - t * c * d + s * o * d - r * o * m + r * c * h - s * l * h) + p * (+t * c * f - t * a * m - s * o * f + n * o * m + s * a * h - n * c * h) + u * (-r * a * h - t * l * f + t * a * d + r * o * f - n * o * d + n * l * h);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8], f = e[9], d = e[10], m = e[11], g = e[12], _ = e[13], p = e[14], u = e[15], R = f * p * c - _ * d * c + _ * l * m - a * p * m - f * l * u + a * d * u, E = g * d * c - h * p * c - g * l * m + o * p * m + h * l * u - o * d * u, y = h * _ * c - g * f * c + g * a * m - o * _ * m - h * a * u + o * f * u, O = g * f * l - h * _ * l - g * a * d + o * _ * d + h * a * p - o * f * p, w = t * R + n * E + r * y + s * O;
    if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const b = 1 / w;
    return e[0] = R * b, e[1] = (_ * d * s - f * p * s - _ * r * m + n * p * m + f * r * u - n * d * u) * b, e[2] = (a * p * s - _ * l * s + _ * r * c - n * p * c - a * r * u + n * l * u) * b, e[3] = (f * l * s - a * d * s - f * r * c + n * d * c + a * r * m - n * l * m) * b, e[4] = E * b, e[5] = (h * p * s - g * d * s + g * r * m - t * p * m - h * r * u + t * d * u) * b, e[6] = (g * l * s - o * p * s - g * r * c + t * p * c + o * r * u - t * l * u) * b, e[7] = (o * d * s - h * l * s + h * r * c - t * d * c - o * r * m + t * l * m) * b, e[8] = y * b, e[9] = (g * f * s - h * _ * s - g * n * m + t * _ * m + h * n * u - t * f * u) * b, e[10] = (o * _ * s - g * a * s + g * n * c - t * _ * c - o * n * u + t * a * u) * b, e[11] = (h * a * s - o * f * s - h * n * c + t * f * c + o * n * m - t * a * m) * b, e[12] = O * b, e[13] = (h * _ * r - g * f * r + g * n * d - t * _ * d - h * n * p + t * f * p) * b, e[14] = (g * a * r - o * _ * r - g * n * l + t * _ * l + o * n * p - t * a * p) * b, e[15] = (o * f * r - h * a * r + h * n * l - t * f * l - o * n * d + t * a * d) * b, this;
  }
  scale(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z;
    return t[0] *= n, t[4] *= r, t[8] *= s, t[1] *= n, t[5] *= r, t[9] *= s, t[2] *= n, t[6] *= r, t[10] *= s, t[3] *= n, t[7] *= r, t[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = 1 - n, o = e.x, a = e.y, l = e.z, c = s * o, h = s * a;
    return this.set(
      c * o + n,
      c * a - r * l,
      c * l + r * a,
      0,
      c * a + r * l,
      h * a + n,
      h * l - r * o,
      0,
      c * l - r * a,
      h * l + r * o,
      s * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, t, n, r, s, o) {
    return this.set(
      1,
      n,
      s,
      0,
      e,
      1,
      o,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, n) {
    const r = this.elements, s = t._x, o = t._y, a = t._z, l = t._w, c = s + s, h = o + o, f = a + a, d = s * c, m = s * h, g = s * f, _ = o * h, p = o * f, u = a * f, R = l * c, E = l * h, y = l * f, O = n.x, w = n.y, b = n.z;
    return r[0] = (1 - (_ + u)) * O, r[1] = (m + y) * O, r[2] = (g - E) * O, r[3] = 0, r[4] = (m - y) * w, r[5] = (1 - (d + u)) * w, r[6] = (p + R) * w, r[7] = 0, r[8] = (g + E) * b, r[9] = (p - R) * b, r[10] = (1 - (d + _)) * b, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  decompose(e, t, n) {
    const r = this.elements;
    let s = ti.set(r[0], r[1], r[2]).length();
    const o = ti.set(r[4], r[5], r[6]).length(), a = ti.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), e.x = r[12], e.y = r[13], e.z = r[14], kt.copy(this);
    const c = 1 / s, h = 1 / o, f = 1 / a;
    return kt.elements[0] *= c, kt.elements[1] *= c, kt.elements[2] *= c, kt.elements[4] *= h, kt.elements[5] *= h, kt.elements[6] *= h, kt.elements[8] *= f, kt.elements[9] *= f, kt.elements[10] *= f, t.setFromRotationMatrix(kt), n.x = s, n.y = o, n.z = a, this;
  }
  makePerspective(e, t, n, r, s, o, a = hn) {
    const l = this.elements, c = 2 * s / (t - e), h = 2 * s / (n - r), f = (t + e) / (t - e), d = (n + r) / (n - r);
    let m, g;
    if (a === hn)
      m = -(o + s) / (o - s), g = -2 * o * s / (o - s);
    else if (a === zr)
      m = -o / (o - s), g = -o * s / (o - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return l[0] = c, l[4] = 0, l[8] = f, l[12] = 0, l[1] = 0, l[5] = h, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = m, l[14] = g, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, s, o, a = hn) {
    const l = this.elements, c = 1 / (t - e), h = 1 / (n - r), f = 1 / (o - s), d = (t + e) * c, m = (n + r) * h;
    let g, _;
    if (a === hn)
      g = (o + s) * f, _ = -2 * f;
    else if (a === zr)
      g = s * f, _ = -1 * f;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -m, l[2] = 0, l[6] = 0, l[10] = _, l[14] = -g, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const ti = /* @__PURE__ */ new P(), kt = /* @__PURE__ */ new st(), Hh = /* @__PURE__ */ new P(0, 0, 0), Vh = /* @__PURE__ */ new P(1, 1, 1), yn = /* @__PURE__ */ new P(), ar = /* @__PURE__ */ new P(), Rt = /* @__PURE__ */ new P(), co = /* @__PURE__ */ new st(), ho = /* @__PURE__ */ new Yn();
class pn {
  constructor(e = 0, t = 0, n = 0, r = pn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, r = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const r = e.elements, s = r[0], o = r[4], a = r[8], l = r[1], c = r[5], h = r[9], f = r[2], d = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(mt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-o, s)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-mt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, m), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-f, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(mt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-f, m), this._z = Math.atan2(-o, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-mt(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(d, m), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-o, c));
        break;
      case "YZX":
        this._z = Math.asin(mt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-f, s)) : (this._x = 0, this._y = Math.atan2(a, m));
        break;
      case "XZY":
        this._z = Math.asin(-mt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(a, s)) : (this._x = Math.atan2(-h, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return co.makeRotationFromQuaternion(e), this.setFromRotationMatrix(co, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return ho.setFromEuler(this), this.setFromQuaternion(ho, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
pn.DEFAULT_ORDER = "XYZ";
class Dl {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Gh = 0;
const uo = /* @__PURE__ */ new P(), ni = /* @__PURE__ */ new Yn(), rn = /* @__PURE__ */ new st(), or = /* @__PURE__ */ new P(), Ui = /* @__PURE__ */ new P(), Wh = /* @__PURE__ */ new P(), Xh = /* @__PURE__ */ new Yn(), fo = /* @__PURE__ */ new P(1, 0, 0), po = /* @__PURE__ */ new P(0, 1, 0), mo = /* @__PURE__ */ new P(0, 0, 1), go = { type: "added" }, Yh = { type: "removed" }, ii = { type: "childadded", child: null }, ls = { type: "childremoved", child: null };
class Et extends Zn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Gh++ }), this.uuid = un(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Et.DEFAULT_UP.clone();
    const e = new P(), t = new pn(), n = new Yn(), r = new P(1, 1, 1);
    function s() {
      n.setFromEuler(t, !1);
    }
    function o() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(s), n._onChange(o), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new st()
      },
      normalMatrix: {
        value: new Le()
      }
    }), this.matrix = new st(), this.matrixWorld = new st(), this.matrixAutoUpdate = Et.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Dl(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return ni.setFromAxisAngle(e, t), this.quaternion.multiply(ni), this;
  }
  rotateOnWorldAxis(e, t) {
    return ni.setFromAxisAngle(e, t), this.quaternion.premultiply(ni), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(fo, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(po, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(mo, e);
  }
  translateOnAxis(e, t) {
    return uo.copy(e).applyQuaternion(this.quaternion), this.position.add(uo.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(fo, e);
  }
  translateY(e) {
    return this.translateOnAxis(po, e);
  }
  translateZ(e) {
    return this.translateOnAxis(mo, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(rn.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? or.copy(e) : or.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Ui.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? rn.lookAt(Ui, or, this.up) : rn.lookAt(or, Ui, this.up), this.quaternion.setFromRotationMatrix(rn), r && (rn.extractRotation(r.matrixWorld), ni.setFromRotationMatrix(rn), this.quaternion.premultiply(ni.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(go), ii.child = e, this.dispatchEvent(ii), ii.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Yh), ls.child = e, this.dispatchEvent(ls), ls.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), rn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), rn.multiply(e.parent.matrixWorld)), e.applyMatrix4(rn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(go), ii.child = e, this.dispatchEvent(ii), ii.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const o = this.children[n].getObjectByProperty(e, t);
      if (o !== void 0)
        return o;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const r = this.children;
    for (let s = 0, o = r.length; s < o; s++)
      r[s].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ui, e, Wh), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ui, Xh, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
      const r = this.children;
      for (let s = 0, o = r.length; s < o; s++)
        r[s].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((a) => ({
      boxInitialized: a.boxInitialized,
      boxMin: a.box.min.toArray(),
      boxMax: a.box.max.toArray(),
      sphereInitialized: a.sphereInitialized,
      sphereRadius: a.sphere.radius,
      sphereCenter: a.sphere.center.toArray()
    })), r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = {
      center: r.boundingSphere.center.toArray(),
      radius: r.boundingSphere.radius
    }), this.boundingBox !== null && (r.boundingBox = {
      min: r.boundingBox.min.toArray(),
      max: r.boundingBox.max.toArray()
    }));
    function s(a, l) {
      return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(e.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const l = a.shapes;
        if (Array.isArray(l))
          for (let c = 0, h = l.length; c < h; c++) {
            const f = l[c];
            s(e.shapes, f);
          }
        else
          s(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const a = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          a.push(s(e.materials, this.material[l]));
        r.material = a;
      } else
        r.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let a = 0; a < this.children.length; a++)
        r.children.push(this.children[a].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const l = this.animations[a];
        r.animations.push(s(e.animations, l));
      }
    }
    if (t) {
      const a = o(e.geometries), l = o(e.materials), c = o(e.textures), h = o(e.images), f = o(e.shapes), d = o(e.skeletons), m = o(e.animations), g = o(e.nodes);
      a.length > 0 && (n.geometries = a), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), f.length > 0 && (n.shapes = f), d.length > 0 && (n.skeletons = d), m.length > 0 && (n.animations = m), g.length > 0 && (n.nodes = g);
    }
    return n.object = r, n;
    function o(a) {
      const l = [];
      for (const c in a) {
        const h = a[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
Et.DEFAULT_UP = /* @__PURE__ */ new P(0, 1, 0);
Et.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Ht = /* @__PURE__ */ new P(), sn = /* @__PURE__ */ new P(), cs = /* @__PURE__ */ new P(), an = /* @__PURE__ */ new P(), ri = /* @__PURE__ */ new P(), si = /* @__PURE__ */ new P(), _o = /* @__PURE__ */ new P(), hs = /* @__PURE__ */ new P(), us = /* @__PURE__ */ new P(), fs = /* @__PURE__ */ new P(), ds = /* @__PURE__ */ new lt(), ps = /* @__PURE__ */ new lt(), ms = /* @__PURE__ */ new lt();
class Nt {
  constructor(e = new P(), t = new P(), n = new P()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), Ht.subVectors(e, t), r.cross(Ht);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, r, s) {
    Ht.subVectors(r, t), sn.subVectors(n, t), cs.subVectors(e, t);
    const o = Ht.dot(Ht), a = Ht.dot(sn), l = Ht.dot(cs), c = sn.dot(sn), h = sn.dot(cs), f = o * c - a * a;
    if (f === 0)
      return s.set(0, 0, 0), null;
    const d = 1 / f, m = (c * l - a * h) * d, g = (o * h - a * l) * d;
    return s.set(1 - m - g, g, m);
  }
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, an) === null ? !1 : an.x >= 0 && an.y >= 0 && an.x + an.y <= 1;
  }
  static getInterpolation(e, t, n, r, s, o, a, l) {
    return this.getBarycoord(e, t, n, r, an) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, an.x), l.addScaledVector(o, an.y), l.addScaledVector(a, an.z), l);
  }
  static getInterpolatedAttribute(e, t, n, r, s, o) {
    return ds.setScalar(0), ps.setScalar(0), ms.setScalar(0), ds.fromBufferAttribute(e, t), ps.fromBufferAttribute(e, n), ms.fromBufferAttribute(e, r), o.setScalar(0), o.addScaledVector(ds, s.x), o.addScaledVector(ps, s.y), o.addScaledVector(ms, s.z), o;
  }
  static isFrontFacing(e, t, n, r) {
    return Ht.subVectors(n, t), sn.subVectors(e, t), Ht.cross(sn).dot(r) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return Ht.subVectors(this.c, this.b), sn.subVectors(this.a, this.b), Ht.cross(sn).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Nt.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Nt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, r, s) {
    return Nt.getInterpolation(e, this.a, this.b, this.c, t, n, r, s);
  }
  containsPoint(e) {
    return Nt.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Nt.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, s = this.c;
    let o, a;
    ri.subVectors(r, n), si.subVectors(s, n), hs.subVectors(e, n);
    const l = ri.dot(hs), c = si.dot(hs);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    us.subVectors(e, r);
    const h = ri.dot(us), f = si.dot(us);
    if (h >= 0 && f <= h)
      return t.copy(r);
    const d = l * f - h * c;
    if (d <= 0 && l >= 0 && h <= 0)
      return o = l / (l - h), t.copy(n).addScaledVector(ri, o);
    fs.subVectors(e, s);
    const m = ri.dot(fs), g = si.dot(fs);
    if (g >= 0 && m <= g)
      return t.copy(s);
    const _ = m * c - l * g;
    if (_ <= 0 && c >= 0 && g <= 0)
      return a = c / (c - g), t.copy(n).addScaledVector(si, a);
    const p = h * g - m * f;
    if (p <= 0 && f - h >= 0 && m - g >= 0)
      return _o.subVectors(s, r), a = (f - h) / (f - h + (m - g)), t.copy(r).addScaledVector(_o, a);
    const u = 1 / (p + _ + d);
    return o = _ * u, a = d * u, t.copy(n).addScaledVector(ri, o).addScaledVector(si, a);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const Il = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Mn = { h: 0, s: 0, l: 0 }, lr = { h: 0, s: 0, l: 0 };
function gs(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class Xe {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = It) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Ge.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, r = Ge.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, Ge.toWorkingColorSpace(this, r), this;
  }
  setHSL(e, t, n, r = Ge.workingColorSpace) {
    if (e = Ch(e, 1), t = mt(t, 0, 1), n = mt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, o = 2 * n - s;
      this.r = gs(o, s, e + 1 / 3), this.g = gs(o, s, e), this.b = gs(o, s, e - 1 / 3);
    }
    return Ge.toWorkingColorSpace(this, r), this;
  }
  setStyle(e, t = It) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const o = r[1], a = r[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              t
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              t
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = r[1], o = s.length;
      if (o === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          t
        );
      if (o === 6)
        return this.setHex(parseInt(s, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = It) {
    const n = Il[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = fn(e.r), this.g = fn(e.g), this.b = fn(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = yi(e.r), this.g = yi(e.g), this.b = yi(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = It) {
    return Ge.fromWorkingColorSpace(xt.copy(this), e), Math.round(mt(xt.r * 255, 0, 255)) * 65536 + Math.round(mt(xt.g * 255, 0, 255)) * 256 + Math.round(mt(xt.b * 255, 0, 255));
  }
  getHexString(e = It) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = Ge.workingColorSpace) {
    Ge.fromWorkingColorSpace(xt.copy(this), t);
    const n = xt.r, r = xt.g, s = xt.b, o = Math.max(n, r, s), a = Math.min(n, r, s);
    let l, c;
    const h = (a + o) / 2;
    if (a === o)
      l = 0, c = 0;
    else {
      const f = o - a;
      switch (c = h <= 0.5 ? f / (o + a) : f / (2 - o - a), o) {
        case n:
          l = (r - s) / f + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / f + 2;
          break;
        case s:
          l = (n - r) / f + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = h, e;
  }
  getRGB(e, t = Ge.workingColorSpace) {
    return Ge.fromWorkingColorSpace(xt.copy(this), t), e.r = xt.r, e.g = xt.g, e.b = xt.b, e;
  }
  getStyle(e = It) {
    Ge.fromWorkingColorSpace(xt.copy(this), e);
    const t = xt.r, n = xt.g, r = xt.b;
    return e !== It ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(Mn), this.setHSL(Mn.h + e, Mn.s + t, Mn.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Mn), e.getHSL(lr);
    const n = Qr(Mn.h, lr.h, t), r = Qr(Mn.s, lr.s, t), s = Qr(Mn.l, lr.l, t);
    return this.setHSL(n, r, s), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, r = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * n + s[6] * r, this.g = s[1] * t + s[4] * n + s[7] * r, this.b = s[2] * t + s[5] * n + s[8] * r, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const xt = /* @__PURE__ */ new Xe();
Xe.NAMES = Il;
let qh = 0;
class Ri extends Zn {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(e) {
  }
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: qh++ }), this.uuid = un(), this.name = "", this.blending = vi, this.side = wn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = Ns, this.blendDst = Fs, this.blendEquation = zn, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Xe(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Mi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = eo, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = jn, this.stencilZFail = jn, this.stencilZPass = jn, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== vi && (n.blending = this.blending), this.side !== wn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== Ns && (n.blendSrc = this.blendSrc), this.blendDst !== Fs && (n.blendDst = this.blendDst), this.blendEquation !== zn && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== Mi && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== eo && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== jn && (n.stencilFail = this.stencilFail), this.stencilZFail !== jn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== jn && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const o = [];
      for (const a in s) {
        const l = s[a];
        delete l.metadata, o.push(l);
      }
      return o;
    }
    if (t) {
      const s = r(e.textures), o = r(e.images);
      s.length > 0 && (n.textures = s), o.length > 0 && (n.images = o);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const r = t.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s)
        n[s] = t[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class Ua extends Ri {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.color = new Xe(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new pn(), this.combine = gl, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const ct = /* @__PURE__ */ new P(), cr = /* @__PURE__ */ new se();
class Xt {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = ya, this.updateRanges = [], this.gpuType = cn, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        cr.fromBufferAttribute(this, t), cr.applyMatrix3(e), this.setXY(t, cr.x, cr.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        ct.fromBufferAttribute(this, t), ct.applyMatrix3(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.applyMatrix4(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.applyNormalMatrix(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.transformDirection(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = jt(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = je(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = je(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = je(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = je(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = je(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = je(t, this.array), n = je(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = je(t, this.array), n = je(n, this.array), r = je(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, s) {
    return e *= this.itemSize, this.normalized && (t = je(t, this.array), n = je(n, this.array), r = je(r, this.array), s = je(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = s, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== ya && (e.usage = this.usage), e;
  }
}
class Ul extends Xt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Nl extends Xt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class Ft extends Xt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let Zh = 0;
const Dt = /* @__PURE__ */ new st(), _s = /* @__PURE__ */ new Et(), ai = /* @__PURE__ */ new P(), Ct = /* @__PURE__ */ new ji(), Ni = /* @__PURE__ */ new ji(), dt = /* @__PURE__ */ new P();
class pt extends Zn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Zh++ }), this.uuid = un(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Cl(e) ? Nl : Ul)(e, 1) : this.index = e, this;
  }
  setIndirect(e) {
    return this.indirect = e, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Le().getNormalMatrix(e);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return Dt.makeRotationFromQuaternion(e), this.applyMatrix4(Dt), this;
  }
  rotateX(e) {
    return Dt.makeRotationX(e), this.applyMatrix4(Dt), this;
  }
  rotateY(e) {
    return Dt.makeRotationY(e), this.applyMatrix4(Dt), this;
  }
  rotateZ(e) {
    return Dt.makeRotationZ(e), this.applyMatrix4(Dt), this;
  }
  translate(e, t, n) {
    return Dt.makeTranslation(e, t, n), this.applyMatrix4(Dt), this;
  }
  scale(e, t, n) {
    return Dt.makeScale(e, t, n), this.applyMatrix4(Dt), this;
  }
  lookAt(e) {
    return _s.lookAt(e), _s.updateMatrix(), this.applyMatrix4(_s.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ai).negate(), this.translate(ai.x, ai.y, ai.z), this;
  }
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const o = e[r];
        n.push(o.x, o.y, o.z || 0);
      }
      this.setAttribute("position", new Ft(n, 3));
    } else {
      for (let n = 0, r = t.count; n < r; n++) {
        const s = e[n];
        t.setXYZ(n, s.x, s.y, s.z || 0);
      }
      e.length > t.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new ji());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new P(-1 / 0, -1 / 0, -1 / 0),
        new P(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const s = t[n];
          Ct.setFromBufferAttribute(s), this.morphTargetsRelative ? (dt.addVectors(this.boundingBox.min, Ct.min), this.boundingBox.expandByPoint(dt), dt.addVectors(this.boundingBox.max, Ct.max), this.boundingBox.expandByPoint(dt)) : (this.boundingBox.expandByPoint(Ct.min), this.boundingBox.expandByPoint(Ct.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new qr());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new P(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Ct.setFromBufferAttribute(e), t)
        for (let s = 0, o = t.length; s < o; s++) {
          const a = t[s];
          Ni.setFromBufferAttribute(a), this.morphTargetsRelative ? (dt.addVectors(Ct.min, Ni.min), Ct.expandByPoint(dt), dt.addVectors(Ct.max, Ni.max), Ct.expandByPoint(dt)) : (Ct.expandByPoint(Ni.min), Ct.expandByPoint(Ni.max));
        }
      Ct.getCenter(n);
      let r = 0;
      for (let s = 0, o = e.count; s < o; s++)
        dt.fromBufferAttribute(e, s), r = Math.max(r, n.distanceToSquared(dt));
      if (t)
        for (let s = 0, o = t.length; s < o; s++) {
          const a = t[s], l = this.morphTargetsRelative;
          for (let c = 0, h = a.count; c < h; c++)
            dt.fromBufferAttribute(a, c), l && (ai.fromBufferAttribute(e, c), dt.add(ai)), r = Math.max(r, n.distanceToSquared(dt));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, r = t.normal, s = t.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Xt(new Float32Array(4 * n.count), 4));
    const o = this.getAttribute("tangent"), a = [], l = [];
    for (let C = 0; C < n.count; C++)
      a[C] = new P(), l[C] = new P();
    const c = new P(), h = new P(), f = new P(), d = new se(), m = new se(), g = new se(), _ = new P(), p = new P();
    function u(C, S, v) {
      c.fromBufferAttribute(n, C), h.fromBufferAttribute(n, S), f.fromBufferAttribute(n, v), d.fromBufferAttribute(s, C), m.fromBufferAttribute(s, S), g.fromBufferAttribute(s, v), h.sub(c), f.sub(c), m.sub(d), g.sub(d);
      const A = 1 / (m.x * g.y - g.x * m.y);
      isFinite(A) && (_.copy(h).multiplyScalar(g.y).addScaledVector(f, -m.y).multiplyScalar(A), p.copy(f).multiplyScalar(m.x).addScaledVector(h, -g.x).multiplyScalar(A), a[C].add(_), a[S].add(_), a[v].add(_), l[C].add(p), l[S].add(p), l[v].add(p));
    }
    let R = this.groups;
    R.length === 0 && (R = [{
      start: 0,
      count: e.count
    }]);
    for (let C = 0, S = R.length; C < S; ++C) {
      const v = R[C], A = v.start, N = v.count;
      for (let F = A, H = A + N; F < H; F += 3)
        u(
          e.getX(F + 0),
          e.getX(F + 1),
          e.getX(F + 2)
        );
    }
    const E = new P(), y = new P(), O = new P(), w = new P();
    function b(C) {
      O.fromBufferAttribute(r, C), w.copy(O);
      const S = a[C];
      E.copy(S), E.sub(O.multiplyScalar(O.dot(S))).normalize(), y.crossVectors(w, S);
      const A = y.dot(l[C]) < 0 ? -1 : 1;
      o.setXYZW(C, E.x, E.y, E.z, A);
    }
    for (let C = 0, S = R.length; C < S; ++C) {
      const v = R[C], A = v.start, N = v.count;
      for (let F = A, H = A + N; F < H; F += 3)
        b(e.getX(F + 0)), b(e.getX(F + 1)), b(e.getX(F + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Xt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, m = n.count; d < m; d++)
          n.setXYZ(d, 0, 0, 0);
      const r = new P(), s = new P(), o = new P(), a = new P(), l = new P(), c = new P(), h = new P(), f = new P();
      if (e)
        for (let d = 0, m = e.count; d < m; d += 3) {
          const g = e.getX(d + 0), _ = e.getX(d + 1), p = e.getX(d + 2);
          r.fromBufferAttribute(t, g), s.fromBufferAttribute(t, _), o.fromBufferAttribute(t, p), h.subVectors(o, s), f.subVectors(r, s), h.cross(f), a.fromBufferAttribute(n, g), l.fromBufferAttribute(n, _), c.fromBufferAttribute(n, p), a.add(h), l.add(h), c.add(h), n.setXYZ(g, a.x, a.y, a.z), n.setXYZ(_, l.x, l.y, l.z), n.setXYZ(p, c.x, c.y, c.z);
        }
      else
        for (let d = 0, m = t.count; d < m; d += 3)
          r.fromBufferAttribute(t, d + 0), s.fromBufferAttribute(t, d + 1), o.fromBufferAttribute(t, d + 2), h.subVectors(o, s), f.subVectors(r, s), h.cross(f), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      dt.fromBufferAttribute(e, t), dt.normalize(), e.setXYZ(t, dt.x, dt.y, dt.z);
  }
  toNonIndexed() {
    function e(a, l) {
      const c = a.array, h = a.itemSize, f = a.normalized, d = new c.constructor(l.length * h);
      let m = 0, g = 0;
      for (let _ = 0, p = l.length; _ < p; _++) {
        a.isInterleavedBufferAttribute ? m = l[_] * a.data.stride + a.offset : m = l[_] * h;
        for (let u = 0; u < h; u++)
          d[g++] = c[m++];
      }
      return new Xt(d, h, f);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new pt(), n = this.index.array, r = this.attributes;
    for (const a in r) {
      const l = r[a], c = e(l, n);
      t.setAttribute(a, c);
    }
    const s = this.morphAttributes;
    for (const a in s) {
      const l = [], c = s[a];
      for (let h = 0, f = c.length; h < f; h++) {
        const d = c[h], m = e(d, n);
        l.push(m);
      }
      t.morphAttributes[a] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, l = o.length; a < l; a++) {
      const c = o[a];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let f = 0, d = c.length; f < d; f++) {
        const m = c[f];
        h.push(m.toJSON(e.data));
      }
      h.length > 0 && (r[l] = h, s = !0);
    }
    s && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const o = this.groups;
    o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o)));
    const a = this.boundingSphere;
    return a !== null && (e.data.boundingSphere = {
      center: a.center.toArray(),
      radius: a.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone(t));
    const r = e.attributes;
    for (const c in r) {
      const h = r[c];
      this.setAttribute(c, h.clone(t));
    }
    const s = e.morphAttributes;
    for (const c in s) {
      const h = [], f = s[c];
      for (let d = 0, m = f.length; d < m; d++)
        h.push(f[d].clone(t));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const o = e.groups;
    for (let c = 0, h = o.length; c < h; c++) {
      const f = o[c];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const a = e.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const vo = /* @__PURE__ */ new st(), In = /* @__PURE__ */ new Ia(), hr = /* @__PURE__ */ new qr(), xo = /* @__PURE__ */ new P(), ur = /* @__PURE__ */ new P(), fr = /* @__PURE__ */ new P(), dr = /* @__PURE__ */ new P(), vs = /* @__PURE__ */ new P(), pr = /* @__PURE__ */ new P(), yo = /* @__PURE__ */ new P(), mr = /* @__PURE__ */ new P();
class Gt extends Et {
  constructor(e = new pt(), t = new Ua()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, o = r.length; s < o; s++) {
          const a = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = s;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, o = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const a = this.morphTargetInfluences;
    if (s && a) {
      pr.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const h = a[l], f = s[l];
        h !== 0 && (vs.fromBufferAttribute(f, e), o ? pr.addScaledVector(vs, h) : pr.addScaledVector(vs.sub(t), h));
      }
      t.add(pr);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), hr.copy(n.boundingSphere), hr.applyMatrix4(s), In.copy(e.ray).recast(e.near), !(hr.containsPoint(In.origin) === !1 && (In.intersectSphere(hr, xo) === null || In.origin.distanceToSquared(xo) > (e.far - e.near) ** 2)) && (vo.copy(s).invert(), In.copy(e.ray).applyMatrix4(vo), !(n.boundingBox !== null && In.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, In)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const s = this.geometry, o = this.material, a = s.index, l = s.attributes.position, c = s.attributes.uv, h = s.attributes.uv1, f = s.attributes.normal, d = s.groups, m = s.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], u = o[p.materialIndex], R = Math.max(p.start, m.start), E = Math.min(a.count, Math.min(p.start + p.count, m.start + m.count));
          for (let y = R, O = E; y < O; y += 3) {
            const w = a.getX(y), b = a.getX(y + 1), C = a.getX(y + 2);
            r = gr(this, u, e, n, c, h, f, w, b, C), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const g = Math.max(0, m.start), _ = Math.min(a.count, m.start + m.count);
        for (let p = g, u = _; p < u; p += 3) {
          const R = a.getX(p), E = a.getX(p + 1), y = a.getX(p + 2);
          r = gr(this, o, e, n, c, h, f, R, E, y), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], u = o[p.materialIndex], R = Math.max(p.start, m.start), E = Math.min(l.count, Math.min(p.start + p.count, m.start + m.count));
          for (let y = R, O = E; y < O; y += 3) {
            const w = y, b = y + 1, C = y + 2;
            r = gr(this, u, e, n, c, h, f, w, b, C), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const g = Math.max(0, m.start), _ = Math.min(l.count, m.start + m.count);
        for (let p = g, u = _; p < u; p += 3) {
          const R = p, E = p + 1, y = p + 2;
          r = gr(this, o, e, n, c, h, f, R, E, y), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
  }
}
function Kh(i, e, t, n, r, s, o, a) {
  let l;
  if (e.side === At ? l = n.intersectTriangle(o, s, r, !0, a) : l = n.intersectTriangle(r, s, o, e.side === wn, a), l === null) return null;
  mr.copy(a), mr.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(mr);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: mr.clone(),
    object: i
  };
}
function gr(i, e, t, n, r, s, o, a, l, c) {
  i.getVertexPosition(a, ur), i.getVertexPosition(l, fr), i.getVertexPosition(c, dr);
  const h = Kh(i, e, t, n, ur, fr, dr, yo);
  if (h) {
    const f = new P();
    Nt.getBarycoord(yo, ur, fr, dr, f), r && (h.uv = Nt.getInterpolatedAttribute(r, a, l, c, f, new se())), s && (h.uv1 = Nt.getInterpolatedAttribute(s, a, l, c, f, new se())), o && (h.normal = Nt.getInterpolatedAttribute(o, a, l, c, f, new P()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a,
      b: l,
      c,
      normal: new P(),
      materialIndex: 0
    };
    Nt.getNormal(ur, fr, dr, d.normal), h.face = d, h.barycoord = f;
  }
  return h;
}
class $i extends pt {
  constructor(e = 1, t = 1, n = 1, r = 1, s = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: o
    };
    const a = this;
    r = Math.floor(r), s = Math.floor(s), o = Math.floor(o);
    const l = [], c = [], h = [], f = [];
    let d = 0, m = 0;
    g("z", "y", "x", -1, -1, n, t, e, o, s, 0), g("z", "y", "x", 1, -1, n, t, -e, o, s, 1), g("x", "z", "y", 1, 1, e, n, t, r, o, 2), g("x", "z", "y", 1, -1, e, n, -t, r, o, 3), g("x", "y", "z", 1, -1, e, t, n, r, s, 4), g("x", "y", "z", -1, -1, e, t, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new Ft(c, 3)), this.setAttribute("normal", new Ft(h, 3)), this.setAttribute("uv", new Ft(f, 2));
    function g(_, p, u, R, E, y, O, w, b, C, S) {
      const v = y / b, A = O / C, N = y / 2, F = O / 2, H = w / 2, X = b + 1, W = C + 1;
      let q = 0, V = 0;
      const te = new P();
      for (let oe = 0; oe < W; oe++) {
        const me = oe * A - F;
        for (let Ae = 0; Ae < X; Ae++) {
          const Ne = Ae * v - N;
          te[_] = Ne * R, te[p] = me * E, te[u] = H, c.push(te.x, te.y, te.z), te[_] = 0, te[p] = 0, te[u] = w > 0 ? 1 : -1, h.push(te.x, te.y, te.z), f.push(Ae / b), f.push(1 - oe / C), q += 1;
        }
      }
      for (let oe = 0; oe < C; oe++)
        for (let me = 0; me < b; me++) {
          const Ae = d + me + X * oe, Ne = d + me + X * (oe + 1), Y = d + (me + 1) + X * (oe + 1), J = d + (me + 1) + X * oe;
          l.push(Ae, Ne, J), l.push(Ne, Y, J), V += 6;
        }
      a.addGroup(m, V, S), m += V, d += q;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new $i(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Ai(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const r = i[t][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = r.clone() : Array.isArray(r) ? e[t][n] = r.slice() : e[t][n] = r;
    }
  }
  return e;
}
function Mt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = Ai(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function jh(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function Fl(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Ge.workingColorSpace;
}
const $h = { clone: Ai, merge: Mt };
var Jh = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Qh = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Rn extends Ri {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Jh, this.fragmentShader = Qh, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Ai(e.uniforms), this.uniformsGroups = jh(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const o = this.uniforms[r].value;
      o && o.isTexture ? t.uniforms[r] = {
        type: "t",
        value: o.toJSON(e).uuid
      } : o && o.isColor ? t.uniforms[r] = {
        type: "c",
        value: o.getHex()
      } : o && o.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: o.toArray()
      } : o && o.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: o.toArray()
      } : o && o.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: o.toArray()
      } : o && o.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: o.toArray()
      } : o && o.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: o.toArray()
      } : t.uniforms[r] = {
        value: o
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class Ol extends Et {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new st(), this.projectionMatrix = new st(), this.projectionMatrixInverse = new st(), this.coordinateSystem = hn;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Sn = /* @__PURE__ */ new P(), Mo = /* @__PURE__ */ new se(), So = /* @__PURE__ */ new se();
class Ut extends Ol {
  constructor(e = 50, t = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Ma * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(Fr * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Ma * 2 * Math.atan(
      Math.tan(Fr * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(e, t, n) {
    Sn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Sn.x, Sn.y).multiplyScalar(-e / Sn.z), Sn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Sn.x, Sn.y).multiplyScalar(-e / Sn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, Mo, So), t.subVectors(So, Mo);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(e, t, n, r, s, o) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(Fr * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, s = -0.5 * r;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = o.fullWidth, c = o.fullHeight;
      s += o.offsetX * r / l, t -= o.offsetY * n / c, r *= o.width / l, n *= o.height / c;
    }
    const a = this.filmOffset;
    a !== 0 && (s += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, t, t - n, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const oi = -90, li = 1;
class eu extends Et {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Ut(oi, li, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Ut(oi, li, e, t);
    s.layers = this.layers, this.add(s);
    const o = new Ut(oi, li, e, t);
    o.layers = this.layers, this.add(o);
    const a = new Ut(oi, li, e, t);
    a.layers = this.layers, this.add(a);
    const l = new Ut(oi, li, e, t);
    l.layers = this.layers, this.add(l);
    const c = new Ut(oi, li, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, s, o, a, l] = t;
    for (const c of t) this.remove(c);
    if (e === hn)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === zr)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, o, a, l, c, h] = this.children, f = e.getRenderTarget(), d = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), g = e.xr.enabled;
    e.xr.enabled = !1;
    const _ = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, r), e.render(t, s), e.setRenderTarget(n, 1, r), e.render(t, o), e.setRenderTarget(n, 2, r), e.render(t, a), e.setRenderTarget(n, 3, r), e.render(t, l), e.setRenderTarget(n, 4, r), e.render(t, c), n.texture.generateMipmaps = _, e.setRenderTarget(n, 5, r), e.render(t, h), e.setRenderTarget(f, d, m), e.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class Bl extends St {
  constructor(e, t, n, r, s, o, a, l, c, h) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : Si, super(e, t, n, r, s, o, a, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class tu extends Xn {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new Bl(r, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : $t;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new $i(5, 5, 5), s = new Rn({
      name: "CubemapFromEquirect",
      uniforms: Ai(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: At,
      blending: Tn
    });
    s.uniforms.tEquirect.value = t;
    const o = new Gt(r, s), a = t.minFilter;
    return t.minFilter === Vn && (t.minFilter = $t), new eu(1, 10, this).update(e, o), t.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(e, t, n, r) {
    const s = e.getRenderTarget();
    for (let o = 0; o < 6; o++)
      e.setRenderTarget(this, o), e.clear(t, n, r);
    e.setRenderTarget(s);
  }
}
const xs = /* @__PURE__ */ new P(), nu = /* @__PURE__ */ new P(), iu = /* @__PURE__ */ new Le();
class En {
  constructor(e = new P(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, r) {
    return this.normal.set(e, t, n), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const r = xs.subVectors(n, t).cross(nu.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(xs), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : t.copy(e.start).addScaledVector(n, s);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || iu.getNormalMatrix(e), r = this.coplanarPoint(xs).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Un = /* @__PURE__ */ new qr(), _r = /* @__PURE__ */ new P();
class zl {
  constructor(e = new En(), t = new En(), n = new En(), r = new En(), s = new En(), o = new En()) {
    this.planes = [e, t, n, r, s, o];
  }
  set(e, t, n, r, s, o) {
    const a = this.planes;
    return a[0].copy(e), a[1].copy(t), a[2].copy(n), a[3].copy(r), a[4].copy(s), a[5].copy(o), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = hn) {
    const n = this.planes, r = e.elements, s = r[0], o = r[1], a = r[2], l = r[3], c = r[4], h = r[5], f = r[6], d = r[7], m = r[8], g = r[9], _ = r[10], p = r[11], u = r[12], R = r[13], E = r[14], y = r[15];
    if (n[0].setComponents(l - s, d - c, p - m, y - u).normalize(), n[1].setComponents(l + s, d + c, p + m, y + u).normalize(), n[2].setComponents(l + o, d + h, p + g, y + R).normalize(), n[3].setComponents(l - o, d - h, p - g, y - R).normalize(), n[4].setComponents(l - a, d - f, p - _, y - E).normalize(), t === hn)
      n[5].setComponents(l + a, d + f, p + _, y + E).normalize();
    else if (t === zr)
      n[5].setComponents(a, f, _, E).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), Un.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), Un.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(Un);
  }
  intersectsSprite(e) {
    return Un.center.set(0, 0, 0), Un.radius = 0.7071067811865476, Un.applyMatrix4(e.matrixWorld), this.intersectsSphere(Un);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, r = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = t[n];
      if (_r.x = r.normal.x > 0 ? e.max.x : e.min.x, _r.y = r.normal.y > 0 ? e.max.y : e.min.y, _r.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(_r) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function kl() {
  let i = null, e = !1, t = null, n = null;
  function r(s, o) {
    t(s, o), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (n = i.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      i = s;
    }
  };
}
function ru(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(a, l) {
    const c = a.array, h = a.usage, f = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, h), a.onUploadCallback();
    let m;
    if (c instanceof Float32Array)
      m = i.FLOAT;
    else if (c instanceof Uint16Array)
      a.isFloat16BufferAttribute ? m = i.HALF_FLOAT : m = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      m = i.SHORT;
    else if (c instanceof Uint32Array)
      m = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      m = i.INT;
    else if (c instanceof Int8Array)
      m = i.BYTE;
    else if (c instanceof Uint8Array)
      m = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      m = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: d,
      type: m,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: a.version,
      size: f
    };
  }
  function n(a, l, c) {
    const h = l.array, f = l.updateRanges;
    if (i.bindBuffer(c, a), f.length === 0)
      i.bufferSubData(c, 0, h);
    else {
      f.sort((m, g) => m.start - g.start);
      let d = 0;
      for (let m = 1; m < f.length; m++) {
        const g = f[d], _ = f[m];
        _.start <= g.start + g.count + 1 ? g.count = Math.max(
          g.count,
          _.start + _.count - g.start
        ) : (++d, f[d] = _);
      }
      f.length = d + 1;
      for (let m = 0, g = f.length; m < g; m++) {
        const _ = f[m];
        i.bufferSubData(
          c,
          _.start * h.BYTES_PER_ELEMENT,
          h,
          _.start,
          _.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), e.get(a);
  }
  function s(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const l = e.get(a);
    l && (i.deleteBuffer(l.buffer), e.delete(a));
  }
  function o(a, l) {
    if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
      const h = e.get(a);
      (!h || h.version < a.version) && e.set(a, {
        buffer: a.buffer,
        type: a.type,
        bytesPerElement: a.elementSize,
        version: a.version
      });
      return;
    }
    const c = e.get(a);
    if (c === void 0)
      e.set(a, t(a, l));
    else if (c.version < a.version) {
      if (c.size !== a.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, a, l), c.version = a.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: o
  };
}
class Zr extends pt {
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const s = e / 2, o = t / 2, a = Math.floor(n), l = Math.floor(r), c = a + 1, h = l + 1, f = e / a, d = t / l, m = [], g = [], _ = [], p = [];
    for (let u = 0; u < h; u++) {
      const R = u * d - o;
      for (let E = 0; E < c; E++) {
        const y = E * f - s;
        g.push(y, -R, 0), _.push(0, 0, 1), p.push(E / a), p.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++)
      for (let R = 0; R < a; R++) {
        const E = R + c * u, y = R + c * (u + 1), O = R + 1 + c * (u + 1), w = R + 1 + c * u;
        m.push(E, y, w), m.push(y, O, w);
      }
    this.setIndex(m), this.setAttribute("position", new Ft(g, 3)), this.setAttribute("normal", new Ft(_, 3)), this.setAttribute("uv", new Ft(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Zr(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var su = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, au = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, ou = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, lu = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, cu = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, hu = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, uu = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, fu = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, du = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, pu = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, mu = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, gu = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, _u = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, vu = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, xu = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, yu = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Mu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Su = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Eu = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, bu = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Tu = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Au = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, wu = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, Ru = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Cu = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Pu = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Lu = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Du = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Iu = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Uu = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Nu = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Fu = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Ou = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Bu = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, zu = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, ku = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Hu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Vu = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Gu = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Wu = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Xu = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Yu = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, qu = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Zu = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Ku = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, ju = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, $u = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Ju = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Qu = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, ef = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, tf = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, nf = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, rf = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, sf = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, af = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, of = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, lf = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, cf = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, hf = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, uf = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, ff = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, df = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, pf = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, mf = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, gf = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, _f = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, vf = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, xf = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, yf = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Mf = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, Sf = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Ef = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, bf = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Tf = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Af = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, wf = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Rf = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Cf = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Pf = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Lf = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Df = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, If = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Uf = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Nf = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Ff = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Of = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Bf = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, zf = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, kf = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Hf = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Vf = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Gf = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Wf = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Xf = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Yf = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, qf = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Zf = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Kf = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, jf = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, $f = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Jf = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Qf = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, ed = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, td = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, nd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, id = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, rd = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const sd = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, ad = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, od = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, ld = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, cd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, hd = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, ud = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, fd = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, dd = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, pd = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, md = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, gd = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, _d = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, vd = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, xd = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, yd = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Md = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Sd = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Ed = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, bd = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Td = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Ad = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, wd = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Rd = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Cd = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Pd = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Ld = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Dd = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Id = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Ud = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Nd = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Fd = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Od = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Bd = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ie = {
  alphahash_fragment: su,
  alphahash_pars_fragment: au,
  alphamap_fragment: ou,
  alphamap_pars_fragment: lu,
  alphatest_fragment: cu,
  alphatest_pars_fragment: hu,
  aomap_fragment: uu,
  aomap_pars_fragment: fu,
  batching_pars_vertex: du,
  batching_vertex: pu,
  begin_vertex: mu,
  beginnormal_vertex: gu,
  bsdfs: _u,
  iridescence_fragment: vu,
  bumpmap_pars_fragment: xu,
  clipping_planes_fragment: yu,
  clipping_planes_pars_fragment: Mu,
  clipping_planes_pars_vertex: Su,
  clipping_planes_vertex: Eu,
  color_fragment: bu,
  color_pars_fragment: Tu,
  color_pars_vertex: Au,
  color_vertex: wu,
  common: Ru,
  cube_uv_reflection_fragment: Cu,
  defaultnormal_vertex: Pu,
  displacementmap_pars_vertex: Lu,
  displacementmap_vertex: Du,
  emissivemap_fragment: Iu,
  emissivemap_pars_fragment: Uu,
  colorspace_fragment: Nu,
  colorspace_pars_fragment: Fu,
  envmap_fragment: Ou,
  envmap_common_pars_fragment: Bu,
  envmap_pars_fragment: zu,
  envmap_pars_vertex: ku,
  envmap_physical_pars_fragment: $u,
  envmap_vertex: Hu,
  fog_vertex: Vu,
  fog_pars_vertex: Gu,
  fog_fragment: Wu,
  fog_pars_fragment: Xu,
  gradientmap_pars_fragment: Yu,
  lightmap_pars_fragment: qu,
  lights_lambert_fragment: Zu,
  lights_lambert_pars_fragment: Ku,
  lights_pars_begin: ju,
  lights_toon_fragment: Ju,
  lights_toon_pars_fragment: Qu,
  lights_phong_fragment: ef,
  lights_phong_pars_fragment: tf,
  lights_physical_fragment: nf,
  lights_physical_pars_fragment: rf,
  lights_fragment_begin: sf,
  lights_fragment_maps: af,
  lights_fragment_end: of,
  logdepthbuf_fragment: lf,
  logdepthbuf_pars_fragment: cf,
  logdepthbuf_pars_vertex: hf,
  logdepthbuf_vertex: uf,
  map_fragment: ff,
  map_pars_fragment: df,
  map_particle_fragment: pf,
  map_particle_pars_fragment: mf,
  metalnessmap_fragment: gf,
  metalnessmap_pars_fragment: _f,
  morphinstance_vertex: vf,
  morphcolor_vertex: xf,
  morphnormal_vertex: yf,
  morphtarget_pars_vertex: Mf,
  morphtarget_vertex: Sf,
  normal_fragment_begin: Ef,
  normal_fragment_maps: bf,
  normal_pars_fragment: Tf,
  normal_pars_vertex: Af,
  normal_vertex: wf,
  normalmap_pars_fragment: Rf,
  clearcoat_normal_fragment_begin: Cf,
  clearcoat_normal_fragment_maps: Pf,
  clearcoat_pars_fragment: Lf,
  iridescence_pars_fragment: Df,
  opaque_fragment: If,
  packing: Uf,
  premultiplied_alpha_fragment: Nf,
  project_vertex: Ff,
  dithering_fragment: Of,
  dithering_pars_fragment: Bf,
  roughnessmap_fragment: zf,
  roughnessmap_pars_fragment: kf,
  shadowmap_pars_fragment: Hf,
  shadowmap_pars_vertex: Vf,
  shadowmap_vertex: Gf,
  shadowmask_pars_fragment: Wf,
  skinbase_vertex: Xf,
  skinning_pars_vertex: Yf,
  skinning_vertex: qf,
  skinnormal_vertex: Zf,
  specularmap_fragment: Kf,
  specularmap_pars_fragment: jf,
  tonemapping_fragment: $f,
  tonemapping_pars_fragment: Jf,
  transmission_fragment: Qf,
  transmission_pars_fragment: ed,
  uv_pars_fragment: td,
  uv_pars_vertex: nd,
  uv_vertex: id,
  worldpos_vertex: rd,
  background_vert: sd,
  background_frag: ad,
  backgroundCube_vert: od,
  backgroundCube_frag: ld,
  cube_vert: cd,
  cube_frag: hd,
  depth_vert: ud,
  depth_frag: fd,
  distanceRGBA_vert: dd,
  distanceRGBA_frag: pd,
  equirect_vert: md,
  equirect_frag: gd,
  linedashed_vert: _d,
  linedashed_frag: vd,
  meshbasic_vert: xd,
  meshbasic_frag: yd,
  meshlambert_vert: Md,
  meshlambert_frag: Sd,
  meshmatcap_vert: Ed,
  meshmatcap_frag: bd,
  meshnormal_vert: Td,
  meshnormal_frag: Ad,
  meshphong_vert: wd,
  meshphong_frag: Rd,
  meshphysical_vert: Cd,
  meshphysical_frag: Pd,
  meshtoon_vert: Ld,
  meshtoon_frag: Dd,
  points_vert: Id,
  points_frag: Ud,
  shadow_vert: Nd,
  shadow_frag: Fd,
  sprite_vert: Od,
  sprite_frag: Bd
}, ie = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Xe(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Le() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Le() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Le() },
    normalScale: { value: /* @__PURE__ */ new se(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Le() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Xe(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Xe(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Le() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Xe(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new se(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  }
}, Zt = {
  basic: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.fog
    ]),
    vertexShader: Ie.meshbasic_vert,
    fragmentShader: Ie.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new Xe(0) }
      }
    ]),
    vertexShader: Ie.meshlambert_vert,
    fragmentShader: Ie.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new Xe(0) },
        specular: { value: /* @__PURE__ */ new Xe(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Ie.meshphong_vert,
    fragmentShader: Ie.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.roughnessmap,
      ie.metalnessmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new Xe(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ie.meshphysical_vert,
    fragmentShader: Ie.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.gradientmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new Xe(0) }
      }
    ]),
    vertexShader: Ie.meshtoon_vert,
    fragmentShader: Ie.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ie.meshmatcap_vert,
    fragmentShader: Ie.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Mt([
      ie.points,
      ie.fog
    ]),
    vertexShader: Ie.points_vert,
    fragmentShader: Ie.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ie.linedashed_vert,
    fragmentShader: Ie.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.displacementmap
    ]),
    vertexShader: Ie.depth_vert,
    fragmentShader: Ie.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ie.meshnormal_vert,
    fragmentShader: Ie.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Mt([
      ie.sprite,
      ie.fog
    ]),
    vertexShader: Ie.sprite_vert,
    fragmentShader: Ie.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Le() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ie.background_vert,
    fragmentShader: Ie.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Le() }
    },
    vertexShader: Ie.backgroundCube_vert,
    fragmentShader: Ie.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ie.cube_vert,
    fragmentShader: Ie.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ie.equirect_vert,
    fragmentShader: Ie.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ Mt([
      ie.common,
      ie.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new P() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ie.distanceRGBA_vert,
    fragmentShader: Ie.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Mt([
      ie.lights,
      ie.fog,
      {
        color: { value: /* @__PURE__ */ new Xe(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ie.shadow_vert,
    fragmentShader: Ie.shadow_frag
  }
};
Zt.physical = {
  uniforms: /* @__PURE__ */ Mt([
    Zt.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new se(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Le() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Le() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Le() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Xe(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Le() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Le() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Le() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new se() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Le() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Xe(0) },
      specularColor: { value: /* @__PURE__ */ new Xe(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Le() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Le() },
      anisotropyVector: { value: /* @__PURE__ */ new se() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Le() }
    }
  ]),
  vertexShader: Ie.meshphysical_vert,
  fragmentShader: Ie.meshphysical_frag
};
const vr = { r: 0, b: 0, g: 0 }, Nn = /* @__PURE__ */ new pn(), zd = /* @__PURE__ */ new st();
function kd(i, e, t, n, r, s, o) {
  const a = new Xe(0);
  let l = s === !0 ? 0 : 1, c, h, f = null, d = 0, m = null;
  function g(R) {
    let E = R.isScene === !0 ? R.background : null;
    return E && E.isTexture && (E = (R.backgroundBlurriness > 0 ? t : e).get(E)), E;
  }
  function _(R) {
    let E = !1;
    const y = g(R);
    y === null ? u(a, l) : y && y.isColor && (u(y, 1), E = !0);
    const O = i.xr.getEnvironmentBlendMode();
    O === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : O === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || E) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(R, E) {
    const y = g(E);
    y && (y.isCubeTexture || y.mapping === Xr) ? (h === void 0 && (h = new Gt(
      new $i(1, 1, 1),
      new Rn({
        name: "BackgroundCubeMaterial",
        uniforms: Ai(Zt.backgroundCube.uniforms),
        vertexShader: Zt.backgroundCube.vertexShader,
        fragmentShader: Zt.backgroundCube.fragmentShader,
        side: At,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(O, w, b) {
      this.matrixWorld.copyPosition(b.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(h)), Nn.copy(E.backgroundRotation), Nn.x *= -1, Nn.y *= -1, Nn.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (Nn.y *= -1, Nn.z *= -1), h.material.uniforms.envMap.value = y, h.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = E.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = E.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(zd.makeRotationFromEuler(Nn)), h.material.toneMapped = Ge.getTransfer(y.colorSpace) !== Ke, (f !== y || d !== y.version || m !== i.toneMapping) && (h.material.needsUpdate = !0, f = y, d = y.version, m = i.toneMapping), h.layers.enableAll(), R.unshift(h, h.geometry, h.material, 0, 0, null)) : y && y.isTexture && (c === void 0 && (c = new Gt(
      new Zr(2, 2),
      new Rn({
        name: "BackgroundMaterial",
        uniforms: Ai(Zt.background.uniforms),
        vertexShader: Zt.background.vertexShader,
        fragmentShader: Zt.background.fragmentShader,
        side: wn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = y, c.material.uniforms.backgroundIntensity.value = E.backgroundIntensity, c.material.toneMapped = Ge.getTransfer(y.colorSpace) !== Ke, y.matrixAutoUpdate === !0 && y.updateMatrix(), c.material.uniforms.uvTransform.value.copy(y.matrix), (f !== y || d !== y.version || m !== i.toneMapping) && (c.material.needsUpdate = !0, f = y, d = y.version, m = i.toneMapping), c.layers.enableAll(), R.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function u(R, E) {
    R.getRGB(vr, Fl(i)), n.buffers.color.setClear(vr.r, vr.g, vr.b, E, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(R, E = 1) {
      a.set(R), l = E, u(a, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(R) {
      l = R, u(a, l);
    },
    render: _,
    addToRenderList: p
  };
}
function Hd(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = d(null);
  let s = r, o = !1;
  function a(v, A, N, F, H) {
    let X = !1;
    const W = f(F, N, A);
    s !== W && (s = W, c(s.object)), X = m(v, F, N, H), X && g(v, F, N, H), H !== null && e.update(H, i.ELEMENT_ARRAY_BUFFER), (X || o) && (o = !1, y(v, A, N, F), H !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(H).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(v) {
    return i.bindVertexArray(v);
  }
  function h(v) {
    return i.deleteVertexArray(v);
  }
  function f(v, A, N) {
    const F = N.wireframe === !0;
    let H = n[v.id];
    H === void 0 && (H = {}, n[v.id] = H);
    let X = H[A.id];
    X === void 0 && (X = {}, H[A.id] = X);
    let W = X[F];
    return W === void 0 && (W = d(l()), X[F] = W), W;
  }
  function d(v) {
    const A = [], N = [], F = [];
    for (let H = 0; H < t; H++)
      A[H] = 0, N[H] = 0, F[H] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: A,
      enabledAttributes: N,
      attributeDivisors: F,
      object: v,
      attributes: {},
      index: null
    };
  }
  function m(v, A, N, F) {
    const H = s.attributes, X = A.attributes;
    let W = 0;
    const q = N.getAttributes();
    for (const V in q)
      if (q[V].location >= 0) {
        const oe = H[V];
        let me = X[V];
        if (me === void 0 && (V === "instanceMatrix" && v.instanceMatrix && (me = v.instanceMatrix), V === "instanceColor" && v.instanceColor && (me = v.instanceColor)), oe === void 0 || oe.attribute !== me || me && oe.data !== me.data) return !0;
        W++;
      }
    return s.attributesNum !== W || s.index !== F;
  }
  function g(v, A, N, F) {
    const H = {}, X = A.attributes;
    let W = 0;
    const q = N.getAttributes();
    for (const V in q)
      if (q[V].location >= 0) {
        let oe = X[V];
        oe === void 0 && (V === "instanceMatrix" && v.instanceMatrix && (oe = v.instanceMatrix), V === "instanceColor" && v.instanceColor && (oe = v.instanceColor));
        const me = {};
        me.attribute = oe, oe && oe.data && (me.data = oe.data), H[V] = me, W++;
      }
    s.attributes = H, s.attributesNum = W, s.index = F;
  }
  function _() {
    const v = s.newAttributes;
    for (let A = 0, N = v.length; A < N; A++)
      v[A] = 0;
  }
  function p(v) {
    u(v, 0);
  }
  function u(v, A) {
    const N = s.newAttributes, F = s.enabledAttributes, H = s.attributeDivisors;
    N[v] = 1, F[v] === 0 && (i.enableVertexAttribArray(v), F[v] = 1), H[v] !== A && (i.vertexAttribDivisor(v, A), H[v] = A);
  }
  function R() {
    const v = s.newAttributes, A = s.enabledAttributes;
    for (let N = 0, F = A.length; N < F; N++)
      A[N] !== v[N] && (i.disableVertexAttribArray(N), A[N] = 0);
  }
  function E(v, A, N, F, H, X, W) {
    W === !0 ? i.vertexAttribIPointer(v, A, N, H, X) : i.vertexAttribPointer(v, A, N, F, H, X);
  }
  function y(v, A, N, F) {
    _();
    const H = F.attributes, X = N.getAttributes(), W = A.defaultAttributeValues;
    for (const q in X) {
      const V = X[q];
      if (V.location >= 0) {
        let te = H[q];
        if (te === void 0 && (q === "instanceMatrix" && v.instanceMatrix && (te = v.instanceMatrix), q === "instanceColor" && v.instanceColor && (te = v.instanceColor)), te !== void 0) {
          const oe = te.normalized, me = te.itemSize, Ae = e.get(te);
          if (Ae === void 0) continue;
          const Ne = Ae.buffer, Y = Ae.type, J = Ae.bytesPerElement, pe = Y === i.INT || Y === i.UNSIGNED_INT || te.gpuType === wa;
          if (te.isInterleavedBufferAttribute) {
            const ne = te.data, be = ne.stride, Re = te.offset;
            if (ne.isInstancedInterleavedBuffer) {
              for (let Ue = 0; Ue < V.locationSize; Ue++)
                u(V.location + Ue, ne.meshPerAttribute);
              v.isInstancedMesh !== !0 && F._maxInstanceCount === void 0 && (F._maxInstanceCount = ne.meshPerAttribute * ne.count);
            } else
              for (let Ue = 0; Ue < V.locationSize; Ue++)
                p(V.location + Ue);
            i.bindBuffer(i.ARRAY_BUFFER, Ne);
            for (let Ue = 0; Ue < V.locationSize; Ue++)
              E(
                V.location + Ue,
                me / V.locationSize,
                Y,
                oe,
                be * J,
                (Re + me / V.locationSize * Ue) * J,
                pe
              );
          } else {
            if (te.isInstancedBufferAttribute) {
              for (let ne = 0; ne < V.locationSize; ne++)
                u(V.location + ne, te.meshPerAttribute);
              v.isInstancedMesh !== !0 && F._maxInstanceCount === void 0 && (F._maxInstanceCount = te.meshPerAttribute * te.count);
            } else
              for (let ne = 0; ne < V.locationSize; ne++)
                p(V.location + ne);
            i.bindBuffer(i.ARRAY_BUFFER, Ne);
            for (let ne = 0; ne < V.locationSize; ne++)
              E(
                V.location + ne,
                me / V.locationSize,
                Y,
                oe,
                me * J,
                me / V.locationSize * ne * J,
                pe
              );
          }
        } else if (W !== void 0) {
          const oe = W[q];
          if (oe !== void 0)
            switch (oe.length) {
              case 2:
                i.vertexAttrib2fv(V.location, oe);
                break;
              case 3:
                i.vertexAttrib3fv(V.location, oe);
                break;
              case 4:
                i.vertexAttrib4fv(V.location, oe);
                break;
              default:
                i.vertexAttrib1fv(V.location, oe);
            }
        }
      }
    }
    R();
  }
  function O() {
    C();
    for (const v in n) {
      const A = n[v];
      for (const N in A) {
        const F = A[N];
        for (const H in F)
          h(F[H].object), delete F[H];
        delete A[N];
      }
      delete n[v];
    }
  }
  function w(v) {
    if (n[v.id] === void 0) return;
    const A = n[v.id];
    for (const N in A) {
      const F = A[N];
      for (const H in F)
        h(F[H].object), delete F[H];
      delete A[N];
    }
    delete n[v.id];
  }
  function b(v) {
    for (const A in n) {
      const N = n[A];
      if (N[v.id] === void 0) continue;
      const F = N[v.id];
      for (const H in F)
        h(F[H].object), delete F[H];
      delete N[v.id];
    }
  }
  function C() {
    S(), o = !0, s !== r && (s = r, c(s.object));
  }
  function S() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: a,
    reset: C,
    resetDefaultState: S,
    dispose: O,
    releaseStatesOfGeometry: w,
    releaseStatesOfProgram: b,
    initAttributes: _,
    enableAttribute: p,
    disableUnusedAttributes: R
  };
}
function Vd(i, e, t) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, h) {
    i.drawArrays(n, c, h), t.update(h, n, 1);
  }
  function o(c, h, f) {
    f !== 0 && (i.drawArraysInstanced(n, c, h, f), t.update(h, n, f));
  }
  function a(c, h, f) {
    if (f === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, f);
    let m = 0;
    for (let g = 0; g < f; g++)
      m += h[g];
    t.update(m, n, 1);
  }
  function l(c, h, f, d) {
    if (f === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let g = 0; g < c.length; g++)
        o(c[g], h[g], d[g]);
    else {
      m.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, d, 0, f);
      let g = 0;
      for (let _ = 0; _ < f; _++)
        g += h[_] * d[_];
      t.update(g, n, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = l;
}
function Gd(i, e, t, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const b = e.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function o(b) {
    return !(b !== Vt && n.convert(b) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(b) {
    const C = b === Ki && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(b !== dn && n.convert(b) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    b !== cn && !C);
  }
  function l(b) {
    if (b === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      b = "mediump";
    }
    return b === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = t.precision !== void 0 ? t.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const f = t.logarithmicDepthBuffer === !0, d = t.reverseDepthBuffer === !0 && e.has("EXT_clip_control"), m = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), u = i.getParameter(i.MAX_VERTEX_ATTRIBS), R = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), E = i.getParameter(i.MAX_VARYING_VECTORS), y = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), O = g > 0, w = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: c,
    logarithmicDepthBuffer: f,
    reverseDepthBuffer: d,
    maxTextures: m,
    maxVertexTextures: g,
    maxTextureSize: _,
    maxCubemapSize: p,
    maxAttributes: u,
    maxVertexUniforms: R,
    maxVaryings: E,
    maxFragmentUniforms: y,
    vertexTextures: O,
    maxSamples: w
  };
}
function Wd(i) {
  const e = this;
  let t = null, n = 0, r = !1, s = !1;
  const o = new En(), a = new Le(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, d) {
    const m = f.length !== 0 || d || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = d, n = f.length, m;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(f, d) {
    t = h(f, d, 0);
  }, this.setState = function(f, d, m) {
    const g = f.clippingPlanes, _ = f.clipIntersection, p = f.clipShadows, u = i.get(f);
    if (!r || g === null || g.length === 0 || s && !p)
      s ? h(null) : c();
    else {
      const R = s ? 0 : n, E = R * 4;
      let y = u.clippingState || null;
      l.value = y, y = h(g, d, E, m);
      for (let O = 0; O !== E; ++O)
        y[O] = t[O];
      u.clippingState = y, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += R;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(f, d, m, g) {
    const _ = f !== null ? f.length : 0;
    let p = null;
    if (_ !== 0) {
      if (p = l.value, g !== !0 || p === null) {
        const u = m + _ * 4, R = d.matrixWorldInverse;
        a.getNormalMatrix(R), (p === null || p.length < u) && (p = new Float32Array(u));
        for (let E = 0, y = m; E !== _; ++E, y += 4)
          o.copy(f[E]).applyMatrix4(R, a), o.normal.toArray(p, y), p[y + 3] = o.constant;
      }
      l.value = p, l.needsUpdate = !0;
    }
    return e.numPlanes = _, e.numIntersection = 0, p;
  }
}
function Xd(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(o, a) {
    return a === Ws ? o.mapping = Si : a === Xs && (o.mapping = Ei), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === Ws || a === Xs)
        if (e.has(o)) {
          const l = e.get(o).texture;
          return t(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const c = new tu(l.height);
            return c.fromEquirectangularTexture(i, o), e.set(o, c), o.addEventListener("dispose", r), t(c.texture, o.mapping);
          } else
            return null;
        }
    }
    return o;
  }
  function r(o) {
    const a = o.target;
    a.removeEventListener("dispose", r);
    const l = e.get(a);
    l !== void 0 && (e.delete(a), l.dispose());
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: s
  };
}
class Hl extends Ol {
  constructor(e = -1, t = 1, n = 1, r = -1, s = 0.1, o = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = s, this.far = o, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, r, s, o) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - e, o = n + e, a = r + t, l = r - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += c * this.view.offsetX, o = s + c * this.view.width, a -= h * this.view.offsetY, l = a - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, o, a, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const mi = 4, Eo = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], kn = 20, ys = /* @__PURE__ */ new Hl(), bo = /* @__PURE__ */ new Xe();
let Ms = null, Ss = 0, Es = 0, bs = !1;
const Bn = (1 + Math.sqrt(5)) / 2, ci = 1 / Bn, To = [
  /* @__PURE__ */ new P(-Bn, ci, 0),
  /* @__PURE__ */ new P(Bn, ci, 0),
  /* @__PURE__ */ new P(-ci, 0, Bn),
  /* @__PURE__ */ new P(ci, 0, Bn),
  /* @__PURE__ */ new P(0, Bn, -ci),
  /* @__PURE__ */ new P(0, Bn, ci),
  /* @__PURE__ */ new P(-1, 1, -1),
  /* @__PURE__ */ new P(1, 1, -1),
  /* @__PURE__ */ new P(-1, 1, 1),
  /* @__PURE__ */ new P(1, 1, 1)
];
class Ao {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, t = 0, n = 0.1, r = 100) {
    Ms = this._renderer.getRenderTarget(), Ss = this._renderer.getActiveCubeFace(), Es = this._renderer.getActiveMipmapLevel(), bs = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const s = this._allocateTargets();
    return s.depthBuffer = !0, this._sceneToCubeUV(e, n, r, s), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Co(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Ro(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Ms, Ss, Es), this._renderer.xr.enabled = bs, e.scissorTest = !1, xr(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === Si || e.mapping === Ei ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Ms = this._renderer.getRenderTarget(), Ss = this._renderer.getActiveCubeFace(), Es = this._renderer.getActiveMipmapLevel(), bs = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: $t,
      minFilter: $t,
      generateMipmaps: !1,
      type: Ki,
      format: Vt,
      colorSpace: wi,
      depthBuffer: !1
    }, r = wo(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = wo(e, t, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Yd(s)), this._blurMaterial = qd(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Gt(this._lodPlanes[0], e);
    this._renderer.compile(t, ys);
  }
  _sceneToCubeUV(e, t, n, r) {
    const a = new Ut(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, f = h.autoClear, d = h.toneMapping;
    h.getClearColor(bo), h.toneMapping = An, h.autoClear = !1;
    const m = new Ua({
      name: "PMREM.Background",
      side: At,
      depthWrite: !1,
      depthTest: !1
    }), g = new Gt(new $i(), m);
    let _ = !1;
    const p = e.background;
    p ? p.isColor && (m.color.copy(p), e.background = null, _ = !0) : (m.color.copy(bo), _ = !0);
    for (let u = 0; u < 6; u++) {
      const R = u % 3;
      R === 0 ? (a.up.set(0, l[u], 0), a.lookAt(c[u], 0, 0)) : R === 1 ? (a.up.set(0, 0, l[u]), a.lookAt(0, c[u], 0)) : (a.up.set(0, l[u], 0), a.lookAt(0, 0, c[u]));
      const E = this._cubeSize;
      xr(r, R * E, u > 2 ? E : 0, E, E), h.setRenderTarget(r), _ && h.render(g, a), h.render(e, a);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = f, e.background = p;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === Si || e.mapping === Ei;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Co()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Ro());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, o = new Gt(this._lodPlanes[0], s), a = s.uniforms;
    a.envMap.value = e;
    const l = this._cubeSize;
    xr(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(o, ys);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const o = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), a = To[(r - s - 1) % To.length];
      this._blur(e, s - 1, s, o, a);
    }
    t.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, t, n, r, s) {
    const o = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      o,
      t,
      n,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      o,
      e,
      n,
      n,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, t, n, r, s, o, a) {
    const l = this._renderer, c = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, f = new Gt(this._lodPlanes[r], c), d = c.uniforms, m = this._sizeLods[n] - 1, g = isFinite(s) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * kn - 1), _ = s / g, p = isFinite(s) ? 1 + Math.floor(h * _) : kn;
    p > kn && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${kn}`);
    const u = [];
    let R = 0;
    for (let b = 0; b < kn; ++b) {
      const C = b / _, S = Math.exp(-C * C / 2);
      u.push(S), b === 0 ? R += S : b < p && (R += 2 * S);
    }
    for (let b = 0; b < u.length; b++)
      u[b] = u[b] / R;
    d.envMap.value = e.texture, d.samples.value = p, d.weights.value = u, d.latitudinal.value = o === "latitudinal", a && (d.poleAxis.value = a);
    const { _lodMax: E } = this;
    d.dTheta.value = g, d.mipInt.value = E - n;
    const y = this._sizeLods[r], O = 3 * y * (r > E - mi ? r - E + mi : 0), w = 4 * (this._cubeSize - y);
    xr(t, O, w, 3 * y, 2 * y), l.setRenderTarget(t), l.render(f, ys);
  }
}
function Yd(i) {
  const e = [], t = [], n = [];
  let r = i;
  const s = i - mi + 1 + Eo.length;
  for (let o = 0; o < s; o++) {
    const a = Math.pow(2, r);
    t.push(a);
    let l = 1 / a;
    o > i - mi ? l = Eo[o - i + mi - 1] : o === 0 && (l = 0), n.push(l);
    const c = 1 / (a - 2), h = -c, f = 1 + c, d = [h, h, f, h, f, f, h, h, f, f, h, f], m = 6, g = 6, _ = 3, p = 2, u = 1, R = new Float32Array(_ * g * m), E = new Float32Array(p * g * m), y = new Float32Array(u * g * m);
    for (let w = 0; w < m; w++) {
      const b = w % 3 * 2 / 3 - 1, C = w > 2 ? 0 : -1, S = [
        b,
        C,
        0,
        b + 2 / 3,
        C,
        0,
        b + 2 / 3,
        C + 1,
        0,
        b,
        C,
        0,
        b + 2 / 3,
        C + 1,
        0,
        b,
        C + 1,
        0
      ];
      R.set(S, _ * g * w), E.set(d, p * g * w);
      const v = [w, w, w, w, w, w];
      y.set(v, u * g * w);
    }
    const O = new pt();
    O.setAttribute("position", new Xt(R, _)), O.setAttribute("uv", new Xt(E, p)), O.setAttribute("faceIndex", new Xt(y, u)), e.push(O), r > mi && r--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function wo(i, e, t) {
  const n = new Xn(i, e, t);
  return n.texture.mapping = Xr, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function xr(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function qd(i, e, t) {
  const n = new Float32Array(kn), r = new P(0, 1, 0);
  return new Rn({
    name: "SphericalGaussianBlur",
    defines: {
      n: kn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: Na(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: Tn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Ro() {
  return new Rn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Na(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: Tn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Co() {
  return new Rn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Na(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: Tn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Na() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function Zd(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(a) {
    if (a && a.isTexture) {
      const l = a.mapping, c = l === Ws || l === Xs, h = l === Si || l === Ei;
      if (c || h) {
        let f = e.get(a);
        const d = f !== void 0 ? f.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== d)
          return t === null && (t = new Ao(i)), f = c ? t.fromEquirectangular(a, f) : t.fromCubemap(a, f), f.texture.pmremVersion = a.pmremVersion, e.set(a, f), f.texture;
        if (f !== void 0)
          return f.texture;
        {
          const m = a.image;
          return c && m && m.height > 0 || h && m && r(m) ? (t === null && (t = new Ao(i)), f = c ? t.fromEquirectangular(a) : t.fromCubemap(a), f.texture.pmremVersion = a.pmremVersion, e.set(a, f), a.addEventListener("dispose", s), f.texture) : null;
        }
      }
    }
    return a;
  }
  function r(a) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++)
      a[h] !== void 0 && l++;
    return l === c;
  }
  function s(a) {
    const l = a.target;
    l.removeEventListener("dispose", s);
    const c = e.get(l);
    c !== void 0 && (e.delete(l), c.dispose());
  }
  function o() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: n,
    dispose: o
  };
}
function Kd(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return e[n] = r, r;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = t(n);
      return r === null && ki("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function jd(i, e, t, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function o(f) {
    const d = f.target;
    d.index !== null && e.remove(d.index);
    for (const g in d.attributes)
      e.remove(d.attributes[g]);
    for (const g in d.morphAttributes) {
      const _ = d.morphAttributes[g];
      for (let p = 0, u = _.length; p < u; p++)
        e.remove(_[p]);
    }
    d.removeEventListener("dispose", o), delete r[d.id];
    const m = s.get(d);
    m && (e.remove(m), s.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, t.memory.geometries--;
  }
  function a(f, d) {
    return r[d.id] === !0 || (d.addEventListener("dispose", o), r[d.id] = !0, t.memory.geometries++), d;
  }
  function l(f) {
    const d = f.attributes;
    for (const g in d)
      e.update(d[g], i.ARRAY_BUFFER);
    const m = f.morphAttributes;
    for (const g in m) {
      const _ = m[g];
      for (let p = 0, u = _.length; p < u; p++)
        e.update(_[p], i.ARRAY_BUFFER);
    }
  }
  function c(f) {
    const d = [], m = f.index, g = f.attributes.position;
    let _ = 0;
    if (m !== null) {
      const R = m.array;
      _ = m.version;
      for (let E = 0, y = R.length; E < y; E += 3) {
        const O = R[E + 0], w = R[E + 1], b = R[E + 2];
        d.push(O, w, w, b, b, O);
      }
    } else if (g !== void 0) {
      const R = g.array;
      _ = g.version;
      for (let E = 0, y = R.length / 3 - 1; E < y; E += 3) {
        const O = E + 0, w = E + 1, b = E + 2;
        d.push(O, w, w, b, b, O);
      }
    } else
      return;
    const p = new (Cl(d) ? Nl : Ul)(d, 1);
    p.version = _;
    const u = s.get(f);
    u && e.remove(u), s.set(f, p);
  }
  function h(f) {
    const d = s.get(f);
    if (d) {
      const m = f.index;
      m !== null && d.version < m.version && c(f);
    } else
      c(f);
    return s.get(f);
  }
  return {
    get: a,
    update: l,
    getWireframeAttribute: h
  };
}
function $d(i, e, t) {
  let n;
  function r(d) {
    n = d;
  }
  let s, o;
  function a(d) {
    s = d.type, o = d.bytesPerElement;
  }
  function l(d, m) {
    i.drawElements(n, m, s, d * o), t.update(m, n, 1);
  }
  function c(d, m, g) {
    g !== 0 && (i.drawElementsInstanced(n, m, s, d * o, g), t.update(m, n, g));
  }
  function h(d, m, g) {
    if (g === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, m, 0, s, d, 0, g);
    let p = 0;
    for (let u = 0; u < g; u++)
      p += m[u];
    t.update(p, n, 1);
  }
  function f(d, m, g, _) {
    if (g === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let u = 0; u < d.length; u++)
        c(d[u] / o, m[u], _[u]);
    else {
      p.multiDrawElementsInstancedWEBGL(n, m, 0, s, d, 0, _, 0, g);
      let u = 0;
      for (let R = 0; R < g; R++)
        u += m[R] * _[R];
      t.update(u, n, 1);
    }
  }
  this.setMode = r, this.setIndex = a, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = f;
}
function Jd(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, o, a) {
    switch (t.calls++, o) {
      case i.TRIANGLES:
        t.triangles += a * (s / 3);
        break;
      case i.LINES:
        t.lines += a * (s / 2);
        break;
      case i.LINE_STRIP:
        t.lines += a * (s - 1);
        break;
      case i.LINE_LOOP:
        t.lines += a * s;
        break;
      case i.POINTS:
        t.points += a * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function Qd(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), r = new lt();
  function s(o, a, l) {
    const c = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, f = h !== void 0 ? h.length : 0;
    let d = n.get(a);
    if (d === void 0 || d.count !== f) {
      let S = function() {
        b.dispose(), n.delete(a), a.removeEventListener("dispose", S);
      };
      d !== void 0 && d.texture.dispose();
      const m = a.morphAttributes.position !== void 0, g = a.morphAttributes.normal !== void 0, _ = a.morphAttributes.color !== void 0, p = a.morphAttributes.position || [], u = a.morphAttributes.normal || [], R = a.morphAttributes.color || [];
      let E = 0;
      m === !0 && (E = 1), g === !0 && (E = 2), _ === !0 && (E = 3);
      let y = a.attributes.position.count * E, O = 1;
      y > e.maxTextureSize && (O = Math.ceil(y / e.maxTextureSize), y = e.maxTextureSize);
      const w = new Float32Array(y * O * 4 * f), b = new Ll(w, y, O, f);
      b.type = cn, b.needsUpdate = !0;
      const C = E * 4;
      for (let v = 0; v < f; v++) {
        const A = p[v], N = u[v], F = R[v], H = y * O * 4 * v;
        for (let X = 0; X < A.count; X++) {
          const W = X * C;
          m === !0 && (r.fromBufferAttribute(A, X), w[H + W + 0] = r.x, w[H + W + 1] = r.y, w[H + W + 2] = r.z, w[H + W + 3] = 0), g === !0 && (r.fromBufferAttribute(N, X), w[H + W + 4] = r.x, w[H + W + 5] = r.y, w[H + W + 6] = r.z, w[H + W + 7] = 0), _ === !0 && (r.fromBufferAttribute(F, X), w[H + W + 8] = r.x, w[H + W + 9] = r.y, w[H + W + 10] = r.z, w[H + W + 11] = F.itemSize === 4 ? r.w : 1);
        }
      }
      d = {
        count: f,
        texture: b,
        size: new se(y, O)
      }, n.set(a, d), a.addEventListener("dispose", S);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", o.morphTexture, t);
    else {
      let m = 0;
      for (let _ = 0; _ < c.length; _++)
        m += c[_];
      const g = a.morphTargetsRelative ? 1 : 1 - m;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", g), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, t), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return {
    update: s
  };
}
function ep(i, e, t, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const c = n.render.frame, h = l.geometry, f = e.get(l, h);
    if (r.get(f) !== c && (e.update(f), r.set(f, c)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), r.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      r.get(d) !== c && (d.update(), r.set(d, c));
    }
    return f;
  }
  function o() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function a(l) {
    const c = l.target;
    c.removeEventListener("dispose", a), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: s,
    dispose: o
  };
}
class Vl extends St {
  constructor(e, t, n, r, s, o, a, l, c, h = xi) {
    if (h !== xi && h !== Ti)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === xi && (n = Wn), n === void 0 && h === Ti && (n = bi), super(null, r, s, o, a, l, h, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = a !== void 0 ? a : Wt, this.minFilter = l !== void 0 ? l : Wt, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const Gl = /* @__PURE__ */ new St(), Po = /* @__PURE__ */ new Vl(1, 1), Wl = /* @__PURE__ */ new Ll(), Xl = /* @__PURE__ */ new zh(), Yl = /* @__PURE__ */ new Bl(), Lo = [], Do = [], Io = new Float32Array(16), Uo = new Float32Array(9), No = new Float32Array(4);
function Ci(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let s = Lo[r];
  if (s === void 0 && (s = new Float32Array(r), Lo[r] = s), e !== 0) {
    n.toArray(s, 0);
    for (let o = 1, a = 0; o !== e; ++o)
      a += t, i[o].toArray(s, a);
  }
  return s;
}
function ut(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function ft(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function Kr(i, e) {
  let t = Do[e];
  t === void 0 && (t = new Int32Array(e), Do[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function tp(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function np(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ut(t, e)) return;
    i.uniform2fv(this.addr, e), ft(t, e);
  }
}
function ip(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (ut(t, e)) return;
    i.uniform3fv(this.addr, e), ft(t, e);
  }
}
function rp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ut(t, e)) return;
    i.uniform4fv(this.addr, e), ft(t, e);
  }
}
function sp(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ut(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), ft(t, e);
  } else {
    if (ut(t, n)) return;
    No.set(n), i.uniformMatrix2fv(this.addr, !1, No), ft(t, n);
  }
}
function ap(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ut(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), ft(t, e);
  } else {
    if (ut(t, n)) return;
    Uo.set(n), i.uniformMatrix3fv(this.addr, !1, Uo), ft(t, n);
  }
}
function op(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ut(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), ft(t, e);
  } else {
    if (ut(t, n)) return;
    Io.set(n), i.uniformMatrix4fv(this.addr, !1, Io), ft(t, n);
  }
}
function lp(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function cp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ut(t, e)) return;
    i.uniform2iv(this.addr, e), ft(t, e);
  }
}
function hp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (ut(t, e)) return;
    i.uniform3iv(this.addr, e), ft(t, e);
  }
}
function up(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ut(t, e)) return;
    i.uniform4iv(this.addr, e), ft(t, e);
  }
}
function fp(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function dp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ut(t, e)) return;
    i.uniform2uiv(this.addr, e), ft(t, e);
  }
}
function pp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (ut(t, e)) return;
    i.uniform3uiv(this.addr, e), ft(t, e);
  }
}
function mp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ut(t, e)) return;
    i.uniform4uiv(this.addr, e), ft(t, e);
  }
}
function gp(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (Po.compareFunction = Rl, s = Po) : s = Gl, t.setTexture2D(e || s, r);
}
function _p(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || Xl, r);
}
function vp(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || Yl, r);
}
function xp(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || Wl, r);
}
function yp(i) {
  switch (i) {
    case 5126:
      return tp;
    // FLOAT
    case 35664:
      return np;
    // _VEC2
    case 35665:
      return ip;
    // _VEC3
    case 35666:
      return rp;
    // _VEC4
    case 35674:
      return sp;
    // _MAT2
    case 35675:
      return ap;
    // _MAT3
    case 35676:
      return op;
    // _MAT4
    case 5124:
    case 35670:
      return lp;
    // INT, BOOL
    case 35667:
    case 35671:
      return cp;
    // _VEC2
    case 35668:
    case 35672:
      return hp;
    // _VEC3
    case 35669:
    case 35673:
      return up;
    // _VEC4
    case 5125:
      return fp;
    // UINT
    case 36294:
      return dp;
    // _VEC2
    case 36295:
      return pp;
    // _VEC3
    case 36296:
      return mp;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return gp;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return _p;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return vp;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return xp;
  }
}
function Mp(i, e) {
  i.uniform1fv(this.addr, e);
}
function Sp(i, e) {
  const t = Ci(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function Ep(i, e) {
  const t = Ci(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function bp(i, e) {
  const t = Ci(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function Tp(i, e) {
  const t = Ci(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Ap(i, e) {
  const t = Ci(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function wp(i, e) {
  const t = Ci(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Rp(i, e) {
  i.uniform1iv(this.addr, e);
}
function Cp(i, e) {
  i.uniform2iv(this.addr, e);
}
function Pp(i, e) {
  i.uniform3iv(this.addr, e);
}
function Lp(i, e) {
  i.uniform4iv(this.addr, e);
}
function Dp(i, e) {
  i.uniform1uiv(this.addr, e);
}
function Ip(i, e) {
  i.uniform2uiv(this.addr, e);
}
function Up(i, e) {
  i.uniform3uiv(this.addr, e);
}
function Np(i, e) {
  i.uniform4uiv(this.addr, e);
}
function Fp(i, e, t) {
  const n = this.cache, r = e.length, s = Kr(t, r);
  ut(n, s) || (i.uniform1iv(this.addr, s), ft(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture2D(e[o] || Gl, s[o]);
}
function Op(i, e, t) {
  const n = this.cache, r = e.length, s = Kr(t, r);
  ut(n, s) || (i.uniform1iv(this.addr, s), ft(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture3D(e[o] || Xl, s[o]);
}
function Bp(i, e, t) {
  const n = this.cache, r = e.length, s = Kr(t, r);
  ut(n, s) || (i.uniform1iv(this.addr, s), ft(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTextureCube(e[o] || Yl, s[o]);
}
function zp(i, e, t) {
  const n = this.cache, r = e.length, s = Kr(t, r);
  ut(n, s) || (i.uniform1iv(this.addr, s), ft(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture2DArray(e[o] || Wl, s[o]);
}
function kp(i) {
  switch (i) {
    case 5126:
      return Mp;
    // FLOAT
    case 35664:
      return Sp;
    // _VEC2
    case 35665:
      return Ep;
    // _VEC3
    case 35666:
      return bp;
    // _VEC4
    case 35674:
      return Tp;
    // _MAT2
    case 35675:
      return Ap;
    // _MAT3
    case 35676:
      return wp;
    // _MAT4
    case 5124:
    case 35670:
      return Rp;
    // INT, BOOL
    case 35667:
    case 35671:
      return Cp;
    // _VEC2
    case 35668:
    case 35672:
      return Pp;
    // _VEC3
    case 35669:
    case 35673:
      return Lp;
    // _VEC4
    case 5125:
      return Dp;
    // UINT
    case 36294:
      return Ip;
    // _VEC2
    case 36295:
      return Up;
    // _VEC3
    case 36296:
      return Np;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Fp;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Op;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Bp;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return zp;
  }
}
class Hp {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = yp(t.type);
  }
}
class Vp {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = kp(t.type);
  }
}
class Gp {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const r = this.seq;
    for (let s = 0, o = r.length; s !== o; ++s) {
      const a = r[s];
      a.setValue(e, t[a.id], n);
    }
  }
}
const Ts = /(\w+)(\])?(\[|\.)?/g;
function Fo(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function Wp(i, e, t) {
  const n = i.name, r = n.length;
  for (Ts.lastIndex = 0; ; ) {
    const s = Ts.exec(n), o = Ts.lastIndex;
    let a = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (a = a | 0), c === void 0 || c === "[" && o + 2 === r) {
      Fo(t, c === void 0 ? new Hp(a, i, e) : new Vp(a, i, e));
      break;
    } else {
      let f = t.map[a];
      f === void 0 && (f = new Gp(a), Fo(t, f)), t = f;
    }
  }
}
class Or {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = e.getActiveUniform(t, r), o = e.getUniformLocation(t, s.name);
      Wp(s, o, this);
    }
  }
  setValue(e, t, n, r) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    r !== void 0 && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let s = 0, o = t.length; s !== o; ++s) {
      const a = t[s], l = n[a.id];
      l.needsUpdate !== !1 && a.setValue(e, l.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      const o = e[r];
      o.id in t && n.push(o);
    }
    return n;
  }
}
function Oo(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const Xp = 37297;
let Yp = 0;
function qp(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let o = r; o < s; o++) {
    const a = o + 1;
    n.push(`${a === e ? ">" : " "} ${a}: ${t[o]}`);
  }
  return n.join(`
`);
}
const Bo = /* @__PURE__ */ new Le();
function Zp(i) {
  Ge._getMatrix(Bo, Ge.workingColorSpace, i);
  const e = `mat3( ${Bo.elements.map((t) => t.toFixed(4))} )`;
  switch (Ge.getTransfer(i)) {
    case Yr:
      return [e, "LinearTransferOETF"];
    case Ke:
      return [e, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [e, "LinearTransferOETF"];
  }
}
function zo(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), r = i.getShaderInfoLog(e).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const o = parseInt(s[1]);
    return t.toUpperCase() + `

` + r + `

` + qp(i.getShaderSource(e), o);
  } else
    return r;
}
function Kp(i, e) {
  const t = Zp(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function jp(i, e) {
  let t;
  switch (e) {
    case hh:
      t = "Linear";
      break;
    case uh:
      t = "Reinhard";
      break;
    case fh:
      t = "Cineon";
      break;
    case dh:
      t = "ACESFilmic";
      break;
    case mh:
      t = "AgX";
      break;
    case gh:
      t = "Neutral";
      break;
    case ph:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const yr = /* @__PURE__ */ new P();
function $p() {
  Ge.getLuminanceCoefficients(yr);
  const i = yr.x.toFixed(4), e = yr.y.toFixed(4), t = yr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Jp(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Hi).join(`
`);
}
function Qp(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function em(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(e, r), o = s.name;
    let a = 1;
    s.type === i.FLOAT_MAT2 && (a = 2), s.type === i.FLOAT_MAT3 && (a = 3), s.type === i.FLOAT_MAT4 && (a = 4), t[o] = {
      type: s.type,
      location: i.getAttribLocation(e, o),
      locationSize: a
    };
  }
  return t;
}
function Hi(i) {
  return i !== "";
}
function ko(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Ho(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const tm = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Sa(i) {
  return i.replace(tm, im);
}
const nm = /* @__PURE__ */ new Map();
function im(i, e) {
  let t = Ie[e];
  if (t === void 0) {
    const n = nm.get(e);
    if (n !== void 0)
      t = Ie[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return Sa(t);
}
const rm = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Vo(i) {
  return i.replace(rm, sm);
}
function sm(i, e, t, n) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Go(i) {
  let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function am(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === ml ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Gc ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === on && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function om(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case Si:
      case Ei:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case Xr:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function lm(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case Ei:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function cm(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case gl:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case lh:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case ch:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function hm(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: n, maxMip: t };
}
function um(i, e, t, n) {
  const r = i.getContext(), s = t.defines;
  let o = t.vertexShader, a = t.fragmentShader;
  const l = am(t), c = om(t), h = lm(t), f = cm(t), d = hm(t), m = Jp(t), g = Qp(s), _ = r.createProgram();
  let p, u, R = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(Hi).join(`
`), p.length > 0 && (p += `
`), u = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(Hi).join(`
`), u.length > 0 && (u += `
`)) : (p = [
    Go(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + h : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Hi).join(`
`), u = [
    Go(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + f : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor || t.batchingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== An ? "#define TONE_MAPPING" : "",
    t.toneMapping !== An ? Ie.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== An ? jp("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Ie.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Kp("linearToOutputTexel", t.outputColorSpace),
    $p(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Hi).join(`
`)), o = Sa(o), o = ko(o, t), o = Ho(o, t), a = Sa(a), a = ko(a, t), a = Ho(a, t), o = Vo(o), a = Vo(a), t.isRawShaderMaterial !== !0 && (R = `#version 300 es
`, p = [
    m,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, u = [
    "#define varying in",
    t.glslVersion === to ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === to ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + u);
  const E = R + p + o, y = R + u + a, O = Oo(r, r.VERTEX_SHADER, E), w = Oo(r, r.FRAGMENT_SHADER, y);
  r.attachShader(_, O), r.attachShader(_, w), t.index0AttributeName !== void 0 ? r.bindAttribLocation(_, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(_, 0, "position"), r.linkProgram(_);
  function b(A) {
    if (i.debug.checkShaderErrors) {
      const N = r.getProgramInfoLog(_).trim(), F = r.getShaderInfoLog(O).trim(), H = r.getShaderInfoLog(w).trim();
      let X = !0, W = !0;
      if (r.getProgramParameter(_, r.LINK_STATUS) === !1)
        if (X = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, _, O, w);
        else {
          const q = zo(r, O, "vertex"), V = zo(r, w, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(_, r.VALIDATE_STATUS) + `

Material Name: ` + A.name + `
Material Type: ` + A.type + `

Program Info Log: ` + N + `
` + q + `
` + V
          );
        }
      else N !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", N) : (F === "" || H === "") && (W = !1);
      W && (A.diagnostics = {
        runnable: X,
        programLog: N,
        vertexShader: {
          log: F,
          prefix: p
        },
        fragmentShader: {
          log: H,
          prefix: u
        }
      });
    }
    r.deleteShader(O), r.deleteShader(w), C = new Or(r, _), S = em(r, _);
  }
  let C;
  this.getUniforms = function() {
    return C === void 0 && b(this), C;
  };
  let S;
  this.getAttributes = function() {
    return S === void 0 && b(this), S;
  };
  let v = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return v === !1 && (v = r.getProgramParameter(_, Xp)), v;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(_), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Yp++, this.cacheKey = e, this.usedTimes = 1, this.program = _, this.vertexShader = O, this.fragmentShader = w, this;
}
let fm = 0;
class dm {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, r = this._getShaderStage(t), s = this._getShaderStage(n), o = this._getShaderCacheForMaterial(e);
    return o.has(r) === !1 && (o.add(r), r.usedTimes++), o.has(s) === !1 && (o.add(s), s.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new pm(e), t.set(e, n)), n;
  }
}
class pm {
  constructor(e) {
    this.id = fm++, this.code = e, this.usedTimes = 0;
  }
}
function mm(i, e, t, n, r, s, o) {
  const a = new Dl(), l = new dm(), c = /* @__PURE__ */ new Set(), h = [], f = r.logarithmicDepthBuffer, d = r.vertexTextures;
  let m = r.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function _(S) {
    return c.add(S), S === 0 ? "uv" : `uv${S}`;
  }
  function p(S, v, A, N, F) {
    const H = N.fog, X = F.geometry, W = S.isMeshStandardMaterial ? N.environment : null, q = (S.isMeshStandardMaterial ? t : e).get(S.envMap || W), V = q && q.mapping === Xr ? q.image.height : null, te = g[S.type];
    S.precision !== null && (m = r.getMaxPrecision(S.precision), m !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", m, "instead."));
    const oe = X.morphAttributes.position || X.morphAttributes.normal || X.morphAttributes.color, me = oe !== void 0 ? oe.length : 0;
    let Ae = 0;
    X.morphAttributes.position !== void 0 && (Ae = 1), X.morphAttributes.normal !== void 0 && (Ae = 2), X.morphAttributes.color !== void 0 && (Ae = 3);
    let Ne, Y, J, pe;
    if (te) {
      const Ze = Zt[te];
      Ne = Ze.vertexShader, Y = Ze.fragmentShader;
    } else
      Ne = S.vertexShader, Y = S.fragmentShader, l.update(S), J = l.getVertexShaderID(S), pe = l.getFragmentShaderID(S);
    const ne = i.getRenderTarget(), be = i.state.buffers.depth.getReversed(), Re = F.isInstancedMesh === !0, Ue = F.isBatchedMesh === !0, it = !!S.map, He = !!S.matcap, ot = !!q, U = !!S.aoMap, Pt = !!S.lightMap, Be = !!S.bumpMap, ze = !!S.normalMap, Se = !!S.displacementMap, et = !!S.emissiveMap, Me = !!S.metalnessMap, T = !!S.roughnessMap, x = S.anisotropy > 0, B = S.clearcoat > 0, K = S.dispersion > 0, $ = S.iridescence > 0, Z = S.sheen > 0, xe = S.transmission > 0, ae = x && !!S.anisotropyMap, ue = B && !!S.clearcoatMap, Ve = B && !!S.clearcoatNormalMap, Q = B && !!S.clearcoatRoughnessMap, fe = $ && !!S.iridescenceMap, Ee = $ && !!S.iridescenceThicknessMap, Te = Z && !!S.sheenColorMap, de = Z && !!S.sheenRoughnessMap, ke = !!S.specularMap, De = !!S.specularColorMap, Je = !!S.specularIntensityMap, L = xe && !!S.transmissionMap, re = xe && !!S.thicknessMap, G = !!S.gradientMap, j = !!S.alphaMap, he = S.alphaTest > 0, le = !!S.alphaHash, Ce = !!S.extensions;
    let at = An;
    S.toneMapped && (ne === null || ne.isXRRenderTarget === !0) && (at = i.toneMapping);
    const _t = {
      shaderID: te,
      shaderType: S.type,
      shaderName: S.name,
      vertexShader: Ne,
      fragmentShader: Y,
      defines: S.defines,
      customVertexShaderID: J,
      customFragmentShaderID: pe,
      isRawShaderMaterial: S.isRawShaderMaterial === !0,
      glslVersion: S.glslVersion,
      precision: m,
      batching: Ue,
      batchingColor: Ue && F._colorsTexture !== null,
      instancing: Re,
      instancingColor: Re && F.instanceColor !== null,
      instancingMorph: Re && F.morphTexture !== null,
      supportsVertexTextures: d,
      outputColorSpace: ne === null ? i.outputColorSpace : ne.isXRRenderTarget === !0 ? ne.texture.colorSpace : wi,
      alphaToCoverage: !!S.alphaToCoverage,
      map: it,
      matcap: He,
      envMap: ot,
      envMapMode: ot && q.mapping,
      envMapCubeUVHeight: V,
      aoMap: U,
      lightMap: Pt,
      bumpMap: Be,
      normalMap: ze,
      displacementMap: d && Se,
      emissiveMap: et,
      normalMapObjectSpace: ze && S.normalMapType === Mh,
      normalMapTangentSpace: ze && S.normalMapType === yh,
      metalnessMap: Me,
      roughnessMap: T,
      anisotropy: x,
      anisotropyMap: ae,
      clearcoat: B,
      clearcoatMap: ue,
      clearcoatNormalMap: Ve,
      clearcoatRoughnessMap: Q,
      dispersion: K,
      iridescence: $,
      iridescenceMap: fe,
      iridescenceThicknessMap: Ee,
      sheen: Z,
      sheenColorMap: Te,
      sheenRoughnessMap: de,
      specularMap: ke,
      specularColorMap: De,
      specularIntensityMap: Je,
      transmission: xe,
      transmissionMap: L,
      thicknessMap: re,
      gradientMap: G,
      opaque: S.transparent === !1 && S.blending === vi && S.alphaToCoverage === !1,
      alphaMap: j,
      alphaTest: he,
      alphaHash: le,
      combine: S.combine,
      //
      mapUv: it && _(S.map.channel),
      aoMapUv: U && _(S.aoMap.channel),
      lightMapUv: Pt && _(S.lightMap.channel),
      bumpMapUv: Be && _(S.bumpMap.channel),
      normalMapUv: ze && _(S.normalMap.channel),
      displacementMapUv: Se && _(S.displacementMap.channel),
      emissiveMapUv: et && _(S.emissiveMap.channel),
      metalnessMapUv: Me && _(S.metalnessMap.channel),
      roughnessMapUv: T && _(S.roughnessMap.channel),
      anisotropyMapUv: ae && _(S.anisotropyMap.channel),
      clearcoatMapUv: ue && _(S.clearcoatMap.channel),
      clearcoatNormalMapUv: Ve && _(S.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Q && _(S.clearcoatRoughnessMap.channel),
      iridescenceMapUv: fe && _(S.iridescenceMap.channel),
      iridescenceThicknessMapUv: Ee && _(S.iridescenceThicknessMap.channel),
      sheenColorMapUv: Te && _(S.sheenColorMap.channel),
      sheenRoughnessMapUv: de && _(S.sheenRoughnessMap.channel),
      specularMapUv: ke && _(S.specularMap.channel),
      specularColorMapUv: De && _(S.specularColorMap.channel),
      specularIntensityMapUv: Je && _(S.specularIntensityMap.channel),
      transmissionMapUv: L && _(S.transmissionMap.channel),
      thicknessMapUv: re && _(S.thicknessMap.channel),
      alphaMapUv: j && _(S.alphaMap.channel),
      //
      vertexTangents: !!X.attributes.tangent && (ze || x),
      vertexColors: S.vertexColors,
      vertexAlphas: S.vertexColors === !0 && !!X.attributes.color && X.attributes.color.itemSize === 4,
      pointsUvs: F.isPoints === !0 && !!X.attributes.uv && (it || j),
      fog: !!H,
      useFog: S.fog === !0,
      fogExp2: !!H && H.isFogExp2,
      flatShading: S.flatShading === !0,
      sizeAttenuation: S.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      reverseDepthBuffer: be,
      skinning: F.isSkinnedMesh === !0,
      morphTargets: X.morphAttributes.position !== void 0,
      morphNormals: X.morphAttributes.normal !== void 0,
      morphColors: X.morphAttributes.color !== void 0,
      morphTargetsCount: me,
      morphTextureStride: Ae,
      numDirLights: v.directional.length,
      numPointLights: v.point.length,
      numSpotLights: v.spot.length,
      numSpotLightMaps: v.spotLightMap.length,
      numRectAreaLights: v.rectArea.length,
      numHemiLights: v.hemi.length,
      numDirLightShadows: v.directionalShadowMap.length,
      numPointLightShadows: v.pointShadowMap.length,
      numSpotLightShadows: v.spotShadowMap.length,
      numSpotLightShadowsWithMaps: v.numSpotLightShadowsWithMaps,
      numLightProbes: v.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: S.dithering,
      shadowMapEnabled: i.shadowMap.enabled && A.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: at,
      decodeVideoTexture: it && S.map.isVideoTexture === !0 && Ge.getTransfer(S.map.colorSpace) === Ke,
      decodeVideoTextureEmissive: et && S.emissiveMap.isVideoTexture === !0 && Ge.getTransfer(S.emissiveMap.colorSpace) === Ke,
      premultipliedAlpha: S.premultipliedAlpha,
      doubleSided: S.side === Kt,
      flipSided: S.side === At,
      useDepthPacking: S.depthPacking >= 0,
      depthPacking: S.depthPacking || 0,
      index0AttributeName: S.index0AttributeName,
      extensionClipCullDistance: Ce && S.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Ce && S.extensions.multiDraw === !0 || Ue) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: S.customProgramCacheKey()
    };
    return _t.vertexUv1s = c.has(1), _t.vertexUv2s = c.has(2), _t.vertexUv3s = c.has(3), c.clear(), _t;
  }
  function u(S) {
    const v = [];
    if (S.shaderID ? v.push(S.shaderID) : (v.push(S.customVertexShaderID), v.push(S.customFragmentShaderID)), S.defines !== void 0)
      for (const A in S.defines)
        v.push(A), v.push(S.defines[A]);
    return S.isRawShaderMaterial === !1 && (R(v, S), E(v, S), v.push(i.outputColorSpace)), v.push(S.customProgramCacheKey), v.join();
  }
  function R(S, v) {
    S.push(v.precision), S.push(v.outputColorSpace), S.push(v.envMapMode), S.push(v.envMapCubeUVHeight), S.push(v.mapUv), S.push(v.alphaMapUv), S.push(v.lightMapUv), S.push(v.aoMapUv), S.push(v.bumpMapUv), S.push(v.normalMapUv), S.push(v.displacementMapUv), S.push(v.emissiveMapUv), S.push(v.metalnessMapUv), S.push(v.roughnessMapUv), S.push(v.anisotropyMapUv), S.push(v.clearcoatMapUv), S.push(v.clearcoatNormalMapUv), S.push(v.clearcoatRoughnessMapUv), S.push(v.iridescenceMapUv), S.push(v.iridescenceThicknessMapUv), S.push(v.sheenColorMapUv), S.push(v.sheenRoughnessMapUv), S.push(v.specularMapUv), S.push(v.specularColorMapUv), S.push(v.specularIntensityMapUv), S.push(v.transmissionMapUv), S.push(v.thicknessMapUv), S.push(v.combine), S.push(v.fogExp2), S.push(v.sizeAttenuation), S.push(v.morphTargetsCount), S.push(v.morphAttributeCount), S.push(v.numDirLights), S.push(v.numPointLights), S.push(v.numSpotLights), S.push(v.numSpotLightMaps), S.push(v.numHemiLights), S.push(v.numRectAreaLights), S.push(v.numDirLightShadows), S.push(v.numPointLightShadows), S.push(v.numSpotLightShadows), S.push(v.numSpotLightShadowsWithMaps), S.push(v.numLightProbes), S.push(v.shadowMapType), S.push(v.toneMapping), S.push(v.numClippingPlanes), S.push(v.numClipIntersection), S.push(v.depthPacking);
  }
  function E(S, v) {
    a.disableAll(), v.supportsVertexTextures && a.enable(0), v.instancing && a.enable(1), v.instancingColor && a.enable(2), v.instancingMorph && a.enable(3), v.matcap && a.enable(4), v.envMap && a.enable(5), v.normalMapObjectSpace && a.enable(6), v.normalMapTangentSpace && a.enable(7), v.clearcoat && a.enable(8), v.iridescence && a.enable(9), v.alphaTest && a.enable(10), v.vertexColors && a.enable(11), v.vertexAlphas && a.enable(12), v.vertexUv1s && a.enable(13), v.vertexUv2s && a.enable(14), v.vertexUv3s && a.enable(15), v.vertexTangents && a.enable(16), v.anisotropy && a.enable(17), v.alphaHash && a.enable(18), v.batching && a.enable(19), v.dispersion && a.enable(20), v.batchingColor && a.enable(21), S.push(a.mask), a.disableAll(), v.fog && a.enable(0), v.useFog && a.enable(1), v.flatShading && a.enable(2), v.logarithmicDepthBuffer && a.enable(3), v.reverseDepthBuffer && a.enable(4), v.skinning && a.enable(5), v.morphTargets && a.enable(6), v.morphNormals && a.enable(7), v.morphColors && a.enable(8), v.premultipliedAlpha && a.enable(9), v.shadowMapEnabled && a.enable(10), v.doubleSided && a.enable(11), v.flipSided && a.enable(12), v.useDepthPacking && a.enable(13), v.dithering && a.enable(14), v.transmission && a.enable(15), v.sheen && a.enable(16), v.opaque && a.enable(17), v.pointsUvs && a.enable(18), v.decodeVideoTexture && a.enable(19), v.decodeVideoTextureEmissive && a.enable(20), v.alphaToCoverage && a.enable(21), S.push(a.mask);
  }
  function y(S) {
    const v = g[S.type];
    let A;
    if (v) {
      const N = Zt[v];
      A = $h.clone(N.uniforms);
    } else
      A = S.uniforms;
    return A;
  }
  function O(S, v) {
    let A;
    for (let N = 0, F = h.length; N < F; N++) {
      const H = h[N];
      if (H.cacheKey === v) {
        A = H, ++A.usedTimes;
        break;
      }
    }
    return A === void 0 && (A = new um(i, v, S, s), h.push(A)), A;
  }
  function w(S) {
    if (--S.usedTimes === 0) {
      const v = h.indexOf(S);
      h[v] = h[h.length - 1], h.pop(), S.destroy();
    }
  }
  function b(S) {
    l.remove(S);
  }
  function C() {
    l.dispose();
  }
  return {
    getParameters: p,
    getProgramCacheKey: u,
    getUniforms: y,
    acquireProgram: O,
    releaseProgram: w,
    releaseShaderCache: b,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: C
  };
}
function gm() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(o) {
    return i.has(o);
  }
  function t(o) {
    let a = i.get(o);
    return a === void 0 && (a = {}, i.set(o, a)), a;
  }
  function n(o) {
    i.delete(o);
  }
  function r(o, a, l) {
    i.get(o)[a] = l;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: n,
    update: r,
    dispose: s
  };
}
function _m(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function Wo(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function Xo() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function o(f, d, m, g, _, p) {
    let u = i[e];
    return u === void 0 ? (u = {
      id: f.id,
      object: f,
      geometry: d,
      material: m,
      groupOrder: g,
      renderOrder: f.renderOrder,
      z: _,
      group: p
    }, i[e] = u) : (u.id = f.id, u.object = f, u.geometry = d, u.material = m, u.groupOrder = g, u.renderOrder = f.renderOrder, u.z = _, u.group = p), e++, u;
  }
  function a(f, d, m, g, _, p) {
    const u = o(f, d, m, g, _, p);
    m.transmission > 0 ? n.push(u) : m.transparent === !0 ? r.push(u) : t.push(u);
  }
  function l(f, d, m, g, _, p) {
    const u = o(f, d, m, g, _, p);
    m.transmission > 0 ? n.unshift(u) : m.transparent === !0 ? r.unshift(u) : t.unshift(u);
  }
  function c(f, d) {
    t.length > 1 && t.sort(f || _m), n.length > 1 && n.sort(d || Wo), r.length > 1 && r.sort(d || Wo);
  }
  function h() {
    for (let f = e, d = i.length; f < d; f++) {
      const m = i[f];
      if (m.id === null) break;
      m.id = null, m.object = null, m.geometry = null, m.material = null, m.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: r,
    init: s,
    push: a,
    unshift: l,
    finish: h,
    sort: c
  };
}
function vm() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const s = i.get(n);
    let o;
    return s === void 0 ? (o = new Xo(), i.set(n, [o])) : r >= s.length ? (o = new Xo(), s.push(o)) : o = s[r], o;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function xm() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new P(),
            color: new Xe()
          };
          break;
        case "SpotLight":
          t = {
            position: new P(),
            direction: new P(),
            color: new Xe(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new P(),
            color: new Xe(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new P(),
            skyColor: new Xe(),
            groundColor: new Xe()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Xe(),
            position: new P(),
            halfWidth: new P(),
            halfHeight: new P()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function ym() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new se()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new se()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new se(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let Mm = 0;
function Sm(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Em(i) {
  const e = new xm(), t = ym(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) n.probe.push(new P());
  const r = new P(), s = new st(), o = new st();
  function a(c) {
    let h = 0, f = 0, d = 0;
    for (let S = 0; S < 9; S++) n.probe[S].set(0, 0, 0);
    let m = 0, g = 0, _ = 0, p = 0, u = 0, R = 0, E = 0, y = 0, O = 0, w = 0, b = 0;
    c.sort(Sm);
    for (let S = 0, v = c.length; S < v; S++) {
      const A = c[S], N = A.color, F = A.intensity, H = A.distance, X = A.shadow && A.shadow.map ? A.shadow.map.texture : null;
      if (A.isAmbientLight)
        h += N.r * F, f += N.g * F, d += N.b * F;
      else if (A.isLightProbe) {
        for (let W = 0; W < 9; W++)
          n.probe[W].addScaledVector(A.sh.coefficients[W], F);
        b++;
      } else if (A.isDirectionalLight) {
        const W = e.get(A);
        if (W.color.copy(A.color).multiplyScalar(A.intensity), A.castShadow) {
          const q = A.shadow, V = t.get(A);
          V.shadowIntensity = q.intensity, V.shadowBias = q.bias, V.shadowNormalBias = q.normalBias, V.shadowRadius = q.radius, V.shadowMapSize = q.mapSize, n.directionalShadow[m] = V, n.directionalShadowMap[m] = X, n.directionalShadowMatrix[m] = A.shadow.matrix, R++;
        }
        n.directional[m] = W, m++;
      } else if (A.isSpotLight) {
        const W = e.get(A);
        W.position.setFromMatrixPosition(A.matrixWorld), W.color.copy(N).multiplyScalar(F), W.distance = H, W.coneCos = Math.cos(A.angle), W.penumbraCos = Math.cos(A.angle * (1 - A.penumbra)), W.decay = A.decay, n.spot[_] = W;
        const q = A.shadow;
        if (A.map && (n.spotLightMap[O] = A.map, O++, q.updateMatrices(A), A.castShadow && w++), n.spotLightMatrix[_] = q.matrix, A.castShadow) {
          const V = t.get(A);
          V.shadowIntensity = q.intensity, V.shadowBias = q.bias, V.shadowNormalBias = q.normalBias, V.shadowRadius = q.radius, V.shadowMapSize = q.mapSize, n.spotShadow[_] = V, n.spotShadowMap[_] = X, y++;
        }
        _++;
      } else if (A.isRectAreaLight) {
        const W = e.get(A);
        W.color.copy(N).multiplyScalar(F), W.halfWidth.set(A.width * 0.5, 0, 0), W.halfHeight.set(0, A.height * 0.5, 0), n.rectArea[p] = W, p++;
      } else if (A.isPointLight) {
        const W = e.get(A);
        if (W.color.copy(A.color).multiplyScalar(A.intensity), W.distance = A.distance, W.decay = A.decay, A.castShadow) {
          const q = A.shadow, V = t.get(A);
          V.shadowIntensity = q.intensity, V.shadowBias = q.bias, V.shadowNormalBias = q.normalBias, V.shadowRadius = q.radius, V.shadowMapSize = q.mapSize, V.shadowCameraNear = q.camera.near, V.shadowCameraFar = q.camera.far, n.pointShadow[g] = V, n.pointShadowMap[g] = X, n.pointShadowMatrix[g] = A.shadow.matrix, E++;
        }
        n.point[g] = W, g++;
      } else if (A.isHemisphereLight) {
        const W = e.get(A);
        W.skyColor.copy(A.color).multiplyScalar(F), W.groundColor.copy(A.groundColor).multiplyScalar(F), n.hemi[u] = W, u++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ie.LTC_FLOAT_1, n.rectAreaLTC2 = ie.LTC_FLOAT_2) : (n.rectAreaLTC1 = ie.LTC_HALF_1, n.rectAreaLTC2 = ie.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = f, n.ambient[2] = d;
    const C = n.hash;
    (C.directionalLength !== m || C.pointLength !== g || C.spotLength !== _ || C.rectAreaLength !== p || C.hemiLength !== u || C.numDirectionalShadows !== R || C.numPointShadows !== E || C.numSpotShadows !== y || C.numSpotMaps !== O || C.numLightProbes !== b) && (n.directional.length = m, n.spot.length = _, n.rectArea.length = p, n.point.length = g, n.hemi.length = u, n.directionalShadow.length = R, n.directionalShadowMap.length = R, n.pointShadow.length = E, n.pointShadowMap.length = E, n.spotShadow.length = y, n.spotShadowMap.length = y, n.directionalShadowMatrix.length = R, n.pointShadowMatrix.length = E, n.spotLightMatrix.length = y + O - w, n.spotLightMap.length = O, n.numSpotLightShadowsWithMaps = w, n.numLightProbes = b, C.directionalLength = m, C.pointLength = g, C.spotLength = _, C.rectAreaLength = p, C.hemiLength = u, C.numDirectionalShadows = R, C.numPointShadows = E, C.numSpotShadows = y, C.numSpotMaps = O, C.numLightProbes = b, n.version = Mm++);
  }
  function l(c, h) {
    let f = 0, d = 0, m = 0, g = 0, _ = 0;
    const p = h.matrixWorldInverse;
    for (let u = 0, R = c.length; u < R; u++) {
      const E = c[u];
      if (E.isDirectionalLight) {
        const y = n.directional[f];
        y.direction.setFromMatrixPosition(E.matrixWorld), r.setFromMatrixPosition(E.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(p), f++;
      } else if (E.isSpotLight) {
        const y = n.spot[m];
        y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(p), y.direction.setFromMatrixPosition(E.matrixWorld), r.setFromMatrixPosition(E.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(p), m++;
      } else if (E.isRectAreaLight) {
        const y = n.rectArea[g];
        y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(p), o.identity(), s.copy(E.matrixWorld), s.premultiply(p), o.extractRotation(s), y.halfWidth.set(E.width * 0.5, 0, 0), y.halfHeight.set(0, E.height * 0.5, 0), y.halfWidth.applyMatrix4(o), y.halfHeight.applyMatrix4(o), g++;
      } else if (E.isPointLight) {
        const y = n.point[d];
        y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(p), d++;
      } else if (E.isHemisphereLight) {
        const y = n.hemi[_];
        y.direction.setFromMatrixPosition(E.matrixWorld), y.direction.transformDirection(p), _++;
      }
    }
  }
  return {
    setup: a,
    setupView: l,
    state: n
  };
}
function Yo(i) {
  const e = new Em(i), t = [], n = [];
  function r(h) {
    c.camera = h, t.length = 0, n.length = 0;
  }
  function s(h) {
    t.push(h);
  }
  function o(h) {
    n.push(h);
  }
  function a() {
    e.setup(t);
  }
  function l(h) {
    e.setupView(t, h);
  }
  const c = {
    lightsArray: t,
    shadowsArray: n,
    camera: null,
    lights: e,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: c,
    setupLights: a,
    setupLightsView: l,
    pushLight: s,
    pushShadow: o
  };
}
function bm(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const o = e.get(r);
    let a;
    return o === void 0 ? (a = new Yo(i), e.set(r, [a])) : s >= o.length ? (a = new Yo(i), o.push(a)) : a = o[s], a;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
class Tm extends Ri {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.depthPacking = vh, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Am extends Ri {
  static get type() {
    return "MeshDistanceMaterial";
  }
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const wm = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Rm = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Cm(i, e, t) {
  let n = new zl();
  const r = new se(), s = new se(), o = new lt(), a = new Tm({ depthPacking: xh }), l = new Am(), c = {}, h = t.maxTextureSize, f = { [wn]: At, [At]: wn, [Kt]: Kt }, d = new Rn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new se() },
      radius: { value: 4 }
    },
    vertexShader: wm,
    fragmentShader: Rm
  }), m = d.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const g = new pt();
  g.setAttribute(
    "position",
    new Xt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const _ = new Gt(g, d), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = ml;
  let u = this.type;
  this.render = function(w, b, C) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || w.length === 0) return;
    const S = i.getRenderTarget(), v = i.getActiveCubeFace(), A = i.getActiveMipmapLevel(), N = i.state;
    N.setBlending(Tn), N.buffers.color.setClear(1, 1, 1, 1), N.buffers.depth.setTest(!0), N.setScissorTest(!1);
    const F = u !== on && this.type === on, H = u === on && this.type !== on;
    for (let X = 0, W = w.length; X < W; X++) {
      const q = w[X], V = q.shadow;
      if (V === void 0) {
        console.warn("THREE.WebGLShadowMap:", q, "has no shadow.");
        continue;
      }
      if (V.autoUpdate === !1 && V.needsUpdate === !1) continue;
      r.copy(V.mapSize);
      const te = V.getFrameExtents();
      if (r.multiply(te), s.copy(V.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / te.x), r.x = s.x * te.x, V.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / te.y), r.y = s.y * te.y, V.mapSize.y = s.y)), V.map === null || F === !0 || H === !0) {
        const me = this.type !== on ? { minFilter: Wt, magFilter: Wt } : {};
        V.map !== null && V.map.dispose(), V.map = new Xn(r.x, r.y, me), V.map.texture.name = q.name + ".shadowMap", V.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(V.map), i.clear();
      const oe = V.getViewportCount();
      for (let me = 0; me < oe; me++) {
        const Ae = V.getViewport(me);
        o.set(
          s.x * Ae.x,
          s.y * Ae.y,
          s.x * Ae.z,
          s.y * Ae.w
        ), N.viewport(o), V.updateMatrices(q, me), n = V.getFrustum(), y(b, C, V.camera, q, this.type);
      }
      V.isPointLightShadow !== !0 && this.type === on && R(V, C), V.needsUpdate = !1;
    }
    u = this.type, p.needsUpdate = !1, i.setRenderTarget(S, v, A);
  };
  function R(w, b) {
    const C = e.update(_);
    d.defines.VSM_SAMPLES !== w.blurSamples && (d.defines.VSM_SAMPLES = w.blurSamples, m.defines.VSM_SAMPLES = w.blurSamples, d.needsUpdate = !0, m.needsUpdate = !0), w.mapPass === null && (w.mapPass = new Xn(r.x, r.y)), d.uniforms.shadow_pass.value = w.map.texture, d.uniforms.resolution.value = w.mapSize, d.uniforms.radius.value = w.radius, i.setRenderTarget(w.mapPass), i.clear(), i.renderBufferDirect(b, null, C, d, _, null), m.uniforms.shadow_pass.value = w.mapPass.texture, m.uniforms.resolution.value = w.mapSize, m.uniforms.radius.value = w.radius, i.setRenderTarget(w.map), i.clear(), i.renderBufferDirect(b, null, C, m, _, null);
  }
  function E(w, b, C, S) {
    let v = null;
    const A = C.isPointLight === !0 ? w.customDistanceMaterial : w.customDepthMaterial;
    if (A !== void 0)
      v = A;
    else if (v = C.isPointLight === !0 ? l : a, i.localClippingEnabled && b.clipShadows === !0 && Array.isArray(b.clippingPlanes) && b.clippingPlanes.length !== 0 || b.displacementMap && b.displacementScale !== 0 || b.alphaMap && b.alphaTest > 0 || b.map && b.alphaTest > 0) {
      const N = v.uuid, F = b.uuid;
      let H = c[N];
      H === void 0 && (H = {}, c[N] = H);
      let X = H[F];
      X === void 0 && (X = v.clone(), H[F] = X, b.addEventListener("dispose", O)), v = X;
    }
    if (v.visible = b.visible, v.wireframe = b.wireframe, S === on ? v.side = b.shadowSide !== null ? b.shadowSide : b.side : v.side = b.shadowSide !== null ? b.shadowSide : f[b.side], v.alphaMap = b.alphaMap, v.alphaTest = b.alphaTest, v.map = b.map, v.clipShadows = b.clipShadows, v.clippingPlanes = b.clippingPlanes, v.clipIntersection = b.clipIntersection, v.displacementMap = b.displacementMap, v.displacementScale = b.displacementScale, v.displacementBias = b.displacementBias, v.wireframeLinewidth = b.wireframeLinewidth, v.linewidth = b.linewidth, C.isPointLight === !0 && v.isMeshDistanceMaterial === !0) {
      const N = i.properties.get(v);
      N.light = C;
    }
    return v;
  }
  function y(w, b, C, S, v) {
    if (w.visible === !1) return;
    if (w.layers.test(b.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && v === on) && (!w.frustumCulled || n.intersectsObject(w))) {
      w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse, w.matrixWorld);
      const F = e.update(w), H = w.material;
      if (Array.isArray(H)) {
        const X = F.groups;
        for (let W = 0, q = X.length; W < q; W++) {
          const V = X[W], te = H[V.materialIndex];
          if (te && te.visible) {
            const oe = E(w, te, S, v);
            w.onBeforeShadow(i, w, b, C, F, oe, V), i.renderBufferDirect(C, null, F, oe, w, V), w.onAfterShadow(i, w, b, C, F, oe, V);
          }
        }
      } else if (H.visible) {
        const X = E(w, H, S, v);
        w.onBeforeShadow(i, w, b, C, F, X, null), i.renderBufferDirect(C, null, F, X, w, null), w.onAfterShadow(i, w, b, C, F, X, null);
      }
    }
    const N = w.children;
    for (let F = 0, H = N.length; F < H; F++)
      y(N[F], b, C, S, v);
  }
  function O(w) {
    w.target.removeEventListener("dispose", O);
    for (const C in c) {
      const S = c[C], v = w.target.uuid;
      v in S && (S[v].dispose(), delete S[v]);
    }
  }
}
const Pm = {
  [Os]: Bs,
  [zs]: Vs,
  [ks]: Gs,
  [Mi]: Hs,
  [Bs]: Os,
  [Vs]: zs,
  [Gs]: ks,
  [Hs]: Mi
};
function Lm(i, e) {
  function t() {
    let L = !1;
    const re = new lt();
    let G = null;
    const j = new lt(0, 0, 0, 0);
    return {
      setMask: function(he) {
        G !== he && !L && (i.colorMask(he, he, he, he), G = he);
      },
      setLocked: function(he) {
        L = he;
      },
      setClear: function(he, le, Ce, at, _t) {
        _t === !0 && (he *= at, le *= at, Ce *= at), re.set(he, le, Ce, at), j.equals(re) === !1 && (i.clearColor(he, le, Ce, at), j.copy(re));
      },
      reset: function() {
        L = !1, G = null, j.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let L = !1, re = !1, G = null, j = null, he = null;
    return {
      setReversed: function(le) {
        if (re !== le) {
          const Ce = e.get("EXT_clip_control");
          re ? Ce.clipControlEXT(Ce.LOWER_LEFT_EXT, Ce.ZERO_TO_ONE_EXT) : Ce.clipControlEXT(Ce.LOWER_LEFT_EXT, Ce.NEGATIVE_ONE_TO_ONE_EXT);
          const at = he;
          he = null, this.setClear(at);
        }
        re = le;
      },
      getReversed: function() {
        return re;
      },
      setTest: function(le) {
        le ? ne(i.DEPTH_TEST) : be(i.DEPTH_TEST);
      },
      setMask: function(le) {
        G !== le && !L && (i.depthMask(le), G = le);
      },
      setFunc: function(le) {
        if (re && (le = Pm[le]), j !== le) {
          switch (le) {
            case Os:
              i.depthFunc(i.NEVER);
              break;
            case Bs:
              i.depthFunc(i.ALWAYS);
              break;
            case zs:
              i.depthFunc(i.LESS);
              break;
            case Mi:
              i.depthFunc(i.LEQUAL);
              break;
            case ks:
              i.depthFunc(i.EQUAL);
              break;
            case Hs:
              i.depthFunc(i.GEQUAL);
              break;
            case Vs:
              i.depthFunc(i.GREATER);
              break;
            case Gs:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          j = le;
        }
      },
      setLocked: function(le) {
        L = le;
      },
      setClear: function(le) {
        he !== le && (re && (le = 1 - le), i.clearDepth(le), he = le);
      },
      reset: function() {
        L = !1, G = null, j = null, he = null, re = !1;
      }
    };
  }
  function r() {
    let L = !1, re = null, G = null, j = null, he = null, le = null, Ce = null, at = null, _t = null;
    return {
      setTest: function(Ze) {
        L || (Ze ? ne(i.STENCIL_TEST) : be(i.STENCIL_TEST));
      },
      setMask: function(Ze) {
        re !== Ze && !L && (i.stencilMask(Ze), re = Ze);
      },
      setFunc: function(Ze, Ot, Qt) {
        (G !== Ze || j !== Ot || he !== Qt) && (i.stencilFunc(Ze, Ot, Qt), G = Ze, j = Ot, he = Qt);
      },
      setOp: function(Ze, Ot, Qt) {
        (le !== Ze || Ce !== Ot || at !== Qt) && (i.stencilOp(Ze, Ot, Qt), le = Ze, Ce = Ot, at = Qt);
      },
      setLocked: function(Ze) {
        L = Ze;
      },
      setClear: function(Ze) {
        _t !== Ze && (i.clearStencil(Ze), _t = Ze);
      },
      reset: function() {
        L = !1, re = null, G = null, j = null, he = null, le = null, Ce = null, at = null, _t = null;
      }
    };
  }
  const s = new t(), o = new n(), a = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, f = {}, d = /* @__PURE__ */ new WeakMap(), m = [], g = null, _ = !1, p = null, u = null, R = null, E = null, y = null, O = null, w = null, b = new Xe(0, 0, 0), C = 0, S = !1, v = null, A = null, N = null, F = null, H = null;
  const X = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let W = !1, q = 0;
  const V = i.getParameter(i.VERSION);
  V.indexOf("WebGL") !== -1 ? (q = parseFloat(/^WebGL (\d)/.exec(V)[1]), W = q >= 1) : V.indexOf("OpenGL ES") !== -1 && (q = parseFloat(/^OpenGL ES (\d)/.exec(V)[1]), W = q >= 2);
  let te = null, oe = {};
  const me = i.getParameter(i.SCISSOR_BOX), Ae = i.getParameter(i.VIEWPORT), Ne = new lt().fromArray(me), Y = new lt().fromArray(Ae);
  function J(L, re, G, j) {
    const he = new Uint8Array(4), le = i.createTexture();
    i.bindTexture(L, le), i.texParameteri(L, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(L, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ce = 0; Ce < G; Ce++)
      L === i.TEXTURE_3D || L === i.TEXTURE_2D_ARRAY ? i.texImage3D(re, 0, i.RGBA, 1, 1, j, 0, i.RGBA, i.UNSIGNED_BYTE, he) : i.texImage2D(re + Ce, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, he);
    return le;
  }
  const pe = {};
  pe[i.TEXTURE_2D] = J(i.TEXTURE_2D, i.TEXTURE_2D, 1), pe[i.TEXTURE_CUBE_MAP] = J(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), pe[i.TEXTURE_2D_ARRAY] = J(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), pe[i.TEXTURE_3D] = J(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), o.setClear(1), a.setClear(0), ne(i.DEPTH_TEST), o.setFunc(Mi), Be(!1), ze(ja), ne(i.CULL_FACE), U(Tn);
  function ne(L) {
    h[L] !== !0 && (i.enable(L), h[L] = !0);
  }
  function be(L) {
    h[L] !== !1 && (i.disable(L), h[L] = !1);
  }
  function Re(L, re) {
    return f[L] !== re ? (i.bindFramebuffer(L, re), f[L] = re, L === i.DRAW_FRAMEBUFFER && (f[i.FRAMEBUFFER] = re), L === i.FRAMEBUFFER && (f[i.DRAW_FRAMEBUFFER] = re), !0) : !1;
  }
  function Ue(L, re) {
    let G = m, j = !1;
    if (L) {
      G = d.get(re), G === void 0 && (G = [], d.set(re, G));
      const he = L.textures;
      if (G.length !== he.length || G[0] !== i.COLOR_ATTACHMENT0) {
        for (let le = 0, Ce = he.length; le < Ce; le++)
          G[le] = i.COLOR_ATTACHMENT0 + le;
        G.length = he.length, j = !0;
      }
    } else
      G[0] !== i.BACK && (G[0] = i.BACK, j = !0);
    j && i.drawBuffers(G);
  }
  function it(L) {
    return g !== L ? (i.useProgram(L), g = L, !0) : !1;
  }
  const He = {
    [zn]: i.FUNC_ADD,
    [Xc]: i.FUNC_SUBTRACT,
    [Yc]: i.FUNC_REVERSE_SUBTRACT
  };
  He[qc] = i.MIN, He[Zc] = i.MAX;
  const ot = {
    [Kc]: i.ZERO,
    [jc]: i.ONE,
    [$c]: i.SRC_COLOR,
    [Ns]: i.SRC_ALPHA,
    [ih]: i.SRC_ALPHA_SATURATE,
    [th]: i.DST_COLOR,
    [Qc]: i.DST_ALPHA,
    [Jc]: i.ONE_MINUS_SRC_COLOR,
    [Fs]: i.ONE_MINUS_SRC_ALPHA,
    [nh]: i.ONE_MINUS_DST_COLOR,
    [eh]: i.ONE_MINUS_DST_ALPHA,
    [rh]: i.CONSTANT_COLOR,
    [sh]: i.ONE_MINUS_CONSTANT_COLOR,
    [ah]: i.CONSTANT_ALPHA,
    [oh]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function U(L, re, G, j, he, le, Ce, at, _t, Ze) {
    if (L === Tn) {
      _ === !0 && (be(i.BLEND), _ = !1);
      return;
    }
    if (_ === !1 && (ne(i.BLEND), _ = !0), L !== Wc) {
      if (L !== p || Ze !== S) {
        if ((u !== zn || y !== zn) && (i.blendEquation(i.FUNC_ADD), u = zn, y = zn), Ze)
          switch (L) {
            case vi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case $a:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case Ja:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Qa:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", L);
              break;
          }
        else
          switch (L) {
            case vi:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case $a:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case Ja:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Qa:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", L);
              break;
          }
        R = null, E = null, O = null, w = null, b.set(0, 0, 0), C = 0, p = L, S = Ze;
      }
      return;
    }
    he = he || re, le = le || G, Ce = Ce || j, (re !== u || he !== y) && (i.blendEquationSeparate(He[re], He[he]), u = re, y = he), (G !== R || j !== E || le !== O || Ce !== w) && (i.blendFuncSeparate(ot[G], ot[j], ot[le], ot[Ce]), R = G, E = j, O = le, w = Ce), (at.equals(b) === !1 || _t !== C) && (i.blendColor(at.r, at.g, at.b, _t), b.copy(at), C = _t), p = L, S = !1;
  }
  function Pt(L, re) {
    L.side === Kt ? be(i.CULL_FACE) : ne(i.CULL_FACE);
    let G = L.side === At;
    re && (G = !G), Be(G), L.blending === vi && L.transparent === !1 ? U(Tn) : U(L.blending, L.blendEquation, L.blendSrc, L.blendDst, L.blendEquationAlpha, L.blendSrcAlpha, L.blendDstAlpha, L.blendColor, L.blendAlpha, L.premultipliedAlpha), o.setFunc(L.depthFunc), o.setTest(L.depthTest), o.setMask(L.depthWrite), s.setMask(L.colorWrite);
    const j = L.stencilWrite;
    a.setTest(j), j && (a.setMask(L.stencilWriteMask), a.setFunc(L.stencilFunc, L.stencilRef, L.stencilFuncMask), a.setOp(L.stencilFail, L.stencilZFail, L.stencilZPass)), et(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits), L.alphaToCoverage === !0 ? ne(i.SAMPLE_ALPHA_TO_COVERAGE) : be(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Be(L) {
    v !== L && (L ? i.frontFace(i.CW) : i.frontFace(i.CCW), v = L);
  }
  function ze(L) {
    L !== Hc ? (ne(i.CULL_FACE), L !== A && (L === ja ? i.cullFace(i.BACK) : L === Vc ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : be(i.CULL_FACE), A = L;
  }
  function Se(L) {
    L !== N && (W && i.lineWidth(L), N = L);
  }
  function et(L, re, G) {
    L ? (ne(i.POLYGON_OFFSET_FILL), (F !== re || H !== G) && (i.polygonOffset(re, G), F = re, H = G)) : be(i.POLYGON_OFFSET_FILL);
  }
  function Me(L) {
    L ? ne(i.SCISSOR_TEST) : be(i.SCISSOR_TEST);
  }
  function T(L) {
    L === void 0 && (L = i.TEXTURE0 + X - 1), te !== L && (i.activeTexture(L), te = L);
  }
  function x(L, re, G) {
    G === void 0 && (te === null ? G = i.TEXTURE0 + X - 1 : G = te);
    let j = oe[G];
    j === void 0 && (j = { type: void 0, texture: void 0 }, oe[G] = j), (j.type !== L || j.texture !== re) && (te !== G && (i.activeTexture(G), te = G), i.bindTexture(L, re || pe[L]), j.type = L, j.texture = re);
  }
  function B() {
    const L = oe[te];
    L !== void 0 && L.type !== void 0 && (i.bindTexture(L.type, null), L.type = void 0, L.texture = void 0);
  }
  function K() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function $() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Z() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function xe() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function ae() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function ue() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Ve() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Q() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function fe() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Ee() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Te(L) {
    Ne.equals(L) === !1 && (i.scissor(L.x, L.y, L.z, L.w), Ne.copy(L));
  }
  function de(L) {
    Y.equals(L) === !1 && (i.viewport(L.x, L.y, L.z, L.w), Y.copy(L));
  }
  function ke(L, re) {
    let G = c.get(re);
    G === void 0 && (G = /* @__PURE__ */ new WeakMap(), c.set(re, G));
    let j = G.get(L);
    j === void 0 && (j = i.getUniformBlockIndex(re, L.name), G.set(L, j));
  }
  function De(L, re) {
    const j = c.get(re).get(L);
    l.get(re) !== j && (i.uniformBlockBinding(re, j, L.__bindingPointIndex), l.set(re, j));
  }
  function Je() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), o.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, te = null, oe = {}, f = {}, d = /* @__PURE__ */ new WeakMap(), m = [], g = null, _ = !1, p = null, u = null, R = null, E = null, y = null, O = null, w = null, b = new Xe(0, 0, 0), C = 0, S = !1, v = null, A = null, N = null, F = null, H = null, Ne.set(0, 0, i.canvas.width, i.canvas.height), Y.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), o.reset(), a.reset();
  }
  return {
    buffers: {
      color: s,
      depth: o,
      stencil: a
    },
    enable: ne,
    disable: be,
    bindFramebuffer: Re,
    drawBuffers: Ue,
    useProgram: it,
    setBlending: U,
    setMaterial: Pt,
    setFlipSided: Be,
    setCullFace: ze,
    setLineWidth: Se,
    setPolygonOffset: et,
    setScissorTest: Me,
    activeTexture: T,
    bindTexture: x,
    unbindTexture: B,
    compressedTexImage2D: K,
    compressedTexImage3D: $,
    texImage2D: fe,
    texImage3D: Ee,
    updateUBOMapping: ke,
    uniformBlockBinding: De,
    texStorage2D: Ve,
    texStorage3D: Q,
    texSubImage2D: Z,
    texSubImage3D: xe,
    compressedTexSubImage2D: ae,
    compressedTexSubImage3D: ue,
    scissor: Te,
    viewport: de,
    reset: Je
  };
}
function qo(i, e, t, n) {
  const r = Dm(n);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case Ml:
      return i * e;
    case El:
      return i * e;
    case bl:
      return i * e * 2;
    case Tl:
      return i * e / r.components * r.byteLength;
    case Pa:
      return i * e / r.components * r.byteLength;
    case Al:
      return i * e * 2 / r.components * r.byteLength;
    case La:
      return i * e * 2 / r.components * r.byteLength;
    case Sl:
      return i * e * 3 / r.components * r.byteLength;
    case Vt:
      return i * e * 4 / r.components * r.byteLength;
    case Da:
      return i * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case Lr:
    case Dr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Ir:
    case Ur:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case Ks:
    case $s:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case Zs:
    case js:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case Js:
    case Qs:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case ea:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case ta:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case na:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case ia:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case ra:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case sa:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case aa:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case oa:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case la:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case ca:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case ha:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case ua:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case fa:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case da:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case pa:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case Nr:
    case ma:
    case ga:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case wl:
    case _a:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case va:
    case xa:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function Dm(i) {
  switch (i) {
    case dn:
    case vl:
      return { byteLength: 1, components: 1 };
    case Xi:
    case xl:
    case Ki:
      return { byteLength: 2, components: 1 };
    case Ra:
    case Ca:
      return { byteLength: 2, components: 4 };
    case Wn:
    case wa:
    case cn:
      return { byteLength: 4, components: 1 };
    case yl:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function Im(i, e, t, n, r, s, o) {
  const a = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new se(), h = /* @__PURE__ */ new WeakMap();
  let f;
  const d = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(T, x) {
    return m ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(T, x)
    ) : kr("canvas");
  }
  function _(T, x, B) {
    let K = 1;
    const $ = Me(T);
    if (($.width > B || $.height > B) && (K = B / Math.max($.width, $.height)), K < 1)
      if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) {
        const Z = Math.floor(K * $.width), xe = Math.floor(K * $.height);
        f === void 0 && (f = g(Z, xe));
        const ae = x ? g(Z, xe) : f;
        return ae.width = Z, ae.height = xe, ae.getContext("2d").drawImage(T, 0, 0, Z, xe), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + $.width + "x" + $.height + ") to (" + Z + "x" + xe + ")."), ae;
      } else
        return "data" in T && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + $.width + "x" + $.height + ")."), T;
    return T;
  }
  function p(T) {
    return T.generateMipmaps;
  }
  function u(T) {
    i.generateMipmap(T);
  }
  function R(T) {
    return T.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : T.isWebGL3DRenderTarget ? i.TEXTURE_3D : T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function E(T, x, B, K, $ = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'");
    }
    let Z = x;
    if (x === i.RED && (B === i.FLOAT && (Z = i.R32F), B === i.HALF_FLOAT && (Z = i.R16F), B === i.UNSIGNED_BYTE && (Z = i.R8)), x === i.RED_INTEGER && (B === i.UNSIGNED_BYTE && (Z = i.R8UI), B === i.UNSIGNED_SHORT && (Z = i.R16UI), B === i.UNSIGNED_INT && (Z = i.R32UI), B === i.BYTE && (Z = i.R8I), B === i.SHORT && (Z = i.R16I), B === i.INT && (Z = i.R32I)), x === i.RG && (B === i.FLOAT && (Z = i.RG32F), B === i.HALF_FLOAT && (Z = i.RG16F), B === i.UNSIGNED_BYTE && (Z = i.RG8)), x === i.RG_INTEGER && (B === i.UNSIGNED_BYTE && (Z = i.RG8UI), B === i.UNSIGNED_SHORT && (Z = i.RG16UI), B === i.UNSIGNED_INT && (Z = i.RG32UI), B === i.BYTE && (Z = i.RG8I), B === i.SHORT && (Z = i.RG16I), B === i.INT && (Z = i.RG32I)), x === i.RGB_INTEGER && (B === i.UNSIGNED_BYTE && (Z = i.RGB8UI), B === i.UNSIGNED_SHORT && (Z = i.RGB16UI), B === i.UNSIGNED_INT && (Z = i.RGB32UI), B === i.BYTE && (Z = i.RGB8I), B === i.SHORT && (Z = i.RGB16I), B === i.INT && (Z = i.RGB32I)), x === i.RGBA_INTEGER && (B === i.UNSIGNED_BYTE && (Z = i.RGBA8UI), B === i.UNSIGNED_SHORT && (Z = i.RGBA16UI), B === i.UNSIGNED_INT && (Z = i.RGBA32UI), B === i.BYTE && (Z = i.RGBA8I), B === i.SHORT && (Z = i.RGBA16I), B === i.INT && (Z = i.RGBA32I)), x === i.RGB && B === i.UNSIGNED_INT_5_9_9_9_REV && (Z = i.RGB9_E5), x === i.RGBA) {
      const xe = $ ? Yr : Ge.getTransfer(K);
      B === i.FLOAT && (Z = i.RGBA32F), B === i.HALF_FLOAT && (Z = i.RGBA16F), B === i.UNSIGNED_BYTE && (Z = xe === Ke ? i.SRGB8_ALPHA8 : i.RGBA8), B === i.UNSIGNED_SHORT_4_4_4_4 && (Z = i.RGBA4), B === i.UNSIGNED_SHORT_5_5_5_1 && (Z = i.RGB5_A1);
    }
    return (Z === i.R16F || Z === i.R32F || Z === i.RG16F || Z === i.RG32F || Z === i.RGBA16F || Z === i.RGBA32F) && e.get("EXT_color_buffer_float"), Z;
  }
  function y(T, x) {
    let B;
    return T ? x === null || x === Wn || x === bi ? B = i.DEPTH24_STENCIL8 : x === cn ? B = i.DEPTH32F_STENCIL8 : x === Xi && (B = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : x === null || x === Wn || x === bi ? B = i.DEPTH_COMPONENT24 : x === cn ? B = i.DEPTH_COMPONENT32F : x === Xi && (B = i.DEPTH_COMPONENT16), B;
  }
  function O(T, x) {
    return p(T) === !0 || T.isFramebufferTexture && T.minFilter !== Wt && T.minFilter !== $t ? Math.log2(Math.max(x.width, x.height)) + 1 : T.mipmaps !== void 0 && T.mipmaps.length > 0 ? T.mipmaps.length : T.isCompressedTexture && Array.isArray(T.image) ? x.mipmaps.length : 1;
  }
  function w(T) {
    const x = T.target;
    x.removeEventListener("dispose", w), C(x), x.isVideoTexture && h.delete(x);
  }
  function b(T) {
    const x = T.target;
    x.removeEventListener("dispose", b), v(x);
  }
  function C(T) {
    const x = n.get(T);
    if (x.__webglInit === void 0) return;
    const B = T.source, K = d.get(B);
    if (K) {
      const $ = K[x.__cacheKey];
      $.usedTimes--, $.usedTimes === 0 && S(T), Object.keys(K).length === 0 && d.delete(B);
    }
    n.remove(T);
  }
  function S(T) {
    const x = n.get(T);
    i.deleteTexture(x.__webglTexture);
    const B = T.source, K = d.get(B);
    delete K[x.__cacheKey], o.memory.textures--;
  }
  function v(T) {
    const x = n.get(T);
    if (T.depthTexture && (T.depthTexture.dispose(), n.remove(T.depthTexture)), T.isWebGLCubeRenderTarget)
      for (let K = 0; K < 6; K++) {
        if (Array.isArray(x.__webglFramebuffer[K]))
          for (let $ = 0; $ < x.__webglFramebuffer[K].length; $++) i.deleteFramebuffer(x.__webglFramebuffer[K][$]);
        else
          i.deleteFramebuffer(x.__webglFramebuffer[K]);
        x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer[K]);
      }
    else {
      if (Array.isArray(x.__webglFramebuffer))
        for (let K = 0; K < x.__webglFramebuffer.length; K++) i.deleteFramebuffer(x.__webglFramebuffer[K]);
      else
        i.deleteFramebuffer(x.__webglFramebuffer);
      if (x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer), x.__webglMultisampledFramebuffer && i.deleteFramebuffer(x.__webglMultisampledFramebuffer), x.__webglColorRenderbuffer)
        for (let K = 0; K < x.__webglColorRenderbuffer.length; K++)
          x.__webglColorRenderbuffer[K] && i.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);
      x.__webglDepthRenderbuffer && i.deleteRenderbuffer(x.__webglDepthRenderbuffer);
    }
    const B = T.textures;
    for (let K = 0, $ = B.length; K < $; K++) {
      const Z = n.get(B[K]);
      Z.__webglTexture && (i.deleteTexture(Z.__webglTexture), o.memory.textures--), n.remove(B[K]);
    }
    n.remove(T);
  }
  let A = 0;
  function N() {
    A = 0;
  }
  function F() {
    const T = A;
    return T >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + r.maxTextures), A += 1, T;
  }
  function H(T) {
    const x = [];
    return x.push(T.wrapS), x.push(T.wrapT), x.push(T.wrapR || 0), x.push(T.magFilter), x.push(T.minFilter), x.push(T.anisotropy), x.push(T.internalFormat), x.push(T.format), x.push(T.type), x.push(T.generateMipmaps), x.push(T.premultiplyAlpha), x.push(T.flipY), x.push(T.unpackAlignment), x.push(T.colorSpace), x.join();
  }
  function X(T, x) {
    const B = n.get(T);
    if (T.isVideoTexture && Se(T), T.isRenderTargetTexture === !1 && T.version > 0 && B.__version !== T.version) {
      const K = T.image;
      if (K === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (K.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Y(B, T, x);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, B.__webglTexture, i.TEXTURE0 + x);
  }
  function W(T, x) {
    const B = n.get(T);
    if (T.version > 0 && B.__version !== T.version) {
      Y(B, T, x);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, B.__webglTexture, i.TEXTURE0 + x);
  }
  function q(T, x) {
    const B = n.get(T);
    if (T.version > 0 && B.__version !== T.version) {
      Y(B, T, x);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, B.__webglTexture, i.TEXTURE0 + x);
  }
  function V(T, x) {
    const B = n.get(T);
    if (T.version > 0 && B.__version !== T.version) {
      J(B, T, x);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, B.__webglTexture, i.TEXTURE0 + x);
  }
  const te = {
    [Ys]: i.REPEAT,
    [Hn]: i.CLAMP_TO_EDGE,
    [qs]: i.MIRRORED_REPEAT
  }, oe = {
    [Wt]: i.NEAREST,
    [_h]: i.NEAREST_MIPMAP_NEAREST,
    [er]: i.NEAREST_MIPMAP_LINEAR,
    [$t]: i.LINEAR,
    [Jr]: i.LINEAR_MIPMAP_NEAREST,
    [Vn]: i.LINEAR_MIPMAP_LINEAR
  }, me = {
    [Sh]: i.NEVER,
    [Rh]: i.ALWAYS,
    [Eh]: i.LESS,
    [Rl]: i.LEQUAL,
    [bh]: i.EQUAL,
    [wh]: i.GEQUAL,
    [Th]: i.GREATER,
    [Ah]: i.NOTEQUAL
  };
  function Ae(T, x) {
    if (x.type === cn && e.has("OES_texture_float_linear") === !1 && (x.magFilter === $t || x.magFilter === Jr || x.magFilter === er || x.magFilter === Vn || x.minFilter === $t || x.minFilter === Jr || x.minFilter === er || x.minFilter === Vn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(T, i.TEXTURE_WRAP_S, te[x.wrapS]), i.texParameteri(T, i.TEXTURE_WRAP_T, te[x.wrapT]), (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) && i.texParameteri(T, i.TEXTURE_WRAP_R, te[x.wrapR]), i.texParameteri(T, i.TEXTURE_MAG_FILTER, oe[x.magFilter]), i.texParameteri(T, i.TEXTURE_MIN_FILTER, oe[x.minFilter]), x.compareFunction && (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, me[x.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (x.magFilter === Wt || x.minFilter !== er && x.minFilter !== Vn || x.type === cn && e.has("OES_texture_float_linear") === !1) return;
      if (x.anisotropy > 1 || n.get(x).__currentAnisotropy) {
        const B = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(T, B.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, r.getMaxAnisotropy())), n.get(x).__currentAnisotropy = x.anisotropy;
      }
    }
  }
  function Ne(T, x) {
    let B = !1;
    T.__webglInit === void 0 && (T.__webglInit = !0, x.addEventListener("dispose", w));
    const K = x.source;
    let $ = d.get(K);
    $ === void 0 && ($ = {}, d.set(K, $));
    const Z = H(x);
    if (Z !== T.__cacheKey) {
      $[Z] === void 0 && ($[Z] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, B = !0), $[Z].usedTimes++;
      const xe = $[T.__cacheKey];
      xe !== void 0 && ($[T.__cacheKey].usedTimes--, xe.usedTimes === 0 && S(x)), T.__cacheKey = Z, T.__webglTexture = $[Z].texture;
    }
    return B;
  }
  function Y(T, x, B) {
    let K = i.TEXTURE_2D;
    (x.isDataArrayTexture || x.isCompressedArrayTexture) && (K = i.TEXTURE_2D_ARRAY), x.isData3DTexture && (K = i.TEXTURE_3D);
    const $ = Ne(T, x), Z = x.source;
    t.bindTexture(K, T.__webglTexture, i.TEXTURE0 + B);
    const xe = n.get(Z);
    if (Z.version !== xe.__version || $ === !0) {
      t.activeTexture(i.TEXTURE0 + B);
      const ae = Ge.getPrimaries(Ge.workingColorSpace), ue = x.colorSpace === bn ? null : Ge.getPrimaries(x.colorSpace), Ve = x.colorSpace === bn || ae === ue ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ve);
      let Q = _(x.image, !1, r.maxTextureSize);
      Q = et(x, Q);
      const fe = s.convert(x.format, x.colorSpace), Ee = s.convert(x.type);
      let Te = E(x.internalFormat, fe, Ee, x.colorSpace, x.isVideoTexture);
      Ae(K, x);
      let de;
      const ke = x.mipmaps, De = x.isVideoTexture !== !0, Je = xe.__version === void 0 || $ === !0, L = Z.dataReady, re = O(x, Q);
      if (x.isDepthTexture)
        Te = y(x.format === Ti, x.type), Je && (De ? t.texStorage2D(i.TEXTURE_2D, 1, Te, Q.width, Q.height) : t.texImage2D(i.TEXTURE_2D, 0, Te, Q.width, Q.height, 0, fe, Ee, null));
      else if (x.isDataTexture)
        if (ke.length > 0) {
          De && Je && t.texStorage2D(i.TEXTURE_2D, re, Te, ke[0].width, ke[0].height);
          for (let G = 0, j = ke.length; G < j; G++)
            de = ke[G], De ? L && t.texSubImage2D(i.TEXTURE_2D, G, 0, 0, de.width, de.height, fe, Ee, de.data) : t.texImage2D(i.TEXTURE_2D, G, Te, de.width, de.height, 0, fe, Ee, de.data);
          x.generateMipmaps = !1;
        } else
          De ? (Je && t.texStorage2D(i.TEXTURE_2D, re, Te, Q.width, Q.height), L && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Q.width, Q.height, fe, Ee, Q.data)) : t.texImage2D(i.TEXTURE_2D, 0, Te, Q.width, Q.height, 0, fe, Ee, Q.data);
      else if (x.isCompressedTexture)
        if (x.isCompressedArrayTexture) {
          De && Je && t.texStorage3D(i.TEXTURE_2D_ARRAY, re, Te, ke[0].width, ke[0].height, Q.depth);
          for (let G = 0, j = ke.length; G < j; G++)
            if (de = ke[G], x.format !== Vt)
              if (fe !== null)
                if (De) {
                  if (L)
                    if (x.layerUpdates.size > 0) {
                      const he = qo(de.width, de.height, x.format, x.type);
                      for (const le of x.layerUpdates) {
                        const Ce = de.data.subarray(
                          le * he / de.data.BYTES_PER_ELEMENT,
                          (le + 1) * he / de.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, G, 0, 0, le, de.width, de.height, 1, fe, Ce);
                      }
                      x.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, G, 0, 0, 0, de.width, de.height, Q.depth, fe, de.data);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, G, Te, de.width, de.height, Q.depth, 0, de.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              De ? L && t.texSubImage3D(i.TEXTURE_2D_ARRAY, G, 0, 0, 0, de.width, de.height, Q.depth, fe, Ee, de.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, G, Te, de.width, de.height, Q.depth, 0, fe, Ee, de.data);
        } else {
          De && Je && t.texStorage2D(i.TEXTURE_2D, re, Te, ke[0].width, ke[0].height);
          for (let G = 0, j = ke.length; G < j; G++)
            de = ke[G], x.format !== Vt ? fe !== null ? De ? L && t.compressedTexSubImage2D(i.TEXTURE_2D, G, 0, 0, de.width, de.height, fe, de.data) : t.compressedTexImage2D(i.TEXTURE_2D, G, Te, de.width, de.height, 0, de.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : De ? L && t.texSubImage2D(i.TEXTURE_2D, G, 0, 0, de.width, de.height, fe, Ee, de.data) : t.texImage2D(i.TEXTURE_2D, G, Te, de.width, de.height, 0, fe, Ee, de.data);
        }
      else if (x.isDataArrayTexture)
        if (De) {
          if (Je && t.texStorage3D(i.TEXTURE_2D_ARRAY, re, Te, Q.width, Q.height, Q.depth), L)
            if (x.layerUpdates.size > 0) {
              const G = qo(Q.width, Q.height, x.format, x.type);
              for (const j of x.layerUpdates) {
                const he = Q.data.subarray(
                  j * G / Q.data.BYTES_PER_ELEMENT,
                  (j + 1) * G / Q.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, j, Q.width, Q.height, 1, fe, Ee, he);
              }
              x.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Q.width, Q.height, Q.depth, fe, Ee, Q.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, Te, Q.width, Q.height, Q.depth, 0, fe, Ee, Q.data);
      else if (x.isData3DTexture)
        De ? (Je && t.texStorage3D(i.TEXTURE_3D, re, Te, Q.width, Q.height, Q.depth), L && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, Q.width, Q.height, Q.depth, fe, Ee, Q.data)) : t.texImage3D(i.TEXTURE_3D, 0, Te, Q.width, Q.height, Q.depth, 0, fe, Ee, Q.data);
      else if (x.isFramebufferTexture) {
        if (Je)
          if (De)
            t.texStorage2D(i.TEXTURE_2D, re, Te, Q.width, Q.height);
          else {
            let G = Q.width, j = Q.height;
            for (let he = 0; he < re; he++)
              t.texImage2D(i.TEXTURE_2D, he, Te, G, j, 0, fe, Ee, null), G >>= 1, j >>= 1;
          }
      } else if (ke.length > 0) {
        if (De && Je) {
          const G = Me(ke[0]);
          t.texStorage2D(i.TEXTURE_2D, re, Te, G.width, G.height);
        }
        for (let G = 0, j = ke.length; G < j; G++)
          de = ke[G], De ? L && t.texSubImage2D(i.TEXTURE_2D, G, 0, 0, fe, Ee, de) : t.texImage2D(i.TEXTURE_2D, G, Te, fe, Ee, de);
        x.generateMipmaps = !1;
      } else if (De) {
        if (Je) {
          const G = Me(Q);
          t.texStorage2D(i.TEXTURE_2D, re, Te, G.width, G.height);
        }
        L && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, fe, Ee, Q);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, Te, fe, Ee, Q);
      p(x) && u(K), xe.__version = Z.version, x.onUpdate && x.onUpdate(x);
    }
    T.__version = x.version;
  }
  function J(T, x, B) {
    if (x.image.length !== 6) return;
    const K = Ne(T, x), $ = x.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + B);
    const Z = n.get($);
    if ($.version !== Z.__version || K === !0) {
      t.activeTexture(i.TEXTURE0 + B);
      const xe = Ge.getPrimaries(Ge.workingColorSpace), ae = x.colorSpace === bn ? null : Ge.getPrimaries(x.colorSpace), ue = x.colorSpace === bn || xe === ae ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ue);
      const Ve = x.isCompressedTexture || x.image[0].isCompressedTexture, Q = x.image[0] && x.image[0].isDataTexture, fe = [];
      for (let j = 0; j < 6; j++)
        !Ve && !Q ? fe[j] = _(x.image[j], !0, r.maxCubemapSize) : fe[j] = Q ? x.image[j].image : x.image[j], fe[j] = et(x, fe[j]);
      const Ee = fe[0], Te = s.convert(x.format, x.colorSpace), de = s.convert(x.type), ke = E(x.internalFormat, Te, de, x.colorSpace), De = x.isVideoTexture !== !0, Je = Z.__version === void 0 || K === !0, L = $.dataReady;
      let re = O(x, Ee);
      Ae(i.TEXTURE_CUBE_MAP, x);
      let G;
      if (Ve) {
        De && Je && t.texStorage2D(i.TEXTURE_CUBE_MAP, re, ke, Ee.width, Ee.height);
        for (let j = 0; j < 6; j++) {
          G = fe[j].mipmaps;
          for (let he = 0; he < G.length; he++) {
            const le = G[he];
            x.format !== Vt ? Te !== null ? De ? L && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, he, 0, 0, le.width, le.height, Te, le.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, he, ke, le.width, le.height, 0, le.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, he, 0, 0, le.width, le.height, Te, de, le.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, he, ke, le.width, le.height, 0, Te, de, le.data);
          }
        }
      } else {
        if (G = x.mipmaps, De && Je) {
          G.length > 0 && re++;
          const j = Me(fe[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, re, ke, j.width, j.height);
        }
        for (let j = 0; j < 6; j++)
          if (Q) {
            De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, fe[j].width, fe[j].height, Te, de, fe[j].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, ke, fe[j].width, fe[j].height, 0, Te, de, fe[j].data);
            for (let he = 0; he < G.length; he++) {
              const Ce = G[he].image[j].image;
              De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, he + 1, 0, 0, Ce.width, Ce.height, Te, de, Ce.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, he + 1, ke, Ce.width, Ce.height, 0, Te, de, Ce.data);
            }
          } else {
            De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, Te, de, fe[j]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, ke, Te, de, fe[j]);
            for (let he = 0; he < G.length; he++) {
              const le = G[he];
              De ? L && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, he + 1, 0, 0, Te, de, le.image[j]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, he + 1, ke, Te, de, le.image[j]);
            }
          }
      }
      p(x) && u(i.TEXTURE_CUBE_MAP), Z.__version = $.version, x.onUpdate && x.onUpdate(x);
    }
    T.__version = x.version;
  }
  function pe(T, x, B, K, $, Z) {
    const xe = s.convert(B.format, B.colorSpace), ae = s.convert(B.type), ue = E(B.internalFormat, xe, ae, B.colorSpace), Ve = n.get(x), Q = n.get(B);
    if (Q.__renderTarget = x, !Ve.__hasExternalTextures) {
      const fe = Math.max(1, x.width >> Z), Ee = Math.max(1, x.height >> Z);
      $ === i.TEXTURE_3D || $ === i.TEXTURE_2D_ARRAY ? t.texImage3D($, Z, ue, fe, Ee, x.depth, 0, xe, ae, null) : t.texImage2D($, Z, ue, fe, Ee, 0, xe, ae, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, T), ze(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, K, $, Q.__webglTexture, 0, Be(x)) : ($ === i.TEXTURE_2D || $ >= i.TEXTURE_CUBE_MAP_POSITIVE_X && $ <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, K, $, Q.__webglTexture, Z), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function ne(T, x, B) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, T), x.depthBuffer) {
      const K = x.depthTexture, $ = K && K.isDepthTexture ? K.type : null, Z = y(x.stencilBuffer, $), xe = x.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ae = Be(x);
      ze(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ae, Z, x.width, x.height) : B ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ae, Z, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, Z, x.width, x.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, xe, i.RENDERBUFFER, T);
    } else {
      const K = x.textures;
      for (let $ = 0; $ < K.length; $++) {
        const Z = K[$], xe = s.convert(Z.format, Z.colorSpace), ae = s.convert(Z.type), ue = E(Z.internalFormat, xe, ae, Z.colorSpace), Ve = Be(x);
        B && ze(x) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Ve, ue, x.width, x.height) : ze(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Ve, ue, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, ue, x.width, x.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function be(T, x) {
    if (x && x.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, T), !(x.depthTexture && x.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const K = n.get(x.depthTexture);
    K.__renderTarget = x, (!K.__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) && (x.depthTexture.image.width = x.width, x.depthTexture.image.height = x.height, x.depthTexture.needsUpdate = !0), X(x.depthTexture, 0);
    const $ = K.__webglTexture, Z = Be(x);
    if (x.depthTexture.format === xi)
      ze(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else if (x.depthTexture.format === Ti)
      ze(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Re(T) {
    const x = n.get(T), B = T.isWebGLCubeRenderTarget === !0;
    if (x.__boundDepthTexture !== T.depthTexture) {
      const K = T.depthTexture;
      if (x.__depthDisposeCallback && x.__depthDisposeCallback(), K) {
        const $ = () => {
          delete x.__boundDepthTexture, delete x.__depthDisposeCallback, K.removeEventListener("dispose", $);
        };
        K.addEventListener("dispose", $), x.__depthDisposeCallback = $;
      }
      x.__boundDepthTexture = K;
    }
    if (T.depthTexture && !x.__autoAllocateDepthBuffer) {
      if (B) throw new Error("target.depthTexture not supported in Cube render targets");
      be(x.__webglFramebuffer, T);
    } else if (B) {
      x.__webglDepthbuffer = [];
      for (let K = 0; K < 6; K++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[K]), x.__webglDepthbuffer[K] === void 0)
          x.__webglDepthbuffer[K] = i.createRenderbuffer(), ne(x.__webglDepthbuffer[K], T, !1);
        else {
          const $ = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = x.__webglDepthbuffer[K];
          i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, $, i.RENDERBUFFER, Z);
        }
    } else if (t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer), x.__webglDepthbuffer === void 0)
      x.__webglDepthbuffer = i.createRenderbuffer(), ne(x.__webglDepthbuffer, T, !1);
    else {
      const K = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, $ = x.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, $), i.framebufferRenderbuffer(i.FRAMEBUFFER, K, i.RENDERBUFFER, $);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ue(T, x, B) {
    const K = n.get(T);
    x !== void 0 && pe(K.__webglFramebuffer, T, T.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), B !== void 0 && Re(T);
  }
  function it(T) {
    const x = T.texture, B = n.get(T), K = n.get(x);
    T.addEventListener("dispose", b);
    const $ = T.textures, Z = T.isWebGLCubeRenderTarget === !0, xe = $.length > 1;
    if (xe || (K.__webglTexture === void 0 && (K.__webglTexture = i.createTexture()), K.__version = x.version, o.memory.textures++), Z) {
      B.__webglFramebuffer = [];
      for (let ae = 0; ae < 6; ae++)
        if (x.mipmaps && x.mipmaps.length > 0) {
          B.__webglFramebuffer[ae] = [];
          for (let ue = 0; ue < x.mipmaps.length; ue++)
            B.__webglFramebuffer[ae][ue] = i.createFramebuffer();
        } else
          B.__webglFramebuffer[ae] = i.createFramebuffer();
    } else {
      if (x.mipmaps && x.mipmaps.length > 0) {
        B.__webglFramebuffer = [];
        for (let ae = 0; ae < x.mipmaps.length; ae++)
          B.__webglFramebuffer[ae] = i.createFramebuffer();
      } else
        B.__webglFramebuffer = i.createFramebuffer();
      if (xe)
        for (let ae = 0, ue = $.length; ae < ue; ae++) {
          const Ve = n.get($[ae]);
          Ve.__webglTexture === void 0 && (Ve.__webglTexture = i.createTexture(), o.memory.textures++);
        }
      if (T.samples > 0 && ze(T) === !1) {
        B.__webglMultisampledFramebuffer = i.createFramebuffer(), B.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, B.__webglMultisampledFramebuffer);
        for (let ae = 0; ae < $.length; ae++) {
          const ue = $[ae];
          B.__webglColorRenderbuffer[ae] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, B.__webglColorRenderbuffer[ae]);
          const Ve = s.convert(ue.format, ue.colorSpace), Q = s.convert(ue.type), fe = E(ue.internalFormat, Ve, Q, ue.colorSpace, T.isXRRenderTarget === !0), Ee = Be(T);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Ee, fe, T.width, T.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ae, i.RENDERBUFFER, B.__webglColorRenderbuffer[ae]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), T.depthBuffer && (B.__webglDepthRenderbuffer = i.createRenderbuffer(), ne(B.__webglDepthRenderbuffer, T, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (Z) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, K.__webglTexture), Ae(i.TEXTURE_CUBE_MAP, x);
      for (let ae = 0; ae < 6; ae++)
        if (x.mipmaps && x.mipmaps.length > 0)
          for (let ue = 0; ue < x.mipmaps.length; ue++)
            pe(B.__webglFramebuffer[ae][ue], T, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, ue);
        else
          pe(B.__webglFramebuffer[ae], T, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0);
      p(x) && u(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (xe) {
      for (let ae = 0, ue = $.length; ae < ue; ae++) {
        const Ve = $[ae], Q = n.get(Ve);
        t.bindTexture(i.TEXTURE_2D, Q.__webglTexture), Ae(i.TEXTURE_2D, Ve), pe(B.__webglFramebuffer, T, Ve, i.COLOR_ATTACHMENT0 + ae, i.TEXTURE_2D, 0), p(Ve) && u(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let ae = i.TEXTURE_2D;
      if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (ae = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(ae, K.__webglTexture), Ae(ae, x), x.mipmaps && x.mipmaps.length > 0)
        for (let ue = 0; ue < x.mipmaps.length; ue++)
          pe(B.__webglFramebuffer[ue], T, x, i.COLOR_ATTACHMENT0, ae, ue);
      else
        pe(B.__webglFramebuffer, T, x, i.COLOR_ATTACHMENT0, ae, 0);
      p(x) && u(ae), t.unbindTexture();
    }
    T.depthBuffer && Re(T);
  }
  function He(T) {
    const x = T.textures;
    for (let B = 0, K = x.length; B < K; B++) {
      const $ = x[B];
      if (p($)) {
        const Z = R(T), xe = n.get($).__webglTexture;
        t.bindTexture(Z, xe), u(Z), t.unbindTexture();
      }
    }
  }
  const ot = [], U = [];
  function Pt(T) {
    if (T.samples > 0) {
      if (ze(T) === !1) {
        const x = T.textures, B = T.width, K = T.height;
        let $ = i.COLOR_BUFFER_BIT;
        const Z = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, xe = n.get(T), ae = x.length > 1;
        if (ae)
          for (let ue = 0; ue < x.length; ue++)
            t.bindFramebuffer(i.FRAMEBUFFER, xe.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, xe.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, xe.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, xe.__webglFramebuffer);
        for (let ue = 0; ue < x.length; ue++) {
          if (T.resolveDepthBuffer && (T.depthBuffer && ($ |= i.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && ($ |= i.STENCIL_BUFFER_BIT)), ae) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, xe.__webglColorRenderbuffer[ue]);
            const Ve = n.get(x[ue]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Ve, 0);
          }
          i.blitFramebuffer(0, 0, B, K, 0, 0, B, K, $, i.NEAREST), l === !0 && (ot.length = 0, U.length = 0, ot.push(i.COLOR_ATTACHMENT0 + ue), T.depthBuffer && T.resolveDepthBuffer === !1 && (ot.push(Z), U.push(Z), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, U)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, ot));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ae)
          for (let ue = 0; ue < x.length; ue++) {
            t.bindFramebuffer(i.FRAMEBUFFER, xe.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.RENDERBUFFER, xe.__webglColorRenderbuffer[ue]);
            const Ve = n.get(x[ue]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, xe.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.TEXTURE_2D, Ve, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, xe.__webglMultisampledFramebuffer);
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && l) {
        const x = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [x]);
      }
    }
  }
  function Be(T) {
    return Math.min(r.maxSamples, T.samples);
  }
  function ze(T) {
    const x = n.get(T);
    return T.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1;
  }
  function Se(T) {
    const x = o.render.frame;
    h.get(T) !== x && (h.set(T, x), T.update());
  }
  function et(T, x) {
    const B = T.colorSpace, K = T.format, $ = T.type;
    return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || B !== wi && B !== bn && (Ge.getTransfer(B) === Ke ? (K !== Vt || $ !== dn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", B)), x;
  }
  function Me(T) {
    return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement ? (c.width = T.naturalWidth || T.width, c.height = T.naturalHeight || T.height) : typeof VideoFrame < "u" && T instanceof VideoFrame ? (c.width = T.displayWidth, c.height = T.displayHeight) : (c.width = T.width, c.height = T.height), c;
  }
  this.allocateTextureUnit = F, this.resetTextureUnits = N, this.setTexture2D = X, this.setTexture2DArray = W, this.setTexture3D = q, this.setTextureCube = V, this.rebindTextures = Ue, this.setupRenderTarget = it, this.updateRenderTargetMipmap = He, this.updateMultisampleRenderTarget = Pt, this.setupDepthRenderbuffer = Re, this.setupFrameBufferTexture = pe, this.useMultisampledRTT = ze;
}
function Um(i, e) {
  function t(n, r = bn) {
    let s;
    const o = Ge.getTransfer(r);
    if (n === dn) return i.UNSIGNED_BYTE;
    if (n === Ra) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === Ca) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === yl) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === vl) return i.BYTE;
    if (n === xl) return i.SHORT;
    if (n === Xi) return i.UNSIGNED_SHORT;
    if (n === wa) return i.INT;
    if (n === Wn) return i.UNSIGNED_INT;
    if (n === cn) return i.FLOAT;
    if (n === Ki) return i.HALF_FLOAT;
    if (n === Ml) return i.ALPHA;
    if (n === Sl) return i.RGB;
    if (n === Vt) return i.RGBA;
    if (n === El) return i.LUMINANCE;
    if (n === bl) return i.LUMINANCE_ALPHA;
    if (n === xi) return i.DEPTH_COMPONENT;
    if (n === Ti) return i.DEPTH_STENCIL;
    if (n === Tl) return i.RED;
    if (n === Pa) return i.RED_INTEGER;
    if (n === Al) return i.RG;
    if (n === La) return i.RG_INTEGER;
    if (n === Da) return i.RGBA_INTEGER;
    if (n === Lr || n === Dr || n === Ir || n === Ur)
      if (o === Ke)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === Lr) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === Dr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === Ir) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === Ur) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === Lr) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === Dr) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === Ir) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === Ur) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === Zs || n === Ks || n === js || n === $s)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === Zs) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Ks) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === js) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === $s) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === Js || n === Qs || n === ea)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === Js || n === Qs) return o === Ke ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === ea) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === ta || n === na || n === ia || n === ra || n === sa || n === aa || n === oa || n === la || n === ca || n === ha || n === ua || n === fa || n === da || n === pa)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === ta) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === na) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === ia) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === ra) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === sa) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === aa) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === oa) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === la) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === ca) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === ha) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === ua) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === fa) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === da) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === pa) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === Nr || n === ma || n === ga)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === Nr) return o === Ke ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === ma) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === ga) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === wl || n === _a || n === va || n === xa)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === Nr) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === _a) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === va) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === xa) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === bi ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
class Nm extends Ut {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class Gn extends Et {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Fm = { type: "move" };
class As {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Gn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Gn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new P(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new P()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Gn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new P(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new P()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let r = null, s = null, o = null;
    const a = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        o = !0;
        for (const _ of e.hand.values()) {
          const p = t.getJointPose(_, n), u = this._getHandJoint(c, _);
          p !== null && (u.matrix.fromArray(p.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = !0, u.jointRadius = p.radius), u.visible = p !== null;
        }
        const h = c.joints["index-finger-tip"], f = c.joints["thumb-tip"], d = h.position.distanceTo(f.position), m = 0.02, g = 5e-3;
        c.inputState.pinching && d > m + g ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && d <= m - g && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      a !== null && (r = t.getPose(e.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (a.matrix.fromArray(r.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(r.linearVelocity)) : a.hasLinearVelocity = !1, r.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(r.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(Fm)));
    }
    return a !== null && (a.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = o !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new Gn();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const Om = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Bm = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class zm {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t, n) {
    if (this.texture === null) {
      const r = new St(), s = e.properties.get(r);
      s.__webglTexture = t.texture, (t.depthNear != n.depthNear || t.depthFar != n.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = r;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new Rn({
        vertexShader: Om,
        fragmentShader: Bm,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Gt(new Zr(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class km extends Zn {
  constructor(e, t) {
    super();
    const n = this;
    let r = null, s = 1, o = null, a = "local-floor", l = 1, c = null, h = null, f = null, d = null, m = null, g = null;
    const _ = new zm(), p = t.getContextAttributes();
    let u = null, R = null;
    const E = [], y = [], O = new se();
    let w = null;
    const b = new Ut();
    b.viewport = new lt();
    const C = new Ut();
    C.viewport = new lt();
    const S = [b, C], v = new Nm();
    let A = null, N = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let J = E[Y];
      return J === void 0 && (J = new As(), E[Y] = J), J.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let J = E[Y];
      return J === void 0 && (J = new As(), E[Y] = J), J.getGripSpace();
    }, this.getHand = function(Y) {
      let J = E[Y];
      return J === void 0 && (J = new As(), E[Y] = J), J.getHandSpace();
    };
    function F(Y) {
      const J = y.indexOf(Y.inputSource);
      if (J === -1)
        return;
      const pe = E[J];
      pe !== void 0 && (pe.update(Y.inputSource, Y.frame, c || o), pe.dispatchEvent({ type: Y.type, data: Y.inputSource }));
    }
    function H() {
      r.removeEventListener("select", F), r.removeEventListener("selectstart", F), r.removeEventListener("selectend", F), r.removeEventListener("squeeze", F), r.removeEventListener("squeezestart", F), r.removeEventListener("squeezeend", F), r.removeEventListener("end", H), r.removeEventListener("inputsourceschange", X);
      for (let Y = 0; Y < E.length; Y++) {
        const J = y[Y];
        J !== null && (y[Y] = null, E[Y].disconnect(J));
      }
      A = null, N = null, _.reset(), e.setRenderTarget(u), m = null, d = null, f = null, r = null, R = null, Ne.stop(), n.isPresenting = !1, e.setPixelRatio(w), e.setSize(O.width, O.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Y) {
      s = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Y) {
      a = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || o;
    }, this.setReferenceSpace = function(Y) {
      c = Y;
    }, this.getBaseLayer = function() {
      return d !== null ? d : m;
    }, this.getBinding = function() {
      return f;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(Y) {
      if (r = Y, r !== null) {
        if (u = e.getRenderTarget(), r.addEventListener("select", F), r.addEventListener("selectstart", F), r.addEventListener("selectend", F), r.addEventListener("squeeze", F), r.addEventListener("squeezestart", F), r.addEventListener("squeezeend", F), r.addEventListener("end", H), r.addEventListener("inputsourceschange", X), p.xrCompatible !== !0 && await t.makeXRCompatible(), w = e.getPixelRatio(), e.getSize(O), r.renderState.layers === void 0) {
          const J = {
            antialias: p.antialias,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: s
          };
          m = new XRWebGLLayer(r, t, J), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), R = new Xn(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: Vt,
              type: dn,
              colorSpace: e.outputColorSpace,
              stencilBuffer: p.stencil
            }
          );
        } else {
          let J = null, pe = null, ne = null;
          p.depth && (ne = p.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, J = p.stencil ? Ti : xi, pe = p.stencil ? bi : Wn);
          const be = {
            colorFormat: t.RGBA8,
            depthFormat: ne,
            scaleFactor: s
          };
          f = new XRWebGLBinding(r, t), d = f.createProjectionLayer(be), r.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), R = new Xn(
            d.textureWidth,
            d.textureHeight,
            {
              format: Vt,
              type: dn,
              depthTexture: new Vl(d.textureWidth, d.textureHeight, pe, void 0, void 0, void 0, void 0, void 0, void 0, J),
              stencilBuffer: p.stencil,
              colorSpace: e.outputColorSpace,
              samples: p.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        R.isXRRenderTarget = !0, this.setFoveation(l), c = null, o = await r.requestReferenceSpace(a), Ne.setContext(r), Ne.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return _.getDepthTexture();
    };
    function X(Y) {
      for (let J = 0; J < Y.removed.length; J++) {
        const pe = Y.removed[J], ne = y.indexOf(pe);
        ne >= 0 && (y[ne] = null, E[ne].disconnect(pe));
      }
      for (let J = 0; J < Y.added.length; J++) {
        const pe = Y.added[J];
        let ne = y.indexOf(pe);
        if (ne === -1) {
          for (let Re = 0; Re < E.length; Re++)
            if (Re >= y.length) {
              y.push(pe), ne = Re;
              break;
            } else if (y[Re] === null) {
              y[Re] = pe, ne = Re;
              break;
            }
          if (ne === -1) break;
        }
        const be = E[ne];
        be && be.connect(pe);
      }
    }
    const W = new P(), q = new P();
    function V(Y, J, pe) {
      W.setFromMatrixPosition(J.matrixWorld), q.setFromMatrixPosition(pe.matrixWorld);
      const ne = W.distanceTo(q), be = J.projectionMatrix.elements, Re = pe.projectionMatrix.elements, Ue = be[14] / (be[10] - 1), it = be[14] / (be[10] + 1), He = (be[9] + 1) / be[5], ot = (be[9] - 1) / be[5], U = (be[8] - 1) / be[0], Pt = (Re[8] + 1) / Re[0], Be = Ue * U, ze = Ue * Pt, Se = ne / (-U + Pt), et = Se * -U;
      if (J.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(et), Y.translateZ(Se), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), be[10] === -1)
        Y.projectionMatrix.copy(J.projectionMatrix), Y.projectionMatrixInverse.copy(J.projectionMatrixInverse);
      else {
        const Me = Ue + Se, T = it + Se, x = Be - et, B = ze + (ne - et), K = He * it / T * Me, $ = ot * it / T * Me;
        Y.projectionMatrix.makePerspective(x, B, K, $, Me, T), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function te(Y, J) {
      J === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(J.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (r === null) return;
      let J = Y.near, pe = Y.far;
      _.texture !== null && (_.depthNear > 0 && (J = _.depthNear), _.depthFar > 0 && (pe = _.depthFar)), v.near = C.near = b.near = J, v.far = C.far = b.far = pe, (A !== v.near || N !== v.far) && (r.updateRenderState({
        depthNear: v.near,
        depthFar: v.far
      }), A = v.near, N = v.far), b.layers.mask = Y.layers.mask | 2, C.layers.mask = Y.layers.mask | 4, v.layers.mask = b.layers.mask | C.layers.mask;
      const ne = Y.parent, be = v.cameras;
      te(v, ne);
      for (let Re = 0; Re < be.length; Re++)
        te(be[Re], ne);
      be.length === 2 ? V(v, b, C) : v.projectionMatrix.copy(b.projectionMatrix), oe(Y, v, ne);
    };
    function oe(Y, J, pe) {
      pe === null ? Y.matrix.copy(J.matrixWorld) : (Y.matrix.copy(pe.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(J.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(J.projectionMatrix), Y.projectionMatrixInverse.copy(J.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = Ma * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return v;
    }, this.getFoveation = function() {
      if (!(d === null && m === null))
        return l;
    }, this.setFoveation = function(Y) {
      l = Y, d !== null && (d.fixedFoveation = Y), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return _.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return _.getMesh(v);
    };
    let me = null;
    function Ae(Y, J) {
      if (h = J.getViewerPose(c || o), g = J, h !== null) {
        const pe = h.views;
        m !== null && (e.setRenderTargetFramebuffer(R, m.framebuffer), e.setRenderTarget(R));
        let ne = !1;
        pe.length !== v.cameras.length && (v.cameras.length = 0, ne = !0);
        for (let Re = 0; Re < pe.length; Re++) {
          const Ue = pe[Re];
          let it = null;
          if (m !== null)
            it = m.getViewport(Ue);
          else {
            const ot = f.getViewSubImage(d, Ue);
            it = ot.viewport, Re === 0 && (e.setRenderTargetTextures(
              R,
              ot.colorTexture,
              d.ignoreDepthValues ? void 0 : ot.depthStencilTexture
            ), e.setRenderTarget(R));
          }
          let He = S[Re];
          He === void 0 && (He = new Ut(), He.layers.enable(Re), He.viewport = new lt(), S[Re] = He), He.matrix.fromArray(Ue.transform.matrix), He.matrix.decompose(He.position, He.quaternion, He.scale), He.projectionMatrix.fromArray(Ue.projectionMatrix), He.projectionMatrixInverse.copy(He.projectionMatrix).invert(), He.viewport.set(it.x, it.y, it.width, it.height), Re === 0 && (v.matrix.copy(He.matrix), v.matrix.decompose(v.position, v.quaternion, v.scale)), ne === !0 && v.cameras.push(He);
        }
        const be = r.enabledFeatures;
        if (be && be.includes("depth-sensing")) {
          const Re = f.getDepthInformation(pe[0]);
          Re && Re.isValid && Re.texture && _.init(e, Re, r.renderState);
        }
      }
      for (let pe = 0; pe < E.length; pe++) {
        const ne = y[pe], be = E[pe];
        ne !== null && be !== void 0 && be.update(ne, J, c || o);
      }
      me && me(Y, J), J.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: J }), g = null;
    }
    const Ne = new kl();
    Ne.setAnimationLoop(Ae), this.setAnimationLoop = function(Y) {
      me = Y;
    }, this.dispose = function() {
    };
  }
}
const Fn = /* @__PURE__ */ new pn(), Hm = /* @__PURE__ */ new st();
function Vm(i, e) {
  function t(p, u) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), u.value.copy(p.matrix);
  }
  function n(p, u) {
    u.color.getRGB(p.fogColor.value, Fl(i)), u.isFog ? (p.fogNear.value = u.near, p.fogFar.value = u.far) : u.isFogExp2 && (p.fogDensity.value = u.density);
  }
  function r(p, u, R, E, y) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? s(p, u) : u.isMeshToonMaterial ? (s(p, u), f(p, u)) : u.isMeshPhongMaterial ? (s(p, u), h(p, u)) : u.isMeshStandardMaterial ? (s(p, u), d(p, u), u.isMeshPhysicalMaterial && m(p, u, y)) : u.isMeshMatcapMaterial ? (s(p, u), g(p, u)) : u.isMeshDepthMaterial ? s(p, u) : u.isMeshDistanceMaterial ? (s(p, u), _(p, u)) : u.isMeshNormalMaterial ? s(p, u) : u.isLineBasicMaterial ? (o(p, u), u.isLineDashedMaterial && a(p, u)) : u.isPointsMaterial ? l(p, u, R, E) : u.isSpriteMaterial ? c(p, u) : u.isShadowMaterial ? (p.color.value.copy(u.color), p.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function s(p, u) {
    p.opacity.value = u.opacity, u.color && p.diffuse.value.copy(u.color), u.emissive && p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.bumpMap && (p.bumpMap.value = u.bumpMap, t(u.bumpMap, p.bumpMapTransform), p.bumpScale.value = u.bumpScale, u.side === At && (p.bumpScale.value *= -1)), u.normalMap && (p.normalMap.value = u.normalMap, t(u.normalMap, p.normalMapTransform), p.normalScale.value.copy(u.normalScale), u.side === At && p.normalScale.value.negate()), u.displacementMap && (p.displacementMap.value = u.displacementMap, t(u.displacementMap, p.displacementMapTransform), p.displacementScale.value = u.displacementScale, p.displacementBias.value = u.displacementBias), u.emissiveMap && (p.emissiveMap.value = u.emissiveMap, t(u.emissiveMap, p.emissiveMapTransform)), u.specularMap && (p.specularMap.value = u.specularMap, t(u.specularMap, p.specularMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
    const R = e.get(u), E = R.envMap, y = R.envMapRotation;
    E && (p.envMap.value = E, Fn.copy(y), Fn.x *= -1, Fn.y *= -1, Fn.z *= -1, E.isCubeTexture && E.isRenderTargetTexture === !1 && (Fn.y *= -1, Fn.z *= -1), p.envMapRotation.value.setFromMatrix4(Hm.makeRotationFromEuler(Fn)), p.flipEnvMap.value = E.isCubeTexture && E.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = u.reflectivity, p.ior.value = u.ior, p.refractionRatio.value = u.refractionRatio), u.lightMap && (p.lightMap.value = u.lightMap, p.lightMapIntensity.value = u.lightMapIntensity, t(u.lightMap, p.lightMapTransform)), u.aoMap && (p.aoMap.value = u.aoMap, p.aoMapIntensity.value = u.aoMapIntensity, t(u.aoMap, p.aoMapTransform));
  }
  function o(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, u.map && (p.map.value = u.map, t(u.map, p.mapTransform));
  }
  function a(p, u) {
    p.dashSize.value = u.dashSize, p.totalSize.value = u.dashSize + u.gapSize, p.scale.value = u.scale;
  }
  function l(p, u, R, E) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.size.value = u.size * R, p.scale.value = E * 0.5, u.map && (p.map.value = u.map, t(u.map, p.uvTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function c(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.rotation.value = u.rotation, u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function h(p, u) {
    p.specular.value.copy(u.specular), p.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function f(p, u) {
    u.gradientMap && (p.gradientMap.value = u.gradientMap);
  }
  function d(p, u) {
    p.metalness.value = u.metalness, u.metalnessMap && (p.metalnessMap.value = u.metalnessMap, t(u.metalnessMap, p.metalnessMapTransform)), p.roughness.value = u.roughness, u.roughnessMap && (p.roughnessMap.value = u.roughnessMap, t(u.roughnessMap, p.roughnessMapTransform)), u.envMap && (p.envMapIntensity.value = u.envMapIntensity);
  }
  function m(p, u, R) {
    p.ior.value = u.ior, u.sheen > 0 && (p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), p.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (p.sheenColorMap.value = u.sheenColorMap, t(u.sheenColorMap, p.sheenColorMapTransform)), u.sheenRoughnessMap && (p.sheenRoughnessMap.value = u.sheenRoughnessMap, t(u.sheenRoughnessMap, p.sheenRoughnessMapTransform))), u.clearcoat > 0 && (p.clearcoat.value = u.clearcoat, p.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (p.clearcoatMap.value = u.clearcoatMap, t(u.clearcoatMap, p.clearcoatMapTransform)), u.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, t(u.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (p.clearcoatNormalMap.value = u.clearcoatNormalMap, t(u.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === At && p.clearcoatNormalScale.value.negate())), u.dispersion > 0 && (p.dispersion.value = u.dispersion), u.iridescence > 0 && (p.iridescence.value = u.iridescence, p.iridescenceIOR.value = u.iridescenceIOR, p.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (p.iridescenceMap.value = u.iridescenceMap, t(u.iridescenceMap, p.iridescenceMapTransform)), u.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = u.iridescenceThicknessMap, t(u.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), u.transmission > 0 && (p.transmission.value = u.transmission, p.transmissionSamplerMap.value = R.texture, p.transmissionSamplerSize.value.set(R.width, R.height), u.transmissionMap && (p.transmissionMap.value = u.transmissionMap, t(u.transmissionMap, p.transmissionMapTransform)), p.thickness.value = u.thickness, u.thicknessMap && (p.thicknessMap.value = u.thicknessMap, t(u.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = u.attenuationDistance, p.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (p.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (p.anisotropyMap.value = u.anisotropyMap, t(u.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = u.specularIntensity, p.specularColor.value.copy(u.specularColor), u.specularColorMap && (p.specularColorMap.value = u.specularColorMap, t(u.specularColorMap, p.specularColorMapTransform)), u.specularIntensityMap && (p.specularIntensityMap.value = u.specularIntensityMap, t(u.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function g(p, u) {
    u.matcap && (p.matcap.value = u.matcap);
  }
  function _(p, u) {
    const R = e.get(u).light;
    p.referencePosition.value.setFromMatrixPosition(R.matrixWorld), p.nearDistance.value = R.shadow.camera.near, p.farDistance.value = R.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function Gm(i, e, t, n) {
  let r = {}, s = {}, o = [];
  const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(R, E) {
    const y = E.program;
    n.uniformBlockBinding(R, y);
  }
  function c(R, E) {
    let y = r[R.id];
    y === void 0 && (g(R), y = h(R), r[R.id] = y, R.addEventListener("dispose", p));
    const O = E.program;
    n.updateUBOMapping(R, O);
    const w = e.render.frame;
    s[R.id] !== w && (d(R), s[R.id] = w);
  }
  function h(R) {
    const E = f();
    R.__bindingPointIndex = E;
    const y = i.createBuffer(), O = R.__size, w = R.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, y), i.bufferData(i.UNIFORM_BUFFER, O, w), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, E, y), y;
  }
  function f() {
    for (let R = 0; R < a; R++)
      if (o.indexOf(R) === -1)
        return o.push(R), R;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(R) {
    const E = r[R.id], y = R.uniforms, O = R.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, E);
    for (let w = 0, b = y.length; w < b; w++) {
      const C = Array.isArray(y[w]) ? y[w] : [y[w]];
      for (let S = 0, v = C.length; S < v; S++) {
        const A = C[S];
        if (m(A, w, S, O) === !0) {
          const N = A.__offset, F = Array.isArray(A.value) ? A.value : [A.value];
          let H = 0;
          for (let X = 0; X < F.length; X++) {
            const W = F[X], q = _(W);
            typeof W == "number" || typeof W == "boolean" ? (A.__data[0] = W, i.bufferSubData(i.UNIFORM_BUFFER, N + H, A.__data)) : W.isMatrix3 ? (A.__data[0] = W.elements[0], A.__data[1] = W.elements[1], A.__data[2] = W.elements[2], A.__data[3] = 0, A.__data[4] = W.elements[3], A.__data[5] = W.elements[4], A.__data[6] = W.elements[5], A.__data[7] = 0, A.__data[8] = W.elements[6], A.__data[9] = W.elements[7], A.__data[10] = W.elements[8], A.__data[11] = 0) : (W.toArray(A.__data, H), H += q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, N, A.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(R, E, y, O) {
    const w = R.value, b = E + "_" + y;
    if (O[b] === void 0)
      return typeof w == "number" || typeof w == "boolean" ? O[b] = w : O[b] = w.clone(), !0;
    {
      const C = O[b];
      if (typeof w == "number" || typeof w == "boolean") {
        if (C !== w)
          return O[b] = w, !0;
      } else if (C.equals(w) === !1)
        return C.copy(w), !0;
    }
    return !1;
  }
  function g(R) {
    const E = R.uniforms;
    let y = 0;
    const O = 16;
    for (let b = 0, C = E.length; b < C; b++) {
      const S = Array.isArray(E[b]) ? E[b] : [E[b]];
      for (let v = 0, A = S.length; v < A; v++) {
        const N = S[v], F = Array.isArray(N.value) ? N.value : [N.value];
        for (let H = 0, X = F.length; H < X; H++) {
          const W = F[H], q = _(W), V = y % O, te = V % q.boundary, oe = V + te;
          y += te, oe !== 0 && O - oe < q.storage && (y += O - oe), N.__data = new Float32Array(q.storage / Float32Array.BYTES_PER_ELEMENT), N.__offset = y, y += q.storage;
        }
      }
    }
    const w = y % O;
    return w > 0 && (y += O - w), R.__size = y, R.__cache = {}, this;
  }
  function _(R) {
    const E = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof R == "number" || typeof R == "boolean" ? (E.boundary = 4, E.storage = 4) : R.isVector2 ? (E.boundary = 8, E.storage = 8) : R.isVector3 || R.isColor ? (E.boundary = 16, E.storage = 12) : R.isVector4 ? (E.boundary = 16, E.storage = 16) : R.isMatrix3 ? (E.boundary = 48, E.storage = 48) : R.isMatrix4 ? (E.boundary = 64, E.storage = 64) : R.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", R), E;
  }
  function p(R) {
    const E = R.target;
    E.removeEventListener("dispose", p);
    const y = o.indexOf(E.__bindingPointIndex);
    o.splice(y, 1), i.deleteBuffer(r[E.id]), delete r[E.id], delete s[E.id];
  }
  function u() {
    for (const R in r)
      i.deleteBuffer(r[R]);
    o = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: u
  };
}
class Wm {
  constructor(e = {}) {
    const {
      canvas: t = Lh(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: f = !1,
      reverseDepthBuffer: d = !1
    } = e;
    this.isWebGLRenderer = !0;
    let m;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      m = n.getContextAttributes().alpha;
    } else
      m = o;
    const g = new Uint32Array(4), _ = new Int32Array(4);
    let p = null, u = null;
    const R = [], E = [];
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = It, this.toneMapping = An, this.toneMappingExposure = 1;
    const y = this;
    let O = !1, w = 0, b = 0, C = null, S = -1, v = null;
    const A = new lt(), N = new lt();
    let F = null;
    const H = new Xe(0);
    let X = 0, W = t.width, q = t.height, V = 1, te = null, oe = null;
    const me = new lt(0, 0, W, q), Ae = new lt(0, 0, W, q);
    let Ne = !1;
    const Y = new zl();
    let J = !1, pe = !1;
    const ne = new st(), be = new st(), Re = new P(), Ue = new lt(), it = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let He = !1;
    function ot() {
      return C === null ? V : 1;
    }
    let U = n;
    function Pt(M, D) {
      return t.getContext(M, D);
    }
    try {
      const M = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: a,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: f
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${Aa}`), t.addEventListener("webglcontextlost", j, !1), t.addEventListener("webglcontextrestored", he, !1), t.addEventListener("webglcontextcreationerror", le, !1), U === null) {
        const D = "webgl2";
        if (U = Pt(D, M), U === null)
          throw Pt(D) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (M) {
      throw console.error("THREE.WebGLRenderer: " + M.message), M;
    }
    let Be, ze, Se, et, Me, T, x, B, K, $, Z, xe, ae, ue, Ve, Q, fe, Ee, Te, de, ke, De, Je, L;
    function re() {
      Be = new Kd(U), Be.init(), De = new Um(U, Be), ze = new Gd(U, Be, e, De), Se = new Lm(U, Be), ze.reverseDepthBuffer && d && Se.buffers.depth.setReversed(!0), et = new Jd(U), Me = new gm(), T = new Im(U, Be, Se, Me, ze, De, et), x = new Xd(y), B = new Zd(y), K = new ru(U), Je = new Hd(U, K), $ = new jd(U, K, et, Je), Z = new ep(U, $, K, et), Te = new Qd(U, ze, T), Q = new Wd(Me), xe = new mm(y, x, B, Be, ze, Je, Q), ae = new Vm(y, Me), ue = new vm(), Ve = new bm(Be), Ee = new kd(y, x, B, Se, Z, m, l), fe = new Cm(y, Z, ze), L = new Gm(U, et, ze, Se), de = new Vd(U, Be, et), ke = new $d(U, Be, et), et.programs = xe.programs, y.capabilities = ze, y.extensions = Be, y.properties = Me, y.renderLists = ue, y.shadowMap = fe, y.state = Se, y.info = et;
    }
    re();
    const G = new km(y, U);
    this.xr = G, this.getContext = function() {
      return U;
    }, this.getContextAttributes = function() {
      return U.getContextAttributes();
    }, this.forceContextLoss = function() {
      const M = Be.get("WEBGL_lose_context");
      M && M.loseContext();
    }, this.forceContextRestore = function() {
      const M = Be.get("WEBGL_lose_context");
      M && M.restoreContext();
    }, this.getPixelRatio = function() {
      return V;
    }, this.setPixelRatio = function(M) {
      M !== void 0 && (V = M, this.setSize(W, q, !1));
    }, this.getSize = function(M) {
      return M.set(W, q);
    }, this.setSize = function(M, D, z = !0) {
      if (G.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      W = M, q = D, t.width = Math.floor(M * V), t.height = Math.floor(D * V), z === !0 && (t.style.width = M + "px", t.style.height = D + "px"), this.setViewport(0, 0, M, D);
    }, this.getDrawingBufferSize = function(M) {
      return M.set(W * V, q * V).floor();
    }, this.setDrawingBufferSize = function(M, D, z) {
      W = M, q = D, V = z, t.width = Math.floor(M * z), t.height = Math.floor(D * z), this.setViewport(0, 0, M, D);
    }, this.getCurrentViewport = function(M) {
      return M.copy(A);
    }, this.getViewport = function(M) {
      return M.copy(me);
    }, this.setViewport = function(M, D, z, k) {
      M.isVector4 ? me.set(M.x, M.y, M.z, M.w) : me.set(M, D, z, k), Se.viewport(A.copy(me).multiplyScalar(V).round());
    }, this.getScissor = function(M) {
      return M.copy(Ae);
    }, this.setScissor = function(M, D, z, k) {
      M.isVector4 ? Ae.set(M.x, M.y, M.z, M.w) : Ae.set(M, D, z, k), Se.scissor(N.copy(Ae).multiplyScalar(V).round());
    }, this.getScissorTest = function() {
      return Ne;
    }, this.setScissorTest = function(M) {
      Se.setScissorTest(Ne = M);
    }, this.setOpaqueSort = function(M) {
      te = M;
    }, this.setTransparentSort = function(M) {
      oe = M;
    }, this.getClearColor = function(M) {
      return M.copy(Ee.getClearColor());
    }, this.setClearColor = function() {
      Ee.setClearColor.apply(Ee, arguments);
    }, this.getClearAlpha = function() {
      return Ee.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ee.setClearAlpha.apply(Ee, arguments);
    }, this.clear = function(M = !0, D = !0, z = !0) {
      let k = 0;
      if (M) {
        let I = !1;
        if (C !== null) {
          const ee = C.texture.format;
          I = ee === Da || ee === La || ee === Pa;
        }
        if (I) {
          const ee = C.texture.type, ce = ee === dn || ee === Wn || ee === Xi || ee === bi || ee === Ra || ee === Ca, ge = Ee.getClearColor(), _e = Ee.getClearAlpha(), we = ge.r, Pe = ge.g, ve = ge.b;
          ce ? (g[0] = we, g[1] = Pe, g[2] = ve, g[3] = _e, U.clearBufferuiv(U.COLOR, 0, g)) : (_[0] = we, _[1] = Pe, _[2] = ve, _[3] = _e, U.clearBufferiv(U.COLOR, 0, _));
        } else
          k |= U.COLOR_BUFFER_BIT;
      }
      D && (k |= U.DEPTH_BUFFER_BIT), z && (k |= U.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), U.clear(k);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", j, !1), t.removeEventListener("webglcontextrestored", he, !1), t.removeEventListener("webglcontextcreationerror", le, !1), ue.dispose(), Ve.dispose(), Me.dispose(), x.dispose(), B.dispose(), Z.dispose(), Je.dispose(), L.dispose(), xe.dispose(), G.dispose(), G.removeEventListener("sessionstart", ka), G.removeEventListener("sessionend", Ha), Cn.stop();
    };
    function j(M) {
      M.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), O = !0;
    }
    function he() {
      console.log("THREE.WebGLRenderer: Context Restored."), O = !1;
      const M = et.autoReset, D = fe.enabled, z = fe.autoUpdate, k = fe.needsUpdate, I = fe.type;
      re(), et.autoReset = M, fe.enabled = D, fe.autoUpdate = z, fe.needsUpdate = k, fe.type = I;
    }
    function le(M) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", M.statusMessage);
    }
    function Ce(M) {
      const D = M.target;
      D.removeEventListener("dispose", Ce), at(D);
    }
    function at(M) {
      _t(M), Me.remove(M);
    }
    function _t(M) {
      const D = Me.get(M).programs;
      D !== void 0 && (D.forEach(function(z) {
        xe.releaseProgram(z);
      }), M.isShaderMaterial && xe.releaseShaderCache(M));
    }
    this.renderBufferDirect = function(M, D, z, k, I, ee) {
      D === null && (D = it);
      const ce = I.isMesh && I.matrixWorld.determinant() < 0, ge = oc(M, D, z, k, I);
      Se.setMaterial(k, ce);
      let _e = z.index, we = 1;
      if (k.wireframe === !0) {
        if (_e = $.getWireframeAttribute(z), _e === void 0) return;
        we = 2;
      }
      const Pe = z.drawRange, ve = z.attributes.position;
      let We = Pe.start * we, Qe = (Pe.start + Pe.count) * we;
      ee !== null && (We = Math.max(We, ee.start * we), Qe = Math.min(Qe, (ee.start + ee.count) * we)), _e !== null ? (We = Math.max(We, 0), Qe = Math.min(Qe, _e.count)) : ve != null && (We = Math.max(We, 0), Qe = Math.min(Qe, ve.count));
      const tt = Qe - We;
      if (tt < 0 || tt === 1 / 0) return;
      Je.setup(I, k, ge, z, _e);
      let bt, Ye = de;
      if (_e !== null && (bt = K.get(_e), Ye = ke, Ye.setIndex(bt)), I.isMesh)
        k.wireframe === !0 ? (Se.setLineWidth(k.wireframeLinewidth * ot()), Ye.setMode(U.LINES)) : Ye.setMode(U.TRIANGLES);
      else if (I.isLine) {
        let ye = k.linewidth;
        ye === void 0 && (ye = 1), Se.setLineWidth(ye * ot()), I.isLineSegments ? Ye.setMode(U.LINES) : I.isLineLoop ? Ye.setMode(U.LINE_LOOP) : Ye.setMode(U.LINE_STRIP);
      } else I.isPoints ? Ye.setMode(U.POINTS) : I.isSprite && Ye.setMode(U.TRIANGLES);
      if (I.isBatchedMesh)
        if (I._multiDrawInstances !== null)
          Ye.renderMultiDrawInstances(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount, I._multiDrawInstances);
        else if (Be.get("WEBGL_multi_draw"))
          Ye.renderMultiDraw(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount);
        else {
          const ye = I._multiDrawStarts, en = I._multiDrawCounts, qe = I._multiDrawCount, Bt = _e ? K.get(_e).bytesPerElement : 1, Kn = Me.get(k).currentProgram.getUniforms();
          for (let wt = 0; wt < qe; wt++)
            Kn.setValue(U, "_gl_DrawID", wt), Ye.render(ye[wt] / Bt, en[wt]);
        }
      else if (I.isInstancedMesh)
        Ye.renderInstances(We, tt, I.count);
      else if (z.isInstancedBufferGeometry) {
        const ye = z._maxInstanceCount !== void 0 ? z._maxInstanceCount : 1 / 0, en = Math.min(z.instanceCount, ye);
        Ye.renderInstances(We, tt, en);
      } else
        Ye.render(We, tt);
    };
    function Ze(M, D, z) {
      M.transparent === !0 && M.side === Kt && M.forceSinglePass === !1 ? (M.side = At, M.needsUpdate = !0, Qi(M, D, z), M.side = wn, M.needsUpdate = !0, Qi(M, D, z), M.side = Kt) : Qi(M, D, z);
    }
    this.compile = function(M, D, z = null) {
      z === null && (z = M), u = Ve.get(z), u.init(D), E.push(u), z.traverseVisible(function(I) {
        I.isLight && I.layers.test(D.layers) && (u.pushLight(I), I.castShadow && u.pushShadow(I));
      }), M !== z && M.traverseVisible(function(I) {
        I.isLight && I.layers.test(D.layers) && (u.pushLight(I), I.castShadow && u.pushShadow(I));
      }), u.setupLights();
      const k = /* @__PURE__ */ new Set();
      return M.traverse(function(I) {
        if (!(I.isMesh || I.isPoints || I.isLine || I.isSprite))
          return;
        const ee = I.material;
        if (ee)
          if (Array.isArray(ee))
            for (let ce = 0; ce < ee.length; ce++) {
              const ge = ee[ce];
              Ze(ge, z, I), k.add(ge);
            }
          else
            Ze(ee, z, I), k.add(ee);
      }), E.pop(), u = null, k;
    }, this.compileAsync = function(M, D, z = null) {
      const k = this.compile(M, D, z);
      return new Promise((I) => {
        function ee() {
          if (k.forEach(function(ce) {
            Me.get(ce).currentProgram.isReady() && k.delete(ce);
          }), k.size === 0) {
            I(M);
            return;
          }
          setTimeout(ee, 10);
        }
        Be.get("KHR_parallel_shader_compile") !== null ? ee() : setTimeout(ee, 10);
      });
    };
    let Ot = null;
    function Qt(M) {
      Ot && Ot(M);
    }
    function ka() {
      Cn.stop();
    }
    function Ha() {
      Cn.start();
    }
    const Cn = new kl();
    Cn.setAnimationLoop(Qt), typeof self < "u" && Cn.setContext(self), this.setAnimationLoop = function(M) {
      Ot = M, G.setAnimationLoop(M), M === null ? Cn.stop() : Cn.start();
    }, G.addEventListener("sessionstart", ka), G.addEventListener("sessionend", Ha), this.render = function(M, D) {
      if (D !== void 0 && D.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (O === !0) return;
      if (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === !0 && D.updateMatrixWorld(), G.enabled === !0 && G.isPresenting === !0 && (G.cameraAutoUpdate === !0 && G.updateCamera(D), D = G.getCamera()), M.isScene === !0 && M.onBeforeRender(y, M, D, C), u = Ve.get(M, E.length), u.init(D), E.push(u), be.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), Y.setFromProjectionMatrix(be), pe = this.localClippingEnabled, J = Q.init(this.clippingPlanes, pe), p = ue.get(M, R.length), p.init(), R.push(p), G.enabled === !0 && G.isPresenting === !0) {
        const ee = y.xr.getDepthSensingMesh();
        ee !== null && $r(ee, D, -1 / 0, y.sortObjects);
      }
      $r(M, D, 0, y.sortObjects), p.finish(), y.sortObjects === !0 && p.sort(te, oe), He = G.enabled === !1 || G.isPresenting === !1 || G.hasDepthSensing() === !1, He && Ee.addToRenderList(p, M), this.info.render.frame++, J === !0 && Q.beginShadows();
      const z = u.state.shadowsArray;
      fe.render(z, M, D), J === !0 && Q.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const k = p.opaque, I = p.transmissive;
      if (u.setupLights(), D.isArrayCamera) {
        const ee = D.cameras;
        if (I.length > 0)
          for (let ce = 0, ge = ee.length; ce < ge; ce++) {
            const _e = ee[ce];
            Ga(k, I, M, _e);
          }
        He && Ee.render(M);
        for (let ce = 0, ge = ee.length; ce < ge; ce++) {
          const _e = ee[ce];
          Va(p, M, _e, _e.viewport);
        }
      } else
        I.length > 0 && Ga(k, I, M, D), He && Ee.render(M), Va(p, M, D);
      C !== null && (T.updateMultisampleRenderTarget(C), T.updateRenderTargetMipmap(C)), M.isScene === !0 && M.onAfterRender(y, M, D), Je.resetDefaultState(), S = -1, v = null, E.pop(), E.length > 0 ? (u = E[E.length - 1], J === !0 && Q.setGlobalState(y.clippingPlanes, u.state.camera)) : u = null, R.pop(), R.length > 0 ? p = R[R.length - 1] : p = null;
    };
    function $r(M, D, z, k) {
      if (M.visible === !1) return;
      if (M.layers.test(D.layers)) {
        if (M.isGroup)
          z = M.renderOrder;
        else if (M.isLOD)
          M.autoUpdate === !0 && M.update(D);
        else if (M.isLight)
          u.pushLight(M), M.castShadow && u.pushShadow(M);
        else if (M.isSprite) {
          if (!M.frustumCulled || Y.intersectsSprite(M)) {
            k && Ue.setFromMatrixPosition(M.matrixWorld).applyMatrix4(be);
            const ce = Z.update(M), ge = M.material;
            ge.visible && p.push(M, ce, ge, z, Ue.z, null);
          }
        } else if ((M.isMesh || M.isLine || M.isPoints) && (!M.frustumCulled || Y.intersectsObject(M))) {
          const ce = Z.update(M), ge = M.material;
          if (k && (M.boundingSphere !== void 0 ? (M.boundingSphere === null && M.computeBoundingSphere(), Ue.copy(M.boundingSphere.center)) : (ce.boundingSphere === null && ce.computeBoundingSphere(), Ue.copy(ce.boundingSphere.center)), Ue.applyMatrix4(M.matrixWorld).applyMatrix4(be)), Array.isArray(ge)) {
            const _e = ce.groups;
            for (let we = 0, Pe = _e.length; we < Pe; we++) {
              const ve = _e[we], We = ge[ve.materialIndex];
              We && We.visible && p.push(M, ce, We, z, Ue.z, ve);
            }
          } else ge.visible && p.push(M, ce, ge, z, Ue.z, null);
        }
      }
      const ee = M.children;
      for (let ce = 0, ge = ee.length; ce < ge; ce++)
        $r(ee[ce], D, z, k);
    }
    function Va(M, D, z, k) {
      const I = M.opaque, ee = M.transmissive, ce = M.transparent;
      u.setupLightsView(z), J === !0 && Q.setGlobalState(y.clippingPlanes, z), k && Se.viewport(A.copy(k)), I.length > 0 && Ji(I, D, z), ee.length > 0 && Ji(ee, D, z), ce.length > 0 && Ji(ce, D, z), Se.buffers.depth.setTest(!0), Se.buffers.depth.setMask(!0), Se.buffers.color.setMask(!0), Se.setPolygonOffset(!1);
    }
    function Ga(M, D, z, k) {
      if ((z.isScene === !0 ? z.overrideMaterial : null) !== null)
        return;
      u.state.transmissionRenderTarget[k.id] === void 0 && (u.state.transmissionRenderTarget[k.id] = new Xn(1, 1, {
        generateMipmaps: !0,
        type: Be.has("EXT_color_buffer_half_float") || Be.has("EXT_color_buffer_float") ? Ki : dn,
        minFilter: Vn,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Ge.workingColorSpace
      }));
      const ee = u.state.transmissionRenderTarget[k.id], ce = k.viewport || A;
      ee.setSize(ce.z, ce.w);
      const ge = y.getRenderTarget();
      y.setRenderTarget(ee), y.getClearColor(H), X = y.getClearAlpha(), X < 1 && y.setClearColor(16777215, 0.5), y.clear(), He && Ee.render(z);
      const _e = y.toneMapping;
      y.toneMapping = An;
      const we = k.viewport;
      if (k.viewport !== void 0 && (k.viewport = void 0), u.setupLightsView(k), J === !0 && Q.setGlobalState(y.clippingPlanes, k), Ji(M, z, k), T.updateMultisampleRenderTarget(ee), T.updateRenderTargetMipmap(ee), Be.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Pe = !1;
        for (let ve = 0, We = D.length; ve < We; ve++) {
          const Qe = D[ve], tt = Qe.object, bt = Qe.geometry, Ye = Qe.material, ye = Qe.group;
          if (Ye.side === Kt && tt.layers.test(k.layers)) {
            const en = Ye.side;
            Ye.side = At, Ye.needsUpdate = !0, Wa(tt, z, k, bt, Ye, ye), Ye.side = en, Ye.needsUpdate = !0, Pe = !0;
          }
        }
        Pe === !0 && (T.updateMultisampleRenderTarget(ee), T.updateRenderTargetMipmap(ee));
      }
      y.setRenderTarget(ge), y.setClearColor(H, X), we !== void 0 && (k.viewport = we), y.toneMapping = _e;
    }
    function Ji(M, D, z) {
      const k = D.isScene === !0 ? D.overrideMaterial : null;
      for (let I = 0, ee = M.length; I < ee; I++) {
        const ce = M[I], ge = ce.object, _e = ce.geometry, we = k === null ? ce.material : k, Pe = ce.group;
        ge.layers.test(z.layers) && Wa(ge, D, z, _e, we, Pe);
      }
    }
    function Wa(M, D, z, k, I, ee) {
      M.onBeforeRender(y, D, z, k, I, ee), M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse, M.matrixWorld), M.normalMatrix.getNormalMatrix(M.modelViewMatrix), I.onBeforeRender(y, D, z, k, M, ee), I.transparent === !0 && I.side === Kt && I.forceSinglePass === !1 ? (I.side = At, I.needsUpdate = !0, y.renderBufferDirect(z, D, k, I, M, ee), I.side = wn, I.needsUpdate = !0, y.renderBufferDirect(z, D, k, I, M, ee), I.side = Kt) : y.renderBufferDirect(z, D, k, I, M, ee), M.onAfterRender(y, D, z, k, I, ee);
    }
    function Qi(M, D, z) {
      D.isScene !== !0 && (D = it);
      const k = Me.get(M), I = u.state.lights, ee = u.state.shadowsArray, ce = I.state.version, ge = xe.getParameters(M, I.state, ee, D, z), _e = xe.getProgramCacheKey(ge);
      let we = k.programs;
      k.environment = M.isMeshStandardMaterial ? D.environment : null, k.fog = D.fog, k.envMap = (M.isMeshStandardMaterial ? B : x).get(M.envMap || k.environment), k.envMapRotation = k.environment !== null && M.envMap === null ? D.environmentRotation : M.envMapRotation, we === void 0 && (M.addEventListener("dispose", Ce), we = /* @__PURE__ */ new Map(), k.programs = we);
      let Pe = we.get(_e);
      if (Pe !== void 0) {
        if (k.currentProgram === Pe && k.lightsStateVersion === ce)
          return Ya(M, ge), Pe;
      } else
        ge.uniforms = xe.getUniforms(M), M.onBeforeCompile(ge, y), Pe = xe.acquireProgram(ge, _e), we.set(_e, Pe), k.uniforms = ge.uniforms;
      const ve = k.uniforms;
      return (!M.isShaderMaterial && !M.isRawShaderMaterial || M.clipping === !0) && (ve.clippingPlanes = Q.uniform), Ya(M, ge), k.needsLights = cc(M), k.lightsStateVersion = ce, k.needsLights && (ve.ambientLightColor.value = I.state.ambient, ve.lightProbe.value = I.state.probe, ve.directionalLights.value = I.state.directional, ve.directionalLightShadows.value = I.state.directionalShadow, ve.spotLights.value = I.state.spot, ve.spotLightShadows.value = I.state.spotShadow, ve.rectAreaLights.value = I.state.rectArea, ve.ltc_1.value = I.state.rectAreaLTC1, ve.ltc_2.value = I.state.rectAreaLTC2, ve.pointLights.value = I.state.point, ve.pointLightShadows.value = I.state.pointShadow, ve.hemisphereLights.value = I.state.hemi, ve.directionalShadowMap.value = I.state.directionalShadowMap, ve.directionalShadowMatrix.value = I.state.directionalShadowMatrix, ve.spotShadowMap.value = I.state.spotShadowMap, ve.spotLightMatrix.value = I.state.spotLightMatrix, ve.spotLightMap.value = I.state.spotLightMap, ve.pointShadowMap.value = I.state.pointShadowMap, ve.pointShadowMatrix.value = I.state.pointShadowMatrix), k.currentProgram = Pe, k.uniformsList = null, Pe;
    }
    function Xa(M) {
      if (M.uniformsList === null) {
        const D = M.currentProgram.getUniforms();
        M.uniformsList = Or.seqWithValue(D.seq, M.uniforms);
      }
      return M.uniformsList;
    }
    function Ya(M, D) {
      const z = Me.get(M);
      z.outputColorSpace = D.outputColorSpace, z.batching = D.batching, z.batchingColor = D.batchingColor, z.instancing = D.instancing, z.instancingColor = D.instancingColor, z.instancingMorph = D.instancingMorph, z.skinning = D.skinning, z.morphTargets = D.morphTargets, z.morphNormals = D.morphNormals, z.morphColors = D.morphColors, z.morphTargetsCount = D.morphTargetsCount, z.numClippingPlanes = D.numClippingPlanes, z.numIntersection = D.numClipIntersection, z.vertexAlphas = D.vertexAlphas, z.vertexTangents = D.vertexTangents, z.toneMapping = D.toneMapping;
    }
    function oc(M, D, z, k, I) {
      D.isScene !== !0 && (D = it), T.resetTextureUnits();
      const ee = D.fog, ce = k.isMeshStandardMaterial ? D.environment : null, ge = C === null ? y.outputColorSpace : C.isXRRenderTarget === !0 ? C.texture.colorSpace : wi, _e = (k.isMeshStandardMaterial ? B : x).get(k.envMap || ce), we = k.vertexColors === !0 && !!z.attributes.color && z.attributes.color.itemSize === 4, Pe = !!z.attributes.tangent && (!!k.normalMap || k.anisotropy > 0), ve = !!z.morphAttributes.position, We = !!z.morphAttributes.normal, Qe = !!z.morphAttributes.color;
      let tt = An;
      k.toneMapped && (C === null || C.isXRRenderTarget === !0) && (tt = y.toneMapping);
      const bt = z.morphAttributes.position || z.morphAttributes.normal || z.morphAttributes.color, Ye = bt !== void 0 ? bt.length : 0, ye = Me.get(k), en = u.state.lights;
      if (J === !0 && (pe === !0 || M !== v)) {
        const Lt = M === v && k.id === S;
        Q.setState(k, M, Lt);
      }
      let qe = !1;
      k.version === ye.__version ? (ye.needsLights && ye.lightsStateVersion !== en.state.version || ye.outputColorSpace !== ge || I.isBatchedMesh && ye.batching === !1 || !I.isBatchedMesh && ye.batching === !0 || I.isBatchedMesh && ye.batchingColor === !0 && I.colorTexture === null || I.isBatchedMesh && ye.batchingColor === !1 && I.colorTexture !== null || I.isInstancedMesh && ye.instancing === !1 || !I.isInstancedMesh && ye.instancing === !0 || I.isSkinnedMesh && ye.skinning === !1 || !I.isSkinnedMesh && ye.skinning === !0 || I.isInstancedMesh && ye.instancingColor === !0 && I.instanceColor === null || I.isInstancedMesh && ye.instancingColor === !1 && I.instanceColor !== null || I.isInstancedMesh && ye.instancingMorph === !0 && I.morphTexture === null || I.isInstancedMesh && ye.instancingMorph === !1 && I.morphTexture !== null || ye.envMap !== _e || k.fog === !0 && ye.fog !== ee || ye.numClippingPlanes !== void 0 && (ye.numClippingPlanes !== Q.numPlanes || ye.numIntersection !== Q.numIntersection) || ye.vertexAlphas !== we || ye.vertexTangents !== Pe || ye.morphTargets !== ve || ye.morphNormals !== We || ye.morphColors !== Qe || ye.toneMapping !== tt || ye.morphTargetsCount !== Ye) && (qe = !0) : (qe = !0, ye.__version = k.version);
      let Bt = ye.currentProgram;
      qe === !0 && (Bt = Qi(k, D, I));
      let Kn = !1, wt = !1, Pi = !1;
      const nt = Bt.getUniforms(), Yt = ye.uniforms;
      if (Se.useProgram(Bt.program) && (Kn = !0, wt = !0, Pi = !0), k.id !== S && (S = k.id, wt = !0), Kn || v !== M) {
        Se.buffers.depth.getReversed() ? (ne.copy(M.projectionMatrix), Ih(ne), Uh(ne), nt.setValue(U, "projectionMatrix", ne)) : nt.setValue(U, "projectionMatrix", M.projectionMatrix), nt.setValue(U, "viewMatrix", M.matrixWorldInverse);
        const mn = nt.map.cameraPosition;
        mn !== void 0 && mn.setValue(U, Re.setFromMatrixPosition(M.matrixWorld)), ze.logarithmicDepthBuffer && nt.setValue(
          U,
          "logDepthBufFC",
          2 / (Math.log(M.far + 1) / Math.LN2)
        ), (k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshLambertMaterial || k.isMeshBasicMaterial || k.isMeshStandardMaterial || k.isShaderMaterial) && nt.setValue(U, "isOrthographic", M.isOrthographicCamera === !0), v !== M && (v = M, wt = !0, Pi = !0);
      }
      if (I.isSkinnedMesh) {
        nt.setOptional(U, I, "bindMatrix"), nt.setOptional(U, I, "bindMatrixInverse");
        const Lt = I.skeleton;
        Lt && (Lt.boneTexture === null && Lt.computeBoneTexture(), nt.setValue(U, "boneTexture", Lt.boneTexture, T));
      }
      I.isBatchedMesh && (nt.setOptional(U, I, "batchingTexture"), nt.setValue(U, "batchingTexture", I._matricesTexture, T), nt.setOptional(U, I, "batchingIdTexture"), nt.setValue(U, "batchingIdTexture", I._indirectTexture, T), nt.setOptional(U, I, "batchingColorTexture"), I._colorsTexture !== null && nt.setValue(U, "batchingColorTexture", I._colorsTexture, T));
      const Li = z.morphAttributes;
      if ((Li.position !== void 0 || Li.normal !== void 0 || Li.color !== void 0) && Te.update(I, z, Bt), (wt || ye.receiveShadow !== I.receiveShadow) && (ye.receiveShadow = I.receiveShadow, nt.setValue(U, "receiveShadow", I.receiveShadow)), k.isMeshGouraudMaterial && k.envMap !== null && (Yt.envMap.value = _e, Yt.flipEnvMap.value = _e.isCubeTexture && _e.isRenderTargetTexture === !1 ? -1 : 1), k.isMeshStandardMaterial && k.envMap === null && D.environment !== null && (Yt.envMapIntensity.value = D.environmentIntensity), wt && (nt.setValue(U, "toneMappingExposure", y.toneMappingExposure), ye.needsLights && lc(Yt, Pi), ee && k.fog === !0 && ae.refreshFogUniforms(Yt, ee), ae.refreshMaterialUniforms(Yt, k, V, q, u.state.transmissionRenderTarget[M.id]), Or.upload(U, Xa(ye), Yt, T)), k.isShaderMaterial && k.uniformsNeedUpdate === !0 && (Or.upload(U, Xa(ye), Yt, T), k.uniformsNeedUpdate = !1), k.isSpriteMaterial && nt.setValue(U, "center", I.center), nt.setValue(U, "modelViewMatrix", I.modelViewMatrix), nt.setValue(U, "normalMatrix", I.normalMatrix), nt.setValue(U, "modelMatrix", I.matrixWorld), k.isShaderMaterial || k.isRawShaderMaterial) {
        const Lt = k.uniformsGroups;
        for (let mn = 0, gn = Lt.length; mn < gn; mn++) {
          const qa = Lt[mn];
          L.update(qa, Bt), L.bind(qa, Bt);
        }
      }
      return Bt;
    }
    function lc(M, D) {
      M.ambientLightColor.needsUpdate = D, M.lightProbe.needsUpdate = D, M.directionalLights.needsUpdate = D, M.directionalLightShadows.needsUpdate = D, M.pointLights.needsUpdate = D, M.pointLightShadows.needsUpdate = D, M.spotLights.needsUpdate = D, M.spotLightShadows.needsUpdate = D, M.rectAreaLights.needsUpdate = D, M.hemisphereLights.needsUpdate = D;
    }
    function cc(M) {
      return M.isMeshLambertMaterial || M.isMeshToonMaterial || M.isMeshPhongMaterial || M.isMeshStandardMaterial || M.isShadowMaterial || M.isShaderMaterial && M.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return w;
    }, this.getActiveMipmapLevel = function() {
      return b;
    }, this.getRenderTarget = function() {
      return C;
    }, this.setRenderTargetTextures = function(M, D, z) {
      Me.get(M.texture).__webglTexture = D, Me.get(M.depthTexture).__webglTexture = z;
      const k = Me.get(M);
      k.__hasExternalTextures = !0, k.__autoAllocateDepthBuffer = z === void 0, k.__autoAllocateDepthBuffer || Be.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), k.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(M, D) {
      const z = Me.get(M);
      z.__webglFramebuffer = D, z.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(M, D = 0, z = 0) {
      C = M, w = D, b = z;
      let k = !0, I = null, ee = !1, ce = !1;
      if (M) {
        const _e = Me.get(M);
        if (_e.__useDefaultFramebuffer !== void 0)
          Se.bindFramebuffer(U.FRAMEBUFFER, null), k = !1;
        else if (_e.__webglFramebuffer === void 0)
          T.setupRenderTarget(M);
        else if (_e.__hasExternalTextures)
          T.rebindTextures(M, Me.get(M.texture).__webglTexture, Me.get(M.depthTexture).__webglTexture);
        else if (M.depthBuffer) {
          const ve = M.depthTexture;
          if (_e.__boundDepthTexture !== ve) {
            if (ve !== null && Me.has(ve) && (M.width !== ve.image.width || M.height !== ve.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            T.setupDepthRenderbuffer(M);
          }
        }
        const we = M.texture;
        (we.isData3DTexture || we.isDataArrayTexture || we.isCompressedArrayTexture) && (ce = !0);
        const Pe = Me.get(M).__webglFramebuffer;
        M.isWebGLCubeRenderTarget ? (Array.isArray(Pe[D]) ? I = Pe[D][z] : I = Pe[D], ee = !0) : M.samples > 0 && T.useMultisampledRTT(M) === !1 ? I = Me.get(M).__webglMultisampledFramebuffer : Array.isArray(Pe) ? I = Pe[z] : I = Pe, A.copy(M.viewport), N.copy(M.scissor), F = M.scissorTest;
      } else
        A.copy(me).multiplyScalar(V).floor(), N.copy(Ae).multiplyScalar(V).floor(), F = Ne;
      if (Se.bindFramebuffer(U.FRAMEBUFFER, I) && k && Se.drawBuffers(M, I), Se.viewport(A), Se.scissor(N), Se.setScissorTest(F), ee) {
        const _e = Me.get(M.texture);
        U.framebufferTexture2D(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_CUBE_MAP_POSITIVE_X + D, _e.__webglTexture, z);
      } else if (ce) {
        const _e = Me.get(M.texture), we = D || 0;
        U.framebufferTextureLayer(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, _e.__webglTexture, z || 0, we);
      }
      S = -1;
    }, this.readRenderTargetPixels = function(M, D, z, k, I, ee, ce) {
      if (!(M && M.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ge = Me.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && ce !== void 0 && (ge = ge[ce]), ge) {
        Se.bindFramebuffer(U.FRAMEBUFFER, ge);
        try {
          const _e = M.texture, we = _e.format, Pe = _e.type;
          if (!ze.textureFormatReadable(we)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!ze.textureTypeReadable(Pe)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          D >= 0 && D <= M.width - k && z >= 0 && z <= M.height - I && U.readPixels(D, z, k, I, De.convert(we), De.convert(Pe), ee);
        } finally {
          const _e = C !== null ? Me.get(C).__webglFramebuffer : null;
          Se.bindFramebuffer(U.FRAMEBUFFER, _e);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(M, D, z, k, I, ee, ce) {
      if (!(M && M.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let ge = Me.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && ce !== void 0 && (ge = ge[ce]), ge) {
        const _e = M.texture, we = _e.format, Pe = _e.type;
        if (!ze.textureFormatReadable(we))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!ze.textureTypeReadable(Pe))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (D >= 0 && D <= M.width - k && z >= 0 && z <= M.height - I) {
          Se.bindFramebuffer(U.FRAMEBUFFER, ge);
          const ve = U.createBuffer();
          U.bindBuffer(U.PIXEL_PACK_BUFFER, ve), U.bufferData(U.PIXEL_PACK_BUFFER, ee.byteLength, U.STREAM_READ), U.readPixels(D, z, k, I, De.convert(we), De.convert(Pe), 0);
          const We = C !== null ? Me.get(C).__webglFramebuffer : null;
          Se.bindFramebuffer(U.FRAMEBUFFER, We);
          const Qe = U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return U.flush(), await Dh(U, Qe, 4), U.bindBuffer(U.PIXEL_PACK_BUFFER, ve), U.getBufferSubData(U.PIXEL_PACK_BUFFER, 0, ee), U.deleteBuffer(ve), U.deleteSync(Qe), ee;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(M, D = null, z = 0) {
      M.isTexture !== !0 && (ki("WebGLRenderer: copyFramebufferToTexture function signature has changed."), D = arguments[0] || null, M = arguments[1]);
      const k = Math.pow(2, -z), I = Math.floor(M.image.width * k), ee = Math.floor(M.image.height * k), ce = D !== null ? D.x : 0, ge = D !== null ? D.y : 0;
      T.setTexture2D(M, 0), U.copyTexSubImage2D(U.TEXTURE_2D, z, 0, 0, ce, ge, I, ee), Se.unbindTexture();
    }, this.copyTextureToTexture = function(M, D, z = null, k = null, I = 0) {
      M.isTexture !== !0 && (ki("WebGLRenderer: copyTextureToTexture function signature has changed."), k = arguments[0] || null, M = arguments[1], D = arguments[2], I = arguments[3] || 0, z = null);
      let ee, ce, ge, _e, we, Pe, ve, We, Qe;
      const tt = M.isCompressedTexture ? M.mipmaps[I] : M.image;
      z !== null ? (ee = z.max.x - z.min.x, ce = z.max.y - z.min.y, ge = z.isBox3 ? z.max.z - z.min.z : 1, _e = z.min.x, we = z.min.y, Pe = z.isBox3 ? z.min.z : 0) : (ee = tt.width, ce = tt.height, ge = tt.depth || 1, _e = 0, we = 0, Pe = 0), k !== null ? (ve = k.x, We = k.y, Qe = k.z) : (ve = 0, We = 0, Qe = 0);
      const bt = De.convert(D.format), Ye = De.convert(D.type);
      let ye;
      D.isData3DTexture ? (T.setTexture3D(D, 0), ye = U.TEXTURE_3D) : D.isDataArrayTexture || D.isCompressedArrayTexture ? (T.setTexture2DArray(D, 0), ye = U.TEXTURE_2D_ARRAY) : (T.setTexture2D(D, 0), ye = U.TEXTURE_2D), U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, D.flipY), U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), U.pixelStorei(U.UNPACK_ALIGNMENT, D.unpackAlignment);
      const en = U.getParameter(U.UNPACK_ROW_LENGTH), qe = U.getParameter(U.UNPACK_IMAGE_HEIGHT), Bt = U.getParameter(U.UNPACK_SKIP_PIXELS), Kn = U.getParameter(U.UNPACK_SKIP_ROWS), wt = U.getParameter(U.UNPACK_SKIP_IMAGES);
      U.pixelStorei(U.UNPACK_ROW_LENGTH, tt.width), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, tt.height), U.pixelStorei(U.UNPACK_SKIP_PIXELS, _e), U.pixelStorei(U.UNPACK_SKIP_ROWS, we), U.pixelStorei(U.UNPACK_SKIP_IMAGES, Pe);
      const Pi = M.isDataArrayTexture || M.isData3DTexture, nt = D.isDataArrayTexture || D.isData3DTexture;
      if (M.isRenderTargetTexture || M.isDepthTexture) {
        const Yt = Me.get(M), Li = Me.get(D), Lt = Me.get(Yt.__renderTarget), mn = Me.get(Li.__renderTarget);
        Se.bindFramebuffer(U.READ_FRAMEBUFFER, Lt.__webglFramebuffer), Se.bindFramebuffer(U.DRAW_FRAMEBUFFER, mn.__webglFramebuffer);
        for (let gn = 0; gn < ge; gn++)
          Pi && U.framebufferTextureLayer(U.READ_FRAMEBUFFER, U.COLOR_ATTACHMENT0, Me.get(M).__webglTexture, I, Pe + gn), M.isDepthTexture ? (nt && U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER, U.COLOR_ATTACHMENT0, Me.get(D).__webglTexture, I, Qe + gn), U.blitFramebuffer(_e, we, ee, ce, ve, We, ee, ce, U.DEPTH_BUFFER_BIT, U.NEAREST)) : nt ? U.copyTexSubImage3D(ye, I, ve, We, Qe + gn, _e, we, ee, ce) : U.copyTexSubImage2D(ye, I, ve, We, Qe + gn, _e, we, ee, ce);
        Se.bindFramebuffer(U.READ_FRAMEBUFFER, null), Se.bindFramebuffer(U.DRAW_FRAMEBUFFER, null);
      } else
        nt ? M.isDataTexture || M.isData3DTexture ? U.texSubImage3D(ye, I, ve, We, Qe, ee, ce, ge, bt, Ye, tt.data) : D.isCompressedArrayTexture ? U.compressedTexSubImage3D(ye, I, ve, We, Qe, ee, ce, ge, bt, tt.data) : U.texSubImage3D(ye, I, ve, We, Qe, ee, ce, ge, bt, Ye, tt) : M.isDataTexture ? U.texSubImage2D(U.TEXTURE_2D, I, ve, We, ee, ce, bt, Ye, tt.data) : M.isCompressedTexture ? U.compressedTexSubImage2D(U.TEXTURE_2D, I, ve, We, tt.width, tt.height, bt, tt.data) : U.texSubImage2D(U.TEXTURE_2D, I, ve, We, ee, ce, bt, Ye, tt);
      U.pixelStorei(U.UNPACK_ROW_LENGTH, en), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, qe), U.pixelStorei(U.UNPACK_SKIP_PIXELS, Bt), U.pixelStorei(U.UNPACK_SKIP_ROWS, Kn), U.pixelStorei(U.UNPACK_SKIP_IMAGES, wt), I === 0 && D.generateMipmaps && U.generateMipmap(ye), Se.unbindTexture();
    }, this.copyTextureToTexture3D = function(M, D, z = null, k = null, I = 0) {
      return M.isTexture !== !0 && (ki("WebGLRenderer: copyTextureToTexture3D function signature has changed."), z = arguments[0] || null, k = arguments[1] || null, M = arguments[2], D = arguments[3], I = arguments[4] || 0), ki('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(M, D, z, k, I);
    }, this.initRenderTarget = function(M) {
      Me.get(M).__webglFramebuffer === void 0 && T.setupRenderTarget(M);
    }, this.initTexture = function(M) {
      M.isCubeTexture ? T.setTextureCube(M, 0) : M.isData3DTexture ? T.setTexture3D(M, 0) : M.isDataArrayTexture || M.isCompressedArrayTexture ? T.setTexture2DArray(M, 0) : T.setTexture2D(M, 0), Se.unbindTexture();
    }, this.resetState = function() {
      w = 0, b = 0, C = null, Se.reset(), Je.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return hn;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorspace = Ge._getDrawingBufferColorSpace(e), t.unpackColorSpace = Ge._getUnpackColorSpace();
  }
}
class Xm extends Et {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new pn(), this.environmentIntensity = 1, this.environmentRotation = new pn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class Ym {
  constructor(e, t) {
    this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = ya, this.updateRanges = [], this.version = 0, this.uuid = un();
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
  }
  copyAt(e, t, n) {
    e *= this.stride, n *= t.stride;
    for (let r = 0, s = this.stride; r < s; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = un()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  toJSON(e) {
    return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = un()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const yt = /* @__PURE__ */ new P();
class Hr {
  constructor(e, t, n, r = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = r;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.data.count; t < n; t++)
      yt.fromBufferAttribute(this, t), yt.applyMatrix4(e), this.setXYZ(t, yt.x, yt.y, yt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      yt.fromBufferAttribute(this, t), yt.applyNormalMatrix(e), this.setXYZ(t, yt.x, yt.y, yt.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      yt.fromBufferAttribute(this, t), yt.transformDirection(e), this.setXYZ(t, yt.x, yt.y, yt.z);
    return this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.data.stride + this.offset + t];
    return this.normalized && (n = jt(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = je(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this;
  }
  setX(e, t) {
    return this.normalized && (t = je(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this;
  }
  setY(e, t) {
    return this.normalized && (t = je(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
  }
  setZ(e, t) {
    return this.normalized && (t = je(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
  }
  setW(e, t) {
    return this.normalized && (t = je(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setXY(e, t, n) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = je(t, this.array), n = je(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = je(t, this.array), n = je(n, this.array), r = je(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, s) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = je(t, this.array), n = je(n, this.array), r = je(r, this.array), s = je(s, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this.data.array[e + 3] = s, this;
  }
  clone(e) {
    if (e === void 0) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let n = 0; n < this.count; n++) {
        const r = n * this.data.stride + this.offset;
        for (let s = 0; s < this.itemSize; s++)
          t.push(this.data.array[r + s]);
      }
      return new Xt(new this.array.constructor(t), this.itemSize, this.normalized);
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new Hr(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(e) {
    if (e === void 0) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let n = 0; n < this.count; n++) {
        const r = n * this.data.stride + this.offset;
        for (let s = 0; s < this.itemSize; s++)
          t.push(this.data.array[r + s]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: t,
        normalized: this.normalized
      };
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
  }
}
class ql extends Ri {
  static get type() {
    return "SpriteMaterial";
  }
  constructor(e) {
    super(), this.isSpriteMaterial = !0, this.color = new Xe(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
let hi;
const Fi = /* @__PURE__ */ new P(), ui = /* @__PURE__ */ new P(), fi = /* @__PURE__ */ new P(), di = /* @__PURE__ */ new se(), Oi = /* @__PURE__ */ new se(), Zl = /* @__PURE__ */ new st(), Mr = /* @__PURE__ */ new P(), Bi = /* @__PURE__ */ new P(), Sr = /* @__PURE__ */ new P(), Zo = /* @__PURE__ */ new se(), ws = /* @__PURE__ */ new se(), Ko = /* @__PURE__ */ new se();
class jo extends Et {
  constructor(e = new ql()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", hi === void 0) {
      hi = new pt();
      const t = new Float32Array([
        -0.5,
        -0.5,
        0,
        0,
        0,
        0.5,
        -0.5,
        0,
        1,
        0,
        0.5,
        0.5,
        0,
        1,
        1,
        -0.5,
        0.5,
        0,
        0,
        1
      ]), n = new Ym(t, 5);
      hi.setIndex([0, 1, 2, 0, 2, 3]), hi.setAttribute("position", new Hr(n, 3, 0, !1)), hi.setAttribute("uv", new Hr(n, 2, 3, !1));
    }
    this.geometry = hi, this.material = e, this.center = new se(0.5, 0.5);
  }
  raycast(e, t) {
    e.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), ui.setFromMatrixScale(this.matrixWorld), Zl.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), fi.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && ui.multiplyScalar(-fi.z);
    const n = this.material.rotation;
    let r, s;
    n !== 0 && (s = Math.cos(n), r = Math.sin(n));
    const o = this.center;
    Er(Mr.set(-0.5, -0.5, 0), fi, o, ui, r, s), Er(Bi.set(0.5, -0.5, 0), fi, o, ui, r, s), Er(Sr.set(0.5, 0.5, 0), fi, o, ui, r, s), Zo.set(0, 0), ws.set(1, 0), Ko.set(1, 1);
    let a = e.ray.intersectTriangle(Mr, Bi, Sr, !1, Fi);
    if (a === null && (Er(Bi.set(-0.5, 0.5, 0), fi, o, ui, r, s), ws.set(0, 1), a = e.ray.intersectTriangle(Mr, Sr, Bi, !1, Fi), a === null))
      return;
    const l = e.ray.origin.distanceTo(Fi);
    l < e.near || l > e.far || t.push({
      distance: l,
      point: Fi.clone(),
      uv: Nt.getInterpolation(Fi, Mr, Bi, Sr, Zo, ws, Ko, new se()),
      face: null,
      object: this
    });
  }
  copy(e, t) {
    return super.copy(e, t), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this;
  }
}
function Er(i, e, t, n, r, s) {
  di.subVectors(i, t).addScalar(0.5).multiply(n), r !== void 0 ? (Oi.x = s * di.x - r * di.y, Oi.y = r * di.x + s * di.y) : Oi.copy(di), i.copy(e), i.x += Oi.x, i.y += Oi.y, i.applyMatrix4(Zl);
}
class Kl extends Ri {
  static get type() {
    return "LineBasicMaterial";
  }
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.color = new Xe(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const Vr = /* @__PURE__ */ new P(), Gr = /* @__PURE__ */ new P(), $o = /* @__PURE__ */ new st(), zi = /* @__PURE__ */ new Ia(), br = /* @__PURE__ */ new qr(), Rs = /* @__PURE__ */ new P(), Jo = /* @__PURE__ */ new P();
class ln extends Et {
  constructor(e = new pt(), t = new Kl()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [0];
      for (let r = 1, s = t.count; r < s; r++)
        Vr.fromBufferAttribute(t, r - 1), Gr.fromBufferAttribute(t, r), n[r] = n[r - 1], n[r] += Vr.distanceTo(Gr);
      e.setAttribute("lineDistance", new Ft(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.matrixWorld, s = e.params.Line.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), br.copy(n.boundingSphere), br.applyMatrix4(r), br.radius += s, e.ray.intersectsSphere(br) === !1) return;
    $o.copy(r).invert(), zi.copy(e.ray).applyMatrix4($o);
    const a = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const m = Math.max(0, o.start), g = Math.min(h.count, o.start + o.count);
      for (let _ = m, p = g - 1; _ < p; _ += c) {
        const u = h.getX(_), R = h.getX(_ + 1), E = Tr(this, e, zi, l, u, R);
        E && t.push(E);
      }
      if (this.isLineLoop) {
        const _ = h.getX(g - 1), p = h.getX(m), u = Tr(this, e, zi, l, _, p);
        u && t.push(u);
      }
    } else {
      const m = Math.max(0, o.start), g = Math.min(d.count, o.start + o.count);
      for (let _ = m, p = g - 1; _ < p; _ += c) {
        const u = Tr(this, e, zi, l, _, _ + 1);
        u && t.push(u);
      }
      if (this.isLineLoop) {
        const _ = Tr(this, e, zi, l, g - 1, m);
        _ && t.push(_);
      }
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, o = r.length; s < o; s++) {
          const a = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = s;
        }
      }
    }
  }
}
function Tr(i, e, t, n, r, s) {
  const o = i.geometry.attributes.position;
  if (Vr.fromBufferAttribute(o, r), Gr.fromBufferAttribute(o, s), t.distanceSqToSegment(Vr, Gr, Rs, Jo) > n) return;
  Rs.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(Rs);
  if (!(l < e.near || l > e.far))
    return {
      distance: l,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: Jo.clone().applyMatrix4(i.matrixWorld),
      index: r,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const Qo = /* @__PURE__ */ new P(), el = /* @__PURE__ */ new P();
class tl extends ln {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let r = 0, s = t.count; r < s; r += 2)
        Qo.fromBufferAttribute(t, r), el.fromBufferAttribute(t, r + 1), n[r] = r === 0 ? 0 : n[r - 1], n[r + 1] = n[r] + Qo.distanceTo(el);
      e.setAttribute("lineDistance", new Ft(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class qm extends St {
  constructor(e, t, n, r, s, o, a, l, c) {
    super(e, t, n, r, s, o, a, l, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class Jt {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  // Virtual base class method to overwrite and implement in subclasses
  //	- t [0 .. 1]
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  // Get point at relative position in curve according to arc length
  // - u [0 .. 1]
  getPointAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getPoint(n, t);
  }
  // Get sequence of points using getPoint( t )
  getPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++)
      t.push(this.getPoint(n / e));
    return t;
  }
  // Get sequence of points using getPointAt( u )
  getSpacedPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++)
      t.push(this.getPointAt(n / e));
    return t;
  }
  // Get total curve arc length
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  // Get list of cumulative segment lengths
  getLengths(e = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const t = [];
    let n, r = this.getPoint(0), s = 0;
    t.push(0);
    for (let o = 1; o <= e; o++)
      n = this.getPoint(o / e), s += n.distanceTo(r), t.push(s), r = n;
    return this.cacheArcLengths = t, t;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(e, t) {
    const n = this.getLengths();
    let r = 0;
    const s = n.length;
    let o;
    t ? o = t : o = e * n[s - 1];
    let a = 0, l = s - 1, c;
    for (; a <= l; )
      if (r = Math.floor(a + (l - a) / 2), c = n[r] - o, c < 0)
        a = r + 1;
      else if (c > 0)
        l = r - 1;
      else {
        l = r;
        break;
      }
    if (r = l, n[r] === o)
      return r / (s - 1);
    const h = n[r], d = n[r + 1] - h, m = (o - h) / d;
    return (r + m) / (s - 1);
  }
  // Returns a unit vector tangent at t
  // In case any sub curve does not implement its tangent derivation,
  // 2 points a small delta apart will be used to find its gradient
  // which seems to give a reasonable approximation
  getTangent(e, t) {
    let r = e - 1e-4, s = e + 1e-4;
    r < 0 && (r = 0), s > 1 && (s = 1);
    const o = this.getPoint(r), a = this.getPoint(s), l = t || (o.isVector2 ? new se() : new P());
    return l.copy(a).sub(o).normalize(), l;
  }
  getTangentAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getTangent(n, t);
  }
  computeFrenetFrames(e, t) {
    const n = new P(), r = [], s = [], o = [], a = new P(), l = new st();
    for (let m = 0; m <= e; m++) {
      const g = m / e;
      r[m] = this.getTangentAt(g, new P());
    }
    s[0] = new P(), o[0] = new P();
    let c = Number.MAX_VALUE;
    const h = Math.abs(r[0].x), f = Math.abs(r[0].y), d = Math.abs(r[0].z);
    h <= c && (c = h, n.set(1, 0, 0)), f <= c && (c = f, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), a.crossVectors(r[0], n).normalize(), s[0].crossVectors(r[0], a), o[0].crossVectors(r[0], s[0]);
    for (let m = 1; m <= e; m++) {
      if (s[m] = s[m - 1].clone(), o[m] = o[m - 1].clone(), a.crossVectors(r[m - 1], r[m]), a.length() > Number.EPSILON) {
        a.normalize();
        const g = Math.acos(mt(r[m - 1].dot(r[m]), -1, 1));
        s[m].applyMatrix4(l.makeRotationAxis(a, g));
      }
      o[m].crossVectors(r[m], s[m]);
    }
    if (t === !0) {
      let m = Math.acos(mt(s[0].dot(s[e]), -1, 1));
      m /= e, r[0].dot(a.crossVectors(s[0], s[e])) > 0 && (m = -m);
      for (let g = 1; g <= e; g++)
        s[g].applyMatrix4(l.makeRotationAxis(r[g], m * g)), o[g].crossVectors(r[g], s[g]);
    }
    return {
      tangents: r,
      normals: s,
      binormals: o
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
  }
  fromJSON(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
}
class Fa extends Jt {
  constructor(e = 0, t = 0, n = 1, r = 1, s = 0, o = Math.PI * 2, a = !1, l = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = r, this.aStartAngle = s, this.aEndAngle = o, this.aClockwise = a, this.aRotation = l;
  }
  getPoint(e, t = new se()) {
    const n = t, r = Math.PI * 2;
    let s = this.aEndAngle - this.aStartAngle;
    const o = Math.abs(s) < Number.EPSILON;
    for (; s < 0; ) s += r;
    for (; s > r; ) s -= r;
    s < Number.EPSILON && (o ? s = 0 : s = r), this.aClockwise === !0 && !o && (s === r ? s = -r : s = s - r);
    const a = this.aStartAngle + e * s;
    let l = this.aX + this.xRadius * Math.cos(a), c = this.aY + this.yRadius * Math.sin(a);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), f = Math.sin(this.aRotation), d = l - this.aX, m = c - this.aY;
      l = d * h - m * f + this.aX, c = d * f + m * h + this.aY;
    }
    return n.set(l, c);
  }
  copy(e) {
    return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
}
class Zm extends Fa {
  constructor(e, t, n, r, s, o) {
    super(e, t, n, n, r, s, o), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Oa() {
  let i = 0, e = 0, t = 0, n = 0;
  function r(s, o, a, l) {
    i = s, e = a, t = -3 * s + 3 * o - 2 * a - l, n = 2 * s - 2 * o + a + l;
  }
  return {
    initCatmullRom: function(s, o, a, l, c) {
      r(o, a, c * (a - s), c * (l - o));
    },
    initNonuniformCatmullRom: function(s, o, a, l, c, h, f) {
      let d = (o - s) / c - (a - s) / (c + h) + (a - o) / h, m = (a - o) / h - (l - o) / (h + f) + (l - a) / f;
      d *= h, m *= h, r(o, a, d, m);
    },
    calc: function(s) {
      const o = s * s, a = o * s;
      return i + e * s + t * o + n * a;
    }
  };
}
const Ar = /* @__PURE__ */ new P(), Cs = /* @__PURE__ */ new Oa(), Ps = /* @__PURE__ */ new Oa(), Ls = /* @__PURE__ */ new Oa();
class Km extends Jt {
  constructor(e = [], t = !1, n = "centripetal", r = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = r;
  }
  getPoint(e, t = new P()) {
    const n = t, r = this.points, s = r.length, o = (s - (this.closed ? 0 : 1)) * e;
    let a = Math.floor(o), l = o - a;
    this.closed ? a += a > 0 ? 0 : (Math.floor(Math.abs(a) / s) + 1) * s : l === 0 && a === s - 1 && (a = s - 2, l = 1);
    let c, h;
    this.closed || a > 0 ? c = r[(a - 1) % s] : (Ar.subVectors(r[0], r[1]).add(r[0]), c = Ar);
    const f = r[a % s], d = r[(a + 1) % s];
    if (this.closed || a + 2 < s ? h = r[(a + 2) % s] : (Ar.subVectors(r[s - 1], r[s - 2]).add(r[s - 1]), h = Ar), this.curveType === "centripetal" || this.curveType === "chordal") {
      const m = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(c.distanceToSquared(f), m), _ = Math.pow(f.distanceToSquared(d), m), p = Math.pow(d.distanceToSquared(h), m);
      _ < 1e-4 && (_ = 1), g < 1e-4 && (g = _), p < 1e-4 && (p = _), Cs.initNonuniformCatmullRom(c.x, f.x, d.x, h.x, g, _, p), Ps.initNonuniformCatmullRom(c.y, f.y, d.y, h.y, g, _, p), Ls.initNonuniformCatmullRom(c.z, f.z, d.z, h.z, g, _, p);
    } else this.curveType === "catmullrom" && (Cs.initCatmullRom(c.x, f.x, d.x, h.x, this.tension), Ps.initCatmullRom(c.y, f.y, d.y, h.y, this.tension), Ls.initCatmullRom(c.z, f.z, d.z, h.z, this.tension));
    return n.set(
      Cs.calc(l),
      Ps.calc(l),
      Ls.calc(l)
    ), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const r = e.points[t];
      this.points.push(r.clone());
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const r = this.points[t];
      e.points.push(r.toArray());
    }
    return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const r = e.points[t];
      this.points.push(new P().fromArray(r));
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
}
function nl(i, e, t, n, r) {
  const s = (n - e) * 0.5, o = (r - t) * 0.5, a = i * i, l = i * a;
  return (2 * t - 2 * n + s + o) * l + (-3 * t + 3 * n - 2 * s - o) * a + s * i + t;
}
function jm(i, e) {
  const t = 1 - i;
  return t * t * e;
}
function $m(i, e) {
  return 2 * (1 - i) * i * e;
}
function Jm(i, e) {
  return i * i * e;
}
function Vi(i, e, t, n) {
  return jm(i, e) + $m(i, t) + Jm(i, n);
}
function Qm(i, e) {
  const t = 1 - i;
  return t * t * t * e;
}
function eg(i, e) {
  const t = 1 - i;
  return 3 * t * t * i * e;
}
function tg(i, e) {
  return 3 * (1 - i) * i * i * e;
}
function ng(i, e) {
  return i * i * i * e;
}
function Gi(i, e, t, n, r) {
  return Qm(i, e) + eg(i, t) + tg(i, n) + ng(i, r);
}
class jl extends Jt {
  constructor(e = new se(), t = new se(), n = new se(), r = new se()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = r;
  }
  getPoint(e, t = new se()) {
    const n = t, r = this.v0, s = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Gi(e, r.x, s.x, o.x, a.x),
      Gi(e, r.y, s.y, o.y, a.y)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class ig extends Jt {
  constructor(e = new P(), t = new P(), n = new P(), r = new P()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = r;
  }
  getPoint(e, t = new P()) {
    const n = t, r = this.v0, s = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Gi(e, r.x, s.x, o.x, a.x),
      Gi(e, r.y, s.y, o.y, a.y),
      Gi(e, r.z, s.z, o.z, a.z)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class $l extends Jt {
  constructor(e = new se(), t = new se()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new se()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new se()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class rg extends Jt {
  constructor(e = new P(), t = new P()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new P()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new P()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class Jl extends Jt {
  constructor(e = new se(), t = new se(), n = new se()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new se()) {
    const n = t, r = this.v0, s = this.v1, o = this.v2;
    return n.set(
      Vi(e, r.x, s.x, o.x),
      Vi(e, r.y, s.y, o.y)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class sg extends Jt {
  constructor(e = new P(), t = new P(), n = new P()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new P()) {
    const n = t, r = this.v0, s = this.v1, o = this.v2;
    return n.set(
      Vi(e, r.x, s.x, o.x),
      Vi(e, r.y, s.y, o.y),
      Vi(e, r.z, s.z, o.z)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class Ql extends Jt {
  constructor(e = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
  }
  getPoint(e, t = new se()) {
    const n = t, r = this.points, s = (r.length - 1) * e, o = Math.floor(s), a = s - o, l = r[o === 0 ? o : o - 1], c = r[o], h = r[o > r.length - 2 ? r.length - 1 : o + 1], f = r[o > r.length - 3 ? r.length - 1 : o + 2];
    return n.set(
      nl(a, l.x, c.x, h.x, f.x),
      nl(a, l.y, c.y, h.y, f.y)
    ), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const r = e.points[t];
      this.points.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const r = this.points[t];
      e.points.push(r.toArray());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const r = e.points[t];
      this.points.push(new se().fromArray(r));
    }
    return this;
  }
}
var il = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: Zm,
  CatmullRomCurve3: Km,
  CubicBezierCurve: jl,
  CubicBezierCurve3: ig,
  EllipseCurve: Fa,
  LineCurve: $l,
  LineCurve3: rg,
  QuadraticBezierCurve: Jl,
  QuadraticBezierCurve3: sg,
  SplineCurve: Ql
});
class ag extends Jt {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(e) {
    this.curves.push(e);
  }
  closePath() {
    const e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
    if (!e.equals(t)) {
      const n = e.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new il[n](t, e));
    }
    return this;
  }
  // To get accurate point with reference to
  // entire path distance at time t,
  // following has to be done:
  // 1. Length of each sub path have to be known
  // 2. Locate and identify type of curve
  // 3. Get t for the curve
  // 4. Return curve.getPointAt(t')
  getPoint(e, t) {
    const n = e * this.getLength(), r = this.getCurveLengths();
    let s = 0;
    for (; s < r.length; ) {
      if (r[s] >= n) {
        const o = r[s] - n, a = this.curves[s], l = a.getLength(), c = l === 0 ? 0 : 1 - o / l;
        return a.getPointAt(c, t);
      }
      s++;
    }
    return null;
  }
  // We cannot use the default THREE.Curve getPoint() with getLength() because in
  // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
  // getPoint() depends on getLength
  getLength() {
    const e = this.getCurveLengths();
    return e[e.length - 1];
  }
  // cacheLengths must be recalculated.
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  // Compute lengths and cache them
  // We cannot overwrite getLengths() because UtoT mapping uses it.
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const e = [];
    let t = 0;
    for (let n = 0, r = this.curves.length; n < r; n++)
      t += this.curves[n].getLength(), e.push(t);
    return this.cacheLengths = e, e;
  }
  getSpacedPoints(e = 40) {
    const t = [];
    for (let n = 0; n <= e; n++)
      t.push(this.getPoint(n / e));
    return this.autoClose && t.push(t[0]), t;
  }
  getPoints(e = 12) {
    const t = [];
    let n;
    for (let r = 0, s = this.curves; r < s.length; r++) {
      const o = s[r], a = o.isEllipseCurve ? e * 2 : o.isLineCurve || o.isLineCurve3 ? 1 : o.isSplineCurve ? e * o.points.length : e, l = o.getPoints(a);
      for (let c = 0; c < l.length; c++) {
        const h = l[c];
        n && n.equals(h) || (t.push(h), n = h);
      }
    }
    return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
  }
  copy(e) {
    super.copy(e), this.curves = [];
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const r = e.curves[t];
      this.curves.push(r.clone());
    }
    return this.autoClose = e.autoClose, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.autoClose = this.autoClose, e.curves = [];
    for (let t = 0, n = this.curves.length; t < n; t++) {
      const r = this.curves[t];
      e.curves.push(r.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const r = e.curves[t];
      this.curves.push(new il[r.type]().fromJSON(r));
    }
    return this;
  }
}
class rl extends ag {
  constructor(e) {
    super(), this.type = "Path", this.currentPoint = new se(), e && this.setFromPoints(e);
  }
  setFromPoints(e) {
    this.moveTo(e[0].x, e[0].y);
    for (let t = 1, n = e.length; t < n; t++)
      this.lineTo(e[t].x, e[t].y);
    return this;
  }
  moveTo(e, t) {
    return this.currentPoint.set(e, t), this;
  }
  lineTo(e, t) {
    const n = new $l(this.currentPoint.clone(), new se(e, t));
    return this.curves.push(n), this.currentPoint.set(e, t), this;
  }
  quadraticCurveTo(e, t, n, r) {
    const s = new Jl(
      this.currentPoint.clone(),
      new se(e, t),
      new se(n, r)
    );
    return this.curves.push(s), this.currentPoint.set(n, r), this;
  }
  bezierCurveTo(e, t, n, r, s, o) {
    const a = new jl(
      this.currentPoint.clone(),
      new se(e, t),
      new se(n, r),
      new se(s, o)
    );
    return this.curves.push(a), this.currentPoint.set(s, o), this;
  }
  splineThru(e) {
    const t = [this.currentPoint.clone()].concat(e), n = new Ql(t);
    return this.curves.push(n), this.currentPoint.copy(e[e.length - 1]), this;
  }
  arc(e, t, n, r, s, o) {
    const a = this.currentPoint.x, l = this.currentPoint.y;
    return this.absarc(
      e + a,
      t + l,
      n,
      r,
      s,
      o
    ), this;
  }
  absarc(e, t, n, r, s, o) {
    return this.absellipse(e, t, n, n, r, s, o), this;
  }
  ellipse(e, t, n, r, s, o, a, l) {
    const c = this.currentPoint.x, h = this.currentPoint.y;
    return this.absellipse(e + c, t + h, n, r, s, o, a, l), this;
  }
  absellipse(e, t, n, r, s, o, a, l) {
    const c = new Fa(e, t, n, r, s, o, a, l);
    if (this.curves.length > 0) {
      const f = c.getPoint(0);
      f.equals(this.currentPoint) || this.lineTo(f.x, f.y);
    }
    this.curves.push(c);
    const h = c.getPoint(1);
    return this.currentPoint.copy(h), this;
  }
  copy(e) {
    return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.currentPoint = this.currentPoint.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
  }
}
class ec extends rl {
  constructor(e) {
    super(e), this.uuid = un(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(e) {
    const t = [];
    for (let n = 0, r = this.holes.length; n < r; n++)
      t[n] = this.holes[n].getPoints(e);
    return t;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints(e) {
    return {
      shape: this.getPoints(e),
      holes: this.getPointsHoles(e)
    };
  }
  copy(e) {
    super.copy(e), this.holes = [];
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const r = e.holes[t];
      this.holes.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.uuid = this.uuid, e.holes = [];
    for (let t = 0, n = this.holes.length; t < n; t++) {
      const r = this.holes[t];
      e.holes.push(r.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const r = e.holes[t];
      this.holes.push(new rl().fromJSON(r));
    }
    return this;
  }
}
const og = {
  triangulate: function(i, e, t = 2) {
    const n = e && e.length, r = n ? e[0] * t : i.length;
    let s = tc(i, 0, r, t, !0);
    const o = [];
    if (!s || s.next === s.prev) return o;
    let a, l, c, h, f, d, m;
    if (n && (s = fg(i, e, s, t)), i.length > 80 * t) {
      a = c = i[0], l = h = i[1];
      for (let g = t; g < r; g += t)
        f = i[g], d = i[g + 1], f < a && (a = f), d < l && (l = d), f > c && (c = f), d > h && (h = d);
      m = Math.max(c - a, h - l), m = m !== 0 ? 32767 / m : 0;
    }
    return Yi(s, o, t, a, l, m, 0), o;
  }
};
function tc(i, e, t, n, r) {
  let s, o;
  if (r === Eg(i, e, t, n) > 0)
    for (s = e; s < t; s += n) o = sl(s, i[s], i[s + 1], o);
  else
    for (s = t - n; s >= e; s -= n) o = sl(s, i[s], i[s + 1], o);
  return o && jr(o, o.next) && (Zi(o), o = o.next), o;
}
function qn(i, e) {
  if (!i) return i;
  e || (e = i);
  let t = i, n;
  do
    if (n = !1, !t.steiner && (jr(t, t.next) || rt(t.prev, t, t.next) === 0)) {
      if (Zi(t), t = e = t.prev, t === t.next) break;
      n = !0;
    } else
      t = t.next;
  while (n || t !== e);
  return e;
}
function Yi(i, e, t, n, r, s, o) {
  if (!i) return;
  !o && s && _g(i, n, r, s);
  let a = i, l, c;
  for (; i.prev !== i.next; ) {
    if (l = i.prev, c = i.next, s ? cg(i, n, r, s) : lg(i)) {
      e.push(l.i / t | 0), e.push(i.i / t | 0), e.push(c.i / t | 0), Zi(i), i = c.next, a = c.next;
      continue;
    }
    if (i = c, i === a) {
      o ? o === 1 ? (i = hg(qn(i), e, t), Yi(i, e, t, n, r, s, 2)) : o === 2 && ug(i, e, t, n, r, s) : Yi(qn(i), e, t, n, r, s, 1);
      break;
    }
  }
}
function lg(i) {
  const e = i.prev, t = i, n = i.next;
  if (rt(e, t, n) >= 0) return !1;
  const r = e.x, s = t.x, o = n.x, a = e.y, l = t.y, c = n.y, h = r < s ? r < o ? r : o : s < o ? s : o, f = a < l ? a < c ? a : c : l < c ? l : c, d = r > s ? r > o ? r : o : s > o ? s : o, m = a > l ? a > c ? a : c : l > c ? l : c;
  let g = n.next;
  for (; g !== e; ) {
    if (g.x >= h && g.x <= d && g.y >= f && g.y <= m && gi(r, a, s, l, o, c, g.x, g.y) && rt(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function cg(i, e, t, n) {
  const r = i.prev, s = i, o = i.next;
  if (rt(r, s, o) >= 0) return !1;
  const a = r.x, l = s.x, c = o.x, h = r.y, f = s.y, d = o.y, m = a < l ? a < c ? a : c : l < c ? l : c, g = h < f ? h < d ? h : d : f < d ? f : d, _ = a > l ? a > c ? a : c : l > c ? l : c, p = h > f ? h > d ? h : d : f > d ? f : d, u = Ea(m, g, e, t, n), R = Ea(_, p, e, t, n);
  let E = i.prevZ, y = i.nextZ;
  for (; E && E.z >= u && y && y.z <= R; ) {
    if (E.x >= m && E.x <= _ && E.y >= g && E.y <= p && E !== r && E !== o && gi(a, h, l, f, c, d, E.x, E.y) && rt(E.prev, E, E.next) >= 0 || (E = E.prevZ, y.x >= m && y.x <= _ && y.y >= g && y.y <= p && y !== r && y !== o && gi(a, h, l, f, c, d, y.x, y.y) && rt(y.prev, y, y.next) >= 0)) return !1;
    y = y.nextZ;
  }
  for (; E && E.z >= u; ) {
    if (E.x >= m && E.x <= _ && E.y >= g && E.y <= p && E !== r && E !== o && gi(a, h, l, f, c, d, E.x, E.y) && rt(E.prev, E, E.next) >= 0) return !1;
    E = E.prevZ;
  }
  for (; y && y.z <= R; ) {
    if (y.x >= m && y.x <= _ && y.y >= g && y.y <= p && y !== r && y !== o && gi(a, h, l, f, c, d, y.x, y.y) && rt(y.prev, y, y.next) >= 0) return !1;
    y = y.nextZ;
  }
  return !0;
}
function hg(i, e, t) {
  let n = i;
  do {
    const r = n.prev, s = n.next.next;
    !jr(r, s) && nc(r, n, n.next, s) && qi(r, s) && qi(s, r) && (e.push(r.i / t | 0), e.push(n.i / t | 0), e.push(s.i / t | 0), Zi(n), Zi(n.next), n = i = s), n = n.next;
  } while (n !== i);
  return qn(n);
}
function ug(i, e, t, n, r, s) {
  let o = i;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && yg(o, a)) {
        let l = ic(o, a);
        o = qn(o, o.next), l = qn(l, l.next), Yi(o, e, t, n, r, s, 0), Yi(l, e, t, n, r, s, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== i);
}
function fg(i, e, t, n) {
  const r = [];
  let s, o, a, l, c;
  for (s = 0, o = e.length; s < o; s++)
    a = e[s] * n, l = s < o - 1 ? e[s + 1] * n : i.length, c = tc(i, a, l, n, !1), c === c.next && (c.steiner = !0), r.push(xg(c));
  for (r.sort(dg), s = 0; s < r.length; s++)
    t = pg(r[s], t);
  return t;
}
function dg(i, e) {
  return i.x - e.x;
}
function pg(i, e) {
  const t = mg(i, e);
  if (!t)
    return e;
  const n = ic(t, i);
  return qn(n, n.next), qn(t, t.next);
}
function mg(i, e) {
  let t = e, n = -1 / 0, r;
  const s = i.x, o = i.y;
  do {
    if (o <= t.y && o >= t.next.y && t.next.y !== t.y) {
      const d = t.x + (o - t.y) * (t.next.x - t.x) / (t.next.y - t.y);
      if (d <= s && d > n && (n = d, r = t.x < t.next.x ? t : t.next, d === s))
        return r;
    }
    t = t.next;
  } while (t !== e);
  if (!r) return null;
  const a = r, l = r.x, c = r.y;
  let h = 1 / 0, f;
  t = r;
  do
    s >= t.x && t.x >= l && s !== t.x && gi(o < c ? s : n, o, l, c, o < c ? n : s, o, t.x, t.y) && (f = Math.abs(o - t.y) / (s - t.x), qi(t, i) && (f < h || f === h && (t.x > r.x || t.x === r.x && gg(r, t))) && (r = t, h = f)), t = t.next;
  while (t !== a);
  return r;
}
function gg(i, e) {
  return rt(i.prev, i, e.prev) < 0 && rt(e.next, i, i.next) < 0;
}
function _g(i, e, t, n) {
  let r = i;
  do
    r.z === 0 && (r.z = Ea(r.x, r.y, e, t, n)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== i);
  r.prevZ.nextZ = null, r.prevZ = null, vg(r);
}
function vg(i) {
  let e, t, n, r, s, o, a, l, c = 1;
  do {
    for (t = i, i = null, s = null, o = 0; t; ) {
      for (o++, n = t, a = 0, e = 0; e < c && (a++, n = n.nextZ, !!n); e++)
        ;
      for (l = c; a > 0 || l > 0 && n; )
        a !== 0 && (l === 0 || !n || t.z <= n.z) ? (r = t, t = t.nextZ, a--) : (r = n, n = n.nextZ, l--), s ? s.nextZ = r : i = r, r.prevZ = s, s = r;
      t = n;
    }
    s.nextZ = null, c *= 2;
  } while (o > 1);
  return i;
}
function Ea(i, e, t, n, r) {
  return i = (i - t) * r | 0, e = (e - n) * r | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, i | e << 1;
}
function xg(i) {
  let e = i, t = i;
  do
    (e.x < t.x || e.x === t.x && e.y < t.y) && (t = e), e = e.next;
  while (e !== i);
  return t;
}
function gi(i, e, t, n, r, s, o, a) {
  return (r - o) * (e - a) >= (i - o) * (s - a) && (i - o) * (n - a) >= (t - o) * (e - a) && (t - o) * (s - a) >= (r - o) * (n - a);
}
function yg(i, e) {
  return i.next.i !== e.i && i.prev.i !== e.i && !Mg(i, e) && // dones't intersect other edges
  (qi(i, e) && qi(e, i) && Sg(i, e) && // locally visible
  (rt(i.prev, i, e.prev) || rt(i, e.prev, e)) || // does not create opposite-facing sectors
  jr(i, e) && rt(i.prev, i, i.next) > 0 && rt(e.prev, e, e.next) > 0);
}
function rt(i, e, t) {
  return (e.y - i.y) * (t.x - e.x) - (e.x - i.x) * (t.y - e.y);
}
function jr(i, e) {
  return i.x === e.x && i.y === e.y;
}
function nc(i, e, t, n) {
  const r = Rr(rt(i, e, t)), s = Rr(rt(i, e, n)), o = Rr(rt(t, n, i)), a = Rr(rt(t, n, e));
  return !!(r !== s && o !== a || r === 0 && wr(i, t, e) || s === 0 && wr(i, n, e) || o === 0 && wr(t, i, n) || a === 0 && wr(t, e, n));
}
function wr(i, e, t) {
  return e.x <= Math.max(i.x, t.x) && e.x >= Math.min(i.x, t.x) && e.y <= Math.max(i.y, t.y) && e.y >= Math.min(i.y, t.y);
}
function Rr(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Mg(i, e) {
  let t = i;
  do {
    if (t.i !== i.i && t.next.i !== i.i && t.i !== e.i && t.next.i !== e.i && nc(t, t.next, i, e)) return !0;
    t = t.next;
  } while (t !== i);
  return !1;
}
function qi(i, e) {
  return rt(i.prev, i, i.next) < 0 ? rt(i, e, i.next) >= 0 && rt(i, i.prev, e) >= 0 : rt(i, e, i.prev) < 0 || rt(i, i.next, e) < 0;
}
function Sg(i, e) {
  let t = i, n = !1;
  const r = (i.x + e.x) / 2, s = (i.y + e.y) / 2;
  do
    t.y > s != t.next.y > s && t.next.y !== t.y && r < (t.next.x - t.x) * (s - t.y) / (t.next.y - t.y) + t.x && (n = !n), t = t.next;
  while (t !== i);
  return n;
}
function ic(i, e) {
  const t = new ba(i.i, i.x, i.y), n = new ba(e.i, e.x, e.y), r = i.next, s = e.prev;
  return i.next = e, e.prev = i, t.next = r, r.prev = t, n.next = t, t.prev = n, s.next = n, n.prev = s, n;
}
function sl(i, e, t, n) {
  const r = new ba(i, e, t);
  return n ? (r.next = n.next, r.prev = n, n.next.prev = r, n.next = r) : (r.prev = r, r.next = r), r;
}
function Zi(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function ba(i, e, t) {
  this.i = i, this.x = e, this.y = t, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function Eg(i, e, t, n) {
  let r = 0;
  for (let s = e, o = t - n; s < t; s += n)
    r += (i[o] - i[s]) * (i[s + 1] + i[o + 1]), o = s;
  return r;
}
class Wi {
  // calculate area of the contour polygon
  static area(e) {
    const t = e.length;
    let n = 0;
    for (let r = t - 1, s = 0; s < t; r = s++)
      n += e[r].x * e[s].y - e[s].x * e[r].y;
    return n * 0.5;
  }
  static isClockWise(e) {
    return Wi.area(e) < 0;
  }
  static triangulateShape(e, t) {
    const n = [], r = [], s = [];
    al(e), ol(n, e);
    let o = e.length;
    t.forEach(al);
    for (let l = 0; l < t.length; l++)
      r.push(o), o += t[l].length, ol(n, t[l]);
    const a = og.triangulate(n, r);
    for (let l = 0; l < a.length; l += 3)
      s.push(a.slice(l, l + 3));
    return s;
  }
}
function al(i) {
  const e = i.length;
  e > 2 && i[e - 1].equals(i[0]) && i.pop();
}
function ol(i, e) {
  for (let t = 0; t < e.length; t++)
    i.push(e[t].x), i.push(e[t].y);
}
class Ba extends pt {
  constructor(e = new ec([new se(0, 0.5), new se(-0.5, -0.5), new se(0.5, -0.5)]), t = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: e,
      curveSegments: t
    };
    const n = [], r = [], s = [], o = [];
    let a = 0, l = 0;
    if (Array.isArray(e) === !1)
      c(e);
    else
      for (let h = 0; h < e.length; h++)
        c(e[h]), this.addGroup(a, l, h), a += l, l = 0;
    this.setIndex(n), this.setAttribute("position", new Ft(r, 3)), this.setAttribute("normal", new Ft(s, 3)), this.setAttribute("uv", new Ft(o, 2));
    function c(h) {
      const f = r.length / 3, d = h.extractPoints(t);
      let m = d.shape;
      const g = d.holes;
      Wi.isClockWise(m) === !1 && (m = m.reverse());
      for (let p = 0, u = g.length; p < u; p++) {
        const R = g[p];
        Wi.isClockWise(R) === !0 && (g[p] = R.reverse());
      }
      const _ = Wi.triangulateShape(m, g);
      for (let p = 0, u = g.length; p < u; p++) {
        const R = g[p];
        m = m.concat(R);
      }
      for (let p = 0, u = m.length; p < u; p++) {
        const R = m[p];
        r.push(R.x, R.y, 0), s.push(0, 0, 1), o.push(R.x, R.y);
      }
      for (let p = 0, u = _.length; p < u; p++) {
        const R = _[p], E = R[0] + f, y = R[1] + f, O = R[2] + f;
        n.push(E, y, O), l += 3;
      }
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  toJSON() {
    const e = super.toJSON(), t = this.parameters.shapes;
    return bg(t, e);
  }
  static fromJSON(e, t) {
    const n = [];
    for (let r = 0, s = e.shapes.length; r < s; r++) {
      const o = t[e.shapes[r]];
      n.push(o);
    }
    return new Ba(n, e.curveSegments);
  }
}
function bg(i, e) {
  if (e.shapes = [], Array.isArray(i))
    for (let t = 0, n = i.length; t < n; t++) {
      const r = i[t];
      e.shapes.push(r.uuid);
    }
  else
    e.shapes.push(i.uuid);
  return e;
}
class ll {
  constructor(e = 1, t = 0, n = 0) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  // restrict phi to be between EPS and PI-EPS
  makeSafe() {
    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(mt(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Tg extends Zn {
  constructor(e, t = null) {
    super(), this.object = e, this.domElement = t, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }, this.touches = { ONE: null, TWO: null };
  }
  connect() {
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: Aa
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Aa);
function Ag(i) {
  const e = i.trim().split(`
`);
  if (!e.some((r) => /^\w+:\s/.test(r)))
    return { filePath: i.trim(), options: {} };
  const t = {};
  for (const r of e) {
    const s = r.match(/^(\w+):\s*(.+)/);
    s && (t[s[1]] = s[2].trim());
  }
  const n = {};
  return t.height && (n.height = parseInt(t.height, 10)), t.theme && (n.theme = t.theme), t.layers && (n.initialLayers = t.layers.split(",").map((r) => r.trim())), {
    filePath: t.file ?? "",
    options: n
  };
}
const wg = {
  0: "#000000",
  // ByBlock（黑色后备）
  1: "#ff0000",
  // 红
  2: "#ffff00",
  // 黄
  3: "#00ff00",
  // 绿
  4: "#00ffff",
  // 青
  5: "#0000ff",
  // 蓝
  6: "#ff00ff",
  // 品红
  7: "#ffffff",
  // 白/黑（取决于背景）
  8: "#414141",
  9: "#808080",
  10: "#ff0000",
  11: "#ffaaaa",
  12: "#bd0000",
  13: "#bd7e7e",
  14: "#810000",
  15: "#815656",
  16: "#680000",
  17: "#684545",
  18: "#4f0000",
  19: "#4f3535",
  20: "#ff3f00",
  21: "#ffbfaa",
  22: "#bd2e00",
  23: "#bd8d7e",
  24: "#811f00",
  25: "#816056",
  26: "#681900",
  27: "#684e45",
  28: "#4f1300",
  29: "#4f3b35",
  30: "#ff7f00",
  31: "#ffd4aa",
  32: "#bd5e00",
  33: "#bd9d7e",
  34: "#814000",
  35: "#816b56",
  36: "#683400",
  37: "#685645",
  38: "#4f2700",
  39: "#4f4235",
  40: "#ffbf00",
  41: "#ffeaaa",
  42: "#bd8d00",
  43: "#bdad7e",
  44: "#816000",
  45: "#817656",
  46: "#684e00",
  47: "#685f45",
  48: "#4f3b00",
  49: "#4f4935",
  50: "#ffff00",
  51: "#ffffaa",
  52: "#bdbd00",
  53: "#bdbd7e",
  54: "#818100",
  55: "#818156",
  56: "#686800",
  57: "#686845",
  58: "#4f4f00",
  59: "#4f4f35",
  60: "#bfff00",
  61: "#eaffaa",
  62: "#8dbd00",
  63: "#adbd7e",
  64: "#608100",
  65: "#768156",
  66: "#4e6800",
  67: "#5f6845",
  68: "#3b4f00",
  69: "#494f35",
  70: "#7fff00",
  71: "#d4ffaa",
  72: "#5ebd00",
  73: "#9dbd7e",
  74: "#408100",
  75: "#6b8156",
  76: "#346800",
  77: "#566845",
  78: "#274f00",
  79: "#424f35",
  80: "#3fff00",
  81: "#bfffaa",
  82: "#2ebd00",
  83: "#8dbd7e",
  84: "#1f8100",
  85: "#608156",
  86: "#196800",
  87: "#4e6845",
  88: "#134f00",
  89: "#3b4f35",
  90: "#00ff00",
  91: "#aaffaa",
  92: "#00bd00",
  93: "#7ebd7e",
  94: "#008100",
  95: "#568156",
  96: "#006800",
  97: "#456845",
  98: "#004f00",
  99: "#354f35",
  100: "#00ff3f",
  101: "#aaffbf",
  102: "#00bd2e",
  103: "#7ebd8d",
  104: "#00811f",
  105: "#568160",
  106: "#006819",
  107: "#45684e",
  108: "#004f13",
  109: "#354f3b",
  110: "#00ff7f",
  111: "#aaffd4",
  112: "#00bd5e",
  113: "#7ebd9d",
  114: "#008140",
  115: "#56816b",
  116: "#006834",
  117: "#456856",
  118: "#004f27",
  119: "#354f42",
  120: "#00ffbf",
  121: "#aaffea",
  122: "#00bd8d",
  123: "#7ebdad",
  124: "#008160",
  125: "#568176",
  126: "#00684e",
  127: "#45685f",
  128: "#004f3b",
  129: "#354f49",
  130: "#00ffff",
  131: "#aaffff",
  132: "#00bdbd",
  133: "#7ebdbd",
  134: "#008181",
  135: "#568181",
  136: "#006868",
  137: "#456868",
  138: "#004f4f",
  139: "#354f4f",
  140: "#00bfff",
  141: "#aaeaff",
  142: "#008dbd",
  143: "#7eadbd",
  144: "#006081",
  145: "#567681",
  146: "#004e68",
  147: "#455f68",
  148: "#003b4f",
  149: "#35494f",
  150: "#007fff",
  151: "#aad4ff",
  152: "#005ebd",
  153: "#7e9dbd",
  154: "#004081",
  155: "#566b81",
  156: "#003468",
  157: "#455668",
  158: "#00274f",
  159: "#35424f",
  160: "#003fff",
  161: "#aabfff",
  162: "#002ebd",
  163: "#7e8dbd",
  164: "#001f81",
  165: "#566081",
  166: "#001968",
  167: "#454e68",
  168: "#00134f",
  169: "#353b4f",
  170: "#0000ff",
  171: "#aaaaff",
  172: "#0000bd",
  173: "#7e7ebd",
  174: "#000081",
  175: "#565681",
  176: "#000068",
  177: "#454568",
  178: "#00004f",
  179: "#35354f",
  180: "#3f00ff",
  181: "#bfaaff",
  182: "#2e00bd",
  183: "#8d7ebd",
  184: "#1f0081",
  185: "#605681",
  186: "#190068",
  187: "#4e4568",
  188: "#13004f",
  189: "#3b354f",
  190: "#7f00ff",
  191: "#d4aaff",
  192: "#5e00bd",
  193: "#9d7ebd",
  194: "#400081",
  195: "#6b5681",
  196: "#340068",
  197: "#564568",
  198: "#27004f",
  199: "#42354f",
  200: "#bf00ff",
  201: "#eaaaff",
  202: "#8d00bd",
  203: "#ad7ebd",
  204: "#600081",
  205: "#765681",
  206: "#4e0068",
  207: "#5f4568",
  208: "#3b004f",
  209: "#49354f",
  210: "#ff00ff",
  211: "#ffaaff",
  212: "#bd00bd",
  213: "#bd7ebd",
  214: "#810081",
  215: "#815681",
  216: "#680068",
  217: "#684568",
  218: "#4f004f",
  219: "#4f354f",
  220: "#ff00bf",
  221: "#ffaaea",
  222: "#bd008d",
  223: "#bd7ead",
  224: "#810060",
  225: "#815676",
  226: "#68004e",
  227: "#68455f",
  228: "#4f003b",
  229: "#4f3549",
  230: "#ff007f",
  231: "#ffaad4",
  232: "#bd005e",
  233: "#bd7e9d",
  234: "#810040",
  235: "#81566b",
  236: "#680034",
  237: "#684556",
  238: "#4f0027",
  239: "#4f3542",
  240: "#ff003f",
  241: "#ffaabf",
  242: "#bd002e",
  243: "#bd7e8d",
  244: "#81001f",
  245: "#815660",
  246: "#680019",
  247: "#68454e",
  248: "#4f0013",
  249: "#4f353b",
  250: "#333333",
  251: "#505050",
  252: "#696969",
  253: "#828282",
  254: "#bebebe",
  255: "#ffffff",
  256: "#ffffff"
  // ByLayer（白色后备）
};
function Wr(i) {
  return wg[i] ?? "#ffffff";
}
function Rg(i) {
  let e = 1 / 0, t = 1 / 0, n = -1 / 0, r = -1 / 0;
  for (const a of i) {
    const l = [];
    if (a.vertices)
      for (const c of a.vertices)
        typeof c.x == "number" && typeof c.y == "number" && l.push({ x: c.x, y: c.y });
    typeof a.x == "number" && typeof a.y == "number" && (l.push({ x: a.x, y: a.y }), typeof a.r == "number" && (l.push({ x: a.x + a.r, y: a.y + a.r }), l.push({ x: a.x - a.r, y: a.y - a.r }))), a.position && typeof a.position.x == "number" && (l.push({ x: a.position.x, y: a.position.y }), typeof a.radius == "number" && (l.push({ x: a.position.x + a.radius, y: a.position.y + a.radius }), l.push({ x: a.position.x - a.radius, y: a.position.y - a.radius }))), a.center && typeof a.center.x == "number" && (l.push({ x: a.center.x, y: a.center.y }), typeof a.radius == "number" && (l.push({ x: a.center.x + a.radius, y: a.center.y + a.radius }), l.push({ x: a.center.x - a.radius, y: a.center.y - a.radius }))), a.start && l.push({ x: a.start.x, y: a.start.y }), a.end && l.push({ x: a.end.x, y: a.end.y });
    for (const c of l)
      c.x < e && (e = c.x), c.x > n && (n = c.x), c.y < t && (t = c.y), c.y > r && (r = c.y);
  }
  isFinite(e) || (e = 0, n = 100, t = 0, r = 100);
  const s = n - e || 1, o = r - t || 1;
  return {
    minX: e,
    minY: t,
    maxX: n,
    maxY: r,
    width: s,
    height: o,
    centerX: (e + n) / 2,
    centerY: (t + r) / 2
  };
}
function Cg(i) {
  var e;
  const t = (e = i == null ? void 0 : i.$INSUNITS) == null ? void 0 : e.value;
  return t === void 0 ? "unknown" : t === 1 || t === 2 || t === 8 || t === 9 || t === 10 ? "imperial" : t >= 4 && t <= 7 ? "metric" : "unknown";
}
const cl = 180 / Math.PI;
function Pg(i) {
  return i.type === "ARC" && i.startAngle != null ? { ...i, startAngle: i.startAngle * cl, endAngle: i.endAngle * cl } : i;
}
function Lg(i, e, t, n, r, s, o, a) {
  const l = (i.x ?? 0) - (a.x ?? 0), c = (i.y ?? 0) - (a.y ?? 0), h = (i.z ?? 0) - (a.z ?? 0);
  return {
    x: l * t * s - c * n * o + (e.x ?? 0),
    y: l * t * o + c * n * s + (e.y ?? 0),
    z: h * r + (e.z ?? 0)
  };
}
function hl(i, e, t, n, r, s, o, a, l) {
  const c = (f) => Lg(f, e, t, n, r, s, o, a), h = { ...i };
  if (h.vertices && (h.vertices = h.vertices.map(c)), h.start && (h.start = c(h.start)), h.end && (h.end = c(h.end)), h.center && (h.center = c(h.center)), h.position && (h.position = c(h.position)), h.controlPoints && (h.controlPoints = h.controlPoints.map(c)), h.fitPoints && (h.fitPoints = h.fitPoints.map(c)), h.points && (h.points = h.points.map(c)), h.majorAxisEndPoint) {
    const f = h.majorAxisEndPoint;
    h.majorAxisEndPoint = {
      x: f.x * t * s - f.y * n * o,
      y: f.x * t * o + f.y * n * s,
      z: (f.z ?? 0) * r
    };
  }
  return h.radius != null && (h.radius = h.radius * Math.max(Math.abs(t), Math.abs(n))), (!h.layer || h.layer === "0") && (h.layer = l), h;
}
function Br(i, e, t) {
  var n, r, s;
  const o = [];
  for (const a of i)
    if (a.type === "INSERT" && t < 8) {
      const l = e[a.name];
      if ((n = l == null ? void 0 : l.entities) != null && n.length) {
        const c = a.position ?? { x: 0, y: 0, z: 0 }, h = a.xScale ?? 1, f = a.yScale ?? 1, d = a.zScale ?? 1, m = (a.rotation ?? 0) * Math.PI / 180, g = Math.cos(m), _ = Math.sin(m), p = l.position ?? { x: 0, y: 0, z: 0 }, u = a.layer ?? "0", R = Br(l.entities, e, t + 1);
        for (const O of R)
          o.push(hl(O, c, h, f, d, g, _, p, u));
        const E = a.rowCount ?? 1, y = a.columnCount ?? 1;
        if (E > 1 || y > 1) {
          const O = a.rowSpacing ?? 0, w = a.columnSpacing ?? 0;
          for (let b = 0; b < E; b++)
            for (let C = 0; C < y; C++) {
              if (b === 0 && C === 0) continue;
              const S = {
                x: c.x + C * w,
                y: c.y + b * O,
                z: c.z ?? 0
              }, v = Br(l.entities, e, t + 1);
              for (const A of v)
                o.push(hl(A, S, h, f, d, g, _, p, u));
            }
        }
      }
    } else if (a.type === "DIMENSION" && t < 8) {
      const l = a.block;
      if (l && (s = (r = e[l]) == null ? void 0 : r.entities) != null && s.length) {
        const c = Br(e[l].entities, e, t + 1);
        for (const h of c)
          o.push({ ...h, layer: h.layer || a.layer || "0" });
      }
      o.push(a);
    } else
      o.push(Pg(a));
  return o;
}
function Dg(i) {
  var e, t;
  const n = new zc().parseSync(i), r = ((t = (e = n == null ? void 0 : n.tables) == null ? void 0 : e.layer) == null ? void 0 : t.layers) ?? {}, s = Object.values(r).map((h) => {
    const f = h, d = f.colorIndex ?? f.color ?? 7, m = Math.abs(Number(d)) || 7;
    return {
      name: String(f.name ?? "0"),
      color: m,
      colorHex: Wr(m),
      visible: !f.frozen,
      frozen: !!f.frozen,
      lineWeight: Number(f.lineWeight ?? 0)
    };
  });
  s.find((h) => h.name === "0") || s.unshift({ name: "0", color: 7, colorHex: "#ffffff", visible: !0, frozen: !1, lineWeight: 0 });
  const o = (n == null ? void 0 : n.blocks) ?? {}, a = (n == null ? void 0 : n.entities) ?? [], l = Br(a, o, 0), c = Rg(l);
  return {
    layers: s,
    entities: l,
    boundingBox: c,
    units: Cg(n == null ? void 0 : n.header),
    sourceFormat: "dxf"
  };
}
let Ds = null;
const On = 180 / Math.PI, Is = Math.PI * 2;
function Ig(i) {
  let e = 1 / 0, t = 1 / 0, n = -1 / 0, r = -1 / 0;
  function s(l, c) {
    l < e && (e = l), l > n && (n = l), c < t && (t = c), c > r && (r = c);
  }
  for (const l of i) {
    if (l.start && s(l.start.x, l.start.y), l.end && s(l.end.x, l.end.y), l.center) {
      const c = l.radius ?? 0;
      s(l.center.x - c, l.center.y - c), s(l.center.x + c, l.center.y + c);
    }
    if (l.vertices)
      for (const c of l.vertices)
        s(c.x, c.y);
  }
  isFinite(e) || (e = 0, n = 100, t = 0, r = 100);
  const o = n - e || 1, a = r - t || 1;
  return {
    minX: e,
    minY: t,
    maxX: n,
    maxY: r,
    width: o,
    height: a,
    centerX: (e + n) / 2,
    centerY: (t + r) / 2
  };
}
function Ug(i, e, t, n, r, s, o, a) {
  const l = i.x - a.x, c = i.y - a.y, h = (i.z ?? 0) - a.z;
  return {
    x: l * t * s - c * n * o + e.x,
    y: l * t * o + c * n * s + e.y,
    z: h * r + e.z
  };
}
function Ng(i, e, t, n, r, s, o, a) {
  const l = (h) => Ug(h, e, t, n, r, s, o, a), c = { ...i };
  return c.start && (c.start = l(c.start)), c.end && (c.end = l(c.end)), c.center && (c.center = l(c.center)), c.vertices && (c.vertices = c.vertices.map(l)), c.radius != null && (c.radius = c.radius * Math.max(Math.abs(t), Math.abs(n))), c;
}
function Ta(i, e, t = 0) {
  var n, r, s, o, a, l, c, h, f, d, m, g, _, p, u, R, E, y, O, w, b;
  const C = i.colorIndex, S = C != null ? Math.abs(C) : 256, v = {
    layer: i.layer ?? "0",
    color: S
    // 256 = ByLayer
  };
  switch (C == null && i.color != null && (v.trueColor = i.color), i.type) {
    case "LINE":
      return {
        ...v,
        type: "LINE",
        start: { x: i.startPoint.x, y: i.startPoint.y, z: i.startPoint.z ?? 0 },
        end: { x: i.endPoint.x, y: i.endPoint.y, z: i.endPoint.z ?? 0 }
      };
    case "CIRCLE":
      return {
        ...v,
        type: "CIRCLE",
        center: { x: i.center.x, y: i.center.y, z: i.center.z ?? 0 },
        radius: i.radius
      };
    case "ARC":
      return {
        ...v,
        type: "ARC",
        center: { x: i.center.x, y: i.center.y, z: i.center.z ?? 0 },
        radius: i.radius,
        startAngle: i.startAngle * On,
        endAngle: i.endAngle * On
      };
    case "LWPOLYLINE":
      return {
        ...v,
        type: "LWPOLYLINE",
        vertices: i.vertices.map((A) => ({ x: A.x, y: A.y })),
        shape: !!(i.flag & 1)
        // bit 0 = closed
      };
    case "POLYLINE":
    case "POLYLINE2D":
    // actual type name from @mlightcad/libredwg-web converter
    case "POLYLINE3D": {
      const A = i.vertices.map((N) => {
        var F, H, X;
        return {
          x: N.x ?? ((F = N.point) == null ? void 0 : F.x) ?? 0,
          y: N.y ?? ((H = N.point) == null ? void 0 : H.y) ?? 0,
          z: N.z ?? ((X = N.point) == null ? void 0 : X.z) ?? 0
        };
      });
      return A.length < 2 ? null : { ...v, type: "POLYLINE", vertices: A };
    }
    case "SPLINE": {
      const A = ((n = i.fitPoints) == null ? void 0 : n.length) > 0 ? i.fitPoints : i.controlPoints ?? [];
      return A.length < 2 ? null : {
        ...v,
        type: "POLYLINE",
        vertices: A.map((N) => ({ x: N.x, y: N.y, z: N.z ?? 0 }))
      };
    }
    case "ELLIPSE": {
      const A = ((r = i.center) == null ? void 0 : r.x) ?? 0, N = ((s = i.center) == null ? void 0 : s.y) ?? 0, F = ((o = i.center) == null ? void 0 : o.z) ?? 0, H = ((a = i.majorAxisEndPoint) == null ? void 0 : a.x) ?? 1, X = ((l = i.majorAxisEndPoint) == null ? void 0 : l.y) ?? 0, W = Math.sqrt(H * H + X * X);
      if (W === 0) return null;
      const q = Math.atan2(X, H), V = W * (i.axisRatio ?? 1), te = i.startAngle ?? 0;
      let oe = i.endAngle ?? Is;
      oe <= te && (oe += Is);
      const me = 72, Ae = [];
      for (let Ne = 0; Ne <= me; Ne++) {
        const Y = te + Ne / me * (oe - te), J = Math.cos(Y) * W, pe = Math.sin(Y) * V;
        Ae.push({
          x: A + J * Math.cos(q) - pe * Math.sin(q),
          y: N + J * Math.sin(q) + pe * Math.cos(q),
          z: F
        });
      }
      return { ...v, type: "POLYLINE", vertices: Ae };
    }
    case "SOLID": {
      const A = i.corner1 ?? { x: 0, y: 0 }, N = i.corner2 ?? A, F = i.corner3 ?? N, H = i.corner4 ?? F;
      return {
        ...v,
        type: "POLYLINE",
        vertices: [A, N, H, F, A].map((X) => ({
          x: X.x,
          y: X.y,
          z: X.z ?? 0
        }))
      };
    }
    case "3DFACE": {
      const A = i.corner1, N = i.corner2, F = i.corner3, H = i.corner4 ?? i.corner3;
      return !A || !N || !F ? null : {
        ...v,
        type: "3DFACE",
        vertices: [A, N, F, H].map((X) => ({
          x: X.x,
          y: X.y,
          z: X.z ?? 0
        }))
      };
    }
    case "LEADER": {
      const A = i.vertices ?? [];
      return A.length < 2 ? null : {
        ...v,
        type: "POLYLINE",
        vertices: A.map((N) => ({ x: N.x, y: N.y, z: N.z ?? 0 }))
      };
    }
    case "DIMENSION": {
      const A = i.name ?? "";
      if (!A) return null;
      const N = (((h = (c = e == null ? void 0 : e.tables) == null ? void 0 : c.BLOCK_RECORD) == null ? void 0 : h.entries) ?? []).find((H) => H.name === A);
      if (!((f = N == null ? void 0 : N.entities) != null && f.length)) return null;
      const F = [];
      for (const H of N.entities) {
        const X = Ta(H, e, t + 1);
        if (!X) continue;
        const W = Array.isArray(X) ? X : [X];
        F.push(...W);
      }
      return F.length > 0 ? F : null;
    }
    case "HATCH": {
      const A = i.solidFill === 1, N = i.boundaryPaths ?? [], F = [];
      for (const H of N) {
        const X = H.vertices ?? H.polylineVertices ?? [];
        if (X.length >= 2) {
          const q = X.map((V) => ({ x: V.x, y: V.y, z: 0 }));
          A && X.length >= 3 ? F.push({ ...v, type: "SOLID_FILL", vertices: q }) : F.push({ ...v, type: "POLYLINE", vertices: q });
          continue;
        }
        const W = H.edges ?? [];
        for (const q of W)
          if (q.type === 1)
            F.push({ ...v, type: "LINE", start: q.start, end: q.end });
          else if (q.type === 2)
            F.push({
              ...v,
              type: "ARC",
              center: q.center,
              radius: q.radius,
              startAngle: q.startAngle * On,
              endAngle: q.endAngle * On
            });
          else if (q.type === 3)
            F.push({
              ...v,
              type: "ELLIPSE",
              center: q.center,
              majorAxisEndPoint: q.majorAxisEndPoint,
              axisRatio: q.minorToMajorRatio ?? 1,
              startAngle: q.startAngle ?? 0,
              endAngle: q.endAngle ?? Is
            });
          else if (q.type === 4) {
            const V = ((d = q.fitPoints) == null ? void 0 : d.length) > 0 ? q.fitPoints : q.controlPoints ?? [];
            V.length >= 2 && F.push({ ...v, type: "POLYLINE", vertices: V });
          }
      }
      return F.length > 0 ? F : null;
    }
    case "TEXT":
      return {
        ...v,
        type: "TEXT",
        text: String(i.text ?? ""),
        startPoint: { x: ((m = i.startPoint) == null ? void 0 : m.x) ?? 0, y: ((g = i.startPoint) == null ? void 0 : g.y) ?? 0, z: 0 },
        textHeight: i.textHeight ?? i.height ?? 1,
        rotation: (i.rotation ?? 0) * On
      };
    case "ATTDEF":
    case "ATTRIB": {
      const A = i.text, N = String((A == null ? void 0 : A.text) ?? i.tag ?? ""), F = (A == null ? void 0 : A.startPoint) ?? i.startPoint ?? { x: 0, y: 0 }, H = (A == null ? void 0 : A.textHeight) ?? (A == null ? void 0 : A.height) ?? i.textHeight ?? i.height ?? 1, X = ((A == null ? void 0 : A.rotation) ?? i.rotation ?? 0) * On;
      return {
        ...v,
        type: i.type,
        text: N,
        startPoint: { x: F.x ?? 0, y: F.y ?? 0, z: 0 },
        textHeight: H,
        rotation: X
      };
    }
    case "MTEXT":
      return {
        ...v,
        type: "MTEXT",
        text: String(i.text ?? ""),
        position: i.insertionPoint ?? i.position ?? { x: 0, y: 0, z: 0 },
        height: i.textHeight ?? i.height ?? 1,
        rotation: (i.rotation ?? 0) * On
      };
    case "INSERT": {
      if (t >= 8) return null;
      const A = i.name ?? "", N = (((p = (_ = e == null ? void 0 : e.tables) == null ? void 0 : _.BLOCK_RECORD) == null ? void 0 : p.entries) ?? []).find((Ne) => Ne.name === A);
      if (!((u = N == null ? void 0 : N.entities) != null && u.length)) return null;
      const F = {
        x: ((R = i.insertionPoint) == null ? void 0 : R.x) ?? 0,
        y: ((E = i.insertionPoint) == null ? void 0 : E.y) ?? 0,
        z: ((y = i.insertionPoint) == null ? void 0 : y.z) ?? 0
      }, H = i.xScale ?? 1, X = i.yScale ?? 1, W = i.zScale ?? 1, q = i.rotation ?? 0, V = Math.cos(q), te = Math.sin(q), oe = {
        x: ((O = N.basePoint) == null ? void 0 : O.x) ?? 0,
        y: ((w = N.basePoint) == null ? void 0 : w.y) ?? 0,
        z: ((b = N.basePoint) == null ? void 0 : b.z) ?? 0
      }, me = i.layer ?? "0", Ae = [];
      for (const Ne of N.entities) {
        const Y = Ta(Ne, e, t + 1);
        if (!Y) continue;
        const J = Array.isArray(Y) ? Y : [Y];
        for (const pe of J) {
          const ne = Ng(pe, F, H, X, W, V, te, oe);
          ne.layer === "0" && (ne.layer = me), Ae.push(ne);
        }
      }
      return Ae.length > 0 ? Ae : null;
    }
    default:
      return null;
  }
}
async function Fg(i, e) {
  var t, n;
  if (!Ds) {
    const { LibreDwg: h } = await import("./libredwg-web.js"), f = e == null ? void 0 : e.replace(/\/+$/, "");
    Ds = await h.create(f);
  }
  const r = Ds, s = r.dwg_read_data(i.buffer, 0);
  if (!s) throw new Error("Failed to parse DWG file");
  const o = r.convert(s);
  r.dwg_free(s);
  const a = (((n = (t = o.tables) == null ? void 0 : t.LAYER) == null ? void 0 : n.entries) ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (h) => {
      const f = Math.abs(Number(h.colorIndex ?? 7)) || 7;
      return {
        name: String(h.name ?? "0"),
        color: f,
        colorHex: Wr(f),
        visible: !h.frozen && !h.off,
        frozen: !!h.frozen,
        lineWeight: Number(h.lineweight ?? 0)
      };
    }
  );
  a.find((h) => h.name === "0") || a.unshift({ name: "0", color: 7, colorHex: "#ffffff", visible: !0, frozen: !1, lineWeight: 0 });
  const l = [];
  for (const h of o.entities ?? []) {
    const f = Ta(h, o, 0);
    f && (Array.isArray(f) ? l.push(...f) : l.push(f));
  }
  const c = Ig(l);
  return { layers: a, entities: l, boundingBox: c, units: "unknown", sourceFormat: "dwg" };
}
const ul = { type: "change" }, za = { type: "start" }, rc = { type: "end" }, Cr = new Ia(), fl = new En(), Og = Math.cos(70 * Ph.DEG2RAD), ht = new P(), Tt = 2 * Math.PI, $e = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Us = 1e-6;
class Bg extends Tg {
  constructor(e, t = null) {
    super(e, t), this.state = $e.NONE, this.enabled = !0, this.target = new P(), this.cursor = new P(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: _i.ROTATE, MIDDLE: _i.DOLLY, RIGHT: _i.PAN }, this.touches = { ONE: pi.ROTATE, TWO: pi.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new P(), this._lastQuaternion = new Yn(), this._lastTargetPosition = new P(), this._quat = new Yn().setFromUnitVectors(e.up, new P(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new ll(), this._sphericalDelta = new ll(), this._scale = 1, this._panOffset = new P(), this._rotateStart = new se(), this._rotateEnd = new se(), this._rotateDelta = new se(), this._panStart = new se(), this._panEnd = new se(), this._panDelta = new se(), this._dollyStart = new se(), this._dollyEnd = new se(), this._dollyDelta = new se(), this._dollyDirection = new P(), this._mouse = new se(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = kg.bind(this), this._onPointerDown = zg.bind(this), this._onPointerUp = Hg.bind(this), this._onContextMenu = Zg.bind(this), this._onMouseWheel = Wg.bind(this), this._onKeyDown = Xg.bind(this), this._onTouchStart = Yg.bind(this), this._onTouchMove = qg.bind(this), this._onMouseDown = Vg.bind(this), this._onMouseMove = Gg.bind(this), this._interceptControlDown = Kg.bind(this), this._interceptControlUp = jg.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(ul), this.update(), this.state = $e.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    ht.copy(t).sub(this.target), ht.applyQuaternion(this._quat), this._spherical.setFromVector3(ht), this.autoRotate && this.state === $e.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
    isFinite(n) && isFinite(r) && (n < -Math.PI ? n += Tt : n > Math.PI && (n -= Tt), r < -Math.PI ? r += Tt : r > Math.PI && (r -= Tt), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let s = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), s = o != this._spherical.radius;
    }
    if (ht.setFromSpherical(this._spherical), ht.applyQuaternion(this._quatInverse), t.copy(this.target).add(ht), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = ht.length();
        o = this._clampDistance(a * this._scale);
        const l = a - o;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), s = !!l;
      } else if (this.object.isOrthographicCamera) {
        const a = new P(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), s = l !== this.object.zoom;
        const c = new P(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(a), this.object.updateMatrixWorld(), o = ht.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (Cr.origin.copy(this.object.position), Cr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Cr.direction)) < Og ? this.object.lookAt(this.target) : (fl.setFromNormalAndCoplanarPoint(this.object.up, this.target), Cr.intersectPlane(fl, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), s = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, s || this._lastPosition.distanceToSquared(this.object.position) > Us || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Us || this._lastTargetPosition.distanceToSquared(this.target) > Us ? (this.dispatchEvent(ul), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? Tt / 60 * this.autoRotateSpeed * e : Tt / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    ht.setFromMatrixColumn(t, 0), ht.multiplyScalar(-e), this._panOffset.add(ht);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? ht.setFromMatrixColumn(t, 1) : (ht.setFromMatrixColumn(t, 0), ht.crossVectors(this.object.up, ht)), ht.multiplyScalar(e), this._panOffset.add(ht);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const r = this.object.position;
      ht.copy(r).sub(this.target);
      let s = ht.length();
      s *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * s / n.clientHeight, this.object.matrix), this._panUp(2 * t * s / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const n = this.domElement.getBoundingClientRect(), r = e - n.left, s = t - n.top, o = n.width, a = n.height;
    this._mouse.x = r / o * 2 - 1, this._mouse.y = -(s / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(Tt * this._rotateDelta.x / t.clientHeight), this._rotateUp(Tt * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(Tt * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-Tt * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(Tt * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-Tt * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), r = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(n, r);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), r = 0.5 * (e.pageY + t.y);
      this._panStart.set(n, r);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, s = Math.sqrt(n * n + r * r);
    this._dollyStart.set(0, s);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const n = this._getSecondPointerPosition(e), r = 0.5 * (e.pageX + n.x), s = 0.5 * (e.pageY + n.y);
      this._rotateEnd.set(r, s);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(Tt * this._rotateDelta.x / t.clientHeight), this._rotateUp(Tt * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), r = 0.5 * (e.pageY + t.y);
      this._panEnd.set(n, r);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, s = Math.sqrt(n * n + r * r);
    this._dollyEnd.set(0, s), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const o = (e.pageX + t.x) * 0.5, a = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(o, a);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  // pointers
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) {
        this._pointers.splice(t, 1);
        return;
      }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new se(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, n = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
}
function zg(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function kg(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function Hg(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(rc), this.state = $e.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function Vg(i) {
  let e;
  switch (i.button) {
    case 0:
      e = this.mouseButtons.LEFT;
      break;
    case 1:
      e = this.mouseButtons.MIDDLE;
      break;
    case 2:
      e = this.mouseButtons.RIGHT;
      break;
    default:
      e = -1;
  }
  switch (e) {
    case _i.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(i), this.state = $e.DOLLY;
      break;
    case _i.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = $e.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = $e.ROTATE;
      }
      break;
    case _i.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = $e.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = $e.PAN;
      }
      break;
    default:
      this.state = $e.NONE;
  }
  this.state !== $e.NONE && this.dispatchEvent(za);
}
function Gg(i) {
  switch (this.state) {
    case $e.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case $e.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case $e.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function Wg(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== $e.NONE || (i.preventDefault(), this.dispatchEvent(za), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(rc));
}
function Xg(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function Yg(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case pi.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = $e.TOUCH_ROTATE;
          break;
        case pi.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = $e.TOUCH_PAN;
          break;
        default:
          this.state = $e.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case pi.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = $e.TOUCH_DOLLY_PAN;
          break;
        case pi.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(i), this.state = $e.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = $e.NONE;
      }
      break;
    default:
      this.state = $e.NONE;
  }
  this.state !== $e.NONE && this.dispatchEvent(za);
}
function qg(i) {
  switch (this._trackPointer(i), this.state) {
    case $e.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case $e.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case $e.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case $e.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = $e.NONE;
  }
}
function Zg(i) {
  this.enabled !== !1 && i.preventDefault();
}
function Kg(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function jg(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class $g {
  constructor(e, t) {
    this.layerGroups = /* @__PURE__ */ new Map(), this.animationId = null, this.layers = [];
    const n = t.height ?? 400;
    this.is3D = t.mode === "3d", this.isDark = t.theme !== "light", this.scene = new Xm(), this.scene.background = new Xe(this.resolveBackground(t));
    const r = e.clientWidth / n;
    if (this.is3D) {
      const s = new Ut(45, r, 0.1, 1e7);
      s.position.set(0, -500, 500), s.up.set(0, 0, 1), this.camera = s;
    } else {
      const s = new Hl(
        -r * 500,
        r * 500,
        500,
        -500,
        0.1,
        1e6
      );
      s.position.set(0, 0, 100), this.camera = s;
    }
    this.renderer = new Wm({ antialias: !0 }), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(e.clientWidth, n), this.renderer.domElement.style.display = "block", this.renderer.domElement.style.marginTop = "5px", e.appendChild(this.renderer.domElement), this.controls = new Bg(this.camera, this.renderer.domElement), this.controls.enableRotate = this.is3D, this.controls.enableDamping = !0, this.controls.dampingFactor = 0.1, this.controls.screenSpacePanning = !0, this.startRenderLoop();
  }
  resolveBackground(e) {
    return e.backgroundColor ? e.backgroundColor : (e.theme ?? "auto") === "light" ? "#f5f5f5" : "#1e1e1e";
  }
  startRenderLoop() {
    const e = () => {
      this.animationId = requestAnimationFrame(e), this.controls.update(), this.renderer.render(this.scene, this.camera);
    };
    e();
  }
  async loadDocument(e) {
    this.layers = e.layers;
    for (const l of e.layers) {
      const c = new Gn();
      c.name = l.name, c.visible = l.visible, this.layerGroups.set(l.name, c), this.scene.add(c);
    }
    if (!this.layerGroups.has("0")) {
      const l = new Gn();
      l.name = "0", this.layerGroups.set("0", l), this.scene.add(l);
    }
    const t = e.boundingBox.centerX, n = e.boundingBox.centerY, { minZ: r, maxZ: s } = this.computeZExtent(e.entities), o = r;
    for (const l of e.entities) {
      const c = this.buildEntity(l, e, t, n, o);
      if (c) {
        const h = l.layer ?? "0", f = this.layerGroups.get(h) ?? this.layerGroups.get("0");
        f == null || f.add(c);
      }
    }
    const a = s - r;
    this.fitCameraToDocument(e.boundingBox, a);
  }
  computeZExtent(e) {
    var t, n, r;
    let s = 0, o = 0;
    const a = (l) => {
      l < s && (s = l), l > o && (o = l);
    };
    for (const l of e)
      if (((t = l.start) == null ? void 0 : t.z) != null && a(l.start.z), ((n = l.end) == null ? void 0 : n.z) != null && a(l.end.z), ((r = l.center) == null ? void 0 : r.z) != null && a(l.center.z), l.vertices)
        for (const c of l.vertices)
          c.z != null && a(c.z);
    return { minZ: s, maxZ: o };
  }
  resolveEntityColor(e, t) {
    if (e.colorIndex != null) {
      const r = e.colorIndex;
      if (r !== 0 && r !== 256) {
        const s = e.color != null ? "#" + e.color.toString(16).padStart(6, "0") : Wr(r);
        return this.themeAdaptColor(s);
      }
    } else {
      const r = e.color;
      if (r != null && r !== 256 && r !== 0)
        return this.themeAdaptColor(Wr(r));
      if (e.trueColor != null)
        return "#" + e.trueColor.toString(16).padStart(6, "0");
    }
    const n = t.layers.find((r) => r.name === (e.layer ?? "0"));
    return this.themeAdaptColor((n == null ? void 0 : n.colorHex) ?? "#ffffff");
  }
  /** ACI 7 is "white/black" (context-dependent in AutoCAD). Show as near-black on light themes. */
  themeAdaptColor(e) {
    return !this.isDark && e.toLowerCase() === "#ffffff" ? "#1a1a1a" : e;
  }
  buildEntity(e, t, n, r, s) {
    const o = this.resolveEntityColor(e, t), a = new Kl({ color: o });
    switch (e.type) {
      case "LINE":
        return this.buildLine(e, a, n, r, s);
      case "CIRCLE":
        return this.buildCircle(e, a, n, r, s);
      case "ARC":
        return this.buildArc(e, a, n, r, s);
      case "POLYLINE":
      case "LWPOLYLINE":
        return this.buildPolyline(e, a, n, r, s);
      case "3DFACE":
        return this.buildFace3D(e, a, n, r, s);
      case "SPLINE":
        return this.buildSpline(e, a, n, r, s);
      case "ELLIPSE":
        return this.buildEllipse(e, a, n, r, s);
      case "SOLID":
        return this.buildSolid(e, a, n, r, s);
      case "TEXT":
      case "ATTDEF":
      case "ATTRIB":
      case "MTEXT":
        return this.buildText(e, o, n, r, s);
      case "SOLID_FILL":
        return this.buildSolidFill(e, o, n, r, s);
      default:
        return null;
    }
  }
  buildLine(e, t, n, r, s) {
    var o, a;
    const l = e.start ?? ((o = e.vertices) == null ? void 0 : o[0]), c = e.end ?? ((a = e.vertices) == null ? void 0 : a[1]);
    if (!l || !c) return null;
    const h = [
      new P(l.x - n, l.y - r, (l.z ?? 0) - s),
      new P(c.x - n, c.y - r, (c.z ?? 0) - s)
    ], f = new pt().setFromPoints(h);
    return new ln(f, t);
  }
  buildCircle(e, t, n, r, s) {
    var o, a, l;
    const c = (((o = e.center) == null ? void 0 : o.x) ?? e.x ?? 0) - n, h = (((a = e.center) == null ? void 0 : a.y) ?? e.y ?? 0) - r, f = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, d = e.radius ?? e.r ?? 1, m = 64, g = [];
    for (let p = 0; p <= m; p++) {
      const u = p / m * Math.PI * 2;
      g.push(new P(c + Math.cos(u) * d, h + Math.sin(u) * d, f));
    }
    const _ = new pt().setFromPoints(g);
    return new ln(_, t);
  }
  buildArc(e, t, n, r, s) {
    var o, a, l;
    const c = (((o = e.center) == null ? void 0 : o.x) ?? e.x ?? 0) - n, h = (((a = e.center) == null ? void 0 : a.y) ?? e.y ?? 0) - r, f = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, d = e.radius ?? e.r ?? 1;
    let m = (e.startAngle ?? 0) * (Math.PI / 180), g = (e.endAngle ?? 360) * (Math.PI / 180);
    g < m && (g += Math.PI * 2);
    const _ = 64, p = [];
    for (let R = 0; R <= _; R++) {
      const E = m + R / _ * (g - m);
      p.push(new P(c + Math.cos(E) * d, h + Math.sin(E) * d, f));
    }
    const u = new pt().setFromPoints(p);
    return new ln(u, t);
  }
  buildPolyline(e, t, n, r, s) {
    if (!e.vertices || e.vertices.length < 2) return null;
    const o = e.vertices.map(
      (l) => new P(l.x - n, l.y - r, (l.z ?? 0) - s)
    );
    e.shape && o.push(o[0].clone());
    const a = new pt().setFromPoints(o);
    return new ln(a, t);
  }
  buildSpline(e, t, n, r, s) {
    var o;
    const a = (((o = e.fitPoints) == null ? void 0 : o.length) > 0 ? e.fitPoints : e.controlPoints) ?? [];
    if (a.length < 2) return null;
    const l = a.map(
      (h) => new P(h.x - n, h.y - r, (h.z ?? 0) - s)
    ), c = new pt().setFromPoints(l);
    return new ln(c, t);
  }
  buildEllipse(e, t, n, r, s) {
    var o, a, l, c, h;
    const f = (((o = e.center) == null ? void 0 : o.x) ?? 0) - n, d = (((a = e.center) == null ? void 0 : a.y) ?? 0) - r, m = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, g = ((c = e.majorAxisEndPoint) == null ? void 0 : c.x) ?? 1, _ = ((h = e.majorAxisEndPoint) == null ? void 0 : h.y) ?? 0, p = Math.sqrt(g * g + _ * _);
    if (p === 0) return null;
    const u = Math.atan2(_, g), R = p * (e.axisRatio ?? 1), E = e.startAngle ?? 0;
    let y = e.endAngle ?? Math.PI * 2;
    y <= E && (y += Math.PI * 2);
    const O = 72, w = [];
    for (let C = 0; C <= O; C++) {
      const S = E + C / O * (y - E), v = Math.cos(S) * p, A = Math.sin(S) * R;
      w.push(new P(
        f + v * Math.cos(u) - A * Math.sin(u),
        d + v * Math.sin(u) + A * Math.cos(u),
        m
      ));
    }
    const b = new pt().setFromPoints(w);
    return new ln(b, t);
  }
  buildSolid(e, t, n, r, s) {
    const o = e.points ?? e.vertices ?? [];
    if (o.length < 3) return null;
    const a = o[0], l = o[1], c = o[2], h = o[3] ?? o[2], f = [a, l, h, c, a].map((m) => new P(m.x - n, m.y - r, (m.z ?? 0) - s)), d = new pt().setFromPoints(f);
    return new ln(d, t);
  }
  buildText(e, t, n, r, s) {
    const o = e.text ?? e.string ?? "";
    if (!o) return null;
    const a = o.replace(/\{\\[^;]*;([^}]*)\}/g, "$1").replace(/\\[Pp]/g, " ").replace(/\\[A-Za-z][^;]*;/g, "").replace(/[{}]/g, "").trim();
    if (!a) return null;
    const l = e.startPoint ?? e.insertionPoint ?? e.position ?? { x: 0, y: 0, z: 0 }, c = Math.max(Number(e.textHeight ?? e.height ?? 1), 0.01), h = (e.rotation ?? 0) * Math.PI / 180, f = 32, d = document.createElement("canvas"), m = d.getContext("2d");
    m.font = `${f}px sans-serif`;
    const g = m.measureText(a).width;
    d.width = Math.ceil(g) + 4, d.height = f + 8, m.font = `${f}px sans-serif`, m.fillStyle = t, m.textBaseline = "middle", m.fillText(a, 2, d.height / 2);
    const _ = new qm(d), p = new ql({ map: _, depthTest: !1 }), u = new jo(p), R = d.width / d.height;
    if (u.scale.set(c * R, c, 1), u.position.set(l.x - n, l.y - r, (l.z ?? 0) - s), h !== 0) {
      const E = new Gn();
      return E.rotation.z = h, E.position.copy(u.position), u.position.set(0, 0, 0), E.add(u), E;
    }
    return u;
  }
  buildSolidFill(e, t, n, r, s) {
    const o = e.vertices;
    if (!o || o.length < 3) return null;
    const a = o.filter((v) => isFinite(v.x) && isFinite(v.y));
    if (a.length < 3) return null;
    const l = a.map((v) => v.x).sort((v, A) => v - A), c = a.map((v) => v.y).sort((v, A) => v - A), h = l[Math.floor(l.length * 0.25)], f = l[Math.floor(l.length * 0.75)], d = c[Math.floor(c.length * 0.25)], m = c[Math.floor(c.length * 0.75)], g = f - h, _ = m - d, p = 3, u = h - p * g, R = f + p * g, E = d - p * _, y = m + p * _, O = a.filter((v) => v.x >= u && v.x <= R && v.y >= E && v.y <= y);
    if (O.length < 3) return null;
    const w = new ec();
    w.moveTo(O[0].x - n, O[0].y - r);
    for (let v = 1; v < O.length; v++)
      w.lineTo(O[v].x - n, O[v].y - r);
    w.closePath();
    const b = new Ba(w), C = new Ua({
      color: new Xe(t),
      opacity: 0.7,
      transparent: !0,
      side: Kt
    }), S = new Gt(b, C);
    return S.position.z = (O[0].z ?? 0) - s, S;
  }
  buildFace3D(e, t, n, r, s) {
    const o = e.vertices;
    if (!o || o.length < 3) return null;
    const a = o.map((f) => new P(f.x - n, f.y - r, (f.z ?? 0) - s)), l = a[3] ?? a[2], c = [a[0], a[1], a[1], a[2], a[2], l, l, a[0]], h = new pt().setFromPoints(c);
    return new tl(h, t);
  }
  fitCameraToDocument(e, t) {
    this.is3D ? this.fitCamera3D(e, t) : this.fitCamera2D(e);
  }
  fitCamera2D(e) {
    const t = e.width * 1.1 / 2, n = e.height * 1.1 / 2, r = this.renderer.domElement.width / this.renderer.domElement.height, s = this.camera, o = Math.max(t / r, n);
    s.left = -o * r, s.right = o * r, s.top = o, s.bottom = -o, s.position.set(0, 0, 100), s.updateProjectionMatrix(), this.controls.target.set(0, 0, 0), this.controls.update();
  }
  fitCamera3D(e, t) {
    const n = t / 2, r = Math.max(e.width, e.height, t, 1) * 1.6, s = this.camera;
    s.position.set(r * 0.8, -r * 0.8, n + r * 0.7), s.up.set(0, 0, 1), s.lookAt(0, 0, n), s.updateProjectionMatrix(), this.controls.target.set(0, 0, n), this.controls.update();
  }
  setLayerVisibility(e, t) {
    const n = this.layerGroups.get(e);
    n && (n.visible = t);
  }
  resetCamera() {
    this.controls.reset();
  }
  getLayers() {
    return this.layers;
  }
  dispose() {
    this.animationId !== null && cancelAnimationFrame(this.animationId), this.scene.traverse((e) => {
      var t;
      if (e instanceof Gt || e instanceof ln || e instanceof tl) {
        e.geometry.dispose();
        const n = Array.isArray(e.material) ? e.material : [e.material];
        for (const r of n) r.dispose();
      }
      if (e instanceof jo) {
        const n = e.material;
        (t = n.map) == null || t.dispose(), n.dispose();
      }
    }), this.controls.dispose(), this.renderer.dispose(), this.renderer.domElement.remove();
  }
}
class Jg {
  constructor(e, t, n = !1) {
    this.panel = null, this.layerStates = /* @__PURE__ */ new Map(), this.container = e, this.onToggle = t, this.isDark = n;
  }
  render(e) {
    this.panel && this.panel.remove();
    for (const l of e)
      this.layerStates.set(l.name, l.visible);
    const t = this.isDark, n = t ? "rgba(50,50,50,0.75)" : "rgba(240,240,240,0.88)", r = t ? "#eee" : "#333", s = t ? "#aaa" : "#666", o = t ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
    this.panel = document.createElement("div"), Object.assign(this.panel.style, {
      position: "absolute",
      top: "40px",
      right: "8px",
      background: n,
      color: r,
      borderRadius: "6px",
      padding: "6px 8px",
      fontSize: "12px",
      fontFamily: "monospace",
      maxHeight: "200px",
      maxWidth: "140px",
      minWidth: "100px",
      overflowY: "auto",
      zIndex: "10",
      backdropFilter: "blur(4px)",
      userSelect: "none",
      boxShadow: t ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.15)"
    });
    const a = document.createElement("div");
    a.textContent = "Layers", Object.assign(a.style, { fontWeight: "bold", marginBottom: "4px", color: s, fontSize: "11px" }), this.panel.appendChild(a);
    for (const l of e) {
      const c = document.createElement("label");
      Object.assign(c.style, { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", padding: "2px 0" });
      const h = document.createElement("input");
      h.type = "checkbox", h.checked = l.visible, h.style.accentColor = l.colorHex, h.addEventListener("change", () => {
        this.layerStates.set(l.name, h.checked), this.onToggle(l.name, h.checked);
      });
      const f = document.createElement("span");
      Object.assign(f.style, {
        display: "inline-block",
        width: "10px",
        height: "10px",
        borderRadius: "2px",
        background: l.colorHex,
        border: `1px solid ${o}`,
        flexShrink: "0"
      });
      const d = document.createElement("span");
      d.textContent = l.name, d.style.overflow = "hidden", d.style.textOverflow = "ellipsis", d.style.whiteSpace = "nowrap", c.appendChild(h), c.appendChild(f), c.appendChild(d), this.panel.appendChild(c);
    }
    getComputedStyle(this.container).position === "static" && (this.container.style.position = "relative"), this.container.style.overflowX = "hidden", this.container.appendChild(this.panel);
  }
  dispose() {
    var e;
    (e = this.panel) == null || e.remove(), this.panel = null;
  }
}
function Qg() {
  return document.documentElement.getAttribute("data-theme") === "dark" || document.body.classList.contains("theme-dark");
}
async function e_(i, e, t, n) {
  const r = n ?? {}, s = t.toLowerCase().endsWith(".dwg") ? await Fg(e, r.dwgWasmBaseUrl) : Dg(new TextDecoder().decode(e)), o = new $g(i, r);
  await o.loadDocument(s);
  const a = r.theme === "dark" || r.theme !== "light" && Qg(), l = r.showLayerPanel !== !1 ? new Jg(i, (c, h) => {
    o.setLayerVisibility(c, h);
  }, a) : null;
  return l == null || l.render(s.layers), {
    dispose() {
      l == null || l.dispose(), o.dispose();
    },
    setLayerVisibility(c, h) {
      o.setLayerVisibility(c, h);
    },
    resetCamera() {
      o.resetCamera();
    },
    getLayers() {
      return o.getLayers();
    }
  };
}
function sc(i) {
  return async function(e, t, n, r) {
    const { filePath: s, options: o } = Ag(t);
    if (!s)
      return e.textContent = "MorCad: no file path specified.", {
        dispose: () => {
        },
        setLayerVisibility: () => {
        },
        resetCamera: () => {
        },
        getLayers: () => []
      };
    const a = i.resolvePath(s, n), l = await i.readFile(a), c = {
      theme: r ? "dark" : "light",
      ...o
    };
    return e_(e, l, s, c);
  };
}
const ac = {
  async readFile(i) {
    const e = await hc("read_file_binary", { path: i });
    return new Uint8Array(e);
  },
  resolvePath(i, e) {
    return e ? `${e.replace(/[/\\][^/\\]+$/, "")}/${i.replace(/^\.\//, "")}` : i;
  }
}, t_ = sc(ac);
function n_(i) {
  return {
    async readFile(e) {
      const t = await i(e);
      return typeof t == "string" ? new TextEncoder().encode(t) : Array.isArray(t) ? new Uint8Array(t) : t;
    },
    resolvePath: ac.resolvePath
  };
}
const s_ = {
  id: "cad-viewer",
  name: "CAD Viewer (DXF/DWG)",
  description: "Renders AutoCAD DXF/DWG engineering drawings inline. DWG support uses a GPLv3 WASM module loaded on demand.",
  stars: 0,
  npmPackage: "@morcad/moraya",
  exportName: "",
  sizeKb: 800,
  languages: ["morcad", "dxf", "dwg"],
  homepage: "https://github.com/zouwei/morcad",
  cdnUrl: "https://cdn.jsdelivr.net/gh/zouwei/morcad@v0.2.4/packages/moraya/dist/index.bundle.js",
  isFilePathRenderer: !0,
  aiHint: "Use ```dxf for DXF files, ```dwg for DWG files, or ```morcad for parameter mode. Examples:\n```dxf\n./drawings/floor-plan.dxf\n```\n```morcad\nfile: ./drawings/floor-plan.dxf\nlayers: WALLS, DOORS\nheight: 500\n```",
  async render(i, e, t, n) {
    const r = document.documentElement.getAttribute("data-theme") === "dark";
    return typeof t == "function" ? sc(
      n_(t)
    )(i, e, n ?? null, r) : t_(i, e, n ?? null, r);
  }
};
export {
  t_ as cadRender,
  s_ as cadRendererPlugin,
  ac as tauriFileAdapter
};
//# sourceMappingURL=index.bundle.js.map
