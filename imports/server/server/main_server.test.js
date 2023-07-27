console.log("in main server test");

//** control browser security policy
import {BrowserPolicy} from "meteor/browser-policy-common";
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowStyleOrigin('https://cdn.rawgit.com');
BrowserPolicy.content.allowStyleOrigin('https://cdn.jsdelivr.net/gh/mochajs'); // NEW: might as well be specific

/* main server files */
import './tests/server.test';
import './tests/collectionDefs.test';
import './tests/version.test';
import './tests/setupACL.test';
import './tests/specialACL.test';

/* server support functions */
import './Functions/tests/buildAllFields.test';
import './Functions/tests/getOSinfo.test';
import './Functions/tests/myDocuments.test';
import './Functions/tests/objectify.test';
import './Functions/tests/ownsDocument.test';
import './Functions/tests/verifyRole.test';