<script>/**
 * Standard Login page.
 *
 * @name login
 * @module
 * @memberOf Pages:login
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
        import {header, page} from './login_text'
        import {pageConfig} from './login_config'

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {goto} from  'svelte-pathfinder';

    import {components} from "../../../Components/formBuilder/fields/func-registerBasicFields";
    import Field_Wrapper from '/imports/Components/formBuilder/fieldWrapper.svelte';
    import Auth_Service from './authService.svelte';

    //* local static variables
    const pageHeader = i18n(header, "", $lang);
    let services = pageConfig.services;
    let formFields = pageConfig.form;
    let formText = i18n(page, "form", $lang);

    //* local reactive variables
    let text = i18n(page, "page", $lang);
    let formEmail = "";
    let formPassword = "";
    let messages = [];
    let watchFields = {};

    function fieldChanged(msg){
        switch(msg.detail.field){
            case "loginEmail":
                formEmail = msg.detail.value
                break;

            case "loginPassword":
                formPassword = msg.detail.value;
                break;
        }

        watchFields = msg.detail;
    }


    function authPassword() {
        Meteor.loginWithPassword({email: formEmail}, formPassword, function (err) {
            redirect(err);
        });
    }

    function Auth(msg){
        redirect(msg.detail.err);
    }

    function redirect(err){
        messages = [];
        if (err) {
            messages.push(err.message);
        } else {
            goto("/my-profile")
        }
    }

</script>

<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="level-centered">
        <form class="form has-form-shadow has-width-20rem">
            <header class="is-secondary">{text.labelTitle}</header>

            {#each formFields as field}
                <Field_Wrapper
                        class=""
                        {field}
                        {components}
                        {watchFields}
                        fieldText={formText[field.field]}
                        on:field-changed="{fieldChanged}"/>
            {/each}

            <button type="button" class="is-primary" on:click="{authPassword}">
                {text.btnSend}
            </button>

            {#if services}
                <div class="is-divider field-hr" style="margin: 2.5rem 0 0.5rem 0;" data-content="{text.labelDivider}"></div>

                {#each services as service}
                    <div class="divider-box">
                        <div class="divider" data-content="{text.labelDivider}"></div>

                        <Auth_Service on:on-auth={Auth} {...service} />
                    </div>

                {/each}
            {/if}


            {#if messages.length > 0}
                <div class="space-component"></div>

                <div class="message is-warning-light" class:is-hidden="{messages.length < 1}">
                    <div class="message-body">
                        {#each messages as message}
                            <p>{message}</p>
                        {/each}
                    </div>
                </div>
            {/if}

        </form>
    </div>

</main>