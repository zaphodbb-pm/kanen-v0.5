/**
 * Configure action buttons for editor field.
 *
 * @function editorButtons
 * @memberOf Components:formBuilder:
 * @locus Client
 *
 * @returns {Array} - grouped button sets
 *
 * @notes
 *
 */


export const buttonSets = [
    [
        {
            type: "group",
            title: "Text Decorations",
            initial: "T",
            icon: "",
            items: [
                {
                    title: "Paragraph",
                    initial: "P",
                    icon: "",
                    action: function(editor){ editor.chain().focus().setParagraph().run() },
                    active: function(editor) {return editor.isActive('paragraph')}
                },

                {
                    title: "Heading 2",
                    initial: "H2",
                    icon: "",
                    action: function(editor){ editor.chain().focus().toggleHeading({ level: 2}).run() },
                    active: function(editor) {return editor.isActive('heading', { level: 2 })}
                },

                {
                    title: "Heading 3",
                    initial: "H3",
                    icon: "",
                    action: function(editor){ editor.chain().focus().toggleHeading({ level: 3}).run() },
                    active: function(editor) {return editor.isActive('heading', { level: 3 })}
                },

                {
                    title: "Heading 4",
                    initial: "H4",
                    icon: "",
                    action: function(editor){ editor.chain().focus().toggleHeading({ level: 4}).run() },
                    active: function(editor) {return editor.isActive('heading', { level: 4 })}
                },

                {
                    title: "Heading 5",
                    initial: "H5",
                    icon: "",
                    action: function(editor){ editor.chain().focus().toggleHeading({ level: 5}).run() },
                    active: function(editor) {return editor.isActive('heading', { level: 5 })}
                },
            ]

        }
    ],

    [
        {
            title: "Bold",
            initial: "B",
            icon: "",
            action: function(editor){ editor.chain().focus().toggleBold().run() },
            active: function(editor) {return editor.isActive('bold')}
        },

        {
            title: "Italic",
            initial: "I",
            icon: "",
            action: function(editor){ editor.chain().focus().toggleItalic().run() },
            active: function(editor) {return editor.isActive('italic')}
        },

        {
            title: "Strike",
            initial: "S",
            icon: "",
            action: function(editor){ editor.chain().focus().toggleStrike().run() },
            active: function(editor) {return editor.isActive('strike')}
        },

        {
            title: 'Highlight',
            initial: "HL",
            icon: '',
            action: function(editor){ editor.chain().focus().toggleHighlight().run() },
            active: function(editor) {return editor.isActive('highlight')}
        },

        {
            title: "In-line Code",
            initial: "C",
            icon: "",
            action: function(editor){ editor.chain().focus().toggleCode().run() },
            active: function(editor) {return editor.isActive('code')}
        },
    ],

    [
        {
            type: "group",
            title: "Text Alignments",
            initial: "TA",
            icon: "",
            items: [
                {
                    title: "Align Left",
                    initial: "AL",
                    icon: "",
                    action: function(editor){ editor.chain().focus().setTextAlign('left').run() },
                    active: function(editor) {return editor.isActive({ textAlign: 'left' })}
                },

                {
                    title: "Align Right",
                    initial: "AR",
                    icon: "",
                    action: function(editor){ editor.chain().focus().setTextAlign('right').run() },
                    active: function(editor) {return editor.isActive({ textAlign: 'right' })}
                },

                {
                    title: "Align Center",
                    initial: "AC",
                    icon: "",
                    action: function(editor){ editor.chain().focus().setTextAlign('center').run() },
                    active: function(editor) {return editor.isActive({ textAlign: 'center' })}
                },

                {
                    title: "Align Justify",
                    initial: "AJ",
                    icon: "",
                    action: function(editor){ editor.chain().focus().setTextAlign('justify').run() },
                    active: function(editor) {return editor.isActive({ textAlign: 'justify' })}
                },
            ]
        }
    ],

    [
        {
            title: "Bullet list",
            initial: "UL",
            icon: "",
            action: function(editor){ editor.chain().focus().toggleBulletList().run() },
            active: function(editor) {return editor.isActive('bulletList')}
        },

        {
            title: "Ordered list",
            initial: "OL",
            icon: "",
            action: function(editor){ editor.chain().focus().toggleOrderedList().run() },
            active: function(editor) {return editor.isActive('orderedList')}
        },
    ],

    [
        {
            title: "Blockquote",
            initial: "BQ",
            icon: "",
            action: function(editor){ editor.chain().focus().toggleBlockquote().run() },
            active: function(editor) {return editor.isActive('blockquote')}
        },

        {

            title: 'Code Block',
            initial: "CB",
            icon: '',
            action: function(editor){ editor.chain().focus().toggleCodeBlock().run() },
            active: function(editor) {return editor.isActive('codeBlock')}
        },
    ],

    [
        {
            type: "group",
            title: "Tables",
            initial: "TBL",
            icon: "",
            items: [
                {
                    title: "Insert Table",
                    initial: "ITab",
                    icon: "",
                    action: function(editor){ editor.chain().focus().insertTable({ rows: 5, cols: 2, withHeaderRow: true }).run() },
                    active: function(editor) {}
                },
                {
                    title: " Table",
                    initial: "IT",
                    icon: "",
                    action: function(editor){ editor.chain().focus().addColumnBefore().run() },
                    active: function(editor) {}
                },
            ]
        }



        /*
        <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
      insertTable
    </button>
    <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
      addColumnBefore
    </button>
    <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
      addColumnAfter
    </button>
    <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
      deleteColumn
    </button>
    <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
      addRowBefore
    </button>
    <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
      addRowAfter
    </button>
    <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
      deleteRow
    </button>
    <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
      deleteTable
    </button>
    <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
      mergeCells
    </button>
    <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
      splitCell
    </button>
    <button @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">
      toggleHeaderColumn
    </button>
    <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
      toggleHeaderRow
    </button>
    <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
      toggleHeaderCell
    </button>
    <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
      mergeOrSplit
    </button>
    <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
      setCellAttribute
    </button>
    <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">
      fixTables
    </button>

         */
    ],

    [
        {
            title: "Add Image",
            initial: "Img",
            icon: "",
            action: function(editor) {
                const url = window.prompt('URL');

                console.log("in image action:", url);

                if (url) {
                    editor.chain().focus().setImage({src: url}).run()
                }
            },
            active: function(editor) {}
        }
    ],

    [
        {
            title: "Clear Format",
            initial: "M",
            icon: "",
            action: function(editor){ editor.chain().focus().unsetAllMarks().run() },
            active: function(editor) {}
        }
    ],
    
    [
        {
            title: "Undo",
            initial: "U",
            icon: "",
            action: function(editor){ editor.chain().focus().undo().run() },
            active: function(editor){}
        },

        {
            title: "Redo",
            initial: "R",
            icon: "",
            action: function(editor){ editor.chain().focus().redo().run() },
            active: function(editor){}
        },
    ],
]
