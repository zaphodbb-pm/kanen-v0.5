/**
 * Install prompts for various devices.
 *
 * @function athPrompts
 * @memberOf Footer
 * @locus Client
 *
 * @property {Object} athPrompts
 *
 */


export const athPrompts = {
    

        "edge": {
            imgs: [ {
                src: "/pwa/edge-a2hs-icon.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "chromium": {
            imgs: [ {
                src: "/pwa/chromium-guidance.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "iphone": {
            imgs: [
                {
                    src: "/pwa/safari-iphone-ath1.png",
                    alt: "Step 1: Tap the Share icon."
                },

                {
                    src: "/pwa/safari-iphone-ath2.png",
                    alt: "Step 2: Scroll to and tap the Add To Home Screen button."
                },

                {
                    src: "/pwa/safari-iphone-ath3.png",
                    alt: "Step 3: Tap the Add button."
                }
            ]

        },
        "ipad": {
            imgs: [
                {
                    src: "/pwa/safari-ipad-ath1.png",
                    alt: "Step 1: Tap the Share icon and then select Add to Homescreen button."
                },

                {
                    src: "/pwa/safari-ipad-ath2.png",
                    alt: "Step 2: Tap the Add button to complete install."
                }
            ]
        },
        "firefox": {
            imgs: [ {
                src: "/pwa/firefox-a2hs-icon.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "samsung": {
            imgs: [ {
                src: "/pwa/samsung-internet-a2hs-icon.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "opera": {
            imgs: [ {
                src: "/pwa/opera-add-to-homescreen.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        }
}