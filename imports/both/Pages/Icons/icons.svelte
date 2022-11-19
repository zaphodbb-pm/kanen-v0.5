<script>
    /**
     * Layout for Icons page.
     *
     * @name icons
     * @module
     * @memberOf Pages:icons
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {header, page} from './icons_text';
        import {pageConfig} from './icons_config';

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    const pageHeader = i18n(header, "", $lang);

    //** get list of Icons and sort list ascending
    let allIcons = pageConfig.components.iconsList;
    allIcons = allIcons.sort( (a,b) => a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0) );
    const sample = 4;           // pick an icon for sizes and colour

</script>




<PageHeader header="{pageHeader}" />

<main class="main-content">
    <h2>{i18n(page.page, "example", $lang)}</h2>

    <p><span class="{allIcons[sample]} is-small"></span>
        <code>&lt;span class="{allIcons[sample]} is-small"&gt;&lt;/span&gt;</code>
    </p>

    <p><span class="{allIcons[sample]} has-text-tertiary"></span>
        <code>&lt;span class="{allIcons[sample]} has-text-tertiary"&gt;&lt;/span&gt;</code>
    </p>

    <p><span class="{allIcons[sample]} is-medium has-text-secondary"></span>
        <code>&lt;span class="{allIcons[sample]} is-medium has-text-secondary"&gt;&lt;/span&gt;</code>
    </p>

    <p><span class="{allIcons[sample]} is-large has-text-primary"></span>
        <code>&lt;span class="{allIcons[sample]} is-large has-text-primary"&gt;&lt;/span&gt;</code>
    </p>



    <div class="space-component-medium"></div>



    <h2>{i18n(page.page, "count", $lang) + allIcons.length}</h2>

    <div class="row has-3x-minwidth">
        {#each allIcons as icon}

            <div class="column">
                <div class="icon-nav">
                    <span class="{icon} is-large"></span>
                    <p>{"." + icon}</p>
                </div>
            </div>

        {/each}
    </div>

</main>