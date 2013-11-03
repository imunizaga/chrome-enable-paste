/*global $: false */
/*global console: false */
/*global document: false */
/*global alert: false */
/*global window: false */
/*global navigator: false */

/*global chrome: false */

(function () {
    "use strict";

    var clickedEl = null, i, j, doc, tagName, type;

    function storeElement(event) {

        //right click
        console.log('clicked on ', event.target);

        if (event.button === 2) {
            tagName = event.target.tagName;
            if (tagName === "TEXTAREA" || tagName === "INPUT") {
                type = event.target.type;

                if (type === "radio" || type === "checkbox") {
                    return;
                }

                clickedEl = event.target;
                console.log('element stored ', event.target);
            }
        }
    }

    document.addEventListener("mousedown", storeElement, true);
    for (i = 0; i < window.frames.length; i += 1) {
        doc = window.frames[i].document;
        console.log("binding mousedown");
        console.log(doc);
        doc.addEventListener("mousedown", storeElement, true);

        for (j = 0; j < window.frames[i].frames.length; j += 1) {
            console.log("binding mousedown");
            console.log(window.frames[i].frames[j].document);
            window.frames[i].frames[j].document.addEventListener("mousedown", storeElement, true);
        }
    }

    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        if (request === "getClickedEl") {
            if (clickedEl.onpaste === "") {
                clickedEl.onkeypress = "";
            } else {
                clickedEl.onpaste = "";
            }
        }
    });
}());
