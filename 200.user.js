// ==UserScript==
// @name         Always 200 OK - TLSContact
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Intercept responses and return 200 OK for TLSContact visa site
// @author       GAKEYS
// @match        https://visas-fr.tlscontact.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Function to intercept fetch requests and manipulate responses
    function interceptFetch() {
        // Store the original fetch function
        const originalFetch = window.fetch;

        // Override the global fetch function
        window.fetch = async (...args) => {
            // Perform the original fetch call
            const response = await originalFetch(...args);

            // Check if the status code is 429 and manipulate it to 200 OK
            if (response.status === 429) {
                // Create a new response with a 200 OK status
                const okResponse = new Response(response.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: response.headers
                });

                // Return the manipulated response
                return okResponse;
            }

            // Return the original response for other status codes
            return response;
        };
    }

    // Inject the interceptFetch function into the page
    const script = document.createElement('script');
    script.textContent = '(' + interceptFetch.toString() + ')()';
    document.documentElement.appendChild(script);
    script.remove();
})();
