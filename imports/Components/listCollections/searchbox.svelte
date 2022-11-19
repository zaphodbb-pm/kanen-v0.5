<script>
    /**
     * Builds a string to be used by various search mechanisms.
     *
     * @module searchbox
     * @memberOf Components:list
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
    import searchBoxText from '/imports/client/setup/textSearch'

    //* local reactive variables
    let helpText = i18n(searchBoxText, "helpText");
    let label = i18n(searchBoxText, "label");
    let searchchars = "";
    let showIcon = !!helpText;
    let showHelp = false;

    onMount( () => {
        changesearch();
    });


    function changesearch() {
        searchchars = searchchars.replace(/ /g, '');            // remove all white spaces
        let query = searchchars.length > 2 ? buildQuery(searchchars, fields) : {};

            /**
             * @event search-changed
             * @type {Object} - {search: string, query: object}
             */

        dispatch('search-changed', {search: searchchars, query: query});
    }

</script>



<div style="flex-wrap: nowrap; max-width: 75%;">

    <div class="has-field-addons">
        <button type="button" class="is-secondary-outlined" aria-label="icon only">
            <span class="icon-bg-search is-medium"></span>
        </button>

        <label class="is-fullwidth">
            <span>{label}</span>
            <input type="text"
                   class="input"
                   bind:value="{searchchars}"
                   on:keyup="{changesearch}"
                   aria-label="search field"
                   title="search">
        </label>

        {#if showIcon}
            <a class="button is-info is-outlined" on:click="{() => {showHelp = !showHelp;} }">
                <span class="icon-bg-help"></span>
            </a>
        {/if}
    </div>

    {#if showHelp}
        <div transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">
            <p>{@html helpText}</p>
        </div>
    {/if}

</div>