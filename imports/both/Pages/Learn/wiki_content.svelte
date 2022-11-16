<script>
    /**
     * @summary Component to display a page selected from a Table of Contents.
     *
     * @memberOf Pages:learn
     * @function wiki_content
     * @locus Client
     *
     * @param {String}  pageid - page id to fetch page to display
     * @param {Boolean} showList - display single page content or a summary list of pages from search box
     * @param {Array}   list - page id to fetch page to display
     *
     * @emits 'getpage' with string = id of page to fetch
     * @emits 'push-author' with object = {_id: doc.author, name: doc.authorName}
     */


    //* props
    export let pageid = "";
    export let showList = false;
    export let list = [];
    export let mode = true;

    //* support files
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import {getDocs} from '/imports/functions/supportApplication/getDocs'
    import {timeAgo} from '/imports/functions/formatters/timeAgo'
    import {numString} from '/imports/functions/formatters/numString'

    //* local reactive variables
    let wordPerMin = 225;
    let charPerPage = 2100;
    let document = "";

    $: {
        if (pageid && pageid.length > 0) {
            findPage({_id: pageid});
        }
    }


    //** construct array of display objects
    function listDocs() {
        return list.map((fd) => {
            return {
                _id: fd._id,
                name: fd.name,
                author: fd.author,
                authorName: fd.authorName,
                timeAgo: timeAgo(fd.updatedAt),
                content: cleanString( fd.contentPage.slice(0, 1000) ).slice(0, 180) + " ...",
                length: docLength(fd.contentPage.length),
                time: readingTime(fd.contentPage),
            }
        });
    }

    //** get one page of content from its _id
    async function findPage(query) {
        let fp = await getDocs("learn", "schemaForm_one", query, {});
        fp.timeAgo = timeAgo(fp.updatedAt);
        document = fp;
    }

    //** format the content length into Byte, Kilobytes and Megabytes with commas as thousands separator
    function docLength(docLen) {
        let out = "";

        switch (true) {
            case docLen >= 1000000:
                out = numString(Math.round(docLen * 10 / 1024 / 1024)) / 10 + " MB";
                break;

            case docLen < 1000000 && docLen >= 1000:
                out = numString(Math.round(docLen / 1024)) + " KB";
                break;

            default:
                out = docLen + " B";
        }

        return out;
    }

    //** estimate reading time for content
    function readingTime(content){
        return Math.round( cleanString(content).split(" ").length / wordPerMin );
    }

    //** remove html tags from content for search summary list
    function cleanString(str) {
        let out = str.replace(/<\/?[^>]+(>|$)/g, "");
        out = out.replace('">','');
        out = out.replace('&nbsp;',' ');

        //*** remove <lf> & <cr> then remove excess spaces
        out = out.replace(/\r?\n|\r/g, "").replace(/\s+/g,' ');
        return out;
    }

    function sliceParagraphs(content){
        let out = [];

        if(content){
            let temp = [];
            let arr = content.split("</p>");

            arr.forEach( (a) => {
                if(a.length > 0){
                    temp.push( a + "</p>" );
                }
            });

            let page = "";
            let length = 0;
            temp.forEach( (t) => {
                page = page + t;

                let removedItems = t.replace(/<img .*?>/g,"");
                length = length + removedItems.length;

                if( length > charPerPage ){
                    out.push(page);
                    page = "";
                    length = 0;
                }
            });

            if(page){
                out.push(page);
            }
        }

        return out;
    }

</script>




<div class="card">
    <div class="">

        {#if showList}

            {#each listDocs() as doc (doc._id)}
                <div class="space-vert-medium">

                    <a class="is-size-5 is-text-semibold add-cursor"
                       id="{doc._id}"
                       on:click="{() => dispatch('getpage', doc._id)}">
                        {doc.name}
                    </a>

                    <p style="margin-bottom: 0.5rem;">{doc.content}</p>

                    <div class="level is-size-7 has-text-grey">
                        <div class="icon-nav-horz">
                            <span class="icon-bg-file"></span>

                            <span>{doc.time + " min"}&nbsp;</span>

                            <span>({doc.length})</span>
                        </div>

                        <div class="level-end">
                            <div class="icon-nav-horz">
                                <span class="icon-bg-clock"></span>

                                {doc.timeAgo}
                            </div>

                            <div class="icon-nav-horz">
                                <span class="icon-bg-user"></span>

                                <a id="{doc.author}"
                                   on:click="{() => dispatch('push-author', {_id: doc.author, name: doc.authorName})}">
                                    {doc.authorName}
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            {/each}

        {:else}

            <div style="border-bottom: 1px solid var(--border-main); margin-bottom: 0.5rem;">
                <h2>{document.name}</h2>

                {#if document.contentLead}
                    <div class="sub-title">{document.contentLead}</div>
                {/if}
            </div>

            <div class="level sub-title is-size-7">
                <div>id: {document._id}</div>

                <div class="level-end">
                    <div class="icon-nav-horz">
                        <span class="icon-bg-user"></span>

                        <a id="{document.author}" class="add-cursor"
                           on:click="{() => dispatch('push-author', {_id: document.author, name: document.authorName})}">
                            {document.authorName}
                        </a>
                    </div>

                    <span></span>

                    <div class="icon-nav-horz">
                        <span class="icon-bg-clock"></span>
                        {document.timeAgo}
                    </div>
                </div>
            </div>

            {#if document.contentSummary}
                <p class="is-size-5 space-medium">
                    {document.contentSummary}
                </p>
            {/if}

            {#if mode}
                {#each sliceParagraphs(document.contentPage) as page}
                    <div class="magazine is-narrow space-vert-medium" style="border-bottom: 1px solid var(--border-main)">
                        {@html page}
                    </div>
                {/each}
            {:else}
                <div class="space-vert-medium">
                    {@html document.contentPage}
                </div>
            {/if}

        {/if}

    </div>
</div>
