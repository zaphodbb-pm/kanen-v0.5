<script>

    /**
     * Main / top Svelte component for this application
     *
     * @name App
     * @module
     * @memberOf Client
     * @locus Client
     *
     * @notes
     *      1. context: "Version" - app version info
     *      2. context: "commonText" - system wide text strings
     *      3. systemGlobals: "documents" - mongodb doc options / limits
     *
     *      4. system stores: "$userLoggedIn" - holds Meteor.user() object for children components
     *      5. system stores: "$userExtras" - holds some extra fields like 'roles'  for children components
     *      6. system stores: "$showRoutes" - filtered list of routes based on user role
     *
     */


    //* set up system wide text context and get system wide variables
    import { setContext } from 'svelte';

    import version from '/imports/both/version';
    setContext("Version", version);             //setup system wide version info

    import commonText from '/imports/client/setup/textCommon';
    setContext("commonText", commonText);       // setup system wide text strings (all languages)

    import {sysConfig, sysDebug, showWidget, showRoutes} from '/imports/client/systemStores';
    import {allRoutes} from '../routes';


    //* set up user extra items
    import {buildNavLinks} from '/imports/functions/supportApplication/buildNavLinks';
    import {userPosition, userLoggedIn, userExtras} from '/imports/client/systemStores';


    //* local reactive variables
    let pagePaths = {};

    //** prepare page lookup object for svelte component insertion
    allRoutes.forEach( route => {
        pagePaths[route.name] = route;
    });


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


    //* load the path router -> will render main page & components based on nav-link selection
    import { path, query } from 'svelte-pathfinder';

    let currentPath = $path.toString();
    let currentPage = pagePaths[currentPath].component;
    let params = {specials: "extra values"};


    //* build out static components
    import Navbar from '../Navbar/Navbar.svelte';
    import SideNav from '../Navbar/NavSideMenu.svelte';
    import Footer from './Footer.svelte';



    //* respond to user login / logout / page refresh actions from parent Meteor instance
    $m: {
        let userMeteor = Meteor.user();
        $userLoggedIn = userMeteor;

        if(userMeteor){
            Meteor.call("loadExtraFields", function(err, res){
                if(err){ console.log("loadExtraFields error", err); }

                if(res){
                    let result = res ? res : null;
                    let navs = buildNavLinks(result, allRoutes);
                    $userExtras = result;
                    $showRoutes = navs;
                }
            });
        }else{
            let navs = buildNavLinks(null, allRoutes);
            $userExtras = null;
            $showRoutes = navs;
        }
    }

</script>



<div class="page-wrapper has-slidebar" id="page-layout-top">

    <Navbar currentRoute="{currentPath}" />

    <SideNav currentRoute="{currentPath}" />

    <!-- load <header> and <main> page content here -->
    {#if currentPage}
        <svelte:component this="{currentPage}" currentRoute="{currentPath}" {params} query="{$query.params}"/>
    {/if}

    <Footer />

</div>
