const searchButton = document.getElementById('searchButton');


searchButton.addEventListener('click', search);

function search() {
  const excludeTermInput = document.getElementById('search_exclude_term');
  const maxprice = document.getElementById('searc_term_maxprice');
  const searchTermInput = document.getElementById('search_term');

  const htmldata = fetch('https://www.ebay.com/sch/i.html?_nkw=iphone+13+pro&_ex_kw=case&LH_BIN=1&_sop=10&_dmd=1&_ipg=240');
  
  console.log("Button Clicked");
  console.log(excludeTermInput);
  console.log(maxprice);
  console.log(searchTermInput);

}
