<script>

    /**
     * Simple icon display component for Fontawesome5 formatted json objects.
     *
     * @memberof Components:Elements
     * @function icon
     * @locus Client
     *
     * @return nothing
     *
     * @see {https://icons8.com/line-awesome}
     * @see {https://github.com/alphapeter/fa-svelte}
     *
     * @notes
     * 1. usage: <Icon class="extraClass" icon={iconName} />
     */

    export let icon;

    let path = icon?.icon[4] ?? [];
    let classes = ($$props.class ? $$props.class : "");
    let viewBox = `0 0 ${icon?.icon[0] ?? 32} ${icon?.icon[1] ?? 32}`;

</script>


<svg aria-hidden="true"
     class="fa-svelte {icon.iconName + ' ' + classes}"
     role="img"
     xmlns="http://www.w3.org/2000/svg"
     viewBox="{viewBox}">

    <path fill="currentColor" d="{path}" />
</svg>



<style>
    .fa-svelte {
        width: 1em;
        height: 1em;
        overflow: visible;
        display: inline-block;
        line-height: 0;
    }
</style>
