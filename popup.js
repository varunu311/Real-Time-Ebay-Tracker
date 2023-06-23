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

  // Check if storage array exists in local storage
  var storedArray = localStorage.getItem('Array');
  if (storedArray) {
    // Parse the stored array if it exists
    Array = JSON.parse(storedArray);
    
    // Append the item to the cloud storage array
    Array.push(item);

    // Store the updated array in local storage
    localStorage.setItem('Array', JSON.stringify(Array));
  }
  else{
    localStorage.setItem('Array',JSON.stringify([]))
  }

  console.log(localStorage.getItem('Array'));
}

// actual check items function, below this function is the loop that runs it

function queryItems(items){
  items.forEach(function(item, index, arr){ // loop through each item
    // TODO perform query here
  })
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
