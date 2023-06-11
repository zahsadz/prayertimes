 function toFixed( num, precision ) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
     }
	 
   function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
    } 
	
	if (localStorage.getItem('lat') !== null) {
		  
		  var lat = localStorage.getItem('lat'); 
         var lng = localStorage.getItem('lng');
 
       buildMap(lat,lng);

 
function buildMap(lat,lon) {
document.getElementById('kiblaMap').innerHTML = "<div class='embed-responsive embed-responsive-16by9' id='map' style='width: 100%; height: 100%;'></div>";
var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//var osmUrl = 'http://tariki.dz/carte/{z}/{x}/{y}.png',

osmAttribution = 'Map data © OpenStreetMap contributors,' +
' CC-BY-SA',
osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
var mapOptions = {
		zoomControl: false,
		attributionControl: false
         }   
var map = new L.Map('map',mapOptions);

map.setView(new L.LatLng(lat,lon), 13 );
map.addLayer(osmLayer);
var greenIcon = L.icon({
    iconUrl: 'assets/Rosa_de_los_vientos.svg',
    iconSize:     [100, 96], // size of the icon
    iconAnchor:   [50, 100], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([lat, lon], { icon: greenIcon,title: "مدينتك",clickable: false ,draggable: false }).addTo(map);
L.marker([21.42249, 39.82618]).addTo(map);
var latlngs = [[lat,lon],[21.42249,39.82618]];


//L.marker([lat, lon]).addTo(map).bindPopup("أنا هنا").openPopup();
//L.marker([21.42249, 39.82618]).addTo(map).bindPopup("مكة المكرمة").openPopup();

var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
//map.fitBounds(polyline.getBounds());

L.control.scale({position:'topright', imperial:false}).addTo(map);

        var info = L.control();
        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            return this._div;
        };
        
		info.addTo(map);

        // update the statistics with current values
        info.update = function (lat, lon) {
            const totalDistance = distance(lat, lon, '21.42249', '39.82618', 'K');
			console.log('totalDistance:'+totalDistance);
            this._div.innerHTML = '<h4>المسافة بينها ومكة ' + toFixed(totalDistance,4) + ' كيلومتر</h4><br/>';
        };
		
info.update(lat, lon);
console.log(map.getZoom());
console.log(map.getZoom());

         var zoomOptions = {
            zoomInText: '+',
            zoomOutText: '-',
			zoomInTitle: 'Zoom in تكبير',
			zoomOutTitle: 'Zoom out تصغير',
			position: 'topright'
         };
		

  L.control.zoom(zoomOptions).addTo(map);
//map.dragging.disable();	
//map.touchZoom.disable();
//map.doubleClickZoom.disable();
//map.scrollWheelZoom.disable();	
}

 } else {	 
	// $('#exampleModal').modal('show');
    window.location.replace("index.html");
     } 

