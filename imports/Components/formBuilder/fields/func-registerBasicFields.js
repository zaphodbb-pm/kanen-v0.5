/**
 * Import and register basic set of form field Components.
 *
 * @function registerBasicFields
 * @memberOf Components:formBuilder:
 * @locus Client
 *
 * @returns {Object} - Svelte Components
 *
 * @notes
 *  1. Supports common inputs 'text', 'number', 'email', 'password', 'tel'
 *  2. Supports more complex  'select', 'checkbox', 'radio', 'switch',
 *
 *  3. Used by component "fieldWrapper" to inject various fields
 *  4. "fieldWrapper" can be used outside a form for page controls
 *  5. These field components flow down from listForm > formHolder > formTabFields > fieldWrapper
 *
 */


//* load component fields
import Inputs from './inputs.svelte';
import Switch from './switch.svelte';
import CheckBoxes from './checkboxes.svelte';
import Radios from './radios.svelte';
import Selects from './selects.svelte';
import TextArea from "./textarea.svelte";



export const components = {
    input: Inputs,
    switch: Switch,
    checkboxes: CheckBoxes,
    radios: Radios,
    select: Selects,
    textarea: TextArea,
};