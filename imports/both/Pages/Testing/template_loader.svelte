<script>
    /**
     * Generic svelte component loader as a shim to insert page controller.
     *
     * @name template_loader
     * @module
     * @memberOf Pages:template
     * @locus Client
     *
     * @param {String} currentRoute - page path name
     * @param {Object} params - any parameters from path url
     * @param {Object} query - any query fragment from path url
     *
     * @see {@link https://github.com/kaisermann/svelte-loadable}
     *
     * @notes
     *  1. This loader helps reduce the initial bundle size sent to the browser.
     *  2. This loader is optional and can be removed at the <page>_route.js file.
     *  3. Each page can have either a loader to dynamically import it (if the page is heavy) or
     *      be part of the initial bundle for snappier response.  Your choice.
     *  4. Since "import" and "webpack" don't play well with variables, we need to
     *      be pedantic with building a loader file per page that has a static file name.
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

<Loadable loader={() => import('./template.svelte')} {currentRoute} {params} {query}/>
