var searchButton = document.getElementById("searchButton");
var clearButton = document.getElementById("clearButton");

searchButton.addEventListener("click", function() {
  var searchTerm = document.getElementById("search_term").value;
  var excludedWords = document.getElementById("search_exclude_term").value;
  var maxPrice = document.getElementById("search_term_maxprice").value;

  var keywordString = searchTerm.replace(/ /g, "+");
  var blacklistKeywordString = excludedWords.replace(/ /g, "+");
  
  var newUrl = "https://www.ebay.com/sch/i.html?_nkw=" + keywordString + "&_ex_kw=" + blacklistKeywordString + "&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=" + toString(maxPrice)

  addLinkToStorage(newUrl);
  
});

clearButton.addEventListener("click", function(){
  localStorage.clear();
  var parentDiv = document.querySelector('.results');
  parentDiv.innerHTML = '';
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


function removeLinkFromStorage(index) {

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
    var itemNameClass = doc.getElementsByClassName('s-item__title');

    var itemNameArray = [];
  
    for (var i = 0; i < itemlink.length; i++) {
      itemName = itemNameClass[i].textContent;
      var href = itemlink[i].getAttribute('href');
      hrefArray.push(href);
      itemNameArray.push(itemName);
    }

    for(var i = 0; i < 10; i++){
      href = hrefArray[i];
      itemName = itemNameClass[i].textContent;

      var parentElement = document.getElementById('results');
      var paragraphElement = document.createElement('p');
      var linkElement = document.createElement('a');
      
      linkElement.setAttribute('href', href);
      linkElement.textContent = itemName;

      paragraphElement.appendChild(linkElement);
      parentElement.appendChild(paragraphElement);

      console.log("Item Name: " + itemName);
      console.log("href: " + href);
    }

  })
  .catch(error => {});
}

console.log("Total Links Tracking: "+ (parseInt(links.length) + parseInt(1)));

}

function refresh(){
  var links = JSON.parse(localStorage.getItem('Array'));

  for (var link of links) {
    var hrefArray = [];
    
    fetch(link)
    .then(response => response.text())
    .then(html => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var itemlink = doc.getElementsByClassName('s-item__link');
      
      for (var i = 0; i < itemlink.length; i++) {
        var href = itemlink[i].getAttribute('href');
        hrefArray.push(href);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

  }
  console.log("Total Links Tracking: "+ (parseInt(links.length) + parseInt(1)));

  console.log("Refreshed");
}

setInterval(refresh, 10000);