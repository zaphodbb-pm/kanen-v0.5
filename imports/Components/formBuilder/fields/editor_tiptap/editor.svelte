<script>//*


    /**
     * Field component for TipTap editor.
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
     * @see TipTap editor {@link https://tiptap.dev/ setup}
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

    //* add TipTap files
    import { Editor } from '@tiptap/core';

    import { Extension } from '@tiptap/core'
    import { Blockquote, BlockquoteOptions } from '@tiptap/extension-blockquote'
    import { Bold, BoldOptions } from '@tiptap/extension-bold'
    import { BulletList, BulletListOptions } from '@tiptap/extension-bullet-list'
    import { Code, CodeOptions } from '@tiptap/extension-code'
    import { CodeBlock, CodeBlockOptions } from '@tiptap/extension-code-block'
    import { Document } from '@tiptap/extension-document'
    import { Dropcursor, DropcursorOptions } from '@tiptap/extension-dropcursor'
    import { Gapcursor } from '@tiptap/extension-gapcursor'
    import { HardBreak, HardBreakOptions } from '@tiptap/extension-hard-break'
    import { Heading, HeadingOptions } from '@tiptap/extension-heading'
    import { History, HistoryOptions } from '@tiptap/extension-history'
    import { HorizontalRule, HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
    import { Italic, ItalicOptions } from '@tiptap/extension-italic'
    import { ListItem, ListItemOptions } from '@tiptap/extension-list-item'
    import { OrderedList, OrderedListOptions } from '@tiptap/extension-ordered-list'
    import { Paragraph, ParagraphOptions } from '@tiptap/extension-paragraph'
    import { Strike, StrikeOptions } from '@tiptap/extension-strike'
    import { Text } from '@tiptap/extension-text'







    import Highlight from '@tiptap/extension-highlight';
    import TextAlign from '@tiptap/extension-text-align';
    //import StarterKit from '@tiptap/starter-kit';
    import Table from '@tiptap/extension-table';
    import TableCell from '@tiptap/extension-table-cell';
    import TableHeader from '@tiptap/extension-table-header';
    import TableRow from '@tiptap/extension-table-row';
    import Image from '@tiptap/extension-image'

    import {buttonSets} from "./editorButtons";


    let element;
    let editor;
    let fullScreen = false;

    onMount(() => {

        editor = new Editor({
            element: element,
            extensions: [
                Document,
                Paragraph,
                Text,

                Blockquote.configure({
                    HTMLAttributes: {class: "blockquote"},
                }),
                Bold,
                BulletList,
                Code,
                CodeBlock,
                Heading,
                History,
                Italic,
                ListItem,
                OrderedList,
                Strike,


                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Highlight,

                Table.configure({
                    HTMLAttributes: {class: "table", id: "table-id", title: "Some Table"},
                    resizable: true,
                }),

                TableRow,
                TableHeader,
                TableCell,
                Image.configure({
                    HTMLAttributes: {class: "img"},
                }),
            ],

            injectCSS: false,
            content: '<p>Hello World! 🌍️ </p>',


            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor;

                //console.log("Table", Table);

                //console.log("editor", editor);
            },
        });


        console.log("after new", editor);

    })

    onDestroy(() => {
        if (editor) {
            editor.destroy()
        }
    })


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


</script>


{#if editor}
    <div class="tool-bar {fullScreen ? 'is-fullscreen' : ''}">

        <div class="tool-bar-set">
            {#each buttonSets as set}
                <div class="command-block">
                    {#each set as button}

                        {#if button.type && button.type === "group"}
                            <div class="editor-dropdown">
                                <div class="editor-dropdown-trigger" tabindex="0">
                                    <button type="button" class="set-grouper" title="{button.title}">
                                        <span>{button.initial}</span>
                                    </button>
                                </div>

                                <div class="editor-dropdown-menu">
                                    {#each button.items as item}
                                        <button type="button" title="{item.title}"
                                                class:active={item.active(editor)}
                                                on:click={() => item.action(editor)}>
                                            {item.initial}
                                        </button>
                                    {/each}
                                </div>
                            </div>

                        {:else}
                            <button type="button" title="{button.title}"
                                    class:active={button.active(editor)}
                                    on:click={() => button.action(editor)}>
                                {button.initial}
                            </button>
                        {/if}
                    {/each}

                </div>
            {/each}
        </div>


        <div>
            <button type="button" title="Full screen mode"
                    class="with-border" class:active={fullScreen}
                    on:click={() => fullScreen = !fullScreen}>
                FS
            </button>
        </div>

    </div>
{/if}

<label class="field--editor {className} {field.css || ''}">
    <span>{label} two</span>

    <span class="content-area {fullScreen ? 'is-fullscreen' : ''}" bind:this={element}> </span>
</label>


<style>
    .field--editor {
        border: 1px solid var(--border-main-darker);
        border-radius: var(--radius-elem);

        box-sizing: border-box;
        padding: var(--pad-vert) var(--pad-horz);
        color: var(--text-elem);
        background-color: var(--bg-main-elem);
    }

    .command-block {
        display: flex;
        justify-content: flex-start;
        column-gap: calc( var(--gap-col, 0.5rem) / 2);
        border: 1px solid var(--border-main);
        border-radius: var(--radius-small, 0.25rem);
        padding: var(--pad-vert-small, 0.5rem);
    }

    .tool-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
        padding-top: 1.5rem;
    }

    .tool-bar-set {
        display: flex;
        justify-content: flex-start;
        column-gap: var(--gap-col, 0.5rem);
        row-gap: var(--gap-row, 0.5rem);
        flex-wrap: wrap;
    }

    .content-area {
        display: block;
        margin-top: 1.5rem;
        max-height: 40rem;
        overflow: scroll;
    }

    .tool-bar.is-fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100vw - 2 * var(--padding-large) );
        z-index: 31;
        padding: var(--padding-large);
        background-color: var(--bg-main);
    }

    .content-area.is-fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100vw - 2 * var(--padding-large) );
        height: 100vh;
        max-height: 100vh;
        overflow: scroll;
        z-index: 30;
        padding: calc( 2 * var(--padding-large) + 2rem ) var(--padding-large) var(--padding-large) var(--padding-large);
        background-color: var(--bg-main);
    }

    .tool-bar button {
        border: none;
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        background: var(--bg-main);
        color: var(--text-comp);

        font-size: var(--size-7);
        font-weight: var(--weight-medium);
        line-height: 1.2;
        height: auto;
    }

    .tool-bar button.with-border {
        border: 1px solid var(--bg-main-invert);
    }

    .tool-bar button.set-grouper {
        color: var(--text-comp);
        text-decoration-color: var(--text-comp);
        text-decoration-line: underline;
        text-underline-offset: 0.25em;
    }


    .tool-bar button.active {
        background: var(--bg-main-invert);
        color: var(--text-invert);
    }

    .tool-bar button:not(.active):hover {
        background: var(--bg-hover);
        color: var(--text);
    }

    .editor-dropdown {
        display: inline-flex;
        position: relative;
        vertical-align: top;
    }

    .editor-dropdown .dropdown-trigger > button:first-child {
        margin: 0;
        padding-right: 3rem;
    }

    .editor-dropdown-menu {
        display: none;

        width: max-content;
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 40;

        background-color: var(--bg-main-comp);
        border-radius: 0.25rem;
        box-shadow: var(--shadow);

        padding-bottom: var(--pad-vert);
        padding-top: var(--pad-vert);
    }

    .editor-dropdown:hover .editor-dropdown-menu {
        display: block;
    }

    .editor-dropdown-menu button {
        margin: 0.75rem;
        display: block;
    }

</style>
