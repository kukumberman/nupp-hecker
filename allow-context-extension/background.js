function requestHandler(details) {
  if (details.url.endsWith("quiz/module.js")) {
    console.log("redirected")
    return {
      redirectUrl: "https://raw.githubusercontent.com/kukumberman/nupp-hecker/main/proxy/module.js"
    }
  }
  
  return {
    cancel: false
  }
}

chrome.webRequest.onBeforeRequest.addListener(requestHandler, {
  urls: [
    "https://dist.nupp.edu.ua/lib/javascript.php/*"
  ],
  types: [
    "script",
  ]
}, ["blocking"])
