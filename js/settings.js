function toFixed( num, precision ) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
     }
 
 var villeModal = new bootstrap.Modal(document.getElementById('villeModal'));
 var HJR_OFFSETModal = new bootstrap.Modal(document.getElementById('HJR_OFFSETModal'));
 var fajrModal = new bootstrap.Modal(document.getElementById('fajrModal'));		
 var dhuhrModal = new bootstrap.Modal(document.getElementById('dhuhrModal'));
 var asrModal = new bootstrap.Modal(document.getElementById('asrModal'));
 var maghribModal = new bootstrap.Modal(document.getElementById('maghribModal'));
 var ishaModal = new bootstrap.Modal(document.getElementById('ishaModal'));
 var modalprayerMethod = new bootstrap.Modal(document.getElementById('modalprayerMethod'));
 var modalasrMethod = new bootstrap.Modal(document.getElementById('modalasrMethod'));

$(document).ready(function(){
	
$("input").keypress(function() {
	
    if (event.which == 13){
	    event.preventDefault();
     console.log(event.which);
 var searchField = $('#search').val();
	if(searchField === ''){
		//$('#result').html('');
		alert('أكتب إسم المدينة');
		return;
			}
$(".loader").show();
var myurl = 'https://nominatim.openstreetmap.org/search?q='+searchField+'&limit=10&namedetails=1&addressdetails=1&extratags=0&accept-language=ar&format=json';
			
$.get(myurl)
    .done(function(data) {
		   // console.log(data);
      initAutoComplete(data);
    }).fail(function() {
    console.log( "error" );
		$(".loader").hide();

     })
    .always(function() {
    console.log( "finished" );
		$(".loader").hide();

      });

	 }
     
	 });	
$("#submit").on('click', function(e){ 
 			e.preventDefault();

  var searchField = $('#search').val();
	if(searchField === ''){
		//$('#result').html('');
		alert('أكتب إسم المدينة');
		return;
			}
$(".loader").show();
$("#search").css("background", "#FFF url(images/LoaderIcon.gif) no-repeat 165px");
var myurl = 'https://nominatim.openstreetmap.org/search?q='+searchField+'&limit=10&namedetails=1&addressdetails=1&extratags=0&accept-language=ar&format=json';
$.getJSON(myurl)
    .done(function(response) {
	  //  console.log(response);
      initAutoComplete(response);
    }).fail(function() {
    console.log( "error" );
		$(".loader").hide();
		$("#search").css("background", "#FFF");

     })
    .always(function() {
    console.log( "finished" );
		$(".loader").hide();
		$("#search").css("background", "#FFF");

      });	  

	});
	
	
 $('#result').on('click', 'li', function() {
        $(this).parents().find('#search').val($(this).text());

	    var latitude = $(this).attr('data-lat');
        var longitude = $(this).attr('data-lng');
        var name_ar = $(this).attr('data-name');
		var country_code = $(this).attr('data-country_code');

        var data = ct.getCountry(country_code.toUpperCase());
		var timezones = data.timezones[0];

	$("#latitude").val(toFixed(latitude,5));
	$("#longitude").val(toFixed(longitude,5));
	$("#regionname").val(name_ar);
	$("#timezonename").val(timezones);

	

		   console.log(timezones);
		   console.log(name_ar);



  $("#result").html('');
 });		
	
	
   $('[data-toggle="tooltip"]').tooltip();
   
	$('#fajr').niceNumber();
	$('#dhuhr').niceNumber();
	$('#asr').niceNumber();
	$('#maghrib').niceNumber();
	$('#isha').niceNumber();
	$('#HJR_OFFSET').niceNumber();
});

  function initAutoComplete(DataSource) {
  	   console.log(DataSource);
  	 var output = ''; 
    $.each(DataSource, function(key, value){
    	 
		 var display_name = value['display_name'];
		 var lat = value['lat'];
		 var lon = value['lon'];
		 var country_code = value['address']['country_code'];
		 var state = value['address']['state'];

	    var name_ar = state !== '' &&  state !== undefined ? state : display_name;
	
     output +='<li data-lat="'+ lat +'" data-lng="'+ lon +'" data-name="'+ display_name +'" data-country_code="'+ country_code +'" class="list-group-item link-class"> '+display_name+'</li>';
    
         });   
	  output += '';
	  $('#result').html(output); 
	   
	}   
 
 
		for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
        }	
	
	
	
	document.getElementById("latitude").value = localStorage.getItem('lat');
	document.getElementById("longitude").value = localStorage.getItem('lng');
	document.getElementById("regionname").value = localStorage.getItem('regionName');
	document.getElementById("timezonename").value = localStorage.getItem('timezonename');
	document.getElementById("prayerMethod").value = localStorage.getItem('prayerMethod');
	document.getElementById("asrMethod").value = localStorage.getItem('asrMethod');

    document.getElementById("mylatitude").innerHTML = localStorage.getItem('lat');

    document.getElementById("mylongitude").innerHTML = localStorage.getItem('lng');

    document.getElementById("myvillage").innerHTML = localStorage.getItem('regionName');
    document.getElementById("mytimezonename").innerHTML = localStorage.getItem('timezonename');


    document.getElementById("fajr").value = localStorage.getItem('fajr');
	
    document.getElementById("dhuhr").value = localStorage.getItem('dhuhr');
	
    document.getElementById("asr").value = localStorage.getItem('asr');
	
    document.getElementById("maghrib").value = localStorage.getItem('maghrib');
	
    document.getElementById("isha").value = localStorage.getItem('isha');
	
	document.getElementById("HJR_OFFSET").value = localStorage.getItem('HJR_OFFSET');


       document.getElementById("btn_btn_update").addEventListener("click", function() {
		   
	   var lat = document.getElementById('latitude');
       var lng = document.getElementById('longitude');
	   var regionName = document.getElementById('regionname');
	   var timezonename = document.getElementById('timezonename');
       localStorage.setItem('regionName', regionName.value);
	   localStorage.setItem('lat', lat.value);
	   localStorage.setItem('lng', lng.value);
	   localStorage.setItem('timezonename', timezonename.value);

	      villeModal.hide();
         location.reload(true);
	    });
		
       document.getElementById("btn_HJR_OFFSET_update").addEventListener("click", function() {
       var HJR_OFFSET = document.getElementById("HJR_OFFSET");
	   
	   localStorage.setItem('HJR_OFFSET', HJR_OFFSET.value);
	   
	      HJR_OFFSETModal.hide();
		  location.reload(true);
	   	    });

	   document.getElementById("btn_fajr_update").addEventListener("click", function() {
		   
	   var fajr = document.getElementById("fajr");
       localStorage.setItem('fajr', fajr.value);

	      fajrModal.hide();
		   location.reload(true);

	   	    });
			
       document.getElementById("btn_dhuhr_update").addEventListener("click", function() {
       var dhuhr = document.getElementById("dhuhr");
	   localStorage.setItem('dhuhr', dhuhr.value);
	      dhuhrModal.hide();
	   	    });	   
		
	document.getElementById("btn_asr_update").addEventListener("click", function() {
	   var asr = document.getElementById("asr");
	   localStorage.setItem('asr', asr.value);

	      asrModal.hide();
		    location.reload(true);

	   	    });		
		
	  document.getElementById("btn_maghrib_update").addEventListener("click", function() {
	   var maghrib = document.getElementById("maghrib");
	   localStorage.setItem('maghrib', maghrib.value);

	      maghribModal.hide();
		   location.reload(true);
	   	    });	
			
	  document.getElementById("btn_isha_update").addEventListener("click", function() {
	   var isha = document.getElementById("isha");
	   localStorage.setItem('isha', isha.value);

	      ishaModal.hide();
		  location.reload(true);
	   	    });	
		
		  document.getElementById("btn_prayerMethod_update").addEventListener("click", function() {
	   var method = document.getElementById("prayerMethod");
	   localStorage.setItem('prayerMethod', method.value);

	      modalprayerMethod.hide();
		  location.reload(true);
	   	    });	


			  document.getElementById("btn_asrMethod_update").addEventListener("click", function() {
	   var method = document.getElementById("asrMethod");
	   localStorage.setItem('asrMethod', method.value);
	      modalasrMethod.hide();
		     location.reload(true);
	   	    });
			


