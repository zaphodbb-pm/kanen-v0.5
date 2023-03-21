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

/* component block tests */
import '../Components/blocks/tests/card.test';
import '../Components/blocks/tests/modalUser.test';

/* component element tests */
import '../Components/elements/tests/notifications.test';
import '../Components/elements/tests/userProfile.test';

/* component general tests */
import '../Components/general/tests/msgDecorationFunction.test';
import '../Components/general/tests/messages.test';
import '../Components/general/tests/gdprNotice.test';

/* component widget tests */

/*
import '../Components/widgets/tests/accordion.test';
import '../Components/widgets/tests/charts.test';
import '../Components/widgets/tests/croppie.test';
import '../Components/widgets/tests/gauge.test';
import '../Components/widgets/tests/infobox.test';
import '../Components/widgets/tests/reportbox.test';
import '../Components/widgets/tests/tabbedContent.test';

 */


/* family formBuilder */
/** component formBuilder - fields tests **/
/*
import '../Components/formBuilder/fields/tests/apiKey.test';
import '../Components/formBuilder/fields/tests/checkboxes.test';
import '../Components/formBuilder/fields/tests/colourPicker.test';
import '../Components/formBuilder/fields/tests/datePicker.test';
import '../Components/formBuilder/fields/tests/editor.test';
import '../Components/formBuilder/fields/tests/fileBrowse.test';
import '../Components/formBuilder/fields/tests/geoAddress.test';
import '../Components/formBuilder/fields/tests/hr.test';
import '../Components/formBuilder/fields/tests/inputs.test';
import '../Components/formBuilder/fields/tests/inputs-password.test';
import '../Components/formBuilder/fields/tests/itemList.test';
import '../Components/formBuilder/fields/tests/radios.test';
import '../Components/formBuilder/fields/tests/rows.test';
import '../Components/formBuilder/fields/tests/selects.test';
import '../Components/formBuilder/fields/tests/switch.test';
import '../Components/formBuilder/fields/tests/textarea.test';
import '../Components/formBuilder/fields/tests/timePicker.test';
import '../Components/formBuilder/fields/tests/typeahead.test';

 */

/** component formBuilder - functions tests **/
/*
import '../Components/formBuilder/tests/orgFields.test';
import '../Components/formBuilder/tests/submitForm.test';

 */

/** component formBuilder - parent component tests **/
/*
import '../Components/formBuilder/tests/fieldWrapper.test';
import '../Components/formBuilder/tests/formSubmit.test';
import '../Components/formBuilder/tests/formTabFields.test';
import '../Components/formBuilder/tests/formHolder.test';

 */




/* family ListCollections */
/** component listCollections > filterPlugins - functions tests **/
/*
import '../Components/listCollections/filterPlugins/tests/buildDate.test';
import '../Components/listCollections/filterPlugins/tests/buildRelativeDate.test';
import '../Components/listCollections/filterPlugins/tests/calcGeoRadius.test';

 */

/** component listCollections > filterPlugins - component tests **/
/*
import '../Components/listCollections/filterPlugins/tests/dateFilter.test';
import '../Components/listCollections/filterPlugins/tests/dateRelativeFilter.test';
import '../Components/listCollections/filterPlugins/tests/geoFilter.test';
import '../Components/listCollections/filterPlugins/tests/selectFilter.test';

 */


/** component listCollections - functions tests **/
/*
import '../Components/listCollections/tests/buildFilter.test';
import '../Components/listCollections/tests/buildQuery.test';

 */

import '../Components/listCollections/tests/transformDocInfo.test';

/** component listCollections - component tests **/

/*
import '../Components/listCollections/tests/docCount.test';
import '../Components/listCollections/tests/listFilters.test';
 */

import '../Components/listCollections/tests/listTable.test';
/*

import '../Components/listCollections/tests/pagination.test';
import '../Components/listCollections/tests/rowSize.test';
import '../Components/listCollections/tests/searchbox.test';
 */



