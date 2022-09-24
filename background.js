

/**
 * Copyright (c) 2012 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 **/


/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */


 const getObjectFromStorage = async function(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function(value) {
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

const saveObjectInStorage = async function(obj) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set(obj, function() {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};


logging = true;


async function go(){
  if(logging) console.log('backgroundd go');
  backgroundd_url = await getObjectFromStorage('backgroundd_url');
  backgroundd_cycle = await getObjectFromStorage('backgroundd_cycle');
  backgroundd_lastset = await getObjectFromStorage('backgroundd_lastset');
  if(backgroundd_url === undefined) backgroundd_url = "https://spotwall.azurewebsites.net/";
  if(backgroundd_cycle === undefined) backgroundd_cycle = "60";
  if(backgroundd_lastset === undefined) backgroundd_lastset = "0";

  var now = Date.now();

  if(logging) console.log('backgroundd_url: ' + backgroundd_url);
  if(logging) console.log('backgroundd_cycle: ' + backgroundd_cycle);  
  if(logging) console.log('backgroundd_lastset: ' + backgroundd_lastset);
  if(logging) console.log('date.Now: ' + now);
  if(logging) console.log('now - backgroundd_lastset: ' + (now - backgroundd_lastset));
  if(logging) console.log('cycle µs: ' + (60000 * parseInt(backgroundd_cycle)));
  
  if(now - backgroundd_lastset > 60000 * parseInt(backgroundd_cycle)){

    chrome.wallpaper.setWallpaper(
      {
        'url': backgroundd_url,
        'layout': 'CENTER_CROPPED',
        'filename': 'backgroundd'
      },
      function() {
        if(chrome.runtime.lastError) {
          // Something went wrong
          console.warn("Whoops.. " + chrome.runtime.lastError.message);
        } else {
          if(logging) console.log('backgroundd background set');
          chrome.storage.sync.set({'backgroundd_lastset': Date.now()});
        }
      }
    );

  }
  if(logging) console.log('raising alarm for 5 minutes');
  chrome.alarms.create({ delayInMinutes: 5 });

}

chrome.alarms.onAlarm.addListener(() => {
  if(logging) console.log('back from delay');
  go();
});


chrome.runtime.onInstalled.addListener((i) => {
  if (i.reason == 'install') {
    if(logging) console.log('backgroundd started (onInstalled)');
    go();
    if(logging) console.log('backgroundd came back (onInstalled)');
  }
});


if(logging) console.log('backgroundd started (on main flow)');
go();
if(logging) console.log('backgroundd came back (on main flow)');
