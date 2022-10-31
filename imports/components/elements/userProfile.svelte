<script>
    /**
     * My Profile icon and activator for User Profile Page.
     *
     * @memberof Components:Elements
     * @function userProfile
     * @locus Client
     * @augments Navbar
     *
     */

    export let text;

    //** support functions
    import {userLoggedIn} from '/imports/client/systemStores'
    import {createEventDispatcher, getContext } from 'svelte';
    const dispatch = createEventDispatcher();

    //* component controls
    //let text = getContext("navbar").userProfile;

    //* local reactive variables
    let showImg = false;
    let user = {};
    let userName = "";

    $: {
        user = $userLoggedIn;
        showImg = !!user;

        if(showImg){
            userName = user.profile?.name ?? user.username ?? "n/a";
        }
    }


    //* functions that mutate variables
    function logout() {
        Meteor.logout(function () {
            //navigateTo("/login");
        });
    }

</script>

    {#if user && user.profile }
        <div class="dropdown is-right">

            <div class="dropdown-trigger" tabindex="0">
                <div class="dropdown-trigger" tabindex="0">
                    <div class="button is-primary no-chevron" aria-haspopup="true" aria-controls="navbar-dropdown-menu2">
                        {#if user?.profile?.image?.src}
                            <figure class="avatar avatar-nm">
                                <img src="{user?.profile?.image?.src}" alt="Avatar">
                            </figure>
                        {:else}
                            <span class="icon-bg-user"></span>
                        {/if}
                    </div>
                </div>
            </div>

            <div class="dropdown-menu" id="navbar-dropdown-profile">
                <nav aria-label="Dropdown Menu">
                    <ul>
                        <li><a href="/template">{userName} {text.toProfile}</a></li>
                        <li><a href="/template">{text.changePassword}</a></li>
                        <li><hr></li>
                        <li><a on:click="{logout}">{text.logOut}</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    {:else}
        <a href="/template" class="icon-nav" title="Login">
            <span class="icon-bg-login"></span>
            <span>{text.signIn}</span>
        </a>
    {/if}
