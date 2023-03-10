/**
 * Text for testing form fields.
 *
 * @name testing_text
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {components, form}
 *
 */

export const form = {

    labels: {
        hdr:        "Edit Document Form",
        txt:        "",
        clone:      true,
        cloneBtn:   "Clone Item",
        createBtn:  "Create New Doc",
        editBtn:    "Save Content Edit",
        backBtn:    "Back to List",
        previewBtn: "Preview",

        invalidInput:  {
            prefix: "Can't submit: ",
            suffix1: " item needs your attention: ",
            suffixn: " items need your attention: "
        }
    },

    formTabs: ["Basic", "Complex", "Advanced", "Modules"],


    //** Form field text ********************************************
    nameTest: {
        label: "Text (Name)",
        helpText: "String input type",
    },

    numberTest: {
        label: "Number Input",
        helpText: "Float with min / max and step size. ",
    },

    integerTest: {
        label: "Integer Input",
        helpText: "Integer defined by step size = 1. ",
    },

    emailTest: {
        label: "Email Input",
        helpText: "Checks for valid email before saving.  This field is 'watched' by startPhone at right.",
    },

    phoneTest: {
        label: "Telephone Input",
        helpText: "Supports '+' country code, 7 or 10 digit formatters, brackets and extension as 'x', 'ext'.",
    },

    passwordTest: {
        label: "Password Input",
        helpText: "TBD check strength",
    },

    textAreaTest: {
        label: "Text Area",
        helpText: "Expandable text area.",
    },

    addressTest: {
        label: "Address",
        helpText: "This address will generate a geolocation object on submit.",
    },

    hr1: {
        label: "",
        tag: "Form Spacer"
    },


    switchTest: {
        label: "Boolean Switch",
        tag: "Cancel Weekends",
        helpText: "Fancy check box for single item on or off.",
    },

    checkItemTest: {
        label: "Check Item",
        tag: "Make Active",
        helpText: "Alternative to a switch item.",
    },

    checkboxTest: {
        label: "Checkbox",
        helpText: "Check box for single item on or off.",
        selects: [
            {_id: "light", name: "a little rusty"},
            {_id: "moderate", name: "a regular"},
            {_id: "active", name: "ready for anything"},
        ]
    },

    radiosTest: {
        label: "Radios",
        selects: [{_id: "yes", name: "Yes"}, {_id: "no", name: "No"}, {_id: "maybe", name: "Maybe"}]
    },

    coloursTest: {
        label: "Colours",
    },

    timePickerTest: {
        label: "Time Picker",
        helpText: "Select time value from buttons.",
        tag: {
            save: "Save",
            clear: "Clear",
            close: "Close",

            hours: "Hours",
            minutes: "Minutes",
            hr12: "AM / PM"
        }
    },

    dateTimeTest: {
        label: "Date Picker (with optional time)",
        helpText: "Can select date or time input type",
    },

    staticSelectTest: {
        label: "Static Select",
        helpText: "Select from a fixed list",
        tag: {_id: "all", name: "All Options", colour: "#000000"},
        selects: [
            {_id: "sun", name: "Sunday", colour: "#000000"},
            {_id: "mon", name: "Monday", colour: "#6666ff"},
            {_id: "tue", name: "Tuesday", colour: "#bb22bb"},
            {_id: "wed", name: "Wednesday", colour: "#33aa33"},
            {_id: "thu", name: "Thursday", colour: "#ff8822"},
            {_id: "fri", name: "Friday", colour: "#aaaaaa"},
            {_id: "sat", name: "Saturday", colour: "#ff0000"},
        ]
    },

    dynamicSelectTest: {
        label: "Dynamic Select",
        helpText: "Uses a collection name to find a list of selection options.",
        tag: {_id: "all", name: "All Options"},
    },

    staticTypeaheadTest: {
        label: "Static Typeahead",
        helpText: "Uses a static list to search through for characters typed into input box.",
        selects: [
            {_id: "sun", name: "Sunday"},
            {_id: "mon", name: "Monday"},
            {_id: "tue", name: "Tuesday"},
            {_id: "wed", name: "Wednesday"},
            {_id: "thu", name: "Thursday"},
            {_id: "fri", name: "Friday"},
            {_id: "sat", name: "Saturday"},
        ]
    },

    dynamicTypeaheadTest: {
        label: "Dynamic Typeahead",
        helpText: "Uses a collection (Learn in this case) to get a list of values that can then be searched through for " +
                "characters typed into input box.  Will search through the titles of Learn content.",
    },

    apiKeyTest: {
        label: "API Key",
        helpText: "Generate api key to allow user programs to access select collections via REST.",
        fieldText: "Generate new api key"
    },

    fileTest: {
        label: "Get File",
        helpText: "Browse local device for files.  Reads text and json file types.  " +
                "The file size is limited to 500KB.",
    },

    imageTest: {
        label: "Get Image",
        helpText: "Browse local device for files.  Reads image file types such as jpeg, jpg, png, gif, etc..  " +
                "The file size is limited to 500KB.",
    },


    editorTest: {
        label: "Editor",
        helpText: "Classic text editor on textarea.",
        tag: "Be creative, add your content..."
    },

    listTest: {
        label: "List of Items",
        helpText: "This is a combination box that contains rows of columns of input fields and returns an " +
            "array of arrays of objects",
    },

    rowsTest: {
        label: "Row of Inputs",
        helpText: "This is a combination box that contains rows of columns of input fields and returns an " +
                "array of arrays of objects",

        rowText: {
            field1: {label: "Text"},
            field2: {label: "Number"},
            field3: {
                label: "Select Two",
                tag: {_id: "all", name: "All Options", colour: "#000000"},
                selects: [
                    {_id: "sun", name: "Sunday", colour: "#000000"},
                    {_id: "mon", name: "Monday", colour: "#6666ff"},
                    {_id: "tue", name: "Tuesday", colour: "#bb22bb"},
                    {_id: "wed", name: "Wednesday", colour: "#33aa33"},
                    {_id: "thu", name: "Thursday", colour: "#ff8822"},
                    {_id: "fri", name: "Friday", colour: "#aaaaaa"},
                    {_id: "sat", name: "Saturday", colour: "#ff0000"},
                ]
            },

            field4: {label: "", tag: "Active"},
        }
    }
};
