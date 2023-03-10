<script>
    /**
     * Horizontal divider component.
     *
     * @module hr
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error - class to show a field in error
     * @param {String} className
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";
    export let fieldText;

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support Functions
    const tag = fieldText?.tag ?? "n/a";


</script>



<div class="field--hr  divider-box  {className} {field.css || ''}">
    <div class="divider" data-content="{tag}" style="margin-bottom: 0;"></div>
</div>
