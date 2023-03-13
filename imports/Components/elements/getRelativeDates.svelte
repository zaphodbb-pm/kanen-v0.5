<script>
    /**
     * Selector to get a relative date range for database record deletion.
     * Typically used to help manage the records in logs collection.
     *
     * @module getRelativeDates
     * @memberOf Components:elements:
     * @locus Client
     *
     * @fires 'new-range'
     */

    export let text;

    //* support files
    import Field_Wrapper from '/imports/Components/formBuilder/fieldWrapper.svelte'
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* component controls
    let watchFields = {};

    //* local reactive variables
    let field =     {
                field: "relativeDates",
                fieldType: "radios",
                optional: true,

                tab: 0,
                attributes: {},
                params: {cols: 4},
                defaultValue: {_id: "", name: ""},
            };

    //** event handlers
    function fieldChanged(msg){
        let radio = msg.detail && msg.detail.value && msg.detail.value._id ? msg.detail.value._id : "none";
        let now = Date.now();
        let day = 1000 * 3600 * 24;         // milliseconds per day;

        let ranges = {
            none: now,
            days_1: day,
            days_7: day * 7,
            days_30: day * 30,
            days_90: day * 90,
            days_365: day * 365,
            all: 0,
        }

        let out = {$lt: now - ranges[radio] };

        /**
         * @event 'new-range'
         * @type {Object} - {$lt: now - ranges[radio] };
         */

        dispatch('new-range', out);
    }

</script>


<form class="form space-block-vert">
    <Field_Wrapper class="" {field} {watchFields} fieldText="{text}" on:field-changed="{fieldChanged}"/>
</form>
