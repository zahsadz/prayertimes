
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

const shareemail = document.querySelector('#email');

shareemail.addEventListener('click', event => {
  if (navigator.share) { 
   navigator.share({
      title: 'مواقيت الصلاة',
	  text: 'مواقيت الصلاة',
      url: 'https://salah.netlify.app'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
    } else {
		
var pageUrl		= 'https://salah.netlify.app'; //Location of this page
var pageTitle	= document.title; //HTML page title

OpenShareUrl('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl) + '&amp;title=' + encodeURIComponent(pageTitle));

  //    console.log('error');


    }
});


