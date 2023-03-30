/**
 * Import and register all form field Components.
 *
 * @function registerAllFields
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
import ApiKey from './apikey.svelte';
import CheckBoxes from './checkboxes.svelte';
import Swatches from './colourPicker.svelte';
import DatePicker from './datePicker.svelte';
import Editor from './editor/editor.svelte';
import FileBrowse from './fileBrowse.svelte';

//geoaddress

import HR from './hr.svelte';
import Inputs from './inputs.svelte';
import ItemList from './itemList.svelte';
import Radios from './radios.svelte';
import RowList from './rows.svelte';
import Selects from './selects.svelte';
import Switch from './switch.svelte';
import TextArea from './textarea.svelte';
import TimePicker from './timePicker.svelte';
import TypeAhead from './typeahead.svelte';



export const components = {
    apiKey: ApiKey,
    checkboxes: CheckBoxes,
    colours: Swatches,
    datePicker: DatePicker,
    editor: Editor,
    fileInput: FileBrowse,

    hr: HR,
    input: Inputs,
    itemList: ItemList,
    radios: Radios,
    rows: RowList,
    select: Selects,
    switch: Switch,
    textarea: TextArea,
    timePicker: TimePicker,
    typeahead: TypeAhead,
};