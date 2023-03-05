<script>

    /**
     * Messages component to handle system-wide notifications.
     *
     * @module messages
     * @memberOf Components:general:
     * @locus Client
     *
     * @see Based on work by {@link https://buefy.org/documentation/notification|Buefy}
     *
     * @param {Boolean} closable - adds an 'X' button that closes the notification (default true)
     * @param {Number} duration - if null or 0, stays open; else will close after x  milliseconds (default 5000)
     *
     * @property {Object} message - reactive state object set by other components
     * @property {String} message.id - unique id for this element
     * @property {String} state - one of: "success", "warning", "fail", "add", "remove" or "uncertain"
     * @property {String} text - body text with optional html tags
     *
     * @fires message-end
     *
     */

    //* props
    export let closable = true;
    export let duration = 5000;

    //* support Functions
    import {msgDecoration} from "./msgDecoration.js"
    import {messages} from '/imports/client/systemStores'
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';

    //* local reactive variables
    let msg = [];

    $: msg = $messages.map( (m) => Object.assign(msgDecoration(m.state, closable, duration), m ) );


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




<aside class="system-messages">
    {#each msg as message (message.id)}

        <div class="space-element-vert" use:setAutoClose={message}>

            <aside class="notification {message.colour}" transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">
                {#if message.closable}
                    <button class="delete" type="button" on:click="{() => messageEnd(message) }"></button>
                {/if}

                <div class="level-start has-nowrap">
                    {#if message.hasIcon}
                        <span><span class="{message.hasIcon} is-large" style="margin: 0;"></span></span>
                    {/if}

                    <p>{message.text}</p>
                </div>
            </aside>

        </div>

    {/each}
</aside>


<style>

    .system-messages {
        position: fixed;
        min-width: 35vw;
        max-width: 40vw;
        top: calc( var(--navbar-height) + var(--widgetbar-height) + 1rem);
        right: var(--margin);
        z-index: 11;
    }

</style>