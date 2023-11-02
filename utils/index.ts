import type { IRemoteData } from "~types";

function fetchLive(onSuccess, onError) {
  fetch("https://api.jsonbin.io/v3/b/64678cf09d312622a36121b8", {
    headers: {
      "X-Access-Key": "$2b$10$QhrtefF/jKDbKgauF5trL.SK6VAk69VSIcHMhGaEs8ZViK.xBh0Om"
    },
  }).then(r => {
    return r.json();
  }).then((r: IRemoteData) => {
    chrome.storage.local.set({cache: r, cacheTime: Date.now()}, function() {
      onSuccess(r.record.websites);
    });
  }).catch((e: Error) => {
    onError(e);
  });
}

export function fetchData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['cache', 'cacheTime'], function(items) {
      if (items.cache && items.cacheTime && items.cacheTime > Date.now() - 3600*1000) {
        resolve(items.cache.record.websites);
      } else {
        fetchLive(resolve, reject);
      }
    });
  })
}