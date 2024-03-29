<script>

    /**
     * Field component for html input tags.
     *
     * @module inputs
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error - class to show a field in error
     * @param {String} className
     * @param fieldText {Object}
     *
     * @fires on-inputentry
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
    import {capitalizeString} from "../../../Functions/formatters/capitalizeString";
    import {validateEmail} from '/imports/Functions/formatters/validateEmail'
    import {validatePhone} from '/imports/Functions/formatters/validatePhone'
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    const label = fieldText?.label ?? "n/a";

    //* local reactive variable
    let inValue = "";
    let checkValue = error;

    let attributes = field.attributes;
    let hasShow = field.attributes && field.attributes.type && field.attributes.type === "password";
    let isText = true;
    let showTitles = field?.tag ?? {};
    let timer;

    $: setValue(field.value);


    //* Functions that mutate local variables
    function setValue(val){
        checkValue = error ? "field-error" : "";
        inValue = val;
    }


    //* event handlers
    const debounce = v => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            inValue = v;
            checkInput();
        }, 500);
    }

    function checkInput(){
        let test = formatField(inValue, field.attributes, field.params);

        if(test){
            inValue = test.value;
            checkValue = test.error ? "field-error" : "";

            /**
             * @event on-inputentry
             * @type {object} - {value: value, error: errorVal} with text, number or other types
             */
            dispatch('on-inputentry', test );
        }

        return true;
    }

    function checkShow(){
        if(hasShow){
            attributes.type = isText ? "text" : "password";
            isText = !isText;
        }
    }


    //* pure Functions
    function formatField(val, attr, params){
        let value = val;
        let errorVal = false;

        switch (true) {
            case attr && attr.type && (attr.type === "text"):
                errorVal = !(value.length > 0);

                if(params?.actions === "capitalize"){
                    value = capitalizeString(value);
                }

                break;

            case (attr && attr.type === "email"):
                errorVal = value.length > 0 && !validateEmail(value);
                break;

            case attr && attr.type && (attr.type === "number"):
                if (value || value === 0) {
                    value = parseFloat(value);

                    if (attr.step && Number.isInteger(attr.step)) {
                        value = Math.round(value);
                    }

                    //** check if user input is within range bounds; note that a value of zero is consider as false
                    value = attr.min && value < attr.min ? attr.min : value;
                    value = attr.max && value >= attr.max ? attr.max : value;

                } else {
                    value = "";
                }
                break;

            case attr && attr.type && (attr.type === "tel"):
                let validate = validatePhone(value);
                errorVal = value.length > 0 && !validate.test;
                value = validate.filter
                break;
        }

        return {value: value, error: errorVal};
    }

</script>




{#if hasShow}

    <div class="field--inputs has-field-addons {className} {field.css || ''}">
        <label class="width-full">
            <span>{label}</span>
            <input class="input {checkValue}"
                   {...attributes}
                   bind:value={inValue}
                   on:keyup="{checkInput}">

        </label>

        <button type="button" on:click={checkShow} title="show / hide">
            {#if isText}
                    <span title="{showTitles.show}">
                        <span class="icon-bg-eye is-medium"></span>
                    </span>
            {:else}
                    <span title="{showTitles.hide}">
                        <span class="icon-bg-eye-off is-medium"></span>
                    </span>
            {/if}
        </button>
    </div>

{:else}

    <label class="field--inputs {className.trim()} {field.css || ''}">
        <span>{label}</span>

        <input class="input {checkValue}"
               {...attributes}
               bind:value={inValue}
               on:keyup={({ target: { value } }) => debounce(value)} />
    </label>

{/if}