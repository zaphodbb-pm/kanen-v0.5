<script>
    /**
     * LogsSystem page shows logs captured for system activity.
     *
     * @name logsSystem
     * @module
     * @memberOf Pages:logsSystem
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
        import {header, page} from './logsSystem_text'
        import {pageConfig} from './logsSystem_config'

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n'
    import {lang} from '/imports/client/systemStores'

    import {components} from "../../../Components/formBuilder/fields/func-registerBasicFields";
    import DeleteRecords from '../../../Components/elements/getRelativeDates.svelte'
    import List_Holder from '../../../Components/listCollections/listHolder.svelte'
    import listArray from './logsSystem_list';

    const pageHeader = i18n(header, "", $lang);
    let listText = i18n(page, "list", $lang);
    let recordsText = i18n(page, "element", $lang);

    let conf = pageConfig;
    let sort = listArray.sort;
    let fields = listArray.fields;
    let releaseEdit = false;


    //* event handlers
    function deleteRange(msg){
        releaseEdit = false;
        let out = {timeStamp: msg.detail};

        Meteor.call("removeDocuments", "logsSystem", out, function(err, res){
            if(err){ console.log("removeDocuments error", err) }

            if(res){
                console.log("removeDocuments", res);
            }

            releaseEdit = true;
        })
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <DeleteRecords text="{recordsText}" {components} on:new-range={deleteRange}/>

    <div class="columns">
        <div class="column">

            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"/>

        </div>
    </div>

</main>