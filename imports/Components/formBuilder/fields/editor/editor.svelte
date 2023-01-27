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

    //* local variables
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";
    const editorTag = field.field + "-editor";
    const editorTagId = "#" + field.field + "-editor";

    let element;
    let editor;
    let inVal = "";
    let isMounted = false;

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
        jQuery(editorTagId).trumbowyg('html', inVal);

        isMounted = true;

        //*** respond to editing changes
        jQuery(editorTagId).trumbowyg().on('tbwfocus', function(){
            //console.log('Focus!');
        });

        jQuery(editorTagId).trumbowyg().on('tbwblur', function(){
            checkInput();
        });

        jQuery(editorTagId).trumbowyg().on('tbwchange', function(){
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

        /**
         * @event on-inputentry
         * @type {object} - {value: value, error: false}
         */
        dispatch('on-inputentry', {value: value, error: false});
    }



    //* Functions that mutate local variables
    function setValue(val){
        inVal = val;

        if(isMounted){
            jQuery(editorTagId).trumbowyg('html', val);
        }
    }

</script>


<label class="field--editor {className} {field.css || ''}">
    <span>{label} two</span>
</label>

<div id="{editorTag}"></div>
