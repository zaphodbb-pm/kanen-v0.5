<script>/**
     * ChangePassword page accepts new password and requires old password before change is enabled.
     *
     * @name changePassword
     * @module
     * @memberOf Pages:changePassword
     * @locus Client
     *
     * @param {String} currentRoute - page path name
     * @param {Object} params - any parameters from path url
     * @param {Object} query - any query fragment from path url
     *
     */



    //* page set-up boilerplate *************************************

    //** setup props to receive route data (optional)
    export let currentRoute;
    export let params = {};
    export let query = {};

    //** page specific text and configuration
    import {header, page} from './changePassword_text';
    import {pageConfig} from './changePassword_config';

    //** app support files
    import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang, userExtras} from '/imports/client/systemStores';
    import {roles} from './changePassword_nav';

    import {goto} from "svelte-pathfinder";
    import {components} from "../../../Components/formBuilder/fields/func-registerBasicFields";
    import Field_Wrapper from '/imports/Components/formBuilder/fieldWrapper.svelte'


    //* local reactive variables
    const pageHeader = i18n(header, "", $lang);
    let formFields = pageConfig.form;
    let text = i18n(page, "page", $lang);
    let errMsg = i18n(page, "errMsg", $lang);
    let formText = i18n(page, "form", $lang);

    let formOldPassword = "";
    let formNewPassword = "";
    let messages = [];
    let watchFields = {};
    let formType = "reset";


    //** check type of password change needed
    $: getType(query);

    async function getType(query) {
        formType = query.type ?? "reset";
    }


    //** event handlers
    function fieldChanged(msg){
        switch(msg.detail.field){
            case "oldPassword":
                formOldPassword = msg.detail.value
                break;

            case "newPassword":
                formNewPassword = msg.detail.value;
                break;
        }

        watchFields = msg.detail;
    }


    function changePassword(){
        messages = [];

        let userRole = $userExtras?.role?._id ?? "n/a";
        let verify = roles.write.includes(userRole);

        switch(true) {
            case verify && formType === "change":
                Accounts.changePassword(formOldPassword, formNewPassword, function (err) {
                    if (err) {
                        let msg = errMsg[err.error];
                        if(typeof err === "object" && !msg){
                            messages = [...messages, errMsg[401]];
                        }else{
                            messages = [...messages, msg];
                        }
                    } else {
                        messages = [...messages, errMsg[200]];
                    }
                });
                break;

            case formType === "reset" && !!query.token:
                Accounts.resetPassword(query.token, formNewPassword, function(err){
                    if(err){
                        messages = [...messages, err];
                    }else{
                        goto("/recipesSearch");
                    }
                })

                break;

            default:
                messages = [...messages, errMsg[404]];
        }
    }

</script>


<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="level-centered">
        <form class="form has-form-shadow has-width-20rem">
            <header class="is-secondary">{text?.formTitle[formType]}</header>

            {#if formType === "change" }
                <Field_Wrapper
                        class=""
                        field="{formFields.oldPassword}"
                        {components}
                        {watchFields}
                        fieldText={formText.oldPassword}
                        on:field-changed="{fieldChanged}"/>
            {/if}

            <Field_Wrapper
                    class=""
                    field="{formFields.newPassword}"
                    {components}
                    {watchFields}
                    fieldText={formText.newPassword}
                    on:field-changed="{fieldChanged}"/>

            <button type="button" class="is-primary" on:click="{changePassword}">
                {text?.formPassword[formType]}
            </button>

            {#if messages.length > 0}
                <div class="space-block-vert">
                    <div class="message is-warning-light" class:is-hidden="{messages.length < 1}">
                        <div class="message-body">
                            {#each messages as message}
                                <p>{message}</p>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}

        </form>
    </div>

</main>