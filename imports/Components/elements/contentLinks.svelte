<script>


    /**
     * List content links for editing role of content manager.
     *
     * @module contentLinks
     * @memberOf Components:elements:
     * @locus Client
     *
     * @param {Object} text
     * @param {String} text.toProfile
     * @param {String} text.changePassword
     * @param {String} text.logOut
     * @param {String} text.signIn
     */

    export let text;

    //** support Functions
    import {buildNavGroups} from "../../Functions/application/buildNavGroups";
    import {showRoutes} from "../../client/systemStores";

    //* local reactive variables
    let groups = [];
    let groupEdit;

$: {
    groups = buildNavGroups($showRoutes);
    groupEdit =  groups[1] && groups[2]?.length > 0 ? groups[2] : undefined;
}

</script>




{#if groupEdit}
    <div class="content-manager dropdown is-right">

        <div class="dropdown-trigger" tabindex="0">
            <div class="dropdown-trigger" tabindex="0">
                <div class="button no-chevron" aria-haspopup="true" aria-controls="navbar-dropdown-menu-content">
                    <span class="icon-nav" title={`edits`}>
                        <span class="icon-bg-edit"></span>
                        <span>{text.label}</span>
                    </span>
                </div>
            </div>
        </div>

        <div class="dropdown-menu" id="navbar-dropdown-menu-content">
            <nav aria-label="Dropdown Menu">
                <ul>
                    {#each groupEdit as links (links.name)}
                        <li>
                            <a class="icon-nav-horz}"
                               href="{links.name}"
                               title="{links.label}">

                                <span class="{links.icon}"></span>
                                <span>{links.label}</span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    </div>
{/if}
