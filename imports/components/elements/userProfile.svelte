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
    import { navigateTo } from 'svelte-router-spa/src/spa_router'
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
            navigateTo("/login");
        });
    }

</script>

    {#if user && user.profile}
        <div class="user-profile dropdown is-right is-hoverable">
            <a class="is-primary" aria-haspopup="true" aria-controls="navbar-dropdown-profile" title="{text.title}">
                {#if user && user.profile && user.profile.image && user.profile.image.src}
                    <figure class="avatar avatar-nm">
                        <img src="/logo.svg" alt="Avatar">
                    </figure>
                {:else}
                    <svg class="icon is-large"><use href="#icon-user"></use></svg>
                {/if}
            </a>

            <div class="dropdown-menu" id="navbar-dropdown-profile">
                <nav>
                    <a href="/template">{userName} {text.toProfile}</a>

                    <hr/>

                    <a href="/template">{text.changePassword}</a>
                    <a on:click="{logout}">{text.logOut}</a>
                </nav>
            </div>
        </div>
    {:else}
        <a href="/template" class="icon-nav" title="Login">
            <svg class="icon"><use href="#icon-login"></use></svg>
            <span>{text.signIn}</span>
        </a>
    {/if}
