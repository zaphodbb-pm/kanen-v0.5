<script>
    /**
     * Side Navbar menu.
     *
     * @memberof Navbar
     * @function NavSideMenu
     * @locus Client
     * @augments Navbar
     *
     * @param {Object} currentRoute - current active path name (link)
     *
     */

    //* props
    export let currentRoute;
    export let theme = "light";

    //* get system wide icon definition
    import Icon from '/imports/components/elements/icon.svelte'
    import { getContext } from 'svelte';

    //* get route information and config
    import {showRoutes} from '/imports/client/systemStores'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    //** get event dispatcher
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();

    //* local reactive variables
    let groups = [];

    $: {
        let inRoutes = $showRoutes;
        let buildGroups = [];

        inRoutes.forEach( (route) => {
            if( typeof route.group === "number"){
                buildGroups[route.group] = buildGroups[route.group] ? buildGroups[route.group] : [];
                buildGroups[route.group].push(route);
            }
        });

        groups = buildGroups;


        console.log("groups", groups);
    }

    //** respond to a link click
    function navigate(event, path) {
        event.preventDefault()
        event.stopPropagation()
        dispatch("side-link-selected", true);
        navigateTo(path);
    }

</script>


<!--
{#each groups as group }

    {#if group}

        <div class="nav-side-menu mb-5">
            {#each group as links}

                <a class="navbar-item navbar-hover"
                   class:is-nav-active={currentRoute.name === links.name}
                   class:dark={theme === "dark"}
                   on:click={event => navigate(event, links.name)}
                   href={links.name}
                   data-test="navbar-side-menu">

                    <div class="d-flex align-items-center" title={links.label}>
                        <Icon icon={getContext(links.icon)} class="text-1dot5rem"/>
                        <div class="nav-page-text ml-2">{links.label}</div>
                    </div>
                </a>

            {/each}
        </div>
    {/if}
{/each}
-->


<nav class="page-sidenav" aria-label="Extended Side Bar Navigation">
    <div class="sidenavs">

        {#each groups as group }

            {#if group}

                <div class="sidenav-block">
                    <input type="checkbox" id="chck1">
                    <label for="chck1">Item 1</label>
                    <nav>

                        {#each group as links (links.name)}
                            <a class="navbar-item navbar-hover"
                               class:is-nav-active={currentRoute.name === links.name}
                               class:dark={theme === "dark"}
                               on:click={event => navigate(event, links.name)}
                               href={links.name}
                               data-test="navbar-side-menu">

                                <div class="d-flex align-items-center" title={links.label}>
                                    <Icon icon={getContext(links.icon)} class="text-1dot5rem"/>
                                    <div class="nav-page-text ml-2">{links.label}</div>
                                </div>
                            </a>
                        {/each}
                    </nav>
                </div>





                <!--
                <div class="nav-side-menu mb-5">
                    {#each group as links}

                        <a class="navbar-item navbar-hover"
                           class:is-nav-active={currentRoute.name === links.name}
                           class:dark={theme === "dark"}
                           on:click={event => navigate(event, links.name)}
                           href={links.name}
                           data-test="navbar-side-menu">

                            <div class="d-flex align-items-center" title={links.label}>
                                <Icon icon={getContext(links.icon)} class="text-1dot5rem"/>
                                <div class="nav-page-text ml-2">{links.label}</div>
                            </div>
                        </a>

                    {/each}
                </div>
                -->
            {/if}
        {/each}



        <!--

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
        -->
    </div>
</nav>




<style>
/*
    .dark {
        color: whitesmoke;
    }

    .is-nav-active,
    .navbar-hover:hover{
        color: #CC5C00 !important;
        background-color: #EEE !important;
    }

    .is-nav-active.dark,
    .navbar-hover.dark:hover{
        color: #FF7F00 !important;
        background-color: #222 !important;
    }
*/
</style>
