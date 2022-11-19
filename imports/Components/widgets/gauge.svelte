<script>

    /**
     * Circular gauge meter.
     *
     * @module gauge
     * @memberOf Components:widgets
     * @locus Client
     *
     * @param {Object} text - widget text strings
     * @param {String} text.title - box title
     * @param {String} text.suffix -  optional value suffix (often currency symbol)
     *
     * @param {Object}  config - widget setup information
     * @param {Boolean} config.gauge - gauge type, one of: donut, ring or meter
     * @param {String}  config.type - box type: primary, secondary or tertiary, success, warning, danger
     * @param {Boolean} config.isRelative - calculate percent to show from value and max
     *
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


    //* support Functions
    import {toDecimals} from '/imports/Functions/formatters/toDecimals'

    let normalizedValue = payload.value / (payload.max || payload.value) * 100 ;
    let value = config.isRelative ? toDecimals(normalizedValue || 0, 0) : payload.value;


    /* if thresholds have been set, then over-ride colour settings with progress settings */
    let calculateThreshold = !!(config.lowThreshold) && !!(config.lowThreshold);
    let notification = calculateThreshold ? selectThreshold(normalizedValue, config.lowThreshold, config.highThreshold) : "";


    /* support Functions */
    function selectThreshold(value, lowThreshold = 30, highThreshold = 70){
        if( value > highThreshold){
            return "gauge-success";
        }else if(value > lowThreshold){
            return "gauge-warning";
        }else{
            return "gauge-danger"
        }
    }

</script>



<figure class="gauge-{config.gauge} {'gauge-' + (config.type || 'default')} {notification} {className}">
    <data value="{payload.value || 0}" style="--gauge-value: {payload.value || 0}; --gauge-max: {payload.max || 100};">

        <span>{value}{#if text.suffix}<sup>{text.suffix}</sup>{/if}</span>
    </data>
    <figcaption>{text.title || ''}</figcaption>
</figure>