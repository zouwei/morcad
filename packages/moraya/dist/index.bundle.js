import { invoke as hl } from "@tauri-apps/api/core";
class ul {
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
    return this._pointer++, e.value = ua(e.code, this._data[this._pointer].trim()), this._pointer++, e.code === 0 && e.value === "EOF" && (this._eof = !0), this.lastReadGroup = e, e;
  }
  peek() {
    if (!this.hasNext())
      throw this._eof ? new Error("Cannot call 'next' after EOF group has been read") : new Error("Unexpected end of input: EOF group not read before end of file. Ended on code " + this._data[this._pointer]);
    const e = {
      code: parseInt(this._data[this._pointer])
    };
    return e.value = ua(e.code, this._data[this._pointer + 1].trim()), e;
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
function ua(i, e) {
  return i <= 9 ? e : i >= 10 && i <= 59 ? parseFloat(e) : i >= 60 && i <= 99 ? parseInt(e) : i >= 100 && i <= 109 ? e : i >= 110 && i <= 149 ? parseFloat(e) : i >= 160 && i <= 179 ? parseInt(e) : i >= 210 && i <= 239 ? parseFloat(e) : i >= 270 && i <= 289 ? parseInt(e) : i >= 290 && i <= 299 ? dl(e) : i >= 300 && i <= 369 ? e : i >= 370 && i <= 389 ? parseInt(e) : i >= 390 && i <= 399 ? e : i >= 400 && i <= 409 ? parseInt(e) : i >= 410 && i <= 419 ? e : i >= 420 && i <= 429 ? parseInt(e) : i >= 430 && i <= 439 ? e : i >= 440 && i <= 459 ? parseInt(e) : i >= 460 && i <= 469 ? parseFloat(e) : i >= 470 && i <= 481 || i === 999 || i >= 1e3 && i <= 1009 ? e : i >= 1010 && i <= 1059 ? parseFloat(e) : i >= 1060 && i <= 1071 ? parseInt(e) : (console.log("WARNING: Group code does not have a defined type: %j", { code: i, value: e }), e);
}
function dl(i) {
  if (i === "0")
    return !1;
  if (i === "1")
    return !0;
  throw TypeError("String '" + i + "' cannot be cast to Boolean type");
}
const Eo = [
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
function fl(i) {
  return Eo[i];
}
function Fe(i) {
  const e = {};
  i.rewind();
  let t = i.next(), n = t.code;
  if (e.x = t.value, n += 10, t = i.next(), t.code != n)
    throw new Error("Expected code for point value to be " + n + " but got " + t.code + ".");
  return e.y = t.value, n += 10, t = i.next(), t.code != n ? (i.rewind(), e) : (e.z = t.value, e);
}
function dt(i, e, t) {
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
      i.colorIndex = e.value, i.color = fl(Math.abs(e.value));
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
class pl {
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
          n.vertices = ml(e, t), t = e.lastReadGroup;
          break;
        default:
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function ml(i, e) {
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
class _l {
  constructor() {
    this.ForEntityName = "ARC";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.center = Fe(e);
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class gl {
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
          n.startPoint = Fe(e);
          break;
        case 11:
          n.endPoint = Fe(e);
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class vl {
  constructor() {
    this.ForEntityName = "CIRCLE";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.center = Fe(e);
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class xl {
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
          n.anchorPoint = Fe(e);
          break;
        case 11:
          n.middleOfText = Fe(e);
          break;
        case 12:
          n.insertionPoint = Fe(e);
          break;
        case 13:
          n.linearOrAngularPoint1 = Fe(e);
          break;
        case 14:
          n.linearOrAngularPoint2 = Fe(e);
          break;
        case 15:
          n.diameterOrRadiusPoint = Fe(e);
          break;
        case 16:
          n.arcPoint = Fe(e);
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Ml {
  constructor() {
    this.ForEntityName = "ELLIPSE";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.center = Fe(e);
          break;
        case 11:
          n.majorAxisEndPoint = Fe(e);
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Sl {
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
          n.position = Fe(e);
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
          n.extrusionDirection = Fe(e);
          break;
        default:
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
let El = class {
  constructor() {
    this.ForEntityName = "LINE";
  }
  parseEntity(e, t) {
    const n = { type: t.value, vertices: [] };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.vertices.unshift(Fe(e));
          break;
        case 11:
          n.vertices.push(Fe(e));
          break;
        case 210:
          n.extrusionDirection = Fe(e);
          break;
        case 100:
          break;
        default:
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
};
class yl {
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
          n.vertices = bl(r, e);
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function bl(i, e) {
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
class Tl {
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
          n.position = Fe(e);
          break;
        case 11:
          n.directionVector = Fe(e);
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Al {
  constructor() {
    this.ForEntityName = "POINT";
  }
  parseEntity(e, t) {
    const r = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          r.position = Fe(e);
          break;
        case 39:
          r.thickness = t.value;
          break;
        case 210:
          r.extrusionDirection = Fe(e);
          break;
        case 100:
          break;
        default:
          dt(r, t, e);
          break;
      }
      t = e.next();
    }
    return r;
  }
}
class wl {
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Rl {
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
          n.extrusionDirection = Fe(e);
          break;
        default:
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n.vertices = Cl(e, t), n;
  }
}
function Cl(i, e) {
  const t = new wl(), n = [];
  for (; !i.isEOF(); )
    if (e.code === 0) {
      if (e.value === "VERTEX")
        n.push(t.parseEntity(i, e)), e = i.lastReadGroup;
      else if (e.value === "SEQEND") {
        Pl(i, e);
        break;
      }
    }
  return n;
}
function Pl(i, e) {
  const t = { type: e.value };
  for (e = i.next(); !i.isEOF() && e.code != 0; )
    dt(t, e, i), e = i.next();
  return t;
}
class Ll {
  constructor() {
    this.ForEntityName = "SOLID";
  }
  parseEntity(e, t) {
    const n = { type: t.value, points: [] };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.points[0] = Fe(e);
          break;
        case 11:
          n.points[1] = Fe(e);
          break;
        case 12:
          n.points[2] = Fe(e);
          break;
        case 13:
          n.points[3] = Fe(e);
          break;
        case 210:
          n.extrusionDirection = Fe(e);
          break;
        default:
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Dl {
  constructor() {
    this.ForEntityName = "SPLINE";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.controlPoints || (n.controlPoints = []), n.controlPoints.push(Fe(e));
          break;
        case 11:
          n.fitPoints || (n.fitPoints = []), n.fitPoints.push(Fe(e));
          break;
        case 12:
          n.startTangent = Fe(e);
          break;
        case 13:
          n.endTangent = Fe(e);
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
          n.normalVector = Fe(e);
          break;
        default:
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
class Il {
  constructor() {
    this.ForEntityName = "TEXT";
  }
  parseEntity(e, t) {
    const n = { type: t.value };
    for (t = e.next(); !e.isEOF() && t.code !== 0; ) {
      switch (t.code) {
        case 10:
          n.startPoint = Fe(e);
          break;
        case 11:
          n.endPoint = Fe(e);
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
          dt(n, t, e);
          break;
      }
      t = e.next();
    }
    return n;
  }
}
function Ul(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var ar = { exports: {} }, Nl = ar.exports, da;
function Fl() {
  return da || (da = 1, (function(i) {
    (function(e, t) {
      i.exports ? i.exports = t() : e.log = t();
    })(Nl, function() {
      var e = function() {
      }, t = "undefined", n = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), r = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
      ], s = {}, o = null;
      function a(g, f) {
        var u = g[f];
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
        for (var g = this.getLevel(), f = 0; f < r.length; f++) {
          var u = r[f];
          this[u] = f < g ? e : this.methodFactory(u, g, this.name);
        }
        if (this.log = this.debug, typeof console === t && g < this.levels.SILENT)
          return "No console available for logging";
      }
      function d(g) {
        return function() {
          typeof console !== t && (h.call(this), this[g].apply(this, arguments));
        };
      }
      function p(g, f, u) {
        return c(g) || d.apply(this, arguments);
      }
      function m(g, f) {
        var u = this, C, A, y, F = "loglevel";
        typeof g == "string" ? F += ":" + g : typeof g == "symbol" && (F = void 0);
        function T(w) {
          var N = (r[w] || "silent").toUpperCase();
          if (!(typeof window === t || !F)) {
            try {
              window.localStorage[F] = N;
              return;
            } catch {
            }
            try {
              window.document.cookie = encodeURIComponent(F) + "=" + N + ";";
            } catch {
            }
          }
        }
        function E() {
          var w;
          if (!(typeof window === t || !F)) {
            try {
              w = window.localStorage[F];
            } catch {
            }
            if (typeof w === t)
              try {
                var N = window.document.cookie, B = encodeURIComponent(F), W = N.indexOf(B + "=");
                W !== -1 && (w = /^([^;]+)/.exec(
                  N.slice(W + B.length + 1)
                )[1]);
              } catch {
              }
            return u.levels[w] === void 0 && (w = void 0), w;
          }
        }
        function R() {
          if (!(typeof window === t || !F)) {
            try {
              window.localStorage.removeItem(F);
            } catch {
            }
            try {
              window.document.cookie = encodeURIComponent(F) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            } catch {
            }
          }
        }
        function S(w) {
          var N = w;
          if (typeof N == "string" && u.levels[N.toUpperCase()] !== void 0 && (N = u.levels[N.toUpperCase()]), typeof N == "number" && N >= 0 && N <= u.levels.SILENT)
            return N;
          throw new TypeError("log.setLevel() called with invalid level: " + w);
        }
        u.name = g, u.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5
        }, u.methodFactory = f || p, u.getLevel = function() {
          return y ?? A ?? C;
        }, u.setLevel = function(w, N) {
          return y = S(w), N !== !1 && T(y), h.call(u);
        }, u.setDefaultLevel = function(w) {
          A = S(w), E() || u.setLevel(w, !1);
        }, u.resetLevel = function() {
          y = null, R(), h.call(u);
        }, u.enableAll = function(w) {
          u.setLevel(u.levels.TRACE, w);
        }, u.disableAll = function(w) {
          u.setLevel(u.levels.SILENT, w);
        }, u.rebuild = function() {
          if (o !== u && (C = S(o.getLevel())), h.call(u), o === u)
            for (var w in s)
              s[w].rebuild();
        }, C = S(
          o ? o.getLevel() : "WARN"
        );
        var v = E();
        v != null && (y = S(v)), h.call(u);
      }
      o = new m(), o.getLogger = function(f) {
        if (typeof f != "symbol" && typeof f != "string" || f === "")
          throw new TypeError("You must supply a name when creating a logger.");
        var u = s[f];
        return u || (u = s[f] = new m(
          f,
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
  })(ar)), ar.exports;
}
var Ol = Fl();
const Ne = /* @__PURE__ */ Ul(Ol);
Ne.setLevel("error");
function Bl(i) {
  i.registerEntityHandler(pl), i.registerEntityHandler(_l), i.registerEntityHandler(gl), i.registerEntityHandler(vl), i.registerEntityHandler(xl), i.registerEntityHandler(Ml), i.registerEntityHandler(Sl), i.registerEntityHandler(El), i.registerEntityHandler(yl), i.registerEntityHandler(Tl), i.registerEntityHandler(Al), i.registerEntityHandler(Rl), i.registerEntityHandler(Ll), i.registerEntityHandler(Dl), i.registerEntityHandler(Il);
}
class kl {
  constructor() {
    this._entityHandlers = {}, Bl(this);
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
    const r = e.split(/\r\n|\r|\n/g), s = new ul(r);
    if (!s.hasNext())
      throw Error("Empty file");
    const o = this;
    let a;
    function l() {
      for (a = s.next(); !s.isEOF(); )
        if (a.code === 0 && a.value === "SECTION") {
          if (a = s.next(), a.code !== 2) {
            console.error("Unexpected code %s after 0:SECTION", yo(a)), a = s.next();
            continue;
          }
          a.value === "HEADER" ? (Ne.debug("> HEADER"), t.header = c(), Ne.debug("<")) : a.value === "BLOCKS" ? (Ne.debug("> BLOCKS"), t.blocks = h(), Ne.debug("<")) : a.value === "ENTITIES" ? (Ne.debug("> ENTITIES"), t.entities = A(!1), Ne.debug("<")) : a.value === "TABLES" ? (Ne.debug("> TABLES"), t.tables = p(), Ne.debug("<")) : a.value === "EOF" ? Ne.debug("EOF") : Ne.warn("Skipping section '%s'", a.value);
        } else
          a = s.next();
    }
    function c() {
      let T = null, E = null;
      const R = {};
      for (a = s.next(); ; ) {
        if (Vt(a, 0, "ENDSEC")) {
          T && (R[T] = E);
          break;
        } else a.code === 9 ? (T && (R[T] = E), T = a.value) : a.code === 10 ? E = { x: a.value } : a.code === 20 ? E.y = a.value : a.code === 30 ? E.z = a.value : E = a.value;
        a = s.next();
      }
      return a = s.next(), R;
    }
    function h() {
      const T = {};
      for (a = s.next(); a.value !== "EOF" && !Vt(a, 0, "ENDSEC"); )
        if (Vt(a, 0, "BLOCK")) {
          Ne.debug("block {");
          const E = d();
          Ne.debug("}"), F(E), E.name ? T[E.name] = E : Ne.error('block with handle "' + E.handle + '" is missing a name.');
        } else
          Tn(a), a = s.next();
      return T;
    }
    function d() {
      const T = {};
      for (a = s.next(); a.value !== "EOF"; ) {
        switch (a.code) {
          case 1:
            T.xrefPath = a.value, a = s.next();
            break;
          case 2:
            T.name = a.value, a = s.next();
            break;
          case 3:
            T.name2 = a.value, a = s.next();
            break;
          case 5:
            T.handle = a.value, a = s.next();
            break;
          case 8:
            T.layer = a.value, a = s.next();
            break;
          case 10:
            T.position = y(a), a = s.next();
            break;
          case 67:
            T.paperSpace = !!(a.value && a.value == 1), a = s.next();
            break;
          case 70:
            a.value != 0 && (T.type = a.value), a = s.next();
            break;
          case 100:
            a = s.next();
            break;
          case 330:
            T.ownerHandle = a.value, a = s.next();
            break;
          case 0:
            if (a.value == "ENDBLK")
              break;
            T.entities = A(!0);
            break;
          default:
            Tn(a), a = s.next();
        }
        if (Vt(a, 0, "ENDBLK")) {
          a = s.next();
          break;
        }
      }
      return T;
    }
    function p() {
      const T = {};
      for (a = s.next(); a.value !== "EOF" && !Vt(a, 0, "ENDSEC"); )
        Vt(a, 0, "TABLE") ? (a = s.next(), C[a.value] ? (Ne.debug(a.value + " Table {"), T[C[a.value].tableName] = x(a), Ne.debug("}")) : Ne.debug("Unhandled Table " + a.value)) : a = s.next();
      return a = s.next(), T;
    }
    const m = "ENDTAB";
    function x(T) {
      const E = C[T.value], R = {};
      let S = 0;
      for (a = s.next(); !Vt(a, 0, m); )
        switch (a.code) {
          case 5:
            R.handle = a.value, a = s.next();
            break;
          case 330:
            R.ownerHandle = a.value, a = s.next();
            break;
          case 100:
            a.value === "AcDbSymbolTable" || Tn(a), a = s.next();
            break;
          case 70:
            S = a.value, a = s.next();
            break;
          case 0:
            a.value === E.dxfSymbolName ? R[E.tableRecordsProperty] = E.parseTableRecords() : (Tn(a), a = s.next());
            break;
          default:
            Tn(a), a = s.next();
        }
      const v = R[E.tableRecordsProperty];
      if (v) {
        let w = (() => {
          if (v.constructor === Array)
            return v.length;
          if (typeof v == "object")
            return Object.keys(v).length;
        })();
        S !== w && Ne.warn("Parsed " + w + " " + E.dxfSymbolName + "'s but expected " + S);
      }
      return a = s.next(), R;
    }
    function g() {
      const T = [];
      let E = {};
      for (Ne.debug("ViewPort {"), a = s.next(); !Vt(a, 0, m); )
        switch (a.code) {
          case 2:
            E.name = a.value, a = s.next();
            break;
          case 10:
            E.lowerLeftCorner = y(a), a = s.next();
            break;
          case 11:
            E.upperRightCorner = y(a), a = s.next();
            break;
          case 12:
            E.center = y(a), a = s.next();
            break;
          case 13:
            E.snapBasePoint = y(a), a = s.next();
            break;
          case 14:
            E.snapSpacing = y(a), a = s.next();
            break;
          case 15:
            E.gridSpacing = y(a), a = s.next();
            break;
          case 16:
            E.viewDirectionFromTarget = y(a), a = s.next();
            break;
          case 17:
            E.viewTarget = y(a), a = s.next();
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
            E.ucsOrigin = y(a), a = s.next();
            break;
          case 111:
            E.ucsXAxis = y(a), a = s.next();
            break;
          case 112:
            E.ucsYAxis = y(a), a = s.next();
            break;
          case 110:
            E.ucsOrigin = y(a), a = s.next();
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
            a.value === "VPORT" && (Ne.debug("}"), T.push(E), Ne.debug("ViewPort {"), E = {}, a = s.next());
            break;
          default:
            Tn(a), a = s.next();
            break;
        }
      return Ne.debug("}"), T.push(E), T;
    }
    function f() {
      const T = {};
      let E = {}, R = 0, S;
      for (Ne.debug("LType {"), a = s.next(); !Vt(a, 0, "ENDTAB"); )
        switch (a.code) {
          case 2:
            E.name = a.value, S = a.value, a = s.next();
            break;
          case 3:
            E.description = a.value, a = s.next();
            break;
          case 73:
            R = a.value, R > 0 && (E.pattern = []), a = s.next();
            break;
          case 40:
            E.patternLength = a.value, a = s.next();
            break;
          case 49:
            E.pattern.push(a.value), a = s.next();
            break;
          case 0:
            Ne.debug("}"), R > 0 && R !== E.pattern.length && Ne.warn("lengths do not match on LTYPE pattern"), T[S] = E, E = {}, Ne.debug("LType {"), a = s.next();
            break;
          default:
            a = s.next();
        }
      return Ne.debug("}"), T[S] = E, T;
    }
    function u() {
      const T = {};
      let E = {}, R;
      for (Ne.debug("Layer {"), a = s.next(); !Vt(a, 0, "ENDTAB"); )
        switch (a.code) {
          case 2:
            E.name = a.value, R = a.value, a = s.next();
            break;
          case 62:
            E.visible = a.value >= 0, E.colorIndex = Math.abs(a.value), E.color = zl(E.colorIndex), a = s.next();
            break;
          case 70:
            E.frozen = (a.value & 1) != 0 || (a.value & 2) != 0, a = s.next();
            break;
          case 0:
            a.value === "LAYER" && (Ne.debug("}"), T[R] = E, Ne.debug("Layer {"), E = {}, R = void 0, a = s.next());
            break;
          default:
            Tn(a), a = s.next();
            break;
        }
      return Ne.debug("}"), T[R] = E, T;
    }
    const C = {
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
        parseTableRecords: f
      },
      LAYER: {
        tableRecordsProperty: "layers",
        tableName: "layer",
        dxfSymbolName: "LAYER",
        parseTableRecords: u
      }
    };
    function A(T) {
      const E = [], R = T ? "ENDBLK" : "ENDSEC";
      for (T || (a = s.next()); ; )
        if (a.code === 0) {
          if (a.value === R)
            break;
          const S = o._entityHandlers[a.value];
          if (S != null) {
            Ne.debug(a.value + " {");
            const v = S.parseEntity(s, a);
            a = s.lastReadGroup, Ne.debug("}"), F(v), E.push(v);
          } else {
            Ne.warn("Unhandled entity " + a.value), a = s.next();
            continue;
          }
        } else
          a = s.next();
      return R == "ENDSEC" && (a = s.next()), E;
    }
    function y(T) {
      const E = {};
      let R = T.code;
      if (E.x = T.value, R += 10, T = s.next(), T.code != R)
        throw new Error("Expected code for point value to be " + R + " but got " + T.code + ".");
      return E.y = T.value, R += 10, T = s.next(), T.code != R ? (s.rewind(), E) : (E.z = T.value, E);
    }
    function F(T) {
      if (!T)
        throw new TypeError("entity cannot be undefined or null");
      T.handle || (T.handle = n++);
    }
    return l(), t;
  }
}
function Vt(i, e, t) {
  return i.code === e && i.value === t;
}
function Tn(i) {
  Ne.debug("unhandled group " + yo(i));
}
function yo(i) {
  return i.code + ":" + i.value;
}
function zl(i) {
  return Eo[i];
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Ys = "170", si = { ROTATE: 0, DOLLY: 1, PAN: 2 }, ni = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Hl = 0, fa = 1, Vl = 2, bo = 1, Gl = 2, en = 3, En = 0, Et = 1, nn = 2, Mn = 0, ai = 1, pa = 2, ma = 3, _a = 4, Wl = 5, In = 100, Xl = 101, Yl = 102, ql = 103, jl = 104, Kl = 200, Zl = 201, $l = 202, Jl = 203, rs = 204, ss = 205, Ql = 206, ec = 207, tc = 208, nc = 209, ic = 210, rc = 211, sc = 212, ac = 213, oc = 214, as = 0, os = 1, ls = 2, ci = 3, cs = 4, hs = 5, us = 6, ds = 7, To = 0, lc = 1, cc = 2, Sn = 0, hc = 1, uc = 2, dc = 3, fc = 4, pc = 5, mc = 6, _c = 7, Ao = 300, hi = 301, ui = 302, fs = 303, ps = 304, xr = 306, ms = 1e3, Nn = 1001, _s = 1002, zt = 1003, gc = 1004, Ni = 1005, Wt = 1006, Tr = 1007, Fn = 1008, ln = 1009, wo = 1010, Ro = 1011, wi = 1012, qs = 1013, On = 1014, rn = 1015, Ri = 1016, js = 1017, Ks = 1018, di = 1020, Co = 35902, Po = 1021, Lo = 1022, kt = 1023, Do = 1024, Io = 1025, oi = 1026, fi = 1027, Uo = 1028, Zs = 1029, No = 1030, $s = 1031, Js = 1033, or = 33776, lr = 33777, cr = 33778, hr = 33779, gs = 35840, vs = 35841, xs = 35842, Ms = 35843, Ss = 36196, Es = 37492, ys = 37496, bs = 37808, Ts = 37809, As = 37810, ws = 37811, Rs = 37812, Cs = 37813, Ps = 37814, Ls = 37815, Ds = 37816, Is = 37817, Us = 37818, Ns = 37819, Fs = 37820, Os = 37821, ur = 36492, Bs = 36494, ks = 36495, Fo = 36283, zs = 36284, Hs = 36285, Vs = 36286, vc = 3200, xc = 3201, Mc = 0, Sc = 1, xn = "", Lt = "srgb", mi = "srgb-linear", Mr = "linear", Ke = "srgb", Vn = 7680, ga = 519, Ec = 512, yc = 513, bc = 514, Oo = 515, Tc = 516, Ac = 517, wc = 518, Rc = 519, va = 35044, xa = "300 es", sn = 2e3, mr = 2001;
class zn {
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
const pt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], dr = Math.PI / 180, Gs = 180 / Math.PI;
function Ci() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (pt[i & 255] + pt[i >> 8 & 255] + pt[i >> 16 & 255] + pt[i >> 24 & 255] + "-" + pt[e & 255] + pt[e >> 8 & 255] + "-" + pt[e >> 16 & 15 | 64] + pt[e >> 24 & 255] + "-" + pt[t & 63 | 128] + pt[t >> 8 & 255] + "-" + pt[t >> 16 & 255] + pt[t >> 24 & 255] + pt[n & 255] + pt[n >> 8 & 255] + pt[n >> 16 & 255] + pt[n >> 24 & 255]).toLowerCase();
}
function vt(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Cc(i, e) {
  return (i % e + e) % e;
}
function Ar(i, e, t) {
  return (1 - t) * i + t * e;
}
function xi(i, e) {
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
function Mt(i, e) {
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
const Pc = {
  DEG2RAD: dr
};
class Ie {
  constructor(e = 0, t = 0) {
    Ie.prototype.isVector2 = !0, this.x = e, this.y = t;
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
    return Math.acos(vt(n, -1, 1));
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
class Pe {
  constructor(e, t, n, r, s, o, a, l, c) {
    Pe.prototype.isMatrix3 = !0, this.elements = [
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
    const n = e.elements, r = t.elements, s = this.elements, o = n[0], a = n[3], l = n[6], c = n[1], h = n[4], d = n[7], p = n[2], m = n[5], x = n[8], g = r[0], f = r[3], u = r[6], C = r[1], A = r[4], y = r[7], F = r[2], T = r[5], E = r[8];
    return s[0] = o * g + a * C + l * F, s[3] = o * f + a * A + l * T, s[6] = o * u + a * y + l * E, s[1] = c * g + h * C + d * F, s[4] = c * f + h * A + d * T, s[7] = c * u + h * y + d * E, s[2] = p * g + m * C + x * F, s[5] = p * f + m * A + x * T, s[8] = p * u + m * y + x * E, this;
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
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8], d = h * o - a * c, p = a * l - h * s, m = c * s - o * l, x = t * d + n * p + r * m;
    if (x === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const g = 1 / x;
    return e[0] = d * g, e[1] = (r * c - h * n) * g, e[2] = (a * n - r * o) * g, e[3] = p * g, e[4] = (h * t - r * l) * g, e[5] = (r * s - a * t) * g, e[6] = m * g, e[7] = (n * l - c * t) * g, e[8] = (o * t - n * s) * g, this;
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
    return this.premultiply(wr.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(wr.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(wr.makeTranslation(e, t)), this;
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
const wr = /* @__PURE__ */ new Pe();
function Bo(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function _r(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Lc() {
  const i = _r("canvas");
  return i.style.display = "block", i;
}
const Ma = {};
function Ti(i) {
  i in Ma || (Ma[i] = !0, console.warn(i));
}
function Dc(i, e, t) {
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
function Ic(i) {
  const e = i.elements;
  e[2] = 0.5 * e[2] + 0.5 * e[3], e[6] = 0.5 * e[6] + 0.5 * e[7], e[10] = 0.5 * e[10] + 0.5 * e[11], e[14] = 0.5 * e[14] + 0.5 * e[15];
}
function Uc(i) {
  const e = i.elements;
  e[11] === -1 ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = -e[14] + 1);
}
const Ve = {
  enabled: !0,
  workingColorSpace: mi,
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
    return this.enabled === !1 || e === t || !e || !t || (this.spaces[e].transfer === Ke && (i.r = an(i.r), i.g = an(i.g), i.b = an(i.b)), this.spaces[e].primaries !== this.spaces[t].primaries && (i.applyMatrix3(this.spaces[e].toXYZ), i.applyMatrix3(this.spaces[t].fromXYZ)), this.spaces[t].transfer === Ke && (i.r = li(i.r), i.g = li(i.g), i.b = li(i.b))), i;
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
    return i === xn ? Mr : this.spaces[i].transfer;
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
function an(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function li(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const Sa = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], Ea = [0.2126, 0.7152, 0.0722], ya = [0.3127, 0.329], ba = /* @__PURE__ */ new Pe().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), Ta = /* @__PURE__ */ new Pe().set(
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
Ve.define({
  [mi]: {
    primaries: Sa,
    whitePoint: ya,
    transfer: Mr,
    toXYZ: ba,
    fromXYZ: Ta,
    luminanceCoefficients: Ea,
    workingColorSpaceConfig: { unpackColorSpace: Lt },
    outputColorSpaceConfig: { drawingBufferColorSpace: Lt }
  },
  [Lt]: {
    primaries: Sa,
    whitePoint: ya,
    transfer: Ke,
    toXYZ: ba,
    fromXYZ: Ta,
    luminanceCoefficients: Ea,
    outputColorSpaceConfig: { drawingBufferColorSpace: Lt }
  }
});
let Gn;
class Nc {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      Gn === void 0 && (Gn = _r("canvas")), Gn.width = e.width, Gn.height = e.height;
      const n = Gn.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = Gn;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = _r("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let o = 0; o < s.length; o++)
        s[o] = an(s[o] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(an(t[n] / 255) * 255) : t[n] = an(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Fc = 0;
class ko {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Fc++ }), this.uuid = Ci(), this.data = e, this.dataReady = !0, this.version = 0;
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
          r[o].isDataTexture ? s.push(Rr(r[o].image)) : s.push(Rr(r[o]));
      } else
        s = Rr(r);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function Rr(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Nc.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Oc = 0;
class yt extends zn {
  constructor(e = yt.DEFAULT_IMAGE, t = yt.DEFAULT_MAPPING, n = Nn, r = Nn, s = Wt, o = Fn, a = kt, l = ln, c = yt.DEFAULT_ANISOTROPY, h = xn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Oc++ }), this.uuid = Ci(), this.name = "", this.source = new ko(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = o, this.anisotropy = c, this.format = a, this.internalFormat = null, this.type = l, this.offset = new Ie(0, 0), this.repeat = new Ie(1, 1), this.center = new Ie(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Pe(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
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
    if (this.mapping !== Ao) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case ms:
          e.x = e.x - Math.floor(e.x);
          break;
        case Nn:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case _s:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case ms:
          e.y = e.y - Math.floor(e.y);
          break;
        case Nn:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case _s:
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
yt.DEFAULT_IMAGE = null;
yt.DEFAULT_MAPPING = Ao;
yt.DEFAULT_ANISOTROPY = 1;
class st {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    st.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = r;
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
    const l = e.elements, c = l[0], h = l[4], d = l[8], p = l[1], m = l[5], x = l[9], g = l[2], f = l[6], u = l[10];
    if (Math.abs(h - p) < 0.01 && Math.abs(d - g) < 0.01 && Math.abs(x - f) < 0.01) {
      if (Math.abs(h + p) < 0.1 && Math.abs(d + g) < 0.1 && Math.abs(x + f) < 0.1 && Math.abs(c + m + u - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const A = (c + 1) / 2, y = (m + 1) / 2, F = (u + 1) / 2, T = (h + p) / 4, E = (d + g) / 4, R = (x + f) / 4;
      return A > y && A > F ? A < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(A), r = T / n, s = E / n) : y > F ? y < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(y), n = T / r, s = R / r) : F < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(F), n = E / s, r = R / s), this.set(n, r, s, t), this;
    }
    let C = Math.sqrt((f - x) * (f - x) + (d - g) * (d - g) + (p - h) * (p - h));
    return Math.abs(C) < 1e-3 && (C = 1), this.x = (f - x) / C, this.y = (d - g) / C, this.z = (p - h) / C, this.w = Math.acos((c + m + u - 1) / 2), this;
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
class Bc extends zn {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new st(0, 0, e, t), this.scissorTest = !1, this.viewport = new st(0, 0, e, t);
    const r = { width: e, height: t, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Wt,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const s = new yt(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
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
    return this.texture.source = new ko(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Bn extends Bc {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class zo extends yt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = zt, this.minFilter = zt, this.wrapR = Nn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class kc extends yt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = zt, this.minFilter = zt, this.wrapR = Nn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class kn {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  static slerpFlat(e, t, n, r, s, o, a) {
    let l = n[r + 0], c = n[r + 1], h = n[r + 2], d = n[r + 3];
    const p = s[o + 0], m = s[o + 1], x = s[o + 2], g = s[o + 3];
    if (a === 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
      return;
    }
    if (a === 1) {
      e[t + 0] = p, e[t + 1] = m, e[t + 2] = x, e[t + 3] = g;
      return;
    }
    if (d !== g || l !== p || c !== m || h !== x) {
      let f = 1 - a;
      const u = l * p + c * m + h * x + d * g, C = u >= 0 ? 1 : -1, A = 1 - u * u;
      if (A > Number.EPSILON) {
        const F = Math.sqrt(A), T = Math.atan2(F, u * C);
        f = Math.sin(f * T) / F, a = Math.sin(a * T) / F;
      }
      const y = a * C;
      if (l = l * f + p * y, c = c * f + m * y, h = h * f + x * y, d = d * f + g * y, f === 1 - a) {
        const F = 1 / Math.sqrt(l * l + c * c + h * h + d * d);
        l *= F, c *= F, h *= F, d *= F;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
  }
  static multiplyQuaternionsFlat(e, t, n, r, s, o) {
    const a = n[r], l = n[r + 1], c = n[r + 2], h = n[r + 3], d = s[o], p = s[o + 1], m = s[o + 2], x = s[o + 3];
    return e[t] = a * x + h * d + l * m - c * p, e[t + 1] = l * x + h * p + c * d - a * m, e[t + 2] = c * x + h * m + a * p - l * d, e[t + 3] = h * x - a * d - l * p - c * m, e;
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
    const n = e._x, r = e._y, s = e._z, o = e._order, a = Math.cos, l = Math.sin, c = a(n / 2), h = a(r / 2), d = a(s / 2), p = l(n / 2), m = l(r / 2), x = l(s / 2);
    switch (o) {
      case "XYZ":
        this._x = p * h * d + c * m * x, this._y = c * m * d - p * h * x, this._z = c * h * x + p * m * d, this._w = c * h * d - p * m * x;
        break;
      case "YXZ":
        this._x = p * h * d + c * m * x, this._y = c * m * d - p * h * x, this._z = c * h * x - p * m * d, this._w = c * h * d + p * m * x;
        break;
      case "ZXY":
        this._x = p * h * d - c * m * x, this._y = c * m * d + p * h * x, this._z = c * h * x + p * m * d, this._w = c * h * d - p * m * x;
        break;
      case "ZYX":
        this._x = p * h * d - c * m * x, this._y = c * m * d + p * h * x, this._z = c * h * x - p * m * d, this._w = c * h * d + p * m * x;
        break;
      case "YZX":
        this._x = p * h * d + c * m * x, this._y = c * m * d + p * h * x, this._z = c * h * x - p * m * d, this._w = c * h * d - p * m * x;
        break;
      case "XZY":
        this._x = p * h * d - c * m * x, this._y = c * m * d - p * h * x, this._z = c * h * x + p * m * d, this._w = c * h * d + p * m * x;
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
    const t = e.elements, n = t[0], r = t[4], s = t[8], o = t[1], a = t[5], l = t[9], c = t[2], h = t[6], d = t[10], p = n + a + d;
    if (p > 0) {
      const m = 0.5 / Math.sqrt(p + 1);
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
    return 2 * Math.acos(Math.abs(vt(this.dot(e), -1, 1)));
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
    const c = Math.sqrt(l), h = Math.atan2(c, a), d = Math.sin((1 - t) * h) / c, p = Math.sin(t * h) / c;
    return this._w = o * d + this._w * p, this._x = n * d + this._x * p, this._y = r * d + this._y * p, this._z = s * d + this._z * p, this._onChangeCallback(), this;
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
    return this.applyQuaternion(Aa.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(Aa.setFromAxisAngle(e, t));
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
    return Cr.copy(this).projectOnVector(e), this.sub(Cr);
  }
  reflect(e) {
    return this.sub(Cr.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(vt(n, -1, 1));
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
const Cr = /* @__PURE__ */ new U(), Aa = /* @__PURE__ */ new kn();
class Pi {
  constructor(e = new U(1 / 0, 1 / 0, 1 / 0), t = new U(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Nt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Nt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Nt.copy(t).multiplyScalar(0.5);
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
          e.isMesh === !0 ? e.getVertexPosition(o, Nt) : Nt.fromBufferAttribute(s, o), Nt.applyMatrix4(e.matrixWorld), this.expandByPoint(Nt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Fi.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Fi.copy(n.boundingBox)), Fi.applyMatrix4(e.matrixWorld), this.union(Fi);
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
    return this.clampPoint(e.center, Nt), Nt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Mi), Oi.subVectors(this.max, Mi), Wn.subVectors(e.a, Mi), Xn.subVectors(e.b, Mi), Yn.subVectors(e.c, Mi), dn.subVectors(Xn, Wn), fn.subVectors(Yn, Xn), An.subVectors(Wn, Yn);
    let t = [
      0,
      -dn.z,
      dn.y,
      0,
      -fn.z,
      fn.y,
      0,
      -An.z,
      An.y,
      dn.z,
      0,
      -dn.x,
      fn.z,
      0,
      -fn.x,
      An.z,
      0,
      -An.x,
      -dn.y,
      dn.x,
      0,
      -fn.y,
      fn.x,
      0,
      -An.y,
      An.x,
      0
    ];
    return !Pr(t, Wn, Xn, Yn, Oi) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Pr(t, Wn, Xn, Yn, Oi)) ? !1 : (Bi.crossVectors(dn, fn), t = [Bi.x, Bi.y, Bi.z], Pr(t, Wn, Xn, Yn, Oi));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Nt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Nt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Kt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Kt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Kt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Kt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Kt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Kt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Kt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Kt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Kt), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Kt = [
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U()
], Nt = /* @__PURE__ */ new U(), Fi = /* @__PURE__ */ new Pi(), Wn = /* @__PURE__ */ new U(), Xn = /* @__PURE__ */ new U(), Yn = /* @__PURE__ */ new U(), dn = /* @__PURE__ */ new U(), fn = /* @__PURE__ */ new U(), An = /* @__PURE__ */ new U(), Mi = /* @__PURE__ */ new U(), Oi = /* @__PURE__ */ new U(), Bi = /* @__PURE__ */ new U(), wn = /* @__PURE__ */ new U();
function Pr(i, e, t, n, r) {
  for (let s = 0, o = i.length - 3; s <= o; s += 3) {
    wn.fromArray(i, s);
    const a = r.x * Math.abs(wn.x) + r.y * Math.abs(wn.y) + r.z * Math.abs(wn.z), l = e.dot(wn), c = t.dot(wn), h = n.dot(wn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > a)
      return !1;
  }
  return !0;
}
const zc = /* @__PURE__ */ new Pi(), Si = /* @__PURE__ */ new U(), Lr = /* @__PURE__ */ new U();
class Sr {
  constructor(e = new U(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : zc.setFromPoints(e).getCenter(n);
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
    Si.subVectors(e, this.center);
    const t = Si.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(Si, r / n), this.radius += r;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Lr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Si.copy(e.center).add(Lr)), this.expandByPoint(Si.copy(e.center).sub(Lr))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Zt = /* @__PURE__ */ new U(), Dr = /* @__PURE__ */ new U(), ki = /* @__PURE__ */ new U(), pn = /* @__PURE__ */ new U(), Ir = /* @__PURE__ */ new U(), zi = /* @__PURE__ */ new U(), Ur = /* @__PURE__ */ new U();
class Qs {
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
    return this.origin.copy(this.at(e, Zt)), this;
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
    const t = Zt.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (Zt.copy(this.origin).addScaledVector(this.direction, t), Zt.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, r) {
    Dr.copy(e).add(t).multiplyScalar(0.5), ki.copy(t).sub(e).normalize(), pn.copy(this.origin).sub(Dr);
    const s = e.distanceTo(t) * 0.5, o = -this.direction.dot(ki), a = pn.dot(this.direction), l = -pn.dot(ki), c = pn.lengthSq(), h = Math.abs(1 - o * o);
    let d, p, m, x;
    if (h > 0)
      if (d = o * l - a, p = o * a - l, x = s * h, d >= 0)
        if (p >= -x)
          if (p <= x) {
            const g = 1 / h;
            d *= g, p *= g, m = d * (d + o * p + 2 * a) + p * (o * d + p + 2 * l) + c;
          } else
            p = s, d = Math.max(0, -(o * p + a)), m = -d * d + p * (p + 2 * l) + c;
        else
          p = -s, d = Math.max(0, -(o * p + a)), m = -d * d + p * (p + 2 * l) + c;
      else
        p <= -x ? (d = Math.max(0, -(-o * s + a)), p = d > 0 ? -s : Math.min(Math.max(-s, -l), s), m = -d * d + p * (p + 2 * l) + c) : p <= x ? (d = 0, p = Math.min(Math.max(-s, -l), s), m = p * (p + 2 * l) + c) : (d = Math.max(0, -(o * s + a)), p = d > 0 ? s : Math.min(Math.max(-s, -l), s), m = -d * d + p * (p + 2 * l) + c);
    else
      p = o > 0 ? -s : s, d = Math.max(0, -(o * p + a)), m = -d * d + p * (p + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, d), r && r.copy(Dr).addScaledVector(ki, p), m;
  }
  intersectSphere(e, t) {
    Zt.subVectors(e.center, this.origin);
    const n = Zt.dot(this.direction), r = Zt.dot(Zt) - n * n, s = e.radius * e.radius;
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
    const c = 1 / this.direction.x, h = 1 / this.direction.y, d = 1 / this.direction.z, p = this.origin;
    return c >= 0 ? (n = (e.min.x - p.x) * c, r = (e.max.x - p.x) * c) : (n = (e.max.x - p.x) * c, r = (e.min.x - p.x) * c), h >= 0 ? (s = (e.min.y - p.y) * h, o = (e.max.y - p.y) * h) : (s = (e.max.y - p.y) * h, o = (e.min.y - p.y) * h), n > o || s > r || ((s > n || isNaN(n)) && (n = s), (o < r || isNaN(r)) && (r = o), d >= 0 ? (a = (e.min.z - p.z) * d, l = (e.max.z - p.z) * d) : (a = (e.max.z - p.z) * d, l = (e.min.z - p.z) * d), n > l || a > r) || ((a > n || n !== n) && (n = a), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, Zt) !== null;
  }
  intersectTriangle(e, t, n, r, s) {
    Ir.subVectors(t, e), zi.subVectors(n, e), Ur.crossVectors(Ir, zi);
    let o = this.direction.dot(Ur), a;
    if (o > 0) {
      if (r) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    pn.subVectors(this.origin, e);
    const l = a * this.direction.dot(zi.crossVectors(pn, zi));
    if (l < 0)
      return null;
    const c = a * this.direction.dot(Ir.cross(pn));
    if (c < 0 || l + c > o)
      return null;
    const h = -a * pn.dot(Ur);
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
class at {
  constructor(e, t, n, r, s, o, a, l, c, h, d, p, m, x, g, f) {
    at.prototype.isMatrix4 = !0, this.elements = [
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
    ], e !== void 0 && this.set(e, t, n, r, s, o, a, l, c, h, d, p, m, x, g, f);
  }
  set(e, t, n, r, s, o, a, l, c, h, d, p, m, x, g, f) {
    const u = this.elements;
    return u[0] = e, u[4] = t, u[8] = n, u[12] = r, u[1] = s, u[5] = o, u[9] = a, u[13] = l, u[2] = c, u[6] = h, u[10] = d, u[14] = p, u[3] = m, u[7] = x, u[11] = g, u[15] = f, this;
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
    return new at().fromArray(this.elements);
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
    const t = this.elements, n = e.elements, r = 1 / qn.setFromMatrixColumn(e, 0).length(), s = 1 / qn.setFromMatrixColumn(e, 1).length(), o = 1 / qn.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * o, t[9] = n[9] * o, t[10] = n[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z, o = Math.cos(n), a = Math.sin(n), l = Math.cos(r), c = Math.sin(r), h = Math.cos(s), d = Math.sin(s);
    if (e.order === "XYZ") {
      const p = o * h, m = o * d, x = a * h, g = a * d;
      t[0] = l * h, t[4] = -l * d, t[8] = c, t[1] = m + x * c, t[5] = p - g * c, t[9] = -a * l, t[2] = g - p * c, t[6] = x + m * c, t[10] = o * l;
    } else if (e.order === "YXZ") {
      const p = l * h, m = l * d, x = c * h, g = c * d;
      t[0] = p + g * a, t[4] = x * a - m, t[8] = o * c, t[1] = o * d, t[5] = o * h, t[9] = -a, t[2] = m * a - x, t[6] = g + p * a, t[10] = o * l;
    } else if (e.order === "ZXY") {
      const p = l * h, m = l * d, x = c * h, g = c * d;
      t[0] = p - g * a, t[4] = -o * d, t[8] = x + m * a, t[1] = m + x * a, t[5] = o * h, t[9] = g - p * a, t[2] = -o * c, t[6] = a, t[10] = o * l;
    } else if (e.order === "ZYX") {
      const p = o * h, m = o * d, x = a * h, g = a * d;
      t[0] = l * h, t[4] = x * c - m, t[8] = p * c + g, t[1] = l * d, t[5] = g * c + p, t[9] = m * c - x, t[2] = -c, t[6] = a * l, t[10] = o * l;
    } else if (e.order === "YZX") {
      const p = o * l, m = o * c, x = a * l, g = a * c;
      t[0] = l * h, t[4] = g - p * d, t[8] = x * d + m, t[1] = d, t[5] = o * h, t[9] = -a * h, t[2] = -c * h, t[6] = m * d + x, t[10] = p - g * d;
    } else if (e.order === "XZY") {
      const p = o * l, m = o * c, x = a * l, g = a * c;
      t[0] = l * h, t[4] = -d, t[8] = c * h, t[1] = p * d + g, t[5] = o * h, t[9] = m * d - x, t[2] = x * d - m, t[6] = a * h, t[10] = g * d + p;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(Hc, e, Vc);
  }
  lookAt(e, t, n) {
    const r = this.elements;
    return At.subVectors(e, t), At.lengthSq() === 0 && (At.z = 1), At.normalize(), mn.crossVectors(n, At), mn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? At.x += 1e-4 : At.z += 1e-4, At.normalize(), mn.crossVectors(n, At)), mn.normalize(), Hi.crossVectors(At, mn), r[0] = mn.x, r[4] = Hi.x, r[8] = At.x, r[1] = mn.y, r[5] = Hi.y, r[9] = At.y, r[2] = mn.z, r[6] = Hi.z, r[10] = At.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, o = n[0], a = n[4], l = n[8], c = n[12], h = n[1], d = n[5], p = n[9], m = n[13], x = n[2], g = n[6], f = n[10], u = n[14], C = n[3], A = n[7], y = n[11], F = n[15], T = r[0], E = r[4], R = r[8], S = r[12], v = r[1], w = r[5], N = r[9], B = r[13], W = r[2], K = r[6], G = r[10], $ = r[14], H = r[3], te = r[7], ie = r[11], fe = r[15];
    return s[0] = o * T + a * v + l * W + c * H, s[4] = o * E + a * w + l * K + c * te, s[8] = o * R + a * N + l * G + c * ie, s[12] = o * S + a * B + l * $ + c * fe, s[1] = h * T + d * v + p * W + m * H, s[5] = h * E + d * w + p * K + m * te, s[9] = h * R + d * N + p * G + m * ie, s[13] = h * S + d * B + p * $ + m * fe, s[2] = x * T + g * v + f * W + u * H, s[6] = x * E + g * w + f * K + u * te, s[10] = x * R + g * N + f * G + u * ie, s[14] = x * S + g * B + f * $ + u * fe, s[3] = C * T + A * v + y * W + F * H, s[7] = C * E + A * w + y * K + F * te, s[11] = C * R + A * N + y * G + F * ie, s[15] = C * S + A * B + y * $ + F * fe, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[12], o = e[1], a = e[5], l = e[9], c = e[13], h = e[2], d = e[6], p = e[10], m = e[14], x = e[3], g = e[7], f = e[11], u = e[15];
    return x * (+s * l * d - r * c * d - s * a * p + n * c * p + r * a * m - n * l * m) + g * (+t * l * m - t * c * p + s * o * p - r * o * m + r * c * h - s * l * h) + f * (+t * c * d - t * a * m - s * o * d + n * o * m + s * a * h - n * c * h) + u * (-r * a * h - t * l * d + t * a * p + r * o * d - n * o * p + n * l * h);
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
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8], d = e[9], p = e[10], m = e[11], x = e[12], g = e[13], f = e[14], u = e[15], C = d * f * c - g * p * c + g * l * m - a * f * m - d * l * u + a * p * u, A = x * p * c - h * f * c - x * l * m + o * f * m + h * l * u - o * p * u, y = h * g * c - x * d * c + x * a * m - o * g * m - h * a * u + o * d * u, F = x * d * l - h * g * l - x * a * p + o * g * p + h * a * f - o * d * f, T = t * C + n * A + r * y + s * F;
    if (T === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const E = 1 / T;
    return e[0] = C * E, e[1] = (g * p * s - d * f * s - g * r * m + n * f * m + d * r * u - n * p * u) * E, e[2] = (a * f * s - g * l * s + g * r * c - n * f * c - a * r * u + n * l * u) * E, e[3] = (d * l * s - a * p * s - d * r * c + n * p * c + a * r * m - n * l * m) * E, e[4] = A * E, e[5] = (h * f * s - x * p * s + x * r * m - t * f * m - h * r * u + t * p * u) * E, e[6] = (x * l * s - o * f * s - x * r * c + t * f * c + o * r * u - t * l * u) * E, e[7] = (o * p * s - h * l * s + h * r * c - t * p * c - o * r * m + t * l * m) * E, e[8] = y * E, e[9] = (x * d * s - h * g * s - x * n * m + t * g * m + h * n * u - t * d * u) * E, e[10] = (o * g * s - x * a * s + x * n * c - t * g * c - o * n * u + t * a * u) * E, e[11] = (h * a * s - o * d * s - h * n * c + t * d * c + o * n * m - t * a * m) * E, e[12] = F * E, e[13] = (h * g * r - x * d * r + x * n * p - t * g * p - h * n * f + t * d * f) * E, e[14] = (x * a * r - o * g * r - x * n * l + t * g * l + o * n * f - t * a * f) * E, e[15] = (o * d * r - h * a * r + h * n * l - t * d * l - o * n * p + t * a * p) * E, this;
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
    const r = this.elements, s = t._x, o = t._y, a = t._z, l = t._w, c = s + s, h = o + o, d = a + a, p = s * c, m = s * h, x = s * d, g = o * h, f = o * d, u = a * d, C = l * c, A = l * h, y = l * d, F = n.x, T = n.y, E = n.z;
    return r[0] = (1 - (g + u)) * F, r[1] = (m + y) * F, r[2] = (x - A) * F, r[3] = 0, r[4] = (m - y) * T, r[5] = (1 - (p + u)) * T, r[6] = (f + C) * T, r[7] = 0, r[8] = (x + A) * E, r[9] = (f - C) * E, r[10] = (1 - (p + g)) * E, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  decompose(e, t, n) {
    const r = this.elements;
    let s = qn.set(r[0], r[1], r[2]).length();
    const o = qn.set(r[4], r[5], r[6]).length(), a = qn.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), e.x = r[12], e.y = r[13], e.z = r[14], Ft.copy(this);
    const c = 1 / s, h = 1 / o, d = 1 / a;
    return Ft.elements[0] *= c, Ft.elements[1] *= c, Ft.elements[2] *= c, Ft.elements[4] *= h, Ft.elements[5] *= h, Ft.elements[6] *= h, Ft.elements[8] *= d, Ft.elements[9] *= d, Ft.elements[10] *= d, t.setFromRotationMatrix(Ft), n.x = s, n.y = o, n.z = a, this;
  }
  makePerspective(e, t, n, r, s, o, a = sn) {
    const l = this.elements, c = 2 * s / (t - e), h = 2 * s / (n - r), d = (t + e) / (t - e), p = (n + r) / (n - r);
    let m, x;
    if (a === sn)
      m = -(o + s) / (o - s), x = -2 * o * s / (o - s);
    else if (a === mr)
      m = -o / (o - s), x = -o * s / (o - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return l[0] = c, l[4] = 0, l[8] = d, l[12] = 0, l[1] = 0, l[5] = h, l[9] = p, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = m, l[14] = x, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, s, o, a = sn) {
    const l = this.elements, c = 1 / (t - e), h = 1 / (n - r), d = 1 / (o - s), p = (t + e) * c, m = (n + r) * h;
    let x, g;
    if (a === sn)
      x = (o + s) * d, g = -2 * d;
    else if (a === mr)
      x = s * d, g = -1 * d;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -p, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -m, l[2] = 0, l[6] = 0, l[10] = g, l[14] = -x, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
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
const qn = /* @__PURE__ */ new U(), Ft = /* @__PURE__ */ new at(), Hc = /* @__PURE__ */ new U(0, 0, 0), Vc = /* @__PURE__ */ new U(1, 1, 1), mn = /* @__PURE__ */ new U(), Hi = /* @__PURE__ */ new U(), At = /* @__PURE__ */ new U(), wa = /* @__PURE__ */ new at(), Ra = /* @__PURE__ */ new kn();
class cn {
  constructor(e = 0, t = 0, n = 0, r = cn.DEFAULT_ORDER) {
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
    const r = e.elements, s = r[0], o = r[4], a = r[8], l = r[1], c = r[5], h = r[9], d = r[2], p = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(vt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-o, s)) : (this._x = Math.atan2(p, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-vt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, m), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(vt(p, -1, 1)), Math.abs(p) < 0.9999999 ? (this._y = Math.atan2(-d, m), this._z = Math.atan2(-o, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-vt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(p, m), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-o, c));
        break;
      case "YZX":
        this._z = Math.asin(vt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(a, m));
        break;
      case "XZY":
        this._z = Math.asin(-vt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(p, c), this._y = Math.atan2(a, s)) : (this._x = Math.atan2(-h, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return wa.makeRotationFromQuaternion(e), this.setFromRotationMatrix(wa, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return Ra.setFromEuler(this), this.setFromQuaternion(Ra, e);
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
cn.DEFAULT_ORDER = "XYZ";
class Ho {
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
let Gc = 0;
const Ca = /* @__PURE__ */ new U(), jn = /* @__PURE__ */ new kn(), $t = /* @__PURE__ */ new at(), Vi = /* @__PURE__ */ new U(), Ei = /* @__PURE__ */ new U(), Wc = /* @__PURE__ */ new U(), Xc = /* @__PURE__ */ new kn(), Pa = /* @__PURE__ */ new U(1, 0, 0), La = /* @__PURE__ */ new U(0, 1, 0), Da = /* @__PURE__ */ new U(0, 0, 1), Ia = { type: "added" }, Yc = { type: "removed" }, Kn = { type: "childadded", child: null }, Nr = { type: "childremoved", child: null };
class bt extends zn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Gc++ }), this.uuid = Ci(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = bt.DEFAULT_UP.clone();
    const e = new U(), t = new cn(), n = new kn(), r = new U(1, 1, 1);
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
        value: new at()
      },
      normalMatrix: {
        value: new Pe()
      }
    }), this.matrix = new at(), this.matrixWorld = new at(), this.matrixAutoUpdate = bt.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Ho(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
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
    return jn.setFromAxisAngle(e, t), this.quaternion.multiply(jn), this;
  }
  rotateOnWorldAxis(e, t) {
    return jn.setFromAxisAngle(e, t), this.quaternion.premultiply(jn), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Pa, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(La, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(Da, e);
  }
  translateOnAxis(e, t) {
    return Ca.copy(e).applyQuaternion(this.quaternion), this.position.add(Ca.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Pa, e);
  }
  translateY(e) {
    return this.translateOnAxis(La, e);
  }
  translateZ(e) {
    return this.translateOnAxis(Da, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4($t.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? Vi.copy(e) : Vi.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Ei.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? $t.lookAt(Ei, Vi, this.up) : $t.lookAt(Vi, Ei, this.up), this.quaternion.setFromRotationMatrix($t), r && ($t.extractRotation(r.matrixWorld), jn.setFromRotationMatrix($t), this.quaternion.premultiply(jn.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Ia), Kn.child = e, this.dispatchEvent(Kn), Kn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Yc), Nr.child = e, this.dispatchEvent(Nr), Nr.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), $t.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), $t.multiply(e.parent.matrixWorld)), e.applyMatrix4($t), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Ia), Kn.child = e, this.dispatchEvent(Kn), Kn.child = null, this;
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
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ei, e, Wc), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ei, Xc, e), e;
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
      const a = o(e.geometries), l = o(e.materials), c = o(e.textures), h = o(e.images), d = o(e.shapes), p = o(e.skeletons), m = o(e.animations), x = o(e.nodes);
      a.length > 0 && (n.geometries = a), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), p.length > 0 && (n.skeletons = p), m.length > 0 && (n.animations = m), x.length > 0 && (n.nodes = x);
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
bt.DEFAULT_UP = /* @__PURE__ */ new U(0, 1, 0);
bt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Ot = /* @__PURE__ */ new U(), Jt = /* @__PURE__ */ new U(), Fr = /* @__PURE__ */ new U(), Qt = /* @__PURE__ */ new U(), Zn = /* @__PURE__ */ new U(), $n = /* @__PURE__ */ new U(), Ua = /* @__PURE__ */ new U(), Or = /* @__PURE__ */ new U(), Br = /* @__PURE__ */ new U(), kr = /* @__PURE__ */ new U(), zr = /* @__PURE__ */ new st(), Hr = /* @__PURE__ */ new st(), Vr = /* @__PURE__ */ new st();
class Bt {
  constructor(e = new U(), t = new U(), n = new U()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), Ot.subVectors(e, t), r.cross(Ot);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, r, s) {
    Ot.subVectors(r, t), Jt.subVectors(n, t), Fr.subVectors(e, t);
    const o = Ot.dot(Ot), a = Ot.dot(Jt), l = Ot.dot(Fr), c = Jt.dot(Jt), h = Jt.dot(Fr), d = o * c - a * a;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const p = 1 / d, m = (c * l - a * h) * p, x = (o * h - a * l) * p;
    return s.set(1 - m - x, x, m);
  }
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, Qt) === null ? !1 : Qt.x >= 0 && Qt.y >= 0 && Qt.x + Qt.y <= 1;
  }
  static getInterpolation(e, t, n, r, s, o, a, l) {
    return this.getBarycoord(e, t, n, r, Qt) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, Qt.x), l.addScaledVector(o, Qt.y), l.addScaledVector(a, Qt.z), l);
  }
  static getInterpolatedAttribute(e, t, n, r, s, o) {
    return zr.setScalar(0), Hr.setScalar(0), Vr.setScalar(0), zr.fromBufferAttribute(e, t), Hr.fromBufferAttribute(e, n), Vr.fromBufferAttribute(e, r), o.setScalar(0), o.addScaledVector(zr, s.x), o.addScaledVector(Hr, s.y), o.addScaledVector(Vr, s.z), o;
  }
  static isFrontFacing(e, t, n, r) {
    return Ot.subVectors(n, t), Jt.subVectors(e, t), Ot.cross(Jt).dot(r) < 0;
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
    return Ot.subVectors(this.c, this.b), Jt.subVectors(this.a, this.b), Ot.cross(Jt).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Bt.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Bt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, r, s) {
    return Bt.getInterpolation(e, this.a, this.b, this.c, t, n, r, s);
  }
  containsPoint(e) {
    return Bt.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Bt.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, s = this.c;
    let o, a;
    Zn.subVectors(r, n), $n.subVectors(s, n), Or.subVectors(e, n);
    const l = Zn.dot(Or), c = $n.dot(Or);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    Br.subVectors(e, r);
    const h = Zn.dot(Br), d = $n.dot(Br);
    if (h >= 0 && d <= h)
      return t.copy(r);
    const p = l * d - h * c;
    if (p <= 0 && l >= 0 && h <= 0)
      return o = l / (l - h), t.copy(n).addScaledVector(Zn, o);
    kr.subVectors(e, s);
    const m = Zn.dot(kr), x = $n.dot(kr);
    if (x >= 0 && m <= x)
      return t.copy(s);
    const g = m * c - l * x;
    if (g <= 0 && c >= 0 && x <= 0)
      return a = c / (c - x), t.copy(n).addScaledVector($n, a);
    const f = h * x - m * d;
    if (f <= 0 && d - h >= 0 && m - x >= 0)
      return Ua.subVectors(s, r), a = (d - h) / (d - h + (m - x)), t.copy(r).addScaledVector(Ua, a);
    const u = 1 / (f + g + p);
    return o = g * u, a = p * u, t.copy(n).addScaledVector(Zn, o).addScaledVector($n, a);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const Vo = {
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
}, _n = { h: 0, s: 0, l: 0 }, Gi = { h: 0, s: 0, l: 0 };
function Gr(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class qe {
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
  setHex(e, t = Lt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Ve.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, r = Ve.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, Ve.toWorkingColorSpace(this, r), this;
  }
  setHSL(e, t, n, r = Ve.workingColorSpace) {
    if (e = Cc(e, 1), t = vt(t, 0, 1), n = vt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, o = 2 * n - s;
      this.r = Gr(o, s, e + 1 / 3), this.g = Gr(o, s, e), this.b = Gr(o, s, e - 1 / 3);
    }
    return Ve.toWorkingColorSpace(this, r), this;
  }
  setStyle(e, t = Lt) {
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
  setColorName(e, t = Lt) {
    const n = Vo[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = an(e.r), this.g = an(e.g), this.b = an(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = li(e.r), this.g = li(e.g), this.b = li(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = Lt) {
    return Ve.fromWorkingColorSpace(mt.copy(this), e), Math.round(vt(mt.r * 255, 0, 255)) * 65536 + Math.round(vt(mt.g * 255, 0, 255)) * 256 + Math.round(vt(mt.b * 255, 0, 255));
  }
  getHexString(e = Lt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = Ve.workingColorSpace) {
    Ve.fromWorkingColorSpace(mt.copy(this), t);
    const n = mt.r, r = mt.g, s = mt.b, o = Math.max(n, r, s), a = Math.min(n, r, s);
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
  getRGB(e, t = Ve.workingColorSpace) {
    return Ve.fromWorkingColorSpace(mt.copy(this), t), e.r = mt.r, e.g = mt.g, e.b = mt.b, e;
  }
  getStyle(e = Lt) {
    Ve.fromWorkingColorSpace(mt.copy(this), e);
    const t = mt.r, n = mt.g, r = mt.b;
    return e !== Lt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(_n), this.setHSL(_n.h + e, _n.s + t, _n.l + n);
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
    this.getHSL(_n), e.getHSL(Gi);
    const n = Ar(_n.h, Gi.h, t), r = Ar(_n.s, Gi.s, t), s = Ar(_n.l, Gi.l, t);
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
const mt = /* @__PURE__ */ new qe();
qe.NAMES = Vo;
let qc = 0;
class Li extends zn {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(e) {
  }
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: qc++ }), this.uuid = Ci(), this.name = "", this.blending = ai, this.side = En, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = rs, this.blendDst = ss, this.blendEquation = In, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new qe(0, 0, 0), this.blendAlpha = 0, this.depthFunc = ci, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = ga, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Vn, this.stencilZFail = Vn, this.stencilZPass = Vn, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== ai && (n.blending = this.blending), this.side !== En && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== rs && (n.blendSrc = this.blendSrc), this.blendDst !== ss && (n.blendDst = this.blendDst), this.blendEquation !== In && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== ci && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== ga && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Vn && (n.stencilFail = this.stencilFail), this.stencilZFail !== Vn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Vn && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
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
class Go extends Li {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.color = new qe(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new cn(), this.combine = To, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const ot = /* @__PURE__ */ new U(), Wi = /* @__PURE__ */ new Ie();
class Yt {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = va, this.updateRanges = [], this.gpuType = rn, this.version = 0;
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
        Wi.fromBufferAttribute(this, t), Wi.applyMatrix3(e), this.setXY(t, Wi.x, Wi.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        ot.fromBufferAttribute(this, t), ot.applyMatrix3(e), this.setXYZ(t, ot.x, ot.y, ot.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ot.fromBufferAttribute(this, t), ot.applyMatrix4(e), this.setXYZ(t, ot.x, ot.y, ot.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ot.fromBufferAttribute(this, t), ot.applyNormalMatrix(e), this.setXYZ(t, ot.x, ot.y, ot.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ot.fromBufferAttribute(this, t), ot.transformDirection(e), this.setXYZ(t, ot.x, ot.y, ot.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = xi(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = Mt(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = xi(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = xi(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = xi(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = xi(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = Mt(t, this.array), n = Mt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = Mt(t, this.array), n = Mt(n, this.array), r = Mt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, s) {
    return e *= this.itemSize, this.normalized && (t = Mt(t, this.array), n = Mt(n, this.array), r = Mt(r, this.array), s = Mt(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = s, this;
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
    return this.name !== "" && (e.name = this.name), this.usage !== va && (e.usage = this.usage), e;
  }
}
class Wo extends Yt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Xo extends Yt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class on extends Yt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let jc = 0;
const Pt = /* @__PURE__ */ new at(), Wr = /* @__PURE__ */ new bt(), Jn = /* @__PURE__ */ new U(), wt = /* @__PURE__ */ new Pi(), yi = /* @__PURE__ */ new Pi(), ut = /* @__PURE__ */ new U();
class _t extends zn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: jc++ }), this.uuid = Ci(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Bo(e) ? Xo : Wo)(e, 1) : this.index = e, this;
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
      const s = new Pe().getNormalMatrix(e);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return Pt.makeRotationFromQuaternion(e), this.applyMatrix4(Pt), this;
  }
  rotateX(e) {
    return Pt.makeRotationX(e), this.applyMatrix4(Pt), this;
  }
  rotateY(e) {
    return Pt.makeRotationY(e), this.applyMatrix4(Pt), this;
  }
  rotateZ(e) {
    return Pt.makeRotationZ(e), this.applyMatrix4(Pt), this;
  }
  translate(e, t, n) {
    return Pt.makeTranslation(e, t, n), this.applyMatrix4(Pt), this;
  }
  scale(e, t, n) {
    return Pt.makeScale(e, t, n), this.applyMatrix4(Pt), this;
  }
  lookAt(e) {
    return Wr.lookAt(e), Wr.updateMatrix(), this.applyMatrix4(Wr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Jn).negate(), this.translate(Jn.x, Jn.y, Jn.z), this;
  }
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const o = e[r];
        n.push(o.x, o.y, o.z || 0);
      }
      this.setAttribute("position", new on(n, 3));
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
    this.boundingBox === null && (this.boundingBox = new Pi());
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
          wt.setFromBufferAttribute(s), this.morphTargetsRelative ? (ut.addVectors(this.boundingBox.min, wt.min), this.boundingBox.expandByPoint(ut), ut.addVectors(this.boundingBox.max, wt.max), this.boundingBox.expandByPoint(ut)) : (this.boundingBox.expandByPoint(wt.min), this.boundingBox.expandByPoint(wt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Sr());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new U(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (wt.setFromBufferAttribute(e), t)
        for (let s = 0, o = t.length; s < o; s++) {
          const a = t[s];
          yi.setFromBufferAttribute(a), this.morphTargetsRelative ? (ut.addVectors(wt.min, yi.min), wt.expandByPoint(ut), ut.addVectors(wt.max, yi.max), wt.expandByPoint(ut)) : (wt.expandByPoint(yi.min), wt.expandByPoint(yi.max));
        }
      wt.getCenter(n);
      let r = 0;
      for (let s = 0, o = e.count; s < o; s++)
        ut.fromBufferAttribute(e, s), r = Math.max(r, n.distanceToSquared(ut));
      if (t)
        for (let s = 0, o = t.length; s < o; s++) {
          const a = t[s], l = this.morphTargetsRelative;
          for (let c = 0, h = a.count; c < h; c++)
            ut.fromBufferAttribute(a, c), l && (Jn.fromBufferAttribute(e, c), ut.add(Jn)), r = Math.max(r, n.distanceToSquared(ut));
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
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Yt(new Float32Array(4 * n.count), 4));
    const o = this.getAttribute("tangent"), a = [], l = [];
    for (let R = 0; R < n.count; R++)
      a[R] = new U(), l[R] = new U();
    const c = new U(), h = new U(), d = new U(), p = new Ie(), m = new Ie(), x = new Ie(), g = new U(), f = new U();
    function u(R, S, v) {
      c.fromBufferAttribute(n, R), h.fromBufferAttribute(n, S), d.fromBufferAttribute(n, v), p.fromBufferAttribute(s, R), m.fromBufferAttribute(s, S), x.fromBufferAttribute(s, v), h.sub(c), d.sub(c), m.sub(p), x.sub(p);
      const w = 1 / (m.x * x.y - x.x * m.y);
      isFinite(w) && (g.copy(h).multiplyScalar(x.y).addScaledVector(d, -m.y).multiplyScalar(w), f.copy(d).multiplyScalar(m.x).addScaledVector(h, -x.x).multiplyScalar(w), a[R].add(g), a[S].add(g), a[v].add(g), l[R].add(f), l[S].add(f), l[v].add(f));
    }
    let C = this.groups;
    C.length === 0 && (C = [{
      start: 0,
      count: e.count
    }]);
    for (let R = 0, S = C.length; R < S; ++R) {
      const v = C[R], w = v.start, N = v.count;
      for (let B = w, W = w + N; B < W; B += 3)
        u(
          e.getX(B + 0),
          e.getX(B + 1),
          e.getX(B + 2)
        );
    }
    const A = new U(), y = new U(), F = new U(), T = new U();
    function E(R) {
      F.fromBufferAttribute(r, R), T.copy(F);
      const S = a[R];
      A.copy(S), A.sub(F.multiplyScalar(F.dot(S))).normalize(), y.crossVectors(T, S);
      const w = y.dot(l[R]) < 0 ? -1 : 1;
      o.setXYZW(R, A.x, A.y, A.z, w);
    }
    for (let R = 0, S = C.length; R < S; ++R) {
      const v = C[R], w = v.start, N = v.count;
      for (let B = w, W = w + N; B < W; B += 3)
        E(e.getX(B + 0)), E(e.getX(B + 1)), E(e.getX(B + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Yt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let p = 0, m = n.count; p < m; p++)
          n.setXYZ(p, 0, 0, 0);
      const r = new U(), s = new U(), o = new U(), a = new U(), l = new U(), c = new U(), h = new U(), d = new U();
      if (e)
        for (let p = 0, m = e.count; p < m; p += 3) {
          const x = e.getX(p + 0), g = e.getX(p + 1), f = e.getX(p + 2);
          r.fromBufferAttribute(t, x), s.fromBufferAttribute(t, g), o.fromBufferAttribute(t, f), h.subVectors(o, s), d.subVectors(r, s), h.cross(d), a.fromBufferAttribute(n, x), l.fromBufferAttribute(n, g), c.fromBufferAttribute(n, f), a.add(h), l.add(h), c.add(h), n.setXYZ(x, a.x, a.y, a.z), n.setXYZ(g, l.x, l.y, l.z), n.setXYZ(f, c.x, c.y, c.z);
        }
      else
        for (let p = 0, m = t.count; p < m; p += 3)
          r.fromBufferAttribute(t, p + 0), s.fromBufferAttribute(t, p + 1), o.fromBufferAttribute(t, p + 2), h.subVectors(o, s), d.subVectors(r, s), h.cross(d), n.setXYZ(p + 0, h.x, h.y, h.z), n.setXYZ(p + 1, h.x, h.y, h.z), n.setXYZ(p + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      ut.fromBufferAttribute(e, t), ut.normalize(), e.setXYZ(t, ut.x, ut.y, ut.z);
  }
  toNonIndexed() {
    function e(a, l) {
      const c = a.array, h = a.itemSize, d = a.normalized, p = new c.constructor(l.length * h);
      let m = 0, x = 0;
      for (let g = 0, f = l.length; g < f; g++) {
        a.isInterleavedBufferAttribute ? m = l[g] * a.data.stride + a.offset : m = l[g] * h;
        for (let u = 0; u < h; u++)
          p[x++] = c[m++];
      }
      return new Yt(p, h, d);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new _t(), n = this.index.array, r = this.attributes;
    for (const a in r) {
      const l = r[a], c = e(l, n);
      t.setAttribute(a, c);
    }
    const s = this.morphAttributes;
    for (const a in s) {
      const l = [], c = s[a];
      for (let h = 0, d = c.length; h < d; h++) {
        const p = c[h], m = e(p, n);
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
      for (let d = 0, p = c.length; d < p; d++) {
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
      for (let p = 0, m = d.length; p < m; p++)
        h.push(d[p].clone(t));
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
const Na = /* @__PURE__ */ new at(), Rn = /* @__PURE__ */ new Qs(), Xi = /* @__PURE__ */ new Sr(), Fa = /* @__PURE__ */ new U(), Yi = /* @__PURE__ */ new U(), qi = /* @__PURE__ */ new U(), ji = /* @__PURE__ */ new U(), Xr = /* @__PURE__ */ new U(), Ki = /* @__PURE__ */ new U(), Oa = /* @__PURE__ */ new U(), Zi = /* @__PURE__ */ new U();
class Xt extends bt {
  constructor(e = new _t(), t = new Go()) {
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
      Ki.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const h = a[l], d = s[l];
        h !== 0 && (Xr.fromBufferAttribute(d, e), o ? Ki.addScaledVector(Xr, h) : Ki.addScaledVector(Xr.sub(t), h));
      }
      t.add(Ki);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Xi.copy(n.boundingSphere), Xi.applyMatrix4(s), Rn.copy(e.ray).recast(e.near), !(Xi.containsPoint(Rn.origin) === !1 && (Rn.intersectSphere(Xi, Fa) === null || Rn.origin.distanceToSquared(Fa) > (e.far - e.near) ** 2)) && (Na.copy(s).invert(), Rn.copy(e.ray).applyMatrix4(Na), !(n.boundingBox !== null && Rn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, Rn)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const s = this.geometry, o = this.material, a = s.index, l = s.attributes.position, c = s.attributes.uv, h = s.attributes.uv1, d = s.attributes.normal, p = s.groups, m = s.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let x = 0, g = p.length; x < g; x++) {
          const f = p[x], u = o[f.materialIndex], C = Math.max(f.start, m.start), A = Math.min(a.count, Math.min(f.start + f.count, m.start + m.count));
          for (let y = C, F = A; y < F; y += 3) {
            const T = a.getX(y), E = a.getX(y + 1), R = a.getX(y + 2);
            r = $i(this, u, e, n, c, h, d, T, E, R), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = f.materialIndex, t.push(r));
          }
        }
      else {
        const x = Math.max(0, m.start), g = Math.min(a.count, m.start + m.count);
        for (let f = x, u = g; f < u; f += 3) {
          const C = a.getX(f), A = a.getX(f + 1), y = a.getX(f + 2);
          r = $i(this, o, e, n, c, h, d, C, A, y), r && (r.faceIndex = Math.floor(f / 3), t.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let x = 0, g = p.length; x < g; x++) {
          const f = p[x], u = o[f.materialIndex], C = Math.max(f.start, m.start), A = Math.min(l.count, Math.min(f.start + f.count, m.start + m.count));
          for (let y = C, F = A; y < F; y += 3) {
            const T = y, E = y + 1, R = y + 2;
            r = $i(this, u, e, n, c, h, d, T, E, R), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = f.materialIndex, t.push(r));
          }
        }
      else {
        const x = Math.max(0, m.start), g = Math.min(l.count, m.start + m.count);
        for (let f = x, u = g; f < u; f += 3) {
          const C = f, A = f + 1, y = f + 2;
          r = $i(this, o, e, n, c, h, d, C, A, y), r && (r.faceIndex = Math.floor(f / 3), t.push(r));
        }
      }
  }
}
function Kc(i, e, t, n, r, s, o, a) {
  let l;
  if (e.side === Et ? l = n.intersectTriangle(o, s, r, !0, a) : l = n.intersectTriangle(r, s, o, e.side === En, a), l === null) return null;
  Zi.copy(a), Zi.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(Zi);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: Zi.clone(),
    object: i
  };
}
function $i(i, e, t, n, r, s, o, a, l, c) {
  i.getVertexPosition(a, Yi), i.getVertexPosition(l, qi), i.getVertexPosition(c, ji);
  const h = Kc(i, e, t, n, Yi, qi, ji, Oa);
  if (h) {
    const d = new U();
    Bt.getBarycoord(Oa, Yi, qi, ji, d), r && (h.uv = Bt.getInterpolatedAttribute(r, a, l, c, d, new Ie())), s && (h.uv1 = Bt.getInterpolatedAttribute(s, a, l, c, d, new Ie())), o && (h.normal = Bt.getInterpolatedAttribute(o, a, l, c, d, new U()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const p = {
      a,
      b: l,
      c,
      normal: new U(),
      materialIndex: 0
    };
    Bt.getNormal(Yi, qi, ji, p.normal), h.face = p, h.barycoord = d;
  }
  return h;
}
class Di extends _t {
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
    let p = 0, m = 0;
    x("z", "y", "x", -1, -1, n, t, e, o, s, 0), x("z", "y", "x", 1, -1, n, t, -e, o, s, 1), x("x", "z", "y", 1, 1, e, n, t, r, o, 2), x("x", "z", "y", 1, -1, e, n, -t, r, o, 3), x("x", "y", "z", 1, -1, e, t, n, r, s, 4), x("x", "y", "z", -1, -1, e, t, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new on(c, 3)), this.setAttribute("normal", new on(h, 3)), this.setAttribute("uv", new on(d, 2));
    function x(g, f, u, C, A, y, F, T, E, R, S) {
      const v = y / E, w = F / R, N = y / 2, B = F / 2, W = T / 2, K = E + 1, G = R + 1;
      let $ = 0, H = 0;
      const te = new U();
      for (let ie = 0; ie < G; ie++) {
        const fe = ie * w - B;
        for (let Ae = 0; Ae < K; Ae++) {
          const We = Ae * v - N;
          te[g] = We * C, te[f] = fe * A, te[u] = W, c.push(te.x, te.y, te.z), te[g] = 0, te[f] = 0, te[u] = T > 0 ? 1 : -1, h.push(te.x, te.y, te.z), d.push(Ae / E), d.push(1 - ie / R), $ += 1;
        }
      }
      for (let ie = 0; ie < R; ie++)
        for (let fe = 0; fe < E; fe++) {
          const Ae = p + fe + K * ie, We = p + fe + K * (ie + 1), Y = p + (fe + 1) + K * (ie + 1), ee = p + (fe + 1) + K * ie;
          l.push(Ae, We, ee), l.push(We, Y, ee), H += 6;
        }
      a.addGroup(m, H, S), m += H, p += $;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Di(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function pi(i) {
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
function gt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = pi(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function Zc(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function Yo(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Ve.workingColorSpace;
}
const $c = { clone: pi, merge: gt };
var Jc = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Qc = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class yn extends Li {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Jc, this.fragmentShader = Qc, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
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
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = pi(e.uniforms), this.uniformsGroups = Zc(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
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
class qo extends bt {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new at(), this.projectionMatrix = new at(), this.projectionMatrixInverse = new at(), this.coordinateSystem = sn;
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
const gn = /* @__PURE__ */ new U(), Ba = /* @__PURE__ */ new Ie(), ka = /* @__PURE__ */ new Ie();
class Dt extends qo {
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
    this.fov = Gs * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(dr * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Gs * 2 * Math.atan(
      Math.tan(dr * 0.5 * this.fov) / this.zoom
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
    gn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(gn.x, gn.y).multiplyScalar(-e / gn.z), gn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(gn.x, gn.y).multiplyScalar(-e / gn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, Ba, ka), t.subVectors(ka, Ba);
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
    let t = e * Math.tan(dr * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, s = -0.5 * r;
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
const Qn = -90, ei = 1;
class eh extends bt {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Dt(Qn, ei, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Dt(Qn, ei, e, t);
    s.layers = this.layers, this.add(s);
    const o = new Dt(Qn, ei, e, t);
    o.layers = this.layers, this.add(o);
    const a = new Dt(Qn, ei, e, t);
    a.layers = this.layers, this.add(a);
    const l = new Dt(Qn, ei, e, t);
    l.layers = this.layers, this.add(l);
    const c = new Dt(Qn, ei, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, s, o, a, l] = t;
    for (const c of t) this.remove(c);
    if (e === sn)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === mr)
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
    const [s, o, a, l, c, h] = this.children, d = e.getRenderTarget(), p = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), x = e.xr.enabled;
    e.xr.enabled = !1;
    const g = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, r), e.render(t, s), e.setRenderTarget(n, 1, r), e.render(t, o), e.setRenderTarget(n, 2, r), e.render(t, a), e.setRenderTarget(n, 3, r), e.render(t, l), e.setRenderTarget(n, 4, r), e.render(t, c), n.texture.generateMipmaps = g, e.setRenderTarget(n, 5, r), e.render(t, h), e.setRenderTarget(d, p, m), e.xr.enabled = x, n.texture.needsPMREMUpdate = !0;
  }
}
class jo extends yt {
  constructor(e, t, n, r, s, o, a, l, c, h) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : hi, super(e, t, n, r, s, o, a, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class th extends Bn {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new jo(r, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : Wt;
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
    }, r = new Di(5, 5, 5), s = new yn({
      name: "CubemapFromEquirect",
      uniforms: pi(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Et,
      blending: Mn
    });
    s.uniforms.tEquirect.value = t;
    const o = new Xt(r, s), a = t.minFilter;
    return t.minFilter === Fn && (t.minFilter = Wt), new eh(1, 10, this).update(e, o), t.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(e, t, n, r) {
    const s = e.getRenderTarget();
    for (let o = 0; o < 6; o++)
      e.setRenderTarget(this, o), e.clear(t, n, r);
    e.setRenderTarget(s);
  }
}
const Yr = /* @__PURE__ */ new U(), nh = /* @__PURE__ */ new U(), ih = /* @__PURE__ */ new Pe();
class vn {
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
    const r = Yr.subVectors(n, t).cross(nh.subVectors(e, t)).normalize();
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
    const n = e.delta(Yr), r = this.normal.dot(n);
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
    const n = t || ih.getNormalMatrix(e), r = this.coplanarPoint(Yr).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
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
const Cn = /* @__PURE__ */ new Sr(), Ji = /* @__PURE__ */ new U();
class Ko {
  constructor(e = new vn(), t = new vn(), n = new vn(), r = new vn(), s = new vn(), o = new vn()) {
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
  setFromProjectionMatrix(e, t = sn) {
    const n = this.planes, r = e.elements, s = r[0], o = r[1], a = r[2], l = r[3], c = r[4], h = r[5], d = r[6], p = r[7], m = r[8], x = r[9], g = r[10], f = r[11], u = r[12], C = r[13], A = r[14], y = r[15];
    if (n[0].setComponents(l - s, p - c, f - m, y - u).normalize(), n[1].setComponents(l + s, p + c, f + m, y + u).normalize(), n[2].setComponents(l + o, p + h, f + x, y + C).normalize(), n[3].setComponents(l - o, p - h, f - x, y - C).normalize(), n[4].setComponents(l - a, p - d, f - g, y - A).normalize(), t === sn)
      n[5].setComponents(l + a, p + d, f + g, y + A).normalize();
    else if (t === mr)
      n[5].setComponents(a, d, g, A).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), Cn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), Cn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(Cn);
  }
  intersectsSprite(e) {
    return Cn.center.set(0, 0, 0), Cn.radius = 0.7071067811865476, Cn.applyMatrix4(e.matrixWorld), this.intersectsSphere(Cn);
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
      if (Ji.x = r.normal.x > 0 ? e.max.x : e.min.x, Ji.y = r.normal.y > 0 ? e.max.y : e.min.y, Ji.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(Ji) < 0)
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
function Zo() {
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
function rh(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(a, l) {
    const c = a.array, h = a.usage, d = c.byteLength, p = i.createBuffer();
    i.bindBuffer(l, p), i.bufferData(l, c, h), a.onUploadCallback();
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
      buffer: p,
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
      let p = 0;
      for (let m = 1; m < d.length; m++) {
        const x = d[p], g = d[m];
        g.start <= x.start + x.count + 1 ? x.count = Math.max(
          x.count,
          g.start + g.count - x.start
        ) : (++p, d[p] = g);
      }
      d.length = p + 1;
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
class Er extends _t {
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const s = e / 2, o = t / 2, a = Math.floor(n), l = Math.floor(r), c = a + 1, h = l + 1, d = e / a, p = t / l, m = [], x = [], g = [], f = [];
    for (let u = 0; u < h; u++) {
      const C = u * p - o;
      for (let A = 0; A < c; A++) {
        const y = A * d - s;
        x.push(y, -C, 0), g.push(0, 0, 1), f.push(A / a), f.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++)
      for (let C = 0; C < a; C++) {
        const A = C + c * u, y = C + c * (u + 1), F = C + 1 + c * (u + 1), T = C + 1 + c * u;
        m.push(A, y, T), m.push(y, F, T);
      }
    this.setIndex(m), this.setAttribute("position", new on(x, 3)), this.setAttribute("normal", new on(g, 3)), this.setAttribute("uv", new on(f, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Er(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var sh = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, ah = `#ifdef USE_ALPHAHASH
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
#endif`, oh = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, lh = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, ch = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, hh = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, uh = `#ifdef USE_AOMAP
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
#endif`, dh = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, fh = `#ifdef USE_BATCHING
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
#endif`, ph = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, mh = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, _h = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, gh = `float G_BlinnPhong_Implicit( ) {
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
} // validated`, vh = `#ifdef USE_IRIDESCENCE
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
#endif`, xh = `#ifdef USE_BUMPMAP
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
#endif`, Mh = `#if NUM_CLIPPING_PLANES > 0
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
#endif`, Sh = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Eh = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, yh = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, bh = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Th = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Ah = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, wh = `#if defined( USE_COLOR_ALPHA )
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
#endif`, Rh = `#define PI 3.141592653589793
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
} // validated`, Ch = `#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`, Ph = `vec3 transformedNormal = objectNormal;
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
#endif`, Lh = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Dh = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Ih = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Uh = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Nh = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Fh = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Oh = `#ifdef USE_ENVMAP
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
#endif`, Bh = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, kh = `#ifdef USE_ENVMAP
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
#endif`, zh = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Hh = `#ifdef USE_ENVMAP
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
#endif`, Vh = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Gh = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Wh = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Xh = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Yh = `#ifdef USE_GRADIENTMAP
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
}`, qh = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, jh = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Kh = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Zh = `uniform bool receiveShadow;
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
#endif`, $h = `#ifdef USE_ENVMAP
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
#endif`, Jh = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Qh = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, eu = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, tu = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, nu = `PhysicalMaterial material;
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
#endif`, iu = `struct PhysicalMaterial {
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
}`, ru = `
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
#endif`, su = `#if defined( RE_IndirectDiffuse )
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
#endif`, au = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, ou = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, lu = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, cu = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, hu = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, uu = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, du = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, fu = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`, pu = `#if defined( USE_POINTS_UV )
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
#endif`, mu = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, _u = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, gu = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, vu = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, xu = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Mu = `#ifdef USE_MORPHTARGETS
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
#endif`, Su = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Eu = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`, yu = `#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`, bu = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Tu = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Au = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, wu = `#ifdef USE_NORMALMAP
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
#endif`, Ru = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Cu = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Pu = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Lu = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Du = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Iu = `vec3 packNormalToRGB( const in vec3 normal ) {
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
}`, Uu = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Nu = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Fu = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Ou = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Bu = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, ku = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, zu = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, Hu = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, Vu = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`, Gu = `float getShadowMask() {
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
}`, Wu = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Xu = `#ifdef USE_SKINNING
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
#endif`, Yu = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, qu = `#ifdef USE_SKINNING
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
#endif`, ju = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Ku = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Zu = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, $u = `#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`, Ju = `#ifdef USE_TRANSMISSION
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
#endif`, Qu = `#ifdef USE_TRANSMISSION
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
#endif`, ed = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, td = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, nd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, id = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const rd = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, sd = `uniform sampler2D t2D;
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
}`, ad = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, od = `#ifdef ENVMAP_TYPE_CUBE
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
}`, ld = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, cd = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, hd = `#include <common>
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
}`, ud = `#if DEPTH_PACKING == 3200
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
}`, fd = `#define DISTANCE
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
}`, pd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, md = `uniform sampler2D tEquirect;
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
}`, gd = `uniform vec3 diffuse;
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
}`, vd = `#include <common>
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
}`, xd = `uniform vec3 diffuse;
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
}`, yd = `#define MATCAP
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
}`, bd = `#define NORMAL
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
}`, Td = `#define NORMAL
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
}`, Ad = `#define PHONG
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
}`, wd = `#define PHONG
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
}`, Rd = `#define STANDARD
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
}`, Cd = `#define STANDARD
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
}`, Pd = `#define TOON
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
}`, Ld = `#define TOON
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
}`, Dd = `uniform float size;
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
}`, Id = `uniform vec3 diffuse;
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
}`, Ud = `#include <common>
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
}`, Nd = `uniform vec3 color;
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
}`, Fd = `uniform float rotation;
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
}`, Od = `uniform vec3 diffuse;
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
}`, De = {
  alphahash_fragment: sh,
  alphahash_pars_fragment: ah,
  alphamap_fragment: oh,
  alphamap_pars_fragment: lh,
  alphatest_fragment: ch,
  alphatest_pars_fragment: hh,
  aomap_fragment: uh,
  aomap_pars_fragment: dh,
  batching_pars_vertex: fh,
  batching_vertex: ph,
  begin_vertex: mh,
  beginnormal_vertex: _h,
  bsdfs: gh,
  iridescence_fragment: vh,
  bumpmap_pars_fragment: xh,
  clipping_planes_fragment: Mh,
  clipping_planes_pars_fragment: Sh,
  clipping_planes_pars_vertex: Eh,
  clipping_planes_vertex: yh,
  color_fragment: bh,
  color_pars_fragment: Th,
  color_pars_vertex: Ah,
  color_vertex: wh,
  common: Rh,
  cube_uv_reflection_fragment: Ch,
  defaultnormal_vertex: Ph,
  displacementmap_pars_vertex: Lh,
  displacementmap_vertex: Dh,
  emissivemap_fragment: Ih,
  emissivemap_pars_fragment: Uh,
  colorspace_fragment: Nh,
  colorspace_pars_fragment: Fh,
  envmap_fragment: Oh,
  envmap_common_pars_fragment: Bh,
  envmap_pars_fragment: kh,
  envmap_pars_vertex: zh,
  envmap_physical_pars_fragment: $h,
  envmap_vertex: Hh,
  fog_vertex: Vh,
  fog_pars_vertex: Gh,
  fog_fragment: Wh,
  fog_pars_fragment: Xh,
  gradientmap_pars_fragment: Yh,
  lightmap_pars_fragment: qh,
  lights_lambert_fragment: jh,
  lights_lambert_pars_fragment: Kh,
  lights_pars_begin: Zh,
  lights_toon_fragment: Jh,
  lights_toon_pars_fragment: Qh,
  lights_phong_fragment: eu,
  lights_phong_pars_fragment: tu,
  lights_physical_fragment: nu,
  lights_physical_pars_fragment: iu,
  lights_fragment_begin: ru,
  lights_fragment_maps: su,
  lights_fragment_end: au,
  logdepthbuf_fragment: ou,
  logdepthbuf_pars_fragment: lu,
  logdepthbuf_pars_vertex: cu,
  logdepthbuf_vertex: hu,
  map_fragment: uu,
  map_pars_fragment: du,
  map_particle_fragment: fu,
  map_particle_pars_fragment: pu,
  metalnessmap_fragment: mu,
  metalnessmap_pars_fragment: _u,
  morphinstance_vertex: gu,
  morphcolor_vertex: vu,
  morphnormal_vertex: xu,
  morphtarget_pars_vertex: Mu,
  morphtarget_vertex: Su,
  normal_fragment_begin: Eu,
  normal_fragment_maps: yu,
  normal_pars_fragment: bu,
  normal_pars_vertex: Tu,
  normal_vertex: Au,
  normalmap_pars_fragment: wu,
  clearcoat_normal_fragment_begin: Ru,
  clearcoat_normal_fragment_maps: Cu,
  clearcoat_pars_fragment: Pu,
  iridescence_pars_fragment: Lu,
  opaque_fragment: Du,
  packing: Iu,
  premultiplied_alpha_fragment: Uu,
  project_vertex: Nu,
  dithering_fragment: Fu,
  dithering_pars_fragment: Ou,
  roughnessmap_fragment: Bu,
  roughnessmap_pars_fragment: ku,
  shadowmap_pars_fragment: zu,
  shadowmap_pars_vertex: Hu,
  shadowmap_vertex: Vu,
  shadowmask_pars_fragment: Gu,
  skinbase_vertex: Wu,
  skinning_pars_vertex: Xu,
  skinning_vertex: Yu,
  skinnormal_vertex: qu,
  specularmap_fragment: ju,
  specularmap_pars_fragment: Ku,
  tonemapping_fragment: Zu,
  tonemapping_pars_fragment: $u,
  transmission_fragment: Ju,
  transmission_pars_fragment: Qu,
  uv_pars_fragment: ed,
  uv_pars_vertex: td,
  uv_vertex: nd,
  worldpos_vertex: id,
  background_vert: rd,
  background_frag: sd,
  backgroundCube_vert: ad,
  backgroundCube_frag: od,
  cube_vert: ld,
  cube_frag: cd,
  depth_vert: hd,
  depth_frag: ud,
  distanceRGBA_vert: dd,
  distanceRGBA_frag: fd,
  equirect_vert: pd,
  equirect_frag: md,
  linedashed_vert: _d,
  linedashed_frag: gd,
  meshbasic_vert: vd,
  meshbasic_frag: xd,
  meshlambert_vert: Md,
  meshlambert_frag: Sd,
  meshmatcap_vert: Ed,
  meshmatcap_frag: yd,
  meshnormal_vert: bd,
  meshnormal_frag: Td,
  meshphong_vert: Ad,
  meshphong_frag: wd,
  meshphysical_vert: Rd,
  meshphysical_frag: Cd,
  meshtoon_vert: Pd,
  meshtoon_frag: Ld,
  points_vert: Dd,
  points_frag: Id,
  shadow_vert: Ud,
  shadow_frag: Nd,
  sprite_vert: Fd,
  sprite_frag: Od
}, ne = {
  common: {
    diffuse: { value: /* @__PURE__ */ new qe(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Pe() },
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
    aoMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Pe() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Pe() },
    normalScale: { value: /* @__PURE__ */ new Ie(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Pe() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new qe(16777215) }
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
    diffuse: { value: /* @__PURE__ */ new qe(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Pe() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new qe(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ie(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaTest: { value: 0 }
  }
}, Gt = {
  basic: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.fog
    ]),
    vertexShader: De.meshbasic_vert,
    fragmentShader: De.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new qe(0) }
      }
    ]),
    vertexShader: De.meshlambert_vert,
    fragmentShader: De.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new qe(0) },
        specular: { value: /* @__PURE__ */ new qe(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: De.meshphong_vert,
    fragmentShader: De.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.roughnessmap,
      ne.metalnessmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new qe(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: De.meshphysical_vert,
    fragmentShader: De.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.gradientmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new qe(0) }
      }
    ]),
    vertexShader: De.meshtoon_vert,
    fragmentShader: De.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: De.meshmatcap_vert,
    fragmentShader: De.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ gt([
      ne.points,
      ne.fog
    ]),
    vertexShader: De.points_vert,
    fragmentShader: De.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: De.linedashed_vert,
    fragmentShader: De.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.displacementmap
    ]),
    vertexShader: De.depth_vert,
    fragmentShader: De.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: De.meshnormal_vert,
    fragmentShader: De.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ gt([
      ne.sprite,
      ne.fog
    ]),
    vertexShader: De.sprite_vert,
    fragmentShader: De.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Pe() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: De.background_vert,
    fragmentShader: De.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Pe() }
    },
    vertexShader: De.backgroundCube_vert,
    fragmentShader: De.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: De.cube_vert,
    fragmentShader: De.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: De.equirect_vert,
    fragmentShader: De.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ gt([
      ne.common,
      ne.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new U() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: De.distanceRGBA_vert,
    fragmentShader: De.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ gt([
      ne.lights,
      ne.fog,
      {
        color: { value: /* @__PURE__ */ new qe(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: De.shadow_vert,
    fragmentShader: De.shadow_frag
  }
};
Gt.physical = {
  uniforms: /* @__PURE__ */ gt([
    Gt.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Pe() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Pe() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Ie(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Pe() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Pe() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Pe() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new qe(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Pe() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Pe() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Pe() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Ie() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Pe() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new qe(0) },
      specularColor: { value: /* @__PURE__ */ new qe(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Pe() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Pe() },
      anisotropyVector: { value: /* @__PURE__ */ new Ie() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Pe() }
    }
  ]),
  vertexShader: De.meshphysical_vert,
  fragmentShader: De.meshphysical_frag
};
const Qi = { r: 0, b: 0, g: 0 }, Pn = /* @__PURE__ */ new cn(), Bd = /* @__PURE__ */ new at();
function kd(i, e, t, n, r, s, o) {
  const a = new qe(0);
  let l = s === !0 ? 0 : 1, c, h, d = null, p = 0, m = null;
  function x(C) {
    let A = C.isScene === !0 ? C.background : null;
    return A && A.isTexture && (A = (C.backgroundBlurriness > 0 ? t : e).get(A)), A;
  }
  function g(C) {
    let A = !1;
    const y = x(C);
    y === null ? u(a, l) : y && y.isColor && (u(y, 1), A = !0);
    const F = i.xr.getEnvironmentBlendMode();
    F === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : F === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || A) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function f(C, A) {
    const y = x(A);
    y && (y.isCubeTexture || y.mapping === xr) ? (h === void 0 && (h = new Xt(
      new Di(1, 1, 1),
      new yn({
        name: "BackgroundCubeMaterial",
        uniforms: pi(Gt.backgroundCube.uniforms),
        vertexShader: Gt.backgroundCube.vertexShader,
        fragmentShader: Gt.backgroundCube.fragmentShader,
        side: Et,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(F, T, E) {
      this.matrixWorld.copyPosition(E.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(h)), Pn.copy(A.backgroundRotation), Pn.x *= -1, Pn.y *= -1, Pn.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (Pn.y *= -1, Pn.z *= -1), h.material.uniforms.envMap.value = y, h.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = A.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(Bd.makeRotationFromEuler(Pn)), h.material.toneMapped = Ve.getTransfer(y.colorSpace) !== Ke, (d !== y || p !== y.version || m !== i.toneMapping) && (h.material.needsUpdate = !0, d = y, p = y.version, m = i.toneMapping), h.layers.enableAll(), C.unshift(h, h.geometry, h.material, 0, 0, null)) : y && y.isTexture && (c === void 0 && (c = new Xt(
      new Er(2, 2),
      new yn({
        name: "BackgroundMaterial",
        uniforms: pi(Gt.background.uniforms),
        vertexShader: Gt.background.vertexShader,
        fragmentShader: Gt.background.fragmentShader,
        side: En,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = y, c.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, c.material.toneMapped = Ve.getTransfer(y.colorSpace) !== Ke, y.matrixAutoUpdate === !0 && y.updateMatrix(), c.material.uniforms.uvTransform.value.copy(y.matrix), (d !== y || p !== y.version || m !== i.toneMapping) && (c.material.needsUpdate = !0, d = y, p = y.version, m = i.toneMapping), c.layers.enableAll(), C.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function u(C, A) {
    C.getRGB(Qi, Yo(i)), n.buffers.color.setClear(Qi.r, Qi.g, Qi.b, A, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(C, A = 1) {
      a.set(C), l = A, u(a, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(C) {
      l = C, u(a, l);
    },
    render: g,
    addToRenderList: f
  };
}
function zd(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = p(null);
  let s = r, o = !1;
  function a(v, w, N, B, W) {
    let K = !1;
    const G = d(B, N, w);
    s !== G && (s = G, c(s.object)), K = m(v, B, N, W), K && x(v, B, N, W), W !== null && e.update(W, i.ELEMENT_ARRAY_BUFFER), (K || o) && (o = !1, y(v, w, N, B), W !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(W).buffer));
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
  function d(v, w, N) {
    const B = N.wireframe === !0;
    let W = n[v.id];
    W === void 0 && (W = {}, n[v.id] = W);
    let K = W[w.id];
    K === void 0 && (K = {}, W[w.id] = K);
    let G = K[B];
    return G === void 0 && (G = p(l()), K[B] = G), G;
  }
  function p(v) {
    const w = [], N = [], B = [];
    for (let W = 0; W < t; W++)
      w[W] = 0, N[W] = 0, B[W] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: w,
      enabledAttributes: N,
      attributeDivisors: B,
      object: v,
      attributes: {},
      index: null
    };
  }
  function m(v, w, N, B) {
    const W = s.attributes, K = w.attributes;
    let G = 0;
    const $ = N.getAttributes();
    for (const H in $)
      if ($[H].location >= 0) {
        const ie = W[H];
        let fe = K[H];
        if (fe === void 0 && (H === "instanceMatrix" && v.instanceMatrix && (fe = v.instanceMatrix), H === "instanceColor" && v.instanceColor && (fe = v.instanceColor)), ie === void 0 || ie.attribute !== fe || fe && ie.data !== fe.data) return !0;
        G++;
      }
    return s.attributesNum !== G || s.index !== B;
  }
  function x(v, w, N, B) {
    const W = {}, K = w.attributes;
    let G = 0;
    const $ = N.getAttributes();
    for (const H in $)
      if ($[H].location >= 0) {
        let ie = K[H];
        ie === void 0 && (H === "instanceMatrix" && v.instanceMatrix && (ie = v.instanceMatrix), H === "instanceColor" && v.instanceColor && (ie = v.instanceColor));
        const fe = {};
        fe.attribute = ie, ie && ie.data && (fe.data = ie.data), W[H] = fe, G++;
      }
    s.attributes = W, s.attributesNum = G, s.index = B;
  }
  function g() {
    const v = s.newAttributes;
    for (let w = 0, N = v.length; w < N; w++)
      v[w] = 0;
  }
  function f(v) {
    u(v, 0);
  }
  function u(v, w) {
    const N = s.newAttributes, B = s.enabledAttributes, W = s.attributeDivisors;
    N[v] = 1, B[v] === 0 && (i.enableVertexAttribArray(v), B[v] = 1), W[v] !== w && (i.vertexAttribDivisor(v, w), W[v] = w);
  }
  function C() {
    const v = s.newAttributes, w = s.enabledAttributes;
    for (let N = 0, B = w.length; N < B; N++)
      w[N] !== v[N] && (i.disableVertexAttribArray(N), w[N] = 0);
  }
  function A(v, w, N, B, W, K, G) {
    G === !0 ? i.vertexAttribIPointer(v, w, N, W, K) : i.vertexAttribPointer(v, w, N, B, W, K);
  }
  function y(v, w, N, B) {
    g();
    const W = B.attributes, K = N.getAttributes(), G = w.defaultAttributeValues;
    for (const $ in K) {
      const H = K[$];
      if (H.location >= 0) {
        let te = W[$];
        if (te === void 0 && ($ === "instanceMatrix" && v.instanceMatrix && (te = v.instanceMatrix), $ === "instanceColor" && v.instanceColor && (te = v.instanceColor)), te !== void 0) {
          const ie = te.normalized, fe = te.itemSize, Ae = e.get(te);
          if (Ae === void 0) continue;
          const We = Ae.buffer, Y = Ae.type, ee = Ae.bytesPerElement, ge = Y === i.INT || Y === i.UNSIGNED_INT || te.gpuType === qs;
          if (te.isInterleavedBufferAttribute) {
            const se = te.data, ye = se.stride, we = te.offset;
            if (se.isInstancedInterleavedBuffer) {
              for (let Ue = 0; Ue < H.locationSize; Ue++)
                u(H.location + Ue, se.meshPerAttribute);
              v.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = se.meshPerAttribute * se.count);
            } else
              for (let Ue = 0; Ue < H.locationSize; Ue++)
                f(H.location + Ue);
            i.bindBuffer(i.ARRAY_BUFFER, We);
            for (let Ue = 0; Ue < H.locationSize; Ue++)
              A(
                H.location + Ue,
                fe / H.locationSize,
                Y,
                ie,
                ye * ee,
                (we + fe / H.locationSize * Ue) * ee,
                ge
              );
          } else {
            if (te.isInstancedBufferAttribute) {
              for (let se = 0; se < H.locationSize; se++)
                u(H.location + se, te.meshPerAttribute);
              v.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = te.meshPerAttribute * te.count);
            } else
              for (let se = 0; se < H.locationSize; se++)
                f(H.location + se);
            i.bindBuffer(i.ARRAY_BUFFER, We);
            for (let se = 0; se < H.locationSize; se++)
              A(
                H.location + se,
                fe / H.locationSize,
                Y,
                ie,
                fe * ee,
                fe / H.locationSize * se * ee,
                ge
              );
          }
        } else if (G !== void 0) {
          const ie = G[$];
          if (ie !== void 0)
            switch (ie.length) {
              case 2:
                i.vertexAttrib2fv(H.location, ie);
                break;
              case 3:
                i.vertexAttrib3fv(H.location, ie);
                break;
              case 4:
                i.vertexAttrib4fv(H.location, ie);
                break;
              default:
                i.vertexAttrib1fv(H.location, ie);
            }
        }
      }
    }
    C();
  }
  function F() {
    R();
    for (const v in n) {
      const w = n[v];
      for (const N in w) {
        const B = w[N];
        for (const W in B)
          h(B[W].object), delete B[W];
        delete w[N];
      }
      delete n[v];
    }
  }
  function T(v) {
    if (n[v.id] === void 0) return;
    const w = n[v.id];
    for (const N in w) {
      const B = w[N];
      for (const W in B)
        h(B[W].object), delete B[W];
      delete w[N];
    }
    delete n[v.id];
  }
  function E(v) {
    for (const w in n) {
      const N = n[w];
      if (N[v.id] === void 0) continue;
      const B = N[v.id];
      for (const W in B)
        h(B[W].object), delete B[W];
      delete N[v.id];
    }
  }
  function R() {
    S(), o = !0, s !== r && (s = r, c(s.object));
  }
  function S() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: a,
    reset: R,
    resetDefaultState: S,
    dispose: F,
    releaseStatesOfGeometry: T,
    releaseStatesOfProgram: E,
    initAttributes: g,
    enableAttribute: f,
    disableUnusedAttributes: C
  };
}
function Hd(i, e, t) {
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
  function l(c, h, d, p) {
    if (d === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let x = 0; x < c.length; x++)
        o(c[x], h[x], p[x]);
    else {
      m.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, p, 0, d);
      let x = 0;
      for (let g = 0; g < d; g++)
        x += h[g] * p[g];
      t.update(x, n, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = l;
}
function Vd(i, e, t, n) {
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
    return !(E !== kt && n.convert(E) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(E) {
    const R = E === Ri && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(E !== ln && n.convert(E) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    E !== rn && !R);
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
  const d = t.logarithmicDepthBuffer === !0, p = t.reverseDepthBuffer === !0 && e.has("EXT_clip_control"), m = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), x = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_TEXTURE_SIZE), f = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), u = i.getParameter(i.MAX_VERTEX_ATTRIBS), C = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), A = i.getParameter(i.MAX_VARYING_VECTORS), y = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), F = x > 0, T = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: c,
    logarithmicDepthBuffer: d,
    reverseDepthBuffer: p,
    maxTextures: m,
    maxVertexTextures: x,
    maxTextureSize: g,
    maxCubemapSize: f,
    maxAttributes: u,
    maxVertexUniforms: C,
    maxVaryings: A,
    maxFragmentUniforms: y,
    vertexTextures: F,
    maxSamples: T
  };
}
function Gd(i) {
  const e = this;
  let t = null, n = 0, r = !1, s = !1;
  const o = new vn(), a = new Pe(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, p) {
    const m = d.length !== 0 || p || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = p, n = d.length, m;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(d, p) {
    t = h(d, p, 0);
  }, this.setState = function(d, p, m) {
    const x = d.clippingPlanes, g = d.clipIntersection, f = d.clipShadows, u = i.get(d);
    if (!r || x === null || x.length === 0 || s && !f)
      s ? h(null) : c();
    else {
      const C = s ? 0 : n, A = C * 4;
      let y = u.clippingState || null;
      l.value = y, y = h(x, p, A, m);
      for (let F = 0; F !== A; ++F)
        y[F] = t[F];
      u.clippingState = y, this.numIntersection = g ? this.numPlanes : 0, this.numPlanes += C;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(d, p, m, x) {
    const g = d !== null ? d.length : 0;
    let f = null;
    if (g !== 0) {
      if (f = l.value, x !== !0 || f === null) {
        const u = m + g * 4, C = p.matrixWorldInverse;
        a.getNormalMatrix(C), (f === null || f.length < u) && (f = new Float32Array(u));
        for (let A = 0, y = m; A !== g; ++A, y += 4)
          o.copy(d[A]).applyMatrix4(C, a), o.normal.toArray(f, y), f[y + 3] = o.constant;
      }
      l.value = f, l.needsUpdate = !0;
    }
    return e.numPlanes = g, e.numIntersection = 0, f;
  }
}
function Wd(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(o, a) {
    return a === fs ? o.mapping = hi : a === ps && (o.mapping = ui), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === fs || a === ps)
        if (e.has(o)) {
          const l = e.get(o).texture;
          return t(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const c = new th(l.height);
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
class $o extends qo {
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
const ii = 4, za = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Un = 20, qr = /* @__PURE__ */ new $o(), Ha = /* @__PURE__ */ new qe();
let jr = null, Kr = 0, Zr = 0, $r = !1;
const Dn = (1 + Math.sqrt(5)) / 2, ti = 1 / Dn, Va = [
  /* @__PURE__ */ new U(-Dn, ti, 0),
  /* @__PURE__ */ new U(Dn, ti, 0),
  /* @__PURE__ */ new U(-ti, 0, Dn),
  /* @__PURE__ */ new U(ti, 0, Dn),
  /* @__PURE__ */ new U(0, Dn, -ti),
  /* @__PURE__ */ new U(0, Dn, ti),
  /* @__PURE__ */ new U(-1, 1, -1),
  /* @__PURE__ */ new U(1, 1, -1),
  /* @__PURE__ */ new U(-1, 1, 1),
  /* @__PURE__ */ new U(1, 1, 1)
];
class Ga {
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
    jr = this._renderer.getRenderTarget(), Kr = this._renderer.getActiveCubeFace(), Zr = this._renderer.getActiveMipmapLevel(), $r = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
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
    this._cubemapMaterial === null && (this._cubemapMaterial = Ya(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Xa(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(jr, Kr, Zr), this._renderer.xr.enabled = $r, e.scissorTest = !1, er(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === hi || e.mapping === ui ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), jr = this._renderer.getRenderTarget(), Kr = this._renderer.getActiveCubeFace(), Zr = this._renderer.getActiveMipmapLevel(), $r = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: Wt,
      minFilter: Wt,
      generateMipmaps: !1,
      type: Ri,
      format: kt,
      colorSpace: mi,
      depthBuffer: !1
    }, r = Wa(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Wa(e, t, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Xd(s)), this._blurMaterial = Yd(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Xt(this._lodPlanes[0], e);
    this._renderer.compile(t, qr);
  }
  _sceneToCubeUV(e, t, n, r) {
    const a = new Dt(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, d = h.autoClear, p = h.toneMapping;
    h.getClearColor(Ha), h.toneMapping = Sn, h.autoClear = !1;
    const m = new Go({
      name: "PMREM.Background",
      side: Et,
      depthWrite: !1,
      depthTest: !1
    }), x = new Xt(new Di(), m);
    let g = !1;
    const f = e.background;
    f ? f.isColor && (m.color.copy(f), e.background = null, g = !0) : (m.color.copy(Ha), g = !0);
    for (let u = 0; u < 6; u++) {
      const C = u % 3;
      C === 0 ? (a.up.set(0, l[u], 0), a.lookAt(c[u], 0, 0)) : C === 1 ? (a.up.set(0, 0, l[u]), a.lookAt(0, c[u], 0)) : (a.up.set(0, l[u], 0), a.lookAt(0, 0, c[u]));
      const A = this._cubeSize;
      er(r, C * A, u > 2 ? A : 0, A, A), h.setRenderTarget(r), g && h.render(x, a), h.render(e, a);
    }
    x.geometry.dispose(), x.material.dispose(), h.toneMapping = p, h.autoClear = d, e.background = f;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === hi || e.mapping === ui;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Ya()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Xa());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, o = new Xt(this._lodPlanes[0], s), a = s.uniforms;
    a.envMap.value = e;
    const l = this._cubeSize;
    er(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(o, qr);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const o = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), a = Va[(r - s - 1) % Va.length];
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
    const h = 3, d = new Xt(this._lodPlanes[r], c), p = c.uniforms, m = this._sizeLods[n] - 1, x = isFinite(s) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * Un - 1), g = s / x, f = isFinite(s) ? 1 + Math.floor(h * g) : Un;
    f > Un && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Un}`);
    const u = [];
    let C = 0;
    for (let E = 0; E < Un; ++E) {
      const R = E / g, S = Math.exp(-R * R / 2);
      u.push(S), E === 0 ? C += S : E < f && (C += 2 * S);
    }
    for (let E = 0; E < u.length; E++)
      u[E] = u[E] / C;
    p.envMap.value = e.texture, p.samples.value = f, p.weights.value = u, p.latitudinal.value = o === "latitudinal", a && (p.poleAxis.value = a);
    const { _lodMax: A } = this;
    p.dTheta.value = x, p.mipInt.value = A - n;
    const y = this._sizeLods[r], F = 3 * y * (r > A - ii ? r - A + ii : 0), T = 4 * (this._cubeSize - y);
    er(t, F, T, 3 * y, 2 * y), l.setRenderTarget(t), l.render(d, qr);
  }
}
function Xd(i) {
  const e = [], t = [], n = [];
  let r = i;
  const s = i - ii + 1 + za.length;
  for (let o = 0; o < s; o++) {
    const a = Math.pow(2, r);
    t.push(a);
    let l = 1 / a;
    o > i - ii ? l = za[o - i + ii - 1] : o === 0 && (l = 0), n.push(l);
    const c = 1 / (a - 2), h = -c, d = 1 + c, p = [h, h, d, h, d, d, h, h, d, d, h, d], m = 6, x = 6, g = 3, f = 2, u = 1, C = new Float32Array(g * x * m), A = new Float32Array(f * x * m), y = new Float32Array(u * x * m);
    for (let T = 0; T < m; T++) {
      const E = T % 3 * 2 / 3 - 1, R = T > 2 ? 0 : -1, S = [
        E,
        R,
        0,
        E + 2 / 3,
        R,
        0,
        E + 2 / 3,
        R + 1,
        0,
        E,
        R,
        0,
        E + 2 / 3,
        R + 1,
        0,
        E,
        R + 1,
        0
      ];
      C.set(S, g * x * T), A.set(p, f * x * T);
      const v = [T, T, T, T, T, T];
      y.set(v, u * x * T);
    }
    const F = new _t();
    F.setAttribute("position", new Yt(C, g)), F.setAttribute("uv", new Yt(A, f)), F.setAttribute("faceIndex", new Yt(y, u)), e.push(F), r > ii && r--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function Wa(i, e, t) {
  const n = new Bn(i, e, t);
  return n.texture.mapping = xr, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function er(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function Yd(i, e, t) {
  const n = new Float32Array(Un), r = new U(0, 1, 0);
  return new yn({
    name: "SphericalGaussianBlur",
    defines: {
      n: Un,
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
    vertexShader: ea(),
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
    blending: Mn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Xa() {
  return new yn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: ea(),
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
    blending: Mn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Ya() {
  return new yn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: ea(),
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
    blending: Mn,
    depthTest: !1,
    depthWrite: !1
  });
}
function ea() {
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
function qd(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(a) {
    if (a && a.isTexture) {
      const l = a.mapping, c = l === fs || l === ps, h = l === hi || l === ui;
      if (c || h) {
        let d = e.get(a);
        const p = d !== void 0 ? d.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== p)
          return t === null && (t = new Ga(i)), d = c ? t.fromEquirectangular(a, d) : t.fromCubemap(a, d), d.texture.pmremVersion = a.pmremVersion, e.set(a, d), d.texture;
        if (d !== void 0)
          return d.texture;
        {
          const m = a.image;
          return c && m && m.height > 0 || h && m && r(m) ? (t === null && (t = new Ga(i)), d = c ? t.fromEquirectangular(a) : t.fromCubemap(a), d.texture.pmremVersion = a.pmremVersion, e.set(a, d), a.addEventListener("dispose", s), d.texture) : null;
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
function jd(i) {
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
      return r === null && Ti("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function Kd(i, e, t, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function o(d) {
    const p = d.target;
    p.index !== null && e.remove(p.index);
    for (const x in p.attributes)
      e.remove(p.attributes[x]);
    for (const x in p.morphAttributes) {
      const g = p.morphAttributes[x];
      for (let f = 0, u = g.length; f < u; f++)
        e.remove(g[f]);
    }
    p.removeEventListener("dispose", o), delete r[p.id];
    const m = s.get(p);
    m && (e.remove(m), s.delete(p)), n.releaseStatesOfGeometry(p), p.isInstancedBufferGeometry === !0 && delete p._maxInstanceCount, t.memory.geometries--;
  }
  function a(d, p) {
    return r[p.id] === !0 || (p.addEventListener("dispose", o), r[p.id] = !0, t.memory.geometries++), p;
  }
  function l(d) {
    const p = d.attributes;
    for (const x in p)
      e.update(p[x], i.ARRAY_BUFFER);
    const m = d.morphAttributes;
    for (const x in m) {
      const g = m[x];
      for (let f = 0, u = g.length; f < u; f++)
        e.update(g[f], i.ARRAY_BUFFER);
    }
  }
  function c(d) {
    const p = [], m = d.index, x = d.attributes.position;
    let g = 0;
    if (m !== null) {
      const C = m.array;
      g = m.version;
      for (let A = 0, y = C.length; A < y; A += 3) {
        const F = C[A + 0], T = C[A + 1], E = C[A + 2];
        p.push(F, T, T, E, E, F);
      }
    } else if (x !== void 0) {
      const C = x.array;
      g = x.version;
      for (let A = 0, y = C.length / 3 - 1; A < y; A += 3) {
        const F = A + 0, T = A + 1, E = A + 2;
        p.push(F, T, T, E, E, F);
      }
    } else
      return;
    const f = new (Bo(p) ? Xo : Wo)(p, 1);
    f.version = g;
    const u = s.get(d);
    u && e.remove(u), s.set(d, f);
  }
  function h(d) {
    const p = s.get(d);
    if (p) {
      const m = d.index;
      m !== null && p.version < m.version && c(d);
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
function Zd(i, e, t) {
  let n;
  function r(p) {
    n = p;
  }
  let s, o;
  function a(p) {
    s = p.type, o = p.bytesPerElement;
  }
  function l(p, m) {
    i.drawElements(n, m, s, p * o), t.update(m, n, 1);
  }
  function c(p, m, x) {
    x !== 0 && (i.drawElementsInstanced(n, m, s, p * o, x), t.update(m, n, x));
  }
  function h(p, m, x) {
    if (x === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, m, 0, s, p, 0, x);
    let f = 0;
    for (let u = 0; u < x; u++)
      f += m[u];
    t.update(f, n, 1);
  }
  function d(p, m, x, g) {
    if (x === 0) return;
    const f = e.get("WEBGL_multi_draw");
    if (f === null)
      for (let u = 0; u < p.length; u++)
        c(p[u] / o, m[u], g[u]);
    else {
      f.multiDrawElementsInstancedWEBGL(n, m, 0, s, p, 0, g, 0, x);
      let u = 0;
      for (let C = 0; C < x; C++)
        u += m[C] * g[C];
      t.update(u, n, 1);
    }
  }
  this.setMode = r, this.setIndex = a, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = d;
}
function $d(i) {
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
function Jd(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), r = new st();
  function s(o, a, l) {
    const c = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, d = h !== void 0 ? h.length : 0;
    let p = n.get(a);
    if (p === void 0 || p.count !== d) {
      let S = function() {
        E.dispose(), n.delete(a), a.removeEventListener("dispose", S);
      };
      p !== void 0 && p.texture.dispose();
      const m = a.morphAttributes.position !== void 0, x = a.morphAttributes.normal !== void 0, g = a.morphAttributes.color !== void 0, f = a.morphAttributes.position || [], u = a.morphAttributes.normal || [], C = a.morphAttributes.color || [];
      let A = 0;
      m === !0 && (A = 1), x === !0 && (A = 2), g === !0 && (A = 3);
      let y = a.attributes.position.count * A, F = 1;
      y > e.maxTextureSize && (F = Math.ceil(y / e.maxTextureSize), y = e.maxTextureSize);
      const T = new Float32Array(y * F * 4 * d), E = new zo(T, y, F, d);
      E.type = rn, E.needsUpdate = !0;
      const R = A * 4;
      for (let v = 0; v < d; v++) {
        const w = f[v], N = u[v], B = C[v], W = y * F * 4 * v;
        for (let K = 0; K < w.count; K++) {
          const G = K * R;
          m === !0 && (r.fromBufferAttribute(w, K), T[W + G + 0] = r.x, T[W + G + 1] = r.y, T[W + G + 2] = r.z, T[W + G + 3] = 0), x === !0 && (r.fromBufferAttribute(N, K), T[W + G + 4] = r.x, T[W + G + 5] = r.y, T[W + G + 6] = r.z, T[W + G + 7] = 0), g === !0 && (r.fromBufferAttribute(B, K), T[W + G + 8] = r.x, T[W + G + 9] = r.y, T[W + G + 10] = r.z, T[W + G + 11] = B.itemSize === 4 ? r.w : 1);
        }
      }
      p = {
        count: d,
        texture: E,
        size: new Ie(y, F)
      }, n.set(a, p), a.addEventListener("dispose", S);
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
    l.getUniforms().setValue(i, "morphTargetsTexture", p.texture, t), l.getUniforms().setValue(i, "morphTargetsTextureSize", p.size);
  }
  return {
    update: s
  };
}
function Qd(i, e, t, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const c = n.render.frame, h = l.geometry, d = e.get(l, h);
    if (r.get(d) !== c && (e.update(d), r.set(d, c)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), r.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const p = l.skeleton;
      r.get(p) !== c && (p.update(), r.set(p, c));
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
class Jo extends yt {
  constructor(e, t, n, r, s, o, a, l, c, h = oi) {
    if (h !== oi && h !== fi)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === oi && (n = On), n === void 0 && h === fi && (n = di), super(null, r, s, o, a, l, h, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = a !== void 0 ? a : zt, this.minFilter = l !== void 0 ? l : zt, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const Qo = /* @__PURE__ */ new yt(), qa = /* @__PURE__ */ new Jo(1, 1), el = /* @__PURE__ */ new zo(), tl = /* @__PURE__ */ new kc(), nl = /* @__PURE__ */ new jo(), ja = [], Ka = [], Za = new Float32Array(16), $a = new Float32Array(9), Ja = new Float32Array(4);
function _i(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let s = ja[r];
  if (s === void 0 && (s = new Float32Array(r), ja[r] = s), e !== 0) {
    n.toArray(s, 0);
    for (let o = 1, a = 0; o !== e; ++o)
      a += t, i[o].toArray(s, a);
  }
  return s;
}
function ct(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function ht(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function yr(i, e) {
  let t = Ka[e];
  t === void 0 && (t = new Int32Array(e), Ka[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function ef(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function tf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ct(t, e)) return;
    i.uniform2fv(this.addr, e), ht(t, e);
  }
}
function nf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (ct(t, e)) return;
    i.uniform3fv(this.addr, e), ht(t, e);
  }
}
function rf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ct(t, e)) return;
    i.uniform4fv(this.addr, e), ht(t, e);
  }
}
function sf(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ct(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), ht(t, e);
  } else {
    if (ct(t, n)) return;
    Ja.set(n), i.uniformMatrix2fv(this.addr, !1, Ja), ht(t, n);
  }
}
function af(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ct(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), ht(t, e);
  } else {
    if (ct(t, n)) return;
    $a.set(n), i.uniformMatrix3fv(this.addr, !1, $a), ht(t, n);
  }
}
function of(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ct(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), ht(t, e);
  } else {
    if (ct(t, n)) return;
    Za.set(n), i.uniformMatrix4fv(this.addr, !1, Za), ht(t, n);
  }
}
function lf(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function cf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ct(t, e)) return;
    i.uniform2iv(this.addr, e), ht(t, e);
  }
}
function hf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (ct(t, e)) return;
    i.uniform3iv(this.addr, e), ht(t, e);
  }
}
function uf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ct(t, e)) return;
    i.uniform4iv(this.addr, e), ht(t, e);
  }
}
function df(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function ff(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ct(t, e)) return;
    i.uniform2uiv(this.addr, e), ht(t, e);
  }
}
function pf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (ct(t, e)) return;
    i.uniform3uiv(this.addr, e), ht(t, e);
  }
}
function mf(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ct(t, e)) return;
    i.uniform4uiv(this.addr, e), ht(t, e);
  }
}
function _f(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (qa.compareFunction = Oo, s = qa) : s = Qo, t.setTexture2D(e || s, r);
}
function gf(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || tl, r);
}
function vf(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || nl, r);
}
function xf(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || el, r);
}
function Mf(i) {
  switch (i) {
    case 5126:
      return ef;
    // FLOAT
    case 35664:
      return tf;
    // _VEC2
    case 35665:
      return nf;
    // _VEC3
    case 35666:
      return rf;
    // _VEC4
    case 35674:
      return sf;
    // _MAT2
    case 35675:
      return af;
    // _MAT3
    case 35676:
      return of;
    // _MAT4
    case 5124:
    case 35670:
      return lf;
    // INT, BOOL
    case 35667:
    case 35671:
      return cf;
    // _VEC2
    case 35668:
    case 35672:
      return hf;
    // _VEC3
    case 35669:
    case 35673:
      return uf;
    // _VEC4
    case 5125:
      return df;
    // UINT
    case 36294:
      return ff;
    // _VEC2
    case 36295:
      return pf;
    // _VEC3
    case 36296:
      return mf;
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
      return _f;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return gf;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return vf;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return xf;
  }
}
function Sf(i, e) {
  i.uniform1fv(this.addr, e);
}
function Ef(i, e) {
  const t = _i(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function yf(i, e) {
  const t = _i(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function bf(i, e) {
  const t = _i(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function Tf(i, e) {
  const t = _i(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Af(i, e) {
  const t = _i(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function wf(i, e) {
  const t = _i(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Rf(i, e) {
  i.uniform1iv(this.addr, e);
}
function Cf(i, e) {
  i.uniform2iv(this.addr, e);
}
function Pf(i, e) {
  i.uniform3iv(this.addr, e);
}
function Lf(i, e) {
  i.uniform4iv(this.addr, e);
}
function Df(i, e) {
  i.uniform1uiv(this.addr, e);
}
function If(i, e) {
  i.uniform2uiv(this.addr, e);
}
function Uf(i, e) {
  i.uniform3uiv(this.addr, e);
}
function Nf(i, e) {
  i.uniform4uiv(this.addr, e);
}
function Ff(i, e, t) {
  const n = this.cache, r = e.length, s = yr(t, r);
  ct(n, s) || (i.uniform1iv(this.addr, s), ht(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture2D(e[o] || Qo, s[o]);
}
function Of(i, e, t) {
  const n = this.cache, r = e.length, s = yr(t, r);
  ct(n, s) || (i.uniform1iv(this.addr, s), ht(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture3D(e[o] || tl, s[o]);
}
function Bf(i, e, t) {
  const n = this.cache, r = e.length, s = yr(t, r);
  ct(n, s) || (i.uniform1iv(this.addr, s), ht(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTextureCube(e[o] || nl, s[o]);
}
function kf(i, e, t) {
  const n = this.cache, r = e.length, s = yr(t, r);
  ct(n, s) || (i.uniform1iv(this.addr, s), ht(n, s));
  for (let o = 0; o !== r; ++o)
    t.setTexture2DArray(e[o] || el, s[o]);
}
function zf(i) {
  switch (i) {
    case 5126:
      return Sf;
    // FLOAT
    case 35664:
      return Ef;
    // _VEC2
    case 35665:
      return yf;
    // _VEC3
    case 35666:
      return bf;
    // _VEC4
    case 35674:
      return Tf;
    // _MAT2
    case 35675:
      return Af;
    // _MAT3
    case 35676:
      return wf;
    // _MAT4
    case 5124:
    case 35670:
      return Rf;
    // INT, BOOL
    case 35667:
    case 35671:
      return Cf;
    // _VEC2
    case 35668:
    case 35672:
      return Pf;
    // _VEC3
    case 35669:
    case 35673:
      return Lf;
    // _VEC4
    case 5125:
      return Df;
    // UINT
    case 36294:
      return If;
    // _VEC2
    case 36295:
      return Uf;
    // _VEC3
    case 36296:
      return Nf;
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
      return Ff;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Of;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Bf;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return kf;
  }
}
class Hf {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Mf(t.type);
  }
}
class Vf {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = zf(t.type);
  }
}
class Gf {
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
const Jr = /(\w+)(\])?(\[|\.)?/g;
function Qa(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function Wf(i, e, t) {
  const n = i.name, r = n.length;
  for (Jr.lastIndex = 0; ; ) {
    const s = Jr.exec(n), o = Jr.lastIndex;
    let a = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (a = a | 0), c === void 0 || c === "[" && o + 2 === r) {
      Qa(t, c === void 0 ? new Hf(a, i, e) : new Vf(a, i, e));
      break;
    } else {
      let d = t.map[a];
      d === void 0 && (d = new Gf(a), Qa(t, d)), t = d;
    }
  }
}
class fr {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = e.getActiveUniform(t, r), o = e.getUniformLocation(t, s.name);
      Wf(s, o, this);
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
function eo(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const Xf = 37297;
let Yf = 0;
function qf(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let o = r; o < s; o++) {
    const a = o + 1;
    n.push(`${a === e ? ">" : " "} ${a}: ${t[o]}`);
  }
  return n.join(`
`);
}
const to = /* @__PURE__ */ new Pe();
function jf(i) {
  Ve._getMatrix(to, Ve.workingColorSpace, i);
  const e = `mat3( ${to.elements.map((t) => t.toFixed(4))} )`;
  switch (Ve.getTransfer(i)) {
    case Mr:
      return [e, "LinearTransferOETF"];
    case Ke:
      return [e, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [e, "LinearTransferOETF"];
  }
}
function no(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), r = i.getShaderInfoLog(e).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const o = parseInt(s[1]);
    return t.toUpperCase() + `

` + r + `

` + qf(i.getShaderSource(e), o);
  } else
    return r;
}
function Kf(i, e) {
  const t = jf(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function Zf(i, e) {
  let t;
  switch (e) {
    case hc:
      t = "Linear";
      break;
    case uc:
      t = "Reinhard";
      break;
    case dc:
      t = "Cineon";
      break;
    case fc:
      t = "ACESFilmic";
      break;
    case mc:
      t = "AgX";
      break;
    case _c:
      t = "Neutral";
      break;
    case pc:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const tr = /* @__PURE__ */ new U();
function $f() {
  Ve.getLuminanceCoefficients(tr);
  const i = tr.x.toFixed(4), e = tr.y.toFixed(4), t = tr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Jf(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Ai).join(`
`);
}
function Qf(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function ep(i, e) {
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
function Ai(i) {
  return i !== "";
}
function io(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function ro(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const tp = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ws(i) {
  return i.replace(tp, ip);
}
const np = /* @__PURE__ */ new Map();
function ip(i, e) {
  let t = De[e];
  if (t === void 0) {
    const n = np.get(e);
    if (n !== void 0)
      t = De[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return Ws(t);
}
const rp = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function so(i) {
  return i.replace(rp, sp);
}
function sp(i, e, t, n) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function ao(i) {
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
function ap(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === bo ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Gl ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === en && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function op(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case hi:
      case ui:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case xr:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function lp(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case ui:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function cp(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case To:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case lc:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case cc:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function hp(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: n, maxMip: t };
}
function up(i, e, t, n) {
  const r = i.getContext(), s = t.defines;
  let o = t.vertexShader, a = t.fragmentShader;
  const l = ap(t), c = op(t), h = lp(t), d = cp(t), p = hp(t), m = Jf(t), x = Qf(s), g = r.createProgram();
  let f, u, C = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (f = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(Ai).join(`
`), f.length > 0 && (f += `
`), u = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(Ai).join(`
`), u.length > 0 && (u += `
`)) : (f = [
    ao(t),
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
  ].filter(Ai).join(`
`), u = [
    ao(t),
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
    p ? "#define CUBEUV_TEXEL_WIDTH " + p.texelWidth : "",
    p ? "#define CUBEUV_TEXEL_HEIGHT " + p.texelHeight : "",
    p ? "#define CUBEUV_MAX_MIP " + p.maxMip + ".0" : "",
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
    t.toneMapping !== Sn ? "#define TONE_MAPPING" : "",
    t.toneMapping !== Sn ? De.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== Sn ? Zf("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    De.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Kf("linearToOutputTexel", t.outputColorSpace),
    $f(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Ai).join(`
`)), o = Ws(o), o = io(o, t), o = ro(o, t), a = Ws(a), a = io(a, t), a = ro(a, t), o = so(o), a = so(a), t.isRawShaderMaterial !== !0 && (C = `#version 300 es
`, f = [
    m,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + f, u = [
    "#define varying in",
    t.glslVersion === xa ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === xa ? "" : "#define gl_FragColor pc_fragColor",
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
  const A = C + f + o, y = C + u + a, F = eo(r, r.VERTEX_SHADER, A), T = eo(r, r.FRAGMENT_SHADER, y);
  r.attachShader(g, F), r.attachShader(g, T), t.index0AttributeName !== void 0 ? r.bindAttribLocation(g, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(g, 0, "position"), r.linkProgram(g);
  function E(w) {
    if (i.debug.checkShaderErrors) {
      const N = r.getProgramInfoLog(g).trim(), B = r.getShaderInfoLog(F).trim(), W = r.getShaderInfoLog(T).trim();
      let K = !0, G = !0;
      if (r.getProgramParameter(g, r.LINK_STATUS) === !1)
        if (K = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, g, F, T);
        else {
          const $ = no(r, F, "vertex"), H = no(r, T, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(g, r.VALIDATE_STATUS) + `

Material Name: ` + w.name + `
Material Type: ` + w.type + `

Program Info Log: ` + N + `
` + $ + `
` + H
          );
        }
      else N !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", N) : (B === "" || W === "") && (G = !1);
      G && (w.diagnostics = {
        runnable: K,
        programLog: N,
        vertexShader: {
          log: B,
          prefix: f
        },
        fragmentShader: {
          log: W,
          prefix: u
        }
      });
    }
    r.deleteShader(F), r.deleteShader(T), R = new fr(r, g), S = ep(r, g);
  }
  let R;
  this.getUniforms = function() {
    return R === void 0 && E(this), R;
  };
  let S;
  this.getAttributes = function() {
    return S === void 0 && E(this), S;
  };
  let v = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return v === !1 && (v = r.getProgramParameter(g, Xf)), v;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(g), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Yf++, this.cacheKey = e, this.usedTimes = 1, this.program = g, this.vertexShader = F, this.fragmentShader = T, this;
}
let dp = 0;
class fp {
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
    return n === void 0 && (n = new pp(e), t.set(e, n)), n;
  }
}
class pp {
  constructor(e) {
    this.id = dp++, this.code = e, this.usedTimes = 0;
  }
}
function mp(i, e, t, n, r, s, o) {
  const a = new Ho(), l = new fp(), c = /* @__PURE__ */ new Set(), h = [], d = r.logarithmicDepthBuffer, p = r.vertexTextures;
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
  function g(S) {
    return c.add(S), S === 0 ? "uv" : `uv${S}`;
  }
  function f(S, v, w, N, B) {
    const W = N.fog, K = B.geometry, G = S.isMeshStandardMaterial ? N.environment : null, $ = (S.isMeshStandardMaterial ? t : e).get(S.envMap || G), H = $ && $.mapping === xr ? $.image.height : null, te = x[S.type];
    S.precision !== null && (m = r.getMaxPrecision(S.precision), m !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", m, "instead."));
    const ie = K.morphAttributes.position || K.morphAttributes.normal || K.morphAttributes.color, fe = ie !== void 0 ? ie.length : 0;
    let Ae = 0;
    K.morphAttributes.position !== void 0 && (Ae = 1), K.morphAttributes.normal !== void 0 && (Ae = 2), K.morphAttributes.color !== void 0 && (Ae = 3);
    let We, Y, ee, ge;
    if (te) {
      const je = Gt[te];
      We = je.vertexShader, Y = je.fragmentShader;
    } else
      We = S.vertexShader, Y = S.fragmentShader, l.update(S), ee = l.getVertexShaderID(S), ge = l.getFragmentShaderID(S);
    const se = i.getRenderTarget(), ye = i.state.buffers.depth.getReversed(), we = B.isInstancedMesh === !0, Ue = B.isBatchedMesh === !0, nt = !!S.map, ze = !!S.matcap, rt = !!$, I = !!S.aoMap, Rt = !!S.lightMap, Oe = !!S.bumpMap, Be = !!S.normalMap, Se = !!S.displacementMap, Qe = !!S.emissiveMap, Me = !!S.metalnessMap, b = !!S.roughnessMap, _ = S.anisotropy > 0, O = S.clearcoat > 0, q = S.dispersion > 0, Z = S.iridescence > 0, X = S.sheen > 0, ve = S.transmission > 0, ae = _ && !!S.anisotropyMap, he = O && !!S.clearcoatMap, He = O && !!S.clearcoatNormalMap, J = O && !!S.clearcoatRoughnessMap, ue = Z && !!S.iridescenceMap, Ee = Z && !!S.iridescenceThicknessMap, be = X && !!S.sheenColorMap, de = X && !!S.sheenRoughnessMap, ke = !!S.specularMap, Le = !!S.specularColorMap, $e = !!S.specularIntensityMap, P = ve && !!S.transmissionMap, re = ve && !!S.thicknessMap, V = !!S.gradientMap, j = !!S.alphaMap, ce = S.alphaTest > 0, oe = !!S.alphaHash, Re = !!S.extensions;
    let it = Sn;
    S.toneMapped && (se === null || se.isXRRenderTarget === !0) && (it = i.toneMapping);
    const ft = {
      shaderID: te,
      shaderType: S.type,
      shaderName: S.name,
      vertexShader: We,
      fragmentShader: Y,
      defines: S.defines,
      customVertexShaderID: ee,
      customFragmentShaderID: ge,
      isRawShaderMaterial: S.isRawShaderMaterial === !0,
      glslVersion: S.glslVersion,
      precision: m,
      batching: Ue,
      batchingColor: Ue && B._colorsTexture !== null,
      instancing: we,
      instancingColor: we && B.instanceColor !== null,
      instancingMorph: we && B.morphTexture !== null,
      supportsVertexTextures: p,
      outputColorSpace: se === null ? i.outputColorSpace : se.isXRRenderTarget === !0 ? se.texture.colorSpace : mi,
      alphaToCoverage: !!S.alphaToCoverage,
      map: nt,
      matcap: ze,
      envMap: rt,
      envMapMode: rt && $.mapping,
      envMapCubeUVHeight: H,
      aoMap: I,
      lightMap: Rt,
      bumpMap: Oe,
      normalMap: Be,
      displacementMap: p && Se,
      emissiveMap: Qe,
      normalMapObjectSpace: Be && S.normalMapType === Sc,
      normalMapTangentSpace: Be && S.normalMapType === Mc,
      metalnessMap: Me,
      roughnessMap: b,
      anisotropy: _,
      anisotropyMap: ae,
      clearcoat: O,
      clearcoatMap: he,
      clearcoatNormalMap: He,
      clearcoatRoughnessMap: J,
      dispersion: q,
      iridescence: Z,
      iridescenceMap: ue,
      iridescenceThicknessMap: Ee,
      sheen: X,
      sheenColorMap: be,
      sheenRoughnessMap: de,
      specularMap: ke,
      specularColorMap: Le,
      specularIntensityMap: $e,
      transmission: ve,
      transmissionMap: P,
      thicknessMap: re,
      gradientMap: V,
      opaque: S.transparent === !1 && S.blending === ai && S.alphaToCoverage === !1,
      alphaMap: j,
      alphaTest: ce,
      alphaHash: oe,
      combine: S.combine,
      //
      mapUv: nt && g(S.map.channel),
      aoMapUv: I && g(S.aoMap.channel),
      lightMapUv: Rt && g(S.lightMap.channel),
      bumpMapUv: Oe && g(S.bumpMap.channel),
      normalMapUv: Be && g(S.normalMap.channel),
      displacementMapUv: Se && g(S.displacementMap.channel),
      emissiveMapUv: Qe && g(S.emissiveMap.channel),
      metalnessMapUv: Me && g(S.metalnessMap.channel),
      roughnessMapUv: b && g(S.roughnessMap.channel),
      anisotropyMapUv: ae && g(S.anisotropyMap.channel),
      clearcoatMapUv: he && g(S.clearcoatMap.channel),
      clearcoatNormalMapUv: He && g(S.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: J && g(S.clearcoatRoughnessMap.channel),
      iridescenceMapUv: ue && g(S.iridescenceMap.channel),
      iridescenceThicknessMapUv: Ee && g(S.iridescenceThicknessMap.channel),
      sheenColorMapUv: be && g(S.sheenColorMap.channel),
      sheenRoughnessMapUv: de && g(S.sheenRoughnessMap.channel),
      specularMapUv: ke && g(S.specularMap.channel),
      specularColorMapUv: Le && g(S.specularColorMap.channel),
      specularIntensityMapUv: $e && g(S.specularIntensityMap.channel),
      transmissionMapUv: P && g(S.transmissionMap.channel),
      thicknessMapUv: re && g(S.thicknessMap.channel),
      alphaMapUv: j && g(S.alphaMap.channel),
      //
      vertexTangents: !!K.attributes.tangent && (Be || _),
      vertexColors: S.vertexColors,
      vertexAlphas: S.vertexColors === !0 && !!K.attributes.color && K.attributes.color.itemSize === 4,
      pointsUvs: B.isPoints === !0 && !!K.attributes.uv && (nt || j),
      fog: !!W,
      useFog: S.fog === !0,
      fogExp2: !!W && W.isFogExp2,
      flatShading: S.flatShading === !0,
      sizeAttenuation: S.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reverseDepthBuffer: ye,
      skinning: B.isSkinnedMesh === !0,
      morphTargets: K.morphAttributes.position !== void 0,
      morphNormals: K.morphAttributes.normal !== void 0,
      morphColors: K.morphAttributes.color !== void 0,
      morphTargetsCount: fe,
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
      shadowMapEnabled: i.shadowMap.enabled && w.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: it,
      decodeVideoTexture: nt && S.map.isVideoTexture === !0 && Ve.getTransfer(S.map.colorSpace) === Ke,
      decodeVideoTextureEmissive: Qe && S.emissiveMap.isVideoTexture === !0 && Ve.getTransfer(S.emissiveMap.colorSpace) === Ke,
      premultipliedAlpha: S.premultipliedAlpha,
      doubleSided: S.side === nn,
      flipSided: S.side === Et,
      useDepthPacking: S.depthPacking >= 0,
      depthPacking: S.depthPacking || 0,
      index0AttributeName: S.index0AttributeName,
      extensionClipCullDistance: Re && S.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Re && S.extensions.multiDraw === !0 || Ue) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: S.customProgramCacheKey()
    };
    return ft.vertexUv1s = c.has(1), ft.vertexUv2s = c.has(2), ft.vertexUv3s = c.has(3), c.clear(), ft;
  }
  function u(S) {
    const v = [];
    if (S.shaderID ? v.push(S.shaderID) : (v.push(S.customVertexShaderID), v.push(S.customFragmentShaderID)), S.defines !== void 0)
      for (const w in S.defines)
        v.push(w), v.push(S.defines[w]);
    return S.isRawShaderMaterial === !1 && (C(v, S), A(v, S), v.push(i.outputColorSpace)), v.push(S.customProgramCacheKey), v.join();
  }
  function C(S, v) {
    S.push(v.precision), S.push(v.outputColorSpace), S.push(v.envMapMode), S.push(v.envMapCubeUVHeight), S.push(v.mapUv), S.push(v.alphaMapUv), S.push(v.lightMapUv), S.push(v.aoMapUv), S.push(v.bumpMapUv), S.push(v.normalMapUv), S.push(v.displacementMapUv), S.push(v.emissiveMapUv), S.push(v.metalnessMapUv), S.push(v.roughnessMapUv), S.push(v.anisotropyMapUv), S.push(v.clearcoatMapUv), S.push(v.clearcoatNormalMapUv), S.push(v.clearcoatRoughnessMapUv), S.push(v.iridescenceMapUv), S.push(v.iridescenceThicknessMapUv), S.push(v.sheenColorMapUv), S.push(v.sheenRoughnessMapUv), S.push(v.specularMapUv), S.push(v.specularColorMapUv), S.push(v.specularIntensityMapUv), S.push(v.transmissionMapUv), S.push(v.thicknessMapUv), S.push(v.combine), S.push(v.fogExp2), S.push(v.sizeAttenuation), S.push(v.morphTargetsCount), S.push(v.morphAttributeCount), S.push(v.numDirLights), S.push(v.numPointLights), S.push(v.numSpotLights), S.push(v.numSpotLightMaps), S.push(v.numHemiLights), S.push(v.numRectAreaLights), S.push(v.numDirLightShadows), S.push(v.numPointLightShadows), S.push(v.numSpotLightShadows), S.push(v.numSpotLightShadowsWithMaps), S.push(v.numLightProbes), S.push(v.shadowMapType), S.push(v.toneMapping), S.push(v.numClippingPlanes), S.push(v.numClipIntersection), S.push(v.depthPacking);
  }
  function A(S, v) {
    a.disableAll(), v.supportsVertexTextures && a.enable(0), v.instancing && a.enable(1), v.instancingColor && a.enable(2), v.instancingMorph && a.enable(3), v.matcap && a.enable(4), v.envMap && a.enable(5), v.normalMapObjectSpace && a.enable(6), v.normalMapTangentSpace && a.enable(7), v.clearcoat && a.enable(8), v.iridescence && a.enable(9), v.alphaTest && a.enable(10), v.vertexColors && a.enable(11), v.vertexAlphas && a.enable(12), v.vertexUv1s && a.enable(13), v.vertexUv2s && a.enable(14), v.vertexUv3s && a.enable(15), v.vertexTangents && a.enable(16), v.anisotropy && a.enable(17), v.alphaHash && a.enable(18), v.batching && a.enable(19), v.dispersion && a.enable(20), v.batchingColor && a.enable(21), S.push(a.mask), a.disableAll(), v.fog && a.enable(0), v.useFog && a.enable(1), v.flatShading && a.enable(2), v.logarithmicDepthBuffer && a.enable(3), v.reverseDepthBuffer && a.enable(4), v.skinning && a.enable(5), v.morphTargets && a.enable(6), v.morphNormals && a.enable(7), v.morphColors && a.enable(8), v.premultipliedAlpha && a.enable(9), v.shadowMapEnabled && a.enable(10), v.doubleSided && a.enable(11), v.flipSided && a.enable(12), v.useDepthPacking && a.enable(13), v.dithering && a.enable(14), v.transmission && a.enable(15), v.sheen && a.enable(16), v.opaque && a.enable(17), v.pointsUvs && a.enable(18), v.decodeVideoTexture && a.enable(19), v.decodeVideoTextureEmissive && a.enable(20), v.alphaToCoverage && a.enable(21), S.push(a.mask);
  }
  function y(S) {
    const v = x[S.type];
    let w;
    if (v) {
      const N = Gt[v];
      w = $c.clone(N.uniforms);
    } else
      w = S.uniforms;
    return w;
  }
  function F(S, v) {
    let w;
    for (let N = 0, B = h.length; N < B; N++) {
      const W = h[N];
      if (W.cacheKey === v) {
        w = W, ++w.usedTimes;
        break;
      }
    }
    return w === void 0 && (w = new up(i, v, S, s), h.push(w)), w;
  }
  function T(S) {
    if (--S.usedTimes === 0) {
      const v = h.indexOf(S);
      h[v] = h[h.length - 1], h.pop(), S.destroy();
    }
  }
  function E(S) {
    l.remove(S);
  }
  function R() {
    l.dispose();
  }
  return {
    getParameters: f,
    getProgramCacheKey: u,
    getUniforms: y,
    acquireProgram: F,
    releaseProgram: T,
    releaseShaderCache: E,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: R
  };
}
function _p() {
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
function gp(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function oo(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function lo() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function o(d, p, m, x, g, f) {
    let u = i[e];
    return u === void 0 ? (u = {
      id: d.id,
      object: d,
      geometry: p,
      material: m,
      groupOrder: x,
      renderOrder: d.renderOrder,
      z: g,
      group: f
    }, i[e] = u) : (u.id = d.id, u.object = d, u.geometry = p, u.material = m, u.groupOrder = x, u.renderOrder = d.renderOrder, u.z = g, u.group = f), e++, u;
  }
  function a(d, p, m, x, g, f) {
    const u = o(d, p, m, x, g, f);
    m.transmission > 0 ? n.push(u) : m.transparent === !0 ? r.push(u) : t.push(u);
  }
  function l(d, p, m, x, g, f) {
    const u = o(d, p, m, x, g, f);
    m.transmission > 0 ? n.unshift(u) : m.transparent === !0 ? r.unshift(u) : t.unshift(u);
  }
  function c(d, p) {
    t.length > 1 && t.sort(d || gp), n.length > 1 && n.sort(p || oo), r.length > 1 && r.sort(p || oo);
  }
  function h() {
    for (let d = e, p = i.length; d < p; d++) {
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
function vp() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const s = i.get(n);
    let o;
    return s === void 0 ? (o = new lo(), i.set(n, [o])) : r >= s.length ? (o = new lo(), s.push(o)) : o = s[r], o;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function xp() {
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
            color: new qe()
          };
          break;
        case "SpotLight":
          t = {
            position: new U(),
            direction: new U(),
            color: new qe(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new U(),
            color: new qe(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new U(),
            skyColor: new qe(),
            groundColor: new qe()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new qe(),
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
function Mp() {
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
            shadowMapSize: new Ie()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ie()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ie(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let Sp = 0;
function Ep(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function yp(i) {
  const e = new xp(), t = Mp(), n = {
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
  const r = new U(), s = new at(), o = new at();
  function a(c) {
    let h = 0, d = 0, p = 0;
    for (let S = 0; S < 9; S++) n.probe[S].set(0, 0, 0);
    let m = 0, x = 0, g = 0, f = 0, u = 0, C = 0, A = 0, y = 0, F = 0, T = 0, E = 0;
    c.sort(Ep);
    for (let S = 0, v = c.length; S < v; S++) {
      const w = c[S], N = w.color, B = w.intensity, W = w.distance, K = w.shadow && w.shadow.map ? w.shadow.map.texture : null;
      if (w.isAmbientLight)
        h += N.r * B, d += N.g * B, p += N.b * B;
      else if (w.isLightProbe) {
        for (let G = 0; G < 9; G++)
          n.probe[G].addScaledVector(w.sh.coefficients[G], B);
        E++;
      } else if (w.isDirectionalLight) {
        const G = e.get(w);
        if (G.color.copy(w.color).multiplyScalar(w.intensity), w.castShadow) {
          const $ = w.shadow, H = t.get(w);
          H.shadowIntensity = $.intensity, H.shadowBias = $.bias, H.shadowNormalBias = $.normalBias, H.shadowRadius = $.radius, H.shadowMapSize = $.mapSize, n.directionalShadow[m] = H, n.directionalShadowMap[m] = K, n.directionalShadowMatrix[m] = w.shadow.matrix, C++;
        }
        n.directional[m] = G, m++;
      } else if (w.isSpotLight) {
        const G = e.get(w);
        G.position.setFromMatrixPosition(w.matrixWorld), G.color.copy(N).multiplyScalar(B), G.distance = W, G.coneCos = Math.cos(w.angle), G.penumbraCos = Math.cos(w.angle * (1 - w.penumbra)), G.decay = w.decay, n.spot[g] = G;
        const $ = w.shadow;
        if (w.map && (n.spotLightMap[F] = w.map, F++, $.updateMatrices(w), w.castShadow && T++), n.spotLightMatrix[g] = $.matrix, w.castShadow) {
          const H = t.get(w);
          H.shadowIntensity = $.intensity, H.shadowBias = $.bias, H.shadowNormalBias = $.normalBias, H.shadowRadius = $.radius, H.shadowMapSize = $.mapSize, n.spotShadow[g] = H, n.spotShadowMap[g] = K, y++;
        }
        g++;
      } else if (w.isRectAreaLight) {
        const G = e.get(w);
        G.color.copy(N).multiplyScalar(B), G.halfWidth.set(w.width * 0.5, 0, 0), G.halfHeight.set(0, w.height * 0.5, 0), n.rectArea[f] = G, f++;
      } else if (w.isPointLight) {
        const G = e.get(w);
        if (G.color.copy(w.color).multiplyScalar(w.intensity), G.distance = w.distance, G.decay = w.decay, w.castShadow) {
          const $ = w.shadow, H = t.get(w);
          H.shadowIntensity = $.intensity, H.shadowBias = $.bias, H.shadowNormalBias = $.normalBias, H.shadowRadius = $.radius, H.shadowMapSize = $.mapSize, H.shadowCameraNear = $.camera.near, H.shadowCameraFar = $.camera.far, n.pointShadow[x] = H, n.pointShadowMap[x] = K, n.pointShadowMatrix[x] = w.shadow.matrix, A++;
        }
        n.point[x] = G, x++;
      } else if (w.isHemisphereLight) {
        const G = e.get(w);
        G.skyColor.copy(w.color).multiplyScalar(B), G.groundColor.copy(w.groundColor).multiplyScalar(B), n.hemi[u] = G, u++;
      }
    }
    f > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ne.LTC_FLOAT_1, n.rectAreaLTC2 = ne.LTC_FLOAT_2) : (n.rectAreaLTC1 = ne.LTC_HALF_1, n.rectAreaLTC2 = ne.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = d, n.ambient[2] = p;
    const R = n.hash;
    (R.directionalLength !== m || R.pointLength !== x || R.spotLength !== g || R.rectAreaLength !== f || R.hemiLength !== u || R.numDirectionalShadows !== C || R.numPointShadows !== A || R.numSpotShadows !== y || R.numSpotMaps !== F || R.numLightProbes !== E) && (n.directional.length = m, n.spot.length = g, n.rectArea.length = f, n.point.length = x, n.hemi.length = u, n.directionalShadow.length = C, n.directionalShadowMap.length = C, n.pointShadow.length = A, n.pointShadowMap.length = A, n.spotShadow.length = y, n.spotShadowMap.length = y, n.directionalShadowMatrix.length = C, n.pointShadowMatrix.length = A, n.spotLightMatrix.length = y + F - T, n.spotLightMap.length = F, n.numSpotLightShadowsWithMaps = T, n.numLightProbes = E, R.directionalLength = m, R.pointLength = x, R.spotLength = g, R.rectAreaLength = f, R.hemiLength = u, R.numDirectionalShadows = C, R.numPointShadows = A, R.numSpotShadows = y, R.numSpotMaps = F, R.numLightProbes = E, n.version = Sp++);
  }
  function l(c, h) {
    let d = 0, p = 0, m = 0, x = 0, g = 0;
    const f = h.matrixWorldInverse;
    for (let u = 0, C = c.length; u < C; u++) {
      const A = c[u];
      if (A.isDirectionalLight) {
        const y = n.directional[d];
        y.direction.setFromMatrixPosition(A.matrixWorld), r.setFromMatrixPosition(A.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(f), d++;
      } else if (A.isSpotLight) {
        const y = n.spot[m];
        y.position.setFromMatrixPosition(A.matrixWorld), y.position.applyMatrix4(f), y.direction.setFromMatrixPosition(A.matrixWorld), r.setFromMatrixPosition(A.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(f), m++;
      } else if (A.isRectAreaLight) {
        const y = n.rectArea[x];
        y.position.setFromMatrixPosition(A.matrixWorld), y.position.applyMatrix4(f), o.identity(), s.copy(A.matrixWorld), s.premultiply(f), o.extractRotation(s), y.halfWidth.set(A.width * 0.5, 0, 0), y.halfHeight.set(0, A.height * 0.5, 0), y.halfWidth.applyMatrix4(o), y.halfHeight.applyMatrix4(o), x++;
      } else if (A.isPointLight) {
        const y = n.point[p];
        y.position.setFromMatrixPosition(A.matrixWorld), y.position.applyMatrix4(f), p++;
      } else if (A.isHemisphereLight) {
        const y = n.hemi[g];
        y.direction.setFromMatrixPosition(A.matrixWorld), y.direction.transformDirection(f), g++;
      }
    }
  }
  return {
    setup: a,
    setupView: l,
    state: n
  };
}
function co(i) {
  const e = new yp(i), t = [], n = [];
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
function bp(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const o = e.get(r);
    let a;
    return o === void 0 ? (a = new co(i), e.set(r, [a])) : s >= o.length ? (a = new co(i), o.push(a)) : a = o[s], a;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
class Tp extends Li {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.depthPacking = vc, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Ap extends Li {
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
const wp = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Rp = `uniform sampler2D shadow_pass;
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
function Cp(i, e, t) {
  let n = new Ko();
  const r = new Ie(), s = new Ie(), o = new st(), a = new Tp({ depthPacking: xc }), l = new Ap(), c = {}, h = t.maxTextureSize, d = { [En]: Et, [Et]: En, [nn]: nn }, p = new yn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ie() },
      radius: { value: 4 }
    },
    vertexShader: wp,
    fragmentShader: Rp
  }), m = p.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const x = new _t();
  x.setAttribute(
    "position",
    new Yt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const g = new Xt(x, p), f = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = bo;
  let u = this.type;
  this.render = function(T, E, R) {
    if (f.enabled === !1 || f.autoUpdate === !1 && f.needsUpdate === !1 || T.length === 0) return;
    const S = i.getRenderTarget(), v = i.getActiveCubeFace(), w = i.getActiveMipmapLevel(), N = i.state;
    N.setBlending(Mn), N.buffers.color.setClear(1, 1, 1, 1), N.buffers.depth.setTest(!0), N.setScissorTest(!1);
    const B = u !== en && this.type === en, W = u === en && this.type !== en;
    for (let K = 0, G = T.length; K < G; K++) {
      const $ = T[K], H = $.shadow;
      if (H === void 0) {
        console.warn("THREE.WebGLShadowMap:", $, "has no shadow.");
        continue;
      }
      if (H.autoUpdate === !1 && H.needsUpdate === !1) continue;
      r.copy(H.mapSize);
      const te = H.getFrameExtents();
      if (r.multiply(te), s.copy(H.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / te.x), r.x = s.x * te.x, H.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / te.y), r.y = s.y * te.y, H.mapSize.y = s.y)), H.map === null || B === !0 || W === !0) {
        const fe = this.type !== en ? { minFilter: zt, magFilter: zt } : {};
        H.map !== null && H.map.dispose(), H.map = new Bn(r.x, r.y, fe), H.map.texture.name = $.name + ".shadowMap", H.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(H.map), i.clear();
      const ie = H.getViewportCount();
      for (let fe = 0; fe < ie; fe++) {
        const Ae = H.getViewport(fe);
        o.set(
          s.x * Ae.x,
          s.y * Ae.y,
          s.x * Ae.z,
          s.y * Ae.w
        ), N.viewport(o), H.updateMatrices($, fe), n = H.getFrustum(), y(E, R, H.camera, $, this.type);
      }
      H.isPointLightShadow !== !0 && this.type === en && C(H, R), H.needsUpdate = !1;
    }
    u = this.type, f.needsUpdate = !1, i.setRenderTarget(S, v, w);
  };
  function C(T, E) {
    const R = e.update(g);
    p.defines.VSM_SAMPLES !== T.blurSamples && (p.defines.VSM_SAMPLES = T.blurSamples, m.defines.VSM_SAMPLES = T.blurSamples, p.needsUpdate = !0, m.needsUpdate = !0), T.mapPass === null && (T.mapPass = new Bn(r.x, r.y)), p.uniforms.shadow_pass.value = T.map.texture, p.uniforms.resolution.value = T.mapSize, p.uniforms.radius.value = T.radius, i.setRenderTarget(T.mapPass), i.clear(), i.renderBufferDirect(E, null, R, p, g, null), m.uniforms.shadow_pass.value = T.mapPass.texture, m.uniforms.resolution.value = T.mapSize, m.uniforms.radius.value = T.radius, i.setRenderTarget(T.map), i.clear(), i.renderBufferDirect(E, null, R, m, g, null);
  }
  function A(T, E, R, S) {
    let v = null;
    const w = R.isPointLight === !0 ? T.customDistanceMaterial : T.customDepthMaterial;
    if (w !== void 0)
      v = w;
    else if (v = R.isPointLight === !0 ? l : a, i.localClippingEnabled && E.clipShadows === !0 && Array.isArray(E.clippingPlanes) && E.clippingPlanes.length !== 0 || E.displacementMap && E.displacementScale !== 0 || E.alphaMap && E.alphaTest > 0 || E.map && E.alphaTest > 0) {
      const N = v.uuid, B = E.uuid;
      let W = c[N];
      W === void 0 && (W = {}, c[N] = W);
      let K = W[B];
      K === void 0 && (K = v.clone(), W[B] = K, E.addEventListener("dispose", F)), v = K;
    }
    if (v.visible = E.visible, v.wireframe = E.wireframe, S === en ? v.side = E.shadowSide !== null ? E.shadowSide : E.side : v.side = E.shadowSide !== null ? E.shadowSide : d[E.side], v.alphaMap = E.alphaMap, v.alphaTest = E.alphaTest, v.map = E.map, v.clipShadows = E.clipShadows, v.clippingPlanes = E.clippingPlanes, v.clipIntersection = E.clipIntersection, v.displacementMap = E.displacementMap, v.displacementScale = E.displacementScale, v.displacementBias = E.displacementBias, v.wireframeLinewidth = E.wireframeLinewidth, v.linewidth = E.linewidth, R.isPointLight === !0 && v.isMeshDistanceMaterial === !0) {
      const N = i.properties.get(v);
      N.light = R;
    }
    return v;
  }
  function y(T, E, R, S, v) {
    if (T.visible === !1) return;
    if (T.layers.test(E.layers) && (T.isMesh || T.isLine || T.isPoints) && (T.castShadow || T.receiveShadow && v === en) && (!T.frustumCulled || n.intersectsObject(T))) {
      T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse, T.matrixWorld);
      const B = e.update(T), W = T.material;
      if (Array.isArray(W)) {
        const K = B.groups;
        for (let G = 0, $ = K.length; G < $; G++) {
          const H = K[G], te = W[H.materialIndex];
          if (te && te.visible) {
            const ie = A(T, te, S, v);
            T.onBeforeShadow(i, T, E, R, B, ie, H), i.renderBufferDirect(R, null, B, ie, T, H), T.onAfterShadow(i, T, E, R, B, ie, H);
          }
        }
      } else if (W.visible) {
        const K = A(T, W, S, v);
        T.onBeforeShadow(i, T, E, R, B, K, null), i.renderBufferDirect(R, null, B, K, T, null), T.onAfterShadow(i, T, E, R, B, K, null);
      }
    }
    const N = T.children;
    for (let B = 0, W = N.length; B < W; B++)
      y(N[B], E, R, S, v);
  }
  function F(T) {
    T.target.removeEventListener("dispose", F);
    for (const R in c) {
      const S = c[R], v = T.target.uuid;
      v in S && (S[v].dispose(), delete S[v]);
    }
  }
}
const Pp = {
  [as]: os,
  [ls]: us,
  [cs]: ds,
  [ci]: hs,
  [os]: as,
  [us]: ls,
  [ds]: cs,
  [hs]: ci
};
function Lp(i, e) {
  function t() {
    let P = !1;
    const re = new st();
    let V = null;
    const j = new st(0, 0, 0, 0);
    return {
      setMask: function(ce) {
        V !== ce && !P && (i.colorMask(ce, ce, ce, ce), V = ce);
      },
      setLocked: function(ce) {
        P = ce;
      },
      setClear: function(ce, oe, Re, it, ft) {
        ft === !0 && (ce *= it, oe *= it, Re *= it), re.set(ce, oe, Re, it), j.equals(re) === !1 && (i.clearColor(ce, oe, Re, it), j.copy(re));
      },
      reset: function() {
        P = !1, V = null, j.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let P = !1, re = !1, V = null, j = null, ce = null;
    return {
      setReversed: function(oe) {
        if (re !== oe) {
          const Re = e.get("EXT_clip_control");
          re ? Re.clipControlEXT(Re.LOWER_LEFT_EXT, Re.ZERO_TO_ONE_EXT) : Re.clipControlEXT(Re.LOWER_LEFT_EXT, Re.NEGATIVE_ONE_TO_ONE_EXT);
          const it = ce;
          ce = null, this.setClear(it);
        }
        re = oe;
      },
      getReversed: function() {
        return re;
      },
      setTest: function(oe) {
        oe ? se(i.DEPTH_TEST) : ye(i.DEPTH_TEST);
      },
      setMask: function(oe) {
        V !== oe && !P && (i.depthMask(oe), V = oe);
      },
      setFunc: function(oe) {
        if (re && (oe = Pp[oe]), j !== oe) {
          switch (oe) {
            case as:
              i.depthFunc(i.NEVER);
              break;
            case os:
              i.depthFunc(i.ALWAYS);
              break;
            case ls:
              i.depthFunc(i.LESS);
              break;
            case ci:
              i.depthFunc(i.LEQUAL);
              break;
            case cs:
              i.depthFunc(i.EQUAL);
              break;
            case hs:
              i.depthFunc(i.GEQUAL);
              break;
            case us:
              i.depthFunc(i.GREATER);
              break;
            case ds:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          j = oe;
        }
      },
      setLocked: function(oe) {
        P = oe;
      },
      setClear: function(oe) {
        ce !== oe && (re && (oe = 1 - oe), i.clearDepth(oe), ce = oe);
      },
      reset: function() {
        P = !1, V = null, j = null, ce = null, re = !1;
      }
    };
  }
  function r() {
    let P = !1, re = null, V = null, j = null, ce = null, oe = null, Re = null, it = null, ft = null;
    return {
      setTest: function(je) {
        P || (je ? se(i.STENCIL_TEST) : ye(i.STENCIL_TEST));
      },
      setMask: function(je) {
        re !== je && !P && (i.stencilMask(je), re = je);
      },
      setFunc: function(je, It, qt) {
        (V !== je || j !== It || ce !== qt) && (i.stencilFunc(je, It, qt), V = je, j = It, ce = qt);
      },
      setOp: function(je, It, qt) {
        (oe !== je || Re !== It || it !== qt) && (i.stencilOp(je, It, qt), oe = je, Re = It, it = qt);
      },
      setLocked: function(je) {
        P = je;
      },
      setClear: function(je) {
        ft !== je && (i.clearStencil(je), ft = je);
      },
      reset: function() {
        P = !1, re = null, V = null, j = null, ce = null, oe = null, Re = null, it = null, ft = null;
      }
    };
  }
  const s = new t(), o = new n(), a = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, d = {}, p = /* @__PURE__ */ new WeakMap(), m = [], x = null, g = !1, f = null, u = null, C = null, A = null, y = null, F = null, T = null, E = new qe(0, 0, 0), R = 0, S = !1, v = null, w = null, N = null, B = null, W = null;
  const K = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let G = !1, $ = 0;
  const H = i.getParameter(i.VERSION);
  H.indexOf("WebGL") !== -1 ? ($ = parseFloat(/^WebGL (\d)/.exec(H)[1]), G = $ >= 1) : H.indexOf("OpenGL ES") !== -1 && ($ = parseFloat(/^OpenGL ES (\d)/.exec(H)[1]), G = $ >= 2);
  let te = null, ie = {};
  const fe = i.getParameter(i.SCISSOR_BOX), Ae = i.getParameter(i.VIEWPORT), We = new st().fromArray(fe), Y = new st().fromArray(Ae);
  function ee(P, re, V, j) {
    const ce = new Uint8Array(4), oe = i.createTexture();
    i.bindTexture(P, oe), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Re = 0; Re < V; Re++)
      P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY ? i.texImage3D(re, 0, i.RGBA, 1, 1, j, 0, i.RGBA, i.UNSIGNED_BYTE, ce) : i.texImage2D(re + Re, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ce);
    return oe;
  }
  const ge = {};
  ge[i.TEXTURE_2D] = ee(i.TEXTURE_2D, i.TEXTURE_2D, 1), ge[i.TEXTURE_CUBE_MAP] = ee(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ge[i.TEXTURE_2D_ARRAY] = ee(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), ge[i.TEXTURE_3D] = ee(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), o.setClear(1), a.setClear(0), se(i.DEPTH_TEST), o.setFunc(ci), Oe(!1), Be(fa), se(i.CULL_FACE), I(Mn);
  function se(P) {
    h[P] !== !0 && (i.enable(P), h[P] = !0);
  }
  function ye(P) {
    h[P] !== !1 && (i.disable(P), h[P] = !1);
  }
  function we(P, re) {
    return d[P] !== re ? (i.bindFramebuffer(P, re), d[P] = re, P === i.DRAW_FRAMEBUFFER && (d[i.FRAMEBUFFER] = re), P === i.FRAMEBUFFER && (d[i.DRAW_FRAMEBUFFER] = re), !0) : !1;
  }
  function Ue(P, re) {
    let V = m, j = !1;
    if (P) {
      V = p.get(re), V === void 0 && (V = [], p.set(re, V));
      const ce = P.textures;
      if (V.length !== ce.length || V[0] !== i.COLOR_ATTACHMENT0) {
        for (let oe = 0, Re = ce.length; oe < Re; oe++)
          V[oe] = i.COLOR_ATTACHMENT0 + oe;
        V.length = ce.length, j = !0;
      }
    } else
      V[0] !== i.BACK && (V[0] = i.BACK, j = !0);
    j && i.drawBuffers(V);
  }
  function nt(P) {
    return x !== P ? (i.useProgram(P), x = P, !0) : !1;
  }
  const ze = {
    [In]: i.FUNC_ADD,
    [Xl]: i.FUNC_SUBTRACT,
    [Yl]: i.FUNC_REVERSE_SUBTRACT
  };
  ze[ql] = i.MIN, ze[jl] = i.MAX;
  const rt = {
    [Kl]: i.ZERO,
    [Zl]: i.ONE,
    [$l]: i.SRC_COLOR,
    [rs]: i.SRC_ALPHA,
    [ic]: i.SRC_ALPHA_SATURATE,
    [tc]: i.DST_COLOR,
    [Ql]: i.DST_ALPHA,
    [Jl]: i.ONE_MINUS_SRC_COLOR,
    [ss]: i.ONE_MINUS_SRC_ALPHA,
    [nc]: i.ONE_MINUS_DST_COLOR,
    [ec]: i.ONE_MINUS_DST_ALPHA,
    [rc]: i.CONSTANT_COLOR,
    [sc]: i.ONE_MINUS_CONSTANT_COLOR,
    [ac]: i.CONSTANT_ALPHA,
    [oc]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function I(P, re, V, j, ce, oe, Re, it, ft, je) {
    if (P === Mn) {
      g === !0 && (ye(i.BLEND), g = !1);
      return;
    }
    if (g === !1 && (se(i.BLEND), g = !0), P !== Wl) {
      if (P !== f || je !== S) {
        if ((u !== In || y !== In) && (i.blendEquation(i.FUNC_ADD), u = In, y = In), je)
          switch (P) {
            case ai:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case pa:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case ma:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case _a:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case ai:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case pa:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case ma:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case _a:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        C = null, A = null, F = null, T = null, E.set(0, 0, 0), R = 0, f = P, S = je;
      }
      return;
    }
    ce = ce || re, oe = oe || V, Re = Re || j, (re !== u || ce !== y) && (i.blendEquationSeparate(ze[re], ze[ce]), u = re, y = ce), (V !== C || j !== A || oe !== F || Re !== T) && (i.blendFuncSeparate(rt[V], rt[j], rt[oe], rt[Re]), C = V, A = j, F = oe, T = Re), (it.equals(E) === !1 || ft !== R) && (i.blendColor(it.r, it.g, it.b, ft), E.copy(it), R = ft), f = P, S = !1;
  }
  function Rt(P, re) {
    P.side === nn ? ye(i.CULL_FACE) : se(i.CULL_FACE);
    let V = P.side === Et;
    re && (V = !V), Oe(V), P.blending === ai && P.transparent === !1 ? I(Mn) : I(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), o.setFunc(P.depthFunc), o.setTest(P.depthTest), o.setMask(P.depthWrite), s.setMask(P.colorWrite);
    const j = P.stencilWrite;
    a.setTest(j), j && (a.setMask(P.stencilWriteMask), a.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), a.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), Qe(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? se(i.SAMPLE_ALPHA_TO_COVERAGE) : ye(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Oe(P) {
    v !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), v = P);
  }
  function Be(P) {
    P !== Hl ? (se(i.CULL_FACE), P !== w && (P === fa ? i.cullFace(i.BACK) : P === Vl ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : ye(i.CULL_FACE), w = P;
  }
  function Se(P) {
    P !== N && (G && i.lineWidth(P), N = P);
  }
  function Qe(P, re, V) {
    P ? (se(i.POLYGON_OFFSET_FILL), (B !== re || W !== V) && (i.polygonOffset(re, V), B = re, W = V)) : ye(i.POLYGON_OFFSET_FILL);
  }
  function Me(P) {
    P ? se(i.SCISSOR_TEST) : ye(i.SCISSOR_TEST);
  }
  function b(P) {
    P === void 0 && (P = i.TEXTURE0 + K - 1), te !== P && (i.activeTexture(P), te = P);
  }
  function _(P, re, V) {
    V === void 0 && (te === null ? V = i.TEXTURE0 + K - 1 : V = te);
    let j = ie[V];
    j === void 0 && (j = { type: void 0, texture: void 0 }, ie[V] = j), (j.type !== P || j.texture !== re) && (te !== V && (i.activeTexture(V), te = V), i.bindTexture(P, re || ge[P]), j.type = P, j.texture = re);
  }
  function O() {
    const P = ie[te];
    P !== void 0 && P.type !== void 0 && (i.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function q() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Z() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function X() {
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
  function he() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function He() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function J() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ue() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Ee() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function be(P) {
    We.equals(P) === !1 && (i.scissor(P.x, P.y, P.z, P.w), We.copy(P));
  }
  function de(P) {
    Y.equals(P) === !1 && (i.viewport(P.x, P.y, P.z, P.w), Y.copy(P));
  }
  function ke(P, re) {
    let V = c.get(re);
    V === void 0 && (V = /* @__PURE__ */ new WeakMap(), c.set(re, V));
    let j = V.get(P);
    j === void 0 && (j = i.getUniformBlockIndex(re, P.name), V.set(P, j));
  }
  function Le(P, re) {
    const j = c.get(re).get(P);
    l.get(re) !== j && (i.uniformBlockBinding(re, j, P.__bindingPointIndex), l.set(re, j));
  }
  function $e() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), o.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, te = null, ie = {}, d = {}, p = /* @__PURE__ */ new WeakMap(), m = [], x = null, g = !1, f = null, u = null, C = null, A = null, y = null, F = null, T = null, E = new qe(0, 0, 0), R = 0, S = !1, v = null, w = null, N = null, B = null, W = null, We.set(0, 0, i.canvas.width, i.canvas.height), Y.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), o.reset(), a.reset();
  }
  return {
    buffers: {
      color: s,
      depth: o,
      stencil: a
    },
    enable: se,
    disable: ye,
    bindFramebuffer: we,
    drawBuffers: Ue,
    useProgram: nt,
    setBlending: I,
    setMaterial: Rt,
    setFlipSided: Oe,
    setCullFace: Be,
    setLineWidth: Se,
    setPolygonOffset: Qe,
    setScissorTest: Me,
    activeTexture: b,
    bindTexture: _,
    unbindTexture: O,
    compressedTexImage2D: q,
    compressedTexImage3D: Z,
    texImage2D: ue,
    texImage3D: Ee,
    updateUBOMapping: ke,
    uniformBlockBinding: Le,
    texStorage2D: He,
    texStorage3D: J,
    texSubImage2D: X,
    texSubImage3D: ve,
    compressedTexSubImage2D: ae,
    compressedTexSubImage3D: he,
    scissor: be,
    viewport: de,
    reset: $e
  };
}
function ho(i, e, t, n) {
  const r = Dp(n);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case Po:
      return i * e;
    case Do:
      return i * e;
    case Io:
      return i * e * 2;
    case Uo:
      return i * e / r.components * r.byteLength;
    case Zs:
      return i * e / r.components * r.byteLength;
    case No:
      return i * e * 2 / r.components * r.byteLength;
    case $s:
      return i * e * 2 / r.components * r.byteLength;
    case Lo:
      return i * e * 3 / r.components * r.byteLength;
    case kt:
      return i * e * 4 / r.components * r.byteLength;
    case Js:
      return i * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case or:
    case lr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case cr:
    case hr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case vs:
    case Ms:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case gs:
    case xs:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case Ss:
    case Es:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case ys:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case bs:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Ts:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case As:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case ws:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Rs:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case Cs:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case Ps:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case Ls:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case Ds:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case Is:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case Us:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case Ns:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case Fs:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case Os:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case ur:
    case Bs:
    case ks:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case Fo:
    case zs:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case Hs:
    case Vs:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function Dp(i) {
  switch (i) {
    case ln:
    case wo:
      return { byteLength: 1, components: 1 };
    case wi:
    case Ro:
    case Ri:
      return { byteLength: 2, components: 1 };
    case js:
    case Ks:
      return { byteLength: 2, components: 4 };
    case On:
    case qs:
    case rn:
      return { byteLength: 4, components: 1 };
    case Co:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function Ip(i, e, t, n, r, s, o) {
  const a = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Ie(), h = /* @__PURE__ */ new WeakMap();
  let d;
  const p = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function x(b, _) {
    return m ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(b, _)
    ) : _r("canvas");
  }
  function g(b, _, O) {
    let q = 1;
    const Z = Me(b);
    if ((Z.width > O || Z.height > O) && (q = O / Math.max(Z.width, Z.height)), q < 1)
      if (typeof HTMLImageElement < "u" && b instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && b instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && b instanceof ImageBitmap || typeof VideoFrame < "u" && b instanceof VideoFrame) {
        const X = Math.floor(q * Z.width), ve = Math.floor(q * Z.height);
        d === void 0 && (d = x(X, ve));
        const ae = _ ? x(X, ve) : d;
        return ae.width = X, ae.height = ve, ae.getContext("2d").drawImage(b, 0, 0, X, ve), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + X + "x" + ve + ")."), ae;
      } else
        return "data" in b && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), b;
    return b;
  }
  function f(b) {
    return b.generateMipmaps;
  }
  function u(b) {
    i.generateMipmap(b);
  }
  function C(b) {
    return b.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : b.isWebGL3DRenderTarget ? i.TEXTURE_3D : b.isWebGLArrayRenderTarget || b.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function A(b, _, O, q, Z = !1) {
    if (b !== null) {
      if (i[b] !== void 0) return i[b];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + b + "'");
    }
    let X = _;
    if (_ === i.RED && (O === i.FLOAT && (X = i.R32F), O === i.HALF_FLOAT && (X = i.R16F), O === i.UNSIGNED_BYTE && (X = i.R8)), _ === i.RED_INTEGER && (O === i.UNSIGNED_BYTE && (X = i.R8UI), O === i.UNSIGNED_SHORT && (X = i.R16UI), O === i.UNSIGNED_INT && (X = i.R32UI), O === i.BYTE && (X = i.R8I), O === i.SHORT && (X = i.R16I), O === i.INT && (X = i.R32I)), _ === i.RG && (O === i.FLOAT && (X = i.RG32F), O === i.HALF_FLOAT && (X = i.RG16F), O === i.UNSIGNED_BYTE && (X = i.RG8)), _ === i.RG_INTEGER && (O === i.UNSIGNED_BYTE && (X = i.RG8UI), O === i.UNSIGNED_SHORT && (X = i.RG16UI), O === i.UNSIGNED_INT && (X = i.RG32UI), O === i.BYTE && (X = i.RG8I), O === i.SHORT && (X = i.RG16I), O === i.INT && (X = i.RG32I)), _ === i.RGB_INTEGER && (O === i.UNSIGNED_BYTE && (X = i.RGB8UI), O === i.UNSIGNED_SHORT && (X = i.RGB16UI), O === i.UNSIGNED_INT && (X = i.RGB32UI), O === i.BYTE && (X = i.RGB8I), O === i.SHORT && (X = i.RGB16I), O === i.INT && (X = i.RGB32I)), _ === i.RGBA_INTEGER && (O === i.UNSIGNED_BYTE && (X = i.RGBA8UI), O === i.UNSIGNED_SHORT && (X = i.RGBA16UI), O === i.UNSIGNED_INT && (X = i.RGBA32UI), O === i.BYTE && (X = i.RGBA8I), O === i.SHORT && (X = i.RGBA16I), O === i.INT && (X = i.RGBA32I)), _ === i.RGB && O === i.UNSIGNED_INT_5_9_9_9_REV && (X = i.RGB9_E5), _ === i.RGBA) {
      const ve = Z ? Mr : Ve.getTransfer(q);
      O === i.FLOAT && (X = i.RGBA32F), O === i.HALF_FLOAT && (X = i.RGBA16F), O === i.UNSIGNED_BYTE && (X = ve === Ke ? i.SRGB8_ALPHA8 : i.RGBA8), O === i.UNSIGNED_SHORT_4_4_4_4 && (X = i.RGBA4), O === i.UNSIGNED_SHORT_5_5_5_1 && (X = i.RGB5_A1);
    }
    return (X === i.R16F || X === i.R32F || X === i.RG16F || X === i.RG32F || X === i.RGBA16F || X === i.RGBA32F) && e.get("EXT_color_buffer_float"), X;
  }
  function y(b, _) {
    let O;
    return b ? _ === null || _ === On || _ === di ? O = i.DEPTH24_STENCIL8 : _ === rn ? O = i.DEPTH32F_STENCIL8 : _ === wi && (O = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : _ === null || _ === On || _ === di ? O = i.DEPTH_COMPONENT24 : _ === rn ? O = i.DEPTH_COMPONENT32F : _ === wi && (O = i.DEPTH_COMPONENT16), O;
  }
  function F(b, _) {
    return f(b) === !0 || b.isFramebufferTexture && b.minFilter !== zt && b.minFilter !== Wt ? Math.log2(Math.max(_.width, _.height)) + 1 : b.mipmaps !== void 0 && b.mipmaps.length > 0 ? b.mipmaps.length : b.isCompressedTexture && Array.isArray(b.image) ? _.mipmaps.length : 1;
  }
  function T(b) {
    const _ = b.target;
    _.removeEventListener("dispose", T), R(_), _.isVideoTexture && h.delete(_);
  }
  function E(b) {
    const _ = b.target;
    _.removeEventListener("dispose", E), v(_);
  }
  function R(b) {
    const _ = n.get(b);
    if (_.__webglInit === void 0) return;
    const O = b.source, q = p.get(O);
    if (q) {
      const Z = q[_.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && S(b), Object.keys(q).length === 0 && p.delete(O);
    }
    n.remove(b);
  }
  function S(b) {
    const _ = n.get(b);
    i.deleteTexture(_.__webglTexture);
    const O = b.source, q = p.get(O);
    delete q[_.__cacheKey], o.memory.textures--;
  }
  function v(b) {
    const _ = n.get(b);
    if (b.depthTexture && (b.depthTexture.dispose(), n.remove(b.depthTexture)), b.isWebGLCubeRenderTarget)
      for (let q = 0; q < 6; q++) {
        if (Array.isArray(_.__webglFramebuffer[q]))
          for (let Z = 0; Z < _.__webglFramebuffer[q].length; Z++) i.deleteFramebuffer(_.__webglFramebuffer[q][Z]);
        else
          i.deleteFramebuffer(_.__webglFramebuffer[q]);
        _.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer[q]);
      }
    else {
      if (Array.isArray(_.__webglFramebuffer))
        for (let q = 0; q < _.__webglFramebuffer.length; q++) i.deleteFramebuffer(_.__webglFramebuffer[q]);
      else
        i.deleteFramebuffer(_.__webglFramebuffer);
      if (_.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && i.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer)
        for (let q = 0; q < _.__webglColorRenderbuffer.length; q++)
          _.__webglColorRenderbuffer[q] && i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);
      _.__webglDepthRenderbuffer && i.deleteRenderbuffer(_.__webglDepthRenderbuffer);
    }
    const O = b.textures;
    for (let q = 0, Z = O.length; q < Z; q++) {
      const X = n.get(O[q]);
      X.__webglTexture && (i.deleteTexture(X.__webglTexture), o.memory.textures--), n.remove(O[q]);
    }
    n.remove(b);
  }
  let w = 0;
  function N() {
    w = 0;
  }
  function B() {
    const b = w;
    return b >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + b + " texture units while this GPU supports only " + r.maxTextures), w += 1, b;
  }
  function W(b) {
    const _ = [];
    return _.push(b.wrapS), _.push(b.wrapT), _.push(b.wrapR || 0), _.push(b.magFilter), _.push(b.minFilter), _.push(b.anisotropy), _.push(b.internalFormat), _.push(b.format), _.push(b.type), _.push(b.generateMipmaps), _.push(b.premultiplyAlpha), _.push(b.flipY), _.push(b.unpackAlignment), _.push(b.colorSpace), _.join();
  }
  function K(b, _) {
    const O = n.get(b);
    if (b.isVideoTexture && Se(b), b.isRenderTargetTexture === !1 && b.version > 0 && O.__version !== b.version) {
      const q = b.image;
      if (q === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Y(O, b, _);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, O.__webglTexture, i.TEXTURE0 + _);
  }
  function G(b, _) {
    const O = n.get(b);
    if (b.version > 0 && O.__version !== b.version) {
      Y(O, b, _);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, O.__webglTexture, i.TEXTURE0 + _);
  }
  function $(b, _) {
    const O = n.get(b);
    if (b.version > 0 && O.__version !== b.version) {
      Y(O, b, _);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, O.__webglTexture, i.TEXTURE0 + _);
  }
  function H(b, _) {
    const O = n.get(b);
    if (b.version > 0 && O.__version !== b.version) {
      ee(O, b, _);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, O.__webglTexture, i.TEXTURE0 + _);
  }
  const te = {
    [ms]: i.REPEAT,
    [Nn]: i.CLAMP_TO_EDGE,
    [_s]: i.MIRRORED_REPEAT
  }, ie = {
    [zt]: i.NEAREST,
    [gc]: i.NEAREST_MIPMAP_NEAREST,
    [Ni]: i.NEAREST_MIPMAP_LINEAR,
    [Wt]: i.LINEAR,
    [Tr]: i.LINEAR_MIPMAP_NEAREST,
    [Fn]: i.LINEAR_MIPMAP_LINEAR
  }, fe = {
    [Ec]: i.NEVER,
    [Rc]: i.ALWAYS,
    [yc]: i.LESS,
    [Oo]: i.LEQUAL,
    [bc]: i.EQUAL,
    [wc]: i.GEQUAL,
    [Tc]: i.GREATER,
    [Ac]: i.NOTEQUAL
  };
  function Ae(b, _) {
    if (_.type === rn && e.has("OES_texture_float_linear") === !1 && (_.magFilter === Wt || _.magFilter === Tr || _.magFilter === Ni || _.magFilter === Fn || _.minFilter === Wt || _.minFilter === Tr || _.minFilter === Ni || _.minFilter === Fn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(b, i.TEXTURE_WRAP_S, te[_.wrapS]), i.texParameteri(b, i.TEXTURE_WRAP_T, te[_.wrapT]), (b === i.TEXTURE_3D || b === i.TEXTURE_2D_ARRAY) && i.texParameteri(b, i.TEXTURE_WRAP_R, te[_.wrapR]), i.texParameteri(b, i.TEXTURE_MAG_FILTER, ie[_.magFilter]), i.texParameteri(b, i.TEXTURE_MIN_FILTER, ie[_.minFilter]), _.compareFunction && (i.texParameteri(b, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(b, i.TEXTURE_COMPARE_FUNC, fe[_.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (_.magFilter === zt || _.minFilter !== Ni && _.minFilter !== Fn || _.type === rn && e.has("OES_texture_float_linear") === !1) return;
      if (_.anisotropy > 1 || n.get(_).__currentAnisotropy) {
        const O = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(b, O.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, r.getMaxAnisotropy())), n.get(_).__currentAnisotropy = _.anisotropy;
      }
    }
  }
  function We(b, _) {
    let O = !1;
    b.__webglInit === void 0 && (b.__webglInit = !0, _.addEventListener("dispose", T));
    const q = _.source;
    let Z = p.get(q);
    Z === void 0 && (Z = {}, p.set(q, Z));
    const X = W(_);
    if (X !== b.__cacheKey) {
      Z[X] === void 0 && (Z[X] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, O = !0), Z[X].usedTimes++;
      const ve = Z[b.__cacheKey];
      ve !== void 0 && (Z[b.__cacheKey].usedTimes--, ve.usedTimes === 0 && S(_)), b.__cacheKey = X, b.__webglTexture = Z[X].texture;
    }
    return O;
  }
  function Y(b, _, O) {
    let q = i.TEXTURE_2D;
    (_.isDataArrayTexture || _.isCompressedArrayTexture) && (q = i.TEXTURE_2D_ARRAY), _.isData3DTexture && (q = i.TEXTURE_3D);
    const Z = We(b, _), X = _.source;
    t.bindTexture(q, b.__webglTexture, i.TEXTURE0 + O);
    const ve = n.get(X);
    if (X.version !== ve.__version || Z === !0) {
      t.activeTexture(i.TEXTURE0 + O);
      const ae = Ve.getPrimaries(Ve.workingColorSpace), he = _.colorSpace === xn ? null : Ve.getPrimaries(_.colorSpace), He = _.colorSpace === xn || ae === he ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, He);
      let J = g(_.image, !1, r.maxTextureSize);
      J = Qe(_, J);
      const ue = s.convert(_.format, _.colorSpace), Ee = s.convert(_.type);
      let be = A(_.internalFormat, ue, Ee, _.colorSpace, _.isVideoTexture);
      Ae(q, _);
      let de;
      const ke = _.mipmaps, Le = _.isVideoTexture !== !0, $e = ve.__version === void 0 || Z === !0, P = X.dataReady, re = F(_, J);
      if (_.isDepthTexture)
        be = y(_.format === fi, _.type), $e && (Le ? t.texStorage2D(i.TEXTURE_2D, 1, be, J.width, J.height) : t.texImage2D(i.TEXTURE_2D, 0, be, J.width, J.height, 0, ue, Ee, null));
      else if (_.isDataTexture)
        if (ke.length > 0) {
          Le && $e && t.texStorage2D(i.TEXTURE_2D, re, be, ke[0].width, ke[0].height);
          for (let V = 0, j = ke.length; V < j; V++)
            de = ke[V], Le ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, de.width, de.height, ue, Ee, de.data) : t.texImage2D(i.TEXTURE_2D, V, be, de.width, de.height, 0, ue, Ee, de.data);
          _.generateMipmaps = !1;
        } else
          Le ? ($e && t.texStorage2D(i.TEXTURE_2D, re, be, J.width, J.height), P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, J.width, J.height, ue, Ee, J.data)) : t.texImage2D(i.TEXTURE_2D, 0, be, J.width, J.height, 0, ue, Ee, J.data);
      else if (_.isCompressedTexture)
        if (_.isCompressedArrayTexture) {
          Le && $e && t.texStorage3D(i.TEXTURE_2D_ARRAY, re, be, ke[0].width, ke[0].height, J.depth);
          for (let V = 0, j = ke.length; V < j; V++)
            if (de = ke[V], _.format !== kt)
              if (ue !== null)
                if (Le) {
                  if (P)
                    if (_.layerUpdates.size > 0) {
                      const ce = ho(de.width, de.height, _.format, _.type);
                      for (const oe of _.layerUpdates) {
                        const Re = de.data.subarray(
                          oe * ce / de.data.BYTES_PER_ELEMENT,
                          (oe + 1) * ce / de.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, oe, de.width, de.height, 1, ue, Re);
                      }
                      _.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, de.width, de.height, J.depth, ue, de.data);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, V, be, de.width, de.height, J.depth, 0, de.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Le ? P && t.texSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, de.width, de.height, J.depth, ue, Ee, de.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, V, be, de.width, de.height, J.depth, 0, ue, Ee, de.data);
        } else {
          Le && $e && t.texStorage2D(i.TEXTURE_2D, re, be, ke[0].width, ke[0].height);
          for (let V = 0, j = ke.length; V < j; V++)
            de = ke[V], _.format !== kt ? ue !== null ? Le ? P && t.compressedTexSubImage2D(i.TEXTURE_2D, V, 0, 0, de.width, de.height, ue, de.data) : t.compressedTexImage2D(i.TEXTURE_2D, V, be, de.width, de.height, 0, de.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Le ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, de.width, de.height, ue, Ee, de.data) : t.texImage2D(i.TEXTURE_2D, V, be, de.width, de.height, 0, ue, Ee, de.data);
        }
      else if (_.isDataArrayTexture)
        if (Le) {
          if ($e && t.texStorage3D(i.TEXTURE_2D_ARRAY, re, be, J.width, J.height, J.depth), P)
            if (_.layerUpdates.size > 0) {
              const V = ho(J.width, J.height, _.format, _.type);
              for (const j of _.layerUpdates) {
                const ce = J.data.subarray(
                  j * V / J.data.BYTES_PER_ELEMENT,
                  (j + 1) * V / J.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, j, J.width, J.height, 1, ue, Ee, ce);
              }
              _.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, ue, Ee, J.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, be, J.width, J.height, J.depth, 0, ue, Ee, J.data);
      else if (_.isData3DTexture)
        Le ? ($e && t.texStorage3D(i.TEXTURE_3D, re, be, J.width, J.height, J.depth), P && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, ue, Ee, J.data)) : t.texImage3D(i.TEXTURE_3D, 0, be, J.width, J.height, J.depth, 0, ue, Ee, J.data);
      else if (_.isFramebufferTexture) {
        if ($e)
          if (Le)
            t.texStorage2D(i.TEXTURE_2D, re, be, J.width, J.height);
          else {
            let V = J.width, j = J.height;
            for (let ce = 0; ce < re; ce++)
              t.texImage2D(i.TEXTURE_2D, ce, be, V, j, 0, ue, Ee, null), V >>= 1, j >>= 1;
          }
      } else if (ke.length > 0) {
        if (Le && $e) {
          const V = Me(ke[0]);
          t.texStorage2D(i.TEXTURE_2D, re, be, V.width, V.height);
        }
        for (let V = 0, j = ke.length; V < j; V++)
          de = ke[V], Le ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, ue, Ee, de) : t.texImage2D(i.TEXTURE_2D, V, be, ue, Ee, de);
        _.generateMipmaps = !1;
      } else if (Le) {
        if ($e) {
          const V = Me(J);
          t.texStorage2D(i.TEXTURE_2D, re, be, V.width, V.height);
        }
        P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, ue, Ee, J);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, be, ue, Ee, J);
      f(_) && u(q), ve.__version = X.version, _.onUpdate && _.onUpdate(_);
    }
    b.__version = _.version;
  }
  function ee(b, _, O) {
    if (_.image.length !== 6) return;
    const q = We(b, _), Z = _.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, b.__webglTexture, i.TEXTURE0 + O);
    const X = n.get(Z);
    if (Z.version !== X.__version || q === !0) {
      t.activeTexture(i.TEXTURE0 + O);
      const ve = Ve.getPrimaries(Ve.workingColorSpace), ae = _.colorSpace === xn ? null : Ve.getPrimaries(_.colorSpace), he = _.colorSpace === xn || ve === ae ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, he);
      const He = _.isCompressedTexture || _.image[0].isCompressedTexture, J = _.image[0] && _.image[0].isDataTexture, ue = [];
      for (let j = 0; j < 6; j++)
        !He && !J ? ue[j] = g(_.image[j], !0, r.maxCubemapSize) : ue[j] = J ? _.image[j].image : _.image[j], ue[j] = Qe(_, ue[j]);
      const Ee = ue[0], be = s.convert(_.format, _.colorSpace), de = s.convert(_.type), ke = A(_.internalFormat, be, de, _.colorSpace), Le = _.isVideoTexture !== !0, $e = X.__version === void 0 || q === !0, P = Z.dataReady;
      let re = F(_, Ee);
      Ae(i.TEXTURE_CUBE_MAP, _);
      let V;
      if (He) {
        Le && $e && t.texStorage2D(i.TEXTURE_CUBE_MAP, re, ke, Ee.width, Ee.height);
        for (let j = 0; j < 6; j++) {
          V = ue[j].mipmaps;
          for (let ce = 0; ce < V.length; ce++) {
            const oe = V[ce];
            _.format !== kt ? be !== null ? Le ? P && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, ce, 0, 0, oe.width, oe.height, be, oe.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, ce, ke, oe.width, oe.height, 0, oe.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, ce, 0, 0, oe.width, oe.height, be, de, oe.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, ce, ke, oe.width, oe.height, 0, be, de, oe.data);
          }
        }
      } else {
        if (V = _.mipmaps, Le && $e) {
          V.length > 0 && re++;
          const j = Me(ue[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, re, ke, j.width, j.height);
        }
        for (let j = 0; j < 6; j++)
          if (J) {
            Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, ue[j].width, ue[j].height, be, de, ue[j].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, ke, ue[j].width, ue[j].height, 0, be, de, ue[j].data);
            for (let ce = 0; ce < V.length; ce++) {
              const Re = V[ce].image[j].image;
              Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, ce + 1, 0, 0, Re.width, Re.height, be, de, Re.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, ce + 1, ke, Re.width, Re.height, 0, be, de, Re.data);
            }
          } else {
            Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, be, de, ue[j]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, ke, be, de, ue[j]);
            for (let ce = 0; ce < V.length; ce++) {
              const oe = V[ce];
              Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, ce + 1, 0, 0, be, de, oe.image[j]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, ce + 1, ke, be, de, oe.image[j]);
            }
          }
      }
      f(_) && u(i.TEXTURE_CUBE_MAP), X.__version = Z.version, _.onUpdate && _.onUpdate(_);
    }
    b.__version = _.version;
  }
  function ge(b, _, O, q, Z, X) {
    const ve = s.convert(O.format, O.colorSpace), ae = s.convert(O.type), he = A(O.internalFormat, ve, ae, O.colorSpace), He = n.get(_), J = n.get(O);
    if (J.__renderTarget = _, !He.__hasExternalTextures) {
      const ue = Math.max(1, _.width >> X), Ee = Math.max(1, _.height >> X);
      Z === i.TEXTURE_3D || Z === i.TEXTURE_2D_ARRAY ? t.texImage3D(Z, X, he, ue, Ee, _.depth, 0, ve, ae, null) : t.texImage2D(Z, X, he, ue, Ee, 0, ve, ae, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, b), Be(_) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, q, Z, J.__webglTexture, 0, Oe(_)) : (Z === i.TEXTURE_2D || Z >= i.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, q, Z, J.__webglTexture, X), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function se(b, _, O) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, b), _.depthBuffer) {
      const q = _.depthTexture, Z = q && q.isDepthTexture ? q.type : null, X = y(_.stencilBuffer, Z), ve = _.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ae = Oe(_);
      Be(_) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ae, X, _.width, _.height) : O ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ae, X, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, X, _.width, _.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, ve, i.RENDERBUFFER, b);
    } else {
      const q = _.textures;
      for (let Z = 0; Z < q.length; Z++) {
        const X = q[Z], ve = s.convert(X.format, X.colorSpace), ae = s.convert(X.type), he = A(X.internalFormat, ve, ae, X.colorSpace), He = Oe(_);
        O && Be(_) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, He, he, _.width, _.height) : Be(_) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, He, he, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, he, _.width, _.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function ye(b, _) {
    if (_ && _.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, b), !(_.depthTexture && _.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const q = n.get(_.depthTexture);
    q.__renderTarget = _, (!q.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = !0), K(_.depthTexture, 0);
    const Z = q.__webglTexture, X = Oe(_);
    if (_.depthTexture.format === oi)
      Be(_) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, Z, 0, X) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, Z, 0);
    else if (_.depthTexture.format === fi)
      Be(_) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, Z, 0, X) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, Z, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function we(b) {
    const _ = n.get(b), O = b.isWebGLCubeRenderTarget === !0;
    if (_.__boundDepthTexture !== b.depthTexture) {
      const q = b.depthTexture;
      if (_.__depthDisposeCallback && _.__depthDisposeCallback(), q) {
        const Z = () => {
          delete _.__boundDepthTexture, delete _.__depthDisposeCallback, q.removeEventListener("dispose", Z);
        };
        q.addEventListener("dispose", Z), _.__depthDisposeCallback = Z;
      }
      _.__boundDepthTexture = q;
    }
    if (b.depthTexture && !_.__autoAllocateDepthBuffer) {
      if (O) throw new Error("target.depthTexture not supported in Cube render targets");
      ye(_.__webglFramebuffer, b);
    } else if (O) {
      _.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer[q]), _.__webglDepthbuffer[q] === void 0)
          _.__webglDepthbuffer[q] = i.createRenderbuffer(), se(_.__webglDepthbuffer[q], b, !1);
        else {
          const Z = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, X = _.__webglDepthbuffer[q];
          i.bindRenderbuffer(i.RENDERBUFFER, X), i.framebufferRenderbuffer(i.FRAMEBUFFER, Z, i.RENDERBUFFER, X);
        }
    } else if (t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0)
      _.__webglDepthbuffer = i.createRenderbuffer(), se(_.__webglDepthbuffer, b, !1);
    else {
      const q = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = _.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, q, i.RENDERBUFFER, Z);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ue(b, _, O) {
    const q = n.get(b);
    _ !== void 0 && ge(q.__webglFramebuffer, b, b.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), O !== void 0 && we(b);
  }
  function nt(b) {
    const _ = b.texture, O = n.get(b), q = n.get(_);
    b.addEventListener("dispose", E);
    const Z = b.textures, X = b.isWebGLCubeRenderTarget === !0, ve = Z.length > 1;
    if (ve || (q.__webglTexture === void 0 && (q.__webglTexture = i.createTexture()), q.__version = _.version, o.memory.textures++), X) {
      O.__webglFramebuffer = [];
      for (let ae = 0; ae < 6; ae++)
        if (_.mipmaps && _.mipmaps.length > 0) {
          O.__webglFramebuffer[ae] = [];
          for (let he = 0; he < _.mipmaps.length; he++)
            O.__webglFramebuffer[ae][he] = i.createFramebuffer();
        } else
          O.__webglFramebuffer[ae] = i.createFramebuffer();
    } else {
      if (_.mipmaps && _.mipmaps.length > 0) {
        O.__webglFramebuffer = [];
        for (let ae = 0; ae < _.mipmaps.length; ae++)
          O.__webglFramebuffer[ae] = i.createFramebuffer();
      } else
        O.__webglFramebuffer = i.createFramebuffer();
      if (ve)
        for (let ae = 0, he = Z.length; ae < he; ae++) {
          const He = n.get(Z[ae]);
          He.__webglTexture === void 0 && (He.__webglTexture = i.createTexture(), o.memory.textures++);
        }
      if (b.samples > 0 && Be(b) === !1) {
        O.__webglMultisampledFramebuffer = i.createFramebuffer(), O.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, O.__webglMultisampledFramebuffer);
        for (let ae = 0; ae < Z.length; ae++) {
          const he = Z[ae];
          O.__webglColorRenderbuffer[ae] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, O.__webglColorRenderbuffer[ae]);
          const He = s.convert(he.format, he.colorSpace), J = s.convert(he.type), ue = A(he.internalFormat, He, J, he.colorSpace, b.isXRRenderTarget === !0), Ee = Oe(b);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Ee, ue, b.width, b.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ae, i.RENDERBUFFER, O.__webglColorRenderbuffer[ae]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), b.depthBuffer && (O.__webglDepthRenderbuffer = i.createRenderbuffer(), se(O.__webglDepthRenderbuffer, b, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (X) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, q.__webglTexture), Ae(i.TEXTURE_CUBE_MAP, _);
      for (let ae = 0; ae < 6; ae++)
        if (_.mipmaps && _.mipmaps.length > 0)
          for (let he = 0; he < _.mipmaps.length; he++)
            ge(O.__webglFramebuffer[ae][he], b, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, he);
        else
          ge(O.__webglFramebuffer[ae], b, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0);
      f(_) && u(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (ve) {
      for (let ae = 0, he = Z.length; ae < he; ae++) {
        const He = Z[ae], J = n.get(He);
        t.bindTexture(i.TEXTURE_2D, J.__webglTexture), Ae(i.TEXTURE_2D, He), ge(O.__webglFramebuffer, b, He, i.COLOR_ATTACHMENT0 + ae, i.TEXTURE_2D, 0), f(He) && u(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let ae = i.TEXTURE_2D;
      if ((b.isWebGL3DRenderTarget || b.isWebGLArrayRenderTarget) && (ae = b.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(ae, q.__webglTexture), Ae(ae, _), _.mipmaps && _.mipmaps.length > 0)
        for (let he = 0; he < _.mipmaps.length; he++)
          ge(O.__webglFramebuffer[he], b, _, i.COLOR_ATTACHMENT0, ae, he);
      else
        ge(O.__webglFramebuffer, b, _, i.COLOR_ATTACHMENT0, ae, 0);
      f(_) && u(ae), t.unbindTexture();
    }
    b.depthBuffer && we(b);
  }
  function ze(b) {
    const _ = b.textures;
    for (let O = 0, q = _.length; O < q; O++) {
      const Z = _[O];
      if (f(Z)) {
        const X = C(b), ve = n.get(Z).__webglTexture;
        t.bindTexture(X, ve), u(X), t.unbindTexture();
      }
    }
  }
  const rt = [], I = [];
  function Rt(b) {
    if (b.samples > 0) {
      if (Be(b) === !1) {
        const _ = b.textures, O = b.width, q = b.height;
        let Z = i.COLOR_BUFFER_BIT;
        const X = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ve = n.get(b), ae = _.length > 1;
        if (ae)
          for (let he = 0; he < _.length; he++)
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, ve.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ve.__webglFramebuffer);
        for (let he = 0; he < _.length; he++) {
          if (b.resolveDepthBuffer && (b.depthBuffer && (Z |= i.DEPTH_BUFFER_BIT), b.stencilBuffer && b.resolveStencilBuffer && (Z |= i.STENCIL_BUFFER_BIT)), ae) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ve.__webglColorRenderbuffer[he]);
            const He = n.get(_[he]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, He, 0);
          }
          i.blitFramebuffer(0, 0, O, q, 0, 0, O, q, Z, i.NEAREST), l === !0 && (rt.length = 0, I.length = 0, rt.push(i.COLOR_ATTACHMENT0 + he), b.depthBuffer && b.resolveDepthBuffer === !1 && (rt.push(X), I.push(X), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, I)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, rt));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ae)
          for (let he = 0; he < _.length; he++) {
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.RENDERBUFFER, ve.__webglColorRenderbuffer[he]);
            const He = n.get(_[he]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.TEXTURE_2D, He, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ve.__webglMultisampledFramebuffer);
      } else if (b.depthBuffer && b.resolveDepthBuffer === !1 && l) {
        const _ = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [_]);
      }
    }
  }
  function Oe(b) {
    return Math.min(r.maxSamples, b.samples);
  }
  function Be(b) {
    const _ = n.get(b);
    return b.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && _.__useRenderToTexture !== !1;
  }
  function Se(b) {
    const _ = o.render.frame;
    h.get(b) !== _ && (h.set(b, _), b.update());
  }
  function Qe(b, _) {
    const O = b.colorSpace, q = b.format, Z = b.type;
    return b.isCompressedTexture === !0 || b.isVideoTexture === !0 || O !== mi && O !== xn && (Ve.getTransfer(O) === Ke ? (q !== kt || Z !== ln) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", O)), _;
  }
  function Me(b) {
    return typeof HTMLImageElement < "u" && b instanceof HTMLImageElement ? (c.width = b.naturalWidth || b.width, c.height = b.naturalHeight || b.height) : typeof VideoFrame < "u" && b instanceof VideoFrame ? (c.width = b.displayWidth, c.height = b.displayHeight) : (c.width = b.width, c.height = b.height), c;
  }
  this.allocateTextureUnit = B, this.resetTextureUnits = N, this.setTexture2D = K, this.setTexture2DArray = G, this.setTexture3D = $, this.setTextureCube = H, this.rebindTextures = Ue, this.setupRenderTarget = nt, this.updateRenderTargetMipmap = ze, this.updateMultisampleRenderTarget = Rt, this.setupDepthRenderbuffer = we, this.setupFrameBufferTexture = ge, this.useMultisampledRTT = Be;
}
function Up(i, e) {
  function t(n, r = xn) {
    let s;
    const o = Ve.getTransfer(r);
    if (n === ln) return i.UNSIGNED_BYTE;
    if (n === js) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === Ks) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === Co) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === wo) return i.BYTE;
    if (n === Ro) return i.SHORT;
    if (n === wi) return i.UNSIGNED_SHORT;
    if (n === qs) return i.INT;
    if (n === On) return i.UNSIGNED_INT;
    if (n === rn) return i.FLOAT;
    if (n === Ri) return i.HALF_FLOAT;
    if (n === Po) return i.ALPHA;
    if (n === Lo) return i.RGB;
    if (n === kt) return i.RGBA;
    if (n === Do) return i.LUMINANCE;
    if (n === Io) return i.LUMINANCE_ALPHA;
    if (n === oi) return i.DEPTH_COMPONENT;
    if (n === fi) return i.DEPTH_STENCIL;
    if (n === Uo) return i.RED;
    if (n === Zs) return i.RED_INTEGER;
    if (n === No) return i.RG;
    if (n === $s) return i.RG_INTEGER;
    if (n === Js) return i.RGBA_INTEGER;
    if (n === or || n === lr || n === cr || n === hr)
      if (o === Ke)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === or) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === lr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === cr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === hr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === or) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === lr) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === cr) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === hr) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === gs || n === vs || n === xs || n === Ms)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === gs) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === vs) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === xs) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === Ms) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === Ss || n === Es || n === ys)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === Ss || n === Es) return o === Ke ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === ys) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === bs || n === Ts || n === As || n === ws || n === Rs || n === Cs || n === Ps || n === Ls || n === Ds || n === Is || n === Us || n === Ns || n === Fs || n === Os)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === bs) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === Ts) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === As) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === ws) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Rs) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Cs) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === Ps) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === Ls) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === Ds) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === Is) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === Us) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === Ns) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === Fs) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === Os) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === ur || n === Bs || n === ks)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === ur) return o === Ke ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === Bs) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === ks) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === Fo || n === zs || n === Hs || n === Vs)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === ur) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === zs) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === Hs) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === Vs) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === di ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
class Np extends Dt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class ri extends bt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Fp = { type: "move" };
class Qr {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new ri(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new ri(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new U(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new U()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new ri(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new U(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new U()), this._grip;
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
          const f = t.getJointPose(g, n), u = this._getHandJoint(c, g);
          f !== null && (u.matrix.fromArray(f.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = !0, u.jointRadius = f.radius), u.visible = f !== null;
        }
        const h = c.joints["index-finger-tip"], d = c.joints["thumb-tip"], p = h.position.distanceTo(d.position), m = 0.02, x = 5e-3;
        c.inputState.pinching && p > m + x ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && p <= m - x && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      a !== null && (r = t.getPose(e.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (a.matrix.fromArray(r.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(r.linearVelocity)) : a.hasLinearVelocity = !1, r.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(r.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(Fp)));
    }
    return a !== null && (a.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = o !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new ri();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const Op = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Bp = `
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
class kp {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t, n) {
    if (this.texture === null) {
      const r = new yt(), s = e.properties.get(r);
      s.__webglTexture = t.texture, (t.depthNear != n.depthNear || t.depthFar != n.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = r;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new yn({
        vertexShader: Op,
        fragmentShader: Bp,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Xt(new Er(20, 20), n);
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
class zp extends zn {
  constructor(e, t) {
    super();
    const n = this;
    let r = null, s = 1, o = null, a = "local-floor", l = 1, c = null, h = null, d = null, p = null, m = null, x = null;
    const g = new kp(), f = t.getContextAttributes();
    let u = null, C = null;
    const A = [], y = [], F = new Ie();
    let T = null;
    const E = new Dt();
    E.viewport = new st();
    const R = new Dt();
    R.viewport = new st();
    const S = [E, R], v = new Np();
    let w = null, N = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let ee = A[Y];
      return ee === void 0 && (ee = new Qr(), A[Y] = ee), ee.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let ee = A[Y];
      return ee === void 0 && (ee = new Qr(), A[Y] = ee), ee.getGripSpace();
    }, this.getHand = function(Y) {
      let ee = A[Y];
      return ee === void 0 && (ee = new Qr(), A[Y] = ee), ee.getHandSpace();
    };
    function B(Y) {
      const ee = y.indexOf(Y.inputSource);
      if (ee === -1)
        return;
      const ge = A[ee];
      ge !== void 0 && (ge.update(Y.inputSource, Y.frame, c || o), ge.dispatchEvent({ type: Y.type, data: Y.inputSource }));
    }
    function W() {
      r.removeEventListener("select", B), r.removeEventListener("selectstart", B), r.removeEventListener("selectend", B), r.removeEventListener("squeeze", B), r.removeEventListener("squeezestart", B), r.removeEventListener("squeezeend", B), r.removeEventListener("end", W), r.removeEventListener("inputsourceschange", K);
      for (let Y = 0; Y < A.length; Y++) {
        const ee = y[Y];
        ee !== null && (y[Y] = null, A[Y].disconnect(ee));
      }
      w = null, N = null, g.reset(), e.setRenderTarget(u), m = null, p = null, d = null, r = null, C = null, We.stop(), n.isPresenting = !1, e.setPixelRatio(T), e.setSize(F.width, F.height, !1), n.dispatchEvent({ type: "sessionend" });
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
      return p !== null ? p : m;
    }, this.getBinding = function() {
      return d;
    }, this.getFrame = function() {
      return x;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(Y) {
      if (r = Y, r !== null) {
        if (u = e.getRenderTarget(), r.addEventListener("select", B), r.addEventListener("selectstart", B), r.addEventListener("selectend", B), r.addEventListener("squeeze", B), r.addEventListener("squeezestart", B), r.addEventListener("squeezeend", B), r.addEventListener("end", W), r.addEventListener("inputsourceschange", K), f.xrCompatible !== !0 && await t.makeXRCompatible(), T = e.getPixelRatio(), e.getSize(F), r.renderState.layers === void 0) {
          const ee = {
            antialias: f.antialias,
            alpha: !0,
            depth: f.depth,
            stencil: f.stencil,
            framebufferScaleFactor: s
          };
          m = new XRWebGLLayer(r, t, ee), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), C = new Bn(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: kt,
              type: ln,
              colorSpace: e.outputColorSpace,
              stencilBuffer: f.stencil
            }
          );
        } else {
          let ee = null, ge = null, se = null;
          f.depth && (se = f.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, ee = f.stencil ? fi : oi, ge = f.stencil ? di : On);
          const ye = {
            colorFormat: t.RGBA8,
            depthFormat: se,
            scaleFactor: s
          };
          d = new XRWebGLBinding(r, t), p = d.createProjectionLayer(ye), r.updateRenderState({ layers: [p] }), e.setPixelRatio(1), e.setSize(p.textureWidth, p.textureHeight, !1), C = new Bn(
            p.textureWidth,
            p.textureHeight,
            {
              format: kt,
              type: ln,
              depthTexture: new Jo(p.textureWidth, p.textureHeight, ge, void 0, void 0, void 0, void 0, void 0, void 0, ee),
              stencilBuffer: f.stencil,
              colorSpace: e.outputColorSpace,
              samples: f.antialias ? 4 : 0,
              resolveDepthBuffer: p.ignoreDepthValues === !1
            }
          );
        }
        C.isXRRenderTarget = !0, this.setFoveation(l), c = null, o = await r.requestReferenceSpace(a), We.setContext(r), We.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return g.getDepthTexture();
    };
    function K(Y) {
      for (let ee = 0; ee < Y.removed.length; ee++) {
        const ge = Y.removed[ee], se = y.indexOf(ge);
        se >= 0 && (y[se] = null, A[se].disconnect(ge));
      }
      for (let ee = 0; ee < Y.added.length; ee++) {
        const ge = Y.added[ee];
        let se = y.indexOf(ge);
        if (se === -1) {
          for (let we = 0; we < A.length; we++)
            if (we >= y.length) {
              y.push(ge), se = we;
              break;
            } else if (y[we] === null) {
              y[we] = ge, se = we;
              break;
            }
          if (se === -1) break;
        }
        const ye = A[se];
        ye && ye.connect(ge);
      }
    }
    const G = new U(), $ = new U();
    function H(Y, ee, ge) {
      G.setFromMatrixPosition(ee.matrixWorld), $.setFromMatrixPosition(ge.matrixWorld);
      const se = G.distanceTo($), ye = ee.projectionMatrix.elements, we = ge.projectionMatrix.elements, Ue = ye[14] / (ye[10] - 1), nt = ye[14] / (ye[10] + 1), ze = (ye[9] + 1) / ye[5], rt = (ye[9] - 1) / ye[5], I = (ye[8] - 1) / ye[0], Rt = (we[8] + 1) / we[0], Oe = Ue * I, Be = Ue * Rt, Se = se / (-I + Rt), Qe = Se * -I;
      if (ee.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(Qe), Y.translateZ(Se), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), ye[10] === -1)
        Y.projectionMatrix.copy(ee.projectionMatrix), Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse);
      else {
        const Me = Ue + Se, b = nt + Se, _ = Oe - Qe, O = Be + (se - Qe), q = ze * nt / b * Me, Z = rt * nt / b * Me;
        Y.projectionMatrix.makePerspective(_, O, q, Z, Me, b), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function te(Y, ee) {
      ee === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(ee.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (r === null) return;
      let ee = Y.near, ge = Y.far;
      g.texture !== null && (g.depthNear > 0 && (ee = g.depthNear), g.depthFar > 0 && (ge = g.depthFar)), v.near = R.near = E.near = ee, v.far = R.far = E.far = ge, (w !== v.near || N !== v.far) && (r.updateRenderState({
        depthNear: v.near,
        depthFar: v.far
      }), w = v.near, N = v.far), E.layers.mask = Y.layers.mask | 2, R.layers.mask = Y.layers.mask | 4, v.layers.mask = E.layers.mask | R.layers.mask;
      const se = Y.parent, ye = v.cameras;
      te(v, se);
      for (let we = 0; we < ye.length; we++)
        te(ye[we], se);
      ye.length === 2 ? H(v, E, R) : v.projectionMatrix.copy(E.projectionMatrix), ie(Y, v, se);
    };
    function ie(Y, ee, ge) {
      ge === null ? Y.matrix.copy(ee.matrixWorld) : (Y.matrix.copy(ge.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(ee.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(ee.projectionMatrix), Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = Gs * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return v;
    }, this.getFoveation = function() {
      if (!(p === null && m === null))
        return l;
    }, this.setFoveation = function(Y) {
      l = Y, p !== null && (p.fixedFoveation = Y), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return g.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return g.getMesh(v);
    };
    let fe = null;
    function Ae(Y, ee) {
      if (h = ee.getViewerPose(c || o), x = ee, h !== null) {
        const ge = h.views;
        m !== null && (e.setRenderTargetFramebuffer(C, m.framebuffer), e.setRenderTarget(C));
        let se = !1;
        ge.length !== v.cameras.length && (v.cameras.length = 0, se = !0);
        for (let we = 0; we < ge.length; we++) {
          const Ue = ge[we];
          let nt = null;
          if (m !== null)
            nt = m.getViewport(Ue);
          else {
            const rt = d.getViewSubImage(p, Ue);
            nt = rt.viewport, we === 0 && (e.setRenderTargetTextures(
              C,
              rt.colorTexture,
              p.ignoreDepthValues ? void 0 : rt.depthStencilTexture
            ), e.setRenderTarget(C));
          }
          let ze = S[we];
          ze === void 0 && (ze = new Dt(), ze.layers.enable(we), ze.viewport = new st(), S[we] = ze), ze.matrix.fromArray(Ue.transform.matrix), ze.matrix.decompose(ze.position, ze.quaternion, ze.scale), ze.projectionMatrix.fromArray(Ue.projectionMatrix), ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(), ze.viewport.set(nt.x, nt.y, nt.width, nt.height), we === 0 && (v.matrix.copy(ze.matrix), v.matrix.decompose(v.position, v.quaternion, v.scale)), se === !0 && v.cameras.push(ze);
        }
        const ye = r.enabledFeatures;
        if (ye && ye.includes("depth-sensing")) {
          const we = d.getDepthInformation(ge[0]);
          we && we.isValid && we.texture && g.init(e, we, r.renderState);
        }
      }
      for (let ge = 0; ge < A.length; ge++) {
        const se = y[ge], ye = A[ge];
        se !== null && ye !== void 0 && ye.update(se, ee, c || o);
      }
      fe && fe(Y, ee), ee.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: ee }), x = null;
    }
    const We = new Zo();
    We.setAnimationLoop(Ae), this.setAnimationLoop = function(Y) {
      fe = Y;
    }, this.dispose = function() {
    };
  }
}
const Ln = /* @__PURE__ */ new cn(), Hp = /* @__PURE__ */ new at();
function Vp(i, e) {
  function t(f, u) {
    f.matrixAutoUpdate === !0 && f.updateMatrix(), u.value.copy(f.matrix);
  }
  function n(f, u) {
    u.color.getRGB(f.fogColor.value, Yo(i)), u.isFog ? (f.fogNear.value = u.near, f.fogFar.value = u.far) : u.isFogExp2 && (f.fogDensity.value = u.density);
  }
  function r(f, u, C, A, y) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? s(f, u) : u.isMeshToonMaterial ? (s(f, u), d(f, u)) : u.isMeshPhongMaterial ? (s(f, u), h(f, u)) : u.isMeshStandardMaterial ? (s(f, u), p(f, u), u.isMeshPhysicalMaterial && m(f, u, y)) : u.isMeshMatcapMaterial ? (s(f, u), x(f, u)) : u.isMeshDepthMaterial ? s(f, u) : u.isMeshDistanceMaterial ? (s(f, u), g(f, u)) : u.isMeshNormalMaterial ? s(f, u) : u.isLineBasicMaterial ? (o(f, u), u.isLineDashedMaterial && a(f, u)) : u.isPointsMaterial ? l(f, u, C, A) : u.isSpriteMaterial ? c(f, u) : u.isShadowMaterial ? (f.color.value.copy(u.color), f.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function s(f, u) {
    f.opacity.value = u.opacity, u.color && f.diffuse.value.copy(u.color), u.emissive && f.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (f.map.value = u.map, t(u.map, f.mapTransform)), u.alphaMap && (f.alphaMap.value = u.alphaMap, t(u.alphaMap, f.alphaMapTransform)), u.bumpMap && (f.bumpMap.value = u.bumpMap, t(u.bumpMap, f.bumpMapTransform), f.bumpScale.value = u.bumpScale, u.side === Et && (f.bumpScale.value *= -1)), u.normalMap && (f.normalMap.value = u.normalMap, t(u.normalMap, f.normalMapTransform), f.normalScale.value.copy(u.normalScale), u.side === Et && f.normalScale.value.negate()), u.displacementMap && (f.displacementMap.value = u.displacementMap, t(u.displacementMap, f.displacementMapTransform), f.displacementScale.value = u.displacementScale, f.displacementBias.value = u.displacementBias), u.emissiveMap && (f.emissiveMap.value = u.emissiveMap, t(u.emissiveMap, f.emissiveMapTransform)), u.specularMap && (f.specularMap.value = u.specularMap, t(u.specularMap, f.specularMapTransform)), u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest);
    const C = e.get(u), A = C.envMap, y = C.envMapRotation;
    A && (f.envMap.value = A, Ln.copy(y), Ln.x *= -1, Ln.y *= -1, Ln.z *= -1, A.isCubeTexture && A.isRenderTargetTexture === !1 && (Ln.y *= -1, Ln.z *= -1), f.envMapRotation.value.setFromMatrix4(Hp.makeRotationFromEuler(Ln)), f.flipEnvMap.value = A.isCubeTexture && A.isRenderTargetTexture === !1 ? -1 : 1, f.reflectivity.value = u.reflectivity, f.ior.value = u.ior, f.refractionRatio.value = u.refractionRatio), u.lightMap && (f.lightMap.value = u.lightMap, f.lightMapIntensity.value = u.lightMapIntensity, t(u.lightMap, f.lightMapTransform)), u.aoMap && (f.aoMap.value = u.aoMap, f.aoMapIntensity.value = u.aoMapIntensity, t(u.aoMap, f.aoMapTransform));
  }
  function o(f, u) {
    f.diffuse.value.copy(u.color), f.opacity.value = u.opacity, u.map && (f.map.value = u.map, t(u.map, f.mapTransform));
  }
  function a(f, u) {
    f.dashSize.value = u.dashSize, f.totalSize.value = u.dashSize + u.gapSize, f.scale.value = u.scale;
  }
  function l(f, u, C, A) {
    f.diffuse.value.copy(u.color), f.opacity.value = u.opacity, f.size.value = u.size * C, f.scale.value = A * 0.5, u.map && (f.map.value = u.map, t(u.map, f.uvTransform)), u.alphaMap && (f.alphaMap.value = u.alphaMap, t(u.alphaMap, f.alphaMapTransform)), u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest);
  }
  function c(f, u) {
    f.diffuse.value.copy(u.color), f.opacity.value = u.opacity, f.rotation.value = u.rotation, u.map && (f.map.value = u.map, t(u.map, f.mapTransform)), u.alphaMap && (f.alphaMap.value = u.alphaMap, t(u.alphaMap, f.alphaMapTransform)), u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest);
  }
  function h(f, u) {
    f.specular.value.copy(u.specular), f.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function d(f, u) {
    u.gradientMap && (f.gradientMap.value = u.gradientMap);
  }
  function p(f, u) {
    f.metalness.value = u.metalness, u.metalnessMap && (f.metalnessMap.value = u.metalnessMap, t(u.metalnessMap, f.metalnessMapTransform)), f.roughness.value = u.roughness, u.roughnessMap && (f.roughnessMap.value = u.roughnessMap, t(u.roughnessMap, f.roughnessMapTransform)), u.envMap && (f.envMapIntensity.value = u.envMapIntensity);
  }
  function m(f, u, C) {
    f.ior.value = u.ior, u.sheen > 0 && (f.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), f.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (f.sheenColorMap.value = u.sheenColorMap, t(u.sheenColorMap, f.sheenColorMapTransform)), u.sheenRoughnessMap && (f.sheenRoughnessMap.value = u.sheenRoughnessMap, t(u.sheenRoughnessMap, f.sheenRoughnessMapTransform))), u.clearcoat > 0 && (f.clearcoat.value = u.clearcoat, f.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (f.clearcoatMap.value = u.clearcoatMap, t(u.clearcoatMap, f.clearcoatMapTransform)), u.clearcoatRoughnessMap && (f.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, t(u.clearcoatRoughnessMap, f.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (f.clearcoatNormalMap.value = u.clearcoatNormalMap, t(u.clearcoatNormalMap, f.clearcoatNormalMapTransform), f.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === Et && f.clearcoatNormalScale.value.negate())), u.dispersion > 0 && (f.dispersion.value = u.dispersion), u.iridescence > 0 && (f.iridescence.value = u.iridescence, f.iridescenceIOR.value = u.iridescenceIOR, f.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], f.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (f.iridescenceMap.value = u.iridescenceMap, t(u.iridescenceMap, f.iridescenceMapTransform)), u.iridescenceThicknessMap && (f.iridescenceThicknessMap.value = u.iridescenceThicknessMap, t(u.iridescenceThicknessMap, f.iridescenceThicknessMapTransform))), u.transmission > 0 && (f.transmission.value = u.transmission, f.transmissionSamplerMap.value = C.texture, f.transmissionSamplerSize.value.set(C.width, C.height), u.transmissionMap && (f.transmissionMap.value = u.transmissionMap, t(u.transmissionMap, f.transmissionMapTransform)), f.thickness.value = u.thickness, u.thicknessMap && (f.thicknessMap.value = u.thicknessMap, t(u.thicknessMap, f.thicknessMapTransform)), f.attenuationDistance.value = u.attenuationDistance, f.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (f.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (f.anisotropyMap.value = u.anisotropyMap, t(u.anisotropyMap, f.anisotropyMapTransform))), f.specularIntensity.value = u.specularIntensity, f.specularColor.value.copy(u.specularColor), u.specularColorMap && (f.specularColorMap.value = u.specularColorMap, t(u.specularColorMap, f.specularColorMapTransform)), u.specularIntensityMap && (f.specularIntensityMap.value = u.specularIntensityMap, t(u.specularIntensityMap, f.specularIntensityMapTransform));
  }
  function x(f, u) {
    u.matcap && (f.matcap.value = u.matcap);
  }
  function g(f, u) {
    const C = e.get(u).light;
    f.referencePosition.value.setFromMatrixPosition(C.matrixWorld), f.nearDistance.value = C.shadow.camera.near, f.farDistance.value = C.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function Gp(i, e, t, n) {
  let r = {}, s = {}, o = [];
  const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(C, A) {
    const y = A.program;
    n.uniformBlockBinding(C, y);
  }
  function c(C, A) {
    let y = r[C.id];
    y === void 0 && (x(C), y = h(C), r[C.id] = y, C.addEventListener("dispose", f));
    const F = A.program;
    n.updateUBOMapping(C, F);
    const T = e.render.frame;
    s[C.id] !== T && (p(C), s[C.id] = T);
  }
  function h(C) {
    const A = d();
    C.__bindingPointIndex = A;
    const y = i.createBuffer(), F = C.__size, T = C.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, y), i.bufferData(i.UNIFORM_BUFFER, F, T), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, A, y), y;
  }
  function d() {
    for (let C = 0; C < a; C++)
      if (o.indexOf(C) === -1)
        return o.push(C), C;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function p(C) {
    const A = r[C.id], y = C.uniforms, F = C.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, A);
    for (let T = 0, E = y.length; T < E; T++) {
      const R = Array.isArray(y[T]) ? y[T] : [y[T]];
      for (let S = 0, v = R.length; S < v; S++) {
        const w = R[S];
        if (m(w, T, S, F) === !0) {
          const N = w.__offset, B = Array.isArray(w.value) ? w.value : [w.value];
          let W = 0;
          for (let K = 0; K < B.length; K++) {
            const G = B[K], $ = g(G);
            typeof G == "number" || typeof G == "boolean" ? (w.__data[0] = G, i.bufferSubData(i.UNIFORM_BUFFER, N + W, w.__data)) : G.isMatrix3 ? (w.__data[0] = G.elements[0], w.__data[1] = G.elements[1], w.__data[2] = G.elements[2], w.__data[3] = 0, w.__data[4] = G.elements[3], w.__data[5] = G.elements[4], w.__data[6] = G.elements[5], w.__data[7] = 0, w.__data[8] = G.elements[6], w.__data[9] = G.elements[7], w.__data[10] = G.elements[8], w.__data[11] = 0) : (G.toArray(w.__data, W), W += $.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, N, w.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(C, A, y, F) {
    const T = C.value, E = A + "_" + y;
    if (F[E] === void 0)
      return typeof T == "number" || typeof T == "boolean" ? F[E] = T : F[E] = T.clone(), !0;
    {
      const R = F[E];
      if (typeof T == "number" || typeof T == "boolean") {
        if (R !== T)
          return F[E] = T, !0;
      } else if (R.equals(T) === !1)
        return R.copy(T), !0;
    }
    return !1;
  }
  function x(C) {
    const A = C.uniforms;
    let y = 0;
    const F = 16;
    for (let E = 0, R = A.length; E < R; E++) {
      const S = Array.isArray(A[E]) ? A[E] : [A[E]];
      for (let v = 0, w = S.length; v < w; v++) {
        const N = S[v], B = Array.isArray(N.value) ? N.value : [N.value];
        for (let W = 0, K = B.length; W < K; W++) {
          const G = B[W], $ = g(G), H = y % F, te = H % $.boundary, ie = H + te;
          y += te, ie !== 0 && F - ie < $.storage && (y += F - ie), N.__data = new Float32Array($.storage / Float32Array.BYTES_PER_ELEMENT), N.__offset = y, y += $.storage;
        }
      }
    }
    const T = y % F;
    return T > 0 && (y += F - T), C.__size = y, C.__cache = {}, this;
  }
  function g(C) {
    const A = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof C == "number" || typeof C == "boolean" ? (A.boundary = 4, A.storage = 4) : C.isVector2 ? (A.boundary = 8, A.storage = 8) : C.isVector3 || C.isColor ? (A.boundary = 16, A.storage = 12) : C.isVector4 ? (A.boundary = 16, A.storage = 16) : C.isMatrix3 ? (A.boundary = 48, A.storage = 48) : C.isMatrix4 ? (A.boundary = 64, A.storage = 64) : C.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", C), A;
  }
  function f(C) {
    const A = C.target;
    A.removeEventListener("dispose", f);
    const y = o.indexOf(A.__bindingPointIndex);
    o.splice(y, 1), i.deleteBuffer(r[A.id]), delete r[A.id], delete s[A.id];
  }
  function u() {
    for (const C in r)
      i.deleteBuffer(r[C]);
    o = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: u
  };
}
class Wp {
  constructor(e = {}) {
    const {
      canvas: t = Lc(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: d = !1,
      reverseDepthBuffer: p = !1
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
    let f = null, u = null;
    const C = [], A = [];
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
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = Lt, this.toneMapping = Sn, this.toneMappingExposure = 1;
    const y = this;
    let F = !1, T = 0, E = 0, R = null, S = -1, v = null;
    const w = new st(), N = new st();
    let B = null;
    const W = new qe(0);
    let K = 0, G = t.width, $ = t.height, H = 1, te = null, ie = null;
    const fe = new st(0, 0, G, $), Ae = new st(0, 0, G, $);
    let We = !1;
    const Y = new Ko();
    let ee = !1, ge = !1;
    const se = new at(), ye = new at(), we = new U(), Ue = new st(), nt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let ze = !1;
    function rt() {
      return R === null ? H : 1;
    }
    let I = n;
    function Rt(M, L) {
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
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${Ys}`), t.addEventListener("webglcontextlost", j, !1), t.addEventListener("webglcontextrestored", ce, !1), t.addEventListener("webglcontextcreationerror", oe, !1), I === null) {
        const L = "webgl2";
        if (I = Rt(L, M), I === null)
          throw Rt(L) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (M) {
      throw console.error("THREE.WebGLRenderer: " + M.message), M;
    }
    let Oe, Be, Se, Qe, Me, b, _, O, q, Z, X, ve, ae, he, He, J, ue, Ee, be, de, ke, Le, $e, P;
    function re() {
      Oe = new jd(I), Oe.init(), Le = new Up(I, Oe), Be = new Vd(I, Oe, e, Le), Se = new Lp(I, Oe), Be.reverseDepthBuffer && p && Se.buffers.depth.setReversed(!0), Qe = new $d(I), Me = new _p(), b = new Ip(I, Oe, Se, Me, Be, Le, Qe), _ = new Wd(y), O = new qd(y), q = new rh(I), $e = new zd(I, q), Z = new Kd(I, q, Qe, $e), X = new Qd(I, Z, q, Qe), be = new Jd(I, Be, b), J = new Gd(Me), ve = new mp(y, _, O, Oe, Be, $e, J), ae = new Vp(y, Me), he = new vp(), He = new bp(Oe), Ee = new kd(y, _, O, Se, X, m, l), ue = new Cp(y, X, Be), P = new Gp(I, Qe, Be, Se), de = new Hd(I, Oe, Qe), ke = new Zd(I, Oe, Qe), Qe.programs = ve.programs, y.capabilities = Be, y.extensions = Oe, y.properties = Me, y.renderLists = he, y.shadowMap = ue, y.state = Se, y.info = Qe;
    }
    re();
    const V = new zp(y, I);
    this.xr = V, this.getContext = function() {
      return I;
    }, this.getContextAttributes = function() {
      return I.getContextAttributes();
    }, this.forceContextLoss = function() {
      const M = Oe.get("WEBGL_lose_context");
      M && M.loseContext();
    }, this.forceContextRestore = function() {
      const M = Oe.get("WEBGL_lose_context");
      M && M.restoreContext();
    }, this.getPixelRatio = function() {
      return H;
    }, this.setPixelRatio = function(M) {
      M !== void 0 && (H = M, this.setSize(G, $, !1));
    }, this.getSize = function(M) {
      return M.set(G, $);
    }, this.setSize = function(M, L, k = !0) {
      if (V.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      G = M, $ = L, t.width = Math.floor(M * H), t.height = Math.floor(L * H), k === !0 && (t.style.width = M + "px", t.style.height = L + "px"), this.setViewport(0, 0, M, L);
    }, this.getDrawingBufferSize = function(M) {
      return M.set(G * H, $ * H).floor();
    }, this.setDrawingBufferSize = function(M, L, k) {
      G = M, $ = L, H = k, t.width = Math.floor(M * k), t.height = Math.floor(L * k), this.setViewport(0, 0, M, L);
    }, this.getCurrentViewport = function(M) {
      return M.copy(w);
    }, this.getViewport = function(M) {
      return M.copy(fe);
    }, this.setViewport = function(M, L, k, z) {
      M.isVector4 ? fe.set(M.x, M.y, M.z, M.w) : fe.set(M, L, k, z), Se.viewport(w.copy(fe).multiplyScalar(H).round());
    }, this.getScissor = function(M) {
      return M.copy(Ae);
    }, this.setScissor = function(M, L, k, z) {
      M.isVector4 ? Ae.set(M.x, M.y, M.z, M.w) : Ae.set(M, L, k, z), Se.scissor(N.copy(Ae).multiplyScalar(H).round());
    }, this.getScissorTest = function() {
      return We;
    }, this.setScissorTest = function(M) {
      Se.setScissorTest(We = M);
    }, this.setOpaqueSort = function(M) {
      te = M;
    }, this.setTransparentSort = function(M) {
      ie = M;
    }, this.getClearColor = function(M) {
      return M.copy(Ee.getClearColor());
    }, this.setClearColor = function() {
      Ee.setClearColor.apply(Ee, arguments);
    }, this.getClearAlpha = function() {
      return Ee.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ee.setClearAlpha.apply(Ee, arguments);
    }, this.clear = function(M = !0, L = !0, k = !0) {
      let z = 0;
      if (M) {
        let D = !1;
        if (R !== null) {
          const Q = R.texture.format;
          D = Q === Js || Q === $s || Q === Zs;
        }
        if (D) {
          const Q = R.texture.type, le = Q === ln || Q === On || Q === wi || Q === di || Q === js || Q === Ks, pe = Ee.getClearColor(), me = Ee.getClearAlpha(), Te = pe.r, Ce = pe.g, _e = pe.b;
          le ? (x[0] = Te, x[1] = Ce, x[2] = _e, x[3] = me, I.clearBufferuiv(I.COLOR, 0, x)) : (g[0] = Te, g[1] = Ce, g[2] = _e, g[3] = me, I.clearBufferiv(I.COLOR, 0, g));
        } else
          z |= I.COLOR_BUFFER_BIT;
      }
      L && (z |= I.DEPTH_BUFFER_BIT), k && (z |= I.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), I.clear(z);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", j, !1), t.removeEventListener("webglcontextrestored", ce, !1), t.removeEventListener("webglcontextcreationerror", oe, !1), he.dispose(), He.dispose(), Me.dispose(), _.dispose(), O.dispose(), X.dispose(), $e.dispose(), P.dispose(), ve.dispose(), V.dispose(), V.removeEventListener("sessionstart", ia), V.removeEventListener("sessionend", ra), bn.stop();
    };
    function j(M) {
      M.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), F = !0;
    }
    function ce() {
      console.log("THREE.WebGLRenderer: Context Restored."), F = !1;
      const M = Qe.autoReset, L = ue.enabled, k = ue.autoUpdate, z = ue.needsUpdate, D = ue.type;
      re(), Qe.autoReset = M, ue.enabled = L, ue.autoUpdate = k, ue.needsUpdate = z, ue.type = D;
    }
    function oe(M) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", M.statusMessage);
    }
    function Re(M) {
      const L = M.target;
      L.removeEventListener("dispose", Re), it(L);
    }
    function it(M) {
      ft(M), Me.remove(M);
    }
    function ft(M) {
      const L = Me.get(M).programs;
      L !== void 0 && (L.forEach(function(k) {
        ve.releaseProgram(k);
      }), M.isShaderMaterial && ve.releaseShaderCache(M));
    }
    this.renderBufferDirect = function(M, L, k, z, D, Q) {
      L === null && (L = nt);
      const le = D.isMesh && D.matrixWorld.determinant() < 0, pe = ol(M, L, k, z, D);
      Se.setMaterial(z, le);
      let me = k.index, Te = 1;
      if (z.wireframe === !0) {
        if (me = Z.getWireframeAttribute(k), me === void 0) return;
        Te = 2;
      }
      const Ce = k.drawRange, _e = k.attributes.position;
      let Ge = Ce.start * Te, Je = (Ce.start + Ce.count) * Te;
      Q !== null && (Ge = Math.max(Ge, Q.start * Te), Je = Math.min(Je, (Q.start + Q.count) * Te)), me !== null ? (Ge = Math.max(Ge, 0), Je = Math.min(Je, me.count)) : _e != null && (Ge = Math.max(Ge, 0), Je = Math.min(Je, _e.count));
      const et = Je - Ge;
      if (et < 0 || et === 1 / 0) return;
      $e.setup(D, z, pe, k, me);
      let xt, Xe = de;
      if (me !== null && (xt = q.get(me), Xe = ke, Xe.setIndex(xt)), D.isMesh)
        z.wireframe === !0 ? (Se.setLineWidth(z.wireframeLinewidth * rt()), Xe.setMode(I.LINES)) : Xe.setMode(I.TRIANGLES);
      else if (D.isLine) {
        let xe = z.linewidth;
        xe === void 0 && (xe = 1), Se.setLineWidth(xe * rt()), D.isLineSegments ? Xe.setMode(I.LINES) : D.isLineLoop ? Xe.setMode(I.LINE_LOOP) : Xe.setMode(I.LINE_STRIP);
      } else D.isPoints ? Xe.setMode(I.POINTS) : D.isSprite && Xe.setMode(I.TRIANGLES);
      if (D.isBatchedMesh)
        if (D._multiDrawInstances !== null)
          Xe.renderMultiDrawInstances(D._multiDrawStarts, D._multiDrawCounts, D._multiDrawCount, D._multiDrawInstances);
        else if (Oe.get("WEBGL_multi_draw"))
          Xe.renderMultiDraw(D._multiDrawStarts, D._multiDrawCounts, D._multiDrawCount);
        else {
          const xe = D._multiDrawStarts, jt = D._multiDrawCounts, Ye = D._multiDrawCount, Ut = me ? q.get(me).bytesPerElement : 1, Hn = Me.get(z).currentProgram.getUniforms();
          for (let Tt = 0; Tt < Ye; Tt++)
            Hn.setValue(I, "_gl_DrawID", Tt), Xe.render(xe[Tt] / Ut, jt[Tt]);
        }
      else if (D.isInstancedMesh)
        Xe.renderInstances(Ge, et, D.count);
      else if (k.isInstancedBufferGeometry) {
        const xe = k._maxInstanceCount !== void 0 ? k._maxInstanceCount : 1 / 0, jt = Math.min(k.instanceCount, xe);
        Xe.renderInstances(Ge, et, jt);
      } else
        Xe.render(Ge, et);
    };
    function je(M, L, k) {
      M.transparent === !0 && M.side === nn && M.forceSinglePass === !1 ? (M.side = Et, M.needsUpdate = !0, Ui(M, L, k), M.side = En, M.needsUpdate = !0, Ui(M, L, k), M.side = nn) : Ui(M, L, k);
    }
    this.compile = function(M, L, k = null) {
      k === null && (k = M), u = He.get(k), u.init(L), A.push(u), k.traverseVisible(function(D) {
        D.isLight && D.layers.test(L.layers) && (u.pushLight(D), D.castShadow && u.pushShadow(D));
      }), M !== k && M.traverseVisible(function(D) {
        D.isLight && D.layers.test(L.layers) && (u.pushLight(D), D.castShadow && u.pushShadow(D));
      }), u.setupLights();
      const z = /* @__PURE__ */ new Set();
      return M.traverse(function(D) {
        if (!(D.isMesh || D.isPoints || D.isLine || D.isSprite))
          return;
        const Q = D.material;
        if (Q)
          if (Array.isArray(Q))
            for (let le = 0; le < Q.length; le++) {
              const pe = Q[le];
              je(pe, k, D), z.add(pe);
            }
          else
            je(Q, k, D), z.add(Q);
      }), A.pop(), u = null, z;
    }, this.compileAsync = function(M, L, k = null) {
      const z = this.compile(M, L, k);
      return new Promise((D) => {
        function Q() {
          if (z.forEach(function(le) {
            Me.get(le).currentProgram.isReady() && z.delete(le);
          }), z.size === 0) {
            D(M);
            return;
          }
          setTimeout(Q, 10);
        }
        Oe.get("KHR_parallel_shader_compile") !== null ? Q() : setTimeout(Q, 10);
      });
    };
    let It = null;
    function qt(M) {
      It && It(M);
    }
    function ia() {
      bn.stop();
    }
    function ra() {
      bn.start();
    }
    const bn = new Zo();
    bn.setAnimationLoop(qt), typeof self < "u" && bn.setContext(self), this.setAnimationLoop = function(M) {
      It = M, V.setAnimationLoop(M), M === null ? bn.stop() : bn.start();
    }, V.addEventListener("sessionstart", ia), V.addEventListener("sessionend", ra), this.render = function(M, L) {
      if (L !== void 0 && L.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (F === !0) return;
      if (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(), L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(), V.enabled === !0 && V.isPresenting === !0 && (V.cameraAutoUpdate === !0 && V.updateCamera(L), L = V.getCamera()), M.isScene === !0 && M.onBeforeRender(y, M, L, R), u = He.get(M, A.length), u.init(L), A.push(u), ye.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), Y.setFromProjectionMatrix(ye), ge = this.localClippingEnabled, ee = J.init(this.clippingPlanes, ge), f = he.get(M, C.length), f.init(), C.push(f), V.enabled === !0 && V.isPresenting === !0) {
        const Q = y.xr.getDepthSensingMesh();
        Q !== null && br(Q, L, -1 / 0, y.sortObjects);
      }
      br(M, L, 0, y.sortObjects), f.finish(), y.sortObjects === !0 && f.sort(te, ie), ze = V.enabled === !1 || V.isPresenting === !1 || V.hasDepthSensing() === !1, ze && Ee.addToRenderList(f, M), this.info.render.frame++, ee === !0 && J.beginShadows();
      const k = u.state.shadowsArray;
      ue.render(k, M, L), ee === !0 && J.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const z = f.opaque, D = f.transmissive;
      if (u.setupLights(), L.isArrayCamera) {
        const Q = L.cameras;
        if (D.length > 0)
          for (let le = 0, pe = Q.length; le < pe; le++) {
            const me = Q[le];
            aa(z, D, M, me);
          }
        ze && Ee.render(M);
        for (let le = 0, pe = Q.length; le < pe; le++) {
          const me = Q[le];
          sa(f, M, me, me.viewport);
        }
      } else
        D.length > 0 && aa(z, D, M, L), ze && Ee.render(M), sa(f, M, L);
      R !== null && (b.updateMultisampleRenderTarget(R), b.updateRenderTargetMipmap(R)), M.isScene === !0 && M.onAfterRender(y, M, L), $e.resetDefaultState(), S = -1, v = null, A.pop(), A.length > 0 ? (u = A[A.length - 1], ee === !0 && J.setGlobalState(y.clippingPlanes, u.state.camera)) : u = null, C.pop(), C.length > 0 ? f = C[C.length - 1] : f = null;
    };
    function br(M, L, k, z) {
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
            z && Ue.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ye);
            const le = X.update(M), pe = M.material;
            pe.visible && f.push(M, le, pe, k, Ue.z, null);
          }
        } else if ((M.isMesh || M.isLine || M.isPoints) && (!M.frustumCulled || Y.intersectsObject(M))) {
          const le = X.update(M), pe = M.material;
          if (z && (M.boundingSphere !== void 0 ? (M.boundingSphere === null && M.computeBoundingSphere(), Ue.copy(M.boundingSphere.center)) : (le.boundingSphere === null && le.computeBoundingSphere(), Ue.copy(le.boundingSphere.center)), Ue.applyMatrix4(M.matrixWorld).applyMatrix4(ye)), Array.isArray(pe)) {
            const me = le.groups;
            for (let Te = 0, Ce = me.length; Te < Ce; Te++) {
              const _e = me[Te], Ge = pe[_e.materialIndex];
              Ge && Ge.visible && f.push(M, le, Ge, k, Ue.z, _e);
            }
          } else pe.visible && f.push(M, le, pe, k, Ue.z, null);
        }
      }
      const Q = M.children;
      for (let le = 0, pe = Q.length; le < pe; le++)
        br(Q[le], L, k, z);
    }
    function sa(M, L, k, z) {
      const D = M.opaque, Q = M.transmissive, le = M.transparent;
      u.setupLightsView(k), ee === !0 && J.setGlobalState(y.clippingPlanes, k), z && Se.viewport(w.copy(z)), D.length > 0 && Ii(D, L, k), Q.length > 0 && Ii(Q, L, k), le.length > 0 && Ii(le, L, k), Se.buffers.depth.setTest(!0), Se.buffers.depth.setMask(!0), Se.buffers.color.setMask(!0), Se.setPolygonOffset(!1);
    }
    function aa(M, L, k, z) {
      if ((k.isScene === !0 ? k.overrideMaterial : null) !== null)
        return;
      u.state.transmissionRenderTarget[z.id] === void 0 && (u.state.transmissionRenderTarget[z.id] = new Bn(1, 1, {
        generateMipmaps: !0,
        type: Oe.has("EXT_color_buffer_half_float") || Oe.has("EXT_color_buffer_float") ? Ri : ln,
        minFilter: Fn,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Ve.workingColorSpace
      }));
      const Q = u.state.transmissionRenderTarget[z.id], le = z.viewport || w;
      Q.setSize(le.z, le.w);
      const pe = y.getRenderTarget();
      y.setRenderTarget(Q), y.getClearColor(W), K = y.getClearAlpha(), K < 1 && y.setClearColor(16777215, 0.5), y.clear(), ze && Ee.render(k);
      const me = y.toneMapping;
      y.toneMapping = Sn;
      const Te = z.viewport;
      if (z.viewport !== void 0 && (z.viewport = void 0), u.setupLightsView(z), ee === !0 && J.setGlobalState(y.clippingPlanes, z), Ii(M, k, z), b.updateMultisampleRenderTarget(Q), b.updateRenderTargetMipmap(Q), Oe.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ce = !1;
        for (let _e = 0, Ge = L.length; _e < Ge; _e++) {
          const Je = L[_e], et = Je.object, xt = Je.geometry, Xe = Je.material, xe = Je.group;
          if (Xe.side === nn && et.layers.test(z.layers)) {
            const jt = Xe.side;
            Xe.side = Et, Xe.needsUpdate = !0, oa(et, k, z, xt, Xe, xe), Xe.side = jt, Xe.needsUpdate = !0, Ce = !0;
          }
        }
        Ce === !0 && (b.updateMultisampleRenderTarget(Q), b.updateRenderTargetMipmap(Q));
      }
      y.setRenderTarget(pe), y.setClearColor(W, K), Te !== void 0 && (z.viewport = Te), y.toneMapping = me;
    }
    function Ii(M, L, k) {
      const z = L.isScene === !0 ? L.overrideMaterial : null;
      for (let D = 0, Q = M.length; D < Q; D++) {
        const le = M[D], pe = le.object, me = le.geometry, Te = z === null ? le.material : z, Ce = le.group;
        pe.layers.test(k.layers) && oa(pe, L, k, me, Te, Ce);
      }
    }
    function oa(M, L, k, z, D, Q) {
      M.onBeforeRender(y, L, k, z, D, Q), M.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, M.matrixWorld), M.normalMatrix.getNormalMatrix(M.modelViewMatrix), D.onBeforeRender(y, L, k, z, M, Q), D.transparent === !0 && D.side === nn && D.forceSinglePass === !1 ? (D.side = Et, D.needsUpdate = !0, y.renderBufferDirect(k, L, z, D, M, Q), D.side = En, D.needsUpdate = !0, y.renderBufferDirect(k, L, z, D, M, Q), D.side = nn) : y.renderBufferDirect(k, L, z, D, M, Q), M.onAfterRender(y, L, k, z, D, Q);
    }
    function Ui(M, L, k) {
      L.isScene !== !0 && (L = nt);
      const z = Me.get(M), D = u.state.lights, Q = u.state.shadowsArray, le = D.state.version, pe = ve.getParameters(M, D.state, Q, L, k), me = ve.getProgramCacheKey(pe);
      let Te = z.programs;
      z.environment = M.isMeshStandardMaterial ? L.environment : null, z.fog = L.fog, z.envMap = (M.isMeshStandardMaterial ? O : _).get(M.envMap || z.environment), z.envMapRotation = z.environment !== null && M.envMap === null ? L.environmentRotation : M.envMapRotation, Te === void 0 && (M.addEventListener("dispose", Re), Te = /* @__PURE__ */ new Map(), z.programs = Te);
      let Ce = Te.get(me);
      if (Ce !== void 0) {
        if (z.currentProgram === Ce && z.lightsStateVersion === le)
          return ca(M, pe), Ce;
      } else
        pe.uniforms = ve.getUniforms(M), M.onBeforeCompile(pe, y), Ce = ve.acquireProgram(pe, me), Te.set(me, Ce), z.uniforms = pe.uniforms;
      const _e = z.uniforms;
      return (!M.isShaderMaterial && !M.isRawShaderMaterial || M.clipping === !0) && (_e.clippingPlanes = J.uniform), ca(M, pe), z.needsLights = cl(M), z.lightsStateVersion = le, z.needsLights && (_e.ambientLightColor.value = D.state.ambient, _e.lightProbe.value = D.state.probe, _e.directionalLights.value = D.state.directional, _e.directionalLightShadows.value = D.state.directionalShadow, _e.spotLights.value = D.state.spot, _e.spotLightShadows.value = D.state.spotShadow, _e.rectAreaLights.value = D.state.rectArea, _e.ltc_1.value = D.state.rectAreaLTC1, _e.ltc_2.value = D.state.rectAreaLTC2, _e.pointLights.value = D.state.point, _e.pointLightShadows.value = D.state.pointShadow, _e.hemisphereLights.value = D.state.hemi, _e.directionalShadowMap.value = D.state.directionalShadowMap, _e.directionalShadowMatrix.value = D.state.directionalShadowMatrix, _e.spotShadowMap.value = D.state.spotShadowMap, _e.spotLightMatrix.value = D.state.spotLightMatrix, _e.spotLightMap.value = D.state.spotLightMap, _e.pointShadowMap.value = D.state.pointShadowMap, _e.pointShadowMatrix.value = D.state.pointShadowMatrix), z.currentProgram = Ce, z.uniformsList = null, Ce;
    }
    function la(M) {
      if (M.uniformsList === null) {
        const L = M.currentProgram.getUniforms();
        M.uniformsList = fr.seqWithValue(L.seq, M.uniforms);
      }
      return M.uniformsList;
    }
    function ca(M, L) {
      const k = Me.get(M);
      k.outputColorSpace = L.outputColorSpace, k.batching = L.batching, k.batchingColor = L.batchingColor, k.instancing = L.instancing, k.instancingColor = L.instancingColor, k.instancingMorph = L.instancingMorph, k.skinning = L.skinning, k.morphTargets = L.morphTargets, k.morphNormals = L.morphNormals, k.morphColors = L.morphColors, k.morphTargetsCount = L.morphTargetsCount, k.numClippingPlanes = L.numClippingPlanes, k.numIntersection = L.numClipIntersection, k.vertexAlphas = L.vertexAlphas, k.vertexTangents = L.vertexTangents, k.toneMapping = L.toneMapping;
    }
    function ol(M, L, k, z, D) {
      L.isScene !== !0 && (L = nt), b.resetTextureUnits();
      const Q = L.fog, le = z.isMeshStandardMaterial ? L.environment : null, pe = R === null ? y.outputColorSpace : R.isXRRenderTarget === !0 ? R.texture.colorSpace : mi, me = (z.isMeshStandardMaterial ? O : _).get(z.envMap || le), Te = z.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4, Ce = !!k.attributes.tangent && (!!z.normalMap || z.anisotropy > 0), _e = !!k.morphAttributes.position, Ge = !!k.morphAttributes.normal, Je = !!k.morphAttributes.color;
      let et = Sn;
      z.toneMapped && (R === null || R.isXRRenderTarget === !0) && (et = y.toneMapping);
      const xt = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, Xe = xt !== void 0 ? xt.length : 0, xe = Me.get(z), jt = u.state.lights;
      if (ee === !0 && (ge === !0 || M !== v)) {
        const Ct = M === v && z.id === S;
        J.setState(z, M, Ct);
      }
      let Ye = !1;
      z.version === xe.__version ? (xe.needsLights && xe.lightsStateVersion !== jt.state.version || xe.outputColorSpace !== pe || D.isBatchedMesh && xe.batching === !1 || !D.isBatchedMesh && xe.batching === !0 || D.isBatchedMesh && xe.batchingColor === !0 && D.colorTexture === null || D.isBatchedMesh && xe.batchingColor === !1 && D.colorTexture !== null || D.isInstancedMesh && xe.instancing === !1 || !D.isInstancedMesh && xe.instancing === !0 || D.isSkinnedMesh && xe.skinning === !1 || !D.isSkinnedMesh && xe.skinning === !0 || D.isInstancedMesh && xe.instancingColor === !0 && D.instanceColor === null || D.isInstancedMesh && xe.instancingColor === !1 && D.instanceColor !== null || D.isInstancedMesh && xe.instancingMorph === !0 && D.morphTexture === null || D.isInstancedMesh && xe.instancingMorph === !1 && D.morphTexture !== null || xe.envMap !== me || z.fog === !0 && xe.fog !== Q || xe.numClippingPlanes !== void 0 && (xe.numClippingPlanes !== J.numPlanes || xe.numIntersection !== J.numIntersection) || xe.vertexAlphas !== Te || xe.vertexTangents !== Ce || xe.morphTargets !== _e || xe.morphNormals !== Ge || xe.morphColors !== Je || xe.toneMapping !== et || xe.morphTargetsCount !== Xe) && (Ye = !0) : (Ye = !0, xe.__version = z.version);
      let Ut = xe.currentProgram;
      Ye === !0 && (Ut = Ui(z, L, D));
      let Hn = !1, Tt = !1, gi = !1;
      const tt = Ut.getUniforms(), Ht = xe.uniforms;
      if (Se.useProgram(Ut.program) && (Hn = !0, Tt = !0, gi = !0), z.id !== S && (S = z.id, Tt = !0), Hn || v !== M) {
        Se.buffers.depth.getReversed() ? (se.copy(M.projectionMatrix), Ic(se), Uc(se), tt.setValue(I, "projectionMatrix", se)) : tt.setValue(I, "projectionMatrix", M.projectionMatrix), tt.setValue(I, "viewMatrix", M.matrixWorldInverse);
        const hn = tt.map.cameraPosition;
        hn !== void 0 && hn.setValue(I, we.setFromMatrixPosition(M.matrixWorld)), Be.logarithmicDepthBuffer && tt.setValue(
          I,
          "logDepthBufFC",
          2 / (Math.log(M.far + 1) / Math.LN2)
        ), (z.isMeshPhongMaterial || z.isMeshToonMaterial || z.isMeshLambertMaterial || z.isMeshBasicMaterial || z.isMeshStandardMaterial || z.isShaderMaterial) && tt.setValue(I, "isOrthographic", M.isOrthographicCamera === !0), v !== M && (v = M, Tt = !0, gi = !0);
      }
      if (D.isSkinnedMesh) {
        tt.setOptional(I, D, "bindMatrix"), tt.setOptional(I, D, "bindMatrixInverse");
        const Ct = D.skeleton;
        Ct && (Ct.boneTexture === null && Ct.computeBoneTexture(), tt.setValue(I, "boneTexture", Ct.boneTexture, b));
      }
      D.isBatchedMesh && (tt.setOptional(I, D, "batchingTexture"), tt.setValue(I, "batchingTexture", D._matricesTexture, b), tt.setOptional(I, D, "batchingIdTexture"), tt.setValue(I, "batchingIdTexture", D._indirectTexture, b), tt.setOptional(I, D, "batchingColorTexture"), D._colorsTexture !== null && tt.setValue(I, "batchingColorTexture", D._colorsTexture, b));
      const vi = k.morphAttributes;
      if ((vi.position !== void 0 || vi.normal !== void 0 || vi.color !== void 0) && be.update(D, k, Ut), (Tt || xe.receiveShadow !== D.receiveShadow) && (xe.receiveShadow = D.receiveShadow, tt.setValue(I, "receiveShadow", D.receiveShadow)), z.isMeshGouraudMaterial && z.envMap !== null && (Ht.envMap.value = me, Ht.flipEnvMap.value = me.isCubeTexture && me.isRenderTargetTexture === !1 ? -1 : 1), z.isMeshStandardMaterial && z.envMap === null && L.environment !== null && (Ht.envMapIntensity.value = L.environmentIntensity), Tt && (tt.setValue(I, "toneMappingExposure", y.toneMappingExposure), xe.needsLights && ll(Ht, gi), Q && z.fog === !0 && ae.refreshFogUniforms(Ht, Q), ae.refreshMaterialUniforms(Ht, z, H, $, u.state.transmissionRenderTarget[M.id]), fr.upload(I, la(xe), Ht, b)), z.isShaderMaterial && z.uniformsNeedUpdate === !0 && (fr.upload(I, la(xe), Ht, b), z.uniformsNeedUpdate = !1), z.isSpriteMaterial && tt.setValue(I, "center", D.center), tt.setValue(I, "modelViewMatrix", D.modelViewMatrix), tt.setValue(I, "normalMatrix", D.normalMatrix), tt.setValue(I, "modelMatrix", D.matrixWorld), z.isShaderMaterial || z.isRawShaderMaterial) {
        const Ct = z.uniformsGroups;
        for (let hn = 0, un = Ct.length; hn < un; hn++) {
          const ha = Ct[hn];
          P.update(ha, Ut), P.bind(ha, Ut);
        }
      }
      return Ut;
    }
    function ll(M, L) {
      M.ambientLightColor.needsUpdate = L, M.lightProbe.needsUpdate = L, M.directionalLights.needsUpdate = L, M.directionalLightShadows.needsUpdate = L, M.pointLights.needsUpdate = L, M.pointLightShadows.needsUpdate = L, M.spotLights.needsUpdate = L, M.spotLightShadows.needsUpdate = L, M.rectAreaLights.needsUpdate = L, M.hemisphereLights.needsUpdate = L;
    }
    function cl(M) {
      return M.isMeshLambertMaterial || M.isMeshToonMaterial || M.isMeshPhongMaterial || M.isMeshStandardMaterial || M.isShadowMaterial || M.isShaderMaterial && M.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return T;
    }, this.getActiveMipmapLevel = function() {
      return E;
    }, this.getRenderTarget = function() {
      return R;
    }, this.setRenderTargetTextures = function(M, L, k) {
      Me.get(M.texture).__webglTexture = L, Me.get(M.depthTexture).__webglTexture = k;
      const z = Me.get(M);
      z.__hasExternalTextures = !0, z.__autoAllocateDepthBuffer = k === void 0, z.__autoAllocateDepthBuffer || Oe.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), z.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(M, L) {
      const k = Me.get(M);
      k.__webglFramebuffer = L, k.__useDefaultFramebuffer = L === void 0;
    }, this.setRenderTarget = function(M, L = 0, k = 0) {
      R = M, T = L, E = k;
      let z = !0, D = null, Q = !1, le = !1;
      if (M) {
        const me = Me.get(M);
        if (me.__useDefaultFramebuffer !== void 0)
          Se.bindFramebuffer(I.FRAMEBUFFER, null), z = !1;
        else if (me.__webglFramebuffer === void 0)
          b.setupRenderTarget(M);
        else if (me.__hasExternalTextures)
          b.rebindTextures(M, Me.get(M.texture).__webglTexture, Me.get(M.depthTexture).__webglTexture);
        else if (M.depthBuffer) {
          const _e = M.depthTexture;
          if (me.__boundDepthTexture !== _e) {
            if (_e !== null && Me.has(_e) && (M.width !== _e.image.width || M.height !== _e.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            b.setupDepthRenderbuffer(M);
          }
        }
        const Te = M.texture;
        (Te.isData3DTexture || Te.isDataArrayTexture || Te.isCompressedArrayTexture) && (le = !0);
        const Ce = Me.get(M).__webglFramebuffer;
        M.isWebGLCubeRenderTarget ? (Array.isArray(Ce[L]) ? D = Ce[L][k] : D = Ce[L], Q = !0) : M.samples > 0 && b.useMultisampledRTT(M) === !1 ? D = Me.get(M).__webglMultisampledFramebuffer : Array.isArray(Ce) ? D = Ce[k] : D = Ce, w.copy(M.viewport), N.copy(M.scissor), B = M.scissorTest;
      } else
        w.copy(fe).multiplyScalar(H).floor(), N.copy(Ae).multiplyScalar(H).floor(), B = We;
      if (Se.bindFramebuffer(I.FRAMEBUFFER, D) && z && Se.drawBuffers(M, D), Se.viewport(w), Se.scissor(N), Se.setScissorTest(B), Q) {
        const me = Me.get(M.texture);
        I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_CUBE_MAP_POSITIVE_X + L, me.__webglTexture, k);
      } else if (le) {
        const me = Me.get(M.texture), Te = L || 0;
        I.framebufferTextureLayer(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, me.__webglTexture, k || 0, Te);
      }
      S = -1;
    }, this.readRenderTargetPixels = function(M, L, k, z, D, Q, le) {
      if (!(M && M.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let pe = Me.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && le !== void 0 && (pe = pe[le]), pe) {
        Se.bindFramebuffer(I.FRAMEBUFFER, pe);
        try {
          const me = M.texture, Te = me.format, Ce = me.type;
          if (!Be.textureFormatReadable(Te)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Be.textureTypeReadable(Ce)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          L >= 0 && L <= M.width - z && k >= 0 && k <= M.height - D && I.readPixels(L, k, z, D, Le.convert(Te), Le.convert(Ce), Q);
        } finally {
          const me = R !== null ? Me.get(R).__webglFramebuffer : null;
          Se.bindFramebuffer(I.FRAMEBUFFER, me);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(M, L, k, z, D, Q, le) {
      if (!(M && M.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let pe = Me.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && le !== void 0 && (pe = pe[le]), pe) {
        const me = M.texture, Te = me.format, Ce = me.type;
        if (!Be.textureFormatReadable(Te))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Be.textureTypeReadable(Ce))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (L >= 0 && L <= M.width - z && k >= 0 && k <= M.height - D) {
          Se.bindFramebuffer(I.FRAMEBUFFER, pe);
          const _e = I.createBuffer();
          I.bindBuffer(I.PIXEL_PACK_BUFFER, _e), I.bufferData(I.PIXEL_PACK_BUFFER, Q.byteLength, I.STREAM_READ), I.readPixels(L, k, z, D, Le.convert(Te), Le.convert(Ce), 0);
          const Ge = R !== null ? Me.get(R).__webglFramebuffer : null;
          Se.bindFramebuffer(I.FRAMEBUFFER, Ge);
          const Je = I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return I.flush(), await Dc(I, Je, 4), I.bindBuffer(I.PIXEL_PACK_BUFFER, _e), I.getBufferSubData(I.PIXEL_PACK_BUFFER, 0, Q), I.deleteBuffer(_e), I.deleteSync(Je), Q;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(M, L = null, k = 0) {
      M.isTexture !== !0 && (Ti("WebGLRenderer: copyFramebufferToTexture function signature has changed."), L = arguments[0] || null, M = arguments[1]);
      const z = Math.pow(2, -k), D = Math.floor(M.image.width * z), Q = Math.floor(M.image.height * z), le = L !== null ? L.x : 0, pe = L !== null ? L.y : 0;
      b.setTexture2D(M, 0), I.copyTexSubImage2D(I.TEXTURE_2D, k, 0, 0, le, pe, D, Q), Se.unbindTexture();
    }, this.copyTextureToTexture = function(M, L, k = null, z = null, D = 0) {
      M.isTexture !== !0 && (Ti("WebGLRenderer: copyTextureToTexture function signature has changed."), z = arguments[0] || null, M = arguments[1], L = arguments[2], D = arguments[3] || 0, k = null);
      let Q, le, pe, me, Te, Ce, _e, Ge, Je;
      const et = M.isCompressedTexture ? M.mipmaps[D] : M.image;
      k !== null ? (Q = k.max.x - k.min.x, le = k.max.y - k.min.y, pe = k.isBox3 ? k.max.z - k.min.z : 1, me = k.min.x, Te = k.min.y, Ce = k.isBox3 ? k.min.z : 0) : (Q = et.width, le = et.height, pe = et.depth || 1, me = 0, Te = 0, Ce = 0), z !== null ? (_e = z.x, Ge = z.y, Je = z.z) : (_e = 0, Ge = 0, Je = 0);
      const xt = Le.convert(L.format), Xe = Le.convert(L.type);
      let xe;
      L.isData3DTexture ? (b.setTexture3D(L, 0), xe = I.TEXTURE_3D) : L.isDataArrayTexture || L.isCompressedArrayTexture ? (b.setTexture2DArray(L, 0), xe = I.TEXTURE_2D_ARRAY) : (b.setTexture2D(L, 0), xe = I.TEXTURE_2D), I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, L.flipY), I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), I.pixelStorei(I.UNPACK_ALIGNMENT, L.unpackAlignment);
      const jt = I.getParameter(I.UNPACK_ROW_LENGTH), Ye = I.getParameter(I.UNPACK_IMAGE_HEIGHT), Ut = I.getParameter(I.UNPACK_SKIP_PIXELS), Hn = I.getParameter(I.UNPACK_SKIP_ROWS), Tt = I.getParameter(I.UNPACK_SKIP_IMAGES);
      I.pixelStorei(I.UNPACK_ROW_LENGTH, et.width), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, et.height), I.pixelStorei(I.UNPACK_SKIP_PIXELS, me), I.pixelStorei(I.UNPACK_SKIP_ROWS, Te), I.pixelStorei(I.UNPACK_SKIP_IMAGES, Ce);
      const gi = M.isDataArrayTexture || M.isData3DTexture, tt = L.isDataArrayTexture || L.isData3DTexture;
      if (M.isRenderTargetTexture || M.isDepthTexture) {
        const Ht = Me.get(M), vi = Me.get(L), Ct = Me.get(Ht.__renderTarget), hn = Me.get(vi.__renderTarget);
        Se.bindFramebuffer(I.READ_FRAMEBUFFER, Ct.__webglFramebuffer), Se.bindFramebuffer(I.DRAW_FRAMEBUFFER, hn.__webglFramebuffer);
        for (let un = 0; un < pe; un++)
          gi && I.framebufferTextureLayer(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, Me.get(M).__webglTexture, D, Ce + un), M.isDepthTexture ? (tt && I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, Me.get(L).__webglTexture, D, Je + un), I.blitFramebuffer(me, Te, Q, le, _e, Ge, Q, le, I.DEPTH_BUFFER_BIT, I.NEAREST)) : tt ? I.copyTexSubImage3D(xe, D, _e, Ge, Je + un, me, Te, Q, le) : I.copyTexSubImage2D(xe, D, _e, Ge, Je + un, me, Te, Q, le);
        Se.bindFramebuffer(I.READ_FRAMEBUFFER, null), Se.bindFramebuffer(I.DRAW_FRAMEBUFFER, null);
      } else
        tt ? M.isDataTexture || M.isData3DTexture ? I.texSubImage3D(xe, D, _e, Ge, Je, Q, le, pe, xt, Xe, et.data) : L.isCompressedArrayTexture ? I.compressedTexSubImage3D(xe, D, _e, Ge, Je, Q, le, pe, xt, et.data) : I.texSubImage3D(xe, D, _e, Ge, Je, Q, le, pe, xt, Xe, et) : M.isDataTexture ? I.texSubImage2D(I.TEXTURE_2D, D, _e, Ge, Q, le, xt, Xe, et.data) : M.isCompressedTexture ? I.compressedTexSubImage2D(I.TEXTURE_2D, D, _e, Ge, et.width, et.height, xt, et.data) : I.texSubImage2D(I.TEXTURE_2D, D, _e, Ge, Q, le, xt, Xe, et);
      I.pixelStorei(I.UNPACK_ROW_LENGTH, jt), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, Ye), I.pixelStorei(I.UNPACK_SKIP_PIXELS, Ut), I.pixelStorei(I.UNPACK_SKIP_ROWS, Hn), I.pixelStorei(I.UNPACK_SKIP_IMAGES, Tt), D === 0 && L.generateMipmaps && I.generateMipmap(xe), Se.unbindTexture();
    }, this.copyTextureToTexture3D = function(M, L, k = null, z = null, D = 0) {
      return M.isTexture !== !0 && (Ti("WebGLRenderer: copyTextureToTexture3D function signature has changed."), k = arguments[0] || null, z = arguments[1] || null, M = arguments[2], L = arguments[3], D = arguments[4] || 0), Ti('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(M, L, k, z, D);
    }, this.initRenderTarget = function(M) {
      Me.get(M).__webglFramebuffer === void 0 && b.setupRenderTarget(M);
    }, this.initTexture = function(M) {
      M.isCubeTexture ? b.setTextureCube(M, 0) : M.isData3DTexture ? b.setTexture3D(M, 0) : M.isDataArrayTexture || M.isCompressedArrayTexture ? b.setTexture2DArray(M, 0) : b.setTexture2D(M, 0), Se.unbindTexture();
    }, this.resetState = function() {
      T = 0, E = 0, R = null, Se.reset(), $e.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return sn;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorspace = Ve._getDrawingBufferColorSpace(e), t.unpackColorSpace = Ve._getUnpackColorSpace();
  }
}
class Xp extends bt {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new cn(), this.environmentIntensity = 1, this.environmentRotation = new cn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class il extends Li {
  static get type() {
    return "LineBasicMaterial";
  }
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.color = new qe(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const gr = /* @__PURE__ */ new U(), vr = /* @__PURE__ */ new U(), uo = /* @__PURE__ */ new at(), bi = /* @__PURE__ */ new Qs(), nr = /* @__PURE__ */ new Sr(), es = /* @__PURE__ */ new U(), fo = /* @__PURE__ */ new U();
class tn extends bt {
  constructor(e = new _t(), t = new il()) {
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
        gr.fromBufferAttribute(t, r - 1), vr.fromBufferAttribute(t, r), n[r] = n[r - 1], n[r] += gr.distanceTo(vr);
      e.setAttribute("lineDistance", new on(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.matrixWorld, s = e.params.Line.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), nr.copy(n.boundingSphere), nr.applyMatrix4(r), nr.radius += s, e.ray.intersectsSphere(nr) === !1) return;
    uo.copy(r).invert(), bi.copy(e.ray).applyMatrix4(uo);
    const a = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = this.isLineSegments ? 2 : 1, h = n.index, p = n.attributes.position;
    if (h !== null) {
      const m = Math.max(0, o.start), x = Math.min(h.count, o.start + o.count);
      for (let g = m, f = x - 1; g < f; g += c) {
        const u = h.getX(g), C = h.getX(g + 1), A = ir(this, e, bi, l, u, C);
        A && t.push(A);
      }
      if (this.isLineLoop) {
        const g = h.getX(x - 1), f = h.getX(m), u = ir(this, e, bi, l, g, f);
        u && t.push(u);
      }
    } else {
      const m = Math.max(0, o.start), x = Math.min(p.count, o.start + o.count);
      for (let g = m, f = x - 1; g < f; g += c) {
        const u = ir(this, e, bi, l, g, g + 1);
        u && t.push(u);
      }
      if (this.isLineLoop) {
        const g = ir(this, e, bi, l, x - 1, m);
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
function ir(i, e, t, n, r, s) {
  const o = i.geometry.attributes.position;
  if (gr.fromBufferAttribute(o, r), vr.fromBufferAttribute(o, s), t.distanceSqToSegment(gr, vr, es, fo) > n) return;
  es.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(es);
  if (!(l < e.near || l > e.far))
    return {
      distance: l,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: fo.clone().applyMatrix4(i.matrixWorld),
      index: r,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const po = /* @__PURE__ */ new U(), mo = /* @__PURE__ */ new U();
class _o extends tn {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let r = 0, s = t.count; r < s; r += 2)
        po.fromBufferAttribute(t, r), mo.fromBufferAttribute(t, r + 1), n[r] = r === 0 ? 0 : n[r - 1], n[r + 1] = n[r] + po.distanceTo(mo);
      e.setAttribute("lineDistance", new on(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class go {
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
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(vt(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Yp extends zn {
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
  revision: Ys
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Ys);
function qp(i) {
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
const jp = {
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
function ta(i) {
  return jp[i] ?? "#ffffff";
}
function Kp(i) {
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
function Zp(i) {
  var e;
  const t = (e = i == null ? void 0 : i.$INSUNITS) == null ? void 0 : e.value;
  return t === void 0 ? "unknown" : t === 1 || t === 2 || t === 8 || t === 9 || t === 10 ? "imperial" : t >= 4 && t <= 7 ? "metric" : "unknown";
}
const vo = 180 / Math.PI;
function $p(i) {
  return i.type === "ARC" && i.startAngle != null ? { ...i, startAngle: i.startAngle * vo, endAngle: i.endAngle * vo } : i;
}
function Jp(i, e, t, n, r, s, o, a) {
  const l = (i.x ?? 0) - (a.x ?? 0), c = (i.y ?? 0) - (a.y ?? 0), h = (i.z ?? 0) - (a.z ?? 0);
  return {
    x: l * t * s - c * n * o + (e.x ?? 0),
    y: l * t * o + c * n * s + (e.y ?? 0),
    z: h * r + (e.z ?? 0)
  };
}
function xo(i, e, t, n, r, s, o, a, l) {
  const c = (d) => Jp(d, e, t, n, r, s, o, a), h = { ...i };
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
function pr(i, e, t) {
  var n, r, s;
  const o = [];
  for (const a of i)
    if (a.type === "INSERT" && t < 8) {
      const l = e[a.name];
      if ((n = l == null ? void 0 : l.entities) != null && n.length) {
        const c = a.position ?? { x: 0, y: 0, z: 0 }, h = a.xScale ?? 1, d = a.yScale ?? 1, p = a.zScale ?? 1, m = (a.rotation ?? 0) * Math.PI / 180, x = Math.cos(m), g = Math.sin(m), f = l.position ?? { x: 0, y: 0, z: 0 }, u = a.layer ?? "0", C = pr(l.entities, e, t + 1);
        for (const F of C)
          o.push(xo(F, c, h, d, p, x, g, f, u));
        const A = a.rowCount ?? 1, y = a.columnCount ?? 1;
        if (A > 1 || y > 1) {
          const F = a.rowSpacing ?? 0, T = a.columnSpacing ?? 0;
          for (let E = 0; E < A; E++)
            for (let R = 0; R < y; R++) {
              if (E === 0 && R === 0) continue;
              const S = {
                x: c.x + R * T,
                y: c.y + E * F,
                z: c.z ?? 0
              }, v = pr(l.entities, e, t + 1);
              for (const w of v)
                o.push(xo(w, S, h, d, p, x, g, f, u));
            }
        }
      }
    } else if (a.type === "DIMENSION" && t < 8) {
      const l = a.block;
      if (l && (s = (r = e[l]) == null ? void 0 : r.entities) != null && s.length) {
        const c = pr(e[l].entities, e, t + 1);
        for (const h of c)
          o.push({ ...h, layer: h.layer || a.layer || "0" });
      }
      o.push(a);
    } else
      o.push($p(a));
  return o;
}
function Qp(i) {
  var e, t;
  const n = new kl().parseSync(i), r = ((t = (e = n == null ? void 0 : n.tables) == null ? void 0 : e.layer) == null ? void 0 : t.layers) ?? {}, s = Object.values(r).map((h) => {
    const d = h;
    return {
      name: String(d.name ?? "0"),
      color: Number(d.color ?? 7),
      colorHex: ta(Number(d.color ?? 7)),
      visible: !d.frozen,
      frozen: !!d.frozen,
      lineWeight: Number(d.lineWeight ?? 0)
    };
  });
  s.find((h) => h.name === "0") || s.unshift({ name: "0", color: 7, colorHex: "#ffffff", visible: !0, frozen: !1, lineWeight: 0 });
  const o = (n == null ? void 0 : n.blocks) ?? {}, a = (n == null ? void 0 : n.entities) ?? [], l = pr(a, o, 0), c = Kp(l);
  return {
    layers: s,
    entities: l,
    boundingBox: c,
    units: Zp(n == null ? void 0 : n.header),
    sourceFormat: "dxf"
  };
}
let ts = null;
const rr = 180 / Math.PI, ns = Math.PI * 2;
function em(i) {
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
function tm(i, e, t, n, r, s, o, a) {
  const l = i.x - a.x, c = i.y - a.y, h = (i.z ?? 0) - a.z;
  return {
    x: l * t * s - c * n * o + e.x,
    y: l * t * o + c * n * s + e.y,
    z: h * r + e.z
  };
}
function nm(i, e, t, n, r, s, o, a) {
  const l = (h) => tm(h, e, t, n, r, s, o, a), c = { ...i };
  return c.start && (c.start = l(c.start)), c.end && (c.end = l(c.end)), c.center && (c.center = l(c.center)), c.vertices && (c.vertices = c.vertices.map(l)), c.radius != null && (c.radius = c.radius * Math.max(Math.abs(t), Math.abs(n))), c;
}
function Xs(i, e, t = 0) {
  var n, r, s, o, a, l, c, h, d, p, m, x, g, f, u, C, A, y, F;
  const T = {
    layer: i.layer ?? "0",
    color: i.colorIndex ?? 256
    // 256 = ByLayer
  };
  switch (i.type) {
    case "LINE":
      return {
        ...T,
        type: "LINE",
        start: { x: i.startPoint.x, y: i.startPoint.y, z: i.startPoint.z ?? 0 },
        end: { x: i.endPoint.x, y: i.endPoint.y, z: i.endPoint.z ?? 0 }
      };
    case "CIRCLE":
      return {
        ...T,
        type: "CIRCLE",
        center: { x: i.center.x, y: i.center.y, z: i.center.z ?? 0 },
        radius: i.radius
      };
    case "ARC":
      return {
        ...T,
        type: "ARC",
        center: { x: i.center.x, y: i.center.y, z: i.center.z ?? 0 },
        radius: i.radius,
        startAngle: i.startAngle * rr,
        endAngle: i.endAngle * rr
      };
    case "LWPOLYLINE":
      return {
        ...T,
        type: "LWPOLYLINE",
        vertices: i.vertices.map((E) => ({ x: E.x, y: E.y })),
        shape: !!(i.flag & 1)
        // bit 0 = closed
      };
    case "POLYLINE":
    case "POLYLINE2D":
    // actual type name from @mlightcad/libredwg-web converter
    case "POLYLINE3D": {
      const E = i.vertices.map((R) => {
        var S, v, w;
        return {
          x: R.x ?? ((S = R.point) == null ? void 0 : S.x) ?? 0,
          y: R.y ?? ((v = R.point) == null ? void 0 : v.y) ?? 0,
          z: R.z ?? ((w = R.point) == null ? void 0 : w.z) ?? 0
        };
      });
      return E.length < 2 ? null : { ...T, type: "POLYLINE", vertices: E };
    }
    case "SPLINE": {
      const E = ((n = i.fitPoints) == null ? void 0 : n.length) > 0 ? i.fitPoints : i.controlPoints ?? [];
      return E.length < 2 ? null : {
        ...T,
        type: "POLYLINE",
        vertices: E.map((R) => ({ x: R.x, y: R.y, z: R.z ?? 0 }))
      };
    }
    case "ELLIPSE": {
      const E = ((r = i.center) == null ? void 0 : r.x) ?? 0, R = ((s = i.center) == null ? void 0 : s.y) ?? 0, S = ((o = i.center) == null ? void 0 : o.z) ?? 0, v = ((a = i.majorAxisEndPoint) == null ? void 0 : a.x) ?? 1, w = ((l = i.majorAxisEndPoint) == null ? void 0 : l.y) ?? 0, N = Math.sqrt(v * v + w * w);
      if (N === 0) return null;
      const B = Math.atan2(w, v), W = N * (i.axisRatio ?? 1), K = i.startAngle ?? 0;
      let G = i.endAngle ?? ns;
      G <= K && (G += ns);
      const $ = 72, H = [];
      for (let te = 0; te <= $; te++) {
        const ie = K + te / $ * (G - K), fe = Math.cos(ie) * N, Ae = Math.sin(ie) * W;
        H.push({
          x: E + fe * Math.cos(B) - Ae * Math.sin(B),
          y: R + fe * Math.sin(B) + Ae * Math.cos(B),
          z: S
        });
      }
      return { ...T, type: "POLYLINE", vertices: H };
    }
    case "SOLID": {
      const E = i.corner1 ?? { x: 0, y: 0 }, R = i.corner2 ?? E, S = i.corner3 ?? R, v = i.corner4 ?? S;
      return {
        ...T,
        type: "POLYLINE",
        vertices: [E, R, v, S, E].map((w) => ({
          x: w.x,
          y: w.y,
          z: w.z ?? 0
        }))
      };
    }
    case "3DFACE": {
      const E = i.corner1, R = i.corner2, S = i.corner3, v = i.corner4 ?? i.corner3;
      return !E || !R || !S ? null : {
        ...T,
        type: "3DFACE",
        vertices: [E, R, S, v].map((w) => ({
          x: w.x,
          y: w.y,
          z: w.z ?? 0
        }))
      };
    }
    case "LEADER": {
      const E = i.vertices ?? [];
      return E.length < 2 ? null : {
        ...T,
        type: "POLYLINE",
        vertices: E.map((R) => ({ x: R.x, y: R.y, z: R.z ?? 0 }))
      };
    }
    case "DIMENSION": {
      const E = i.name ?? "";
      if (!E) return null;
      const R = (((h = (c = e == null ? void 0 : e.tables) == null ? void 0 : c.BLOCK_RECORD) == null ? void 0 : h.entries) ?? []).find((v) => v.name === E);
      if (!((d = R == null ? void 0 : R.entities) != null && d.length)) return null;
      const S = [];
      for (const v of R.entities) {
        const w = Xs(v, e, t + 1);
        if (!w) continue;
        const N = Array.isArray(w) ? w : [w];
        S.push(...N);
      }
      return S.length > 0 ? S : null;
    }
    case "HATCH": {
      const E = i.boundaryPaths ?? [], R = [];
      for (const S of E) {
        const v = S.edges ?? [];
        for (const N of v)
          if (N.type === 1)
            R.push({ ...T, type: "LINE", start: N.start, end: N.end });
          else if (N.type === 2)
            R.push({
              ...T,
              type: "ARC",
              center: N.center,
              radius: N.radius,
              startAngle: N.startAngle * rr,
              endAngle: N.endAngle * rr
            });
          else if (N.type === 3)
            R.push({
              ...T,
              type: "ELLIPSE",
              center: N.center,
              majorAxisEndPoint: N.majorAxisEndPoint,
              axisRatio: N.minorToMajorRatio ?? 1,
              startAngle: N.startAngle ?? 0,
              endAngle: N.endAngle ?? ns
            });
          else if (N.type === 4) {
            const B = ((p = N.fitPoints) == null ? void 0 : p.length) > 0 ? N.fitPoints : N.controlPoints ?? [];
            B.length >= 2 && R.push({ ...T, type: "POLYLINE", vertices: B });
          }
        const w = S.polylineVertices ?? [];
        w.length >= 2 && R.push({
          ...T,
          type: "POLYLINE",
          vertices: w.map((N) => ({ x: N.x, y: N.y, z: 0 }))
        });
      }
      return R.length > 0 ? R : null;
    }
    case "INSERT": {
      if (t >= 8) return null;
      const E = i.name ?? "", R = (((x = (m = e == null ? void 0 : e.tables) == null ? void 0 : m.BLOCK_RECORD) == null ? void 0 : x.entries) ?? []).find((te) => te.name === E);
      if (!((g = R == null ? void 0 : R.entities) != null && g.length)) return null;
      const S = {
        x: ((f = i.insertionPoint) == null ? void 0 : f.x) ?? 0,
        y: ((u = i.insertionPoint) == null ? void 0 : u.y) ?? 0,
        z: ((C = i.insertionPoint) == null ? void 0 : C.z) ?? 0
      }, v = i.xScale ?? 1, w = i.yScale ?? 1, N = i.zScale ?? 1, B = i.rotation ?? 0, W = Math.cos(B), K = Math.sin(B), G = {
        x: ((A = R.basePoint) == null ? void 0 : A.x) ?? 0,
        y: ((y = R.basePoint) == null ? void 0 : y.y) ?? 0,
        z: ((F = R.basePoint) == null ? void 0 : F.z) ?? 0
      }, $ = i.layer ?? "0", H = [];
      for (const te of R.entities) {
        const ie = Xs(te, e, t + 1);
        if (!ie) continue;
        const fe = Array.isArray(ie) ? ie : [ie];
        for (const Ae of fe) {
          const We = nm(Ae, S, v, w, N, W, K, G);
          We.layer === "0" && (We.layer = $), H.push(We);
        }
      }
      return H.length > 0 ? H : null;
    }
    default:
      return null;
  }
}
async function im(i, e) {
  var t, n;
  if (!ts) {
    const { LibreDwg: h } = await import("./libredwg-web.js"), d = e == null ? void 0 : e.replace(/\/+$/, "");
    ts = await h.create(d);
  }
  const r = ts, s = r.dwg_read_data(i.buffer, 0);
  if (!s) throw new Error("Failed to parse DWG file");
  const o = r.convert(s);
  r.dwg_free(s);
  const a = (((n = (t = o.tables) == null ? void 0 : t.LAYER) == null ? void 0 : n.entries) ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (h) => ({
      name: String(h.name ?? "0"),
      color: Number(h.colorIndex ?? 7),
      colorHex: ta(Number(h.colorIndex ?? 7)),
      visible: !h.frozen && !h.off,
      frozen: !!h.frozen,
      lineWeight: Number(h.lineweight ?? 0)
    })
  );
  a.find((h) => h.name === "0") || a.unshift({ name: "0", color: 7, colorHex: "#ffffff", visible: !0, frozen: !1, lineWeight: 0 });
  const l = [];
  for (const h of o.entities ?? []) {
    const d = Xs(h, o, 0);
    d && (Array.isArray(d) ? l.push(...d) : l.push(d));
  }
  const c = em(l);
  return { layers: a, entities: l, boundingBox: c, units: "unknown", sourceFormat: "dwg" };
}
const Mo = { type: "change" }, na = { type: "start" }, rl = { type: "end" }, sr = new Qs(), So = new vn(), rm = Math.cos(70 * Pc.DEG2RAD), lt = new U(), St = 2 * Math.PI, Ze = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, is = 1e-6;
class sm extends Yp {
  constructor(e, t = null) {
    super(e, t), this.state = Ze.NONE, this.enabled = !0, this.target = new U(), this.cursor = new U(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: si.ROTATE, MIDDLE: si.DOLLY, RIGHT: si.PAN }, this.touches = { ONE: ni.ROTATE, TWO: ni.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new U(), this._lastQuaternion = new kn(), this._lastTargetPosition = new U(), this._quat = new kn().setFromUnitVectors(e.up, new U(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new go(), this._sphericalDelta = new go(), this._scale = 1, this._panOffset = new U(), this._rotateStart = new Ie(), this._rotateEnd = new Ie(), this._rotateDelta = new Ie(), this._panStart = new Ie(), this._panEnd = new Ie(), this._panDelta = new Ie(), this._dollyStart = new Ie(), this._dollyEnd = new Ie(), this._dollyDelta = new Ie(), this._dollyDirection = new U(), this._mouse = new Ie(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = om.bind(this), this._onPointerDown = am.bind(this), this._onPointerUp = lm.bind(this), this._onContextMenu = mm.bind(this), this._onMouseWheel = um.bind(this), this._onKeyDown = dm.bind(this), this._onTouchStart = fm.bind(this), this._onTouchMove = pm.bind(this), this._onMouseDown = cm.bind(this), this._onMouseMove = hm.bind(this), this._interceptControlDown = _m.bind(this), this._interceptControlUp = gm.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Mo), this.update(), this.state = Ze.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    lt.copy(t).sub(this.target), lt.applyQuaternion(this._quat), this._spherical.setFromVector3(lt), this.autoRotate && this.state === Ze.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
    isFinite(n) && isFinite(r) && (n < -Math.PI ? n += St : n > Math.PI && (n -= St), r < -Math.PI ? r += St : r > Math.PI && (r -= St), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let s = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), s = o != this._spherical.radius;
    }
    if (lt.setFromSpherical(this._spherical), lt.applyQuaternion(this._quatInverse), t.copy(this.target).add(lt), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = lt.length();
        o = this._clampDistance(a * this._scale);
        const l = a - o;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), s = !!l;
      } else if (this.object.isOrthographicCamera) {
        const a = new U(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), s = l !== this.object.zoom;
        const c = new U(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(a), this.object.updateMatrixWorld(), o = lt.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (sr.origin.copy(this.object.position), sr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(sr.direction)) < rm ? this.object.lookAt(this.target) : (So.setFromNormalAndCoplanarPoint(this.object.up, this.target), sr.intersectPlane(So, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), s = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, s || this._lastPosition.distanceToSquared(this.object.position) > is || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > is || this._lastTargetPosition.distanceToSquared(this.target) > is ? (this.dispatchEvent(Mo), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? St / 60 * this.autoRotateSpeed * e : St / 60 / 60 * this.autoRotateSpeed;
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
    lt.setFromMatrixColumn(t, 0), lt.multiplyScalar(-e), this._panOffset.add(lt);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? lt.setFromMatrixColumn(t, 1) : (lt.setFromMatrixColumn(t, 0), lt.crossVectors(this.object.up, lt)), lt.multiplyScalar(e), this._panOffset.add(lt);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const r = this.object.position;
      lt.copy(r).sub(this.target);
      let s = lt.length();
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
    this._rotateLeft(St * this._rotateDelta.x / t.clientHeight), this._rotateUp(St * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(St * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-St * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(St * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-St * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
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
    this._rotateLeft(St * this._rotateDelta.x / t.clientHeight), this._rotateUp(St * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    t === void 0 && (t = new Ie(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function am(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function om(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function lm(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(rl), this.state = Ze.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function cm(i) {
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
    case si.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(i), this.state = Ze.DOLLY;
      break;
    case si.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = Ze.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = Ze.ROTATE;
      }
      break;
    case si.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = Ze.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = Ze.PAN;
      }
      break;
    default:
      this.state = Ze.NONE;
  }
  this.state !== Ze.NONE && this.dispatchEvent(na);
}
function hm(i) {
  switch (this.state) {
    case Ze.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case Ze.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case Ze.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function um(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== Ze.NONE || (i.preventDefault(), this.dispatchEvent(na), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(rl));
}
function dm(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function fm(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case ni.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = Ze.TOUCH_ROTATE;
          break;
        case ni.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = Ze.TOUCH_PAN;
          break;
        default:
          this.state = Ze.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case ni.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = Ze.TOUCH_DOLLY_PAN;
          break;
        case ni.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(i), this.state = Ze.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = Ze.NONE;
      }
      break;
    default:
      this.state = Ze.NONE;
  }
  this.state !== Ze.NONE && this.dispatchEvent(na);
}
function pm(i) {
  switch (this._trackPointer(i), this.state) {
    case Ze.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case Ze.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case Ze.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case Ze.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = Ze.NONE;
  }
}
function mm(i) {
  this.enabled !== !1 && i.preventDefault();
}
function _m(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function gm(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class vm {
  constructor(e, t) {
    this.layerGroups = /* @__PURE__ */ new Map(), this.animationId = null, this.layers = [];
    const n = t.height ?? 400;
    this.is3D = t.mode === "3d", this.scene = new Xp(), this.scene.background = new qe(this.resolveBackground(t));
    const r = e.clientWidth / n;
    if (this.is3D) {
      const s = new Dt(45, r, 0.1, 1e7);
      s.position.set(0, -500, 500), s.up.set(0, 0, 1), this.camera = s;
    } else {
      const s = new $o(
        -r * 500,
        r * 500,
        500,
        -500,
        0.1,
        1e6
      );
      s.position.set(0, 0, 100), this.camera = s;
    }
    this.renderer = new Wp({ antialias: !0 }), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(e.clientWidth, n), e.appendChild(this.renderer.domElement), this.controls = new sm(this.camera, this.renderer.domElement), this.controls.enableRotate = this.is3D, this.controls.enableDamping = !0, this.controls.dampingFactor = 0.1, this.controls.screenSpacePanning = !0, this.startRenderLoop();
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
      const c = new ri();
      c.name = l.name, c.visible = l.visible, this.layerGroups.set(l.name, c), this.scene.add(c);
    }
    if (!this.layerGroups.has("0")) {
      const l = new ri();
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
      if (r !== 0 && r !== 256 && e.color != null)
        return "#" + e.color.toString(16).padStart(6, "0");
    } else if (e.color != null && e.color !== 256)
      return ta(e.color);
    const n = t.layers.find((r) => r.name === (e.layer ?? "0"));
    return (n == null ? void 0 : n.colorHex) ?? "#ffffff";
  }
  buildEntity(e, t, n, r, s) {
    const o = this.resolveEntityColor(e, t), a = new il({ color: o });
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
    ], d = new _t().setFromPoints(h);
    return new tn(d, t);
  }
  buildCircle(e, t, n, r, s) {
    var o, a, l;
    const c = (((o = e.center) == null ? void 0 : o.x) ?? e.x ?? 0) - n, h = (((a = e.center) == null ? void 0 : a.y) ?? e.y ?? 0) - r, d = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, p = e.radius ?? e.r ?? 1, m = 64, x = [];
    for (let f = 0; f <= m; f++) {
      const u = f / m * Math.PI * 2;
      x.push(new U(c + Math.cos(u) * p, h + Math.sin(u) * p, d));
    }
    const g = new _t().setFromPoints(x);
    return new tn(g, t);
  }
  buildArc(e, t, n, r, s) {
    var o, a, l;
    const c = (((o = e.center) == null ? void 0 : o.x) ?? e.x ?? 0) - n, h = (((a = e.center) == null ? void 0 : a.y) ?? e.y ?? 0) - r, d = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, p = e.radius ?? e.r ?? 1;
    let m = (e.startAngle ?? 0) * (Math.PI / 180), x = (e.endAngle ?? 360) * (Math.PI / 180);
    x < m && (x += Math.PI * 2);
    const g = 64, f = [];
    for (let C = 0; C <= g; C++) {
      const A = m + C / g * (x - m);
      f.push(new U(c + Math.cos(A) * p, h + Math.sin(A) * p, d));
    }
    const u = new _t().setFromPoints(f);
    return new tn(u, t);
  }
  buildPolyline(e, t, n, r, s) {
    if (!e.vertices || e.vertices.length < 2) return null;
    const o = e.vertices.map(
      (l) => new U(l.x - n, l.y - r, (l.z ?? 0) - s)
    );
    e.shape && o.push(o[0].clone());
    const a = new _t().setFromPoints(o);
    return new tn(a, t);
  }
  buildSpline(e, t, n, r, s) {
    var o;
    const a = (((o = e.fitPoints) == null ? void 0 : o.length) > 0 ? e.fitPoints : e.controlPoints) ?? [];
    if (a.length < 2) return null;
    const l = a.map(
      (h) => new U(h.x - n, h.y - r, (h.z ?? 0) - s)
    ), c = new _t().setFromPoints(l);
    return new tn(c, t);
  }
  buildEllipse(e, t, n, r, s) {
    var o, a, l, c, h;
    const d = (((o = e.center) == null ? void 0 : o.x) ?? 0) - n, p = (((a = e.center) == null ? void 0 : a.y) ?? 0) - r, m = (((l = e.center) == null ? void 0 : l.z) ?? 0) - s, x = ((c = e.majorAxisEndPoint) == null ? void 0 : c.x) ?? 1, g = ((h = e.majorAxisEndPoint) == null ? void 0 : h.y) ?? 0, f = Math.sqrt(x * x + g * g);
    if (f === 0) return null;
    const u = Math.atan2(g, x), C = f * (e.axisRatio ?? 1), A = e.startAngle ?? 0;
    let y = e.endAngle ?? Math.PI * 2;
    y <= A && (y += Math.PI * 2);
    const F = 72, T = [];
    for (let R = 0; R <= F; R++) {
      const S = A + R / F * (y - A), v = Math.cos(S) * f, w = Math.sin(S) * C;
      T.push(new U(
        d + v * Math.cos(u) - w * Math.sin(u),
        p + v * Math.sin(u) + w * Math.cos(u),
        m
      ));
    }
    const E = new _t().setFromPoints(T);
    return new tn(E, t);
  }
  buildSolid(e, t, n, r, s) {
    const o = e.points ?? e.vertices ?? [];
    if (o.length < 3) return null;
    const a = o[0], l = o[1], c = o[2], h = o[3] ?? o[2], d = [a, l, h, c, a].map((m) => new U(m.x - n, m.y - r, (m.z ?? 0) - s)), p = new _t().setFromPoints(d);
    return new tn(p, t);
  }
  buildFace3D(e, t, n, r, s) {
    const o = e.vertices;
    if (!o || o.length < 3) return null;
    const a = o.map((d) => new U(d.x - n, d.y - r, (d.z ?? 0) - s)), l = a[3] ?? a[2], c = [a[0], a[1], a[1], a[2], a[2], l, l, a[0]], h = new _t().setFromPoints(c);
    return new _o(h, t);
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
      if (e instanceof Xt || e instanceof tn || e instanceof _o) {
        e.geometry.dispose();
        const t = Array.isArray(e.material) ? e.material : [e.material];
        for (const n of t) n.dispose();
      }
    }), this.controls.dispose(), this.renderer.dispose(), this.renderer.domElement.remove();
  }
}
class xm {
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
      top: "8px",
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
      const p = document.createElement("span");
      p.textContent = l.name, p.style.overflow = "hidden", p.style.textOverflow = "ellipsis", p.style.whiteSpace = "nowrap", c.appendChild(h), c.appendChild(d), c.appendChild(p), this.panel.appendChild(c);
    }
    getComputedStyle(this.container).position === "static" && (this.container.style.position = "relative"), this.container.appendChild(this.panel);
  }
  dispose() {
    var e;
    (e = this.panel) == null || e.remove(), this.panel = null;
  }
}
function Mm() {
  return document.documentElement.getAttribute("data-theme") === "dark" || document.body.classList.contains("theme-dark");
}
async function Sm(i, e, t, n) {
  const r = n ?? {}, s = t.toLowerCase().endsWith(".dwg") ? await im(e, r.dwgWasmBaseUrl) : Qp(new TextDecoder().decode(e)), o = new vm(i, r);
  await o.loadDocument(s);
  const a = r.theme === "dark" || r.theme !== "light" && Mm(), l = r.showLayerPanel !== !1 ? new xm(i, (c, h) => {
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
function sl(i) {
  return async function(e, t, n, r) {
    const { filePath: s, options: o } = qp(t);
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
    return Sm(e, l, s, c);
  };
}
const al = {
  async readFile(i) {
    const e = await hl("read_file_binary", { path: i });
    return new Uint8Array(e);
  },
  resolvePath(i, e) {
    return e ? `${e.replace(/[/\\][^/\\]+$/, "")}/${i.replace(/^\.\//, "")}` : i;
  }
}, Em = sl(al);
function ym(i) {
  return {
    async readFile(e) {
      const t = await i(e);
      return typeof t == "string" ? new TextEncoder().encode(t) : Array.isArray(t) ? new Uint8Array(t) : t;
    },
    resolvePath: al.resolvePath
  };
}
const Am = {
  id: "cad-viewer",
  name: "CAD Viewer (DXF/DWG)",
  description: "Renders AutoCAD DXF/DWG engineering drawings inline. DWG support uses a GPLv3 WASM module loaded on demand.",
  stars: 0,
  npmPackage: "@morcad/moraya",
  exportName: "",
  sizeKb: 800,
  languages: ["morcad", "dxf", "dwg"],
  homepage: "https://github.com/zouwei/morcad",
  cdnUrl: "https://cdn.jsdelivr.net/gh/zouwei/morcad@main/packages/moraya/dist/index.bundle.js",
  isFilePathRenderer: !0,
  aiHint: "Use ```dxf for DXF files, ```dwg for DWG files, or ```morcad for parameter mode. Examples:\n```dxf\n./drawings/floor-plan.dxf\n```\n```morcad\nfile: ./drawings/floor-plan.dxf\nlayers: WALLS, DOORS\nheight: 500\n```",
  async render(i, e, t, n) {
    const r = document.documentElement.getAttribute("data-theme") === "dark";
    return typeof t == "function" ? sl(
      ym(t)
    )(i, e, n ?? null, r) : Em(i, e, n ?? null, r);
  }
};
export {
  Em as cadRender,
  Am as cadRendererPlugin,
  al as tauriFileAdapter
};
//# sourceMappingURL=index.bundle.js.map
