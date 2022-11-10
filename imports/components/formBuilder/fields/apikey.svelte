<script>
    /**
     * Api key builder.
     *
     * @module apikey
     * @memberOf Components:form
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error
     * @param {String} className
     *
     * @emits 'on-inputentry', {value: keyValue, error: false}
     *
     * @notes
     * 1. Restrict use to administrator to set api keys for users
     * 2. Uses window.crypto capability of modern browsers
     *
     */

    //* common props from parent
    export let field = {};
    export let error = ""

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support functions
    import {generateId} from '/imports/functions/utilities/generateId'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";

    //* local reactive variable
    let keyValue = "";

    $: setValue(field.value);

    //* functions that mutate local variables
    function setValue(val){
        keyValue = val;
    }

    //* event handlers
    function setkey() {
        keyValue = generateId(field.params.length);
        dispatch('on-inputentry', {value: keyValue, error: false}  );
    }

</script>


<div class="has-field-addons {error}">
    <button type="button" class="is-primary" on:click={setkey}>
        <span class="icon-bg-key is-medium"></span>
    </button>

    <label class="is-fullwidth">
        <span>{label}</span>

        <input type="text" class="input"
               {...field.attributes}
               bind:value="{keyValue}">

    </label>
</div>