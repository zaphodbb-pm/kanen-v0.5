<script>


    /**
     * Grid to list documents and fields for docs.
     *
     * @module cookingNowSearch_grid
     * @memberOf Pages:cookingNowSearch
     * @locus Client
     *
     * @param  {Object} config - decoration for table
     * @param  {Array}  labels
     * @param  {Object} gridText
     * @param  {Array}  documents
     * @param  {String} collection
     * @param  {Boolean} submitted
     *
     * @returns nothing
     *
     */


    //* props
    export let config = {};
    export let labels = [];
    export let gridText = {};
    export let documents = {};
    export let collection = "";
    export let submitted = false;
    export let showLoader = false;

    // get the user language preference from store
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import commonText from "../../../client/text_common";
    import {prepareDocInfo} from "./func-prepareDocInfo";

    //* support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import Ask_Delete from '/imports/Components/elements/askDelete.svelte'
    import Manage_Menu_Recipes from '/imports/Components/blocks/modalMenuRecipes.svelte';


    //* local reactive variables
    const calendar = i18n( commonText, "calendar", $lang);
    const width =  "has-3x-minwidth";
    const notice = "starter grid";
    const confirmDelete = true;

    let inEdit = false;
    let currRow = "";
    let actRow = "";
    let submit = submitted;
    let showModal = false;
    let docInfo = {};

    let items = [];
    $: items = tableItems(collection, labels, documents);



    //* event handlers
    function deleteDoc(id) {
        dispatch('item-delete', {
            id: id,
        });
    }


    function editDoc(id) {
        let same = (id === actRow);
        actRow = same ? actRow : id;
        inEdit = !inEdit;

        if (same) {
            currRow = inEdit ? id : "";
        } else {
            currRow = id;
            inEdit = true;
        }

        dispatch('item-edit', {
            id: currRow,
            edit: inEdit
        });
    }


    //* build array of arrays of display objects
function tableItems(coll, fields, docs) {
    let out = [];

    //** prepare document for display listing and get info for each field to display
    docs.forEach(function (doc) {
        out.push( prepareDocInfo(doc, fields) );
    });

    return out;
}

    function recipeCopy(id, item){

        const recipe = {
            notes: item?.notes ?? "",
            recipeId: item?.recipeId ?? "na",
            recipeName: item?.recipeName ?? "recipe name",
            thumbnail: item?.thumbnail ?? {},
            image: {},
        };

        docInfo = {id: id, recipe: recipe };
        showModal = true;
    }

    async function recipeDelete(id, item) {
        docInfo = {recipeId: item?.recipeId};

        Meteor.call("removeRecipeItem", id, docInfo.recipeId, function(err, res){
            if(err){ console.log("err", err)}

            dispatch('item-refresh', {id: id,});
        })
    }

    function checkStateUser(msg) {
        showModal = msg.detail;
    }

    function copyMoveDone(){
        dispatch('item-refresh', {id: "",});
    }

</script>



<div class="row {width} has-8x-minwidth">
    {#each items as row, idx}
        <div class="column">

            <div class="card" style="overflow: hidden;">

                <header class="level has-nowrap is-link is-mobile">
                    <h2 on:click="{ () => editDoc(row.name.id) }"
                       class="is-text-semibold add-cursor">

                        {row.name.value}
                        <span class="icon-bg-edit"></span>
                    </h2>

                    <Ask_Delete
                            text="{gridText.askDelete}"
                            row="{row}"
                            on:item-to-delete={() => deleteDoc(row._id.id)}
                    />
                </header>

                <div>
                    <p class="space-element-vert">{row.description.value}</p>

                    <hr>

                    <table class="table is-fullwidth">
                        <tbody>

                        {#each (row?.recipes?.value ?? []) as recipe}
                            <tr>
                                <td class="has-width-5rem">
                                    <img class="thumbnail-image is-dark" src="{recipe.thumbnail?.src}" alt="recipe image" loading="lazy">
                                </td>
                                <td>
                                    <a href='/recipesShow?recipeId={recipe.recipeId ?? "na"}'>
                                        {recipe.recipeName ?? "recipe name"}
                                    </a>
                                </td>
                                <td>{recipe.notes ?? "notes"}</td>

                                <td>
                                    <div class="level-end has-nowrap recipe-actions">
                                        <span class="icon-bg-tasks"
                                              title="{gridText.copy}"
                                              on:click="{ () => recipeCopy(row._id.id, recipe) }">
                                        </span>

                                        <span class="icon-bg-circle-x"
                                              title="{gridText.delete}"
                                              on:click="{ () => recipeDelete(row._id.id, recipe) }">
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>


                </div>
            </div>

        </div>
    {/each}
</div>

{#if showModal}
    <Manage_Menu_Recipes
            {docInfo}
            {showModal}
            modalButtons="{ {copy: true, move: true} }"
            on:modal-copyRecipe={copyMoveDone}
            on:modal-moveRecipe={copyMoveDone}
            on:modalState={checkStateUser}
    />
{/if}



<style>

    table.table td {
        vertical-align: middle;
    }

    td > .recipe-actions > span{
        margin: 0 !important;
        padding: 0.5rem 0.75rem !important;
        cursor: pointer;
    }

    .thumbnail-image {
        height: 4rem;
        width: 4rem;
        object-fit: cover;
    }
</style>