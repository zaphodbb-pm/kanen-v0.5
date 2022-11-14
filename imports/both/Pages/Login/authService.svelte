<script>
    /**
     * Google based login authentication.
     *
     * @module authGoogle
     * @memberOf Pages:login
     * @locus Client
     *
     * @param {String} icon - icon for service
     * @param {String} title - name to show
     * @param {String} service - name of login service
     *
     */


    //* props
    export let icon = "";
    export let title = "";
    export let service = "";

    //* support files
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* access auth service
    function authService() {

        if(service){
            Meteor[service]({}, function (err) {
                dispatch("on-auth", {service: title, err: err, auth: !err});
            });
        }
    }

</script>

<div class="level-centered">
    <a class="button is-link login-circle" on:click="{authService}" title="{title}">
        <span class="{icon}"></span>
    </a>
</div>


<style>

    .login-circle {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        padding: 0;
    }

    .login-circle > span {
        height: 2rem;
        width: 2rem;
        padding: 0;
        margin: 0;
    }

</style>
