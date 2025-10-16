(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("webgl-renderer", [], factory);
	else if(typeof exports === 'object')
		exports["webgl-renderer"] = factory();
	else
		root["webgl-renderer"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("cuon-matrix-ts",[],e):"object"==typeof exports?exports["cuon-matrix-ts"]=e():t["cuon-matrix-ts"]=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n){void 0===t&&(t=0),void 0===e&&(e=0),void 0===n&&(n=0),this.elements=new Float32Array(3),this.elements[0]=t,this.elements[1]=e,this.elements[2]=n}return t.normalize=function(e){var n=Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z);return 0===n?new t(0,0,0):new t(e.x/n,e.y/n,e.z/n)},t.add=function(e,n){return new t(e.x+n.x,e.y+n.y,e.z+n.z)},t.sub=function(e,n){return new t(e.x-n.x,e.y-n.y,e.z-n.z)},t.cross=function(e,n){return new t(e.y*n.z-e.z*n.y,e.z*n.x-e.x*n.z,e.x*n.y-e.y*n.x)},t.dot=function(t,e){return t.x*e.x+t.y*e.y+t.z*e.z},t.scale=function(e,n){return new t(e.x*n,e.y*n,e.z*n)},t.negate=function(e){return new t(-e.x,-e.y,-e.z)},t.rotate=function(e,n,r){var o=Math.cos(r),s=Math.sin(r),i=this.normalize(n),u=t.cross(i,e),c=e.dot(i);return new t(e.x*o+u.x*s+i.x*c*(1-o),e.y*o+u.y*s+i.y*c*(1-o),e.z*o+u.z*s+i.z*c*(1-o))},t.prototype.normalize=function(){var t=this.elements,e=t[0],n=t[1],r=t[2],o=Math.sqrt(e*e+n*n+r*r);return o?1===o?this:(o=1/o,t[0]=e*o,t[1]=n*o,t[2]=r*o,this):(t[0]=0,t[1]=0,t[2]=0,this)},t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this},t.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this},t.prototype.cross=function(t){var e=this.x,n=this.y,r=this.z;return this.x=n*t.z-r*t.y,this.y=r*t.x-e*t.z,this.z=e*t.y-n*t.x,this},t.prototype.scale=function(t){return this.x*=t,this.y*=t,this.z*=t,this},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z},t.prototype.angle=function(e){var n=t.cross(this,e),r=Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z),o=this.dot(e);return Math.atan2(r,o)},t.prototype.negate=function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},t.prototype.rotate=function(e,n){var r=new t(this.x,this.y,this.z);e=t.normalize(e),n/=2;var o=Math.sin(n),s=e.x*o,i=e.y*o,u=e.z*o;o=Math.cos(n);var c=new t(s,i,u),h=t.cross(c,this),a=t.cross(c,h);return o*=2,h.x*=o,h.y*=o,h.z*=o,a.x*=2,a.y*=2,a.z*=2,r.x+=h.x,r.y+=h.y,r.z+=h.z,r.x+=a.x,r.y+=a.y,r.z+=a.z,r},Object.defineProperty(t.prototype,"x",{get:function(){return this.elements[0]},set:function(t){this.elements[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.elements[1]},set:function(t){this.elements[1]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"z",{get:function(){return this.elements[2]},set:function(t){this.elements[2]=t},enumerable:!0,configurable:!0}),t}();e.Vec3=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n,r){void 0===t&&(t=0),void 0===e&&(e=0),void 0===n&&(n=0),void 0===r&&(r=1),this.elements=new Float32Array(4),this.elements[0]=t,this.elements[1]=e,this.elements[2]=n,this.elements[3]=r}return Object.defineProperty(t.prototype,"x",{get:function(){return this.elements[0]},set:function(t){this.elements[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.elements[1]},set:function(t){this.elements[1]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"z",{get:function(){return this.elements[2]},set:function(t){this.elements[2]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"w",{get:function(){return this.elements[3]},set:function(t){this.elements[3]=t},enumerable:!0,configurable:!0}),t}();e.Vec4=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3);e.Mat4=r.Mat4;var o=n(1);e.Vec4=o.Vec4;var s=n(0);e.Vec3=s.Vec3;var i=n(4);e.Vec2=i.Vec2},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(1),s=function(){function t(t){if(void 0===t&&(t=null),t){this.elements=new Float32Array(16);for(var e=0;e<16;++e)this.elements[e]=t.elements[e]}else this.elements=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return t.prototype.setIdentity=function(){var t=this.elements;return t[0]=1,t[4]=0,t[8]=0,t[12]=0,t[1]=0,t[5]=1,t[9]=0,t[13]=0,t[2]=0,t[6]=0,t[10]=1,t[14]=0,t[3]=0,t[7]=0,t[11]=0,t[15]=1,this},t.prototype.set=function(t){var e,n,r;if(n=t.elements,r=this.elements,n!==r){for(e=0;e<16;++e)r[e]=n[e];return this}},t.prototype.multiply=function(t){return this.concat(t)},t.prototype.multiplyVector3=function(t){var e=this.elements,n=t.elements,o=new r.Vec3,s=o.elements;return s[0]=n[0]*e[0]+n[1]*e[4]+n[2]*e[8]+e[11],s[1]=n[0]*e[1]+n[1]*e[5]+n[2]*e[9]+e[12],s[2]=n[0]*e[2]+n[1]*e[6]+n[2]*e[10]+e[13],o},t.prototype.multiplyVector4=function(t){var e=this.elements,n=t.elements,r=new o.Vec4,s=r.elements;return s[0]=n[0]*e[0]+n[1]*e[4]+n[2]*e[8]+n[3]*e[12],s[1]=n[0]*e[1]+n[1]*e[5]+n[2]*e[9]+n[3]*e[13],s[2]=n[0]*e[2]+n[1]*e[6]+n[2]*e[10]+n[3]*e[14],s[3]=n[0]*e[3]+n[1]*e[7]+n[2]*e[11]+n[3]*e[15],r},t.prototype.transpose=function(){var t,e;return t=this.elements,e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this},t.prototype.setInverseOf=function(t){var e,n,r,o,s;if(n=t.elements,r=this.elements,o=new Float32Array(16),o[0]=n[5]*n[10]*n[15]-n[5]*n[11]*n[14]-n[9]*n[6]*n[15]+n[9]*n[7]*n[14]+n[13]*n[6]*n[11]-n[13]*n[7]*n[10],o[4]=-n[4]*n[10]*n[15]+n[4]*n[11]*n[14]+n[8]*n[6]*n[15]-n[8]*n[7]*n[14]-n[12]*n[6]*n[11]+n[12]*n[7]*n[10],o[8]=n[4]*n[9]*n[15]-n[4]*n[11]*n[13]-n[8]*n[5]*n[15]+n[8]*n[7]*n[13]+n[12]*n[5]*n[11]-n[12]*n[7]*n[9],o[12]=-n[4]*n[9]*n[14]+n[4]*n[10]*n[13]+n[8]*n[5]*n[14]-n[8]*n[6]*n[13]-n[12]*n[5]*n[10]+n[12]*n[6]*n[9],o[1]=-n[1]*n[10]*n[15]+n[1]*n[11]*n[14]+n[9]*n[2]*n[15]-n[9]*n[3]*n[14]-n[13]*n[2]*n[11]+n[13]*n[3]*n[10],o[5]=n[0]*n[10]*n[15]-n[0]*n[11]*n[14]-n[8]*n[2]*n[15]+n[8]*n[3]*n[14]+n[12]*n[2]*n[11]-n[12]*n[3]*n[10],o[9]=-n[0]*n[9]*n[15]+n[0]*n[11]*n[13]+n[8]*n[1]*n[15]-n[8]*n[3]*n[13]-n[12]*n[1]*n[11]+n[12]*n[3]*n[9],o[13]=n[0]*n[9]*n[14]-n[0]*n[10]*n[13]-n[8]*n[1]*n[14]+n[8]*n[2]*n[13]+n[12]*n[1]*n[10]-n[12]*n[2]*n[9],o[2]=n[1]*n[6]*n[15]-n[1]*n[7]*n[14]-n[5]*n[2]*n[15]+n[5]*n[3]*n[14]+n[13]*n[2]*n[7]-n[13]*n[3]*n[6],o[6]=-n[0]*n[6]*n[15]+n[0]*n[7]*n[14]+n[4]*n[2]*n[15]-n[4]*n[3]*n[14]-n[12]*n[2]*n[7]+n[12]*n[3]*n[6],o[10]=n[0]*n[5]*n[15]-n[0]*n[7]*n[13]-n[4]*n[1]*n[15]+n[4]*n[3]*n[13]+n[12]*n[1]*n[7]-n[12]*n[3]*n[5],o[14]=-n[0]*n[5]*n[14]+n[0]*n[6]*n[13]+n[4]*n[1]*n[14]-n[4]*n[2]*n[13]-n[12]*n[1]*n[6]+n[12]*n[2]*n[5],o[3]=-n[1]*n[6]*n[11]+n[1]*n[7]*n[10]+n[5]*n[2]*n[11]-n[5]*n[3]*n[10]-n[9]*n[2]*n[7]+n[9]*n[3]*n[6],o[7]=n[0]*n[6]*n[11]-n[0]*n[7]*n[10]-n[4]*n[2]*n[11]+n[4]*n[3]*n[10]+n[8]*n[2]*n[7]-n[8]*n[3]*n[6],o[11]=-n[0]*n[5]*n[11]+n[0]*n[7]*n[9]+n[4]*n[1]*n[11]-n[4]*n[3]*n[9]-n[8]*n[1]*n[7]+n[8]*n[3]*n[5],o[15]=n[0]*n[5]*n[10]-n[0]*n[6]*n[9]-n[4]*n[1]*n[10]+n[4]*n[2]*n[9]+n[8]*n[1]*n[6]-n[8]*n[2]*n[5],0===(s=n[0]*o[0]+n[1]*o[4]+n[2]*o[8]+n[3]*o[12]))return this;for(s=1/s,e=0;e<16;e++)r[e]=o[e]*s;return this},t.prototype.invert=function(){return this.setInverseOf(this)},t.prototype.setOrtho=function(t,e,n,r,o,s){var i,u,c,h;if(t===e||n===r||o===s)throw"null frustum";return u=1/(e-t),c=1/(r-n),h=1/(s-o),i=this.elements,i[0]=2*u,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2*c,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=-2*h,i[11]=0,i[12]=-(e+t)*u,i[13]=-(r+n)*c,i[14]=-(s+o)*h,i[15]=1,this},t.prototype.ortho=function(e,n,r,o,s,i){return this.concat((new t).setOrtho(e,n,r,o,s,i))},t.prototype.setFrustum=function(t,e,n,r,o,s){var i,u,c,h;if(t===e||r===n||o===s)throw"null frustum";if(o<=0)throw"near <= 0";if(s<=0)throw"far <= 0";return u=1/(e-t),c=1/(r-n),h=1/(s-o),i=this.elements,i[0]=2*o*u,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2*o*c,i[6]=0,i[7]=0,i[8]=(e+t)*u,i[9]=(r+n)*c,i[10]=-(s+o)*h,i[11]=-1,i[12]=0,i[13]=0,i[14]=-2*o*s*h,i[15]=0,this},t.prototype.frustum=function(e,n,r,o,s,i){return this.concat((new t).setFrustum(e,n,r,o,s,i))},t.prototype.setPerspective=function(t,e,n,r){var o,s,i,u;if(n===r||0===e)throw"null frustum";if(n<=0)throw"near <= 0";if(r<=0)throw"far <= 0";if(t=Math.PI*t/180/2,0===(i=Math.sin(t)))throw"null frustum";return s=1/(r-n),u=Math.cos(t)/i,o=this.elements,o[0]=u/e,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=u,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=-(r+n)*s,o[11]=-1,o[12]=0,o[13]=0,o[14]=-2*n*r*s,o[15]=0,this},t.prototype.perspective=function(e,n,r,o){return this.concat((new t).setPerspective(e,n,r,o))},t.prototype.setScale=function(t,e,n){var r=this.elements;return r[0]=t,r[4]=0,r[8]=0,r[12]=0,r[1]=0,r[5]=e,r[9]=0,r[13]=0,r[2]=0,r[6]=0,r[10]=n,r[14]=0,r[3]=0,r[7]=0,r[11]=0,r[15]=1,this},t.prototype.scale=function(t,e,n){var r=this.elements;return r[0]*=t,r[4]*=e,r[8]*=n,r[1]*=t,r[5]*=e,r[9]*=n,r[2]*=t,r[6]*=e,r[10]*=n,r[3]*=t,r[7]*=e,r[11]*=n,this},t.prototype.setTranslate=function(t,e,n){var r=this.elements;return r[0]=1,r[4]=0,r[8]=0,r[12]=t,r[1]=0,r[5]=1,r[9]=0,r[13]=e,r[2]=0,r[6]=0,r[10]=1,r[14]=n,r[3]=0,r[7]=0,r[11]=0,r[15]=1,this},t.prototype.translate=function(t,e,n){var r=this.elements;return r[12]+=r[0]*t+r[4]*e+r[8]*n,r[13]+=r[1]*t+r[5]*e+r[9]*n,r[14]+=r[2]*t+r[6]*e+r[10]*n,r[15]+=r[3]*t+r[7]*e+r[11]*n,this},t.prototype.setRotate=function(t,e,n,r){var o,s,i,u,c,h,a,f,l,p,y,m;return t=Math.PI*t/180,o=this.elements,s=Math.sin(t),i=Math.cos(t),0!==e&&0===n&&0===r?(e<0&&(s=-s),o[0]=1,o[4]=0,o[8]=0,o[12]=0,o[1]=0,o[5]=i,o[9]=-s,o[13]=0,o[2]=0,o[6]=s,o[10]=i,o[14]=0,o[3]=0,o[7]=0,o[11]=0,o[15]=1):0===e&&0!==n&&0===r?(n<0&&(s=-s),o[0]=i,o[4]=0,o[8]=s,o[12]=0,o[1]=0,o[5]=1,o[9]=0,o[13]=0,o[2]=-s,o[6]=0,o[10]=i,o[14]=0,o[3]=0,o[7]=0,o[11]=0,o[15]=1):0===e&&0===n&&0!==r?(r<0&&(s=-s),o[0]=i,o[4]=-s,o[8]=0,o[12]=0,o[1]=s,o[5]=i,o[9]=0,o[13]=0,o[2]=0,o[6]=0,o[10]=1,o[14]=0,o[3]=0,o[7]=0,o[11]=0,o[15]=1):(u=Math.sqrt(e*e+n*n+r*r),1!==u&&(c=1/u,e*=c,n*=c,r*=c),h=1-i,a=e*n,f=n*r,l=r*e,p=e*s,y=n*s,m=r*s,o[0]=e*e*h+i,o[1]=a*h+m,o[2]=l*h-y,o[3]=0,o[4]=a*h-m,o[5]=n*n*h+i,o[6]=f*h+p,o[7]=0,o[8]=l*h+y,o[9]=f*h-p,o[10]=r*r*h+i,o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1),this},t.prototype.rotate=function(e,n,r,o){return this.concat((new t).setRotate(e,n,r,o))},t.prototype.setLookAt=function(t,e,n,r,o,s,i,u,c){var h,a,f,l,p,y,m,d,v,x,z,b;return a=r-t,f=o-e,l=s-n,p=1/Math.sqrt(a*a+f*f+l*l),a*=p,f*=p,l*=p,y=f*c-l*u,m=l*i-a*c,d=a*u-f*i,v=1/Math.sqrt(y*y+m*m+d*d),y*=v,m*=v,d*=v,x=m*l-d*f,z=d*a-y*l,b=y*f-m*a,h=this.elements,h[0]=y,h[1]=x,h[2]=-a,h[3]=0,h[4]=m,h[5]=z,h[6]=-f,h[7]=0,h[8]=d,h[9]=b,h[10]=-l,h[11]=0,h[12]=0,h[13]=0,h[14]=0,h[15]=1,this.translate(-t,-e,-n)},t.prototype.lookAt=function(e,n,r,o,s,i,u,c,h){return this.concat((new t).setLookAt(e,n,r,o,s,i,u,c,h))},t.prototype.dropShadow=function(e,n){var r=new t,o=r.elements,s=e[0]*n[0]+e[1]*n[1]+e[2]*n[2]+e[3]*n[3];return o[0]=s-n[0]*e[0],o[1]=-n[1]*e[0],o[2]=-n[2]*e[0],o[3]=-n[3]*e[0],o[4]=-n[0]*e[1],o[5]=s-n[1]*e[1],o[6]=-n[2]*e[1],o[7]=-n[3]*e[1],o[8]=-n[0]*e[2],o[9]=-n[1]*e[2],o[10]=s-n[2]*e[2],o[11]=-n[3]*e[2],o[12]=-n[0]*e[3],o[13]=-n[1]*e[3],o[14]=-n[2]*e[3],o[15]=s-n[3]*e[3],this.concat(r)},t.prototype.dropShadowDirectionally=function(t,e,n,r,o,s,i,u,c){var h=r*t+o*e+s*n;return this.dropShadow([t,e,n,-h],[i,u,c,0])},t.prototype.concat=function(t){var e,n,r,o,s,i,u,c;if(n=this.elements,r=this.elements,o=t.elements,n===o)for(o=new Float32Array(16),e=0;e<16;++e)o[e]=n[e];for(e=0;e<4;e++)s=r[e],i=r[e+4],u=r[e+8],c=r[e+12],n[e]=s*o[0]+i*o[1]+u*o[2]+c*o[3],n[e+4]=s*o[4]+i*o[5]+u*o[6]+c*o[7],n[e+8]=s*o[8]+i*o[9]+u*o[10]+c*o[11],n[e+12]=s*o[12]+i*o[13]+u*o[14]+c*o[15];return this},t}();e.Mat4=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.elements=new Float32Array(2),this.elements[0]=t,this.elements[1]=e}return t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},Object.defineProperty(t.prototype,"x",{get:function(){return this.elements[0]},set:function(t){this.elements[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.elements[1]},set:function(t){this.elements[1]=t},enumerable:!0,configurable:!0}),t}();e.Vec2=r}])});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
const floatsPerPosition = 3;
const floatsPerColor = 3;
const verticiesPerTriangle = 3;
const floatsPerMat4Row = 4;
const floatsPerMat4 = 16;
const floatsPerPointSize = 1;
const floatsPerPositionColor = floatsPerPosition + floatsPerColor;
const floatsPerPointVertex = floatsPerPosition + floatsPerColor + floatsPerPointSize;
const floatsPerDynamicVertex = floatsPerPosition + floatsPerColor + floatsPerMat4;
const floatsPerTriangle = verticiesPerTriangle * floatsPerDynamicVertex;
const floatSize = Float32Array.BYTES_PER_ELEMENT;
const bytesPerPosition = floatSize * floatsPerPosition;
const bytesPerColor = floatSize * floatsPerPosition;
const bytesPerPointSize = floatSize * floatsPerPointSize;
const bytesPerPositionColor = bytesPerPosition + bytesPerColor;
const bytesPerPointVertex = floatSize * floatsPerPointVertex;
const bytesPerDynamicVertex = floatSize * floatsPerDynamicVertex;
const bytesPerRow = floatsPerMat4Row * floatSize;
const bytesPerMatrix = bytesPerRow * floatSize;
const modelMatrixRow0Offset = bytesPerPositionColor + (bytesPerRow * 0);
const modelMatrixRow1Offset = bytesPerPositionColor + (bytesPerRow * 1);
const modelMatrixRow2Offset = bytesPerPositionColor + (bytesPerRow * 2);
const modelMatrixRow3Offset = bytesPerPositionColor + (bytesPerRow * 3);
exports.Constants = {
    floatsPerPosition: floatsPerPosition,
    floatsPerColor: floatsPerColor,
    floatsPerPointSize: floatsPerPointSize,
    verticiesPerTriangle: verticiesPerTriangle,
    floatsPerMat4Row: floatsPerMat4Row,
    floatsPerMat4: floatsPerMat4,
    floatsPerPositionColor: floatsPerPositionColor,
    floatsPerPointVertex: floatsPerPointVertex,
    floatsPerDynamicVertex: floatsPerDynamicVertex,
    floatsPerTriangle: floatsPerTriangle,
    bytesPerPosition: bytesPerPosition,
    bytesPerPositionColor: bytesPerPositionColor,
    bytesPerPointVertex: bytesPerPointVertex,
    bytesPerDynamicVertex: bytesPerDynamicVertex,
    modelMatrixRow0Offset: modelMatrixRow0Offset,
    modelMatrixRow1Offset: modelMatrixRow1Offset,
    modelMatrixRow2Offset: modelMatrixRow2Offset,
    modelMatrixRow3Offset: modelMatrixRow3Offset,
    defaultAlpha: 1.0
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeMode = void 0;
var ShapeMode;
(function (ShapeMode) {
    ShapeMode["points"] = "points";
    ShapeMode["lines"] = "lines";
    ShapeMode["triangles"] = "triangles";
    ShapeMode["rectangles"] = "rectangles";
    ShapeMode["hexagons"] = "hexagons";
    ShapeMode["octogons"] = "octogons";
    ShapeMode["ellipses"] = "ellipses";
    ShapeMode["box"] = "box";
})(ShapeMode = exports.ShapeMode || (exports.ShapeMode = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicShape = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
const constants_1 = __webpack_require__(1);
const shape_1 = __webpack_require__(5);
class DynamicShape extends shape_1.Shape {
    constructor(numberOfVerticies, point1, point2, rgbColor) {
        super(numberOfVerticies, constants_1.Constants.floatsPerDynamicVertex, rgbColor, point1, point2);
        this._modelMatrix = new cuon_matrix_ts_1.Mat4().setIdentity();
    }
    get modelMatrix() {
        return this._modelMatrix;
    }
    set modelMatrix(value) {
        this._modelMatrix = value;
        this.computeVerticies();
    }
    addXYZColorAndModelMatToVerticies(index, x, y, z) {
        const modelMatrixVerts = this._modelMatrix.elements;
        this._verticies[index] = x;
        this._verticies[index + 1] = y;
        this._verticies[index + 2] = z;
        this._verticies[index + 3] = this._rgbColor.red;
        this._verticies[index + 4] = this._rgbColor.green;
        this._verticies[index + 5] = this._rgbColor.blue;
        this._verticies[index + 6] = modelMatrixVerts[0];
        this._verticies[index + 7] = modelMatrixVerts[1];
        this._verticies[index + 8] = modelMatrixVerts[2];
        this._verticies[index + 9] = modelMatrixVerts[3];
        this._verticies[index + 10] = modelMatrixVerts[4];
        this._verticies[index + 11] = modelMatrixVerts[5];
        this._verticies[index + 12] = modelMatrixVerts[6];
        this._verticies[index + 13] = modelMatrixVerts[7];
        this._verticies[index + 14] = modelMatrixVerts[8];
        this._verticies[index + 15] = modelMatrixVerts[9];
        this._verticies[index + 16] = modelMatrixVerts[10];
        this._verticies[index + 17] = modelMatrixVerts[11];
        this._verticies[index + 18] = modelMatrixVerts[12];
        this._verticies[index + 19] = modelMatrixVerts[13];
        this._verticies[index + 20] = modelMatrixVerts[14];
        this._verticies[index + 21] = modelMatrixVerts[15];
    }
    addTriangleToVerticies(index, vertex1Position, vertex2Position, vertex3Position) {
        this.addXYZColorAndModelMatToVerticies(index, vertex1Position.x, vertex1Position.y, vertex1Position.z);
        this.addXYZColorAndModelMatToVerticies((index + constants_1.Constants.floatsPerDynamicVertex), vertex2Position.x, vertex2Position.y, vertex2Position.z);
        this.addXYZColorAndModelMatToVerticies((index + (constants_1.Constants.floatsPerDynamicVertex * 2)), vertex3Position.x, vertex3Position.y, vertex3Position.z);
    }
}
exports.DynamicShape = DynamicShape;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
const renderModeMapper_1 = __webpack_require__(7);
const shapeMode_1 = __webpack_require__(2);
const defaultRenderMode = renderModeMapper_1.RenderMode.points;
const defaultShapeMode = shapeMode_1.ShapeMode.points;
const defaultBackgroundColor = { red: 0.9, green: 0.9, blue: 0.9 };
const defaultColor = { red: 0.0, green: 0.0, blue: 0.0 };
const defaultEyePosition = new cuon_matrix_ts_1.Vec3(0, 0, 0.9);
const defaultLookAtPoint = new cuon_matrix_ts_1.Vec3(0, 0, -1);
const defaultUpPosition = new cuon_matrix_ts_1.Vec3(0, 1, 0);
const defaultFieldOfView = 60;
const defaultNear = 0.01;
const defaultFar = 2;
const defaultMovementSpeed = 0.01;
const defaultLookSensitivity = 0.1;
const defaultModelMatrix = new cuon_matrix_ts_1.Mat4().setIdentity();
const defaultIsFullscreen = false;
const instancedArrayExtensionName = "ANGLE_instanced_arrays";
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
    defaultFieldOfView: defaultFieldOfView,
    defaultNear: defaultNear,
    defaultFar: defaultFar,
    defaultModelMatrix: defaultModelMatrix,
    defaultIsFullScreen: defaultIsFullscreen,
    instancedArrayExtensionName: instancedArrayExtensionName,
    defaultMovementSpeed: defaultMovementSpeed,
    defaultLookSensitivity: defaultLookSensitivity
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
const boundingRectangle_1 = __webpack_require__(16);
const settings_1 = __webpack_require__(4);
class Shape {
    constructor(numberOfVerticies, numberOfFloatsPerVertex, rgbColor = settings_1.Settings.defaultColor, point1 = null, point2 = null) {
        this.numberOfVerticies = numberOfVerticies;
        this.numberOfFloatsPerVertex = numberOfFloatsPerVertex;
        this._rgbColor = rgbColor;
        this._verticies = new Float32Array(numberOfVerticies * this.numberOfFloatsPerVertex);
        if (point1 && point2) {
            this._boundingRect = new boundingRectangle_1.BoundingRectangle(point1, point2);
        }
    }
    get verticies() {
        return this._verticies;
    }
    get rgbColor() {
        return this._rgbColor;
    }
    set rgbColor(value) {
        this._rgbColor = value;
        this.computeVerticies();
    }
}
exports.Shape = Shape;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ThirdPoints = exports.Midpoint = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
class Midpoint {
    static between(point1, point2) {
        let midX = (point1.x + point2.x) / 2;
        let midY = (point1.y + point2.y) / 2;
        let midZ = (point1.z + point2.z) / 2;
        return new cuon_matrix_ts_1.Vec3(midX, midY, midZ);
    }
}
exports.Midpoint = Midpoint;
class ThirdPoints {
    static between(point1, point2) {
        let largerX = Math.max(point1.x, point2.x);
        let smallerX = Math.min(point1.x, point2.x);
        let largerY = Math.max(point1.y, point2.y);
        let smallerY = Math.min(point1.y, point2.y);
        let largerZ = Math.max(point1.z, point2.z);
        let smallerZ = Math.min(point1.z, point2.z);
        let thirdX = (largerX - smallerX) / 3;
        let thirdY = (largerY - smallerY) / 3;
        let thirdZ = (largerZ - smallerZ) / 3;
        let firstThird = new cuon_matrix_ts_1.Vec3((smallerX + thirdX), (smallerY + thirdY), (smallerZ + thirdZ));
        let secondThird = new cuon_matrix_ts_1.Vec3((firstThird.x + thirdX), (firstThird.y + thirdY), (firstThird.z + thirdZ));
        return { first: firstThird, second: secondThird };
    }
}
exports.ThirdPoints = ThirdPoints;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderModeMapper = exports.RenderMode = void 0;
var RenderMode;
(function (RenderMode) {
    RenderMode["points"] = "points";
    RenderMode["lines"] = "lines";
    RenderMode["lineStrip"] = "lineStrip";
    RenderMode["lineLoop"] = "lineLoop";
    RenderMode["triangles"] = "triangles";
    RenderMode["triangleStrip"] = "triangleStrip";
    RenderMode["triangleFan"] = "triangleFan";
})(RenderMode = exports.RenderMode || (exports.RenderMode = {}));
class RenderModeMapper {
    static renderModeToWebGlConstant(mode, gl) {
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
            default: throw `could not find renderMode named ${mode}`;
        }
    }
}
exports.RenderModeMapper = RenderModeMapper;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeBuffer = void 0;
const cuid = __webpack_require__(12);
const float32Vector_1 = __webpack_require__(9);
const glBufferWrapper_1 = __webpack_require__(14);
class ShapeBuffer extends glBufferWrapper_1.GlBufferWrapper {
    constructor(gl) {
        super(gl);
        this._verticies = new float32Vector_1.Float32Vector();
        this._trimmedArray = new Float32Array(0);
        this._shapes = {};
    }
    get verticies() {
        return this._trimmedArray;
    }
    get count() {
        return Object.keys(this._shapes).length;
    }
    get first() {
        const firstKey = Object.keys(this._shapes)[0];
        return this._shapes[firstKey].shape;
    }
    getShapes() {
        return Object.values(this._shapes).map(val => val.shape);
    }
    addShape(shape) {
        const id = this.introduceShape(shape);
        this._trimmedArray = this._verticies.getTrimmedArray();
        this.refreshWebglBuffer();
        return id;
    }
    addShapes(shapes) {
        let ids = new Array();
        if (shapes.length < 1) {
            return ids;
        }
        const exampleShape = shapes[0];
        const numberOfFloatsPerShape = exampleShape.numberOfVerticies * exampleShape.numberOfFloatsPerVertex;
        const numberOfFloatsBeingAdded = numberOfFloatsPerShape * shapes.length;
        this._verticies.resize(numberOfFloatsBeingAdded);
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];
            const id = this.introduceShape(shape);
            ids[i] = id;
        }
        this._trimmedArray = this._verticies.getTrimmedArray();
        this.refreshWebglBuffer();
        return ids;
    }
    removeShape(id) {
        if (this._shapes.hasOwnProperty(id)) {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;
            const verticiesCount = shape.numberOfVerticies * shape.numberOfFloatsPerVertex;
            const verticiesIndex = index * verticiesCount;
            this._verticies.remove(verticiesIndex, verticiesCount);
            this._trimmedArray = this._verticies.getTrimmedArray();
            this.refreshWebglBuffer();
            this.reorderIndicies(index);
            delete this._shapes[id];
            return true;
        }
        return false;
    }
    updateColor(id, newColor) {
        if (this._shapes.hasOwnProperty(id)) {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;
            shape.rgbColor = newColor;
            const verticiesCount = shape.numberOfVerticies * shape.numberOfFloatsPerVertex;
            const verticiesIndex = index * verticiesCount;
            this._verticies.overwrite(verticiesIndex, shape.verticies);
            this._trimmedArray = this._verticies.getTrimmedArray();
            this.refreshWebglBuffer();
            return true;
        }
        return false;
    }
    reorderIndicies(deletedIndex) {
        for (let key of Object.keys(this._shapes)) {
            if (this._shapes[key].index > deletedIndex) {
                this._shapes[key].index--;
            }
        }
    }
    introduceShape(shape) {
        const id = cuid();
        shape.id = id;
        const index = this.count;
        shape.name = shape.constructor.name + index;
        this._shapes[id] = { shape, index };
        this._verticies.addArray(shape.verticies);
        return id;
    }
}
exports.ShapeBuffer = ShapeBuffer;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Float32Vector = void 0;
const slice = __webpack_require__(32);
const float32ArrayUtils_1 = __webpack_require__(40);
class Float32Vector {
    constructor(arr = new Float32Array(0), sizeLimit = 0, bestFit = true) {
        this.arr = arr;
        this.size = arr.length;
        this._sizeLimit = sizeLimit;
        this._bestFit = bestFit;
    }
    resize(newSize) {
        if (newSize <= this.arr.length) {
            return;
        }
        let oldArr = this.arr;
        this.arr = new Float32Array(newSize);
        this.arr.set(oldArr);
    }
    addNumber(number) {
        const newSize = this.size + 1;
        const additionWillOverflowCapacity = this._sizeLimit && newSize > this._sizeLimit;
        if (additionWillOverflowCapacity) {
            return false;
        }
        const newArrayLength = this._sizeLimit ?
            Math.min(newSize * 2, this._sizeLimit) :
            newSize * 2;
        if (newSize >= this.arr.length) {
            this.resize(newArrayLength);
        }
        this.arr[this.size] = number;
        this.size = newSize;
        return true;
    }
    addArray(arr) {
        let newSize = this.size + arr.length;
        const additionWillOverflowCapacity = this._sizeLimit && newSize > this._sizeLimit;
        if (additionWillOverflowCapacity) {
            if (!this._bestFit) {
                return false;
            }
            const numberThatCanFit = this._sizeLimit - this.size;
            const shortenedArr = slice(arr, 0, numberThatCanFit);
            return this.addArray(shortenedArr);
        }
        const newArrayLength = this._sizeLimit ?
            Math.min(newSize * 2, this._sizeLimit) :
            newSize * 2;
        if (newSize >= this.arr.length) {
            this.resize(newArrayLength);
        }
        this.arr.set(arr, this.size);
        this.size = newSize;
        return true;
    }
    remove(start, count = 1) {
        if (start < 0 || start >= this.arr.length) {
            throw `index(${start}) is out of bounds`;
        }
        count = count > 0 ? count : 1;
        let insertionIndex = start;
        for (let i = insertionIndex + count; i < this.size; i++) {
            this.arr[insertionIndex] = this.arr[i];
            insertionIndex++;
        }
        float32ArrayUtils_1.Float32ArrayUtils.fill(this.arr, insertionIndex);
        const countOverflowed = start + count >= this.size;
        const numberDeleted = countOverflowed ?
            (this.size - start) : count;
        this.size -= numberDeleted;
    }
    overwrite(start, values) {
        if (start < 0 || start >= this.arr.length) {
            throw `index(${start}) is out of bounds`;
        }
        if (values.length < 1) {
            return;
        }
        let valuesIndex = 0;
        for (let i = start; i < this.size; i++) {
            if (valuesIndex >= values.length) {
                break;
            }
            this.arr[i] = values[valuesIndex];
            valuesIndex++;
        }
        if (valuesIndex < values.length) {
            const arrToAdd = slice(values, valuesIndex);
            this.addArray(arrToAdd);
        }
    }
    getTrimmedArray() {
        if (this.arr.length > this.size) {
            return slice(this.arr, 0, this.size);
        }
        return this.arr;
    }
}
exports.Float32Vector = Float32Vector;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeFactory = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
const ellipse_1 = __webpack_require__(15);
const triangle_1 = __webpack_require__(18);
const rectangle_1 = __webpack_require__(19);
const hexagon_1 = __webpack_require__(20);
const octogon_1 = __webpack_require__(21);
const precision_1 = __webpack_require__(17);
const box_1 = __webpack_require__(22);
const point_1 = __webpack_require__(23);
const line_1 = __webpack_require__(24);
class ShapeFactory {
    createPoint(location, gl, rgbColor, pointSize) {
        return new point_1.Point(location, gl, rgbColor, pointSize);
    }
    createLine(firstPoint, gl, rgbColor) {
        const locationVec3 = new cuon_matrix_ts_1.Vec3(firstPoint.x, firstPoint.y, 0);
        return new line_1.Line(locationVec3, gl, rgbColor);
    }
    createTriangle(point1, point2, gl, rgbColor) {
        return new triangle_1.Triangle(point1, point2, gl, rgbColor);
    }
    createRectangle(point1, point2, gl, rgbColor) {
        return new rectangle_1.Rectangle(point1, point2, gl, rgbColor);
    }
    createHexagon(point1, point2, gl, rgbColor) {
        return new hexagon_1.Hexagon(point1, point2, gl, rgbColor);
    }
    createOctogon(point1, point2, gl, rgbColor) {
        return new octogon_1.Octogon(point1, point2, gl, rgbColor);
    }
    createEllipse(point1, point2, gl, rgbColor) {
        return new ellipse_1.Ellipse(point1, point2, gl, precision_1.Precision.High, rgbColor);
    }
    createBox(point1, point2, gl, rgbColor) {
        return new box_1.Box(point1, point2, gl, rgbColor);
    }
    createShape(point1, point2, shapeMode, gl, rgbColor) {
        switch (shapeMode) {
            case "points":
                throw Error(`cannot create a point with this method, please use createPoint`);
            case "lines":
                throw Error(`cannot create a line with this method, please use createLine`);
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
            case "box":
                return this.createBox(point1, point2, gl, rgbColor);
            default:
                throw Error(`cannot recognize shape type ${shapeMode}`);
        }
    }
}
exports.ShapeFactory = ShapeFactory;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLRenderer = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
const cuid = __webpack_require__(12);
const renderModeMapper_1 = __webpack_require__(7);
const constants_1 = __webpack_require__(1);
const shaderSettings_1 = __webpack_require__(29);
const shaderType_1 = __webpack_require__(30);
const settings_1 = __webpack_require__(4);
const browserHelper_1 = __webpack_require__(13);
const pointBuffer_1 = __webpack_require__(31);
const vertexBuffer_1 = __webpack_require__(41);
class WebGLRenderer {
    constructor(canvas, renderingOptions = {}, postResizeCalllback = () => { }) {
        this._pointVertexShaderSource = `    attribute vec4 ${shaderSettings_1.ShaderSettings.positionAttributeName};
    attribute vec4 ${shaderSettings_1.ShaderSettings.colorAttributeName};
    attribute float ${shaderSettings_1.ShaderSettings.pointSizeAttributeName};
    uniform mat4 ${shaderSettings_1.ShaderSettings.vpMatrixUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${shaderSettings_1.ShaderSettings.vpMatrixUniformName} * ${shaderSettings_1.ShaderSettings.positionAttributeName};
        gl_PointSize = ${shaderSettings_1.ShaderSettings.pointSizeAttributeName};
        v_color = ${shaderSettings_1.ShaderSettings.colorAttributeName};
    }`;
        this._dynamicVertexShaderSource = `    attribute vec4 ${shaderSettings_1.ShaderSettings.positionAttributeName};
    attribute vec4 ${shaderSettings_1.ShaderSettings.colorAttributeName};
    attribute mat4 ${shaderSettings_1.ShaderSettings.modelMatrixAttributeName};
    uniform mat4 ${shaderSettings_1.ShaderSettings.vpMatrixUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${shaderSettings_1.ShaderSettings.vpMatrixUniformName} * ${shaderSettings_1.ShaderSettings.modelMatrixAttributeName} * ${shaderSettings_1.ShaderSettings.positionAttributeName};
        v_color = ${shaderSettings_1.ShaderSettings.colorAttributeName};
    }`;
        this._positionColorVertexShaderSource = `    attribute vec4 ${shaderSettings_1.ShaderSettings.positionAttributeName};
    attribute vec4 ${shaderSettings_1.ShaderSettings.colorAttributeName};
    uniform mat4 ${shaderSettings_1.ShaderSettings.vpMatrixUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${shaderSettings_1.ShaderSettings.vpMatrixUniformName} * ${shaderSettings_1.ShaderSettings.positionAttributeName};
        v_color = ${shaderSettings_1.ShaderSettings.colorAttributeName};
    }`;
        this._fragmentShaderSource = `    precision mediump float;
    uniform vec4 u_fragColor;
    varying vec4 v_color;
    void main(void)
    {
        gl_FragColor = v_color;
    }`;
        this.handleContextLost = (event) => {
            this.stop();
            event.preventDefault();
            this._isContextLost = true;
        };
        this.handleContextRestored = () => {
            this._isContextLost = false;
            this.setupGlResources();
            this.refreshAllWebGlBuffers();
            this.start();
        };
        this.renderLoop = () => {
            this.draw();
            this._animationFrameRequestId = this._window.requestAnimationFrame(this.renderLoop);
        };
        this.defaultCalcWidth = (newWidth) => {
            return newWidth;
        };
        this.defaultCalcHeight = (newHeight) => {
            return newHeight;
        };
        this.resizeCanvas = (canvas, window, renderer) => {
            const newWidth = this._calcWidth(window.innerWidth);
            const newHeight = this._calcHeight(window.innerHeight);
            renderer.setViewPortDimensions(newWidth, newHeight);
            canvas.width = newWidth;
            canvas.height = newHeight;
            this._postResizeCallback(canvas, window, renderer);
        };
        this._canvas = canvas;
        this._postResizeCallback = postResizeCalllback;
        this.setCanvasEventHandlers();
        this._browserHelper = renderingOptions.browserHelper || new browserHelper_1.BrowserHelper();
        this.setupGlResources();
        this.initializeRenderingOptions(renderingOptions);
        this.initializaBuffers();
        this.setupWindowCallbacks();
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(backgroundColor) {
        this._backgroundColor = backgroundColor;
    }
    get isFullscreen() {
        return this._isFullscreen;
    }
    set isFullscreen(value) {
        this._isFullscreen = value;
        this.setupWindowCallbacks();
    }
    get calcWidth() {
        return this._calcWidth;
    }
    set calcWidth(value) {
        this._calcWidth = value;
        this.setupWindowCallbacks();
    }
    get calcHeight() {
        return this._calcHeight;
    }
    set calcHeight(value) {
        this._calcHeight = value;
        this.setupWindowCallbacks();
    }
    set postResizeCallback(value) {
        this._postResizeCallback = value;
        this.setupWindowCallbacks();
    }
    setViewPortDimensions(newWidth, newHeight) {
        this.gl.viewport(0, 0, newWidth, newHeight);
    }
    addHeterogenoeusShapesArrayToScene(shapes) {
        let shapeIds = new Array();
        for (let shape of shapes) {
            shapeIds.push(this.addShapeToScene(shape));
        }
        return shapeIds;
    }
    removeAllShapes() {
        this.initializaShapeBuffers();
    }
    removeAllVerticies() {
        this.initializeVertexBuffers();
    }
    updatePointSize(id, newPointSize) {
        return this._pointsShapeBuffer.updatePointSize(id, newPointSize);
    }
    start() {
        this.renderLoop();
    }
    stop() {
        this._window.cancelAnimationFrame(this._animationFrameRequestId);
    }
    draw() {
        this.gl.clearColor(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, settings_1.Settings.defaultBackgroundAlpha);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this._pointShaderProgram);
        this.getPointShaderVariables();
        if (this._pointsShapeBuffer.count > 0) {
            this.drawPointShapeBuffer(this._pointsShapeBuffer);
        }
        for (let key in this._lineBuffer) {
            if (this._lineBuffer[key]) {
                let line = this._lineBuffer[key];
                this.drawLine(line);
            }
        }
        this.gl.useProgram(this._dynamicShapeShaderProgram);
        this.getDynamicShapeShaderVariables();
        for (let sb of this._dynamicShapeBuffers) {
            if (sb.count > 0) {
                this.drawDynamicShapeBuffer(sb);
            }
        }
        this.gl.useProgram(this._positionColorShaderProgram);
        this.getShaderVariables(this._positionColorShaderProgram);
        for (let vb of this._vertexBuffers) {
            for (let verts of vb.verticiesStack) {
                if (verts.size > 0) {
                    this.drawVertexBuffer(vb);
                }
            }
        }
    }
    addVertexToSceneBase(position, renderMode, color = settings_1.Settings.defaultColor) {
        const glRenderMode = renderModeMapper_1.RenderModeMapper.renderModeToWebGlConstant(renderMode, this.gl);
        switch (glRenderMode) {
            case this.gl.POINTS:
                this._pointsVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.LINES:
                this._linesVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.LINE_STRIP:
                this._lineStripVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.LINE_LOOP:
                this._lineLoopVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.TRIANGLES:
                this._trianglesVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.TRIANGLE_STRIP:
                this._triangleStripVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.TRIANGLE_FAN:
                this._triangleFanVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
        }
    }
    addLine(line) {
        const id = cuid();
        this._lineBuffer[id] = line;
        return id;
    }
    addLines(lines) {
        let ids = [];
        for (let line of lines) {
            ids.push(this.addLine(line));
        }
        return ids;
    }
    removeLine(id) {
        if (this._lineBuffer[id]) {
            delete this._lineBuffer[id];
            return true;
        }
        return false;
    }
    updateLineColor(id, newColor) {
        if (this._lineBuffer[id]) {
            this._lineBuffer[id].rgbColor = newColor;
            return true;
        }
        return false;
    }
    addPointToLineBase(id, point) {
        if (this._lineBuffer[id]) {
            this._lineBuffer[id].addVertex(point);
            return true;
        }
        return false;
    }
    removeShapeFromUnspecifiedBuffer(id) {
        if (this._pointsShapeBuffer.removeShape(id)) {
            return true;
        }
        for (let shapeBuffer of this._dynamicShapeBuffers) {
            if (shapeBuffer.removeShape(id)) {
                return true;
            }
        }
        return false;
    }
    updateShapeColorFromUnspecifiedBuffer(id, newColor) {
        if (this._pointsShapeBuffer.updateColor(id, newColor)) {
            return true;
        }
        for (let shapeBuffer of this._dynamicShapeBuffers) {
            if (shapeBuffer.updateColor(id, newColor)) {
                return true;
            }
        }
        return false;
    }
    createUniforNotFoundErrorMessage(uniformsMap) {
        let result = `cannot find uniform in shader program\n`;
        result += `potential culprits:\n`;
        for (let key in uniformsMap) {
            if (uniformsMap.hasOwnProperty(key)) {
                result += `\t${key}: ${uniformsMap[key]}\n`;
            }
        }
        return result;
    }
    drawPointShapeBufferBase(shapeBuffer, mvpMatrix = new cuon_matrix_ts_1.Mat4().setIdentity()) {
        this.checkForUniforms();
        const verticies = shapeBuffer.verticies;
        const shapePrototype = shapeBuffer.first;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shapeBuffer.glBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this._a_position, constants_1.Constants.floatsPerPosition, this.gl.FLOAT, false, constants_1.Constants.bytesPerPointVertex, 0);
        this.gl.enableVertexAttribArray(this._a_position);
        this.gl.vertexAttribPointer(this._a_color, constants_1.Constants.floatsPerColor, this.gl.FLOAT, false, constants_1.Constants.bytesPerPointVertex, constants_1.Constants.bytesPerPosition);
        this.gl.enableVertexAttribArray(this._a_color);
        this.gl.vertexAttribPointer(this._a_pointSize, constants_1.Constants.floatsPerPointSize, this.gl.FLOAT, false, constants_1.Constants.bytesPerPointVertex, constants_1.Constants.bytesPerPositionColor);
        this.gl.enableVertexAttribArray(this._a_pointSize);
        this.gl.uniformMatrix4fv(this._u_vpMatrix, false, mvpMatrix.elements);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / constants_1.Constants.floatsPerPointVertex));
    }
    drawDynamicShapeBufferBase(shapeBuffer, mvpMatrix = new cuon_matrix_ts_1.Mat4().setIdentity()) {
        this.checkForUniforms();
        const verticies = shapeBuffer.verticies;
        const shapePrototype = shapeBuffer.first;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shapeBuffer.glBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this._a_position, constants_1.Constants.floatsPerPosition, this.gl.FLOAT, false, constants_1.Constants.bytesPerDynamicVertex, 0);
        this.gl.enableVertexAttribArray(this._a_position);
        this.gl.vertexAttribPointer(this._a_color, constants_1.Constants.floatsPerColor, this.gl.FLOAT, false, constants_1.Constants.bytesPerDynamicVertex, constants_1.Constants.bytesPerPosition);
        this.gl.enableVertexAttribArray(this._a_color);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow0, constants_1.Constants.floatsPerMat4Row, this.gl.FLOAT, false, constants_1.Constants.bytesPerDynamicVertex, constants_1.Constants.modelMatrixRow0Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow0);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow1, constants_1.Constants.floatsPerMat4Row, this.gl.FLOAT, false, constants_1.Constants.bytesPerDynamicVertex, constants_1.Constants.modelMatrixRow1Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow1);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow2, constants_1.Constants.floatsPerMat4Row, this.gl.FLOAT, false, constants_1.Constants.bytesPerDynamicVertex, constants_1.Constants.modelMatrixRow2Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow2);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow3, constants_1.Constants.floatsPerMat4Row, this.gl.FLOAT, false, constants_1.Constants.bytesPerDynamicVertex, constants_1.Constants.modelMatrixRow3Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow3);
        this.gl.uniformMatrix4fv(this._u_vpMatrix, false, mvpMatrix.elements);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / constants_1.Constants.floatsPerDynamicVertex));
    }
    drawLineBase(line, mvpMatrix = new cuon_matrix_ts_1.Mat4().setIdentity()) {
        this.checkForUniforms();
        const verticies = line.verticies;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, line.glBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this._a_position, constants_1.Constants.floatsPerPosition, this.gl.FLOAT, false, constants_1.Constants.bytesPerPointVertex, 0);
        this.gl.enableVertexAttribArray(this._a_position);
        this.gl.vertexAttribPointer(this._a_color, constants_1.Constants.floatsPerColor, this.gl.FLOAT, false, constants_1.Constants.bytesPerPointVertex, constants_1.Constants.bytesPerPosition);
        this.gl.enableVertexAttribArray(this._a_color);
        this.gl.uniformMatrix4fv(this._u_vpMatrix, false, mvpMatrix.elements);
        this.gl.drawArrays(line.glRenderMode, 0, (verticies.length / constants_1.Constants.floatsPerPointVertex));
    }
    drawVertexBufferBase(vb, mvpMatrix = new cuon_matrix_ts_1.Mat4().setIdentity()) {
        this.checkForUniforms();
        for (const vec of vb.verticiesStack) {
            const arr = vec.arr;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vb.glBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, arr, this.gl.STATIC_DRAW);
            this.gl.vertexAttribPointer(this._a_position, constants_1.Constants.floatsPerPosition, this.gl.FLOAT, false, constants_1.Constants.bytesPerPositionColor, 0);
            this.gl.enableVertexAttribArray(this._a_position);
            this.gl.vertexAttribPointer(this._a_color, constants_1.Constants.floatsPerColor, this.gl.FLOAT, false, constants_1.Constants.bytesPerPositionColor, constants_1.Constants.bytesPerPosition);
            this.gl.enableVertexAttribArray(this._a_color);
            this.gl.uniformMatrix4fv(this._u_vpMatrix, false, mvpMatrix.elements);
            this.gl.drawArrays(vb.glRenderMode, 0, (arr.length / constants_1.Constants.floatsPerPositionColor));
        }
    }
    setCanvasEventHandlers() {
        this._canvas.addEventListener("webglcontextlost", this.handleContextLost, false);
        this._canvas.addEventListener("webglcontextrestored", this.handleContextRestored, false);
    }
    setupGlResources() {
        this.getContext();
        this.setViewPortDimensions(this._canvas.width, this._canvas.height);
        this._pointShaderProgram = this.initShaders(this._pointVertexShaderSource, this._fragmentShaderSource);
        this._dynamicShapeShaderProgram = this.initShaders(this._dynamicVertexShaderSource, this._fragmentShaderSource);
        this._positionColorShaderProgram = this.initShaders(this._positionColorVertexShaderSource, this._fragmentShaderSource);
    }
    getContext() {
        let gl;
        const isIE = this._browserHelper.isIE();
        const isEdge = this._browserHelper.isEdge();
        const contextId = (isIE || isEdge) ? "experimental-webgl" : "webgl";
        try {
            gl = this._canvas.getContext(contextId, {
                alpha: false,
                antialias: false,
                depth: true
            });
        }
        catch (e) {
            throw `error creating webgl context!: ${e.toString()}`;
        }
        if (gl === null) {
            throw `error creating webgl context!, gl === null`;
        }
        this._isContextLost = false;
        this.gl = gl;
    }
    initializeRenderingOptions(renderingOptions) {
        this._backgroundColor = (renderingOptions && renderingOptions.backgroundColor) || settings_1.Settings.defaultBackgroundColor;
        this._window = (renderingOptions && renderingOptions.window) || window;
        this._isFullscreen = (renderingOptions && renderingOptions.fullscreen) || settings_1.Settings.defaultIsFullScreen;
        this._calcWidth = (renderingOptions && renderingOptions.calcWidth) || this.defaultCalcWidth;
        this._calcHeight = (renderingOptions && renderingOptions.calcHeight) || this.defaultCalcHeight;
    }
    initializaBuffers() {
        this.initializaShapeBuffers();
        this.initializeVertexBuffers();
    }
    initializaShapeBuffers() {
        this.initializaDynamicShapeBuffers();
        this.initializeVertexBuffers();
        this._pointsShapeBuffer = new pointBuffer_1.PointBuffer(this.gl);
        this._lineBuffer = {};
    }
    initializeVertexBuffers() {
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
    }
    refreshAllWebGlBuffers() {
        this._pointsShapeBuffer.refreshWebglBuffer();
        for (let key in this._lineBuffer) {
            if (this._lineBuffer[key]) {
                let line = this._lineBuffer[key];
                line.refreshWebglBuffer();
            }
        }
        for (let sb of this._dynamicShapeBuffers) {
            sb.refreshWebglBuffer();
        }
        for (let vb of this._vertexBuffers) {
            vb.refreshWebglBuffer();
        }
    }
    getDynamicShapeShaderVariables() {
        this.getShaderVariables(this._dynamicShapeShaderProgram);
        this._a_modelMatrixRow0 = this.gl.getAttribLocation(this._dynamicShapeShaderProgram, shaderSettings_1.ShaderSettings.modelMatrixAttributeName);
        this._a_modelMatrixRow1 = this._a_modelMatrixRow0 + 1;
        this._a_modelMatrixRow2 = this._a_modelMatrixRow0 + 2;
        this._a_modelMatrixRow3 = this._a_modelMatrixRow0 + 3;
    }
    getPointShaderVariables() {
        this.getShaderVariables(this._pointShaderProgram);
        this._a_pointSize = this.gl.getAttribLocation(this._pointShaderProgram, shaderSettings_1.ShaderSettings.pointSizeAttributeName);
    }
    getShaderVariables(shader) {
        this._a_position = this.gl.getAttribLocation(shader, shaderSettings_1.ShaderSettings.positionAttributeName);
        this._a_color = this.gl.getAttribLocation(shader, shaderSettings_1.ShaderSettings.colorAttributeName);
        this._u_vpMatrix = this.gl.getUniformLocation(shader, shaderSettings_1.ShaderSettings.vpMatrixUniformName);
    }
    initShaders(vertexSource, fragmentSource) {
        const vertexShader = this.createShader(vertexSource, shaderType_1.ShaderType.vertex);
        const fragmentShader = this.createShader(fragmentSource, shaderType_1.ShaderType.fragment);
        if (vertexShader === null || fragmentShader === null) {
            throw "could not create shaders";
        }
        let shader = this.gl.createProgram();
        if (shader === null) {
            throw "could not create shader program";
        }
        const shaderProgram = shader;
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            throw "could not link shader program";
        }
        return shaderProgram;
    }
    createShader(shaderSource, type) {
        let shader = null;
        if (type === "fragment") {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        }
        else if (type === "vertex") {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        }
        if (shader === null) {
            throw `could not create ${type} shader`;
        }
        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw `could not compile shader, shader info log: ${this.gl.getShaderInfoLog(shader)}`;
        }
        return shader;
    }
    checkForUniforms() {
        if (!this._u_vpMatrix) {
            const uniformsMap = {};
            uniformsMap[shaderSettings_1.ShaderSettings.vpMatrixUniformName] = this._u_vpMatrix;
            const errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw errorMessage;
        }
    }
    setupWindowCallbacks() {
        if (this._isFullscreen) {
            this._window.addEventListener("resize", () => {
                if (!this._isContextLost) {
                    this.resizeCanvas(this._canvas, this._window, this);
                }
            }, false);
            this.resizeCanvas(this._canvas, this._window, this);
        }
    }
}
exports.WebGLRenderer = WebGLRenderer;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 *
 * Copyright (c) Eric Elliott 2012
 * MIT License
 */

/*global window, navigator, document, require, process, module */
(function (app) {
  'use strict';
  var namespace = 'cuid',
    c = 0,
    blockSize = 4,
    base = 36,
    discreteValues = Math.pow(base, blockSize),

    pad = function pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length-size);
    },

    randomBlock = function randomBlock() {
      return pad((Math.random() *
            discreteValues << 0)
            .toString(base), blockSize);
    },

    safeCounter = function () {
      c = (c < discreteValues) ? c : 0;
      c++; // this is not subliminal
      return c - 1;
    },

    api = function cuid() {
      // Starting with a lowercase letter makes
      // it HTML element ID friendly.
      var letter = 'c', // hard-coded allows for sequential access

        // timestamp
        // warning: this exposes the exact date and time
        // that the uid was created.
        timestamp = (new Date().getTime()).toString(base),

        // Prevent same-machine collisions.
        counter,

        // A few chars to generate distinct ids for different
        // clients (so different computers are far less
        // likely to generate the same id)
        fingerprint = api.fingerprint(),

        // Grab some more chars from Math.random()
        random = randomBlock() + randomBlock();

        counter = pad(safeCounter().toString(base), blockSize);

      return  (letter + timestamp + counter + fingerprint + random);
    };

  api.slug = function slug() {
    var date = new Date().getTime().toString(36),
      counter,
      print = api.fingerprint().slice(0,1) +
        api.fingerprint().slice(-1),
      random = randomBlock().slice(-2);

      counter = safeCounter().toString(36).slice(-4);

    return date.slice(-2) +
      counter + print + random;
  };

  api.globalCount = function globalCount() {
    // We want to cache the results of this
    var cache = (function calc() {
        var i,
          count = 0;

        for (i in window) {
          count++;
        }

        return count;
      }());

    api.globalCount = function () { return cache; };
    return cache;
  };

  api.fingerprint = function browserPrint() {
    return pad((navigator.mimeTypes.length +
      navigator.userAgent.length).toString(36) +
      api.globalCount().toString(36), 4);
  };

  // don't change anything from here down.
  if (app.register) {
    app.register(namespace, api);
  } else if (true) {
    module.exports = api;
  } else {
    app[namespace] = api;
  }

}(this.applitude || this));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserHelper = void 0;
class BrowserHelper {
    isIE() {
        return false || !!document.documentMode;
    }
    isEdge() {
        return !this.isIE() && !!window.StyleMedia;
    }
}
exports.BrowserHelper = BrowserHelper;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GlBufferWrapper = void 0;
class GlBufferWrapper {
    constructor(gl) {
        this._gl = gl;
        this._glBuffer = this._gl.createBuffer();
    }
    get glBuffer() {
        return this._glBuffer;
    }
    refreshWebglBuffer() {
        this._gl.deleteBuffer(this._glBuffer);
        this._glBuffer = this._gl.createBuffer();
    }
}
exports.GlBufferWrapper = GlBufferWrapper;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Ellipse = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
const dynamicShape_1 = __webpack_require__(3);
const midpoint_1 = __webpack_require__(6);
const precision_1 = __webpack_require__(17);
const constants_1 = __webpack_require__(1);
const shapeMode_1 = __webpack_require__(2);
class Ellipse extends dynamicShape_1.DynamicShape {
    constructor(point1, point2, gl, precision = precision_1.Precision.High, rgbColor) {
        super(precision === precision_1.Precision.High ? Ellipse.highPrecisionNumberOfVerticies :
            Ellipse.lowPrecisionNumberOfVerticies, point1, point2, rgbColor);
        this.shapeMode = shapeMode_1.ShapeMode.ellipses;
        this.horizontalRadius = (this._boundingRect.topRight.x - this._boundingRect.topLeft.x) / 2;
        this.verticalRadius = (this._boundingRect.topLeft.y - this._boundingRect.bottomLeft.y) / 2;
        this.center = midpoint_1.Midpoint.between(this._boundingRect.topLeft, this._boundingRect.bottomRight);
        this.leftEndPoint = midpoint_1.Midpoint.between(this._boundingRect.topLeft, this._boundingRect.bottomLeft);
        this.rightEndPoint = midpoint_1.Midpoint.between(this._boundingRect.topRight, this._boundingRect.bottomRight);
        this.precision = precision;
        this.computeVerticies();
        this.glRenderMode = gl.TRIANGLES;
        this.numberOfVerticies = this.precision === precision_1.Precision.High ? Ellipse.highPrecisionNumberOfVerticies
            : Ellipse.lowPrecisionNumberOfVerticies;
    }
    computeVerticies() {
        let numberOfPointsAlongTheCurve, numberOfVerticies = 0;
        if (this.precision === precision_1.Precision.High) {
            numberOfPointsAlongTheCurve = Ellipse.highPrecisionNumberOfPointsAlongCurve;
            numberOfVerticies = Ellipse.highPrecisionNumberOfVerticies;
        }
        else if (this.precision === precision_1.Precision.Low) {
            numberOfPointsAlongTheCurve = Ellipse.lowPrecisionNumberOfPointsAlongCurve;
            numberOfVerticies = Ellipse.lowPrecisionNumberOfVerticies;
        }
        let x = this.leftEndPoint.x;
        const xIncrement = (this.horizontalRadius * 2) / (numberOfPointsAlongTheCurve / 2);
        let previousPointAboveCenter = this.leftEndPoint;
        let previousPointBelowCenter = this.leftEndPoint;
        let insertionIndex = 0;
        for (let i = 0; i < (numberOfPointsAlongTheCurve / 2) - 1; i++) {
            x += xIncrement;
            let y = this.getYDistanceFromCenterForX(x);
            const newPointAboveCenter = new cuon_matrix_ts_1.Vec3(x, y + this.center.y);
            const newPointBelowCenter = new cuon_matrix_ts_1.Vec3(x, this.center.y - y);
            this.addTriangleToVerticies(insertionIndex, previousPointAboveCenter, this.center, newPointAboveCenter);
            insertionIndex += constants_1.Constants.floatsPerTriangle;
            this.addTriangleToVerticies(insertionIndex, previousPointBelowCenter, this.center, newPointBelowCenter);
            insertionIndex += constants_1.Constants.floatsPerTriangle;
            previousPointAboveCenter = newPointAboveCenter;
            previousPointBelowCenter = newPointBelowCenter;
        }
        this.addTriangleToVerticies(insertionIndex, previousPointAboveCenter, this.center, this.rightEndPoint);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, previousPointBelowCenter, this.center, this.rightEndPoint);
    }
    getYDistanceFromCenterForX(x) {
        let verticalRadiusSquared = Math.pow(this.verticalRadius, 2);
        return Math.sqrt(verticalRadiusSquared -
            ((verticalRadiusSquared * Math.pow((x - this.center.x), 2)) / Math.pow(this.horizontalRadius, 2)));
    }
}
exports.Ellipse = Ellipse;
Ellipse.numberOfEndPoints = 2;
Ellipse.highPrecisionNumberOfPointsAlongCurve = 400 + Ellipse.numberOfEndPoints;
Ellipse.highPrecisionNumberOfVerticies = Ellipse.highPrecisionNumberOfPointsAlongCurve * constants_1.Constants.verticiesPerTriangle;
Ellipse.lowPrecisionNumberOfPointsAlongCurve = 8 + Ellipse.numberOfEndPoints;
Ellipse.lowPrecisionNumberOfVerticies = Ellipse.lowPrecisionNumberOfPointsAlongCurve * constants_1.Constants.verticiesPerTriangle;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundingRectangle = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
class BoundingRectangle {
    constructor(point1, point2) {
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
    isTopLeftBottomRight(point1, point2) {
        return point1.x <= point2.x && point1.y >= point2.y;
    }
    isBottomRightTopLeft(point1, point2) {
        return point1.x >= point2.x && point1.y <= point2.y;
    }
    isBottomLeftTopRight(point1, point2) {
        return point1.x <= point2.x && point1.y <= point2.y;
    }
}
exports.BoundingRectangle = BoundingRectangle;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Precision = void 0;
var Precision;
(function (Precision) {
    Precision[Precision["Low"] = 0] = "Low";
    Precision[Precision["High"] = 1] = "High";
})(Precision = exports.Precision || (exports.Precision = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
const dynamicShape_1 = __webpack_require__(3);
const midpoint_1 = __webpack_require__(6);
const shapeMode_1 = __webpack_require__(2);
class Triangle extends dynamicShape_1.DynamicShape {
    constructor(point1, point2, gl, rgbColor) {
        super(Triangle.numberOfVerticies, point1, point2, rgbColor);
        this.shapeMode = shapeMode_1.ShapeMode.triangles;
        this.computeVerticies();
        this.glRenderMode = gl.TRIANGLES;
    }
    computeVerticies() {
        const topPoint = midpoint_1.Midpoint.between(this._boundingRect.topLeft, this._boundingRect.topRight);
        let insertionIndex = 0;
        this.addTriangleToVerticies(insertionIndex, this._boundingRect.bottomLeft, topPoint, this._boundingRect.bottomRight);
    }
}
exports.Triangle = Triangle;
Triangle.numberOfVerticies = 3;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const dynamicShape_1 = __webpack_require__(3);
const constants_1 = __webpack_require__(1);
const shapeMode_1 = __webpack_require__(2);
class Rectangle extends dynamicShape_1.DynamicShape {
    constructor(point1, point2, gl, rgbColor) {
        super(Rectangle.numberOfVerticies, point1, point2, rgbColor);
        this.shapeMode = shapeMode_1.ShapeMode.rectangles;
        this.computeVerticies();
        this.glRenderMode = gl.TRIANGLES;
    }
    computeVerticies() {
        let insertionIndex = 0;
        this.addTriangleToVerticies(insertionIndex, this._boundingRect.topLeft, this._boundingRect.topRight, this._boundingRect.bottomLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, this._boundingRect.bottomLeft, this._boundingRect.topRight, this._boundingRect.bottomRight);
    }
}
exports.Rectangle = Rectangle;
Rectangle.numberOfVerticies = 6;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Hexagon = void 0;
const dynamicShape_1 = __webpack_require__(3);
const midpoint_1 = __webpack_require__(6);
const constants_1 = __webpack_require__(1);
const shapeMode_1 = __webpack_require__(2);
class Hexagon extends dynamicShape_1.DynamicShape {
    constructor(point1, point2, gl, rgbColor) {
        super(Hexagon.numberOfVerticies, point1, point2, rgbColor);
        this.shapeMode = shapeMode_1.ShapeMode.hexagons;
        this.computeVerticies();
        this.glRenderMode = gl.TRIANGLES;
    }
    computeVerticies() {
        const topThirds = midpoint_1.ThirdPoints.between(this._boundingRect.topLeft, this._boundingRect.topRight);
        const topFirstThird = topThirds.first;
        const topSecondThird = topThirds.second;
        const bottomThirds = midpoint_1.ThirdPoints.between(this._boundingRect.bottomRight, this._boundingRect.bottomLeft);
        const bottomFirstThird = bottomThirds.first;
        const bottomSecondThird = bottomThirds.second;
        const midLeft = midpoint_1.Midpoint.between(this._boundingRect.bottomLeft, this._boundingRect.topLeft);
        const midRight = midpoint_1.Midpoint.between(this._boundingRect.topRight, this._boundingRect.bottomRight);
        let insertionIndex = 0;
        this.addTriangleToVerticies(insertionIndex, topFirstThird, bottomFirstThird, midLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, topFirstThird, bottomFirstThird, bottomSecondThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, topFirstThird, topSecondThird, bottomSecondThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, topSecondThird, bottomSecondThird, midRight);
    }
}
exports.Hexagon = Hexagon;
Hexagon.numberOfVerticies = 12;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Octogon = void 0;
const dynamicShape_1 = __webpack_require__(3);
const midpoint_1 = __webpack_require__(6);
const constants_1 = __webpack_require__(1);
const shapeMode_1 = __webpack_require__(2);
class Octogon extends dynamicShape_1.DynamicShape {
    constructor(point1, point2, gl, rgbColor) {
        super(Octogon.numberOfVerticies, point1, point2, rgbColor);
        this.shapeMode = shapeMode_1.ShapeMode.octogons;
        this.computeVerticies();
        this.glRenderMode = gl.TRIANGLES;
    }
    computeVerticies() {
        const topThirds = midpoint_1.ThirdPoints.between(this._boundingRect.topLeft, this._boundingRect.topRight);
        const rightThirds = midpoint_1.ThirdPoints.between(this._boundingRect.topRight, this._boundingRect.bottomRight);
        const bottomThirds = midpoint_1.ThirdPoints.between(this._boundingRect.bottomLeft, this._boundingRect.bottomRight);
        const leftThirds = midpoint_1.ThirdPoints.between(this._boundingRect.topLeft, this._boundingRect.bottomLeft);
        const topLeftThird = topThirds.first;
        const topRightThird = topThirds.second;
        const rightTopThird = rightThirds.second;
        const rightBottomThird = rightThirds.first;
        const bottomLeftThird = bottomThirds.first;
        const bottomRightThird = bottomThirds.second;
        const leftTopThird = leftThirds.second;
        const leftBottomThird = leftThirds.first;
        let insertionIndex = 0;
        this.addTriangleToVerticies(insertionIndex, leftTopThird, topLeftThird, leftBottomThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftBottomThird, topLeftThird, bottomLeftThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, bottomLeftThird, topLeftThird, bottomRightThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, topLeftThird, bottomRightThird, topRightThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, topRightThird, bottomRightThird, rightBottomThird);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, topRightThird, rightBottomThird, rightTopThird);
    }
}
exports.Octogon = Octogon;
Octogon.numberOfVerticies = 18;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
const dynamicShape_1 = __webpack_require__(3);
const boundingRectangle_1 = __webpack_require__(16);
const constants_1 = __webpack_require__(1);
const shapeMode_1 = __webpack_require__(2);
class Box extends dynamicShape_1.DynamicShape {
    constructor(point1, point2, gl, rgbColor) {
        super(Box.numberOfVerticies, point1, point2, rgbColor);
        this.shapeMode = shapeMode_1.ShapeMode.box;
        const length = this._boundingRect.topRight.x - this._boundingRect.topLeft.x;
        const height = this._boundingRect.topRight.y - this._boundingRect.bottomRight.y;
        const depth = Math.min(length, height);
        this._backFaceZ = this._boundingRect.bottomLeft.z + depth;
        this.computeVerticies();
        this.glRenderMode = gl.TRIANGLES;
    }
    computeVerticies() {
        let insertionIndex = 0;
        this.addTriangleToVerticies(insertionIndex, this._boundingRect.topLeft, this._boundingRect.topRight, this._boundingRect.bottomLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, this._boundingRect.bottomLeft, this._boundingRect.topRight, this._boundingRect.bottomRight);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        const rightFaceRect = new boundingRectangle_1.BoundingRectangle(this._boundingRect.topRight, new cuon_matrix_ts_1.Vec3(this._boundingRect.bottomRight.x, this._boundingRect.bottomRight.y, this._backFaceZ));
        this.addTriangleToVerticies(insertionIndex, rightFaceRect.topLeft, rightFaceRect.topRight, rightFaceRect.bottomLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, rightFaceRect.bottomLeft, rightFaceRect.topRight, rightFaceRect.bottomRight);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        const leftFaceRect = new boundingRectangle_1.BoundingRectangle(this._boundingRect.topLeft, new cuon_matrix_ts_1.Vec3(this._boundingRect.bottomLeft.x, this._boundingRect.bottomLeft.y, this._backFaceZ));
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.topLeft, leftFaceRect.topRight, leftFaceRect.bottomLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.bottomLeft, leftFaceRect.topRight, leftFaceRect.bottomRight);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.topRight, rightFaceRect.topRight, leftFaceRect.bottomRight);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.bottomRight, rightFaceRect.topRight, rightFaceRect.bottomRight);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.topRight, rightFaceRect.topRight, leftFaceRect.topLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.topLeft, rightFaceRect.topRight, rightFaceRect.topLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.bottomRight, rightFaceRect.bottomRight, leftFaceRect.bottomLeft);
        insertionIndex += constants_1.Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.bottomLeft, rightFaceRect.bottomRight, rightFaceRect.bottomLeft);
    }
}
exports.Box = Box;
Box.numberOfVerticies = 36;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const shape_1 = __webpack_require__(5);
const constants_1 = __webpack_require__(1);
const shapeMode_1 = __webpack_require__(2);
const settings_1 = __webpack_require__(4);
class Point extends shape_1.Shape {
    constructor(location, gl, rgbColor, pointSize = settings_1.Settings.defaultPointSize) {
        super(Point.numberOfVerticies, constants_1.Constants.floatsPerPointVertex, rgbColor);
        this.shapeMode = shapeMode_1.ShapeMode.points;
        this._location = location;
        this._pointSize = pointSize;
        this.computeVerticies();
        this.glRenderMode = gl.POINTS;
    }
    get pointSize() {
        return this._pointSize;
    }
    set pointSize(value) {
        this._pointSize = value;
        this.computeVerticies();
    }
    computeVerticies() {
        this.addXYZColorAndPointSize(0, this._location.x, this._location.y, this._location.z);
    }
    addXYZColorAndPointSize(index, x, y, z) {
        this._verticies[index] = x;
        this._verticies[index + 1] = y;
        this._verticies[index + 2] = z;
        this._verticies[index + 3] = this.rgbColor.red;
        this._verticies[index + 4] = this.rgbColor.green;
        this._verticies[index + 5] = this.rgbColor.blue;
        this._verticies[index + 6] = this._pointSize;
    }
}
exports.Point = Point;
Point.numberOfVerticies = 1;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const shape_1 = __webpack_require__(5);
const float32Vector_1 = __webpack_require__(9);
const constants_1 = __webpack_require__(1);
const shapeMode_1 = __webpack_require__(2);
class Line extends shape_1.Shape {
    constructor(point, gl, rgbColor) {
        super(1, constants_1.Constants.floatsPerPositionColor, rgbColor);
        this.shapeMode = shapeMode_1.ShapeMode.lines;
        let array = new float32Vector_1.Float32Vector();
        this._vertexPositions = new Array();
        this._vertexPositions.push(point);
        this.computeVerticies();
        this.glRenderMode = gl.LINE_STRIP;
        this._gl = gl;
        this._glBuffer = this._gl.createBuffer();
    }
    get verticies() {
        return this._verticiesVector.getTrimmedArray();
    }
    get glBuffer() {
        return this._glBuffer;
    }
    refreshWebglBuffer() {
        this._gl.deleteBuffer(this._glBuffer);
        this._glBuffer = this._gl.createBuffer();
    }
    computeVerticies() {
        let arr = new Float32Array(this._vertexPositions.length * constants_1.Constants.floatsPerPositionColor);
        for (let i = 0; i < this._vertexPositions.length; i++) {
            const insertionIndex = i * constants_1.Constants.floatsPerPositionColor;
            const vertexPosition = this._vertexPositions[i];
            this.addXYZAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }
        this._verticiesVector = new float32Vector_1.Float32Vector(arr);
    }
    addVertex(vertex) {
        this._vertexPositions.push(vertex);
        this.numberOfVerticies++;
        let array = new Float32Array(constants_1.Constants.floatsPerPositionColor);
        this.addXYZAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this._verticiesVector.addArray(array);
        this.refreshWebglBuffer();
    }
    addXYZAndColorToFloat32Array(array, index, x, y, z) {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = this.rgbColor.red;
        array[index + 4] = this.rgbColor.green;
        array[index + 5] = this.rgbColor.blue;
    }
}
exports.Line = Line;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
const settings_1 = __webpack_require__(4);
class Camera {
    constructor(aspectRatio, fieldOfView = settings_1.Settings.defaultFieldOfView, near = settings_1.Settings.defaultNear, far = settings_1.Settings.defaultFar, eyePosition = settings_1.Settings.defaultEyePosition, lookAtPoint = settings_1.Settings.defaultLookAtPoint, upPosition = settings_1.Settings.defaultUpPosition, movementSpeed = settings_1.Settings.defaultMovementSpeed, lookSensitivity = settings_1.Settings.defaultLookSensitivity) {
        this._viewMatrix = new cuon_matrix_ts_1.Mat4();
        this._projectionMatrix = new cuon_matrix_ts_1.Mat4();
        this._vpMatrix = new cuon_matrix_ts_1.Mat4();
        this._eyePosition = this._initialEyePosition = eyePosition;
        this._lookAtPoint = this._initialLookAtPoint = lookAtPoint;
        this._upPosition = this._initialUpPosition = upPosition;
        this.updateView();
        this._aspectRatio = aspectRatio;
        this._fieldOfView = fieldOfView;
        this._near = near;
        this._far = far;
        this.updatePerspective();
        this._movementSpeed = movementSpeed;
        this._lookSensitivity = lookSensitivity;
    }
    get vpMatrix() {
        return this._vpMatrix;
    }
    get viewMatrix() {
        return this._viewMatrix;
    }
    get projectionMatrix() {
        return this._projectionMatrix;
    }
    get aspectRatio() {
        return this._aspectRatio;
    }
    set aspectRatio(value) {
        this._aspectRatio = value;
        this.updatePerspective();
    }
    get fieldOfView() {
        return this._fieldOfView;
    }
    set fieldOfView(value) {
        this._fieldOfView = value;
        this.updatePerspective();
    }
    get near() {
        return this._near;
    }
    set near(value) {
        this._near = value;
        this.updatePerspective();
    }
    get far() {
        return this._far;
    }
    set far(value) {
        this._far = value;
        this.updatePerspective();
    }
    get eyePosition() {
        return this._eyePosition;
    }
    set eyePosition(value) {
        this._eyePosition = value;
        this.updateView();
    }
    get lookAtPoint() {
        return this._lookAtPoint;
    }
    set lookAtPoint(value) {
        this._lookAtPoint = value;
        this.updateView();
    }
    get up() {
        return this._upPosition;
    }
    set up(value) {
        this._upPosition = value;
        this.updateView();
    }
    get forward() {
        return cuon_matrix_ts_1.Vec3.normalize(cuon_matrix_ts_1.Vec3.sub(this._lookAtPoint, this._eyePosition));
    }
    get right() {
        return cuon_matrix_ts_1.Vec3.normalize(cuon_matrix_ts_1.Vec3.cross(this.forward, this._upPosition));
    }
    get movementSpeed() {
        return this._movementSpeed;
    }
    set movementSpeed(value) {
        this._movementSpeed = value;
    }
    get lookSensitivity() {
        return this._lookSensitivity;
    }
    set lookSensitivity(value) {
        this._lookSensitivity = value;
    }
    panX(xOffset = this._movementSpeed) {
        this._eyePosition = new cuon_matrix_ts_1.Vec3(this._eyePosition.x + xOffset, this._eyePosition.y, this._eyePosition.z);
        this._lookAtPoint = new cuon_matrix_ts_1.Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);
        this.updateView();
    }
    panY(yOffset = this._movementSpeed) {
        this._eyePosition = new cuon_matrix_ts_1.Vec3(this._eyePosition.x, this._eyePosition.y + yOffset, this._eyePosition.z);
        this._lookAtPoint = new cuon_matrix_ts_1.Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);
        this.updateView();
    }
    zoomIn(zOffset = this._movementSpeed) {
        this._eyePosition = new cuon_matrix_ts_1.Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - zOffset);
        this._lookAtPoint = new cuon_matrix_ts_1.Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);
        this.updateView();
    }
    zoomOut(zOffset = this._movementSpeed) {
        this._eyePosition = new cuon_matrix_ts_1.Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z + zOffset);
        this._lookAtPoint = new cuon_matrix_ts_1.Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);
        this.updateView();
    }
    moveForward(moveAmount = this._movementSpeed) {
        const direction = cuon_matrix_ts_1.Vec3.scale(this.forward, moveAmount);
        this._eyePosition.add(direction);
        this._lookAtPoint.add(direction);
        this.updateView();
    }
    moveBackward(moveAmount = this._movementSpeed) {
        this.moveForward(-moveAmount);
    }
    moveLeft(moveAmount = this._movementSpeed) {
        this.moveRight(-moveAmount);
    }
    moveRight(moveAmount = this._movementSpeed) {
        const rightMovement = cuon_matrix_ts_1.Vec3.scale(this.right, moveAmount);
        this._eyePosition.add(rightMovement);
        this._lookAtPoint.add(rightMovement);
        this.updateView();
    }
    moveUp(moveAmount = this._movementSpeed) {
        this._eyePosition.y += moveAmount;
        this._lookAtPoint.y += moveAmount;
        this.updateView();
    }
    moveDown(moveAmount = this._movementSpeed) {
        this.moveUp(-moveAmount);
    }
    reset() {
        this._eyePosition = this._initialEyePosition;
        this._lookAtPoint = this._initialLookAtPoint;
        this._upPosition = this._initialUpPosition;
        this.updateView();
    }
    rotatePitch(yOffset) {
        let yRadians = yOffset * (Math.PI / 180);
        let maxAngleUp = this._upPosition.angle(this._lookAtPoint);
        maxAngleUp -= 0.001;
        if (yRadians > maxAngleUp)
            yRadians = maxAngleUp;
        let maxAngleDown = cuon_matrix_ts_1.Vec3.negate(this._upPosition).angle(this._lookAtPoint);
        maxAngleDown *= -1;
        maxAngleDown += 0.001;
        if (yRadians < maxAngleDown)
            yRadians = maxAngleDown;
        yRadians *= this._lookSensitivity;
        const rotatedDirection = cuon_matrix_ts_1.Vec3.rotate(this.forward, this.right, yRadians);
        this._lookAtPoint = cuon_matrix_ts_1.Vec3.add(this._eyePosition, rotatedDirection);
        this.updateView();
    }
    rotateYaw(xOffset) {
        let xRadians = xOffset * (Math.PI / 180);
        xRadians *= this._lookSensitivity;
        const rotatedDirection = this.forward.rotate(this.up, xRadians);
        this._lookAtPoint = cuon_matrix_ts_1.Vec3.add(this._eyePosition, rotatedDirection);
        this.updateView();
    }
    updateView() {
        this._viewMatrix.setLookAt(this.eyePosition.x, this.eyePosition.y, this.eyePosition.z, this.lookAtPoint.x, this.lookAtPoint.y, this.lookAtPoint.z, this.up.x, this.up.y, this.up.z);
        this.updateViewProjectionMatrix();
    }
    updatePerspective() {
        this._projectionMatrix.setPerspective(this._fieldOfView, this._aspectRatio, this._near, this._far);
        this.updateViewProjectionMatrix();
    }
    updateViewProjectionMatrix() {
        this._vpMatrix = new cuon_matrix_ts_1.Mat4().setIdentity();
        this._vpMatrix.multiply(this._projectionMatrix);
        this._vpMatrix.multiply(this._viewMatrix);
    }
}
exports.Camera = Camera;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RGBColor = void 0;
class RGBColor {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}
exports.RGBColor = RGBColor;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHelper = exports.BrowserHelper = exports.Camera = exports.Box = exports.Point = exports.Octogon = exports.Hexagon = exports.Line = exports.Rectangle = exports.Triangle = exports.Ellipse = exports.ShapeMode = exports.ShapeFactory = exports.DynamicShape = exports.Shape = exports.RenderModeMapper = exports.RenderMode = exports.ColorMapper = exports.Color = exports.RGBColor = exports.Mat4 = exports.Vec3 = exports.Vec2 = exports.WebGLRenderer3d = exports.WebGLRenderer2d = void 0;
const webglRenderer2d_1 = __webpack_require__(28);
Object.defineProperty(exports, "WebGLRenderer2d", { enumerable: true, get: function () { return webglRenderer2d_1.WebGLRenderer2d; } });
const webglRenderer3d_1 = __webpack_require__(42);
Object.defineProperty(exports, "WebGLRenderer3d", { enumerable: true, get: function () { return webglRenderer3d_1.WebGLRenderer3d; } });
const cuon_matrix_ts_1 = __webpack_require__(0);
Object.defineProperty(exports, "Vec2", { enumerable: true, get: function () { return cuon_matrix_ts_1.Vec2; } });
Object.defineProperty(exports, "Vec3", { enumerable: true, get: function () { return cuon_matrix_ts_1.Vec3; } });
Object.defineProperty(exports, "Mat4", { enumerable: true, get: function () { return cuon_matrix_ts_1.Mat4; } });
const rgbColor_1 = __webpack_require__(26);
Object.defineProperty(exports, "RGBColor", { enumerable: true, get: function () { return rgbColor_1.RGBColor; } });
const colorMapper_1 = __webpack_require__(43);
Object.defineProperty(exports, "Color", { enumerable: true, get: function () { return colorMapper_1.Color; } });
Object.defineProperty(exports, "ColorMapper", { enumerable: true, get: function () { return colorMapper_1.ColorMapper; } });
const renderModeMapper_1 = __webpack_require__(7);
Object.defineProperty(exports, "RenderMode", { enumerable: true, get: function () { return renderModeMapper_1.RenderMode; } });
Object.defineProperty(exports, "RenderModeMapper", { enumerable: true, get: function () { return renderModeMapper_1.RenderModeMapper; } });
const shape_1 = __webpack_require__(5);
Object.defineProperty(exports, "Shape", { enumerable: true, get: function () { return shape_1.Shape; } });
const dynamicShape_1 = __webpack_require__(3);
Object.defineProperty(exports, "DynamicShape", { enumerable: true, get: function () { return dynamicShape_1.DynamicShape; } });
const shapeFactory_1 = __webpack_require__(10);
Object.defineProperty(exports, "ShapeFactory", { enumerable: true, get: function () { return shapeFactory_1.ShapeFactory; } });
const shapeMode_1 = __webpack_require__(2);
Object.defineProperty(exports, "ShapeMode", { enumerable: true, get: function () { return shapeMode_1.ShapeMode; } });
const line_1 = __webpack_require__(24);
Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return line_1.Line; } });
const ellipse_1 = __webpack_require__(15);
Object.defineProperty(exports, "Ellipse", { enumerable: true, get: function () { return ellipse_1.Ellipse; } });
const rectangle_1 = __webpack_require__(19);
Object.defineProperty(exports, "Rectangle", { enumerable: true, get: function () { return rectangle_1.Rectangle; } });
const hexagon_1 = __webpack_require__(20);
Object.defineProperty(exports, "Hexagon", { enumerable: true, get: function () { return hexagon_1.Hexagon; } });
const octogon_1 = __webpack_require__(21);
Object.defineProperty(exports, "Octogon", { enumerable: true, get: function () { return octogon_1.Octogon; } });
const triangle_1 = __webpack_require__(18);
Object.defineProperty(exports, "Triangle", { enumerable: true, get: function () { return triangle_1.Triangle; } });
const point_1 = __webpack_require__(23);
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return point_1.Point; } });
const box_1 = __webpack_require__(22);
Object.defineProperty(exports, "Box", { enumerable: true, get: function () { return box_1.Box; } });
const camera_1 = __webpack_require__(25);
Object.defineProperty(exports, "Camera", { enumerable: true, get: function () { return camera_1.Camera; } });
const browserHelper_1 = __webpack_require__(13);
Object.defineProperty(exports, "BrowserHelper", { enumerable: true, get: function () { return browserHelper_1.BrowserHelper; } });
const mouseHelper_1 = __webpack_require__(44);
Object.defineProperty(exports, "MouseHelper", { enumerable: true, get: function () { return mouseHelper_1.MouseHelper; } });


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLRenderer2d = void 0;
const webglRenderer_1 = __webpack_require__(11);
const shapeBuffer_1 = __webpack_require__(8);
const shapeFactory_1 = __webpack_require__(10);
const cuon_matrix_ts_1 = __webpack_require__(0);
class WebGLRenderer2d extends webglRenderer_1.WebGLRenderer {
    constructor(canvas, renderingOptions = {}) {
        super(canvas, renderingOptions);
        this._shapeFactory = new shapeFactory_1.ShapeFactory();
    }
    get shapeFactory() {
        return this._shapeFactory;
    }
    addShapeToScene(shape) {
        switch (shape.shapeMode) {
            case "points":
                return this._pointsShapeBuffer.addShape(shape);
            case "lines":
                return this.addLine(shape);
            case "triangles":
                return this._trianglesShapeBuffer.addShape(shape);
            case "rectangles":
                return this._rectanglesShapeBuffer.addShape(shape);
            case "hexagons":
                return this._hexagonsShapeBuffer.addShape(shape);
            case "octogons":
                return this._octogonsShapeBuffer.addShape(shape);
            case "ellipses":
                return this._ellipsesShapeBuffer.addShape(shape);
            case "box":
                throw `adding 3d shape(${shape.shapeMode}) to 2d scene is not supported`;
        }
        return "";
    }
    addHomogenoeusShapesArrayToScene(shapes) {
        const shape = shapes[0];
        if (!shape) {
            return new Array();
        }
        switch (shape.shapeMode) {
            case "points":
                return this._pointsShapeBuffer.addShapes(shapes);
            case "lines":
                return this.addLines(shapes);
            case "triangles":
                return this._trianglesShapeBuffer.addShapes(shapes);
            case "rectangles":
                return this._rectanglesShapeBuffer.addShapes(shapes);
            case "hexagons":
                return this._hexagonsShapeBuffer.addShapes(shapes);
            case "octogons":
                return this._octogonsShapeBuffer.addShapes(shapes);
            case "ellipses":
                return this._ellipsesShapeBuffer.addShapes(shapes);
            case "box":
                throw `adding 3d shape(${shape.shapeMode}) to 2d scene is not supported`;
        }
        return new Array();
    }
    addVertexToScene(position, renderMode, color) {
        const positionVec3 = new cuon_matrix_ts_1.Vec3(position.x, position.y, 0);
        this.addVertexToSceneBase(positionVec3, renderMode, color);
    }
    addPointToLine(id, point) {
        const pointVec3 = new cuon_matrix_ts_1.Vec3(point.x, point.y, 0);
        return this.addPointToLineBase(id, pointVec3);
    }
    removeShape(id, shapeMode) {
        switch (shapeMode) {
            case "points":
                return this._pointsShapeBuffer.removeShape(id);
            case "lines":
                return this.removeLine(id);
            case "triangles":
                return this._trianglesShapeBuffer.removeShape(id);
            case "rectangles":
                return this._rectanglesShapeBuffer.removeShape(id);
            case "hexagons":
                return this._hexagonsShapeBuffer.removeShape(id);
            case "octogons":
                return this._octogonsShapeBuffer.removeShape(id);
            case "ellipses":
                return this._ellipsesShapeBuffer.removeShape(id);
        }
        return this.removeShapeFromUnspecifiedBuffer(id);
    }
    updateShapeColor(id, newColor, shapeMode) {
        switch (shapeMode) {
            case "points":
                return this._pointsShapeBuffer.updateColor(id, newColor);
            case "lines":
                return this.updateLineColor(id, newColor);
            case "triangles":
                return this._trianglesShapeBuffer.updateColor(id, newColor);
            case "rectangles":
                return this._rectanglesShapeBuffer.updateColor(id, newColor);
            case "hexagons":
                return this._hexagonsShapeBuffer.updateColor(id, newColor);
            case "octogons":
                return this._octogonsShapeBuffer.updateColor(id, newColor);
            case "ellipses":
                return this._ellipsesShapeBuffer.updateColor(id, newColor);
        }
        return this.updateShapeColorFromUnspecifiedBuffer(id, newColor);
    }
    drawPointShapeBuffer(shapeBuffer) {
        this.drawPointShapeBufferBase(shapeBuffer);
    }
    drawLine(line) {
        this.drawLineBase(line);
    }
    drawDynamicShapeBuffer(shapeBuffer) {
        this.drawDynamicShapeBufferBase(shapeBuffer);
    }
    drawVertexBuffer(vertexBuffer) {
        this.drawVertexBufferBase(vertexBuffer);
    }
    initializaDynamicShapeBuffers() {
        this._trianglesShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._rectanglesShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._hexagonsShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._octogonsShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._ellipsesShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._dynamicShapeBuffers = [
            this._trianglesShapeBuffer,
            this._rectanglesShapeBuffer,
            this._hexagonsShapeBuffer,
            this._octogonsShapeBuffer,
            this._ellipsesShapeBuffer
        ];
    }
}
exports.WebGLRenderer2d = WebGLRenderer2d;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderSettings = void 0;
exports.ShaderSettings = {
    positionAttributeName: "a_position",
    colorAttributeName: "a_color",
    modelMatrixAttributeName: "a_modelMatrix",
    pointSizeAttributeName: "a_pointSize",
    vpMatrixUniformName: "u_vpMatrix"
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderType = void 0;
var ShaderType;
(function (ShaderType) {
    ShaderType["fragment"] = "fragment";
    ShaderType["vertex"] = "vertex";
})(ShaderType = exports.ShaderType || (exports.ShaderType = {}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PointBuffer = void 0;
const shapeBuffer_1 = __webpack_require__(8);
class PointBuffer extends shapeBuffer_1.ShapeBuffer {
    updatePointSize(id, newPointSize) {
        if (this._shapes.hasOwnProperty(id)) {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;
            shape.pointSize = newPointSize;
            const verticiesCount = shape.numberOfVerticies * shape.numberOfFloatsPerVertex;
            const verticiesIndex = index * verticiesCount;
            this._verticies.overwrite(verticiesIndex, shape.verticies);
            this._trimmedArray = this._verticies.getTrimmedArray();
            this.refreshWebglBuffer();
            return true;
        }
        return false;
    }
}
exports.PointBuffer = PointBuffer;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var sliced = __webpack_require__(38)

function slice_typedarray(array, sliceBegin, sliceEnd) {
  var bs = array.BYTES_PER_ELEMENT
    , bo = array.byteOffset
    , n = array.length
  sliceBegin = (sliceBegin|0) || 0
  sliceEnd = sliceEnd === undefined ? n : (sliceEnd|0)
  if(sliceBegin < 0) {
    sliceBegin += n
  }
  if(sliceEnd < 0) {
    sliceEnd += n
  }
  return new array.constructor(array.buffer.slice(bo + bs*sliceBegin, bo + bs*sliceEnd))
}

function slice_buffer(buffer, sliceBegin, sliceEnd) {
  var len = buffer.length | 0
    , start = sliceBegin || 0
    , end = sliceEnd === undefined ? len : sliceEnd
  if(start < 0) {
    start += len
  }
  if(end < 0) {
    end += len
  }
  var nsize = end - start
  if(nsize <= 0) {
    return new Buffer(0)
  }
  var result = new Buffer(end - start)
  buffer.copy(result, 0, start, end)
  return result
}

function genericSlice(array, sliceBegin, sliceEnd) {
  if(array.buffer) {
    return slice_typedarray(array, sliceBegin, sliceEnd)
  } else if(array instanceof Buffer) {
    return slice_buffer(array, sliceBegin, sliceEnd)
  } else if(array.slice) {
    return array.slice(sliceBegin, sliceEnd)
  }
  return sliced(array, sliceBegin, sliceEnd)
}

function genericSlice_nobuffer(array, sliceBegin, sliceEnd) {
  if(array.buffer) {
    return slice_typedarray(array, sliceBegin, sliceEnd)
  } else if(array.slice) {
    return array.slice(sliceBegin, sliceEnd)
  }
  return sliced(array, sliceBegin, sliceEnd)
}

if(typeof Buffer === undefined) {
  module.exports = genericSlice_nobuffer
} else {
  module.exports = genericSlice
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33).Buffer))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(35)
var ieee754 = __webpack_require__(36)
var isArray = __webpack_require__(37)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)))

/***/ }),
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = exports = __webpack_require__(39);


/***/ }),
/* 39 */
/***/ (function(module, exports) {


/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}



/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Float32ArrayUtils = void 0;
class Float32ArrayUtils {
    static fill(arr, start = 0, end = arr.length, value = 0) {
        if (start < 0 || start >= arr.length) {
            throw `index(${start}) is out of bounds`;
        }
        end = end <= start ? start + 1 : end;
        const stopIndex = Math.min(arr.length, end);
        for (let i = start; i < stopIndex; i++) {
            arr[i] = value;
        }
    }
}
exports.Float32ArrayUtils = Float32ArrayUtils;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VertexBuffer = void 0;
const float32Vector_1 = __webpack_require__(9);
const constants_1 = __webpack_require__(1);
const glBufferWrapper_1 = __webpack_require__(14);
class VertexBuffer extends glBufferWrapper_1.GlBufferWrapper {
    constructor(glRenderMode, gl, vectorSizeLimit = 0) {
        super(gl);
        if (this.glRenderModeValidator(glRenderMode, gl)) {
            this.glRenderMode = glRenderMode;
            this._vectorSizeLimit = vectorSizeLimit;
            let initialVector = this._vectorSizeLimit ?
                new float32Vector_1.Float32Vector(new Float32Array(0), this._vectorSizeLimit) :
                new float32Vector_1.Float32Vector(new Float32Array(0));
            this._topVertexVector = initialVector;
            this.verticiesStack = new Array();
            this.verticiesStack.push(this._topVertexVector);
        }
        else {
            throw "cannot initialize vertex buffer of unrecognized gl render mode";
        }
    }
    addVertex(vertex) {
        if (vertex.length !== constants_1.Constants.floatsPerPositionColor) {
            throw `cannot add vertex repersented by ${vertex.length} floats, ` +
                `we only accept verticies of ${constants_1.Constants.floatsPerPositionColor} floats (x, y, z, r, g, b)`;
        }
        if (!this._vectorSizeLimit || (this._topVertexVector.size + vertex.length <= this._vectorSizeLimit)) {
            this._topVertexVector.addArray(vertex);
        }
        else {
            this._topVertexVector = new float32Vector_1.Float32Vector(vertex, this._vectorSizeLimit);
            this.verticiesStack.push(this._topVertexVector);
        }
        this.refreshWebglBuffer();
    }
    glRenderModeValidator(glRenderMode, gl) {
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
    }
}
exports.VertexBuffer = VertexBuffer;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLRenderer3d = void 0;
const webglRenderer_1 = __webpack_require__(11);
const camera_1 = __webpack_require__(25);
const shapeBuffer_1 = __webpack_require__(8);
const shapeFactory_1 = __webpack_require__(10);
class WebGLRenderer3d extends webglRenderer_1.WebGLRenderer {
    constructor(canvas, renderingOptions = {}) {
        super(canvas, renderingOptions);
        this._camera = new camera_1.Camera((this._canvas.width / this._canvas.height));
        this.postResizeCallback = (leCanvas, window, renderer) => {
            this.camera.aspectRatio = (leCanvas.width / leCanvas.height);
        };
        this._shapeFactory = new shapeFactory_1.ShapeFactory();
    }
    get camera() {
        return this._camera;
    }
    set camera(value) {
        this._camera = value;
    }
    get shapeFactory() {
        return this._shapeFactory;
    }
    getAllShapesInScene() {
        let arr = new Array();
        arr.push(...this._pointsShapeBuffer.getShapes());
        arr.push(...this._trianglesShapeBuffer.getShapes());
        arr.push(...this._rectanglesShapeBuffer.getShapes());
        arr.push(...this._hexagonsShapeBuffer.getShapes());
        arr.push(...this._octogonsShapeBuffer.getShapes());
        arr.push(...this._ellipsesShapeBuffer.getShapes());
        arr.push(...this._boxShapeBuffer.getShapes());
        return arr;
    }
    addShapeToScene(shape) {
        switch (shape.shapeMode) {
            case "points":
                return this._pointsShapeBuffer.addShape(shape);
            case "lines":
                return this.addLine(shape);
            case "triangles":
                return this._trianglesShapeBuffer.addShape(shape);
            case "rectangles":
                return this._rectanglesShapeBuffer.addShape(shape);
            case "hexagons":
                return this._hexagonsShapeBuffer.addShape(shape);
            case "octogons":
                return this._octogonsShapeBuffer.addShape(shape);
            case "ellipses":
                return this._ellipsesShapeBuffer.addShape(shape);
            case "box":
                return this._boxShapeBuffer.addShape(shape);
        }
        return "";
    }
    addHomogenoeusShapesArrayToScene(shapes) {
        const shape = shapes[0];
        if (!shape) {
            return new Array();
        }
        switch (shape.shapeMode) {
            case "points":
                return this._pointsShapeBuffer.addShapes(shapes);
            case "lines":
                return this.addLines(shapes);
            case "triangles":
                return this._trianglesShapeBuffer.addShapes(shapes);
            case "rectangles":
                return this._rectanglesShapeBuffer.addShapes(shapes);
            case "hexagons":
                return this._hexagonsShapeBuffer.addShapes(shapes);
            case "octogons":
                return this._octogonsShapeBuffer.addShapes(shapes);
            case "ellipses":
                return this._ellipsesShapeBuffer.addShapes(shapes);
            case "box":
                return this._boxShapeBuffer.addShapes(shapes);
        }
        return new Array();
    }
    addVertexToScene(position, renderMode, color) {
        this.addVertexToSceneBase(position, renderMode, color);
    }
    addPointToLine(id, point) {
        return this.addPointToLineBase(id, point);
    }
    removeShape(id, shapeMode) {
        switch (shapeMode) {
            case "points":
                return this._pointsShapeBuffer.removeShape(id);
            case "lines":
                return this.removeLine(id);
            case "triangles":
                return this._trianglesShapeBuffer.removeShape(id);
            case "rectangles":
                return this._rectanglesShapeBuffer.removeShape(id);
            case "hexagons":
                return this._hexagonsShapeBuffer.removeShape(id);
            case "octogons":
                return this._octogonsShapeBuffer.removeShape(id);
            case "ellipses":
                return this._ellipsesShapeBuffer.removeShape(id);
            case "box":
                return this._boxShapeBuffer.removeShape(id);
        }
        return this.removeShapeFromUnspecifiedBuffer(id);
    }
    updateShapeColor(id, newColor, shapeMode) {
        switch (shapeMode) {
            case "points":
                return this._pointsShapeBuffer.updateColor(id, newColor);
            case "lines":
                return this.updateLineColor(id, newColor);
            case "triangles":
                return this._trianglesShapeBuffer.updateColor(id, newColor);
            case "rectangles":
                return this._rectanglesShapeBuffer.updateColor(id, newColor);
            case "hexagons":
                return this._hexagonsShapeBuffer.updateColor(id, newColor);
            case "octogons":
                return this._octogonsShapeBuffer.updateColor(id, newColor);
            case "ellipses":
                return this._ellipsesShapeBuffer.updateColor(id, newColor);
            case "box":
                return this._boxShapeBuffer.updateColor(id, newColor);
        }
        return this.updateShapeColorFromUnspecifiedBuffer(id, newColor);
    }
    drawPointShapeBuffer(shapeBuffer) {
        this.drawPointShapeBufferBase(shapeBuffer, this._camera.vpMatrix);
    }
    drawLine(line) {
        this.drawLineBase(line, this._camera.vpMatrix);
    }
    drawDynamicShapeBuffer(shapeBuffer) {
        this.drawDynamicShapeBufferBase(shapeBuffer, this._camera.vpMatrix);
    }
    drawVertexBuffer(vertexBuffer) {
        this.drawVertexBufferBase(vertexBuffer, this._camera.vpMatrix);
    }
    initializaDynamicShapeBuffers() {
        this._trianglesShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._rectanglesShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._hexagonsShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._octogonsShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._ellipsesShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._boxShapeBuffer = new shapeBuffer_1.ShapeBuffer(this.gl);
        this._dynamicShapeBuffers = [
            this._trianglesShapeBuffer,
            this._rectanglesShapeBuffer,
            this._hexagonsShapeBuffer,
            this._octogonsShapeBuffer,
            this._ellipsesShapeBuffer,
            this._boxShapeBuffer
        ];
    }
}
exports.WebGLRenderer3d = WebGLRenderer3d;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorMapper = exports.Color = void 0;
const rgbColor_1 = __webpack_require__(26);
var Color;
(function (Color) {
    Color["red"] = "red";
    Color["orange"] = "orange";
    Color["yellow"] = "yellow";
    Color["green"] = "green";
    Color["cyan"] = "cyan";
    Color["blue"] = "blue";
    Color["indigo"] = "indigo";
    Color["fuchsia"] = "fuchsia";
    Color["white"] = "white";
})(Color = exports.Color || (exports.Color = {}));
class ColorMapper {
    static colorToRGBColor(color) {
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
            default: throw `could not find color ${color}`;
        }
    }
}
exports.ColorMapper = ColorMapper;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHelper = void 0;
const cuon_matrix_ts_1 = __webpack_require__(0);
class MouseHelper {
    static mouseEventToWebGlPoints(event, canvas) {
        let x = event.clientX;
        let y = event.clientY;
        let rect = canvas.getBoundingClientRect();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        x = ((x - rect.left) - canvasWidth / 2) / (canvasWidth / 2);
        y = (canvasHeight / 2 - (y - rect.top)) / (canvasHeight / 2);
        return new cuon_matrix_ts_1.Vec3(x, y);
    }
}
exports.MouseHelper = MouseHelper;


/***/ })
/******/ ]);
});
//# sourceMappingURL=webgl-renderer.js.map