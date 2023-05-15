console.log("in main server app-test");

//** control browser security policy
import {BrowserPolicy} from "meteor/browser-policy-common";
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowStyleOrigin('https://cdn.rawgit.com');
BrowserPolicy.content.allowStyleOrigin('https://cdn.jsdelivr.net/gh/mochajs'); // NEW: might as well be specific

import './tests/server.test';

