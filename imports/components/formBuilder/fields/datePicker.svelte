<script>
    /**
     * Date picker component based on input date.
     *
     * @memberOf Components:form
     * @function datePicker
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} with text date string
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";

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
        dispatch('on-inputentry', {value: inValue, error: false});
    }


</script>


<label class="select">
    <span>{label}</span>

    <input type="date"
           {...attributes}
           bind:value={inValue}
           on:change="{checkInput}">
</label>


<style>
    input[type="date"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
    }

    .main-theme-dark input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(0.9);
    }
</style>