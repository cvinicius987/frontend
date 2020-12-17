/**
 * Classe para criação do Mapa OpenSource.
 */
class OpenMap extends Map{
	
	/**
	 * Adiciona um marker na instância de Mapa.
	 * 
	 * @param lat
	 * @param lon
	 * @param zoom
	 * @param mapid
	 */
	constructor(lat, lon, zoom, mapid){
		
		super([lat, lon], zoom);
			
		const url 	= "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
		const config  = {
		     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		};

		this._map = L.map(mapid).setView(this.getLatlng(), this.getZoom());
		 	
	    L.tileLayer(url, config).addTo(this._map);
	}
	
	reloadMap(){
		this._map.setView(this.getLatlng(), this.getZoom());
	}
	
	clearMap(){
		
		for(var i = 0; i < this._markers.length; i++){
			this._markers[i].remove()
		}
		
		this._markers = [];
		
		if(this._polyline instanceof L.Polyline)
			this._polyline.remove();
		
		this.reloadMap();
	}
	
	addMarker(lat, lon, title, htmlTemplate, icon){
		
		var options = new Object();
		
		options.title = title;
		
		if(icon !== undefined)
			options.icon = L.icon({iconUrl: icon, iconSize: [32, 37]});
				
		let marker = L.marker([lat, lon], options).addTo(this._map);
		
		this._markers.push(marker);
				
		if(htmlTemplate !== undefined)
			marker.bindPopup(htmlTemplate).openPopup();
				
		return marker;
	}
	
	addZoom(marker){
		this._map.setView(marker._latlng, 20);
	}
	
	addBounds(){
		this._map.fitBounds(L.latLngBounds(this._markers.map(marker => marker._latlng)));
	}
		
	addPolyline(){
		
		var latlngs = this._markers.map(marker => marker._latlng);
		
		this._polyline = L.polyline(latlngs, {color: 'red'}).addTo(this._map);
		
		this._map.fitBounds(this._polyline.getBounds());
		
		return this._polyline;
	}
}