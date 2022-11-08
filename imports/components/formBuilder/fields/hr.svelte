<script>
    /**
     * Horizontal divider component.
     *
     * @module hr
     * @memberOf Components:form
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error - class to show a field in error
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";

    //* support functions
    import {getContext} from 'svelte'
    let formText = getContext("formText");
    let tag = formText[field.field] && formText[field.field].tag ? formText[field.field].tag : "";

</script>



<div class="divider-box">
    <div class="divider" data-content="{tag}" style="margin-bottom: 0;"></div>
</div>
