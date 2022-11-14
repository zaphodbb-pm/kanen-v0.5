<script>
    /**
     * Time picker component based on input time.
     *
     * @module timePicker
     * @memberOf Components:form
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

    //* support functions
    import {createEventDispatcher, getContext} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";


    //* local reactive variable
    let inValue = "";
    let attributes = field.attributes;

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        inValue = val;
    }

    function checkInput(){

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: errorVal} with text date string
         */
        dispatch('on-inputentry', {value: inValue, error: false});
    }

</script>


<label class="field--time-picker {error} {className} {field.css || ''}">
    <span>{label}</span>

    <input type="time"
           {...attributes}
           bind:value={inValue}
           on:change="{checkInput}">
</label>


<style>
    input[type="time"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
    }

    .main-theme-dark input[type="time"]::-webkit-calendar-picker-indicator {
        filter: invert(0.9);
    }
</style>