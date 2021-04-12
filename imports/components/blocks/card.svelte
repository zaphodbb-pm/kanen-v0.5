<script>

    /**
     * Component block: card.
     *
     * @memberof Components:Blocks
     * @function card
     * @locus Client
     *
     * @emits 'footEvent' - {item: id, key: key, label: label}
     */

    //* setup props to receive component data
    export let text;            // text object; child of pageText.components
    export let id;              // unique component id

    //* get the user language preference from store and text from context
    import {i18n} from "../../functions/utilities/i18n.mjs";
    import {lang} from "../../client/systemStores.js";

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function footEvent(id, key, label){
        dispatch("footEvent", {item: id, key: key, label: label} );
    }

</script>


<article class="card {id ? id : ''}">
    {#if text.title}
        <header class="card-header">
            <p class="card-header-title">{i18n(text, "title", $lang)}</p>
        </header>
    {/if}

    {#if text.image}
        <div class="card-image">
            <figure class="image is-3by1">
                <img src={text.image} alt="Placeholder">
            </figure>
        </div>
    {/if}

    <div class="card-content">
        <slot> </slot>
    </div>

    {#if text.footer }
        <footer class="card-footer">
            {#each i18n(text, "footer", $lang) as foot, idx}
                <a href="#!"
                   class="card-footer-item"
                   on:click|preventDefault={ () => footEvent(id, idx, foot) }>

                    {foot}
                </a>
            {/each}
        </footer>
    {/if}
</article>
