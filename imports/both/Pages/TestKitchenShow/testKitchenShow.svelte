<script>

    /**
     * TestKitchenShow page shows logs captured for system activity.
     *
     * @name testKitchenShow
     * @module
     * @memberOf Pages:testKitchenShow
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
        import {header, page} from './testKitchenShow_text'
        import {pageConfig} from './testKitchenShow_config'

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {getDocs} from "../../../Functions/application/getDocs";

    const pageHeader = i18n(header, "", $lang);
    let listText = i18n(page, "list", $lang);
    let conf = pageConfig;
    let content = {};
    let recipeList;

    async function findOne(query) {
        if(query.testKitchenId){
            content = await getDocs("testKitchenShow", "schemaForm_one", {testKitchenId: query.testKitchenId}, {}, null);

            if(!content){
                content = {name: "No item found."};
            }
        }else{
            content = {name: "Missing testKitchen id."};
        }
    }

    $: findOne(query);

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">
    {#if content?.name}

        <div class="row">
            <div class="column">
                <h2>{content?.name}</h2>

                <p class="is-size-7">{content?.type?.name ?? ""} - {content?.issue}</p>

                <div class="space-container-vert article-body">{@html content?.body}</div>
            </div>

            <div class="column">
                {#if content.image &&  content.image.src}
                    <figure>
                        <img src="{content.image.src}" class="has-max-width-25rem" alt="main article image" loading="lazy">
                    </figure>
                {/if}
            </div>
        </div>

    {/if}
</main>