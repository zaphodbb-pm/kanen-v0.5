<script>
    /**
     * Notifications widget for Navbar.
     *
     * @memberof Components:Elements
     * @function interest
     * @locus Client
     * @augments Navbar
     *
     */

    //* props
    export let text;

    //** event handlers
    import { getContext, onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* support files
    import {getDocs} from '/imports/functions/supportApplication/getDocs'
    import {timeAgo} from '/imports/functions/formatters/timeAgo'

    //* local reactive variables
    let itemsToShow = 10;
    let items = [];
    let itemsLen = 0;
    let showItems = itemsToShow;

    onMount(() => {
        getMyNotifications();
    });


    async function getMyNotifications() {
        let me = Meteor.user();
        let now = new Date();
        now = now.toISOString();


        //***** for dev only
        me = me ? me : {_id: "abc"};
        const initVal = [{
            header: "Test Message",
            title: "At a pub near you",
            date: new Date( ( Date.now() + 1000 * 3600 * 3) ).toDateString(),
            location: "1 Main Street, My City",
            msg: "Let's chat and quaff",
            notifyId:  "abcdefg",
            itemId: "itemid-12345",
            timeAgo: timeAgo(Date.now() - 1000 * 3600 * 2 ),
            type: "INFO",
        },

        {
            header: "Msg Header 2",
            title: "At a diner near you",
            date: new Date( ( Date.now() + 2000 * 3600 * 3) ).toDateString(),
            location: "1 High Street, My City",
            msg: "Let's meet and break bread.",
            notifyId:  "abcdefg123",
            itemId: "itemid-4567",
            timeAgo: timeAgo(Date.now() - 2000 * 3600 * 2 ),
            type: "INFO",
        }];

        let unread = {};
        unread[me._id] = true;

        let query = {
            uids: me._id,
            validUntil: {$gte: now},
            unread
        };

        let options = {
            sort: {validUntil: 1},
            limit: itemsToShow
        };

        let notifications = await getDocs("notifications", "schemaLong", query, options);
        itemsLen = await getDocs("notifications", "schemaLong_count", query, {});

        items = notifications.map( (int) => {
            let out = int.msg;
            out.notifyId = int._id;
            out.itemId = int.itemId;
            out.timeAgo = timeAgo(int.updatedAt);
            out.type = int.itemType;
            return out;
        });


        //*** for dev purposes only
        if(itemsLen === 0){
            itemsLen = 1;
            items = [...initVal];
        }

        showItems = itemsToShow;
    }

    function readNotify(item){
        console.log("message acknowledged", item);
    }

</script>



<div class="dropdown is-hoverable is-right">
    <a class="is-primary" aria-haspopup="true" aria-controls="navbar-dropdown-notifications">
        <span class="badge is-badge-danger" data-badge="{itemsLen}" title="unread messages">
            <svg class="icon is-large"><use href="#icon-bell"></use></svg>
        </span>
    </a>

    <div class="dropdown-menu" id="navbar-dropdown-notifications">
        {#each items as item, index (index)}
            <nav class="card space-vert">
                <header class="card-header">
                    <h4 class="card-header-title">
                        {item.header}
                    </h4>
                </header>

                <div class="card-body">
                    <div><b>{item.title}</b></div>
                    <div>{item.date}</div>
                    <div>{item.location}</div>

                    <div class="level-end is-size-7 space-vert has-text-grey">
                        <svg class="icon"><use href="#icon-clock"></use></svg>
                        <span>{item.timeAgo}</span>
                    </div>

                    <button class="is-primary-outlined is-small has-hover" on:click="{() => readNotify(item)}">
                        {text.read}
                    </button>
                </div>
            </nav>
        {/each}
    </div>
</div>
