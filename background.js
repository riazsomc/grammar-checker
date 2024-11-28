chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "get-token") {
      sendResponse({ token: "your_secure_token_123" });
  }
});
