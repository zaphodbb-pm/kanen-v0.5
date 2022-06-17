<script>

    /**
     * MainPage creates the page PageStructure
     *
     * @memberof Structure:Client
     * @function MainPage
     * @locus Client
     *
     * @param {Object} currentRoute
     *
     * @notes
     *      1. Imports an object that holds the page route information
     *      2. When a new url is detected, the page will be rendered into the main page area
     *
     */

    //* props
    export let currentRoute;

    //* get components
    import Navbar from '../Navbar/Navbar.svelte';
    import SideNav from '../Navbar/NavSideMenu.svelte';
    import Footer from './Footer.svelte';
    import Route from 'svelte-router-spa/src/components/route.svelte';

    //* get support files
    import { activeRoute } from 'svelte-router-spa/src/store';
    import {lastRoute} from "../../client/systemStores.mjs";

    //* set any required parameters for Pages
    const params = {userLoggedIn: false };

    //* keep track of path history
    $: {
        $lastRoute = [...$lastRoute, $activeRoute];

        if($lastRoute && $lastRoute.length > 4 ){
            $lastRoute = $lastRoute.slice(1);
        }
    }

</script>



<div class="page-wrapper" id="page-layout-top">

    <Navbar currentRoute="{$activeRoute}" />

    <SideNav {currentRoute} />

    <Route {currentRoute} {params} />

    <Footer />

</div>
