function toFixed( num, precision ) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
     }
	 
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
     keyboard: false
     });


 
 $(function(){ 
  
	$("input").keypress(function() {
	
    if (event.which == 13){
	    event.preventDefault();
	var searchField = $('#search').val();
	if(searchField === ''){
		//$('#result').html('');
		alert('أكتب إسم المدينة');
		return;
			}
   //  alert(event.which);
	$(".loader").show();
    $("#search").css("background", "#FFF url(images/LoaderIcon.gif) no-repeat 165px");
	
var myurl = 'https://nominatim.openstreetmap.org/search?q='+searchField+'&limit=10&namedetails=1&addressdetails=1&extratags=0&accept-language=ar&format=json';
//var myurl = 'js/location.json';
$.get(myurl)
    .done(function(data) {
		   // console.log(data);
      initAutoComplete(data);
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

	 }
     
	 });

$("#submit").on('click', function(event){ 
//$("#submit").click(function(event){
	
 event.preventDefault();
  var searchField = $('#search').val();
	if(searchField === ''){
		//$('#result').html('');
		alert('أكتب إسم المدينة');
		return;
			}
			
var myurl = 'https://nominatim.openstreetmap.org/search?q='+searchField+'&limit=10&namedetails=1&addressdetails=1&extratags=0&accept-language=ar&format=json';
// var myurl = 'js/location.json';

	$(".loader").show();
    $("#search").css("background", "#FFF url(images/LoaderIcon.gif) no-repeat 165px");

  $.getJSON(myurl)
    .done(function(response) {
	  //  console.log(response);
     let dynamicHtml = initAutoComplete(response);
	 $("#result").append(dynamicHtml);
    }).fail(function(error) {
    console.log(error.status);
	$(".loader").hide();
	$("#search").css("background", "#FFF");
     })
    .always(function() {
    console.log( "finished" );
	$(".loader").hide();
	$("#search").css("background", "#FFF");
      });	  
  console.log("Was preventDefault() called: " + event.isDefaultPrevented());	

	});
	
	
 $('#result').on('click', 'li', function() {
        $(this).parents().find('#search').val($(this).text());

	    var latitude = $(this).attr('data-lat');
        var longitude = $(this).attr('data-lng');
        var name_ar = $(this).attr('data-name');
		var country_code = $(this).attr('data-country_code');

        var data = ct.getCountry(country_code.toUpperCase());
		var timezones = data.timezones[0];

	   //localStorage.setItem('regionName',name_ar);
	   //localStorage.setItem('timezonename',timezones);
	   //localStorage.setItem('lat', latitude);
	  // localStorage.setItem('lng', longitude);
	  
	$("#latitude").val(toFixed(latitude,5));
	$("#longitude").val(toFixed(longitude,5));
	$("#regionname").val(name_ar);
	$("#timezonename").val(timezones);
	 
       var fajr = localStorage.getItem('fajr');
 	   var dhuhr = localStorage.getItem('dhuhr');
 	   var asr = localStorage.getItem('asr');
 	   var maghrib = localStorage.getItem('maghrib');
 	   var isha = localStorage.getItem('isha');
	 
	var fajr_id = fajr !== null && fajr !== '' &&  fajr !== undefined ? fajr : '0';
	var dhuhr_id = dhuhr !== null && dhuhr !== '' &&  dhuhr !== undefined ? dhuhr : '0';
	var asr_id = asr !== null && asr !== '' &&  asr !== undefined ? asr : '0';
	var maghrib_id = maghrib !== null && maghrib !== '' &&  maghrib !== undefined ? maghrib : '0';
	var isha_id = isha !== null && isha !== '' &&  isha !== undefined ? isha : '0';
	  
    $("#fajr").val(fajr_id);
    $("#dhuhr").val(dhuhr_id);
    $("#asr").val(asr_id);
    $("#maghrib").val(maghrib_id);
    $("#isha").val(isha_id);
	
	

		   console.log(timezones);
		   console.log(name_ar);



  $("#result").html('');
 });	
	
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

	    //var name_ar = state !== '' &&  state !== undefined ? state : display_name;
	    var name_ar = value.address.municipality || value.address.village || value.address.city_district || value.address.city || value.address.town || value.address.state;

     output +='<li data-lat="'+ lat +'" data-lng="'+ lon +'" data-name="'+ name_ar +'" data-country_code="'+ country_code +'" class="list-group-item list-group-item-warning"> '+name_ar+'</li>';
    
         });   
	  output += '';
	  $('#result').html(output); 
	}   
 

  
    $("#btn_btn_update").click(function (event) {
			   // event.preventDefault();	
		var proceed = true;	
		
	   var regionName = $('#regionname').val();
       var lat = $('#latitude').val();
       var lng = $('#longitude').val();
	   var timezonename = $("#timezonename").val();
       var prayerMethod = $("#prayerMethod").val();
       var asrMethod = $("#asrMethod").val();
	   
	   var fajr = $("#fajr").val();
	   var dhuhr = $("#dhuhr").val();
	   var asr = $("#asr").val();
	   var maghrib = $("#maghrib").val();
	   var isha = $("#isha").val();
	   
	var required = $('input,select').filter('[required]:visible');
		 console.log(required);

		required.each(function(){
		console.log($.trim($(this).val()));

	     	if(!$.trim($(this).val())){ //if this field is empty 
						proceed = false; 						
						event.preventDefault();
						
					}
		});
		
		if(!proceed){
		console.log(proceed);
		$('.needs-validation').removeClass().addClass('was-validated')

		}
		
		//alert(regionName);
     if (regionName == null || regionName == '' ) {
     alert("إبحث عن مدينة "); 
       proceed = false;
     }
		if(proceed){
		console.log(proceed);
		 
	   		//   alert('timezonename'+timezonename);

	   localStorage.setItem('regionName', regionName);
	   localStorage.setItem('timezonename', timezonename);
	   localStorage.setItem('lat', lat);
	   localStorage.setItem('lng', lng);
	   localStorage.setItem('prayerMethod', prayerMethod);
	   localStorage.setItem('asrMethod', asrMethod);
	  
	   localStorage.setItem('fajr', fajr);
	   localStorage.setItem('dhuhr', dhuhr);
	   localStorage.setItem('asr', asr);
	   localStorage.setItem('maghrib', maghrib);
	   localStorage.setItem('isha', isha);

		//$('#exampleModal').modal('hide');
            myModal.hide();

		// console.log('update prayers');
		 		
		 location.reload(true);
           } 
         }); 
		 
