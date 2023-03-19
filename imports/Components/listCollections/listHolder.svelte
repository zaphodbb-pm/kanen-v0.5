<script>
    /**
     * Top level component that holds a document list.
     *
     * @module listHolder
     * @memberOf Components:listCollections:
     * @locus Client
     *
     * @param {Object} config - see example
     * @param {Array} fields - list of fields to fetch and show in a table
     * @param {Object} sort - main field to sort returned docs
     * @param {Boolean} submitted - indicator for document submission by a form
     * @param {String} coll - valid collection name
     *
     * @fires modal-doc
     * @fires modal-doc-user
     * @fires 'delete-doc'
     * @fires list-docs-ready
     * @fires send-doc
     *
     * @example
     *      config options for controlling list layout
     *
     *              coll: "starter",            // collection name to list
     *              showHdr: true,              // show card header and title if true
     *              bgTitle: Components.BG_CARD_TEAL, // sets card title background and text color
     *
     *
     *              hasRows: true,              // show row length selection box
     *              hasSearch: true,            // show search box
     *              hasFilters: true,           // show search filters for specific fields
     *              hasPager: true,             // show pager component, pages = (number of items) / (rows per page)
     *              hasOverlay: false,          // support for form overlaying the list during edit operation
     *
     *              display: "grid",            // show results as a "list" (default) or asd a "grid" of cards
     *              displayGrid: grid,          // loaded grid card display component: import grid from './starterGrid'
     *
     *              target: null,               // page to send item to with item id
     *
     *      field object keys:
     *              field: "name",              // {String} field name
     *              key: "name",                // {String} document key value
     *              label: "Field Name",        // {String} user readable label for list field
     *              type: "inDateRange",        // {String} how to display in the table or grid; also used by filter
     *              filter: config,             // {Object} filter configuration information
     *              filterText: object          // {Object} text for various parts of a filter
     *              condition: {$gte: now},     // {Object} general MongoDb search criterion merged with other items for a final query
     *              sort: 1,                    // {Number} allows sorting based on value returned
     *              search: true,               // {Boolean} allows for searching from search bar
     *
     */

    //* props
    export let config = {};
    export let listText = {};
    export let fields = [];
    export let sort = {};
    export let submitted = false;



    //* support Functions
    import {Meteor} from "meteor/meteor";
    import {sysConfig} from '/imports/client/systemStores'
    import {onMount, setContext} from 'svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {methodReturn} from '/imports/Functions/utilities/methodReturn'
    import {buildFilter} from './func-buildFilter'
    import {getDocs} from '/imports/Functions/application/getDocs'

    //* make form text available to all children Components
    setContext("debugOptions", $sysConfig.sysDebug);

    fields = loadText( fields, listText);   // insert text into fields object

    //* Components
    import Row_Size from './rowSize.svelte'
    import Doc_Count from './docCount.svelte'
    import Search from './searchbox.svelte'
    import Pagination from './pagination.svelte'
    import List_Filters from './listFilters.svelte'
    import List_Table from './listTable.svelte'

    //* local reactive variables
    let coll = config.coll;
    let docRows = 10;
    let docActive = 0;
    let totalDocs = 0;
    let collQuery = {};

    let collFields = {};

    let addFilters = {};
    let getFilters = [];
    let filterState =  "is-primary-outlined";
    let showFilters = false;

    let docCounts = 0;
    let docCountLabel = "0 - 0 / 0 (0)";
    let labels = fields;
    let documents = [];

    let debugOptions = $sysConfig.sysDebug;

    //* check for imported grid layouts by page
    let ListGrid;

    $: {
        if (config && (config.display === "grid") && config.displayGrid ) {
            ListGrid = config.displayGrid;
        }else{
            ListGrid = null;
        }
    }

    $: docRelease(submitted);

    onMount( async () => {
        //* on first load, show a list of unfiltered documents for this user;
        getFilters = buildFilters(fields);
        getCurrentDocs();
    } );


    //* event handlers
    function docModal(msg) {
        /**
         * @event modal-doc
         * @type {Object}
         */

        dispatch("modal-doc", msg.detail);
    }

    function docModalUser(msg) {
        /**
         * @event modal-doc-user
         * @type {Object}
         */
        dispatch("modal-doc-user", msg.detail);
    }

    function docDelete(msg) {
        switch (true) {
            case coll === "users":
                Meteor.call('userMgmtRemove', msg.detail.id, function (err, res) {
                    methodReturn(err, res, "listHolder userMgmtRemove", debugOptions ?? '');

                    if (res) {

                        /**
                         * @event delete-doc
                         * @type {Object}
                         */
                        dispatch("delete-doc", msg.detail);
                        getCurrentDocs();
                    }
                });
                break;

            default:
                Meteor.call('removeDoc', coll, msg.detail.id, function (err, res) {
                    methodReturn(err, res, "listHolder removeDoc", debugOptions ?? '');

                    if (res) {

                        dispatch("delete-doc", msg.detail);
                        getCurrentDocs();
                    }
                });
        }
    }

    function docEdit(msg) {
        let message = {
            id: "",
            type: "create",
            coll: coll,
        };

        //** if editing a doc send doc id else clear edit form
        if (msg?.detail?.edit) {
            message.id = msg.detail.id;
            message.type = "edit";
        }

        /**
         * @event send-doc
         * @type {Object} - {value: keyValue, error: false}
         */
        dispatch("send-doc", message);
    }

    function docRelease(msg){
        if(msg){
            let message = {
                id: "",
                type: "create",
                coll: coll,
            };

            getCurrentDocs();
            dispatch("send-doc", message);
        }
    }


    //* Functions that mutate local variables
    function addGridLayout() {
        if (config && config.displayGrid) {
            import(config.displayGrid).then( res => {
                ListGrid = res.default;
            });
        } else {
            return ListGrid;
        }
    }

    function setFilter() {
        //* if search filters are allowed, then turn on the filter button to show or hide the column filters
        filterState = filterState === "is-primary-outlined" ? "is-primary" : "is-primary-outlined";
        showFilters = filterState === "is-primary";
    }

    function filterList(filters) {
        //* respond to user filter selection and get new list of filtered documents
        addFilters = filters.detail;
        getCurrentDocs();
    }

    function newRow(msg) {
        //* when a user changes the rows length, get a the new longer list of documents
        docRows = parseInt(msg.detail.row);
        getCurrentDocs();
    }

    function newPage(msg) {
        //* when a user uses pagination buttons,  get the documents for that range of selected page
        docActive = msg.detail.page;
        getCurrentDocs();
    }

    function newSearch(msg) {

        //* respond to a user entering text into the search bar by constructing search fragment object
        let query = msg.detail.query;
        let target = msg.detail.search;
        target = target.replace(/ /g, '');          // remove all white spaces

        //* reset table if all text is removed
        if (target.length < 1) {
            collQuery = {};
            collFields = {};
            getCurrentDocs();
        }

        if (target.length > 2) {                        // need at least three characters to start a query
            collQuery = query;
            getCurrentDocs();
        }
    }


    async function getCurrentDocs() {
        let setQ = collQuery ? collQuery : {};
        let combineSearch = Object.assign({}, setQ, addFilters);
        docCounts = await getDocCounts(coll, combineSearch);

        getDocCounts(coll, {}).then( (res) => totalDocs = res);

        let f = buildFilter(
                docRows ? docRows : 10,
                docActive ? docActive : 1,
                docCounts,
                sort ? sort : {}
        );


        documents = await getDocs(coll, "listList", combineSearch, f.filterSearch);

        methodReturn(null, documents, "submit insertDoc", debugOptions ?? '' );
        docCountLabel = `${f.start} - ${f.end} / ${docCounts} (${totalDocs})`;

        /**
         * @event list-docs-ready
         * @type {Array}
         */
        dispatch("list-docs-ready", documents);
    }


    //* pure Functions
    function loadText(fields, text){
        return fields.map( (fld) => {
            let field = Object.assign({}, fld);     // ensure no side effects happen
            field.label = text[field.field] && text[field.field].label ? text[field.field].label : "";

            if(text[field.field] && text[field.field].filter){
                field.filterText = text[field.field].filter;
            }

            return field;
        })
    }

    async function getDocCounts(coll, query) {
        let res = 0;

        try {
            res = await Meteor.callAsync("countDocs", coll, query);
        } catch (error) {
            console.warn("countDocs", error);
        }

        return res;
    }

    //** build and return a list of filters to apply to search
    function buildFilters(fields) {
        let filters = [];

        //* find all list fields that have a "filter" key set
        if(fields && fields.length > 0){
            fields.forEach((fld) => {

                if (fld.filter) {
                    filters.push(
                        {
                            field: fld.field,
                            filter: fld.filter,
                            filterText: fld.filterText,
                            type: fld.type
                        }
                    )
                }
            });
        }

        return filters;
    }

    //** find all list fields that have a "condition" key set and apply as a general search criterion
    function getConditions(fields) {
        let conditions = {};

        fields.forEach((con) => {
            if (con.condition && typeof con.condition === "object") {
                conditions[con.field] = con.condition;
            }
        });

        return conditions;
    }

</script>



<div class="table-boxed" data-tp_list_holder>
    {#if config.showHdr}
        <header class="{config.bgTitle}">
            {listText.labels.hdr}
        </header>
    {/if}

    {#if config.hasOverlay && listText.labels?.addNew}
        <div class="level">
            <div></div>

            <button type="button"  class="is-primary-outlined"
                    on:click="{ () => docEdit({}) }">
                {listText.labels?.addNew}
            </button>
        </div>
    {/if}

    <form class="form">
        {#if config.hasRows}
            <div class="level">
                <Row_Size on:row-changed="{newRow}" />
                <Doc_Count {docCountLabel }/>
            </div>
        {/if}

        {#if  !!config.hasSearch || !!config.hasFilters}
            <div class="level">
                {#if config.hasSearch}
                    <Search {fields} on:search-changed="{newSearch}" />
                {:else}
                    <div></div>
                {/if}

                {#if !!config.hasFilters}
                    <button type="button" class="{filterState} has-hover" on:click="{setFilter}" title="Filter">
                        <span class="icon-bg-filter is-medium"></span>
                    </button>
                {/if}
            </div>
        {/if}

        {#if config.hasFilters && showFilters}
            <List_Filters filters="{getFilters}" {listText} on:filters-changed="{filterList}" />
        {/if}
    </form>

    {#if config.hasPager}
        <div id="comp_pagination">
            <Pagination rows="{docRows}" totalDocs="{docCounts}" on:page-changed="{newPage}"/>
        </div>
    {/if}

    {#if config.display === 'grid'}

        <svelte:component
                this={ListGrid}
                {config}
                labels="{fields}"
                {documents}
                collection="{coll}"
                {submitted}

                on:item-delete="{docDelete}"
                on:item-edit="{docEdit}"/>

    {:else}

        <List_Table
                {config}
                labels="{fields}"
                {documents}
                collection="{coll}"
                {submitted}

                on:item-delete="{docDelete}"
                on:item-edit="{docEdit}"
                on:item-modal="{docModal}"
                on:item-modal-user="{docModalUser}"/>

    {/if}
</div>

