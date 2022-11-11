<script>
    /**
     * Field component for colour picker.
     *
     * @module colourPicker
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

    //* event handlers
    function checkInput(){

        /**
         * @event on-inputentry
         * @type {object} - {value: keyValue, error: false}
         */
        dispatch('on-inputentry', {value: inValue, error: false});
    }

</script>



<label class="select {error}">
    <span>{label}</span>

    <input type="color"
           name="color_field"
           {...attributes}
           bind:value={inValue}
           on:change="{checkInput}">
</label>