<script>
    /**
     * Basic radio group.
     *
     * @module radios
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {String} error
     * @param {String} className
     * @param {Object} field
     * @param {Object} field.params - {col: number}
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
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import {getContext} from 'svelte';

    const formText = getContext("formText");
    const source = formText[field.field]?.selects ?? [];
    const label = formText ? formText[field.field]?.label ?? "" : "Undefined Field Label";

    //* local reactive variable
    let radValue = "";

    $: setValue(field.value);


    //* event handlers
    function emitRadio(selId){
        //** get text for _id values
        let item = source.find( (s) => s._id === selId )

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: false} with array of objects
         */
        dispatch('on-inputentry', {value: item, error: false});
    }

    //* Functions that mutate local variables
    function setValue(val){
        radValue = val._id;
    }

</script>




<fieldset class="field--radio-list {error} {className} {field.css || ''}">
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