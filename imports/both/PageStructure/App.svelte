<script>

    /**
     * Main / top Svelte component for this application
     *
     * @name App
     * @module
     * @memberOf ClientMain
     * @locus Client
     *
     * @notes
     *      1. context: "Version" - app version info
     *      2. context: "commonText" - system wide text strings
     *      3. systemGlobals: "documents" - mongodb doc options / limits
     *
     *      4. system stores: "$userLoggedIn" - holds Meteor.user() object for children Components
     *      5. system stores: "$userExtras" - holds some extra fields like 'roles'  for children Components
     *      6. system stores: "$showRoutes" - filtered list of routes based on user role
     *
     */


    //* set up system wide text context and get system wide variables
    import { setContext } from 'svelte';

    import version from '/imports/both/version';
    setContext("Version", version);             //setup system wide version info

    import commonText from '/imports/client/text_common';
    setContext("commonText", commonText);       // setup system-wide text strings (all languages)

    import {sysConfig, sysDebug, showWidget, showRoutes} from '/imports/client/systemStores';
    import {allRoutes} from '../routes';


    //* set up user extra items
    import {buildNavLinks} from '/imports/Functions/supportApplication/buildNavLinks';
    import {userLoggedIn, userExtras} from '/imports/client/systemStores';



    //* load client-side system parameters
    Meteor.call("clientSysConfig", function(err, res){
        if(err){ console.log("clientSysConfig error", err); }

        if(res){
            $sysConfig = res;
            $showWidget = !!(res.showWidgets);
            $sysDebug = res.showWidgets ? res.showWidgets : "";
        }
    })


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


    //* load the path router -> will render main page & Components based on nav-link selection
    import { path, query, pattern, click } from 'svelte-pathfinder';

    //** local reactive variables
    let currentPath = "";
    let currentPage = "";
    let params = {specials: "extra values"};
    let pagePaths = {};

    //** prepare page lookup object for svelte component insertion
    allRoutes.forEach( route => {
        pagePaths[route.name] = route;
    });

    //** reactively respond to change in nav path
    $: {
        currentPath = $path.toString();
        currentPage = pagePaths[currentPath]?.component ?? pagePaths["/home"].component;
    }


    //* build out static Components
    import Navbar from '../Navbar/Navbar.svelte';
    import SideNav from '../Navbar/NavSideMenu.svelte';
    import Footer from './Footer.svelte';

</script>



<!-- intercept 'a' tag default operation and use 'href' to load appropriate main page component -->
<svelte:window on:click={click} />


<!-- full page scaffolding with insertable content area -->
<div class="page-wrapper has-slidebar" id="page-layout-top">

    <Navbar currentRoute="{currentPath}" />

    <SideNav currentRoute="{currentPath}" />

    <!-- load <header> and <main> page content here -->
    {#if $pattern(currentPath) && currentPage}
        <svelte:component this="{currentPage}" currentRoute="{currentPath}" {params} query="{$query.params}"/>
    {/if}

    <Footer />

</div>
