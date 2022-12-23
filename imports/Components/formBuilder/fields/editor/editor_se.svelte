<script>


    /**
     * Field component for SunEditor.
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
     * @see SunEditor {@link https://github.com/JiHong88/SunEditor/blob/master/README.md setup}
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


    //* support Functions
    import {onMount, onDestroy, getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";
    const editorTag = field.field + "-editor";
    let editor;

    //* add SunEditor files
    import "suneditor/dist/css/suneditor.min.css";
    import suneditor from "suneditor";
    import plugins from 'suneditor/src/plugins'


    //* local reactive variable
    let inValue = "";


    $: setValue(field.value);


    //* editor toolbar configuration
    const toolbarOptions = [

    ];


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


    //* lifecycle states
    onMount( () => {

        editor = suneditor.create(editorTag, {
            plugins: plugins,
            buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['paragraphStyle', 'blockquote'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],

                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],

                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.

                ['preview', 'print'],

                ['save', 'template'],

                ['fullScreen', 'showBlocks', 'codeView'],
            ],

            width: "100%",
            height: "6rem",
            position: "top: 2rem;"
        })


        console.log("editor", editor);


        editor.onSave = function (contents, core) {
            console.log(contents)
        };
    });




    onDestroy( () => {

    });

</script>



<label class="field--editor {className} {field.css || ''}">
    <span>{label} two</span>

    <textarea id="{editorTag}"></textarea>
</label>
