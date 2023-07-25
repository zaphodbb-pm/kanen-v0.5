<script>


    /**
     * Table to list documents and fields for docs.
     *
     * @module listTable
     * @memberOf Components:listCollections:
     * @locus Client
     *
     * @param  {Object} config - decoration for table
     * @param  {Array}  labels
     * @param  {Array}  documents
     * @param  {String} collection
     * @param  {Boolean} submitted
     *
     * @fires item-modal
     * @fires item-modal-user
     * @fires item-edit
     * @fires item-delete
     *
     * @notes
     *      Column types:
     *              "check" - checkbox
     *              "tag" - coloured box with label
     *              "id" - has document id
     *              "link" - active url to new page
     *              "edit" - sends doc info to be edited
     *              "modal" - sends doc info to modal for detailed display
     *              "modalUser" - sends doc info to then fetch user info
     *              "text" - plain text display
     *              "select" - gets "name" field value
     *              "date" - formatted date display text
     *              "phone" - formatted phone number with link to phone application
     *              "email" - formatted email with link to email application
     *              "status" - dot and text status display
     *              "newpage" - launch new page in new tab
     *              "object" - stringified display of object
     *              "boolean" - check character if true
     *              "pict" - thumbnail picture
     *              "del" - trash can and docid of document to delete
     *
     */

    //* props
    export let config = {};
    export let labels = [];
    export let documents = [];
    export let collection = "";
    export let submitted = false;

    // get the user language preference from store
    import commonText from "../../client/text_common";
    import {calendar} from "../../client/text_calendar";
    import {lang} from '/imports/client/systemStores';
    import {i18n} from '/imports/Functions/utilities/i18n';

    //** support Functions
    import {transformDocInfo} from "./func-transformDocInfo";
    import {sysConfig} from '/imports/client/systemStores'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


//* local reactive variables
    let calendarText = i18n( calendar, "", $lang);
    let deleteText = i18n( commonText, "confirmDelete", $lang);
    let inEdit = false;
    let currRow = "";
    let actRow = "";
    let submit = submitted;
    let confirmDelete = true;
    let confirm = null;

    //console.log("table", $sysConfig, confirmDelete );

    let TAGS = {
        // sets background label colour for "tag" cell
        login: "is-link",
        logout: "is-warning",
        system: "is-danger",
        startup: "is-danger",
        default: "is-link",
    };

    $: releaseItem(submitted);

    $: confirmDelete = !!$sysConfig.confirmDelete;


    //* event handlers
    function modalDoc(msg) {
        let showDoc = documents.find( (doc) =>  doc._id === msg);

        /**
         * @event item-modal
         * @type {Array}
         */
        dispatch('item-modal', showDoc);
    }

    function modalUserDoc(msg) {
        let showDoc = documents.find( (doc) =>  doc._id === msg);

        /**
         * @event item-modal-user
         * @type {Array}
         */
        dispatch('item-modal-user', showDoc);
    }

    function launchPage(msg) {
        let page = window.location.origin + config.target + "?q=" + msg.detail;
        window.open(page);
    }

    function confirmDel(msg) {
        confirm = msg;
    }

    function cancelDelete(){
        confirm = null;
    }

    function deleteDoc(msg) {

        /**
         * @event item-delete
         * @type {Array}
         */
        dispatch('item-delete', {id: msg});
    }

    function releaseItem(msg){
        if(msg){
            hasSubmitted();
        }
    }


    //* Functions that mutate local variables
    function hasSubmitted() {
        if (submitted) {
            currRow = "";
            actRow = "";
            inEdit = false;
            submit = false;
        }
    }

    function editDoc(msg) {
        let same = (msg === actRow);
        actRow = same ? actRow : msg;
        inEdit = !inEdit;

        if (same) {
            currRow = inEdit ? msg : "";
        } else {
            currRow = msg;
            inEdit = true;
        }

        /**
         * @event item-edit
         * @type {Object}
         */

        dispatch('item-edit', {
            id: currRow,
            edit: inEdit
        });
    }


    //* pure Functions
    function formatDate(isoDate ,cal) {
        let out = "n/a";

        if (isoDate) {
            //** get common calendar text and adjust for language preference
            const date = new Date(isoDate);
            out = `${cal.months[date.getUTCMonth()].name} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
        }

        return out;
    }

    function formatPhoneNumber(str) {
        let cleaned = ('' + str).replace(/\D/g, '');                // Filter only formatters from the input
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);  // Check if the input is of correct layout
        let out = "";

        if (match) {
            let intlCode = (match[1] ? '+1 ' : '');                  //Remove matched extension code and change to format for any country code.
            out = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }

        return out;
    }


    function tableLabels(start) {
        let labels = [];

        start.forEach(function (el) {
            if (el.label &&  !el.label.toLowerCase().includes("geo")) {
                let css = el.type && el.type === "del" ? "has-text-centered" : (el.css ? el.css : "");
                labels.push({label: el.label, css: css});
            }
        });

        return labels;
    }


    //* build an array of arrays of display objects
    function tableItems(coll, fields, docs) {
        let out = [];

        //** prepare document for display listing and get info for each field to display
        docs.forEach(function (doc) {
            out.push( transformDocInfo(coll, doc, fields) );
        });

        return out;
    }

</script>


<div class="table-container">

    <table class="table is-fullwidth">
        <thead>
            <tr>
                {#each tableLabels(labels) as tl}
                    <th class="{tl.css}">{tl.label}</th>
                {/each}
            </tr>
        </thead>

        <tbody>
            {#each tableItems(collection, labels, documents) as row, idx}
                <tr  class="{row[0] && row[0].id && (currRow === row[0].id) ? 'is-warning-light' : ''}" style="position: relative;">

                    {#each row as cell}

                        {#if cell.type === 'check'}
                            <td data-fieldname="{cell.field}">
                                <input type="checkbox" class="checkbox" title="{cell.value}">
                            </td>

                        {:else if cell.type === 'tag' }
                            <td data-fieldname="{cell.field}">
                                <span class="buffer-small">
                                    <span class="tag is-medium {TAGS[cell.value]}">
                                        <b>{cell.value}</b>
                                    </span>
                                </span>
                            </td>

                        {:else if cell.type === 'id' }
                            <td data-fieldname="{cell.field}" data-id="{cell.value}"></td>

                        {:else if cell.type === 'link' }
                            <td data-fieldname="{cell.field}" class="add-cursor">
                                <a href="{cell.url}" target="_blank">
                                    <span>
                                        <span class="icon-bg-eye is-medium"></span>
                                    </span>
                                </a>
                            </td>

                        {:else if cell.type === 'edit' }
                            <td on:click="{ () => editDoc(cell.id) }"
                                data-fieldname="{cell.field}"
                                style="word-wrap: break-word; word-break: break-all; color: var(--link)"
                                class="add-cursor is-text-semibold">

                                {cell.value}
                            </td>

                        {:else if cell.type === 'modal' }
                            <td on:click="{() => modalDoc(cell.id) }"
                                style="word-wrap: break-word; word-break: break-all;"
                                data-fieldname="{cell.field}"
                                class="add-cursor has-text-link is-text-semibold">

                                {cell.value}
                            </td>

                        {:else if cell.type === 'modalUser' }
                            <td on:click="{ () => modalUserDoc(cell.id) }"
                                style="word-wrap: break-word; word-break: break-all;"
                                data-fieldname="{cell.field}"
                                class="add-cursor has-text-link has-text-weight-semibold text-left">

                                {cell.value}
                            </td>

                        {:else if cell.type === 'text' || cell.type === 'select' || cell.type === 'timeStamp'}
                            <td data-fieldname="{cell.field}" class="text_cell" style="word-wrap: break-word; word-break: break-all;">
                                {cell.prefix}{cell.value}{cell.suffix}
                            </td>

                        {:else if cell.type === 'currency' }
                            <td data-fieldname="{cell.field}" class="has-text-right">
                                {cell.prefix}{cell.value.toFixed(2)}{cell.suffix}
                            </td>

                        {:else if cell.type === 'date' }
                            <td data-fieldname="{cell.field}">
                                {formatDate(cell.value, calendarText)}
                            </td>

                        {:else if cell.type === 'phone' }
                            <td data-fieldname="{cell.field}">
                                <a href="tel:{cell.value}">{formatPhoneNumber(cell.value)}</a>
                            </td>

                        {:else if cell.type === 'email' }
                            <td data-fieldname="{cell.field}">
                                <a href="mailto:{cell.value}">{cell.value}</a>
                            </td>

                        {:else if cell.type === 'status' }
                            <td data-fieldname="{cell.field}" class="has-text-left list-status">
                                <span style="{cell.value && cell.value.colour ? 'color: ' + cell.value.colour : ''}">
                                    <span class="icon-bg-cog is-medium"></span>
                                </span>
                                {cell.value && cell.value.name ? cell.value.name : '' }
                            </td>


                        {:else if cell.type === 'newpage' }
                            <td on:click="{() => launchPage(cell.id)}"
                                style="word-wrap: break-word; word-break: break-all;"
                                data-fieldname="{cell.field}"
                                class="add-cursor has-text-info has-text-weight-semibold text-left">

                                {cell.value}
                            </td>

                        {:else if cell.type === 'object' }
                            <td data-fieldname="{cell.field}">{cell.value}</td>

                        {:else if cell.type === 'boolean' }
                            <td data-fieldname="{cell.field}" class="has-text-success text-center text-1dot4rem"
                                style="padding-bottom: 0; padding-top: 0">
                                {#if cell.value}
                                    <span>&#9679;</span>
                                {/if}
                            </td>

                        {:else if cell.type === 'pict' }
                            <td data-fieldname="{cell.field}" class="pict pictSmall">
                                {#if cell.value && cell.value.src}
                                    <div>
                                        <img src="{cell.value.src}" class="list-thumbnail" alt="thumbnail"/>
                                    </div>
                                {:else}
                                    <div class="alt-pict">
                                        <div class="alt-pict-text">{cell.name}</div>
                                    </div>
                                {/if}
                            </td>

                        {:else if cell.type === 'del' }

                            {#if confirmDelete}
                                <td data-fieldname="{cell.field}" class="table-delete-td" on:click="{() => confirmDel(cell.value)}">

                                    {#if confirm === cell.value}
                                        <div class="confirm-delete depth-1 d-flex justify-content-between has-text-left align-items-center">
                                            <button class="button is-small is-danger" on:click|stopPropagation="{() => deleteDoc(cell.value)}">
                                                {deleteText.btnRemove}
                                            </button>

                                            <p class="has-text-centered text-0dot8rem">{deleteText.msg}</p>

                                            <button type="button" class="is-small is-primary-outlined" on:click|stopPropagation="{cancelDelete}">
                                                {deleteText.btnCancel}
                                            </button>
                                        </div>

                                    {:else}
                                        <span class="icon-bg-trash has-text-danger table-delete-icon"></span>
                                    {/if}
                                </td>

                            {:else}
                                <td data-fieldname="{cell.field}" class="table-delete-td" on:click="{() => deleteDoc(cell.value)}">
                                    <span class="icon-bg-trash has-text-danger table-delete-icon"></span>
                                </td>
                            {/if}

                        {/if}

                    {/each}
                </tr>

            {/each}
        </tbody>
    </table>

</div>


<style>
    td {
        vertical-align: middle;
    }

    .pict {
        margin: 0.5rem;
    }

    .alt-pict {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: #555;
        display: flex;
    }

    .alt-pict-text {
        color: #FFF;
        font-size: 1.5rem;
        margin: auto; /* Important */
        text-align: center;
    }

    .list-thumbnail {
        width: 3rem;
        border-radius: 50%;
        background-color: #eee;
    }

    .confirm-delete {
        display: flex;
        justify-content: space-between;
        align-items: center;

        min-height: 3rem;
        width: 90%;

        position: absolute;
        right: 1.5rem;
        margin-top: -1.5rem;
        padding: 0.5rem;

        background-color: whitesmoke;
        border: solid 1px #c0c0c0;
        border-radius: var(--radius-comp);
        z-index: 10;
    }

    .confirm-delete > p {
        margin: 0 0.5rem;
    }

    .table-delete-td {
        text-align: center;
        cursor: pointer;
    }

    .table-delete-icon {
        padding: 0;
        margin: 0;
        vertical-align: middle;
    }

</style>
