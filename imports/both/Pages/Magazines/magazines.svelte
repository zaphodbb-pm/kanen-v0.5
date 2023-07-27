<script>/**
 * Magazines page is a collection of Fine Cooking magazines.
 *
 * @name magazines
 * @module
 * @memberOf Pages:magazines
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
        import {header, page} from './magazines_text';
        import {pageConfig} from './magazines_config';

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {deepClone} from '/imports/Functions/utilities/deepClone';
    import schema from './magazines_form_schema';
    import listArray from './magazines_list';

    import {components} from "../../../Components/formBuilder/fields/func-registerAllFields";
    import List_Form from '/imports/Components/listForm/listForm.svelte';

    const pageHeader = i18n(header, "", $lang);
    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);
    let conf = deepClone(pageConfig);

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <List_Form
            confList="{conf.list}"
            listArray="{listArray}"
            listText="{listText}"
            confForm="{conf.form}"
            schema="{schema}"
            {components}
            formText="{formText}"
    />

</main>
