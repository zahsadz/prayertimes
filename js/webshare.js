
function OpenShareUrl(openLink){
//Parameters for the Popup window
winWidth    = 650; 
winHeight   = 450;
winLeft     = ($(window).width()  - winWidth)  / 2,
winTop      = ($(window).height() - winHeight) / 2,
winOptions   = 'width='  + winWidth  + ',height=' + winHeight + ',top='    + winTop    + ',left='   + winLeft;
window.open(openLink,'Share This Link',winOptions); //open Popup window to share website.
return false;
}

 document.querySelector('#shareBtn').addEventListener('click', event => {
 
            // Fallback, Tries to use API only
            // if navigator.share function is
            // available
            if (navigator.share) {
                navigator.share({
 
                    // Title that occurs over
                    // web share dialog
                    title: 'مواقيت الصلاة لجميع الدول',
 
                    // URL to share
                    url: 'https://salah.netlify.app'
                }).then(() => {
                    console.log('Thanks for sharing!');
                }).catch(err => {
 
                    // Handle errors, if occurred
                    console.log("Error while using Web share API:");
                    console.log(err);
                });
            } else {
 
        // if API not available
        console.log("Browser doesn't support this API !");
	var pageTitle	= document.title; //HTML page title
   // var currentUrl = document.URL;
    var currentUrl = 'https://salah.netlify.app';
OpenShareUrl('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentUrl) + '&amp;title=' + encodeURIComponent(pageTitle));
         }
		 
        })
		


 var tooltipTriggerList = [].slice.call(document.querySelectorAll('.tooltip-s'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
	
