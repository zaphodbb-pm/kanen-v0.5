<script>
    /**
     * Layout for Cards Page.
     * Builds two sample cards with different configurations
     *
     * @memberof Pages:Cards
     * @function cards
     * @locus Client
     *
     * @param {Object} currentRoute
     * @param {Object} params - url parameters
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './cards_text'
        //import {pageConfig} from './cards_config'

        //** app support files
        import {getContext } from 'svelte';
        import PageWrapper from '/imports/both/PageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************


    //* page body support **************************
    import Icon from '/imports/components/elements/icon/icon.svelte'
    import Card from '/imports/components/blocks/card.svelte';

    let text = page.components;


    //* respond to component events
    function cardsEvent(event){
        console.log("cardsEvent", event.detail);
    }

</script>



<PageWrapper {header} >

    <div class="columns">
        <article class="column is-6">
            <Card text="{text.cardOne}" id="cardsOne">
                <div class="d-flex align-items-center has-text-green-dark title is-3">
                    <Icon icon={getContext("iconMark")} class="is-size-3"/>
                    <span class="ml-3">Hello World</span>
                </div>
            </Card>
        </article>

        <article class="column is-6">
            <Card text="{text.cardTwo}" id="cardsTwo" on:footEvent={cardsEvent}>
                <div class="d-flex align-items-center has-text-green-dark title is-3">
                    <Icon icon={getContext("iconPost")} class="is-size-2" />
                    <span class="ml-3">Another View</span>
                </div>
            </Card>
        </article>
    </div>

</PageWrapper>
