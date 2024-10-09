import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const TheaterModal = ({ modal, setModal, theater,lat,lng }) => {
    const closeModal = () => {
        setModal(false);
    };
		
		const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

		const calculateDistance = async() => {
			const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${theater.geometry.location.lat},${theater.geometry.location.lng}&key=${apiKey}`;

			try {
				const response = await axios.get(url);
				const result = response.data;
				console.log(result);
			} catch (error) {
				console.log('error, frtch');
			}
		}

		
		console.log(apiKey)

		useEffect(() => {
			if (modal) {
				calculateDistance();
			}
		},[modal]);
    if (modal) {
        return (
            <div id="overlay">
                <div className="bg-white m-10 lg:w-1/2  justify-center mx-auto rounded-xl shadow">
									<div>
                    <IoMdClose
                        className="text-3xl mr-0 cursor-pointer"
                        onClick={closeModal}
                    />
									</div>

									<div className="">
									
									<div className="py-2 gap-2">
                    <h1 className="font-bold flex items-center justify-center text-xl">{theater.name}											
										</h1>
										<p className="flex items-center justify-center">
											{theater.vicinity}
										</p>


									</div>
									</div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default TheaterModal;
