
if ("serviceWorker" in navigator) {
	
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./sw.js")
	  .then(() => { console.log('service worker registered'); })
      .catch( err => { console.log("Error while using Web share API:"); console.log(err); })
	  })
  }

function niceBytes(x){
 const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(x, 10) || 0;
  while(n >= 1024 && ++l){
      n = n/1024;
  }
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

if ('storage' in navigator && 'estimate' in navigator.storage) { 
    navigator.storage.estimate() 
        .then(function(estimate){ 
  console.log(`Using ${estimate.usage} out of ${estimate.quota} bytes.`); 
  console.log(`Using ${niceBytes(estimate.usage)} out of ${niceBytes(estimate.quota)}.`); 
        }); 
}
