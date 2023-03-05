<script>
    /**
     * Basic textarea box.
     *
     * @module textarea
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {Object} field
     * @param {String} error
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
    const label = formText[field.field] && formText[field.field].label ? formText[field.field].label : "";

    //* local reactive variable
    let inValue = "";

    $: setValue(field.value);


    //* Functions that mutate local variables
    function setValue(val){
        if(typeof val === 'object'){
            inValue =  JSON.stringify(val);
        }else{
            inValue = val;
        }
    }

    function checkInput(){
        let out;
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


<label class="{className}">
    <span>{label}</span>

    <textarea class="textarea"
              bind:value={inValue}
              {...field.attributes}
              on:keyup="{checkInput}"></textarea>
</label>
