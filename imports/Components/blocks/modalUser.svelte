<script>

    /**
     * @summary Modal display for user schema information information from a list item.
     *
     * @module modalUser
     * @memberOf Components:blocks:
     * @locus Client
     *
     * @param {Boolean} showModal - turns modal on or off
     * @param {String} text - target for text package
     * @param {Object} modalInfo - {user info}
     *
     * @fires modal-addEvent
     * @fires modal-removeEvent
     * @fires modalState
     *
     */

    //* setup props to receive component data
    export let showModal = false;
    export let docId = "";
    export let text = "";

    //* get the user language preference from store; text from context and support Functions
    import { getContext } from 'svelte';
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/Functions/utilities/i18n'
    import {getDocs} from '/imports/Functions/supportApplication/getDocs'
    import {timeAgo} from '/imports/Functions/formatters/timeAgo'
    import {formatPhoneNumber} from '/imports/Functions/formatters/formatPhoneNumber'


    //* local reactive variable
    let modalText = i18n(getContext("pageText"), "components", $lang)[text];
    let openModal = "hide-modal";
    let info = null;

    //* respond to change in props
    $: {
        openModal = showModal ? "show-modal" : "hide-modal";

        if(showModal && docId){
            loadInfo(docId);
        }

        console.log("showModal", showModal, docId, openModal);
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

    function sendAddEvent() {

        /**
         * @event modal-addEvent
         * @type {String} - doc id
         */
        dispatch('modal-addEvent', info._id);
        btnClose();
    }

    function sendRemoveEvent() {

        /**
         * @event modal-removeEvent
         * @type {String} - doc id
         */
        dispatch('modal-removeEvent', info._id);
        btnClose();
    }


    //** load key information based on props change
    async function loadInfo(id){
        let testInfo = await getDocs("authors", "listLong_one", {_id:  id}, {});

        if(testInfo){
            info = Object.keys(testInfo).length > 0 ? testInfo : {};
        }else{
            info = {username: modalText.noUserFound};
        }
    }

</script>



<div id="{'modal_' + docId}" class="modal-overlay {openModal}">
    <div class="modal">
        <article class="modal-card">
            <header>
                <h2>{modalText.title}</h2>

                <button type="button" class="delete" on:click="{btnClose}"></button>
            </header>

            <div class="level-start">
                {#if docId && info}

                    <figure>
                        {#if !!(info.profile && info.profile.image && info.profile.image.src)}
                            <img src="{info.profile.image.src}" class="user-image" alt="user image">
                        {:else}
                            <span class="icon-bg-user user-image"></span>
                        {/if}
                    </figure>


                    <table class="table numbers-col-1">

                        <tbody>
                        <tr>
                            <td>{modalText.username}:</td>
                            <td>{info.username}</td>
                        </tr>

                        <tr>
                            <td>{modalText.name}:</td>
                            <td>{info.profile && info.profile.name ? info.profile.name : ""}</td>
                        </tr>

                        <tr>
                            <td>{modalText.role}:</td>
                            <td>{info.role && info.role.name ? info.role.name : ""}</td>
                        </tr>

                        <tr>
                            <td>{modalText.mainEmail}:</td>
                            <td>{info.emails && info.emails[0] && info.emails[0].address ? info.emails[0].address : ""}</td>
                        </tr>

                        <tr>
                            <td>{modalText.secondaryEmail}:</td>
                            <td>{info.profile && info.profile.email ? info.profile.email : ""}</td>
                        </tr>

                        <tr>
                            <td>{modalText.phone}:</td>
                            <td>{info.profile && info.profile.phone ? formatPhoneNumber(info.profile.phone) : ""}</td>
                        </tr>

                        <tr>
                            <td>{modalText.active}:</td>
                            <td>{info.active}</td>
                        </tr>

                        <tr>
                            <td>{modalText.updatedAt}:</td>
                            <td>{info.updatedAt ? timeAgo(info.updatedAt) : ""}</td>
                        </tr>

                        </tbody>
                    </table>

                {:else}

                    <p>{modalText.noAccess}</p>

                {/if}
            </div>

            {#if info && (modalText.addEvent || modalText.removeEvent) }
                <footer class="modal-card-foot">
                    {#if modalText.addEvent}
                        <button class="button is-primary" on:click="{sendAddEvent}">
                            {modalText.addEvent}
                        </button>
                    {/if}

                    {#if modalText.removeEvent}
                        <button class="button is-danger" on:click="{sendRemoveEvent}">
                            {modalText.removeEvent}
                        </button>
                    {/if}
                </footer>
            {/if}

        </article>
    </div>
</div>


<style>

    .modal-card .table td {
        border: none;
    }

    .modal-card .table td:nth-of-type(1) {
        font-weight: var(--weight-semibold);
    }

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

    .user-image {
        height: 6rem;
        width: 6rem;
        border-radius: 50%;
    }

</style>
