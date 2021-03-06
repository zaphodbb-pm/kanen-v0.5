<script>
    /**
     * @summary Component to display a page selected from a Table of Contents.
     *
     * @memberof Pages:Learn
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
    import { createEventDispatcher, getContext, setContext } from 'svelte';
    const dispatch = createEventDispatcher();
    import Icon from '/imports/components/elements/icon/icon.svelte'
    import {getDocs} from '/imports/functions/supportApplication/getDocs'
    import {timeAgo} from '/imports/functions/formatters/timeAgo'
    import {numString} from '/imports/functions/formatters/numString'

    //* local reactive variables
    let wordPerMin = 225;
    let wordsPerPage = 350;
    let charPerPage = 2100;
    let document = "";
    let docList = [];

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




<div class="wiki-content card">
    <div class="card-content">

        {#if showList}

            {#each listDocs() as doc (doc._id)}
                <div class="pb-2 mb-3 has-border-bottom">

                    <a class="text-1dot2rem is-family-secondary has-text-weight-bold"
                       id="{doc._id}"
                       on:click="{() => dispatch('getpage', doc._id)}">
                        {doc.name}
                    </a>

                    <p>{doc.content}</p>

                    <div class="mt-2 text-0dot9rem has-text-grey level">
                        <div class="level-left">
                            <Icon icon={getContext("iconReadTime")} />
                            <div class="ml-2">{doc.time} min</div>

                            <div class="ml-3">({doc.length})</div>
                        </div>

                        <div class="level-right">
                            <Icon icon={getContext("iconClock")} class=""/>

                            {doc.timeAgo}

                            <Icon icon={getContext("iconDefaultUser")} class="ml-3 mr-2"/>

                            <a id="{doc.author}"
                               on:click="{() => dispatch('push-author', {_id: doc.author, name: doc.authorName})}">
                                {doc.authorName}
                            </a>
                        </div>


                    </div>

                </div>
            {/each}

        {:else}

            <div class="has-border-bottom mb-2">
                <div class="title is-3">{document.name}</div>
                <div class="subtitle is-4"  class:is-hidden={!document.contentLead}>{document.contentLead}</div>
            </div>

            <div class="subtitle text-0dot8rem d-flex justify-content-between align-items-center">
                <div>
                    <span class="is-hidden-touch">id: {document._id}</span>
                </div>

                <div class="d-flex justify-content-flex-end align-items-center">
                    <Icon icon={getContext("iconDefaultUser")} class="mr-1"/>

                    <a id="{document.author}"
                       on:click="{() => dispatch('push-author', {_id: document.author, name: document.authorName})}">
                        {document.authorName}
                    </a>

                    <Icon icon={getContext("iconClock")} class="ml-3 mr-1"/>

                    <div>
                        {document.timeAgo}
                    </div>
                </div>
            </div>

            <p class="subtitle is-5 buffer-y" class:is-hidden={!document.contentSummary}>{document.contentSummary}</p>

            {#if mode}
                {#each sliceParagraphs(document.contentPage) as page}
                    <div class="content is-magazine-layout">{@html page}</div>
                    <hr class="my-5" />
                {/each}
            {:else}
                <div class="content">
                    {@html document.contentPage}
                </div>
            {/if}

        {/if}

    </div>
</div>
