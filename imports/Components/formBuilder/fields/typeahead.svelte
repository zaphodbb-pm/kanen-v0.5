<script>
    /**
     * Typeahead select component.
     *
     * @module typeahead
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {String} error
     * @param {String} className
     * @param fieldText {Object}
     * @param {Object} field
     * @param {Object} field.params (static) - {type: "staticSelect", rows: 10}
     * @param {Object} field.params (dynamic) - {type: "dynamicSelect", rows: 10, coll: "circuits", filter: {fields: {_id: 1, name: 1}}, options: {sort: {name: 1}}}
     *
     * @fires on-inputentry
     *
     * @see Based on work by {@link https://github.com/mattrosendin/vue-bulma-typeahead|Matt Rosendin}
     *
     * @notes
     *      1. If the number of items is less than the "field.params.rows" value,
     *         this component will display a select box
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";
    export let fieldText;

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support Functions
    import {getDocs} from '/imports/Functions/application/getDocs'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const label = fieldText?.label ?? "n/a";
    let source = fieldText?.selects ?? [];
    let rows = field?.params?.rows ?? 5;
    let selValue = typeof field.value === "object" ? field.value : {_id: "", name: ""};

    //* local reactive variable
    let query = '';
    let matches = [];
    let ids = [];
    let hint = '';
    let selected = false;
    let setList = [];

    setSelects();

    $: setValue(field.value);


    //* event handlers
    function checkQuery(){
        if(query.length < 1){
            query = '';
            matches = [];
            ids = [];
            hint = "";
            selected = false;

        }else{
            getMatches(query);
        }
    }

    function emitSelect(sel) {
        let pos = matches.indexOf(sel);

        sel = sel.replace(/<[\/]?strong>/gm, '');
        let out = {_id: ids[pos], name: sel};

        selected = true;
        query = sel;
        hint = sel;

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: false} with array of objects
         */
        dispatch('on-inputentry', {value: out, error: false}  );
    }

    //* if length of items is less than parms.rows, use a select dropdown style
    function emitDropdown(selId) {
        let item = selId ? setList.find( sl => sl._id === selId) : null;

        if(item){
            let out = {_id: item._id, name: item.name};

            /**
             * @event on-inputentry
             * @type {object} - {value: value, error: false} with array of objects
             */
            dispatch('on-inputentry', {value: out, error: false}  );
        }
    }

    //* Functions that mutate local variables
    function setValue(val) {
        if (!val._id) {
            query = '';
            matches = [];
            ids = [];
            hint = "";
            selected = false;
            selValue = {_id: "", name: ""};
        } else {
            hint = val.name;
            query = val.name;
            selected = true;
            selValue = typeof val === "object" ? val : {_id: "", name: ""};
        }
    }

    function setSelects() {
        let type = field.params && field.params.type ? field.params.type : false;

        if (type && type === "dynamicSelect") {
            let queryDynamic = field.params && field.params.query ? field.params.query : {};
            let filter = field.params.filter ? field.params.filter : {};
            filter = Object.assign(filter, {sort: {sortName: 1} });

            //** a database dip has a long latency; use promises / await to synchronize updates
            getSelects(field.params.coll, queryDynamic, filter);
        } else {
            setList = source ? source : [];
        }
    }

    async function getSelects(coll, q, filter) {
        setList = await getDocs(coll, "select", q, filter);

        if (setList) {
            setList = setList.map(function (s) {
                if (coll === "users") {
                    return {_id: s._id, name: s.username};
                } else {
                    return {_id: s._id, name: s.name};
                }
            });
        }
    }

    function getMatches(query) {
        if (query) {
            let matchesFn = [];
            let idsFn = [];
            let regex = new RegExp(query, 'i');
            let isMatch = false;
            let len = field.params && field.params.rows ? field.params.rows : 5;

            if (typeof query === "string") {

                setList.forEach(src => {
                    if (typeof src !== 'object') new TypeError(`Typeahead sources must be an object. Received ${typeof src}.`);
                    if (matchesFn.length === len) return;

                    let regexProps = regex.exec(src.name);
                    if (regexProps) {
                        isMatch = true;

                        let substr1 = src.name.substring(0, regexProps.index);
                        let substr2 = `<strong>${src.name.slice(regexProps.index, regexProps.index + query.length)}</strong>`;
                        let substr3 = src.name.substring(regexProps.index + query.length);

                        let match = substr1 + substr2 + substr3;
                        matchesFn.push(match);
                        idsFn.push(src._id);

                        if (regexProps.index === 0) {
                            let hintFn = matchesFn[0].replace(/<[\/]?strong>/gm, '').substring(query.length);
                            if (hintFn !== hint) {
                                hint = query + hintFn;
                            }
                        }
                    }
                    if (!isMatch) {
                        hint = '';
                    }
                });
                matches = matchesFn;
                ids = idsFn;

            } else {

                if (Array.isArray(query)) {
                    hint = '';

                    let truncList = setList.filter(sl => {
                        let temp = sl.name.toLowerCase();
                        let test = true;

                        query.forEach(function (q) {
                            let check = temp.includes(q);
                            if (!check) {
                                test = false;
                            }
                        });

                        return test;
                    });

                    matches = truncList.map(sl => sl.name);
                    ids = truncList.map(sl => sl._id);
                }
            }

        } else {
            hint = '';
            matches = [];
            ids = [];
        }
    }

</script>



<div class="field--typeahead vbta {error} {className} {field.css || ''}">

    {#if setList && setList.length <= rows}
        <label class="select {field.css}">
            <span>{label}</span>

            <select {...field.attributes}
                    bind:value="{selValue._id}"
                    on:change="{() => emitDropdown(selValue._id) }">

                <option value=""></option>

                {#each setList as optSelect}
                    <option value="{optSelect._id}">
                        {optSelect.name}
                    </option>
                {/each}

            </select>
        </label>

    {:else}
        <label>
            <span>{label}</span>

            <input type="text" readonly
                   class="input vbta-hint {matches.length > 0 ? 'visible' : '' }"
                   bind:value="{hint}">

            <input type="text" class="input vbta-input"
                   bind:value="{query}"
                   on:keyup="{checkQuery}">
        </label>

        <div class="vbta-menu {matches.length && !selected ? 'visible' : ''}">
            <ul>
                {#each matches as match}
                    <li class="vbta-suggestion" on:click="{ () => emitSelect(match)}">
                        <span>{@html match}</span>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}

</div>


<style>

    .vbta {
        width: 100%;
        position: relative;
        display: block;
        margin: var(--margin-form) 0;
    }

    .vbta > label {
        margin: 0;
    }

    .vbta-input {
        background-color: transparent;
    }

    .vbta-menu.visible {
        display: inline-block;
    }

    .vbta-menu {
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: none;
        float: left;
        min-width: 160px;
        padding: 5px 0;
        margin: 2px 0 0;
        list-style: none;
        font-size: 14px;
        text-align: left;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        background-clip: padding-box;
    }

    .vbta-suggestion {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: normal;
        line-height: 1.4;
        color: #555;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .vbta-suggestion:hover,
    .vbta-suggestion:focus {
        color: #fff;
        text-decoration: none;
        outline: 0;
        background-color: #00bda0;
        cursor: pointer;
    }

    .vbta-hint {
        color: #999;
        position: absolute;
        top: 0;
        left: 0;
        border-color: transparent;
        box-shadow: none;
        opacity: 1;
        background: none 0 0 / auto repeat scroll padding-box border-box rgb(255, 255, 255);
    }
</style>
