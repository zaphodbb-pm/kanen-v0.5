<script>
    /**
     * Basic checkboxes.
     *
     * @module checkboxes
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error
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
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import {getContext} from 'svelte'

    const formText = getContext("formText");
    const source = formText ? formText[field.field]?.selects ?? [] : field?.selects ?? [];
    const label = formText ? formText[field.field]?.label ?? "" : "Undefined Field Label";


    //* local reactive variable
    let inValue = "";
    let checkedNames = [];

    $: setValue(field.value);


    //* event handlers
    function emitCheckedNames(){
        //** get text for _id values
        let items = checkedNames.map( (cn) => source.find( (s) => s._id === cn ) );

        /**
         * @event on-inputentry
         * @type {object} - {value: keyValue, error: false}
         */
        dispatch('on-inputentry', {value: items, error: false});
    }

    //* Functions that mutate local variables
    function setValue(){
        checkedNames = field.value.map( (val) => val._id);
    }

</script>



<fieldset class="field--checkboxes {error} {className} {field.css || ''}">
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
