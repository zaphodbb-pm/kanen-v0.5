<script>
    /**
     * Api key builder.
     *
     * @module apikey
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error
     * @param {String} className
     *
     * @fires 'on-inputentry'
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

    //* support Functions
    import {generateId} from '/imports/Functions/utilities/generateId'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";

    //* local reactive variable
    let keyValue = "";

    $: setValue(field.value);

    //* Functions that mutate local variables
    function setValue(val){
        keyValue = val;
    }

    //* event handlers
    function setkey() {
        keyValue = generateId(field.params.length);

        /**
         * @event on-inputentry
         * @type {Object} - {value: keyValue, error: false}
         */
        dispatch('on-inputentry', {value: keyValue, error: false}  );
    }

</script>


<div class="field--api-key has-field-addons {error} {className} {field.css || ''}">
    <button type="button" class="is-primary" on:click={setkey} title="{field.field}">
        <span class="icon-bg-key is-medium"></span>
    </button>

    <label class="is-fullwidth">
        <span>{label}</span>

        <input type="text" class="input"
               {...field.attributes}
               bind:value="{keyValue}">

    </label>
</div>