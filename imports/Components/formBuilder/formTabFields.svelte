<script>
    /**
     * Form wrapper for tabbing fields.
     *
     * @module formTabFields
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Array}   tabLabels - optional array of tab labels
     * @param {Array}   fields - re-configured array (of arrays) of field information
     * @param {Object}  config - top level configuration settings
     * @param {Boolean} config.hasTabs - signals the need to construct a tab header
     * @param {Boolean} config.hasGroups - signals the need to construct grouped fields
     *
     * @fires field-changed
     *
     */

    //* props from Form Holder
    export let config;
    export let fields = [];

    export let formText = {};

    export let components;

    //* support Functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* children Components
    import Field_Wrapper from './fieldWrapper.svelte'

    //* local reactive variables
    const tabLabels = formText.formTabs;

    let watchFields = {};

    //* event handlers
    function fieldChanged(msg){
        /**
         * @event field-changed
         * @type {object}
         */

        dispatch('field-changed', msg.detail);
        watchFields = msg.detail;
    }

</script>




{#if config.hasTabs}

    <div class="form-tabs">
        {#each tabLabels as tab, idx}
            <input type="radio" name="tab_unit_01" id="{'tab_' + tab}" hidden  checked="{idx === 0}" aria-hidden="true">
        {/each}

        <ul hidden aria-hidden="true">
            {#each tabLabels as tab}
                <li><label for="{'tab_' + tab}">{tab}</label></li>
            {/each}
        </ul>

        <div class="form-group-container">
            {#each fields as tab, index}

                <div class="form-group">
                    {#if config.hasGroups}
                        {#each tab as groups}
                            {#if groups.length > 1}
                                <div class="field-group">
                                    {#each groups as field}
                                        <Field_Wrapper
                                                class=""
                                                {field}
                                                {components}
                                                {watchFields}
                                                fieldText="{formText[field.field]}"
                                                on:field-changed="{fieldChanged}"/>
                                    {/each}
                                </div>
                            {:else}
                                <Field_Wrapper
                                        class=""
                                        field="{groups[0]}"
                                        {components}
                                        {watchFields}
                                        fieldText="{formText[groups[0].field]}"
                                        on:field-changed="{fieldChanged}"/>
                            {/if}
                        {/each}
                    {:else}

                        {#each tab as field}
                            <Field_Wrapper
                                    class=""
                                    {field}
                                    {components}
                                    {watchFields}
                                    fieldText="{formText[field.field]}"
                                    on:field-changed="{fieldChanged}"/>
                        {/each}

                    {/if}
                </div>

            {/each}
        </div>

    </div>

{:else}

    {#if config.hasGroups}

        {#each fields as groups}
            {#if groups.length > 1}

                <div class="field-group">
                    {#each groups as field}
                        <Field_Wrapper
                                class=""
                                {field}
                                {components}
                                {watchFields}
                                fieldText="{formText[field.field]}"
                                on:field-changed="{fieldChanged}"/>
                    {/each}
                </div>

            {:else}
                <Field_Wrapper
                        class=""
                        field="{groups[0]}"
                        {components}
                        {watchFields}
                        fieldText="{formText[groups[0].field]}"
                        on:field-changed="{fieldChanged}"/>
            {/if}
        {/each}

    {:else}

        {#each fields as field}
            <Field_Wrapper
                    class=""
                    {field}
                    {components}
                    {watchFields}
                    fieldText="{formText[field.field]}"
                    on:field-changed="{fieldChanged}"/>
        {/each}

    {/if}

{/if}