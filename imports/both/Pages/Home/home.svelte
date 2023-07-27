<script>
/**
 * Site home page with project commentary
 *
 * @name home
 * @module
 * @memberOf Pages:home
 * @locus Client
 *
 * @param {String} currentRoute - page path name
 * @param {Object} params - any parameters from path url
 * @param {Object} query - any query fragment from path url
 *
 */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {header, page} from './home_text'

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from "../../../Functions/utilities/i18n.js";
    import {lang} from "../../../client/systemStores.js";

    const pageHeader = i18n(header, "", $lang);
    const pageText = i18n(page, "page", $lang);
</script>


<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="row has-4x-minwidth is-centered-vert" data-tp_main>
        <section class="column">
            <figure>
                <img src="/images/cover001.jpg" alt="Fine Cooking issue 1 magazine cover" height="807" width="662">
            </figure>
        </section>

        <section class="column">
            <h2>{pageText.intro}</h2>
            {@html pageText.introText}
        </section>
    </div>

    <div class="row has-4x-minwidth space-container-vert" data-tp_main_notes>
        <section class="column">
            <h2>{pageText.overview}</h2>
            {@html pageText.overviewText}
        </section>

        <section class="column">
            <h2>{pageText.sections}</h2>
            {@html pageText.sectionsText}
        </section>
    </div>

</main>