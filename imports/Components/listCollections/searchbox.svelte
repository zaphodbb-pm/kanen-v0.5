<script>
    /**
     * Builds a string to be used by various search mechanisms.
     *
     * @module searchbox
     * @memberOf Components:listCollections:
     * @locus Client
     *
     * @fires 'search-changed'
     *
     */

    //* props
    export let fields = [];

    //** support Functions
    import {onMount} from 'svelte';
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {buildQuery} from './func-buildQuery'
    import {i18n} from '/imports/Functions/utilities/i18n'
    import searchBoxText from '/imports/client/text_search'

    //* local reactive variables
    let helpText = i18n(searchBoxText, "helpText");
    let label = i18n(searchBoxText, "label");
    let searchchars = "";
    let showIcon = !!helpText;
    let showHelp = false;
    let timer;

    onMount( () => {
        changesearch();
    });


    function changesearch() {
        clearTimeout(timer);

        timer = setTimeout(() => {
            searchchars = searchchars.trim().replace(/\s+/g, ' ');            // remove redundant white spaces

            let query = searchchars.length > 2 ? buildQuery(searchchars, fields) : {};

            /**
             * @event search-changed
             * @type {Object} - {search: string, query: object}
             */

            dispatch('search-changed', {search: searchchars, query: query});

        }, 500);
    }

</script>



<div style="flex-wrap: nowrap; max-width: 75%;">

    <div class="has-field-addons">
        <button type="button" class="is-primary-outlined" aria-label="icon only">
            <span class="icon-bg-search is-medium"></span>
        </button>

        <label class="is-fullwidth">
            <span>{label}</span>
            <input type="text"
                   class="input"
                   bind:value="{searchchars}"
                   on:input="{changesearch}"
                   aria-label="search field"
                   title="search">
        </label>

        {#if showIcon}
            <button type="button" class="is-secondary-outlined" on:click="{() => {showHelp = !showHelp;} }" aria-label="search a collection">
                <span class="icon-bg-help is-medium"></span>
            </button>
        {/if}
    </div>

    {#if showHelp}
        <div transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">
            <p>{@html helpText}</p>
        </div>
    {/if}

</div>