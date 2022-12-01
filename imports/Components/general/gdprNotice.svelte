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
    import * as tinyCookie from 'tiny-cookie'

    //* local reactive variables
    let status = null;
    let supportsLocalStorage = true;
    let isOpen = false;

    function init() {
        let visitedType = getCookieStatus();
        if (visitedType && (visitedType === 'accept' || visitedType === 'decline' || visitedType === 'postpone')) {
            isOpen = false;
        }
        if (!visitedType) {
            isOpen = true;
        }
        status = visitedType;

        /**
         * @event cookie-status
         * @type {Object}
         */
        dispatch('cookie-status', visitedType);
    }

    function checkLocalStorageFunctionality() {
        //* Check for availability of localStorage
        try {
            const test = '__gdpr-cookie-accept-decline-check-localStorage';
            window.localStorage.setItem(test, test);
            window.localStorage.removeItem(test);
        } catch (e) {
            console.error('Local storage is not supported, falling back to cookie use');
            supportsLocalStorage = false;
        }
    }

    function setCookieStatus(type) {
        if (supportsLocalStorage) {
            if (type === 'accept') {
                localStorage.setItem(`gdpr-accept-decline-${text.elementId}`, 'accept')
            }
            if (type === 'decline') {
                localStorage.setItem(`gdpr-accept-decline-${text.elementId}`, 'decline')
            }
            if (type === 'postpone') {
                localStorage.setItem(`gdpr-accept-decline-${text.elementId}`, 'postpone')
            }
        } else {
            if (type === 'accept') {
                tinyCookie.set(`gdpr-accept-decline-${text.elementId}`, 'accept')
            }
            if (type === 'decline') {
                tinyCookie.set(`gdpr-accept-decline-${text.elementId}`, 'decline')
            }
            if (type === 'postpone') {
                tinyCookie.set(`gdpr-accept-decline-${text.elementId}`, 'postpone')
            }
        }
    }

    function getCookieStatus() {
        if (supportsLocalStorage) {
            return localStorage.getItem(`gdpr-accept-decline-${text.elementId}`)
        } else {
            return tinyCookie.get(`gdpr-accept-decline-${text.elementId}`)
        }
    }

    function accept() {
        if (!text.debug) {
            setCookieStatus('accept')
        }
        status = 'accept';
        isOpen = false;

        /**
         * @event gdpr-cookie
         * @type {String}
         */
        dispatch('gdpr-cookie', 'accepted');
    }

    function decline() {
        if (!text.debug) {
            setCookieStatus('decline')
        }
        status = 'decline';
        isOpen = false;
        dispatch('gdpr-cookie', 'declined');
    }

    function postpone() {
        if (!text.debug) {
            setCookieStatus('postpone')
        }
        status = 'postpone';
        isOpen = false;
        dispatch('gdpr-cookie', "postponed");
    }

    function removeCookie() {
        localStorage.removeItem(`gdpr-accept-decline-${this.elementId}`);
        status = null;
        dispatch('gdpr-cookie', "removed");
    }


    onMount( () => {
        checkLocalStorageFunctionality();
        init();

        if (text.debug) {
            removeCookie();
        }
    })

</script>


{#if isOpen}
    <div class="cookie" id="{text.elementId}" transition:fade="{{ duration: 1000 }}">

        <aside class="message">
            <header>
                <h2>{text.title}</h2>
                <button class="delete" aria-label="delete" on:click="{postpone}"></button>
            </header>
            <div class="message-body">
                <div class="level" style="flex-wrap: nowrap">
                    <p>{@html text.msg}</p>

                    <div class="level" style="flex-wrap: nowrap; margin-left: 2rem;">
                        <button class="button is-warning mx-5" on:click="{decline}">{text.btnDecline}</button>
                        <button class="button is-primary" on:click="{accept}">{text.btnAccept}</button>
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
