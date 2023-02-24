<script>
    /**
     * Component for displaying a wiki table of contents.
     *
     * @name wiki_toc
     * @memberOf Pages:learn
     * @locus Client
     *
     * @param {Array}   tocTitles - tiered (up to 3) list of titles
     * @param {String}  tocHeader - header text for ToC box
     * @param {String}  pageid - page id
     *
     * @fires 'getpage' with string = id of page to fetch
     *
     */

    //* props
    export let tocHeader = "";
    export let tocTitles = [];
    export let pageid = "";

    //* support Functions
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

</script>




<article class="card" data-tp_wiki_toc>
    <header class="is-secondary">
        <h2 >{tocHeader}</h2>
    </header>

    <div class="toc-content">

        <ul class="cleanList">
            {#each tocTitles as title (title._id)}
                <li>
                    <a id="{title._id}"
                       class="is-text-semibold add-cursor"
                       class:active={title._id === pageid}
                       on:click="{() => dispatch('getpage', title._id)}">

                        {title.name}
                    </a>

                    {#if title.children}

                        <ul class="cleanList">
                            {#each title.children as children (children._id)}
                                <li class="add-cursor" style="line-height: 1.2;">

                                    <a id="{children._id}"
                                       class:active="{children._id === pageid}"
                                       on:click="{() => dispatch('getpage', children._id) }">
                                        {children.name}
                                    </a>

                                    {#if children.children && children.children.length > 0}
                                        <ul class="cleanList" style="line-height: 1;">
                                            {#each children.children as children2 (children2._id)}
                                                <li class="add-cursor">
                                                    <a id="{children2._id}"
                                                       class:active="{children2._id === pageid}"
                                                       on:click="{() => dispatch('getpage', children2._id) }">
                                                        {children2.name}
                                                    </a>
                                                </li>
                                            {/each}
                                        </ul>
                                    {/if}

                                </li>
                            {/each}
                        </ul>

                    {/if}

                    <hr />

                </li>
            {/each}
        </ul>

    </div>
</article>


<style>
    .toc-content {
        margin-left: -0.75rem;
    }

    .cleanList {
        margin: 1rem 0;
    }

    .cleanList ul {
        margin: 0;
    }

    .cleanList li {
        list-style: none;
    }

    .cleanList li a {
        color: var(--tertiary);
    }

    .cleanList li a.active {
        color: var(--text-darker);
        font-weight: 600;
    }

</style>
