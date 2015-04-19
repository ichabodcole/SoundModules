// Require the node-deep-extend package
// var deepExtend = require('deep-extend');
var utils = {
    isObject: function (obj) {
        return (typeof obj === 'object' && obj != null);
    },
    // Stolen from http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
    mixin: function (receiver, supplier) {
        Object.keys(supplier).forEach(function(property) {
            if (typeof property === 'object') {

            } else {
                Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
            }
        });
        return receiver;
    },

    deepExtend: deepExtend,
    /**
    * @description
    * Returns a valid uuid
    *
    * @returns string
    */
    uuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    /**
    * @description
    * Converts milliseconds to seconds
    *
    * @param mils number
    * @returns number - amount of seconds
    */
    mils2Secs: function(mils) {
        return mils * 0.001;
    },

    /**
    * @description
    * Converts milliseconds to minutes
    *
    * @param mils number
    * @returns number - amount of minutes
    */
    mils2Mins: function(mils) {
        return mils * 0.001 / 60; // * 0.0667 (limit to 3 decimals?)
    },

    /**
    * @description
    * Converts seconds to milliseconds
    *
    * @param secs number
    * @returns number - amount of milliseconds
    */
    secs2Mils: function(secs) {
        return secs * 1000;
    },

    /**
    * @description
    * Converts minutes to milliseconds
    *
    * @param mins number
    * @returns number - amount of milliseconds
    */
    mins2Mils: function(mins) {
        return mins * 1000 * 60; // * 0.0667 (limit to 3 decimals?)
    },

    /**
    * @description
    * Clamps the input to the min or max arguments
    *
    * @param input number
    * @param min number
    * @param max number
    * @returns number - amount of milliseconds
    */
    clamp: function(input, min, max) {
        return Math.max(min, Math.min(input, max));
    }
};

/*!
 * Node.JS module "Deep Extend"
 * @description Recursive object extending.
 * @author Viacheslav Lotsmanov (unclechu) <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Extening object that entered in first argument.
 * Returns extended object or false if have no target object or incorrect type.
 * If you wish to clone object, simply use that:
 *  deepExtend({}, yourObj_1, [yourObj_N]) - first arg is new empty object
 */

 // Modified to exclude use of Buffer class.
function deepExtend (/*obj_1, [obj_2], [obj_N]*/) {
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }

    if (arguments.length < 2) return arguments[0];

    var target = arguments[0];

    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);

    var key, val, src, clone, tmpBuf;

    args.forEach(function (obj) {
        if (typeof obj !== 'object') return;

        for (key in obj) {
            if ( ! (key in obj)) continue;

            src = target[key];
            val = obj[key];

            if (val === target) continue;

            if (typeof val !== 'object' || val === null) {
                target[key] = val;
                continue;
            } else if (val instanceof Date) {
                target[key] = new Date(val.getTime());
                continue;
            } else if (val instanceof RegExp) {
                target[key] = new RegExp(val);
                continue;
            }

            if (typeof src !== 'object' || src === null) {
                clone = (Array.isArray(val)) ? [] : {};
                target[key] = deepExtend(clone, val);
                continue;
            }

            if (Array.isArray(val)) {
                clone = (Array.isArray(src)) ? src : [];
            } else {
                clone = (!Array.isArray(src)) ? src : {};
            }

            target[key] = deepExtend(clone, val);
        }
    });

    return target;
}

export default utils;
