<script>

    /**
     * Provides common page header information.
     *
     * @module PageHeader
     * @memberOf App
     * @locus Client
     *
     * @param {Object} header
     * @param {String} header.title
     * @param {String} header.lead
     * @param {String} header.body
     */

    //* props
    export let header = {};

</script>


<header class="page-header">
    {#if header.title}
        <h1>{header.title}</h1>
    {/if}

    {#if header.subtitle}
        <p class="sub-title">{header.subtitle}</p>
    {/if}

    {#if header.body}
        {#if !header.subtitle}<p></p>{/if}
        <p>{@html header.body}</p>
    {/if}
</header>
