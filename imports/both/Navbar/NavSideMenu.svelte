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
    }

    //** respond to a link click
    function navigate(event, path) {
        event.preventDefault()
        event.stopPropagation()
        dispatch("side-link-selected", true);
        navigateTo(path);
    }

</script>


<nav class="page-sidenav" aria-label="Extended Side Bar Navigation">
    <div class="sidenavs">
        {#each groups as group }
            {#if group}
                <div class="space-vert">
                    {#each group as links (links.name)}
                        <a class="icon-nav-horz" href="{links.name}" title="{links.label}">
                            <svg class="icon"><use href="#{links.icon}"/></svg>
                            <span>{links.label}</span>
                        </a>
                    {/each}
                </div>
            {/if}
        {/each}
    </div>
</nav>
