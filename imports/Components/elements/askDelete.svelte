<script>


    /**
     * Asks if subscriber really wants to delete a record.
     *
     * @module askDelete
     * @memberOf Components:elements:
     * @locus Client
     *
     * @param {Object} text
     * @param {String} text.btnRemove
     * @param {String} text.btnCancel
     * @param {String} text.deleteMsg
     */

    export let text = {};

    export let row = {};

    //* local reactive variables
    let confirm;

    //* support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* event handlers
    function confirmDel(msg) {
        confirm = msg;
    }

    function cancelDelete(){
        confirm = null;
    }

    function deleteDoc(id) {
        dispatch('item-to-delete', {
            id: id,
        });
    }
</script>

<div  on:click="{() => confirmDel(row?._id?.id)}">
    {#if confirm === row?._id?.id}
        <div class="confirm-delete has-max-width-20rem">
            <button class="button is-small is-danger" on:click|stopPropagation="{() => deleteDoc(row?._id?.id)}">
                {text.btnRemove}
            </button>

            <p>{text.deleteMsg}</p>

            <button type="button" class="is-small is-primary-outlined" on:click|stopPropagation="{cancelDelete}">
                {text.btnCancel}
            </button>
        </div>

    {:else}
        <div class="icon-parent">
            <span class="icon-bg-trash delete-icon"></span>
        </div>
    {/if}
</div>


<style>
    .confirm-delete {
        display: flex;
        min-height: 2rem;
        max-width: 25rem;
        justify-content: space-between;
        align-items: center;

        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        padding: 0.5rem;

        background-color: whitesmoke;
        border: solid 1px #c0c0c0;
        border-radius: var(--radius-comp);
        z-index: 10;
    }

    .confirm-delete p {
        margin: 0 1rem;
        color: var(--text);
        font-size: var(--size-7);
        text-align: center;
    }

    .icon-parent {
        cursor: pointer;
        background-color: var(--bg-element);
        border-radius: 50%;
    }

    .delete-icon {
        background-color: var(--danger);
        padding: 0 0.125rem 0 0 ;
        margin: 0.25rem;
    }
</style>