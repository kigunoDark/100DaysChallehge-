const APP_ID = "6H6LGbdU8moRIx2Cmc7M";
const APP_CODE = "d712it9OF2kVHCy7FbQKCw";

let platform = new H.service.Platform({
    'app_id': APP_ID,
    'app_code': APP_CODE,
    useCIT: true,
    useHTTPS: true
});

let defaultLayers = platform.createDefaultLayers();

let map = new H.Map(
    document.getElementById('map'),
    defaultLayers.normal.map,
    {
        zoom: 10,
        center: { lat: 55.751244, lng: 37.618423 }
});

navigator.geolocation.getCurrentPosition(
    function(position) {
        map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
        map.setZoom(13);
    }
);

let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

let ui = H.ui.UI.createDefault(map, defaultLayers, "ru-RU");

let circleArr = {}
circleArr['Зеленый'] = [1 , new H.map.Circle({lat: 45.041263083875585, lng: 41.91064660361326}, 1000, {style: {fillColor: 'rgba(81, 255, 0, 0.7)'}})];
circleArr['Желтый'] = [3, new H.map.Circle({lat: 45.030830722064714, lng: 41.95030038168943}, 1000, {style: {fillColor: 'rgba(251, 255, 0, 0.7)'}})];
circleArr['Красный'] = [5, new H.map.Circle({lat: 45.04769138288362, lng: 41.97759454062498}, 1000, {style: {fillColor: 'rgba(250, 0, 0, 0.7)'}})];

for(key in circleArr) {
    map.addObject(circleArr[key][1]);
}

eventMarkerGroup = new H.map.Group();
map.addObject(eventMarkerGroup);
let eventMarkerDict = {};
var eventCoords = null;
var selectedMarker = null;

function latlng2distance(lat1, long1, lat2, long2) {
//радиус Земли
var R = 6372795;
//перевод коордитат в радианы
lat1 *= Math.PI / 180;
lat2 *= Math.PI / 180;
long1 *= Math.PI / 180;
long2 *= Math.PI / 180;
//вычисление косинусов и синусов широт и разницы долгот
var cl1 = Math.cos(lat1);
var cl2 = Math.cos(lat2);
var sl1 = Math.sin(lat1);
var sl2 = Math.sin(lat2);
var delta = long2 - long1;
var cdelta = Math.cos(delta);
var sdelta = Math.sin(delta);
//вычисления длины большого круга
var y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
var x = sl1 * sl2 + cl1 * cl2 * cdelta;
var ad = Math.atan2(y, x);
var dist = ad * R; //расстояние между двумя координатами в метрах
return dist
}

map.addEventListener('tap', function(evt) {
    eventCoords =  map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    var target = evt.target;
    if (target instanceof mapsjs.map.Marker) {
        if (target.label == undefined) {
            for (var key in eventMarkerDict) {
                if (target.getPosition() == eventMarkerDict[key][1].getPosition()) {
                    let eventMarkerWindowTitle = document.querySelector('h5#eventMarkerTitle');
                    let eventMarkerWindowDesc = document.querySelector('span#description');
                    eventMarkerWindowDesc.innerText = eventMarkerDict[key][0];
                    eventMarkerWindowTitle.innerText = key;
                    $('#eventMarkerWindow').modal();
                }
            }
        } else {
            selectedMarker = target.label;
            let eventMarkerWindowTitle = document.querySelector('h5#eventMarkerTitle');
            let eventMarkerWindowDesc = document.querySelector('span#description');
            eventMarkerWindowDesc.innerText = eventMarkerDict[selectedMarker][0];
            eventMarkerWindowTitle.innerText = selectedMarker;
            $('#eventMarkerWindow').modal();
        }
    } else {
        $('#eventWindow').modal();
    }
});

function circleChange(eventCoords, flag) {
    for(key in circleArr) {
        if (circleArr[key][1] != null) {
            var lat = circleArr[key][1].getCenter().lat;
        var lng = circleArr[key][1].getCenter().lng;
        var d = latlng2distance(lat, lng, eventCoords.lat, eventCoords.lng);
        if(d <= circleArr[key][1].getRadius()) {
            if(!flag) {
                circleArr[key][0]--;
            } else {
                circleArr[key][0]++;
            }
        }
        }
        if (circleArr['Зеленый'][0] > 0) {
               if(circleArr['Зеленый'][0] >= circleArr['Желтый'][0]){
                circleArr['Зеленый'][1].setStyle({
                    fillColor : 'rgba(251, 255, 0, 0.7)'
                });
                circleArr['Желтый'][1].setStyle({
                    fillColor : 'rgba(81, 255, 0, 0.7)'
                });
            } else if(circleArr['Зеленый'][0] < circleArr['Желтый'][0]){
                circleArr['Зеленый'][1].setStyle({
                    fillColor : 'rgba(81, 255, 0, 0.7)'
                });
                circleArr['Желтый'][1].setStyle({
                    fillColor : 'rgba(251, 255, 0, 0.7)'
                });
            } 
        }

        if(circleArr['Желтый'][0] > circleArr['Красный'][0]){
            circleArr['Желтый'][1].setStyle({
                fillColor : 'rgba(250, 0, 0, 0.7)'
            });
            circleArr['Красный'][1].setStyle({
                fillColor : 'rgba(251, 255, 0, 0.7)'
            });
        }  else if (circleArr['Желтый'][0] < circleArr['Красный'][0]){
            circleArr['Желтый'][1].setStyle({
                fillColor : 'rgba(251, 255, 0, 0.7)'
            });
            circleArr['Красный'][1].setStyle({
                fillColor : 'rgba(250, 0, 0, 0.7)'
            });
        }

        if(circleArr['Зеленый'][0] == 0){
            map.removeObject(circleArr['Зеленый'][1]);
            circleArr['Зеленый'][0] = -1;
            circleArr['Зеленый'][1] = null;
        }
        $('#eventMarkerWindow').modal('hide');
    }
}

function saveBtn() {
    $('#eventWindow').modal('hide');
    circleChange(eventCoords, true);
    marker = new H.map.Marker(eventCoords);
    marker.label = document.getElementById("eventName").value;
    eventMarkerGroup.addObject(marker);
    eventMarkerDict[marker.label] = [document.getElementById("eventDesc").value, marker];
    document.getElementById('eventForm').reset();
    if(circleArr['Зеленый'][0] == -1){
       circleArr['Зеленый'][1] = new H.map.Circle(eventCoords, 1000, {style: {fillColor: 'rgba(81, 255, 0, 0.7)'}})
        map.addObject(circleArr['Зеленый'][1]);
    }
}

var searchVal = null;
function searchInput() {
    searchVal = document.getElementById("searchInput").value;
    geocode(platform);
}

function geocode(platform) {
    var geocoder = platform.getGeocodingService(),
        geocodingParameters = {
            searchText: searchVal,
            jsonattributes : 1
        };

    geocoder.search(
        geocodingParameters,
        onSuccess,
        onError
    );
}

function landmarGeocode(platform) {
    var geocoder = platform.getGeocodingService(),
        geocodingParameters = {
            searchText: searchVal,
            jsonattributes : 1
        };

    geocoder.search(
        geocodingParameters,
        onSuccess,
        onError
    );
}

function onSuccess(result) {

    if (result.response.view[0] != undefined) {
       var locations = result.response.view[0].result;
       addLocationsToMap(locations);
    } else {
        alert('Location not found...')
    }
}

function onError(error) {
    alert('Connection error... Try again later');
}

function addLocationsToMap(locations){
    var position,
        i;

    if (locations[0].location != undefined) {
        for (i = 0;  i < locations.length; i += 1) {
            position = {
                lat: locations[i].location.displayPosition.latitude,
                lng: locations[i].location.displayPosition.longitude
            };
            
        }
    } else {
        for (i = 0;  i < locations.length; i += 1) {
            position = {
                lat: locations[i].place.locations[0].displayPosition.latitude,
                lng: locations[i].place.locations[0].displayPosition.longitude
            };
            
        }
    }
    
    // Add the locations group to the map
    map.setCenter(position);
    map.setZoom(16);
}

function deleteMarkerBtn() {
    console.log(selectedMarker);
    if (selectedMarker == undefined) {
        eventMarkerGroup.removeObject(eventMarkerDict[document.querySelector('h5#eventMarkerTitle').innerText][1]);
        circleChange(eventMarkerDict[document.querySelector('h5#eventMarkerTitle').innerText][1].getPosition(), false);
        delete eventMarkerDict[document.querySelector('h5#eventMarkerTitle').innerText];
        console.log(eventMarkerDict);
    } else {
        eventMarkerGroup.removeObject(eventMarkerDict[selectedMarker][1]);
        circleChange(eventMarkerDict[selectedMarker][1].getPosition(), false);
        delete eventMarkerDict[selectedMarker];
        console.log(eventMarkerDict);
    }
}

function getData(ready, url) {
    var request =  new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status != 404){
            ready(this.responseText);
        }
    }
    request.send();
};

let url = 'http://localhost:3000/Kek.json'
getData(function(jsonData) {
    jsonText = JSON.parse(jsonData, '');
    console.log(jsonText);

    for(key in jsonText) {

        eventMarkerDict[key] = [jsonText[key][0], new H.map.Marker(jsonText[key][1])];
        eventMarkerGroup.addObject(eventMarkerDict[key][1]);
        console.log(eventMarkerDict)
    }
}, url);

function turnOn(){
}