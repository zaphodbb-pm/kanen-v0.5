<script>
    /**
     * @summary Accordion content add-in structured for displaying jsdoc information.
     *
     * @memberOf Pages:documentation
     * @function pagedContent
     * @locus Client
     * @isTemplate true
     *
     * @param {String} newCategory - event name for clicked sidebar category label
     * @param {String} newTopic - event name for clicked sidebar sub topic label to scroll to
     * @param {Object} content - input array of objects from parent
     * @param {Array}  content:list - list of content objects
     *
     * @return nothing
     *
     * @notes
     * 1. Standalone component that gets a configuration object from its parent
     * 2. The content area can include html tags
     * 3. Content can only be create and controlled by administrators.
     */

    export let content = [];
    export let newCategory = "";
    export let newTopic = "";

</script>



<div class="pagedContent">

    {#each content as item, idx}
        <div class="pagedContent">
            {#if item.list && item.list.length > 0}
                {#each item.list as subtopic, ids}

                    {#if newCategory === item.label}

                        <div class="card" id="{subtopic.name}">
                            <header class="is-secondary-light">
                                <div class="level">
                                    <h2 style="margin: 0; font-size: 1.2rem;">
                                        {subtopic.name} <i style="font-size: 0.8em;">{subtopic.kind} - {subtopic.scope}</i>
                                    </h2>
                                    <span>{subtopic.locus}</span>
                                </div>

                                <div>
                                    <span class="">{subtopic.import}</span>
                                    <span class="">(line {subtopic.lineno})</span>
                                </div>
                            </header>

                            <div class="card-content">
                                <div class="space-vert">{subtopic.description}</div>

                                {#if subtopic.params && subtopic.params.length > 0}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">Input Parameters</p>

                                        {#each subtopic.params as param}
                                            <p style="margin-bottom: 0.25rem;">
                                                <span><b>{param.name}</b></span>
                                                <span> - {`{${param.typeString} }`}</span>
                                                <span>{@html param.description}</span>
                                            </p>
                                        {/each}
                                    </div>
                                {/if}

                                {#if subtopic.properties && subtopic.properties.length > 0}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">Properties</p>

                                        {#each subtopic.properties as props}
                                            <p style="margin-bottom: 0.25rem;">
                                                <span><b>{props.name}</b></span>
                                                <span> - {`{${props.typeString} }`}</span>
                                                <span>{@html props.description}</span>
                                            </p>
                                        {/each}
                                    </div>
                                {/if}

                                {#if subtopic.returns && subtopic.returns.length > 0}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">Returned Value</p>

                                        {#each subtopic.returns as returns}
                                            <p style="margin-bottom: 0.25rem;">
                                                <span>{`{${returns.type} }`}</span>
                                                <span>{returns.description}</span>
                                            </p>
                                        {/each}
                                    </div>
                                {/if}

                                {#if subtopic.eventActivity}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">Event Activity</p>

                                        {#if subtopic.fires}
                                            {#each subtopic.fires as fires}
                                                <div class="ml-3">Emits: {fires.replace('event:', '')}</div>
                                            {/each}
                                        {/if}

                                        {#if subtopic.listens}
                                            {#each subtopic.listens as listens}
                                                <div class="ml-3">Listens: {listens}</div>
                                            {/each}
                                        {/if}
                                    </div>
                                {/if}

                                {#if subtopic.requires  && subtopic.requires.length > 0}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">Required Support Files</p>

                                        {#each subtopic.requires as require}
                                            <div class="ml-3">{require}</div>
                                        {/each}
                                    </div>
                                {/if}

                                {#if subtopic.todo  && subtopic.todo.length > 0}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">To Do</p>

                                        {#each subtopic.todo as td}
                                            <div class="ml-3">{td}</div>
                                        {/each}
                                    </div>
                                {/if}

                                {#if subtopic.see  && subtopic.see.length > 0}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">Other Documentation</p>

                                        {#each subtopic.seeString as see}
                                            <div class="ml-3">
                                                {#if see.link}
                                                    <div>
                                                        <span>{see.prefix} </span>
                                                        <span><a href="{see.link}">{see.linkName}</a></span>
                                                        <span> {see.suffix}</span>
                                                    </div>
                                                {:else}
                                                    <div>
                                                        {see.linkName}
                                                    </div>
                                                {/if}
                                            </div>
                                        {/each}
                                    </div>
                                {/if}

                                {#if subtopic.notes}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">Notes</p>
                                        <div class="">
                                            <pre class="m-0 text-1dot0em" style="font-family: sans-serif;">
                                                <code>{@html subtopic.notes}</code>
                                            </pre>
                                        </div>
                                    </div>
                                {/if}

                                {#if subtopic.examples && subtopic.examples.length > 0}
                                    <div class="space-block-vert">
                                        <p class="is-size-5 is-text-semibold">Examples</p>

                                        {#each subtopic.examples as example}
                                            <div class="">
                                                <pre><code>{@html example}</code></pre>
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {/if}

                {/each}
            {/if}
        </div>
    {/each}
</div>


<style>

    .pagedContent .card {
        margin-bottom: 2rem;
    }

    .card > header {
        padding: var(--pad-vert) var(--pad-horz);
    }

    .card .card-content {
        padding-top: 0.5rem;
    }

</style>
