<script>
    /**
     * @summary Layout for WidgetsContent.
     *
     * @name widgetsContent
     * @module
     * @memberOf Pages:widgetsContent
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './widgetsContent_text'

        //** app support files
        import { setContext} from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page body support **************************
    import {i18n} from "../../../functions/utilities/i18n.js";
    import {lang} from "../../../client/systemStores.mjs";

    const pageHeader = i18n(header, "", $lang);

    setContext("pageText", page);

    //import TabContent from '/imports/components/widgets/tabbedContent.svelte'
    //import Accordian from '/imports/components/widgets/accordian.svelte'

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    tabs and accordions
</main>


<!--
<PageWrapper {header} >

    <div class="columns">
        <article class="column is-6">
            <TabContent text="tabbed" tabSettings="is-toggle is-fullwidth" />
        </article>

        <article class="column is-6">
            <Accordian text="tabbed" tabSettings="is-warning is-light"  />
        </article>
    </div>

</PageWrapper>
-->
