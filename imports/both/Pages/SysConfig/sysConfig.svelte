<script>
    /**
     * Layout for SysConfig page.
     *
     * @memberof Pages:SysConfig
     * @function sysConfig_page
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    // setup props to receive route data
    export let currentRoute;
    export let params;

    // app services (getContext is often optional)
    import { onMount, onDestroy, setContext } from 'svelte';
    //import { getContext } from 'svelte';

    // get the user language preference from store (optional)
    import {lang} from '/imports/client/systemStores'

    // get page text information and set contexts for children components
    import {header, page} from './sysConfig_text'

    setContext("pageHdr", header);
    setContext("pageText", page);

    // get component configuration information and set contexts for children components
    import pageConfig from './sysConfig_config'
    setContext("pageConfig", pageConfig);

    // get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import config from './sysConfig_config'
    import Form_Holder from '/imports/components/formBuilder/formHolder.svelte'
    import schema from './sysConfig_form_schema'
    import List_Holder from '/imports/components/listCollections/listHolder.svelte'
    import listArray from './sysConfig_list'

    import {i18n} from '/imports/functions/i18n'
    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);

    let conf = config;
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



<Hdr />


<section class="page-body">
    <div class="columns">

        <article class="column is-5" class:is-hidden={!showList}>
            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"
                    on:send-doc="{docToEdit}"/>

        </article>


        <article class="column is-7" class:is-hidden={!showForm}>
            <Form_Holder
                    config="{conf.form}"
                    {formText}
                    {schema}
                    {role}
                    {editdoc}
                    {directdoc}
                    on:back-to-list="{checkOverlay}"
                    on:doc-submitted="{docSent}"/>

        </article>

    </div>
</section>