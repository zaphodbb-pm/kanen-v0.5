/**
 * Import and register form field Components.
 *
 * @function registerForm
 * @memberOf Components:formBuilder:
 * @locus Client
 *
 * @returns {Object} - Svelte Components
 *
 * @notes
 *  1. Supports common inputs 'text', 'number', 'email', 'password', 'tel'
 *  2. Supports more complex 'textarea', 'select', 'checkbox', 'radio', 'switch', 'date', 'upload'
 *  3. Supports custom 'apiKey', 'editor'
 *  4. Supports decorator Components such as 'hr'
 *
 *  5. Used by component "fieldWrapper" to inject various fields
 *  6. "fieldWrapper" can be used outside a form for page controls
 *  7. These field components flow down from listForm > formHolder > formTabFields > fieldWrapper
 *
 */


//* load component fields
import Inputs from './inputs.svelte'
import Switch from './switch.svelte'
import TextArea from './textarea.svelte'
import HR from './hr.svelte'
import CheckBoxes from './checkboxes.svelte'
import Radios from './radios.svelte'

import Selects from './selects.svelte'
import TypeAhead from './typeahead.svelte'
import TimePicker from './timePicker.svelte'
import DatePicker from './datePicker.svelte'

import ApiKey from './apikey.svelte'
import FileBrowse from './fileBrowse.svelte'
import Swatches from './colourPicker.svelte'

import Editor from './editor/editor.svelte'
import ItemList from './itemList.svelte'
import RowList from './rows.svelte'

export const components = {
    input: Inputs,
    switch: Switch,
    textarea: TextArea,
    checkboxes: CheckBoxes,
    radios: Radios,
    colours: Swatches,
    hr: HR,
    select: Selects,
    typeahead: TypeAhead,
    apiKey: ApiKey,
    fileInput: FileBrowse,
    timePicker: TimePicker,
    datePicker: DatePicker,
    editor: Editor,
    itemList: ItemList,
    rows: RowList,
};

export const basic = {
    input: Inputs,
    switch: Switch,
    checkboxes: CheckBoxes,
    radios: Radios,
    select: Selects,
};

export const files = {
    fileInput: FileBrowse,

    input: Inputs,
    switch: Switch,
    checkboxes: CheckBoxes,
    radios: Radios,
    select: Selects,
    apiKey: ApiKey,
    hr: HR,
};

export const editor = {
    editor: Editor,

    input: Inputs,
    select: Selects,
    textarea: TextArea,
    radios: Radios,
    switch: Switch,
    checkboxes: CheckBoxes,
}
