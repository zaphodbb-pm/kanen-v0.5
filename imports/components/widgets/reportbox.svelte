<script>

    /**
     * Report box with optional image and optional progress bar.
     *
     * @module reportbox
     * @memberOf Components:adminPanel
     *
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


     /** @example
     * config: Object: used to set up the widget at the start
     *      {
     *          decimals: 1                     // set number of decimal points to show
     *
     *          //* widget css related decoration
     *          icon: "iconPost,                // widget's icon if needed
     *          height: 12,                     // widget height in "rem"
     *
     *          //* colour controls at selected trigger points
     *          //* if array, background colors for reactive response to values; if String, colour is fixed
     *          bgColours: [NORMAL, WARN, DANGER],
     *          bgNormal: [0, .66],             // percent range of values for normal operation
     *          bgWarning: [.66, .80],          // percent range of values for warning operation
     *      }
     *
     * text: static widget text object
     *      {
     *          title: "Big Box 2",             // main title for widget
     *          barText: "",                    // if string has length, then show progress bar, else hide
     *          prefix: "$"                     // prefix added to incoming value for display
     *          suffix: "Em",                   // suffix added to incoming value for display
     *      }
     *
     * payload:
     *      {                                   // Object: incoming or outgoing flow-message format from subscribe reactive variable
     *          values: [75],                   // array of values to show
     *          maxValues: [120],               // array of max values allows for conversion to % progress
     *      },
     */


    //* props
    export let text = {};
    export let config = {};
    export let payload = {};

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* get accessory components
    //import { getContext } from 'svelte';

    //* support functions
    import {toDecimals} from '/imports/functions/formatters/toDecimals'
    //import {adjustHexColor} from '/imports/functions/supportDOM/adjustHexColor'
    //import {setBackground} from '/imports/functions/supportDOM/setBackground'
    //let height = config && config.height ? config.height : 6;


    let normalizedValue = payload.value / (payload.max || payload.value) * 100 ;


    let value = toDecimals(normalizedValue || 0, 0);
    let max = toDecimals(normalizedValue, 0);
    let rawValue = toDecimals(payload.value, 1);



    let notification = selectReportThreshold(normalizedValue, config.lowThreshold, config.highThreshold);


    console.log("values", payload.value, payload.max, normalizedValue, value);



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




    /*
    //* component controls
    function styleBox() {
        let scale = !!text.barText ? 4.9 : 3.5;
        let bg = !!text.barText ? setBG() : "#F8F8F8";

        return `background: ${bg}; color: ${adjustHexColor(bg, 0).text};
                font-size: ${Math.round(height / scale * 100) / 100}rem;`
    }

    function styleIcon() {
        return `font-size: ${height * 0.75}rem; height: ${height}rem; width: ${height}rem; background-color: ${!!text.barText ? "" : setBG()};`
    }

    function setBG() {
        return setBackground(config, payload, progessValue() );
    }

    function progessValue() {
        if (payload) {
            let num = payload.values ? payload.values : 0;
            num = num && Array.isArray(num) ? num[0] : num;

            //*** adjust number of fraction digits
            let decimals = config.decimals ? config.decimals : 1;
            decimals = num && num > 1 ? 1 : decimals;
            decimals = num && num > 100 ? 0 : decimals;

            return toDecimals(num, decimals);
        } else {
            return 0;
        }
    }

    function progBarVal() {
        if (payload) {
            let denom = payload.maxValues ? payload.maxValues : 1;
            denom = denom && Array.isArray(denom) ? denom[0] : denom;
            let pc = Math.round(progessValue() / denom * 100);
            return {width: pc + "%", style: `width: ${pc}%`}
        } else {
            return {width: 0, style: `width: 0%`};
        }
    }


     */
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




<!--
<figure class="reportbox [report-success report-warning report-danger] ">
    <figcaption class="sr-only">Default Report Box</figcaption>
    <div><span class="icon-bg-cloud-download"></span></div>
    <p>
        <span>Bookmarks</span>
        <span>12</span>
    </p>
</figure>
-->



<!--
<div class="infobox d-flex" style="{styleBox()}">

    <div class="style-box-icon" style="{styleIcon()}">
        <Icon icon={getContext(config.icon_old)} />
    </div>

    <div class="info-content">
        <div class="info-label has-text-centered"><b>{text.title}</b></div>
        <div class="info-value has-text-centered"><b>{text.prefix}{progessValue()}{text.suffix}</b></div>

        {#if text.barText}
            <div>
                <div class="progress-box">
                    <div class="progress-bar" style="{progBarVal().style}"></div>
                </div>

                <div class="progress-label">{progBarVal().width} {text.barText}</div>
            </div>
        {/if}
    </div>

</div>




<style>

    .style-box-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .info-content {
        flex-grow: 1;
        color: inherit;
    }

    .info-label {
        font-size: calc(0.9rem + 0.1em);
        padding-left: 0.5rem;
        padding-top: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        color: inherit;
    }

    .info-value {
        padding-left: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        color: inherit;
    }

    .progress-box {
        width: 100%;
        margin-top: 0.25em;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .progress-bar {
        height: 0.25rem;
        background-color: white;
    }

    .progress-label {
        font-size: calc(0.8rem + 0.1em);
        padding-top: 0.25em;
        padding-left: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        color: #FFF;
    }
</style>
-->