<script>
    /**
     * Selection box filter plugin for List Holder Filters.
     *
     * @module selectFilter
     * @memberOf Components:listCollections:
     *
     * @param  {Object} field - field info that also configures the filter
     *
     * @fires filter-changed
     *
     */

    //* props
    export let field = {};
    export let listText = {};

    //* support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const label = listText[field.field]?.label ?? "";

    //* local reactive variables
    let selected;
    let outFilter = {};


    //* event handlers
    function emitFilter(sel) {
        let val = sel.replace("_id.", "");

        if (sel === "none" || sel === "all" ) {
            outFilter[field.field + "._id"] = null;
        } else {
            outFilter[field.field + "._id"] = val;
        }

        /**
         * @event filter-changed
         * @type {Object} - {outFilter: <fieldName>: {$gte: isodate, $lte: isodate } }
         */

        dispatch("filter-changed", outFilter);
    }

</script>



<label>
    <span>{label}</span>

    <select title="Select Filter"
            bind:value="{selected}"
            on:change="{() => emitFilter( selected ) }">

        {#each field.filterText as filt}
            <option value="{filt._id}">
                {filt.name}
            </option>
        {/each}}
    </select>
</label>
