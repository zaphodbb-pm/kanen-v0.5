<script>
    /**
     * Sliding side Navbar menu shows only at mobile break point.
     *
     * @module SlideNavMenu
     * @memberOf Navbar
     * @locus Client
     *
     * @param {Object} currentRoute - current active path name (link)
     *
     */

    //* props
    export let currentRoute;
    export let theme = "light";

    //* get route information and config
    import {showRoutes} from '/imports/client/systemStores'

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
</script>

<div class="sidebarMenuInner" role="region" aria-label="Sliding Side Bar Navigation">

    {#each groups as group }
        {#if group}

            <div class="sidenavs">
                <nav>
                    <ul>
                        {#each group as links (links.name)}
                            <li>
                                <a class="icon-nav-horz {currentRoute === links.name ? 'is-active' : ''}"
                                   href="{links.name + (links.query || '')}"
                                   title="{links.label}">

                                    <span class="{links.icon}"></span>
                                    <span>{links.label}</span>
                                </a>
                            </li>
                        {/each}
                    </ul>
                </nav>
            </div>

        {/if}
    {/each}

</div>
