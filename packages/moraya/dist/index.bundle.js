import { invoke as Cl } from "@tauri-apps/api/core";
class Pl {
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
    return this._pointer++, e.value = Aa(e.code, this._data[this._pointer].trim()), this._pointer++, e.code === 0 && e.value === "EOF" && (this._eof = !0), this.lastReadGroup = e, e;
  }
  peek() {
    if (!this.hasNext())
      throw this._eof ? new Error("Cannot call 'next' after EOF group has been read") : new Error("Unexpected end of input: EOF group not read before end of file. Ended on code " + this._data[this._pointer]);
    const e = {
      code: parseInt(this._data[this._pointer])
    };
    return e.value = Aa(e.code, this._data[this._pointer + 1].trim()), e;
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
function Aa(i, e) {
  return i <= 9 ? e : i >= 10 && i <= 59 ? parseFloat(e) : i >= 60 && i <= 99 ? parseInt(e) : i >= 100 && i <= 109 ? e : i >= 110 && i <= 149 ? parseFloat(e) : i >= 160 && i <= 179 ? parseInt(e) : i >= 210 && i <= 239 ? parseFloat(e) : i >= 270 && i <= 289 ? parseInt(e) : i >= 290 && i <= 299 ? Ll(e) : i >= 300 && i <= 369 ? e : i >= 370 && i <= 389 ? parseInt(e) : i >= 390 && i <= 399 ? e : i >= 400 && i <= 409 ? parseInt(e) : i >= 410 && i <= 419 ? e : i >= 420 && i <= 429 ? parseInt(e) : i >= 430 && i <= 439 ? e : i >= 440 && i <= 459 ? parseInt(e) : i >= 460 && i <= 469 ? parseFloat(e) : i >= 470 && i <= 481 || i === 999 || i >= 1e3 && i <= 1009 ? e : i >= 1010 && i <= 1059 ? parseFloat(e) : i >= 1060 && i <= 1071 ? parseInt(e) : (console.log("WARNING: Group code does not have a defined type: %j", { code: i, value: e }), e);
}
function Ll(i) {
  if (i === "0")
    return !1;
  if (i === "1")
    return !0;
  throw TypeError("String '" + i + "' cannot be cast to Boolean type");
}
const ko = [
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
function Dl(i) {
  return ko[i];
}
function Oe(i) {
  const e = {};
  i.rewind();
  let t = i.next(), n = t.code;
  if (e.x = t.value, n += 10, t = i.next(), t.code != n)
    throw new Error("Expected code for point value to be " + n + " but got " + t.code + ".");
  return e.y = t.value, n += 10, t = i.next(), t.code != n ? (i.rewind(), e) : (e.z = t.value, e);
}
function pt(i, e, t) {
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
      i.colorIndex = e.value, i.color = Dl(Math.abs(e.value));
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
class Il {
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
          n.vertices = Ul(e, t), t = e.lastReadGroup;
          break;
        default:
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function Ul(i, e) {
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
class Nl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Fl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Ol {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Bl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class zl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class kl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
let Hl = class {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
};
class Vl {
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
          n.vertices = Gl(r, e);
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function Gl(i, e) {
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
class Wl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Xl {
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
          pt(r, t, e);
          break;
      }
      t = e.next();
    }
    return r;
  }
}
class Yl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class ql {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n.vertices = Zl(e, t), n;
  }
}
function Zl(i, e) {
  const t = new Yl(), n = [];
  for (; !i.isEOF(); )
    if (e.code === 0) {
      if (e.value === "VERTEX")
        n.push(t.parseEntity(i, e)), e = i.lastReadGroup;
      else if (e.value === "SEQEND") {
        jl(i, e);
        break;
      }
    }
  return n;
}
function jl(i, e) {
  const t = { type: e.value };
  for (e = i.next(); !i.isEOF() && e.code != 0; )
    pt(t, e, i), e = i.next();
  return t;
}
class Kl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class $l {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Jl {
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
          pt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function Ql(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var vr = { exports: {} }, ec = vr.exports, wa;
function tc() {
  return wa || (wa = 1, (function(i) {
    (function(e, t) {
      i.exports ? i.exports = t() : e.log = t();
    })(ec, function() {
      var e = function() {
      }, t = "undefined", n = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), r = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
      ], s = {}, o = null;
      function a(g, p) {
        var u = g[p];
        if (typeof u.bind == "function")
          return u.bind(g);
        try {
          return Function.prototype.bind.call(u, g);
        } catch {
          return function() {
            return Function.prototype.apply.apply(u, [g, arguments]);
          };
        }
      }
      function l() {
        console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
      }
      function c(g) {
        return g === "debug" && (g = "log"), typeof console === t ? !1 : g === "trace" && n ? l : console[g] !== void 0 ? a(console, g) : console.log !== void 0 ? a(console, "log") : e;
      }
      function h() {
        for (var g = this.getLevel(), p = 0; p < r.length; p++) {
          var u = r[p];
          this[u] = p < g ? e : this.methodFactory(u, g, this.name);
        }
        if (this.log = this.debug, typeof console === t && g < this.levels.SILENT)
          return "No console available for logging";
      }
      function d(g) {
        return function() {
          typeof console !== t && (h.call(this), this[g].apply(this, arguments));
        };
      }
      function f(g, p, u) {
        return c(g) || d.apply(this, arguments);
      }
      function m(g, p) {
        var u = this, R, A, S, O = "loglevel";
        typeof g == "string" ? O += ":" + g : typeof g == "symbol" && (O = void 0);
        function w(T) {
          var N = (r[T] || "silent").toUpperCase();
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
        function E() {
          var T;
          if (!(typeof window === t || !O)) {
            try {
              T = window.localStorage[O];
            } catch {
            }
            if (typeof T === t)
              try {
                var N = window.document.cookie, F = encodeURIComponent(O), z = N.indexOf(F + "=");
                z !== -1 && (T = /^([^;]+)/.exec(
                  N.slice(z + F.length + 1)
                )[1]);
              } catch {
              }
            return u.levels[T] === void 0 && (T = void 0), T;
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
        function y(T) {
          var N = T;
          if (typeof N == "string" && u.levels[N.toUpperCase()] !== void 0 && (N = u.levels[N.toUpperCase()]), typeof N == "number" && N >= 0 && N <= u.levels.SILENT)
            return N;
          throw new TypeError("log.setLevel() called with invalid level: " + T);
        }
        u.name = g, u.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5
        }, u.methodFactory = p || f, u.getLevel = function() {
          return S ?? A ?? R;
        }, u.setLevel = function(T, N) {
          return S = y(T), N !== !1 && w(S), h.call(u);
        }, u.setDefaultLevel = function(T) {
          A = y(T), E() || u.setLevel(T, !1);
        }, u.resetLevel = function() {
          S = null, C(), h.call(u);
        }, u.enableAll = function(T) {
          u.setLevel(u.levels.TRACE, T);
        }, u.disableAll = function(T) {
          u.setLevel(u.levels.SILENT, T);
        }, u.rebuild = function() {
          if (o !== u && (R = y(o.getLevel())), h.call(u), o === u)
            for (var T in s)
              s[T].rebuild();
        }, R = y(
          o ? o.getLevel() : "WARN"
        );
        var _ = E();
        _ != null && (S = y(_)), h.call(u);
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
      var x = typeof window !== t ? window.log : void 0;
      return o.noConflict = function() {
        return typeof window !== t && window.log === o && (window.log = x), o;
      }, o.getLoggers = function() {
        return s;
      }, o.default = o, o;
    });
  })(vr)), vr.exports;
}
var nc = tc();
const Fe = /* @__PURE__ */ Ql(nc);
Fe.setLevel("error");
function ic(i) {
  i.registerEntityHandler(Il), i.registerEntityHandler(Nl), i.registerEntityHandler(Fl), i.registerEntityHandler(Ol), i.registerEntityHandler(Bl), i.registerEntityHandler(zl), i.registerEntityHandler(kl), i.registerEntityHandler(Hl), i.registerEntityHandler(Vl), i.registerEntityHandler(Wl), i.registerEntityHandler(Xl), i.registerEntityHandler(ql), i.registerEntityHandler(Kl), i.registerEntityHandler($l), i.registerEntityHandler(Jl);
}
class rc {
  constructor() {
    this._entityHandlers = {}, ic(this);
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
    const r = e.split(/\r\n|\r|\n/g), s = new Pl(r);
    if (!s.hasNext())
      throw Error("Empty file");
    const o = this;
    let a;
    function l() {
      for (a = s.next(); !s.isEOF(); )
        if (a.code === 0 && a.value === "SECTION") {
          if (a = s.next(), a.code !== 2) {
            console.error("Unexpected code %s after 0:SECTION", Ho(a)), a = s.next();
            continue;
          }
          a.value === "HEADER" ? (Fe.debug("> HEADER"), t.header = c(), Fe.debug("<")) : a.value === "BLOCKS" ? (Fe.debug("> BLOCKS"), t.blocks = h(), Fe.debug("<")) : a.value === "ENTITIES" ? (Fe.debug("> ENTITIES"), t.entities = A(!1), Fe.debug("<")) : a.value === "TABLES" ? (Fe.debug("> TABLES"), t.tables = f(), Fe.debug("<")) : a.value === "EOF" ? Fe.debug("EOF") : Fe.warn("Skipping section '%s'", a.value);
        } else
          a = s.next();
    }
    function c() {
      let w = null, E = null;
      const C = {};
      for (a = s.next(); ; ) {
        if (Yt(a, 0, "ENDSEC")) {
          w && (C[w] = E);
          break;
        } else a.code === 9 ? (w && (C[w] = E), w = a.value) : a.code === 10 ? E = { x: a.value } : a.code === 20 ? E.y = a.value : a.code === 30 ? E.z = a.value : E = a.value;
        a = s.next();
      }
      return a = s.next(), C;
    }
    function h() {
      const w = {};
      for (a = s.next(); a.value !== "EOF" && !Yt(a, 0, "ENDSEC"); )
        if (Yt(a, 0, "BLOCK")) {
          Fe.debug("block {");
          const E = d();
          Fe.debug("}"), O(E), E.name ? w[E.name] = E : Fe.error('block with handle "' + E.handle + '" is missing a name.');
        } else
          Rn(a), a = s.next();
      return w;
    }
    function d() {
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
            w.position = S(a), a = s.next();
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
            w.entities = A(!0);
            break;
          default:
            Rn(a), a = s.next();
        }
        if (Yt(a, 0, "ENDBLK")) {
          a = s.next();
          break;
        }
      }
      return w;
    }
    function f() {
      const w = {};
      for (a = s.next(); a.value !== "EOF" && !Yt(a, 0, "ENDSEC"); )
        Yt(a, 0, "TABLE") ? (a = s.next(), R[a.value] ? (Fe.debug(a.value + " Table {"), w[R[a.value].tableName] = x(a), Fe.debug("}")) : Fe.debug("Unhandled Table " + a.value)) : a = s.next();
      return a = s.next(), w;
    }
    const m = "ENDTAB";
    function x(w) {
      const E = R[w.value], C = {};
      let y = 0;
      for (a = s.next(); !Yt(a, 0, m); )
        switch (a.code) {
          case 5:
            C.handle = a.value, a = s.next();
            break;
          case 330:
            C.ownerHandle = a.value, a = s.next();
            break;
          case 100:
            a.value === "AcDbSymbolTable" || Rn(a), a = s.next();
            break;
          case 70:
            y = a.value, a = s.next();
            break;
          case 0:
            a.value === E.dxfSymbolName ? C[E.tableRecordsProperty] = E.parseTableRecords() : (Rn(a), a = s.next());
            break;
          default:
            Rn(a), a = s.next();
        }
      const _ = C[E.tableRecordsProperty];
      if (_) {
        let T = (() => {
          if (_.constructor === Array)
            return _.length;
          if (typeof _ == "object")
            return Object.keys(_).length;
        })();
        y !== T && Fe.warn("Parsed " + T + " " + E.dxfSymbolName + "'s but expected " + y);
      }
      return a = s.next(), C;
    }
    function g() {
      const w = [];
      let E = {};
      for (Fe.debug("ViewPort {"), a = s.next(); !Yt(a, 0, m); )
        switch (a.code) {
          case 2:
            E.name = a.value, a = s.next();
            break;
          case 10:
            E.lowerLeftCorner = S(a), a = s.next();
            break;
          case 11:
            E.upperRightCorner = S(a), a = s.next();
            break;
          case 12:
            E.center = S(a), a = s.next();
            break;
          case 13:
            E.snapBasePoint = S(a), a = s.next();
            break;
          case 14:
            E.snapSpacing = S(a), a = s.next();
            break;
          case 15:
            E.gridSpacing = S(a), a = s.next();
            break;
          case 16:
            E.viewDirectionFromTarget = S(a), a = s.next();
            break;
          case 17:
            E.viewTarget = S(a), a = s.next();
            break;
          case 42:
            E.lensLength = a.value, a = s.next();
            break;
          case 43:
            E.frontClippingPlane = a.value, a = s.next();
            break;
          case 44:
            E.backClippingPlane = a.value, a = s.next();
            break;
          case 45:
            E.viewHeight = a.value, a = s.next();
            break;
          case 50:
            E.snapRotationAngle = a.value, a = s.next();
            break;
          case 51:
            E.viewTwistAngle = a.value, a = s.next();
            break;
          case 79:
            E.orthographicType = a.value, a = s.next();
            break;
          case 110:
            E.ucsOrigin = S(a), a = s.next();
            break;
          case 111:
            E.ucsXAxis = S(a), a = s.next();
            break;
          case 112:
            E.ucsYAxis = S(a), a = s.next();
            break;
          case 110:
            E.ucsOrigin = S(a), a = s.next();
            break;
          case 281:
            E.renderMode = a.value, a = s.next();
            break;
          case 281:
            E.defaultLightingType = a.value, a = s.next();
            break;
          case 292:
            E.defaultLightingOn = a.value, a = s.next();
            break;
          case 330:
            E.ownerHandle = a.value, a = s.next();
            break;
          case 63:
          // These are all ambient color. Perhaps should be a gradient when multiple are set.
          case 421:
          case 431:
            E.ambientColor = a.value, a = s.next();
            break;
          case 0:
            a.value === "VPORT" && (Fe.debug("}"), w.push(E), Fe.debug("ViewPort {"), E = {}, a = s.next());
            break;
          default:
            Rn(a), a = s.next();
            break;
        }
      return Fe.debug("}"), w.push(E), w;
    }
    function p() {
      const w = {};
      let E = {}, C = 0, y;
      for (Fe.debug("LType {"), a = s.next(); !Yt(a, 0, "ENDTAB"); )
        switch (a.code) {
          case 2:
            E.name = a.value, y = a.value, a = s.next();
            break;
          case 3:
            E.description = a.value, a = s.next();
            break;
          case 73:
            C = a.value, C > 0 && (E.pattern = []), a = s.next();
            break;
          case 40:
            E.patternLength = a.value, a = s.next();
            break;
          case 49:
            E.pattern.push(a.value), a = s.next();
            break;
          case 0:
            Fe.debug("}"), C > 0 && C !== E.pattern.length && Fe.warn("lengths do not match on LTYPE pattern"), w[y] = E, E = {}, Fe.debug("LType {"), a = s.next();
            break;
          default:
            a = s.next();
        }
      return Fe.debug("}"), w[y] = E, w;
    }
    function u() {
      const w = {};
      let E = {}, C;
      for (Fe.debug("Layer {"), a = s.next(); !Yt(a, 0, "ENDTAB"); )
        switch (a.code) {
          case 2:
            E.name = a.value, C = a.value, a = s.next();
            break;
          case 62:
            E.visible = a.value >= 0, E.colorIndex = Math.abs(a.value), E.color = sc(E.colorIndex), a = s.next();
            break;
          case 70:
            E.frozen = (a.value & 1) != 0 || (a.value & 2) != 0, a = s.next();
            break;
          case 0:
            a.value === "LAYER" && (Fe.debug("}"), w[C] = E, Fe.debug("Layer {"), E = {}, C = void 0, a = s.next());
            break;
          default:
            Rn(a), a = s.next();
            break;
        }
      return Fe.debug("}"), w[C] = E, w;
    }
    const R = {
      VPORT: {
        tableRecordsProperty: "viewPorts",
        tableName: "viewPort",
        dxfSymbolName: "VPORT",
        parseTableRecords: g
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
    function A(w) {
      const E = [], C = w ? "ENDBLK" : "ENDSEC";
      for (w || (a = s.next()); ; )
        if (a.code === 0) {
          if (a.value === C)
            break;
          const y = o._entityHandlers[a.value];
          if (y != null) {
            Fe.debug(a.value + " {");
            const _ = y.parseEntity(s, a);
            a = s.lastReadGroup, Fe.debug("}"), O(_), E.push(_);
          } else {
            Fe.warn("Unhandled entity " + a.value), a = s.next();
            continue;
          }
        } else
          a = s.next();
      return C == "ENDSEC" && (a = s.next()), E;
    }
    function S(w) {
      const E = {};
      let C = w.code;
      if (E.x = w.value, C += 10, w = s.next(), w.code != C)
        throw new Error("Expected code for point value to be " + C + " but got " + w.code + ".");
      return E.y = w.value, C += 10, w = s.next(), w.code != C ? (s.rewind(), E) : (E.z = w.value, E);
    }
    function O(w) {
      if (!w)
        throw new TypeError("entity cannot be undefined or null");
      w.handle || (w.handle = n++);
    }
    return l(), t;
  }
}
function Yt(i, e, t) {
  return i.code === e && i.value === t;
}
function Rn(i) {
  Fe.debug("unhandled group " + Ho(i));
}
function Ho(i) {
  return i.code + ":" + i.value;
}
function sc(i) {
  return ko[i];
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const oa = "170", fi = { ROTATE: 0, DOLLY: 1, PAN: 2 }, ui = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, ac = 0, Ra = 1, oc = 2, Vo = 1, lc = 2, rn = 3, Tn = 0, Tt = 1, Zt = 2, yn = 0, pi = 1, Ca = 2, Pa = 3, La = 4, cc = 5, On = 100, hc = 101, uc = 102, dc = 103, fc = 104, pc = 200, mc = 201, _c = 202, gc = 203, vs = 204, xs = 205, vc = 206, xc = 207, Mc = 208, Sc = 209, yc = 210, Ec = 211, bc = 212, Tc = 213, Ac = 214, Ms = 0, Ss = 1, ys = 2, gi = 3, Es = 4, bs = 5, Ts = 6, As = 7, Go = 0, wc = 1, Rc = 2, En = 0, Cc = 1, Pc = 2, Lc = 3, Dc = 4, Ic = 5, Uc = 6, Nc = 7, Wo = 300, vi = 301, xi = 302, ws = 303, Rs = 304, Ir = 306, Cs = 1e3, zn = 1001, Ps = 1002, Gt = 1003, Fc = 1004, Xi = 1005, Nt = 1006, Br = 1007, kn = 1008, hn = 1009, Xo = 1010, Yo = 1011, Bi = 1012, la = 1013, Vn = 1014, an = 1015, zi = 1016, ca = 1017, ha = 1018, Mi = 1020, qo = 35902, Zo = 1021, jo = 1022, Ht = 1023, Ko = 1024, $o = 1025, mi = 1026, Si = 1027, Jo = 1028, ua = 1029, Qo = 1030, da = 1031, fa = 1033, xr = 33776, Mr = 33777, Sr = 33778, yr = 33779, Ls = 35840, Ds = 35841, Is = 35842, Us = 35843, Ns = 36196, Fs = 37492, Os = 37496, Bs = 37808, zs = 37809, ks = 37810, Hs = 37811, Vs = 37812, Gs = 37813, Ws = 37814, Xs = 37815, Ys = 37816, qs = 37817, Zs = 37818, js = 37819, Ks = 37820, $s = 37821, Er = 36492, Js = 36494, Qs = 36495, el = 36283, ea = 36284, ta = 36285, na = 36286, Oc = 3200, Bc = 3201, zc = 0, kc = 1, Sn = "", Dt = "srgb", Ei = "srgb-linear", Ur = "linear", je = "srgb", qn = 7680, Da = 519, Hc = 512, Vc = 513, Gc = 514, tl = 515, Wc = 516, Xc = 517, Yc = 518, qc = 519, ia = 35044, Ia = "300 es", on = 2e3, wr = 2001;
class Xn {
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
const _t = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], br = Math.PI / 180, ra = 180 / Math.PI;
function bn() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (_t[i & 255] + _t[i >> 8 & 255] + _t[i >> 16 & 255] + _t[i >> 24 & 255] + "-" + _t[e & 255] + _t[e >> 8 & 255] + "-" + _t[e >> 16 & 15 | 64] + _t[e >> 24 & 255] + "-" + _t[t & 63 | 128] + _t[t >> 8 & 255] + "-" + _t[t >> 16 & 255] + _t[t >> 24 & 255] + _t[n & 255] + _t[n >> 8 & 255] + _t[n >> 16 & 255] + _t[n >> 24 & 255]).toLowerCase();
}
function Mt(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Zc(i, e) {
  return (i % e + e) % e;
}
function zr(i, e, t) {
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
function Ke(i, e) {
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
const jc = {
  DEG2RAD: br
};
class Ae {
  constructor(e = 0, t = 0) {
    Ae.prototype.isVector2 = !0, this.x = e, this.y = t;
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
    return Math.acos(Mt(n, -1, 1));
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
    const n = e.elements, r = t.elements, s = this.elements, o = n[0], a = n[3], l = n[6], c = n[1], h = n[4], d = n[7], f = n[2], m = n[5], x = n[8], g = r[0], p = r[3], u = r[6], R = r[1], A = r[4], S = r[7], O = r[2], w = r[5], E = r[8];
    return s[0] = o * g + a * R + l * O, s[3] = o * p + a * A + l * w, s[6] = o * u + a * S + l * E, s[1] = c * g + h * R + d * O, s[4] = c * p + h * A + d * w, s[7] = c * u + h * S + d * E, s[2] = f * g + m * R + x * O, s[5] = f * p + m * A + x * w, s[8] = f * u + m * S + x * E, this;
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
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8], d = h * o - a * c, f = a * l - h * s, m = c * s - o * l, x = t * d + n * f + r * m;
    if (x === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const g = 1 / x;
    return e[0] = d * g, e[1] = (r * c - h * n) * g, e[2] = (a * n - r * o) * g, e[3] = f * g, e[4] = (h * t - r * l) * g, e[5] = (r * s - a * t) * g, e[6] = m * g, e[7] = (n * l - c * t) * g, e[8] = (o * t - n * s) * g, this;
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
    return this.premultiply(kr.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(kr.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(kr.makeTranslation(e, t)), this;
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
const kr = /* @__PURE__ */ new Le();
function nl(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function Rr(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Kc() {
  const i = Rr("canvas");
  return i.style.display = "block", i;
}
const Ua = {};
function Fi(i) {
  i in Ua || (Ua[i] = !0, console.warn(i));
}
function $c(i, e, t) {
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
function Jc(i) {
  const e = i.elements;
  e[2] = 0.5 * e[2] + 0.5 * e[3], e[6] = 0.5 * e[6] + 0.5 * e[7], e[10] = 0.5 * e[10] + 0.5 * e[11], e[14] = 0.5 * e[14] + 0.5 * e[15];
}
function Qc(i) {
  const e = i.elements;
  e[11] === -1 ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = -e[14] + 1);
}
const Ge = {
  enabled: !0,
  workingColorSpace: Ei,
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
    return this.enabled === !1 || e === t || !e || !t || (this.spaces[e].transfer === je && (i.r = ln(i.r), i.g = ln(i.g), i.b = ln(i.b)), this.spaces[e].primaries !== this.spaces[t].primaries && (i.applyMatrix3(this.spaces[e].toXYZ), i.applyMatrix3(this.spaces[t].fromXYZ)), this.spaces[t].transfer === je && (i.r = _i(i.r), i.g = _i(i.g), i.b = _i(i.b))), i;
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
    return i === Sn ? Ur : this.spaces[i].transfer;
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
function ln(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function _i(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const Na = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], Fa = [0.2126, 0.7152, 0.0722], Oa = [0.3127, 0.329], Ba = /* @__PURE__ */ new Le().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), za = /* @__PURE__ */ new Le().set(
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
  [Ei]: {
    primaries: Na,
    whitePoint: Oa,
    transfer: Ur,
    toXYZ: Ba,
    fromXYZ: za,
    luminanceCoefficients: Fa,
    workingColorSpaceConfig: { unpackColorSpace: Dt },
    outputColorSpaceConfig: { drawingBufferColorSpace: Dt }
  },
  [Dt]: {
    primaries: Na,
    whitePoint: Oa,
    transfer: je,
    toXYZ: Ba,
    fromXYZ: za,
    luminanceCoefficients: Fa,
    outputColorSpaceConfig: { drawingBufferColorSpace: Dt }
  }
});
let Zn;
class eh {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      Zn === void 0 && (Zn = Rr("canvas")), Zn.width = e.width, Zn.height = e.height;
      const n = Zn.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = Zn;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = Rr("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let o = 0; o < s.length; o++)
        s[o] = ln(s[o] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(ln(t[n] / 255) * 255) : t[n] = ln(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let th = 0;
class il {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: th++ }), this.uuid = bn(), this.data = e, this.dataReady = !0, this.version = 0;
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
          r[o].isDataTexture ? s.push(Hr(r[o].image)) : s.push(Hr(r[o]));
      } else
        s = Hr(r);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function Hr(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? eh.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let nh = 0;
class St extends Xn {
  constructor(e = St.DEFAULT_IMAGE, t = St.DEFAULT_MAPPING, n = zn, r = zn, s = Nt, o = kn, a = Ht, l = hn, c = St.DEFAULT_ANISOTROPY, h = Sn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: nh++ }), this.uuid = bn(), this.name = "", this.source = new il(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = o, this.anisotropy = c, this.format = a, this.internalFormat = null, this.type = l, this.offset = new Ae(0, 0), this.repeat = new Ae(1, 1), this.center = new Ae(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Le(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
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
    if (this.mapping !== Wo) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case Cs:
          e.x = e.x - Math.floor(e.x);
          break;
        case zn:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case Ps:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case Cs:
          e.y = e.y - Math.floor(e.y);
          break;
        case zn:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case Ps:
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
St.DEFAULT_MAPPING = Wo;
St.DEFAULT_ANISOTROPY = 1;
class ot {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    ot.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = r;
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
    const l = e.elements, c = l[0], h = l[4], d = l[8], f = l[1], m = l[5], x = l[9], g = l[2], p = l[6], u = l[10];
    if (Math.abs(h - f) < 0.01 && Math.abs(d - g) < 0.01 && Math.abs(x - p) < 0.01) {
      if (Math.abs(h + f) < 0.1 && Math.abs(d + g) < 0.1 && Math.abs(x + p) < 0.1 && Math.abs(c + m + u - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const A = (c + 1) / 2, S = (m + 1) / 2, O = (u + 1) / 2, w = (h + f) / 4, E = (d + g) / 4, C = (x + p) / 4;
      return A > S && A > O ? A < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(A), r = w / n, s = E / n) : S > O ? S < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(S), n = w / r, s = C / r) : O < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(O), n = E / s, r = C / s), this.set(n, r, s, t), this;
    }
    let R = Math.sqrt((p - x) * (p - x) + (d - g) * (d - g) + (f - h) * (f - h));
    return Math.abs(R) < 1e-3 && (R = 1), this.x = (p - x) / R, this.y = (d - g) / R, this.z = (f - h) / R, this.w = Math.acos((c + m + u - 1) / 2), this;
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
class ih extends Xn {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new ot(0, 0, e, t), this.scissorTest = !1, this.viewport = new ot(0, 0, e, t);
    const r = { width: e, height: t, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Nt,
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
    return this.texture.source = new il(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Gn extends ih {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class rl extends St {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = Gt, this.minFilter = Gt, this.wrapR = zn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class rh extends St {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = Gt, this.minFilter = Gt, this.wrapR = zn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Wn {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  static slerpFlat(e, t, n, r, s, o, a) {
    let l = n[r + 0], c = n[r + 1], h = n[r + 2], d = n[r + 3];
    const f = s[o + 0], m = s[o + 1], x = s[o + 2], g = s[o + 3];
    if (a === 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
      return;
    }
    if (a === 1) {
      e[t + 0] = f, e[t + 1] = m, e[t + 2] = x, e[t + 3] = g;
      return;
    }
    if (d !== g || l !== f || c !== m || h !== x) {
      let p = 1 - a;
      const u = l * f + c * m + h * x + d * g, R = u >= 0 ? 1 : -1, A = 1 - u * u;
      if (A > Number.EPSILON) {
        const O = Math.sqrt(A), w = Math.atan2(O, u * R);
        p = Math.sin(p * w) / O, a = Math.sin(a * w) / O;
      }
      const S = a * R;
      if (l = l * p + f * S, c = c * p + m * S, h = h * p + x * S, d = d * p + g * S, p === 1 - a) {
        const O = 1 / Math.sqrt(l * l + c * c + h * h + d * d);
        l *= O, c *= O, h *= O, d *= O;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
  }
  static multiplyQuaternionsFlat(e, t, n, r, s, o) {
    const a = n[r], l = n[r + 1], c = n[r + 2], h = n[r + 3], d = s[o], f = s[o + 1], m = s[o + 2], x = s[o + 3];
    return e[t] = a * x + h * d + l * m - c * f, e[t + 1] = l * x + h * f + c * d - a * m, e[t + 2] = c * x + h * m + a * f - l * d, e[t + 3] = h * x - a * d - l * f - c * m, e;
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
    const n = e._x, r = e._y, s = e._z, o = e._order, a = Math.cos, l = Math.sin, c = a(n / 2), h = a(r / 2), d = a(s / 2), f = l(n / 2), m = l(r / 2), x = l(s / 2);
    switch (o) {
      case "XYZ":
        this._x = f * h * d + c * m * x, this._y = c * m * d - f * h * x, this._z = c * h * x + f * m * d, this._w = c * h * d - f * m * x;
        break;
      case "YXZ":
        this._x = f * h * d + c * m * x, this._y = c * m * d - f * h * x, this._z = c * h * x - f * m * d, this._w = c * h * d + f * m * x;
        break;
      case "ZXY":
        this._x = f * h * d - c * m * x, this._y = c * m * d + f * h * x, this._z = c * h * x + f * m * d, this._w = c * h * d - f * m * x;
        break;
      case "ZYX":
        this._x = f * h * d - c * m * x, this._y = c * m * d + f * h * x, this._z = c * h * x - f * m * d, this._w = c * h * d + f * m * x;
        break;
      case "YZX":
        this._x = f * h * d + c * m * x, this._y = c * m * d + f * h * x, this._z = c * h * x - f * m * d, this._w = c * h * d - f * m * x;
        break;
      case "XZY":
        this._x = f * h * d - c * m * x, this._y = c * m * d - f * h * x, this._z = c * h * x + f * m * d, this._w = c * h * d + f * m * x;
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
    const t = e.elements, n = t[0], r = t[4], s = t[8], o = t[1], a = t[5], l = t[9], c = t[2], h = t[6], d = t[10], f = n + a + d;
    if (f > 0) {
      const m = 0.5 / Math.sqrt(f + 1);
      this._w = 0.25 / m, this._x = (h - l) * m, this._y = (s - c) * m, this._z = (o - r) * m;
    } else if (n > a && n > d) {
      const m = 2 * Math.sqrt(1 + n - a - d);
      this._w = (h - l) / m, this._x = 0.25 * m, this._y = (r + o) / m, this._z = (s + c) / m;
    } else if (a > d) {
      const m = 2 * Math.sqrt(1 + a - n - d);
      this._w = (s - c) / m, this._x = (r + o) / m, this._y = 0.25 * m, this._z = (l + h) / m;
    } else {
      const m = 2 * Math.sqrt(1 + d - n - a);
      this._w = (o - r) / m, this._x = (s + c) / m, this._y = (l + h) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Mt(this.dot(e), -1, 1)));
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
    const c = Math.sqrt(l), h = Math.atan2(c, a), d = Math.sin((1 - t) * h) / c, f = Math.sin(t * h) / c;
    return this._w = o * d + this._w * f, this._x = n * d + this._x * f, this._y = r * d + this._y * f, this._z = s * d + this._z * f, this._onChangeCallback(), this;
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
class U {
  constructor(e = 0, t = 0, n = 0) {
    U.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
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
    return this.applyQuaternion(ka.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(ka.setFromAxisAngle(e, t));
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
    const t = this.x, n = this.y, r = this.z, s = e.x, o = e.y, a = e.z, l = e.w, c = 2 * (o * r - a * n), h = 2 * (a * t - s * r), d = 2 * (s * n - o * t);
    return this.x = t + l * c + o * d - a * h, this.y = n + l * h + a * c - s * d, this.z = r + l * d + s * h - o * c, this;
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
    return Vr.copy(this).projectOnVector(e), this.sub(Vr);
  }
  reflect(e) {
    return this.sub(Vr.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Mt(n, -1, 1));
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
const Vr = /* @__PURE__ */ new U(), ka = /* @__PURE__ */ new Wn();
class ki {
  constructor(e = new U(1 / 0, 1 / 0, 1 / 0), t = new U(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Bt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Bt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Bt.copy(t).multiplyScalar(0.5);
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
          e.isMesh === !0 ? e.getVertexPosition(o, Bt) : Bt.fromBufferAttribute(s, o), Bt.applyMatrix4(e.matrixWorld), this.expandByPoint(Bt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Yi.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Yi.copy(n.boundingBox)), Yi.applyMatrix4(e.matrixWorld), this.union(Yi);
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
    return this.clampPoint(e.center, Bt), Bt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Ri), qi.subVectors(this.max, Ri), jn.subVectors(e.a, Ri), Kn.subVectors(e.b, Ri), $n.subVectors(e.c, Ri), pn.subVectors(Kn, jn), mn.subVectors($n, Kn), Cn.subVectors(jn, $n);
    let t = [
      0,
      -pn.z,
      pn.y,
      0,
      -mn.z,
      mn.y,
      0,
      -Cn.z,
      Cn.y,
      pn.z,
      0,
      -pn.x,
      mn.z,
      0,
      -mn.x,
      Cn.z,
      0,
      -Cn.x,
      -pn.y,
      pn.x,
      0,
      -mn.y,
      mn.x,
      0,
      -Cn.y,
      Cn.x,
      0
    ];
    return !Gr(t, jn, Kn, $n, qi) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Gr(t, jn, Kn, $n, qi)) ? !1 : (Zi.crossVectors(pn, mn), t = [Zi.x, Zi.y, Zi.z], Gr(t, jn, Kn, $n, qi));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Bt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Bt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Jt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Jt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Jt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Jt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Jt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Jt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Jt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Jt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Jt), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Jt = [
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U()
], Bt = /* @__PURE__ */ new U(), Yi = /* @__PURE__ */ new ki(), jn = /* @__PURE__ */ new U(), Kn = /* @__PURE__ */ new U(), $n = /* @__PURE__ */ new U(), pn = /* @__PURE__ */ new U(), mn = /* @__PURE__ */ new U(), Cn = /* @__PURE__ */ new U(), Ri = /* @__PURE__ */ new U(), qi = /* @__PURE__ */ new U(), Zi = /* @__PURE__ */ new U(), Pn = /* @__PURE__ */ new U();
function Gr(i, e, t, n, r) {
  for (let s = 0, o = i.length - 3; s <= o; s += 3) {
    Pn.fromArray(i, s);
    const a = r.x * Math.abs(Pn.x) + r.y * Math.abs(Pn.y) + r.z * Math.abs(Pn.z), l = e.dot(Pn), c = t.dot(Pn), h = n.dot(Pn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > a)
      return !1;
  }
  return !0;
}
const sh = /* @__PURE__ */ new ki(), Ci = /* @__PURE__ */ new U(), Wr = /* @__PURE__ */ new U();
class Nr {
  constructor(e = new U(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : sh.setFromPoints(e).getCenter(n);
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
    Ci.subVectors(e, this.center);
    const t = Ci.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(Ci, r / n), this.radius += r;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Wr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Ci.copy(e.center).add(Wr)), this.expandByPoint(Ci.copy(e.center).sub(Wr))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Qt = /* @__PURE__ */ new U(), Xr = /* @__PURE__ */ new U(), ji = /* @__PURE__ */ new U(), _n = /* @__PURE__ */ new U(), Yr = /* @__PURE__ */ new U(), Ki = /* @__PURE__ */ new U(), qr = /* @__PURE__ */ new U();
class pa {
  constructor(e = new U(), t = new U(0, 0, -1)) {
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
    return this.origin.copy(this.at(e, Qt)), this;
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
    const t = Qt.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (Qt.copy(this.origin).addScaledVector(this.direction, t), Qt.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, r) {
    Xr.copy(e).add(t).multiplyScalar(0.5), ji.copy(t).sub(e).normalize(), _n.copy(this.origin).sub(Xr);
    const s = e.distanceTo(t) * 0.5, o = -this.direction.dot(ji), a = _n.dot(this.direction), l = -_n.dot(ji), c = _n.lengthSq(), h = Math.abs(1 - o * o);
    let d, f, m, x;
    if (h > 0)
      if (d = o * l - a, f = o * a - l, x = s * h, d >= 0)
        if (f >= -x)
          if (f <= x) {
            const g = 1 / h;
            d *= g, f *= g, m = d * (d + o * f + 2 * a) + f * (o * d + f + 2 * l) + c;
          } else
            f = s, d = Math.max(0, -(o * f + a)), m = -d * d + f * (f + 2 * l) + c;
        else
          f = -s, d = Math.max(0, -(o * f + a)), m = -d * d + f * (f + 2 * l) + c;
      else
        f <= -x ? (d = Math.max(0, -(-o * s + a)), f = d > 0 ? -s : Math.min(Math.max(-s, -l), s), m = -d * d + f * (f + 2 * l) + c) : f <= x ? (d = 0, f = Math.min(Math.max(-s, -l), s), m = f * (f + 2 * l) + c) : (d = Math.max(0, -(o * s + a)), f = d > 0 ? s : Math.min(Math.max(-s, -l), s), m = -d * d + f * (f + 2 * l) + c);
    else
      f = o > 0 ? -s : s, d = Math.max(0, -(o * f + a)), m = -d * d + f * (f + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, d), r && r.copy(Xr).addScaledVector(ji, f), m;
  }
  intersectSphere(e, t) {
    Qt.subVectors(e.center, this.origin);
    const n = Qt.dot(this.direction), r = Qt.dot(Qt) - n * n, s = e.radius * e.radius;
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
    const c = 1 / this.direction.x, h = 1 / this.direction.y, d = 1 / this.direction.z, f = this.origin;
    return c >= 0 ? (n = (e.min.x - f.x) * c, r = (e.max.x - f.x) * c) : (n = (e.max.x - f.x) * c, r = (e.min.x - f.x) * c), h >= 0 ? (s = (e.min.y - f.y) * h, o = (e.max.y - f.y) * h) : (s = (e.max.y - f.y) * h, o = (e.min.y - f.y) * h), n > o || s > r || ((s > n || isNaN(n)) && (n = s), (o < r || isNaN(r)) && (r = o), d >= 0 ? (a = (e.min.z - f.z) * d, l = (e.max.z - f.z) * d) : (a = (e.max.z - f.z) * d, l = (e.min.z - f.z) * d), n > l || a > r) || ((a > n || n !== n) && (n = a), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, Qt) !== null;
  }
  intersectTriangle(e, t, n, r, s) {
    Yr.subVectors(t, e), Ki.subVectors(n, e), qr.crossVectors(Yr, Ki);
    let o = this.direction.dot(qr), a;
    if (o > 0) {
      if (r) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    _n.subVectors(this.origin, e);
    const l = a * this.direction.dot(Ki.crossVectors(_n, Ki));
    if (l < 0)
      return null;
    const c = a * this.direction.dot(Yr.cross(_n));
    if (c < 0 || l + c > o)
      return null;
    const h = -a * _n.dot(qr);
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
  constructor(e, t, n, r, s, o, a, l, c, h, d, f, m, x, g, p) {
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
    ], e !== void 0 && this.set(e, t, n, r, s, o, a, l, c, h, d, f, m, x, g, p);
  }
  set(e, t, n, r, s, o, a, l, c, h, d, f, m, x, g, p) {
    const u = this.elements;
    return u[0] = e, u[4] = t, u[8] = n, u[12] = r, u[1] = s, u[5] = o, u[9] = a, u[13] = l, u[2] = c, u[6] = h, u[10] = d, u[14] = f, u[3] = m, u[7] = x, u[11] = g, u[15] = p, this;
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
    const t = this.elements, n = e.elements, r = 1 / Jn.setFromMatrixColumn(e, 0).length(), s = 1 / Jn.setFromMatrixColumn(e, 1).length(), o = 1 / Jn.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * o, t[9] = n[9] * o, t[10] = n[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z, o = Math.cos(n), a = Math.sin(n), l = Math.cos(r), c = Math.sin(r), h = Math.cos(s), d = Math.sin(s);
    if (e.order === "XYZ") {
      const f = o * h, m = o * d, x = a * h, g = a * d;
      t[0] = l * h, t[4] = -l * d, t[8] = c, t[1] = m + x * c, t[5] = f - g * c, t[9] = -a * l, t[2] = g - f * c, t[6] = x + m * c, t[10] = o * l;
    } else if (e.order === "YXZ") {
      const f = l * h, m = l * d, x = c * h, g = c * d;
      t[0] = f + g * a, t[4] = x * a - m, t[8] = o * c, t[1] = o * d, t[5] = o * h, t[9] = -a, t[2] = m * a - x, t[6] = g + f * a, t[10] = o * l;
    } else if (e.order === "ZXY") {
      const f = l * h, m = l * d, x = c * h, g = c * d;
      t[0] = f - g * a, t[4] = -o * d, t[8] = x + m * a, t[1] = m + x * a, t[5] = o * h, t[9] = g - f * a, t[2] = -o * c, t[6] = a, t[10] = o * l;
    } else if (e.order === "ZYX") {
      const f = o * h, m = o * d, x = a * h, g = a * d;
      t[0] = l * h, t[4] = x * c - m, t[8] = f * c + g, t[1] = l * d, t[5] = g * c + f, t[9] = m * c - x, t[2] = -c, t[6] = a * l, t[10] = o * l;
    } else if (e.order === "YZX") {
      const f = o * l, m = o * c, x = a * l, g = a * c;
      t[0] = l * h, t[4] = g - f * d, t[8] = x * d + m, t[1] = d, t[5] = o * h, t[9] = -a * h, t[2] = -c * h, t[6] = m * d + x, t[10] = f - g * d;
    } else if (e.order === "XZY") {
      const f = o * l, m = o * c, x = a * l, g = a * c;
      t[0] = l * h, t[4] = -d, t[8] = c * h, t[1] = f * d + g, t[5] = o * h, t[9] = m * d - x, t[2] = x * d - m, t[6] = a * h, t[10] = g * d + f;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(ah, e, oh);
  }
  lookAt(e, t, n) {
    const r = this.elements;
    return wt.subVectors(e, t), wt.lengthSq() === 0 && (wt.z = 1), wt.normalize(), gn.crossVectors(n, wt), gn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? wt.x += 1e-4 : wt.z += 1e-4, wt.normalize(), gn.crossVectors(n, wt)), gn.normalize(), $i.crossVectors(wt, gn), r[0] = gn.x, r[4] = $i.x, r[8] = wt.x, r[1] = gn.y, r[5] = $i.y, r[9] = wt.y, r[2] = gn.z, r[6] = $i.z, r[10] = wt.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, o = n[0], a = n[4], l = n[8], c = n[12], h = n[1], d = n[5], f = n[9], m = n[13], x = n[2], g = n[6], p = n[10], u = n[14], R = n[3], A = n[7], S = n[11], O = n[15], w = r[0], E = r[4], C = r[8], y = r[12], _ = r[1], T = r[5], N = r[9], F = r[13], z = r[2], W = r[6], G = r[10], q = r[14], V = r[3], Q = r[7], re = r[11], pe = r[15];
    return s[0] = o * w + a * _ + l * z + c * V, s[4] = o * E + a * T + l * W + c * Q, s[8] = o * C + a * N + l * G + c * re, s[12] = o * y + a * F + l * q + c * pe, s[1] = h * w + d * _ + f * z + m * V, s[5] = h * E + d * T + f * W + m * Q, s[9] = h * C + d * N + f * G + m * re, s[13] = h * y + d * F + f * q + m * pe, s[2] = x * w + g * _ + p * z + u * V, s[6] = x * E + g * T + p * W + u * Q, s[10] = x * C + g * N + p * G + u * re, s[14] = x * y + g * F + p * q + u * pe, s[3] = R * w + A * _ + S * z + O * V, s[7] = R * E + A * T + S * W + O * Q, s[11] = R * C + A * N + S * G + O * re, s[15] = R * y + A * F + S * q + O * pe, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[12], o = e[1], a = e[5], l = e[9], c = e[13], h = e[2], d = e[6], f = e[10], m = e[14], x = e[3], g = e[7], p = e[11], u = e[15];
    return x * (+s * l * d - r * c * d - s * a * f + n * c * f + r * a * m - n * l * m) + g * (+t * l * m - t * c * f + s * o * f - r * o * m + r * c * h - s * l * h) + p * (+t * c * d - t * a * m - s * o * d + n * o * m + s * a * h - n * c * h) + u * (-r * a * h - t * l * d + t * a * f + r * o * d - n * o * f + n * l * h);
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
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8], d = e[9], f = e[10], m = e[11], x = e[12], g = e[13], p = e[14], u = e[15], R = d * p * c - g * f * c + g * l * m - a * p * m - d * l * u + a * f * u, A = x * f * c - h * p * c - x * l * m + o * p * m + h * l * u - o * f * u, S = h * g * c - x * d * c + x * a * m - o * g * m - h * a * u + o * d * u, O = x * d * l - h * g * l - x * a * f + o * g * f + h * a * p - o * d * p, w = t * R + n * A + r * S + s * O;
    if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const E = 1 / w;
    return e[0] = R * E, e[1] = (g * f * s - d * p * s - g * r * m + n * p * m + d * r * u - n * f * u) * E, e[2] = (a * p * s - g * l * s + g * r * c - n * p * c - a * r * u + n * l * u) * E, e[3] = (d * l * s - a * f * s - d * r * c + n * f * c + a * r * m - n * l * m) * E, e[4] = A * E, e[5] = (h * p * s - x * f * s + x * r * m - t * p * m - h * r * u + t * f * u) * E, e[6] = (x * l * s - o * p * s - x * r * c + t * p * c + o * r * u - t * l * u) * E, e[7] = (o * f * s - h * l * s + h * r * c - t * f * c - o * r * m + t * l * m) * E, e[8] = S * E, e[9] = (x * d * s - h * g * s - x * n * m + t * g * m + h * n * u - t * d * u) * E, e[10] = (o * g * s - x * a * s + x * n * c - t * g * c - o * n * u + t * a * u) * E, e[11] = (h * a * s - o * d * s - h * n * c + t * d * c + o * n * m - t * a * m) * E, e[12] = O * E, e[13] = (h * g * r - x * d * r + x * n * f - t * g * f - h * n * p + t * d * p) * E, e[14] = (x * a * r - o * g * r - x * n * l + t * g * l + o * n * p - t * a * p) * E, e[15] = (o * d * r - h * a * r + h * n * l - t * d * l - o * n * f + t * a * f) * E, this;
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
    const r = this.elements, s = t._x, o = t._y, a = t._z, l = t._w, c = s + s, h = o + o, d = a + a, f = s * c, m = s * h, x = s * d, g = o * h, p = o * d, u = a * d, R = l * c, A = l * h, S = l * d, O = n.x, w = n.y, E = n.z;
    return r[0] = (1 - (g + u)) * O, r[1] = (m + S) * O, r[2] = (x - A) * O, r[3] = 0, r[4] = (m - S) * w, r[5] = (1 - (f + u)) * w, r[6] = (p + R) * w, r[7] = 0, r[8] = (x + A) * E, r[9] = (p - R) * E, r[10] = (1 - (f + g)) * E, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  decompose(e, t, n) {
    const r = this.elements;
    let s = Jn.set(r[0], r[1], r[2]).length();
    const o = Jn.set(r[4], r[5], r[6]).length(), a = Jn.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), e.x = r[12], e.y = r[13], e.z = r[14], zt.copy(this);
    const c = 1 / s, h = 1 / o, d = 1 / a;
    return zt.elements[0] *= c, zt.elements[1] *= c, zt.elements[2] *= c, zt.elements[4] *= h, zt.elements[5] *= h, zt.elements[6] *= h, zt.elements[8] *= d, zt.elements[9] *= d, zt.elements[10] *= d, t.setFromRotationMatrix(zt), n.x = s, n.y = o, n.z = a, this;
  }
  makePerspective(e, t, n, r, s, o, a = on) {
    const l = this.elements, c = 2 * s / (t - e), h = 2 * s / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r);
    let m, x;
    if (a === on)
      m = -(o + s) / (o - s), x = -2 * o * s / (o - s);
    else if (a === wr)
      m = -o / (o - s), x = -o * s / (o - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return l[0] = c, l[4] = 0, l[8] = d, l[12] = 0, l[1] = 0, l[5] = h, l[9] = f, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = m, l[14] = x, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, s, o, a = on) {
    const l = this.elements, c = 1 / (t - e), h = 1 / (n - r), d = 1 / (o - s), f = (t + e) * c, m = (n + r) * h;
    let x, g;
    if (a === on)
      x = (o + s) * d, g = -2 * d;
    else if (a === wr)
      x = s * d, g = -1 * d;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -f, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -m, l[2] = 0, l[6] = 0, l[10] = g, l[14] = -x, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
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
const Jn = /* @__PURE__ */ new U(), zt = /* @__PURE__ */ new st(), ah = /* @__PURE__ */ new U(0, 0, 0), oh = /* @__PURE__ */ new U(1, 1, 1), gn = /* @__PURE__ */ new U(), $i = /* @__PURE__ */ new U(), wt = /* @__PURE__ */ new U(), Ha = /* @__PURE__ */ new st(), Va = /* @__PURE__ */ new Wn();
class un {
  constructor(e = 0, t = 0, n = 0, r = un.DEFAULT_ORDER) {
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
    const r = e.elements, s = r[0], o = r[4], a = r[8], l = r[1], c = r[5], h = r[9], d = r[2], f = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(Mt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-o, s)) : (this._x = Math.atan2(f, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Mt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, m), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Mt(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(-d, m), this._z = Math.atan2(-o, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Mt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(f, m), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-o, c));
        break;
      case "YZX":
        this._z = Math.asin(Mt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(a, m));
        break;
      case "XZY":
        this._z = Math.asin(-Mt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(f, c), this._y = Math.atan2(a, s)) : (this._x = Math.atan2(-h, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return Ha.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Ha, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return Va.setFromEuler(this), this.setFromQuaternion(Va, e);
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
un.DEFAULT_ORDER = "XYZ";
class sl {
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
let lh = 0;
const Ga = /* @__PURE__ */ new U(), Qn = /* @__PURE__ */ new Wn(), en = /* @__PURE__ */ new st(), Ji = /* @__PURE__ */ new U(), Pi = /* @__PURE__ */ new U(), ch = /* @__PURE__ */ new U(), hh = /* @__PURE__ */ new Wn(), Wa = /* @__PURE__ */ new U(1, 0, 0), Xa = /* @__PURE__ */ new U(0, 1, 0), Ya = /* @__PURE__ */ new U(0, 0, 1), qa = { type: "added" }, uh = { type: "removed" }, ei = { type: "childadded", child: null }, Zr = { type: "childremoved", child: null };
class yt extends Xn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: lh++ }), this.uuid = bn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = yt.DEFAULT_UP.clone();
    const e = new U(), t = new un(), n = new Wn(), r = new U(1, 1, 1);
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
    }), this.matrix = new st(), this.matrixWorld = new st(), this.matrixAutoUpdate = yt.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new sl(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
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
    return Qn.setFromAxisAngle(e, t), this.quaternion.multiply(Qn), this;
  }
  rotateOnWorldAxis(e, t) {
    return Qn.setFromAxisAngle(e, t), this.quaternion.premultiply(Qn), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Wa, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(Xa, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(Ya, e);
  }
  translateOnAxis(e, t) {
    return Ga.copy(e).applyQuaternion(this.quaternion), this.position.add(Ga.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Wa, e);
  }
  translateY(e) {
    return this.translateOnAxis(Xa, e);
  }
  translateZ(e) {
    return this.translateOnAxis(Ya, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(en.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? Ji.copy(e) : Ji.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Pi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? en.lookAt(Pi, Ji, this.up) : en.lookAt(Ji, Pi, this.up), this.quaternion.setFromRotationMatrix(en), r && (en.extractRotation(r.matrixWorld), Qn.setFromRotationMatrix(en), this.quaternion.premultiply(Qn.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(qa), ei.child = e, this.dispatchEvent(ei), ei.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(uh), Zr.child = e, this.dispatchEvent(Zr), Zr.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), en.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), en.multiply(e.parent.matrixWorld)), e.applyMatrix4(en), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(qa), ei.child = e, this.dispatchEvent(ei), ei.child = null, this;
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
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Pi, e, ch), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Pi, hh, e), e;
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
            const d = l[c];
            s(e.shapes, d);
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
      const a = o(e.geometries), l = o(e.materials), c = o(e.textures), h = o(e.images), d = o(e.shapes), f = o(e.skeletons), m = o(e.animations), x = o(e.nodes);
      a.length > 0 && (n.geometries = a), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), f.length > 0 && (n.skeletons = f), m.length > 0 && (n.animations = m), x.length > 0 && (n.nodes = x);
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
yt.DEFAULT_UP = /* @__PURE__ */ new U(0, 1, 0);
yt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const kt = /* @__PURE__ */ new U(), tn = /* @__PURE__ */ new U(), jr = /* @__PURE__ */ new U(), nn = /* @__PURE__ */ new U(), ti = /* @__PURE__ */ new U(), ni = /* @__PURE__ */ new U(), Za = /* @__PURE__ */ new U(), Kr = /* @__PURE__ */ new U(), $r = /* @__PURE__ */ new U(), Jr = /* @__PURE__ */ new U(), Qr = /* @__PURE__ */ new ot(), es = /* @__PURE__ */ new ot(), ts = /* @__PURE__ */ new ot();
class Ut {
  constructor(e = new U(), t = new U(), n = new U()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), kt.subVectors(e, t), r.cross(kt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, r, s) {
    kt.subVectors(r, t), tn.subVectors(n, t), jr.subVectors(e, t);
    const o = kt.dot(kt), a = kt.dot(tn), l = kt.dot(jr), c = tn.dot(tn), h = tn.dot(jr), d = o * c - a * a;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const f = 1 / d, m = (c * l - a * h) * f, x = (o * h - a * l) * f;
    return s.set(1 - m - x, x, m);
  }
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, nn) === null ? !1 : nn.x >= 0 && nn.y >= 0 && nn.x + nn.y <= 1;
  }
  static getInterpolation(e, t, n, r, s, o, a, l) {
    return this.getBarycoord(e, t, n, r, nn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, nn.x), l.addScaledVector(o, nn.y), l.addScaledVector(a, nn.z), l);
  }
  static getInterpolatedAttribute(e, t, n, r, s, o) {
    return Qr.setScalar(0), es.setScalar(0), ts.setScalar(0), Qr.fromBufferAttribute(e, t), es.fromBufferAttribute(e, n), ts.fromBufferAttribute(e, r), o.setScalar(0), o.addScaledVector(Qr, s.x), o.addScaledVector(es, s.y), o.addScaledVector(ts, s.z), o;
  }
  static isFrontFacing(e, t, n, r) {
    return kt.subVectors(n, t), tn.subVectors(e, t), kt.cross(tn).dot(r) < 0;
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
    return kt.subVectors(this.c, this.b), tn.subVectors(this.a, this.b), kt.cross(tn).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Ut.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Ut.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, r, s) {
    return Ut.getInterpolation(e, this.a, this.b, this.c, t, n, r, s);
  }
  containsPoint(e) {
    return Ut.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Ut.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, s = this.c;
    let o, a;
    ti.subVectors(r, n), ni.subVectors(s, n), Kr.subVectors(e, n);
    const l = ti.dot(Kr), c = ni.dot(Kr);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    $r.subVectors(e, r);
    const h = ti.dot($r), d = ni.dot($r);
    if (h >= 0 && d <= h)
      return t.copy(r);
    const f = l * d - h * c;
    if (f <= 0 && l >= 0 && h <= 0)
      return o = l / (l - h), t.copy(n).addScaledVector(ti, o);
    Jr.subVectors(e, s);
    const m = ti.dot(Jr), x = ni.dot(Jr);
    if (x >= 0 && m <= x)
      return t.copy(s);
    const g = m * c - l * x;
    if (g <= 0 && c >= 0 && x <= 0)
      return a = c / (c - x), t.copy(n).addScaledVector(ni, a);
    const p = h * x - m * d;
    if (p <= 0 && d - h >= 0 && m - x >= 0)
      return Za.subVectors(s, r), a = (d - h) / (d - h + (m - x)), t.copy(r).addScaledVector(Za, a);
    const u = 1 / (p + g + f);
    return o = g * u, a = f * u, t.copy(n).addScaledVector(ti, o).addScaledVector(ni, a);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const al = {
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
}, vn = { h: 0, s: 0, l: 0 }, Qi = { h: 0, s: 0, l: 0 };
function ns(i, e, t) {
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
  setHex(e, t = Dt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Ge.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, r = Ge.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, Ge.toWorkingColorSpace(this, r), this;
  }
  setHSL(e, t, n, r = Ge.workingColorSpace) {
    if (e = Zc(e, 1), t = Mt(t, 0, 1), n = Mt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, o = 2 * n - s;
      this.r = ns(o, s, e + 1 / 3), this.g = ns(o, s, e), this.b = ns(o, s, e - 1 / 3);
    }
    return Ge.toWorkingColorSpace(this, r), this;
  }
  setStyle(e, t = Dt) {
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
  setColorName(e, t = Dt) {
    const n = al[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = ln(e.r), this.g = ln(e.g), this.b = ln(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = _i(e.r), this.g = _i(e.g), this.b = _i(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = Dt) {
    return Ge.fromWorkingColorSpace(gt.copy(this), e), Math.round(Mt(gt.r * 255, 0, 255)) * 65536 + Math.round(Mt(gt.g * 255, 0, 255)) * 256 + Math.round(Mt(gt.b * 255, 0, 255));
  }
  getHexString(e = Dt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = Ge.workingColorSpace) {
    Ge.fromWorkingColorSpace(gt.copy(this), t);
    const n = gt.r, r = gt.g, s = gt.b, o = Math.max(n, r, s), a = Math.min(n, r, s);
    let l, c;
    const h = (a + o) / 2;
    if (a === o)
      l = 0, c = 0;
    else {
      const d = o - a;
      switch (c = h <= 0.5 ? d / (o + a) : d / (2 - o - a), o) {
        case n:
          l = (r - s) / d + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / d + 2;
          break;
        case s:
          l = (n - r) / d + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = h, e;
  }
  getRGB(e, t = Ge.workingColorSpace) {
    return Ge.fromWorkingColorSpace(gt.copy(this), t), e.r = gt.r, e.g = gt.g, e.b = gt.b, e;
  }
  getStyle(e = Dt) {
    Ge.fromWorkingColorSpace(gt.copy(this), e);
    const t = gt.r, n = gt.g, r = gt.b;
    return e !== Dt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(vn), this.setHSL(vn.h + e, vn.s + t, vn.l + n);
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
    this.getHSL(vn), e.getHSL(Qi);
    const n = zr(vn.h, Qi.h, t), r = zr(vn.s, Qi.s, t), s = zr(vn.l, Qi.l, t);
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
const gt = /* @__PURE__ */ new Xe();
Xe.NAMES = al;
let dh = 0;
class bi extends Xn {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(e) {
  }
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: dh++ }), this.uuid = bn(), this.name = "", this.blending = pi, this.side = Tn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = vs, this.blendDst = xs, this.blendEquation = On, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Xe(0, 0, 0), this.blendAlpha = 0, this.depthFunc = gi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = Da, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = qn, this.stencilZFail = qn, this.stencilZPass = qn, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== pi && (n.blending = this.blending), this.side !== Tn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== vs && (n.blendSrc = this.blendSrc), this.blendDst !== xs && (n.blendDst = this.blendDst), this.blendEquation !== On && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== gi && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== Da && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== qn && (n.stencilFail = this.stencilFail), this.stencilZFail !== qn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== qn && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
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
class ma extends bi {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.color = new Xe(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new un(), this.combine = Go, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const lt = /* @__PURE__ */ new U(), er = /* @__PURE__ */ new Ae();
class Wt {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = ia, this.updateRanges = [], this.gpuType = an, this.version = 0;
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
        er.fromBufferAttribute(this, t), er.applyMatrix3(e), this.setXY(t, er.x, er.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        lt.fromBufferAttribute(this, t), lt.applyMatrix3(e), this.setXYZ(t, lt.x, lt.y, lt.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      lt.fromBufferAttribute(this, t), lt.applyMatrix4(e), this.setXYZ(t, lt.x, lt.y, lt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      lt.fromBufferAttribute(this, t), lt.applyNormalMatrix(e), this.setXYZ(t, lt.x, lt.y, lt.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      lt.fromBufferAttribute(this, t), lt.transformDirection(e), this.setXYZ(t, lt.x, lt.y, lt.z);
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
    return this.normalized && (n = Ke(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Ke(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Ke(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Ke(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Ke(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = Ke(t, this.array), n = Ke(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = Ke(t, this.array), n = Ke(n, this.array), r = Ke(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, s) {
    return e *= this.itemSize, this.normalized && (t = Ke(t, this.array), n = Ke(n, this.array), r = Ke(r, this.array), s = Ke(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = s, this;
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
    return this.name !== "" && (e.name = this.name), this.usage !== ia && (e.usage = this.usage), e;
  }
}
class ol extends Wt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class ll extends Wt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class cn extends Wt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let fh = 0;
const Lt = /* @__PURE__ */ new st(), is = /* @__PURE__ */ new yt(), ii = /* @__PURE__ */ new U(), Rt = /* @__PURE__ */ new ki(), Li = /* @__PURE__ */ new ki(), dt = /* @__PURE__ */ new U();
class ft extends Xn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: fh++ }), this.uuid = bn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (nl(e) ? ll : ol)(e, 1) : this.index = e, this;
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
    return Lt.makeRotationFromQuaternion(e), this.applyMatrix4(Lt), this;
  }
  rotateX(e) {
    return Lt.makeRotationX(e), this.applyMatrix4(Lt), this;
  }
  rotateY(e) {
    return Lt.makeRotationY(e), this.applyMatrix4(Lt), this;
  }
  rotateZ(e) {
    return Lt.makeRotationZ(e), this.applyMatrix4(Lt), this;
  }
  translate(e, t, n) {
    return Lt.makeTranslation(e, t, n), this.applyMatrix4(Lt), this;
  }
  scale(e, t, n) {
    return Lt.makeScale(e, t, n), this.applyMatrix4(Lt), this;
  }
  lookAt(e) {
    return is.lookAt(e), is.updateMatrix(), this.applyMatrix4(is.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ii).negate(), this.translate(ii.x, ii.y, ii.z), this;
  }
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const o = e[r];
        n.push(o.x, o.y, o.z || 0);
      }
      this.setAttribute("position", new cn(n, 3));
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
    this.boundingBox === null && (this.boundingBox = new ki());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new U(-1 / 0, -1 / 0, -1 / 0),
        new U(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const s = t[n];
          Rt.setFromBufferAttribute(s), this.morphTargetsRelative ? (dt.addVectors(this.boundingBox.min, Rt.min), this.boundingBox.expandByPoint(dt), dt.addVectors(this.boundingBox.max, Rt.max), this.boundingBox.expandByPoint(dt)) : (this.boundingBox.expandByPoint(Rt.min), this.boundingBox.expandByPoint(Rt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Nr());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new U(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Rt.setFromBufferAttribute(e), t)
        for (let s = 0, o = t.length; s < o; s++) {
          const a = t[s];
          Li.setFromBufferAttribute(a), this.morphTargetsRelative ? (dt.addVectors(Rt.min, Li.min), Rt.expandByPoint(dt), dt.addVectors(Rt.max, Li.max), Rt.expandByPoint(dt)) : (Rt.expandByPoint(Li.min), Rt.expandByPoint(Li.max));
        }
      Rt.getCenter(n);
      let r = 0;
      for (let s = 0, o = e.count; s < o; s++)
        dt.fromBufferAttribute(e, s), r = Math.max(r, n.distanceToSquared(dt));
      if (t)
        for (let s = 0, o = t.length; s < o; s++) {
          const a = t[s], l = this.morphTargetsRelative;
          for (let c = 0, h = a.count; c < h; c++)
            dt.fromBufferAttribute(a, c), l && (ii.fromBufferAttribute(e, c), dt.add(ii)), r = Math.max(r, n.distanceToSquared(dt));
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
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Wt(new Float32Array(4 * n.count), 4));
    const o = this.getAttribute("tangent"), a = [], l = [];
    for (let C = 0; C < n.count; C++)
      a[C] = new U(), l[C] = new U();
    const c = new U(), h = new U(), d = new U(), f = new Ae(), m = new Ae(), x = new Ae(), g = new U(), p = new U();
    function u(C, y, _) {
      c.fromBufferAttribute(n, C), h.fromBufferAttribute(n, y), d.fromBufferAttribute(n, _), f.fromBufferAttribute(s, C), m.fromBufferAttribute(s, y), x.fromBufferAttribute(s, _), h.sub(c), d.sub(c), m.sub(f), x.sub(f);
      const T = 1 / (m.x * x.y - x.x * m.y);
      isFinite(T) && (g.copy(h).multiplyScalar(x.y).addScaledVector(d, -m.y).multiplyScalar(T), p.copy(d).multiplyScalar(m.x).addScaledVector(h, -x.x).multiplyScalar(T), a[C].add(g), a[y].add(g), a[_].add(g), l[C].add(p), l[y].add(p), l[_].add(p));
    }
    let R = this.groups;
    R.length === 0 && (R = [{
      start: 0,
      count: e.count
    }]);
    for (let C = 0, y = R.length; C < y; ++C) {
      const _ = R[C], T = _.start, N = _.count;
      for (let F = T, z = T + N; F < z; F += 3)
        u(
          e.getX(F + 0),
          e.getX(F + 1),
          e.getX(F + 2)
        );
    }
    const A = new U(), S = new U(), O = new U(), w = new U();
    function E(C) {
      O.fromBufferAttribute(r, C), w.copy(O);
      const y = a[C];
      A.copy(y), A.sub(O.multiplyScalar(O.dot(y))).normalize(), S.crossVectors(w, y);
      const T = S.dot(l[C]) < 0 ? -1 : 1;
      o.setXYZW(C, A.x, A.y, A.z, T);
    }
    for (let C = 0, y = R.length; C < y; ++C) {
      const _ = R[C], T = _.start, N = _.count;
      for (let F = T, z = T + N; F < z; F += 3)
        E(e.getX(F + 0)), E(e.getX(F + 1)), E(e.getX(F + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Wt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let f = 0, m = n.count; f < m; f++)
          n.setXYZ(f, 0, 0, 0);
      const r = new U(), s = new U(), o = new U(), a = new U(), l = new U(), c = new U(), h = new U(), d = new U();
      if (e)
        for (let f = 0, m = e.count; f < m; f += 3) {
          const x = e.getX(f + 0), g = e.getX(f + 1), p = e.getX(f + 2);
          r.fromBufferAttribute(t, x), s.fromBufferAttribute(t, g), o.fromBufferAttribute(t, p), h.subVectors(o, s), d.subVectors(r, s), h.cross(d), a.fromBufferAttribute(n, x), l.fromBufferAttribute(n, g), c.fromBufferAttribute(n, p), a.add(h), l.add(h), c.add(h), n.setXYZ(x, a.x, a.y, a.z), n.setXYZ(g, l.x, l.y, l.z), n.setXYZ(p, c.x, c.y, c.z);
        }
      else
        for (let f = 0, m = t.count; f < m; f += 3)
          r.fromBufferAttribute(t, f + 0), s.fromBufferAttribute(t, f + 1), o.fromBufferAttribute(t, f + 2), h.subVectors(o, s), d.subVectors(r, s), h.cross(d), n.setXYZ(f + 0, h.x, h.y, h.z), n.setXYZ(f + 1, h.x, h.y, h.z), n.setXYZ(f + 2, h.x, h.y, h.z);
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
      const c = a.array, h = a.itemSize, d = a.normalized, f = new c.constructor(l.length * h);
      let m = 0, x = 0;
      for (let g = 0, p = l.length; g < p; g++) {
        a.isInterleavedBufferAttribute ? m = l[g] * a.data.stride + a.offset : m = l[g] * h;
        for (let u = 0; u < h; u++)
          f[x++] = c[m++];
      }
      return new Wt(f, h, d);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new ft(), n = this.index.array, r = this.attributes;
    for (const a in r) {
      const l = r[a], c = e(l, n);
      t.setAttribute(a, c);
    }
    const s = this.morphAttributes;
    for (const a in s) {
      const l = [], c = s[a];
      for (let h = 0, d = c.length; h < d; h++) {
        const f = c[h], m = e(f, n);
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
      for (let d = 0, f = c.length; d < f; d++) {
        const m = c[d];
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
      const h = [], d = s[c];
      for (let f = 0, m = d.length; f < m; f++)
        h.push(d[f].clone(t));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const o = e.groups;
    for (let c = 0, h = o.length; c < h; c++) {
      const d = o[c];
      this.addGroup(d.start, d.count, d.materialIndex);
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
const ja = /* @__PURE__ */ new st(), Ln = /* @__PURE__ */ new pa(), tr = /* @__PURE__ */ new Nr(), Ka = /* @__PURE__ */ new U(), nr = /* @__PURE__ */ new U(), ir = /* @__PURE__ */ new U(), rr = /* @__PURE__ */ new U(), rs = /* @__PURE__ */ new U(), sr = /* @__PURE__ */ new U(), $a = /* @__PURE__ */ new U(), ar = /* @__PURE__ */ new U();
class Vt extends yt {
  constructor(e = new ft(), t = new ma()) {
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
      sr.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const h = a[l], d = s[l];
        h !== 0 && (rs.fromBufferAttribute(d, e), o ? sr.addScaledVector(rs, h) : sr.addScaledVector(rs.sub(t), h));
      }
      t.add(sr);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), tr.copy(n.boundingSphere), tr.applyMatrix4(s), Ln.copy(e.ray).recast(e.near), !(tr.containsPoint(Ln.origin) === !1 && (Ln.intersectSphere(tr, Ka) === null || Ln.origin.distanceToSquared(Ka) > (e.far - e.near) ** 2)) && (ja.copy(s).invert(), Ln.copy(e.ray).applyMatrix4(ja), !(n.boundingBox !== null && Ln.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, Ln)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const s = this.geometry, o = this.material, a = s.index, l = s.attributes.position, c = s.attributes.uv, h = s.attributes.uv1, d = s.attributes.normal, f = s.groups, m = s.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let x = 0, g = f.length; x < g; x++) {
          const p = f[x], u = o[p.materialIndex], R = Math.max(p.start, m.start), A = Math.min(a.count, Math.min(p.start + p.count, m.start + m.count));
          for (let S = R, O = A; S < O; S += 3) {
            const w = a.getX(S), E = a.getX(S + 1), C = a.getX(S + 2);
            r = or(this, u, e, n, c, h, d, w, E, C), r && (r.faceIndex = Math.floor(S / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const x = Math.max(0, m.start), g = Math.min(a.count, m.start + m.count);
        for (let p = x, u = g; p < u; p += 3) {
          const R = a.getX(p), A = a.getX(p + 1), S = a.getX(p + 2);
          r = or(this, o, e, n, c, h, d, R, A, S), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let x = 0, g = f.length; x < g; x++) {
          const p = f[x], u = o[p.materialIndex], R = Math.max(p.start, m.start), A = Math.min(l.count, Math.min(p.start + p.count, m.start + m.count));
          for (let S = R, O = A; S < O; S += 3) {
            const w = S, E = S + 1, C = S + 2;
            r = or(this, u, e, n, c, h, d, w, E, C), r && (r.faceIndex = Math.floor(S / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const x = Math.max(0, m.start), g = Math.min(l.count, m.start + m.count);
        for (let p = x, u = g; p < u; p += 3) {
          const R = p, A = p + 1, S = p + 2;
          r = or(this, o, e, n, c, h, d, R, A, S), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
  }
}
function ph(i, e, t, n, r, s, o, a) {
  let l;
  if (e.side === Tt ? l = n.intersectTriangle(o, s, r, !0, a) : l = n.intersectTriangle(r, s, o, e.side === Tn, a), l === null) return null;
  ar.copy(a), ar.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(ar);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: ar.clone(),
    object: i
  };
}
function or(i, e, t, n, r, s, o, a, l, c) {
  i.getVertexPosition(a, nr), i.getVertexPosition(l, ir), i.getVertexPosition(c, rr);
  const h = ph(i, e, t, n, nr, ir, rr, $a);
  if (h) {
    const d = new U();
    Ut.getBarycoord($a, nr, ir, rr, d), r && (h.uv = Ut.getInterpolatedAttribute(r, a, l, c, d, new Ae())), s && (h.uv1 = Ut.getInterpolatedAttribute(s, a, l, c, d, new Ae())), o && (h.normal = Ut.getInterpolatedAttribute(o, a, l, c, d, new U()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const f = {
      a,
      b: l,
      c,
      normal: new U(),
      materialIndex: 0
    };
    Ut.getNormal(nr, ir, rr, f.normal), h.face = f, h.barycoord = d;
  }
  return h;
}
class Hi extends ft {
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
    const l = [], c = [], h = [], d = [];
    let f = 0, m = 0;
    x("z", "y", "x", -1, -1, n, t, e, o, s, 0), x("z", "y", "x", 1, -1, n, t, -e, o, s, 1), x("x", "z", "y", 1, 1, e, n, t, r, o, 2), x("x", "z", "y", 1, -1, e, n, -t, r, o, 3), x("x", "y", "z", 1, -1, e, t, n, r, s, 4), x("x", "y", "z", -1, -1, e, t, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new cn(c, 3)), this.setAttribute("normal", new cn(h, 3)), this.setAttribute("uv", new cn(d, 2));
    function x(g, p, u, R, A, S, O, w, E, C, y) {
      const _ = S / E, T = O / C, N = S / 2, F = O / 2, z = w / 2, W = E + 1, G = C + 1;
      let q = 0, V = 0;
      const Q = new U();
      for (let re = 0; re < G; re++) {
        const pe = re * T - F;
        for (let Ee = 0; Ee < W; Ee++) {
          const Ue = Ee * _ - N;
          Q[g] = Ue * R, Q[p] = pe * A, Q[u] = z, c.push(Q.x, Q.y, Q.z), Q[g] = 0, Q[p] = 0, Q[u] = w > 0 ? 1 : -1, h.push(Q.x, Q.y, Q.z), d.push(Ee / E), d.push(1 - re / C), q += 1;
        }
      }
      for (let re = 0; re < C; re++)
        for (let pe = 0; pe < E; pe++) {
          const Ee = f + pe + W * re, Ue = f + pe + W * (re + 1), Y = f + (pe + 1) + W * (re + 1), J = f + (pe + 1) + W * re;
          l.push(Ee, Ue, J), l.push(Ue, Y, J), V += 6;
        }
      a.addGroup(m, V, y), m += V, f += q;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Hi(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function yi(i) {
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
function xt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = yi(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function mh(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function cl(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Ge.workingColorSpace;
}
const _h = { clone: yi, merge: xt };
var gh = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, vh = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class An extends bi {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = gh, this.fragmentShader = vh, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
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
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = yi(e.uniforms), this.uniformsGroups = mh(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
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
class hl extends yt {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new st(), this.projectionMatrix = new st(), this.projectionMatrixInverse = new st(), this.coordinateSystem = on;
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
const xn = /* @__PURE__ */ new U(), Ja = /* @__PURE__ */ new Ae(), Qa = /* @__PURE__ */ new Ae();
class It extends hl {
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
    this.fov = ra * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(br * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return ra * 2 * Math.atan(
      Math.tan(br * 0.5 * this.fov) / this.zoom
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
    xn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(xn.x, xn.y).multiplyScalar(-e / xn.z), xn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(xn.x, xn.y).multiplyScalar(-e / xn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, Ja, Qa), t.subVectors(Qa, Ja);
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
    let t = e * Math.tan(br * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, s = -0.5 * r;
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
const ri = -90, si = 1;
class xh extends yt {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new It(ri, si, e, t);
    r.layers = this.layers, this.add(r);
    const s = new It(ri, si, e, t);
    s.layers = this.layers, this.add(s);
    const o = new It(ri, si, e, t);
    o.layers = this.layers, this.add(o);
    const a = new It(ri, si, e, t);
    a.layers = this.layers, this.add(a);
    const l = new It(ri, si, e, t);
    l.layers = this.layers, this.add(l);
    const c = new It(ri, si, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, s, o, a, l] = t;
    for (const c of t) this.remove(c);
    if (e === on)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === wr)
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
    const [s, o, a, l, c, h] = this.children, d = e.getRenderTarget(), f = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), x = e.xr.enabled;
    e.xr.enabled = !1;
    const g = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, r), e.render(t, s), e.setRenderTarget(n, 1, r), e.render(t, o), e.setRenderTarget(n, 2, r), e.render(t, a), e.setRenderTarget(n, 3, r), e.render(t, l), e.setRenderTarget(n, 4, r), e.render(t, c), n.texture.generateMipmaps = g, e.setRenderTarget(n, 5, r), e.render(t, h), e.setRenderTarget(d, f, m), e.xr.enabled = x, n.texture.needsPMREMUpdate = !0;
  }
}
class ul extends St {
  constructor(e, t, n, r, s, o, a, l, c, h) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : vi, super(e, t, n, r, s, o, a, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Mh extends Gn {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new ul(r, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : Nt;
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
    }, r = new Hi(5, 5, 5), s = new An({
      name: "CubemapFromEquirect",
      uniforms: yi(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Tt,
      blending: yn
    });
    s.uniforms.tEquirect.value = t;
    const o = new Vt(r, s), a = t.minFilter;
    return t.minFilter === kn && (t.minFilter = Nt), new xh(1, 10, this).update(e, o), t.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(e, t, n, r) {
    const s = e.getRenderTarget();
    for (let o = 0; o < 6; o++)
      e.setRenderTarget(this, o), e.clear(t, n, r);
    e.setRenderTarget(s);
  }
}
const ss = /* @__PURE__ */ new U(), Sh = /* @__PURE__ */ new U(), yh = /* @__PURE__ */ new Le();
class Mn {
  constructor(e = new U(1, 0, 0), t = 0) {
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
    const r = ss.subVectors(n, t).cross(Sh.subVectors(e, t)).normalize();
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
    const n = e.delta(ss), r = this.normal.dot(n);
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
    const n = t || yh.getNormalMatrix(e), r = this.coplanarPoint(ss).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
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
const Dn = /* @__PURE__ */ new Nr(), lr = /* @__PURE__ */ new U();
class dl {
  constructor(e = new Mn(), t = new Mn(), n = new Mn(), r = new Mn(), s = new Mn(), o = new Mn()) {
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
  setFromProjectionMatrix(e, t = on) {
    const n = this.planes, r = e.elements, s = r[0], o = r[1], a = r[2], l = r[3], c = r[4], h = r[5], d = r[6], f = r[7], m = r[8], x = r[9], g = r[10], p = r[11], u = r[12], R = r[13], A = r[14], S = r[15];
    if (n[0].setComponents(l - s, f - c, p - m, S - u).normalize(), n[1].setComponents(l + s, f + c, p + m, S + u).normalize(), n[2].setComponents(l + o, f + h, p + x, S + R).normalize(), n[3].setComponents(l - o, f - h, p - x, S - R).normalize(), n[4].setComponents(l - a, f - d, p - g, S - A).normalize(), t === on)
      n[5].setComponents(l + a, f + d, p + g, S + A).normalize();
    else if (t === wr)
      n[5].setComponents(a, d, g, A).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), Dn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), Dn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(Dn);
  }
  intersectsSprite(e) {
    return Dn.center.set(0, 0, 0), Dn.radius = 0.7071067811865476, Dn.applyMatrix4(e.matrixWorld), this.intersectsSphere(Dn);
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
      if (lr.x = r.normal.x > 0 ? e.max.x : e.min.x, lr.y = r.normal.y > 0 ? e.max.y : e.min.y, lr.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(lr) < 0)
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
function fl() {
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
function Eh(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(a, l) {
    const c = a.array, h = a.usage, d = c.byteLength, f = i.createBuffer();
    i.bindBuffer(l, f), i.bufferData(l, c, h), a.onUploadCallback();
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
      buffer: f,
      type: m,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: a.version,
      size: d
    };
  }
  function n(a, l, c) {
    const h = l.array, d = l.updateRanges;
    if (i.bindBuffer(c, a), d.length === 0)
      i.bufferSubData(c, 0, h);
    else {
      d.sort((m, x) => m.start - x.start);
      let f = 0;
      for (let m = 1; m < d.length; m++) {
        const x = d[f], g = d[m];
        g.start <= x.start + x.count + 1 ? x.count = Math.max(
          x.count,
          g.start + g.count - x.start
        ) : (++f, d[f] = g);
      }
      d.length = f + 1;
      for (let m = 0, x = d.length; m < x; m++) {
        const g = d[m];
        i.bufferSubData(
          c,
          g.start * h.BYTES_PER_ELEMENT,
          h,
          g.start,
          g.count
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
class Vi extends ft {
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const s = e / 2, o = t / 2, a = Math.floor(n), l = Math.floor(r), c = a + 1, h = l + 1, d = e / a, f = t / l, m = [], x = [], g = [], p = [];
    for (let u = 0; u < h; u++) {
      const R = u * f - o;
      for (let A = 0; A < c; A++) {
        const S = A * d - s;
        x.push(S, -R, 0), g.push(0, 0, 1), p.push(A / a), p.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++)
      for (let R = 0; R < a; R++) {
        const A = R + c * u, S = R + c * (u + 1), O = R + 1 + c * (u + 1), w = R + 1 + c * u;
        m.push(A, S, w), m.push(S, O, w);
      }
    this.setIndex(m), this.setAttribute("position", new cn(x, 3)), this.setAttribute("normal", new cn(g, 3)), this.setAttribute("uv", new cn(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Vi(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var bh = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Th = `#ifdef USE_ALPHAHASH
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
#endif`, Ah = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, wh = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Rh = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Ch = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Ph = `#ifdef USE_AOMAP
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
#endif`, Lh = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Dh = `#ifdef USE_BATCHING
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
#endif`, Ih = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Uh = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Nh = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Fh = `float G_BlinnPhong_Implicit( ) {
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
} // validated`, Oh = `#ifdef USE_IRIDESCENCE
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
#endif`, Bh = `#ifdef USE_BUMPMAP
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
#endif`, zh = `#if NUM_CLIPPING_PLANES > 0
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
#endif`, kh = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Hh = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Vh = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Gh = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Wh = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Xh = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, Yh = `#if defined( USE_COLOR_ALPHA )
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
#endif`, qh = `#define PI 3.141592653589793
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
} // validated`, Zh = `#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`, jh = `vec3 transformedNormal = objectNormal;
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
#endif`, Kh = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, $h = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Jh = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Qh = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, eu = "gl_FragColor = linearToOutputTexel( gl_FragColor );", tu = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, nu = `#ifdef USE_ENVMAP
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
#endif`, iu = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, ru = `#ifdef USE_ENVMAP
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
#endif`, su = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, au = `#ifdef USE_ENVMAP
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
#endif`, ou = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, lu = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, cu = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, hu = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, uu = `#ifdef USE_GRADIENTMAP
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
}`, du = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, fu = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, pu = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, mu = `uniform bool receiveShadow;
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
#endif`, _u = `#ifdef USE_ENVMAP
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
#endif`, gu = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, vu = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, xu = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Mu = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Su = `PhysicalMaterial material;
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
#endif`, yu = `struct PhysicalMaterial {
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
}`, Eu = `
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
#endif`, bu = `#if defined( RE_IndirectDiffuse )
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
#endif`, Tu = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Au = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, wu = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Ru = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Cu = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Pu = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Lu = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Du = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`, Iu = `#if defined( USE_POINTS_UV )
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
#endif`, Uu = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Nu = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Fu = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Ou = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Bu = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, zu = `#ifdef USE_MORPHTARGETS
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
#endif`, ku = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Hu = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`, Vu = `#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`, Gu = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Wu = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Xu = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Yu = `#ifdef USE_NORMALMAP
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
#endif`, qu = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Zu = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, ju = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Ku = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, $u = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Ju = `vec3 packNormalToRGB( const in vec3 normal ) {
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
}`, Qu = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, ed = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, td = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, nd = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, id = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, rd = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, sd = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, ad = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, od = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`, ld = `float getShadowMask() {
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
}`, cd = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, hd = `#ifdef USE_SKINNING
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
#endif`, ud = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, dd = `#ifdef USE_SKINNING
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
#endif`, fd = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, pd = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, md = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, _d = `#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`, gd = `#ifdef USE_TRANSMISSION
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
#endif`, vd = `#ifdef USE_TRANSMISSION
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
#endif`, xd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Md = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Sd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, yd = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Ed = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, bd = `uniform sampler2D t2D;
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
}`, Td = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Ad = `#ifdef ENVMAP_TYPE_CUBE
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
}`, wd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Rd = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Cd = `#include <common>
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
}`, Pd = `#if DEPTH_PACKING == 3200
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
}`, Ld = `#define DISTANCE
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
}`, Dd = `#define DISTANCE
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
}`, Id = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Ud = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Nd = `uniform float scale;
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
}`, Fd = `uniform vec3 diffuse;
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
}`, Od = `#include <common>
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
}`, Bd = `uniform vec3 diffuse;
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
}`, zd = `#define LAMBERT
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
}`, kd = `#define LAMBERT
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
}`, Hd = `#define MATCAP
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
}`, Vd = `#define MATCAP
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
}`, Gd = `#define NORMAL
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
}`, Wd = `#define NORMAL
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
}`, Xd = `#define PHONG
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
}`, Yd = `#define PHONG
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
}`, qd = `#define STANDARD
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
}`, Zd = `#define STANDARD
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
}`, jd = `#define TOON
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
}`, Kd = `#define TOON
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
}`, $d = `uniform float size;
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
}`, Jd = `uniform vec3 diffuse;
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
}`, Qd = `#include <common>
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
}`, ef = `uniform vec3 color;
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
}`, tf = `uniform float rotation;
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
}`, nf = `uniform vec3 diffuse;
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
  alphahash_fragment: bh,
  alphahash_pars_fragment: Th,
  alphamap_fragment: Ah,
  alphamap_pars_fragment: wh,
  alphatest_fragment: Rh,
  alphatest_pars_fragment: Ch,
  aomap_fragment: Ph,
  aomap_pars_fragment: Lh,
  batching_pars_vertex: Dh,
  batching_vertex: Ih,
  begin_vertex: Uh,
  beginnormal_vertex: Nh,
  bsdfs: Fh,
  iridescence_fragment: Oh,
  bumpmap_pars_fragment: Bh,
  clipping_planes_fragment: zh,
  clipping_planes_pars_fragment: kh,
  clipping_planes_pars_vertex: Hh,
  clipping_planes_vertex: Vh,
  color_fragment: Gh,
  color_pars_fragment: Wh,
  color_pars_vertex: Xh,
  color_vertex: Yh,
  common: qh,
  cube_uv_reflection_fragment: Zh,
  defaultnormal_vertex: jh,
  displacementmap_pars_vertex: Kh,
  displacementmap_vertex: $h,
  emissivemap_fragment: Jh,
  emissivemap_pars_fragment: Qh,
  colorspace_fragment: eu,
  colorspace_pars_fragment: tu,
  envmap_fragment: nu,
  envmap_common_pars_fragment: iu,
  envmap_pars_fragment: ru,
  envmap_pars_vertex: su,
  envmap_physical_pars_fragment: _u,
  envmap_vertex: au,
  fog_vertex: ou,
  fog_pars_vertex: lu,
  fog_fragment: cu,
  fog_pars_fragment: hu,
  gradientmap_pars_fragment: uu,
  lightmap_pars_fragment: du,
  lights_lambert_fragment: fu,
  lights_lambert_pars_fragment: pu,
  lights_pars_begin: mu,
  lights_toon_fragment: gu,
  lights_toon_pars_fragment: vu,
  lights_phong_fragment: xu,
  lights_phong_pars_fragment: Mu,
  lights_physical_fragment: Su,
  lights_physical_pars_fragment: yu,
  lights_fragment_begin: Eu,
  lights_fragment_maps: bu,
  lights_fragment_end: Tu,
  logdepthbuf_fragment: Au,
  logdepthbuf_pars_fragment: wu,
  logdepthbuf_pars_vertex: Ru,
  logdepthbuf_vertex: Cu,
  map_fragment: Pu,
  map_pars_fragment: Lu,
  map_particle_fragment: Du,
  map_particle_pars_fragment: Iu,
  metalnessmap_fragment: Uu,
  metalnessmap_pars_fragment: Nu,
  morphinstance_vertex: Fu,
  morphcolor_vertex: Ou,
  morphnormal_vertex: Bu,
  morphtarget_pars_vertex: zu,
  morphtarget_vertex: ku,
  normal_fragment_begin: Hu,
  normal_fragment_maps: Vu,
  normal_pars_fragment: Gu,
  normal_pars_vertex: Wu,
  normal_vertex: Xu,
  normalmap_pars_fragment: Yu,
  clearcoat_normal_fragment_begin: qu,
  clearcoat_normal_fragment_maps: Zu,
  clearcoat_pars_fragment: ju,
  iridescence_pars_fragment: Ku,
  opaque_fragment: $u,
  packing: Ju,
  premultiplied_alpha_fragment: Qu,
  project_vertex: ed,
  dithering_fragment: td,
  dithering_pars_fragment: nd,
  roughnessmap_fragment: id,
  roughnessmap_pars_fragment: rd,
  shadowmap_pars_fragment: sd,
  shadowmap_pars_vertex: ad,
  shadowmap_vertex: od,
  shadowmask_pars_fragment: ld,
  skinbase_vertex: cd,
  skinning_pars_vertex: hd,
  skinning_vertex: ud,
  skinnormal_vertex: dd,
  specularmap_fragment: fd,
  specularmap_pars_fragment: pd,
  tonemapping_fragment: md,
  tonemapping_pars_fragment: _d,
  transmission_fragment: gd,
  transmission_pars_fragment: vd,
  uv_pars_fragment: xd,
  uv_pars_vertex: Md,
  uv_vertex: Sd,
  worldpos_vertex: yd,
  background_vert: Ed,
  background_frag: bd,
  backgroundCube_vert: Td,
  backgroundCube_frag: Ad,
  cube_vert: wd,
  cube_frag: Rd,
  depth_vert: Cd,
  depth_frag: Pd,
  distanceRGBA_vert: Ld,
  distanceRGBA_frag: Dd,
  equirect_vert: Id,
  equirect_frag: Ud,
  linedashed_vert: Nd,
  linedashed_frag: Fd,
  meshbasic_vert: Od,
  meshbasic_frag: Bd,
  meshlambert_vert: zd,
  meshlambert_frag: kd,
  meshmatcap_vert: Hd,
  meshmatcap_frag: Vd,
  meshnormal_vert: Gd,
  meshnormal_frag: Wd,
  meshphong_vert: Xd,
  meshphong_frag: Yd,
  meshphysical_vert: qd,
  meshphysical_frag: Zd,
  meshtoon_vert: jd,
  meshtoon_frag: Kd,
  points_vert: $d,
  points_frag: Jd,
  shadow_vert: Qd,
  shadow_frag: ef,
  sprite_vert: tf,
  sprite_frag: nf
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
    normalScale: { value: /* @__PURE__ */ new Ae(1, 1) }
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
    center: { value: /* @__PURE__ */ new Ae(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  }
}, qt = {
  basic: {
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
      ie.points,
      ie.fog
    ]),
    vertexShader: Ie.points_vert,
    fragmentShader: Ie.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
      ie.common,
      ie.displacementmap
    ]),
    vertexShader: Ie.depth_vert,
    fragmentShader: Ie.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
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
    uniforms: /* @__PURE__ */ xt([
      ie.common,
      ie.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new U() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ie.distanceRGBA_vert,
    fragmentShader: Ie.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ xt([
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
qt.physical = {
  uniforms: /* @__PURE__ */ xt([
    qt.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Ae(1, 1) },
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
      transmissionSamplerSize: { value: /* @__PURE__ */ new Ae() },
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
      anisotropyVector: { value: /* @__PURE__ */ new Ae() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Le() }
    }
  ]),
  vertexShader: Ie.meshphysical_vert,
  fragmentShader: Ie.meshphysical_frag
};
const cr = { r: 0, b: 0, g: 0 }, In = /* @__PURE__ */ new un(), rf = /* @__PURE__ */ new st();
function sf(i, e, t, n, r, s, o) {
  const a = new Xe(0);
  let l = s === !0 ? 0 : 1, c, h, d = null, f = 0, m = null;
  function x(R) {
    let A = R.isScene === !0 ? R.background : null;
    return A && A.isTexture && (A = (R.backgroundBlurriness > 0 ? t : e).get(A)), A;
  }
  function g(R) {
    let A = !1;
    const S = x(R);
    S === null ? u(a, l) : S && S.isColor && (u(S, 1), A = !0);
    const O = i.xr.getEnvironmentBlendMode();
    O === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : O === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || A) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(R, A) {
    const S = x(A);
    S && (S.isCubeTexture || S.mapping === Ir) ? (h === void 0 && (h = new Vt(
      new Hi(1, 1, 1),
      new An({
        name: "BackgroundCubeMaterial",
        uniforms: yi(qt.backgroundCube.uniforms),
        vertexShader: qt.backgroundCube.vertexShader,
        fragmentShader: qt.backgroundCube.fragmentShader,
        side: Tt,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(O, w, E) {
      this.matrixWorld.copyPosition(E.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(h)), In.copy(A.backgroundRotation), In.x *= -1, In.y *= -1, In.z *= -1, S.isCubeTexture && S.isRenderTargetTexture === !1 && (In.y *= -1, In.z *= -1), h.material.uniforms.envMap.value = S, h.material.uniforms.flipEnvMap.value = S.isCubeTexture && S.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = A.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(rf.makeRotationFromEuler(In)), h.material.toneMapped = Ge.getTransfer(S.colorSpace) !== je, (d !== S || f !== S.version || m !== i.toneMapping) && (h.material.needsUpdate = !0, d = S, f = S.version, m = i.toneMapping), h.layers.enableAll(), R.unshift(h, h.geometry, h.material, 0, 0, null)) : S && S.isTexture && (c === void 0 && (c = new Vt(
      new Vi(2, 2),
      new An({
        name: "BackgroundMaterial",
        uniforms: yi(qt.background.uniforms),
        vertexShader: qt.background.vertexShader,
        fragmentShader: qt.background.fragmentShader,
        side: Tn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = S, c.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, c.material.toneMapped = Ge.getTransfer(S.colorSpace) !== je, S.matrixAutoUpdate === !0 && S.updateMatrix(), c.material.uniforms.uvTransform.value.copy(S.matrix), (d !== S || f !== S.version || m !== i.toneMapping) && (c.material.needsUpdate = !0, d = S, f = S.version, m = i.toneMapping), c.layers.enableAll(), R.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function u(R, A) {
    R.getRGB(cr, cl(i)), n.buffers.color.setClear(cr.r, cr.g, cr.b, A, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(R, A = 1) {
      a.set(R), l = A, u(a, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(R) {
      l = R, u(a, l);
    },
    render: g,
    addToRenderList: p
  };
}
function af(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = f(null);
  let s = r, o = !1;
  function a(_, T, N, F, z) {
    let W = !1;
    const G = d(F, N, T);
    s !== G && (s = G, c(s.object)), W = m(_, F, N, z), W && x(_, F, N, z), z !== null && e.update(z, i.ELEMENT_ARRAY_BUFFER), (W || o) && (o = !1, S(_, T, N, F), z !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(z).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(_) {
    return i.bindVertexArray(_);
  }
  function h(_) {
    return i.deleteVertexArray(_);
  }
  function d(_, T, N) {
    const F = N.wireframe === !0;
    let z = n[_.id];
    z === void 0 && (z = {}, n[_.id] = z);
    let W = z[T.id];
    W === void 0 && (W = {}, z[T.id] = W);
    let G = W[F];
    return G === void 0 && (G = f(l()), W[F] = G), G;
  }
  function f(_) {
    const T = [], N = [], F = [];
    for (let z = 0; z < t; z++)
      T[z] = 0, N[z] = 0, F[z] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: T,
      enabledAttributes: N,
      attributeDivisors: F,
      object: _,
      attributes: {},
      index: null
    };
  }
  function m(_, T, N, F) {
    const z = s.attributes, W = T.attributes;
    let G = 0;
    const q = N.getAttributes();
    for (const V in q)
      if (q[V].location >= 0) {
        const re = z[V];
        let pe = W[V];
        if (pe === void 0 && (V === "instanceMatrix" && _.instanceMatrix && (pe = _.instanceMatrix), V === "instanceColor" && _.instanceColor && (pe = _.instanceColor)), re === void 0 || re.attribute !== pe || pe && re.data !== pe.data) return !0;
        G++;
      }
    return s.attributesNum !== G || s.index !== F;
  }
  function x(_, T, N, F) {
    const z = {}, W = T.attributes;
    let G = 0;
    const q = N.getAttributes();
    for (const V in q)
      if (q[V].location >= 0) {
        let re = W[V];
        re === void 0 && (V === "instanceMatrix" && _.instanceMatrix && (re = _.instanceMatrix), V === "instanceColor" && _.instanceColor && (re = _.instanceColor));
        const pe = {};
        pe.attribute = re, re && re.data && (pe.data = re.data), z[V] = pe, G++;
      }
    s.attributes = z, s.attributesNum = G, s.index = F;
  }
  function g() {
    const _ = s.newAttributes;
    for (let T = 0, N = _.length; T < N; T++)
      _[T] = 0;
  }
  function p(_) {
    u(_, 0);
  }
  function u(_, T) {
    const N = s.newAttributes, F = s.enabledAttributes, z = s.attributeDivisors;
    N[_] = 1, F[_] === 0 && (i.enableVertexAttribArray(_), F[_] = 1), z[_] !== T && (i.vertexAttribDivisor(_, T), z[_] = T);
  }
  function R() {
    const _ = s.newAttributes, T = s.enabledAttributes;
    for (let N = 0, F = T.length; N < F; N++)
      T[N] !== _[N] && (i.disableVertexAttribArray(N), T[N] = 0);
  }
  function A(_, T, N, F, z, W, G) {
    G === !0 ? i.vertexAttribIPointer(_, T, N, z, W) : i.vertexAttribPointer(_, T, N, F, z, W);
  }
  function S(_, T, N, F) {
    g();
    const z = F.attributes, W = N.getAttributes(), G = T.defaultAttributeValues;
    for (const q in W) {
      const V = W[q];
      if (V.location >= 0) {
        let Q = z[q];
        if (Q === void 0 && (q === "instanceMatrix" && _.instanceMatrix && (Q = _.instanceMatrix), q === "instanceColor" && _.instanceColor && (Q = _.instanceColor)), Q !== void 0) {
          const re = Q.normalized, pe = Q.itemSize, Ee = e.get(Q);
          if (Ee === void 0) continue;
          const Ue = Ee.buffer, Y = Ee.type, J = Ee.bytesPerElement, he = Y === i.INT || Y === i.UNSIGNED_INT || Q.gpuType === la;
          if (Q.isInterleavedBufferAttribute) {
            const ne = Q.data, be = ne.stride, Re = Q.offset;
            if (ne.isInstancedInterleavedBuffer) {
              for (let Ne = 0; Ne < V.locationSize; Ne++)
                u(V.location + Ne, ne.meshPerAttribute);
              _.isInstancedMesh !== !0 && F._maxInstanceCount === void 0 && (F._maxInstanceCount = ne.meshPerAttribute * ne.count);
            } else
              for (let Ne = 0; Ne < V.locationSize; Ne++)
                p(V.location + Ne);
            i.bindBuffer(i.ARRAY_BUFFER, Ue);
            for (let Ne = 0; Ne < V.locationSize; Ne++)
              A(
                V.location + Ne,
                pe / V.locationSize,
                Y,
                re,
                be * J,
                (Re + pe / V.locationSize * Ne) * J,
                he
              );
          } else {
            if (Q.isInstancedBufferAttribute) {
              for (let ne = 0; ne < V.locationSize; ne++)
                u(V.location + ne, Q.meshPerAttribute);
              _.isInstancedMesh !== !0 && F._maxInstanceCount === void 0 && (F._maxInstanceCount = Q.meshPerAttribute * Q.count);
            } else
              for (let ne = 0; ne < V.locationSize; ne++)
                p(V.location + ne);
            i.bindBuffer(i.ARRAY_BUFFER, Ue);
            for (let ne = 0; ne < V.locationSize; ne++)
              A(
                V.location + ne,
                pe / V.locationSize,
                Y,
                re,
                pe * J,
                pe / V.locationSize * ne * J,
                he
              );
          }
        } else if (G !== void 0) {
          const re = G[q];
          if (re !== void 0)
            switch (re.length) {
              case 2:
                i.vertexAttrib2fv(V.location, re);
                break;
              case 3:
                i.vertexAttrib3fv(V.location, re);
                break;
              case 4:
                i.vertexAttrib4fv(V.location, re);
                break;
              default:
                i.vertexAttrib1fv(V.location, re);
            }
        }
      }
    }
    R();
  }
  function O() {
    C();
    for (const _ in n) {
      const T = n[_];
      for (const N in T) {
        const F = T[N];
        for (const z in F)
          h(F[z].object), delete F[z];
        delete T[N];
      }
      delete n[_];
    }
  }
  function w(_) {
    if (n[_.id] === void 0) return;
    const T = n[_.id];
    for (const N in T) {
      const F = T[N];
      for (const z in F)
        h(F[z].object), delete F[z];
      delete T[N];
    }
    delete n[_.id];
  }
  function E(_) {
    for (const T in n) {
      const N = n[T];
      if (N[_.id] === void 0) continue;
      const F = N[_.id];
      for (const z in F)
        h(F[z].object), delete F[z];
      delete N[_.id];
    }
  }
  function C() {
    y(), o = !0, s !== r && (s = r, c(s.object));
  }
  function y() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: a,
    reset: C,
    resetDefaultState: y,
    dispose: O,
    releaseStatesOfGeometry: w,
    releaseStatesOfProgram: E,
    initAttributes: g,
    enableAttribute: p,
    disableUnusedAttributes: R
  };
}
function of(i, e, t) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, h) {
    i.drawArrays(n, c, h), t.update(h, n, 1);
  }
  function o(c, h, d) {
    d !== 0 && (i.drawArraysInstanced(n, c, h, d), t.update(h, n, d));
  }
  function a(c, h, d) {
    if (d === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, d);
    let m = 0;
    for (let x = 0; x < d; x++)
      m += h[x];
    t.update(m, n, 1);
  }
  function l(c, h, d, f) {
    if (d === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let x = 0; x < c.length; x++)
        o(c[x], h[x], f[x]);
    else {
      m.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, f, 0, d);
      let x = 0;
      for (let g = 0; g < d; g++)
        x += h[g] * f[g];
      t.update(x, n, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = l;
}
function lf(i, e, t, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const E = e.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function o(E) {
    return !(E !== Ht && n.convert(E) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(E) {
    const C = E === zi && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(E !== hn && n.convert(E) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    E !== an && !C);
  }
  function l(E) {
    if (E === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      E = "mediump";
    }
    return E === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = t.precision !== void 0 ? t.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const d = t.logarithmicDepthBuffer === !0, f = t.reverseDepthBuffer === !0 && e.has("EXT_clip_control"), m = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), x = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), u = i.getParameter(i.MAX_VERTEX_ATTRIBS), R = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), A = i.getParameter(i.MAX_VARYING_VECTORS), S = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), O = x > 0, w = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: c,
    logarithmicDepthBuffer: d,
    reverseDepthBuffer: f,
    maxTextures: m,
    maxVertexTextures: x,
    maxTextureSize: g,
    maxCubemapSize: p,
    maxAttributes: u,
    maxVertexUniforms: R,
    maxVaryings: A,
    maxFragmentUniforms: S,
    vertexTextures: O,
    maxSamples: w
  };
}
function cf(i) {
  const e = this;
  let t = null, n = 0, r = !1, s = !1;
  const o = new Mn(), a = new Le(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, f) {
    const m = d.length !== 0 || f || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = f, n = d.length, m;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(d, f) {
    t = h(d, f, 0);
  }, this.setState = function(d, f, m) {
    const x = d.clippingPlanes, g = d.clipIntersection, p = d.clipShadows, u = i.get(d);
    if (!r || x === null || x.length === 0 || s && !p)
      s ? h(null) : c();
    else {
      const R = s ? 0 : n, A = R * 4;
      let S = u.clippingState || null;
      l.value = S, S = h(x, f, A, m);
      for (let O = 0; O !== A; ++O)
        S[O] = t[O];
      u.clippingState = S, this.numIntersection = g ? this.numPlanes : 0, this.numPlanes += R;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(d, f, m, x) {
    const g = d !== null ? d.length : 0;
    let p = null;
    if (g !== 0) {
      if (p = l.value, x !== !0 || p === null) {
        const u = m + g * 4, R = f.matrixWorldInverse;
        a.getNormalMatrix(R), (p === null || p.length < u) && (p = new Float32Array(u));
        for (let A = 0, S = m; A !== g; ++A, S += 4)
          o.copy(d[A]).applyMatrix4(R, a), o.normal.toArray(p, S), p[S + 3] = o.constant;
      }
      l.value = p, l.needsUpdate = !0;
    }
    return e.numPlanes = g, e.numIntersection = 0, p;
  }
}
function hf(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(o, a) {
    return a === ws ? o.mapping = vi : a === Rs && (o.mapping = xi), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === ws || a === Rs)
        if (e.has(o)) {
          const l = e.get(o).texture;
          return t(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const c = new Mh(l.height);
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
class pl extends hl {
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
const di = 4, eo = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Bn = 20, as = /* @__PURE__ */ new pl(), to = /* @__PURE__ */ new Xe();
let os = null, ls = 0, cs = 0, hs = !1;
const Fn = (1 + Math.sqrt(5)) / 2, ai = 1 / Fn, no = [
  /* @__PURE__ */ new U(-Fn, ai, 0),
  /* @__PURE__ */ new U(Fn, ai, 0),
  /* @__PURE__ */ new U(-ai, 0, Fn),
  /* @__PURE__ */ new U(ai, 0, Fn),
  /* @__PURE__ */ new U(0, Fn, -ai),
  /* @__PURE__ */ new U(0, Fn, ai),
  /* @__PURE__ */ new U(-1, 1, -1),
  /* @__PURE__ */ new U(1, 1, -1),
  /* @__PURE__ */ new U(-1, 1, 1),
  /* @__PURE__ */ new U(1, 1, 1)
];
class io {
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
    os = this._renderer.getRenderTarget(), ls = this._renderer.getActiveCubeFace(), cs = this._renderer.getActiveMipmapLevel(), hs = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
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
    this._cubemapMaterial === null && (this._cubemapMaterial = ao(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = so(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(os, ls, cs), this._renderer.xr.enabled = hs, e.scissorTest = !1, hr(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === vi || e.mapping === xi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), os = this._renderer.getRenderTarget(), ls = this._renderer.getActiveCubeFace(), cs = this._renderer.getActiveMipmapLevel(), hs = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: Nt,
      minFilter: Nt,
      generateMipmaps: !1,
      type: zi,
      format: Ht,
      colorSpace: Ei,
      depthBuffer: !1
    }, r = ro(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ro(e, t, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = uf(s)), this._blurMaterial = df(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Vt(this._lodPlanes[0], e);
    this._renderer.compile(t, as);
  }
  _sceneToCubeUV(e, t, n, r) {
    const a = new It(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, d = h.autoClear, f = h.toneMapping;
    h.getClearColor(to), h.toneMapping = En, h.autoClear = !1;
    const m = new ma({
      name: "PMREM.Background",
      side: Tt,
      depthWrite: !1,
      depthTest: !1
    }), x = new Vt(new Hi(), m);
    let g = !1;
    const p = e.background;
    p ? p.isColor && (m.color.copy(p), e.background = null, g = !0) : (m.color.copy(to), g = !0);
    for (let u = 0; u < 6; u++) {
      const R = u % 3;
      R === 0 ? (a.up.set(0, l[u], 0), a.lookAt(c[u], 0, 0)) : R === 1 ? (a.up.set(0, 0, l[u]), a.lookAt(0, c[u], 0)) : (a.up.set(0, l[u], 0), a.lookAt(0, 0, c[u]));
      const A = this._cubeSize;
      hr(r, R * A, u > 2 ? A : 0, A, A), h.setRenderTarget(r), g && h.render(x, a), h.render(e, a);
    }
    x.geometry.dispose(), x.material.dispose(), h.toneMapping = f, h.autoClear = d, e.background = p;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === vi || e.mapping === xi;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = ao()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = so());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, o = new Vt(this._lodPlanes[0], s), a = s.uniforms;
    a.envMap.value = e;
    const l = this._cubeSize;
    hr(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(o, as);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const o = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), a = no[(r - s - 1) % no.length];
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
    const h = 3, d = new Vt(this._lodPlanes[r], c), f = c.uniforms, m = this._sizeLods[n] - 1, x = isFinite(s) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * Bn - 1), g = s / x, p = isFinite(s) ? 1 + Math.floor(h * g) : Bn;
    p > Bn && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Bn}`);
    const u = [];
    let R = 0;
    for (let E = 0; E < Bn; ++E) {
      const C = E / g, y = Math.exp(-C * C / 2);
      u.push(y), E === 0 ? R += y : E < p && (R += 2 * y);
    }
    for (let E = 0; E < u.length; E++)
      u[E] = u[E] / R;
    f.envMap.value = e.texture, f.samples.value = p, f.weights.value = u, f.latitudinal.value = o === "latitudinal", a && (f.poleAxis.value = a);
    const { _lodMax: A } = this;
    f.dTheta.value = x, f.mipInt.value = A - n;
    const S = this._sizeLods[r], O = 3 * S * (r > A - di ? r - A + di : 0), w = 4 * (this._cubeSize - S);
    hr(t, O, w, 3 * S, 2 * S), l.setRenderTarget(t), l.render(d, as);
  }
}
function uf(i) {
  const e = [], t = [], n = [];
  let r = i;
  const s = i - di + 1 + eo.length;
  for (let o = 0; o < s; o++) {
    const a = Math.pow(2, r);
    t.push(a);
    let l = 1 / a;
    o > i - di ? l = eo[o - i + di - 1] : o === 0 && (l = 0), n.push(l);
    const c = 1 / (a - 2), h = -c, d = 1 + c, f = [h, h, d, h, d, d, h, h, d, d, h, d], m = 6, x = 6, g = 3, p = 2, u = 1, R = new Float32Array(g * x * m), A = new Float32Array(p * x * m), S = new Float32Array(u * x * m);
    for (let w = 0; w < m; w++) {
      const E = w % 3 * 2 / 3 - 1, C = w > 2 ? 0 : -1, y = [
        E,
        C,
        0,
        E + 2 / 3,
        C,
        0,
        E + 2 / 3,
        C + 1,
        0,
        E,
        C,
        0,
        E + 2 / 3,
        C + 1,
        0,
        E,
        C + 1,
        0
      ];
      R.set(y, g * x * w), A.set(f, p * x * w);
      const _ = [w, w, w, w, w, w];
      S.set(_, u * x * w);
    }
    const O = new ft();
    O.setAttribute("position", new Wt(R, g)), O.setAttribute("uv", new Wt(A, p)), O.setAttribute("faceIndex", new Wt(S, u)), e.push(O), r > di && r--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function ro(i, e, t) {
  const n = new Gn(i, e, t);
  return n.texture.mapping = Ir, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function hr(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function df(i, e, t) {
  const n = new Float32Array(Bn), r = new U(0, 1, 0);
  return new An({
    name: "SphericalGaussianBlur",
    defines: {
      n: Bn,
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
    vertexShader: _a(),
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
    blending: yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function so() {
  return new An({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: _a(),
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
    blending: yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function ao() {
  return new An({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: _a(),
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
    blending: yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function _a() {
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
function ff(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(a) {
    if (a && a.isTexture) {
      const l = a.mapping, c = l === ws || l === Rs, h = l === vi || l === xi;
      if (c || h) {
        let d = e.get(a);
        const f = d !== void 0 ? d.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== f)
          return t === null && (t = new io(i)), d = c ? t.fromEquirectangular(a, d) : t.fromCubemap(a, d), d.texture.pmremVersion = a.pmremVersion, e.set(a, d), d.texture;
        if (d !== void 0)
          return d.texture;
        {
          const m = a.image;
          return c && m && m.height > 0 || h && m && r(m) ? (t === null && (t = new io(i)), d = c ? t.fromEquirectangular(a) : t.fromCubemap(a), d.texture.pmremVersion = a.pmremVersion, e.set(a, d), a.addEventListener("dispose", s), d.texture) : null;
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
function pf(i) {
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
      return r === null && Fi("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function mf(i, e, t, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function o(d) {
    const f = d.target;
    f.index !== null && e.remove(f.index);
    for (const x in f.attributes)
      e.remove(f.attributes[x]);
    for (const x in f.morphAttributes) {
      const g = f.morphAttributes[x];
      for (let p = 0, u = g.length; p < u; p++)
        e.remove(g[p]);
    }
    f.removeEventListener("dispose", o), delete r[f.id];
    const m = s.get(f);
    m && (e.remove(m), s.delete(f)), n.releaseStatesOfGeometry(f), f.isInstancedBufferGeometry === !0 && delete f._maxInstanceCount, t.memory.geometries--;
  }
  function a(d, f) {
    return r[f.id] === !0 || (f.addEventListener("dispose", o), r[f.id] = !0, t.memory.geometries++), f;
  }
  function l(d) {
    const f = d.attributes;
    for (const x in f)
      e.update(f[x], i.ARRAY_BUFFER);
    const m = d.morphAttributes;
    for (const x in m) {
      const g = m[x];
      for (let p = 0, u = g.length; p < u; p++)
        e.update(g[p], i.ARRAY_BUFFER);
    }
  }
  function c(d) {
    const f = [], m = d.index, x = d.attributes.position;
    let g = 0;
    if (m !== null) {
      const R = m.array;
      g = m.version;
      for (let A = 0, S = R.length; A < S; A += 3) {
        const O = R[A + 0], w = R[A + 1], E = R[A + 2];
        f.push(O, w, w, E, E, O);
      }
    } else if (x !== void 0) {
      const R = x.array;
      g = x.version;
      for (let A = 0, S = R.length / 3 - 1; A < S; A += 3) {
        const O = A + 0, w = A + 1, E = A + 2;
        f.push(O, w, w, E, E, O);
      }
    } else
      return;
    const p = new (nl(f) ? ll : ol)(f, 1);
    p.version = g;
    const u = s.get(d);
    u && e.remove(u), s.set(d, p);
  }
  function h(d) {
    const f = s.get(d);
    if (f) {
      const m = d.index;
      m !== null && f.version < m.version && c(d);
    } else
      c(d);
    return s.get(d);
  }
  return {
    get: a,
    update: l,
    getWireframeAttribute: h
  };
}
function _f(i, e, t) {
  let n;
  function r(f) {
    n = f;
  }
  let s, o;
  function a(f) {
    s = f.type, o = f.bytesPerElement;
  }
  function l(f, m) {
    i.drawElements(n, m, s, f * o), t.update(m, n, 1);
  }
  function c(f, m, x) {
    x !== 0 && (i.drawElementsInstanced(n, m, s, f * o, x), t.update(m, n, x));
  }
  function h(f, m, x) {
    if (x === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, m, 0, s, f, 0, x);
    let p = 0;
    for (let u = 0; u < x; u++)
      p += m[u];
    t.update(p, n, 1);
  }
  function d(f, m, x, g) {
    if (x === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let u = 0; u < f.length; u++)
        c(f[u] / o, m[u], g[u]);
    else {
      p.multiDrawElementsInstancedWEBGL(n, m, 0, s, f, 0, g, 0, x);
      let u = 0;
      for (let R = 0; R < x; R++)
        u += m[R] * g[R];
      t.update(u, n, 1);
    }
  }
  this.setMode = r, this.setIndex = a, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = d;
}
function gf(i) {
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
function vf(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), r = new ot();
  function s(o, a, l) {
    const c = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, d = h !== void 0 ? h.length : 0;
    let f = n.get(a);
    if (f === void 0 || f.count !== d) {
      let y = function() {
        E.dispose(), n.delete(a), a.removeEventListener("dispose", y);
      };
      f !== void 0 && f.texture.dispose();
      const m = a.morphAttributes.position !== void 0, x = a.morphAttributes.normal !== void 0, g = a.morphAttributes.color !== void 0, p = a.morphAttributes.position || [], u = a.morphAttributes.normal || [], R = a.morphAttributes.color || [];
      let A = 0;
      m === !0 && (A = 1), x === !0 && (A = 2), g === !0 && (A = 3);
      let S = a.attributes.position.count * A, O = 1;
      S > e.maxTextureSize && (O = Math.ceil(S / e.maxTextureSize), S = e.maxTextureSize);
      const w = new Float32Array(S * O * 4 * d), E = new rl(w, S, O, d);
      E.type = an, E.needsUpdate = !0;
      const C = A * 4;
      for (let _ = 0; _ < d; _++) {
        const T = p[_], N = u[_], F = R[_], z = S * O * 4 * _;
        for (let W = 0; W < T.count; W++) {
          const G = W * C;
          m === !0 && (r.fromBufferAttribute(T, W), w[z + G + 0] = r.x, w[z + G + 1] = r.y, w[z + G + 2] = r.z, w[z + G + 3] = 0), x === !0 && (r.fromBufferAttribute(N, W), w[z + G + 4] = r.x, w[z + G + 5] = r.y, w[z + G + 6] = r.z, w[z + G + 7] = 0), g === !0 && (r.fromBufferAttribute(F, W), w[z + G + 8] = r.x, w[z + G + 9] = r.y, w[z + G + 10] = r.z, w[z + G + 11] = F.itemSize === 4 ? r.w : 1);
        }
      }
      f = {
        count: d,
        texture: E,
        size: new Ae(S, O)
      }, n.set(a, f), a.addEventListener("dispose", y);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", o.morphTexture, t);
    else {
      let m = 0;
      for (let g = 0; g < c.length; g++)
        m += c[g];
      const x = a.morphTargetsRelative ? 1 : 1 - m;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", x), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", f.texture, t), l.getUniforms().setValue(i, "morphTargetsTextureSize", f.size);
  }
  return {
    update: s
  };
}
function xf(i, e, t, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const c = n.render.frame, h = l.geometry, d = e.get(l, h);
    if (r.get(d) !== c && (e.update(d), r.set(d, c)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), r.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const f = l.skeleton;
      r.get(f) !== c && (f.update(), r.set(f, c));
    }
    return d;
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
class ml extends St {
  constructor(e, t, n, r, s, o, a, l, c, h = mi) {
    if (h !== mi && h !== Si)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === mi && (n = Vn), n === void 0 && h === Si && (n = Mi), super(null, r, s, o, a, l, h, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = a !== void 0 ? a : Gt, this.minFilter = l !== void 0 ? l : Gt, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const _l = /* @__PURE__ */ new St(), oo = /* @__PURE__ */ new ml(1, 1), gl = /* @__PURE__ */ new rl(), vl = /* @__PURE__ */ new rh(), xl = /* @__PURE__ */ new ul(), lo = [], co = [], ho = new Float32Array(16), uo = new Float32Array(9), fo = new Float32Array(4);
function Ti(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let s = lo[r];
  if (s === void 0 && (s = new Float32Array(r), lo[r] = s), e !== 0) {
    n.toArray(s, 0);
    for (let o = 1, a = 0; o !== e; ++o)
      a += t, i[o].toArray(s, a);
  }
  return s;
}
function ht(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function ut(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function Fr(i, e) {
  let t = co[e];
  t === void 0 && (t = new Int32Array(e), co[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function Mf(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function Sf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ht(t, e)) return;
    i.uniform2fv(this.addr, e), ut(t, e);
  }
}
function yf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (ht(t, e)) return;
    i.uniform3fv(this.addr, e), ut(t, e);
  }
}
function Ef(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ht(t, e)) return;
    i.uniform4fv(this.addr, e), ut(t, e);
  }
}
function bf(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ht(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), ut(t, e);
  } else {
    if (ht(t, n)) return;
    fo.set(n), i.uniformMatrix2fv(this.addr, !1, fo), ut(t, n);
  }
}
function Tf(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ht(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), ut(t, e);
  } else {
    if (ht(t, n)) return;
    uo.set(n), i.uniformMatrix3fv(this.addr, !1, uo), ut(t, n);
  }
}
function Af(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ht(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), ut(t, e);
  } else {
    if (ht(t, n)) return;
    ho.set(n), i.uniformMatrix4fv(this.addr, !1, ho), ut(t, n);
  }
}
function wf(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function Rf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ht(t, e)) return;
    i.uniform2iv(this.addr, e), ut(t, e);
  }
}
function Cf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (ht(t, e)) return;
    i.uniform3iv(this.addr, e), ut(t, e);
  }
}
function Pf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ht(t, e)) return;
    i.uniform4iv(this.addr, e), ut(t, e);
  }
}
function Lf(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function Df(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ht(t, e)) return;
    i.uniform2uiv(this.addr, e), ut(t, e);
  }
}
function If(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (ht(t, e)) return;
    i.uniform3uiv(this.addr, e), ut(t, e);
  }
}
function Uf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ht(t, e)) return;
    i.uniform4uiv(this.addr, e), ut(t, e);
  }
}
function Nf(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (oo.compareFunction = tl, s = oo) : s = _l, t.setTexture2D(e || s, r);
}
function Ff(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || vl, r);
}
function Of(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || xl, r);
}
function Bf(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || gl, r);
}
function zf(i) {
  switch (i) {
    case 5126:
      return Mf;
    // FLOAT
    case 35664:
      return Sf;
    // _VEC2
    case 35665:
      return yf;
    // _VEC3
    case 35666:
      return Ef;
    // _VEC4
    case 35674:
      return bf;
    // _MAT2
    case 35675:
      return Tf;
    // _MAT3
    case 35676:
      return Af;
    // _MAT4
    case 5124:
    case 35670:
      return wf;
    // INT, BOOL
    case 35667:
    case 35671:
      return Rf;
    // _VEC2
    case 35668:
    case 35672:
      return Cf;
    // _VEC3
    case 35669:
    case 35673:
      return Pf;
    // _VEC4
    case 5125:
      return Lf;
    // UINT
    case 36294:
      return Df;
    // _VEC2
    case 36295:
      return If;
    // _VEC3
    case 36296:
      return Uf;
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
      return Nf;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Ff;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Of;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Bf;
  }
}
function kf(i, e) {
  i.uniform1fv(this.addr, e);
}
function Hf(i, e) {
  const t = Ti(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function Vf(i, e) {
  const t = Ti(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function Gf(i, e) {
  const t = Ti(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function Wf(i, e) {
  const t = Ti(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Xf(i, e) {
  const t = Ti(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function Yf(i, e) {
  const t = Ti(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function qf(i, e) {
  i.uniform1iv(this.addr, e);
}
function Zf(i, e) {
  i.uniform2iv(this.addr, e);
}
function jf(i, e) {
  i.uniform3iv(this.addr, e);
}
function Kf(i, e) {
  i.uniform4iv(this.addr, e);
}
function $f(i, e) {
  i.uniform1uiv(this.addr, e);
}
function Jf(i, e) {
  i.uniform2uiv(this.addr, e);
}
function Qf(i, e) {
  i.uniform3uiv(this.addr, e);
}
function ep(i, e) {
  i.uniform4uiv(this.addr, e);
}
function tp(i, e, t) {
  const n = this.cache, r = e.length, s = Fr(t, r);
  ht(n, s) || (i.uniform1iv(this.addr, s), ut(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture2D(e[o] || _l, s[o]);
}
function np(i, e, t) {
  const n = this.cache, r = e.length, s = Fr(t, r);
  ht(n, s) || (i.uniform1iv(this.addr, s), ut(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture3D(e[o] || vl, s[o]);
}
function ip(i, e, t) {
  const n = this.cache, r = e.length, s = Fr(t, r);
  ht(n, s) || (i.uniform1iv(this.addr, s), ut(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTextureCube(e[o] || xl, s[o]);
}
function rp(i, e, t) {
  const n = this.cache, r = e.length, s = Fr(t, r);
  ht(n, s) || (i.uniform1iv(this.addr, s), ut(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture2DArray(e[o] || gl, s[o]);
}
function sp(i) {
  switch (i) {
    case 5126:
      return kf;
    // FLOAT
    case 35664:
      return Hf;
    // _VEC2
    case 35665:
      return Vf;
    // _VEC3
    case 35666:
      return Gf;
    // _VEC4
    case 35674:
      return Wf;
    // _MAT2
    case 35675:
      return Xf;
    // _MAT3
    case 35676:
      return Yf;
    // _MAT4
    case 5124:
    case 35670:
      return qf;
    // INT, BOOL
    case 35667:
    case 35671:
      return Zf;
    // _VEC2
    case 35668:
    case 35672:
      return jf;
    // _VEC3
    case 35669:
    case 35673:
      return Kf;
    // _VEC4
    case 5125:
      return $f;
    // UINT
    case 36294:
      return Jf;
    // _VEC2
    case 36295:
      return Qf;
    // _VEC3
    case 36296:
      return ep;
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
      return tp;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return np;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return ip;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return rp;
  }
}
class ap {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = zf(t.type);
  }
}
class op {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = sp(t.type);
  }
}
class lp {
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
const us = /(\w+)(\])?(\[|\.)?/g;
function po(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function cp(i, e, t) {
  const n = i.name, r = n.length;
  for (us.lastIndex = 0; ; ) {
    const s = us.exec(n), o = us.lastIndex;
    let a = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (a = a | 0), c === void 0 || c === "[" && o + 2 === r) {
      po(t, c === void 0 ? new ap(a, i, e) : new op(a, i, e));
      break;
    } else {
      let d = t.map[a];
      d === void 0 && (d = new lp(a), po(t, d)), t = d;
    }
  }
}
class Tr {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = e.getActiveUniform(t, r), o = e.getUniformLocation(t, s.name);
      cp(s, o, this);
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
function mo(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const hp = 37297;
let up = 0;
function dp(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let o = r; o < s; o++) {
    const a = o + 1;
    n.push(`${a === e ? ">" : " "} ${a}: ${t[o]}`);
  }
  return n.join(`
`);
}
const _o = /* @__PURE__ */ new Le();
function fp(i) {
  Ge._getMatrix(_o, Ge.workingColorSpace, i);
  const e = `mat3( ${_o.elements.map((t) => t.toFixed(4))} )`;
  switch (Ge.getTransfer(i)) {
    case Ur:
      return [e, "LinearTransferOETF"];
    case je:
      return [e, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [e, "LinearTransferOETF"];
  }
}
function go(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), r = i.getShaderInfoLog(e).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const o = parseInt(s[1]);
    return t.toUpperCase() + `

` + r + `

` + dp(i.getShaderSource(e), o);
  } else
    return r;
}
function pp(i, e) {
  const t = fp(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function mp(i, e) {
  let t;
  switch (e) {
    case Cc:
      t = "Linear";
      break;
    case Pc:
      t = "Reinhard";
      break;
    case Lc:
      t = "Cineon";
      break;
    case Dc:
      t = "ACESFilmic";
      break;
    case Uc:
      t = "AgX";
      break;
    case Nc:
      t = "Neutral";
      break;
    case Ic:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const ur = /* @__PURE__ */ new U();
function _p() {
  Ge.getLuminanceCoefficients(ur);
  const i = ur.x.toFixed(4), e = ur.y.toFixed(4), t = ur.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function gp(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Oi).join(`
`);
}
function vp(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function xp(i, e) {
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
function Oi(i) {
  return i !== "";
}
function vo(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function xo(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const Mp = /^[ \t]*#include +<([\w\d./]+)>/gm;
function sa(i) {
  return i.replace(Mp, yp);
}
const Sp = /* @__PURE__ */ new Map();
function yp(i, e) {
  let t = Ie[e];
  if (t === void 0) {
    const n = Sp.get(e);
    if (n !== void 0)
      t = Ie[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return sa(t);
}
const Ep = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Mo(i) {
  return i.replace(Ep, bp);
}
function bp(i, e, t, n) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function So(i) {
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
function Tp(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === Vo ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === lc ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === rn && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function Ap(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case vi:
      case xi:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case Ir:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function wp(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case xi:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function Rp(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case Go:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case wc:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case Rc:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function Cp(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: n, maxMip: t };
}
function Pp(i, e, t, n) {
  const r = i.getContext(), s = t.defines;
  let o = t.vertexShader, a = t.fragmentShader;
  const l = Tp(t), c = Ap(t), h = wp(t), d = Rp(t), f = Cp(t), m = gp(t), x = vp(s), g = r.createProgram();
  let p, u, R = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(Oi).join(`
`), p.length > 0 && (p += `
`), u = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(Oi).join(`
`), u.length > 0 && (u += `
`)) : (p = [
    So(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x,
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
  ].filter(Oi).join(`
`), u = [
    So(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + d : "",
    f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
    f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
    f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
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
    t.toneMapping !== En ? "#define TONE_MAPPING" : "",
    t.toneMapping !== En ? Ie.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== En ? mp("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Ie.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    pp("linearToOutputTexel", t.outputColorSpace),
    _p(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Oi).join(`
`)), o = sa(o), o = vo(o, t), o = xo(o, t), a = sa(a), a = vo(a, t), a = xo(a, t), o = Mo(o), a = Mo(a), t.isRawShaderMaterial !== !0 && (R = `#version 300 es
`, p = [
    m,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, u = [
    "#define varying in",
    t.glslVersion === Ia ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === Ia ? "" : "#define gl_FragColor pc_fragColor",
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
  const A = R + p + o, S = R + u + a, O = mo(r, r.VERTEX_SHADER, A), w = mo(r, r.FRAGMENT_SHADER, S);
  r.attachShader(g, O), r.attachShader(g, w), t.index0AttributeName !== void 0 ? r.bindAttribLocation(g, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(g, 0, "position"), r.linkProgram(g);
  function E(T) {
    if (i.debug.checkShaderErrors) {
      const N = r.getProgramInfoLog(g).trim(), F = r.getShaderInfoLog(O).trim(), z = r.getShaderInfoLog(w).trim();
      let W = !0, G = !0;
      if (r.getProgramParameter(g, r.LINK_STATUS) === !1)
        if (W = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, g, O, w);
        else {
          const q = go(r, O, "vertex"), V = go(r, w, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(g, r.VALIDATE_STATUS) + `

Material Name: ` + T.name + `
Material Type: ` + T.type + `

Program Info Log: ` + N + `
` + q + `
` + V
          );
        }
      else N !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", N) : (F === "" || z === "") && (G = !1);
      G && (T.diagnostics = {
        runnable: W,
        programLog: N,
        vertexShader: {
          log: F,
          prefix: p
        },
        fragmentShader: {
          log: z,
          prefix: u
        }
      });
    }
    r.deleteShader(O), r.deleteShader(w), C = new Tr(r, g), y = xp(r, g);
  }
  let C;
  this.getUniforms = function() {
    return C === void 0 && E(this), C;
  };
  let y;
  this.getAttributes = function() {
    return y === void 0 && E(this), y;
  };
  let _ = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return _ === !1 && (_ = r.getProgramParameter(g, hp)), _;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(g), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = up++, this.cacheKey = e, this.usedTimes = 1, this.program = g, this.vertexShader = O, this.fragmentShader = w, this;
}
let Lp = 0;
class Dp {
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
    return n === void 0 && (n = new Ip(e), t.set(e, n)), n;
  }
}
class Ip {
  constructor(e) {
    this.id = Lp++, this.code = e, this.usedTimes = 0;
  }
}
function Up(i, e, t, n, r, s, o) {
  const a = new sl(), l = new Dp(), c = /* @__PURE__ */ new Set(), h = [], d = r.logarithmicDepthBuffer, f = r.vertexTextures;
  let m = r.precision;
  const x = {
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
  function g(y) {
    return c.add(y), y === 0 ? "uv" : `uv${y}`;
  }
  function p(y, _, T, N, F) {
    const z = N.fog, W = F.geometry, G = y.isMeshStandardMaterial ? N.environment : null, q = (y.isMeshStandardMaterial ? t : e).get(y.envMap || G), V = q && q.mapping === Ir ? q.image.height : null, Q = x[y.type];
    y.precision !== null && (m = r.getMaxPrecision(y.precision), m !== y.precision && console.warn("THREE.WebGLProgram.getParameters:", y.precision, "not supported, using", m, "instead."));
    const re = W.morphAttributes.position || W.morphAttributes.normal || W.morphAttributes.color, pe = re !== void 0 ? re.length : 0;
    let Ee = 0;
    W.morphAttributes.position !== void 0 && (Ee = 1), W.morphAttributes.normal !== void 0 && (Ee = 2), W.morphAttributes.color !== void 0 && (Ee = 3);
    let Ue, Y, J, he;
    if (Q) {
      const Ze = qt[Q];
      Ue = Ze.vertexShader, Y = Ze.fragmentShader;
    } else
      Ue = y.vertexShader, Y = y.fragmentShader, l.update(y), J = l.getVertexShaderID(y), he = l.getFragmentShaderID(y);
    const ne = i.getRenderTarget(), be = i.state.buffers.depth.getReversed(), Re = F.isInstancedMesh === !0, Ne = F.isBatchedMesh === !0, it = !!y.map, He = !!y.matcap, at = !!q, I = !!y.aoMap, Ct = !!y.lightMap, Be = !!y.bumpMap, ze = !!y.normalMap, Se = !!y.displacementMap, et = !!y.emissiveMap, Me = !!y.metalnessMap, b = !!y.roughnessMap, v = y.anisotropy > 0, B = y.clearcoat > 0, j = y.dispersion > 0, $ = y.iridescence > 0, Z = y.sheen > 0, ve = y.transmission > 0, ae = v && !!y.anisotropyMap, ue = B && !!y.clearcoatMap, Ve = B && !!y.clearcoatNormalMap, ee = B && !!y.clearcoatRoughnessMap, de = $ && !!y.iridescenceMap, ye = $ && !!y.iridescenceThicknessMap, Te = Z && !!y.sheenColorMap, fe = Z && !!y.sheenRoughnessMap, ke = !!y.specularMap, De = !!y.specularColorMap, Je = !!y.specularIntensityMap, P = ve && !!y.transmissionMap, se = ve && !!y.thicknessMap, X = !!y.gradientMap, K = !!y.alphaMap, ce = y.alphaTest > 0, oe = !!y.alphaHash, Ce = !!y.extensions;
    let rt = En;
    y.toneMapped && (ne === null || ne.isXRRenderTarget === !0) && (rt = i.toneMapping);
    const mt = {
      shaderID: Q,
      shaderType: y.type,
      shaderName: y.name,
      vertexShader: Ue,
      fragmentShader: Y,
      defines: y.defines,
      customVertexShaderID: J,
      customFragmentShaderID: he,
      isRawShaderMaterial: y.isRawShaderMaterial === !0,
      glslVersion: y.glslVersion,
      precision: m,
      batching: Ne,
      batchingColor: Ne && F._colorsTexture !== null,
      instancing: Re,
      instancingColor: Re && F.instanceColor !== null,
      instancingMorph: Re && F.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: ne === null ? i.outputColorSpace : ne.isXRRenderTarget === !0 ? ne.texture.colorSpace : Ei,
      alphaToCoverage: !!y.alphaToCoverage,
      map: it,
      matcap: He,
      envMap: at,
      envMapMode: at && q.mapping,
      envMapCubeUVHeight: V,
      aoMap: I,
      lightMap: Ct,
      bumpMap: Be,
      normalMap: ze,
      displacementMap: f && Se,
      emissiveMap: et,
      normalMapObjectSpace: ze && y.normalMapType === kc,
      normalMapTangentSpace: ze && y.normalMapType === zc,
      metalnessMap: Me,
      roughnessMap: b,
      anisotropy: v,
      anisotropyMap: ae,
      clearcoat: B,
      clearcoatMap: ue,
      clearcoatNormalMap: Ve,
      clearcoatRoughnessMap: ee,
      dispersion: j,
      iridescence: $,
      iridescenceMap: de,
      iridescenceThicknessMap: ye,
      sheen: Z,
      sheenColorMap: Te,
      sheenRoughnessMap: fe,
      specularMap: ke,
      specularColorMap: De,
      specularIntensityMap: Je,
      transmission: ve,
      transmissionMap: P,
      thicknessMap: se,
      gradientMap: X,
      opaque: y.transparent === !1 && y.blending === pi && y.alphaToCoverage === !1,
      alphaMap: K,
      alphaTest: ce,
      alphaHash: oe,
      combine: y.combine,
      //
      mapUv: it && g(y.map.channel),
      aoMapUv: I && g(y.aoMap.channel),
      lightMapUv: Ct && g(y.lightMap.channel),
      bumpMapUv: Be && g(y.bumpMap.channel),
      normalMapUv: ze && g(y.normalMap.channel),
      displacementMapUv: Se && g(y.displacementMap.channel),
      emissiveMapUv: et && g(y.emissiveMap.channel),
      metalnessMapUv: Me && g(y.metalnessMap.channel),
      roughnessMapUv: b && g(y.roughnessMap.channel),
      anisotropyMapUv: ae && g(y.anisotropyMap.channel),
      clearcoatMapUv: ue && g(y.clearcoatMap.channel),
      clearcoatNormalMapUv: Ve && g(y.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ee && g(y.clearcoatRoughnessMap.channel),
      iridescenceMapUv: de && g(y.iridescenceMap.channel),
      iridescenceThicknessMapUv: ye && g(y.iridescenceThicknessMap.channel),
      sheenColorMapUv: Te && g(y.sheenColorMap.channel),
      sheenRoughnessMapUv: fe && g(y.sheenRoughnessMap.channel),
      specularMapUv: ke && g(y.specularMap.channel),
      specularColorMapUv: De && g(y.specularColorMap.channel),
      specularIntensityMapUv: Je && g(y.specularIntensityMap.channel),
      transmissionMapUv: P && g(y.transmissionMap.channel),
      thicknessMapUv: se && g(y.thicknessMap.channel),
      alphaMapUv: K && g(y.alphaMap.channel),
      //
      vertexTangents: !!W.attributes.tangent && (ze || v),
      vertexColors: y.vertexColors,
      vertexAlphas: y.vertexColors === !0 && !!W.attributes.color && W.attributes.color.itemSize === 4,
      pointsUvs: F.isPoints === !0 && !!W.attributes.uv && (it || K),
      fog: !!z,
      useFog: y.fog === !0,
      fogExp2: !!z && z.isFogExp2,
      flatShading: y.flatShading === !0,
      sizeAttenuation: y.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reverseDepthBuffer: be,
      skinning: F.isSkinnedMesh === !0,
      morphTargets: W.morphAttributes.position !== void 0,
      morphNormals: W.morphAttributes.normal !== void 0,
      morphColors: W.morphAttributes.color !== void 0,
      morphTargetsCount: pe,
      morphTextureStride: Ee,
      numDirLights: _.directional.length,
      numPointLights: _.point.length,
      numSpotLights: _.spot.length,
      numSpotLightMaps: _.spotLightMap.length,
      numRectAreaLights: _.rectArea.length,
      numHemiLights: _.hemi.length,
      numDirLightShadows: _.directionalShadowMap.length,
      numPointLightShadows: _.pointShadowMap.length,
      numSpotLightShadows: _.spotShadowMap.length,
      numSpotLightShadowsWithMaps: _.numSpotLightShadowsWithMaps,
      numLightProbes: _.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: y.dithering,
      shadowMapEnabled: i.shadowMap.enabled && T.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: rt,
      decodeVideoTexture: it && y.map.isVideoTexture === !0 && Ge.getTransfer(y.map.colorSpace) === je,
      decodeVideoTextureEmissive: et && y.emissiveMap.isVideoTexture === !0 && Ge.getTransfer(y.emissiveMap.colorSpace) === je,
      premultipliedAlpha: y.premultipliedAlpha,
      doubleSided: y.side === Zt,
      flipSided: y.side === Tt,
      useDepthPacking: y.depthPacking >= 0,
      depthPacking: y.depthPacking || 0,
      index0AttributeName: y.index0AttributeName,
      extensionClipCullDistance: Ce && y.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Ce && y.extensions.multiDraw === !0 || Ne) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: y.customProgramCacheKey()
    };
    return mt.vertexUv1s = c.has(1), mt.vertexUv2s = c.has(2), mt.vertexUv3s = c.has(3), c.clear(), mt;
  }
  function u(y) {
    const _ = [];
    if (y.shaderID ? _.push(y.shaderID) : (_.push(y.customVertexShaderID), _.push(y.customFragmentShaderID)), y.defines !== void 0)
      for (const T in y.defines)
        _.push(T), _.push(y.defines[T]);
    return y.isRawShaderMaterial === !1 && (R(_, y), A(_, y), _.push(i.outputColorSpace)), _.push(y.customProgramCacheKey), _.join();
  }
  function R(y, _) {
    y.push(_.precision), y.push(_.outputColorSpace), y.push(_.envMapMode), y.push(_.envMapCubeUVHeight), y.push(_.mapUv), y.push(_.alphaMapUv), y.push(_.lightMapUv), y.push(_.aoMapUv), y.push(_.bumpMapUv), y.push(_.normalMapUv), y.push(_.displacementMapUv), y.push(_.emissiveMapUv), y.push(_.metalnessMapUv), y.push(_.roughnessMapUv), y.push(_.anisotropyMapUv), y.push(_.clearcoatMapUv), y.push(_.clearcoatNormalMapUv), y.push(_.clearcoatRoughnessMapUv), y.push(_.iridescenceMapUv), y.push(_.iridescenceThicknessMapUv), y.push(_.sheenColorMapUv), y.push(_.sheenRoughnessMapUv), y.push(_.specularMapUv), y.push(_.specularColorMapUv), y.push(_.specularIntensityMapUv), y.push(_.transmissionMapUv), y.push(_.thicknessMapUv), y.push(_.combine), y.push(_.fogExp2), y.push(_.sizeAttenuation), y.push(_.morphTargetsCount), y.push(_.morphAttributeCount), y.push(_.numDirLights), y.push(_.numPointLights), y.push(_.numSpotLights), y.push(_.numSpotLightMaps), y.push(_.numHemiLights), y.push(_.numRectAreaLights), y.push(_.numDirLightShadows), y.push(_.numPointLightShadows), y.push(_.numSpotLightShadows), y.push(_.numSpotLightShadowsWithMaps), y.push(_.numLightProbes), y.push(_.shadowMapType), y.push(_.toneMapping), y.push(_.numClippingPlanes), y.push(_.numClipIntersection), y.push(_.depthPacking);
  }
  function A(y, _) {
    a.disableAll(), _.supportsVertexTextures && a.enable(0), _.instancing && a.enable(1), _.instancingColor && a.enable(2), _.instancingMorph && a.enable(3), _.matcap && a.enable(4), _.envMap && a.enable(5), _.normalMapObjectSpace && a.enable(6), _.normalMapTangentSpace && a.enable(7), _.clearcoat && a.enable(8), _.iridescence && a.enable(9), _.alphaTest && a.enable(10), _.vertexColors && a.enable(11), _.vertexAlphas && a.enable(12), _.vertexUv1s && a.enable(13), _.vertexUv2s && a.enable(14), _.vertexUv3s && a.enable(15), _.vertexTangents && a.enable(16), _.anisotropy && a.enable(17), _.alphaHash && a.enable(18), _.batching && a.enable(19), _.dispersion && a.enable(20), _.batchingColor && a.enable(21), y.push(a.mask), a.disableAll(), _.fog && a.enable(0), _.useFog && a.enable(1), _.flatShading && a.enable(2), _.logarithmicDepthBuffer && a.enable(3), _.reverseDepthBuffer && a.enable(4), _.skinning && a.enable(5), _.morphTargets && a.enable(6), _.morphNormals && a.enable(7), _.morphColors && a.enable(8), _.premultipliedAlpha && a.enable(9), _.shadowMapEnabled && a.enable(10), _.doubleSided && a.enable(11), _.flipSided && a.enable(12), _.useDepthPacking && a.enable(13), _.dithering && a.enable(14), _.transmission && a.enable(15), _.sheen && a.enable(16), _.opaque && a.enable(17), _.pointsUvs && a.enable(18), _.decodeVideoTexture && a.enable(19), _.decodeVideoTextureEmissive && a.enable(20), _.alphaToCoverage && a.enable(21), y.push(a.mask);
  }
  function S(y) {
    const _ = x[y.type];
    let T;
    if (_) {
      const N = qt[_];
      T = _h.clone(N.uniforms);
    } else
      T = y.uniforms;
    return T;
  }
  function O(y, _) {
    let T;
    for (let N = 0, F = h.length; N < F; N++) {
      const z = h[N];
      if (z.cacheKey === _) {
        T = z, ++T.usedTimes;
        break;
      }
    }
    return T === void 0 && (T = new Pp(i, _, y, s), h.push(T)), T;
  }
  function w(y) {
    if (--y.usedTimes === 0) {
      const _ = h.indexOf(y);
      h[_] = h[h.length - 1], h.pop(), y.destroy();
    }
  }
  function E(y) {
    l.remove(y);
  }
  function C() {
    l.dispose();
  }
  return {
    getParameters: p,
    getProgramCacheKey: u,
    getUniforms: S,
    acquireProgram: O,
    releaseProgram: w,
    releaseShaderCache: E,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: C
  };
}
function Np() {
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
function Fp(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function yo(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function Eo() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function o(d, f, m, x, g, p) {
    let u = i[e];
    return u === void 0 ? (u = {
      id: d.id,
      object: d,
      geometry: f,
      material: m,
      groupOrder: x,
      renderOrder: d.renderOrder,
      z: g,
      group: p
    }, i[e] = u) : (u.id = d.id, u.object = d, u.geometry = f, u.material = m, u.groupOrder = x, u.renderOrder = d.renderOrder, u.z = g, u.group = p), e++, u;
  }
  function a(d, f, m, x, g, p) {
    const u = o(d, f, m, x, g, p);
    m.transmission > 0 ? n.push(u) : m.transparent === !0 ? r.push(u) : t.push(u);
  }
  function l(d, f, m, x, g, p) {
    const u = o(d, f, m, x, g, p);
    m.transmission > 0 ? n.unshift(u) : m.transparent === !0 ? r.unshift(u) : t.unshift(u);
  }
  function c(d, f) {
    t.length > 1 && t.sort(d || Fp), n.length > 1 && n.sort(f || yo), r.length > 1 && r.sort(f || yo);
  }
  function h() {
    for (let d = e, f = i.length; d < f; d++) {
      const m = i[d];
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
function Op() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const s = i.get(n);
    let o;
    return s === void 0 ? (o = new Eo(), i.set(n, [o])) : r >= s.length ? (o = new Eo(), s.push(o)) : o = s[r], o;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function Bp() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new U(),
            color: new Xe()
          };
          break;
        case "SpotLight":
          t = {
            position: new U(),
            direction: new U(),
            color: new Xe(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new U(),
            color: new Xe(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new U(),
            skyColor: new Xe(),
            groundColor: new Xe()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Xe(),
            position: new U(),
            halfWidth: new U(),
            halfHeight: new U()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function zp() {
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
            shadowMapSize: new Ae()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ae()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ae(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let kp = 0;
function Hp(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Vp(i) {
  const e = new Bp(), t = zp(), n = {
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
  for (let c = 0; c < 9; c++) n.probe.push(new U());
  const r = new U(), s = new st(), o = new st();
  function a(c) {
    let h = 0, d = 0, f = 0;
    for (let y = 0; y < 9; y++) n.probe[y].set(0, 0, 0);
    let m = 0, x = 0, g = 0, p = 0, u = 0, R = 0, A = 0, S = 0, O = 0, w = 0, E = 0;
    c.sort(Hp);
    for (let y = 0, _ = c.length; y < _; y++) {
      const T = c[y], N = T.color, F = T.intensity, z = T.distance, W = T.shadow && T.shadow.map ? T.shadow.map.texture : null;
      if (T.isAmbientLight)
        h += N.r * F, d += N.g * F, f += N.b * F;
      else if (T.isLightProbe) {
        for (let G = 0; G < 9; G++)
          n.probe[G].addScaledVector(T.sh.coefficients[G], F);
        E++;
      } else if (T.isDirectionalLight) {
        const G = e.get(T);
        if (G.color.copy(T.color).multiplyScalar(T.intensity), T.castShadow) {
          const q = T.shadow, V = t.get(T);
          V.shadowIntensity = q.intensity, V.shadowBias = q.bias, V.shadowNormalBias = q.normalBias, V.shadowRadius = q.radius, V.shadowMapSize = q.mapSize, n.directionalShadow[m] = V, n.directionalShadowMap[m] = W, n.directionalShadowMatrix[m] = T.shadow.matrix, R++;
        }
        n.directional[m] = G, m++;
      } else if (T.isSpotLight) {
        const G = e.get(T);
        G.position.setFromMatrixPosition(T.matrixWorld), G.color.copy(N).multiplyScalar(F), G.distance = z, G.coneCos = Math.cos(T.angle), G.penumbraCos = Math.cos(T.angle * (1 - T.penumbra)), G.decay = T.decay, n.spot[g] = G;
        const q = T.shadow;
        if (T.map && (n.spotLightMap[O] = T.map, O++, q.updateMatrices(T), T.castShadow && w++), n.spotLightMatrix[g] = q.matrix, T.castShadow) {
          const V = t.get(T);
          V.shadowIntensity = q.intensity, V.shadowBias = q.bias, V.shadowNormalBias = q.normalBias, V.shadowRadius = q.radius, V.shadowMapSize = q.mapSize, n.spotShadow[g] = V, n.spotShadowMap[g] = W, S++;
        }
        g++;
      } else if (T.isRectAreaLight) {
        const G = e.get(T);
        G.color.copy(N).multiplyScalar(F), G.halfWidth.set(T.width * 0.5, 0, 0), G.halfHeight.set(0, T.height * 0.5, 0), n.rectArea[p] = G, p++;
      } else if (T.isPointLight) {
        const G = e.get(T);
        if (G.color.copy(T.color).multiplyScalar(T.intensity), G.distance = T.distance, G.decay = T.decay, T.castShadow) {
          const q = T.shadow, V = t.get(T);
          V.shadowIntensity = q.intensity, V.shadowBias = q.bias, V.shadowNormalBias = q.normalBias, V.shadowRadius = q.radius, V.shadowMapSize = q.mapSize, V.shadowCameraNear = q.camera.near, V.shadowCameraFar = q.camera.far, n.pointShadow[x] = V, n.pointShadowMap[x] = W, n.pointShadowMatrix[x] = T.shadow.matrix, A++;
        }
        n.point[x] = G, x++;
      } else if (T.isHemisphereLight) {
        const G = e.get(T);
        G.skyColor.copy(T.color).multiplyScalar(F), G.groundColor.copy(T.groundColor).multiplyScalar(F), n.hemi[u] = G, u++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ie.LTC_FLOAT_1, n.rectAreaLTC2 = ie.LTC_FLOAT_2) : (n.rectAreaLTC1 = ie.LTC_HALF_1, n.rectAreaLTC2 = ie.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = d, n.ambient[2] = f;
    const C = n.hash;
    (C.directionalLength !== m || C.pointLength !== x || C.spotLength !== g || C.rectAreaLength !== p || C.hemiLength !== u || C.numDirectionalShadows !== R || C.numPointShadows !== A || C.numSpotShadows !== S || C.numSpotMaps !== O || C.numLightProbes !== E) && (n.directional.length = m, n.spot.length = g, n.rectArea.length = p, n.point.length = x, n.hemi.length = u, n.directionalShadow.length = R, n.directionalShadowMap.length = R, n.pointShadow.length = A, n.pointShadowMap.length = A, n.spotShadow.length = S, n.spotShadowMap.length = S, n.directionalShadowMatrix.length = R, n.pointShadowMatrix.length = A, n.spotLightMatrix.length = S + O - w, n.spotLightMap.length = O, n.numSpotLightShadowsWithMaps = w, n.numLightProbes = E, C.directionalLength = m, C.pointLength = x, C.spotLength = g, C.rectAreaLength = p, C.hemiLength = u, C.numDirectionalShadows = R, C.numPointShadows = A, C.numSpotShadows = S, C.numSpotMaps = O, C.numLightProbes = E, n.version = kp++);
  }
  function l(c, h) {
    let d = 0, f = 0, m = 0, x = 0, g = 0;
    const p = h.matrixWorldInverse;
    for (let u = 0, R = c.length; u < R; u++) {
      const A = c[u];
      if (A.isDirectionalLight) {
        const S = n.directional[d];
        S.direction.setFromMatrixPosition(A.matrixWorld), r.setFromMatrixPosition(A.target.matrixWorld), S.direction.sub(r), S.direction.transformDirection(p), d++;
      } else if (A.isSpotLight) {
        const S = n.spot[m];
        S.position.setFromMatrixPosition(A.matrixWorld), S.position.applyMatrix4(p), S.direction.setFromMatrixPosition(A.matrixWorld), r.setFromMatrixPosition(A.target.matrixWorld), S.direction.sub(r), S.direction.transformDirection(p), m++;
      } else if (A.isRectAreaLight) {
        const S = n.rectArea[x];
        S.position.setFromMatrixPosition(A.matrixWorld), S.position.applyMatrix4(p), o.identity(), s.copy(A.matrixWorld), s.premultiply(p), o.extractRotation(s), S.halfWidth.set(A.width * 0.5, 0, 0), S.halfHeight.set(0, A.height * 0.5, 0), S.halfWidth.applyMatrix4(o), S.halfHeight.applyMatrix4(o), x++;
      } else if (A.isPointLight) {
        const S = n.point[f];
        S.position.setFromMatrixPosition(A.matrixWorld), S.position.applyMatrix4(p), f++;
      } else if (A.isHemisphereLight) {
        const S = n.hemi[g];
        S.direction.setFromMatrixPosition(A.matrixWorld), S.direction.transformDirection(p), g++;
      }
    }
  }
  return {
    setup: a,
    setupView: l,
    state: n
  };
}
function bo(i) {
  const e = new Vp(i), t = [], n = [];
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
function Gp(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const o = e.get(r);
    let a;
    return o === void 0 ? (a = new bo(i), e.set(r, [a])) : s >= o.length ? (a = new bo(i), o.push(a)) : a = o[s], a;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
class Wp extends bi {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.depthPacking = Oc, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Xp extends bi {
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
const Yp = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, qp = `uniform sampler2D shadow_pass;
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
function Zp(i, e, t) {
  let n = new dl();
  const r = new Ae(), s = new Ae(), o = new ot(), a = new Wp({ depthPacking: Bc }), l = new Xp(), c = {}, h = t.maxTextureSize, d = { [Tn]: Tt, [Tt]: Tn, [Zt]: Zt }, f = new An({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ae() },
      radius: { value: 4 }
    },
    vertexShader: Yp,
    fragmentShader: qp
  }), m = f.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const x = new ft();
  x.setAttribute(
    "position",
    new Wt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const g = new Vt(x, f), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Vo;
  let u = this.type;
  this.render = function(w, E, C) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || w.length === 0) return;
    const y = i.getRenderTarget(), _ = i.getActiveCubeFace(), T = i.getActiveMipmapLevel(), N = i.state;
    N.setBlending(yn), N.buffers.color.setClear(1, 1, 1, 1), N.buffers.depth.setTest(!0), N.setScissorTest(!1);
    const F = u !== rn && this.type === rn, z = u === rn && this.type !== rn;
    for (let W = 0, G = w.length; W < G; W++) {
      const q = w[W], V = q.shadow;
      if (V === void 0) {
        console.warn("THREE.WebGLShadowMap:", q, "has no shadow.");
        continue;
      }
      if (V.autoUpdate === !1 && V.needsUpdate === !1) continue;
      r.copy(V.mapSize);
      const Q = V.getFrameExtents();
      if (r.multiply(Q), s.copy(V.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / Q.x), r.x = s.x * Q.x, V.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / Q.y), r.y = s.y * Q.y, V.mapSize.y = s.y)), V.map === null || F === !0 || z === !0) {
        const pe = this.type !== rn ? { minFilter: Gt, magFilter: Gt } : {};
        V.map !== null && V.map.dispose(), V.map = new Gn(r.x, r.y, pe), V.map.texture.name = q.name + ".shadowMap", V.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(V.map), i.clear();
      const re = V.getViewportCount();
      for (let pe = 0; pe < re; pe++) {
        const Ee = V.getViewport(pe);
        o.set(
          s.x * Ee.x,
          s.y * Ee.y,
          s.x * Ee.z,
          s.y * Ee.w
        ), N.viewport(o), V.updateMatrices(q, pe), n = V.getFrustum(), S(E, C, V.camera, q, this.type);
      }
      V.isPointLightShadow !== !0 && this.type === rn && R(V, C), V.needsUpdate = !1;
    }
    u = this.type, p.needsUpdate = !1, i.setRenderTarget(y, _, T);
  };
  function R(w, E) {
    const C = e.update(g);
    f.defines.VSM_SAMPLES !== w.blurSamples && (f.defines.VSM_SAMPLES = w.blurSamples, m.defines.VSM_SAMPLES = w.blurSamples, f.needsUpdate = !0, m.needsUpdate = !0), w.mapPass === null && (w.mapPass = new Gn(r.x, r.y)), f.uniforms.shadow_pass.value = w.map.texture, f.uniforms.resolution.value = w.mapSize, f.uniforms.radius.value = w.radius, i.setRenderTarget(w.mapPass), i.clear(), i.renderBufferDirect(E, null, C, f, g, null), m.uniforms.shadow_pass.value = w.mapPass.texture, m.uniforms.resolution.value = w.mapSize, m.uniforms.radius.value = w.radius, i.setRenderTarget(w.map), i.clear(), i.renderBufferDirect(E, null, C, m, g, null);
  }
  function A(w, E, C, y) {
    let _ = null;
    const T = C.isPointLight === !0 ? w.customDistanceMaterial : w.customDepthMaterial;
    if (T !== void 0)
      _ = T;
    else if (_ = C.isPointLight === !0 ? l : a, i.localClippingEnabled && E.clipShadows === !0 && Array.isArray(E.clippingPlanes) && E.clippingPlanes.length !== 0 || E.displacementMap && E.displacementScale !== 0 || E.alphaMap && E.alphaTest > 0 || E.map && E.alphaTest > 0) {
      const N = _.uuid, F = E.uuid;
      let z = c[N];
      z === void 0 && (z = {}, c[N] = z);
      let W = z[F];
      W === void 0 && (W = _.clone(), z[F] = W, E.addEventListener("dispose", O)), _ = W;
    }
    if (_.visible = E.visible, _.wireframe = E.wireframe, y === rn ? _.side = E.shadowSide !== null ? E.shadowSide : E.side : _.side = E.shadowSide !== null ? E.shadowSide : d[E.side], _.alphaMap = E.alphaMap, _.alphaTest = E.alphaTest, _.map = E.map, _.clipShadows = E.clipShadows, _.clippingPlanes = E.clippingPlanes, _.clipIntersection = E.clipIntersection, _.displacementMap = E.displacementMap, _.displacementScale = E.displacementScale, _.displacementBias = E.displacementBias, _.wireframeLinewidth = E.wireframeLinewidth, _.linewidth = E.linewidth, C.isPointLight === !0 && _.isMeshDistanceMaterial === !0) {
      const N = i.properties.get(_);
      N.light = C;
    }
    return _;
  }
  function S(w, E, C, y, _) {
    if (w.visible === !1) return;
    if (w.layers.test(E.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && _ === rn) && (!w.frustumCulled || n.intersectsObject(w))) {
      w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse, w.matrixWorld);
      const F = e.update(w), z = w.material;
      if (Array.isArray(z)) {
        const W = F.groups;
        for (let G = 0, q = W.length; G < q; G++) {
          const V = W[G], Q = z[V.materialIndex];
          if (Q && Q.visible) {
            const re = A(w, Q, y, _);
            w.onBeforeShadow(i, w, E, C, F, re, V), i.renderBufferDirect(C, null, F, re, w, V), w.onAfterShadow(i, w, E, C, F, re, V);
          }
        }
      } else if (z.visible) {
        const W = A(w, z, y, _);
        w.onBeforeShadow(i, w, E, C, F, W, null), i.renderBufferDirect(C, null, F, W, w, null), w.onAfterShadow(i, w, E, C, F, W, null);
      }
    }
    const N = w.children;
    for (let F = 0, z = N.length; F < z; F++)
      S(N[F], E, C, y, _);
  }
  function O(w) {
    w.target.removeEventListener("dispose", O);
    for (const C in c) {
      const y = c[C], _ = w.target.uuid;
      _ in y && (y[_].dispose(), delete y[_]);
    }
  }
}
const jp = {
  [Ms]: Ss,
  [ys]: Ts,
  [Es]: As,
  [gi]: bs,
  [Ss]: Ms,
  [Ts]: ys,
  [As]: Es,
  [bs]: gi
};
function Kp(i, e) {
  function t() {
    let P = !1;
    const se = new ot();
    let X = null;
    const K = new ot(0, 0, 0, 0);
    return {
      setMask: function(ce) {
        X !== ce && !P && (i.colorMask(ce, ce, ce, ce), X = ce);
      },
      setLocked: function(ce) {
        P = ce;
      },
      setClear: function(ce, oe, Ce, rt, mt) {
        mt === !0 && (ce *= rt, oe *= rt, Ce *= rt), se.set(ce, oe, Ce, rt), K.equals(se) === !1 && (i.clearColor(ce, oe, Ce, rt), K.copy(se));
      },
      reset: function() {
        P = !1, X = null, K.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let P = !1, se = !1, X = null, K = null, ce = null;
    return {
      setReversed: function(oe) {
        if (se !== oe) {
          const Ce = e.get("EXT_clip_control");
          se ? Ce.clipControlEXT(Ce.LOWER_LEFT_EXT, Ce.ZERO_TO_ONE_EXT) : Ce.clipControlEXT(Ce.LOWER_LEFT_EXT, Ce.NEGATIVE_ONE_TO_ONE_EXT);
          const rt = ce;
          ce = null, this.setClear(rt);
        }
        se = oe;
      },
      getReversed: function() {
        return se;
      },
      setTest: function(oe) {
        oe ? ne(i.DEPTH_TEST) : be(i.DEPTH_TEST);
      },
      setMask: function(oe) {
        X !== oe && !P && (i.depthMask(oe), X = oe);
      },
      setFunc: function(oe) {
        if (se && (oe = jp[oe]), K !== oe) {
          switch (oe) {
            case Ms:
              i.depthFunc(i.NEVER);
              break;
            case Ss:
              i.depthFunc(i.ALWAYS);
              break;
            case ys:
              i.depthFunc(i.LESS);
              break;
            case gi:
              i.depthFunc(i.LEQUAL);
              break;
            case Es:
              i.depthFunc(i.EQUAL);
              break;
            case bs:
              i.depthFunc(i.GEQUAL);
              break;
            case Ts:
              i.depthFunc(i.GREATER);
              break;
            case As:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          K = oe;
        }
      },
      setLocked: function(oe) {
        P = oe;
      },
      setClear: function(oe) {
        ce !== oe && (se && (oe = 1 - oe), i.clearDepth(oe), ce = oe);
      },
      reset: function() {
        P = !1, X = null, K = null, ce = null, se = !1;
      }
    };
  }
  function r() {
    let P = !1, se = null, X = null, K = null, ce = null, oe = null, Ce = null, rt = null, mt = null;
    return {
      setTest: function(Ze) {
        P || (Ze ? ne(i.STENCIL_TEST) : be(i.STENCIL_TEST));
      },
      setMask: function(Ze) {
        se !== Ze && !P && (i.stencilMask(Ze), se = Ze);
      },
      setFunc: function(Ze, Ft, Kt) {
        (X !== Ze || K !== Ft || ce !== Kt) && (i.stencilFunc(Ze, Ft, Kt), X = Ze, K = Ft, ce = Kt);
      },
      setOp: function(Ze, Ft, Kt) {
        (oe !== Ze || Ce !== Ft || rt !== Kt) && (i.stencilOp(Ze, Ft, Kt), oe = Ze, Ce = Ft, rt = Kt);
      },
      setLocked: function(Ze) {
        P = Ze;
      },
      setClear: function(Ze) {
        mt !== Ze && (i.clearStencil(Ze), mt = Ze);
      },
      reset: function() {
        P = !1, se = null, X = null, K = null, ce = null, oe = null, Ce = null, rt = null, mt = null;
      }
    };
  }
  const s = new t(), o = new n(), a = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, d = {}, f = /* @__PURE__ */ new WeakMap(), m = [], x = null, g = !1, p = null, u = null, R = null, A = null, S = null, O = null, w = null, E = new Xe(0, 0, 0), C = 0, y = !1, _ = null, T = null, N = null, F = null, z = null;
  const W = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let G = !1, q = 0;
  const V = i.getParameter(i.VERSION);
  V.indexOf("WebGL") !== -1 ? (q = parseFloat(/^WebGL (\d)/.exec(V)[1]), G = q >= 1) : V.indexOf("OpenGL ES") !== -1 && (q = parseFloat(/^OpenGL ES (\d)/.exec(V)[1]), G = q >= 2);
  let Q = null, re = {};
  const pe = i.getParameter(i.SCISSOR_BOX), Ee = i.getParameter(i.VIEWPORT), Ue = new ot().fromArray(pe), Y = new ot().fromArray(Ee);
  function J(P, se, X, K) {
    const ce = new Uint8Array(4), oe = i.createTexture();
    i.bindTexture(P, oe), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ce = 0; Ce < X; Ce++)
      P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY ? i.texImage3D(se, 0, i.RGBA, 1, 1, K, 0, i.RGBA, i.UNSIGNED_BYTE, ce) : i.texImage2D(se + Ce, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ce);
    return oe;
  }
  const he = {};
  he[i.TEXTURE_2D] = J(i.TEXTURE_2D, i.TEXTURE_2D, 1), he[i.TEXTURE_CUBE_MAP] = J(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), he[i.TEXTURE_2D_ARRAY] = J(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), he[i.TEXTURE_3D] = J(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), o.setClear(1), a.setClear(0), ne(i.DEPTH_TEST), o.setFunc(gi), Be(!1), ze(Ra), ne(i.CULL_FACE), I(yn);
  function ne(P) {
    h[P] !== !0 && (i.enable(P), h[P] = !0);
  }
  function be(P) {
    h[P] !== !1 && (i.disable(P), h[P] = !1);
  }
  function Re(P, se) {
    return d[P] !== se ? (i.bindFramebuffer(P, se), d[P] = se, P === i.DRAW_FRAMEBUFFER && (d[i.FRAMEBUFFER] = se), P === i.FRAMEBUFFER && (d[i.DRAW_FRAMEBUFFER] = se), !0) : !1;
  }
  function Ne(P, se) {
    let X = m, K = !1;
    if (P) {
      X = f.get(se), X === void 0 && (X = [], f.set(se, X));
      const ce = P.textures;
      if (X.length !== ce.length || X[0] !== i.COLOR_ATTACHMENT0) {
        for (let oe = 0, Ce = ce.length; oe < Ce; oe++)
          X[oe] = i.COLOR_ATTACHMENT0 + oe;
        X.length = ce.length, K = !0;
      }
    } else
      X[0] !== i.BACK && (X[0] = i.BACK, K = !0);
    K && i.drawBuffers(X);
  }
  function it(P) {
    return x !== P ? (i.useProgram(P), x = P, !0) : !1;
  }
  const He = {
    [On]: i.FUNC_ADD,
    [hc]: i.FUNC_SUBTRACT,
    [uc]: i.FUNC_REVERSE_SUBTRACT
  };
  He[dc] = i.MIN, He[fc] = i.MAX;
  const at = {
    [pc]: i.ZERO,
    [mc]: i.ONE,
    [_c]: i.SRC_COLOR,
    [vs]: i.SRC_ALPHA,
    [yc]: i.SRC_ALPHA_SATURATE,
    [Mc]: i.DST_COLOR,
    [vc]: i.DST_ALPHA,
    [gc]: i.ONE_MINUS_SRC_COLOR,
    [xs]: i.ONE_MINUS_SRC_ALPHA,
    [Sc]: i.ONE_MINUS_DST_COLOR,
    [xc]: i.ONE_MINUS_DST_ALPHA,
    [Ec]: i.CONSTANT_COLOR,
    [bc]: i.ONE_MINUS_CONSTANT_COLOR,
    [Tc]: i.CONSTANT_ALPHA,
    [Ac]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function I(P, se, X, K, ce, oe, Ce, rt, mt, Ze) {
    if (P === yn) {
      g === !0 && (be(i.BLEND), g = !1);
      return;
    }
    if (g === !1 && (ne(i.BLEND), g = !0), P !== cc) {
      if (P !== p || Ze !== y) {
        if ((u !== On || S !== On) && (i.blendEquation(i.FUNC_ADD), u = On, S = On), Ze)
          switch (P) {
            case pi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Ca:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case Pa:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case La:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case pi:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Ca:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case Pa:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case La:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        R = null, A = null, O = null, w = null, E.set(0, 0, 0), C = 0, p = P, y = Ze;
      }
      return;
    }
    ce = ce || se, oe = oe || X, Ce = Ce || K, (se !== u || ce !== S) && (i.blendEquationSeparate(He[se], He[ce]), u = se, S = ce), (X !== R || K !== A || oe !== O || Ce !== w) && (i.blendFuncSeparate(at[X], at[K], at[oe], at[Ce]), R = X, A = K, O = oe, w = Ce), (rt.equals(E) === !1 || mt !== C) && (i.blendColor(rt.r, rt.g, rt.b, mt), E.copy(rt), C = mt), p = P, y = !1;
  }
  function Ct(P, se) {
    P.side === Zt ? be(i.CULL_FACE) : ne(i.CULL_FACE);
    let X = P.side === Tt;
    se && (X = !X), Be(X), P.blending === pi && P.transparent === !1 ? I(yn) : I(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), o.setFunc(P.depthFunc), o.setTest(P.depthTest), o.setMask(P.depthWrite), s.setMask(P.colorWrite);
    const K = P.stencilWrite;
    a.setTest(K), K && (a.setMask(P.stencilWriteMask), a.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), a.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), et(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? ne(i.SAMPLE_ALPHA_TO_COVERAGE) : be(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Be(P) {
    _ !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), _ = P);
  }
  function ze(P) {
    P !== ac ? (ne(i.CULL_FACE), P !== T && (P === Ra ? i.cullFace(i.BACK) : P === oc ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : be(i.CULL_FACE), T = P;
  }
  function Se(P) {
    P !== N && (G && i.lineWidth(P), N = P);
  }
  function et(P, se, X) {
    P ? (ne(i.POLYGON_OFFSET_FILL), (F !== se || z !== X) && (i.polygonOffset(se, X), F = se, z = X)) : be(i.POLYGON_OFFSET_FILL);
  }
  function Me(P) {
    P ? ne(i.SCISSOR_TEST) : be(i.SCISSOR_TEST);
  }
  function b(P) {
    P === void 0 && (P = i.TEXTURE0 + W - 1), Q !== P && (i.activeTexture(P), Q = P);
  }
  function v(P, se, X) {
    X === void 0 && (Q === null ? X = i.TEXTURE0 + W - 1 : X = Q);
    let K = re[X];
    K === void 0 && (K = { type: void 0, texture: void 0 }, re[X] = K), (K.type !== P || K.texture !== se) && (Q !== X && (i.activeTexture(X), Q = X), i.bindTexture(P, se || he[P]), K.type = P, K.texture = se);
  }
  function B() {
    const P = re[Q];
    P !== void 0 && P.type !== void 0 && (i.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function j() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function $() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Z() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ve() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ae() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ue() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Ve() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ee() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function de() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ye() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Te(P) {
    Ue.equals(P) === !1 && (i.scissor(P.x, P.y, P.z, P.w), Ue.copy(P));
  }
  function fe(P) {
    Y.equals(P) === !1 && (i.viewport(P.x, P.y, P.z, P.w), Y.copy(P));
  }
  function ke(P, se) {
    let X = c.get(se);
    X === void 0 && (X = /* @__PURE__ */ new WeakMap(), c.set(se, X));
    let K = X.get(P);
    K === void 0 && (K = i.getUniformBlockIndex(se, P.name), X.set(P, K));
  }
  function De(P, se) {
    const K = c.get(se).get(P);
    l.get(se) !== K && (i.uniformBlockBinding(se, K, P.__bindingPointIndex), l.set(se, K));
  }
  function Je() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), o.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, Q = null, re = {}, d = {}, f = /* @__PURE__ */ new WeakMap(), m = [], x = null, g = !1, p = null, u = null, R = null, A = null, S = null, O = null, w = null, E = new Xe(0, 0, 0), C = 0, y = !1, _ = null, T = null, N = null, F = null, z = null, Ue.set(0, 0, i.canvas.width, i.canvas.height), Y.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), o.reset(), a.reset();
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
    drawBuffers: Ne,
    useProgram: it,
    setBlending: I,
    setMaterial: Ct,
    setFlipSided: Be,
    setCullFace: ze,
    setLineWidth: Se,
    setPolygonOffset: et,
    setScissorTest: Me,
    activeTexture: b,
    bindTexture: v,
    unbindTexture: B,
    compressedTexImage2D: j,
    compressedTexImage3D: $,
    texImage2D: de,
    texImage3D: ye,
    updateUBOMapping: ke,
    uniformBlockBinding: De,
    texStorage2D: Ve,
    texStorage3D: ee,
    texSubImage2D: Z,
    texSubImage3D: ve,
    compressedTexSubImage2D: ae,
    compressedTexSubImage3D: ue,
    scissor: Te,
    viewport: fe,
    reset: Je
  };
}
function To(i, e, t, n) {
  const r = $p(n);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case Zo:
      return i * e;
    case Ko:
      return i * e;
    case $o:
      return i * e * 2;
    case Jo:
      return i * e / r.components * r.byteLength;
    case ua:
      return i * e / r.components * r.byteLength;
    case Qo:
      return i * e * 2 / r.components * r.byteLength;
    case da:
      return i * e * 2 / r.components * r.byteLength;
    case jo:
      return i * e * 3 / r.components * r.byteLength;
    case Ht:
      return i * e * 4 / r.components * r.byteLength;
    case fa:
      return i * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case xr:
    case Mr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Sr:
    case yr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case Ds:
    case Us:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case Ls:
    case Is:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case Ns:
    case Fs:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Os:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case Bs:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case zs:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case ks:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Hs:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Vs:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case Gs:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case Ws:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case Xs:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case Ys:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case qs:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case Zs:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case js:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case Ks:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case $s:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case Er:
    case Js:
    case Qs:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case el:
    case ea:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case ta:
    case na:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function $p(i) {
  switch (i) {
    case hn:
    case Xo:
      return { byteLength: 1, components: 1 };
    case Bi:
    case Yo:
    case zi:
      return { byteLength: 2, components: 1 };
    case ca:
    case ha:
      return { byteLength: 2, components: 4 };
    case Vn:
    case la:
    case an:
      return { byteLength: 4, components: 1 };
    case qo:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function Jp(i, e, t, n, r, s, o) {
  const a = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Ae(), h = /* @__PURE__ */ new WeakMap();
  let d;
  const f = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function x(b, v) {
    return m ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(b, v)
    ) : Rr("canvas");
  }
  function g(b, v, B) {
    let j = 1;
    const $ = Me(b);
    if (($.width > B || $.height > B) && (j = B / Math.max($.width, $.height)), j < 1)
      if (typeof HTMLImageElement < "u" && b instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && b instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && b instanceof ImageBitmap || typeof VideoFrame < "u" && b instanceof VideoFrame) {
        const Z = Math.floor(j * $.width), ve = Math.floor(j * $.height);
        d === void 0 && (d = x(Z, ve));
        const ae = v ? x(Z, ve) : d;
        return ae.width = Z, ae.height = ve, ae.getContext("2d").drawImage(b, 0, 0, Z, ve), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + $.width + "x" + $.height + ") to (" + Z + "x" + ve + ")."), ae;
      } else
        return "data" in b && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + $.width + "x" + $.height + ")."), b;
    return b;
  }
  function p(b) {
    return b.generateMipmaps;
  }
  function u(b) {
    i.generateMipmap(b);
  }
  function R(b) {
    return b.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : b.isWebGL3DRenderTarget ? i.TEXTURE_3D : b.isWebGLArrayRenderTarget || b.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function A(b, v, B, j, $ = !1) {
    if (b !== null) {
      if (i[b] !== void 0) return i[b];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + b + "'");
    }
    let Z = v;
    if (v === i.RED && (B === i.FLOAT && (Z = i.R32F), B === i.HALF_FLOAT && (Z = i.R16F), B === i.UNSIGNED_BYTE && (Z = i.R8)), v === i.RED_INTEGER && (B === i.UNSIGNED_BYTE && (Z = i.R8UI), B === i.UNSIGNED_SHORT && (Z = i.R16UI), B === i.UNSIGNED_INT && (Z = i.R32UI), B === i.BYTE && (Z = i.R8I), B === i.SHORT && (Z = i.R16I), B === i.INT && (Z = i.R32I)), v === i.RG && (B === i.FLOAT && (Z = i.RG32F), B === i.HALF_FLOAT && (Z = i.RG16F), B === i.UNSIGNED_BYTE && (Z = i.RG8)), v === i.RG_INTEGER && (B === i.UNSIGNED_BYTE && (Z = i.RG8UI), B === i.UNSIGNED_SHORT && (Z = i.RG16UI), B === i.UNSIGNED_INT && (Z = i.RG32UI), B === i.BYTE && (Z = i.RG8I), B === i.SHORT && (Z = i.RG16I), B === i.INT && (Z = i.RG32I)), v === i.RGB_INTEGER && (B === i.UNSIGNED_BYTE && (Z = i.RGB8UI), B === i.UNSIGNED_SHORT && (Z = i.RGB16UI), B === i.UNSIGNED_INT && (Z = i.RGB32UI), B === i.BYTE && (Z = i.RGB8I), B === i.SHORT && (Z = i.RGB16I), B === i.INT && (Z = i.RGB32I)), v === i.RGBA_INTEGER && (B === i.UNSIGNED_BYTE && (Z = i.RGBA8UI), B === i.UNSIGNED_SHORT && (Z = i.RGBA16UI), B === i.UNSIGNED_INT && (Z = i.RGBA32UI), B === i.BYTE && (Z = i.RGBA8I), B === i.SHORT && (Z = i.RGBA16I), B === i.INT && (Z = i.RGBA32I)), v === i.RGB && B === i.UNSIGNED_INT_5_9_9_9_REV && (Z = i.RGB9_E5), v === i.RGBA) {
      const ve = $ ? Ur : Ge.getTransfer(j);
      B === i.FLOAT && (Z = i.RGBA32F), B === i.HALF_FLOAT && (Z = i.RGBA16F), B === i.UNSIGNED_BYTE && (Z = ve === je ? i.SRGB8_ALPHA8 : i.RGBA8), B === i.UNSIGNED_SHORT_4_4_4_4 && (Z = i.RGBA4), B === i.UNSIGNED_SHORT_5_5_5_1 && (Z = i.RGB5_A1);
    }
    return (Z === i.R16F || Z === i.R32F || Z === i.RG16F || Z === i.RG32F || Z === i.RGBA16F || Z === i.RGBA32F) && e.get("EXT_color_buffer_float"), Z;
  }
  function S(b, v) {
    let B;
    return b ? v === null || v === Vn || v === Mi ? B = i.DEPTH24_STENCIL8 : v === an ? B = i.DEPTH32F_STENCIL8 : v === Bi && (B = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : v === null || v === Vn || v === Mi ? B = i.DEPTH_COMPONENT24 : v === an ? B = i.DEPTH_COMPONENT32F : v === Bi && (B = i.DEPTH_COMPONENT16), B;
  }
  function O(b, v) {
    return p(b) === !0 || b.isFramebufferTexture && b.minFilter !== Gt && b.minFilter !== Nt ? Math.log2(Math.max(v.width, v.height)) + 1 : b.mipmaps !== void 0 && b.mipmaps.length > 0 ? b.mipmaps.length : b.isCompressedTexture && Array.isArray(b.image) ? v.mipmaps.length : 1;
  }
  function w(b) {
    const v = b.target;
    v.removeEventListener("dispose", w), C(v), v.isVideoTexture && h.delete(v);
  }
  function E(b) {
    const v = b.target;
    v.removeEventListener("dispose", E), _(v);
  }
  function C(b) {
    const v = n.get(b);
    if (v.__webglInit === void 0) return;
    const B = b.source, j = f.get(B);
    if (j) {
      const $ = j[v.__cacheKey];
      $.usedTimes--, $.usedTimes === 0 && y(b), Object.keys(j).length === 0 && f.delete(B);
    }
    n.remove(b);
  }
  function y(b) {
    const v = n.get(b);
    i.deleteTexture(v.__webglTexture);
    const B = b.source, j = f.get(B);
    delete j[v.__cacheKey], o.memory.textures--;
  }
  function _(b) {
    const v = n.get(b);
    if (b.depthTexture && (b.depthTexture.dispose(), n.remove(b.depthTexture)), b.isWebGLCubeRenderTarget)
      for (let j = 0; j < 6; j++) {
        if (Array.isArray(v.__webglFramebuffer[j]))
          for (let $ = 0; $ < v.__webglFramebuffer[j].length; $++) i.deleteFramebuffer(v.__webglFramebuffer[j][$]);
        else
          i.deleteFramebuffer(v.__webglFramebuffer[j]);
        v.__webglDepthbuffer && i.deleteRenderbuffer(v.__webglDepthbuffer[j]);
      }
    else {
      if (Array.isArray(v.__webglFramebuffer))
        for (let j = 0; j < v.__webglFramebuffer.length; j++) i.deleteFramebuffer(v.__webglFramebuffer[j]);
      else
        i.deleteFramebuffer(v.__webglFramebuffer);
      if (v.__webglDepthbuffer && i.deleteRenderbuffer(v.__webglDepthbuffer), v.__webglMultisampledFramebuffer && i.deleteFramebuffer(v.__webglMultisampledFramebuffer), v.__webglColorRenderbuffer)
        for (let j = 0; j < v.__webglColorRenderbuffer.length; j++)
          v.__webglColorRenderbuffer[j] && i.deleteRenderbuffer(v.__webglColorRenderbuffer[j]);
      v.__webglDepthRenderbuffer && i.deleteRenderbuffer(v.__webglDepthRenderbuffer);
    }
    const B = b.textures;
    for (let j = 0, $ = B.length; j < $; j++) {
      const Z = n.get(B[j]);
      Z.__webglTexture && (i.deleteTexture(Z.__webglTexture), o.memory.textures--), n.remove(B[j]);
    }
    n.remove(b);
  }
  let T = 0;
  function N() {
    T = 0;
  }
  function F() {
    const b = T;
    return b >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + b + " texture units while this GPU supports only " + r.maxTextures), T += 1, b;
  }
  function z(b) {
    const v = [];
    return v.push(b.wrapS), v.push(b.wrapT), v.push(b.wrapR || 0), v.push(b.magFilter), v.push(b.minFilter), v.push(b.anisotropy), v.push(b.internalFormat), v.push(b.format), v.push(b.type), v.push(b.generateMipmaps), v.push(b.premultiplyAlpha), v.push(b.flipY), v.push(b.unpackAlignment), v.push(b.colorSpace), v.join();
  }
  function W(b, v) {
    const B = n.get(b);
    if (b.isVideoTexture && Se(b), b.isRenderTargetTexture === !1 && b.version > 0 && B.__version !== b.version) {
      const j = b.image;
      if (j === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (j.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Y(B, b, v);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, B.__webglTexture, i.TEXTURE0 + v);
  }
  function G(b, v) {
    const B = n.get(b);
    if (b.version > 0 && B.__version !== b.version) {
      Y(B, b, v);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, B.__webglTexture, i.TEXTURE0 + v);
  }
  function q(b, v) {
    const B = n.get(b);
    if (b.version > 0 && B.__version !== b.version) {
      Y(B, b, v);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, B.__webglTexture, i.TEXTURE0 + v);
  }
  function V(b, v) {
    const B = n.get(b);
    if (b.version > 0 && B.__version !== b.version) {
      J(B, b, v);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, B.__webglTexture, i.TEXTURE0 + v);
  }
  const Q = {
    [Cs]: i.REPEAT,
    [zn]: i.CLAMP_TO_EDGE,
    [Ps]: i.MIRRORED_REPEAT
  }, re = {
    [Gt]: i.NEAREST,
    [Fc]: i.NEAREST_MIPMAP_NEAREST,
    [Xi]: i.NEAREST_MIPMAP_LINEAR,
    [Nt]: i.LINEAR,
    [Br]: i.LINEAR_MIPMAP_NEAREST,
    [kn]: i.LINEAR_MIPMAP_LINEAR
  }, pe = {
    [Hc]: i.NEVER,
    [qc]: i.ALWAYS,
    [Vc]: i.LESS,
    [tl]: i.LEQUAL,
    [Gc]: i.EQUAL,
    [Yc]: i.GEQUAL,
    [Wc]: i.GREATER,
    [Xc]: i.NOTEQUAL
  };
  function Ee(b, v) {
    if (v.type === an && e.has("OES_texture_float_linear") === !1 && (v.magFilter === Nt || v.magFilter === Br || v.magFilter === Xi || v.magFilter === kn || v.minFilter === Nt || v.minFilter === Br || v.minFilter === Xi || v.minFilter === kn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(b, i.TEXTURE_WRAP_S, Q[v.wrapS]), i.texParameteri(b, i.TEXTURE_WRAP_T, Q[v.wrapT]), (b === i.TEXTURE_3D || b === i.TEXTURE_2D_ARRAY) && i.texParameteri(b, i.TEXTURE_WRAP_R, Q[v.wrapR]), i.texParameteri(b, i.TEXTURE_MAG_FILTER, re[v.magFilter]), i.texParameteri(b, i.TEXTURE_MIN_FILTER, re[v.minFilter]), v.compareFunction && (i.texParameteri(b, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(b, i.TEXTURE_COMPARE_FUNC, pe[v.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (v.magFilter === Gt || v.minFilter !== Xi && v.minFilter !== kn || v.type === an && e.has("OES_texture_float_linear") === !1) return;
      if (v.anisotropy > 1 || n.get(v).__currentAnisotropy) {
        const B = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(b, B.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(v.anisotropy, r.getMaxAnisotropy())), n.get(v).__currentAnisotropy = v.anisotropy;
      }
    }
  }
  function Ue(b, v) {
    let B = !1;
    b.__webglInit === void 0 && (b.__webglInit = !0, v.addEventListener("dispose", w));
    const j = v.source;
    let $ = f.get(j);
    $ === void 0 && ($ = {}, f.set(j, $));
    const Z = z(v);
    if (Z !== b.__cacheKey) {
      $[Z] === void 0 && ($[Z] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, B = !0), $[Z].usedTimes++;
      const ve = $[b.__cacheKey];
      ve !== void 0 && ($[b.__cacheKey].usedTimes--, ve.usedTimes === 0 && y(v)), b.__cacheKey = Z, b.__webglTexture = $[Z].texture;
    }
    return B;
  }
  function Y(b, v, B) {
    let j = i.TEXTURE_2D;
    (v.isDataArrayTexture || v.isCompressedArrayTexture) && (j = i.TEXTURE_2D_ARRAY), v.isData3DTexture && (j = i.TEXTURE_3D);
    const $ = Ue(b, v), Z = v.source;
    t.bindTexture(j, b.__webglTexture, i.TEXTURE0 + B);
    const ve = n.get(Z);
    if (Z.version !== ve.__version || $ === !0) {
      t.activeTexture(i.TEXTURE0 + B);
      const ae = Ge.getPrimaries(Ge.workingColorSpace), ue = v.colorSpace === Sn ? null : Ge.getPrimaries(v.colorSpace), Ve = v.colorSpace === Sn || ae === ue ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, v.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, v.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ve);
      let ee = g(v.image, !1, r.maxTextureSize);
      ee = et(v, ee);
      const de = s.convert(v.format, v.colorSpace), ye = s.convert(v.type);
      let Te = A(v.internalFormat, de, ye, v.colorSpace, v.isVideoTexture);
      Ee(j, v);
      let fe;
      const ke = v.mipmaps, De = v.isVideoTexture !== !0, Je = ve.__version === void 0 || $ === !0, P = Z.dataReady, se = O(v, ee);
      if (v.isDepthTexture)
        Te = S(v.format === Si, v.type), Je && (De ? t.texStorage2D(i.TEXTURE_2D, 1, Te, ee.width, ee.height) : t.texImage2D(i.TEXTURE_2D, 0, Te, ee.width, ee.height, 0, de, ye, null));
      else if (v.isDataTexture)
        if (ke.length > 0) {
          De && Je && t.texStorage2D(i.TEXTURE_2D, se, Te, ke[0].width, ke[0].height);
          for (let X = 0, K = ke.length; X < K; X++)
            fe = ke[X], De ? P && t.texSubImage2D(i.TEXTURE_2D, X, 0, 0, fe.width, fe.height, de, ye, fe.data) : t.texImage2D(i.TEXTURE_2D, X, Te, fe.width, fe.height, 0, de, ye, fe.data);
          v.generateMipmaps = !1;
        } else
          De ? (Je && t.texStorage2D(i.TEXTURE_2D, se, Te, ee.width, ee.height), P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, ee.width, ee.height, de, ye, ee.data)) : t.texImage2D(i.TEXTURE_2D, 0, Te, ee.width, ee.height, 0, de, ye, ee.data);
      else if (v.isCompressedTexture)
        if (v.isCompressedArrayTexture) {
          De && Je && t.texStorage3D(i.TEXTURE_2D_ARRAY, se, Te, ke[0].width, ke[0].height, ee.depth);
          for (let X = 0, K = ke.length; X < K; X++)
            if (fe = ke[X], v.format !== Ht)
              if (de !== null)
                if (De) {
                  if (P)
                    if (v.layerUpdates.size > 0) {
                      const ce = To(fe.width, fe.height, v.format, v.type);
                      for (const oe of v.layerUpdates) {
                        const Ce = fe.data.subarray(
                          oe * ce / fe.data.BYTES_PER_ELEMENT,
                          (oe + 1) * ce / fe.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, X, 0, 0, oe, fe.width, fe.height, 1, de, Ce);
                      }
                      v.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, X, 0, 0, 0, fe.width, fe.height, ee.depth, de, fe.data);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, X, Te, fe.width, fe.height, ee.depth, 0, fe.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              De ? P && t.texSubImage3D(i.TEXTURE_2D_ARRAY, X, 0, 0, 0, fe.width, fe.height, ee.depth, de, ye, fe.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, X, Te, fe.width, fe.height, ee.depth, 0, de, ye, fe.data);
        } else {
          De && Je && t.texStorage2D(i.TEXTURE_2D, se, Te, ke[0].width, ke[0].height);
          for (let X = 0, K = ke.length; X < K; X++)
            fe = ke[X], v.format !== Ht ? de !== null ? De ? P && t.compressedTexSubImage2D(i.TEXTURE_2D, X, 0, 0, fe.width, fe.height, de, fe.data) : t.compressedTexImage2D(i.TEXTURE_2D, X, Te, fe.width, fe.height, 0, fe.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : De ? P && t.texSubImage2D(i.TEXTURE_2D, X, 0, 0, fe.width, fe.height, de, ye, fe.data) : t.texImage2D(i.TEXTURE_2D, X, Te, fe.width, fe.height, 0, de, ye, fe.data);
        }
      else if (v.isDataArrayTexture)
        if (De) {
          if (Je && t.texStorage3D(i.TEXTURE_2D_ARRAY, se, Te, ee.width, ee.height, ee.depth), P)
            if (v.layerUpdates.size > 0) {
              const X = To(ee.width, ee.height, v.format, v.type);
              for (const K of v.layerUpdates) {
                const ce = ee.data.subarray(
                  K * X / ee.data.BYTES_PER_ELEMENT,
                  (K + 1) * X / ee.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, K, ee.width, ee.height, 1, de, ye, ce);
              }
              v.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, ee.width, ee.height, ee.depth, de, ye, ee.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, Te, ee.width, ee.height, ee.depth, 0, de, ye, ee.data);
      else if (v.isData3DTexture)
        De ? (Je && t.texStorage3D(i.TEXTURE_3D, se, Te, ee.width, ee.height, ee.depth), P && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, ee.width, ee.height, ee.depth, de, ye, ee.data)) : t.texImage3D(i.TEXTURE_3D, 0, Te, ee.width, ee.height, ee.depth, 0, de, ye, ee.data);
      else if (v.isFramebufferTexture) {
        if (Je)
          if (De)
            t.texStorage2D(i.TEXTURE_2D, se, Te, ee.width, ee.height);
          else {
            let X = ee.width, K = ee.height;
            for (let ce = 0; ce < se; ce++)
              t.texImage2D(i.TEXTURE_2D, ce, Te, X, K, 0, de, ye, null), X >>= 1, K >>= 1;
          }
      } else if (ke.length > 0) {
        if (De && Je) {
          const X = Me(ke[0]);
          t.texStorage2D(i.TEXTURE_2D, se, Te, X.width, X.height);
        }
        for (let X = 0, K = ke.length; X < K; X++)
          fe = ke[X], De ? P && t.texSubImage2D(i.TEXTURE_2D, X, 0, 0, de, ye, fe) : t.texImage2D(i.TEXTURE_2D, X, Te, de, ye, fe);
        v.generateMipmaps = !1;
      } else if (De) {
        if (Je) {
          const X = Me(ee);
          t.texStorage2D(i.TEXTURE_2D, se, Te, X.width, X.height);
        }
        P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, de, ye, ee);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, Te, de, ye, ee);
      p(v) && u(j), ve.__version = Z.version, v.onUpdate && v.onUpdate(v);
    }
    b.__version = v.version;
  }
  function J(b, v, B) {
    if (v.image.length !== 6) return;
    const j = Ue(b, v), $ = v.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, b.__webglTexture, i.TEXTURE0 + B);
    const Z = n.get($);
    if ($.version !== Z.__version || j === !0) {
      t.activeTexture(i.TEXTURE0 + B);
      const ve = Ge.getPrimaries(Ge.workingColorSpace), ae = v.colorSpace === Sn ? null : Ge.getPrimaries(v.colorSpace), ue = v.colorSpace === Sn || ve === ae ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, v.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, v.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ue);
      const Ve = v.isCompressedTexture || v.image[0].isCompressedTexture, ee = v.image[0] && v.image[0].isDataTexture, de = [];
      for (let K = 0; K < 6; K++)
        !Ve && !ee ? de[K] = g(v.image[K], !0, r.maxCubemapSize) : de[K] = ee ? v.image[K].image : v.image[K], de[K] = et(v, de[K]);
      const ye = de[0], Te = s.convert(v.format, v.colorSpace), fe = s.convert(v.type), ke = A(v.internalFormat, Te, fe, v.colorSpace), De = v.isVideoTexture !== !0, Je = Z.__version === void 0 || j === !0, P = $.dataReady;
      let se = O(v, ye);
      Ee(i.TEXTURE_CUBE_MAP, v);
      let X;
      if (Ve) {
        De && Je && t.texStorage2D(i.TEXTURE_CUBE_MAP, se, ke, ye.width, ye.height);
        for (let K = 0; K < 6; K++) {
          X = de[K].mipmaps;
          for (let ce = 0; ce < X.length; ce++) {
            const oe = X[ce];
            v.format !== Ht ? Te !== null ? De ? P && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce, 0, 0, oe.width, oe.height, Te, oe.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce, ke, oe.width, oe.height, 0, oe.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : De ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce, 0, 0, oe.width, oe.height, Te, fe, oe.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce, ke, oe.width, oe.height, 0, Te, fe, oe.data);
          }
        }
      } else {
        if (X = v.mipmaps, De && Je) {
          X.length > 0 && se++;
          const K = Me(de[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, se, ke, K.width, K.height);
        }
        for (let K = 0; K < 6; K++)
          if (ee) {
            De ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, de[K].width, de[K].height, Te, fe, de[K].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, ke, de[K].width, de[K].height, 0, Te, fe, de[K].data);
            for (let ce = 0; ce < X.length; ce++) {
              const Ce = X[ce].image[K].image;
              De ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce + 1, 0, 0, Ce.width, Ce.height, Te, fe, Ce.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce + 1, ke, Ce.width, Ce.height, 0, Te, fe, Ce.data);
            }
          } else {
            De ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, Te, fe, de[K]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, ke, Te, fe, de[K]);
            for (let ce = 0; ce < X.length; ce++) {
              const oe = X[ce];
              De ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce + 1, 0, 0, Te, fe, oe.image[K]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce + 1, ke, Te, fe, oe.image[K]);
            }
          }
      }
      p(v) && u(i.TEXTURE_CUBE_MAP), Z.__version = $.version, v.onUpdate && v.onUpdate(v);
    }
    b.__version = v.version;
  }
  function he(b, v, B, j, $, Z) {
    const ve = s.convert(B.format, B.colorSpace), ae = s.convert(B.type), ue = A(B.internalFormat, ve, ae, B.colorSpace), Ve = n.get(v), ee = n.get(B);
    if (ee.__renderTarget = v, !Ve.__hasExternalTextures) {
      const de = Math.max(1, v.width >> Z), ye = Math.max(1, v.height >> Z);
      $ === i.TEXTURE_3D || $ === i.TEXTURE_2D_ARRAY ? t.texImage3D($, Z, ue, de, ye, v.depth, 0, ve, ae, null) : t.texImage2D($, Z, ue, de, ye, 0, ve, ae, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, b), ze(v) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, j, $, ee.__webglTexture, 0, Be(v)) : ($ === i.TEXTURE_2D || $ >= i.TEXTURE_CUBE_MAP_POSITIVE_X && $ <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, j, $, ee.__webglTexture, Z), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function ne(b, v, B) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, b), v.depthBuffer) {
      const j = v.depthTexture, $ = j && j.isDepthTexture ? j.type : null, Z = S(v.stencilBuffer, $), ve = v.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ae = Be(v);
      ze(v) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ae, Z, v.width, v.height) : B ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ae, Z, v.width, v.height) : i.renderbufferStorage(i.RENDERBUFFER, Z, v.width, v.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, ve, i.RENDERBUFFER, b);
    } else {
      const j = v.textures;
      for (let $ = 0; $ < j.length; $++) {
        const Z = j[$], ve = s.convert(Z.format, Z.colorSpace), ae = s.convert(Z.type), ue = A(Z.internalFormat, ve, ae, Z.colorSpace), Ve = Be(v);
        B && ze(v) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Ve, ue, v.width, v.height) : ze(v) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Ve, ue, v.width, v.height) : i.renderbufferStorage(i.RENDERBUFFER, ue, v.width, v.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function be(b, v) {
    if (v && v.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, b), !(v.depthTexture && v.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const j = n.get(v.depthTexture);
    j.__renderTarget = v, (!j.__webglTexture || v.depthTexture.image.width !== v.width || v.depthTexture.image.height !== v.height) && (v.depthTexture.image.width = v.width, v.depthTexture.image.height = v.height, v.depthTexture.needsUpdate = !0), W(v.depthTexture, 0);
    const $ = j.__webglTexture, Z = Be(v);
    if (v.depthTexture.format === mi)
      ze(v) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else if (v.depthTexture.format === Si)
      ze(v) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Re(b) {
    const v = n.get(b), B = b.isWebGLCubeRenderTarget === !0;
    if (v.__boundDepthTexture !== b.depthTexture) {
      const j = b.depthTexture;
      if (v.__depthDisposeCallback && v.__depthDisposeCallback(), j) {
        const $ = () => {
          delete v.__boundDepthTexture, delete v.__depthDisposeCallback, j.removeEventListener("dispose", $);
        };
        j.addEventListener("dispose", $), v.__depthDisposeCallback = $;
      }
      v.__boundDepthTexture = j;
    }
    if (b.depthTexture && !v.__autoAllocateDepthBuffer) {
      if (B) throw new Error("target.depthTexture not supported in Cube render targets");
      be(v.__webglFramebuffer, b);
    } else if (B) {
      v.__webglDepthbuffer = [];
      for (let j = 0; j < 6; j++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, v.__webglFramebuffer[j]), v.__webglDepthbuffer[j] === void 0)
          v.__webglDepthbuffer[j] = i.createRenderbuffer(), ne(v.__webglDepthbuffer[j], b, !1);
        else {
          const $ = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = v.__webglDepthbuffer[j];
          i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, $, i.RENDERBUFFER, Z);
        }
    } else if (t.bindFramebuffer(i.FRAMEBUFFER, v.__webglFramebuffer), v.__webglDepthbuffer === void 0)
      v.__webglDepthbuffer = i.createRenderbuffer(), ne(v.__webglDepthbuffer, b, !1);
    else {
      const j = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, $ = v.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, $), i.framebufferRenderbuffer(i.FRAMEBUFFER, j, i.RENDERBUFFER, $);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ne(b, v, B) {
    const j = n.get(b);
    v !== void 0 && he(j.__webglFramebuffer, b, b.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), B !== void 0 && Re(b);
  }
  function it(b) {
    const v = b.texture, B = n.get(b), j = n.get(v);
    b.addEventListener("dispose", E);
    const $ = b.textures, Z = b.isWebGLCubeRenderTarget === !0, ve = $.length > 1;
    if (ve || (j.__webglTexture === void 0 && (j.__webglTexture = i.createTexture()), j.__version = v.version, o.memory.textures++), Z) {
      B.__webglFramebuffer = [];
      for (let ae = 0; ae < 6; ae++)
        if (v.mipmaps && v.mipmaps.length > 0) {
          B.__webglFramebuffer[ae] = [];
          for (let ue = 0; ue < v.mipmaps.length; ue++)
            B.__webglFramebuffer[ae][ue] = i.createFramebuffer();
        } else
          B.__webglFramebuffer[ae] = i.createFramebuffer();
    } else {
      if (v.mipmaps && v.mipmaps.length > 0) {
        B.__webglFramebuffer = [];
        for (let ae = 0; ae < v.mipmaps.length; ae++)
          B.__webglFramebuffer[ae] = i.createFramebuffer();
      } else
        B.__webglFramebuffer = i.createFramebuffer();
      if (ve)
        for (let ae = 0, ue = $.length; ae < ue; ae++) {
          const Ve = n.get($[ae]);
          Ve.__webglTexture === void 0 && (Ve.__webglTexture = i.createTexture(), o.memory.textures++);
        }
      if (b.samples > 0 && ze(b) === !1) {
        B.__webglMultisampledFramebuffer = i.createFramebuffer(), B.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, B.__webglMultisampledFramebuffer);
        for (let ae = 0; ae < $.length; ae++) {
          const ue = $[ae];
          B.__webglColorRenderbuffer[ae] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, B.__webglColorRenderbuffer[ae]);
          const Ve = s.convert(ue.format, ue.colorSpace), ee = s.convert(ue.type), de = A(ue.internalFormat, Ve, ee, ue.colorSpace, b.isXRRenderTarget === !0), ye = Be(b);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, ye, de, b.width, b.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ae, i.RENDERBUFFER, B.__webglColorRenderbuffer[ae]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), b.depthBuffer && (B.__webglDepthRenderbuffer = i.createRenderbuffer(), ne(B.__webglDepthRenderbuffer, b, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (Z) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, j.__webglTexture), Ee(i.TEXTURE_CUBE_MAP, v);
      for (let ae = 0; ae < 6; ae++)
        if (v.mipmaps && v.mipmaps.length > 0)
          for (let ue = 0; ue < v.mipmaps.length; ue++)
            he(B.__webglFramebuffer[ae][ue], b, v, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, ue);
        else
          he(B.__webglFramebuffer[ae], b, v, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0);
      p(v) && u(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (ve) {
      for (let ae = 0, ue = $.length; ae < ue; ae++) {
        const Ve = $[ae], ee = n.get(Ve);
        t.bindTexture(i.TEXTURE_2D, ee.__webglTexture), Ee(i.TEXTURE_2D, Ve), he(B.__webglFramebuffer, b, Ve, i.COLOR_ATTACHMENT0 + ae, i.TEXTURE_2D, 0), p(Ve) && u(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let ae = i.TEXTURE_2D;
      if ((b.isWebGL3DRenderTarget || b.isWebGLArrayRenderTarget) && (ae = b.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(ae, j.__webglTexture), Ee(ae, v), v.mipmaps && v.mipmaps.length > 0)
        for (let ue = 0; ue < v.mipmaps.length; ue++)
          he(B.__webglFramebuffer[ue], b, v, i.COLOR_ATTACHMENT0, ae, ue);
      else
        he(B.__webglFramebuffer, b, v, i.COLOR_ATTACHMENT0, ae, 0);
      p(v) && u(ae), t.unbindTexture();
    }
    b.depthBuffer && Re(b);
  }
  function He(b) {
    const v = b.textures;
    for (let B = 0, j = v.length; B < j; B++) {
      const $ = v[B];
      if (p($)) {
        const Z = R(b), ve = n.get($).__webglTexture;
        t.bindTexture(Z, ve), u(Z), t.unbindTexture();
      }
    }
  }
  const at = [], I = [];
  function Ct(b) {
    if (b.samples > 0) {
      if (ze(b) === !1) {
        const v = b.textures, B = b.width, j = b.height;
        let $ = i.COLOR_BUFFER_BIT;
        const Z = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ve = n.get(b), ae = v.length > 1;
        if (ae)
          for (let ue = 0; ue < v.length; ue++)
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, ve.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ve.__webglFramebuffer);
        for (let ue = 0; ue < v.length; ue++) {
          if (b.resolveDepthBuffer && (b.depthBuffer && ($ |= i.DEPTH_BUFFER_BIT), b.stencilBuffer && b.resolveStencilBuffer && ($ |= i.STENCIL_BUFFER_BIT)), ae) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ve.__webglColorRenderbuffer[ue]);
            const Ve = n.get(v[ue]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Ve, 0);
          }
          i.blitFramebuffer(0, 0, B, j, 0, 0, B, j, $, i.NEAREST), l === !0 && (at.length = 0, I.length = 0, at.push(i.COLOR_ATTACHMENT0 + ue), b.depthBuffer && b.resolveDepthBuffer === !1 && (at.push(Z), I.push(Z), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, I)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, at));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ae)
          for (let ue = 0; ue < v.length; ue++) {
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.RENDERBUFFER, ve.__webglColorRenderbuffer[ue]);
            const Ve = n.get(v[ue]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.TEXTURE_2D, Ve, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ve.__webglMultisampledFramebuffer);
      } else if (b.depthBuffer && b.resolveDepthBuffer === !1 && l) {
        const v = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [v]);
      }
    }
  }
  function Be(b) {
    return Math.min(r.maxSamples, b.samples);
  }
  function ze(b) {
    const v = n.get(b);
    return b.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && v.__useRenderToTexture !== !1;
  }
  function Se(b) {
    const v = o.render.frame;
    h.get(b) !== v && (h.set(b, v), b.update());
  }
  function et(b, v) {
    const B = b.colorSpace, j = b.format, $ = b.type;
    return b.isCompressedTexture === !0 || b.isVideoTexture === !0 || B !== Ei && B !== Sn && (Ge.getTransfer(B) === je ? (j !== Ht || $ !== hn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", B)), v;
  }
  function Me(b) {
    return typeof HTMLImageElement < "u" && b instanceof HTMLImageElement ? (c.width = b.naturalWidth || b.width, c.height = b.naturalHeight || b.height) : typeof VideoFrame < "u" && b instanceof VideoFrame ? (c.width = b.displayWidth, c.height = b.displayHeight) : (c.width = b.width, c.height = b.height), c;
  }
  this.allocateTextureUnit = F, this.resetTextureUnits = N, this.setTexture2D = W, this.setTexture2DArray = G, this.setTexture3D = q, this.setTextureCube = V, this.rebindTextures = Ne, this.setupRenderTarget = it, this.updateRenderTargetMipmap = He, this.updateMultisampleRenderTarget = Ct, this.setupDepthRenderbuffer = Re, this.setupFrameBufferTexture = he, this.useMultisampledRTT = ze;
}
function Qp(i, e) {
  function t(n, r = Sn) {
    let s;
    const o = Ge.getTransfer(r);
    if (n === hn) return i.UNSIGNED_BYTE;
    if (n === ca) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === ha) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === qo) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === Xo) return i.BYTE;
    if (n === Yo) return i.SHORT;
    if (n === Bi) return i.UNSIGNED_SHORT;
    if (n === la) return i.INT;
    if (n === Vn) return i.UNSIGNED_INT;
    if (n === an) return i.FLOAT;
    if (n === zi) return i.HALF_FLOAT;
    if (n === Zo) return i.ALPHA;
    if (n === jo) return i.RGB;
    if (n === Ht) return i.RGBA;
    if (n === Ko) return i.LUMINANCE;
    if (n === $o) return i.LUMINANCE_ALPHA;
    if (n === mi) return i.DEPTH_COMPONENT;
    if (n === Si) return i.DEPTH_STENCIL;
    if (n === Jo) return i.RED;
    if (n === ua) return i.RED_INTEGER;
    if (n === Qo) return i.RG;
    if (n === da) return i.RG_INTEGER;
    if (n === fa) return i.RGBA_INTEGER;
    if (n === xr || n === Mr || n === Sr || n === yr)
      if (o === je)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === xr) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === Mr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === Sr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === yr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === xr) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === Mr) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === Sr) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === yr) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === Ls || n === Ds || n === Is || n === Us)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === Ls) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Ds) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === Is) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === Us) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === Ns || n === Fs || n === Os)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === Ns || n === Fs) return o === je ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === Os) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === Bs || n === zs || n === ks || n === Hs || n === Vs || n === Gs || n === Ws || n === Xs || n === Ys || n === qs || n === Zs || n === js || n === Ks || n === $s)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === Bs) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === zs) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === ks) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === Hs) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Vs) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Gs) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === Ws) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === Xs) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === Ys) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === qs) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === Zs) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === js) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === Ks) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === $s) return o === je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === Er || n === Js || n === Qs)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === Er) return o === je ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === Js) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === Qs) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === el || n === ea || n === ta || n === na)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === Er) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === ea) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === ta) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === na) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === Mi ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
class em extends It {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class Hn extends yt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const tm = { type: "move" };
class ds {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Hn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Hn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new U(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new U()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Hn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new U(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new U()), this._grip;
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
        for (const g of e.hand.values()) {
          const p = t.getJointPose(g, n), u = this._getHandJoint(c, g);
          p !== null && (u.matrix.fromArray(p.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = !0, u.jointRadius = p.radius), u.visible = p !== null;
        }
        const h = c.joints["index-finger-tip"], d = c.joints["thumb-tip"], f = h.position.distanceTo(d.position), m = 0.02, x = 5e-3;
        c.inputState.pinching && f > m + x ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && f <= m - x && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      a !== null && (r = t.getPose(e.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (a.matrix.fromArray(r.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(r.linearVelocity)) : a.hasLinearVelocity = !1, r.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(r.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(tm)));
    }
    return a !== null && (a.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = o !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new Hn();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const nm = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, im = `
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
class rm {
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
      const t = e.cameras[0].viewport, n = new An({
        vertexShader: nm,
        fragmentShader: im,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Vt(new Vi(20, 20), n);
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
class sm extends Xn {
  constructor(e, t) {
    super();
    const n = this;
    let r = null, s = 1, o = null, a = "local-floor", l = 1, c = null, h = null, d = null, f = null, m = null, x = null;
    const g = new rm(), p = t.getContextAttributes();
    let u = null, R = null;
    const A = [], S = [], O = new Ae();
    let w = null;
    const E = new It();
    E.viewport = new ot();
    const C = new It();
    C.viewport = new ot();
    const y = [E, C], _ = new em();
    let T = null, N = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let J = A[Y];
      return J === void 0 && (J = new ds(), A[Y] = J), J.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let J = A[Y];
      return J === void 0 && (J = new ds(), A[Y] = J), J.getGripSpace();
    }, this.getHand = function(Y) {
      let J = A[Y];
      return J === void 0 && (J = new ds(), A[Y] = J), J.getHandSpace();
    };
    function F(Y) {
      const J = S.indexOf(Y.inputSource);
      if (J === -1)
        return;
      const he = A[J];
      he !== void 0 && (he.update(Y.inputSource, Y.frame, c || o), he.dispatchEvent({ type: Y.type, data: Y.inputSource }));
    }
    function z() {
      r.removeEventListener("select", F), r.removeEventListener("selectstart", F), r.removeEventListener("selectend", F), r.removeEventListener("squeeze", F), r.removeEventListener("squeezestart", F), r.removeEventListener("squeezeend", F), r.removeEventListener("end", z), r.removeEventListener("inputsourceschange", W);
      for (let Y = 0; Y < A.length; Y++) {
        const J = S[Y];
        J !== null && (S[Y] = null, A[Y].disconnect(J));
      }
      T = null, N = null, g.reset(), e.setRenderTarget(u), m = null, f = null, d = null, r = null, R = null, Ue.stop(), n.isPresenting = !1, e.setPixelRatio(w), e.setSize(O.width, O.height, !1), n.dispatchEvent({ type: "sessionend" });
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
      return f !== null ? f : m;
    }, this.getBinding = function() {
      return d;
    }, this.getFrame = function() {
      return x;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(Y) {
      if (r = Y, r !== null) {
        if (u = e.getRenderTarget(), r.addEventListener("select", F), r.addEventListener("selectstart", F), r.addEventListener("selectend", F), r.addEventListener("squeeze", F), r.addEventListener("squeezestart", F), r.addEventListener("squeezeend", F), r.addEventListener("end", z), r.addEventListener("inputsourceschange", W), p.xrCompatible !== !0 && await t.makeXRCompatible(), w = e.getPixelRatio(), e.getSize(O), r.renderState.layers === void 0) {
          const J = {
            antialias: p.antialias,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: s
          };
          m = new XRWebGLLayer(r, t, J), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), R = new Gn(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: Ht,
              type: hn,
              colorSpace: e.outputColorSpace,
              stencilBuffer: p.stencil
            }
          );
        } else {
          let J = null, he = null, ne = null;
          p.depth && (ne = p.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, J = p.stencil ? Si : mi, he = p.stencil ? Mi : Vn);
          const be = {
            colorFormat: t.RGBA8,
            depthFormat: ne,
            scaleFactor: s
          };
          d = new XRWebGLBinding(r, t), f = d.createProjectionLayer(be), r.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), R = new Gn(
            f.textureWidth,
            f.textureHeight,
            {
              format: Ht,
              type: hn,
              depthTexture: new ml(f.textureWidth, f.textureHeight, he, void 0, void 0, void 0, void 0, void 0, void 0, J),
              stencilBuffer: p.stencil,
              colorSpace: e.outputColorSpace,
              samples: p.antialias ? 4 : 0,
              resolveDepthBuffer: f.ignoreDepthValues === !1
            }
          );
        }
        R.isXRRenderTarget = !0, this.setFoveation(l), c = null, o = await r.requestReferenceSpace(a), Ue.setContext(r), Ue.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return g.getDepthTexture();
    };
    function W(Y) {
      for (let J = 0; J < Y.removed.length; J++) {
        const he = Y.removed[J], ne = S.indexOf(he);
        ne >= 0 && (S[ne] = null, A[ne].disconnect(he));
      }
      for (let J = 0; J < Y.added.length; J++) {
        const he = Y.added[J];
        let ne = S.indexOf(he);
        if (ne === -1) {
          for (let Re = 0; Re < A.length; Re++)
            if (Re >= S.length) {
              S.push(he), ne = Re;
              break;
            } else if (S[Re] === null) {
              S[Re] = he, ne = Re;
              break;
            }
          if (ne === -1) break;
        }
        const be = A[ne];
        be && be.connect(he);
      }
    }
    const G = new U(), q = new U();
    function V(Y, J, he) {
      G.setFromMatrixPosition(J.matrixWorld), q.setFromMatrixPosition(he.matrixWorld);
      const ne = G.distanceTo(q), be = J.projectionMatrix.elements, Re = he.projectionMatrix.elements, Ne = be[14] / (be[10] - 1), it = be[14] / (be[10] + 1), He = (be[9] + 1) / be[5], at = (be[9] - 1) / be[5], I = (be[8] - 1) / be[0], Ct = (Re[8] + 1) / Re[0], Be = Ne * I, ze = Ne * Ct, Se = ne / (-I + Ct), et = Se * -I;
      if (J.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(et), Y.translateZ(Se), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), be[10] === -1)
        Y.projectionMatrix.copy(J.projectionMatrix), Y.projectionMatrixInverse.copy(J.projectionMatrixInverse);
      else {
        const Me = Ne + Se, b = it + Se, v = Be - et, B = ze + (ne - et), j = He * it / b * Me, $ = at * it / b * Me;
        Y.projectionMatrix.makePerspective(v, B, j, $, Me, b), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function Q(Y, J) {
      J === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(J.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (r === null) return;
      let J = Y.near, he = Y.far;
      g.texture !== null && (g.depthNear > 0 && (J = g.depthNear), g.depthFar > 0 && (he = g.depthFar)), _.near = C.near = E.near = J, _.far = C.far = E.far = he, (T !== _.near || N !== _.far) && (r.updateRenderState({
        depthNear: _.near,
        depthFar: _.far
      }), T = _.near, N = _.far), E.layers.mask = Y.layers.mask | 2, C.layers.mask = Y.layers.mask | 4, _.layers.mask = E.layers.mask | C.layers.mask;
      const ne = Y.parent, be = _.cameras;
      Q(_, ne);
      for (let Re = 0; Re < be.length; Re++)
        Q(be[Re], ne);
      be.length === 2 ? V(_, E, C) : _.projectionMatrix.copy(E.projectionMatrix), re(Y, _, ne);
    };
    function re(Y, J, he) {
      he === null ? Y.matrix.copy(J.matrixWorld) : (Y.matrix.copy(he.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(J.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(J.projectionMatrix), Y.projectionMatrixInverse.copy(J.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = ra * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return _;
    }, this.getFoveation = function() {
      if (!(f === null && m === null))
        return l;
    }, this.setFoveation = function(Y) {
      l = Y, f !== null && (f.fixedFoveation = Y), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return g.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return g.getMesh(_);
    };
    let pe = null;
    function Ee(Y, J) {
      if (h = J.getViewerPose(c || o), x = J, h !== null) {
        const he = h.views;
        m !== null && (e.setRenderTargetFramebuffer(R, m.framebuffer), e.setRenderTarget(R));
        let ne = !1;
        he.length !== _.cameras.length && (_.cameras.length = 0, ne = !0);
        for (let Re = 0; Re < he.length; Re++) {
          const Ne = he[Re];
          let it = null;
          if (m !== null)
            it = m.getViewport(Ne);
          else {
            const at = d.getViewSubImage(f, Ne);
            it = at.viewport, Re === 0 && (e.setRenderTargetTextures(
              R,
              at.colorTexture,
              f.ignoreDepthValues ? void 0 : at.depthStencilTexture
            ), e.setRenderTarget(R));
          }
          let He = y[Re];
          He === void 0 && (He = new It(), He.layers.enable(Re), He.viewport = new ot(), y[Re] = He), He.matrix.fromArray(Ne.transform.matrix), He.matrix.decompose(He.position, He.quaternion, He.scale), He.projectionMatrix.fromArray(Ne.projectionMatrix), He.projectionMatrixInverse.copy(He.projectionMatrix).invert(), He.viewport.set(it.x, it.y, it.width, it.height), Re === 0 && (_.matrix.copy(He.matrix), _.matrix.decompose(_.position, _.quaternion, _.scale)), ne === !0 && _.cameras.push(He);
        }
        const be = r.enabledFeatures;
        if (be && be.includes("depth-sensing")) {
          const Re = d.getDepthInformation(he[0]);
          Re && Re.isValid && Re.texture && g.init(e, Re, r.renderState);
        }
      }
      for (let he = 0; he < A.length; he++) {
        const ne = S[he], be = A[he];
        ne !== null && be !== void 0 && be.update(ne, J, c || o);
      }
      pe && pe(Y, J), J.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: J }), x = null;
    }
    const Ue = new fl();
    Ue.setAnimationLoop(Ee), this.setAnimationLoop = function(Y) {
      pe = Y;
    }, this.dispose = function() {
    };
  }
}
const Un = /* @__PURE__ */ new un(), am = /* @__PURE__ */ new st();
function om(i, e) {
  function t(p, u) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), u.value.copy(p.matrix);
  }
  function n(p, u) {
    u.color.getRGB(p.fogColor.value, cl(i)), u.isFog ? (p.fogNear.value = u.near, p.fogFar.value = u.far) : u.isFogExp2 && (p.fogDensity.value = u.density);
  }
  function r(p, u, R, A, S) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? s(p, u) : u.isMeshToonMaterial ? (s(p, u), d(p, u)) : u.isMeshPhongMaterial ? (s(p, u), h(p, u)) : u.isMeshStandardMaterial ? (s(p, u), f(p, u), u.isMeshPhysicalMaterial && m(p, u, S)) : u.isMeshMatcapMaterial ? (s(p, u), x(p, u)) : u.isMeshDepthMaterial ? s(p, u) : u.isMeshDistanceMaterial ? (s(p, u), g(p, u)) : u.isMeshNormalMaterial ? s(p, u) : u.isLineBasicMaterial ? (o(p, u), u.isLineDashedMaterial && a(p, u)) : u.isPointsMaterial ? l(p, u, R, A) : u.isSpriteMaterial ? c(p, u) : u.isShadowMaterial ? (p.color.value.copy(u.color), p.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function s(p, u) {
    p.opacity.value = u.opacity, u.color && p.diffuse.value.copy(u.color), u.emissive && p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.bumpMap && (p.bumpMap.value = u.bumpMap, t(u.bumpMap, p.bumpMapTransform), p.bumpScale.value = u.bumpScale, u.side === Tt && (p.bumpScale.value *= -1)), u.normalMap && (p.normalMap.value = u.normalMap, t(u.normalMap, p.normalMapTransform), p.normalScale.value.copy(u.normalScale), u.side === Tt && p.normalScale.value.negate()), u.displacementMap && (p.displacementMap.value = u.displacementMap, t(u.displacementMap, p.displacementMapTransform), p.displacementScale.value = u.displacementScale, p.displacementBias.value = u.displacementBias), u.emissiveMap && (p.emissiveMap.value = u.emissiveMap, t(u.emissiveMap, p.emissiveMapTransform)), u.specularMap && (p.specularMap.value = u.specularMap, t(u.specularMap, p.specularMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
    const R = e.get(u), A = R.envMap, S = R.envMapRotation;
    A && (p.envMap.value = A, Un.copy(S), Un.x *= -1, Un.y *= -1, Un.z *= -1, A.isCubeTexture && A.isRenderTargetTexture === !1 && (Un.y *= -1, Un.z *= -1), p.envMapRotation.value.setFromMatrix4(am.makeRotationFromEuler(Un)), p.flipEnvMap.value = A.isCubeTexture && A.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = u.reflectivity, p.ior.value = u.ior, p.refractionRatio.value = u.refractionRatio), u.lightMap && (p.lightMap.value = u.lightMap, p.lightMapIntensity.value = u.lightMapIntensity, t(u.lightMap, p.lightMapTransform)), u.aoMap && (p.aoMap.value = u.aoMap, p.aoMapIntensity.value = u.aoMapIntensity, t(u.aoMap, p.aoMapTransform));
  }
  function o(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, u.map && (p.map.value = u.map, t(u.map, p.mapTransform));
  }
  function a(p, u) {
    p.dashSize.value = u.dashSize, p.totalSize.value = u.dashSize + u.gapSize, p.scale.value = u.scale;
  }
  function l(p, u, R, A) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.size.value = u.size * R, p.scale.value = A * 0.5, u.map && (p.map.value = u.map, t(u.map, p.uvTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function c(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.rotation.value = u.rotation, u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function h(p, u) {
    p.specular.value.copy(u.specular), p.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function d(p, u) {
    u.gradientMap && (p.gradientMap.value = u.gradientMap);
  }
  function f(p, u) {
    p.metalness.value = u.metalness, u.metalnessMap && (p.metalnessMap.value = u.metalnessMap, t(u.metalnessMap, p.metalnessMapTransform)), p.roughness.value = u.roughness, u.roughnessMap && (p.roughnessMap.value = u.roughnessMap, t(u.roughnessMap, p.roughnessMapTransform)), u.envMap && (p.envMapIntensity.value = u.envMapIntensity);
  }
  function m(p, u, R) {
    p.ior.value = u.ior, u.sheen > 0 && (p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), p.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (p.sheenColorMap.value = u.sheenColorMap, t(u.sheenColorMap, p.sheenColorMapTransform)), u.sheenRoughnessMap && (p.sheenRoughnessMap.value = u.sheenRoughnessMap, t(u.sheenRoughnessMap, p.sheenRoughnessMapTransform))), u.clearcoat > 0 && (p.clearcoat.value = u.clearcoat, p.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (p.clearcoatMap.value = u.clearcoatMap, t(u.clearcoatMap, p.clearcoatMapTransform)), u.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, t(u.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (p.clearcoatNormalMap.value = u.clearcoatNormalMap, t(u.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === Tt && p.clearcoatNormalScale.value.negate())), u.dispersion > 0 && (p.dispersion.value = u.dispersion), u.iridescence > 0 && (p.iridescence.value = u.iridescence, p.iridescenceIOR.value = u.iridescenceIOR, p.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (p.iridescenceMap.value = u.iridescenceMap, t(u.iridescenceMap, p.iridescenceMapTransform)), u.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = u.iridescenceThicknessMap, t(u.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), u.transmission > 0 && (p.transmission.value = u.transmission, p.transmissionSamplerMap.value = R.texture, p.transmissionSamplerSize.value.set(R.width, R.height), u.transmissionMap && (p.transmissionMap.value = u.transmissionMap, t(u.transmissionMap, p.transmissionMapTransform)), p.thickness.value = u.thickness, u.thicknessMap && (p.thicknessMap.value = u.thicknessMap, t(u.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = u.attenuationDistance, p.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (p.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (p.anisotropyMap.value = u.anisotropyMap, t(u.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = u.specularIntensity, p.specularColor.value.copy(u.specularColor), u.specularColorMap && (p.specularColorMap.value = u.specularColorMap, t(u.specularColorMap, p.specularColorMapTransform)), u.specularIntensityMap && (p.specularIntensityMap.value = u.specularIntensityMap, t(u.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function x(p, u) {
    u.matcap && (p.matcap.value = u.matcap);
  }
  function g(p, u) {
    const R = e.get(u).light;
    p.referencePosition.value.setFromMatrixPosition(R.matrixWorld), p.nearDistance.value = R.shadow.camera.near, p.farDistance.value = R.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function lm(i, e, t, n) {
  let r = {}, s = {}, o = [];
  const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(R, A) {
    const S = A.program;
    n.uniformBlockBinding(R, S);
  }
  function c(R, A) {
    let S = r[R.id];
    S === void 0 && (x(R), S = h(R), r[R.id] = S, R.addEventListener("dispose", p));
    const O = A.program;
    n.updateUBOMapping(R, O);
    const w = e.render.frame;
    s[R.id] !== w && (f(R), s[R.id] = w);
  }
  function h(R) {
    const A = d();
    R.__bindingPointIndex = A;
    const S = i.createBuffer(), O = R.__size, w = R.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, S), i.bufferData(i.UNIFORM_BUFFER, O, w), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, A, S), S;
  }
  function d() {
    for (let R = 0; R < a; R++)
      if (o.indexOf(R) === -1)
        return o.push(R), R;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function f(R) {
    const A = r[R.id], S = R.uniforms, O = R.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, A);
    for (let w = 0, E = S.length; w < E; w++) {
      const C = Array.isArray(S[w]) ? S[w] : [S[w]];
      for (let y = 0, _ = C.length; y < _; y++) {
        const T = C[y];
        if (m(T, w, y, O) === !0) {
          const N = T.__offset, F = Array.isArray(T.value) ? T.value : [T.value];
          let z = 0;
          for (let W = 0; W < F.length; W++) {
            const G = F[W], q = g(G);
            typeof G == "number" || typeof G == "boolean" ? (T.__data[0] = G, i.bufferSubData(i.UNIFORM_BUFFER, N + z, T.__data)) : G.isMatrix3 ? (T.__data[0] = G.elements[0], T.__data[1] = G.elements[1], T.__data[2] = G.elements[2], T.__data[3] = 0, T.__data[4] = G.elements[3], T.__data[5] = G.elements[4], T.__data[6] = G.elements[5], T.__data[7] = 0, T.__data[8] = G.elements[6], T.__data[9] = G.elements[7], T.__data[10] = G.elements[8], T.__data[11] = 0) : (G.toArray(T.__data, z), z += q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, N, T.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(R, A, S, O) {
    const w = R.value, E = A + "_" + S;
    if (O[E] === void 0)
      return typeof w == "number" || typeof w == "boolean" ? O[E] = w : O[E] = w.clone(), !0;
    {
      const C = O[E];
      if (typeof w == "number" || typeof w == "boolean") {
        if (C !== w)
          return O[E] = w, !0;
      } else if (C.equals(w) === !1)
        return C.copy(w), !0;
    }
    return !1;
  }
  function x(R) {
    const A = R.uniforms;
    let S = 0;
    const O = 16;
    for (let E = 0, C = A.length; E < C; E++) {
      const y = Array.isArray(A[E]) ? A[E] : [A[E]];
      for (let _ = 0, T = y.length; _ < T; _++) {
        const N = y[_], F = Array.isArray(N.value) ? N.value : [N.value];
        for (let z = 0, W = F.length; z < W; z++) {
          const G = F[z], q = g(G), V = S % O, Q = V % q.boundary, re = V + Q;
          S += Q, re !== 0 && O - re < q.storage && (S += O - re), N.__data = new Float32Array(q.storage / Float32Array.BYTES_PER_ELEMENT), N.__offset = S, S += q.storage;
        }
      }
    }
    const w = S % O;
    return w > 0 && (S += O - w), R.__size = S, R.__cache = {}, this;
  }
  function g(R) {
    const A = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof R == "number" || typeof R == "boolean" ? (A.boundary = 4, A.storage = 4) : R.isVector2 ? (A.boundary = 8, A.storage = 8) : R.isVector3 || R.isColor ? (A.boundary = 16, A.storage = 12) : R.isVector4 ? (A.boundary = 16, A.storage = 16) : R.isMatrix3 ? (A.boundary = 48, A.storage = 48) : R.isMatrix4 ? (A.boundary = 64, A.storage = 64) : R.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", R), A;
  }
  function p(R) {
    const A = R.target;
    A.removeEventListener("dispose", p);
    const S = o.indexOf(A.__bindingPointIndex);
    o.splice(S, 1), i.deleteBuffer(r[A.id]), delete r[A.id], delete s[A.id];
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
class cm {
  constructor(e = {}) {
    const {
      canvas: t = Kc(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: d = !1,
      reverseDepthBuffer: f = !1
    } = e;
    this.isWebGLRenderer = !0;
    let m;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      m = n.getContextAttributes().alpha;
    } else
      m = o;
    const x = new Uint32Array(4), g = new Int32Array(4);
    let p = null, u = null;
    const R = [], A = [];
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
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = Dt, this.toneMapping = En, this.toneMappingExposure = 1;
    const S = this;
    let O = !1, w = 0, E = 0, C = null, y = -1, _ = null;
    const T = new ot(), N = new ot();
    let F = null;
    const z = new Xe(0);
    let W = 0, G = t.width, q = t.height, V = 1, Q = null, re = null;
    const pe = new ot(0, 0, G, q), Ee = new ot(0, 0, G, q);
    let Ue = !1;
    const Y = new dl();
    let J = !1, he = !1;
    const ne = new st(), be = new st(), Re = new U(), Ne = new ot(), it = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let He = !1;
    function at() {
      return C === null ? V : 1;
    }
    let I = n;
    function Ct(M, L) {
      return t.getContext(M, L);
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
        failIfMajorPerformanceCaveat: d
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${oa}`), t.addEventListener("webglcontextlost", K, !1), t.addEventListener("webglcontextrestored", ce, !1), t.addEventListener("webglcontextcreationerror", oe, !1), I === null) {
        const L = "webgl2";
        if (I = Ct(L, M), I === null)
          throw Ct(L) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (M) {
      throw console.error("THREE.WebGLRenderer: " + M.message), M;
    }
    let Be, ze, Se, et, Me, b, v, B, j, $, Z, ve, ae, ue, Ve, ee, de, ye, Te, fe, ke, De, Je, P;
    function se() {
      Be = new pf(I), Be.init(), De = new Qp(I, Be), ze = new lf(I, Be, e, De), Se = new Kp(I, Be), ze.reverseDepthBuffer && f && Se.buffers.depth.setReversed(!0), et = new gf(I), Me = new Np(), b = new Jp(I, Be, Se, Me, ze, De, et), v = new hf(S), B = new ff(S), j = new Eh(I), Je = new af(I, j), $ = new mf(I, j, et, Je), Z = new xf(I, $, j, et), Te = new vf(I, ze, b), ee = new cf(Me), ve = new Up(S, v, B, Be, ze, Je, ee), ae = new om(S, Me), ue = new Op(), Ve = new Gp(Be), ye = new sf(S, v, B, Se, Z, m, l), de = new Zp(S, Z, ze), P = new lm(I, et, ze, Se), fe = new of(I, Be, et), ke = new _f(I, Be, et), et.programs = ve.programs, S.capabilities = ze, S.extensions = Be, S.properties = Me, S.renderLists = ue, S.shadowMap = de, S.state = Se, S.info = et;
    }
    se();
    const X = new sm(S, I);
    this.xr = X, this.getContext = function() {
      return I;
    }, this.getContextAttributes = function() {
      return I.getContextAttributes();
    }, this.forceContextLoss = function() {
      const M = Be.get("WEBGL_lose_context");
      M && M.loseContext();
    }, this.forceContextRestore = function() {
      const M = Be.get("WEBGL_lose_context");
      M && M.restoreContext();
    }, this.getPixelRatio = function() {
      return V;
    }, this.setPixelRatio = function(M) {
      M !== void 0 && (V = M, this.setSize(G, q, !1));
    }, this.getSize = function(M) {
      return M.set(G, q);
    }, this.setSize = function(M, L, k = !0) {
      if (X.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      G = M, q = L, t.width = Math.floor(M * V), t.height = Math.floor(L * V), k === !0 && (t.style.width = M + "px", t.style.height = L + "px"), this.setViewport(0, 0, M, L);
    }, this.getDrawingBufferSize = function(M) {
      return M.set(G * V, q * V).floor();
    }, this.setDrawingBufferSize = function(M, L, k) {
      G = M, q = L, V = k, t.width = Math.floor(M * k), t.height = Math.floor(L * k), this.setViewport(0, 0, M, L);
    }, this.getCurrentViewport = function(M) {
      return M.copy(T);
    }, this.getViewport = function(M) {
      return M.copy(pe);
    }, this.setViewport = function(M, L, k, H) {
      M.isVector4 ? pe.set(M.x, M.y, M.z, M.w) : pe.set(M, L, k, H), Se.viewport(T.copy(pe).multiplyScalar(V).round());
    }, this.getScissor = function(M) {
      return M.copy(Ee);
    }, this.setScissor = function(M, L, k, H) {
      M.isVector4 ? Ee.set(M.x, M.y, M.z, M.w) : Ee.set(M, L, k, H), Se.scissor(N.copy(Ee).multiplyScalar(V).round());
    }, this.getScissorTest = function() {
      return Ue;
    }, this.setScissorTest = function(M) {
      Se.setScissorTest(Ue = M);
    }, this.setOpaqueSort = function(M) {
      Q = M;
    }, this.setTransparentSort = function(M) {
      re = M;
    }, this.getClearColor = function(M) {
      return M.copy(ye.getClearColor());
    }, this.setClearColor = function() {
      ye.setClearColor.apply(ye, arguments);
    }, this.getClearAlpha = function() {
      return ye.getClearAlpha();
    }, this.setClearAlpha = function() {
      ye.setClearAlpha.apply(ye, arguments);
    }, this.clear = function(M = !0, L = !0, k = !0) {
      let H = 0;
      if (M) {
        let D = !1;
        if (C !== null) {
          const te = C.texture.format;
          D = te === fa || te === da || te === ua;
        }
        if (D) {
          const te = C.texture.type, le = te === hn || te === Vn || te === Bi || te === Mi || te === ca || te === ha, me = ye.getClearColor(), _e = ye.getClearAlpha(), we = me.r, Pe = me.g, ge = me.b;
          le ? (x[0] = we, x[1] = Pe, x[2] = ge, x[3] = _e, I.clearBufferuiv(I.COLOR, 0, x)) : (g[0] = we, g[1] = Pe, g[2] = ge, g[3] = _e, I.clearBufferiv(I.COLOR, 0, g));
        } else
          H |= I.COLOR_BUFFER_BIT;
      }
      L && (H |= I.DEPTH_BUFFER_BIT), k && (H |= I.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), I.clear(H);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", K, !1), t.removeEventListener("webglcontextrestored", ce, !1), t.removeEventListener("webglcontextcreationerror", oe, !1), ue.dispose(), Ve.dispose(), Me.dispose(), v.dispose(), B.dispose(), Z.dispose(), Je.dispose(), P.dispose(), ve.dispose(), X.dispose(), X.removeEventListener("sessionstart", va), X.removeEventListener("sessionend", xa), wn.stop();
    };
    function K(M) {
      M.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), O = !0;
    }
    function ce() {
      console.log("THREE.WebGLRenderer: Context Restored."), O = !1;
      const M = et.autoReset, L = de.enabled, k = de.autoUpdate, H = de.needsUpdate, D = de.type;
      se(), et.autoReset = M, de.enabled = L, de.autoUpdate = k, de.needsUpdate = H, de.type = D;
    }
    function oe(M) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", M.statusMessage);
    }
    function Ce(M) {
      const L = M.target;
      L.removeEventListener("dispose", Ce), rt(L);
    }
    function rt(M) {
      mt(M), Me.remove(M);
    }
    function mt(M) {
      const L = Me.get(M).programs;
      L !== void 0 && (L.forEach(function(k) {
        ve.releaseProgram(k);
      }), M.isShaderMaterial && ve.releaseShaderCache(M));
    }
    this.renderBufferDirect = function(M, L, k, H, D, te) {
      L === null && (L = it);
      const le = D.isMesh && D.matrixWorld.determinant() < 0, me = Al(M, L, k, H, D);
      Se.setMaterial(H, le);
      let _e = k.index, we = 1;
      if (H.wireframe === !0) {
        if (_e = $.getWireframeAttribute(k), _e === void 0) return;
        we = 2;
      }
      const Pe = k.drawRange, ge = k.attributes.position;
      let We = Pe.start * we, Qe = (Pe.start + Pe.count) * we;
      te !== null && (We = Math.max(We, te.start * we), Qe = Math.min(Qe, (te.start + te.count) * we)), _e !== null ? (We = Math.max(We, 0), Qe = Math.min(Qe, _e.count)) : ge != null && (We = Math.max(We, 0), Qe = Math.min(Qe, ge.count));
      const tt = Qe - We;
      if (tt < 0 || tt === 1 / 0) return;
      Je.setup(D, H, me, k, _e);
      let Et, Ye = fe;
      if (_e !== null && (Et = j.get(_e), Ye = ke, Ye.setIndex(Et)), D.isMesh)
        H.wireframe === !0 ? (Se.setLineWidth(H.wireframeLinewidth * at()), Ye.setMode(I.LINES)) : Ye.setMode(I.TRIANGLES);
      else if (D.isLine) {
        let xe = H.linewidth;
        xe === void 0 && (xe = 1), Se.setLineWidth(xe * at()), D.isLineSegments ? Ye.setMode(I.LINES) : D.isLineLoop ? Ye.setMode(I.LINE_LOOP) : Ye.setMode(I.LINE_STRIP);
      } else D.isPoints ? Ye.setMode(I.POINTS) : D.isSprite && Ye.setMode(I.TRIANGLES);
      if (D.isBatchedMesh)
        if (D._multiDrawInstances !== null)
          Ye.renderMultiDrawInstances(D._multiDrawStarts, D._multiDrawCounts, D._multiDrawCount, D._multiDrawInstances);
        else if (Be.get("WEBGL_multi_draw"))
          Ye.renderMultiDraw(D._multiDrawStarts, D._multiDrawCounts, D._multiDrawCount);
        else {
          const xe = D._multiDrawStarts, $t = D._multiDrawCounts, qe = D._multiDrawCount, Ot = _e ? j.get(_e).bytesPerElement : 1, Yn = Me.get(H).currentProgram.getUniforms();
          for (let At = 0; At < qe; At++)
            Yn.setValue(I, "_gl_DrawID", At), Ye.render(xe[At] / Ot, $t[At]);
        }
      else if (D.isInstancedMesh)
        Ye.renderInstances(We, tt, D.count);
      else if (k.isInstancedBufferGeometry) {
        const xe = k._maxInstanceCount !== void 0 ? k._maxInstanceCount : 1 / 0, $t = Math.min(k.instanceCount, xe);
        Ye.renderInstances(We, tt, $t);
      } else
        Ye.render(We, tt);
    };
    function Ze(M, L, k) {
      M.transparent === !0 && M.side === Zt && M.forceSinglePass === !1 ? (M.side = Tt, M.needsUpdate = !0, Wi(M, L, k), M.side = Tn, M.needsUpdate = !0, Wi(M, L, k), M.side = Zt) : Wi(M, L, k);
    }
    this.compile = function(M, L, k = null) {
      k === null && (k = M), u = Ve.get(k), u.init(L), A.push(u), k.traverseVisible(function(D) {
        D.isLight && D.layers.test(L.layers) && (u.pushLight(D), D.castShadow && u.pushShadow(D));
      }), M !== k && M.traverseVisible(function(D) {
        D.isLight && D.layers.test(L.layers) && (u.pushLight(D), D.castShadow && u.pushShadow(D));
      }), u.setupLights();
      const H = /* @__PURE__ */ new Set();
      return M.traverse(function(D) {
        if (!(D.isMesh || D.isPoints || D.isLine || D.isSprite))
          return;
        const te = D.material;
        if (te)
          if (Array.isArray(te))
            for (let le = 0; le < te.length; le++) {
              const me = te[le];
              Ze(me, k, D), H.add(me);
            }
          else
            Ze(te, k, D), H.add(te);
      }), A.pop(), u = null, H;
    }, this.compileAsync = function(M, L, k = null) {
      const H = this.compile(M, L, k);
      return new Promise((D) => {
        function te() {
          if (H.forEach(function(le) {
            Me.get(le).currentProgram.isReady() && H.delete(le);
          }), H.size === 0) {
            D(M);
            return;
          }
          setTimeout(te, 10);
        }
        Be.get("KHR_parallel_shader_compile") !== null ? te() : setTimeout(te, 10);
      });
    };
    let Ft = null;
    function Kt(M) {
      Ft && Ft(M);
    }
    function va() {
      wn.stop();
    }
    function xa() {
      wn.start();
    }
    const wn = new fl();
    wn.setAnimationLoop(Kt), typeof self < "u" && wn.setContext(self), this.setAnimationLoop = function(M) {
      Ft = M, X.setAnimationLoop(M), M === null ? wn.stop() : wn.start();
    }, X.addEventListener("sessionstart", va), X.addEventListener("sessionend", xa), this.render = function(M, L) {
      if (L !== void 0 && L.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (O === !0) return;
      if (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(), L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(), X.enabled === !0 && X.isPresenting === !0 && (X.cameraAutoUpdate === !0 && X.updateCamera(L), L = X.getCamera()), M.isScene === !0 && M.onBeforeRender(S, M, L, C), u = Ve.get(M, A.length), u.init(L), A.push(u), be.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), Y.setFromProjectionMatrix(be), he = this.localClippingEnabled, J = ee.init(this.clippingPlanes, he), p = ue.get(M, R.length), p.init(), R.push(p), X.enabled === !0 && X.isPresenting === !0) {
        const te = S.xr.getDepthSensingMesh();
        te !== null && Or(te, L, -1 / 0, S.sortObjects);
      }
      Or(M, L, 0, S.sortObjects), p.finish(), S.sortObjects === !0 && p.sort(Q, re), He = X.enabled === !1 || X.isPresenting === !1 || X.hasDepthSensing() === !1, He && ye.addToRenderList(p, M), this.info.render.frame++, J === !0 && ee.beginShadows();
      const k = u.state.shadowsArray;
      de.render(k, M, L), J === !0 && ee.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const H = p.opaque, D = p.transmissive;
      if (u.setupLights(), L.isArrayCamera) {
        const te = L.cameras;
        if (D.length > 0)
          for (let le = 0, me = te.length; le < me; le++) {
            const _e = te[le];
            Sa(H, D, M, _e);
          }
        He && ye.render(M);
        for (let le = 0, me = te.length; le < me; le++) {
          const _e = te[le];
          Ma(p, M, _e, _e.viewport);
        }
      } else
        D.length > 0 && Sa(H, D, M, L), He && ye.render(M), Ma(p, M, L);
      C !== null && (b.updateMultisampleRenderTarget(C), b.updateRenderTargetMipmap(C)), M.isScene === !0 && M.onAfterRender(S, M, L), Je.resetDefaultState(), y = -1, _ = null, A.pop(), A.length > 0 ? (u = A[A.length - 1], J === !0 && ee.setGlobalState(S.clippingPlanes, u.state.camera)) : u = null, R.pop(), R.length > 0 ? p = R[R.length - 1] : p = null;
    };
    function Or(M, L, k, H) {
      if (M.visible === !1) return;
      if (M.layers.test(L.layers)) {
        if (M.isGroup)
          k = M.renderOrder;
        else if (M.isLOD)
          M.autoUpdate === !0 && M.update(L);
        else if (M.isLight)
          u.pushLight(M), M.castShadow && u.pushShadow(M);
        else if (M.isSprite) {
          if (!M.frustumCulled || Y.intersectsSprite(M)) {
            H && Ne.setFromMatrixPosition(M.matrixWorld).applyMatrix4(be);
            const le = Z.update(M), me = M.material;
            me.visible && p.push(M, le, me, k, Ne.z, null);
          }
        } else if ((M.isMesh || M.isLine || M.isPoints) && (!M.frustumCulled || Y.intersectsObject(M))) {
          const le = Z.update(M), me = M.material;
          if (H && (M.boundingSphere !== void 0 ? (M.boundingSphere === null && M.computeBoundingSphere(), Ne.copy(M.boundingSphere.center)) : (le.boundingSphere === null && le.computeBoundingSphere(), Ne.copy(le.boundingSphere.center)), Ne.applyMatrix4(M.matrixWorld).applyMatrix4(be)), Array.isArray(me)) {
            const _e = le.groups;
            for (let we = 0, Pe = _e.length; we < Pe; we++) {
              const ge = _e[we], We = me[ge.materialIndex];
              We && We.visible && p.push(M, le, We, k, Ne.z, ge);
            }
          } else me.visible && p.push(M, le, me, k, Ne.z, null);
        }
      }
      const te = M.children;
      for (let le = 0, me = te.length; le < me; le++)
        Or(te[le], L, k, H);
    }
    function Ma(M, L, k, H) {
      const D = M.opaque, te = M.transmissive, le = M.transparent;
      u.setupLightsView(k), J === !0 && ee.setGlobalState(S.clippingPlanes, k), H && Se.viewport(T.copy(H)), D.length > 0 && Gi(D, L, k), te.length > 0 && Gi(te, L, k), le.length > 0 && Gi(le, L, k), Se.buffers.depth.setTest(!0), Se.buffers.depth.setMask(!0), Se.buffers.color.setMask(!0), Se.setPolygonOffset(!1);
    }
    function Sa(M, L, k, H) {
      if ((k.isScene === !0 ? k.overrideMaterial : null) !== null)
        return;
      u.state.transmissionRenderTarget[H.id] === void 0 && (u.state.transmissionRenderTarget[H.id] = new Gn(1, 1, {
        generateMipmaps: !0,
        type: Be.has("EXT_color_buffer_half_float") || Be.has("EXT_color_buffer_float") ? zi : hn,
        minFilter: kn,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Ge.workingColorSpace
      }));
      const te = u.state.transmissionRenderTarget[H.id], le = H.viewport || T;
      te.setSize(le.z, le.w);
      const me = S.getRenderTarget();
      S.setRenderTarget(te), S.getClearColor(z), W = S.getClearAlpha(), W < 1 && S.setClearColor(16777215, 0.5), S.clear(), He && ye.render(k);
      const _e = S.toneMapping;
      S.toneMapping = En;
      const we = H.viewport;
      if (H.viewport !== void 0 && (H.viewport = void 0), u.setupLightsView(H), J === !0 && ee.setGlobalState(S.clippingPlanes, H), Gi(M, k, H), b.updateMultisampleRenderTarget(te), b.updateRenderTargetMipmap(te), Be.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Pe = !1;
        for (let ge = 0, We = L.length; ge < We; ge++) {
          const Qe = L[ge], tt = Qe.object, Et = Qe.geometry, Ye = Qe.material, xe = Qe.group;
          if (Ye.side === Zt && tt.layers.test(H.layers)) {
            const $t = Ye.side;
            Ye.side = Tt, Ye.needsUpdate = !0, ya(tt, k, H, Et, Ye, xe), Ye.side = $t, Ye.needsUpdate = !0, Pe = !0;
          }
        }
        Pe === !0 && (b.updateMultisampleRenderTarget(te), b.updateRenderTargetMipmap(te));
      }
      S.setRenderTarget(me), S.setClearColor(z, W), we !== void 0 && (H.viewport = we), S.toneMapping = _e;
    }
    function Gi(M, L, k) {
      const H = L.isScene === !0 ? L.overrideMaterial : null;
      for (let D = 0, te = M.length; D < te; D++) {
        const le = M[D], me = le.object, _e = le.geometry, we = H === null ? le.material : H, Pe = le.group;
        me.layers.test(k.layers) && ya(me, L, k, _e, we, Pe);
      }
    }
    function ya(M, L, k, H, D, te) {
      M.onBeforeRender(S, L, k, H, D, te), M.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, M.matrixWorld), M.normalMatrix.getNormalMatrix(M.modelViewMatrix), D.onBeforeRender(S, L, k, H, M, te), D.transparent === !0 && D.side === Zt && D.forceSinglePass === !1 ? (D.side = Tt, D.needsUpdate = !0, S.renderBufferDirect(k, L, H, D, M, te), D.side = Tn, D.needsUpdate = !0, S.renderBufferDirect(k, L, H, D, M, te), D.side = Zt) : S.renderBufferDirect(k, L, H, D, M, te), M.onAfterRender(S, L, k, H, D, te);
    }
    function Wi(M, L, k) {
      L.isScene !== !0 && (L = it);
      const H = Me.get(M), D = u.state.lights, te = u.state.shadowsArray, le = D.state.version, me = ve.getParameters(M, D.state, te, L, k), _e = ve.getProgramCacheKey(me);
      let we = H.programs;
      H.environment = M.isMeshStandardMaterial ? L.environment : null, H.fog = L.fog, H.envMap = (M.isMeshStandardMaterial ? B : v).get(M.envMap || H.environment), H.envMapRotation = H.environment !== null && M.envMap === null ? L.environmentRotation : M.envMapRotation, we === void 0 && (M.addEventListener("dispose", Ce), we = /* @__PURE__ */ new Map(), H.programs = we);
      let Pe = we.get(_e);
      if (Pe !== void 0) {
        if (H.currentProgram === Pe && H.lightsStateVersion === le)
          return ba(M, me), Pe;
      } else
        me.uniforms = ve.getUniforms(M), M.onBeforeCompile(me, S), Pe = ve.acquireProgram(me, _e), we.set(_e, Pe), H.uniforms = me.uniforms;
      const ge = H.uniforms;
      return (!M.isShaderMaterial && !M.isRawShaderMaterial || M.clipping === !0) && (ge.clippingPlanes = ee.uniform), ba(M, me), H.needsLights = Rl(M), H.lightsStateVersion = le, H.needsLights && (ge.ambientLightColor.value = D.state.ambient, ge.lightProbe.value = D.state.probe, ge.directionalLights.value = D.state.directional, ge.directionalLightShadows.value = D.state.directionalShadow, ge.spotLights.value = D.state.spot, ge.spotLightShadows.value = D.state.spotShadow, ge.rectAreaLights.value = D.state.rectArea, ge.ltc_1.value = D.state.rectAreaLTC1, ge.ltc_2.value = D.state.rectAreaLTC2, ge.pointLights.value = D.state.point, ge.pointLightShadows.value = D.state.pointShadow, ge.hemisphereLights.value = D.state.hemi, ge.directionalShadowMap.value = D.state.directionalShadowMap, ge.directionalShadowMatrix.value = D.state.directionalShadowMatrix, ge.spotShadowMap.value = D.state.spotShadowMap, ge.spotLightMatrix.value = D.state.spotLightMatrix, ge.spotLightMap.value = D.state.spotLightMap, ge.pointShadowMap.value = D.state.pointShadowMap, ge.pointShadowMatrix.value = D.state.pointShadowMatrix), H.currentProgram = Pe, H.uniformsList = null, Pe;
    }
    function Ea(M) {
      if (M.uniformsList === null) {
        const L = M.currentProgram.getUniforms();
        M.uniformsList = Tr.seqWithValue(L.seq, M.uniforms);
      }
      return M.uniformsList;
    }
    function ba(M, L) {
      const k = Me.get(M);
      k.outputColorSpace = L.outputColorSpace, k.batching = L.batching, k.batchingColor = L.batchingColor, k.instancing = L.instancing, k.instancingColor = L.instancingColor, k.instancingMorph = L.instancingMorph, k.skinning = L.skinning, k.morphTargets = L.morphTargets, k.morphNormals = L.morphNormals, k.morphColors = L.morphColors, k.morphTargetsCount = L.morphTargetsCount, k.numClippingPlanes = L.numClippingPlanes, k.numIntersection = L.numClipIntersection, k.vertexAlphas = L.vertexAlphas, k.vertexTangents = L.vertexTangents, k.toneMapping = L.toneMapping;
    }
    function Al(M, L, k, H, D) {
      L.isScene !== !0 && (L = it), b.resetTextureUnits();
      const te = L.fog, le = H.isMeshStandardMaterial ? L.environment : null, me = C === null ? S.outputColorSpace : C.isXRRenderTarget === !0 ? C.texture.colorSpace : Ei, _e = (H.isMeshStandardMaterial ? B : v).get(H.envMap || le), we = H.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4, Pe = !!k.attributes.tangent && (!!H.normalMap || H.anisotropy > 0), ge = !!k.morphAttributes.position, We = !!k.morphAttributes.normal, Qe = !!k.morphAttributes.color;
      let tt = En;
      H.toneMapped && (C === null || C.isXRRenderTarget === !0) && (tt = S.toneMapping);
      const Et = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, Ye = Et !== void 0 ? Et.length : 0, xe = Me.get(H), $t = u.state.lights;
      if (J === !0 && (he === !0 || M !== _)) {
        const Pt = M === _ && H.id === y;
        ee.setState(H, M, Pt);
      }
      let qe = !1;
      H.version === xe.__version ? (xe.needsLights && xe.lightsStateVersion !== $t.state.version || xe.outputColorSpace !== me || D.isBatchedMesh && xe.batching === !1 || !D.isBatchedMesh && xe.batching === !0 || D.isBatchedMesh && xe.batchingColor === !0 && D.colorTexture === null || D.isBatchedMesh && xe.batchingColor === !1 && D.colorTexture !== null || D.isInstancedMesh && xe.instancing === !1 || !D.isInstancedMesh && xe.instancing === !0 || D.isSkinnedMesh && xe.skinning === !1 || !D.isSkinnedMesh && xe.skinning === !0 || D.isInstancedMesh && xe.instancingColor === !0 && D.instanceColor === null || D.isInstancedMesh && xe.instancingColor === !1 && D.instanceColor !== null || D.isInstancedMesh && xe.instancingMorph === !0 && D.morphTexture === null || D.isInstancedMesh && xe.instancingMorph === !1 && D.morphTexture !== null || xe.envMap !== _e || H.fog === !0 && xe.fog !== te || xe.numClippingPlanes !== void 0 && (xe.numClippingPlanes !== ee.numPlanes || xe.numIntersection !== ee.numIntersection) || xe.vertexAlphas !== we || xe.vertexTangents !== Pe || xe.morphTargets !== ge || xe.morphNormals !== We || xe.morphColors !== Qe || xe.toneMapping !== tt || xe.morphTargetsCount !== Ye) && (qe = !0) : (qe = !0, xe.__version = H.version);
      let Ot = xe.currentProgram;
      qe === !0 && (Ot = Wi(H, L, D));
      let Yn = !1, At = !1, Ai = !1;
      const nt = Ot.getUniforms(), Xt = xe.uniforms;
      if (Se.useProgram(Ot.program) && (Yn = !0, At = !0, Ai = !0), H.id !== y && (y = H.id, At = !0), Yn || _ !== M) {
        Se.buffers.depth.getReversed() ? (ne.copy(M.projectionMatrix), Jc(ne), Qc(ne), nt.setValue(I, "projectionMatrix", ne)) : nt.setValue(I, "projectionMatrix", M.projectionMatrix), nt.setValue(I, "viewMatrix", M.matrixWorldInverse);
        const dn = nt.map.cameraPosition;
        dn !== void 0 && dn.setValue(I, Re.setFromMatrixPosition(M.matrixWorld)), ze.logarithmicDepthBuffer && nt.setValue(
          I,
          "logDepthBufFC",
          2 / (Math.log(M.far + 1) / Math.LN2)
        ), (H.isMeshPhongMaterial || H.isMeshToonMaterial || H.isMeshLambertMaterial || H.isMeshBasicMaterial || H.isMeshStandardMaterial || H.isShaderMaterial) && nt.setValue(I, "isOrthographic", M.isOrthographicCamera === !0), _ !== M && (_ = M, At = !0, Ai = !0);
      }
      if (D.isSkinnedMesh) {
        nt.setOptional(I, D, "bindMatrix"), nt.setOptional(I, D, "bindMatrixInverse");
        const Pt = D.skeleton;
        Pt && (Pt.boneTexture === null && Pt.computeBoneTexture(), nt.setValue(I, "boneTexture", Pt.boneTexture, b));
      }
      D.isBatchedMesh && (nt.setOptional(I, D, "batchingTexture"), nt.setValue(I, "batchingTexture", D._matricesTexture, b), nt.setOptional(I, D, "batchingIdTexture"), nt.setValue(I, "batchingIdTexture", D._indirectTexture, b), nt.setOptional(I, D, "batchingColorTexture"), D._colorsTexture !== null && nt.setValue(I, "batchingColorTexture", D._colorsTexture, b));
      const wi = k.morphAttributes;
      if ((wi.position !== void 0 || wi.normal !== void 0 || wi.color !== void 0) && Te.update(D, k, Ot), (At || xe.receiveShadow !== D.receiveShadow) && (xe.receiveShadow = D.receiveShadow, nt.setValue(I, "receiveShadow", D.receiveShadow)), H.isMeshGouraudMaterial && H.envMap !== null && (Xt.envMap.value = _e, Xt.flipEnvMap.value = _e.isCubeTexture && _e.isRenderTargetTexture === !1 ? -1 : 1), H.isMeshStandardMaterial && H.envMap === null && L.environment !== null && (Xt.envMapIntensity.value = L.environmentIntensity), At && (nt.setValue(I, "toneMappingExposure", S.toneMappingExposure), xe.needsLights && wl(Xt, Ai), te && H.fog === !0 && ae.refreshFogUniforms(Xt, te), ae.refreshMaterialUniforms(Xt, H, V, q, u.state.transmissionRenderTarget[M.id]), Tr.upload(I, Ea(xe), Xt, b)), H.isShaderMaterial && H.uniformsNeedUpdate === !0 && (Tr.upload(I, Ea(xe), Xt, b), H.uniformsNeedUpdate = !1), H.isSpriteMaterial && nt.setValue(I, "center", D.center), nt.setValue(I, "modelViewMatrix", D.modelViewMatrix), nt.setValue(I, "normalMatrix", D.normalMatrix), nt.setValue(I, "modelMatrix", D.matrixWorld), H.isShaderMaterial || H.isRawShaderMaterial) {
        const Pt = H.uniformsGroups;
        for (let dn = 0, fn = Pt.length; dn < fn; dn++) {
          const Ta = Pt[dn];
          P.update(Ta, Ot), P.bind(Ta, Ot);
        }
      }
      return Ot;
    }
    function wl(M, L) {
      M.ambientLightColor.needsUpdate = L, M.lightProbe.needsUpdate = L, M.directionalLights.needsUpdate = L, M.directionalLightShadows.needsUpdate = L, M.pointLights.needsUpdate = L, M.pointLightShadows.needsUpdate = L, M.spotLights.needsUpdate = L, M.spotLightShadows.needsUpdate = L, M.rectAreaLights.needsUpdate = L, M.hemisphereLights.needsUpdate = L;
    }
    function Rl(M) {
      return M.isMeshLambertMaterial || M.isMeshToonMaterial || M.isMeshPhongMaterial || M.isMeshStandardMaterial || M.isShadowMaterial || M.isShaderMaterial && M.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return w;
    }, this.getActiveMipmapLevel = function() {
      return E;
    }, this.getRenderTarget = function() {
      return C;
    }, this.setRenderTargetTextures = function(M, L, k) {
      Me.get(M.texture).__webglTexture = L, Me.get(M.depthTexture).__webglTexture = k;
      const H = Me.get(M);
      H.__hasExternalTextures = !0, H.__autoAllocateDepthBuffer = k === void 0, H.__autoAllocateDepthBuffer || Be.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), H.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(M, L) {
      const k = Me.get(M);
      k.__webglFramebuffer = L, k.__useDefaultFramebuffer = L === void 0;
    }, this.setRenderTarget = function(M, L = 0, k = 0) {
      C = M, w = L, E = k;
      let H = !0, D = null, te = !1, le = !1;
      if (M) {
        const _e = Me.get(M);
        if (_e.__useDefaultFramebuffer !== void 0)
          Se.bindFramebuffer(I.FRAMEBUFFER, null), H = !1;
        else if (_e.__webglFramebuffer === void 0)
          b.setupRenderTarget(M);
        else if (_e.__hasExternalTextures)
          b.rebindTextures(M, Me.get(M.texture).__webglTexture, Me.get(M.depthTexture).__webglTexture);
        else if (M.depthBuffer) {
          const ge = M.depthTexture;
          if (_e.__boundDepthTexture !== ge) {
            if (ge !== null && Me.has(ge) && (M.width !== ge.image.width || M.height !== ge.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            b.setupDepthRenderbuffer(M);
          }
        }
        const we = M.texture;
        (we.isData3DTexture || we.isDataArrayTexture || we.isCompressedArrayTexture) && (le = !0);
        const Pe = Me.get(M).__webglFramebuffer;
        M.isWebGLCubeRenderTarget ? (Array.isArray(Pe[L]) ? D = Pe[L][k] : D = Pe[L], te = !0) : M.samples > 0 && b.useMultisampledRTT(M) === !1 ? D = Me.get(M).__webglMultisampledFramebuffer : Array.isArray(Pe) ? D = Pe[k] : D = Pe, T.copy(M.viewport), N.copy(M.scissor), F = M.scissorTest;
      } else
        T.copy(pe).multiplyScalar(V).floor(), N.copy(Ee).multiplyScalar(V).floor(), F = Ue;
      if (Se.bindFramebuffer(I.FRAMEBUFFER, D) && H && Se.drawBuffers(M, D), Se.viewport(T), Se.scissor(N), Se.setScissorTest(F), te) {
        const _e = Me.get(M.texture);
        I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_CUBE_MAP_POSITIVE_X + L, _e.__webglTexture, k);
      } else if (le) {
        const _e = Me.get(M.texture), we = L || 0;
        I.framebufferTextureLayer(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, _e.__webglTexture, k || 0, we);
      }
      y = -1;
    }, this.readRenderTargetPixels = function(M, L, k, H, D, te, le) {
      if (!(M && M.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let me = Me.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && le !== void 0 && (me = me[le]), me) {
        Se.bindFramebuffer(I.FRAMEBUFFER, me);
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
          L >= 0 && L <= M.width - H && k >= 0 && k <= M.height - D && I.readPixels(L, k, H, D, De.convert(we), De.convert(Pe), te);
        } finally {
          const _e = C !== null ? Me.get(C).__webglFramebuffer : null;
          Se.bindFramebuffer(I.FRAMEBUFFER, _e);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(M, L, k, H, D, te, le) {
      if (!(M && M.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let me = Me.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && le !== void 0 && (me = me[le]), me) {
        const _e = M.texture, we = _e.format, Pe = _e.type;
        if (!ze.textureFormatReadable(we))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!ze.textureTypeReadable(Pe))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (L >= 0 && L <= M.width - H && k >= 0 && k <= M.height - D) {
          Se.bindFramebuffer(I.FRAMEBUFFER, me);
          const ge = I.createBuffer();
          I.bindBuffer(I.PIXEL_PACK_BUFFER, ge), I.bufferData(I.PIXEL_PACK_BUFFER, te.byteLength, I.STREAM_READ), I.readPixels(L, k, H, D, De.convert(we), De.convert(Pe), 0);
          const We = C !== null ? Me.get(C).__webglFramebuffer : null;
          Se.bindFramebuffer(I.FRAMEBUFFER, We);
          const Qe = I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return I.flush(), await $c(I, Qe, 4), I.bindBuffer(I.PIXEL_PACK_BUFFER, ge), I.getBufferSubData(I.PIXEL_PACK_BUFFER, 0, te), I.deleteBuffer(ge), I.deleteSync(Qe), te;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(M, L = null, k = 0) {
      M.isTexture !== !0 && (Fi("WebGLRenderer: copyFramebufferToTexture function signature has changed."), L = arguments[0] || null, M = arguments[1]);
      const H = Math.pow(2, -k), D = Math.floor(M.image.width * H), te = Math.floor(M.image.height * H), le = L !== null ? L.x : 0, me = L !== null ? L.y : 0;
      b.setTexture2D(M, 0), I.copyTexSubImage2D(I.TEXTURE_2D, k, 0, 0, le, me, D, te), Se.unbindTexture();
    }, this.copyTextureToTexture = function(M, L, k = null, H = null, D = 0) {
      M.isTexture !== !0 && (Fi("WebGLRenderer: copyTextureToTexture function signature has changed."), H = arguments[0] || null, M = arguments[1], L = arguments[2], D = arguments[3] || 0, k = null);
      let te, le, me, _e, we, Pe, ge, We, Qe;
      const tt = M.isCompressedTexture ? M.mipmaps[D] : M.image;
      k !== null ? (te = k.max.x - k.min.x, le = k.max.y - k.min.y, me = k.isBox3 ? k.max.z - k.min.z : 1, _e = k.min.x, we = k.min.y, Pe = k.isBox3 ? k.min.z : 0) : (te = tt.width, le = tt.height, me = tt.depth || 1, _e = 0, we = 0, Pe = 0), H !== null ? (ge = H.x, We = H.y, Qe = H.z) : (ge = 0, We = 0, Qe = 0);
      const Et = De.convert(L.format), Ye = De.convert(L.type);
      let xe;
      L.isData3DTexture ? (b.setTexture3D(L, 0), xe = I.TEXTURE_3D) : L.isDataArrayTexture || L.isCompressedArrayTexture ? (b.setTexture2DArray(L, 0), xe = I.TEXTURE_2D_ARRAY) : (b.setTexture2D(L, 0), xe = I.TEXTURE_2D), I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, L.flipY), I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), I.pixelStorei(I.UNPACK_ALIGNMENT, L.unpackAlignment);
      const $t = I.getParameter(I.UNPACK_ROW_LENGTH), qe = I.getParameter(I.UNPACK_IMAGE_HEIGHT), Ot = I.getParameter(I.UNPACK_SKIP_PIXELS), Yn = I.getParameter(I.UNPACK_SKIP_ROWS), At = I.getParameter(I.UNPACK_SKIP_IMAGES);
      I.pixelStorei(I.UNPACK_ROW_LENGTH, tt.width), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, tt.height), I.pixelStorei(I.UNPACK_SKIP_PIXELS, _e), I.pixelStorei(I.UNPACK_SKIP_ROWS, we), I.pixelStorei(I.UNPACK_SKIP_IMAGES, Pe);
      const Ai = M.isDataArrayTexture || M.isData3DTexture, nt = L.isDataArrayTexture || L.isData3DTexture;
      if (M.isRenderTargetTexture || M.isDepthTexture) {
        const Xt = Me.get(M), wi = Me.get(L), Pt = Me.get(Xt.__renderTarget), dn = Me.get(wi.__renderTarget);
        Se.bindFramebuffer(I.READ_FRAMEBUFFER, Pt.__webglFramebuffer), Se.bindFramebuffer(I.DRAW_FRAMEBUFFER, dn.__webglFramebuffer);
        for (let fn = 0; fn < me; fn++)
          Ai && I.framebufferTextureLayer(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, Me.get(M).__webglTexture, D, Pe + fn), M.isDepthTexture ? (nt && I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, Me.get(L).__webglTexture, D, Qe + fn), I.blitFramebuffer(_e, we, te, le, ge, We, te, le, I.DEPTH_BUFFER_BIT, I.NEAREST)) : nt ? I.copyTexSubImage3D(xe, D, ge, We, Qe + fn, _e, we, te, le) : I.copyTexSubImage2D(xe, D, ge, We, Qe + fn, _e, we, te, le);
        Se.bindFramebuffer(I.READ_FRAMEBUFFER, null), Se.bindFramebuffer(I.DRAW_FRAMEBUFFER, null);
      } else
        nt ? M.isDataTexture || M.isData3DTexture ? I.texSubImage3D(xe, D, ge, We, Qe, te, le, me, Et, Ye, tt.data) : L.isCompressedArrayTexture ? I.compressedTexSubImage3D(xe, D, ge, We, Qe, te, le, me, Et, tt.data) : I.texSubImage3D(xe, D, ge, We, Qe, te, le, me, Et, Ye, tt) : M.isDataTexture ? I.texSubImage2D(I.TEXTURE_2D, D, ge, We, te, le, Et, Ye, tt.data) : M.isCompressedTexture ? I.compressedTexSubImage2D(I.TEXTURE_2D, D, ge, We, tt.width, tt.height, Et, tt.data) : I.texSubImage2D(I.TEXTURE_2D, D, ge, We, te, le, Et, Ye, tt);
      I.pixelStorei(I.UNPACK_ROW_LENGTH, $t), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, qe), I.pixelStorei(I.UNPACK_SKIP_PIXELS, Ot), I.pixelStorei(I.UNPACK_SKIP_ROWS, Yn), I.pixelStorei(I.UNPACK_SKIP_IMAGES, At), D === 0 && L.generateMipmaps && I.generateMipmap(xe), Se.unbindTexture();
    }, this.copyTextureToTexture3D = function(M, L, k = null, H = null, D = 0) {
      return M.isTexture !== !0 && (Fi("WebGLRenderer: copyTextureToTexture3D function signature has changed."), k = arguments[0] || null, H = arguments[1] || null, M = arguments[2], L = arguments[3], D = arguments[4] || 0), Fi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(M, L, k, H, D);
    }, this.initRenderTarget = function(M) {
      Me.get(M).__webglFramebuffer === void 0 && b.setupRenderTarget(M);
    }, this.initTexture = function(M) {
      M.isCubeTexture ? b.setTextureCube(M, 0) : M.isData3DTexture ? b.setTexture3D(M, 0) : M.isDataArrayTexture || M.isCompressedArrayTexture ? b.setTexture2DArray(M, 0) : b.setTexture2D(M, 0), Se.unbindTexture();
    }, this.resetState = function() {
      w = 0, E = 0, C = null, Se.reset(), Je.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return on;
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
class hm extends yt {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new un(), this.environmentIntensity = 1, this.environmentRotation = new un(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class um {
  constructor(e, t) {
    this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = ia, this.updateRanges = [], this.version = 0, this.uuid = bn();
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
    e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = bn()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  toJSON(e) {
    return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = bn()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const vt = /* @__PURE__ */ new U();
class Cr {
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
      vt.fromBufferAttribute(this, t), vt.applyMatrix4(e), this.setXYZ(t, vt.x, vt.y, vt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      vt.fromBufferAttribute(this, t), vt.applyNormalMatrix(e), this.setXYZ(t, vt.x, vt.y, vt.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      vt.fromBufferAttribute(this, t), vt.transformDirection(e), this.setXYZ(t, vt.x, vt.y, vt.z);
    return this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.data.stride + this.offset + t];
    return this.normalized && (n = jt(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = Ke(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this;
  }
  setX(e, t) {
    return this.normalized && (t = Ke(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this;
  }
  setY(e, t) {
    return this.normalized && (t = Ke(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
  }
  setZ(e, t) {
    return this.normalized && (t = Ke(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
  }
  setW(e, t) {
    return this.normalized && (t = Ke(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
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
    return e = e * this.data.stride + this.offset, this.normalized && (t = Ke(t, this.array), n = Ke(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = Ke(t, this.array), n = Ke(n, this.array), r = Ke(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, s) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = Ke(t, this.array), n = Ke(n, this.array), r = Ke(r, this.array), s = Ke(s, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this.data.array[e + 3] = s, this;
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
      return new Wt(new this.array.constructor(t), this.itemSize, this.normalized);
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new Cr(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
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
class Ml extends bi {
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
let oi;
const Di = /* @__PURE__ */ new U(), li = /* @__PURE__ */ new U(), ci = /* @__PURE__ */ new U(), hi = /* @__PURE__ */ new Ae(), Ii = /* @__PURE__ */ new Ae(), Sl = /* @__PURE__ */ new st(), dr = /* @__PURE__ */ new U(), Ui = /* @__PURE__ */ new U(), fr = /* @__PURE__ */ new U(), Ao = /* @__PURE__ */ new Ae(), fs = /* @__PURE__ */ new Ae(), wo = /* @__PURE__ */ new Ae();
class Ro extends yt {
  constructor(e = new Ml()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", oi === void 0) {
      oi = new ft();
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
      ]), n = new um(t, 5);
      oi.setIndex([0, 1, 2, 0, 2, 3]), oi.setAttribute("position", new Cr(n, 3, 0, !1)), oi.setAttribute("uv", new Cr(n, 2, 3, !1));
    }
    this.geometry = oi, this.material = e, this.center = new Ae(0.5, 0.5);
  }
  raycast(e, t) {
    e.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), li.setFromMatrixScale(this.matrixWorld), Sl.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), ci.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && li.multiplyScalar(-ci.z);
    const n = this.material.rotation;
    let r, s;
    n !== 0 && (s = Math.cos(n), r = Math.sin(n));
    const o = this.center;
    pr(dr.set(-0.5, -0.5, 0), ci, o, li, r, s), pr(Ui.set(0.5, -0.5, 0), ci, o, li, r, s), pr(fr.set(0.5, 0.5, 0), ci, o, li, r, s), Ao.set(0, 0), fs.set(1, 0), wo.set(1, 1);
    let a = e.ray.intersectTriangle(dr, Ui, fr, !1, Di);
    if (a === null && (pr(Ui.set(-0.5, 0.5, 0), ci, o, li, r, s), fs.set(0, 1), a = e.ray.intersectTriangle(dr, fr, Ui, !1, Di), a === null))
      return;
    const l = e.ray.origin.distanceTo(Di);
    l < e.near || l > e.far || t.push({
      distance: l,
      point: Di.clone(),
      uv: Ut.getInterpolation(Di, dr, Ui, fr, Ao, fs, wo, new Ae()),
      face: null,
      object: this
    });
  }
  copy(e, t) {
    return super.copy(e, t), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this;
  }
}
function pr(i, e, t, n, r, s) {
  hi.subVectors(i, t).addScalar(0.5).multiply(n), r !== void 0 ? (Ii.x = s * hi.x - r * hi.y, Ii.y = r * hi.x + s * hi.y) : Ii.copy(hi), i.copy(e), i.x += Ii.x, i.y += Ii.y, i.applyMatrix4(Sl);
}
class yl extends bi {
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
const Pr = /* @__PURE__ */ new U(), Lr = /* @__PURE__ */ new U(), Co = /* @__PURE__ */ new st(), Ni = /* @__PURE__ */ new pa(), mr = /* @__PURE__ */ new Nr(), ps = /* @__PURE__ */ new U(), Po = /* @__PURE__ */ new U();
class sn extends yt {
  constructor(e = new ft(), t = new yl()) {
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
        Pr.fromBufferAttribute(t, r - 1), Lr.fromBufferAttribute(t, r), n[r] = n[r - 1], n[r] += Pr.distanceTo(Lr);
      e.setAttribute("lineDistance", new cn(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.matrixWorld, s = e.params.Line.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), mr.copy(n.boundingSphere), mr.applyMatrix4(r), mr.radius += s, e.ray.intersectsSphere(mr) === !1) return;
    Co.copy(r).invert(), Ni.copy(e.ray).applyMatrix4(Co);
    const a = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = this.isLineSegments ? 2 : 1, h = n.index, f = n.attributes.position;
    if (h !== null) {
      const m = Math.max(0, o.start), x = Math.min(h.count, o.start + o.count);
      for (let g = m, p = x - 1; g < p; g += c) {
        const u = h.getX(g), R = h.getX(g + 1), A = _r(this, e, Ni, l, u, R);
        A && t.push(A);
      }
      if (this.isLineLoop) {
        const g = h.getX(x - 1), p = h.getX(m), u = _r(this, e, Ni, l, g, p);
        u && t.push(u);
      }
    } else {
      const m = Math.max(0, o.start), x = Math.min(f.count, o.start + o.count);
      for (let g = m, p = x - 1; g < p; g += c) {
        const u = _r(this, e, Ni, l, g, g + 1);
        u && t.push(u);
      }
      if (this.isLineLoop) {
        const g = _r(this, e, Ni, l, x - 1, m);
        g && t.push(g);
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
function _r(i, e, t, n, r, s) {
  const o = i.geometry.attributes.position;
  if (Pr.fromBufferAttribute(o, r), Lr.fromBufferAttribute(o, s), t.distanceSqToSegment(Pr, Lr, ps, Po) > n) return;
  ps.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(ps);
  if (!(l < e.near || l > e.far))
    return {
      distance: l,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: Po.clone().applyMatrix4(i.matrixWorld),
      index: r,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const Lo = /* @__PURE__ */ new U(), Do = /* @__PURE__ */ new U();
class Io extends sn {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let r = 0, s = t.count; r < s; r += 2)
        Lo.fromBufferAttribute(t, r), Do.fromBufferAttribute(t, r + 1), n[r] = r === 0 ? 0 : n[r - 1], n[r + 1] = n[r] + Lo.distanceTo(Do);
      e.setAttribute("lineDistance", new cn(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class Uo extends St {
  constructor(e, t, n, r, s, o, a, l, c) {
    super(e, t, n, r, s, o, a, l, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class No {
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
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(Mt(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class dm extends Xn {
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
  revision: oa
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = oa);
function fm(i) {
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
const pm = {
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
function Dr(i) {
  return pm[i] ?? "#ffffff";
}
function mm(i) {
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
function _m(i) {
  var e;
  const t = (e = i == null ? void 0 : i.$INSUNITS) == null ? void 0 : e.value;
  return t === void 0 ? "unknown" : t === 1 || t === 2 || t === 8 || t === 9 || t === 10 ? "imperial" : t >= 4 && t <= 7 ? "metric" : "unknown";
}
const Fo = 180 / Math.PI;
function gm(i) {
  return i.type === "ARC" && i.startAngle != null ? { ...i, startAngle: i.startAngle * Fo, endAngle: i.endAngle * Fo } : i;
}
function vm(i, e, t, n, r, s, o, a) {
  const l = (i.x ?? 0) - (a.x ?? 0), c = (i.y ?? 0) - (a.y ?? 0), h = (i.z ?? 0) - (a.z ?? 0);
  return {
    x: l * t * s - c * n * o + (e.x ?? 0),
    y: l * t * o + c * n * s + (e.y ?? 0),
    z: h * r + (e.z ?? 0)
  };
}
function Oo(i, e, t, n, r, s, o, a, l) {
  const c = (d) => vm(d, e, t, n, r, s, o, a), h = { ...i };
  if (h.vertices && (h.vertices = h.vertices.map(c)), h.start && (h.start = c(h.start)), h.end && (h.end = c(h.end)), h.center && (h.center = c(h.center)), h.position && (h.position = c(h.position)), h.controlPoints && (h.controlPoints = h.controlPoints.map(c)), h.fitPoints && (h.fitPoints = h.fitPoints.map(c)), h.points && (h.points = h.points.map(c)), h.majorAxisEndPoint) {
    const d = h.majorAxisEndPoint;
    h.majorAxisEndPoint = {
      x: d.x * t * s - d.y * n * o,
      y: d.x * t * o + d.y * n * s,
      z: (d.z ?? 0) * r
    };
  }
  return h.radius != null && (h.radius = h.radius * Math.max(Math.abs(t), Math.abs(n))), (!h.layer || h.layer === "0") && (h.layer = l), h;
}
function Ar(i, e, t) {
  var n, r, s;
  const o = [];
  for (const a of i)
    if (a.type === "INSERT" && t < 8) {
      const l = e[a.name];
      if ((n = l == null ? void 0 : l.entities) != null && n.length) {
        const c = a.position ?? { x: 0, y: 0, z: 0 }, h = a.xScale ?? 1, d = a.yScale ?? 1, f = a.zScale ?? 1, m = (a.rotation ?? 0) * Math.PI / 180, x = Math.cos(m), g = Math.sin(m), p = l.position ?? { x: 0, y: 0, z: 0 }, u = a.layer ?? "0", R = Ar(l.entities, e, t + 1);
        for (const O of R)
          o.push(Oo(O, c, h, d, f, x, g, p, u));
        const A = a.rowCount ?? 1, S = a.columnCount ?? 1;
        if (A > 1 || S > 1) {
          const O = a.rowSpacing ?? 0, w = a.columnSpacing ?? 0;
          for (let E = 0; E < A; E++)
            for (let C = 0; C < S; C++) {
              if (E === 0 && C === 0) continue;
              const y = {
                x: c.x + C * w,
                y: c.y + E * O,
                z: c.z ?? 0
              }, _ = Ar(l.entities, e, t + 1);
              for (const T of _)
                o.push(Oo(T, y, h, d, f, x, g, p, u));
            }
        }
      }
    } else if (a.type === "DIMENSION" && t < 8) {
      const l = a.block;
      if (l && (s = (r = e[l]) == null ? void 0 : r.entities) != null && s.length) {
        const c = Ar(e[l].entities, e, t + 1);
        for (const h of c)
          o.push({ ...h, layer: h.layer || a.layer || "0" });
      }
      o.push(a);
    } else
      o.push(gm(a));
  return o;
}
function xm(i) {
  var e, t;
  const n = new rc().parseSync(i), r = ((t = (e = n == null ? void 0 : n.tables) == null ? void 0 : e.layer) == null ? void 0 : t.layers) ?? {}, s = Object.values(r).map((h) => {
    const d = h, f = d.colorIndex ?? d.color ?? 7, m = Math.abs(Number(f)) || 7;
    return {
      name: String(d.name ?? "0"),
      color: m,
      colorHex: Dr(m),
      visible: !d.frozen,
      frozen: !!d.frozen,
      lineWeight: Number(d.lineWeight ?? 0)
    };
  });
  s.find((h) => h.name === "0") || s.unshift({ name: "0", color: 7, colorHex: "#ffffff", visible: !0, frozen: !1, lineWeight: 0 });
  const o = (n == null ? void 0 : n.blocks) ?? {}, a = (n == null ? void 0 : n.entities) ?? [], l = Ar(a, o, 0), c = mm(l);
  return {
    layers: s,
    entities: l,
    boundingBox: c,
    units: _m(n == null ? void 0 : n.header),
    sourceFormat: "dxf"
  };
}
let ms = null;
const Nn = 180 / Math.PI, _s = Math.PI * 2;
function Mm(i) {
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
function Sm(i, e, t, n, r, s, o, a) {
  const l = i.x - a.x, c = i.y - a.y, h = (i.z ?? 0) - a.z;
  return {
    x: l * t * s - c * n * o + e.x,
    y: l * t * o + c * n * s + e.y,
    z: h * r + e.z
  };
}
function ym(i, e, t, n, r, s, o, a) {
  const l = (h) => Sm(h, e, t, n, r, s, o, a), c = { ...i };
  return c.start && (c.start = l(c.start)), c.end && (c.end = l(c.end)), c.center && (c.center = l(c.center)), c.vertices && (c.vertices = c.vertices.map(l)), c.radius != null && (c.radius = c.radius * Math.max(Math.abs(t), Math.abs(n))), c;
}
function aa(i, e, t = 0) {
  var n, r, s, o, a, l, c, h, d, f, m, x, g, p, u, R, A, S, O, w, E;
  const C = i.colorIndex, y = C != null ? Math.abs(C) : 256, _ = {
    layer: i.layer ?? "0",
    color: y
    // 256 = ByLayer
  };
  switch (C == null && i.color != null && (_.trueColor = i.color), i.type) {
    case "LINE":
      return {
        ..._,
        type: "LINE",
        start: { x: i.startPoint.x, y: i.startPoint.y, z: i.startPoint.z ?? 0 },
        end: { x: i.endPoint.x, y: i.endPoint.y, z: i.endPoint.z ?? 0 }
      };
    case "CIRCLE":
      return {
        ..._,
        type: "CIRCLE",
        center: { x: i.center.x, y: i.center.y, z: i.center.z ?? 0 },
        radius: i.radius
      };
    case "ARC":
      return {
        ..._,
        type: "ARC",
        center: { x: i.center.x, y: i.center.y, z: i.center.z ?? 0 },
        radius: i.radius,
        startAngle: i.startAngle * Nn,
        endAngle: i.endAngle * Nn
      };
    case "LWPOLYLINE":
      return {
        ..._,
        type: "LWPOLYLINE",
        vertices: i.vertices.map((T) => ({ x: T.x, y: T.y })),
        shape: !!(i.flag & 1)
        // bit 0 = closed
      };
    case "POLYLINE":
    case "POLYLINE2D":
    // actual type name from @mlightcad/libredwg-web converter
    case "POLYLINE3D": {
      const T = i.vertices.map((N) => {
        var F, z, W;
        return {
          x: N.x ?? ((F = N.point) == null ? void 0 : F.x) ?? 0,
          y: N.y ?? ((z = N.point) == null ? void 0 : z.y) ?? 0,
          z: N.z ?? ((W = N.point) == null ? void 0 : W.z) ?? 0
        };
      });
      return T.length < 2 ? null : { ..._, type: "POLYLINE", vertices: T };
    }
    case "SPLINE": {
      const T = ((n = i.fitPoints) == null ? void 0 : n.length) > 0 ? i.fitPoints : i.controlPoints ?? [];
      return T.length < 2 ? null : {
        ..._,
        type: "POLYLINE",
        vertices: T.map((N) => ({ x: N.x, y: N.y, z: N.z ?? 0 }))
      };
    }
    case "ELLIPSE": {
      const T = ((r = i.center) == null ? void 0 : r.x) ?? 0, N = ((s = i.center) == null ? void 0 : s.y) ?? 0, F = ((o = i.center) == null ? void 0 : o.z) ?? 0, z = ((a = i.majorAxisEndPoint) == null ? void 0 : a.x) ?? 1, W = ((l = i.majorAxisEndPoint) == null ? void 0 : l.y) ?? 0, G = Math.sqrt(z * z + W * W);
      if (G === 0) return null;
      const q = Math.atan2(W, z), V = G * (i.axisRatio ?? 1), Q = i.startAngle ?? 0;
      let re = i.endAngle ?? _s;
      re <= Q && (re += _s);
      const pe = 72, Ee = [];
      for (let Ue = 0; Ue <= pe; Ue++) {
        const Y = Q + Ue / pe * (re - Q), J = Math.cos(Y) * G, he = Math.sin(Y) * V;
        Ee.push({
          x: T + J * Math.cos(q) - he * Math.sin(q),
          y: N + J * Math.sin(q) + he * Math.cos(q),
          z: F
        });
      }
      return { ..._, type: "POLYLINE", vertices: Ee };
    }
    case "SOLID": {
      const T = i.corner1 ?? { x: 0, y: 0 }, N = i.corner2 ?? T, F = i.corner3 ?? N, z = i.corner4 ?? F;
      return {
        ..._,
        type: "POLYLINE",
        vertices: [T, N, z, F, T].map((W) => ({
          x: W.x,
          y: W.y,
          z: W.z ?? 0
        }))
      };
    }
    case "3DFACE": {
      const T = i.corner1, N = i.corner2, F = i.corner3, z = i.corner4 ?? i.corner3;
      return !T || !N || !F ? null : {
        ..._,
        type: "3DFACE",
        vertices: [T, N, F, z].map((W) => ({
          x: W.x,
          y: W.y,
          z: W.z ?? 0
        }))
      };
    }
    case "LEADER": {
      const T = i.vertices ?? [];
      return T.length < 2 ? null : {
        ..._,
        type: "POLYLINE",
        vertices: T.map((N) => ({ x: N.x, y: N.y, z: N.z ?? 0 }))
      };
    }
    case "DIMENSION": {
      const T = i.name ?? "";
      if (!T) return null;
      const N = (((h = (c = e == null ? void 0 : e.tables) == null ? void 0 : c.BLOCK_RECORD) == null ? void 0 : h.entries) ?? []).find((z) => z.name === T);
      if (!((d = N == null ? void 0 : N.entities) != null && d.length)) return null;
      const F = [];
      for (const z of N.entities) {
        const W = aa(z, e, t + 1);
        if (!W) continue;
        const G = Array.isArray(W) ? W : [W];
        F.push(...G);
      }
      return F.length > 0 ? F : null;
    }
    case "HATCH": {
      const T = i.solidFill === 1, N = i.boundaryPaths ?? [];
      if (T) {
        const z = [];
        for (const W of N) {
          const G = W.vertices ?? W.polylineVertices ?? [];
          if (G.length >= 3) {
            z.push({ ..._, type: "SOLID_FILL", vertices: G.map((V) => ({ x: V.x, y: V.y, z: 0 })) });
            continue;
          }
          const q = W.edges ?? [];
          if (q.length >= 1) {
            const V = [];
            for (const Q of q)
              if (Q.type === 1)
                V.push({ x: Q.start.x, y: Q.start.y, z: 0 });
              else if (Q.type === 2) {
                const re = Q.center.x, pe = Q.center.y, Ee = Q.radius, Ue = Q.startAngle, Y = Q.endAngle, J = Math.max(4, Math.round(Math.abs(Y - Ue) / (Math.PI / 8)));
                for (let he = 0; he <= J; he++) {
                  const ne = Ue + (Y - Ue) * he / J;
                  V.push({ x: re + Ee * Math.cos(ne), y: pe + Ee * Math.sin(ne), z: 0 });
                }
              }
            V.length >= 3 && z.push({ ..._, type: "SOLID_FILL", vertices: V });
          }
        }
        return z.length > 0 ? z : null;
      }
      const F = [];
      for (const z of N) {
        const W = z.vertices ?? z.polylineVertices ?? [];
        if (W.length >= 2) {
          F.push({ ..._, type: "POLYLINE", vertices: W.map((q) => ({ x: q.x, y: q.y, z: 0 })) });
          continue;
        }
        const G = z.edges ?? [];
        for (const q of G)
          if (q.type === 1)
            F.push({ ..._, type: "LINE", start: q.start, end: q.end });
          else if (q.type === 2)
            F.push({ ..._, type: "ARC", center: q.center, radius: q.radius, startAngle: q.startAngle * Nn, endAngle: q.endAngle * Nn });
          else if (q.type === 3)
            F.push({ ..._, type: "ELLIPSE", center: q.center, majorAxisEndPoint: q.majorAxisEndPoint, axisRatio: q.minorToMajorRatio ?? 1, startAngle: q.startAngle ?? 0, endAngle: q.endAngle ?? _s });
          else if (q.type === 4) {
            const V = ((f = q.fitPoints) == null ? void 0 : f.length) > 0 ? q.fitPoints : q.controlPoints ?? [];
            V.length >= 2 && F.push({ ..._, type: "POLYLINE", vertices: V });
          }
      }
      return F.length > 0 ? F : null;
    }
    case "TEXT":
      return {
        ..._,
        type: "TEXT",
        text: String(i.text ?? ""),
        startPoint: { x: ((m = i.startPoint) == null ? void 0 : m.x) ?? 0, y: ((x = i.startPoint) == null ? void 0 : x.y) ?? 0, z: 0 },
        textHeight: i.textHeight ?? i.height ?? 1,
        rotation: (i.rotation ?? 0) * Nn
      };
    case "ATTDEF":
      return null;
    case "ATTRIB": {
      const T = i.text, N = String((T == null ? void 0 : T.text) ?? i.tag ?? ""), F = (T == null ? void 0 : T.startPoint) ?? i.startPoint ?? { x: 0, y: 0 }, z = (T == null ? void 0 : T.textHeight) ?? (T == null ? void 0 : T.height) ?? i.textHeight ?? i.height ?? 1, W = ((T == null ? void 0 : T.rotation) ?? i.rotation ?? 0) * Nn;
      return {
        ..._,
        type: i.type,
        text: N,
        startPoint: { x: F.x ?? 0, y: F.y ?? 0, z: 0 },
        textHeight: z,
        rotation: W
      };
    }
    case "MTEXT":
      return {
        ..._,
        type: "MTEXT",
        text: String(i.text ?? ""),
        position: i.insertionPoint ?? i.position ?? { x: 0, y: 0, z: 0 },
        height: i.textHeight ?? i.height ?? 1,
        rotation: (i.rotation ?? 0) * Nn
      };
    case "INSERT": {
      if (t >= 8) return null;
      const T = i.name ?? "", N = (((p = (g = e == null ? void 0 : e.tables) == null ? void 0 : g.BLOCK_RECORD) == null ? void 0 : p.entries) ?? []).find((Ue) => Ue.name === T);
      if (!((u = N == null ? void 0 : N.entities) != null && u.length)) return null;
      const F = {
        x: ((R = i.insertionPoint) == null ? void 0 : R.x) ?? 0,
        y: ((A = i.insertionPoint) == null ? void 0 : A.y) ?? 0,
        z: ((S = i.insertionPoint) == null ? void 0 : S.z) ?? 0
      }, z = i.xScale ?? 1, W = i.yScale ?? 1, G = i.zScale ?? 1, q = i.rotation ?? 0, V = Math.cos(q), Q = Math.sin(q), re = {
        x: ((O = N.basePoint) == null ? void 0 : O.x) ?? 0,
        y: ((w = N.basePoint) == null ? void 0 : w.y) ?? 0,
        z: ((E = N.basePoint) == null ? void 0 : E.z) ?? 0
      }, pe = i.layer ?? "0", Ee = [];
      for (const Ue of N.entities) {
        const Y = aa(Ue, e, t + 1);
        if (!Y) continue;
        const J = Array.isArray(Y) ? Y : [Y];
        for (const he of J) {
          const ne = ym(he, F, z, W, G, V, Q, re);
          ne.layer === "0" && (ne.layer = pe), Ee.push(ne);
        }
      }
      return Ee.length > 0 ? Ee : null;
    }
    default:
      return null;
  }
}
async function Em(i, e) {
  var t, n;
  if (!ms) {
    const { LibreDwg: h } = await import("./libredwg-web.js"), d = e == null ? void 0 : e.replace(/\/+$/, "");
    ms = await h.create(d);
  }
  const r = ms, s = r.dwg_read_data(i.buffer, 0);
  if (!s) throw new Error("Failed to parse DWG file");
  const o = r.convert(s);
  r.dwg_free(s);
  const a = (((n = (t = o.tables) == null ? void 0 : t.LAYER) == null ? void 0 : n.entries) ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (h) => {
      const d = Math.abs(Number(h.colorIndex ?? 7)) || 7;
      return {
        name: String(h.name ?? "0"),
        color: d,
        colorHex: Dr(d),
        visible: !h.frozen && !h.off,
        frozen: !!h.frozen,
        lineWeight: Number(h.lineweight ?? 0)
      };
    }
  );
  a.find((h) => h.name === "0") || a.unshift({ name: "0", color: 7, colorHex: "#ffffff", visible: !0, frozen: !1, lineWeight: 0 });
  const l = [];
  for (const h of o.entities ?? []) {
    const d = aa(h, o, 0);
    d && (Array.isArray(d) ? l.push(...d) : l.push(d));
  }
  const c = Mm(l);
  return { layers: a, entities: l, boundingBox: c, units: "unknown", sourceFormat: "dwg" };
}
const Bo = { type: "change" }, ga = { type: "start" }, El = { type: "end" }, gr = new pa(), zo = new Mn(), bm = Math.cos(70 * jc.DEG2RAD), ct = new U(), bt = 2 * Math.PI, $e = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, gs = 1e-6;
class Tm extends dm {
  constructor(e, t = null) {
    super(e, t), this.state = $e.NONE, this.enabled = !0, this.target = new U(), this.cursor = new U(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: fi.ROTATE, MIDDLE: fi.DOLLY, RIGHT: fi.PAN }, this.touches = { ONE: ui.ROTATE, TWO: ui.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new U(), this._lastQuaternion = new Wn(), this._lastTargetPosition = new U(), this._quat = new Wn().setFromUnitVectors(e.up, new U(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new No(), this._sphericalDelta = new No(), this._scale = 1, this._panOffset = new U(), this._rotateStart = new Ae(), this._rotateEnd = new Ae(), this._rotateDelta = new Ae(), this._panStart = new Ae(), this._panEnd = new Ae(), this._panDelta = new Ae(), this._dollyStart = new Ae(), this._dollyEnd = new Ae(), this._dollyDelta = new Ae(), this._dollyDirection = new U(), this._mouse = new Ae(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = wm.bind(this), this._onPointerDown = Am.bind(this), this._onPointerUp = Rm.bind(this), this._onContextMenu = Nm.bind(this), this._onMouseWheel = Lm.bind(this), this._onKeyDown = Dm.bind(this), this._onTouchStart = Im.bind(this), this._onTouchMove = Um.bind(this), this._onMouseDown = Cm.bind(this), this._onMouseMove = Pm.bind(this), this._interceptControlDown = Fm.bind(this), this._interceptControlUp = Om.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Bo), this.update(), this.state = $e.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    ct.copy(t).sub(this.target), ct.applyQuaternion(this._quat), this._spherical.setFromVector3(ct), this.autoRotate && this.state === $e.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
    isFinite(n) && isFinite(r) && (n < -Math.PI ? n += bt : n > Math.PI && (n -= bt), r < -Math.PI ? r += bt : r > Math.PI && (r -= bt), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let s = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), s = o != this._spherical.radius;
    }
    if (ct.setFromSpherical(this._spherical), ct.applyQuaternion(this._quatInverse), t.copy(this.target).add(ct), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = ct.length();
        o = this._clampDistance(a * this._scale);
        const l = a - o;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), s = !!l;
      } else if (this.object.isOrthographicCamera) {
        const a = new U(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), s = l !== this.object.zoom;
        const c = new U(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(a), this.object.updateMatrixWorld(), o = ct.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (gr.origin.copy(this.object.position), gr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(gr.direction)) < bm ? this.object.lookAt(this.target) : (zo.setFromNormalAndCoplanarPoint(this.object.up, this.target), gr.intersectPlane(zo, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), s = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, s || this._lastPosition.distanceToSquared(this.object.position) > gs || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > gs || this._lastTargetPosition.distanceToSquared(this.target) > gs ? (this.dispatchEvent(Bo), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? bt / 60 * this.autoRotateSpeed * e : bt / 60 / 60 * this.autoRotateSpeed;
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
    ct.setFromMatrixColumn(t, 0), ct.multiplyScalar(-e), this._panOffset.add(ct);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? ct.setFromMatrixColumn(t, 1) : (ct.setFromMatrixColumn(t, 0), ct.crossVectors(this.object.up, ct)), ct.multiplyScalar(e), this._panOffset.add(ct);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const r = this.object.position;
      ct.copy(r).sub(this.target);
      let s = ct.length();
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
    this._rotateLeft(bt * this._rotateDelta.x / t.clientHeight), this._rotateUp(bt * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(bt * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-bt * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(bt * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-bt * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
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
    this._rotateLeft(bt * this._rotateDelta.x / t.clientHeight), this._rotateUp(bt * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    t === void 0 && (t = new Ae(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function Am(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function wm(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function Rm(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(El), this.state = $e.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function Cm(i) {
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
    case fi.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(i), this.state = $e.DOLLY;
      break;
    case fi.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = $e.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = $e.ROTATE;
      }
      break;
    case fi.PAN:
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
  this.state !== $e.NONE && this.dispatchEvent(ga);
}
function Pm(i) {
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
function Lm(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== $e.NONE || (i.preventDefault(), this.dispatchEvent(ga), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(El));
}
function Dm(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function Im(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case ui.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = $e.TOUCH_ROTATE;
          break;
        case ui.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = $e.TOUCH_PAN;
          break;
        default:
          this.state = $e.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case ui.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = $e.TOUCH_DOLLY_PAN;
          break;
        case ui.DOLLY_ROTATE:
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
  this.state !== $e.NONE && this.dispatchEvent(ga);
}
function Um(i) {
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
function Nm(i) {
  this.enabled !== !1 && i.preventDefault();
}
function Fm(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Om(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class Bm {
  constructor(e, t) {
    this.layerGroups = /* @__PURE__ */ new Map(), this.animationId = null, this.layers = [];
    const n = t.height ?? 400;
    this.is3D = t.mode === "3d", this.isDark = t.theme !== "light", this.scene = new hm(), this.scene.background = new Xe(this.resolveBackground(t));
    const r = e.clientWidth / n;
    if (this.is3D) {
      const s = new It(45, r, 0.1, 1e7);
      s.position.set(0, -500, 500), s.up.set(0, 0, 1), this.camera = s;
    } else {
      const s = new pl(
        -r * 500,
        r * 500,
        500,
        -500,
        0.1,
        1e6
      );
      s.position.set(0, 0, 100), this.camera = s;
    }
    this.renderer = new cm({ antialias: !0 }), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(e.clientWidth, n), this.renderer.domElement.style.display = "block", this.renderer.domElement.style.marginTop = "5px", e.appendChild(this.renderer.domElement), this.controls = new Tm(this.camera, this.renderer.domElement), this.controls.enableRotate = this.is3D, this.controls.enableDamping = !0, this.controls.dampingFactor = 0.1, this.controls.screenSpacePanning = !0, this.startRenderLoop();
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
      const c = new Hn();
      c.name = l.name, c.visible = l.visible, this.layerGroups.set(l.name, c), this.scene.add(c);
    }
    if (!this.layerGroups.has("0")) {
      const l = new Hn();
      l.name = "0", this.layerGroups.set("0", l), this.scene.add(l);
    }
    const t = e.boundingBox.centerX, n = e.boundingBox.centerY, { minZ: r, maxZ: s } = this.computeZExtent(e.entities), o = r;
    for (const l of e.entities) {
      const c = this.buildEntity(l, e, t, n, o);
      if (c) {
        const h = l.layer ?? "0", d = this.layerGroups.get(h) ?? this.layerGroups.get("0");
        d == null || d.add(c);
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
        const s = e.color != null ? "#" + e.color.toString(16).padStart(6, "0") : Dr(r);
        return this.themeAdaptColor(s);
      }
    } else {
      const r = e.color;
      if (r != null && r !== 256 && r !== 0)
        return this.themeAdaptColor(Dr(r));
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
    const o = this.resolveEntityColor(e, t), a = new yl({ color: o });
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
      new U(l.x - n, l.y - r, (l.z ?? 0) - s),
      new U(c.x - n, c.y - r, (c.z ?? 0) - s)
    ], d = new ft().setFromPoints(h);
    return new sn(d, t);
  }
  buildCircle(e, t, n, r, s) {
    var o, a, l;
    const c = (((o = e.center) == null ? void 0 : o.x) ?? e.x ?? 0) - n, h = (((a = e.center) == null ? void 0 : a.y) ?? e.y ?? 0) - r, d = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, f = e.radius ?? e.r ?? 1, m = 64, x = [];
    for (let p = 0; p <= m; p++) {
      const u = p / m * Math.PI * 2;
      x.push(new U(c + Math.cos(u) * f, h + Math.sin(u) * f, d));
    }
    const g = new ft().setFromPoints(x);
    return new sn(g, t);
  }
  buildArc(e, t, n, r, s) {
    var o, a, l;
    const c = (((o = e.center) == null ? void 0 : o.x) ?? e.x ?? 0) - n, h = (((a = e.center) == null ? void 0 : a.y) ?? e.y ?? 0) - r, d = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, f = e.radius ?? e.r ?? 1;
    let m = (e.startAngle ?? 0) * (Math.PI / 180), x = (e.endAngle ?? 360) * (Math.PI / 180);
    x < m && (x += Math.PI * 2);
    const g = 64, p = [];
    for (let R = 0; R <= g; R++) {
      const A = m + R / g * (x - m);
      p.push(new U(c + Math.cos(A) * f, h + Math.sin(A) * f, d));
    }
    const u = new ft().setFromPoints(p);
    return new sn(u, t);
  }
  buildPolyline(e, t, n, r, s) {
    if (!e.vertices || e.vertices.length < 2) return null;
    const o = e.vertices.map(
      (l) => new U(l.x - n, l.y - r, (l.z ?? 0) - s)
    );
    e.shape && o.push(o[0].clone());
    const a = new ft().setFromPoints(o);
    return new sn(a, t);
  }
  buildSpline(e, t, n, r, s) {
    var o;
    const a = (((o = e.fitPoints) == null ? void 0 : o.length) > 0 ? e.fitPoints : e.controlPoints) ?? [];
    if (a.length < 2) return null;
    const l = a.map(
      (h) => new U(h.x - n, h.y - r, (h.z ?? 0) - s)
    ), c = new ft().setFromPoints(l);
    return new sn(c, t);
  }
  buildEllipse(e, t, n, r, s) {
    var o, a, l, c, h;
    const d = (((o = e.center) == null ? void 0 : o.x) ?? 0) - n, f = (((a = e.center) == null ? void 0 : a.y) ?? 0) - r, m = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, x = ((c = e.majorAxisEndPoint) == null ? void 0 : c.x) ?? 1, g = ((h = e.majorAxisEndPoint) == null ? void 0 : h.y) ?? 0, p = Math.sqrt(x * x + g * g);
    if (p === 0) return null;
    const u = Math.atan2(g, x), R = p * (e.axisRatio ?? 1), A = e.startAngle ?? 0;
    let S = e.endAngle ?? Math.PI * 2;
    S <= A && (S += Math.PI * 2);
    const O = 72, w = [];
    for (let C = 0; C <= O; C++) {
      const y = A + C / O * (S - A), _ = Math.cos(y) * p, T = Math.sin(y) * R;
      w.push(new U(
        d + _ * Math.cos(u) - T * Math.sin(u),
        f + _ * Math.sin(u) + T * Math.cos(u),
        m
      ));
    }
    const E = new ft().setFromPoints(w);
    return new sn(E, t);
  }
  buildSolid(e, t, n, r, s) {
    const o = e.points ?? e.vertices ?? [];
    if (o.length < 3) return null;
    const a = o[0], l = o[1], c = o[2], h = o[3] ?? o[2], d = [a, l, h, c, a].map((m) => new U(m.x - n, m.y - r, (m.z ?? 0) - s)), f = new ft().setFromPoints(d);
    return new sn(f, t);
  }
  buildText(e, t, n, r, s) {
    const o = e.text ?? e.string ?? "";
    if (!o) return null;
    const a = o.replace(/\{\\[^;]*;([^}]*)\}/g, "$1").replace(/\\[Pp]/g, " ").replace(/\\[A-Za-z][^;]*;/g, "").replace(/[{}]/g, "").trim();
    if (!a) return null;
    const l = e.startPoint ?? e.insertionPoint ?? e.position ?? { x: 0, y: 0, z: 0 }, c = Math.max(Number(e.textHeight ?? e.height ?? 1), 0.01), h = (e.rotation ?? 0) * Math.PI / 180, d = 32, f = document.createElement("canvas"), m = f.getContext("2d");
    m.font = `${d}px sans-serif`;
    const x = m.measureText(a).width;
    f.width = Math.ceil(x) + 4, f.height = d + 8, m.font = `${d}px sans-serif`, m.fillStyle = t, m.textBaseline = "middle", m.fillText(a, 2, f.height / 2);
    const g = new Uo(f), p = new Ml({ map: g, depthTest: !1 }), u = new Ro(p), R = f.width / f.height;
    if (u.scale.set(c * R, c, 1), u.position.set(l.x - n, l.y - r, (l.z ?? 0) - s), h !== 0) {
      const A = new Hn();
      return A.rotation.z = h, A.position.copy(u.position), u.position.set(0, 0, 0), A.add(u), A;
    }
    return u;
  }
  buildSolidFill(e, t, n, r, s) {
    const o = e.vertices;
    if (!o || o.length < 3) return null;
    const a = o.filter((_) => isFinite(_.x) && isFinite(_.y));
    if (a.length < 3) return null;
    let l = 1 / 0, c = -1 / 0, h = 1 / 0, d = -1 / 0;
    for (const _ of a)
      _.x < l && (l = _.x), _.x > c && (c = _.x), _.y < h && (h = _.y), _.y > d && (d = _.y);
    const f = c - l, m = d - h;
    if (f + m < 1e-10 || Math.max(f, m) / Math.max(Math.min(f, m), 1e-10) > 10) return null;
    let x = 0;
    for (let _ = 0, T = a.length - 1; _ < a.length; T = _++)
      x += (a[T].x - a[_].x) * (a[T].y + a[_].y);
    if (f * m > 0 && Math.abs(x) / 2 / (f * m) < 0.01) return null;
    const g = 2048, p = g / Math.max(f, m), u = Math.max(4, Math.min(Math.ceil(f * p) + 2, g + 2)), R = Math.max(4, Math.min(Math.ceil(m * p) + 2, g + 2)), A = document.createElement("canvas");
    A.width = u, A.height = R;
    const S = A.getContext("2d");
    if (!S) return null;
    const O = new Xe(t);
    S.fillStyle = `rgb(${Math.round(O.r * 255)},${Math.round(O.g * 255)},${Math.round(O.b * 255)})`, S.beginPath(), S.moveTo((a[0].x - l) * p + 1, (d - a[0].y) * p + 1);
    for (let _ = 1; _ < a.length; _++)
      S.lineTo((a[_].x - l) * p + 1, (d - a[_].y) * p + 1);
    S.closePath(), S.fill();
    const w = new Uo(A);
    w.minFilter = Nt, w.magFilter = Nt;
    const E = new Vi(f, m), C = new ma({
      map: w,
      alphaTest: 0.5,
      side: Zt,
      depthWrite: !1
    }), y = new Vt(E, C);
    return y.position.set(
      (l + c) / 2 - n,
      (h + d) / 2 - r,
      (a[0].z ?? 0) - s
    ), y;
  }
  buildFace3D(e, t, n, r, s) {
    const o = e.vertices;
    if (!o || o.length < 3) return null;
    const a = o.map((d) => new U(d.x - n, d.y - r, (d.z ?? 0) - s)), l = a[3] ?? a[2], c = [a[0], a[1], a[1], a[2], a[2], l, l, a[0]], h = new ft().setFromPoints(c);
    return new Io(h, t);
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
      if (e instanceof Vt || e instanceof sn || e instanceof Io) {
        e.geometry.dispose();
        const n = Array.isArray(e.material) ? e.material : [e.material];
        for (const r of n) r.dispose();
      }
      if (e instanceof Ro) {
        const n = e.material;
        (t = n.map) == null || t.dispose(), n.dispose();
      }
    }), this.controls.dispose(), this.renderer.dispose(), this.renderer.domElement.remove();
  }
}
class zm {
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
      const d = document.createElement("span");
      Object.assign(d.style, {
        display: "inline-block",
        width: "10px",
        height: "10px",
        borderRadius: "2px",
        background: l.colorHex,
        border: `1px solid ${o}`,
        flexShrink: "0"
      });
      const f = document.createElement("span");
      f.textContent = l.name, f.style.overflow = "hidden", f.style.textOverflow = "ellipsis", f.style.whiteSpace = "nowrap", c.appendChild(h), c.appendChild(d), c.appendChild(f), this.panel.appendChild(c);
    }
    getComputedStyle(this.container).position === "static" && (this.container.style.position = "relative"), this.container.style.overflowX = "hidden", this.container.appendChild(this.panel);
  }
  dispose() {
    var e;
    (e = this.panel) == null || e.remove(), this.panel = null;
  }
}
function km() {
  return document.documentElement.getAttribute("data-theme") === "dark" || document.body.classList.contains("theme-dark");
}
async function Hm(i, e, t, n) {
  const r = n ?? {}, s = t.toLowerCase().endsWith(".dwg") ? await Em(e, r.dwgWasmBaseUrl) : xm(new TextDecoder().decode(e)), o = new Bm(i, r);
  await o.loadDocument(s);
  const a = r.theme === "dark" || r.theme !== "light" && km(), l = r.showLayerPanel !== !1 ? new zm(i, (c, h) => {
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
function bl(i) {
  return async function(e, t, n, r) {
    const { filePath: s, options: o } = fm(t);
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
    return Hm(e, l, s, c);
  };
}
const Tl = {
  async readFile(i) {
    const e = await Cl("read_file_binary", { path: i });
    return new Uint8Array(e);
  },
  resolvePath(i, e) {
    return e ? `${e.replace(/[/\\][^/\\]+$/, "")}/${i.replace(/^\.\//, "")}` : i;
  }
}, Vm = bl(Tl);
function Gm(i) {
  return {
    async readFile(e) {
      const t = await i(e);
      return typeof t == "string" ? new TextEncoder().encode(t) : Array.isArray(t) ? new Uint8Array(t) : t;
    },
    resolvePath: Tl.resolvePath
  };
}
const Ym = {
  id: "cad-viewer",
  name: "CAD Viewer (DXF/DWG)",
  description: "Renders AutoCAD DXF/DWG engineering drawings inline. DWG support uses a GPLv3 WASM module loaded on demand.",
  stars: 0,
  npmPackage: "@morcad/moraya",
  exportName: "",
  sizeKb: 800,
  languages: ["morcad", "dxf", "dwg"],
  homepage: "https://github.com/zouwei/morcad",
  cdnUrl: "https://cdn.jsdelivr.net/gh/zouwei/morcad@v0.2.8/packages/moraya/dist/index.bundle.js",
  isFilePathRenderer: !0,
  aiHint: "Use ```dxf for DXF files, ```dwg for DWG files, or ```morcad for parameter mode. Examples:\n```dxf\n./drawings/floor-plan.dxf\n```\n```morcad\nfile: ./drawings/floor-plan.dxf\nlayers: WALLS, DOORS\nheight: 500\n```",
  async render(i, e, t, n) {
    const r = document.documentElement.getAttribute("data-theme") === "dark";
    return typeof t == "function" ? bl(
      Gm(t)
    )(i, e, n ?? null, r) : Vm(i, e, n ?? null, r);
  }
};
export {
  Vm as cadRender,
  Ym as cadRendererPlugin,
  Tl as tauriFileAdapter
};
//# sourceMappingURL=index.bundle.js.map
