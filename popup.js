var searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  var searchTerm = document.getElementById("search_term").value;
  var excludedWords = document.getElementById("search_exclude_term").value;
  var maxPrice = document.getElementById("search_term_maxprice").value;

  let keywordString = searchTerm.replace(/ /g, "+");
  let blacklistKeywordString = excludeWords.replace(/ /g, "+");
  
  var newUrl = "https://www.ebay.com/sch/i.html?_nkw=" + keywordString + "&_ex_kw=" + blacklistKeywordString + "&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=" + toString(maxPrice)

  var url = "https://www.ebay.com/sch/i.html?_nkw=iphone+13+pro&_ex_kw=case&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=8"
  
  var htmldata = fetch(url)
  .then(response => response.text())
  .then(html => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var fullHTML = doc.documentElement.outerHTML;
    console.log(fullHTML);
  })
  .catch(error => {
    console.log('Error:', error);
  });

  console.log("Search Term: " + searchTerm);
  console.log("Excluded Words: " + excludedWords);
  console.log("Max Price: " + maxPrice);
  console.log(htmldata);

});

function addItemToStorage(item) { // add item to local storage. Items are {"keywords" : "string", "price" : 1.00}
  var itemList = null

  chrome.storage.local.get(['items'], function(result) {
    if (result.items === undefined) {
      // Set default value
      result.items = [];
    }
    console.log('List currently is ' + JSON.stringify(result.items));

    itemList = result.items
    itemList.push(item)

    chrome.storage.local.set({items: itemList}, function() {
      console.log('Items updated');
    });

  });

  
}