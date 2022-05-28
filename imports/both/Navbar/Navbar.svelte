<script>
    /**
     * Main Navbar component fixed at top of page.
     *
     * @memberof Navbar
     * @name Navbar
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
    import Navbar_Brand from './Navbar_Brand.svelte'
    import Navbar_Links from './Navbar_Links.svelte'
    import NavShortcuts from './NavCondensedMenu.svelte'
    import SideNav from './NavSideMenu.svelte'
    import AsideNav from './asideNavWrapper.svelte'
    import Messages from '/imports/components/general/messages/messages.svelte'
    import GDPR from '/imports/components/general/gdprNotice.svelte'
    import PWA from '/imports/both/AddToHomescreen/PWA-requester.svelte'

    import Notifications from '/imports/components/elements/notifications.svelte'
    import UserProfile from '/imports/components/elements/userProfile.svelte'
    import UserCredit from '/imports/components/elements/userCredit.svelte'

    //** simple nav configuration options for aside navs
    let theme = "light";        // "light" or "dark" background
    let side = "left";          // "left" or "right" entry
    let open = false;           // hamburger state true = "open"; false = "closed"

</script>



<div id="page-main-nav" class="page-main-nav">
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
                    <nav class="sidebarMenuInner" aria-label="Sliding Side Bar Navigation">
                        <div class="sidenav-block">
                            <input type="checkbox" id="slide-get-started">
                            <label for="slide-get-started">Getting Started</label>
                            <nav>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/get-started/why-yacf.html">Why YACF</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/get-started/key-drivers.html">Key Drivers</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/get-started/philosophy.html">Philosophy</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/get-started/comparisons.html">Comparisons</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/get-started/installations.html">Installation</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/get-started/customization.html">Customization</a>
                            </nav>
                        </div>

                        <div class="sidenav-block">
                            <input type="checkbox" id="slide-core-layout" checked="">
                            <label for="slide-core-layout">Core Layout</label>
                            <nav>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-layout/box.html">Box</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-layout/grid.html">Grid</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-layout/level.html">Level</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-layout/page.html">Page</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-layout/spacing.html">Spacing</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-layout/stack.html">Stack</a>
                            </nav>
                        </div>

                        <div class="sidenav-block">
                            <input type="checkbox" id="slide-core-elements">
                            <label for="slide-core-elements">Core Elements</label>
                            <nav>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-elements/buttons.html">Buttons</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-elements/form.html">Form</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-elements/horizontal-rule.html">Horizontal Rule</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-elements/image.html">Image</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-elements/lists.html">Lists</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-elements/table.html">Table</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-elements/typography.html">Typography</a>
                            </nav>
                        </div>

                        <div class="sidenav-block">
                            <input type="checkbox" id="slide-core-helpers">
                            <label for="slide-core-helpers">Core Helpers</label>
                            <nav>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-helpers/colours.html">Colour Palette</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-helpers/heights.html">Heights</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-helpers/positions.html">Positions</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/core-helpers/widths.html">Widths</a>
                            </nav>
                        </div>

                        <div class="sidenav-block">
                            <input type="checkbox" id="slide-extend-elements">
                            <label for="slide-extend-elements">Extend Elements</label>
                            <nav>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-elements/avatars.html">Avatars</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-elements/badges.html">Badges</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-elements/icons.html">Icons</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-elements/notifications.html">Notifications</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-elements/tags.html">Tags</a>
                            </nav>
                        </div>

                        <div class="sidenav-block">
                            <input type="checkbox" id="slide-extend-components">
                            <label for="slide-extend-components">Extend Comp'ts</label>
                            <nav>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/accordions.html">Accordions</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/breadcrumbs.html">Breadcrumbs</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/card.html">Card</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/dropdowns.html">Drop Downs</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/modal.html">Modal</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/navbar.html">Navbar</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/pagination.html">Pagination</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/tabs.html">Tabs</a>
                            </nav>
                        </div>

                        <div class="sidenav-block">
                            <input type="checkbox" id="slide-extra-elements">
                            <label for="slide-extra-elements">Extra Elements</label>
                            <nav>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-elements/progress-bar.html">Progress Bars</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-elements/ribbon.html">Ribbons</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-elements/tooltip.html">Tool Tips</a>
                            </nav>
                        </div>

                        <div class="sidenav-block">
                            <input type="checkbox" id="slide-extra-components">
                            <label for="slide-extra-components">Extra Comp'ts</label>
                            <nav>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/blockquote.html">Blockquote</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/carousel.html">Carousel</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/comments.html">Comments</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/dividers.html">Dividers</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/magazine.html">Magazine</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/messages.html">Messages</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/popovers.html">Popovers</a>
                                <a href="https://zaphodbb-pm.github.io/goldilocks-css/pages/extra-components/widget-bar.html">Widget Bar</a>
                            </nav>
                        </div>

                    </nav>
                </div>
            </div>


            <a href="https://zaphodbb-pm.github.io/goldilocks-css/_pages/home.html">
                <img src="https://zaphodbb-pm.github.io/goldilocks-css/img/goldi3-logo.png" height="128" width="128" alt="Project Logo">
            </a>
        </div>

        {#if layout.SHORTCUTS}
            <div class="navbar-center">
                <NavShortcuts {currentRoute}> </NavShortcuts>
            </div>
        {/if}

        <div class="navbar-right">
            <UserCredit text="{navText.userCredit}" extras=" "/>

            <Notifications text="{navText.notifications}" />

            <UserProfile text="{navText.userProfile}" />

            <!--
            <a class="button is-secondary has-hover" href="https://github.com/zaphodbb-pm/goldilocks-css/archive/refs/heads/master.zip" rel="nofollow" aria-label="Download">
                <svg class="icon"><use href="#icon-cloud-download"></use></svg>
                <span>DownLoad</span>
            </a>

            <a class="icon-nav" href="https://github.com/zaphodbb-pm/goldilocks-css" target="_blank" rel="nofollow" aria-label="link to github">
                <svg class="icon"><use href="#icon-github"></use></svg>
            </a>

            <a class="button is-tertiary has-hover" href="#page-main-nav">
                <span>Top</span>
            </a>
            -->
        </div>
    </nav>
</div>







<!--
<nav id="navbar-container"
     class="navbar is-fixed-top is-marginless is-paddingless has-opacity has-navbar-widgets"
     style="border-bottom: 2px solid #dbdbdb"
     role="navigation" aria-label="main navigation"
     data-test="page-navbar">

    <div id="navbarBrand-insert" class="navbar-brand mr-5">
        <Navbar_Brand> </Navbar_Brand>

        <a role="button"
           class="navbar-burger navbar-widgets-burger is-block-touch is-block-desktop-only"
           aria-label="menu"
           on:click={ () => open = !open}
           data-test="navbar-hamburger"
           aria-expanded="false">

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div class="navbar-menu">
        <div class="navbar-start">
            {#if layout.TOP_NAV}
                <Navbar_Links {currentRoute}> </Navbar_Links>
            {/if}
        </div>

        <div class="navbar-end w-100 justify-content-center is-hidden-mobile" data-test="top-navbar-condensed">
            {#if layout.SHORTCUTS}
                <NavShortcuts {currentRoute}> </NavShortcuts>
            {/if}
        </div>
    </div>

    <div class="navbar-widgets">
        <UserCredit text="{navText.userCredit}" extras=" "/>

        <Notifications text="{navText.notifications}" />

        <UserProfile text="{navText.userProfile}" />
    </div>

</nav>
-->




<!--
<div class="navbar w-100 justify-content-center is-fixed-bottom is-light is-hidden-tablet"
     style="display: inline-flex; min-height: 2rem;"
     data-test="bottom-navbar-condensed">

    <NavShortcuts {currentRoute} bottom />
</div>
-->






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
