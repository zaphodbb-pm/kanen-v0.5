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
    "native": {
        action: {
            "ok": "Install",
            "cancel": "Not Now"
        }
    },
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
                alt: "Tap the Share Icon"
            },

            {
                src: "/pwa/safari-iphone-ath2.png",
                alt: "Tap the Share Icon"
            }
        ]

        /*
        imgs: [
            {
                src: "/pwa/ios-safari-share-button-highlight.jpg",
                alt: "Tap the Share Icon"
            },
            {
                src: "/pwa/iphone-a2hs-swipe-to-right.jpg",
                classes: [ "animated", "fadeIn", "overlay-1",
                    "delay-2s"
                ],
                alt: "Swipe to the right"
            },
            {
                src: "/pwa/iphone-a2hs-icon-highlight.jpg",
                classes: [ "animated", "fadeIn", "overlay-2",
                    "delay-4s"
                ],
                alt: "Tap the Add to Homescreen Icon"
            }
        ]
         */
    },
    "ipad": {
        imgs: [
            {
            src: "/pwa/safari-ipad-ath1.png",
            alt: "Tap the Add to Homescreen Icon"
            },

            {
                src: "/pwa/safari-ipad-ath2.png",
                alt: "Tap the Add to complete install"
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
