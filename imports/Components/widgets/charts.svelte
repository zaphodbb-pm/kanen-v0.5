<script>

    /**
     * CSS driven charts from a standard table element.
     *
     * @module charts
     * @memberOf Components:widgets:
     * @locus Client
     *
     * @param {Object} text - widget text strings
     * @param {String} text.caption - box title
     * @param {Array}  text.labelsColumn - array of column text labels
     * @param {String[]}  text.labelsRow - array of row text labels
     *
     * @param {Object}  config - widget setup information
     * @param {String}  config.type - chart type: "column", "line", "pie", "donut"
     * @param {String}  config.modifiers - chart class modifiers to enable grid, label and / or value display
     * @param {Boolean} config.showLegend - enables legend display
     *
     * @param {Object} payload - widget values to display
     * @param {Array}  payload.value - array of arrays of numbers
     * @param {Number} payload.max - max value to normalize key value into percent
     *
     * @param {String} className - optional top level css controls, typically adjust chart height
     *
     */


    //* props
    export let text = {};
    export let config = {};
    export let payload = {};

    let className;
    // noinspection ReservedWordAsName
    export { className as class };


    //* local variables
    let values = [];
    let startValues = [];
    let maxValue = 10;
    let columns = 1;

    let rowLabels = text.labelsRow && text.labelsRow.length > 0 ? [...text.labelsRow] : ["row"];
    let colLabels = text.labelsColumn && text.labelsColumn.length > 0 ? [...text.labelsColumn] : ["col"];
    let legend = [...text.labelsRow];


    $: {
        values = [...payload.value];
        startValues = [...payload.value];
        maxValue = payload?.max || 10;
        columns = payload?.value?.length || 1;

        /* swap row / column labels */
        if( ["donut", "pie"].includes(config.type) ){
            maxValue = values[0].reduce( (acc, current) => acc + current, 0);
            startValues = accumulateValues(payload.value);
            legend = [...colLabels];
            legend.shift();             // remove row <th> label
        }

        /* for column chart equivalent to pie chart, swap row / column labels */
        if( config.type === "column" && config.modifiers.includes("unique-colors") ){
            legend = [...colLabels];
            legend.shift();             // remove row <th> label
        }
    }


    //* support Functions
    function accumulateValues(payloadData){
        return payloadData.map( value => {
            let accum = 0;
            let out = [];

            value.forEach( val => {
                accum = accum + val;
                out.push(accum);
            });

            return out;
        });
    }

</script>




<div class="charts-wrapper {className}">
    <table class="charts-{config.type} {config.modifiers}"
           style="--chart-max: {maxValue}; --column-count: {columns}">
        <caption>{text.caption}</caption>

        {#if colLabels}
            <thead>
                <tr>
                    {#each colLabels as heading}
                        <th scope="col">{heading}</th>
                    {/each}
                </tr>
            </thead>
        {/if}

        <tbody>
            {#each values as rows, idx1}
                <tr>
                    <th scope="row">{rowLabels[idx1]}</th>
                    {#each rows as row, idx2}
                        <td style="--td-start:{startValues[idx1][idx2-1] || 0}; --td-value:{row};"><span>{row}</span></td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>

    {#if config.showLegend && legend}
        <ul aria-label="Chart Legend">
            {#each legend as label}
                <li>{label}</li>
            {/each}
        </ul>
    {/if}
</div>