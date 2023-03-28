<script>

    /**
     * Grid to list documents and fields for docs.
     *
     * @module starter_grid
     * @memberOf Pages:starter
     * @locus Client
     *
     * @param  {Object} config - decoration for table
     * @param  {Array}  labels
     * @param  {Array}  documents
     * @param  {String} collection
     * @param  {Boolean} submitted
     *
     * @returns nothing
     *
     */

    //* props
    export let config = {};
    export let labels = [];
    export let documents = {};
    export let collection = "";
    export let submitted = false

    // get the user language preference from store
    import {lang} from '/imports/client/systemStores';
    import commonText from "../../../client/text_common"

    //* support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {i18n} from '/imports/Functions/utilities/i18n'
    import {dotNotation} from '/imports/Functions/utilities/dotNotation'
    import {timeAgo} from '/imports/Functions/formatters/timeAgo'


    //* local reactive variables
    let calendar = i18n( commonText, "calendar", $lang);
    let width =  "has-3x-minwidth";
    let notice = "starter grid"

    let inEdit = false;
    let currRow = "";
    let actRow = "";
    let submit = submitted;

    let items = [];

    $: items = tableItems(collection, labels, documents);

    //* event handlers
    function deleteDoc(id) {
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

    function formatDate(isoDate ,cal) {
        let date = new Date();
        if (isoDate) {
            date = new Date(isoDate);
        }

        //** get common calendar text and adjust for language preference
        return `${cal.months[date.getMonth()].name} ${date.getDate()}, ${date.getFullYear()}`;
    }


    //* build array of array of display objects
    function tableItems(coll, fields, docs) {
        let out = [];

        //** prepare document for display listing and get info for each field to display
        docs.forEach(function (els) {
            let tr = {};
            let values = els;
            values.updatedAt = els.updatedAt;

            fields.forEach(function (el) {
                let val = dotNotation(values, el.key);

                //*** "users" is a special case
                if (coll === "users") {
                    if (el.key === "emails") {
                        val = val && val[0] ? val[0].address : "ex@example.com";
                    }
                }

                //*** convert timestamps to relative time string
                switch(el.key){
                    case "updatedAt":
                    case "createdAt":
                    case "data.time":
                    case "timeStamp":
                        val = timeAgo(val);
                        break;

                    case "tag":
                        val = values.data && values.data.event ? values.data.event : val;
                        break;

                    case "object":
                        val = JSON.stringify(val).replace(/,/g, ", ");
                        break;
                }

                tr[el.key] = {
                    id: values._id,
                    type: el.type,
                    value: val,
                    keyName: el.label,
                };
            });

            out.push(tr);
        });

        return out;
    }

</script>


<div class="row {width}">
    {#each items as row, idx}
        <div class="column">

            <div class="card" style="overflow: hidden;">
                {#if row.startImage &&  row.startImage.value && row.startImage.value.src}
                    <figure>
                        <img src="{row.startImage.value.src}"  class="has-aspect-2x1" alt="image">
                    </figure>

                {:else}
                    {#if notice}
                            <header>{notice}</header>
                    {/if}
                {/if}

                <div>
                    {#each  Object.values(row) as cell, idx}

                        {#if cell.type === 'edit'}
                            <div>
                                <a on:click="{ () => editDoc(cell.id) }"
                                   style="word-wrap: break-word; word-break: break-all;"
                                   class="is-text-semibold add-cursor">

                                    {cell.value}
                                </a>
                            </div>

                        {:else if cell.type === 'newpage'}
                            <div>
                                <a on:click="{ () => launchPage(cell.id) }"
                                     style="word-wrap: break-word; word-break: break-all;"
                                     class="is-text-semibold add-cursor">

                                    {cell.value}
                                </a>
                            </div>

                        {:else if cell.type === 'text' || cell.type === 'select' || cell.type === 'timeStamp'}
                            <div>
                                {cell.prefix ? cell.prefix : ""}{cell.value}{cell.suffix ? cell.suffix : ""}
                            </div>

                        {:else if cell.type === 'date' }
                            <div>{formatDate(cell.value, calendar)}</div>

                        {:else if cell.type === 'address'}
                            <div class="level">
                                {#if typeof cell.value === "string"}
                                    <strong>{cell.keyName}:</strong> {cell.value}
                                {:else}

                                    {#if cell.value && cell.value.coordinates}
                                        <strong>{cell.keyName}:</strong>
                                        <div>
                                            <div>{cell.value.coordinates[0]}, </div>
                                            <div>{cell.value.coordinates[1]}</div>
                                        </div>
                                    {/if}
                                {/if}
                            </div>

                        {:else if cell.type === 'boolean'}
                            <div class="has-text-tertiary has-text-centered">
                                <strong>{cell.keyName}:</strong> <span>{cell.value ? "&"+"#10004;" : ""}</span>
                            </div>

                        {:else if cell.type === 'del' }
                            <div on:click="{ () => deleteDoc(cell.value)}"
                                 class="add-cursor has-text-end">

                                <span><span class="icon-bg-trash is-medium has-text-danger"></span></span>
                            </div>

                        {:else if cell.type === 'cardImage' }

                        {:else}
                            <strong>{cell.keyName}:</strong> <span>n/a</span>
                        {/if}

                    {/each}
                </div>
            </div>

        </div>
    {/each}
</div>
