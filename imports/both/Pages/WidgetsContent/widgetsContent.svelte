<script>
    /**
     * Various content widgets WidgetsContent page.
     *
     * @name widgetsContent
     * @module
     * @memberOf Pages:widgetsContent
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
        import {header, page} from './widgetsContent_text'

        //** app support files
        //import { setContext} from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page body support **************************
    import {i18n} from "../../../Functions/utilities/i18n.js";
    import {lang} from "../../../client/systemStores.mjs";

    const pageHeader = i18n(header, "", $lang);
    const pageText = i18n(page, "page", $lang);
    const componentsText = i18n(page, "components", $lang);

    import TabContent from '../../../Components/widgets/tabbedContent.svelte'
    import Accordion from '../../../Components/widgets/accordion.svelte'

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <section>
        <h2>{pageText.headingTabs}</h2>

        <p>{@html pageText.bodyTabs}</p>

        <TabContent class="has-max-width-30rem" content="{componentsText.tabbed}"/>
    </section>


    <section class="space-vert-large">
        <h2>{pageText.headingAccordions}</h2>

        <p>{@html pageText.bodyAccordions}</p>

        <Accordion class="has-max-width-30rem" content="{componentsText.tabbed}"   />
    </section>

</main>