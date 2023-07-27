<script>

    /**
     * EditionsShow page shows logs captured for system activity.
     *
     * @name editionsShow
     * @module
     * @memberOf Pages:editionsShow
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
        import {header, page} from './editionsShow_text'
        import {pageConfig} from './editionsShow_config'

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {getDocs} from "../../../Functions/application/getDocs";

    const pageHeader = i18n(header, "", $lang);
    const groupLength = 10;

    let listText = i18n(page, "list", $lang);
    let conf = pageConfig;
    let content = {};
    let groups = [];
    let groupsFull = [];

    async function findOne(query) {
        if(query.editionId){
            content = await getDocs("editionsShow", "schemaLong_one", {editionId: query.editionId}, {}, null);

            if(!content){
                content = {name: "No edition found."};
            }else{
                for(let i=0; i < groupLength; i++){
                    let key = "groupName" + i;
                    let list = "groupList" + i;

                    if( content[key] && content[list]){
                        let links = content[list].map( item => item.text);
                        groups.push( {groupName: content[key], groupList: links} );
                    }
                }

                for (const item of groups) {
                    const idx = groups.indexOf(item);
                    await getRecipes(item, idx);
                }
            }
        }else{
            content = {name: "Missing edition id."};
        }
    }

    $: findOne(query);

    async function getRecipes(group, idx){
        if(group && group.groupList && group.groupList.length > 0){
            const fields = {recipeId: 1, name: 1, issue: 1, thumbnail: 1}
            const recipeIds = [...group.groupList];

            groupsFull[idx] = {...group};

            let recipeList = await getDocs("recipes", "list", {recipeId: {$in: recipeIds, } }, {fields});

            /* maintain stored order of recipes */
            groupsFull[idx].groupRecipes = recipeIds.map( item => recipeList.find(element => element.recipeId === item));
        }
    }
</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    {#if groupsFull && groupsFull.length > 0}
        <div class="row">

            {#each groupsFull as group}
                <div class="column">
                    <h2>{group.groupName}</h2>

                    {#each group.groupRecipes ?? [] as recipe}
                        <div class="box space-element-vert">
                            <div class="level-start is-mobile has-nowrap">
                                <img src="{recipe?.thumbnail?.src}" class="recipe-thumbnail" alt="recipe image" loading="lazy">

                                <div>
                                    <a href='/recipesShow?recipeId={recipe?.recipeId ?? ""}'
                                       class='recipe-link'>
                                        {recipe?.name ?? ""}
                                    </a>

                                    <p>{recipe.issue ?? ""}</p>
                                </div>

                            </div>
                        </div>
                    {/each}
                </div>
            {/each}

        </div>
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