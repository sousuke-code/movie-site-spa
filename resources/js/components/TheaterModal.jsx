import React from "react";
import { IoMdClose } from "react-icons/io";

const TheaterModal = ({ modal, setModal, theater }) => {
    const closeModal = () => {
        setModal(false);
    };

		const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
		
		console.log(apiKey)
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
									{
										theater.photos &&  (
											<img
													src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=300&photoreference=${theater.photos[0].photo_reference}&key=${apiKey}`}
													alt={theater.name}
													className="w-full"
											/>
									)
									}
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
