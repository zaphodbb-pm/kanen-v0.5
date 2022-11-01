<script>
    /**
     * Generic insert loader for pages.
     *
     * @memberof Pages:LogsSystem
     * @function logsSystem_loader
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

<Loadable loader={() => import('./logsSystem.svelte')} {currentRoute} {params} {query}/>
