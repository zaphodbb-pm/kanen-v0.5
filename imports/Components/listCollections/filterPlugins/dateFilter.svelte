<script>

/**
 * Date filter plugin for List Holder Filters.
 *
 * @module dateFilter
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
    export let listText = {};

    //* support Functions
    import {buildDate} from "./func-buildDate";
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const label = listText[field.field]?.label ?? "";

    //* local reactive variable
    let outFilter = {};
    let hasRange = false;
    let inValue1 = "";
    let inValue2 = "";

    let relativeDates = field.filterText && field.filterText.relativeDates && Array.isArray(field.filterText.relativeDates);
    let selected;

    //* event handlers
    function emitFilter(sel) {

        console.log("emitFilter", inValue1, inValue2);

        if (sel === "none" || sel === "all" ) {
            outFilter[field.field] = null;
        } else {
            const now = Date.now();

            const parts = sel.split("_");

            const offset = parseInt( parts[2] ) * 1000 * 3600 * 24;   // time expressed in milliseconds / day

            const dir = parts[1] === "p" ? -1 : 1;

            const past = ( new Date(now - offset) ).toISOString();
            const today = ( new Date(now) ).toISOString();
            const future = ( new Date(now + offset) ).toISOString();

            outFilter[field.field] = dir < 0 ? {$gte: past, $lte: today} : {$gte: today, $lte: future};
        }

        /**
         * @event filter-changed
         * @type {Object} - {outFilter: <fieldName>: {$gte: isodate, $lte: isodate } }
         */
        dispatch("filter-changed", outFilter);
    }


    function clearDateRange() {
        inValue1 = "";
        inValue2 = "";
        outFilter[field.field] = null;
        hasRange = false;

        dispatch("filter-changed", outFilter);
    }

    function dateUpdate() {
        let start = "";
        let end = "";

        switch(true){
            case !!inValue1 && !inValue2:
                start = inValue1;
                inValue2 = buildDate(start, 1);
                end = inValue2;
                break;

            case !inValue1 && !!inValue2:
                end = inValue2;
                inValue1 = buildDate(end, -1);
                start = inValue1;
                break;

            case !!inValue1 && !!inValue2:

                if(inValue1 < inValue2){
                    start = inValue1;
                    end = inValue2;
                }else{
                    start = inValue2;
                    end = inValue1;

                    let temp = inValue1;
                    inValue1 = inValue2;
                    inValue2 = temp;
                }
                break;
        }

        hasRange = true;
        outFilter[field.field] = {$gte: start, $lte: end};

        dispatch("filter-changed", outFilter);
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
                       bind:value="{inValue1}"
                       placeholder={field.filterText.placeholder}
                       on:input="{dateUpdate}">
            </label>

            <label>
                <input type="date"
                       id="fp2_{field.field}"
                       style="width: 9rem;"
                       bind:value="{inValue2}"
                       placeholder={field.filterText.placeholder}
                       on:input="{dateUpdate}">
            </label>

            {#if hasRange}
                <button type="button" class="is-warning" on:click="{clearDateRange}">
                    <span class="delete"></span>
                </button>
            {/if}

        </div>
    </div>

{/if}
