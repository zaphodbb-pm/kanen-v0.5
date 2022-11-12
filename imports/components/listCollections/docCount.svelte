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

    //** support functions
    import {getContext} from 'svelte';

</script>


<div class="level-start">
    <span><span class="{getContext('iconDo')} is-medium"></span></span>
    <span>{docCountLabel}</span>
</div>
