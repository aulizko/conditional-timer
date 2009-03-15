/**
 * March 11, 2009
 * @author Alexander Ulizko alexander@ulizko.com
 * @class timer
 *
 * Timer which will repeat till counter is expired or condition (any function you passed in) return true;
 * You can redefine its name at the line 22.
 * Usage:
 */
(function () {
    var DEFAULTS = {
        COUNTER : 200,
        FREQUENCY : 10,
        CONDITION : function () { return false; },
        CALLBACK : function () {}
    };

    var __timer = function (conf) {
        this.timer = null;
        this.counter = conf.counter || DEFAULTS.COUNTER;
        this.frequency = conf.frequency || DEFAULTS.FREQUENCY;
        this.condition = conf.condition || DEFAULTS.CONDITION;
        this.onSuccessCallback = conf.onSuccess || DEFAULTS.CALLBACK;
        this.onErrorCallback = conf.onError || DEFAULTS.CALLBACK;
        this.onStepCallback = conf.onStep || DEFAULTS.CALLBACK;
    };

    var T = window.Timer = function (conf) {
        this.timer = new __timer(conf);
        this.timer.start();
    };

    __timer.prototype = {
        /** 
         * Start timer
         * @method start
         */
        start : function () {
            this.stop();
            var self = this;
            this.timer = setInterval(function () {
                self.checkCounterLimit();
            }, this.frequency);
        },
        /**
         * Check condition or is counter positive.
         * @method checkCounterLimit
         * @private
         */
        checkCounterLimit : function () {
            if (this.condition()) { // success
                this.stop();
                this.onSuccessCallback();
            } else {
                if (this.counter == 0) { // error
                    this.stop();
                    this.onErrorCallback();
                } else {
                    this.onStepCallback();
                    this.counter --; // go on
                }
            }
        },
        /**
         * Manually stop timer
         * @method stop
         */
        stop : function () {
            clearInterval(this.timer);
            this.timer = null;
        },

        /**
         * Set callback which should being executed on success (if condition return true)
         * @method onSucess
         * @param fn {Function} function which should being executed
         * @param data {Mixed} data which should be passed into callback funciton
         * @param context {Object} context of the function
         */
        onSuccess : function (fn, data, context) {
            context = (context) ? context : window;
            this.onSuccessCallback = function () {
                fn.call(context, data);
            };
        },

        /**
         * Set callback which should being executed on error (if counter rich end and condition stll return false)
         * @method onError
         * @param fn {Funciton} function which shuld being executed
         * @param data {Mixed} data which should being passed into callback function
         * @param context {Object} context of the function
         */
        onError : function (fn, data, context) {
            context = (context) ? context : window;
            this.onErrorCallback = function () {
                fn.call(context, data);
            };
        },
        /**
         * Set callback which should being executed every iteration
         * @method onStep
         * @param fn {Funciton} function which shuld being executed
         * @param data {Mixed} data which should being passed into callback function
         * @param context {Object} context of the function
         */
        onStep : function (fn, data, context) {
            context = (context) ? context : window;
            this.onStepCallback = function () {
                fn.call(context, data);
            };
        }
    };    
})();
