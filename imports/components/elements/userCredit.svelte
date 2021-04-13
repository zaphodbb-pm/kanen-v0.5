<script lang="ts">

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
    import {userExtras} from "../../client/systemStores.js";
    import Icon from "../../../imports/components/elements/icon.svelte"

    import { getContext } from 'svelte';

    console.log("userExtras", $userExtras);



    //$: console.log("userExtras", $userExtras);

    //* local reactive variables
    let credit = 0;

    $: credit = ($userExtras?.credits ?? 0).toFixed(0);


</script>


<article class="user-credit navbar-item">

    <div class="tags has-addons">
        <span class="tag is-light has-text-weight-semibold is-medium">{credit}</span>

        <span class="tag is-info is-medium is-hidden-mobile">
            {#if text.credits}
                {text.credits}
            {:else}
                <Icon icon={getContext("iconCredits")} class=""/>
            {/if}

        </span>
    </div>

</article>
