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

    /* set payloads for widgets */
    let payLoadReportbox1 = {value: 100, max: 128};
    let payLoadReportbox2 = {value: 26, max: 128};

    let payLoadInfobox1 = {value: 212};
    let payLoadInfobox2 = {value: 4321};

</script>


<PageHeader header="{pageHeader}" />

<main class="main-content">

    <section>
        <h2>{pageText.reportsTitle}</h2>

        <div class="level-start">
            <p>{pageText.reports}</p>

            <div class="space-medium">
                <ReportBox
                        class=""
                        text="{widgetText.reportbox1}"
                        config="{configs.reportbox1}"
                        payload="{payLoadReportbox1}" />
            </div>

            <div class="space-medium">
                <ReportBox
                        class=""
                        text="{widgetText.reportbox2}"
                        config="{configs.reportbox2}"
                        payload="{payLoadReportbox2}" />
            </div>
        </div>
    </section>


    <section id="admin-info-box" class="space-vert-large">
        <h2>{pageText.infoTitle}</h2>

        <div class="level-start">

            <p>{pageText.info}</p>

            <div class="space-medium">
                <InfoBox
                        class=""
                        text="{widgetText.infobox1}"
                        config="{configs.infobox1}"
                        payload="{payLoadInfobox1}" />
            </div>

            <div class="space-medium">
                <InfoBox
                        class=""
                        text="{widgetText.infobox2}"
                        config="{configs.infobox2}"
                        payload="{payLoadInfobox2}" />
            </div>

        </div>
    </section>


    <section class="space-vert-large">
        <h2>{pageText.gaugesTitle}</h2>

        <div class="level-start">

            <p>{pageText.gauges}</p>

            <div>gauge 1</div>

            <div>gauge 2</div>

        </div>
    </section>


    <section class="space-vert-large">
        <h2>{pageText.chartsTitle}</h2>

        <div class="level-start">

            <p>{pageText.charts}</p>

            <div>chart 1</div>

            <div>chart 2</div>

        </div>
    </section>


</main>


<!--
<PageWrapper {header} >

    <div class="columns is-desktop mt-5">

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page.page, "col1", lng)}</div>

            <div class="columns">
                <div class="column">
                    <div class="set-height">
                        <Infobox text={infoboxText2} config={pageConfig.widgets.infobox2} {payload} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(payload, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.infobox2, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>

                <div class="column">
                    <div class="set-height">
                        <Infobox text={infoboxText} config={pageConfig.widgets.infobox} {payload} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(payload, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.infobox, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>
            </div>
        </div>

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page.page, "col4", lng)}</div>

            <div class="columns">
                <div class="column">
                    <div class="set-height">
                        <SquareBox text={sbText} config={pageConfig.widgets.squarebox} payload={sb} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(sb, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.squarebox, null, 4)}</pre>
                        </Expander>
                    </div>

                </div>

                <div class="column">
                    <div class="set-height">
                        <BigBox text={bigText} config={pageConfig.widgets.biginfo} payload={bigPayload} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(bigPayload, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.biginfo, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>
            </div>

        </div>

    </div>


    <div class="columns is-desktop mt-5">
        <div class="column buffer-large">
            <div class="title is-4">{i18n(page.page, "col3", lng)}</div>

            <div class="columns">
                <div class="column">
                    <div class="set-height">
                        <Gauge text={guage1Text} config={pageConfig.widgets.gauge1} payload={g1} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(g1, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.gauge1, null, 4)}</pre>
                        </Expander>
                    </div>

                </div>

                <div class="column">
                    <div class="set-height">
                        <Gauge text={guage2Text} config={pageConfig.widgets.gauge2} payload={g2} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(g2, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.gauge2, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>
            </div>
        </div>

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page.page, "col2", lng)}</div>

            <div class="columns">
                <div class="column">
                    <div class="set-height">
                        <ProgBars text={progbarText} config={pageConfig.widgets.progressBars} payload={plBars} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(plBars, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.progressBars, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>

                <div class="column">
                    <div class="set-height">
                        <ProgBars text={progbarText} config={pageConfig.widgets.progressBars2} payload={plBars} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(plBars, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.progressBars2, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>
            </div>
        </div>

    </div>

</PageWrapper>


<style>

    .set-height {
        height: 12rem;
    }

</style>

-->
