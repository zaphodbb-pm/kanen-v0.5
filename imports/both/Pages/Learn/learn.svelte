<script>
    /**
     * Layout for Learn page.
     *
     * @memberof Pages:Learn
     * @function learn
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    //** setup props to receive route data
    export let currentRoute;
    export let params;

    //** app services (getContext is often optional)
    import { setContext } from 'svelte';

    //** get the user language preference from store (optional)
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    //** get page text information and set contexts for children components
    import {header, page} from './learn_text'

    setContext("pageHdr", header);
    setContext("pageText", page);

    //** get component configuration information and set contexts for children components
    import pageConfig from './learn_config'
    setContext("pageConfig", pageConfig);

    //** get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import {onMount} from 'svelte'
    import {getDocs} from '/imports/functions/getDocs'
    import {sortBy} from '/imports/functions/sortBy'

    import Wiki_Toc from './wiki_toc.svelte'
    import Wiki_Content from './wiki_content.svelte'
    import Search_Box from '/imports/components/listCollections/searchbox.svelte'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'

    let formText = i18n(page, "form", $lang);
    setContext("formText", formText);
    let toc = i18n(page, "components", $lang).toc;


    //* local reactive variables
    let showModalUser = false
    let modalInfoUser = {};
    let modalTitleUser = "title"; //text.modalTitleUser,
    let langComp = "all";

    let info = {
        lang: "all",
        crew: "none",

        tocTitles: [],
        pageid: "",

        clearSearch: false,
        showList: false,      // if true, show a list of found docs, else show one document from ToC
        list: [],

        fields: [
            {field: "name", key: "name", search: true},
            {field: "contentPage", key: "contentPage", search: true},
        ]
    }


    onMount( () => {
        buildToC({});
    });

    function checkStateUser(msg) {
        showModalUser = msg.detail;
    }

    function selectPage(msg) {
        info.list = null;
        info.showList = false;
        info.pageid = msg.detail;
        info.clearSearch = !info.clearSearch;
    }

    function newSearch(msg) {
        findDocs(msg.detail.query);
    }

    function fieldChanged(msg){
        let field = msg.detail;

        if(field.field === "getLang"){
            langComp = field.value._id;
            buildToC();
        }
    }

    async function findDocs(query) {
        const sort = {sort: {name: 1}, limit: 100};
        let lang = langComp && (langComp === "all") ? {} : {"contentLang._id": {$in: [langComp, "all"]} };
        let compound = Object.assign({}, query, lang);

        if (query && Object.keys(query).length > 0) {
            let found = await getDocs("learn", "allFields", compound, sort);

            if (found.length > 0) {
                info.showList = true;
                info.list = found;
            }else{
                info.showList = false;
                info.list = [];
            }

        } else {
            info.list = null;
            info.showList = false;
        }
    }

    async function showAuthor(msg) {
        modalInfoUser = await getDocs("employees", "oneList", {_id:  msg.detail._id}, {});
        showModalUser = true;
    }

    function closeModal() {
        showModalUser = false;
    }

    async function buildToC() {
        const sort = {sort: {name: 1}};
        let lang = langComp && (langComp === "all") ? {} : {"contentLang._id": {$in: [langComp, "all"]} };
        let compound = Object.assign({}, lang);
        let pages = await getDocs("learn", "content", compound, sort);

        info.tocTitles = structureToc(pages);

        if (Array.isArray(info.tocTitles) && info.tocTitles.length > 0) {
            info.pageid = info.tocTitles[0]._id;
        }
    }

    function structureToc(pages) {
        let adjPages = pages.map( (pg, idx) => {
            let hasParent = pages.find( (p) => p._id === pg.parentPage._id);
            pg.parent = hasParent ? pg.parentPage._id : "root";
            let children = pages.filter( (p) => p.parentPage._id === pg._id);

            if(children){
                pg.children = children.length > 1 ? sortBy(children, 'contentWeight') : children;
            }

            return pg;
        })

        let rootTop = adjPages.filter( (ap) => ap.parent === "root");
        rootTop = sortBy(rootTop, 'contentWeight');

        return rootTop;
    }

</script>



<Hdr />



<section id="wiki-display">

    <div class="columns">
        <div class="column is-one-fifth-fullhd is-one-quarter-desktop is-one-third-tablet">

            <Field_Wrapper
                    class=""
                    field="{pageConfig.components.langField}"
                    watchFields="{ {} }"
                    on:field-changed="{fieldChanged}"/>

        </div>

        <div class="column">
            <Search_Box fields="{info.fields}" on:search-changed="{newSearch}" />
        </div>
    </div>

    <div class="columns mt-3">
        <div class="column is-one-fifth-fullhd is-one-quarter-desktop is-one-third-tablet">

            <Wiki_Toc
                    pageid="{info.pageid}"
                    tocHeader="{toc.title}"
                    tocTitles="{info.tocTitles}"
                    on:getpage="{selectPage}"/>

        </div>

        <div class="column">

            <Wiki_Content
                    pageid="{info.pageid}"
                    showList="{info.showList}"
                    list="{info.list}"
                    on:push-author="{showAuthor}"
                    on:getpage="{selectPage}" />

        </div>

    </div>


    <!--
    <vue-modal-member
            v-bind:show-modal="showModalUser"
            v-bind:document="modalInfoUser"
            v-bind:type="'user'"
            v-on:modalState="checkStateUser">

    </vue-modal-member>
    -->
</section>