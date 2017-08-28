# console-access
[![npm version](https://badge.fury.io/js/console-access.svg)](https://badge.fury.io/js/console-access)

      npm install console-access


Example 

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
