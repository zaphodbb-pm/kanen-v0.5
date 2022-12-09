<script>

    /**
     * Widget Bar component for MainPage that holds light / dark mode switch and text sizing selection
     *
     * @name WidgetBar
     * @module
     * @memberOf App
     * @locus Client
     *
     */


    //** get the user language preference from store
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {widgetbar} from './Widgetbar_text';

    let widgetText = i18n(widgetbar, "", $lang);


    function setTheme(theme){
        if(theme === "Dark"){
            document.body.classList.add('main-theme-dark');
        }else{
            document.body.classList.remove('main-theme-dark');
        }
    }

    function setTextSize(size){
        document.querySelector(':root').style.setProperty("--base-html-factor", size);
    }

</script>


<div class="widgetbar page-widgets is-fixed">

    <form class="widgetbar-radios">
        <span>{widgetText['label']}</span>

        <fieldset>
            <legend>{widgetText['legendTheme']}</legend>

            <label>
                <input type="radio" name="heading-sizes" checked="" on:change="{() => setTheme('Light') }">
                <span class="icon-bg-day"></span>
                <span class="sr-only">{widgetText['radioT1']}</span>
            </label>

            <label>
                <input type="radio" name="heading-sizes" on:change="{() => setTheme('Dark') }">
                <span class="icon-bg-night"></span>
                <span class="sr-only">{widgetText['radioT2']}</span>
            </label>
        </fieldset>
    </form>

    <form class="widgetbar-radios">
        <fieldset>
            <legend>{widgetText['legendSize']}</legend>
            <label>
                <input type="radio" name="text-sizes" checked="" on:change="{() => setTextSize('100%') }"  title="{widgetText['radioS1']}">
                <span>T1</span>
            </label>

            <label>
                <input type="radio" name="text-sizes" on:change="{() => setTextSize('125%') }" title="{widgetText['radioS2']}">
                <span>T2</span>
            </label>

            <label>
                <input type="radio" name="text-sizes" on:change="{() => setTextSize('175%') }" title="{widgetText['radioS3']}">
                <span>T3</span>
            </label>
        </fieldset>
    </form>

</div>