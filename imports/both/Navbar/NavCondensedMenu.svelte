<script>
    /**
     * Navbar condensed menu for shortcuts.
     *
     * @memberof Navbar
     * @function NavTopMenu
     * @locus Client
     * @augments Navbar
     *
     * @param {Object} currentRoute - current active path name (link)
     * @param {Boolean} bottom - flag to shape menu for use at bottom
     */

    //* props
    export let currentRoute;
    export let bottom = false;

    //* component support files
    import { getContext } from 'svelte';
    import Icon from '/imports/components/elements/icon/icon.svelte'
    import {showRoutes} from '/imports/client/systemStores'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    //** build short cut links for top or bottom nav
    let shortcuts = [];

    $: shortcuts = $showRoutes.filter( (route) => route.isNavMobile );

    //* event handler
    function navigate(event, path) {
        event.preventDefault()
        event.stopPropagation()
        navigateTo(path);
    }

</script>


{#each shortcuts as link }

    <a class="navbar-item navbar-hover"
       class:is-nav-active={currentRoute.name === link.name}
       style="height: 100%; align-items: flex-end"
       on:click={event => navigate(event, link.name)}
       href={link.name}
       title={link.label}
       data-test="navbar-condensed">

        <div class="has-text-centered">
            <Icon icon={getContext(link.icon_old)} class="text-1dot5rem"/>

            {#if !bottom}
                <div class="text-0dot8rem nav-page-text has-text-centered"
                     style="line-height: 1.2;"
                     data-testid="navbar-condensed-labels">

                    {link.label}
                </div>
            {/if}
        </div>
    </a>

{/each}



<style>

    .is-nav-active .nav-page-text,
    .navbar-hover:hover .nav-page-text {
        color: #CC5C00 !important;
        border-top: 2px solid #CC5C00;
    }

    .is-nav-active,
    .navbar-hover:hover{
        color: #CC5C00 !important;
        background-color: #eee !important;
    }

</style>
