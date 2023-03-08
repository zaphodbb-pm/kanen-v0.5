<script>
    /**
     * Complex row container that can contain other form field types.
     *
     * @module rows
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error - class to show a field in error
     * @param {String} className
     *
     * @fires on-inputentry
     *
     * @notes
     *   1. Any field types in FormHolder can used as sub-fields in this component.
     *      Common types are "input", "select", "typeahead" and "switch".
     *      Other types are not practical in this type of arrangement.
     *
     *   2. Returned value is [Array] of {objects}:
     *      {
     *          row: 2,
     *          fields: {
     *              field1: "try two",
     *              field2: 0,
     *              field3: 1,
     *              field4: true
     *          }
     *      }
     *
     */


    //* common props from parent
    export let field = {};
    export let error = "";

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support Functions
    import {deepClone} from '/imports/Functions/utilities/deepClone'
    import Field_Wrapper from '/imports/Components/formBuilder/fieldWrapper.svelte'
    import Sortable from '/imports/Components/elements/rowDragDrop.svelte'
    import {getContext,  setContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let list = [];
    const key = field.params.key;

    //** get field set-up and prepare out going object that contains first default values and user entry values
    const fieldsArray = field.params && field.params.config ? field.params.config : {};

    //** set new formText context for embedded formWrapper
    let formText = getContext("formText");
    const label = formText ? formText[field.field]?.label ?? "" : "Undefined Field Label";
    const rowText = formText ? formText[field.field]?.rowText ?? {} : field?.rowText ?? {};

    if(rowText){
        setContext("formText", rowText);
    }

    //** reset input row section to default
    list = initialRow(1, fieldsArray);

    //** when editing a form document, load value from document
    $: setValue(field.value);


    //* Functions that mutate local variables
    function setValue(val){
        if(val && Array.isArray(val) && val.length > 0){
            list = val.map( (v) =>  initialRow(v.row, fieldsArray, v.fields)[0] );
        }else{
            list = initialRow(1, fieldsArray, null);
        }
    }

    function updateList(newList){
        list = newList.map( (nl, idx) =>  {
            nl.row = idx + 1;
            return nl;
        });

        let out = newList.map( (nl) => {
            let values = {};
            let fld = nl.fields;

            for(let field in fld){
                if( fld.hasOwnProperty(field) ){
                    values[field] = fld[field] ? fld[field].value : fld[field].defaultValue;
                }
            }

            return {
                row: nl.row,
                fields: values
            }
        } )

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: errorVal} - value {Object} of field values
         */
        dispatch('on-inputentry', {value: out, error: false});
    }


    //* event handlers
    function fieldsUpdate(row, msg) {
        let newList = list;
        let updateIdx = newList.findIndex( (item) => item.row === row);
        newList[updateIdx].fields[msg.field] = msg;

        updateList(newList);
    }

    function addRow() {
        let row = list && list.length ? list.length + 1 : 1;     // default "row" value
        let newList = [...list, initialRow(row, fieldsArray, null)[0] ];

        updateList(newList);
    }

    function deleteRow(rowid) {
        let newList = list;
        newList = newList.filter(row => row.row !== rowid);

        updateList(newList);
    }

    function sortList(ev){
        updateList(ev.detail);
    }


    //* support Functions
    function initialRow(idx, fieldArray, value){
        let fa = deepClone(fieldArray);

        for(let field in fa){
            if( fa.hasOwnProperty(field) ){
                fa[field].value = value && ( value[field] || typeof value[field] === "boolean") ? value[field] : fa[field].defaultValue;
            }
        }

        return [{row: idx, fields: fa}];
    }

</script>



<fieldset class="field--row-list {error} {className} {field.css || ''}">
    <legend>{label}</legend>

    <button type="button" class="add-rows is-rounded is-primary" on:click="{addRow}" title="add row">
        <span class="icon-bg-circle-plus is-medium"></span>
    </button>

    <Sortable
            bind:list={list}
            {key}
            on:sort={sortList}
            let:item={item}>


        <div class="level">
            <div class="row-id">{item.row}</div>

            {#each Object.values(item.fields) as field, idf (field.field + item.row)}
                <Field_Wrapper
                        class="{className}"
                        {field}
                        on:field-changed="{e => fieldsUpdate(item.row, e.detail) }"/>
            {/each}

            <div class="has-text-centered" on:click="{() => deleteRow(item.row)}">
                <span class="icon-bg-circle-minus is-medium has-text-danger"></span>
            </div>
        </div>

    </Sortable>

</fieldset>




<style>

    .field--row-list {
        padding-top: 5rem;
    }

    .field--row-list .level {
        flex-direction: row;
        align-items: center;
        column-gap: 0;
        border-bottom: 1px solid var(--border-main);
        padding: var(--padding) 0;
    }

    .field--row-list .level label {
        min-width: 5rem;
    }

    .field--row-list textarea {
        flex: auto;
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