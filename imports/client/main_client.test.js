console.log("in main client test");

/* check for common file existence */
import '../both/tests/client.test';
import '../both/tests/version.test';
import '../both/tests/systemGlobals.test';
import '../both/tests/systemStores.test';
import '../both/tests/text_common.test';
import '../both/tests/text_search.test';
import '../both/tests/routes.test';

/* test client side application functions */
import '../Functions/application/tests/buildAllFields.test';
import '../Functions/application/tests/buildNavLinks.test';
import '../Functions/application/tests/getLang.test';

/* test client side formatter functions */
import '../Functions/formatters/tests/formatNumber.test';
import '../Functions/formatters/tests/formatPhoneNumber.test';
import '../Functions/formatters/tests/fractionalNumber.test';
import '../Functions/formatters/tests/numString.test';
import '../Functions/formatters/tests/parseJSONString.test';
import '../Functions/formatters/tests/timeAgo.test';
import '../Functions/formatters/tests/toDecimals.test';


/* component tests */
import '../Components/tests/accordion.test';
import '../Components/tests/charts.test';
import '../Components/tests/croppie.test';
import '../Components/tests/gauge.test';
import '../Components/tests/infobox.test';
import '../Components/tests/reportbox.test';
import '../Components/tests/tabbedContent.test';
