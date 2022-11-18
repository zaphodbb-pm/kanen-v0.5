<script>
    /**
     * @summary Layout for Page AdminPanel.
     *
     * @name adminPanel
     * @module
     * @memberOf Pages:adminPanel
     * @locus Client
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
        //import { setContext } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page body support **************************
    import {lang} from '/imports/client/systemStores';
    import {i18n} from '/imports/functions/utilities/i18n';

    const pageHeader = i18n(header, "", $lang);
    const pageText = i18n(page, "page", $lang);
    const widgetText = i18n(page, "widgets", $lang);
    const configs = pageConfig.widgets;

    import ReportBox from "../../../components/widgets/reportbox.svelte";
    import InfoBox from "../../../components/widgets/infobox.svelte";
    import Gauge from "../../../components/widgets/gauge.svelte";

    /* set payloads for widgets */
    let payLoadReportbox1 = {value: 100, max: 128};
    let payLoadReportbox2 = {value: 26, max: 128};

    let payLoadInfobox1 = {value: 212};
    let payLoadInfobox2 = {value: 4321};

    let payLoadGauge1 = {value: 64, max: 128};
    let payLoadGauge2 = {value: 103, max: 212};
    let payLoadGauge3 = {value: 333, max: 999};

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


    <section id="admin-info-box" class="space-vert-large">
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


    <section class="space-vert-large">
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


    <section class="space-vert-large">
        <h2>{@html pageText.chartsTitle}</h2>

        <div class="row has-2x-minwidth">
            <div class="column is-span-1">
                <p>{@html pageText.charts}</p>
            </div>

            <div class="column is-span-3">

                <div class="row has-1x-minwidth">
                    <div class="column is-span-3">
                        charts column
                    </div>

                    <div class="column is-span-2">
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
                </div>

                <div class="row has-1x-minwidth">
                    <div class="column is-span-3">
                        charts donut
                    </div>

                    <div class="column is-span-2">
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
                </div>

                <div class="row has-1x-minwidth">
                    <div class="column is-span-3">
                        charts line
                    </div>

                    <div class="column is-span-2">
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
                </div>

                <div class="row has-1x-minwidth">
                    <div class="column is-span-3">
                        charts multiple lines
                    </div>

                    <div class="column is-span-2">
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
                </div>
            </div>

        </div>

    </section>

</main>