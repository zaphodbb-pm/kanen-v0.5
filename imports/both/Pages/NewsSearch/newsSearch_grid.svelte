<script>

    /**
     * Grid to list documents and fields for docs.
     *
     * @module newsSearch_grid
     * @memberOf Pages:newsSearch
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
    export let submitted = false

    //* support Functions

    import {dotNotation} from '/imports/Functions/utilities/dotNotation'
    import {timeAgo} from '/imports/Functions/formatters/timeAgo'


    //* local reactive variables
    let width =  "has-5x-minwidth";
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


<div class="row {width}">
    {#each items as row, idx}
        <div class="column">

            <article class="card">
                <header class="width-full has-text-centered">
                    <h2>{row.name.value}</h2>
                    <p>{row.updatedAt?.value}</p>
                </header>

                <div class="level-start is-mobile">
                    <figure class="has-width-8rem">
                        {#if row.image?.value?.src}
                            <img src="{row.image?.value?.src}" alt="News item image">
                        {:else }
                            <span class="is-dark has-text-centered">no image</span>
                        {/if}
                    </figure>

                    <p>{row.body.value}</p>
                </div>
            </article>

        </div>
    {/each}
</div>
