import React, { useEffect, useState } from "react";

import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import '../style/Home.css'
import CardComponent from "./Card";
import HotelData from '../customhook/HotelData'



export default function Home() {
    const [hotelData, setHotelData] = useState([]);
    const [favData, setFavData] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [favoriteData, setFavoriteData] = useState(false);
    const [reload, setReload] = useState(false);

    // let res=HotelData();

    useEffect(() => {
        axios.get("https://mocki.io/v1/ee317df3-2ec8-4134-9c54-77035fe3088c").then((res) => {
            // setData((prev)=>[...prev,res.data.hotels])
            setHotelData([...res.data.hotels]);
        })
        if (reload) {
            setReload(false);
        }
        localStorage.setItem("HotelData", hotelData);
    }, [reload])

    function search(e) {
        let val = e.target.value;
        console.log(typeof val);
        let arr = hotelData.filter((data) => data.name.toLowerCase().includes(val))
        if (e.target.value.length === 0) {
            setReload(true);
        }
        setHotelData([...arr]);
    }

    function sort() {
        if (!sorted) {
            let sorted = hotelData.sort((a, b) => a.price - b.price);
            console.log(sorted);
            setHotelData([...sorted]);
            setSorted(true);
        } else {
            setReload(true);
            setSorted(false);
        }
    }

    function favorite() {
        if (!favoriteData) {
            let arr = hotelData.filter((data) => data.favorite)
            setHotelData([...arr]);

            setFavoriteData(true);
        } else {
            setFavoriteData(false);
            setReload(true);
        }

    }

    function addFavorite(e) {
        hotelData.forEach((data) => {
            if (data.id == e) {
                data.favorite = true;
            }
        })
        let arr = hotelData.filter((data) => data.favorite == true);

        setFavData([...arr]);
        console.log(favData);
    }

    return (
        <div>
            <TextField id="outlined-basic" label="" variant="outlined"
                style={{ borderColor: "grey", color: "black", width: "90vw" }} onChange={search}
            />
            <div className="btn-parent-div">
                <Button variant="outlined" className="fav-clicked" style={{ borderRadius: "10%", borderColor: "grey", color: "black", margin: "5px", backgroundColor: favoriteData ? 'grey' : null }} onClick={favorite}>Favorites</Button>
                <Button variant="outlined" style={{ borderRadius: "10%", borderColor: "grey", color: "black", margin: "5px", backgroundColor: sorted ? 'grey' : null }} onClick={sort}>Price</Button>
            </div>

            {hotelData && hotelData.map((data, index) => {
                return (<CardComponent value={data} key={index} cb={addFavorite} />)
            })}

        </div>
    );
}