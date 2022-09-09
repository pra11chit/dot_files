// this background script is used to invoke desktopCapture API
// to capture screen-MediaStream.

var session = ['screen'];

chrome.runtime.onConnect.addListener(function (port) {

  port.onMessage.addListener(function(message) {
    if(message && message.method == 'getSourceId') {
      getSourceID(message.payload.requestId);
    }
    if(message && message.method == 'getNumberTabs') {
      getNumberTabs();
    }
    if(message && message.method == 'getVersion') {
      getVersion();
    }
    if(message && message.method == 'getTabs') {
      getTabs();
    }
    if(message && message.method == 'openTab') {
      openTab(message.payload);
    }
    if(message && message.method == 'refreshTab') {
      refreshTab(message.payload);
    }
    if(message && message.method == 'closeTab') {
      closeTab(message.payload);
    }
  });

  function getSourceID(requestId) {
    chrome.tabs.update(port.sender.tab.id, {highlighted: true});
    chrome.desktopCapture.chooseDesktopMedia(session, port.sender.tab, function(sourceId) {

      // "sourceId" will be empty if permission is denied
      if(!sourceId || !sourceId.length) {
        return port.postMessage({method: 'permissionDenied', payload: {requestId: requestId}});//add version also here?
      }

      // "ok" button is clicked; share "sourceId" with the
      // content-script which will forward it to the webpage
      port.postMessage({method: 'sourceId', payload: {requestId: requestId, sourceId: sourceId}});
    });
  }

  function getNumberTabs() {
    chrome.tabs.query({}, function(tabs) {
      port.postMessage({method: 'numberTabs', payload: {numberTabs: tabs.length}});
    });

  }

  function getTabs() {
    chrome.tabs.query({}, function(tabs) {
      port.postMessage({method: 'tabs', payload: {tabs: tabs}});
    });
  }

  function getVersion() {
    port.postMessage({method: 'version', payload: {version: "1.5.2"}});
  }

  function openTab(payload) {
    chrome.tabs.create({url: payload.url});// {url: "http..."}
  }

  function refreshTab(payload) {
    chrome.tabs.refresh(payload.tab_id, {bypassCache: false});
  }

  function closeTab(payload) {
    chrome.tabs.remove(payload.tab_id);
  }

  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    port.postMessage({method: 'removedTab', payload: {tabId: tabId}});
  });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete') {
      port.postMessage({method: 'updatedTab', payload: {tabId: tabId, tab: tab, tabUrl: changeInfo.url}});
    }
  });

  chrome.tabs.onCreated.addListener(function(tab) {
    port.postMessage({method: 'createdTab', payload: {tabId: tab.id, tab: tab}});
  });

});

chrome.runtime.onInstalled.addListener(function(details) {
  if(details.reason == "install") {
    chrome.tabs.executeScript(null, {file: "content-script.js"});
  }
});
