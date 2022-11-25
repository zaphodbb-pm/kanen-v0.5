<script>
    /**
     * Builds filter component for list.
     *
     * @module listFilters
     * @memberOf Components:listCollections:
     * @locus Client
     *
     * @param  {Array} filters - array of filter objects
     *
     * @fires 'filters-changed'
     *
     * @notes
     *  Types:
     *      "date" - looks for a fixed date within a date range filter
     *      "select" - looks for docs that meet the selector value
     *      "object" - looks for docs that have a "geoLocation" field value; relative distance from the user
     *
     */

    //* props
    export let filters = [];

    //* support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* add filter plugins
    import Filter_Date from './filterPlugins/dateFilter.svelte'
    import Filter_Select from './filterPlugins/selectFilter.svelte'
    import Filter_Geo from './filterPlugins/geoFilter.svelte'

    let filterInserts = {
        date: Filter_Date,
        select: Filter_Select,
        address: Filter_Geo,
        timeStamp: Filter_Date,
    }

    //* local reactive variables
    let outFilter = {};

    //* event handlers
    function filterUpdate(msg){
        Object.entries(msg.detail).forEach( (m) => {
            if (m[1] ){
                outFilter[ m[0] ] = m[1];
            }else{
               delete outFilter[ m[0] ];
            }
        })

        /**
         * @event filters-changed
         * @type {Object} - outFilter, a valid MongoDb selector object across all filter Components
         */
        dispatch("filters-changed", outFilter);
    }

</script>




<div class="field-group" style="flex-wrap: nowrap;">
    {#each filters as field (field.field)}
        <div class="filter-items">

            <svelte:component
                    this="{filterInserts[field.type]}"
                    {field}
                    on:filter-changed="{filterUpdate}"/>

        </div>
    {/each}
</div>