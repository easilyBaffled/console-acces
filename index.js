module.exports = function ( onConsole = true, label = 'l', target = window ) {
    const isBrowser = typeof target !== 'undefined';
    if ( !isBrowser ) {
        console.log( `Sorry it's not ready for Node yet. This will just be console.log for you.` );
        return console.log;
    }

    function access ( ...args ) {
        let str = '';
        const objectList = args.reduce( ( objectList, arg, index ) => {
            index = index + ( target._lastLabel || 0 );
            str += label + index + ': %o ';
            target[ label + index ] = arg;
            objectList.push( arg );
            return objectList;
        }, [] );
        target._lastLabel = ( target._lastLabel || 0 ) + args.length;

        console.log( str, ...objectList );
    }

    if ( onConsole ) console[ 'access' ] = access;
    else return access;
};