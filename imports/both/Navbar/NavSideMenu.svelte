<script>
    /**
     * Side Navbar menu.
     *
     * @module NavSideMenu
     * @memberOf Navbar
     * @locus Client
     *
     * @param {Object} currentRoute - current active path name (link)
     *
     */

    //* props
    export let currentRoute = "";

    //* get route information and config
    import {showRoutes} from '/imports/client/systemStores'

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
</script>




<nav class="page-sidenav" aria-label="Extended Side Bar Navigation">
    <div class="sidenavs">
        {#each groups as group }
            {#if group}

                <nav>
                    <ul>
                        {#each group as links (links.name)}
                            <li>
                                <a class="icon-nav-horz {currentRoute === links.name ? 'is-active' : ''}"
                                   href="{links.name + (links.params || '')}"
                                   title="{links.label}">

                                    <span class="{links.icon}"></span>
                                    <span>{links.label}</span>
                                </a>
                            </li>
                        {/each}
                    </ul>
                </nav>

            {/if}
        {/each}
    </div>
</nav>