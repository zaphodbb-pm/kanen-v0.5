/**
 * Builds a div to mount a Svelte componet to enable testing
 *
 * @function buildComponentTestArea
 * @locus Client
 *
 * @param {string} component - component name fragment
 * @param {Object} doc - window document object
 *
 * @returns {String} - id name for test area
 *
 */


export function buildComponentTestArea(component, doc){
    const testName = `svelte_component_test-${component}`;

    const testArea = doc.createElement('div');
    testArea.setAttribute("id", testName);
    testArea.style.position = "absolute";
    testArea.style.top = "0";
    testArea.style.left = "2000px";

    doc.body.appendChild(testArea);

    return testName;
}