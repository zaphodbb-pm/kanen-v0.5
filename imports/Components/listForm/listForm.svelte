<script>
    /**
     * Component insert combination for list and form Components.
     *
     * @module listForm
     * @memberOf Components:listForm:
     * @locus Client
     *
     * @param {Object} confList
     * @param {Object} confForm
     * @param {Array} schema
     * @param {Array} listArray
     * @param {Object} formText
     * @param {Object} listText
     *
     */

    export let confList = {};
    export let confForm = {};
    export let schema = [];
    export let listArray = [];
    export let formText = {};
    export let listText = {};
    export let components = {};


    import {generateId} from '/imports/Functions/utilities/generateId'
    import {messages} from '/imports/client/systemStores'

    import Form_Holder from '/imports/Components/formBuilder/formHolder.svelte'
    import List_Holder from '/imports/Components/listCollections/listHolder.svelte'

    let mode = "list";
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
    let grid = false;

    $: showList = !!confList?.hasOverlay || !confForm?.hasOverlay;
    $: showForm = !confForm?.hasOverlay;
    $: gridMode(confList);

    //* Functions that mutate reactive variables
    function checkOverlay() {
        showList = !!confList?.hasOverlay || !confForm?.hasOverlay;
        showForm = !confForm?.hasOverlay;
        releaseEdit = true;
    }

    function docToEdit(msg) {
        currentDoc = msg.detail;
        editdoc = msg.detail;

        if(!releaseEdit){
            showList = !confList?.hasOverlay;
            showForm = !confList?.hasOverlay || !!confForm?.hasOverlay;
        }

        releaseEdit = false;
    }

    function docSent(){
        showList = !!confList?.hasOverlay || !confForm?.hasOverlay;
        showForm = !confForm?.hasOverlay;
        releaseEdit = true;
    }

    //** for demonstration only; can be removed ***
    function methodMessage(msg){
        let status = msg.detail && msg.detail.status ? msg.detail.status : 500;

        let state = {
            200: "success",
            400: "fail",
            404: "warning",
            500: "uncertain",
        }

        let newMsg = {
            id: generateId(8),
            state: state[status],
            text: msg.detail && msg.detail.text ? msg.detail.text : "n/a"
        }

        $messages = [... $messages, newMsg];
    }
    //** end of demonstration ***



    function gridMode(msg){
        mode = msg?.display ?? "list";

        if(mode === "grid") {
            showList = true;
            showForm = false;

            releaseEdit = true;
        }else{
            checkOverlay();

            releaseEdit = false;
        }
    }

</script>



<div class="row has-4x-minwidth">

    <div class="column {mode === 'grid' ? '' : confList?.css ?? ''}" class:is-hidden={!showList}>
        <List_Holder
                config="{confList}"
                {listText}
                {fields}
                {sort}
                submitted="{releaseEdit}"
                on:send-doc="{docToEdit}"/>
    </div>

    <div class="column {confForm?.css ?? '' }" class:is-hidden={!showForm}>
        <Form_Holder
                config="{confForm}"
                {formText}
                {schema}
                {components}
                {role}
                {editdoc}
                {directdoc}
                on:back-to-list="{checkOverlay}"
                on:doc-submitted="{docSent}"
                on:method-return={methodMessage}/>
    </div>

</div>


<style>
    .is-hidden {
        display: none;
    }
</style>
