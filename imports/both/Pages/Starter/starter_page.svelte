<script>
    /**
     * Layout for Starter page.
     *
     * @name starter
     * @module
     * @memberOf Pages:starter
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {header, page} from './starter_page_text';
        import {pageConfig} from './starter_page_config';

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {deepClone} from '/imports/functions/utilities/deepClone';
    import schema from './starter_form_schema';
    import listArray from './starter_list';

    //import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    //import List_Form from '/imports/components/listForm/listForm.svelte'

    const pageHeader = i18n(header, "", $lang);
    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);
    let conf = deepClone(pageConfig);

    //** for external form fields only; drives text for independent Field_Wrapper component
    import {setContext} from 'svelte';
    setContext("formText", formText);
    //**

    function gridMode(msg){
        let mode = msg?.detail?.value ?? false;

        if(mode) {
            conf.list.display = "grid";
        }else{
            conf.list.display = "list";
        }
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="columns">


        <!--
        <div class="column is-one-quarter is-offset-three-quarters">
            <Field_Wrapper
                    class=""
                    field="{pageConfig.components.gridMode}"
                    watchFields="{ {} }"
                    on:field-changed="{gridMode}"/>
        </div>
        -->
    </div>

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


</main>
