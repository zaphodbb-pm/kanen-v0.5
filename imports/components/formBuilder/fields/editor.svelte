<script>
    /**
     * Field component for Quill editor.
     *
     * @module editor
     * @memberOf Components:form
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error - class to show a field in error
     * @param {String} className
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} with text, number or other types
     *
     * @see Quill editor {@link https://quilljs.com/docs/formats/|toolbar setup}
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


    //* support functions
    import {onMount, onDestroy, getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";

    //* local reactive variable
    let inValue = "";

    let editor;
    let quill;
    let table;

    $: setValue(field.value);


    //* editor toolbar configuration
    const toolbarOptions = [
        [{ 'header': [2, 3, 4, false] }],

        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'align': [] }],
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ["link", "image", "video"],

        ['clean']                                         // remove formatting button
    ];


    //* event handlers
    function checkInput(){
        let value = quill.root.innerHTML;
        dispatch('on-inputentry', {value: value, error: false});
    }

    function actionTable(type){

        return;

        switch(type){
            case "insert-table":
                table.insertTable(3, 3);

                //** add class for system css
                let doc = document.querySelector(".ql-editor");
                let elTable = doc.getElementsByTagName("table");

                Object.values(elTable).forEach( (et) => {
                    et.className = "kanen-custom-table"
                })

                break;

            case "delete-table":
                table.deleteTable();
                break;

            case "insert-row-above":
                table.insertRowAbove();
                break;

            case "insert-row-below":
                table.insertRowBelow();
                break;

            case "delete-row":
                table.deleteRow();
                break;

            case "insert-column-left":
                table.insertColumnLeft();
                break;

            case "insert-column-right":
                table.insertColumnRight();
                break;

            case "delete-column":
                table.deleteColumn();
                break;
        }
    }

    //* functions that mutate local variables
    function setValue(val){
        inValue = val;

        if(quill){
            quill.root.innerHTML = inValue;
        }
    }


    //* lifecycle states
    onMount(async () => {
        //** load big modules dynamically only when needed
        const { default: Quill } = await import("quill");
        await import('./editor.css');

        //** wait for html template ready
        if(!editor){ return; }

        quill = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions,
                //table: true,
            },
            placeholder: formText[field.field].tag
        });

        table = quill.getModule('table');

        quill.on('editor-change', function(eventName, ...args) {
            checkInput();
        });
    });

    onDestroy( () => {
        quill = null;
        table = null;
    });

</script>




<label><span>{label}</span></label>

<div bind:this={editor}></div>


<!--
<div class="space-vert">
    <div class="buttons are-small my-2">
        <button type="button" on:click={() => actionTable("insert-table")}>Ins Table</button>
        <button type="button" class="button is-danger" on:click={() => actionTable("delete-table")}>Del Table</button>
    </div>

    <div class="buttons are-small space-vert">
        <button type="button" on:click={() => actionTable("insert-row-above")}>Ins Row Above</button>
        <button type="button" on:click={() => actionTable("insert-row-below")}>Ins Row Below</button>
        <button type="button" class="button is-danger" on:click={() => actionTable("delete-row")}>Del Row</button>
    </div>

    <div class="buttons are-small space-vert">
        <button type="button" on:click={() => actionTable("insert-column-left")}>Ins Col Left</button>
        <button type="button" on:click={() => actionTable("insert-column-right")}>Ins Col Right</button>
        <button type="button" class="button is-danger" on:click={() => actionTable("delete-column")}>Del Col</button>
    </div>

</div>
-->

