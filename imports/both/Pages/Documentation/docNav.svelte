<script>

    /**
     * Accordion content widget for jsdoc documentation.
     *
     * @module docNav
     * @memberOf Pages:documentation
     * @locus Client
     *
     * @param {String} tabSettings - controls button settings
     *
     * @param {Object} content - input array of objects from parent
     * @param {String} content:icon - tab label icon positioned at left of tab
     * @param {String} content:label - tab label
     * @param {String} content:text - optional content to display in body of tab
     * @param {Array}  content:list - optional content as a list of content objects
     *
     *
     * @fires doc-maintopic
     * @fires doc-subtopic
     *
     * @notes
     * 1. Standalone component that gets a configuration object from its parent
     * 2. The content area can include html tags
     * 3. Content can only be create and controlled by administrators.
     */


    //* external props
    export let tabSettings = "";
    export let text = [];

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    let  currTab = text && text.length > 0 ? text[0].label : "";


    function changetab(tab) {
        currTab = tab;
        /**
         * @event doc-maintopic
         * @type {String}
         */
        dispatch('doc-maintopic', tab);
    }

    function setContent(sub) {
        /**
         * @event doc-subtopic
         * @type {String}
         */
        dispatch("doc-subtopic", sub);
    }

</script>






<div class="accordions">
    {#each text as item, idx}
        <div class="accordion">

            <a class="button accordion-header is-primary-light {tabSettings}" on:click|stopPropagation={ () => changetab(item.label) }>
                <div class="level-start">
                    <b>{item.label}</b>
                    <span class="badge badge-primary" style="transform: none">
                        {item.list.length}
                    </span>
                </div>
            </a>

            <div class="accordion-body">
                <div  class="{item.label === currTab ? 'open-body' : 'close-body'}">
                    {#each item.list as sublabel, idx}
                        <div on:click={ () => setContent(sublabel.name) }>
                            <span class="accordion-list">{sublabel.name}</span>
                        </div>
                    {/each}
                </div>
            </div>

        </div>
    {/each}
</div>






<style>

    .accordion {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.25rem;
    }

    .accordion-header {
        text-align: left !important;
        justify-content: left !important;
    }

    .accordion-body {
        overflow-y: hidden;

        border: 1px solid #dbdbdb;
        border-radius: 0 0 4px 4px;
        border-top: none;
    }

    .accordion-content p {
        margin-bottom: 0.75rem;
    }

    .accordion-list {
        cursor: pointer;
        padding-left: 1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .open-body {
        overflow: hidden;
        max-height: 70rem;

        transition-property: all;
        transition-duration: 2s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .close-body {
        overflow: hidden;
        max-height: 0;
    }

</style>
