<script>
    /**
     * Users page allows for adding, editing or deleting users on this system.
     *
     * @name users
     * @module
     * @memberOf Pages:users
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
        import {header, page} from './users_text';
        import {pageConfig} from './users_config';

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from "../../../Functions/utilities/i18n.js";
    import {lang} from "../../../client/systemStores.js";
    const pageHeader = i18n(header, "", $lang);


    //* page-body support **************************
    import {deepClone} from '/imports/Functions/utilities/deepClone'
    import schema from './users_form_schema'
    import listArray from './users_list'

    import {components} from "../../../Components/formBuilder/fields/func-registerFileFields";
    import List_Form from '/imports/Components/listForm/listForm.svelte'


    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);
    let conf = deepClone(pageConfig);

</script>



<PageHeader header="{pageHeader}" />

<div class="main-content" id="page-layout">

    <List_Form
            confList="{conf.list}"
            listArray="{listArray}"
            listText="{listText}"
            confForm="{conf.form}"
            schema="{schema}"
            {components}
            formText="{formText}"
    />

</div>