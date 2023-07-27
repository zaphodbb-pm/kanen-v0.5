<script>

    /**
     * MagazinesSearch page is a collection of Fine Cooking magazinesSearchSearch.
     *
     * @name magazinesSearch
     * @module
     * @memberOf Pages:magazinesSearch
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
        import {header, page} from './magazinesSearch_text';
        import {pageConfig} from './magazinesSearch_config';

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n'
    import {lang} from '/imports/client/systemStores'

    import List_Holder from '../../../Components/listCollections/listHolder.svelte'
    import listArray from './magazinesSearch_list';

    const pageHeader = i18n(header, "", $lang);
    let listText = i18n(page, "list", $lang);
    let gridText = i18n(page, "grid", $lang);

    let conf = pageConfig;
    let sort = listArray.sort;
    let fields = listArray.fields;
    let releaseEdit = false;

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="columns">
        <div class="column">

            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {gridText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"/>

        </div>
    </div>

</main>
