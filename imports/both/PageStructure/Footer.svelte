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
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {showWidget, lang} from '/imports/client/systemStores';
    import {footer, gdpr, pwa} from './Footer_text';

    let footerText = i18n(footer, "", $lang);
    let gdprNotice = i18n(gdpr, "", $lang);
    let pwaText = i18n(pwa, "", $lang);


    console.log("footer version", version);

    let loc;

    //** user stuff
    import {userPosition} from '/imports/client/systemStores'
    $: loc = $userPosition;


    import Messages from '/imports/Components/general/messages/messages.svelte'
    import GDPR from '/imports/Components/general/gdprNotice.svelte'
    import PWA from '/imports/both/AddToHomescreen/PWA-requester.svelte'

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


<!-- extra component based functionality -->
<Messages />
<GDPR text="{gdprNotice}" />
<PWA text="{pwaText}" />