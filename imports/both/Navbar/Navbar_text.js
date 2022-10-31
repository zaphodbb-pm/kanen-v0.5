/**
 * Labels for Navbar items.
 *
 * @memberOf Navbar
 * @function Navbar_text
 * @locus Client
 *
 * @exports {Object} - navbar text language encoded
 * @exports {Object} - gdpr text language encoded
 * @exports {Object} - pwa text language encoded
 *
 */



export const navbar = {
    en: {
        userProfile: {
            toProfile: "Profile",
            signIn: "Sign In",
            logOut: "Log Out",
            changePassword: "Change Password",
            title: "user image"
        },

        userCredit: {
            credits: "Credits"

        },

        notifications: {
            read: "Dismiss"
        }
    }
};

export const gdpr = {
    en: {
        elementId: "gdprAsk",

        title: "Cookies & Privacy Policy",

        msg: "This website stores cookies on your computer. These cookies are used to collect information about " +
            "how you interact with our website and allow us to remember you. We use this information in order to improve and " +
            "customize your browsing experience.  " +
            "If you decline, your information won’t be tracked when you visit this website.  " +
            'Learn more about how to <a href="https://cookiesandyou.com/" target="_blank" rel="noopener">manage</a> your cookies.',

        btnAccept: "Accept",

        btnDecline: "Decline",

        debug: true
    }
}

export const pwa = {
    en: {
        title: "Install this application to your home screen?",

        install: "Install",

        notNow: "Not Now",

        instructions: "Follow the guide below:"
    }
}
