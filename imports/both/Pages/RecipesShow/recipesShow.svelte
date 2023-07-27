<script>


    /**
     * RecipesShow page shows logs captured for system activity.
     *
     * @name recipesShow
     * @module
     * @memberOf Pages:recipesShow
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
        import {header, page} from './recipesShow_text'
        import {pageConfig} from './recipesShow_config'

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {getDocs} from "../../../Functions/application/getDocs";

    import Show_Loader from "../../../Components/elements/loaderIcon.svelte";
    import Page_Actions from "../../../Components/elements/pageActions.svelte"


    const pageHeader = i18n(header, "", $lang);
    const pageText = i18n(page, "page", $lang);
    const pageActions = i18n(page, "pageActions", $lang);

    let conf = pageConfig;
    let content = {};
    let articleId;
    let docInfo;
    let showLoader = false;
    let myNotes;

    async function findOne(query) {
        if(query.recipeId){
            showLoader = true;

            content = await getDocs("recipesShow", "listList_one", {recipeId: query.recipeId}, {});

            showLoader = false;

            if(!content){
                content = {name: "No recipe found."};
            }else{
                articleId = content.articleId ?? undefined;

                docInfo = {
                    recipeId: content.recipeId,
                    recipeName: content.name,
                    thumbnail: content.thumbnail,
                    notes: [],
                    noteId: ""
                };

                const me = Meteor.user();

                if(me && content.recipeId){
                    Meteor.call("getNote", content.recipeId, function(err, res){
                        if(err){ console.log("getNote err", err); }

                        if(res){
                            docInfo.notes = res.notes;
                            docInfo.noteId = res._id;
                            myNotes = res.notes;
                        }
                    });
                }
            }

        }else{
            content = {name: "Missing recipe id."};
        }
    }

    $: findOne(query);


    async function updateNotes() {
        Meteor.call("getNote", content.recipeId, function(err, res){
            if(err){ console.log("getNote err", err); }

            docInfo.notes = res?.notes ?? "";
            docInfo.noteId = res?._id ?? "";
            myNotes = res?.notes ?? [];
        });
    }

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">
    {#if content?.name}

        <div class="row">
            <div class="column"></div>

            <div class="column is-span-2">
                <h2 class="column is-span-2" >{content?.name}</h2>
            </div>
        </div>

        <div class="row">
            <div class="column">
                {#if content.image && content.image.src}
                    <figure class="recipe-main-image">
                        <img src="{content.image.src}" alt="main article image" loading="lazy">
                    </figure>
                {/if}
            </div>

            <div class="column is-span-2">
                {#if content?.subTitle}
                    <p class="sub-title">{content.subTitle}</p>
                {/if}

                {#if content?.writer}
                    <p>{content.writer} <br> {content?.attribution ?? ""}</p>
                {/if}

                {#if content?.commentary}
                    <p>{content.commentary}</p>
                {/if}

                {#if content?.serves}
                    <p><b>{pageText.serves}:</b> {content.serves}</p>
                {/if}
                
                {#if content?.pairWith}
                    <p>{pageText.pairWith} {content.pairWith}</p>
                {/if}

                {#if articleId}
                    <p>{pageText.article}: <a href='/articlesShow?articleId={articleId}'>{articleId}</a></p>
                {/if}

                <p class="is-size-7">{pageText.finecooking} {content?.type?.name ?? ""} - {content?.issue}</p>


                <div class="page-actions-block">
                    <Page_Actions text="{pageActions}" docInfo="{docInfo}" on:note-refresh={updateNotes}/>
                </div>
            </div>
        </div>

        <div class="row space-container-vert">
            <div class="column is-span-1 recipe-ingredients">
                <h3>{pageText.ingredients}</h3>
                {@html content?.ingredients}
            </div>

            <div class="column is-span-2">
                <h3>{pageText.instructions}</h3>
                {@html content?.instructions}

                {#if myNotes && myNotes.length > 0}
                    <div class="space-items-medium"></div>

                    <h3>{pageText.notesTitle}</h3>

                    <ol>
                        {#each myNotes as note}
                            <li>{note.text}</li>
                        {/each}
                    </ol>
                {/if}
            </div>
        </div>

    {:else }

        <Show_Loader {showLoader} />

    {/if}
</main>


<style>
    .page-actions-block {
        margin-top: -1rem;
        margin-bottom: 1rem;
    }
</style>