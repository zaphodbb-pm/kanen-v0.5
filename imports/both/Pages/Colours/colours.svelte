<script>/**
* Layout for Colours page.
*
* @memberof Pages:Colours
* @function Icons
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

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <h2>Colours</h2>

    <div class="row">
        <div class="column space-vert-medium">
            <h3>{i18n(page.columns, "swatches", $lang)}</h3>



            <!--
            {#each swatches as swatch}
                <div class="tags has-addons">
                    <span class="tag is-large"
                          style="background-color: {swatch[1]}; color: whitesmoke;">
                        {swatch[1]}
                    </span>

                    <span class="tag is-large">{swatch[0]}</span>
                </div>
            {/each}

            -->
        </div>

        <div class="column space-vert-medium">
            <h3>{i18n(page.columns, "boxes", $lang)}</h3>

            <!--
            {#each boxes as box}
                <div class="box {box[1]}">
                    {box[0]}
                </div>
            {/each}
            -->
        </div>

        <div class="column space-vert-medium">
            <h3>{i18n(page.columns, "themes", $lang)}</h3>

            <!--
            {#each themes as theme}
                <div class="mb-3">
                    <button class="button is-fullwidth {theme[1]}">
                        {theme[0]}
                    </button>
                </div>
            {/each}
            -->
        </div>
    </div>


</main>