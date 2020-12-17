/**
 * Contrato para API do GoogleMaps 
 */
class GoogleMaps extends Map{

	/**
	 * Adiciona um marker na instância de Mapa.
	 * 
	 * @param lat
	 * @param lon
	 * @param zoom
	 * @param mapid
	 */
	constructor(lat, lon, zoom, mapid){
		
		super(new google.maps.LatLng(lat, lon), zoom);
		
		var mpOptions = {zoom: 4, 
				   		 center: this.getLatlng(), 
				   		 mapTypeId: google.maps.MapTypeId.ROADMAP};

		 this._map = new google.maps.Map(document.getElementById(mapid), mpOptions);
	}
	
	reloadMap(){
		this._map.setCenter(this.getLatlng());
		this._map.setZoom(4);
	}
	
	clearMap(){
		
		if(this._map != null){
		
			for(var i = 0; i < this._markers.length; i++){
				this._markers[i].setMap(null);
			}
	 
			this._markers = [];
		
			if(this._polyline instanceof google.maps.Polyline)
				this._polyline.setMap(null);
		
			this.reloadMap();
		}	
	}
	
	addMarker(lat, lon, title, htmlTemplate, icon){
		
		var marker = new google.maps.Marker({
			map: this._map,
			position: new google.maps.LatLng(lat, lon),
			title: title,
			icon: icon
		});
		
		this._markers.push(marker);
		
		if(htmlTemplate !== undefined){
			
			var infowindow = new google.maps.InfoWindow({
	          content: htmlTemplate
	        });
			
			marker.addListener('click', function() {
				 infowindow.open(this._map, marker);
	        });
		}
				
		return marker;
	}
	
	addZoom(marker){
		this._map.setZoom(18);
		this._map.panTo(marker.position);
	}
	
	addBounds(){
		
		var bounds = new google.maps.LatLngBounds();
		
		var latlngs = this._markers.map(marker => marker.position);
		
		for (var i = 0, LtLgLen = latlngs.length; i < LtLgLen; i++) {
			bounds.extend(latlngs[i]);
		}
		
		this._map.fitBounds(bounds);
	}
		
	addPolyline(){
		
		if(this._markers.length > 0){
			
			var latlngs = this._markers.map(marker => marker.position);
			
			this._polyline = new google.maps.Polyline({
				map: this._map,
				path: latlngs,
				strokeColor: "#ff0000",
				strokeOpacity: 0.6,
				strokeWeight: 5
			});
			
			this.addBounds();
		}
	}
}