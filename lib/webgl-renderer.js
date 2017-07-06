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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var drawingMode_1 = __webpack_require__(6);
var floatsPerPoint = 3;
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var boundingRectangle_1 = __webpack_require__(21);
var settings_1 = __webpack_require__(0);
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
    Shape2d.prototype.addXYAndColorToFloat32Array = function (array, index, x, y, z) {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = this._rgbColor.red;
        array[index + 4] = this._rgbColor.green;
        array[index + 5] = this._rgbColor.blue;
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
var DrawingMode;
(function (DrawingMode) {
    DrawingMode[DrawingMode["Shapes"] = 0] = "Shapes";
    DrawingMode[DrawingMode["Verticies"] = 1] = "Verticies";
})(DrawingMode = exports.DrawingMode || (exports.DrawingMode = {}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cuon_matrix_ts_1 = __webpack_require__(3);
var Camera = (function () {
    function Camera(eyePosition, lookAtPoint, upPosition) {
        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;
        this._viewMatrix = new cuon_matrix_ts_1.Mat4();
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
var vector_1 = __webpack_require__(1);
var midpoint_1 = __webpack_require__(4);
var precision_1 = __webpack_require__(9);
var settings_1 = __webpack_require__(0);
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(point1, point2, rgbColor, gl, precision) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.horizontalRadius = (_this.boundingRect.topRight.x - _this.boundingRect.topLeft.x) / 2;
        _this.verticalRadius = (_this.boundingRect.topLeft.y - _this.boundingRect.bottomLeft.y) / 2;
        _this.center = midpoint_1.Midpoint.between(_this.boundingRect.topLeft, _this.boundingRect.bottomRight);
        _this.precision = precision;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLE_FAN;
        return _this;
    }
    Ellipse.prototype.computeVerticies = function () {
        var numberOfInnerVerticies, numberOfVerticies = 0;
        if (this.precision === precision_1.Precision.High) {
            numberOfInnerVerticies = Ellipse.highPrecisionNumberOfInnerVerticies;
            numberOfVerticies = Ellipse.highPrecisionNumberOfVerticies;
        }
        else if (this.precision === precision_1.Precision.Low) {
            numberOfInnerVerticies = Ellipse.lowPrecisionNumberOfInnerVerticies;
            numberOfVerticies = Ellipse.lowPrecisionNumberOfVerticies;
        }
        var arr = new Float32Array(numberOfVerticies * settings_1.Settings.floatsPerVertex);
        var x = this.boundingRect.topLeft.x;
        var xIncrement = (this.horizontalRadius * 2) / ((numberOfVerticies - 1) / 2);
        this.addXYAndColorToFloat32Array(arr, 0, x, (this.boundingRect.topLeft.y - this.verticalRadius), this.center.z);
        var symmetryInsertionOffset = ((numberOfInnerVerticies / 2) * settings_1.Settings.floatsPerVertex) + settings_1.Settings.floatsPerVertex;
        var endPointX = this.boundingRect.topRight.x;
        var endPointY = this.boundingRect.topRight.y - this.verticalRadius;
        this.addXYAndColorToFloat32Array(arr, symmetryInsertionOffset, endPointX, endPointY, this.center.z);
        this.addXYAndColorToFloat32Array(arr, (arr.length - settings_1.Settings.floatsPerVertex), endPointX, endPointY, this.center.z);
        var insertionIndex = settings_1.Settings.floatsPerVertex;
        for (var i = 0; i < numberOfInnerVerticies / 2; i++) {
            x += xIncrement;
            var y = this.getYDistanceFromCenterForX(x);
            this.addXYAndColorToFloat32Array(arr, insertionIndex, x, y + this.center.y, this.center.z);
            this.addXYAndColorToFloat32Array(arr, insertionIndex + symmetryInsertionOffset, x, this.center.y - y, this.center.z);
            insertionIndex += settings_1.Settings.floatsPerVertex;
        }
        this.verticies = new vector_1.Float32Vector(arr);
    };
    Ellipse.prototype.getYDistanceFromCenterForX = function (x) {
        var verticalRadiusSquared = Math.pow(this.verticalRadius, 2);
        return Math.sqrt(verticalRadiusSquared -
            ((verticalRadiusSquared * Math.pow((x - this.center.x), 2)) / Math.pow(this.horizontalRadius, 2)));
    };
    Ellipse.highPrecisionNumberOfInnerVerticies = 400;
    Ellipse.highPrecisionNumberOfVerticies = Ellipse.highPrecisionNumberOfInnerVerticies + 3;
    Ellipse.lowPrecisionNumberOfInnerVerticies = 8;
    Ellipse.lowPrecisionNumberOfVerticies = Ellipse.lowPrecisionNumberOfInnerVerticies + 3;
    return Ellipse;
}(shape2d_1.Shape2d));
exports.Ellipse = Ellipse;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Precision;
(function (Precision) {
    Precision[Precision["Low"] = 0] = "Low";
    Precision[Precision["High"] = 1] = "High";
})(Precision = exports.Precision || (exports.Precision = {}));


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
var shape2d_1 = __webpack_require__(2);
var vector_1 = __webpack_require__(1);
var midpoint_1 = __webpack_require__(4);
var settings_1 = __webpack_require__(0);
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(point1, point2, rgbColor, gl) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLES;
        return _this;
    }
    Triangle.prototype.computeVerticies = function () {
        var topPoint = midpoint_1.Midpoint.between(this.boundingRect.topLeft, this.boundingRect.topRight);
        var array = new Float32Array(Triangle.numberOfVerticies * settings_1.Settings.floatsPerVertex);
        var insertionIndex = 0;
        this.addXYAndColorToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft.x, this.boundingRect.bottomLeft.y, this.boundingRect.bottomLeft.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(array, insertionIndex, topPoint.x, topPoint.y, topPoint.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(array, insertionIndex, this.boundingRect.bottomRight.x, this.boundingRect.bottomRight.y, this.boundingRect.bottomRight.z);
        this.verticies = new vector_1.Float32Vector(array);
    };
    Triangle.numberOfVerticies = 3;
    return Triangle;
}(shape2d_1.Shape2d));
exports.Triangle = Triangle;


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
var shape2d_1 = __webpack_require__(2);
var vector_1 = __webpack_require__(1);
var settings_1 = __webpack_require__(0);
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(point1, point2, rgbColor, gl) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLE_STRIP;
        return _this;
    }
    Rectangle.prototype.computeVerticies = function () {
        var array = new Float32Array(Rectangle.numberOfVerticies * settings_1.Settings.floatsPerVertex);
        var insertionIndex = 0;
        this.addXYAndColorToFloat32Array(array, insertionIndex, this.boundingRect.topLeft.x, this.boundingRect.topLeft.y, this.boundingRect.topLeft.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(array, insertionIndex, this.boundingRect.topRight.x, this.boundingRect.topRight.y, this.boundingRect.topRight.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft.x, this.boundingRect.bottomLeft.y, this.boundingRect.bottomLeft.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(array, insertionIndex, this.boundingRect.bottomRight.x, this.boundingRect.bottomRight.y, this.boundingRect.bottomRight.z);
        this.verticies = new vector_1.Float32Vector(array);
    };
    Rectangle.numberOfVerticies = 4;
    return Rectangle;
}(shape2d_1.Shape2d));
exports.Rectangle = Rectangle;


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
var vector_1 = __webpack_require__(1);
var midpoint_1 = __webpack_require__(4);
var settings_1 = __webpack_require__(0);
var Hexagon = (function (_super) {
    __extends(Hexagon, _super);
    function Hexagon(point1, point2, rgbColor, gl) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLE_FAN;
        return _this;
    }
    Hexagon.prototype.computeVerticies = function () {
        var arr = new Float32Array(Hexagon.numberOfVerticies * settings_1.Settings.floatsPerVertex);
        var _a = midpoint_1.ThirdPoints.between(this.boundingRect.topLeft, this.boundingRect.topRight), first = _a.first, second = _a.second;
        var insertionIndex = 0;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        var mid = midpoint_1.Midpoint.between(this.boundingRect.topRight, this.boundingRect.bottomRight);
        this.addXYAndColorToFloat32Array(arr, insertionIndex, mid.x, mid.y, mid.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        (_b = midpoint_1.ThirdPoints.between(this.boundingRect.bottomRight, this.boundingRect.bottomLeft), first = _b.first, second = _b.second);
        this.addXYAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        mid = midpoint_1.Midpoint.between(this.boundingRect.bottomLeft, this.boundingRect.topLeft);
        this.addXYAndColorToFloat32Array(arr, insertionIndex, mid.x, mid.y, mid.z);
        this.verticies = new vector_1.Float32Vector(arr);
        var _b;
    };
    Hexagon.numberOfVerticies = 6;
    return Hexagon;
}(shape2d_1.Shape2d));
exports.Hexagon = Hexagon;


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
var vector_1 = __webpack_require__(1);
var midpoint_1 = __webpack_require__(4);
var settings_1 = __webpack_require__(0);
var Octogon = (function (_super) {
    __extends(Octogon, _super);
    function Octogon(point1, point2, rgbColor, gl) {
        var _this = _super.call(this, rgbColor, point1, point2) || this;
        _this.computeVerticies();
        _this.glRenderMode = gl.TRIANGLE_FAN;
        return _this;
    }
    Octogon.prototype.computeVerticies = function () {
        var arr = new Float32Array(Octogon.numberOfVerticies * settings_1.Settings.floatsPerVertex);
        var insertionIndex = 0;
        var _a = midpoint_1.ThirdPoints.between(this.boundingRect.topLeft, this.boundingRect.topRight), first = _a.first, second = _a.second;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        (_b = midpoint_1.ThirdPoints.between(this.boundingRect.topRight, this.boundingRect.bottomRight), first = _b.first, second = _b.second);
        this.addXYAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        (_c = midpoint_1.ThirdPoints.between(this.boundingRect.bottomRight, this.boundingRect.bottomLeft), first = _c.first, second = _c.second);
        this.addXYAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        (_d = midpoint_1.ThirdPoints.between(this.boundingRect.bottomLeft, this.boundingRect.topLeft), first = _d.first, second = _d.second);
        this.addXYAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += settings_1.Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        this.verticies = new vector_1.Float32Vector(arr);
        var _b, _c, _d;
    };
    Octogon.numberOfVerticies = 8;
    return Octogon;
}(shape2d_1.Shape2d));
exports.Octogon = Octogon;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var webglRenderer_1 = __webpack_require__(15);
exports.WebGLRenderer = webglRenderer_1.WebGLRenderer;
var contextWrangler_1 = __webpack_require__(18);
exports.ContextWrangler = contextWrangler_1.ContextWrangler;
var colorMapper_1 = __webpack_require__(19);
exports.ColorMapper = colorMapper_1.ColorMapper;
var line_1 = __webpack_require__(20);
exports.Line = line_1.Line;
var shape2d_1 = __webpack_require__(2);
exports.Shape2d = shape2d_1.Shape2d;
var shapeFactory_1 = __webpack_require__(22);
exports.ShapeFactory = shapeFactory_1.ShapeFactory;
var ellipse_1 = __webpack_require__(8);
exports.Ellipse = ellipse_1.Ellipse;
var rectangle_1 = __webpack_require__(11);
exports.Rectangle = rectangle_1.Rectangle;
var hexagon_1 = __webpack_require__(12);
exports.Hexagon = hexagon_1.Hexagon;
var octogon_1 = __webpack_require__(13);
exports.Octogon = octogon_1.Octogon;
var triangle_1 = __webpack_require__(10);
exports.Triangle = triangle_1.Triangle;
var rgbColor_1 = __webpack_require__(5);
exports.RGBColor = rgbColor_1.RGBColor;
var camera_1 = __webpack_require__(7);
exports.Camera = camera_1.Camera;
var point3d_1 = __webpack_require__(23);
exports.Point3d = point3d_1.Point3d;
var cuon_matrix_ts_1 = __webpack_require__(3);
exports.Vec3 = cuon_matrix_ts_1.Vec3;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var renderModeMapper_1 = __webpack_require__(16);
var vertexBuffer_1 = __webpack_require__(17);
var drawingMode_1 = __webpack_require__(6);
var camera_1 = __webpack_require__(7);
var settings_1 = __webpack_require__(0);
var cuon_matrix_ts_1 = __webpack_require__(3);
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
        this._renderMode = drawingSettings.renderMode || settings_1.Settings.defaultRendereMode;
        this._glRenderMode = renderModeMapper_1.RenderModeMapper.renderModeToWebGlConstant(this._renderMode, this.gl);
        this._shapeMode = drawingSettings.shapeMode || settings_1.Settings.defaultShapeMode;
        this._drawingMode = drawingSettings.drawingMode || settings_1.Settings.defaultDrawingMode;
        this._pointSize = drawingSettings.pointSize || settings_1.Settings.defaultPointSize;
        this._backgroundColor = drawingSettings.backgroundColor || settings_1.Settings.defaultBackgroundColor;
        this._color = drawingSettings.color || settings_1.Settings.defaultColor;
    };
    WebGLRenderer.prototype.initializeCamera = function (camera) {
        if (camera) {
            this._camera = camera;
        }
        else {
            var eyePosition = new cuon_matrix_ts_1.Vec3(0, 0, 0);
            var lookAtPoint = new cuon_matrix_ts_1.Vec3(0, 0, -1);
            var upPosition = new cuon_matrix_ts_1.Vec3(0, 1, 0);
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
            throw errorMessage;
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = __webpack_require__(1);
var settings_1 = __webpack_require__(0);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContextWrangler = (function () {
    function ContextWrangler() {
    }
    ContextWrangler.getContext = function (canvas) {
        var gl;
        var isIE = false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;
        var contextName = (isIE || isEdge) ? "experimental-webgl" : "webgl";
        try {
            gl = canvas.getContext(contextName, {
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
/* 19 */
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
/* 20 */
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
var vector_1 = __webpack_require__(1);
var settings_1 = __webpack_require__(0);
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(point, rgbColor, gl) {
        var _this = _super.call(this, rgbColor) || this;
        var array = new Float32Array(settings_1.Settings.floatsPerVertex);
        _this.vertexPositions = new Array();
        _this.vertexPositions.push(point);
        _this.computeVerticies();
        _this.glRenderMode = gl.LINE_STRIP;
        return _this;
    }
    Line.prototype.computeVerticies = function () {
        var arr = new Float32Array(this.vertexPositions.length * settings_1.Settings.floatsPerVertex);
        for (var i = 0; i < this.vertexPositions.length; i++) {
            var insertionIndex = i * settings_1.Settings.floatsPerVertex;
            var vertexPosition = this.vertexPositions[i];
            this.addXYAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }
        this.verticies = new vector_1.Float32Vector(arr);
    };
    Line.prototype.addVertex = function (vertex) {
        this.vertexPositions.push(vertex);
        var array = new Float32Array(settings_1.Settings.floatsPerVertex);
        this.addXYAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this.verticies.addArray(array);
    };
    return Line;
}(shape2d_1.Shape2d));
exports.Line = Line;


/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ellipse_1 = __webpack_require__(8);
var triangle_1 = __webpack_require__(10);
var rectangle_1 = __webpack_require__(11);
var hexagon_1 = __webpack_require__(12);
var octogon_1 = __webpack_require__(13);
var precision_1 = __webpack_require__(9);
var ShapeFactory = (function () {
    function ShapeFactory() {
    }
    ShapeFactory.createShape = function (point1, point2, shapeMode, rgbColor, gl) {
        switch (shapeMode) {
            case "triangles":
                return this.createTriangle(point1, point2, rgbColor, gl);
            case "rectangles":
                return this.createRectangle(point1, point2, rgbColor, gl);
            case "hexagons":
                return this.createHexagon(point1, point2, rgbColor, gl);
            case "octogons":
                return this.createOctogon(point1, point2, rgbColor, gl);
            case "ellipses":
                return this.createEllipse(point1, point2, rgbColor, gl);
            default:
                throw Error("cannot recognize shape type " + shapeMode);
        }
    };
    ShapeFactory.createTriangle = function (point1, point2, rgbColor, gl) {
        return new triangle_1.Triangle(point1, point2, rgbColor, gl);
    };
    ShapeFactory.createRectangle = function (point1, point2, rgbColor, gl) {
        return new rectangle_1.Rectangle(point1, point2, rgbColor, gl);
    };
    ShapeFactory.createHexagon = function (point1, point2, rgbColor, gl) {
        return new hexagon_1.Hexagon(point1, point2, rgbColor, gl);
    };
    ShapeFactory.createOctogon = function (point1, point2, rgbColor, gl) {
        return new octogon_1.Octogon(point1, point2, rgbColor, gl);
    };
    ShapeFactory.createEllipse = function (point1, point2, rgbColor, gl) {
        return new ellipse_1.Ellipse(point1, point2, rgbColor, gl, precision_1.Precision.High);
    };
    return ShapeFactory;
}());
exports.ShapeFactory = ShapeFactory;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rgbColor_1 = __webpack_require__(5);
var Point3d = (function () {
    function Point3d(location, pointSize, color) {
        if (pointSize === void 0) { pointSize = 5; }
        if (color === void 0) { color = new rgbColor_1.RGBColor(0, 0, 0); }
        this.x = location.x;
        this.y = location.y;
        this.z = location.z;
        this.pointSize = pointSize;
        this.color = color;
    }
    return Point3d;
}());
exports.Point3d = Point3d;


/***/ })
/******/ ]);
});
//# sourceMappingURL=webgl-renderer.js.map