/**
 * Configuration list block for TestKitchenShow page listing.
 *
 * @name testKitchenShow_list
 * @constant {Object}
 * @memberOf Pages:testKitchenShow
 * @locus Client
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      image =             Object: {name, src} base64 encoded image
 *      name =              String: item name
 *      subTitle =          String: item subtitle
 *      writer =            String: item author
 *      type =              Object: {_id, name}
 *      issue =             String: FC000_ART_00
 *
 *
 * list config object:  see /imports/Components/listCollections/listHolder.svelte for details
 *
 */



export default {
    sort: {"name": 1},

    fields: [
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
            field: "type",
            key: "type.name",
            type: "text",
            label: "tbd",
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