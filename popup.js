refresh();

var searchButton = document.getElementById("searchButton");
var clearButton = document.getElementById("clearButton");
var refreshButton = document.getElementById("refreshButton");

searchButton.addEventListener("click", function() {
    var parentDiv = document.querySelector('.results');
    parentDiv.innerHTML = '';

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
        var parentElement = document.getElementById('results');
        var itemDiv = document.createElement('div');

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

                var paragraphElement = document.createElement('p');

                for(var i = 0; i < 10; i++){
                    href = hrefArray[i];
                    itemName = itemNameClass[i].textContent;

                    var linkElement = document.createElement('a');

                    linkElement.setAttribute('href', href);
                    linkElement.textContent = itemName;

                    paragraphElement.appendChild(linkElement);
                    //console.log("Item Name: " + itemName);
                    //console.log("href: " + href);
                }

                itemDiv.appendChild(paragraphElement);

            })
            .catch(error => {});

        parentElement.appendChild(itemDiv);

    }
    console.log("Total Links Tracking: "+ (parseInt(links.length)));

}

function refresh(){
    var links = JSON.parse(localStorage.getItem('Array'));

    var parentDiv = document.querySelector('.results');
    parentDiv.innerHTML = '';

    for (var link of links) {
        var hrefArray = [];
        var parentElement = document.getElementById('results');
        var itemDiv = document.createElement('div');

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

                var paragraphElement = document.createElement('p');

                for(var i = 0; i < 10; i++){
                    href = hrefArray[i];
                    itemName = itemNameClass[i].textContent;

                    var linkElement = document.createElement('a');

                    linkElement.setAttribute('href', href);
                    linkElement.textContent = itemName;

                    paragraphElement.appendChild(linkElement);
                    //console.log("Item Name: " + itemName);
                    //console.log("href: " + href);
                }

                itemDiv.appendChild(paragraphElement);

            })
            .catch(error => {});

        parentElement.appendChild(itemDiv);

    }

    console.log("Total Links Tracking: "+ (parseInt(links.length)));
}

setInterval(refresh, 60000);
