<script>


    /**
     * @summary Modal display for user schema information from a list item.
     *
     * @module modalMenuRecipes
     * @memberOf Components:blocks:
     * @locus Client
     *
     * @param {Boolean} showModal - turns modal on or off
     * @param {Object} modalText - target for text package
     * @param {Object} docInfo - {recipes info}
     *
     * @fires modal-copyRecipe
     * @fires modal-moveRecipe
     * @fires modalState
     *
     */

    //* setup props to receive component data
    export let showModal = false;
    export let docInfo = "";
    export let modalButtons = {copy: true, move: true}

    //* get the user language preference from store; text from context and support Functions
    import {i18n} from "../../Functions/utilities/i18n";
    import {copymove} from "../../client/text_modal-copymove";
    import {myMenus} from '/imports/client/systemStores';
    import {components} from "../formBuilder/fields/func-registerBasicFields";
    import Field_Wrapper from '../formBuilder/fieldWrapper.svelte';

    const modalText = i18n(copymove, "");
    const title = buildTitle(modalButtons, modalText);


    //* local reactive variable
    let openModal = "hide-modal";
    let info = null;
    let selectedMenus = [];
    let docId = docInfo.id;

    //* respond to change in props
    $: {
        openModal = showModal ? "show-modal" : "hide-modal";
        modalText.selections.selects = $myMenus;
    }

    //** support functions
    const selector = {
        field: "selections",
        fieldType: "checkboxes",
        optional: true,
        attributes: {},
        params: {cols: 2, buttons: true},
        css: "is-vertical",
        defaultValue: [],
    };

    function selections(msg){
        selectedMenus = msg.detail?.value ?? [];
    }

    function buildTitle(keys, text){
        let out = "";

        switch (true){
            case keys.copy && keys.move:
                out = text.titleBoth;
                break;

            case keys.copy && !keys.move:
                out = text.titleCopy;
                break;

            case !keys.copy && keys.move:
                out = text.titleMove;
                break;
        }

        return out;
    }

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function btnClose() {
        openModal = "hide-modal";

        /**
         * @event modalState
         * @type {Boolean}
         */
        dispatch('modalState', false);
    }


    function copyRecipe(){
        let uniqueMenus = selectedMenus.filter( item => item._id !== docInfo.id);

        if(uniqueMenus.length > 0){
            uniqueMenus = uniqueMenus.map( item => item._id);

            Meteor.call("copyRecipeItem", uniqueMenus, docInfo.recipe, function(err, res){
                if(err){ console.log("err", err)}

                /**
                 * @event modal-copyRecipe
                 * @type {String} - doc id
                 */
                dispatch('modal-copyRecipe', {id: "",});

                btnClose();
            })
        }
    }

    function moveRecipe(){
        let uniqueMenus = selectedMenus.filter( item => item._id !== docInfo.id);

        if(uniqueMenus.length > 0){
            uniqueMenus = uniqueMenus.map( item => item._id);

            Meteor.call("copyRecipeItem", uniqueMenus, docInfo.recipe, function(err, res){
                if(err){ console.log("err", err)}

                if(res){
                    Meteor.call("removeRecipeItem", docInfo.id, docInfo?.recipe?.recipeId, function(err, res){
                        if(err){ console.log("err", err)}

                        /**
                         * @event modal-moveRecipe
                         * @type {String} - doc id
                         */
                        dispatch('modal-moveRecipe', {id: "",});
                    })
                }

                btnClose();
            })
        }
    }


</script>



<div id="{'modal_' + docId}" class="modal-overlay {openModal}" data-tp_modal_menu_recipes>
    <div class="modal">
        <article class="modal-card">
            <header>
                <h2>{title}</h2>

                <button type="button" class="delete" on:click="{btnClose}"></button>
            </header>

            <form class="form">
                <div class="space-block">
                    <Field_Wrapper
                            class=""
                            field="{selector}"
                            {components}
                            fieldText="{modalText.selections}"
                            watchFields="{ {} }"
                            on:field-changed="{selections}"
                    />
                </div>
            </form>

            <footer class="modal-card-foot">
                {#if modalButtons.copy}
                    <button type="button" class="button is-primary has-hover" on:click="{copyRecipe}">
                        {modalText.copyEvent}
                    </button>
                {/if}

                {#if modalButtons.move}
                    <button type="button" class="button is-secondary has-hover" on:click="{moveRecipe}">
                        {modalText.moveEvent}
                    </button>
                {/if}
            </footer>

        </article>
    </div>
</div>


<style>

    .show-modal {
        visibility: visible;
        opacity: 1;
        position: fixed;
        z-index: 1000;
        height:auto;
    }

    .hide-modal {
        visibility: hidden;
        opacity: 0;
        position: relative;
        z-index: unset;
        height: 0;
    }

</style>
