<script>



    /**
     * @summary Modal display for user entered Note information.
     *
     * @module modalNotes
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
    export let showNoteModal = false;
    export let docInfo = "";

    //* get the user language preference from store; text from context and support Functions
    import {Meteor} from "meteor/meteor";
    import {i18n} from "../../Functions/utilities/i18n";
    import commonText from "../../client/text_common";
    import {components} from "../formBuilder/fields/func-registerBasicFields";
    import Field_Wrapper from '../formBuilder/fieldWrapper.svelte';

    const me = Meteor.user();
    const modalText = i18n(commonText, "notesText");

    //* local reactive variable
    let openModal = "hide-modal";
    let info = null;
    let noteList = [];
    let docId = docInfo.id;

    let selector = {
        field: "note",
        fieldType: "itemList",
        optional: true,
        attributes: {maxlength: 5000, rows: 2},
        params: {
            key: "id",
            showCheck: false
        },
        defaultValue: [],
    };

    //* respond to change in props
    $: noteList = docInfo?.recipe?.notes ?? [];

    $: selector.value = noteList;

    $: openModal = showNoteModal ? "show-modal" : "hide-modal";



    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function btnClose() {
        openModal = "hide-modal";

        /**
         * @event modalState
         * @type {Boolean}
         */
        dispatch('modalNoteState', false);
    }

    function editNote(msg){
        noteList = msg.detail.value;
        selector.value = noteList;
    }


    function saveNote(){
        const doc = {
            name: docInfo?.recipe?.recipeName ?? "n/a",
            recipeId: docInfo?.recipe?.recipeId ?? "n/a",
            notes: noteList,
        }

        Meteor.call("updateNote", docInfo?.recipe?.noteId, doc, function(err, res){
            if(err){ console.log("updateNote err", err); }

            dispatch('modal-note-saved', true);

            btnClose();
        });
    }

    function removeNote(){
        Meteor.call("removeNote", docInfo?.recipe?.noteId, function(err, res){
            if(err){ console.log("removeNote err", err); }

            dispatch('modal-note-saved', true);

            btnClose();
        });
    }


</script>



<div id="{'modal_note_' + docId}" class="modal-overlay {openModal}" data-tp_modal_notes>
    <div class="modal">
        <article class="modal-card">
            <header>
                <h2>{modalText.title}</h2>

                <button type="button" class="delete" on:click="{btnClose}"></button>
            </header>

            {#if me}
                <form class="form">
                    <div class="space-block">
                        <Field_Wrapper
                                class=""
                                field="{selector}"
                                {components}
                                fieldText="{modalText.fieldName}"
                                watchFields="{ {} }"
                                on:field-changed="{editNote}"
                        />
                    </div>
                </form>
            {:else}
                <div>
                    <p>{@html modalText.noUser}</p>
                </div>
            {/if}

            <footer class="modal-card-foot">
                {#if modalText.remove}
                    <button type="button" class="button is-secondary-outlined has-hover" on:click="{removeNote}">
                        {modalText.remove}
                    </button>
                {/if}

                {#if modalText.save}
                    <button type="button" class="button is-primary has-hover" on:click="{saveNote}">
                        {modalText.save}
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
