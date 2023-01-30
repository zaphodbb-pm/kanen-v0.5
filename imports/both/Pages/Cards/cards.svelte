<script>
    /**
     * Layout for Cards Page.  Builds two sample cards with different configurations.
     *
     * @name cards
     * @module
     * @memberOf Pages:cards
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
        import {header, page} from './cards_text'

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from "../../../Functions/utilities/i18n.js";
    import {lang} from "../../../client/systemStores.js";

    const pageHeader = i18n(header, "", $lang);
    const pageHeadings = i18n(page, "headings", $lang);
    const componentText = i18n(page, "components", $lang);

    import Card from '../../../Components/blocks/card.svelte';

    //* respond to component events
    function cardEvent(event){
        alert("cardEvent: " + JSON.stringify(event.detail));
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <h2>{pageHeadings.heading1}</h2>

    <Card id="cardOne" text="{componentText.cardOne}" class="has-max-width-30rem">
        <div class="level-start">
            <span class="icon-bg-bookmark is-large"></span>
            <span>{componentText.cardOne.body}</span>
        </div>
    </Card>


    <div class="space-component-large"></div>


    <h2>{pageHeadings.heading2}</h2>

    <Card id="cardTwo" text="{componentText.cardTwo}" class="has-max-width-30rem" on:footEvent={cardEvent}>
        <div class="level-start has-text-primary">
            <span class="icon-bg-film is-large"></span>
            <span class="is-size-2">{componentText.cardTwo.body}</span>
        </div>
    </Card>

</main>