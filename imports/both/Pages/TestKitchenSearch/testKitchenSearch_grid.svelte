<script>

    /**
     * Grid to list documents and fields for docs.
     *
     * @module testKitchenSearch_grid
     * @memberOf Pages:testKitchenSearch
     * @locus Client
     *
     * @param  {Object} config - decoration for table
     * @param  {Array}  labels
     * @param  {Object} gridText
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
    export let gridText = {};
    export let documents = {};
    export let collection = "";
    export let submitted = false;
    export let showLoader = false;

    // get the user language preference from store
    import {lang} from '/imports/client/systemStores';
    import commonText from "../../../client/text_common"

    //* support Functions
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {dotNotation} from '/imports/Functions/utilities/dotNotation';
    import {timeAgo} from '/imports/Functions/formatters/timeAgo';

    import Show_Loader from '../../../Components/elements/loaderIcon.svelte';


    //* local reactive variables
    let calendar = i18n( commonText, "calendar", $lang);
    let width =  "has-3x-minwidth";
    let notice = "Test Kitchen"
    let submit = submitted;
    let items = [];

    $: items = tableItems(collection, labels, documents);


    //* build array of arrays of display objects
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

<Show_Loader {showLoader} />

<div class="row {width}">
    {#each items as row, idx}
        <div class="column">

            <div class="card" style="overflow: hidden; max-width: 32rem;">
                {#if row.image &&  row.image.value && row.image.value.src}
                    <figure>
                        <img src="{row.image.value.src}"  class="has-aspect-2x1" alt="image" loading="lazy">
                    </figure>

                {:else}
                    {#if notice}
                        <header class="card-no-image">{notice}</header>
                    {/if}
                {/if}

                <div>
                    <h2 class="is-title-4">
                        <a href='/testKitchenShow?testKitchenId={row.testKitchenId?.value ?? "na"}' target="_blank">
                            {row.name?.value}
                        </a>
                    </h2>

                    <p class="is-size-7"><b>{row["type.name"]?.value ?? ""}</b><br>{row.issue?.value}</p>
                </div>
            </div>

        </div>
    {/each}
</div>

<style>
    .card header.card-no-image {
        margin: 2rem 0;
        text-align: center;
        font-size: var(--size-5);
        font-weight: bold;
    }
</style>