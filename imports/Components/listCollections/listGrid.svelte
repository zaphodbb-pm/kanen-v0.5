<script>
    /**
     * Grid to list documents and fields for docs.
     *
     * @module listGrid
     * @memberOf Components:list
     * @locus Client
     *
     * @param  {Object} config - decoration for table
     * @param  {Array}  labels
     * @param  {Array}  documents
     * @param  {String} collection
     * @param  {Boolean} submitted
     *
     * @fires item-edit
     * @fires item-delete
     */

    //* props
    export let config = {};
    export let labels = [];
    export let documents = {};
    export let collection = "";
    export let submitted = false

    //* support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {dotNotation} from '/imports/Functions/utilities/dotNotation'
    import {timeAgo} from '/imports/Functions/formatters/timeAgo'


    //* local reactive variables
    let TAGS = {                                        // sets background label colour for "tag" cell
        Image: "label-success",
        Trigger: "label-info",
        Message: "label-primary",
        Logs: "label-warning",
        System: "label-danger",
        Default: "label-default",
    };


    let inEdit = false;
    let currRow = "";
    let actRow = "";
    let submit = submitted;
    let notice = "default grid"

    function deleteDoc(id) {
        /**
         * @event item-delete
         * @type {Object} - item id
         */
        dispatch('item-delete', {
            id: id,
        });
    }

    function editDoc(id) {
        let same = (id === actRow);
        actRow = same ? actRow : id;
        inEdit = !inEdit;

        if (same) {
            currRow = inEdit ? id : "";
        } else {
            currRow = id;
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

    function launchPage(id) {
        console.log("launchPage", id, config.target, window.location);

        let page = window.location.origin + config.target + "?q=" + id;
        window.open(page);
    }

    //* build array of array of display objects
    function tableItems(coll, fields, docs) {
        let out = [];

        //** prepare document for display listing and get info for each field to display
        docs.forEach(function (els) {
            let tr = [];
            let values = els;
            values.updatedAt = els.updatedAt;

            fields.forEach(function (el) {
                let val = dotNotation(values, el.key);

                switch(true){

                    //*** "users" is a special case
                    case coll === "users" && el.key === "emails":
                        val = val && val[0] ? val[0].address : "ex@example.com";
                        break;

                    case el.key === "tag":
                        val = values.data && values.data.event ? values.data.event : val;
                        break;

                    case ["updatedAt", "createdAt", "data.time", "timeStamp"].includes(el.key):
                        val = timeAgo(val);
                        break;

                    case el.type === "object":
                        val = JSON.stringify(val).replace(/,/g, ", ");
                        break;
                }

                let base = el.base ? el.base : "";

                tr.push({
                    id: values._id,
                    type: el.type,
                    value: val,
                    base: base,
                    url: base + val,
                    keyName: el.label,
                });
            });

            out.push(tr);
        });

        return out;
    }

</script>


<div>
    <div class="row">
        {#each tableItems(collection, labels, documents) as row, idx}
            <div class="column">

                <div class="card">
                    {#if notice}
                        <header>{notice}</header>
                    {/if}

                    {#each row as cell, idx}
                        {#if cell.type === 'pict'}
                            <figure>
                                <img class="has-aspect-2x1" src="{cell.url}"  alt="image">
                            </figure>

                        {:else if cell.type === 'edit'}
                            <div on:click="{ () => editDoc(cell.id) }"
                                 style="word-wrap: break-word; word-break: break-all;"
                                 class="add-cursor has-text-info has-text-weight-semibold text-left">

                                {cell.value}
                            </div>

                        {:else if cell.type === 'newpage'}
                            <div on:click="{ () => launchPage(cell.id) }"
                                 style="word-wrap: break-word; word-break: break-all;"
                                 class="add-cursor has-text-info has-text-weight-semibold text-left">

                                {cell.value}
                            </div>

                        {:else if cell.type === 'text' || cell.type === 'select'}
                            <div class="has-text-left is-size-7">
                                <strong>{cell.keyName}:</strong> {cell.value}
                            </div>

                        {:else if cell.type === 'object'}
                            <div>{cell.value}</div>

                        {:else if cell.type === 'boolean'}
                            <div class="text-green text-center">
                                <span>{cell.value ? "&#10004;" : ""}</span>
                            </div>

                        {:else if cell.type === 'del'}
                            <div on:click="{ () => deleteDoc(cell.value)}"
                                 class="add-cursor has-text-right" style="max-width: 100%;">

                                <span>
                                    <span class="icon-bg-trash is-medium has-text-danger"></span>
                                </span>
                            </div>

                        {:else}
                            <div>n/a</div>
                        {/if}
                    {/each}

                </div>

            </div>
        {/each}
    </div>
</div>
