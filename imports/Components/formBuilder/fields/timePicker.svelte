<script>
    /**
     * Time picker component based on input time.
     *
     * @module timePicker
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error
     * @param {String} className
     * @param fieldText {Object}
     *
     * @fires on-inputentry
     *
     */

        //* common props from parent
    export let field = {};
    export let error = "";
    export let fieldText;

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const label = fieldText?.label ?? "n/a";


    //* local reactive variable
    let inValue = "";
    let attributes = field.attributes;

    $: setValue(field.value);


    //* Functions that mutate local variables
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
           on:input="{checkInput}">
</label>


<style>
    input[type="time"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
    }

    .main-theme-dark input[type="time"]::-webkit-calendar-picker-indicator {
        filter: invert(0.9);
    }
</style>