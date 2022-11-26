<script>

    /**
     * LogsUser page list user login / logout activity and includes ip addresses.
     *
     * @name logsUser
     * @module
     * @memberOf Pages:logsUser
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
        import {header, page} from './logsUser_text'
        import {pageConfig} from './logsUser_config'

        //** app support files
        import { setContext } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    import DeleteRecords from '../../../Components/elements/getRelativeDates.svelte';
    import List_Holder from '../../../Components/listCollections/listHolder.svelte';
    import listArray from './logsUser_list';

    const pageHeader = i18n(header, "", $lang);

    let listText = i18n(page, "list", $lang);
    let element = i18n(page, "element", $lang);

    let conf = pageConfig;
    let sort = listArray.sort;
    let fields = listArray.fields;
    let submitted = false;
    let releaseEdit = false;


    setContext("formText", element);

    //* event handlers
    function deleteRange(msg) {
        releaseEdit = false;
        let out = {updatedAt: msg.detail};

        Meteor.call("removeDocuments", "logsUser", out, function (err, res) {
            if (err) {
                console.log("removeDocuments error", err)
            }

            if (res) {
                console.log("removeDocuments", res);
            }

            releaseEdit = true;
        })
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <DeleteRecords on:new-range={deleteRange}/>

    <div class="row">
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