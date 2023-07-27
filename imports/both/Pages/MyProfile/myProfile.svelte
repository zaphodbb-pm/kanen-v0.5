<!--suppress UnnecessaryLabelJS -->
<script>

    /**
     * MyProfile page is a form to populate the profile field in the user object.
     *
     * @name myProfile
     * @module
     * @memberOf Pages:myProfile
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
        import {header, page} from './myProfile_text'
        import {pageConfig} from './myProfile_config'

        //** app support files
        import { onMount } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    import {components} from "../../../Components/formBuilder/fields/func-registerFileFields";
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
    let user;

    let  baseProfile = {
        id: "",
        type: "create",
        coll: conf.form.coll,
        data: {email: " "},
    };

    $m: user = Meteor.user();


    onMount( async () => {
        currentDoc = baseProfile;

        Meteor.setTimeout(function(){
            getMyDoc(user);
        }, 100);
    });

    function docSent(msg) {
        if (msg) {
            getMyDoc(user);
        }
    }

    function getMyDoc(me) {
        currentDoc = baseProfile;

        //** get current logged in user
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
                {components}
                {role}
                editdoc={currentDoc}
                {directdoc}

                on:doc-submitted="{docSent}"/>

    </div>
</main>





