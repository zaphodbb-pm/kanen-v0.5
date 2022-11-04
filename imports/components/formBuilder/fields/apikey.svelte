<script>
    /**
     * Api key builder.
     *
     * @module apikey
     * @memberOf Components:form
     * @locus Client
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

    //* support functions
    import {generateId} from '/imports/functions/utilities/generateId'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

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



<div class="field has-addons">
    <div class="control">
        <a class="button is-primary" on:click="{setkey}">
            <span class="icon-bg-key is-medium"></span>
        </a>
    </div>

    <div class="control is-expanded">
        <input type="text" class="input"
               {...field.attributes}
               bind:value="{keyValue}">
    </div>
</div>
