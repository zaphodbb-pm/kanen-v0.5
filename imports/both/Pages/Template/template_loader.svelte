<script>
    /**
     * Generic svelte component loader as a shim to insert page controller.
     *
     * @memberof Pages:Template
     * @function template_loader
     * @locus Client
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


    /* setup props to receive route data and pass down into page component */
    /** @type {Object} **/
    export let currentRoute;

    /** @type {Object} **/
    export let params;

    //* get svelte component loader
    /** @type { import('svelte-loadable')} **/
    import Loadable from 'svelte-loadable';
</script>

<Loadable loader={() => import('./template.svelte')} {currentRoute} {params} />
