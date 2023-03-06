<script>
    /**
     * Static and dynamic select field.
     *
     * @module selects
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {Object} field.params1 - {type: "staticSelect", colours: true}
     * @param {Object} field.params2 - {type: "dynamicSelect", coll: "starter", filter: {fields: {name: 1}}, options: {sort: {name: 1}} }
     * @param {String} className
     *
     * @fires on-inputentry
     *
     * @notes
     *  params- {type, coll, field, filter} object provides behaviour information:
     *      params: {type: "staticSelect"} - uses array of objects from the associated text file
     *
     *      params: {type: "dynamicSelect", coll: "companies", query: {}, filter: {fields: {name: 1}, sort: {name: 1}} }
     *          - retrieves all "companies" name field as an array for the select operation
     *
     *      params: {type: "dynamicSelectArray", coll: "companies", query: {}, field: "departments, filter: {fields: {departments: 1}} }
     *          - finds one document from "companies" and extracts the field and builds an array for the select operation
     *          - note that the retrieval will automatically query with {tenantId: user.tenantId}
     *
     *      params: {type: "dynamicSelectRow", coll: "companies", query: {}, field: "locations, filter: {fields: {locations: 1}} }
     *          - finds one document from "companies" and extracts the field row and builds an array for the select operation
     *          - note that the retrieval will automatically query with {tenantId: user.tenantId}
     *
     */


    //* common props from parent
    export let field = {};
    export let error = "";

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support Functions
    import {getDocs} from '/imports/Functions/application/getDocs'
    import {getContext, createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText ? formText[field.field]?.label ?? "" : "Undefined Field Label";
    const firstOption = formText[field.field]?.tag ?? "";

    let source = formText[field.field]?.selects ?? [];


    //* local reactive variable
    let selValue = "";
    let showColours = !!(field.params && field.params.colours);
    let activeColour = "#dbdbdb";

    let selects = [];
    setSelects();

    $: setValue(field.value);


    //* event handlers
    function emitSelect(selId) {
        let item = source.find( (s) => s._id === selId );       // get text for _id values
        let colour = item && item.colour ? item.colour : null;
        let out = colour ? {_id: item._id, name: item.name, colour: colour} : {_id: item._id, name: item.name};
        activeColour = colour;

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: false} with array of objects
         */
        dispatch('on-inputentry', {value: out, error: false}  );
    }

    //* Functions that mutate local variables
    function setValue(val){
        selValue = val._id ? val._id : (selects[0] && selects[0]._id ? selects[0]._id : "" );
        activeColour = val && val.colour ? val.colour : "#dbdbdb";
    }

    function setSelects() {
        let type = field.params && field.params.type ? field.params.type : false;
        let filter = field.params && field.params.filter ? field.params.filter : {};
        let query = field.params && field.params.query ? field.params.query : {};

        switch (true) {
                //** a database dip has a long latency; use promises / await to synchronize updates
                //** async Functions in Vue do NOT play happily with normal code
            case (type && type === "dynamicSelect"):
                getSelects(field.params.coll, query, filter);
                break;

            case (type && type === "dynamicSelectArray"):
                getSelectsField(field.params.coll, query, filter, "array");
                break;

            case (type && type === "dynamicSelectRow"):
                getSelectsField(field.params.coll, query, filter, "row");
                break;

            default:
                selects = source ? source : [];
        }
    }


    async function getSelects(coll, query, filter) {
        let out = await getDocs(coll, "select", query, filter);

        if (out) {
            out = out.map(function (s) {
                if (coll === "users") {
                    return {_id: s._id, name: s.username};
                } else {
                    return {_id: s._id, name: s.name};
                }
            });
        }

        let prepend = field.params && field.params.prepend ? field.params.prepend : null;
        if(prepend){
            out.unshift(prepend)
        }

        selects = out ? out : [];
        source = out ? out : [];
    }

    async function getSelectsField(coll, query, filter, type) {
        //let paramsField = field.params && field.params.field ? field.params.field : null;

        const paramsField = field?.params?.field ?? null;
        let docs = await getDocs(coll, "oneAllFields", query, filter);

        if (paramsField) {
            if (type && type === "array") {
                source = docs[paramsField];
            }

            if (type && type === "row") {
                source = docs[paramsField].map((r) => {
                    return {_id: r.id, name: r.td0}
                });
            }
        }
    }

</script>



<label class="field--selects {showColours ? 'has-colour-icon' : ''} {error} {className} {field.css || ''}">
    <span>{label}</span>

    {#if showColours}
        <div class="status-item" style="background-color: {activeColour};"></div>
    {/if}

    <select name="{field.field}"
            class="{error}"
            {...field.attributes}
            bind:value="{selValue}"
            on:change="{() => emitSelect(selValue) }">

        <option disabled value="{firstOption._id}">{firstOption.name}</option>

        {#each selects as optSelect}
            <option value="{optSelect._id}">
                {optSelect.name}
            </option>
        {/each}

    </select>
</label>


<style>
    .has-colour-icon select {
        padding-left: 2.5em;
    }

    .status-item {
        position: absolute;
        top: 0.75em;
        left: 1em;


        height: 1em;
        width: 1em;
        border-radius: 50%;

        z-index: 1;
    }
</style>

