/**
 * Import and register all editor form field Components.
 *
 * @function registerEditorFields
 * @memberOf Components:formBuilder:
 * @locus Client
 *
 * @returns {Object} - Svelte Components
 *
 * @notes
 *  1. Supports common inputs 'text', 'number', 'email', 'password', 'tel'
 *  2. Supports more complex 'textarea', 'select', 'checkbox', 'radio', 'switch'
 *  3. Supports custom 'editor'
 *
 *  4. Used by component "fieldWrapper" to inject various fields
 *  5. "fieldWrapper" can be used outside a form for page controls
 *  6. These field components flow down from listForm > formHolder > formTabFields > fieldWrapper
 *
 */


//* load component fields
import Inputs from './inputs.svelte';
import Switch from './switch.svelte';
import TextArea from './textarea.svelte';
import CheckBoxes from './checkboxes.svelte';
import Radios from './radios.svelte';
import Selects from './selects.svelte';
import Editor from './editor/editor.svelte';



export const components = {
    editor: Editor,

    input: Inputs,
    select: Selects,
    textarea: TextArea,
    radios: Radios,
    switch: Switch,
    checkboxes: CheckBoxes,
}
