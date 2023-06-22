var searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  var searchTerm = document.getElementById("search_term").value;
  var excludedWords = document.getElementById("search_exclude_term").value;
  var maxPrice = document.getElementById("search_term_maxprice").value;

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
