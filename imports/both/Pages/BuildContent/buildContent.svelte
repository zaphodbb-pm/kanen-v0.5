<script>
    /**
     * Layout for BuildContent page.
     * @name buildContent
     * @module
     * @memberOf Pages:buildContent
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {header, page} from './buildContent_text'
        import {pageConfig} from './buildContent_config'

        //** app support files
        import { onMount } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import schema from './buildContent_form_schema';
    import listArray from './buildContent_list';

    import Form_Holder from '/imports/Components/formBuilder/formHolder.svelte'
    import List_Holder from '/imports/Components/listCollections/listHolder.svelte'

    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    const pageHeader = i18n(header, "", $lang);
    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);

    let conf = pageConfig;
    let role = "";
    let editdoc = {};
    let directdoc = {};

    let sort = listArray.sort;
    let fields = listArray.fields;
    let submitted = false;
    let currentDoc = {};
    let showList = false;
    let showForm = false;
    let releaseEdit = false;


    //* lifecycle controls
    onMount( () => {
        showList = !!conf.list.hasOverlay || !conf.form.hasOverlay;
        showForm = !conf.form.hasOverlay;
    });


    //* Functions that mutate reactive variables
    function checkOverlay() {
        showList = !!conf.list.hasOverlay || !conf.form.hasOverlay;
        showForm = !conf.form.hasOverlay;
        releaseEdit = true;
    }

    function docToEdit(msg) {
        currentDoc = msg.detail;
        editdoc = msg.detail;

        if(!releaseEdit){
            showList = !conf.list.hasOverlay;
            showForm = !conf.list.hasOverlay || !!conf.form.hasOverlay;
        }

        releaseEdit = false;
    }

    function docSent(){
        showList = !!conf.list.hasOverlay || !conf.form.hasOverlay;
        showForm = !conf.form.hasOverlay;
        releaseEdit = true;
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="row">
        <div class="column is-span-2" class:is-hidden={!showList}>

            <List_Holder
                    config="{conf.list}"
                    class="has-width-15rem"
                    {listText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"
                    on:send-doc="{docToEdit}"/>

        </div>


        <div class="column is-span-3" class:is-hidden={!showForm}>

            <Form_Holder
                    config="{conf.form}"
                    {formText}
                    {schema}
                    {role}
                    {editdoc}
                    {directdoc}
                    on:back-to-list="{checkOverlay}"
                    on:doc-submitted="{docSent}"/>

        </div>
    </div>

</main>





