<script>

    /**
     * Main / top Svelte component for this application
     *
     * @memberof Structure:Client
     * @function App
     * @locus Client
     *
     * @notes
     *      1. context: "Version" - app version info
     *      2. context: "commonText" - system wide text strings
     *      3. context: "icon<Name>" - imports svg file from library and insert into returned object
     *
     *      4. systemGlobals: "documents" - mongodb doc options / limits
     *      5. systemGlobals: "colors" - hex colour values
     *      6. systemGlobals: "colorArrays" - array of hex colour values for threshold colour change
     *      7. systemGlobals: "components" - css strings for components
     *      8. systemGlobals: "theme" - css strings for theming items
     *
     *      9. system stores: "$userLoggedIn" - holds Meteor.user() object for children components
     *     10. system stores: "$userExtras" - holds some extra fields like 'roles'  for children components
     *     11. system stores: "$showRoutes" - filtered list of routes based on user role
     *
     */


    //* set up system wide text context
    import { setContext, getContext } from 'svelte';

    import version from '/imports/both/version'
    setContext("Version", version);             //setup system wide version info

    import commonText from '/imports/client/setup/textCommon'
    setContext("commonText", commonText);       // setup system wide text strings (all languages)


    //* setup system wide Icons as a context
    import {mainIcons} from '/imports/client/setup/systemIcons'

    const keys =  Object.keys(mainIcons);
    for( const key of keys){
        setContext(key, mainIcons[key]);
    }


    //* set up user extra items
    import {buildNavLinks} from '/imports/functions/supportApplication/buildNavLinks'
    import {userPosition, userLoggedIn, userExtras} from '/imports/client/systemStores'

    //* load router -> will render main page & components based on nav-link selection
    import {Tracker} from 'meteor/tracker'
    //import Navbar from '../Navbar/Navbar.svelte'
    import Pages from 'svelte-router-spa/src/components/router.svelte'
    //import { activeRoute } from 'svelte-router-spa/src/store'
    import {sysConfig, sysDebug, showWidget, showRoutes, lastRoute} from '/imports/client/systemStores'
    import {allRoutes} from '../routes'

    //* local reactive variables
    //* Note that the spa-router does not reactively update; need to kick start a change on log state
    let routes = null;
    let routesLoggedOut = null;


    //* load client-side system parameters
    Meteor.call("clientSysConfig", function(err, res){
        if(err){ console.log("clientSysConfig error", err); }

        if(res){
            $sysConfig = res;
            $showWidget = !!(res.showWidgets);
            $sysDebug = res.showWidgets ? res.showWidgets : "";
        }
    })


    //* get user position from browser
    if(Meteor.settings.public.demo_mode){
        $userPosition = {
            lat: 45.4,
            lng: -75.7,

            accuracy: 1369,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        };
    }else{
        navigator.geolocation.getCurrentPosition(function (position) {
            $userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,

                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                speed: position.coords.speed,
            };
        });
    }



    //* respond to user login / logout / page refresh actions from parent Meteor instance
    Tracker.autorun(function(){
        let userMeteor = Meteor.user();
        $userLoggedIn = userMeteor;

        if(userMeteor){
            Meteor.call("loadExtraFields", function(err, res){
                if(err){ console.log("loadExtraFields error", err); }

                if(res){
                    let result = res ? res : null;
                    let navs = buildNavLinks(result, allRoutes);
                    routes = navs
                    $showRoutes = navs;
                    $userExtras = result;
                    routesLoggedOut = null;
                }
            });
        }else{
            let navs = buildNavLinks(null, allRoutes);
            routesLoggedOut = navs
            $showRoutes = navs;
            $userExtras = null;
            routes = null;
        }
    });

    //* keep track of path history
    /*
    $: {
        $lastRoute = [...$lastRoute, $activeRoute];

        if($lastRoute && $lastRoute.length > 4 ){
            $lastRoute = $lastRoute.slice(1);
        }
    }

     */

</script>





<!--<Navbar currentRoute="{$activeRoute}" />-->


{#if routes}
    <Pages {routes} />
{:else}
    <Pages routes="{routesLoggedOut}" />
{/if}
