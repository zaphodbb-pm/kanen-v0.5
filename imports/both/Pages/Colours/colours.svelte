<script>

    /**
     * Layout for Colours page.
     *
     * @name colours
     * @module
     * @memberOf Pages:colours
     * @locus Client
     *
     */

    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './colours_text';

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from '/imports/functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    const pageHeader = i18n(header, "", $lang);
    const pageText = i18n(page.page, "", $lang);
    const colours = i18n(page, "columns", $lang);

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <h2>{pageText.h2}</h2>

    <div class="row">
        <div class="column">
            <h3>{colours.main.title}</h3>

            {#each colours.main.colours as colour}
                <div class="{colour[1]} has-height-5rem"></div>
                <p class="is-title-4">{colour[0]}</p>
            {/each}
        </div>

        <div class="column">
            <h3>{colours.light.title}</h3>

            {#each colours.light.colours as colour}
                <div class="{colour[1]} has-height-5rem"></div>
                <p class="is-title-4">{colour[0]}</p>
            {/each}
        </div>

        <div class="column">
            <h3>{colours.dark.title}</h3>

            {#each colours.dark.colours as colour}
                <div class="{colour[1]} has-height-5rem"></div>
                <p class="is-title-4">{colour[0]}</p>
            {/each}
        </div>
    </div>

</main>