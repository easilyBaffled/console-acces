(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["console-access"] = factory();
	else
		root["console-access"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * A function to configure and create the access function.
 * Some may not be comfortable adding things to the native console and window object,
 * or don't want that in production.
 * This function lets you make those decisions before actually using access.
 *
 * @param {boolean} onConsole   - A flag indicating if you want access added to the native console object. If false this function will return the access function. If true it adds it to the console and returns true;
 * @param {string}  label       - The label that, combined with the item's index, will act as the key to access the item. Defaults to '_'.
 * @param {object}  target      - Object you want to attach accessible objects to. Defaults to window.
 * @return {function|boolean} A function that in addition to logging the parameters also makes the available on the window or given object so that you can access them without using the debugger.
 */
module.exports = function ( onConsole = true, label = '_', target = window ) {
    const isBrowser = typeof target !== 'undefined';
    if ( !isBrowser ) {
        console.log( `Sorry it's not ready for Node yet. This will just be console.log for you.` );
        return console.log;
    }
    /**
     * Logs the given arguments to the console in the form `key1: arg1, key2: arg2 ...`
     * and adds the arguments to a given object, window by default, so that you can easily access them directly without having to step through the debugger
     * @param {*} args - any number of arguments that you would normally pass to the other console functions.
     */
    function access ( ...args ) {
        let str = '';
        const objectList = args.reduce( ( objectList, arg, index ) => {
            index = index + ( target._lastLabel || 0 ); // Keep track of how many items have been made accessable so that there are no conflicting keys

            str += label + index + ': %o '; // "Outputs a JavaScript object. Clicking the object name opens more information about it in the inspector."

            target[ label + index ] = arg;

            objectList.push( arg );
            return objectList;
        }, [] );

        target._lastLabel = ( target._lastLabel || 0 ) + args.length;

        console.log( str, ...objectList );
    }

    if ( !onConsole ) return access;

    console[ 'access' ] = access;
    return true;

};

/***/ })
/******/ ]);
});