<script>
    /**
     * Shows document count as range / total of search (total docs).
     *
     * @module docCount
     * @memberOf Components:list
     * @locus Client
     *
     * @param  {String} docCountLabel
     *
     */

    //* props
    export let docCountLabel = "";

</script>


<div class="level">
    <span class="icon-bg-file"></span>
    <span>{docCountLabel}</span>
</div>
