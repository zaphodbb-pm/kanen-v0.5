/**
 * Text for Home page.
 *
 * @name home_text
 * @constant {Object}
 * @memberOf Pages:home
 * @locus Client
 *
 * @property {Object} header - i18n of {title, lead, body}
 * @property {Object} page - i18n of {page, components}
 */



//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Requiem for Fine Cooking",
        subtitle:   "",
        body:   "",
    }
};


export const page = {

    page: {
        en: {
            intro: "Introduction",

            introText: '<p>Why "Requiem for Fine Cooking"?  A <a href="https://www.merriam-webster.com/dictionary/requiem">requiem</a> ' +
                'is typically a <em>mass for the dead</em> or a <em>solemn chant (such as a dirge) for the repose of the dead</em>.  ' +
                "I believe that this is an appropriate honour for an amazing magazine that has had a great 28 year run." +
                '</p><br><br>',

            overview: "Overview",

            overviewText: "<p>Fine Cooking magazine was a unique and comprehensive source of cooking articles, techniques and recipes.  " +
                "The high quality content of this venture continues to be a source of information that still stands the test of time.  " +
                "Although the breadth of content is still available to those who have the paper magazine or are members of the " +
                "<a href='https://www.facebook.com/groups/finecookingcommunity'>Fine Cooking Facebook group</a> who have access to pdf versions of the content.</p>" +
                "<p>The challenge with static content is two fold: a) the breadth of content needs a search capability to filter " +
                "results to better find appropriate recipes and b) a “favourites” or “recipe box” to keep track of most used recipes.  " +
                "Both of these capabilities were available on the original Fine Cooking website.  Sadly, this has been shut down by the " +
                "new owner of Fine Cooking.</p>" +
                "<p>This project attempts to keep the Fine Cooking content alive and available to its existing audience and will " +
                "hopefully attract new followers.  This is accomplished by: </p>" +
                "<ul>" +
                "<li>Building a new website that, more or less, mimics the original Fine Cooking website;</li>" +
                "<li>Has search capability to allow anybody to search for recipes;</li>" +
                '<li>People can become “subscribers” for free to access personalized parts of the site such as “favourites” / "recipe box";' +
                "<li>Supports Content Managers who can enter and edit any content</li>" +
                "<li>Is able to send emails to subscribers to provide updates and news.</li>" +
                "</ul>",

            sections: "Key Site Sections",

            sectionsText: '<p>All of the key sections can be accessed through the top navagation bar.  ' +
                'This site is also responsive and displays properly for tablets and smartphones.</p>' +
                '<ul>' +
                '<li><a href="/articlesSearch">Articles</a> is the search area for the main articles from the magazines.  ' +
                'These also include any links to recipes.</li>' +
                '<li><a href="/recipesSearch">Recipes</a> is the search area for the receipes from the magazines.  ' +
                'These also include any back-links to articles if appropriate.  There is also a bookmark button that can be used ' +
                'to put the recipe into your own Recipe Box.</li>' +
                '<li><a href="/testKitchenSearch">Test Kitchen</a> is the search area for all the Test Kitchen items.  ' +
                'Filters are provided to narrow down the search for each category.</li>' +
                '<li><a href="/cookingNowSearch">Cooking Now</a> is the search area for all the Cooking Now items.  ' +
                'These are short items that can be read directly in the search area.</li>' +
                '<li><a href="/recipeBox">Recipe Box</a> is the area where you can collect your favourite recipes.  ' +
                'These can be moved to your own custom menus to create bundles of related recipes.</li>' +
                '<li>A subscriber action area is the usual widget in the navbar top right.  ' +
                'This widget allows you to a) subscribe; b) login / logout; c) change your profile information and ' +
                'd) change your password.  Since this is a not-for-profit / vanity site, no subscriber information is collected or stored.</li>' +
                '<li>The <a href="/magazinesSearch">Magazines</a> link is in the footer and is the area where you can see a full list of all the ' +
                'magazines.  This magazine list includes links to stored "pdf" files in various places.</li>' +
                '<li>The <a href="/newsSearch">News</a> link is in the footer and is the area where you can see a list of any news ' +
                'that we may send.</li>' +
                '</ul>'
        }
    },

    components: {
    }
};
