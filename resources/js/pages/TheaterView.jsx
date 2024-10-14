import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { TbCurrentLocation } from "react-icons/tb";
import axios from "axios";
import TheaterModal from "../components/TheaterModal";

const TheaterView = () => {
    const [theaters, setTheaters] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectTheater, setSelectTheater] = useState([]);

    const [currentLat, setCurrentLat] = useState(null);
    const [currentLng, setCurrentLng] = useState(null);

    //現在地の初期化
    const lat = 0;
    const lng = 0;

    const fetchTheaters = async (lat, lng) => {
        const response = await axios.get("/api/theaters", {
            params: { lat, lng },
        }); // Laravelのエンドポイントを呼び出す
        setTheaters(response.data.results);
        console.log(response.data);
    };

    const SearchGeolocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setCurrentLat(lat);
            setCurrentLng(lng);
            fetchTheaters(lat, lng);
        });
    };

    const openModal = (theater) => {
        setModal(true);
        setSelectTheater(theater);
    };

    console.log(theaters);

    return (
        <>
            <div className="m-10 lg:m-20 bg-white shadow rounded">
                <div className="flex items-center justify-center text-xl font-bold mt-10 p-2">
                    <button type="button" onClick={SearchGeolocation}>
                        現在地から探す
                    </button>
                    <TbCurrentLocation className="text-2xl" />
                </div>

                <ul className=" divide-gray-100 shadow bg-white rounded">
                    {theaters.map((theater, index) => (
                        <li
                            className="flex justify between py-5 border-bottom"
                            onClick={() => openModal(theater)}
                        >
                            <div className="flex m-2">
                                <h1>{theater.name}</h1>
                            </div>
                        </li>
                    ))}
                </ul>
                <TheaterModal
                    modal={modal}
                    setModal={setModal}
                    theater={selectTheater}
                    lat={currentLat}
                    lng={currentLng}
                />
            </div>
        </>
    );
};

export default TheaterView;
