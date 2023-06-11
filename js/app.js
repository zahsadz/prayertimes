 function prayerName(prayer) {
     if (prayer == adhan.Prayer.Fajr) {
      return "الفجر";
        } else if (prayer == adhan.Prayer.Sunrise) {
      return "الشروق";
        } else if (prayer == adhan.Prayer.Dhuhr) {
      return "الظهر";
        } else if (prayer == adhan.Prayer.Asr) {
      return "العصر";
        } else if (prayer == adhan.Prayer.Maghrib) {
      return "المغرب";
        } else if (prayer == adhan.Prayer.Isha) {
      return "العشاء";
        } else if (prayer == adhan.Prayer.None) {
      return "None";
        }
    }
	
   Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
     };
	
	   var timezone = localStorage.getItem('timezonename');
       var regionName = localStorage.getItem('regionName');	
	   var lat = localStorage.getItem('lat'); 
       var lng = localStorage.getItem('lng');
 	   var fajr = localStorage.getItem('fajr');
 	   var dhuhr = localStorage.getItem('dhuhr');
 	   var asr = localStorage.getItem('asr');
 	   var maghrib = localStorage.getItem('maghrib');
 	   var isha = localStorage.getItem('isha');
	   var prayerMethod = localStorage.getItem('prayerMethod');
 	   var asrMethod = localStorage.getItem('asrMethod');
	   var HJR_OFFSET = localStorage.getItem('HJR_OFFSET');

      var DateTime = luxon.DateTime;
      var Interval = luxon.Interval;
      var Duration = luxon.Duration;
	  var local = DateTime.now();
      var rezoned = local.setZone(timezone);
      if (rezoned.isInDST == false) {
        var is_DST = "0"; // daylight savings time is NOT observed
         } else {
         var is_DST = "1"; // daylight savings time is observed
          }
	
		update = function(){
		var date = DateTime.now().setZone(timezone).setLocale('ar').toFormat('DDDD');
		var datedztime = DateTime.now().setZone(timezone).setLocale('en').toFormat('HH:mm:ss');
		document.getElementById("datetoday").innerHTML = date;
		document.getElementById("datedztime").innerHTML = datedztime;
          };
      
	    update();
        setInterval(update, 10);
		
		console.log(regionName);
		
	if (regionName !== null && regionName !== '' &&  regionName !== undefined) {
     

	var islamic = rezoned.plus({ days: parseInt(HJR_OFFSET) }).reconfigure({ outputCalendar: "islamic" });
	var hijr = islamic.setLocale('ar').toLocaleString(DateTime.DATE_HUGE);
	
	document.getElementById("hijridate").innerHTML = hijr;
	
	document.getElementById("my_geo_regionName").innerHTML = '<i class="icons bi bi-geo-alt-fill"></i>'+regionName;
		
    const coordinates = new adhan.Coordinates(lat,lng);
    var params;

     switch(parseInt(prayerMethod)){
     case 0:
     params = adhan.CalculationMethod.MuslimWorldLeague();
     break
     case 1:
     params = adhan.CalculationMethod.Egyptian();
     break
     case 2:
     params = adhan.CalculationMethod.Karachi();
     break
     case 3:
     params = adhan.CalculationMethod.UmmAlQura();
     break
     case 4:
     params = adhan.CalculationMethod.Dubai();
     break
     case 5:
     params = adhan.CalculationMethod.MoonsightingCommittee();
     break
     case 6:
     params = adhan.CalculationMethod.NorthAmerica();
     break
     case 7:
     params = adhan.CalculationMethod.Kuwait();
     break
     case 8:
     params = adhan.CalculationMethod.Qatar();
     break
     case 9:
     params = adhan.CalculationMethod.Singapore();
     break
     case 10:
     params = adhan.CalculationMethod.Tehran();
     break
     case 11:
     params = adhan.CalculationMethod.Turkey();
     break
     case 12:
     params = adhan.CalculationMethod.Other();
     params.fajrAngle = 18; 
     params.ishaAngle = 17;
	 //params.ishaInterval = 0;
	 params.maghribAngle = 0;
	 params.methodAdjustments = { maghrib: 3 };
	 console.log('Other');
     break
     default:
     params = adhan.CalculationMethod.MuslimWorldLeague();
	 	 console.log('MuslimWorldLeague');

      }
	 	
	switch(parseInt(asrMethod)){
     case 0:
     params.madhab = adhan.Madhab.Shafi;
     break
     case 1:
     params.madhab = adhan.Madhab.Hanafi;
     break
     default:
     params.madhab = adhan.Madhab.Shafi;
     }
	 
    params.polarCircleResolution = adhan.PolarCircleResolution.AqrabYaum;
	params.rounding = adhan.Rounding.Nearest;
	
	params.adjustments.fajr = parseInt(fajr);
	params.adjustments.dhuhr = parseInt(dhuhr);
	params.adjustments.asr = parseInt(asr);
	params.adjustments.maghrib = parseInt(maghrib);
	params.adjustments.isha = parseInt(isha);
    /*
	params.adjustments.fajr = +fajr;
	params.adjustments.dhuhr = +dhuhr;
	params.adjustments.asr = +asr;
	params.adjustments.maghrib = +maghrib;
	params.adjustments.isha = +isha;
	*/
    const date = new Date();

    var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
	if (prayerTimes.nextPrayer() == 'none')
	var prayerTimes = new adhan.PrayerTimes(coordinates, date.addDays(1), params);
	var sunnahTimes = new adhan.SunnahTimes(prayerTimes);
	var qibla =  adhan.Qibla(coordinates);
	console.log('qibla : '+qibla);
	document.getElementById("qibla").innerHTML = 'إتجاه القبلة زاوية : '+qibla+' درجة ';
    console.log(prayerTimes);
	document.getElementById("middleOfTheNight").innerHTML = 'منتصف الليل : '+DateTime.fromJSDate(sunnahTimes.middleOfTheNight).setLocale('ar').setZone(timezone).toFormat('cccc dd LLLL  h:mm a');
	document.getElementById("lastThirdOfTheNight").innerHTML = 'الثلث الأخير : '+DateTime.fromJSDate(sunnahTimes.lastThirdOfTheNight).setLocale('ar').setZone(timezone).toFormat('cccc dd LLLL h:mm a');
	  
    var current = prayerTimes.currentPrayer();
    var currentPrayerTime = prayerTimes.timeForPrayer(current);
	console.log('currentPrayerTime : '+currentPrayerTime);

    var next = prayerTimes.nextPrayer();
    var nextPrayerTime = prayerTimes.timeForPrayer(next);
    var nextPrayerTimecounter = DateTime.fromJSDate(prayerTimes.timeForPrayer(next)).setZone(timezone);
  	 

    var today = DateTime.now().setZone(timezone).setLocale('ar').toFormat('DDDD HH:mm:ss');

	var Prayerlist = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
	var tables = ''; 
	    tables += ' مواقيت الصلاة لمدينة '+regionName+'\t\t\n';
		tables += ''+today+'\t\t\n';
	    tables += ' '+hijr+'\t\t\n';
      Prayerlist.forEach((x,i) => { 
	var times = prayerTimes[Prayerlist[i].toLowerCase()];
	var names = prayerName(Prayerlist[i].toLowerCase());
	var timesalat = DateTime.fromJSDate(times).setZone(timezone).setLocale('fr').toLocaleString(DateTime.TIME_24_SIMPLE);
		tables += '--------------------------------\t\t\n';
        tables +=  names +':'+ timesalat + '\t\t\n';
       });
	  tables += '\n';
	  document.getElementById("prayertable").innerHTML = tables;
	  
    var timer = setInterval(function(){
    var thours = Duration.fromObject(nextPrayerTimecounter.diff(DateTime.now().setZone(timezone)).toObject());
	   var countdown = thours.toFormat('hh:mm:ss');
	   var counterdown = thours.toFormat('s');
	 	   
      if(counterdown <= 0) {
       clearInterval(timer);
       location.reload(true);
        }	
  
      document.getElementById("countdown").innerHTML = '<i class="icons bi bi-hourglass-split"></i> تبقي لوقت '+prayerName(prayerTimes.nextPrayer())+'  :  ' + countdown + '';
      }, 1000);


	var list = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
	var listar = ['الفجر', 'الشروق','الظهر', 'العصر', 'المغرب', 'العشاء'];
	
	var alarm = '';
	var html = '';
	 html += '<table dir="rtl" class="table table-hover text-dark font-weight-bold ">';
  
     list.forEach((x,i) => {
   
    if (DateTime.fromJSDate(nextPrayerTime).setZone(timezone).toMillis() === DateTime.fromJSDate(prayerTimes[list[i].toLowerCase()]).setZone(timezone).toMillis()){	 
       html += '<tr class="table-danger">';
	   alarm = '<i class="icons bi bi-alarm me-2"></i>';
	  }else if (DateTime.fromJSDate(currentPrayerTime).setZone(timezone).toMillis() === DateTime.fromJSDate(prayerTimes[list[i].toLowerCase()]).setZone(timezone).toMillis()){
		  		  
       html += '<tr class="table-success">';
	   alarm = '<i class="icons bi bi-bell-slash me-2"></i>';
       }else{
       html += '<tr class="table-info">';
	   alarm = '';
          }
       html += '<td>'+ alarm + ''+ listar[i]+ '</td>';
       html += '<td id="time_alert_' + i + '">'+ DateTime.fromJSDate(prayerTimes[list[i].toLowerCase()]).setZone(timezone).setLocale('fr').toLocaleString(DateTime.TIME_24_SIMPLE)+ '</td>';
       html += '<td id="time_alert_' + i + '"><span class="badge bg-secondary">'+ DateTime.fromJSDate(prayerTimes[list[i].toLowerCase()]).setZone(timezone).setLocale('en').toLocaleString(DateTime.TIME_SIMPLE)+ '</span></td>';
       html += '</tr>';
       } )
	
	html += '</table>';
  
    document.getElementById("htmloutput").innerHTML = html;
 
	//  alert(timezone);
    } else {	 
      
     myModal.show();

     }
	 