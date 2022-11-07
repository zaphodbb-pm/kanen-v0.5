<script>
    /**
     * Basic checkboxes.
     *
     * @memberOf Components:Form
     * @function checkboxes
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error
     *
     * @emits 'on-inputentry' {value: value, error: false} with array of objects
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";

    //* support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import {getContext} from 'svelte'

    const formText = getContext("formText");
    const source = formText[field.field]?.selects ?? [];
    const label = formText[field.field]?.label ?? "";


    //* local reactive variable
    let inValue = "";
    let checkedNames = [];

    $: setValue(field.value);


    //* event handlers
    function emitCheckedNames(){
        //** get text for _id values
        let items = checkedNames.map( (cn) => source.find( (s) => s._id === cn ) );
        dispatch('on-inputentry', {value: items, error: false});
    }

    //* functions that mutate local variables
    function setValue(val){
        checkedNames = field.value.map( (val) => val._id);
    }

</script>



<fieldset class="{field.css}">
    <legend>{label}</legend>

    {#each source as cb}
        <label>
            <input type="checkbox"
                   id="{field.field + '_checkbox_' + cb._id}"
                   title=""

                   bind:group={checkedNames}
                   value={cb._id}
                   on:change|stopPropagation="{emitCheckedNames}">

            <span>{cb.name}</span>
        </label>
    {/each}

</fieldset>
