<script>

    /**
     * Grid to list documents and fields for docs.
     *
     * @module recipesSearch_grid
     * @memberOf Pages:recipesSearch
     * @locus Client
     *
     * @param  {Object} config - decoration for table
     * @param  {Object} gridText - optional text
     * @param  {Array}  labels
     * @param  {Array}  documents
     * @param  {String} collection
     * @param  {Boolean} submitted
     * @param  {Boolean} showloader
     *
     * @returns nothing
     *
     */

    //* props
    export let config = {};
    export let gridText = {};
    export let labels = [];
    export let documents = {};
    export let collection = "";
    export let submitted = false;
    export let showLoader = false;

    // get the user language preference from store
    import {lang} from '/imports/client/systemStores';
    import commonText from "../../../client/text_common"

    //* support Functions
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {dotNotation} from '/imports/Functions/utilities/dotNotation';
    import {timeAgo} from '/imports/Functions/formatters/timeAgo';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import Manage_Menu_Recipes from '../../../Components/blocks/modalMenuRecipes.svelte';
    import Show_Loader from '../../../Components/elements/loaderIcon.svelte';

    //* local reactive variables
    const calendar = i18n( commonText, "calendar", $lang);
    const width =  "has-7x-minwidth";
    const notice = "starter grid";
    let showModal = false;

    let submit = submitted;
    let items = [];
    let docInfo = {};

    $: items = tableItems(collection, labels, documents);

    //* build array of arrays of display objects
    function tableItems(coll, fields, docs) {
        const tagLabels = ["cookingMethod", "course", "cuisine", "mainIngredient", "specialConsideration"];
        let out = [];

        //** prepare document for display listing and get info for each field to display
        docs.forEach(function (els) {
            let tr = {};
            let values = els;
            let tags = [];

            values.updatedAt = els.updatedAt;

            fields.forEach(function (el) {
                let val = dotNotation(values, el.key);

                //*** convert timestamps to relative time string
                switch(el.key){
                    case "updatedAt":
                    case "createdAt":
                    case "data.time":
                    case "timeStamp":
                        val = timeAgo(val);
                        break;
                }

                tr[el.key] = {
                    id: values._id,
                    type: el.type,
                    value: val,
                    keyName: el.label,
                };

                /*** extract tag information for separate display ***/
                let key = el.key.replace(".name", "");

                if(tagLabels.includes(key) && val && values[key]?._id !== "none" && values[key]?._id !== "all" ){
                    tags.push(val);
                }

                tr.tags = [...tags];
            });

            out.push(tr);
        });

        return out;
    }

    //** event handlers
    function checkStateUser(msg) {
        showModal = msg.detail;
    }

    function copyMoveDone(){
        dispatch('item-refresh', {id: "",});
    }

    function recipeCopy(id, item){

        const recipe = {
            recipeId: item?.recipeId?.value,
            recipeName: item?.name?.value,
            notes: "",
            image: {},
            thumbnail: item?.thumbnail?.value ?? {}
        };

        docInfo = {id: id, recipe: recipe };
        showModal = true;
    }

</script>


<Show_Loader {showLoader} />


<div class="row {width}">
    {#each items as row, idx}
        <div class="column">

            <article class="card-horz">
                {#if row?.thumbnail?.value?.src}
                    <figure>
                        <img src="{row.thumbnail.value.src}"  class="has-aspect-1x1" alt="image" loading="lazy">
                    </figure>

                {:else}
                    {#if notice}
                        <p>{notice}</p>
                    {/if}
                {/if}

                <div class="card-body space-element tweak-card">
                    <header>
                        <h2 class="is-title-4">
                            <a href='/recipesShow?recipeId={row.recipeId?.value ?? "na"}' target="_blank">{row.name?.value}</a>
                        </h2>
                    </header>

                    {#if row.subTitle?.value}
                        <p class="sub-title">{row.subTitle?.value}</p>
                    {/if}

                    {#if row.writer?.value}
                        <p>{row.writer?.value}</p>
                    {/if}

                    <p class="level has-nowrap is-size-7">
                        <span>{row["type.name"]?.value ?? ""} - {row.issue?.value}</span>

                        <button type="button" class="button is-small is-primary-outlined has-hover" title="{gridText.copy}"
                           on:click="{ () => recipeCopy('id', row )}">

                            <span>{gridText.recipeBox}</span>
                        </button>
                    </p>

                    {#if row.tags && row.tags.length > 0}
                        <p class="tags" role="note" aria-label="Tag list">
                            {#each row.tags as tag}
                                {#if tag}
                                    <span class="tag is-success-light">{tag}</span>
                                {/if}
                            {/each}
                        </p>
                    {/if}

                </div>
            </article>

        </div>
    {/each}
</div>

{#if showModal}
    <Manage_Menu_Recipes
            {docInfo}
            {showModal}
            modalButtons="{ {copy: true, move: false} }"
            on:modal-copyRecipe={copyMoveDone}
            on:modalState={checkStateUser}
    />
{/if}



<style>

    .tweak-card > p {
        margin: 0 0 0.5rem 0;
    }

    .tweak-card > p.tags {
        margin: 0;
    }

</style>