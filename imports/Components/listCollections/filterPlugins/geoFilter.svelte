<script>

    /**
     * Geolocation filter plugin for List Holder Filters.
     *
     * @module geoFilter
     * @memberOf Components:listCollections:
     * @locus client
     *
     * @param  {Object} field - field info that also configures the filter
     *
     * @fires filter-changed
     *
     */

    //* props
    export let field = {};
    export let listText = {}

    //* support Functions
    import {calcGeoRadius} from "./func-calcGeoRadius";
    import {userPosition} from '/imports/client/systemStores';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const label = listText[field.field]?.label ?? "";


    //* local reactive variable
    let selected;
    let outFilter = {};
    let me;

    $: me = $userPosition;


    //* event handlers
    function emitFilter(sel, me, field) {
        let out = calcGeoRadius(sel, me, field);
        outFilter[field.field] = out ? {...out} : null;

        /**
         * @event filter-changed
         * @type {Object} - {outFilter: <fieldName>: {$gte: isodate, $lte: isodate } }
         */

        dispatch("filter-changed", outFilter);
    }

</script>


<label>
    <span>{label}</span>

    <select title="Filter"
            bind:value="{selected}"
            on:change="{() => emitFilter( selected, me, field ) }">

        {#each field.filterText as filt}
            <option value="{filt._id}">
                {filt.name}
            </option>
        {/each}}
    </select>
</label>
