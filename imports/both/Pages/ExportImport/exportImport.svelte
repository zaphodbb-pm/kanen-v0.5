<script>
    /**
     * General input card with export import functionality.
     *
     * @name exportImport
     * @module
     * @memberOf Pages:exportImport
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {header, page} from './exportImport_text';
        import {pageConfig} from './exportImport_config';

        //** app support files
        import { setContext } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    import {methodReturn} from '/imports/functions/utilities/methodReturn';
    import {parseJSONString} from '/imports/functions/formatters/parseJSONString';
    import {fileName} from '/imports/functions/fileHandlers/fileName';
    import {fileSaver} from '/imports/functions/fileHandlers/fileSaver';
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte';

    const pageHeader = i18n(header, "", $lang);
    let text = i18n(page, "components", $lang).card;
    let formText = i18n(page, "form", $lang);
    setContext("formText", formText);


    //* local reactive variables
    let messages = [];
    let build = {coll: "", fname: "", infile: "", fsize: 0}
    let documents = []
    let disableImport = true;
    let disableExport = true


    //* event handlers
    function importFile() {
        messages = [text.msgBuild];
        actionImport(build);
    }

    function exportFile() {
        messages = [text.msgBuild];
        actionExport(build.coll);
    }

    function updateCollection(msg) {
        let coll = msg.detail.value && msg.detail.value._id ? msg.detail.value._id : null;

        if(coll && coll !== "none"){
            build.coll = coll;
            disableExport = false;
            messages = [];
        }else{
            build.coll = null;
            disableExport = true;
            messages = [text.msgNoColl, coll];
        }
    }

    function updateFile(inMsg) {
        let msg = inMsg.detail.value;

        let test = parseJSONString(msg.src);

        if (test) {
            build.infile = test;
            build.fname = msg.name ? msg.name : "Unknown";
            build.fsize = msg.src.length;
            messages = [];
            disableImport = false;
        } else {
            console.warn("Not a valid JSON file: ", msg.name);
            disableImport = true;
        }
    }

    //** card specific action execution
    function actionExport(coll) {
        if (disableExport) {
            messages = [text.msgError];
        } else {
            if (coll && coll !== "none") {
                let fname = fileName(coll, "json");

                Meteor.call('exportJSON', coll, {}, function (err, fileContent) {
                    methodReturn(err, fileContent, "exportJSON");

                    if (fileContent) {
                        let blob = new Blob([fileContent.data], {type: "text/plain;charset=utf-8"});
                        let size = ` (${(fileContent.size / 1000).toFixed(1)} KB)`;

                        messages = [
                            "Export: " + fname,
                            "Records: " + fileContent.records + size
                        ];

                        fileSaver(blob, fname);
                    } else {
                        messages = [text.msgExportFail, err];
                    }
                });
            } else {
                messages = [text.msgError];
            }
        }
    }

    function actionImport(params) {
        if (disableImport && disableExport) {
            messages = [text.msgError];
        } else {

            if (params.coll && params.coll !== "none" && params.infile && params.infile.length > 0) {
                Meteor.call('importJSON', params.coll, params.infile, function (err, res) {
                    methodReturn(err, res, "importJSON");

                    if (res) {
                        messages = [
                            `Import: ${params.fname}`,
                            `Records: ${params.infile.length} (${(params.fsize / 1024).toFixed(1)} KB)`
                        ];
                    } else {
                        messages = [text.msgImportFail, err];
                    }
                });
            } else {
                messages = [text.msgError];
            }
        }
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">


    <div class="level-centered">
        <div class="has-max-width-40rem">

            <form class="form has-form-shadow">
                <header class="is-secondary">{text.title}</header>

                <div class="level">
                    <Field_Wrapper
                            class="has-width-20rem"
                            field="{pageConfig.components.collections}"
                            watchFields="{ {} }"
                            on:field-changed="{updateCollection}"/>

                    <button type="button" class="is-primary-outlined has-hover"
                            disabled="{disableExport}"
                            on:click="{exportFile}">

                        {text.btnSend}
                    </button>
                </div>


                <div class="level">
                    <Field_Wrapper
                            class="has-width-20rem"
                            field="{pageConfig.components.fileInput}"
                            watchFields="{ {} }"
                            on:field-changed="{updateFile}"/>

                    <button type="button" class="is-primary-outlined has-hover"
                            disabled="{disableImport || disableExport}"
                            on:click="{importFile}">
                        {text.btnReceive}
                    </button>
                </div>



                {#if messages.length > 0}
                    <div class="form-footer">
                        <div class="message is-warning-light">
                            <div class="message-body">
                                {#each messages as message}
                                    <p>{message}</p>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}

            </form>

        </div>
    </div>

</main>