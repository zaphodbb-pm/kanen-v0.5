/**
 * Labels for bottom footer.
 *
 * @function Footer_text
 * @memberOf App
 * @locus Client
 *
 * @returns {Object}
 */

export const footer = {
        en: {
                title:  "Footer Title",
                notice: "notice text",
                copyright: " by ",
                company: "Your Company Here Inc."
        }
};

export const gdpr = {
        en: {
                elementId: "gdprAsk",

                title: "Cookies & Privacy Policy",

                msg: "This website stores cookies on your computer. These cookies are used to collect information about " +
                    "how you interact with our website and allow us to remember you. We use this information in order to improve and " +
                    "customize your browsing experience.  " +
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
