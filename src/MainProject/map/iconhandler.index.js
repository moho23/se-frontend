// import React, {useState} from "react";
import sport from "../../assets/images/icons8-basketball-40.png"
import historic from "../../assets/images/icons8-archeology-40.png"
import bicycle from "../../assets/images/icons8-bicycle-40.png"
import cafe from "../../assets/images/icons8-cafe-40.png"
import others from "../../assets/images/icons8-camera-40.png"
import car from "../../assets/images/icons8-car-40.png"
import amusment from "../../assets/images/icons8-carousel-40.png"
import culture from "../../assets/images/icons8-colosseum-40.png"
import natural from "../../assets/images/icons8-forest-40.png"
import gasstation from "../../assets/images/icons8-gas-station-40.png"
import hotel from "../../assets/images/icons8-hotel-bed-40.png"
import bank from "../../assets/images/icons8-money-bag-40.png"
import religion from "../../assets/images/icons8-mosque-40.png"
import architecture from "../../assets/images/icons8-obelisk-40.png"
import industry from "../../assets/images/icons8-power-plant-40.png"
import restaurant from "../../assets/images/icons8-restaurant-40.png"
import boat from "../../assets/images/icons8-ship-wheel-40.png"
import shop from "../../assets/images/icons8-shop-40.png"
import tourist from "../../assets/images/icons8-traveler-40.png"

// import { LazyLoadImage } from 'react-lazy-load-image-component';
// const sport = () => (  <LazyLoadImage  src={"../../assets/images/icons8-basketball-40.png"} />);
// const historic = () => ( <LazyLoadImage  src={"../../assets/images/icons8-archeology-40.png"} />);
// const bicycle = () => (  <LazyLoadImage  src={"../../assets/images/icons8-bicycle-40.png"} />);
// const cafe = () => (  <LazyLoadImage  src={"../../assets/images/icons8-cafe-40.png"} />);
// const others = () => (  <LazyLoadImage  src={"../../assets/images/icons8-camera-40.png"} />);
// const car = () => (  <LazyLoadImage  src={"../../assets/images/icons8-car-40.png"} />);
// const amusment = () => (  <LazyLoadImage  src={"../../assets/images/icons8-carousel-40.png"} />);
// const culture = () => (  <LazyLoadImage  src={"../../assets/images/icons8-colosseum-40.png"} />);
// const natural = () => (  <LazyLoadImage  src={"../../assets/images/icons8-forest-40.png"} />);
// const gasstation = () => (  <LazyLoadImage  src={"../../assets/images/icons8-gas-station-40.png"} />);
// const hotel = () => (  <LazyLoadImage  src={"../../assets/images/icons8-hotel-bed-40.png"} />);
// const bank = () => (  <LazyLoadImage  src={"../../assets/images/icons8-money-bag-40.png"} />);
// const religion = () => (  <LazyLoadImage  src={"../../assets/images/icons8-mosque-40.png"} />);
// const architecture = () => (  <LazyLoadImage  src={"../../assets/images/icons8-obelisk-40.png"} />);
// const industry = () => (  <LazyLoadImage  src={"../../assets/images/icons8-power-plant-40.png"} />);
// const restaurant = () => (  <LazyLoadImage  src={"../../assets/images/icons8-restaurant-40.png"} />);
// const boat = () => ( <LazyLoadImage  src={"../../assets/images/icons8-ship-wheel-40.png"} />);
// const shop = () => ( <LazyLoadImage  src={"../../assets/images/icons8-shop-40.png"} />);
// const tourist = () => (  <LazyLoadImage  src={"../../assets/images/icons8-traveler-40.png"} />);


const iconHandler = (categ) => {
    const splitCateg = categ.split(",")
    if (splitCateg.includes("interesting_places")) {
        if (splitCateg.includes("architecture")) {
            return (architecture)
        } else if (splitCateg.includes("religion")) {
            return (religion)
        } else if (splitCateg.includes("cultural")) {
            return (culture)
        } else if (splitCateg.includes("historic")) {
            return (historic)
        } else if (splitCateg.includes("industrial_facilities")) {
            return (industry)
        } else if (splitCateg.includes("natural")) {
            return (natural)
        } else {
            return (others)
        }
    } else if (splitCateg.includes("accomodations")) {
        return (hotel)
    } else if (splitCateg.includes("amusements")) {
        return (amusment)
    } else if (splitCateg.includes("amusements")) {
        return (amusment)
    } else if (splitCateg.includes("sport")) {
        return (sport)
    } else if (splitCateg.includes("amusements")) {
        return (amusment)
    } else if (splitCateg.includes("tourist_facilities")) {
        if (splitCateg.includes("banks")) {
            return (bank)
        } else if (splitCateg.includes("foods")) {
            if (splitCateg.includes("restaurants") || splitCateg.includes("food_courts") || splitCateg.includes("fast_food")) {
                return (restaurant)
            } else {
                return (cafe)
            }

        } else if (splitCateg.includes("shops")) {
            return (shop)
        } else if (splitCateg.includes("transport")) {
            if (splitCateg.includes("bicycle_rental")) {
                return (bicycle)
            } else if (splitCateg.includes("boat_sharing")) {
                return (boat)
            } else if (splitCateg.includes("charging_station") || splitCateg.includes("fuel")) {
                return (gasstation)
            } else {
                return (car)
            }
        } else {
            return (tourist)
        }
    } else {
        return (others)
    }
}

export default iconHandler;