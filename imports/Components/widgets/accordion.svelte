<script lang="ts">

    /**
     * Accordion content widget.
     *
     * @module accordion
     * @memberOf Components:widgets
     * @locus Client
     *
     * @param {Object[]} content - input array of objects from parent
     * @param {String} content[].icon - accordion label icon positioned at left of tab
     * @param {String} content[].label - accordion label
     * @param {String} content[].text - content to display in body of accordion
     * @param {String} content[].style - optional class to apply to each accordion in group
     *
     * @param {String} className - optional top level css controls
     *
     * @notes
     * 1. Standalone component that gets a configuration object from its parent
     * 2. The content.text area can include html tags
     * 3. Content can only be created and controlled by administrators.
     */

    //* external props
    export let content = [];

    let className = ''
    // noinspection ReservedWordAsName
    export { className as class }


</script>



<div class="accordions {className}">
    {#each content as item, idx}

        <details class="accordion {item.style}">
            <summary>
                {#if item.icon}<span class="{item.icon}"></span>{/if}
                <span>{item.label}</span>
            </summary>

            <div>{@html item.text}</div>
        </details>

    {/each}
</div>
