<script>
    /**
     * Date filter plugin for List Holder Filters.
     *
     * @module dateFilter
     * @memberOf Components:list
     * @locus client
     *
     * @param  {Object} field - field info that also configures the filter
     *
     * @fires filter-changed
     *
     */

    //* props
    export let field = {};

    //* support functions
    import {onMount, onDestroy, createEventDispatcher, getContext} from 'svelte';
    const dispatch = createEventDispatcher();
    const listText = getContext("listText");
    const label = listText[field.field]?.label ?? "";

    //* local reactive variable
    let outFilter = {};
    let hasRange = false;
    let inValue = "";
    let fp;

    let relativeDates = field.filterText && field.filterText.relativeDates && Array.isArray(field.filterText.relativeDates);
    let selected;

    //* lifecycle states

    /*
    onMount( () => {
        //** if using absolute date range, then mount "filepickr" component
        if(!relativeDates){
            let target = document.getElementById("fp_" + field.field);
            fp = flatpickr(target, field.filter);
            fp.config.onChange.push(dateUpdate );
            fp.jumpToDate(inValue);
        }
    });

     */

    /*
    onDestroy( () => {
        if(!relativeDates){
            fp.destroy();
        }
    });

     */


    //* event handlers
    function emitFilter(sel) {

        if (sel === "none" || sel === "all" ) {
            outFilter[field.field] = null;
        } else {
            let now = Date.now();
            let parts = sel.split("_");
            let offset = parseInt( parts[2] ) * 1000 * 3600 * 24;   // time expressed in milliseconds / day
            let dir = parts[1] === "p" ? -1 : 1;

            let past = ( new Date(now - offset) ).toISOString();
            let today = ( new Date(now) ).toISOString();
            let future = ( new Date(now + offset) ).toISOString();

            outFilter[field.field] = dir < 0 ? {$gte: past, $lte: today} : {$gte: today, $lte: future};
        }

        /**
         * @event filter-changed
         * @type {Object} - {outFilter: <fieldName>: {$gte: isodate, $lte: isodate } }
         */
        dispatch("filter-changed", outFilter);
    }

    function clearDateRange() {
        inValue = "";
        outFilter[field.field] = null;
        hasRange = false;
        //fp.clear();


        dispatch("filter-changed", outFilter);
    }

    function dateUpdate(ev) {
        if (Array.isArray(ev) && ev.length === 2) {
            let start = new Date(ev[0]);
            let end = new Date(ev[1]);

            if(field.type === "timeStamp"){
                outFilter[field.field] = {$gte: start.getTime(), $lte: end.getTime()};
            }else{
                outFilter[field.field] = {$gte: start.toISOString(), $lte: end.toISOString()};
            }

            hasRange = true;
            dispatch("filter-changed", outFilter);
        }
    }

</script>



{#if relativeDates}

    <label>
        <span>{label}</span>

        <select title="Date Filter"
                bind:value="{selected}"
                on:change="{() => emitFilter( selected ) }">

            {#each field.filterText.relativeDates as filt}
                <option value="{filt._id}">
                    {filt.name}
                </option>
            {/each}}
        </select>
    </label>

{:else}

    <div style="flex-wrap: nowrap; width: 75%;">
        <div class="has-field-addons">
            <label>
                <span>{label}</span>

                <input type="date"
                       id="fp1_{field.field}"
                       style="width: 9rem;"
                       bind:value="{inValue}"
                       placeholder={field.filterText.placeholder}>
            </label>

            <label>
                <input type="date"
                       id="fp2_{field.field}"
                       style="width: 9rem;"
                       bind:value="{inValue}"
                       placeholder={field.filterText.placeholder}>
            </label>

            {#if hasRange}
                <button type="button" class="is-warning" on:click="{clearDateRange}">
                    <span class="delete"></span>
                </button>
            {/if}

        </div>
    </div>





    <!--
    <div class="field has-addons">
        <div class="control">
            <label>
                <input type="date"
                       id="fp_{field.field}"
                       style="width: 8rem;"
                       bind:value="{inValue}"
                       placeholder={field.filterText.placeholder}>
            </label>
        </div>

        {#if hasRange}
            <div class="control">
                <button type="button" class="is-warning" on:click="{clearDateRange}">
                    <span class="delete"></span>
                </button>
            </div>
        {/if}
    </div>
    -->

{/if}
