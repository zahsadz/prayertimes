
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


  $("#shareprayer").on('click', function(){  

   var regionName = localStorage.getItem('regionName');
   var prayertable = document.getElementById('prayertable').innerHTML;
 

   if (navigator.share) { 
     navigator.share({
      title: 'مواقيت الصلاة '+regionName+'',
	//  text: ''+csv.join("\n")+'',
	  text: ''+prayertable+'',
     // url: 'https://salah.netlify.app'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
    } else {
		
      console.log('error');
	  
var pageUrl		= 'https://salah.netlify.app'; //Location of this page
var pageTitle	= document.title; //HTML page title

OpenShareUrl('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl) + '&amp;title=' + encodeURIComponent(pageTitle));
 
    }   
	
   });

  $("#copieshare").on('click', function(){  
  
   /* var csv = [];
    var rows = document.querySelectorAll("table tr");
   //merge the whole data in tabular form 
   for(var i=0; i<rows.length; i++) {
	var row = [], cols = rows[i].querySelectorAll("td, th");
	for( var j=0; j<cols.length; j++)
	row.push(cols[j].innerText);
	csv.push(row.join(","));
   } 
   
   ClipboardJS.copy(csv.join("\n"));
   */
   var regionName = localStorage.getItem('regionName');
   var prayertable = document.getElementById('prayertable').innerHTML;

  //alert(prayertable);
   const textCopied = ClipboardJS.copy(prayertable);
    console.log('copied!', textCopied);

 	alert('تم نسخ أوقات الصلاة يمكنك لصقه ');

	
   });
