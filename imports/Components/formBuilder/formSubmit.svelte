<script>
    /**
     * Submit button for form.
     *
     * @module formSubmit
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {String}   btnEdit
     * @param {String}   btnCreate
     * @param {String}   btnBack
     * @param {Object}   btnInvText
     *
     * @param {Boolean}  btnBackShow
     * @param {Boolean}  btnState
     * @param {Boolean}  btnInvalid
     * @param {Number}   btnCount
     * @param {Array}    invalidFields
     *
     * @fires back-btn
     * @fires submit-btn
     *
     */

    //* svelte handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* props
    export let btnEdit;
    export let btnCreate;
    export let btnBack;
    export let btnInvText;

    export let btnBackShow;
    export let btnState;
    export let btnInvalid;
    export let btnCount;
    export let invalidFields = [];


    //* reactive variables
    let formBtn =  btnCreate;
    let formBtnColor =  "is-primary";
    let formBtnColorAlt =  "is-secondary-outlined";
    let btnColor =  "is-tertiary";
    let errFields = [];

    $:  setBtnState(btnState);

    $: errFields = invalidFields;


    function submit() {
        /**
         * @event submit-btn
         * @type {Boolean}
         */

        dispatch('submit-btn', true);
    }

    function backToCaller() {
        /**
         * @event back-btn
         * @type {Boolean}
         */
        dispatch('back-btn', true);
    }

    function invalidMsg() {
        return btnCount === 1 ? btnInvText.suffix1 : btnInvText.suffixn;
    }


    function setBtnState(state) {
        formBtn = state ? btnEdit : btnCreate;
        btnColor = state ? formBtnColorAlt : formBtnColor;
    }


</script>


<div class="submit-buttons">
    <div class="level">
        <button type="button" class="{btnColor} has-hover" on:click="{submit}">
            {formBtn}
        </button>

        {#if btnBackShow}
            <button type="button"  class="is-link" on:click="{backToCaller}">
                {btnBack}
            </button>
        {/if}
    </div>

    {#if btnInvalid}
        <p class="has-text-danger">
            {btnInvText.prefix} {btnCount} {invalidMsg() }
            <span class="has-text-weight-semibold">
                {errFields.join(", ")}.
            </span>
        </p>
    {/if}
</div>


