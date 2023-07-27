/**
 * Configuration list block for ArticlesSearch page listing.
 *
 * @name articlesSearch_list
 * @constant {Object}
 * @memberOf Pages:articlesSearch
 * @locus Client
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *         _id =                    String: id for the document in that table row
 *          articleId =            String: FCnnn-ART_ss
 *          type =                  Object: {_id, name}
 *          issue =                 String: magazine issue as "FC000 Jan/Feb 1994 page: nn"
 *
 *          name =                  String: name of this document
 *          subTitle =              String: text (optional)
 *          writer =                String: author
 *
 *          image =                 Object: encoded image data
 *
 * list config object:  see /imports/Components/listCollections/listHolder.svelte for details
 *
 */



export default {
    sort: {"name": 1},

    fields: [
        {
            field: "articleId",
            key: "articleId",
            type: "text",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "image",
            key: "image",
            type: "cardImage",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "name",
            key: "name",
            type: "edit",
            label: "tbd",
            sort: 1,
            search: true,
        },

        {
            field: "subTitle",
            key: "subTitle",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "writer",
            key: "writer",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },

        {
            field: "type",
            key: "type.name",
            type: "select",
            label: "tbd",
            filter: true,
            sort: false,
            search: true,
        },

        {
            field: "issue",
            key: "issue",
            type: "text",
            label: "tbd",
            sort: false,
            search: true,
        },
    ]
}
