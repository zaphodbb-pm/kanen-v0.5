/**
 * Used only for testing purposes to wait for the DOM in the document under test (DUT) to be ready.
 *
 * @param _passThrough - placeholder only
 * @returns {Promise<unknown>}
 */


export function documentReady( _passThrough ) {

    if ( document.readyState === 'loading' ) {
        return new Promise( resolve => {
            document.addEventListener( 'DOMContentLoaded', () => resolve( _passThrough ) )
        } )
    }

    return Promise.resolve( _passThrough )
}