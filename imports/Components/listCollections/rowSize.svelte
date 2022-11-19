<script>
    /**
     * Builds row selector and documents count.
     *
     * @module rowSize
     * @memberOf Components:list
     * @locus client
     *
     * @param  {Object} config - decoration for row selector
     * @param  {String} label
     *
     * @fires 'row-changed'
     *
     */

    //** support Functions
    import {getContext} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variables
    let opts = [10, 15, 20, 30, 50, 100];           // sets the row length per page selection
    let initval = 10;                               // set initial rows / page


    //* event handlers
    function changerow() {
        /**
         * @event row-changed
         * @type {Object} - {row: initval}
         */
        dispatch('row-changed', {
            row: initval
        });
    }

</script>



<div class="has-field-addons has-width-10rem">
    <button class="is-secondary-outlined" aria-label="icon only">
        <span class="icon-bg-list is-medium"></span>
    </button>

    <label class="has-width-8rem">
        <select bind:value="{initval}" on:change="{changerow}">
            {#each opts as option}
                <option>{option}</option>
            {/each}
        </select>
    </label>
</div>







<!--
<div class="field has-addons">
    <div class="control">
        <a class="button is-static">
            <span><span class="icon-bg-list is-medium"></span></span>
        </a>
    </div>

    <div class="control">
        <span class="select">
            <select bind:value="{initval}" on:change="{changerow}">
                {#each opts as option}
                    <option>{option}</option>
                {/each}
            </select>
        </span>
    </div>
</div>
-->