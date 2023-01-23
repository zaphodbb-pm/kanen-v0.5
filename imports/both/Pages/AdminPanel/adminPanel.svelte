<script>
    /**
     * Page layout for AdminPanel.  Displays various widgets for use in an admin panel.
     *
     * @name adminPanel
     * @module
     * @memberOf Pages:adminPanel
     * @locus Client
     *
     * @param {String} currentRoute - page path name
     * @param {Object} params - any parameters from path url
     * @param {Object} query - any query fragment from path url
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {header, page} from './adminPanel_text';
        import {pageConfig} from './adminPanel_config';

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page body support **************************
    import {lang} from '/imports/client/systemStores';
    import {i18n} from '/imports/Functions/utilities/i18n';

    const pageHeader = i18n(header, "", $lang);
    const pageText = i18n(page, "page", $lang);
    const widgetText = i18n(page, "widgets", $lang);
    const configs = pageConfig.widgets;

    import ReportBox from "../../../Components/widgets/reportbox.svelte";
    import InfoBox from "../../../Components/widgets/infobox.svelte";
    import Gauge from "../../../Components/widgets/gauge.svelte";
    import Charts from "../../../Components/widgets/charts.svelte";


    /* support function */
    function arrayToString(key, val){           // keeps code display of array elements on one line
        if (Array.isArray(val)) {
            if( Array.isArray(val[0]) ){
                return val.map( v => `[ ${v.join(", ")} ]`);
            }else{
                return JSON.stringify(val);
            }
        }
        return val;
    }


    /* set payloads for widgets */
    let payLoadReportbox1 = {value: 100, max: 128};
    let payLoadReportbox2 = {value: 26, max: 128};

    let payLoadInfobox1 = {value: 212};
    let payLoadInfobox2 = {value: 4321};

    let payLoadGauge1 = {value: 64, max: 128};
    let payLoadGauge2 = {value: 103, max: 212};
    let payLoadGauge3 = {value: 333, max: 999};

    let payLoadCharts1 = {
        value: [ [3, 4, 5, 6, 7] ],
        max: 10
    };

    let payLoadCharts2 = {
        value: [ [7, 6, 5, 4, 3] ],
        max: 10
    };

    let payLoadCharts3 = {
        value: [ [18, 22, 26, 25.5, 28.5] ],
        max: 40
    };

    let payLoadCharts4 = {
        value: [
            [3, 4, 5, 6.5, 7.5],
            [4, 5, 6, 7, 6],
            [5, 6, 7, 6, 8],
            [6, 7, 8, 6, 7]
        ],
        max: 10
    }

</script>


<PageHeader header="{pageHeader}" />

<main class="main-content">

    <section>
        <h2>{pageText.reportsTitle}</h2>

        <div class="row has-3x-minwidth">
            <div class="column">
                <p>{@html pageText.reports}</p>
            </div>

           <div class="column">
               <div class="has-height-15rem">
                   <ReportBox class="" text="{widgetText.reportbox1}" config="{configs.reportbox1}" payload="{payLoadReportbox1}" />
               </div>

               <details class="accordion is-expander-secondary">
                   <summary><span>{pageText.tabs[0]}</span></summary>
                   <div><pre><code>{JSON.stringify(widgetText.reportbox1, null, 2)}</code></pre></div>
               </details>

               <details class="accordion is-expander-tertiary">
                   <summary><span>{pageText.tabs[1]}</span></summary>
                   <div><pre><code>{JSON.stringify(configs.reportbox1, null, 2)}</code></pre></div>
               </details>

               <details class="accordion is-expander-primary">
                   <summary><span>{pageText.tabs[2]}</span></summary>
                   <div><pre><code>{JSON.stringify(payLoadReportbox1, null, 2)}</code></pre></div>
               </details>
           </div>

           <div class="column">
               <div class="has-height-15rem">
                   <ReportBox class="" text="{widgetText.reportbox2}" config="{configs.reportbox2}" payload="{payLoadReportbox2}" />
               </div>

               <details class="accordion is-expander-secondary">
                   <summary><span>{pageText.tabs[0]}</span></summary>
                   <div><pre><code>{JSON.stringify(widgetText.reportbox2, null, 2)}</code></pre></div>
               </details>

               <details class="accordion is-expander-tertiary">
                   <summary><span>{pageText.tabs[1]}</span></summary>
                   <div><pre><code>{JSON.stringify(configs.reportbox2, null, 2)}</code></pre></div>
               </details>

               <details class="accordion is-expander-primary">
                   <summary><span>{pageText.tabs[2]}</span></summary>
                   <div><pre><code>{JSON.stringify(payLoadReportbox2, null, 2)}</code></pre></div>
               </details>

           </div>
       </div>

    </section>


    <section id="admin-info-box" class="space-container-vert">
        <h2>{pageText.infoTitle}</h2>

        <div class="row has-3x-minwidth">
            <div class="column">
                <p>{@html pageText.info}</p>
            </div>

            <div class="column">
                <div class="has-height-15rem">
                    <InfoBox class="" text="{widgetText.infobox1}" config="{configs.infobox1}" payload="{payLoadInfobox1}" />
                </div>

                <details class="accordion is-expander-secondary">
                    <summary><span>{pageText.tabs[0]}</span></summary>
                    <div><pre><code>{JSON.stringify(widgetText.infobox1, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-tertiary">
                    <summary><span>{pageText.tabs[1]}</span></summary>
                    <div><pre><code>{JSON.stringify(configs.infobox1, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-primary">
                    <summary><span>{pageText.tabs[2]}</span></summary>
                    <div><pre><code>{JSON.stringify(payLoadInfobox1, null, 2)}</code></pre></div>
                </details>
            </div>

            <div class="column">
                <div class="has-height-15rem">
                    <InfoBox class="" text="{widgetText.infobox2}" config="{configs.infobox2}" payload="{payLoadInfobox2}" />
                </div>

                <details class="accordion is-expander-secondary">
                    <summary><span>{pageText.tabs[0]}</span></summary>
                    <div><pre><code>{JSON.stringify(widgetText.infobox2, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-tertiary">
                    <summary><span>{pageText.tabs[1]}</span></summary>
                    <div><pre><code>{JSON.stringify(configs.infobox2, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-primary">
                    <summary><span>{pageText.tabs[2]}</span></summary>
                    <div><pre><code>{JSON.stringify(payLoadInfobox2, null, 2)}</code></pre></div>
                </details>
            </div>
        </div>

    </section>


    <section class="space-container-vert">
        <h2>{pageText.gaugesTitle}</h2>

        <div class="row has-2x-minwidth">
            <div class="column">
                <p>{@html pageText.gauges}</p>
            </div>

            <div class="column">
                <div class="has-height-15rem">
                    <Gauge class="" text="{widgetText.gauge1}" config="{configs.gauge1}" payload="{payLoadGauge1}" />
                </div>

                <details class="accordion is-expander-secondary">
                    <summary><span>{pageText.tabs[0]}</span></summary>
                    <div><pre><code>{JSON.stringify(widgetText.gauge1, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-tertiary">
                    <summary><span>{pageText.tabs[1]}</span></summary>
                    <div><pre><code>{JSON.stringify(configs.gauge1, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-primary">
                    <summary><span>{pageText.tabs[2]}</span></summary>
                    <div><pre><code>{JSON.stringify(payLoadGauge1, null, 2)}</code></pre></div>
                </details>
            </div>

            <div class="column">
                <div class="has-height-15rem">
                    <Gauge class="" text="{widgetText.gauge2}" config="{configs.gauge2}" payload="{payLoadGauge2}" />
                </div>

                <details class="accordion is-expander-secondary">
                    <summary><span>{pageText.tabs[0]}</span></summary>
                    <div><pre><code>{JSON.stringify(widgetText.gauge2, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-tertiary">
                    <summary><span>{pageText.tabs[1]}</span></summary>
                    <div><pre><code>{JSON.stringify(configs.gauge2, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-primary">
                    <summary><span>{pageText.tabs[2]}</span></summary>
                    <div><pre><code>{JSON.stringify(payLoadGauge2, null, 2)}</code></pre></div>
                </details>
            </div>

            <div class="column">
                <div class="has-height-15rem">
                    <Gauge class="" text="{widgetText.gauge3}" config="{configs.gauge3}" payload="{payLoadGauge3}" />
                </div>

                <details class="accordion is-expander-secondary">
                    <summary><span>{pageText.tabs[0]}</span></summary>
                    <div><pre><code>{JSON.stringify(widgetText.gauge3, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-tertiary">
                    <summary><span>{pageText.tabs[1]}</span></summary>
                    <div><pre><code>{JSON.stringify(configs.gauge3, null, 2)}</code></pre></div>
                </details>

                <details class="accordion is-expander-primary">
                    <summary><span>{pageText.tabs[2]}</span></summary>
                    <div><pre><code>{JSON.stringify(payLoadGauge3, null, 2)}</code></pre></div>
                </details>
            </div>
        </div>

    </section>


    <section class="space-container-vert">
        <h2>{@html pageText.chartsTitle}</h2>

        <div class="row has-2x-minwidth">
            <div class="column is-span-1">
                <p>{@html pageText.charts}</p>
            </div>

            <div class="column is-span-3">

                <div class="row has-1x-minwidth">
                    <div class="column is-span-3">
                        <Charts class="has-height-15rem" text="{widgetText.charts1}" config="{configs.charts1}" payload="{payLoadCharts1}" />
                    </div>

                    <div class="column is-span-2">
                        <details class="accordion is-expander-secondary">
                            <summary><span>{pageText.tabs[0]}</span></summary>
                            <div><pre><code>{JSON.stringify(widgetText.charts1, null, 2)}</code></pre></div>
                        </details>

                        <details class="accordion is-expander-tertiary">
                            <summary><span>{pageText.tabs[1]}</span></summary>
                            <div><pre><code>{JSON.stringify(configs.charts1, null, 2)}</code></pre></div>
                        </details>

                        <details class="accordion is-expander-primary">
                            <summary><span>{pageText.tabs[2]}</span></summary>
                            <div><pre><code>{JSON.stringify(payLoadCharts1, arrayToString, 2)}</code></pre></div>
                        </details>
                    </div>
                </div>

                <div class="space-component-medium"></div>

                <div class="row has-1x-minwidth">
                    <div class="column is-span-3">
                        <Charts class="has-height-15rem" text="{widgetText.charts2}" config="{configs.charts2}" payload="{payLoadCharts2}" />
                    </div>

                    <div class="column is-span-2">
                        <details class="accordion is-expander-secondary">
                            <summary><span>{pageText.tabs[0]}</span></summary>
                            <div><pre><code>{JSON.stringify(widgetText.charts2, null, 2)}</code></pre></div>
                        </details>

                        <details class="accordion is-expander-tertiary">
                            <summary><span>{pageText.tabs[1]}</span></summary>
                            <div><pre><code>{JSON.stringify(configs.charts2, null, 2)}</code></pre></div>
                        </details>

                        <details class="accordion is-expander-primary">
                            <summary><span>{pageText.tabs[2]}</span></summary>
                            <div><pre><code>{JSON.stringify(payLoadCharts2, arrayToString, 2)}</code></pre></div>
                        </details>
                    </div>
                </div>

                <div class="space-component-medium"></div>

                <div class="row has-1x-minwidth">
                    <div class="column is-span-3">
                        <Charts class="has-height-20rem" text="{widgetText.charts3}" config="{configs.charts3}" payload="{payLoadCharts3}" />
                    </div>

                    <div class="column is-span-2">
                        <details class="accordion is-expander-secondary">
                            <summary><span>{pageText.tabs[0]}</span></summary>
                            <div><pre><code>{JSON.stringify(widgetText.charts3, null, 2)}</code></pre></div>
                        </details>

                        <details class="accordion is-expander-tertiary">
                            <summary><span>{pageText.tabs[1]}</span></summary>
                            <div><pre><code>{JSON.stringify(configs.charts3, null, 2)}</code></pre></div>
                        </details>

                        <details class="accordion is-expander-primary">
                            <summary><span>{pageText.tabs[2]}</span></summary>
                            <div><pre><code>{JSON.stringify(payLoadCharts3, arrayToString, 2)}</code></pre></div>
                        </details>
                    </div>
                </div>

                <div class="space-component-medium"></div>

                <div class="row has-1x-minwidth">
                    <div class="column is-span-3">
                        <Charts class="has-height-30rem" text="{widgetText.charts4}" config="{configs.charts4}" payload="{payLoadCharts4}" />
                    </div>

                    <div class="column is-span-2">
                        <details class="accordion is-expander-secondary">
                            <summary><span>{pageText.tabs[0]}</span></summary>
                            <div><pre><code>{JSON.stringify(widgetText.charts4, null, 2)}</code></pre></div>
                        </details>

                        <details class="accordion is-expander-tertiary">
                            <summary><span>{pageText.tabs[1]}</span></summary>
                            <div><pre><code>{JSON.stringify(configs.charts4, null, 2)}</code></pre></div>
                        </details>

                        <details class="accordion is-expander-primary">
                            <summary><span>{pageText.tabs[2]}</span></summary>
                            <div><pre><code>{JSON.stringify(payLoadCharts4, arrayToString, 2)}</code></pre></div>
                        </details>
                    </div>
                </div>
            </div>

        </div>

    </section>

</main>