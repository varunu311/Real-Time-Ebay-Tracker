document.addEventListener("DOMContentLoaded", function () {
    var trackButton = document.getElementById("trackButton");
    var itemTitle = document.getElementById("itemTitle");
    var itemPrice = document.getElementById("itemPrice");
    var itemUrl = document.getElementById("itemUrl");
  
    trackButton.addEventListener("click", function () {
      chrome.runtime.sendMessage({ action: "trackItem" });
    });
  
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === "itemDetails") {
        itemTitle.textContent = request.data.title;
        itemPrice.textContent = "Price: " + request.data.price;
        itemUrl.innerHTML = "<a href='" + request.data.url + "'>View on eBay</a>";
      }
    });
  });
  