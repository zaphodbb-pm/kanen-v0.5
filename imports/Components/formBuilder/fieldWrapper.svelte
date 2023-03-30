<script>
    /**
     * Form wrapper around individual input fields.
     *
     * @module fieldWrapper
     * @memberOf Components:formBuilder:
     *
     * @locus Client
     *
     * @param {Object}  field - set of field parameters
     * @param {String}  field.field - unique field name identifier
     * @param {String}  field.fieldType - type of input field
     * @param {String}  field.adjustLabel - shifts label right to accommodate button add-on
     * @param {Object}  field.attributes - optional additional html attribute settings for field type
     * @param {Object}  field.params - optional additional configuration information for field type
     * @param {Boolean} field.optional - flags a field that must have user input to be valid
     * @param {String}  field.defaultValue - initial input value
     *
     * @param {Object}  field.listen - {src: <fieldName>, key: watching object -> <keyName>, value: <trigger value>}
     * @param {Array}   field.role - list of user role strings that can see this field
     * @param {String}  field.css - certain field inserts can be further modified with css
     *
     * @param {Object} fieldText = labels, helpText etc for an individual field
     * @param {Object} watchFields
     * @param {String} className
     *
     * @notes
     *  Support text is set by 'formHolder' into 'formText' object:
     *      label - field label
     *      helpText - (optional) help text to explain the input field meaning; ditto
     *      tag - (optional) extra text for some Components such as 'switch'
     *      selects - (optional) array of {_id, name} objects for 'select' component
     *
     * @fires field-changed
     *
     */

    //* props
    export let field = {
            adjustLabel: false,
            field: "",
            listen: {
                src: undefined
            },
            defaultValue: undefined,
            value: undefined,
            tag: undefined,
            optional: true,
            fieldType: undefined,
        };
    export let watchFields = {
        field: undefined
    };

    export let fieldText;

    export let components = {};

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support Functions
    //import {components} from './fields/func-registerField';
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* local reactive variables
    let label = fieldText?.label ?? "n/a";
    let helpText = fieldText?.helpText ?? "";
    let fieldHelpShow = false;
    let fieldHide;
    let fieldOpt = "";
    let componentDef;

    field.tag = fieldText?.tag ?? null;

    $: {
        field = prepareField(field);
        fieldHide = !!( (field.listen && field.listen.src) && (field.defaultValue === field.value ) );
    }

    $: {
        if( (field.listen && field.listen.src) && watchFields.field){
            fieldHide = checkWatched(watchFields, field.listen);
        }
    }

    $: componentDef = components[field.fieldType] ?? {};



    //* Functions that mutate local variables
    function prepareField(fieldIn){
        let field = fieldIn;
        let checkVal = typeof field.value !== "undefined" ? field.value : field.defaultValue;
        fieldOpt = testValid(checkVal, field.optional);
        field.fieldValue = checkVal;
        field.value = checkVal;

        return field
    }


    function toggleHelp() {
        fieldHelpShow = !fieldHelpShow;
    }

    function fieldInfo(field) {
        return Object.assign(field, {watchFields: field.watchFields, rawFields: field.rawFields});
    }

    function fieldUpdate(inMsg){
        fieldOpt = testValid(inMsg.detail.value, field.optional);

        /** flow input fields changes up to holder
         *
         * @event field-changed
         * @type {object}
         */

        dispatch('field-changed', {
            field: field.field,
            fieldType: field.fieldType,
            value: inMsg.detail.value,
            defaultValue: field.defaultValue,
            valid: !fieldOpt,
        });
    }



    //* pure Functions
    function testValid(val, optional){
        //** test for valid values in field
        let test;

        if (typeof val === "object" && val !== null) {
            test = Array.isArray(val) ? (val.length > 0) : (val._id && !!val._id);
        } else {
            test = !!val;
        }

        return optional || test ? "" : "field-error";
    }

    function checkWatched(watched, listen){
        let hide;
        let key = listen.key;
        let val = listen.value;

        switch (true) {

            case !!(key && !val):
                hide = watched.value[key] === watched.defaultValue[key];
                break;

            case !!(key && val):
                if (val.includes("!")) {
                    hide = ("!" + watched.value[key] === val);
                } else {
                    hide = !(watched.value[key] === val);
                }
                break;

            case !!(!key && val):
                if (val.includes("!")) {
                    hide = (("!" + watched.value) === val);
                } else {
                    hide = !(watched.value === val);
                }
                break;

            default:
                hide = watched.value === watched.defaultValue;
        }

        return hide;
    }

    function checkDefault(arr, listen){
        //* for initial state, check for watched default and select value to track
        let out = false;

        arr.forEach(function (s) {
            if (s.field === listen.src) {

                switch (true) {

                    case s.value.hasOwnProperty('_id') && s.defaultValue.hasOwnProperty('_id'):
                        out = s.value._id === s.defaultValue._id;
                        out = out || (listen.value !== s.value._id);
                        break;

                    case s.value.hasOwnProperty('name') && s.defaultValue.hasOwnProperty('name'):
                        out = s.value.name === s.defaultValue.name;
                        out = out || (listen.value !== s.value.name);
                        break;

                    default:
                        out = s.value === s.defaultValue;
                }
            }
        });

        return out;
    }

</script>



{#if !fieldHide && componentDef}
    {#if helpText}

        <div class="has-help-text">
            <span on:click|stopPropagation="{toggleHelp}">
                <span class="icon-bg-help"></span>
            </span>

            <svelte:component
                    this="{componentDef}"
                    class="{className + ' fieldname--' + field.field}"
                    {field}
                    {fieldText}
                    error="{fieldOpt}"
                    on:on-inputentry="{fieldUpdate}"/>

            {#if fieldHelpShow}
                <p transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">
                    {@html helpText}
                </p>
            {/if}
        </div>

    {:else}

        <svelte:component
                this="{componentDef}"
                class="{className + ' fieldname--' + field.field}"
                {field}
                {fieldText}
                error="{fieldOpt}"
                on:on-inputentry="{fieldUpdate}"/>

    {/if}
{/if}