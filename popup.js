
var searchButton = document.getElementById("searchButton");
var clearButton = document.getElementById("clearButton");
var refreshButton = document.getElementById("refreshButton");

function createStringForURL(str){ // have to do it this way so quotes are around each word
  strArr = str.split(" ");
  newStr = "";
  for (var word of strArr) {
    newStr = newStr + '"' + word + '"+';
  }
  newStr = newStr.substring(0, newStr.length - 1); // remove the last + sign
  return newStr;
}

searchButton.addEventListener("click", function() {
  var parentDiv = document.querySelector('.results');
  parentDiv.innerHTML = '';

  var searchTerm = document.getElementById("search_term").value;
  var excludedWords = document.getElementById("search_exclude_term").value;
  var maxPrice = document.getElementById("search_term_maxprice").value;

  var keywordString = createStringForURL(searchTerm);
  var blacklistKeywordString = excludedWords.replace(/ /g, "+");
  
  var newUrl = "https://www.ebay.com/sch/i.html?_nkw=" + keywordString + "&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=" + maxPrice.toString()
  if (blacklistKeywordString !== ""){
    newUrl = newUrl + "&_ex_kw=" + blacklistKeywordString;
  }

  console.log(newUrl);
  addLinkToStorage(newUrl);
  
});

clearButton.addEventListener("click", function(){
  localStorage.clear();
  var parentDiv = document.querySelector('.results');
  parentDiv.innerHTML = '';
});

refreshButton.addEventListener("click", function(){
  var parentDiv = document.querySelector('.results');
  parentDiv.innerHTML = '';
  refresh();

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
    localStorage.setItem('Array',JSON.stringify([]));
    storedArray = localStorage.getItem('Array');
    Array = JSON.parse(storedArray);
    Array.push(link);
    localStorage.setItem('Array',JSON.stringify(Array));

  }

  //var links = JSON.parse(localStorage.getItem('Array'));
  refresh();
 // queryItems(links);
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

function getBlacklistedWordsFromURL(url){
  if (!url.includes("&_ex_kw=")) { return []; }
  var start = "&_ex_kw=";
  var end = "&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=";
  
  return url.split(start)[1].split(end)[0].split("+");
}



function getKeywordStringFromURL(url){
  var start = "https://www.ebay.com/sch/i.html?_nkw=";
  var end = "&LH_BIN=1&_sop=10&_dmd=1&_ipg=240&rt=nc&_udhi=";
  
  return url.split(start)[1].split(end)[0].replace(/\+/g, " ");
}

function checkSubtitleAndTitle(itemSubtitle, itemName, excludedWords){

  if (itemSubtitle !== undefined){
    for (var i = 0; i < itemSubtitle.length; i++) {
      var subtitleText = itemSubtitle[i].textContent;
  
      for (var j = 0; j < excludedWords.length; j++) {
          if (subtitleText.includes(excludedWords[j])) {
              return false;
          }
      }
    }
  }
  
  if (excludedWords !== undefined){
    for (var i = 0; i < excludedWords.length; i++){
      if (itemName.includes(excludedWords[i])) { 
        return false; 
      }
    }
  }
  
  

  return true;
}


async function refresh(){
  var links = JSON.parse(localStorage.getItem('Array'));

  var parentDiv = document.querySelector('.results');
  parentDiv.innerHTML = '';


  for (var link of links) {
    var hrefArray = [];
    var parentElement = document.getElementById('results');
   
    const response = await fetch(link);
    const html = await response.text();

   
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var itemlink = doc.getElementsByClassName('s-item__link');
    var itemNameClass = doc.getElementsByClassName('s-item__title');

    var itemSubtitle = doc.getElementsByClassName('s-item__subtitle'); // sneaky stuff we don't want is in here sometimes

    var itemDiv = document.createElement('div');
    var header = document.createElement('h2')
    header.textContent = getKeywordStringFromURL(link);
    
    var itemNameArray = [];

    for (var i = 0; i < itemlink.length; i++) {
      itemName = itemNameClass[i].textContent;
      
      console.log(getBlacklistedWordsFromURL(link));

      if (checkSubtitleAndTitle(itemSubtitle[i], itemName, getBlacklistedWordsFromURL(link)) === true){
        var href = itemlink[i].getAttribute('href');
        console.log(href)
        hrefArray.push(href);
        itemNameArray.push(itemName);
      }
      

    }

    

    

    var paragraphElement = document.createElement('p');
    
  

    for(var i = 1; i < 11; i++){
      href = hrefArray[i];
      itemName = itemNameClass[i].textContent;
      
      var linkElement = document.createElement('a');
      
      linkElement.setAttribute('href', href);

      linkElement.textContent = itemName.replace(/New Listing/g, "");

      paragraphElement.appendChild(linkElement);
      //console.log("Item Name: " + itemName);
      //console.log("href: " + href);
    }
    itemDiv.appendChild(header);
    itemDiv.appendChild(paragraphElement);
    parentElement.appendChild(itemDiv);

  


  }
  console.log("Total Links Tracking: "+ (parseInt(links.length)));

}

setInterval(refresh, 60000);