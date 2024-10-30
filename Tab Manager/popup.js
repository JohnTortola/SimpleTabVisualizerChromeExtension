


/* INITIALIZING VARIABLES */
var bodyElement = document.querySelector('body');
var textTab = document.createElement('p');
var domainList = [];
var domainCount = {};
var domainCountSorted = {};

chrome.tabs.query({}, function (tabs) {
  /* LOOP THROUGH ALL TABS CURRENTLY OPENED IN BROWSER AND COUNTING TOTAL NUMBER OF TABS*/
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    var url = new URL(tab.url);
    var domain = url.hostname;
    textTab.textContent = "Tabs: " + i
    domainList.push(domain.toString());
  }
  bodyElement.appendChild(textTab);
  
  /* CREATING AN OBJECT TO STORE INDIVIDUAL TAB NAMES AND THEIR COUNT */
  for (var i = 0; i < domainList.length; i++) {

    var domainAux = domainList[i];

    if (domainCount[domainAux]) {
      domainCount[domainAux]++;
    } else {
      domainCount[domainAux] = 1;
    }
  }

 /* REVERSE SORTING THE OBJECT BY COUNT (VALUE) */
  var sortedEntries = Object.entries(domainCount).sort(function(a, b) {
    return b[1] - a[1];
  });
  

  for (var i = 0; i < sortedEntries.length; i++) {
    var key = sortedEntries[i][0];
    var value = sortedEntries[i][1];
    domainCountSorted[key] = value;
  }

  /*APPEND TAB DOMAIN NAMES */
  for (var key in domainCountSorted){
    if(domainCountSorted.hasOwnProperty(key)){
      var domainText = document.createElement('p');
      var count = domainCountSorted[key];
      var text = key;

      text = text.replace("www.", "");
      text = text.replace("ww1.", "");
      text = text.replace("web.", "");
      text = text.replace("ww7.", "");
      text = text.replace("arq.", "");
      text = text.replace(".com", "");
      text = text.replace(".org", "");
      text = text.replace(".io", "");
      text = text.replace(".gg", "");

      domainText.textContent = "Domain: " + text + " Count: " + count;
      domainText.style.whiteSpace = 'nowrap';
      bodyElement.appendChild(domainText);
    }
  }

});
