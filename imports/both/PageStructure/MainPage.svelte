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

    <header class="page-header">
        <h1>Main Page Content h1 Heading</h1>
        <p class="sub-title">A sub-title of supporting text</p>
    </header>



    <!--
    <nav class="page-main-nav navbar is-warning" aria-label="Main Navigation Bar">
        <div class="navbar-left">
            <a href="#page-layout-top">
                <img src="/goldi3-logo.png" alt="Project Logo">
            </a>
        </div>

        <div class="navbar-center is-fixed-bottom">
            <a class="icon-nav" href="#page-layout-top">
                <svg class="icon"><use href="#icon-bookmark"/></svg>
                <span>Bookmark</span>
            </a>

            <a class="icon-nav" href="#page-layout-top">
                <svg class="icon"><use href="#icon-clock"/></svg>
                <span>Clock</span>
            </a>

            <a class="icon-nav" href="#page-layout-top">
                <svg class="icon"><use href="#icon-film"/></svg>
                <span>Film</span>
            </a>
        </div>

        <div class="navbar-right">
            <a class="icon-nav" href="https://github.com/zaphodbb-pm/goldilocks-css" rel="nofollow" aria-label="link to github">
                <svg class="icon"><use href="#icon-github"></use></svg>
            </a>

            <a class="button is-secondary has-hover" href="#page-layout-top">
                <span>Top</span>
            </a>
        </div>
    </nav>
    -->


    <SideNav {currentRoute} />

    <!--
    <nav class="page-sidenav" aria-label="Extended Side Bar Navigation">
        <div class="sidenavs">
            <a class="icon-nav-horz" href="#page-layout-top" title="Bookmark">
                <svg class="icon"><use href="#icon-home"/></svg>
                <span>Home</span>
            </a>

            <div class="sidenav-block">
                <input type="checkbox" id="chck1">
                <label for="chck1">Item 1</label>
                <nav>
                    <a href="#page-layout-top">Home</a>
                    <a href="#page-layout-top">About</a>
                    <a href="#page-layout-top">Contact</a>
                </nav>
            </div>

            <div class="sidenav-block">
                <input type="checkbox" id="chck2">
                <label for="chck2">Item 2</label>
                <nav>
                    <a class="icon-nav-horz" href="#page-layout-top" title="Bookmark">
                        <svg class="icon"><use href="#icon-bookmark"/></svg>
                        <span>Bookmark</span>
                    </a>

                    <a class="icon-nav-horz" href="#page-layout-top" title="Clock">
                        <svg class="icon"><use href="#icon-clock"/></svg>
                        <span>Clock</span>
                    </a>

                    <a class="icon-nav-horz" href="#page-layout-top" title="Film">
                        <svg class="icon"><use href="#icon-film"/></svg>
                        <span>Film</span>
                    </a>
                </nav>
            </div>
        </div>
    </nav>
    -->

    <section class="main-content" id="page-layout">
        <Route {currentRoute} {params} />
    </section>

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
