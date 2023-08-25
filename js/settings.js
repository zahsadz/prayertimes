 

 
 var settingsModalModal = new bootstrap.Modal(document.getElementById('settingsModal'));		

for(let i=0; i<localStorage.length; i++) {
 let key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);
  }	

	$('#fajr_s').niceNumber();
	$('#dhuhr_s').niceNumber();
	$('#asr_s').niceNumber();
	$('#maghrib_s').niceNumber();
	$('#isha_s').niceNumber();

    document.getElementById("fajr_s").value = localStorage.getItem('fajr');
    document.getElementById("dhuhr_s").value = localStorage.getItem('dhuhr');
    document.getElementById("asr_s").value = localStorage.getItem('asr');
    document.getElementById("maghrib_s").value = localStorage.getItem('maghrib');
    document.getElementById("isha_s").value = localStorage.getItem('isha');
	document.getElementById("prayerMethod_s").value = localStorage.getItem('prayerMethod');
    document.getElementById("asrMethod_s").value = localStorage.getItem('asrMethod');


    document.getElementById("settingsModal_update").addEventListener("click", function() {
		   
	   var fajr = document.getElementById("fajr_s");
       localStorage.setItem('fajr', fajr.value);
	   
	     var dhuhr = document.getElementById("dhuhr_s");
	   localStorage.setItem('dhuhr', dhuhr.value);
	   
       var asr = document.getElementById("asr_s");
	   localStorage.setItem('asr', asr.value);
	   
	      var maghrib = document.getElementById("maghrib_s");
	       localStorage.setItem('maghrib', maghrib.value);
	   
          var isha = document.getElementById("isha_s");
	       localStorage.setItem('isha', isha.value);
	   
	     var prayerMethod = document.getElementById("prayerMethod_s");
	   	 localStorage.setItem('prayerMethod', prayerMethod.value);
		 
		 var asrMethod = document.getElementById("asrMethod_s");
	     localStorage.setItem('asrMethod', asrMethod.value);
	  
	   
	      settingsModalModal.hide();
             location.reload(true);
	    });
		