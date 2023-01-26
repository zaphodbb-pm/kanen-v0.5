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

    //* add jQuery library and attach to window only for this component
    import jQuery from "jquery";
    window.jQuery = jQuery;
    window.jQuery.noConflict();

    //* support Functions
    import {onMount, onDestroy, getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";
    const editorTag = field.field + "-editor";
    const editorTagId = "#" + field.field + "-editor";

    let element;
    let editor;
    let inVal = "";

    //* local reactive variable
    $: setValue(field.value);


    //* load Trumbowyg support files
    import "trumbowyg/dist/ui/trumbowyg.min.css";
    import "./editor-my-table.css";
    import {configs} from "./editorConfig";
    import {editorFiles} from "./editorPlugins";


    onMount(async () => {
        await editorFiles();
        jQuery(editorTagId).trumbowyg(configs);

        //console.log("onMount", inVal);
        jQuery(editorTagId).trumbowyg('html', inVal);

        //*** respond to editing changes
        jQuery(editorTagId).trumbowyg().on('tbwfocus', function(){
            console.log('Focus!');
        });

        jQuery(editorTagId).trumbowyg().on('tbwblur', function(){
            console.log('Blur!');
            checkInput();
        });
    })

    onDestroy(() => {
        jQuery(editorTagId).trumbowyg('destroy');
        delete window.jQuery;
    })


    //* event handlers
    function checkInput(){
        let value = jQuery(editorTagId).trumbowyg('html');

        //console.log("checkInput", value);

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: false}
         */
        dispatch('on-inputentry', {value: value, error: false});
    }


    //* Functions that mutate local variables
    function setValue(val){
        inVal = val;

        //console.log("setValue", inVal);
    }

</script>


<label class="field--editor {className} {field.css || ''}">
    <span>{label} two</span>
</label>

<div id="{editorTag}"></div>
