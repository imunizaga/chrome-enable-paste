/*global $: false */
/*global console: false */
/*global document: false */
/*global alert: false */
/*global window: false */
/*global navigator: false */

/*global chrome: false */

(function () {
    "use strict";

    // The onClicked callback function.
    function onClickHandler(info, tab) {
        chrome.tabs.sendRequest(tab.id, "getClickedEl", function (clickedEl) {
        });
    }

    chrome.contextMenus.onClicked.addListener(onClickHandler);

    // Set up context menu tree at install time.
    chrome.runtime.onInstalled.addListener(function () {
        var context = "editable", title, id;
        title = "Enable Paste";
        id = chrome.contextMenus.create({
            "title": title,
            "contexts": [context],
            "id": "context" + context
        });
        console.log("'" + context + "' item:" + id);
    });
}());
