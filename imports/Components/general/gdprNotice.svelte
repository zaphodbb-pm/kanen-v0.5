<script>

    /**
     * GDPR notice popup widget.
     *
     * @module gdprNotice
     * @memberOf Components:general:
     * @locus Client
     *
     * @fires cookie-status
     * @fires gdpr-cookie
     *
     * @requires tinyCookie_from_'tiny-cookie'
     *
     * @see Based on work by {@link https://www.npmjs.com/package/vue-cookie-accept-decline|Promosis}
     *
     */

    //* props
    export let text;


    //* get support files
    import { onMount, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import {fade} from 'svelte/transition';
    import {setCookie, getCookie, removeCookie} from 'tiny-cookie';

    //* file scoped constants
    const acceptableValues = ["accept", "decline", "postpone"];
    const elementId = text?.elementId ?? "gdpr-component";
    const supportsLocalStorage = checkLocalStorageFunctionality();

    //* local reactive variables
    let status = null;
    let isOpen = false;

    //* functions that mutate component variables
    function init(id) {
        let visitedType = getCookieStatus(id);
        let visited = acceptableValues.includes(visitedType);

        isOpen = !visited || text["debug"];
        status = visitedType;

        /**
         * @event cookie-status
         * @type {Object}
         */
        dispatch('cookie-status', visitedType);
    }

    function checkLocalStorageFunctionality() {
        try {
            const test = '__gdpr-cookie-accept-decline-check-localStorage';
            window.localStorage.setItem(test, test);
            window.localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.error('Local storage is not supported, falling back to cookie use');
            return false;
        }
    }

    function setCookieStatus(type, id) {
        if (acceptableValues.includes(type, id) ) {
            if (supportsLocalStorage) {
                localStorage.setItem(`gdpr-accept-decline-${id}`, type)
            } else {
                setCookie(`gdpr-accept-decline-${id}`, type)
            }
        }
    }

    function getCookieStatus(id) {
        if (supportsLocalStorage) {
            return localStorage.getItem(`gdpr-accept-decline-${id}`);
        } else {
            return getCookie(`gdpr-accept-decline-${id}`);
        }
    }

    function setState(type, id){
        if (acceptableValues.includes(type)) {
            setCookieStatus(type, id);

            status = type;
            isOpen = false;

            /**
             * @event gdpr-cookie
             * @type {String}
             */
            dispatch('gdpr-cookie', type);

        }else{
            dispatch('gdpr-cookie', 'unknown');
        }
    }

    function removeState(id) {
        localStorage.removeItem(`gdpr-accept-decline-${id}`);
        removeCookie(`gdpr-accept-decline-${id}`)

        status = null;
        dispatch('gdpr-cookie', "removed");
    }


    onMount(() => {
        if (text.debug) {
            removeState(elementId);
        }

        init(elementId);
    });

</script>


{#if isOpen}
    <div class="cookie" id="{text.elementId}" transition:fade="{{ duration: 1000 }}">

        <aside class="message">
            <header>
                <h2>{text.title}</h2>

                {#if text.debug}
                    <span class="is-size-7">debug: {text.debug}</span>
                {/if}

                <button type="button" class="delete" aria-label="delete" on:click="{() => setState('postpone', elementId)}"></button>
            </header>

            <div class="message-body">
                <div class="level has-nowrap">
                    <p>{@html text.msg}</p>

                    <div class="level has-nowrap" style="margin-left: 2rem;">
                        <button type="button" class="is-warning" on:click="{() => setState('decline', elementId)}">
                            {text.btnDecline}
                        </button>

                        <button type="button" class="is-primary" on:click="{() => setState('accept', elementId)}">
                            {text.btnAccept}
                        </button>
                    </div>
                </div>
            </div>
        </aside>

    </div>
{/if}



<style>

    .cookie {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 40;
        opacity: 90;
    }

</style>
