<script>
    /**
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
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();

    //* get the user language preference from store
    import {i18n} from '/imports/Functions/utilities/i18n'
    import {lang} from '/imports/client/systemStores'


    //* get page text information and set contexts for children Components
    import {navbar} from './Navbar_text';
    let navText = i18n(navbar, "", $lang);

    //* Components
    import NavShortcuts from "./NavCondensedMenu.svelte";
    import UserProfile from '/imports/Components/elements/userProfile.svelte';
    import ContentLinks from '/imports/Components/elements/contentLinks.svelte';

</script>



<div class="page-main-nav is-fixed">
    <nav class="navbar navbar-custom has-sidebar" aria-label="Main Site Navigation Bar">
        <div class="navbar-left">
            <a href="/home">
                <span>Bene</span>
                <br>
                <span>Victu</span>
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
                    <li><ContentLinks text="{navText.contentLinks}" /></li>
                    <li><UserProfile text="{navText.userProfile}" /></li>
                </ul>
            </nav>
        </div>
    </nav>
</div>

<style>
    .navbar-custom {
        border-bottom: 2px solid var(--primary);
        background-color: var(--bg-main);
    }

    .navbar-custom .navbar-left a {
        text-decoration: none;
        color: var(--primary);
        text-align: center;
        font-weight: 600;
        padding: var(--pad-vert) var(--pad-horz);
    }

    .navbar-custom .navbar-left a:hover {
        background-color: var(--primary);
        color: white;
    }
</style>