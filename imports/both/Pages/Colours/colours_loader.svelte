<script>
    /**
     * Generic insert loader for pages.
     *
     * @name colours_loader
     * @module
     * @memberOf Pages:colours
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

<Loadable loader={() => import('./colours.svelte')} {currentRoute} {params} {query}/>
