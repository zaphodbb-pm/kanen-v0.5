<script>

    /**
     * Grid to list documents and fields for docs.
     *
     * @module cookingNowSearch_grid
     * @memberOf Pages:cookingNowSearch
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

    //* support Functions
    import {dotNotation} from '/imports/Functions/utilities/dotNotation';
    import {timeAgo} from '/imports/Functions/formatters/timeAgo';

    import Show_Loader from '../../../Components/elements/loaderIcon.svelte';


    //* local reactive variables
    let width =  "has-4x-minwidth";
    let notice = "grid image"
    let submit = submitted;
    let items = [];

    $: items = tableItems(collection, labels, documents);


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
                        <img src="{row.image.value.src}"  class="has-aspect-4x3" alt="image" loading="lazy">
                    </figure>

                {:else}
                    {#if notice}
                            <header>{notice}</header>
                    {/if}
                {/if}

                <div>
                    <h2 class="is-title-4">{row.name.value}</h2>
                    <p class="sub-title">{row.writer.value}</p>

                    <p>{row.body.value}</p>
                    <p class="is-size-7">{row.issue.value}</p>
                </div>
            </div>

        </div>
    {/each}
</div>
