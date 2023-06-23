var searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  var searchTerm = document.getElementById("search_term").value;
  var excludedWords = document.getElementById("search_exclude_term").value;
  var maxPrice = document.getElementById("search_term_maxprice").value;

  var keywordString = searchTerm.replace(/ /g, "+");
  var blacklistKeywordString = excludedWords.replace(/ /g, "+");
  
  var newUrl = "https://www.ebay.com/sch/i.html?_nkw=" + keywordString + "&_ex_kw=" + blacklistKeywordString + "&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=" + toString(maxPrice)

  console.log("New Url: "+ newUrl);

  addItemToStorage(newUrl);
  
});

function addItemToStorage(item) {
  var Array = [];

  var storedArray = localStorage.getItem('Array');

  if (storedArray) {
    Array = JSON.parse(storedArray);
    Array.push(item);
    localStorage.setItem('Array', JSON.stringify(Array));
  }
  else{
    localStorage.setItem('Array',JSON.stringify([]))
  }

  var items = JSON.parse(localStorage.getItem('Array'));
  queryItems(items);
}

// actual check items function, below this function is the loop that runs it
function queryItems(items){
  for (var item of items) {
    var hrefArray = [];

    fetch(item)
    .then(response => response.text())
    .then(html => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var itemlink = doc.getElementsByClassName('s-item__link');

      console.log("ItemLink Length: " + itemlink.length);

      for (var i = 0; i < itemlink.length; i++) {
        var href = itemlink[i].getAttribute('href');
        hrefArray.push(href);
      }
    })
  }
}

// loop every minute
chrome.alarms.create("query", { delayInMinutes: 1, periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === "query") {
      var itemList = null

      chrome.storage.local.get(['items'], function(result) {
        if (result.items === undefined) {
          result.items = [];
        }
        console.log('List currently is ' + JSON.stringify(result.items));

        itemList = result.items

        queryItems(itemList)

      });
    }
});
