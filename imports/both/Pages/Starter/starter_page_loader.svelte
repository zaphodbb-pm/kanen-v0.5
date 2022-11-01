<script>
    /**
     * Generic insert loader for pages.
     *
     * @memberof Pages:Starter
     * @function starter_page_loader
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

<Loadable loader={() => import('./starter_page.svelte')} {currentRoute} {params} {query}/>
