<script>

    import {lastRoute} from "../../client/systemStores.mjs";

    /**
     * MainPage creates the page PageStructure
     *
     * @memberof Structure:Client
     * @function MainPage
     * @locus Client
     *
     * @notes
     *      1. Imports an object that holds the page route information
     *      2. When a new url is detected, the page will be rendered into the main page area
     *
     */

    //* props
    export let currentRoute;
    export let params = {};

    //* get components
    import Navbar from '../Navbar/Navbar.svelte'
    import SideNav from '../Navbar/NavSideMenu.svelte'
    import Footer from './Footer.svelte'
    import Route from 'svelte-router-spa/src/components/route.svelte'

    import { activeRoute } from 'svelte-router-spa/src/store'

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

    <!--

    <header class="page-header">
        <h1>Main Page Content h1 Heading</h1>
        <p class="sub-title">A sub-title of supporting text</p>
    </header>



    <section class="main-content" id="page-layout">
        <Route {currentRoute} {params} />
    </section>

    -->

    <Footer />
</div>







<!--
<Navbar currentRoute="{$activeRoute}" />

<div class="page-master-layout has-background-white">
    <div class="columns">

        <div class="column mr-4 is-narrow is-hidden-touch is-hidden-desktop-only" data-test="main-page-sidenav">
            <SideNav {currentRoute} />
        </div>

        <div class="column">
            <section id="page-layout">
                <Route {currentRoute} {params} />
            </section>

            <Footer />
        </div>

    </div>
</div>
-->
