<script>
    /**
     * Croppie image controller.
     *
     * @module croppie
     * @memberOf Components:widgets:
     * @locus Client
     *
     * @param {String} url - image url
     * @param {Object} options - croppie set-up options as per third party library
     *
     * @fires 'croppie-result'
     *
     * @see {@link https://github.com/foliotek/croppie}
     *
     */

    //* image url to use
    export let url = "";
    export let options = {};

    //* support Functions
    import {onMount, onDestroy, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import Croppie from 'croppie'
    import 'croppie/croppie.css'

    //* local reactive variables
    let croppie = null;

    let defaultOptions = {
        customClass: "",
        enableExif: true,
        enableOrientation: true,

        enableResize: false,
        enableZoom: true,
        enforceBoundary: true,
        mouseWheelZoom: true,
        showZoomer: true,

        viewport: {
            width: 200,
            height: 200,
            type: 'square'
        },
        minZoom: 0,
        maxZoom: 7
    }

    onMount( () => {
        let opts = Object.assign(defaultOptions, options);
        initCroppie(opts);

        $: croppie.bind({url: url});
    });

    onDestroy(() => {
        croppie.destroy();
    });


    //* croppie controls
    function initCroppie(options = {}) {
        let el = document.getElementById("croppieContainer");
        croppie = new Croppie(el, options);
    }

    function get(cb) {
        if (cb) {
            cb(croppie.get())
        } else {
            return croppie.get()
        }
    }

    function rotate(angle) {
        croppie.rotate(angle);
    }

    function setZoom(value) {
        croppie.setZoom(value);
    }

    function resultCroppie(options = {type: 'base64'}, cb = null) {
        return croppie.result(options).then(output => {
            if (!cb) {
                dispatch('croppie-result', output);
            } else {
                cb(output);
            }
            return output;
        });
    }

    function refreshCroppie() {
        croppie.destroy();
        initCroppie();
    }

    function saveImage() {
        resultCroppie();
        refreshCroppie();
    }

</script>



<div class="croppie-area">
    <div class="is-croppie-save">
        <button class="button is-primary " on:click="{saveImage}">
            <span class="icon-bg-cloud-save is-medium"></span>
        </button>
    </div>

    <div id="croppieContainer"></div>
</div>



<style>

    .croppie-area {
        position: relative;
        height: 500px;
        margin-bottom: 75px;
    }

    .is-croppie-save {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 100;

        padding: 0.5rem;
        background-color: white;
        border-radius: 4px;
    }

</style>
