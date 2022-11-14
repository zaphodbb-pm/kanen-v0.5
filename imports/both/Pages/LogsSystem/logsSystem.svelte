<script>
    /**
     * Layout for LogsSystem page.
     *
     * @name logsSystem
     * @module
     * @memberOf Pages:logsSystem
     * @function logsSystem
     * @locus Client
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
        import { setContext } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/functions/utilities/i18n'
    import {lang} from '/imports/client/systemStores'

    import DeleteRecords from '../../../../imports/components/elements/getRelativeDates.svelte'
    import List_Holder from '../../../../imports/components/listCollections/listHolder.svelte'
    import listArray from './logsSystem_list';

    const pageHeader = i18n(header, "", $lang);
    let listText = i18n(page, "list", $lang);
    let element = i18n(page, "element", $lang);

    setContext("formText", element);

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

    <DeleteRecords on:new-range={deleteRange}/>

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