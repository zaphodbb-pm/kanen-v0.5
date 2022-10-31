<script>
    /**
     * Layout for BuildContent page.
     *
     * @memberof Pages:BuildContent
     * @function buildContent_page
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

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

    //import Form_Holder from '/imports/components/formBuilder/formHolder.svelte'
    //import List_Holder from '/imports/components/listCollections/listHolder.svelte'

    import {i18n} from '/imports/functions/utilities/i18n';
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


    //* functions that mutate reactive variables
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

    <div class="columns">

        <article class="column is-5" class:is-hidden={!showList}>

            <!--
            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"
                    on:send-doc="{docToEdit}"/>
                    -->

        </article>


        <article class="column is-7" class:is-hidden={!showForm}>

            <!--
            <Form_Holder
                    config="{conf.form}"
                    {formText}
                    {schema}
                    {role}
                    {editdoc}
                    {directdoc}
                    on:back-to-list="{checkOverlay}"
                    on:doc-submitted="{docSent}"/>
                    -->

        </article>

    </div>

</main>





