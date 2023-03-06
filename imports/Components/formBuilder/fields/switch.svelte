<script>
    /**
     * @summary Checkbox with switch css.
     *
     * @module switch
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field with field.params.isCheck ? true = checkbox : else = toggle
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
    let formText = getContext("formText");

    //* local reactive variable
    let inValue = false;
    const tag = formText ? formText[field.field]?.tag ?? "" : "Undefined Tag";
    const label = formText ? formText[field.field]?.label ?? "" : "Undefined Field Label";

    $: setValue(field.value);


    //* Functions that mutate local variables
    function setValue(val){
        inValue = val;
    }

    function clickSwitch(){
        inValue = !inValue;

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: errorVal} with boolean
         */
        dispatch('on-inputentry', {value: inValue, error: false} );
    }

</script>



<label class="field--switch {error} {className} {field.css || ''}">
    <span>{label}</span>
    <span class="switch">
        <input type="checkbox"
               {...field.attributes}
               bind:checked={inValue}
               on:click|stopPropagation="{clickSwitch}">

        <span>{tag}</span>
    </span>
</label>