import React from "react";
import { GoogleMap, LoadScript,Marker } from "@react-google-maps/api";
import { useEffect,useState} from "react";
import axios from "axios";

const TheaterView = () => {
	const [theaters, setTheaters] = useState([]);
	

	const mapStyles = {
		height: "400px",
		width: "100%"
};

const defaultCenter = {
		lat: 35.66581861, lng: 139.72951166,
}

	const fetchTheaters = async (lat, lng) => {
			const response = await axios.get('/api/theaters', {
				params: {lat, lng},
			}); // Laravelのエンドポイントを呼び出す
			setTheaters(response.data.results);
			console.log(response.data);
	};





const SearchGeolocation = () => {
   navigator.geolocation.getCurrentPosition(position => {
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		fetchTheaters(lat,lng);
		
		console.log(position);
		console.log( lat);
		console.log( lng);


})}



console.log(theaters);

return (
	<>
	 <h1>近くの映画館</h1>
	 <button type="button" onClick={SearchGeolocation}>現在地から探す</button>
           

						{theaters.map((theater,index) => (
								<div>
								<h1>{theater.name}</h1>
								<p>{theater.vicinity}</p>
								</div>
						))}
	</>
 )
};

export default TheaterView;
