<script>

    /**
     * Page action controls to print, bookmark, etc.  Fires events if needed.
     *
     * @module pageActions
     * @memberOf Components:elements:
     * @locus Client
     *
     * @param {Object} text
     * @param {String} text.print
     * @param {String} text.saveToMenus
     *
     * @param {Object} docInfo
     * @param {String} docInfo.recipeId
     * @param {String} docInfo.recipeName
     */


    export let text;
    export let docInfo;
    export let showButtons = {
        print: true,
        menus: true,
        mail: true,
        notes: true
    }

    const me = Meteor.user();

    //* local reactive variables
    let showModal = false;
    let showNoteModal = false;
    let mailInfo = {};

    $: {
        mailInfo = {
            subject: docInfo?.recipeName,
            url: window?.location?.href
        }
    }

    //** support Functions
    import Manage_Menu_Recipes from '../blocks/modalMenuRecipes.svelte';
    import Edit_Notes from '../blocks/modalNotes.svelte'


    //* event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function printSelection(){
        window.print();
    }

    function checkStateUser(msg) {
        showModal = msg.detail;
    }

    function checkStateNote(msg) {
        showNoteModal = msg.detail;
    }

    function copyMoveDone(){
        dispatch('item-refresh', {id: "",});
    }

    function copyToMenu(){

        const recipe = {
            recipeId: docInfo?.recipeId,
            recipeName: docInfo?.recipeName,
            notes: "",
            image: {},
            thumbnail: docInfo?.thumbnail
        };

        docInfo = {id: "id", recipe: recipe };
        showModal = true;
    }

    function editNotes(){
        const note = {
            _id: docInfo?._id,
            recipeId: docInfo?.recipeId,
            recipeName: docInfo?.recipeName,
            notes: docInfo?.notes ?? [],
            noteId: docInfo?.noteId,
        };

        docInfo = {id: "id", recipe: note };
        showNoteModal = true;
    }

    function noteSaved(msg){
        dispatch('note-refresh', msg.detail);
    }

</script>



<div class="navbar-left has-text-tertiary">
    <nav aria-label="Page Action Buttons Section">
        <ul>
            {#if showButtons.print}
                <li>
                    <button type="button" class="button-actions" title={text.print} on:click={printSelection}>
                        <span class="icon-bg-printer"></span>
                        <span>{text.print}</span>
                    </button>
                </li>
            {/if}

            {#if showButtons.menus}
                <li>
                    <button type="button" class="button-actions" title={text.saveToMenus} on:click={copyToMenu}>
                        <span class="icon-bg-archive"></span>
                        <span>{text.saveToMenus}</span>
                    </button>
                </li>
            {/if}

            {#if showButtons.mail}
                <li>
                    <button type="button" class="button-actions">
                        <a class=""
                           href="mailto:?subject={mailInfo.subject}&amp;body={mailInfo.url}"
                           target="_blank">

                            <span class="icon-bg-mail"></span>
                            <span>{text.mailRecipe}</span>
                        </a>
                    </button>
                </li>
            {/if}

            {#if showButtons.notes}
                <li>
                    <button type="button" class="button-actions" title={text.notes} on:click={editNotes}>
                        <span class="icon-bg-file"></span>
                        <span>{text.notes}</span>
                    </button>
                </li>
            {/if}

        </ul>
    </nav>
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

{#if showNoteModal}
    <Edit_Notes
            {docInfo}
            {showNoteModal}
            on:modal-note-saved={noteSaved}
            on:modalNoteState={checkStateNote}
    />
{/if}




<style>
    .button-actions {
        font-size: var(--size-7);
        line-height: 1.2;
        font-weight: var(--weight-medium);

        display: inline-flex;
        height: 2rem;
        padding: var(--pad-vert-small) var(--pad-horz-small);
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        border-radius: calc(var(--radius-elem)/ 2);
        box-shadow: none;
        justify-content: center;
        align-items: center;

        color: var(--tertiary-dark);
        border: 1px solid var(--tertiary-dark);
        background-color: var(--bg-main);
    }

    .button-actions a {
        text-decoration: none;
        display: inline-flex;
        align-items: center;
    }

    .button-actions > span,
    .button-actions a span {
        margin-left: 0;
    }

    .button-actions:hover {
        padding: calc( var(--pad-vert-small) + 1px) calc( var(--pad-horz-small) + 1px );
        opacity: 1;
        color: var(--tertiary-text-invert);
        border: 0 solid var(--tertiary-dark);
        background-color: var(--tertiary);
    }

</style>