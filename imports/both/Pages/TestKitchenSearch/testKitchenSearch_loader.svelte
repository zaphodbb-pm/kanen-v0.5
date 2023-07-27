<script>
    /**
     * Generic insert loader for pages.
     *
     * @name testKitchenSearch_loader
     * @module
     * @memberOf Pages:testKitchenSearch
     * @locus Client
     *
     * @param {String} currentRoute - page path name
     * @param {Object} params - any parameters from path url
     * @param {Object} query - any query fragment from path url
     *
     */


        //* setup props to receive route data
    export let currentRoute;
    export let params = {};
    export let query = {};

    //* get svelte component loader
    /** @type { import('svelte-loadable')} **/
    import Loadable from 'svelte-loadable';

</script>

<Loadable loader={() => import('./testKitchenSearch.svelte')} {currentRoute} {params} {query}/>
