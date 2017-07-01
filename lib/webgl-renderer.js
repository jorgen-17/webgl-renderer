(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("webgl-renderer", [], factory);
	else if(typeof exports === 'object')
		exports["webgl-renderer"] = factory();
	else
		root["webgl-renderer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Float32Vector = (function () {
    function Float32Vector(arr) {
        if (arr === void 0) { arr = new Float32Array(0); }
        this.arr = arr;
        this.size = arr.length;
    }
    Float32Vector.prototype.addNumber = function (number) {
        var newSize = this.size + 1;
        if (newSize >= this.arr.length) {
            var oldArr = this.arr;
            this.arr = new Float32Array(newSize * 2);
            this.arr.set(oldArr);
        }
        this.arr[this.size] = number;
        this.size = newSize;
    };
    Float32Vector.prototype.addArray = function (arr) {
        var newSize = this.size + arr.length;
        if (newSize >= this.arr.length) {
            var oldArr = this.arr;
            this.arr = new Float32Array(newSize * 2);
            this.arr.set(oldArr);
        }
        this.arr.set(arr, this.size);
        this.size = newSize;
    };
    Float32Vector.prototype.getTrimmedArray = function () {
        return this.arr.slice(0, this.size);
    };
    return Float32Vector;
}());
exports.Float32Vector = Float32Vector;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Shape = (function () {
    function Shape(rgbColor) {
        this.rgbColor = rgbColor;
        this.vertexSize = 2;
        this.colorSize = 3;
    }
    Shape.prototype.addXYAndColorToFloat32Array = function (array, index, x, y) {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = this.rgbColor.red;
        array[index + 3] = this.rgbColor.green;
        array[index + 4] = this.rgbColor.blue;
    };
    return Shape;
}());
exports.Shape = Shape;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BoundingRectangle = (function () {
    function BoundingRectangle(point1, point2) {
        if (this.isTopLeftBottomRight(point1, point2)) {
            this.topLeft = point1;
            this.topRight = { x: point2.x, y: point1.y };
            this.bottomRight = point2;
            this.bottomLeft = { x: point1.x, y: point2.y };
        }
        else if (this.isBottomRightTopLeft(point1, point2)) {
            this.topLeft = point2;
            this.topRight = { x: point1.x, y: point2.y };
            this.bottomRight = point1;
            this.bottomLeft = { x: point2.x, y: point1.y };
        }
        else if (this.isBottomLeftTopRight(point1, point2)) {
            this.topLeft = { x: point1.x, y: point2.y };
            this.topRight = point2;
            this.bottomRight = { x: point2.x, y: point1.y };
            this.bottomLeft = point1;
        }
        else {
            this.topLeft = { x: point2.x, y: point1.y };
            this.topRight = point1;
            this.bottomRight = { x: point1.x, y: point2.y };
            this.bottomLeft = point2;
        }
    }
    BoundingRectangle.prototype.isTopLeftBottomRight = function (point1, point2) {
        return point1.x <= point2.x && point1.y >= point2.y;
    };
    BoundingRectangle.prototype.isBottomRightTopLeft = function (point1, point2) {
        return point1.x >= point2.x && point1.y <= point2.y;
    };
    BoundingRectangle.prototype.isBottomLeftTopRight = function (point1, point2) {
        return point1.x <= point2.x && point1.y <= point2.y;
    };
    return BoundingRectangle;
}());
exports.BoundingRectangle = BoundingRectangle;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Midpoint = (function () {
    function Midpoint() {
    }
    Midpoint.between = function (point1, point2) {
        var midX = (point1.x + point2.x) / 2;
        var midY = (point1.y + point2.y) / 2;
        return { x: midX, y: midY };
    };
    return Midpoint;
}());
exports.Midpoint = Midpoint;
var ThirdPoints = (function () {
    function ThirdPoints() {
    }
    ThirdPoints.between = function (point1, point2) {
        var largerX = Math.max(point1.x, point2.x);
        var smallerX = Math.min(point1.x, point2.x);
        var largerY = Math.max(point1.y, point2.y);
        var smallerY = Math.min(point1.y, point2.y);
        var thirdX = (largerX - smallerX) / 3;
        var thirdY = (largerY - smallerY) / 3;
        var firstThird = { x: smallerX + thirdX, y: smallerY + thirdY };
        var secondThird = { x: firstThird.x + thirdX, y: firstThird.y + thirdY };
        return { first: firstThird, second: secondThird };
    };
    return ThirdPoints;
}());
exports.ThirdPoints = ThirdPoints;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rgbColor_1 = __webpack_require__(5);
var Point3d = (function () {
    function Point3d(x, y, z, pointSize, color) {
        if (pointSize === void 0) { pointSize = 5; }
        if (color === void 0) { color = new rgbColor_1.RGBColor(0, 0, 0); }
        this.x = x;
        this.y = y;
        this.z = z;
        this.pointSize = pointSize;
        this.color = color;
    }
    return Point3d;
}());
exports.Point3d = Point3d;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RGBColor = (function () {
    function RGBColor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    return RGBColor;
}());
exports.RGBColor = RGBColor;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var drawingMode_1 = __webpack_require__(7);
var floatsPerPoint = 2;
var floatsPerColor = 3;
var floatsPerVertex = floatsPerPoint + floatsPerColor;
var defaultRenderMode = "points";
var defaultShapeMode = "points";
var defaultDrawingMode = drawingMode_1.DrawingMode.Verticies;
var defaultBackgroundColor = { red: 0.9, green: 0.9, blue: 0.9 };
var defaultColor = { red: 0.0, green: 0.0, blue: 0.0 };
exports.Settings = {
    floatsPerPoint: floatsPerPoint,
    floatsPerColor: floatsPerColor,
    floatsPerVertex: floatsPerVertex,
    vertexBufferFloatLimit: 65000,
    defaultAlpha: 1.0,
    defaultRendereMode: defaultRenderMode,
    defaultShapeMode: defaultShapeMode,
    defaultDrawingMode: defaultDrawingMode,
    defaultPointSize: 10,
    defaultBackgroundColor: defaultBackgroundColor,
    defaultColor: defaultColor
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DrawingMode;
(function (DrawingMode) {
    DrawingMode[DrawingMode["Shapes"] = 0] = "Shapes";
    DrawingMode[DrawingMode["Verticies"] = 1] = "Verticies";
})(DrawingMode = exports.DrawingMode || (exports.DrawingMode = {}));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var matrix4_1 = __webpack_require__(19);
var point3d_1 = __webpack_require__(4);
var Camera = (function () {
    function Camera(eyePosition, lookAtPoint, upPosition) {
        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;
        this._viewMatrix = new matrix4_1.Matrix4();
        this._viewMatrix.setLookAt(eyePosition.x, eyePosition.y, eyePosition.z, lookAtPoint.x, lookAtPoint.y, lookAtPoint.z, upPosition.x, upPosition.y, upPosition.z);
    }
    Camera.prototype.getViewMatrix = function () {
        return this._viewMatrix.elements;
    };
    Object.defineProperty(Camera.prototype, "eyePosition", {
        get: function () {
            return this._eyePosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "lookAtPoint", {
        get: function () {
            return this._lookAtPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "upPosition", {
        get: function () {
            return this._upPosition;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.setCameraView = function (eyePosition, lookAtPoint, upPosition) {
        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;
        this._viewMatrix.setLookAt(eyePosition.x, eyePosition.y, eyePosition.z, lookAtPoint.x, lookAtPoint.y, lookAtPoint.z, upPosition.x, upPosition.y, upPosition.z);
    };
    Camera.prototype.translateEyePosition = function (eyePosition) {
        var newLookAtPoint = new point3d_1.Point3d(eyePosition.x, eyePosition.y, eyePosition.z - 1);
        var newUpPosition = new point3d_1.Point3d(eyePosition.x, eyePosition.y + 1, eyePosition.z);
        this.setCameraView(eyePosition, newLookAtPoint, newUpPosition);
    };
    return Camera;
}());
exports.Camera = Camera;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(0);
var boundingRectangle_1 = __webpack_require__(2);
var midpoint_1 = __webpack_require__(3);
var precision_1 = __webpack_require__(10);
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(point1, point2, rgbColor, gl, precision) {
        var _this = _super.call(this, rgbColor) || this;
        var boundingRect = new boundingRectangle_1.BoundingRectangle(point1, point2);
        _this.horizontalRadius = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
        _this.verticalRadius = (boundingRect.topLeft.y - boundingRect.bottomLeft.y) / 2;
        if (precision === precision_1.Precision.High) {
            _this.numberOfInnerVerticies = 400;
            _this.numberOfVerticies = 403;
        }
        else if (precision === precision_1.Precision.Low) {
            _this.numberOfInnerVerticies = 8;
            _this.numberOfVerticies = 11;
        }
        _this.center = midpoint_1.Midpoint.between(boundingRect.topLeft, boundingRect.bottomRight);
        var vertexArray = _this.populateVerticies(boundingRect);
        _this.verticies = new vector_1.Float32Vector(vertexArray);
        _this.glRenderMode = gl.TRIANGLE_FAN;
        return _this;
    }
    Ellipse.prototype.populateVerticies = function (boundingRect) {
        var arr = new Float32Array(this.numberOfVerticies * 5);
        var x = boundingRect.topLeft.x;
        var xIncrement = (this.horizontalRadius * 2) / ((this.numberOfVerticies - 1) / 2);
        this.addXYAndColorToFloat32Array(arr, 0, x, boundingRect.topLeft.y - this.verticalRadius);
        var symmetryInsertionOffset = ((this.numberOfInnerVerticies / 2) * 5) + 5;
        var endPointX = boundingRect.topRight.x;
        var endPointY = boundingRect.topRight.y - this.verticalRadius;
        this.addXYAndColorToFloat32Array(arr, symmetryInsertionOffset, endPointX, endPointY);
        this.addXYAndColorToFloat32Array(arr, arr.length - 5, endPointX, endPointY);
        var insertionIndex = 5;
        for (var i = 0; i < this.numberOfInnerVerticies / 2; i++) {
            x += xIncrement;
            var y = this.getYDistanceFromCenterForX(x);
            this.addXYAndColorToFloat32Array(arr, insertionIndex, x, y + this.center.y);
            this.addXYAndColorToFloat32Array(arr, insertionIndex + symmetryInsertionOffset, x, this.center.y - y);
            insertionIndex += 5;
        }
        return arr;
    };
    Ellipse.prototype.getYDistanceFromCenterForX = function (x) {
        var verticalRadiusSquared = Math.pow(this.verticalRadius, 2);
        return Math.sqrt(verticalRadiusSquared -
            ((verticalRadiusSquared * Math.pow((x - this.center.x), 2)) / Math.pow(this.horizontalRadius, 2)));
    };
    return Ellipse;
}(shape_1.Shape));
exports.Ellipse = Ellipse;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Precision;
(function (Precision) {
    Precision[Precision["Low"] = 0] = "Low";
    Precision[Precision["High"] = 1] = "High";
})(Precision = exports.Precision || (exports.Precision = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(0);
var boundingRectangle_1 = __webpack_require__(2);
var midpoint_1 = __webpack_require__(3);
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(point1, point2, rgbColor, gl) {
        var _this = _super.call(this, rgbColor) || this;
        var boundingRect = new boundingRectangle_1.BoundingRectangle(point1, point2);
        var topPoint = midpoint_1.Midpoint.between(boundingRect.topLeft, boundingRect.topRight);
        var array = new Float32Array(15);
        _this.addXYAndColorToFloat32Array(array, 0, boundingRect.bottomLeft.x, boundingRect.bottomLeft.y);
        _this.addXYAndColorToFloat32Array(array, 5, topPoint.x, topPoint.y);
        _this.addXYAndColorToFloat32Array(array, 10, boundingRect.bottomRight.x, boundingRect.bottomRight.y);
        _this.verticies = new vector_1.Float32Vector(array);
        _this.numberOfVerticies = 3;
        _this.glRenderMode = gl.TRIANGLES;
        return _this;
    }
    return Triangle;
}(shape_1.Shape));
exports.Triangle = Triangle;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(0);
var boundingRectangle_1 = __webpack_require__(2);
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(point1, point2, rgbColor, gl) {
        var _this = _super.call(this, rgbColor) || this;
        var boundingRect = new boundingRectangle_1.BoundingRectangle(point1, point2);
        var array = new Float32Array(20);
        _this.addXYAndColorToFloat32Array(array, 0, boundingRect.topLeft.x, boundingRect.topLeft.y);
        _this.addXYAndColorToFloat32Array(array, 5, boundingRect.topRight.x, boundingRect.topRight.y);
        _this.addXYAndColorToFloat32Array(array, 10, boundingRect.bottomLeft.x, boundingRect.bottomLeft.y);
        _this.addXYAndColorToFloat32Array(array, 15, boundingRect.bottomRight.x, boundingRect.bottomRight.y);
        _this.verticies = new vector_1.Float32Vector(array);
        _this.numberOfVerticies = 4;
        _this.glRenderMode = gl.TRIANGLE_STRIP;
        return _this;
    }
    return Rectangle;
}(shape_1.Shape));
exports.Rectangle = Rectangle;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(0);
var boundingRectangle_1 = __webpack_require__(2);
var midpoint_1 = __webpack_require__(3);
var Hexagon = (function (_super) {
    __extends(Hexagon, _super);
    function Hexagon(point1, point2, rgbColor, gl) {
        var _this = _super.call(this, rgbColor) || this;
        var boundingRect = new boundingRectangle_1.BoundingRectangle(point1, point2);
        var vertexArray = _this.populateVerticies(boundingRect);
        _this.verticies = new vector_1.Float32Vector(vertexArray);
        _this.numberOfVerticies = 6;
        _this.glRenderMode = gl.TRIANGLE_FAN;
        return _this;
    }
    Hexagon.prototype.populateVerticies = function (boundingRect) {
        var arr = new Float32Array(30);
        var _a = midpoint_1.ThirdPoints.between(boundingRect.topLeft, boundingRect.topRight), first = _a.first, second = _a.second;
        this.addXYAndColorToFloat32Array(arr, 0, first.x, first.y);
        this.addXYAndColorToFloat32Array(arr, 5, second.x, second.y);
        var mid = midpoint_1.Midpoint.between(boundingRect.topRight, boundingRect.bottomRight);
        this.addXYAndColorToFloat32Array(arr, 10, mid.x, mid.y);
        (_b = midpoint_1.ThirdPoints.between(boundingRect.bottomRight, boundingRect.bottomLeft), first = _b.first, second = _b.second);
        this.addXYAndColorToFloat32Array(arr, 15, second.x, second.y);
        this.addXYAndColorToFloat32Array(arr, 20, first.x, first.y);
        mid = midpoint_1.Midpoint.between(boundingRect.bottomLeft, boundingRect.topLeft);
        this.addXYAndColorToFloat32Array(arr, 25, mid.x, mid.y);
        return arr;
        var _b;
    };
    return Hexagon;
}(shape_1.Shape));
exports.Hexagon = Hexagon;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(0);
var boundingRectangle_1 = __webpack_require__(2);
var midpoint_1 = __webpack_require__(3);
var Octogon = (function (_super) {
    __extends(Octogon, _super);
    function Octogon(point1, point2, rgbColor, gl) {
        var _this = _super.call(this, rgbColor) || this;
        var boundingRect = new boundingRectangle_1.BoundingRectangle(point1, point2);
        var vertexArray = _this.populateVerticies(boundingRect);
        _this.verticies = new vector_1.Float32Vector(vertexArray);
        _this.numberOfVerticies = 8;
        _this.glRenderMode = gl.TRIANGLE_FAN;
        return _this;
    }
    Octogon.prototype.populateVerticies = function (boundingRect) {
        var arr = new Float32Array(40);
        var _a = midpoint_1.ThirdPoints.between(boundingRect.topLeft, boundingRect.topRight), first = _a.first, second = _a.second;
        this.addXYAndColorToFloat32Array(arr, 0, first.x, first.y);
        this.addXYAndColorToFloat32Array(arr, 5, second.x, second.y);
        (_b = midpoint_1.ThirdPoints.between(boundingRect.topRight, boundingRect.bottomRight), first = _b.first, second = _b.second);
        this.addXYAndColorToFloat32Array(arr, 10, second.x, second.y);
        this.addXYAndColorToFloat32Array(arr, 15, first.x, first.y);
        (_c = midpoint_1.ThirdPoints.between(boundingRect.bottomRight, boundingRect.bottomLeft), first = _c.first, second = _c.second);
        this.addXYAndColorToFloat32Array(arr, 20, second.x, second.y);
        this.addXYAndColorToFloat32Array(arr, 25, first.x, first.y);
        (_d = midpoint_1.ThirdPoints.between(boundingRect.bottomLeft, boundingRect.topLeft), first = _d.first, second = _d.second);
        this.addXYAndColorToFloat32Array(arr, 30, first.x, first.y);
        this.addXYAndColorToFloat32Array(arr, 35, second.x, second.y);
        return arr;
        var _b, _c, _d;
    };
    return Octogon;
}(shape_1.Shape));
exports.Octogon = Octogon;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var webglRenderer_1 = __webpack_require__(16);
exports.WebGLRenderer = webglRenderer_1.WebGLRenderer;
var contextWrangler_1 = __webpack_require__(22);
exports.ContextWrangler = contextWrangler_1.ContextWrangler;
var colorMapper_1 = __webpack_require__(23);
exports.ColorMapper = colorMapper_1.ColorMapper;
var line_1 = __webpack_require__(24);
exports.Line = line_1.Line;
var shape_1 = __webpack_require__(1);
exports.Shape = shape_1.Shape;
var shapeFactory_1 = __webpack_require__(25);
exports.ShapeFactory = shapeFactory_1.ShapeFactory;
var ellipse_1 = __webpack_require__(9);
exports.Ellipse = ellipse_1.Ellipse;
var rectangle_1 = __webpack_require__(12);
exports.Rectangle = rectangle_1.Rectangle;
var hexagon_1 = __webpack_require__(13);
exports.Hexagon = hexagon_1.Hexagon;
var octogon_1 = __webpack_require__(14);
exports.Octogon = octogon_1.Octogon;
var triangle_1 = __webpack_require__(11);
exports.Triangle = triangle_1.Triangle;
var rgbColor_1 = __webpack_require__(5);
exports.RGBColor = rgbColor_1.RGBColor;
var camera_1 = __webpack_require__(8);
exports.Camera = camera_1.Camera;
var point3d_1 = __webpack_require__(4);
exports.Point3d = point3d_1.Point3d;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var renderModeMapper_1 = __webpack_require__(17);
var vertexBuffer_1 = __webpack_require__(18);
var drawingMode_1 = __webpack_require__(7);
var camera_1 = __webpack_require__(8);
var point3d_1 = __webpack_require__(4);
var settings_1 = __webpack_require__(6);
var WebGLRenderer = (function () {
    function WebGLRenderer(canvasWidth, canvasHeight, gl, drawingSettings, camera) {
        if (camera === void 0) { camera = null; }
        this._vertexShaderSource = "    attribute vec4 a_position;\n" +
            "    attribute vec4 a_color;\n" +
            "    uniform mat4 u_viewMatrix;\n" +
            "    uniform float u_pointSize;\n" +
            "    varying vec4 v_color;\n" +
            "    void main(void)\n" +
            "    {\n" +
            "        gl_Position = u_viewMatrix * a_position;\n" +
            "        gl_PointSize = u_pointSize;\n" +
            "        v_color = a_color;\n" +
            "    }\n";
        this._fragmentShaderSource = "    precision mediump float;\n" +
            "    uniform vec4 u_fragColor;" +
            "    varying vec4 v_color;\n" +
            "    void main(void)\n" +
            "    {\n" +
            "        gl_FragColor = v_color;\n" +
            "    }\n";
        this.gl = gl;
        this.initializeDrawingSettings(drawingSettings);
        this.initializeCamera(camera);
        this.setViewPortDimensions(canvasWidth, canvasHeight);
        this.initShaders();
        this.initializeVertexBuffers();
    }
    WebGLRenderer.prototype.setViewPortDimensions = function (newWidth, newHeight) {
        this.gl.viewport(0, 0, newWidth, newHeight);
    };
    Object.defineProperty(WebGLRenderer.prototype, "renderMode", {
        get: function () {
            return this._renderMode;
        },
        set: function (renderMode) {
            this._drawingMode = drawingMode_1.DrawingMode.Verticies;
            this._renderMode = renderMode;
            this._glRenderMode = renderModeMapper_1.RenderModeMapper.renderModeToWebGlConstant(renderMode, this.gl);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "shape", {
        get: function () {
            return this._shapeMode;
        },
        set: function (newShapeMode) {
            this._drawingMode = drawingMode_1.DrawingMode.Shapes;
            this._shapeMode = newShapeMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this._color = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (backgroundColor) {
            this._backgroundColor = backgroundColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "pointSize", {
        get: function () {
            return this._pointSize;
        },
        set: function (value) {
            this._pointSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        enumerable: true,
        configurable: true
    });
    WebGLRenderer.prototype.addXYPointToScene = function (x, y, renderMode, r, g, b) {
        if (renderMode === void 0) { renderMode = this._glRenderMode; }
        if (r === void 0) { r = this._color.red; }
        if (g === void 0) { g = this._color.green; }
        if (b === void 0) { b = this._color.blue; }
        switch (renderMode) {
            case this.gl.POINTS:
                this._pointsVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.LINES:
                this._linesVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.LINE_STRIP:
                this._lineStripVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.LINE_LOOP:
                this._lineLoopVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.TRIANGLES:
                this._trianglesVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.TRIANGLE_STRIP:
                this._triangleStripVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.TRIANGLE_FAN:
                this._triangleFanVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
        }
    };
    WebGLRenderer.prototype.addShapeToScene = function (shape) {
        var vertexIndex = 0;
        for (var i = 0; i < shape.verticies.arr.length; i += settings_1.Settings.floatsPerVertex) {
            var x = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            var y = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            var r = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            var g = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            var b = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            this.addXYPointToScene(x, y, shape.glRenderMode, r, g, b);
        }
    };
    WebGLRenderer.prototype.addShapesToScene = function (shapes) {
        for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
            var shape = shapes_1[_i];
            this.addShapeToScene(shape);
        }
    };
    WebGLRenderer.prototype.removeAllVeriticies = function () {
        this.initializeVertexBuffers();
    };
    WebGLRenderer.prototype.draw = function () {
        this.gl.clearColor(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        for (var _i = 0, _a = this._vertexBuffers; _i < _a.length; _i++) {
            var vb = _a[_i];
            for (var _b = 0, _c = vb.verticiesStack; _b < _c.length; _b++) {
                var verts = _c[_b];
                if (verts.size > 0) {
                    this.drawGlArray(verts.getTrimmedArray(), vb.renderMode);
                }
            }
        }
    };
    WebGLRenderer.prototype.initializeDrawingSettings = function (drawingSettings) {
        this._renderMode = drawingSettings._renderMode || settings_1.Settings.defaultRendereMode;
        this._glRenderMode = renderModeMapper_1.RenderModeMapper.renderModeToWebGlConstant(this._renderMode, this.gl);
        this._shapeMode = drawingSettings._shapeMode || settings_1.Settings.defaultShapeMode;
        this._drawingMode = drawingSettings._drawingMode || settings_1.Settings.defaultDrawingMode;
        this._pointSize = drawingSettings._pointSize || settings_1.Settings.defaultPointSize;
        this._backgroundColor = drawingSettings._backgroundColor || settings_1.Settings.defaultBackgroundColor;
        this._color = drawingSettings._color || settings_1.Settings.defaultColor;
    };
    WebGLRenderer.prototype.initializeCamera = function (camera) {
        if (camera) {
            this._camera = camera;
        }
        else {
            var eyePosition = new point3d_1.Point3d(0, 0, 0);
            var lookAtPoint = new point3d_1.Point3d(0, 0, -1);
            var upPosition = new point3d_1.Point3d(0, 1, 0);
            this._camera = new camera_1.Camera(eyePosition, lookAtPoint, upPosition);
        }
    };
    WebGLRenderer.prototype.initializeVertexBuffers = function () {
        this._pointsVector = new vertexBuffer_1.VertexBuffer(this.gl.POINTS, this.gl);
        this._linesVector = new vertexBuffer_1.VertexBuffer(this.gl.LINES, this.gl);
        this._lineStripVector = new vertexBuffer_1.VertexBuffer(this.gl.LINE_STRIP, this.gl);
        this._lineLoopVector = new vertexBuffer_1.VertexBuffer(this.gl.LINE_LOOP, this.gl);
        this._trianglesVector = new vertexBuffer_1.VertexBuffer(this.gl.TRIANGLES, this.gl);
        this._triangleStripVector = new vertexBuffer_1.VertexBuffer(this.gl.TRIANGLE_STRIP, this.gl);
        this._triangleFanVector = new vertexBuffer_1.VertexBuffer(this.gl.TRIANGLE_FAN, this.gl);
        this._vertexBuffers = [
            this._pointsVector,
            this._linesVector,
            this._lineStripVector,
            this._lineLoopVector,
            this._trianglesVector,
            this._triangleStripVector,
            this._triangleFanVector
        ];
    };
    WebGLRenderer.prototype.drawGlArray = function (arr, renderMode) {
        var pointSizeUniformName = "u_pointSize";
        var viewMatrixUniformName = "u_viewMatrix";
        var a_position = this.gl.getAttribLocation(this._shaderProgram, "a_position");
        var a_color = this.gl.getAttribLocation(this._shaderProgram, "a_color");
        var u_pointSize = this.gl.getUniformLocation(this._shaderProgram, pointSizeUniformName);
        var u_viewMatrix = this.gl.getUniformLocation(this._shaderProgram, viewMatrixUniformName);
        if (!u_pointSize || !u_viewMatrix) {
            var uniformsMap = {
                pointSizeUniformName: u_pointSize,
                viewMatrixUniformName: u_viewMatrix
            };
            var errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw "cannot find uniform u_viewMatrix in shader program";
        }
        var floatSize = arr.BYTES_PER_ELEMENT;
        var bytesPerPoint = floatSize * settings_1.Settings.floatsPerPoint;
        var bytesPerVertex = floatSize * settings_1.Settings.floatsPerVertex;
        var vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, arr, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(a_position, settings_1.Settings.floatsPerPoint, this.gl.FLOAT, false, bytesPerVertex, 0);
        this.gl.enableVertexAttribArray(a_position);
        this.gl.vertexAttribPointer(a_color, settings_1.Settings.floatsPerColor, this.gl.FLOAT, false, bytesPerVertex, bytesPerPoint);
        this.gl.enableVertexAttribArray(a_color);
        this.gl.uniformMatrix4fv(u_viewMatrix, false, this._camera.getViewMatrix());
        this.gl.drawArrays(renderMode, 0, (arr.length / settings_1.Settings.floatsPerVertex));
    };
    WebGLRenderer.prototype.addXYAndColorToVertexBuffer = function (vertexBuffer, x, y) {
        vertexBuffer.addArray(new Float32Array([x, y, this._color.red,
            this._color.green, this._color.blue]));
    };
    WebGLRenderer.prototype.initShaders = function () {
        var fragmentShader = this.createShader(this._fragmentShaderSource, "fragment");
        var vertexShader = this.createShader(this._vertexShaderSource, "vertex");
        var shader = this.gl.createProgram();
        if (shader === null) {
            throw Error("Could not create shader program");
        }
        this._shaderProgram = shader;
        this.gl.attachShader(this._shaderProgram, vertexShader);
        this.gl.attachShader(this._shaderProgram, fragmentShader);
        this.gl.linkProgram(this._shaderProgram);
        if (!this.gl.getProgramParameter(this._shaderProgram, this.gl.LINK_STATUS)) {
            throw Error("Could not initialise shaders");
        }
        this.gl.useProgram(this._shaderProgram);
    };
    WebGLRenderer.prototype.createShader = function (str, type) {
        var shader;
        if (type === "fragment") {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        }
        else if (type === "vertex") {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        }
        else {
            return null;
        }
        this.gl.shaderSource(shader, str);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };
    WebGLRenderer.prototype.createUniforNotFoundErrorMessage = function (uniformsMap) {
        var result = "cannot find uniform in shader program";
        result += "Potential culprits:";
        for (var key in uniformsMap) {
            if (uniformsMap.hasOwnProperty(key)) {
                result += "\t" + key + ": " + uniformsMap[key];
            }
        }
        return result;
    };
    return WebGLRenderer;
}());
exports.WebGLRenderer = WebGLRenderer;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RenderModeMapper = (function () {
    function RenderModeMapper() {
    }
    RenderModeMapper.renderModeToWebGlConstant = function (mode, gl) {
        switch (mode) {
            case "points":
                return gl.POINTS;
            case "lines":
                return gl.LINES;
            case "lineStrip":
                return gl.LINE_STRIP;
            case "lineLoop":
                return gl.LINE_LOOP;
            case "triangles":
                return gl.TRIANGLES;
            case "triangleStrip":
                return gl.TRIANGLE_STRIP;
            case "triangleFan":
                return gl.TRIANGLE_FAN;
            default: throw Error("could not find renderMode named " + mode);
        }
    };
    return RenderModeMapper;
}());
exports.RenderModeMapper = RenderModeMapper;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = __webpack_require__(0);
var settings_1 = __webpack_require__(6);
var VertexBuffer = (function () {
    function VertexBuffer(renderMode, gl) {
        if (this.renderModeValidator(renderMode, gl)) {
            this.renderMode = renderMode;
            this._topVertexVector = new vector_1.Float32Vector();
            this.verticiesStack = new Array();
            this.verticiesStack.push(this._topVertexVector);
        }
        else {
            throw Error("Cannot initialize vertex buffer of unrecognized gl render mode");
        }
    }
    VertexBuffer.prototype.addVertex = function (vertex) {
        if (vertex.length !== settings_1.Settings.floatsPerVertex) {
            throw "cannot add vertex repersented by " + vertex.length + " floats, " +
                ("we only accept verticies of " + settings_1.Settings.floatsPerVertex + " floats (x, y, r, g, b)");
        }
        if (this._topVertexVector.size + vertex.length < settings_1.Settings.vertexBufferFloatLimit) {
            this._topVertexVector.addArray(vertex);
        }
        else {
            this._topVertexVector = new vector_1.Float32Vector(vertex);
            this.verticiesStack.push(this._topVertexVector);
        }
    };
    VertexBuffer.prototype.renderModeValidator = function (renderMode, gl) {
        switch (renderMode) {
            case gl.POINTS:
                return true;
            case gl.LINES:
                return true;
            case gl.LINE_STRIP:
                return true;
            case gl.LINE_LOOP:
                return true;
            case gl.TRIANGLES:
                return true;
            case gl.TRIANGLE_STRIP:
                return true;
            case gl.TRIANGLE_FAN:
                return true;
        }
        return false;
    };
    return VertexBuffer;
}());
exports.VertexBuffer = VertexBuffer;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector3_1 = __webpack_require__(20);
var vector4_1 = __webpack_require__(21);
var Matrix4 = (function () {
    function Matrix4(source) {
        if (source === void 0) { source = null; }
        if (source) {
            this.elements = new Float32Array(16);
            for (var i = 0; i < 16; ++i) {
                this.elements[i] = source.elements[i];
            }
        }
        else {
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
    }
    Matrix4.prototype.setIdentity = function () {
        var e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.set = function (src) {
        var i, s, d;
        s = src.elements;
        d = this.elements;
        if (s === d) {
            return;
        }
        for (i = 0; i < 16; ++i) {
            d[i] = s[i];
        }
        return this;
    };
    Matrix4.prototype.multiply = function (other) {
        return this.concat(other);
    };
    Matrix4.prototype.multiplyVector3 = function (pos) {
        var e = this.elements;
        var p = pos.elements;
        var v = new vector3_1.Vector3();
        var result = v.elements;
        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + e[11];
        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + e[12];
        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[13];
        return v;
    };
    Matrix4.prototype.multiplyVector4 = function (pos) {
        var e = this.elements;
        var p = pos.elements;
        var v = new vector4_1.Vector4();
        var result = v.elements;
        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + p[3] * e[12];
        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + p[3] * e[13];
        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
        result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];
        return v;
    };
    Matrix4.prototype.transpose = function () {
        var e, t;
        e = this.elements;
        t = e[1];
        e[1] = e[4];
        e[4] = t;
        t = e[2];
        e[2] = e[8];
        e[8] = t;
        t = e[3];
        e[3] = e[12];
        e[12] = t;
        t = e[6];
        e[6] = e[9];
        e[9] = t;
        t = e[7];
        e[7] = e[13];
        e[13] = t;
        t = e[11];
        e[11] = e[14];
        e[14] = t;
        return this;
    };
    Matrix4.prototype.setInverseOf = function (other) {
        var i, s, d, inv, det;
        s = other.elements;
        d = this.elements;
        inv = new Float32Array(16);
        inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
            + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
        inv[4] = -s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
            - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
        inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
            + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
        inv[12] = -s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
            - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];
        inv[1] = -s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
            - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
        inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
            + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
        inv[9] = -s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
            - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
        inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
            + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];
        inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
            + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
        inv[6] = -s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
            - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
        inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
            + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
        inv[14] = -s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
            - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];
        inv[3] = -s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
            - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
        inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
            + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
        inv[11] = -s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
            - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
        inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
            + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];
        det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
        if (det === 0) {
            return this;
        }
        det = 1 / det;
        for (i = 0; i < 16; i++) {
            d[i] = inv[i] * det;
        }
        return this;
    };
    Matrix4.prototype.invert = function () {
        return this.setInverseOf(this);
    };
    Matrix4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
        var e, rw, rh, rd;
        if (left === right || bottom === top || near === far) {
            throw "null frustum";
        }
        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);
        e = this.elements;
        e[0] = 2 * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 2 * rh;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -2 * rd;
        e[11] = 0;
        e[12] = -(right + left) * rw;
        e[13] = -(top + bottom) * rh;
        e[14] = -(far + near) * rd;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
        return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
    };
    Matrix4.prototype.setFrustum = function (left, right, bottom, top, near, far) {
        var e, rw, rh, rd;
        if (left === right || top === bottom || near === far) {
            throw "null frustum";
        }
        if (near <= 0) {
            throw "near <= 0";
        }
        if (far <= 0) {
            throw "far <= 0";
        }
        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);
        e = this.elements;
        e[0] = 2 * near * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 2 * near * rh;
        e[6] = 0;
        e[7] = 0;
        e[8] = (right + left) * rw;
        e[9] = (top + bottom) * rh;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    };
    Matrix4.prototype.frustum = function (left, right, bottom, top, near, far) {
        return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
    };
    Matrix4.prototype.setPerspective = function (fovy, aspect, near, far) {
        var e, rd, s, ct;
        if (near === far || aspect === 0) {
            throw "null frustum";
        }
        if (near <= 0) {
            throw "near <= 0";
        }
        if (far <= 0) {
            throw "far <= 0";
        }
        fovy = Math.PI * fovy / 180 / 2;
        s = Math.sin(fovy);
        if (s === 0) {
            throw "null frustum";
        }
        rd = 1 / (far - near);
        ct = Math.cos(fovy) / s;
        e = this.elements;
        e[0] = ct / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = ct;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    };
    Matrix4.prototype.perspective = function (fovy, aspect, near, far) {
        return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
    };
    Matrix4.prototype.setScale = function (x, y, z) {
        var e = this.elements;
        e[0] = x;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = y;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = z;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.scale = function (x, y, z) {
        var e = this.elements;
        e[0] *= x;
        e[4] *= y;
        e[8] *= z;
        e[1] *= x;
        e[5] *= y;
        e[9] *= z;
        e[2] *= x;
        e[6] *= y;
        e[10] *= z;
        e[3] *= x;
        e[7] *= y;
        e[11] *= z;
        return this;
    };
    Matrix4.prototype.setTranslate = function (x, y, z) {
        var e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = x;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = y;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = z;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.translate = function (x, y, z) {
        var e = this.elements;
        e[12] += e[0] * x + e[4] * y + e[8] * z;
        e[13] += e[1] * x + e[5] * y + e[9] * z;
        e[14] += e[2] * x + e[6] * y + e[10] * z;
        e[15] += e[3] * x + e[7] * y + e[11] * z;
        return this;
    };
    Matrix4.prototype.setRotate = function (angle, x, y, z) {
        var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
        angle = Math.PI * angle / 180;
        e = this.elements;
        s = Math.sin(angle);
        c = Math.cos(angle);
        if (0 !== x && 0 === y && 0 === z) {
            if (x < 0) {
                s = -s;
            }
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = c;
            e[9] = -s;
            e[13] = 0;
            e[2] = 0;
            e[6] = s;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 !== y && 0 === z) {
            if (y < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = 0;
            e[8] = s;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = -s;
            e[6] = 0;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 === y && 0 !== z) {
            if (z < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = -s;
            e[8] = 0;
            e[12] = 0;
            e[1] = s;
            e[5] = c;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else {
            len = Math.sqrt(x * x + y * y + z * z);
            if (len !== 1) {
                rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;
            e[0] = x * x * nc + c;
            e[1] = xy * nc + zs;
            e[2] = zx * nc - ys;
            e[3] = 0;
            e[4] = xy * nc - zs;
            e[5] = y * y * nc + c;
            e[6] = yz * nc + xs;
            e[7] = 0;
            e[8] = zx * nc + ys;
            e[9] = yz * nc - xs;
            e[10] = z * z * nc + c;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        return this;
    };
    Matrix4.prototype.rotate = function (angle, x, y, z) {
        return this.concat(new Matrix4().setRotate(angle, x, y, z));
    };
    Matrix4.prototype.setLookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;
        fx = centerX - eyeX;
        fy = centerY - eyeY;
        fz = centerZ - eyeZ;
        rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;
        sx = fy * upZ - fz * upY;
        sy = fz * upX - fx * upZ;
        sz = fx * upY - fy * upX;
        rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;
        ux = sy * fz - sz * fy;
        uy = sz * fx - sx * fz;
        uz = sx * fy - sy * fx;
        e = this.elements;
        e[0] = sx;
        e[1] = ux;
        e[2] = -fx;
        e[3] = 0;
        e[4] = sy;
        e[5] = uy;
        e[6] = -fy;
        e[7] = 0;
        e[8] = sz;
        e[9] = uz;
        e[10] = -fz;
        e[11] = 0;
        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;
        return this.translate(-eyeX, -eyeY, -eyeZ);
    };
    Matrix4.prototype.lookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
    };
    Matrix4.prototype.dropShadow = function (plane, light) {
        var mat = new Matrix4();
        var e = mat.elements;
        var dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];
        e[0] = dot - light[0] * plane[0];
        e[1] = -light[1] * plane[0];
        e[2] = -light[2] * plane[0];
        e[3] = -light[3] * plane[0];
        e[4] = -light[0] * plane[1];
        e[5] = dot - light[1] * plane[1];
        e[6] = -light[2] * plane[1];
        e[7] = -light[3] * plane[1];
        e[8] = -light[0] * plane[2];
        e[9] = -light[1] * plane[2];
        e[10] = dot - light[2] * plane[2];
        e[11] = -light[3] * plane[2];
        e[12] = -light[0] * plane[3];
        e[13] = -light[1] * plane[3];
        e[14] = -light[2] * plane[3];
        e[15] = dot - light[3] * plane[3];
        return this.concat(mat);
    };
    Matrix4.prototype.dropShadowDirectionally = function (normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
        var a = planeX * normX + planeY * normY + planeZ * normZ;
        return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
    };
    Matrix4.prototype.concat = function (other) {
        var i, e, a, b, ai0, ai1, ai2, ai3;
        e = this.elements;
        a = this.elements;
        b = other.elements;
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }
        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        return this;
    };
    return Matrix4;
}());
exports.Matrix4 = Matrix4;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector3 = (function () {
    function Vector3(source) {
        if (source === void 0) { source = null; }
        var arr = new Float32Array(3);
        if (source) {
            arr[0] = source[0];
            arr[1] = source[1];
            arr[2] = source[2];
        }
        this.elements = arr;
    }
    Vector3.prototype.normalize = function () {
        var v = this.elements;
        var c = v[0], d = v[1], e = v[2], g = Math.sqrt(c * c + d * d + e * e);
        if (g) {
            if (g === 1) {
                return this;
            }
        }
        else {
            v[0] = 0;
            v[1] = 0;
            v[2] = 0;
            return this;
        }
        g = 1 / g;
        v[0] = c * g;
        v[1] = d * g;
        v[2] = e * g;
        return this;
    };
    return Vector3;
}());
exports.Vector3 = Vector3;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector4 = (function () {
    function Vector4(source) {
        if (source === void 0) { source = null; }
        var arr = new Float32Array(4);
        if (source) {
            arr[0] = source[0];
            arr[1] = source[1];
            arr[2] = source[2];
            arr[3] = source[3];
        }
        this.elements = arr;
    }
    return Vector4;
}());
exports.Vector4 = Vector4;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContextWrangler = (function () {
    function ContextWrangler() {
    }
    ContextWrangler.getContext = function (canvas) {
        var gl;
        try {
            gl = canvas.getContext("webgl", {
                alpha: false,
                antialias: false,
                depth: false
            });
        }
        catch (e) {
            var msg = "Error creating WebGL Context!: " + e.toString();
            throw Error(msg);
        }
        if (gl === null) {
            var msg = "Error creating WebGL Context!, gl === null";
            throw Error(msg);
        }
        return gl;
    };
    return ContextWrangler;
}());
exports.ContextWrangler = ContextWrangler;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rgbColor_1 = __webpack_require__(5);
var ColorMapper = (function () {
    function ColorMapper() {
    }
    ColorMapper.colorToRGBColor = function (color) {
        switch (color) {
            case "red":
                return new rgbColor_1.RGBColor(1.0, 0.0, 0.0);
            case "orange":
                return new rgbColor_1.RGBColor(1.0, 0.271, 0.0);
            case "yellow":
                return new rgbColor_1.RGBColor(1.0, 1.0, 0.0);
            case "green":
                return new rgbColor_1.RGBColor(0.0, 1.0, 0.0);
            case "cyan":
                return new rgbColor_1.RGBColor(0.0, 1.0, 1.0);
            case "blue":
                return new rgbColor_1.RGBColor(0.0, 0.0, 1.0);
            case "indigo":
                return new rgbColor_1.RGBColor(0.294, 0.0, 0.510);
            case "fuchsia":
                return new rgbColor_1.RGBColor(1.0, 0.0, 1.0);
            case "white":
                return new rgbColor_1.RGBColor(1.0, 1.0, 1.0);
            default: throw Error("could not find color " + color);
        }
    };
    return ColorMapper;
}());
exports.ColorMapper = ColorMapper;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(0);
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(point, rgbColor, gl) {
        var _this = _super.call(this, rgbColor) || this;
        var array = new Float32Array(5);
        _this.addXYAndColorToFloat32Array(array, 0, point.x, point.y);
        _this.verticies = new vector_1.Float32Vector(array);
        _this.numberOfVerticies = 1;
        _this.glRenderMode = gl.LINE_STRIP;
        return _this;
    }
    Line.prototype.addVertex = function (vertex) {
        var array = new Float32Array(5);
        this.addXYAndColorToFloat32Array(array, 0, vertex.x, vertex.y);
        this.verticies.addArray(array);
        this.numberOfVerticies++;
    };
    return Line;
}(shape_1.Shape));
exports.Line = Line;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ellipse_1 = __webpack_require__(9);
var triangle_1 = __webpack_require__(11);
var rectangle_1 = __webpack_require__(12);
var hexagon_1 = __webpack_require__(13);
var octogon_1 = __webpack_require__(14);
var precision_1 = __webpack_require__(10);
var ShapeFactory = (function () {
    function ShapeFactory() {
    }
    ShapeFactory.createShape = function (point1, point2, shapeMode, rgbColor, gl) {
        switch (shapeMode) {
            case "ellipses":
                return this.createEllipse(point1, point2, rgbColor, gl);
            case "triangles":
                return this.createTriangle(point1, point2, rgbColor, gl);
            case "rectangles":
                return this.createRectangle(point1, point2, rgbColor, gl);
            case "hexagons":
                return this.createHexagon(point1, point2, rgbColor, gl);
            case "octogons":
                return this.createOctogon(point1, point2, rgbColor, gl);
            default:
                throw Error("cannot recognize shape type " + shapeMode);
        }
    };
    ShapeFactory.createEllipse = function (point1, point2, rgbColor, gl) {
        return new ellipse_1.Ellipse(point1, point2, rgbColor, gl, precision_1.Precision.High);
    };
    ShapeFactory.createTriangle = function (point1, point2, rgbColor, gl) {
        return new triangle_1.Triangle(point1, point2, rgbColor, gl);
    };
    ShapeFactory.createRectangle = function (point1, point2, rgbColor, gl) {
        return new rectangle_1.Rectangle(point1, point2, rgbColor, gl);
    };
    ;
    ShapeFactory.createHexagon = function (point1, point2, rgbColor, gl) {
        return new hexagon_1.Hexagon(point1, point2, rgbColor, gl);
    };
    ShapeFactory.createOctogon = function (point1, point2, rgbColor, gl) {
        return new octogon_1.Octogon(point1, point2, rgbColor, gl);
    };
    return ShapeFactory;
}());
exports.ShapeFactory = ShapeFactory;


/***/ })
/******/ ]);
});
//# sourceMappingURL=webgl-renderer.js.map