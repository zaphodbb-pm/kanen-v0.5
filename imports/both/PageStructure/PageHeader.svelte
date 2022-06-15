<script>

    /**
     * Provides common page header information.
     *
     * @memberof Structure:Client
     * @function PageHeader
     * @locus Client
     *
     * @param {Object} header
     * @param {String} header.title
     * @param {String} header.lead
     * @param {String} header.body
     */

    //* props
    export let header = null;

    //* get the user language preference from store and text from parent page prop
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/utilities/i18n'

    const text = header ? i18n(header, "", $lang) : {};
</script>


<header class="page-header">
    {#if text.title}
        <h1>{text.title}</h1>
    {/if}

    {#if text.subtitle}
        <p class="sub-title">{text.subtitle}</p>
    {/if}

    {#if text.body}
        <p>{@html text.body}</p>
    {/if}
</header>
