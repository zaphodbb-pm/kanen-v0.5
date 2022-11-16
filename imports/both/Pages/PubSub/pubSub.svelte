<script context="module">
    //** change source for values

    //** can be any external source that creates values
    //** set up initial docs and their values
    let len = 15;
    let interval = 3000;

    let generateValues = function(len){
        let newArray = [];
        for( let i = 0; i < len; i++){
            newArray[i] = {
                name: "real_time_" + i,
                value: Math.round( Math.random() * 100 )
            };
        }

        return newArray;
    }

    let newArray = generateValues(len);

    Meteor.call("bulkLoadDocs", "pubSub", newArray, function(err, res){
        if(err){ console.log("Bulk Upload Failed: ", err);}
        if(res){ Meteor.subscribe("testRealTime", [], {}); }
    });

</script>


<script>
    /**
     * Layout for PubSub page.
     *
     * @name pubSub
     * @module
     * @memberOf Pages:pubSub
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params = {};
        export let query = {};

        //** page specific text and configuration
        import {header, page} from './pubSub_text'
        //import {pageConfig} from './pubSub_config'

        //** app support files
        import { onMount, onDestroy } from 'svelte';
        import PageHeader from "../../PageStructure/PageHeader.svelte";

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/functions/utilities/i18n'
    import {lang} from '/imports/client/systemStores'

    const pageHeader = i18n(header, "", $lang);

    let text = i18n(page, "page", $lang);
    let values = new Array(len).fill({name: "init", value: 0});
    let intervalId = null;
    let timings = {min: 0, max: 0, avg: 0};

    let colours = ["is-progress-primary", "is-progress-secondary", "is-progress-tertiary", "is-progress-link",
        "is-progress-success", "is-progress-warning", "is-progress-danger"];



    /* react to any changes in the collection and update the progress bar values */
    $m: {
        let allDocs = RealTime.find({author: Meteor.userId()}, {limit: len}).fetch();

        allDocs = allDocs.map( (rt) => {
            let timeStart = rt && rt.updatedAt ? rt.updatedAt : Date.now();
            rt.delay = Date.now() - timeStart;
            return rt;
        })

        values = allDocs;

        //*** extract values into an array and then find min, max and avg
        let delays = allDocs.map(ad => ad.delay);

        timings.min = Math.min(...delays);
        timings.max = Math.max(...delays);
        timings.avg = Math.round( delays.reduce((a, b) => a + b, 0) / delays.length );
    }

    onMount( () => {

        //** update all documents at once with random values with direct write method
        intervalId = setInterval( function(){
            Meteor.call("updateRealTimeDoc", "pubSub", generateValues(len), function(err, res){
                if(err){console.log("Update Real Time failed: ", err);}
            });

        }, interval);
    });

    onDestroy( () => {
        if(intervalId){
            clearInterval(intervalId);
        }
    });

</script>



<PageHeader header="{pageHeader}" />

<main class="main-content">

    <p>{text.report.interval} {interval / 1000}</p>

    <p>
        {text.report.title} ({text.report.suffix}) -
        {text.report.min}: {timings.min};
        {text.report.max}: {timings.max};
        {text.report.avg}: {timings.avg}
    </p>


    <table class="space-medium">
        <thead>
            <tr>
                <th>{text.labels.name}</th>
                <th>{text.labels.value}</th>
                <th>{text.labels.delay}</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            {#each values as item, idx (idx)}
                <tr>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                    <td>{item.delay}</td>
                    <td style="width: 100%;">
                        <progress class="progress {colours[idx % colours.length]}" value="{item.value}" max="100">{item.value}%</progress>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

</main>


<style>
    table td,
    table th {
        padding:0.5rem;
    }


</style>