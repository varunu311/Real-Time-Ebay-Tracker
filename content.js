chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "startTracking") {
      const itemDetails = {
        title: document.querySelector("#itemTitle").innerText.trim(),
        price: document.querySelector(".notranslate span[itemprop='price']").innerText.trim(),
        url: window.location.href,
      };
      chrome.runtime.sendMessage({ action: "itemDetails", data: itemDetails });
    }
  });