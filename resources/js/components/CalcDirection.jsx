import React, { useEffect,useState } from "react";
import axios from "axios";
import { TiArrowMaximiseOutline } from "react-icons/ti";
import { LuAtom } from "react-icons/lu";

//検索した施設までの所要時間を計算して返却

const CalcDirection = ({ lat, lng , locationLat, locationLng }) => {
    console.log(lat)
    const [direction, setDirection] = useState();



    useEffect(()=> {
        axios.get('/api/map', {
              params: {
                lat: lat,
                lng : lng,
                locationLat : locationLat,
                locationLng : locationLng,
              }
        },).then((res) => {
            const element = res.data.rows[0].elements[0];

            if (element.status === "OK") {
                console.log('success');
                const duration = element.duration.text;
                setDirection(duration);
            } else {
                console.log('failed');
            }
        })
    },[lat, lng, locationLat, locationLng]);

 

    return (
        <>
        <div className="flex justify-center items-center mb-2">
            <h1 className="text-balck text-xl font-bold">{direction && <div>所要時間: {direction}</div>}</h1>
        </div>
           
        </>
    );
};

export default CalcDirection;
