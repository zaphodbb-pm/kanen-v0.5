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
    import {showRoutes} from '/imports/client/systemStores';
    import {buildNavGroups} from "../../Functions/application/buildNavGroups";


    //* local reactive variables
    let groups = [];

    $: groups = buildNavGroups($showRoutes);

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
                                   href="{links.name + (links.query || '')}"
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