<script>
    /**
     * My Profile icon and activator for User Profile Page.
     *
     * @module userProfile
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
    import {userLoggedIn} from '/imports/client/systemStores'
    import {createEventDispatcher } from 'svelte';
    import {goto} from  'svelte-pathfinder';
    const dispatch = createEventDispatcher();

    //* local reactive variables
    let user = {};
    let userName = "";

    $: {
        user = $userLoggedIn;

        if(!!user){
            userName = user?.profile?.name ?? user?.username ?? "n/a";
        }
    }


    //* Functions that mutate variables
    function logout() {
        Meteor.logout(function () {
            goto("/home");
        });
    }

</script>


    {#if user && user._id }
        <div class="user-profile dropdown is-right">

            <div class="dropdown-trigger" tabindex="0">
                <div class="dropdown-trigger" tabindex="0">
                    <div class="button no-chevron" aria-haspopup="true" aria-controls="navbar-dropdown-profile">
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
                        <li><a href="/my-profile">{userName} {text.toProfile}</a></li>
                        <li><a href='/changePassword?type=change'>{text.changePassword}</a></li>
                        <li><hr></li>
                        <li><a href="#home" on:click="{logout}">{text.logOut}</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    {:else}
        <a href="/login" class="user-profile icon-nav" title="Login">
            <span class="icon-bg-login"></span>
            <span>{text.signIn}</span>
        </a>
    {/if}
