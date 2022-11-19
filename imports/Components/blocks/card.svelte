<!--suppress ReservedWordAsName -->
<script>

    /**
     * Component block: card.  Uses a slot to allow for a body to be set by parent.
     *
     * @module card
     * @memberOf Components:blocks
     * @locus Client
     *
     * @fires footEvent
     */

    //* setup props to receive component data
    export let text;        // text object; child of pageText.Components; already language adjusted
    export let id = "";     // unique component id

    let className = ''
    // noinspection ReservedWordAsName
    export { className as class }

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function footEvent(id, key, label){
        /**
         * @event footEvent
         * @type {object} - {item: id, key: key, label: label}
         */

        dispatch("footEvent", {item: id, key: key, label: label} );
    }

</script>




<article class="card {className}" id="{id ? id : ''}">
    {#if text.image}
        <figure>
            <img class="has-aspect-3x1" src={text.image} alt={text.altImage || ''}>
        </figure>
    {/if}

    {#if text.title}
        <header>
            <h3>{text.title}</h3>
            {#if text.subtitle}
                <p>{text.subtitle}</p>
            {/if}
        </header>
    {/if}

    <div>
        <slot> </slot>
    </div>

    {#if text.footer}
        <footer>
            {#each text.footer as foot, idx}
                <button type="button" class="{foot.class}" on:click={ () => footEvent(id, idx, foot.text) }>
                    {foot.text}
                </button>
            {/each}
        </footer>
    {/if}
</article>