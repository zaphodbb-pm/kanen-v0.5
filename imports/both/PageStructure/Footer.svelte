<script>

    /**
     * Footer component for MainPage
     *
     * @name Footer
     * @module
     * @memberOf App
     * @locus Client
     *
     */

    //** get system wide info
    import { getContext } from 'svelte';
    let version = getContext("Version");

    //** get the user language preference from store
    import {showWidget, lang} from '/imports/client/systemStores'
    let loc;

    //** user stuff
    import {userPosition} from '/imports/client/systemStores'
    $: loc = $userPosition;

</script>



<footer class="page-footer">
    <div>
        <p>{version.APP_NAME} © {version.COPYRIGHT}</p>
        {#if $showWidget}
            <p class="space-vert">
                <span>lat: {loc.lat}</span>
                <span class="space-horz">lng: {loc.lng}</span>
            </p>
        {/if}
    </div>

    <p>page-footer</p>

    <p>Version: {version.VERSION} @ {version.LAST_UPDATE}</p>
</footer>