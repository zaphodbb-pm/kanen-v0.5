<script>
    /**
     * Generic insert loader for pages.
     *
     * @name home_loader
     * @module
     * @memberOf Pages:home
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

<Loadable loader={() => import('./home.svelte')} {currentRoute} {params} {query}/>
