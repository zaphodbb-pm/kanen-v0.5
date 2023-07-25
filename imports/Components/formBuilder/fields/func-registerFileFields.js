/**
 * Import and register all form field Components.
 *
 * @function registerFileFields
 * @memberOf Components:formBuilder:
 * @locus Client
 *
 * @returns {Object} - Svelte Components
 *
 * @notes
 *  1. Supports common inputs 'text', 'number', 'email', 'password', 'tel'
 *  2. Supports more complex 'textarea', 'select', 'checkbox', 'radio', 'switch', 'upload'
 *
 *  5. Used by component "fieldWrapper" to inject various fields
 *  6. "fieldWrapper" can be used outside a form for page controls
 *  7. These field components flow down from listForm > formHolder > formTabFields > fieldWrapper
 *
 */


//* load component fields
import Inputs from './inputs.svelte';
import Switch from './switch.svelte';
import HR from './hr.svelte';
import CheckBoxes from './checkboxes.svelte';
import Radios from './radios.svelte';
import Selects from './selects.svelte';
import ApiKey from './apikey.svelte';
import FileBrowse from './fileBrowse.svelte';
import FileGridFS from './fileGridFS.svelte';




export const components = {
    fileInput: FileBrowse,
    fileGridFS: FileGridFS,

    input: Inputs,
    switch: Switch,
    checkboxes: CheckBoxes,
    radios: Radios,
    select: Selects,
    apiKey: ApiKey,
    hr: HR,
};