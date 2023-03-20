<script>
    /**
     * Builds pagination bar.
     *
     * @module pagination
     * @memberOf Components:listCollections:
     * @locus Client
     *
     * @param  {Number} rows
     * @param  {Number} totalDocs
     *
     * @fires page-changed
     *
     */

    //* props
    export let rows = 10;
    export let totalDocs = 0;

    //** support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* local reactive variables
    let more= false;
    let showPages= true;
    let pages= 1;
    let items= [];
    let currPage= 1;
    let pagesLength= 5                  // sets the number of pagination targets
    let totPages = 1;
    let len = 1;


    $: {
        totPages = Math.ceil(totalDocs / rows);
        len = totPages < pagesLength ? totPages : pagesLength;

        pages = totPages;
        items = [...Array(len).keys()].map(x => ++x);
        more = totPages > pagesLength;
        showPages = (totPages > 1);
    }

    //* event handler
    function changepager(page) {
        currPage = page;

        /**
         * @event page-changed
         * @type {Object}
         */
        dispatch('page-changed', {
            page: page
        });
    }

    //* Functions that mutate local variables
    function prev() {
        if (currPage > 1) {
            currPage = currPage - 1;
            changepager(currPage);

            if (currPage >= pagesLength) {
                items.unshift(currPage + 1 - pagesLength);
                items = items.slice(0, -1);
            }
        }
    }

    function next() {
        if (currPage < pages) {
            currPage = currPage + 1;
            changepager(currPage);

            if (currPage > pagesLength) {
                let maxPage = currPage < pages ? currPage : pages;

                items.shift();
                items = [... items, maxPage];
            }
        }
    }

</script>


<div class="space-block-vert">
    <nav class="pagination is-centered is-small" aria-label="pagination">
        {#if showPages}

            <ul>
                {#if more}
                    <li class="prev"><a on:click="{() => prev() }">&lt;</a></li>
                {/if}

                {#each items as item}
                    <li>
                        <a class="{ item === currPage ? 'is-current':  ''}"  on:click="{() => changepager(item) }" aria-label="{currPage}" aria-current="page">
                            {item}
                        </a>
                    </li>
                {/each}

                {#if more}
                    <li class="next"><a on:click="{() => next() }">&gt;</a></li>
                {/if}
            </ul>

        {/if}
    </nav>
</div>