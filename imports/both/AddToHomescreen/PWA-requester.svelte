<script>

    /**
     * Progressive Web App requester that typically resides in the footer component.
     *
     * @module PWA-requester
     * @memberOf Footer
     * @locus Client
     *
     * @param {Object} text - modal text (language adjusted) from parent
     *
     * @see based on work by {@link https://github.com/docluv/add-to-homescreen|Chris Love}
     */

    //* text strings are the only properties required
    export let text = {};


    //* load support functions
    import {defaultSession, athDefaults} from "./func-athDefaults";
    import {getPlatform} from "./func-getPlatform";
    import {checkPlatform} from "./func-checkPlatform";
    import {nextPrime} from "./func-nextPrime";
    import {athMainClass} from "./func-class_athMain";


    //* prepare common variables
    let appID = athDefaults.appID;
    let nativePrompt = false;
    let platform = {};
    let _beforeInstallPrompt;
    let openModal = false;
    let instructions = null;
    let optOut = false;


    //* setup browser platform detection object
    platform = checkPlatform(window.navigator.userAgent);


    //* load stored session information
    let session = localStorage.getItem( appID );
    session = session ? JSON.parse( session ) : defaultSession;


    //* initialize options for add-to-home (ath) class
    let initOpts = {
        onShow: function () {
            ath.doLog( "ath: showing" );
            openModal = true;
        },
        onInit: function () {
            ath.doLog( "ath: initializing", ath);

            if ( session && session.added ) {
                ath.doLog("ath: session exists", session);
            }
        },
        onAdd: function () {
            ath.doLog( "ath: adding" );
        },
        onInstall: function () {
            ath.doLog( "ath: installing" );
        },
        onCancel: function () {
            ath.doLog( "ath: cancelling" );
            openModal = false;
            optOut = true;
            ath.optOut();
            ath.clearSession();
        },

        //* for dev work only
        //displayPace: 0,
        //debug: "ipad",
        //logging: true,
        //lifespan: 0
    };


    //* create add-to-home class with context data
    let ath = new athMainClass( initOpts, platform, session);



    //**** for dev work only
    //ath.removeSession("add-to-home-screen");
    //session.added = false;
    //session.optedout = false;
    //ath.updateSession();
    //console.log("update session", session);





    //* event handlers for native PWA session
    if ( "onbeforeinstallprompt" in window ) {
        window.addEventListener( "beforeinstallprompt", function(evt){
            evt.preventDefault();
            ath.doLog( "ath: capturing the native A2HS prompt");

            if(optOut){
                _beforeInstallPrompt = undefined;
            }else{
                _beforeInstallPrompt = evt;
                _delayedShow(ath);
            }
        } );

        nativePrompt = true;
    }

    if ( "onappinstalled" in window ) {
        window.addEventListener( "appinstalled", function ( ) {
            ath.doLog( "a2hs", "installed" );
            session.added = true;
            ath.updateSession();

            if ( ath.options.onInstall ) {
                ath.options.onInstall.call( this );
            }
        } );
    }


    //* button event handlers - mutates local variables
    function btnNotNow(){
        if ( ath.options.onCancel ) {
            ath.options.onCancel();
        }
        openModal = false;
    }

    function btnInstall(){
        if ( ath.options.onInstall ) {
            ath.options.onInstall();
        }

        let checkPlatform = getPlatform(platform, ath.options.debug);
        let isNative = checkPlatform === "native" || ath.options.debug === "native";

        if (  _beforeInstallPrompt && isNative ) {
            openModal = false;
            triggerNativePrompt();
        } else {
            if ( ath.autoHideTimer ) {
                clearTimeout( ath.autoHideTimer );
            }

            let promptTarget = Object.assign({}, ath.options.customPrompt, ath.options.prompt[checkPlatform]);
            instructions = promptTarget.imgs;
        }
    }


    //* service worker check
    if ( "serviceWorker" in navigator ) {
        let manifestEle = document.querySelector( "[rel='manifest']" );
        if ( !manifestEle ) {
            ath.doLog( "pwa: no manifest file" );
            platform.isCompatible = false;
        }

        navigator.serviceWorker.getRegistration().then( afterSWCheck );
    } else {
        afterSWCheck( {} );
    }


    //* construct display routines
    function _delayedShow() {
        setTimeout( _show(), ath.options.startDelay * 1000 + 500 );}

    function _show(){
        if ( ath.canPrompt() ) {

            if ( _beforeInstallPrompt && !ath.options.mustShowCustomPrompt ) {
                triggerNativePrompt();
            } else {
                if ( ath.options.lifespan && ath.options.lifespan > 0 ) {
                    ath.autoHideTimer = setTimeout( btnNotNow, ath.options.lifespan * 1000 );
                }
            }

            //** fire the custom onShow event
            if ( ath.options.onShow ) {
                ath.options.onShow.call( this );
            }

            //** increment the display count
            session.lastDisplayTime = Date.now();
            session.displayCount++;

            if ( ath.options.displayNextPrime ) {
                session.nextSession = nextPrime( session.sessions );
            }

            ath.updateSession();
        }

        return true;
    }


    //* displays native A2HS prompt & stores results
    function triggerNativePrompt() {
        return _beforeInstallPrompt.prompt()
            .then( function ( ) {
                return _beforeInstallPrompt.userChoice;     // Wait for the user to respond to the prompt
            } )
            .then( function ( choiceResult ) {
                session.added = ( choiceResult.outcome === "accepted" );

                if ( session.added ) {
                    ath.doLog( "ath: User accepted the A2HS prompt" );

                    if ( ath.options.onAdd ) {
                        ath.options.onAdd();
                    }

                } else {
                    if ( ath.options.onCancel ) {
                        ath.options.onCancel();
                    }

                    session.optedout = true;
                    ath.doLog( "ath: User dismissed the A2HS prompt" );
                }

                ath.updateSession();
                _beforeInstallPrompt = null;
            } )
            .catch( function ( err ) {
                ath.doLog( err.message );

                if ( err.message.indexOf( "user gesture" ) > -1 ) {
                    ath.options.mustShowCustomPrompt = true;
                    _delayedShow(ath);
                } else if ( err.message.indexOf( "ath: The app is already installed" ) > -1 ) {

                    console.log( err.message );
                    session.added = true;
                    ath.updateSession();

                } else {
                    console.log( err );
                    return err;
                }
            } );
    }

    //* if service worker exists, update add-to-home class and control modal display
    function afterSWCheck( sw ) {
        // override defaults that are dependent on each other
        if ( ath.options && ath.options.debug && ( typeof ath.options.logging === "undefined" ) ) {
            ath.options.logging = true;
        }

        ath.sw = sw;

        if ( !ath.sw ) {
            ath.doLog( "pwa: no service worker" );
            platform.isCompatible = false;
        }

        session.sessions += 1;
        ath.updateSession();

        // normalize some options
        ath.options.mandatory = ath.options.mandatory && ( 'standalone' in window.navigator ||
            ath.options.debug );

        //this is forcing the user to add to homescreen before anything can be done
        //the ideal scenario for this would be an enterprise business application
        //could also be a part of an onboarding workflow for a SAAS
        ath.options.modal = ath.options.modal || ath.options.mandatory;

        if ( ath.options.mandatory ) {
            ath.options.startDelay = -0.5; // make the popup hasty
        }

        // setup the debug environment
        if ( ath.options.debug ) {
            platform.isCompatible = true;
        }

        if ( ath.options.onInit ) {
            ath.options.onInit.call( ath );
        }

        if ( ath.options.autostart ) {
            ath.doLog( "ath: autostart displaying callout" );
            ath.show();

        } else if ( !nativePrompt ) {
            ath.show();
        }
    }
</script>



<div id="modal_pwa" class="modal-overlay {openModal ? 'show-modal' : 'hide-modal'}">
    <div class="modal">
        <aside class="modal-card">

            <header class="is-primary-light">
                <h2>{text.title}</h2>
                <img class="pwa-image" src="pwa/pwa-logo.svg" alt="PWA logo">
            </header>

            <div>

                <div class="level">
                    <p style="margin: 0;">{text.description}</p>

                    <button type="button" class="is-primary has-hover" on:click={btnInstall}>{text.install}</button>
                    <button type="button" class="is-secondary-outlined has-hover" on:click={btnNotNow}>{text.notNow}</button>
                </div>

                {#if instructions}
                    <p class="space-vert">{text.instructions}</p>

                    <div class="row has-3x-minwidth">
                        {#each instructions || [] as instruction}
                            <div class="col">
                                <p>{instruction.alt}</p>
                                <img src="{instruction.src}" alt="{instruction.alt}" style="height: auto;">
                            </div>
                        {/each}
                    </div>
                {/if}

            </div>

        </aside>
    </div>
</div>



<style>

    .show-modal {
        visibility: visible;
        opacity: 1;
        height:auto;
        z-index: 1000;
    }

    .hide-modal {
        visibility: hidden;
        opacity: 0;
        height: 0;
        z-index: unset;
    }

    .pwa-image {
        height: auto;
        width: 4rem;
    }

</style>