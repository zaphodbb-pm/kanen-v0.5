<script>
    
    /**
     * FooterExtras page shows the additional (optional) components that cen be added to the page footer section.
     * Currently, this includes a gdpr, system message display and a pwa / service worker enabler.
     *
     * @name footerExtras
     * @module
     * @memberOf Pages:footerExtras
     * @locus Client
     *
     * @param {String} currentRoute - page path name
     * @param {Object} params - any parameters from path url
     * @param {Object} query - any query fragment from path url
     *
     */

    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute = "";
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {lang} from '/imports/client/systemStores';
        import {i18n} from '/imports/Functions/utilities/i18n';

        import {header, page} from './footerExtras_text';

        const pageHeader = i18n(header, "", $lang);
        const text = i18n( page, "page", $lang);
        const testMessages = i18n( page, "components", $lang);

        //** app support files
        import PageHeader from "../../PageStructure/PageHeader.svelte";

     //* end of page boilerplate *************************************



    //* page-body support **************************
    const example = {
        id: "a6Y345B",
        state: "success",
        text: "Test 'success' from footerExtras.",
        closable: false,
        duration: 10000
    }

    //** sample system messages to show on right of viewport
    import {messages} from "/imports/client/systemStores";

    Meteor.setTimeout(function(){
        $messages = [... $messages, ...testMessages["messages1"]];
    }, 2000);

    Meteor.setTimeout(function(){
        $messages = [... $messages, ...testMessages["messages2"]];
    }, 3000);

</script>



<PageHeader header="{pageHeader}" />


<main class="main-content">


    <div class="row is-centered-vert">
        <div class="column">
            <section>
                <h2>{text["systemMessages"]}</h2>

                {#if text["systemMessagesBody"]}
                    {#each text["systemMessagesBody"] as body}
                        {@html body}
                    {/each}
                {/if}
            </section>
        </div>

        <div class="column">
            <pre><code>{JSON.stringify(example, null, 2)}</code></pre>
        </div>
    </div>


    <section class="space-container-vert">
        <h2>{text["gdpr"]}</h2>

        {#if text["gdprBody"]}
            {#each text["gdprBody"] as body}
                <p>{body}</p>
            {/each}
        {/if}
    </section>


    <section class="space-container-vert">
        <h2>{text["pwa"]}</h2>

        {#if text["pwaBody"]}
            {#each text["pwaBody"] as body}
                {@html body}
            {/each}
        {/if}
    </section>


    <section class="space-container-vert">
        <h2>{text["other"]}</h2>

        {#if text["otherBody"]}
            {#each text["otherBody"] as body}
                <p>{body}</p>
            {/each}
        {/if}
    </section>

</main>
