import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import CalcDirection from "./CalcDirection";

const TheaterModal = ({ modal, setModal, theater, lat, lng }) => {
    const closeModal = () => {
        setModal(false);
    };

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

   

    console.log(apiKey);


	console.log(lat);


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
		
                        <CalcDirection lat={lat} lng={lng} locationLat={theater.geometry.location.lat} locationLng={theater.geometry.location.lng}/>
                        <div className="py-2 gap-2">
                            <h1 className="font-bold flex items-center justify-center text-xl">
                                {theater.name}
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
