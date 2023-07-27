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

    //** wait until component is available before checking the DOM
    onMount( () => {
        //*** check local storage for any light / dark theme mode setting
        let theme = localStorage.getItem("site-theme-mode") || "Light";
        setTheme(theme);
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

    <div class="widgetbar-radios">
        <a href="https://bmc.link/requiemFC" class="buy-coffee" target="_blank">
            <img class="has-width-2rem"
                 src="/images/buy-me-a-coffee.png"
                 alt="coffee">

            <span>Buy Me <br> a Coffee</span>
        </a>
    </div>

</div>


<style>
    .buy-coffee {
        display: flex;
        column-gap: 0.25rem;
    }

    .buy-coffee span {
        margin-left: 0.25rem;
        padding-right: 1rem;
        font-size: 0.7rem;
        line-height: 1;
    }
</style>