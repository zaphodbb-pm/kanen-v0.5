<script>
    /**
     * Generic insert loader for pages.
     *
     * @name users_loader
     * @module
     * @memberOf Pages:users
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

<Loadable loader={() => import('./users.svelte')} {currentRoute} {params} {query}/>
