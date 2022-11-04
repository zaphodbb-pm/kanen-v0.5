<script>
    /**
     * Generic insert loader for pages.
     *
     * @name cards_loader
     * @module
     * @memberOf Pages:cards
     * @locus Client
     *
     */


    //* setup props to receive route data
    /** @type {Object} **/
    export let currentRoute;

    /** @type {Object} **/
    export let params = {};

    /** @type {Object} **/
    export let query = {};

    //* get svelte component loader
    /** @type { import('svelte-loadable')} **/
    import Loadable from 'svelte-loadable';

</script>

<Loadable loader={() => import('./cards.svelte')} {currentRoute} {params} {query}/>
