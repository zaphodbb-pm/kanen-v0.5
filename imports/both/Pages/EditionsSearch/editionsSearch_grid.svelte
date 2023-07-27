<script>

    /**
     * Grid to list documents and fields for docs.
     *
     * @module editionsSearch_grid
     * @memberOf Pages:editionsSearch
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
    import {dotNotation} from '/imports/Functions/utilities/dotNotation'
    import {timeAgo} from '/imports/Functions/formatters/timeAgo'


    //* local reactive variables
    let width =  "has-3x-minwidth";
    let notice = "grid image"
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


<div class="row {width}">
    {#each items as row, idx}
        <div class="column">

            <article class="card edition-swatch">
                {#if row.image &&  row.image.value && row.image.value.src}
                    <figure>
                        <img src="{row.image.value.src}"  class="" alt="image" loading="lazy">
                    </figure>

                {:else}
                    {#if notice}
                        <p>{notice}</p>
                    {/if}
                {/if}

                <header style="margin: 0">
                    <h2>
                        <a href='/editionsShow?editionId={row.editionId?.value ?? "na"}' target="_blank">
                            {row?.issue?.value}
                            <span class="icon-bg-folder"></span>
                        </a>
                    </h2>
                </header>

                <div class="stack links-stack">
                    {#if row.pdfLink?.value}
                        <a href="{row.pdfLink.value}" target="_blank">FC Community Drive</a>
                    {/if}

                    {#if row.zinioLink?.value}
                        <a href="{row.zinioLink.value}" target="_blank">finecooking@zinioapps</a>
                    {/if}

                    {#if row.archiveLink?.value}
                        <a href="{row.archiveLink.value}" target="_blank">Archive.org</a>
                    {/if}
                </div>
            </article>

        </div>
    {/each}
</div>


<style>
    .edition-swatch {
        overflow: hidden;
        max-width: 16rem;
    }

    .links-stack {
        width: auto;
    }



</style>
