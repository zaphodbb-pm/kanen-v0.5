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
    import {onMount} from "svelte";

    const widgetText = i18n(widgetbar, "", $lang);
    const textSizesValues = ["100%", "125%", "175%"];

    //** wait until component is available before checking the DOM
    onMount( () => {
        //*** check local storage for any light / dark theme mode setting
        let theme = localStorage.getItem("site-theme-mode") || "Light";
        setTheme(theme);

        //*** fix text size across page refreshes
        let size = localStorage.getItem("site-size-setting") || "100%";
        setTextSize(size)
    });


    function setTheme(theme){
        if(theme === "Dark"){
            document.body.classList.add('main-theme-dark');
            localStorage.setItem("site-theme-mode", "Dark");
            let radiobtn = document.getElementById("theme-mode-dark");
            radiobtn.checked = true;
        }else{
            document.body.classList.remove('main-theme-dark');
            localStorage.setItem("site-theme-mode", "Light");
            let radiobtn = document.getElementById("theme-mode-light");
            radiobtn.checked = true;
        }
    }

    function setTextSize(size){
        document.querySelector(':root').style.setProperty("--base-html-factor", size);
        localStorage.setItem("site-size-setting", size);

        let idx = textSizesValues.findIndex( elem => elem ===  size);
        document.siteTextSizes.textSizes[idx].checked = true;
    }

</script>


<div class="widgetbar page-widgets is-fixed">

    <form class="widgetbar-radios">
        <span>{widgetText['label']}</span>

        <fieldset>
            <legend>{widgetText['legendTheme']}</legend>

            <label>
                <input type="radio" id="theme-mode-light"  name="heading-sizes" checked on:change="{() => setTheme('Light') }">
                <span class="icon-bg-day"></span>
                <span class="sr-only">{widgetText['radioT1']}</span>
            </label>

            <label>
                <input type="radio" id="theme-mode-dark" name="heading-sizes" on:change="{() => setTheme('Dark') }">
                <span class="icon-bg-night"></span>
                <span class="sr-only">{widgetText['radioT2']}</span>
            </label>
        </fieldset>
    </form>

    <form class="widgetbar-radios" name="siteTextSizes">
        <fieldset>
            <legend>{widgetText['legendSize']}</legend>
            <label>
                <input type="radio" name="textSizes" checked on:change="{() => setTextSize(textSizesValues[0]) }"  title="{widgetText['radioS1']}">
                <span>T1</span>
            </label>

            <label>
                <input type="radio" name="textSizes" on:change="{() => setTextSize(textSizesValues[1]) }" title="{widgetText['radioS2']}">
                <span>T2</span>
            </label>

            <label>
                <input type="radio" name="textSizes" on:change="{() => setTextSize(textSizesValues[2]) }" title="{widgetText['radioS3']}">
                <span>T3</span>
            </label>
        </fieldset>
    </form>

</div>