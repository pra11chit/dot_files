// this content-script plays role of medium to publish/subscribe messages from webpage to the background script

var extensionID = chrome.runtime.id;

var prefix = 'com.tokbox.screenSharing.' + extensionID;

// this port connects with background script
var port = chrome.runtime.connect();
port.onDisconnect = function(e){
  console.log(e);
};
var response = function(method, payload) {
  var res = {payload: payload, from: 'extension'};
  res[prefix] = method;
  return res;
}

// if background script sent a message
port.onMessage.addListener(function(message) {
  if(message && message.method === 'permissionDenied') {
    window.postMessage(response('permissionDenied', message.payload), '*');
  } else if(message && message.method === 'sourceId') {
    window.postMessage(response('sourceId', message.payload), '*');
  } else if(message && message.method === 'numberTabs') {
    window.postMessage(response('numberTabs', message.payload), '*');
  } else if(message && message.method === 'createdTab') {
    window.postMessage(response('createdTab', message.payload), '*');
  } else if(message && message.method === 'updatedTab') {
    window.postMessage(response('updatedTab', message.payload), '*');
  } else if(message && message.method === 'removedTab') {
    window.postMessage(response('removedTab', message.payload), '*');
  } else if(message && message.method === 'tabs') {
    window.postMessage(response('tabs', message.payload), '*');
  } else if(message && message.method === 'version') {
    window.postMessage(response('version', message.payload), '*');
  }
});

// this event handler watches for messages sent from the webpage
// it receives those messages and forwards to background script
window.addEventListener('message', function (event) {

  if(event.source != window) {
    return;
  }

  if(!(event.data != null && typeof event.data === 'object' && event.data[prefix]
    && event.data.payload != null && typeof event.data.payload === 'object')) {
    return;
  }

  if(event.data.from !== 'jsapi') {
    return;
  }

  var method = event.data[prefix],
      payload = event.data.payload;

  if(!payload.requestId) {
    console.warn('Message to screen sharing extesnion does not have a requestId for replies.');
    return;
  }

  if(method === 'isExtensionInstalled') {
    return window.postMessage(response('extensionLoaded', payload), '*');
  }

  if(method === 'getSourceId') {
    return port.postMessage({method: 'getSourceId', payload: payload});
  }

  if(method === 'getNumberTabs') {
    return port.postMessage({method: 'getNumberTabs'});
  }

  if(method === 'refreshTab') {
    return port.postMessage({method: 'refreshTab', payload: payload});
  }

  if(method === 'openTab') {
    return port.postMessage({method: 'openTab', payload: payload});
  }

  if(method === 'closeTab') {
    return port.postMessage({method: 'closeTab', payload: payload});
  }

  if(method === 'getTabs') {
    return port.postMessage({method: 'getTabs'});
  }

  if(method === 'getVersion') {

    return port.postMessage({method: 'getVersion'});
  }
});

// inform browser that you're available!
window.postMessage(response('extensionLoaded'), '*');
