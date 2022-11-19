<script>
    /**
     * Layout for MyProfile page.
     *
     * @name myProfile
     * @module
     * @memberOf Pages:myProfile
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {header, page} from './myProfile_text'
        import {pageConfig} from './myProfile_config'

        //** app support files
        import { onMount } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    import Form_Holder from '/imports/Components/formBuilder/formHolder.svelte'
    import schema from './myProfile_form_schema'

    let formText = i18n(page, "form", $lang);

    //* local reactive variables
    const pageHeader = i18n(header, "", $lang);
    let conf = pageConfig;
    let role = "";
    let editdoc = {};
    let directdoc = {};

    let submitted = false;
    let currentDoc = {};
    let showList = false;
    let showForm = false;
    let releaseEdit = false;

    let  baseProfile = {
        id: "",
        type: "create",
        coll: conf.form.coll,
        data: {email: " "},
    };


    onMount( () => {
        currentDoc = baseProfile;
        getMyDoc();
    });

    function docSent(msg) {
        if (msg) {
            getMyDoc();
        }
    }

    function getMyDoc() {
        currentDoc = baseProfile;

        //** get current logged in user
        let me = Meteor.user();

        if(me){
            currentDoc = {
                id: me._id,
                type: "edit",
                coll: conf.form.coll,
                data: me.profile,
            };
        }
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">
    <div id="my-profile-display" class="column">

        <Form_Holder
                config="{conf.form}"
                {formText}
                {schema}
                {role}
                editdoc={currentDoc}
                {directdoc}

                on:doc-submitted="{docSent}"/>

    </div>
</main>





