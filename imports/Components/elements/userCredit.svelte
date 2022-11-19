<script>

    /**
     * User Credit element
     *
     * @module userCredit
     * @memberOf Components:
     * @locus Client
     *
     */

    //* props
    export let text = {};

    //* support files
    import {userExtras} from "../../client/systemStores.mjs";

    //* local reactive variables
    let credit = 0;

    $: credit = ($userExtras?.credits ?? 0).toFixed(0);

</script>



<div class="tags is-compound" role="note" aria-label="Compound tag">
    <span class="tag is-secondary">{credit}</span>

    {#if text.credits}
        <span class="tag">{text.credits}</span>
    {:else}
        <span class="tag is-secondary">
            <span class="icon-bg-bell"></span>
        </span>
    {/if}
</div>
