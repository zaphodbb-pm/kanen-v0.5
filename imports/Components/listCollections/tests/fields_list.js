/**
 * CFields for testing ListCollection components.
 *
 * @name fields_list
 * @constant {Object}
 * @locus Test
 *
 * @property {Object} default - {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      name =              String: item name
 *      startStaticSelect = Object: option from selector
 *      startDateTime =     String: YYYY-mm-dd format
 *
 *      //updatedAt =         String: unix timestamp converted to time ago format
 *
 * list config object:      see /imports/Components/listCollections/listHolder.svelte for details
 *      field:      {String}  - unique field name in database
 *      key:        {String}  - field name or child key as field.child
 *      type:       {String}  - cell widget, see /imports/Components/listCollections/listTable.svelte
 *      label:      {String}  - field that will be overridden by text from <file>_text.js
 *      filter:     {Object}  - filter configuration information
 *      filterText: {Object}  - text for various parts of a filter
 *      condition:  {Object}  - general MongoDb search criterion merged with other items for a final query: {$gte: now}
 *      sort:       {Number}  - ascending (1) or descending (-1) or none (0)
 *      search:     {Boolean} - search bar can use this field for any search
 *
 *      prefix:     {String}  - adds a prefix to the field value in a table
 *      suffix:     {String}  - adds a suffix to the field value in a table
 *
 * Possible field types are:
 *              "check" - checkbox
 *              "tag" - coloured box with label
 *              "id" - has document id
 *              "link" - active url to new page
 *              "edit" - sends doc info to be edited
 *              "modal" - sends doc info to modal for detailed display
 *              "modalUser" - sends doc info to then fetch user info
 *              "text" - plain text display
 *              "select" - gets "name" field value
 *              "date" - formatted date display text
 *              "phone" - formatted phone number with link to phone application
 *              "email" - formatted email with link to email application
 *              "status" - dot and text status display
 *              "newpage" - launch new page in new tab
 *              "object" - stringified display of object
 *              "boolean" - check character if true
 *              "pict" - thumbnail picture
 *              "del" - trash can and docid of document to delete
 */


export const fields =  [
    {
        field:  "name",
        key:    "name",
        type:   "edit",
        label:  "Name",
        sort:   1,
        search: true,
    },

    {
        field:  "testImage",
        key:    "testImage",
        type:   "pict",
        label:  "Card Image",
        sort:   1,
        search: true,
    },

    {
        field:  "testSelect",
        key:    "testSelect.name",
        type:   "select",
        label:  "Select Box",
        sort:   1,
        search: true,
        filter: {_id: "none", name: "None"}
    },

    {
        field:  "testDate",
        key:    "testDate",
        type:   "date",
        label:  "Date",
        sort:   1,
        search: true,
        filter: {mode: "range"}
    },

    {
        field:  "testEmails",
        key:    "testEmails",
        type:   "email",
        label:  "Email",
        sort:   1,
        search: true,
    },

    {
        field:  "testTags",
        key:    "testTags",
        type:   "tag",
        label:  "Item tag",
        sort:   false,
        search: false,
    },

    {
        field:  "testObject",
        key:    "testObject",
        type:   "object",
        label:  "Object",
        sort:   false,
        search: false,
    },

    {
        field:  "updatedAt",
        key:    "updatedAt",
        type:   "text",
        label:  "Updated At",
        sort:   false,
        search: false,
    },

    {
        field:  "testCheck",
        key:    "testCheck",
        type:   "check",
        label:  "Check",
        sort:   false,
        search: false,
    },

    {
        field:  "testId",
        key:    "testId",
        type:   "id",
        label:  "ID",
        sort:   false,
        search: false,
    },

    {
        field:  "testLink",
        key:    "testLink",
        type:   "link",
        label:  "Link",
        sort:   false,
        search: false,
    },

    {
        field:  "testModal",
        key:    "testModal",
        type:   "modal",
        label:  "Modal",
        sort:   false,
        search: false,
    },

    {
        field:  "testModalUser",
        key:    "testModalUser",
        type:   "modalUser",
        label:  "Modal User",
        sort:   false,
        search: false,
    },

    {
        field:  "testPhone",
        key:    "testPhone",
        type:   "phone",
        label:  "Phone",
        sort:   false,
        search: false,
    },

    {
        field:  "testStatus",
        key:    "testStatus",
        type:   "status",
        label:  "Status",
        sort:   false,
        search: false,
    },

    {
        field:  "testNewPage",
        key:    "testNewPage",
        type:   "newpage",
        label:  "New page",
        sort:   false,
        search: false,
    },

    {
        field:  "testBoolean",
        key:    "testBoolean",
        type:   "boolean",
        label:  "Boolean",
        sort:   false,
        search: false,
    },

    {
        field:  "_id",
        key:    "_id",
        type:   "del",
        label:  "Del",
        sort:   false,
        search: false,
    },
]