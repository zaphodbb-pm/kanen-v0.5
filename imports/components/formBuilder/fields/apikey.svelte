<script>
    /**
     * Api key builder.
     *
     * @memberof Components:Form
     * @function apikey
     * @locus Client
     * @isTemplate true
     * @augments fieldWrapper
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
    import Icon from '/imports/components/elements/icon/icon.svelte'
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
            <Icon icon='{getContext("iconApiKey")}' class="text-1dot5rem"/>
        </a>
    </div>

    <div class="control is-expanded">
        <input type="text" class="input"
               {...field.attributes}
               bind:value="{keyValue}">
    </div>
</div>
