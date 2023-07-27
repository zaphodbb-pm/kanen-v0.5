<script>

    /**
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
    const services = pageConfig.services;
    const formFields = pageConfig.form;
    const formText = i18n(page, "form", $lang);

    const servicesSubscribe = pageConfig.servicesSubscribe;
    const formFieldsSubscribe = [ pageConfig.formSubscribe[0] ];
    const formTextSubscribe = i18n(page, "formSubscribe", $lang);


    //* local reactive variables
    let text = i18n(page, "page", $lang);
    let formEmail = "";
    let formPassword = "";
    let formEmailSubscribe = "";
    let formPasswordSubscribe = "";
    let messages = [];
    let messagesSubscribe = [];
    let watchFields = {};


    //** normal login functions
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
            messages = [...messages, err.message];
        } else {
            goto("/recipesSearch")
        }
    }

    function forgotPassword(){
        Accounts.forgotPassword({email: formEmail}, function(err){
            if(err){
                messages = [...messages, err.message];
            }else{
                messages = [...messages, formText.resetEmail];
            }
        });
    }


    //** subcribe setup functions
    function fieldChangedSubscribe(msg){
        switch(msg.detail.field){
            case "subscribeEmail":
                formEmailSubscribe = msg.detail.value
                break;

            case "subscribePassword":
                formPasswordSubscribe = msg.detail.value;
                break;
        }
    }

    function authSubscribe() {
        Meteor.call("addSubscriber", formEmailSubscribe, function(err, res){
            if(err){ messagesSubscribe = [...messagesSubscribe, err.message]; }

            if(res){
                messagesSubscribe = [...messagesSubscribe, res.text];
                if(res.status !== 406){
                    messagesSubscribe = [...messagesSubscribe, formTextSubscribe.createAccountEmail];
                }
            }
        });
    }


    function redirectSubscribe(err){
        messagesSubscribe = [];
        if (err) {
            messagesSubscribe = [...messagesSubscribe, err.message];
        } else {
            goto("/recipesSearch")
        }
    }

</script>

<PageHeader header="{pageHeader}" />

<main class="main-content">

    <div class="level-centered">
        <form class="form has-form-shadow has-width-20rem space-block">
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

            <button type="button" class="is-primary has-hover" on:click="{authPassword}">
                {text.btnSend}
            </button>

            <p class="space-element-vert">
                <a href="#" on:click|stopPropagation={forgotPassword} >{text.forgotPassword}</a>
            </p>

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

        <form class="form has-form-shadow has-width-20rem space-block">
            <header class="is-warning">{text.labelSubscribe}</header>

            {#each formFieldsSubscribe as field}
                <Field_Wrapper
                        class=""
                        {field}
                        {components}
                        {watchFields}
                        fieldText={formTextSubscribe[field.field]}
                        on:field-changed="{fieldChangedSubscribe}"/>
            {/each}

            <button type="button" class="is-primary-outlined has-hover" on:click="{authSubscribe}">
                {text.btnSendSubscribe}
            </button>

            {#if servicesSubscribe}
                <div class="is-divider field-hr" style="margin: 2.5rem 0 0.5rem 0;" data-content="{text.labelDivider}"></div>

                {#each servicesSubscribe as service}
                    <div class="divider-box">
                        <div class="divider" data-content="{text.labelDivider}"></div>

                        <Auth_Service on:on-auth={Auth} {...service} />
                    </div>

                {/each}
            {/if}


            {#if messagesSubscribe.length > 0}
                <div class="space-block-vert">
                    <div class="message is-warning-light" class:is-hidden="{messagesSubscribe.length < 1}">
                        <div class="message-body">
                            {#each messagesSubscribe as message}
                                <p>{message}</p>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}

        </form>
    </div>

</main>