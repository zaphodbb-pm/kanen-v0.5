<script>
    /**
     * Navbar condensed menu for shortcuts.
     *
     * @module NavCondensedMenu
     * @memberOf Navbar
     * @locus Client
     *
     * @param {Object} currentRoute - current active path name (link)
     * @param {Boolean} bottom - flag to shape menu for use at bottom
     */

    //* props
    export let currentRoute;
    export let bottom = false;

    //* component support files
    import {showRoutes} from '/imports/client/systemStores'

    //** build short cut links for top or bottom nav
    let shortcuts = [];

    $: shortcuts = $showRoutes.filter( (route) => route.isNavMobile );

</script>


<nav class="condensed-navbar" aria-label="Main Shortcut Section">
    <ul>
        {#each shortcuts as link }
            <li>
                <a href={link.name} class="icon-nav" title={link.label}>
                    <span class="{link.icon}"></span>
                    <span>{link.label}</span>
                </a>
            </li>
        {/each}
    </ul>
</nav>

