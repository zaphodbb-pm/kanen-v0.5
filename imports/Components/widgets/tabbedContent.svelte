<script>

    /**
     * Tabbed content widget.
     *
     * @module tabbedContent
     * @memberOf Components:widgets:
     * @locus Client
     *
     * @param {Object[]} content - input array of objects from parent
     * @param {String} content[]:icon - tab label icon positioned at left of tab
     * @param {String} content[]:label - tab label
     * @param {String} content[]:lead - tab subtitle
     * @param {String} content[]:text - optional content to display in body of tab
     *
     * @param {String} className - optional top level css controls
     *
     * @see Goldilocks-CSS documentation for {@link https://zaphodbb-pm.github.io/goldilocks-css/pages/extend-components/tabs.html|tabs}
     *
     * @notes
     * 1. Standalone component that gets a configuration object from its parent
     * 2. The content area can include html tags
     * 3. Content can only be created and controlled by administrators.
     */


    //* external props
    export let content = [];

    let className = ''
    // noinspection ReservedWordAsName
    export { className as class }

</script>



<div class="tabs {className}">
    {#each content as item, idx}
        <input type="radio" name="tab_unit_1" id="{item.label}" hidden checked="{idx === 0}">
    {/each}

    <ul hidden>
        {#each content as item, idx}
            <li>
                <label for="{item.label}">
                    <span class="{item.icon}"></span>
                    {item.label}
                </label>
            </li>
        {/each}
    </ul>

    <div class="tab-content">
        {#each content as tab}
            <section>
                <h3 class="sr-only">{tab.label}</h3>

                {#if tab.lead}
                    <p class="lead">{tab.lead}</p>
                {/if}

                {#if Array.isArray(tab.text)}
                    <ul>
                        {#each tab.text as item}
                            <li>{@html item}</li>
                        {/each}
                    </ul>

                {:else}
                    {@html tab.text}
                {/if}

            </section>
        {/each}
    </div>
</div>