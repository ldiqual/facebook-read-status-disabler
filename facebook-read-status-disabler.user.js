// ==UserScript==
// @name          Facebook Read Status Disabler
// @description   Disable the "I read your message" confirmation
// @details       This script blocks every request to http(s)://www.facebook.com/ajax/mercury/change_read_status.php
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @version       1.0
// @license       GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author        Loïs Di Qual - http://lois.di-qual.net/
// ==/UserScript==

function main() {
  window.XMLHttpRequest.prototype.trueOpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function() {
    console.log(arguments);
    if (arguments.length >= 2 && (console.log("1") || true)
      && (arguments[0] == "POST" || arguments[0] == "post") && (console.log("2") || true)
      && typeof arguments[1] === "string" && (console.log("3") || true)
      && arguments[1].indexOf("change_read_status", 0) != -1 && (console.log("4") || true)) { 
      console.log("Blocked Status");
      return null;
    }
    this.trueOpen.apply(this, arguments);
  };
}

var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild(script);