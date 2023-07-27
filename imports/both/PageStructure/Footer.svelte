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

    //** get the user language preference from store
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {footer, pwa} from './Footer_text';
    import { getContext } from 'svelte';

    //** get system wide info and text
    const version = getContext("Version");
    const footerText = i18n(footer, "", $lang);
    const pwaText = i18n(pwa, "", $lang);


    //* local reactive variables
    let groups = [];

    // typically 6 groups of links produced;
    // [0] appears in navbar, [2] is in navbar dropdown for editing, [3] is in user dropdown,  and [4] is not used
    let group1;
    let group2;
    let group5;

    let loc;

    //** user stuff
    import {userPosition, showRoutes} from '/imports/client/systemStores';
    import {buildNavGroups} from "../../Functions/application/buildNavGroups";

    $: loc = $userPosition;

    $: {
        groups = buildNavGroups($showRoutes);
        group1 =  groups[1] && groups[1]?.length > 0 ? groups[1] : undefined;
        group2 =  groups[1] && groups[2]?.length > 0 ? groups[2] : undefined;
        group5 =  groups[1] && groups[5]?.length > 0 ? groups[5] : undefined;
    }


    import Messages from '/imports/Components/general/messages/messages.svelte'
    import PWA from '/imports/both/AddToHomescreen/PWA-requester.svelte'


    //** optional gdpr event intercept
    function gdprEvent(ev){
        console.log("gdpr-event", ev.type, ev.detail);
    }

</script>






<footer class="page-footer">
    <div class="is-medium">
        <p class="foot-heading">{version.APP_NAME}</p>

        <p>{footerText.title}</p>

        <p>Version: {version.VERSION} @ {version.LAST_UPDATE}
            <br>
            Copyright © {version.COPYRIGHT}
        </p>
    </div>

    {#if group2}
        <div class="footer-nav">
            <p class="foot-heading">{footerText.link1}</p>

            <nav>
                <ul>
                    {#each group1 as links (links.name)}
                        <li>
                            <a class="icon-nav-horz}"
                               href="{links.name}"
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


    {#if group5}
        <div class="footer-nav">
            <p class="foot-heading">{footerText.link5}</p>

            <nav>
                <ul>
                    {#each group5 as links (links.name)}
                        <li>
                            <a class="icon-nav-horz}"
                               href="{links.name}"
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

    <div>
        <p class="foot-heading">{footerText.linkGeneral}</p>
        <a href="/home">About</a>
        <a href="/magazinesSearch">Magazines</a>
        <a href="/editionsSearch">Editions</a>
        <a href="/newsSearch">News</a>
    </div>
</footer>


<!-- extra component based functionality -->
<Messages />
<PWA text="{pwaText}" />


<style>
    .footer-nav .foot-heading {
        font-size: var(--size-5);
        font-weight: var(--weight-semibold);
    }

    .footer-nav p{
        margin-left: 0.75rem
    }

    .footer-nav nav li {
        list-style: none;
        margin-left: 0;

    }

</style>