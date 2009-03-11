/**
 * March 11, 2009
 * @author Alexander Ulizko alexander@ulizko.com
 * @class timer
 *
 * Timer which will repeat till counter is expired or condition (any function you passed in) return true;
 * You can redefine its name at the line 22.
 * Usage:
 *      timer.setCondition(function () {
 *          // check if variable are ready        
 *          if (typeof window.coockoo !== 'undefined') {
 *              return true;
 *          } else {
 *              return false;
 *          }
 *      });
 *
 *      timer.setFrequency(25);
 *      timer.setCounter(10); // Счетчик
 *       timer.start();
 */
(function () {
    window.timer = function () {
        var timer = null, counter = 200, frequency = 10, condition = function () { return false; };

        return {
            /**
             * Set counter, or define, how many times should timer being invocated
             * @method setCounter
             * @param c {Number} new counter value
             */
            setCounter : function (c) {
                counter = c;
            },
            /**
             * Set frequency - how often (in millisecs) should timer being invocated
             * @method setFrequency
             * @param f {Number} frequency in milliseconds
             */
            setFrequency : function (f) {
                frequency = f;
            },
            /**
             * Set function which timer should call every iteration
             * This function must return true or false. If this function return true, timer should stop.
             * @method setCondition
             * @param c {Function} function
             */
            setCondition : function (c) {
                condition = c;
            },
            /** 
             * Start timer
             * @method start
             */
            start : function () {
                var self = this;
                timer = setInterval(function () {
                    self.checkCounterLimit();
                }, frequency);
            },
            /**
             * Check condition or is counter positive.
             * @method checkCounterLimit
             * @private
             */
            checkCounterLimit : function () {
                if (condition() || (counter == 0)) { this.stop(); }
                else {
                    counter--;
                }
            },
            /**
             * Manually stop timer
             * @method stop
             */
            stop : function () {
                clearInterval(timer);
                timer = null;
            }
        };    
    }();
})();
