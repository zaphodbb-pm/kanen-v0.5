<script>

    /**
     * Report box with optional image and optional progress bar.
     *
     * @module reportbox
     * @memberOf Components:widgets
     * @locus Client
     *
     * @param {Object} text - widget text strings
     * @param {String} text.title - box title
     * @param {String} text.srCaption -  screen reader only caption title
     * @param {String} text.progLabel -  label for optional progress bar
     * @param {String} text.valPrefix -  optional value prefix (often currency symbol)
     * @param {String} text.valSuffix -  optional value suffix (often currency symbol)
     * @param {String} text.progSuffix - optional progress value suffix (default % )
     *
     * @param {Object}  config - widget setup information
     * @param {Boolean} config.isProgress - signal that optional progress bar is to be enabled
     * @param {String}  config.icon - box key icon (optional)
     * @param {String}  config.image - box key image (optional)
     * @param {String}  config.alt - box key image alt text (optional)
     * @param {Number}  config.lowThreshold - optional percent cutoff value for 'red' notification; default 30%
     * @param {Number}  config.highThreshold - optional percent cutoff value for 'yellow' notification else 'green'; default 70%
     *
     * @param {Object} payload - widget values to display
     * @param {Number} payload.value - main value of interest
     * @param {Number} payload.max - max value to normalize key value into percent
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
    import {toDecimals} from '/imports/functions/formatters/toDecimals'

    let normalizedValue = payload.value / (payload.max || payload.value) * 100 ;
    let value = toDecimals(normalizedValue || 0, 0);
    let max = toDecimals(normalizedValue, 0);
    let rawValue = toDecimals(payload.value, 1);
    let notification = selectReportThreshold(normalizedValue, config.lowThreshold, config.highThreshold);


    /* support functions */
    function selectReportThreshold(value, lowThreshold = 30, highThreshold = 70){
        if( value > highThreshold){
            return "report-success";
        }else if(value > lowThreshold){
            return "report-warning";
        }else{
            return "report-danger"
        }
    }

</script>




<figure class="reportbox {notification || ''} {className}">
    <figcaption class="sr-only">{text.srCaption || ''}</figcaption>

    {#if config.image}
        <img src="{config.image}" alt="{config.alt || ''}" loading="lazy">
    {:else}
        <div><span class="{config.icon || 'icon-bg-alert-warning'}"></span></div>
    {/if}

    {#if config.isProgress}
        <label>
            <span>{text.title}</span>
            <span>{text.valPrefix || ''}{rawValue}{text.valSuffix || ''}</span>
            <progress value="{value}" max="100">{value}{text.progSuffix || '%'}</progress>
            <span>{value}{text.progSuffix || '%'} {text.progLabel}</span>
        </label>

    {:else}
        <p>
            <span>{text.title}</span>
            <span>{text.valPrefix || ''}{rawValue}{text.valSuffix || ''}</span>
        </p>
    {/if}
</figure>