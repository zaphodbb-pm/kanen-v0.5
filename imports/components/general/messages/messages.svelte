<script>

    /**
     * @summary Messages component to handle system wide notifications.
     *
     * @module messages
     * @memberOf Components:general:messages
     * @locus Client
     *
     * @see Based on work by {@link https://buefy.org/documentation/notification|Buefy}
     *
     * @param {Boolean} closable - adds an 'X' button that closes the notification (default true)
     * @param {Number} duration - if null or 0, stays open; else will close after x  milliseconds (default 5000)
     *
     * @fires message-end
     *
     * @notes
     *  1. typical message object format:
     *          id =        {String} unique id for this element
     *          state =     {String} one of: "success", "warning", "fail", "add", "remove" or "uncertain"
     *          text =      {String} body text with optional html tags
     *
     */

    //* props
    export let closable = true;
    export let duration = 5000;

    //* support functions
    import {msgDecoration} from "./msgDecoration.js"
    import {messages} from '/imports/client/systemStores'
    import { getContext, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';

    //* local reactive variables
    let msg = [];

    $: msg = $messages.map( (m) => Object.assign(m, msgDecoration(m.state, closable, duration) ) );


    //* on start-up this is the "use" function
    function setAutoClose(node, msg) {
        let timer = null;

        if (msg.duration) {
            timer = setTimeout(() => {
                messageEnd(msg);
            }, msg.duration);
        }

        return {
            destroy() {
                clearTimeout(timer);
            }
        };
    }

    function messageEnd(msg){
        let removeMsg = $messages;
        $messages = removeMsg.filter( (m) => m.id !== msg.id);

        /**
         * @event message-end
         * @type {String} - id of message removed from queue
         */
        dispatch('message-end', msg.id);
    }

</script>




<aside class="alert-box-wrapper">
    {#each msg as message (message.id)}

        <div class="my-2" use:setAutoClose={message}>
            <div transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">

                <article class="notification {message.colour}">

                    {#if message.closable}
                        <button class="delete" type="button" on:click="{() => messageEnd(message) }"></button>
                    {/if}

                    <div class="media">
                        {#if message.hasIcon}
                            <div class="media-left">
                                <span><span class="{getContext(message.hasIcon)}"></span></span>
                            </div>
                        {/if}

                        <div class="media-content">{@html message.text}</div>
                    </div>

                </article>

            </div>
        </div>

    {/each}
</aside>
