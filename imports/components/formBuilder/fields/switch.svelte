<script>
    /**
     * @summary Checkbox with switch css.
     *
     * @module switch
     * @memberOf Components:Form
     * @locus Client
     *
     * @param {Object} field with field.params.isCheck ? true = checkbox : else = toggle
     * @param {String} error
     * @param {String} className
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} with boolean
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import {getContext} from 'svelte'
    let formText = getContext("formText");

    //* local reactive variable
    let inValue = false;
    const tag = formText[field.field] && formText[field.field].tag ? formText[field.field].tag : "";
    const label = formText[field.field] && formText[field.field].label ? formText[field.field].label : "";

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        inValue = val;
    }

    function clickSwitch(){
        inValue = !inValue;
        dispatch('on-inputentry', {value: inValue, error: false} );
    }

</script>



<label class="{error} {className} {field.css || ''}">
    <span>{label}</span>
    <span class="switch">
        <input type="checkbox"
               {...field.attributes}
               bind:checked={inValue}
               on:click|stopPropagation="{clickSwitch}">

        <span>{tag}</span>
    </span>
</label>