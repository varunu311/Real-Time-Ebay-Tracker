var searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  var searchTerm = document.getElementById("search_term").value;
  var excludedWords = document.getElementById("search_exclude_term").value;
  var maxPrice = document.getElementById("search_term_maxprice").value;

  var keywordString = searchTerm.replace(/ /g, "+");
  var blacklistKeywordString = excludedWords.replace(/ /g, "+");
  
  var newUrl = "https://www.ebay.com/sch/i.html?_nkw=" + keywordString + "&_ex_kw=" + blacklistKeywordString + "&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=" + toString(maxPrice)

  
  var hrefArray = [];
  var priceArray = [];

  var htmldata = fetch(newUrl)
  .then(response => response.text())
  .then(html => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');

    var itemlink = doc.getElementsByClassName('s-item__link');
    var itemprice = doc.getElementsByClassName('s-item__price');

    console.log("ItemLink Length: " + itemlink.length);
    console.log("ItemPrice Length: " + itemprice.length);

    for (var i = 0; i < itemlink.length; i++) {
      var href = itemlink[i].getAttribute('href');
      hrefArray.push(href);
    }

    for (var i = 0; i < itemprice.length; i++) {
      var value = itemprice[i].textContent;
      priceArray.push(value);
    }

    console.log(hrefArray);
    console.log(priceArray);

  })
  .catch(error => {
    console.log('Error:', error);
  });


  var resultsDiv = document.getElementById("results");
  var newItem = document.createElement("p");
  newItem.textContent = newUrl;
  resultsDiv.appendChild(newItem);

  console.log("New Url: "+ newUrl);
  
  

});

function addItemToStorage(item) { 
  var itemList = null

  chrome.storage.local.get(['items'], function(result) {
    if (result.items === undefined) {
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