<script>
    /**
     * Field component for colour picker.
     *
     * @memberOf Components:Form
     * @function colourPicker
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} with object
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

    //* event handlers
    function checkInput(){
        dispatch('on-inputentry', {value: inValue, error: false});
    }

</script>



<label class="select">
    <span>{label}</span>

    <input type="color"
           name="color_field"
           {...attributes}
           bind:value={inValue}
           on:change="{checkInput}">
</label>