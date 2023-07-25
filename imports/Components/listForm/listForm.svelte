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
     * @fires list-form-updated
     *
     */


    export let confList = {};
    export let confForm = {};
    export let schema = [];
    export let listArray = [];
    export let formText = {};
    export let listText = {};
    export let gridText = {};
    export let components = {};


    import {generateId} from '/imports/Functions/utilities/generateId';
    import {createEventDispatcher} from 'svelte';
    import {messages, userExtras} from '/imports/client/systemStores';

    import Form_Holder from '/imports/Components/formBuilder/formHolder.svelte';
    import List_Holder from '/imports/Components/listCollections/listHolder.svelte';

    const dispatch = createEventDispatcher();

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
    $: role = $userExtras?.role?._id;

    //* Functions that mutate reactive variables
    function checkOverlay() {
        showList = !!confList?.hasOverlay || !confForm?.hasOverlay;
        showForm = !confForm?.hasOverlay;
        releaseEdit = true;
    }

    function docToEdit(msg) {

        if(!releaseEdit){
            showList = !confList?.hasOverlay;
            showForm = !confList?.hasOverlay || !!confForm?.hasOverlay;
        }

        currentDoc = msg.detail;
        editdoc = msg.detail;
        releaseEdit = false;
    }

    function docSent(msg){
        showList = !!confList?.hasOverlay || !confForm?.hasOverlay;
        showForm = !confForm?.hasOverlay;
        releaseEdit = true;

        /**
         * @event list-form-updated
         * @type {Object}
         */
        dispatch("list-form-updated", msg.detail);
    }

    function docDeleted(msg){
        /**
         * @event list-form-updated
         * @type {Object}
         */
        dispatch("list-form-updated", msg.detail);
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

            releaseEdit = false;
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
                {gridText}
                {fields}
                {sort}
                submitted="{releaseEdit}"
                on:send-doc="{docToEdit}"
                on:delete-doc="{docDeleted}"/>
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
