<script>
    /**
     * Field component for using Google Places api to get address predictions.
     *
     * @module geoAddress
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error - class to show a field in error
     * @param {String} className
     *
     * @fires on-inputentry
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* support Functions
    import {createEventDispatcher, getContext} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field]?.label ?? "";

    //* local reactive variable
    let inValue = "";
    let checkValue = "";
    let attributes = field.attributes;

    let predictions = [];
    let address = {};
    let selected = true;

    $: setValue(field.value);


    //* Functions that mutate local variables
    function setValue(val){
        inValue = val.address;
    }

    //* event handlers
    function checkInput(){
        let addr = inValue.replace(/\s+/g, " ").trim();
        let frags = addr.split(" ");
        let regex = /[0-9]/g;
        let numbers = frags && frags[0] && regex.test(frags[0]);
        let search = numbers ? frags.length > 1 : frags.length > 0;

        if(search){
            Meteor.call("getPredictions", addr, function(err, res){
                if(res){
                    predictions = res.info;
                }
            });
        }
    }

    async function emitSelect(sel) {
        inValue = sel.description;
        predictions = [];
        selected = true;

        //** get geocode for selected address string
        let addr = await Meteor.callAsync("geoAddress", encodeURIComponent(sel.description) );

        if(addr.status === 200 && addr.infoStatus === 200){
            let info = addr.info;
            let out = {address: info.address, geoLocation: info.geoLocation, parts: info.parts};

            /**
             * @event on-inputentry
             * @type {object} - {value: {address: String, geoLocation: geoObject} error: errorVal}
             */
            dispatch('on-inputentry', {value: out, error: false}  );
        }else{
            console.log("getGeocode error", addr);
        }
    }


    //* pure Functions
    function formatField(val){
        let value = val;
        let errorVal = false;

        return {value: value, error: errorVal};
    }

</script>



<div class="vbta {error} {className} {field.css || ''}">

    <label class="field--geo-address">
        <span>{label}</span>
        <input class="input vbta-input"
               {...attributes}
               bind:value={inValue}
               on:keyup="{checkInput}">
    </label>


    <div class="vbta-menu {predictions.length && selected ? 'visible' : ''}">
        <ul>
            {#each predictions as match}
                <li class="vbta-suggestion" on:click="{ () => emitSelect(match)}">
                    <span>{match.description}</span>
                </li>
            {/each}
        </ul>
    </div>
</div>



<style>
    .vbta {
        width: 100%;
        position: relative;
        display: inline-block;
    }

    .vbta-input {
        background-color: transparent;
    }

    .vbta-menu.visible {
        display: inline-block;
    }

    .vbta-menu {
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: none;
        float: left;
        min-width: 160px;
        padding: 5px 0;
        margin: 2px 0 0;
        list-style: none;
        font-size: 14px;
        text-align: left;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        background-clip: padding-box;
    }

    .vbta-suggestion {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: normal;
        line-height: 1.4;
        color: #555;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .vbta-suggestion:hover,
    .vbta-suggestion:focus {
        color: #fff;
        text-decoration: none;
        outline: 0;
        background-color: #00bda0;
        cursor: pointer;
    }
</style>
