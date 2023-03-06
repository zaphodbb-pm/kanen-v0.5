<script>
    /**
     * Draggable item list.
     *
     * @module itemList
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error - class to show a field in error
     * @param {String} className
     *
     * @fires on-inputentry
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support Functions
    import Sortable from '/imports/Components/elements/rowDragDrop.svelte'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText ? formText[field.field]?.label ?? "" : "Undefined Field Label";

    //* local reactive variable
    let list = [];
    let key = field.params.key;
    let uniqueId = Math.random();

    $: setValue(field.value);

    //* Functions that mutate local variables
    function setValue(val){
        list = val;
    }

    function updateList(newList){
        list = newList.map( (nl, idx) =>  {
            nl.id = idx + 1;
            return nl;
        });

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: errorVal} with text, number or other types
         */
        dispatch('on-inputentry', {value: list, error: false});
    }

    //* event handlers
    function addRow(){
        let newList = list;
        let addItem = {
            id: list.length + 1,
            check: "",
            text: "",
        };

        newList.push(addItem);
        updateList(newList)
    }

    function deleteRow(rowid) {
        let newList = list;
        newList = newList.filter(row => row.id !== rowid);
        updateList(newList)
    }

    function updateElement(item, prop, value) {
        item[prop] = value;
        updateList(list);
    }

    function sortList(ev){
        let newList = ev.detail;
        updateList(newList)
    }

</script>






<fieldset class="field--item-list {error} {className} {field.css || ''}">
    <legend>{label}</legend>

    <button type="button" class="add-rows is-rounded is-primary" on:click="{addRow}" title="add row">
        <span class="icon-bg-circle-plus is-medium"></span>
    </button>

    <Sortable
            bind:list={list}
            key={field.params.key}
            on:sort={sortList}
            let:item={item}>

        <div class="level">
            <div class="row-id">{item.id}</div>

            {#if field.params.showCheck}
                <label>
                    <input type="checkbox"
                           class="is-checkradio is-info has-background-color"
                           title="simple check box"
                           id="{'checkbox_' + uniqueId + '_' + item.id}"
                           checked="{item.check}"
                           on:change="{e => updateElement(item, 'check', e.target.checked)}">
                </label>
            {/if}

            <textarea class="textarea"
                      value="{item.text}"
                      on:input="{e => updateElement(item, 'text', e.target.value)}"
                      rows="2"></textarea>

            <div class="has-text-centered" on:click="{() => deleteRow(item.id)}">
                <span class="icon-bg-circle-minus is-medium has-text-danger"></span>
            </div>
        </div>

    </Sortable>

</fieldset>




<style>

    .field--item-list {
        padding-top: 5rem;
    }

    .field--item-list .level {
        flex-direction: row;
        align-items: center;
        padding: 0;
    }

    .field--item-list textarea {
        flex: auto;
        /*flex-grow: 2;*/
        padding: var(--padding);
    }

    .add-rows {
        padding: 0.5rem;
        position: absolute;
        top: 1rem;
        left: 1rem;
    }

    .add-rows > span {
        margin: 0;
    }

    .row-id {
        padding: 0.25rem 0.75rem;
        background-color: var(--bg-component);
        border-radius: 50%;
        color: var(--text);
    }

</style>

