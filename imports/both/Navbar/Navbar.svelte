<script>/**
 * Main Navbar component fixed at top of page.
 *
 * @name Navbar
 * @module
 * @memberOf App
 * @locus Client
 *
 */

    //* props
    export let currentRoute;

    //* support files
    import {layout} from '/imports/both/systemGlobals'
    import {createEventDispatcher, setContext} from 'svelte'
    const dispatch = createEventDispatcher();

    //* get the user language preference from store
    import {i18n} from '/imports/functions/utilities/i18n'
    import {lang} from '/imports/client/systemStores'


    //* get page text information and set contexts for children components
    import {navbar, gdpr, pwa} from './Navbar_text'
    let navText = i18n(navbar, "", $lang);
    let gdprNotice = i18n(gdpr, "", $lang);
    let pwaText = i18n(pwa, "", $lang);

    //setContext("navbar", i18n(navbar, "", $lang) );
    //setContext("gdprNotice", i18n(gdpr, "", $lang) );
    setContext("pwaText", i18n(pwa, "", $lang) );

    //* components
    import NavShortcuts from "./NavCondensedMenu.svelte";
    import SlideNavMenu from "./SlideNavMenu.svelte";

    //import Messages from '/imports/components/general/messages/messages.svelte'
    //import GDPR from '/imports/components/general/gdprNotice.svelte'
    //import PWA from '/imports/both/AddToHomescreen/PWA-requester.svelte'

    import Notifications from '/imports/components/elements/notifications.svelte'
    import UserProfile from '/imports/components/elements/userProfile.svelte'
    import UserCredit from '/imports/components/elements/userCredit.svelte'

    //** simple nav configuration options for aside navs
    let theme = "light";        // "light" or "dark" background
    let side = "left";          // "left" or "right" entry
    let open = false;           // hamburger state true = "open"; false = "closed"

</script>



<div class="page-main-nav is-fixed">
    <nav class="navbar is-primary has-sidebar" aria-label="Main Site Navigation Bar">
        <div class="navbar-left">

            <div class="main-slide-bar">
                <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu-main">

                <label for="openSidebarMenu-main" class="sidebarIconToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="sr-only">Slide nav toggle</span>
                </label>

                <div class="sidebarMenu">
                    <SlideNavMenu {currentRoute}></SlideNavMenu>
                </div>
            </div>


            <a href="/home">
                <img src="logo-svg.svg" height="128" width="128" alt="Project Logo">
            </a>
        </div>


        {#if layout.SHORTCUTS}
            <div class="navbar-center show-bottom-nav">
                <NavShortcuts {currentRoute}> </NavShortcuts>
            </div>
        {/if}

        <div class="navbar-right">
            <nav aria-label="Secondary Actions">
                <ul>
                    <li><UserCredit text="{navText.userCredit}"/></li>

                    <li><Notifications text="{navText.notifications}" /></li>

                    <li><UserProfile text="{navText.userProfile}" /></li>
                </ul>
            </nav>
        </div>
    </nav>
</div>





<!--
<AsideNav bind:open {theme} {side}>
    <SideNav {currentRoute} {theme} on:side-link-selected={() => open = false} />
</AsideNav>


<aside>
    <Messages />
</aside>


<aside>
    <GDPR text="{gdprNotice}" />
</aside>


<PWA />
-->
