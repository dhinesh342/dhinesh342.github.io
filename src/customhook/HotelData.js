import React, { useState } from "react";
import axios from "axios";

export default function HotelData(){
    const [hotelData,setHotelData]=useState(null);
    axios.get("https://mocki.io/v1/ee317df3-2ec8-4134-9c54-77035fe3088c").then((res)=>{
        // setData((prev)=>[...prev,res.data.hotels])
        setHotelData([...res.data.hotels]);
        
    })
    console.log(hotelData)
        
    return hotelData;
}