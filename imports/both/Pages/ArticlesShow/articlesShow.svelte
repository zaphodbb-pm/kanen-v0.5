<script>

    /**
     * ArticlesShow page shows logs captured for system activity.
     *
     * @name articlesShow
     * @module
     * @memberOf Pages:articlesShow
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
        import {header, page} from './articlesShow_text'
        import {pageConfig} from './articlesShow_config'

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
        if(query.articleId){
            content = await getDocs("articlesShow", "listList_one", {articleId: query.articleId}, {}, null);

            console.log("content", content);

            if(!content){
                content = {name: "No article found."};
            }else{

                if(content.recipes && content.recipes.length > 0){
                    await getRecipes(content.recipes);
                }
            }
        }else{
            content = {name: "Missing article id."};
        }
    }

    $: findOne(query);

    async function getRecipes(list){
        if(list){
            const fields = {recipeId: 1, name: 1, thumbnail: 1}
            const recipeIds = list.map( item => item.text);

            recipeList = await getDocs("recipesShow", "list", {recipeId: {$in: recipeIds, } }, {fields});

            /* maintain stored order of recipes */
            recipeList = recipeIds.map( item => recipeList.find(element => element.recipeId === item));
        }
    }
</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">
    {#if content?.name}

        <div class="row">
            <div class="column is-span-2">
                {#if content.image &&  content.image.src}
                    <figure>
                        <img src="{content.image.src}" alt="main article image" loading="lazy">
                    </figure>
                {/if}
            </div>

            <div class="column is-span-3">
                <h2>{content?.name}</h2>
                <p class="sub-title">{content?.subTitle ?? ""}</p>

                <p>{content?.writer ?? ""} <br>
                    {content?.attribution ?? ""}
                </p>

                <p class="is-size-7">{content?.type?.name ?? ""} - {content?.issue}</p>

                {#each recipeList ?? [] as recipe}
                    <div class="box space-element-vert">
                        <div class="level-start is-mobile has-nowrap">
                            <img src="{recipe?.thumbnail?.src}" class="recipe-thumbnail" alt="recipe image" loading="lazy">

                            <a href='/recipesShow?recipeId={recipe?.recipeId ?? ""}'
                               class='recipe-link'>
                                {recipe?.name ?? ""}
                            </a>
                        </div>
                    </div>
                {/each}

            </div>
        </div>

        <div class="magazine space-container-vert article-body">{@html content?.body}</div>

    {/if}
</main>


<style>
    .recipe-link {
        cursor: pointer;
        font-weight:  var(--weight-semibold);
        color: var(--link-text);
    }

    .recipe-thumbnail {
        height: 4rem;
        width: 4rem;
        object-fit: cover;
    }
</style>