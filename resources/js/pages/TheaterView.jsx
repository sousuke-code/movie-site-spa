import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const TheaterView = () => {
	const mapStyles = {
		height: "400px",
		width: "100%"
};

const defaultCenter = {
		lat: 41.3851, lng: 2.1734
}

return (
		<LoadScript
				googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
				>
				<GoogleMap
						mapContainerStyle={mapStyles}
						zoom={13}
						center={defaultCenter}
				/>
		</LoadScript>
)
};

export default TheaterView;
