/**
 * Configure editor with global and plugin settings.
 *
 * @function editorConfig
 * @memberOf Components:formBuilder:
 * @locus Client
 *
 * @property {Object} configs - main editor config object
 * @property {String} configs.svgPath - path to editor icons
 * @property {Array} configs.btns - arrays of grouped plugin names
 * @property {Object} configs.tagClasses - class strings to add to specific HTML tags
 * @property {Object} configs.plugins - list of plugin and configuration for that plugin
 *
 * @returns {Object}
 *
 * @see Trumbowyg editor {@link https://alex-d.github.io/Trumbowyg/documentation/#basic-options documentation}
 *
 * @notes
 *
 */


export const configs = {
    //** general editor settings for all plugins
    svgPath: '/icons.svg',
    tagsToRemove: ['script', 'link'],
    imageWidthModalEdit: true,
    linkTargets: ['_blank', '_self'],

    //** group certain plugins into a dropdown
    btnsDef: {
        align: {
            dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ico: 'justifyLeft'
        },

        images: {
            dropdown: ['insertImage', 'base64'],
            ico: 'insertImage'
        }
    },

    //** editor button layout
    btns: [
        ['formatting', 'fontsize'],
        ['strong', 'em', 'del', 'superscript', 'subscript', 'removeformat'],

        ['unorderedList', 'orderedList'],
        ['preformatted'],
        ['align'],
        ['indent', 'outdent'],

        ['link'],
        ['table'],
        ['images'],

        ['template'],

        ['undo', 'redo'],               // Only supported in Blink browsers
        ['viewHTML', 'fullscreen']
    ],

    //** add extra classes to certain HTML tags
    tagClasses: {
        blockquote: 'blockquote',
        table: 'table'
    },

    //** configure some plugins
    plugins: {
        fontsize: {
            allowCustomSize: false,
            sizeList: [
                '0.8rem',
                '1rem',
                '1.5rem'
            ]
        },

        table: {
            // Some table plugin options, see details below
        },

        templates: [
            {
                name: 'Main Content',
                html: '<p>bug work around - remove with "show code"</p>' +      // plugin bug; automatically wraps first element in <p></p>
                    '<h2>Content Title</h2>' +
                    '<p>Basic paragraph</p>'
            },
            {
                name: 'Content with Columns',
                html: '<p>bug work around - remove with "show code" </p>' +     // plugin bug; automatically wraps first element in <p></p>
                    '<h2>Content Title</h2>' +
                    '<div class="row">' +
                        '<div class="column">' +
                            '<p>Column 1</p>' +
                        '</div>' +
                        '<div class="column">' +
                            '<p>Column 2</p>' +
                        '</div>' +
                    '</div>'
            }
        ]
    }
}
