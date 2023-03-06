<script>
    /**
     * Field component for colour picker.
     *
     * @module colourPicker
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
    import {createEventDispatcher, getContext} from 'svelte';

    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText ? formText[field.field]?.label ?? "" : "Undefined Field Label";


    //* local reactive variable
    let inValue = "";
    let attributes = field.attributes;

    $: setValue(field.value);


    //* Functions that mutate local variables
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



<label class="field--colour-picker {error} {className} {field.css || ''}">
    <span>{label}</span>

    <input type="color"
           name="color_field"
           {...attributes}
           bind:value={inValue}
           on:input="{checkInput}">
</label>