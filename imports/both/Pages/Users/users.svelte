<script>
    /**
     * Layout for users page.
     *
     * @name users
     * @module
     * @memberOf Pages:users
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './users_text';
        import {pageConfig} from './users_config';

        //** app support files
        import { setContext } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from "../../../functions/utilities/i18n.js";
    import {lang} from "../../../client/systemStores.mjs";

    let pageText = i18n(page, "page", $lang);

    const pageHeader = i18n(header, "", $lang);

    setContext("pageText", page);
    //import TabContent from "../../../components/widgets/tabbedContent.svelte";





    //* page-body support **************************


    import {deepClone} from '/imports/functions/utilities/deepClone'


    //import schema from './users_form_schema'
    //import listArray from './users_list'
    //import List_Form from '/imports/components/listForm/listForm.svelte'


    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);
    let conf = deepClone(pageConfig);

</script>



<PageHeader header="{pageHeader}" />

<div class="main-content" id="page-layout">


    Users

    <!--
    <List_Form
            confList="{conf.list}"
            listArray="{listArray}"
            listText="{listText}"
            confForm="{conf.form}"
            schema="{schema}"
            formText="{formText}"
    />
    -->

</div>