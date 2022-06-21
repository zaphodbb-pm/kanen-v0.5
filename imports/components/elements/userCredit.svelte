<script>

    /**
     * User Credit element
     *
     * @memberof Components:Elements
     * @function userCredit
     * @locus Client
     * @augments Navbar
     *
     */

    //* props
    export let text = {};

    //* support files
    import {userExtras} from "../../client/systemStores.mjs";
    import Icon from "./icon/icon.svelte"

    import { getContext } from 'svelte';

    console.log("userExtras", $userExtras);

    //$: console.log("userExtras", $userExtras);

    //* local reactive variables
    let credit = 0;

    $: credit = ($userExtras?.credits ?? 0).toFixed(0);

</script>



<div class="tags has-addons">
    <data class="tag" value={credit}></data>

    {#if text.credits}
        <data class="tag is-secondary" value={text.credits}></data>
    {:else}
        <data class="tag is-secondary" value="">
            <Icon icon={getContext("iconCredits")} class=""/>
        </data>
    {/if}
</div>
