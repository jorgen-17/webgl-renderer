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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var floatsPerPoint = 3;
var floatsPerColor = 3;
var floatsPerVertex = floatsPerPoint + floatsPerColor;
var verticiesPerTriangle = 3;
var floatsPerTriangle = verticiesPerTriangle * floatsPerVertex;
var lineGlRenderMode = "lineStrip";
exports.Constants = {
    floatsPerPoint: floatsPerPoint,
    floatsPerColor: floatsPerColor,
    floatsPerVertex: floatsPerVertex,
    verticiesPerTriangle: verticiesPerTriangle,
    floatsPerTriangle: floatsPerTriangle,
    vertexBufferFloatLimit: 64998,
    defaultAlpha: 1.0,
    lineGlRenderMode: lineGlRenderMode
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Float32Vector = (function () {
    function Float32Vector(arr, sizeLimit) {
        if (arr === void 0) { arr = new Float32Array(0); }
        if (sizeLimit === void 0) { sizeLimit = 0; }
        this.arr = arr;
        this.size = arr.length;
        this._sizeLimit = sizeLimit;
    }
    Float32Vector.prototype.addNumber = function (number) {
        var newSize = this.size + 1;
        var additionWillOverflowCapacity = this._sizeLimit && newSize > this._sizeLimit;
        if (additionWillOverflowCapacity) {
            return false;
        }
        var newArrayLength = this._sizeLimit ?
            Math.min(newSize * 2, this._sizeLimit) :
            newSize * 2;
        if (newSize >= this.arr.length) {
            var oldArr = this.arr;
            this.arr = new Float32Array(newArrayLength);
            this.arr.set(oldArr);
        }
        this.arr[this.size] = number;
        this.size = newSize;
        return true;
    };
    Float32Vector.prototype.addArray = function (arr) {
        var newSize = this.size + arr.length;
        var additionWillOverflowCapacity = this._sizeLimit && newSize > this._sizeLimit;
        if (this._sizeLimit && newSize > this._sizeLimit) {
            return false;
        }
        var newArrayLength = this._sizeLimit ?
            Math.min(newSize * 2, this._sizeLimit) :
            newSize * 2;
        if (newSize >= this.arr.length) {
            var oldArr = this.arr;
            this.arr = new Float32Array(newArrayLength);
            this.arr.set(oldArr);
        }
        this.arr.set(arr, this.size);
        this.size = newSize;
        return true;
    };
    Float32Vector.prototype.getTrimmedArray = function () {
        if (this.arr.length > this.size) {
            var trimmedArr = new Float32Array(this.size);
            for (var i = 0; i < trimmedArr.length; i++) {
                trimmedArr[i] = this.arr[i];
            }
            return trimmedArr;
        }
        return this.arr;
    };
    return Float32Vector;
}());
exports.Float32Vector = Float32Vector;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var boundingRectangle_1 = __webpack_require__(24);
var constants_1 = __webpack_require__(0);
var settings_1 = __webpack_require__(5);
var Shape2d = (function () {
    function Shape2d(rgbColor, point1, point2) {
        if (rgbColor === void 0) { rgbColor = settings_1.Settings.defaultColor; }
        if (point1 === void 0) { point1 = null; }
        if (point2 === void 0) { point2 = null; }
        this._rgbColor = rgbColor;
        if (point1 && point2) {
            this.boundingRect = new boundingRectangle_1.BoundingRectangle(point1, point2);
        }
    }
    Object.defineProperty(Shape2d.prototype, "rgbColor", {
        get: function () {
            return this._rgbColor;
        },
        set: function (value) {
            this._rgbColor = value;
            this.computeVerticies();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape2d.prototype, "verticies", {
        get: function () {
            return this._verticies.arr;
        },
        enumerable: true,
        configurable: true
    });
    Shape2d.prototype.addXYZAndColorToFloat32Array = function (array, index, x, y, z) {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = this._rgbColor.red;
        array[index + 4] = this._rgbColor.green;
        array[index + 5] = this._rgbColor.blue;
    };
    Shape2d.prototype.addTriangleToFloat32Array = function (array, index, vertex1Position, vertex2Position, vertex3Position) {
        this.addXYZAndColorToFloat32Array(array, index, vertex1Position.x, vertex1Position.y, vertex1Position.z);
        this.addXYZAndColorToFloat32Array(array, (index + constants_1.Constants.floatsPerVertex), vertex2Position.x, vertex2Position.y, vertex2Position.z);
        this.addXYZAndColorToFloat32Array(array, (index + (constants_1.Constants.floatsPerVertex * 2)), vertex3Position.x, vertex3Position.y, vertex3Position.z);
    };
    return Shape2d;
}());
exports.Shape2d = Shape2d;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("cuon-matrix-ts",[],e):"object"==typeof exports?exports["cuon-matrix-ts"]=e():t["cuon-matrix-ts"]=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n){void 0===t&&(t=0),void 0===e&&(e=0),void 0===n&&(n=0),this.elements=new Float32Array(3),this.elements[0]=t,this.elements[1]=e,this.elements[2]=n}return t.prototype.normalize=function(){var t=this.elements,e=t[0],n=t[1],r=t[2],o=Math.sqrt(e*e+n*n+r*r);return o?1===o?this:(o=1/o,t[0]=e*o,t[1]=n*o,t[2]=r*o,this):(t[0]=0,t[1]=0,t[2]=0,this)},Object.defineProperty(t.prototype,"x",{get:function(){return this.elements[0]},set:function(t){this.elements[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.elements[1]},set:function(t){this.elements[1]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"z",{get:function(){return this.elements[2]},set:function(t){this.elements[2]=t},enumerable:!0,configurable:!0}),t}();e.Vec3=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n,r){void 0===t&&(t=0),void 0===e&&(e=0),void 0===n&&(n=0),void 0===r&&(r=0),this.elements=new Float32Array(4),this.elements[0]=t,this.elements[1]=e,this.elements[2]=n,this.elements[4]=n}return Object.defineProperty(t.prototype,"x",{get:function(){return this.elements[0]},set:function(t){this.elements[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.elements[1]},set:function(t){this.elements[1]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"z",{get:function(){return this.elements[2]},set:function(t){this.elements[2]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"w",{get:function(){return this.elements[3]},set:function(t){this.elements[3]=t},enumerable:!0,configurable:!0}),t}();e.Vec4=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3);e.Mat4=r.Mat4;var o=n(1);e.Vec4=o.Vec4;var s=n(0);e.Vec3=s.Vec3},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(1),s=function(){function t(t){if(void 0===t&&(t=null),t){this.elements=new Float32Array(16);for(var e=0;e<16;++e)this.elements[e]=t.elements[e]}else this.elements=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return t.prototype.setIdentity=function(){var t=this.elements;return t[0]=1,t[4]=0,t[8]=0,t[12]=0,t[1]=0,t[5]=1,t[9]=0,t[13]=0,t[2]=0,t[6]=0,t[10]=1,t[14]=0,t[3]=0,t[7]=0,t[11]=0,t[15]=1,this},t.prototype.set=function(t){var e,n,r;if(n=t.elements,r=this.elements,n!==r){for(e=0;e<16;++e)r[e]=n[e];return this}},t.prototype.multiply=function(t){return this.concat(t)},t.prototype.multiplyVector3=function(t){var e=this.elements,n=t.elements,o=new r.Vec3,s=o.elements;return s[0]=n[0]*e[0]+n[1]*e[4]+n[2]*e[8]+e[11],s[1]=n[0]*e[1]+n[1]*e[5]+n[2]*e[9]+e[12],s[2]=n[0]*e[2]+n[1]*e[6]+n[2]*e[10]+e[13],o},t.prototype.multiplyVector4=function(t){var e=this.elements,n=t.elements,r=new o.Vec4,s=r.elements;return s[0]=n[0]*e[0]+n[1]*e[4]+n[2]*e[8]+n[3]*e[12],s[1]=n[0]*e[1]+n[1]*e[5]+n[2]*e[9]+n[3]*e[13],s[2]=n[0]*e[2]+n[1]*e[6]+n[2]*e[10]+n[3]*e[14],s[3]=n[0]*e[3]+n[1]*e[7]+n[2]*e[11]+n[3]*e[15],r},t.prototype.transpose=function(){var t,e;return t=this.elements,e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this},t.prototype.setInverseOf=function(t){var e,n,r,o,s;if(n=t.elements,r=this.elements,o=new Float32Array(16),o[0]=n[5]*n[10]*n[15]-n[5]*n[11]*n[14]-n[9]*n[6]*n[15]+n[9]*n[7]*n[14]+n[13]*n[6]*n[11]-n[13]*n[7]*n[10],o[4]=-n[4]*n[10]*n[15]+n[4]*n[11]*n[14]+n[8]*n[6]*n[15]-n[8]*n[7]*n[14]-n[12]*n[6]*n[11]+n[12]*n[7]*n[10],o[8]=n[4]*n[9]*n[15]-n[4]*n[11]*n[13]-n[8]*n[5]*n[15]+n[8]*n[7]*n[13]+n[12]*n[5]*n[11]-n[12]*n[7]*n[9],o[12]=-n[4]*n[9]*n[14]+n[4]*n[10]*n[13]+n[8]*n[5]*n[14]-n[8]*n[6]*n[13]-n[12]*n[5]*n[10]+n[12]*n[6]*n[9],o[1]=-n[1]*n[10]*n[15]+n[1]*n[11]*n[14]+n[9]*n[2]*n[15]-n[9]*n[3]*n[14]-n[13]*n[2]*n[11]+n[13]*n[3]*n[10],o[5]=n[0]*n[10]*n[15]-n[0]*n[11]*n[14]-n[8]*n[2]*n[15]+n[8]*n[3]*n[14]+n[12]*n[2]*n[11]-n[12]*n[3]*n[10],o[9]=-n[0]*n[9]*n[15]+n[0]*n[11]*n[13]+n[8]*n[1]*n[15]-n[8]*n[3]*n[13]-n[12]*n[1]*n[11]+n[12]*n[3]*n[9],o[13]=n[0]*n[9]*n[14]-n[0]*n[10]*n[13]-n[8]*n[1]*n[14]+n[8]*n[2]*n[13]+n[12]*n[1]*n[10]-n[12]*n[2]*n[9],o[2]=n[1]*n[6]*n[15]-n[1]*n[7]*n[14]-n[5]*n[2]*n[15]+n[5]*n[3]*n[14]+n[13]*n[2]*n[7]-n[13]*n[3]*n[6],o[6]=-n[0]*n[6]*n[15]+n[0]*n[7]*n[14]+n[4]*n[2]*n[15]-n[4]*n[3]*n[14]-n[12]*n[2]*n[7]+n[12]*n[3]*n[6],o[10]=n[0]*n[5]*n[15]-n[0]*n[7]*n[13]-n[4]*n[1]*n[15]+n[4]*n[3]*n[13]+n[12]*n[1]*n[7]-n[12]*n[3]*n[5],o[14]=-n[0]*n[5]*n[14]+n[0]*n[6]*n[13]+n[4]*n[1]*n[14]-n[4]*n[2]*n[13]-n[12]*n[1]*n[6]+n[12]*n[2]*n[5],o[3]=-n[1]*n[6]*n[11]+n[1]*n[7]*n[10]+n[5]*n[2]*n[11]-n[5]*n[3]*n[10]-n[9]*n[2]*n[7]+n[9]*n[3]*n[6],o[7]=n[0]*n[6]*n[11]-n[0]*n[7]*n[10]-n[4]*n[2]*n[11]+n[4]*n[3]*n[10]+n[8]*n[2]*n[7]-n[8]*n[3]*n[6],o[11]=-n[0]*n[5]*n[11]+n[0]*n[7]*n[9]+n[4]*n[1]*n[11]-n[4]*n[3]*n[9]-n[8]*n[1]*n[7]+n[8]*n[3]*n[5],o[15]=n[0]*n[5]*n[10]-n[0]*n[6]*n[9]-n[4]*n[1]*n[10]+n[4]*n[2]*n[9]+n[8]*n[1]*n[6]-n[8]*n[2]*n[5],0===(s=n[0]*o[0]+n[1]*o[4]+n[2]*o[8]+n[3]*o[12]))return this;for(s=1/s,e=0;e<16;e++)r[e]=o[e]*s;return this},t.prototype.invert=function(){return this.setInverseOf(this)},t.prototype.setOrtho=function(t,e,n,r,o,s){var i,u,c,l;if(t===e||n===r||o===s)throw"null frustum";return u=1/(e-t),c=1/(r-n),l=1/(s-o),i=this.elements,i[0]=2*u,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2*c,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=-2*l,i[11]=0,i[12]=-(e+t)*u,i[13]=-(r+n)*c,i[14]=-(s+o)*l,i[15]=1,this},t.prototype.ortho=function(e,n,r,o,s,i){return this.concat((new t).setOrtho(e,n,r,o,s,i))},t.prototype.setFrustum=function(t,e,n,r,o,s){var i,u,c,l;if(t===e||r===n||o===s)throw"null frustum";if(o<=0)throw"near <= 0";if(s<=0)throw"far <= 0";return u=1/(e-t),c=1/(r-n),l=1/(s-o),i=this.elements,i[0]=2*o*u,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2*o*c,i[6]=0,i[7]=0,i[8]=(e+t)*u,i[9]=(r+n)*c,i[10]=-(s+o)*l,i[11]=-1,i[12]=0,i[13]=0,i[14]=-2*o*s*l,i[15]=0,this},t.prototype.frustum=function(e,n,r,o,s,i){return this.concat((new t).setFrustum(e,n,r,o,s,i))},t.prototype.setPerspective=function(t,e,n,r){var o,s,i,u;if(n===r||0===e)throw"null frustum";if(n<=0)throw"near <= 0";if(r<=0)throw"far <= 0";if(t=Math.PI*t/180/2,0===(i=Math.sin(t)))throw"null frustum";return s=1/(r-n),u=Math.cos(t)/i,o=this.elements,o[0]=u/e,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=u,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=-(r+n)*s,o[11]=-1,o[12]=0,o[13]=0,o[14]=-2*n*r*s,o[15]=0,this},t.prototype.perspective=function(e,n,r,o){return this.concat((new t).setPerspective(e,n,r,o))},t.prototype.setScale=function(t,e,n){var r=this.elements;return r[0]=t,r[4]=0,r[8]=0,r[12]=0,r[1]=0,r[5]=e,r[9]=0,r[13]=0,r[2]=0,r[6]=0,r[10]=n,r[14]=0,r[3]=0,r[7]=0,r[11]=0,r[15]=1,this},t.prototype.scale=function(t,e,n){var r=this.elements;return r[0]*=t,r[4]*=e,r[8]*=n,r[1]*=t,r[5]*=e,r[9]*=n,r[2]*=t,r[6]*=e,r[10]*=n,r[3]*=t,r[7]*=e,r[11]*=n,this},t.prototype.setTranslate=function(t,e,n){var r=this.elements;return r[0]=1,r[4]=0,r[8]=0,r[12]=t,r[1]=0,r[5]=1,r[9]=0,r[13]=e,r[2]=0,r[6]=0,r[10]=1,r[14]=n,r[3]=0,r[7]=0,r[11]=0,r[15]=1,this},t.prototype.translate=function(t,e,n){var r=this.elements;return r[12]+=r[0]*t+r[4]*e+r[8]*n,r[13]+=r[1]*t+r[5]*e+r[9]*n,r[14]+=r[2]*t+r[6]*e+r[10]*n,r[15]+=r[3]*t+r[7]*e+r[11]*n,this},t.prototype.setRotate=function(t,e,n,r){var o,s,i,u,c,l,f,a,p,h,m,y;return t=Math.PI*t/180,o=this.elements,s=Math.sin(t),i=Math.cos(t),0!==e&&0===n&&0===r?(e<0&&(s=-s),o[0]=1,o[4]=0,o[8]=0,o[12]=0,o[1]=0,o[5]=i,o[9]=-s,o[13]=0,o[2]=0,o[6]=s,o[10]=i,o[14]=0,o[3]=0,o[7]=0,o[11]=0,o[15]=1):0===e&&0!==n&&0===r?(n<0&&(s=-s),o[0]=i,o[4]=0,o[8]=s,o[12]=0,o[1]=0,o[5]=1,o[9]=0,o[13]=0,o[2]=-s,o[6]=0,o[10]=i,o[14]=0,o[3]=0,o[7]=0,o[11]=0,o[15]=1):0===e&&0===n&&0!==r?(r<0&&(s=-s),o[0]=i,o[4]=-s,o[8]=0,o[12]=0,o[1]=s,o[5]=i,o[9]=0,o[13]=0,o[2]=0,o[6]=0,o[10]=1,o[14]=0,o[3]=0,o[7]=0,o[11]=0,o[15]=1):(u=Math.sqrt(e*e+n*n+r*r),1!==u&&(c=1/u,e*=c,n*=c,r*=c),l=1-i,f=e*n,a=n*r,p=r*e,h=e*s,m=n*s,y=r*s,o[0]=e*e*l+i,o[1]=f*l+y,o[2]=p*l-m,o[3]=0,o[4]=f*l-y,o[5]=n*n*l+i,o[6]=a*l+h,o[7]=0,o[8]=p*l+m,o[9]=a*l-h,o[10]=r*r*l+i,o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1),this},t.prototype.rotate=function(e,n,r,o){return this.concat((new t).setRotate(e,n,r,o))},t.prototype.setLookAt=function(t,e,n,r,o,s,i,u,c){var l,f,a,p,h,m,y,v,d,b,w,M;return f=r-t,a=o-e,p=s-n,h=1/Math.sqrt(f*f+a*a+p*p),f*=h,a*=h,p*=h,m=a*c-p*u,y=p*i-f*c,v=f*u-a*i,d=1/Math.sqrt(m*m+y*y+v*v),m*=d,y*=d,v*=d,b=y*p-v*a,w=v*f-m*p,M=m*a-y*f,l=this.elements,l[0]=m,l[1]=b,l[2]=-f,l[3]=0,l[4]=y,l[5]=w,l[6]=-a,l[7]=0,l[8]=v,l[9]=M,l[10]=-p,l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,this.translate(-t,-e,-n)},t.prototype.lookAt=function(e,n,r,o,s,i,u,c,l){return this.concat((new t).setLookAt(e,n,r,o,s,i,u,c,l))},t.prototype.dropShadow=function(e,n){var r=new t,o=r.elements,s=e[0]*n[0]+e[1]*n[1]+e[2]*n[2]+e[3]*n[3];return o[0]=s-n[0]*e[0],o[1]=-n[1]*e[0],o[2]=-n[2]*e[0],o[3]=-n[3]*e[0],o[4]=-n[0]*e[1],o[5]=s-n[1]*e[1],o[6]=-n[2]*e[1],o[7]=-n[3]*e[1],o[8]=-n[0]*e[2],o[9]=-n[1]*e[2],o[10]=s-n[2]*e[2],o[11]=-n[3]*e[2],o[12]=-n[0]*e[3],o[13]=-n[1]*e[3],o[14]=-n[2]*e[3],o[15]=s-n[3]*e[3],this.concat(r)},t.prototype.dropShadowDirectionally=function(t,e,n,r,o,s,i,u,c){var l=r*t+o*e+s*n;return this.dropShadow([t,e,n,-l],[i,u,c,0])},t.prototype.concat=function(t){var e,n,r,o,s,i,u,c;if(n=this.elements,r=this.elements,o=t.elements,n===o)for(o=new Float32Array(16),e=0;e<16;++e)o[e]=n[e];for(e=0;e<4;e++)s=r[e],i=r[e+4],u=r[e+8],c=r[e+12],n[e]=s*o[0]+i*o[1]+u*o[2]+c*o[3],n[e+4]=s*o[4]+i*o[5]+u*o[6]+c*o[7],n[e+8]=s*o[8]+i*o[9]+u*o[10]+c*o[11],n[e+12]=s*o[12]+i*o[13]+u*o[14]+c*o[15];return this},t}();e.Mat4=s}])});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cuon_matrix_ts_1 = __webpack_require__(3);
var Midpoint = (function () {
    function Midpoint() {
    }
    Midpoint.between = function (point1, point2) {
        var midX = (point1.x + point2.x) / 2;
        var midY = (point1.y + point2.y) / 2;
        var midZ = (point1.z + point2.z) / 2;
        return new cuon_matrix_ts_1.Vec3(midX, midY, midZ);
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
        var largerZ = Math.max(point1.z, point2.z);
        var smallerZ = Math.min(point1.z, point2.z);
        var thirdX = (largerX - smallerX) / 3;
        var thirdY = (largerY - smallerY) / 3;
        var thirdZ = (largerZ - smallerZ) / 3;
        var firstThird = new cuon_matrix_ts_1.Vec3((smallerX + thirdX), (smallerY + thirdY), (smallerZ + thirdZ));
        var secondThird = new cuon_matrix_ts_1.Vec3((firstThird.x + thirdX), (firstThird.y + thirdY), (firstThird.z + thirdZ));
        return { first: firstThird, second: secondThird };
    };
    return ThirdPoints;
}());
exports.ThirdPoints = ThirdPoints;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cuon_matrix_ts_1 = __webpack_require__(3);
var defaultRenderMode = "points";
var defaultShapeMode = "points";
var defaultBackgroundColor = { red: 0.9, green: 0.9, blue: 0.9 };
var defaultColor = { red: 0.0, green: 0.0, blue: 0.0 };
var defaultEyePosition = new cuon_matrix_ts_1.Vec3(0, 0, 0);
var defaultLookAtPoint = new cuon_matrix_ts_1.Vec3(0, 0, -1);
var defaultUpPosition = new cuon_matrix_ts_1.Vec3(0, 1, 0);
var defaultIsFullscreen = false;
exports.Settings = {
    defaultRendereMode: defaultRenderMode,
    defaultShapeMode: defaultShapeMode,
    defaultPointSize: 10,
    defaultBackgroundColor: defaultBackgroundColor,
    defaultBackgroundAlpha: 1,
    defaultColor: defaultColor,
    defaultEyePosition: defaultEyePosition,
    defaultLookAtPoint: defaultLookAtPoint,
    defaultUpPosition: defaultUpPosition,
    defaultIsFullScreen: defaultIsFullscreen
};


/***/ }),
/* 6 */
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
            default: throw "could not find renderMode named " + mode;
        }
    };
    return RenderModeMapper;
}());
exports.RenderModeMapper = RenderModeMapper;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cuon_matrix_ts_1 = __webpack_require__(3);
var settings_1 = __webpack_require__(5);
var Camera = (function () {
    function Camera(eyePosition, lookAtPoint, upPosition) {
        if (eyePosition === void 0) { eyePosition = settings_1.Settings.defaultEyePosition; }
        if (lookAtPoint === void 0) { lookAtPoint = settings_1.Settings.defaultLookAtPoint; }
        if (upPosition === void 0) { upPosition = settings_1.Settings.defaultUpPosition; }
        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;
        this._viewMatrix = new cuon_matrix_ts_1.Mat4();
        this._viewMatrix.setLookAt(eyePosition.x, eyePosition.y, eyePosition.z, lookAtPoint.x, lookAtPoint.y, lookAtPoint.z, upPosition.x, upPosition.y, upPosition.z);
    }
    Object.defineProperty(Camera.prototype, "viewMatrix", {
        get: function () {
            return this._viewMatrix.elements;
        },
        enumerable: true,
        configurable: true
    });
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
        var newLookAtPoint = new cuon_matrix_ts_1.Vec3(eyePosition.x, eyePosition.y, eyePosition.z - 1);
        var newUpPosition = new cuon_matrix_ts_1.Vec3(eyePosition.x, eyePosition.y + 1, eyePosition.z);
        this.setCameraView(eyePosition, newLookAtPoint, newUpPosition);
    };
    return Camera;
}());
exports.Camera = Camera;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BrowserHelper = (function () {
    function BrowserHelper() {
    }
    BrowserHelper.prototype.isIE = function () {
        return false || !!document.documentMode;
    };
    BrowserHelper.prototype.isEdge = function () {
        return !this.isIE() && !!window.StyleMedia;
    };
    return BrowserHelper;
}());
exports.BrowserHelper = BrowserHelper;


/***/ }),
/* 9 */
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
/* 10 */
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
var cuon_matrix_ts_1 = __webpack_require__(3);
var shape2d_1 = __webpack_require__(2);
var float32Vector_1 = __webpack_require__(1);
var midpoint_1 = __webpack_require__(4);
var precision_1 = __webpack_require__(11);
var constants_1 = __webpack_require__(0);
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(point1, point2, gl, precision, rgbColor) {
        if (precision === void 0) { precision = precision_1.Precision.High; }
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.horizontalRadius = (_this.boundingRect.topRight.x - _this.boundingRect.topLeft.x) / 2;
        _this.verticalRadius = (_this.boundingRect.topLeft.y - _this.boundingRect.bottomLeft.y) / 2;
        _this.center = midpoint_1.Midpoint.between(_this.boundingRect.topLeft, _this.boundingRect.bottomRight);
        _this.leftEndPoint = midpoint_1.Midpoint.between(_this.boundingRect.topLeft, _this.boundingRect.bottomLeft);
        _this.rightEndPoint = midpoint_1.Midpoint.between(_this.boundingRect.topRight, _this.boundingRect.bottomRight);
        _this.precision = precision;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLES;
        return _this;
    }
    Ellipse.prototype.computeVerticies = function () {
        var numberOfPointsAlongTheCurve, numberOfVerticies = 0;
        if (this.precision === precision_1.Precision.High) {
            numberOfPointsAlongTheCurve = Ellipse.highPrecisionNumberOfPointsAlongCurve;
            numberOfVerticies = Ellipse.highPrecisionNumberOfVerticies;
        }
        else if (this.precision === precision_1.Precision.Low) {
            numberOfPointsAlongTheCurve = Ellipse.lowPrecisionNumberOfPointsAlongCurve;
            numberOfVerticies = Ellipse.lowPrecisionNumberOfVerticies;
        }
        var arr = new Float32Array(numberOfVerticies * constants_1.Constants.floatsPerVertex);
        var x = this.leftEndPoint.x;
        var xIncrement = (this.horizontalRadius * 2) / (numberOfPointsAlongTheCurve / 2);
        var previousPointAboveCenter = this.leftEndPoint;
        var previousPointBelowCenter = this.leftEndPoint;
        var insertionIndex = 0;
        for (var i = 0; i < (numberOfPointsAlongTheCurve / 2) - 1; i++) {
            x += xIncrement;
            var y = this.getYDistanceFromCenterForX(x);
            var newPointAboveCenter = new cuon_matrix_ts_1.Vec3(x, y + this.center.y);
            var newPointBelowCenter = new cuon_matrix_ts_1.Vec3(x, this.center.y - y);
            this.addTriangleToFloat32Array(arr, insertionIndex, previousPointAboveCenter, this.center, newPointAboveCenter);
            insertionIndex += constants_1.Constants.floatsPerTriangle;
            this.addTriangleToFloat32Array(arr, insertionIndex, previousPointBelowCenter, this.center, newPointBelowCenter);
            insertionIndex += constants_1.Constants.floatsPerTriangle;
            previousPointAboveCenter = newPointAboveCenter;
            previousPointBelowCenter = newPointBelowCenter;
        }
        this.addTriangleToFloat32Array(arr, insertionIndex, previousPointAboveCenter, this.center, this.rightEndPoint);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, previousPointBelowCenter, this.center, this.rightEndPoint);
        this._verticies = new float32Vector_1.Float32Vector(arr, arr.length);
    };
    Ellipse.prototype.getYDistanceFromCenterForX = function (x) {
        var verticalRadiusSquared = Math.pow(this.verticalRadius, 2);
        return Math.sqrt(verticalRadiusSquared -
            ((verticalRadiusSquared * Math.pow((x - this.center.x), 2)) / Math.pow(this.horizontalRadius, 2)));
    };
    Ellipse.numberOfEndPoints = 2;
    Ellipse.highPrecisionNumberOfPointsAlongCurve = 400 + Ellipse.numberOfEndPoints;
    Ellipse.highPrecisionNumberOfVerticies = Ellipse.highPrecisionNumberOfPointsAlongCurve * constants_1.Constants.verticiesPerTriangle;
    Ellipse.lowPrecisionNumberOfPointsAlongCurve = 8 + Ellipse.numberOfEndPoints;
    Ellipse.lowPrecisionNumberOfVerticies = Ellipse.lowPrecisionNumberOfPointsAlongCurve * constants_1.Constants.verticiesPerTriangle;
    return Ellipse;
}(shape2d_1.Shape2d));
exports.Ellipse = Ellipse;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Precision;
(function (Precision) {
    Precision[Precision["Low"] = 0] = "Low";
    Precision[Precision["High"] = 1] = "High";
})(Precision = exports.Precision || (exports.Precision = {}));


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
var shape2d_1 = __webpack_require__(2);
var float32Vector_1 = __webpack_require__(1);
var midpoint_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(0);
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(point1, point2, gl, rgbColor) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLES;
        return _this;
    }
    Triangle.prototype.computeVerticies = function () {
        var topPoint = midpoint_1.Midpoint.between(this.boundingRect.topLeft, this.boundingRect.topRight);
        var array = new Float32Array(Triangle.numberOfVerticies * constants_1.Constants.floatsPerVertex);
        var insertionIndex = 0;
        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft, topPoint, this.boundingRect.bottomRight);
        this._verticies = new float32Vector_1.Float32Vector(array, array.length);
    };
    Triangle.numberOfVerticies = 3;
    return Triangle;
}(shape2d_1.Shape2d));
exports.Triangle = Triangle;


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
var shape2d_1 = __webpack_require__(2);
var float32Vector_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(0);
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(point1, point2, gl, rgbColor) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLES;
        return _this;
    }
    Rectangle.prototype.computeVerticies = function () {
        var array = new Float32Array(Rectangle.numberOfVerticies * constants_1.Constants.floatsPerVertex);
        var insertionIndex = 0;
        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.topLeft, this.boundingRect.topRight, this.boundingRect.bottomLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft, this.boundingRect.topRight, this.boundingRect.bottomRight);
        this._verticies = new float32Vector_1.Float32Vector(array, array.length);
    };
    Rectangle.numberOfVerticies = 6;
    return Rectangle;
}(shape2d_1.Shape2d));
exports.Rectangle = Rectangle;


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
var shape2d_1 = __webpack_require__(2);
var float32Vector_1 = __webpack_require__(1);
var midpoint_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(0);
var Hexagon = (function (_super) {
    __extends(Hexagon, _super);
    function Hexagon(point1, point2, gl, rgbColor) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLES;
        return _this;
    }
    Hexagon.prototype.computeVerticies = function () {
        var arr = new Float32Array(Hexagon.numberOfVerticies * constants_1.Constants.floatsPerVertex);
        var topThirds = midpoint_1.ThirdPoints.between(this.boundingRect.topLeft, this.boundingRect.topRight);
        var topFirstThird = topThirds.first;
        var topSecondThird = topThirds.second;
        var bottomThirds = midpoint_1.ThirdPoints.between(this.boundingRect.bottomRight, this.boundingRect.bottomLeft);
        var bottomFirstThird = bottomThirds.first;
        var bottomSecondThird = bottomThirds.second;
        var midLeft = midpoint_1.Midpoint.between(this.boundingRect.bottomLeft, this.boundingRect.topLeft);
        var midRight = midpoint_1.Midpoint.between(this.boundingRect.topRight, this.boundingRect.bottomRight);
        var insertionIndex = 0;
        this.addTriangleToFloat32Array(arr, insertionIndex, topFirstThird, bottomFirstThird, midLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, topFirstThird, bottomFirstThird, bottomSecondThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, topFirstThird, topSecondThird, bottomSecondThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, topSecondThird, bottomSecondThird, midRight);
        this._verticies = new float32Vector_1.Float32Vector(arr, arr.length);
    };
    Hexagon.numberOfVerticies = 12;
    return Hexagon;
}(shape2d_1.Shape2d));
exports.Hexagon = Hexagon;


/***/ }),
/* 15 */
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
var shape2d_1 = __webpack_require__(2);
var float32Vector_1 = __webpack_require__(1);
var midpoint_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(0);
var Octogon = (function (_super) {
    __extends(Octogon, _super);
    function Octogon(point1, point2, gl, rgbColor) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLES;
        return _this;
    }
    Octogon.prototype.computeVerticies = function () {
        var arr = new Float32Array(Octogon.numberOfVerticies * constants_1.Constants.floatsPerVertex);
        var topThirds = midpoint_1.ThirdPoints.between(this.boundingRect.topLeft, this.boundingRect.topRight);
        var rightThirds = midpoint_1.ThirdPoints.between(this.boundingRect.topRight, this.boundingRect.bottomRight);
        var bottomThirds = midpoint_1.ThirdPoints.between(this.boundingRect.bottomLeft, this.boundingRect.bottomRight);
        var leftThirds = midpoint_1.ThirdPoints.between(this.boundingRect.topLeft, this.boundingRect.bottomLeft);
        var topLeftThird = topThirds.first;
        var topRightThird = topThirds.second;
        var rightTopThird = rightThirds.second;
        var rightBottomThird = rightThirds.first;
        var bottomLeftThird = bottomThirds.first;
        var bottomRightThird = bottomThirds.second;
        var leftTopThird = leftThirds.second;
        var leftBottomThird = leftThirds.first;
        var insertionIndex = 0;
        this.addTriangleToFloat32Array(arr, insertionIndex, leftTopThird, topLeftThird, leftBottomThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, leftBottomThird, topLeftThird, bottomLeftThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, bottomLeftThird, topLeftThird, bottomRightThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, topLeftThird, bottomRightThird, topRightThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, topRightThird, bottomRightThird, rightBottomThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, topRightThird, rightBottomThird, rightTopThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this._verticies = new float32Vector_1.Float32Vector(arr, arr.length);
    };
    Octogon.numberOfVerticies = 18;
    return Octogon;
}(shape2d_1.Shape2d));
exports.Octogon = Octogon;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var webglRenderer_1 = __webpack_require__(17);
exports.WebGLRenderer = webglRenderer_1.WebGLRenderer;
var colorMapper_1 = __webpack_require__(22);
exports.ColorMapper = colorMapper_1.ColorMapper;
var line_1 = __webpack_require__(23);
exports.Line = line_1.Line;
var shape2d_1 = __webpack_require__(2);
exports.Shape2d = shape2d_1.Shape2d;
var shapeFactory_1 = __webpack_require__(25);
exports.ShapeFactory = shapeFactory_1.ShapeFactory;
var ellipse_1 = __webpack_require__(10);
exports.Ellipse = ellipse_1.Ellipse;
var rectangle_1 = __webpack_require__(13);
exports.Rectangle = rectangle_1.Rectangle;
var hexagon_1 = __webpack_require__(14);
exports.Hexagon = hexagon_1.Hexagon;
var octogon_1 = __webpack_require__(15);
exports.Octogon = octogon_1.Octogon;
var triangle_1 = __webpack_require__(12);
exports.Triangle = triangle_1.Triangle;
var rgbColor_1 = __webpack_require__(9);
exports.RGBColor = rgbColor_1.RGBColor;
var camera_1 = __webpack_require__(7);
exports.Camera = camera_1.Camera;
var point_1 = __webpack_require__(26);
exports.Point = point_1.Point;
var cuon_matrix_ts_1 = __webpack_require__(3);
exports.Vec3 = cuon_matrix_ts_1.Vec3;
var browserHelper_1 = __webpack_require__(8);
exports.BrowserHelper = browserHelper_1.BrowserHelper;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var renderModeMapper_1 = __webpack_require__(6);
var vertexBuffer_1 = __webpack_require__(18);
var camera_1 = __webpack_require__(7);
var constants_1 = __webpack_require__(0);
var shaderSettings_1 = __webpack_require__(19);
var settings_1 = __webpack_require__(5);
var browserHelper_1 = __webpack_require__(8);
var WebGLDebugUtil = __webpack_require__(20);
var WebGLRenderer = (function () {
    function WebGLRenderer(canvas, renderingOptions) {
        if (renderingOptions === void 0) { renderingOptions = {}; }
        var _this = this;
        this._vertexShaderSource = "    attribute vec4 " + shaderSettings_1.ShaderSettings.positionAttributeName + ";\n    attribute vec4 " + shaderSettings_1.ShaderSettings.colorAttributeName + ";\n    uniform mat4 " + shaderSettings_1.ShaderSettings.viewMatrixUniformName + ";\n    uniform float " + shaderSettings_1.ShaderSettings.pointSizeUniformName + ";\n    varying vec4 v_color;\n    void main(void)\n    {\n        gl_Position = " + shaderSettings_1.ShaderSettings.viewMatrixUniformName + " * " + shaderSettings_1.ShaderSettings.positionAttributeName + ";\n        gl_PointSize = " + shaderSettings_1.ShaderSettings.pointSizeUniformName + ";\n        v_color = " + shaderSettings_1.ShaderSettings.colorAttributeName + ";\n    }";
        this._fragmentShaderSource = "    precision mediump float;\n    uniform vec4 u_fragColor;\n    varying vec4 v_color;\n    void main(void)\n    {\n        gl_FragColor = v_color;\n    }";
        this.handleContextLost = function () {
            console.log("lost the context");
            _this.stop();
        };
        this.handleContextRestored = function () {
            console.log("restored the context");
            _this.start();
        };
        this.renderLoop = function () {
            _this.draw();
            _this._animationFrameRequestId = _this._window.requestAnimationFrame(_this.renderLoop);
        };
        this.resizeCanvas = function (canvas, window, renderer) {
            renderer.setViewPortDimensions(window.innerWidth, window.innerHeight);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        this._canvas = WebGLDebugUtil.makeLostContextSimulatingCanvas(canvas);
        this._canvas.loseContextInNCalls(5);
        this._browserHelper = renderingOptions.browserHelper || new browserHelper_1.BrowserHelper();
        this.getContext();
        this.initializeRenderingOptions(renderingOptions);
        this.setViewPortDimensions(canvas.width, canvas.height);
        this.initShaders();
        this.initializeVertexBuffers();
        this._lineRenderMode = renderModeMapper_1.RenderModeMapper.renderModeToWebGlConstant(constants_1.Constants.lineGlRenderMode, this.gl);
        this.setupWindowCallbacks();
    }
    Object.defineProperty(WebGLRenderer.prototype, "renderMode", {
        get: function () {
            return this._renderMode;
        },
        set: function (renderMode) {
            this._renderMode = renderMode;
            this._glRenderMode = renderModeMapper_1.RenderModeMapper.renderModeToWebGlConstant(renderMode, this.gl);
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
    Object.defineProperty(WebGLRenderer.prototype, "isFullscreen", {
        get: function () {
            return this._isFullscreen;
        },
        set: function (value) {
            this._isFullscreen = value;
            this.setupWindowCallbacks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "resizeCallback", {
        get: function () {
            return this._resizeCallback;
        },
        set: function (value) {
            this._resizeCallback = value;
            this.setupWindowCallbacks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        set: function (value) {
            this._camera = value;
        },
        enumerable: true,
        configurable: true
    });
    WebGLRenderer.prototype.setViewPortDimensions = function (newWidth, newHeight) {
        this.gl.viewport(0, 0, newWidth, newHeight);
    };
    WebGLRenderer.prototype.addXYZPointToScene = function (x, y, z, r, g, b, renderMode) {
        if (z === void 0) { z = 0; }
        if (r === void 0) { r = settings_1.Settings.defaultColor.red; }
        if (g === void 0) { g = settings_1.Settings.defaultColor.green; }
        if (b === void 0) { b = settings_1.Settings.defaultColor.blue; }
        if (renderMode === void 0) { renderMode = this._glRenderMode; }
        switch (renderMode) {
            case this.gl.POINTS:
                this._pointsVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINES:
                this._linesVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINE_STRIP:
                this._lineStripVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINE_LOOP:
                this._lineLoopVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLES:
                this._trianglesVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLE_STRIP:
                this._triangleStripVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLE_FAN:
                this._triangleFanVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
        }
    };
    WebGLRenderer.prototype.addShapeToScene = function (shape) {
        if (shape.glRenderMode === this._lineRenderMode) {
            this._lineFloat32Arrays.push(shape.verticies);
        }
        else {
            var vertexIndex = 0;
            for (var i = 0; i < shape.verticies.length; i += constants_1.Constants.floatsPerVertex) {
                var x = shape.verticies[vertexIndex];
                vertexIndex++;
                var y = shape.verticies[vertexIndex];
                vertexIndex++;
                var z = shape.verticies[vertexIndex];
                vertexIndex++;
                var r = shape.verticies[vertexIndex];
                vertexIndex++;
                var g = shape.verticies[vertexIndex];
                vertexIndex++;
                var b = shape.verticies[vertexIndex];
                vertexIndex++;
                this.addXYZPointToScene(x, y, z, r, g, b, shape.glRenderMode);
            }
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
    WebGLRenderer.prototype.start = function () {
        this.renderLoop();
    };
    WebGLRenderer.prototype.stop = function () {
        this._window.cancelAnimationFrame(this._animationFrameRequestId);
    };
    WebGLRenderer.prototype.draw = function () {
        this.gl.clearColor(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, settings_1.Settings.defaultBackgroundAlpha);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        for (var _i = 0, _a = this._vertexBuffers; _i < _a.length; _i++) {
            var vb = _a[_i];
            for (var _b = 0, _c = vb.verticiesStack; _b < _c.length; _b++) {
                var verts = _c[_b];
                if (verts.size > 0) {
                    this.drawGlArray(verts.getTrimmedArray(), vb.glRenderMode);
                }
            }
        }
        for (var _d = 0, _e = this._lineFloat32Arrays; _d < _e.length; _d++) {
            var lineVerticies = _e[_d];
            if (lineVerticies.length > 0) {
                this.drawGlArray(lineVerticies, this._lineRenderMode);
            }
        }
    };
    WebGLRenderer.prototype.setCanvasEventHandlers = function () {
        this._canvas.addEventListener("webglcontextlost", this.handleContextLost, false);
        this._canvas.addEventListener("webglcontextrestored", this.handleContextRestored, false);
    };
    WebGLRenderer.prototype.getContext = function () {
        var gl;
        var isIE = this._browserHelper.isIE();
        var isEdge = this._browserHelper.isEdge();
        var contextId = (isIE || isEdge) ? "experimental-webgl" : "webgl";
        try {
            gl = this._canvas.getContext(contextId, {
                alpha: false,
                antialias: false,
                depth: false
            });
        }
        catch (e) {
            throw "error creating webgl context!: " + e.toString();
        }
        if (gl === null) {
            throw "error creating webgl context!, gl === null";
        }
        this.gl = gl;
    };
    WebGLRenderer.prototype.initializeRenderingOptions = function (renderingOptions) {
        this._renderMode = (renderingOptions && renderingOptions.renderMode) || settings_1.Settings.defaultRendereMode;
        this._glRenderMode = renderModeMapper_1.RenderModeMapper.renderModeToWebGlConstant(this._renderMode, this.gl);
        this._pointSize = (renderingOptions && renderingOptions.pointSize) || settings_1.Settings.defaultPointSize;
        this._backgroundColor = (renderingOptions && renderingOptions.backgroundColor) || settings_1.Settings.defaultBackgroundColor;
        this._camera = (renderingOptions && renderingOptions.camera) || new camera_1.Camera();
        this._window = (renderingOptions && renderingOptions.window) || window;
        this._isFullscreen = (renderingOptions && renderingOptions.fullscreen) || settings_1.Settings.defaultIsFullScreen;
        this._resizeCallback = (renderingOptions && renderingOptions.resizeCallback) || this.resizeCanvas;
    };
    WebGLRenderer.prototype.initializeVertexBuffers = function () {
        this._pointsVertexBuffer = new vertexBuffer_1.VertexBuffer(this.gl.POINTS, this.gl);
        this._linesVertexBuffer = new vertexBuffer_1.VertexBuffer(this.gl.LINES, this.gl);
        this._lineStripVertexBuffer = new vertexBuffer_1.VertexBuffer(this.gl.LINE_STRIP, this.gl);
        this._lineLoopVertexBuffer = new vertexBuffer_1.VertexBuffer(this.gl.LINE_LOOP, this.gl);
        this._trianglesVertexBuffer = new vertexBuffer_1.VertexBuffer(this.gl.TRIANGLES, this.gl);
        this._triangleStripVertexBuffer = new vertexBuffer_1.VertexBuffer(this.gl.TRIANGLE_STRIP, this.gl);
        this._triangleFanVertexBuffer = new vertexBuffer_1.VertexBuffer(this.gl.TRIANGLE_FAN, this.gl);
        this._vertexBuffers = [
            this._pointsVertexBuffer,
            this._linesVertexBuffer,
            this._lineStripVertexBuffer,
            this._lineLoopVertexBuffer,
            this._trianglesVertexBuffer,
            this._triangleStripVertexBuffer,
            this._triangleFanVertexBuffer
        ];
        this._lineFloat32Arrays = [];
    };
    WebGLRenderer.prototype.drawGlArray = function (arr, renderMode) {
        var a_position = this.gl.getAttribLocation(this._shaderProgram, shaderSettings_1.ShaderSettings.positionAttributeName);
        var a_color = this.gl.getAttribLocation(this._shaderProgram, shaderSettings_1.ShaderSettings.colorAttributeName);
        var u_pointSize = this.gl.getUniformLocation(this._shaderProgram, shaderSettings_1.ShaderSettings.pointSizeUniformName);
        var u_viewMatrix = this.gl.getUniformLocation(this._shaderProgram, shaderSettings_1.ShaderSettings.viewMatrixUniformName);
        if (!u_pointSize || !u_viewMatrix) {
            var uniformsMap = {};
            uniformsMap[shaderSettings_1.ShaderSettings.pointSizeUniformName] = u_pointSize;
            uniformsMap[shaderSettings_1.ShaderSettings.viewMatrixUniformName] = u_viewMatrix;
            var errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw errorMessage;
        }
        var floatSize = arr.BYTES_PER_ELEMENT;
        var bytesPerPoint = floatSize * constants_1.Constants.floatsPerPoint;
        var bytesPerVertex = floatSize * constants_1.Constants.floatsPerVertex;
        var vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, arr, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(a_position, constants_1.Constants.floatsPerPoint, this.gl.FLOAT, false, bytesPerVertex, 0);
        this.gl.enableVertexAttribArray(a_position);
        this.gl.vertexAttribPointer(a_color, constants_1.Constants.floatsPerColor, this.gl.FLOAT, false, bytesPerVertex, bytesPerPoint);
        this.gl.enableVertexAttribArray(a_color);
        this.gl.uniformMatrix4fv(u_viewMatrix, false, this._camera.viewMatrix);
        this.gl.uniform1f(u_pointSize, this._pointSize);
        this.gl.drawArrays(renderMode, 0, (arr.length / constants_1.Constants.floatsPerVertex));
    };
    WebGLRenderer.prototype.initShaders = function () {
        var fragmentShader = this.createShader(this._fragmentShaderSource, "fragment");
        var vertexShader = this.createShader(this._vertexShaderSource, "vertex");
        var shader = this.gl.createProgram();
        if (shader === null) {
            throw "could not create shader program";
        }
        this._shaderProgram = shader;
        this.gl.attachShader(this._shaderProgram, vertexShader);
        this.gl.attachShader(this._shaderProgram, fragmentShader);
        this.gl.linkProgram(this._shaderProgram);
        if (!this.gl.getProgramParameter(this._shaderProgram, this.gl.LINK_STATUS)) {
            throw "could not link shader program";
        }
        this.gl.useProgram(this._shaderProgram);
    };
    WebGLRenderer.prototype.createShader = function (shaderSource, type) {
        var shader = null;
        if (type === "fragment") {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        }
        else if (type === "vertex") {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        }
        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw "could not compile shader, shader info log: " + this.gl.getShaderInfoLog(shader);
        }
        return shader;
    };
    WebGLRenderer.prototype.createUniforNotFoundErrorMessage = function (uniformsMap) {
        var result = "cannot find uniform in shader program\n";
        result += "potential culprits:\n";
        for (var key in uniformsMap) {
            if (uniformsMap.hasOwnProperty(key)) {
                result += "\t" + key + ": " + uniformsMap[key] + "\n";
            }
        }
        return result;
    };
    WebGLRenderer.prototype.setupWindowCallbacks = function () {
        var _this = this;
        if (this._isFullscreen) {
            this._window.addEventListener("resize", function () {
                _this._resizeCallback(_this._canvas, _this._window, _this);
            }, false);
            this._resizeCallback(this._canvas, this._window, this);
        }
    };
    return WebGLRenderer;
}());
exports.WebGLRenderer = WebGLRenderer;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var float32Vector_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(0);
var VertexBuffer = (function () {
    function VertexBuffer(glRenderMode, gl) {
        if (this.glRenderModeValidator(glRenderMode, gl)) {
            this.glRenderMode = glRenderMode;
            this._topVertexVector = new float32Vector_1.Float32Vector(new Float32Array(0), constants_1.Constants.vertexBufferFloatLimit);
            this.verticiesStack = new Array();
            this.verticiesStack.push(this._topVertexVector);
        }
        else {
            throw "cannot initialize vertex buffer of unrecognized gl render mode";
        }
    }
    VertexBuffer.prototype.addVertex = function (vertex) {
        if (vertex.length !== constants_1.Constants.floatsPerVertex) {
            throw "cannot add vertex repersented by " + vertex.length + " floats, " +
                ("we only accept verticies of " + constants_1.Constants.floatsPerVertex + " floats (x, y, z, r, g, b)");
        }
        if (this._topVertexVector.size + vertex.length <= constants_1.Constants.vertexBufferFloatLimit) {
            this._topVertexVector.addArray(vertex);
        }
        else {
            this._topVertexVector = new float32Vector_1.Float32Vector(vertex, constants_1.Constants.vertexBufferFloatLimit);
            this.verticiesStack.push(this._topVertexVector);
        }
    };
    VertexBuffer.prototype.glRenderModeValidator = function (glRenderMode, gl) {
        switch (glRenderMode) {
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
exports.ShaderSettings = {
    positionAttributeName: "a_position",
    colorAttributeName: "a_color",
    pointSizeUniformName: "u_pointSize",
    viewMatrixUniformName: "u_viewMatrix"
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
** Copyright (c) 2012 The Khronos Group Inc.
**
** Permission is hereby granted, free of charge, to any person obtaining a
** copy of this software and/or associated documentation files (the
** "Materials"), to deal in the Materials without restriction, including
** without limitation the rights to use, copy, modify, merge, publish,
** distribute, sublicense, and/or sell copies of the Materials, and to
** permit persons to whom the Materials are furnished to do so, subject to
** the following conditions:
**
** The above copyright notice and this permission notice shall be included
** in all copies or substantial portions of the Materials.
**
** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
*/

//Ported to node by Marcin Ignac on 2016-05-20

// Various functions for helping debug WebGL apps.

WebGLDebugUtils = function() {

//polyfill window in node
if (typeof(window) == 'undefined') {
    window = global;
}

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
    window.console.log(msg);
  }
};

/**
 * Wrapped error logging function.
 * @param {string} msg Message to log.
 */
var error = function(msg) {
  if (window.console && window.console.error) {
    window.console.error(msg);
  } else {
    log(msg);
  }
};


/**
 * Which arguments are enums based on the number of arguments to the function.
 * So
 *    'texImage2D': {
 *       9: { 0:true, 2:true, 6:true, 7:true },
 *       6: { 0:true, 2:true, 3:true, 4:true },
 *    },
 *
 * means if there are 9 arguments then 6 and 7 are enums, if there are 6
 * arguments 3 and 4 are enums
 *
 * @type {!Object.<number, !Object.<number, string>}
 */
var glValidEnumContexts = {
  // Generic setters and getters

  'enable': {1: { 0:true }},
  'disable': {1: { 0:true }},
  'getParameter': {1: { 0:true }},

  // Rendering

  'drawArrays': {3:{ 0:true }},
  'drawElements': {4:{ 0:true, 2:true }},

  // Shaders

  'createShader': {1: { 0:true }},
  'getShaderParameter': {2: { 1:true }},
  'getProgramParameter': {2: { 1:true }},
  'getShaderPrecisionFormat': {2: { 0: true, 1:true }},

  // Vertex attributes

  'getVertexAttrib': {2: { 1:true }},
  'vertexAttribPointer': {6: { 2:true }},

  // Textures

  'bindTexture': {2: { 0:true }},
  'activeTexture': {1: { 0:true }},
  'getTexParameter': {2: { 0:true, 1:true }},
  'texParameterf': {3: { 0:true, 1:true }},
  'texParameteri': {3: { 0:true, 1:true, 2:true }},
  'texImage2D': {
     9: { 0:true, 2:true, 6:true, 7:true },
     6: { 0:true, 2:true, 3:true, 4:true }
  },
  'texSubImage2D': {
    9: { 0:true, 6:true, 7:true },
    7: { 0:true, 4:true, 5:true }
  },
  'copyTexImage2D': {8: { 0:true, 2:true }},
  'copyTexSubImage2D': {8: { 0:true }},
  'generateMipmap': {1: { 0:true }},
  'compressedTexImage2D': {7: { 0: true, 2:true }},
  'compressedTexSubImage2D': {8: { 0: true, 6:true }},

  // Buffer objects

  'bindBuffer': {2: { 0:true }},
  'bufferData': {3: { 0:true, 2:true }},
  'bufferSubData': {3: { 0:true }},
  'getBufferParameter': {2: { 0:true, 1:true }},

  // Renderbuffers and framebuffers

  'pixelStorei': {2: { 0:true, 1:true }},
  'readPixels': {7: { 4:true, 5:true }},
  'bindRenderbuffer': {2: { 0:true }},
  'bindFramebuffer': {2: { 0:true }},
  'checkFramebufferStatus': {1: { 0:true }},
  'framebufferRenderbuffer': {4: { 0:true, 1:true, 2:true }},
  'framebufferTexture2D': {5: { 0:true, 1:true, 2:true }},
  'getFramebufferAttachmentParameter': {3: { 0:true, 1:true, 2:true }},
  'getRenderbufferParameter': {2: { 0:true, 1:true }},
  'renderbufferStorage': {4: { 0:true, 1:true }},

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': {1: { 0: { 'enumBitwiseOr': ['COLOR_BUFFER_BIT', 'DEPTH_BUFFER_BIT', 'STENCIL_BUFFER_BIT'] }}},
  'depthFunc': {1: { 0:true }},
  'blendFunc': {2: { 0:true, 1:true }},
  'blendFuncSeparate': {4: { 0:true, 1:true, 2:true, 3:true }},
  'blendEquation': {1: { 0:true }},
  'blendEquationSeparate': {2: { 0:true, 1:true }},
  'stencilFunc': {3: { 0:true }},
  'stencilFuncSeparate': {4: { 0:true, 1:true }},
  'stencilMaskSeparate': {2: { 0:true }},
  'stencilOp': {3: { 0:true, 1:true, 2:true }},
  'stencilOpSeparate': {4: { 0:true, 1:true, 2:true, 3:true }},

  // Culling

  'cullFace': {1: { 0:true }},
  'frontFace': {1: { 0:true }},

  // ANGLE_instanced_arrays extension

  'drawArraysInstancedANGLE': {4: { 0:true }},
  'drawElementsInstancedANGLE': {5: { 0:true, 2:true }},

  // EXT_blend_minmax extension

  'blendEquationEXT': {1: { 0:true }}
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Map of names to numbers.
 * @type {Object}
 */
var enumStringToValue = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = { };
    enumStringToValue = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
        enumStringToValue[propertyName] = ctx[propertyName];
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? ("gl." + name) :
      ("/*UNKNOWN WebGL ENUM*/ 0x" + value.toString(16) + "");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} numArgs the number of arguments passed to the function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, numArgs, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    var funcInfo = funcInfo[numArgs];
    if (funcInfo !== undefined) {
      if (funcInfo[argumentIndex]) {
        if (typeof funcInfo[argumentIndex] === 'object' &&
            funcInfo[argumentIndex]['enumBitwiseOr'] !== undefined) {
          var enums = funcInfo[argumentIndex]['enumBitwiseOr'];
          var orResult = 0;
          var orEnums = [];
          for (var i = 0; i < enums.length; ++i) {
            var enumValue = enumStringToValue[enums[i]];
            if ((value & enumValue) !== 0) {
              orResult |= enumValue;
              orEnums.push(glEnumToString(enumValue));
            }
          }
          if (orResult === value) {
            return orEnums.join(' | ');
          } else {
            return glEnumToString(value);
          }
        } else {
          return glEnumToString(value);
        }
      }
    }
  }
  if (value === null) {
    return "null";
  } else if (value === undefined) {
    return "undefined";
  } else {
    return value.toString();
  }
}

/**
 * Converts the arguments of a WebGL function to a string.
 * Attempts to convert enum arguments to strings.
 *
 * @param {string} functionName the name of the WebGL function.
 * @param {number} args The arguments.
 * @return {string} The arguments as a string.
 */
function glFunctionArgsToString(functionName, args) {
  // apparently we can't do args.join(",");
  var argStr = "";
  var numArgs = args.length;
  for (var ii = 0; ii < numArgs; ++ii) {
    argStr += ((ii == 0) ? '' : ', ') +
        glFunctionArgToString(functionName, numArgs, ii, args[ii]);
  }
  return argStr;
};


function makePropertyWrapper(wrapper, original, propertyName) {
  //log("wrap prop: " + propertyName);
  wrapper.__defineGetter__(propertyName, function() {
    return original[propertyName];
  });
  // TODO(gmane): this needs to handle properties that take more than
  // one value?
  wrapper.__defineSetter__(propertyName, function(value) {
    //log("set: " + propertyName);
    original[propertyName] = value;
  });
}

// Makes a function that calls a function on another object.
function makeFunctionWrapper(original, functionName) {
  //log("wrap fn: " + functionName);
  var f = original[functionName];
  return function() {
    //log("call: " + functionName);
    var result = f.apply(original, arguments);
    return result;
  };
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 * @param {!function(funcName, args): void} opt_onFunc The
 *        function to call when each webgl function is called.
 *        You can use this to log all calls for example.
 * @param {!WebGLRenderingContext} opt_err_ctx The webgl context
 *        to call getError on if different than ctx.
 */
function makeDebugContext(ctx, opt_onErrorFunc, opt_onFunc, opt_err_ctx) {
  opt_err_ctx = opt_err_ctx || ctx;
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        var numArgs = args.length;
        for (var ii = 0; ii < numArgs; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
              glFunctionArgToString(functionName, numArgs, ii, args[ii]);
        }
        error("WebGL error "+ glEnumToString(err) + " in "+ functionName +
              "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      if (opt_onFunc) {
        opt_onFunc(functionName, arguments);
      }
      var result = ctx[functionName].apply(ctx, arguments);
      var err = opt_err_ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
      if (propertyName != 'getExtension') {
        wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
      } else {
        var wrapped = makeErrorWrapper(ctx, propertyName);
        wrapper[propertyName] = function () {
          var result = wrapped.apply(ctx, arguments);
          return makeDebugContext(result, opt_onErrorFunc, opt_onFunc, opt_err_ctx);
        };
      }
    } else {
      makePropertyWrapper(wrapper, ctx, propertyName);
    }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow.hasOwnProperty(err)) {
        if (glErrorShadow[err]) {
          glErrorShadow[err] = false;
          return err;
        }
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

function resetToInitialState(ctx) {
  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
  var tmp = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
  for (var ii = 0; ii < numAttribs; ++ii) {
    ctx.disableVertexAttribArray(ii);
    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
    ctx.vertexAttrib1f(ii, 0);
  }
  ctx.deleteBuffer(tmp);

  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    ctx.activeTexture(ctx.TEXTURE0 + ii);
    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    ctx.bindTexture(ctx.TEXTURE_2D, null);
  }

  ctx.activeTexture(ctx.TEXTURE0);
  ctx.useProgram(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
  ctx.disable(ctx.BLEND);
  ctx.disable(ctx.CULL_FACE);
  ctx.disable(ctx.DEPTH_TEST);
  ctx.disable(ctx.DITHER);
  ctx.disable(ctx.SCISSOR_TEST);
  ctx.blendColor(0, 0, 0, 0);
  ctx.blendEquation(ctx.FUNC_ADD);
  ctx.blendFunc(ctx.ONE, ctx.ZERO);
  ctx.clearColor(0, 0, 0, 0);
  ctx.clearDepth(1);
  ctx.clearStencil(-1);
  ctx.colorMask(true, true, true, true);
  ctx.cullFace(ctx.BACK);
  ctx.depthFunc(ctx.LESS);
  ctx.depthMask(true);
  ctx.depthRange(0, 1);
  ctx.frontFace(ctx.CCW);
  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
  ctx.lineWidth(1);
  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  // TODO: Delete this IF.
  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
  }
  ctx.polygonOffset(0, 0);
  ctx.sampleCoverage(1, false);
  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
  ctx.stencilMask(0xFFFFFFFF);
  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
  ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

  // TODO: This should NOT be needed but Firefox fails with 'hint'
  while(ctx.getError());
}

function makeLostContextSimulatingCanvas(canvas) {
  var unwrappedContext_;
  var wrappedContext_;
  var onLost_ = [];
  var onRestored_ = [];
  var wrappedContext_ = {};
  var contextId_ = 1;
  var contextLost_ = false;
  var resourceId_ = 0;
  var resourceDb_ = [];
  var numCallsToLoseContext_ = 0;
  var numCalls_ = 0;
  var canRestore_ = false;
  var restoreTimeout_ = 0;

  // Holds booleans for each GL error so can simulate errors.
  var glErrorShadow_ = { };

  canvas.getContext = function(f) {
    return function() {
      var ctx = f.apply(canvas, arguments);
      // Did we get a context and is it a WebGL context?
      if (ctx instanceof WebGLRenderingContext) {
        if (ctx != unwrappedContext_) {
          if (unwrappedContext_) {
            throw "got different context"
          }
          unwrappedContext_ = ctx;
          wrappedContext_ = makeLostContextSimulatingContext(unwrappedContext_);
        }
        return wrappedContext_;
      }
      return ctx;
    }
  }(canvas.getContext);

  function wrapEvent(listener) {
    if (typeof(listener) == "function") {
      return listener;
    } else {
      return function(info) {
        listener.handleEvent(info);
      }
    }
  }

  var addOnContextLostListener = function(listener) {
    onLost_.push(wrapEvent(listener));
  };

  var addOnContextRestoredListener = function(listener) {
    onRestored_.push(wrapEvent(listener));
  };


  function wrapAddEventListener(canvas) {
    var f = canvas.addEventListener;
    canvas.addEventListener = function(type, listener, bubble) {
      switch (type) {
        case 'webglcontextlost':
          addOnContextLostListener(listener);
          break;
        case 'webglcontextrestored':
          addOnContextRestoredListener(listener);
          break;
        default:
          f.apply(canvas, arguments);
      }
    };
  }

  wrapAddEventListener(canvas);

  canvas.loseContext = function() {
    if (!contextLost_) {
      contextLost_ = true;
      numCallsToLoseContext_ = 0;
      ++contextId_;
      while (unwrappedContext_.getError());
      clearErrors();
      glErrorShadow_[unwrappedContext_.CONTEXT_LOST_WEBGL] = true;
      var event = makeWebGLContextEvent("context lost");
      var callbacks = onLost_.slice();
      setTimeout(function() {
          //log("numCallbacks:" + callbacks.length);
          for (var ii = 0; ii < callbacks.length; ++ii) {
            //log("calling callback:" + ii);
            callbacks[ii](event);
          }
          if (restoreTimeout_ >= 0) {
            setTimeout(function() {
                canvas.restoreContext();
              }, restoreTimeout_);
          }
        }, 0);
    }
  };

  canvas.restoreContext = function() {
    if (contextLost_) {
      if (onRestored_.length) {
        setTimeout(function() {
            if (!canRestore_) {
              throw "can not restore. webglcontestlost listener did not call event.preventDefault";
            }
            freeResources();
            resetToInitialState(unwrappedContext_);
            contextLost_ = false;
            numCalls_ = 0;
            canRestore_ = false;
            var callbacks = onRestored_.slice();
            var event = makeWebGLContextEvent("context restored");
            for (var ii = 0; ii < callbacks.length; ++ii) {
              callbacks[ii](event);
            }
          }, 0);
      }
    }
  };

  canvas.loseContextInNCalls = function(numCalls) {
    if (contextLost_) {
      throw "You can not ask a lost contet to be lost";
    }
    numCallsToLoseContext_ = numCalls_ + numCalls;
  };

  canvas.getNumCalls = function() {
    return numCalls_;
  };

  canvas.setRestoreTimeout = function(timeout) {
    restoreTimeout_ = timeout;
  };

  function isWebGLObject(obj) {
    //return false;
    return (obj instanceof WebGLBuffer ||
            obj instanceof WebGLFramebuffer ||
            obj instanceof WebGLProgram ||
            obj instanceof WebGLRenderbuffer ||
            obj instanceof WebGLShader ||
            obj instanceof WebGLTexture);
  }

  function checkResources(args) {
    for (var ii = 0; ii < args.length; ++ii) {
      var arg = args[ii];
      if (isWebGLObject(arg)) {
        return arg.__webglDebugContextLostId__ == contextId_;
      }
    }
    return true;
  }

  function clearErrors() {
    var k = Object.keys(glErrorShadow_);
    for (var ii = 0; ii < k.length; ++ii) {
      delete glErrorShadow_[k];
    }
  }

  function loseContextIfTime() {
    ++numCalls_;
    if (!contextLost_) {
      if (numCallsToLoseContext_ == numCalls_) {
        canvas.loseContext();
      }
    }
  }

  // Makes a function that simulates WebGL when out of context.
  function makeLostContextFunctionWrapper(ctx, functionName) {
    var f = ctx[functionName];
    return function() {
      // log("calling:" + functionName);
      // Only call the functions if the context is not lost.
      loseContextIfTime();
      if (!contextLost_) {
        //if (!checkResources(arguments)) {
        //  glErrorShadow_[wrappedContext_.INVALID_OPERATION] = true;
        //  return;
        //}
        var result = f.apply(ctx, arguments);
        return result;
      }
    };
  }

  function freeResources() {
    for (var ii = 0; ii < resourceDb_.length; ++ii) {
      var resource = resourceDb_[ii];
      if (resource instanceof WebGLBuffer) {
        unwrappedContext_.deleteBuffer(resource);
      } else if (resource instanceof WebGLFramebuffer) {
        unwrappedContext_.deleteFramebuffer(resource);
      } else if (resource instanceof WebGLProgram) {
        unwrappedContext_.deleteProgram(resource);
      } else if (resource instanceof WebGLRenderbuffer) {
        unwrappedContext_.deleteRenderbuffer(resource);
      } else if (resource instanceof WebGLShader) {
        unwrappedContext_.deleteShader(resource);
      } else if (resource instanceof WebGLTexture) {
        unwrappedContext_.deleteTexture(resource);
      }
    }
  }

  function makeWebGLContextEvent(statusMessage) {
    return {
      statusMessage: statusMessage,
      preventDefault: function() {
          canRestore_ = true;
        }
    };
  }

  return canvas;

  function makeLostContextSimulatingContext(ctx) {
    // copy all functions and properties to wrapper
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'function') {
         wrappedContext_[propertyName] = makeLostContextFunctionWrapper(
             ctx, propertyName);
       } else {
         makePropertyWrapper(wrappedContext_, ctx, propertyName);
       }
    }

    // Wrap a few functions specially.
    wrappedContext_.getError = function() {
      loseContextIfTime();
      if (!contextLost_) {
        var err;
        while (err = unwrappedContext_.getError()) {
          glErrorShadow_[err] = true;
        }
      }
      for (var err in glErrorShadow_) {
        if (glErrorShadow_[err]) {
          delete glErrorShadow_[err];
          return err;
        }
      }
      return wrappedContext_.NO_ERROR;
    };

    var creationFunctions = [
      "createBuffer",
      "createFramebuffer",
      "createProgram",
      "createRenderbuffer",
      "createShader",
      "createTexture"
    ];
    for (var ii = 0; ii < creationFunctions.length; ++ii) {
      var functionName = creationFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          var obj = f.apply(ctx, arguments);
          obj.__webglDebugContextLostId__ = contextId_;
          resourceDb_.push(obj);
          return obj;
        };
      }(ctx[functionName]);
    }

    var functionsThatShouldReturnNull = [
      "getActiveAttrib",
      "getActiveUniform",
      "getBufferParameter",
      "getContextAttributes",
      "getAttachedShaders",
      "getFramebufferAttachmentParameter",
      "getParameter",
      "getProgramParameter",
      "getProgramInfoLog",
      "getRenderbufferParameter",
      "getShaderParameter",
      "getShaderInfoLog",
      "getShaderSource",
      "getTexParameter",
      "getUniform",
      "getUniformLocation",
      "getVertexAttrib"
    ];
    for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
      var functionName = functionsThatShouldReturnNull[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    var isFunctions = [
      "isBuffer",
      "isEnabled",
      "isFramebuffer",
      "isProgram",
      "isRenderbuffer",
      "isShader",
      "isTexture"
    ];
    for (var ii = 0; ii < isFunctions.length; ++ii) {
      var functionName = isFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return false;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    wrappedContext_.checkFramebufferStatus = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return wrappedContext_.FRAMEBUFFER_UNSUPPORTED;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.checkFramebufferStatus);

    wrappedContext_.getAttribLocation = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return -1;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getAttribLocation);

    wrappedContext_.getVertexAttribOffset = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return 0;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getVertexAttribOffset);

    wrappedContext_.isContextLost = function() {
      return contextLost_;
    };

    return wrappedContext_;
  }
}

return {
  /**
   * Initializes this module. Safe to call more than once.
   * @param {!WebGLRenderingContext} ctx A WebGL context. If
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 2, 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} numArgs The number of arguments
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Converts the arguments of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} args The arguments.
   * @return {string} The arguments as a string.
   */
  'glFunctionArgsToString': glFunctionArgsToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) +
   *            " was caused by call to " + funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   * @param {!function(funcName, args): void} opt_onFunc The
   *     function to call when each webgl function is called. You
   *     can use this to log all calls for example.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a canvas element returns a wrapped canvas element that will
   * simulate lost context. The canvas returned adds the following functions.
   *
   * loseContext:
   *   simulates a lost context event.
   *
   * restoreContext:
   *   simulates the context being restored.
   *
   * lostContextInNCalls:
   *   loses the context after N gl calls.
   *
   * getNumCalls:
   *   tells you how many gl calls there have been so far.
   *
   * setRestoreTimeout:
   *   sets the number of milliseconds until the context is restored
   *   after it has been lost. Defaults to 0. Pass -1 to prevent
   *   automatic restoring.
   *
   * @param {!Canvas} canvas The canvas element to wrap.
   */
  'makeLostContextSimulatingCanvas': makeLostContextSimulatingCanvas,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();

module.exports = WebGLDebugUtils;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rgbColor_1 = __webpack_require__(9);
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
            default: throw "could not find color " + color;
        }
    };
    return ColorMapper;
}());
exports.ColorMapper = ColorMapper;


/***/ }),
/* 23 */
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
var shape2d_1 = __webpack_require__(2);
var float32Vector_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(0);
var renderModeMapper_1 = __webpack_require__(6);
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(point, gl, rgbColor) {
        var _this = _super.call(this, rgbColor) || this;
        var array = new Float32Array(constants_1.Constants.floatsPerVertex);
        _this._vertexPositions = new Array();
        _this._vertexPositions = new Array();
        _this._vertexPositions.push(point);
        _this.computeVerticies();
        _this.glRenderMode = renderModeMapper_1.RenderModeMapper.renderModeToWebGlConstant(constants_1.Constants.lineGlRenderMode, gl);
        return _this;
    }
    Object.defineProperty(Line.prototype, "verticies", {
        get: function () {
            return this._verticies.getTrimmedArray();
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.computeVerticies = function () {
        var arr = new Float32Array(this._vertexPositions.length * constants_1.Constants.floatsPerVertex);
        for (var i = 0; i < this._vertexPositions.length; i++) {
            var insertionIndex = i * constants_1.Constants.floatsPerVertex;
            var vertexPosition = this._vertexPositions[i];
            this.addXYZAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }
        this._verticies = new float32Vector_1.Float32Vector(arr);
    };
    Line.prototype.addVertex = function (vertex) {
        this._vertexPositions.push(vertex);
        var array = new Float32Array(constants_1.Constants.floatsPerVertex);
        this.addXYZAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this._verticies.addArray(array);
    };
    return Line;
}(shape2d_1.Shape2d));
exports.Line = Line;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cuon_matrix_ts_1 = __webpack_require__(3);
var BoundingRectangle = (function () {
    function BoundingRectangle(point1, point2) {
        if (this.isTopLeftBottomRight(point1, point2)) {
            this.topLeft = point1;
            this.topRight = new cuon_matrix_ts_1.Vec3(point2.x, point1.y, point2.z);
            this.bottomRight = point2;
            this.bottomLeft = new cuon_matrix_ts_1.Vec3(point1.x, point2.y, point1.z);
        }
        else if (this.isBottomRightTopLeft(point1, point2)) {
            this.topLeft = point2;
            this.topRight = new cuon_matrix_ts_1.Vec3(point1.x, point2.y, point1.z);
            this.bottomRight = point1;
            this.bottomLeft = new cuon_matrix_ts_1.Vec3(point2.x, point1.y, point2.z);
        }
        else if (this.isBottomLeftTopRight(point1, point2)) {
            this.topLeft = new cuon_matrix_ts_1.Vec3(point1.x, point2.y, point1.z);
            this.topRight = point2;
            this.bottomRight = new cuon_matrix_ts_1.Vec3(point2.x, point1.y, point2.z);
            this.bottomLeft = point1;
        }
        else {
            this.topLeft = new cuon_matrix_ts_1.Vec3(point2.x, point1.y, point2.z);
            this.topRight = point1;
            this.bottomRight = new cuon_matrix_ts_1.Vec3(point1.x, point2.y, point1.z);
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ellipse_1 = __webpack_require__(10);
var triangle_1 = __webpack_require__(12);
var rectangle_1 = __webpack_require__(13);
var hexagon_1 = __webpack_require__(14);
var octogon_1 = __webpack_require__(15);
var precision_1 = __webpack_require__(11);
var ShapeFactory = (function () {
    function ShapeFactory() {
    }
    ShapeFactory.createShape = function (point1, point2, shapeMode, gl, rgbColor) {
        switch (shapeMode) {
            case "triangles":
                return this.createTriangle(point1, point2, gl, rgbColor);
            case "rectangles":
                return this.createRectangle(point1, point2, gl, rgbColor);
            case "hexagons":
                return this.createHexagon(point1, point2, gl, rgbColor);
            case "octogons":
                return this.createOctogon(point1, point2, gl, rgbColor);
            case "ellipses":
                return this.createEllipse(point1, point2, gl, rgbColor);
            default:
                throw Error("cannot recognize shape type " + shapeMode);
        }
    };
    ShapeFactory.createTriangle = function (point1, point2, gl, rgbColor) {
        return new triangle_1.Triangle(point1, point2, gl, rgbColor);
    };
    ShapeFactory.createRectangle = function (point1, point2, gl, rgbColor) {
        return new rectangle_1.Rectangle(point1, point2, gl, rgbColor);
    };
    ShapeFactory.createHexagon = function (point1, point2, gl, rgbColor) {
        return new hexagon_1.Hexagon(point1, point2, gl, rgbColor);
    };
    ShapeFactory.createOctogon = function (point1, point2, gl, rgbColor) {
        return new octogon_1.Octogon(point1, point2, gl, rgbColor);
    };
    ShapeFactory.createEllipse = function (point1, point2, gl, rgbColor) {
        return new ellipse_1.Ellipse(point1, point2, gl, precision_1.Precision.High, rgbColor);
    };
    return ShapeFactory;
}());
exports.ShapeFactory = ShapeFactory;


/***/ }),
/* 26 */
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
var shape2d_1 = __webpack_require__(2);
var constants_1 = __webpack_require__(0);
var float32Vector_1 = __webpack_require__(1);
var Point = (function (_super) {
    __extends(Point, _super);
    function Point(location, gl, rgbColor) {
        var _this = _super.call(this, rgbColor) || this;
        _this._location = location;
        _this.computeVerticies();
        _this.glRenderMode = gl.POINTS;
        return _this;
    }
    Point.prototype.computeVerticies = function () {
        var vertex = new Float32Array(constants_1.Constants.floatsPerVertex);
        this.addXYZAndColorToFloat32Array(vertex, 0, this._location.x, this._location.y, this._location.z);
        this._verticies = new float32Vector_1.Float32Vector(vertex, vertex.length);
    };
    return Point;
}(shape2d_1.Shape2d));
exports.Point = Point;


/***/ })
/******/ ]);
});
//# sourceMappingURL=webgl-renderer.js.map