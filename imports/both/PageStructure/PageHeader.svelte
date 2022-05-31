<script>

    /**
     * Provides common page header information.
     *
     * @memberof Structure:Client
     * @function PageHeader
     * @locus Client
     *
     * @param {Object} header
     *
     */

    //* props
    export let header = null;

    //* get the user language preference from store and text from parent page prop
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/utilities/i18n'

    let text = header ? i18n(header, "", $lang) : null;

</script>


{#if text}
    <header class="page-header">
        {#if text.title}
            <h1>{text.title}</h1>
        {/if}

        {#if text.lead}
            <p class="sub-title">{text.lead}</p>
        {/if}

        {#if text.body}
            <p class="is-family-secondary">{@html text.body}</p>
        {/if}
    </header>
{/if}
