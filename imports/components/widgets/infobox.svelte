<script>
    /**
     * Information box with optional image and optional progress bar.
     *
     * @module reportbox
     * @memberOf Components:widgets
     * @locus Client
     *
     * @param {Object} text - widget text strings
     * @param {String} text.title - box title
     * @param {String} text.srCaption -  screen reader only caption title
     * @param {String} text.prefix -  optional value prefix (often currency symbol)
     * @param {String} text.suffix -  optional value suffix (often currency symbol)
     * @param {String} text.separator - optional number thousands separator (default is comma ',')
     * @param {String} text.footer - footer title
     * @param {String} text.url - language specific target url
     *
     * @param {Object}  config - widget setup information
     * @param {String}  config.icon - box key icon (optional)
     * @param {String}  config.image - box key image (optional)
     * @param {String}  config.alt - box key image alt text (optional)
     * @param {String}  config.type - box type: primary, secondary or tertiary
     *
     * @param {Object} payload - widget values to display
     * @param {Number} payload.value - main value of interest
     *
     * @param {String} className - optional top level css controls
     *
     */


    //* props
    export let text = {};
    export let config = {};
    export let payload = {};

    let className;
    // noinspection ReservedWordAsName
    export { className as class };


    //* support functions
    import {numString} from "../../functions/formatters/numString";

    let value = numString(payload.value, text.separator || ',');

</script>



<figure class="infobox {'infobox-' + (config.type || 'default')} {className}">
    <figcaption class="sr-only">{text.srCaption || ''}</figcaption>

    <div>
        <p>
            <span>
                {#if text.prefix}<sub>{text.prefix}</sub>{/if}{value}{#if text.suffix}<sup>{text.suffix}</sup>{/if}
            </span>
            <span>{text.title}</span>
        </p>

        {#if config.image}
            <img src="{config.image}" alt="{config.alt || ''}" loading="lazy">
        {:else}
            <div><span class="{config.icon || 'icon-bg-alert-warning'}"></span></div>
        {/if}
    </div>

    {#if text.footer}
        <a href="{text.url}">
            <span>{text.footer}</span>
        </a>
    {/if}
</figure>
