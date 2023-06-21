chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "startTracking") {
      // Get the selected item details from the eBay page and send it back to the extension
      const itemDetails = {
        title: document.querySelector("#itemTitle").innerText.trim(),
        price: document.querySelector(".notranslate span[itemprop='price']").innerText.trim(),
        url: window.location.href,
      };
      chrome.runtime.sendMessage({ action: "itemDetails", data: itemDetails });
    }
  });