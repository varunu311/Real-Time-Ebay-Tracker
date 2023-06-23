var searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  var searchTerm = document.getElementById("search_term").value;
  var excludedWords = document.getElementById("search_exclude_term").value;
  var maxPrice = document.getElementById("search_term_maxprice").value;

  var keywordString = searchTerm.replace(/ /g, "+");
  var blacklistKeywordString = excludedWords.replace(/ /g, "+");
  
  var newUrl = "https://www.ebay.com/sch/i.html?_nkw=" + keywordString + "&_ex_kw=" + blacklistKeywordString + "&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=" + toString(maxPrice)

  addLinkToStorage(newUrl);
  
});

function addLinkToStorage(link) {
  var Array = [];
  var storedArray = localStorage.getItem('Array');

  if (storedArray) {
    Array = JSON.parse(storedArray);
    Array.push(link);
    localStorage.setItem('Array', JSON.stringify(Array));
  }
  else{
    localStorage.setItem('Array',JSON.stringify([]))
  }

  var links = JSON.parse(localStorage.getItem('Array'));

  queryItems(links);
}


function removeLinkFromStorage(index) { // we get the index from the data of which button they clicked on
  var Array = [];

  var storedArray = localStorage.getItem('items');
  if (storedArray) {
    Array = JSON.parse(storedArray);
  }
  if (index >= 0 && index < Array.length){
    Array.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(Array));
  }
  
}

function queryItems(links){

  for (var link of links) {
  
  var hrefArray = [];
  
  fetch(link)
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

    console.log(hrefArray);
  })
  .catch(error => {
    console.log('Error:', error);
  });
}
}