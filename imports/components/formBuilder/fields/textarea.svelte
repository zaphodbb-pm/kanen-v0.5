<script>
    /**
     * Basic textarea box.
     *
     * @memberOf Components:Form
     * @function textarea
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} with string
     *
     */

    //* common props from parent
    export let field = {};
    export let error = "";

    //* support functions
    import {createEventDispatcher, getContext} from 'svelte';
    const dispatch = createEventDispatcher();
    const formText = getContext("formText");
    const label = formText[field.field] && formText[field.field].label ? formText[field.field].label : "";


    //* local reactive variable
    let inValue = "";

    $: inValue = setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        if(typeof val === 'object'){
            return JSON.stringify(val);
        }else{
            return val;
        }
    }

    function checkInput(){
        let out = "";
        if(typeof field.value === 'object'){
            try{
                out =  JSON.parse(inValue);
            }catch{
                out = field.value;
            }

        }else{
            out = inValue;
        }

        dispatch('on-inputentry', {value: out, error: false} )
    }

</script>


<label id="{field.field}">
    <span>{label}</span>
    <textarea class="{error}"
              bind:value={inValue}
              {...field.attributes}
              on:keyup="{checkInput}"></textarea>
</label>
