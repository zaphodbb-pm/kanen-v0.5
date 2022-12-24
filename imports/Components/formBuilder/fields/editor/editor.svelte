<script>
    //*

    /**
     * Field component for Trumbowyg editor.
     *
     * @module editor
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error - class to show a field in error
     * @param {String} className
     *
     * @fires on-inputentry
     *
     * @see Trumbowyg editor {@link https://alex-d.github.io/Trumbowyg/ setup}
     *
     * @notes
     *
     */


    //* common props from parent
    export let field = {};
    export let error = "";

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* add jQuery library and attach to window
    import jQuery from "jquery";
    window.jQuery = jQuery;
    window.jQuery.noConflict();

    //* support Functions
    import {onMount, onDestroy, getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";
    const editorTag = field.field + "-editor";
    let element;
    let editor;


    //* load Trumbowyg support files
    import "trumbowyg/dist/ui/trumbowyg.min.css";
    import "./editor-my-table.css";
    import {configs} from "./editorConfig";
    import {editorFiles} from "./editorPlugins";


    onMount(async () => {
        await editorFiles();
        jQuery("#" + editorTag).trumbowyg(configs);
    })

    onDestroy(() => {

        /*
        delete window.jQuery;

        if (editor) {
            //editor.destroy();

            delete window.jQuery;
        }

         */
    })


    //* local reactive variable
    let inValue = "";


    $: setValue(field.value);


    //* editor toolbar configuration



    //* event handlers
    function checkInput(){
        let value = "";

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: false}
         */
        dispatch('on-inputentry', {value: value, error: false});
    }


    //* Functions that mutate local variables
    function setValue(val){
        inValue = val;

    }

</script>


<label class="field--editor {className} {field.css || ''}">
    <span>{label} two</span>
</label>

<div id="{editorTag}"></div>
