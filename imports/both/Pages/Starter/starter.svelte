<script>
    /**
     * Starter page is a showcase for a tabbed form with all field types and a fully configured list table with serach and filters.
     *
     * @name starter
     * @module
     * @memberOf Pages:starter
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
        import {header, page} from './starter_text';
        import {pageConfig} from './starter_config';

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {deepClone} from '/imports/Functions/utilities/deepClone';
    import schema from './starter_form_schema';
    import listArray from './starter_list';

    import Field_Wrapper from '/imports/Components/formBuilder/fieldWrapper.svelte';
    import List_Form from '/imports/Components/listForm/listForm.svelte';

    const pageHeader = i18n(header, "", $lang);
    let component = i18n(page, "components", $lang);
    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);
    let conf = deepClone(pageConfig);


    function gridMode(msg){
        let mode = msg?.detail?.value ?? false;

        if(mode) {
            conf.list.display = "grid";
            conf.list.hasOverlay = true;
            conf.form.hasOverlay = true;
        }else{
            conf.list.display = "list";
            conf.list.hasOverlay = false;
            conf.form.hasOverlay = false;
        }
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="level-end space-block-vert" data-tp_grid_select>
        <form class="form has-width-15rem" >
            <Field_Wrapper
                    class=""
                    field="{pageConfig.components.gridMode}"
                    fieldText="{component.gridMode}"
                    watchFields="{ {} }"
                    on:field-changed="{gridMode}"/>
        </form>
    </div>

    <List_Form
            confList="{conf.list}"
            listArray="{listArray}"
            listText="{listText}"
            confForm="{conf.form}"
            schema="{schema}"
            formText="{formText}"
    />


</main>
