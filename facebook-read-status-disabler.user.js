// ==UserScript==
// @name          Facebook Read Status Disabler
// @description   Disable the "I read your message" confirmation
// @details       This script blocks every request to http(s)://www.facebook.com/ajax/mercury/change_read_status.php
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @updateURL     https://github.com/ldiqual/facebook-read-status-disabler/raw/master/facebook-read-status-disabler.user.js
// @version       1.0.1
// @license       GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author        Loïs Di Qual - http://lois.di-qual.net/
// ==/UserScript==

function main() {
  // Save the original XHR.open handler
  window.XMLHttpRequest.prototype.trueOpen = window.XMLHttpRequest.prototype.open;

  // Override XHR.open with a custom function
  window.XMLHttpRequest.prototype.open = function() {
    
    // If its a read-message status, block-it
    if (arguments.length >= 2
      && (arguments[0].toLowerCase() == "post")
      && typeof arguments[1] === "string"
      && arguments[1].indexOf("change_read_status", 0) != -1) {
      return null;
    }

    // If not, send the ajax call
    this.trueOpen.apply(this, arguments);
  };
}

// Call main() in the page scope
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild(script);