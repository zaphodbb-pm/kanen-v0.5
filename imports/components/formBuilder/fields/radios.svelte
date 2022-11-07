<script>
    /**
     * Basic radio group.
     *
     * @memberOf Components:Form
     * @function radios
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     * @param {Object} field.params - {col: number}
     *
     * @emits 'on-inputentry' {value: value, error: false} with array of objects
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import {getContext} from 'svelte';

    const formText = getContext("formText");
    const source = formText[field.field]?.selects ?? [];
    const label = formText[field.field]?.label ?? "";

    //* local reactive variable
    let radValue = "";

    $: setValue(field.value);


    //* event handlers
    function emitRadio(selId){
        //** get text for _id values
        let item = source.find( (s) => s._id === selId )
        dispatch('on-inputentry', {value: item, error: false});
    }

    //* functions that mutate local variables
    function setValue(val){
        radValue = val._id;
    }

</script>




<fieldset class="{field.css}">
    <legend>{label}</legend>

    {#each source as rad, idx}
        <label>
            <input type="radio"
                   id="{field.field + '_radio_' + idx}"
                   name="{field.field + '_radio-group'}"
                   title=""

                   {...field.attributes}
                   bind:group={radValue}
                   value={rad._id}
                   on:change|stopPropagation="{() => emitRadio(rad._id)}">

            <span>{rad.name}</span>
        </label>
    {/each}

</fieldset>