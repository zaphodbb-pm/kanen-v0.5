console.log("in main client test");

/* adjust css for Mocha report */
window.addEventListener("DOMContentLoaded", function(){
    const report = document.getElementById("mocha-report");
    report.style.columns = "auto 25rem";
});



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

/* test client side file handler functions */
import '../Functions/fileHandlers/tests/fileName.test';

/* test client side formatter functions */
import '../Functions/formatters/tests/formatNumber.test';
import '../Functions/formatters/tests/formatPhoneNumber.test';
import '../Functions/formatters/tests/fractionalNumber.test';
import '../Functions/formatters/tests/numString.test';
import '../Functions/formatters/tests/parseJSONString.test';
import '../Functions/formatters/tests/timeAgo.test';
import '../Functions/formatters/tests/toDecimals.test';
import '../Functions/formatters/tests/validate.test';
import '../Functions/formatters/tests/validateEmail.test';
import '../Functions/formatters/tests/validatePhone.test';

/* test client side utility functions */
import '../Functions/utilities/tests/debugConsole.test';
import '../Functions/utilities/tests/deepClone.test';
import '../Functions/utilities/tests/dotNotation.test';
import '../Functions/utilities/tests/generateId.test';
import '../Functions/utilities/tests/groupBy.test';
import '../Functions/utilities/tests/i18n.test';
import '../Functions/utilities/tests/sortBy.test';

/* component associated function tests */
import '../Components/general/tests/msgDecorationFunction.test';

/* component widget tests */
import '../Components/widgets/tests/accordion.test';
import '../Components/widgets/tests/charts.test';
import '../Components/widgets/tests/croppie.test';
import '../Components/widgets/tests/gauge.test';
import '../Components/widgets/tests/infobox.test';
import '../Components/widgets/tests/reportbox.test';
import '../Components/widgets/tests/tabbedContent.test';

/* component block tests */
import '../Components/blocks/tests/card.test';

/* component formBuilder - fields tests */

/*
import '../Components/formBuilder/fields/tests/itemList.test';
import '../Components/formBuilder/fields/tests/rows.test';
import '../Components/formBuilder/fields/tests/selects.test';

import '../Components/formBuilder/fields/tests/typeahead.test';
import '../Components/formBuilder/fields/tests/editor.test';
 */

import '../Components/formBuilder/fields/tests/geoAddress.test';

/*
import '../Components/formBuilder/fields/tests/apiKey.test';
import '../Components/formBuilder/fields/tests/checkboxes.test';
import '../Components/formBuilder/fields/tests/colourPicker.test';
import '../Components/formBuilder/fields/tests/datePicker.test';
import '../Components/formBuilder/fields/tests/fileBrowse.test';
import '../Components/formBuilder/fields/tests/hr.test';
import '../Components/formBuilder/fields/tests/inputs.test';
import '../Components/formBuilder/fields/tests/inputs-password.test';

import '../Components/formBuilder/fields/tests/radios.test';

import '../Components/formBuilder/fields/tests/switch.test';
import '../Components/formBuilder/fields/tests/textarea.test';
import '../Components/formBuilder/fields/tests/timePicker.test';

 */