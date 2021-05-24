import sport from "../../assets/images/icons8-sport-50 (2).png"
import historic from "../../assets/images/icons8-greek-pillar-base-50 (2).png"
import bicycle from "../../assets/images/icons8-bicycle-50 (2).png"
import cafe from "../../assets/images/icons8-cafe-50 (2).png"
import others from "../../assets/images/icons8-camera-50 (2).png"
import car from "../../assets/images/icons8-car-50 (2).png"
import amusment from "../../assets/images/icons8-theme-park-50 (2).png"
import culture from "../../assets/images/icons8-paisley-50 (2).png"
import natural from "../../assets/images/icons8-forest-50 (2).png"
import gasstation from "../../assets/images/icons8-gas-station-50 (2).png"
import hotel from "../../assets/images/icons8-sleeping-in-bed-50 (2).png"
import bank from "../../assets/images/icons8-money-bag-50 (2).png"
import religion from "../../assets/images/icons8-lilith-symbol-50 (2).png"
import architecture from "../../assets/images/icons8-brandenburg-gate-50 (2).png"
import industry from "../../assets/images/icons8-nuclear-power-plant-50 (2).png"
import restaurant from "../../assets/images/icons8-dining-room-50 (2).png"
import boat from "../../assets/images/icons8-ship-wheel-50 (2).png"
import shop from "../../assets/images/icons8-shop-50 (2).png"
import tourist from "../../assets/images/icons8-traveler-50 (2).png"

import sport1 from "../../assets/images/icons8-sport-50 (1).png"
import historic1 from "../../assets/images/icons8-greek-pillar-base-50 (1).png"
import bicycle1 from "../../assets/images/icons8-bicycle-50 (1).png"
import cafe1 from "../../assets/images/icons8-cafe-50 (1).png"
import others1 from "../../assets/images/icons8-camera-50 (1).png"
import car1 from "../../assets/images/icons8-car-50 (1).png"
import amusment1 from "../../assets/images/icons8-theme-park-50 (1).png"
import culture1 from "../../assets/images/icons8-paisley-50 (1).png"
import natural1 from "../../assets/images/icons8-forest-50 (1).png"
import gasstation1 from "../../assets/images/icons8-gas-station-50 (1).png"
import hotel1 from "../../assets/images/icons8-sleeping-in-bed-50 (1).png"
import bank1 from "../../assets/images/icons8-money-bag-50 (1).png"
import religion1 from "../../assets/images/icons8-lilith-symbol-50 (1).png"
import architecture1 from "../../assets/images/icons8-brandenburg-gate-50 (1).png"
import industry1 from "../../assets/images/icons8-nuclear-power-plant-50 (1).png"
import restaurant1 from "../../assets/images/icons8-dining-room-50 (1).png"
import boat1 from "../../assets/images/icons8-ship-wheel-50 (1).png"
import shop1 from "../../assets/images/icons8-shop-50 (1).png"
import tourist1 from "../../assets/images/icons8-traveler-50 (1).png"

import sport2 from "../../assets/images/icons8-sport-50.png"
import historic2 from "../../assets/images/icons8-greek-pillar-base-50.png"
import bicycle2 from "../../assets/images/icons8-bicycle-50.png"
import cafe2 from "../../assets/images/icons8-cafe-50.png"
import others2 from "../../assets/images/icons8-camera-50.png"
import car2 from "../../assets/images/icons8-car-50.png"
import amusment2 from "../../assets/images/icons8-theme-park-50.png"
import culture2 from "../../assets/images/icons8-paisley-50.png"
import natural2 from "../../assets/images/icons8-forest-50.png"
import gasstation2 from "../../assets/images/icons8-gas-station-50.png"
import hotel2 from "../../assets/images/icons8-sleeping-in-bed-50.png"
import bank2 from "../../assets/images/icons8-money-bag-50.png"
import religion2 from "../../assets/images/icons8-lilith-symbol-50.png"
import architecture2 from "../../assets/images/icons8-brandenburg-gate-50.png"
import industry2 from "../../assets/images/icons8-nuclear-power-plant-50.png"
import restaurant2 from "../../assets/images/icons8-dining-room-50.png"
import boat2 from "../../assets/images/icons8-ship-wheel-50.png"
import shop2 from "../../assets/images/icons8-shop-50.png"
import tourist2 from "../../assets/images/icons8-traveler-50.png"



const iconHandler = (categ,user,isPublic) => {
    const splitCateg = categ.split(",")
    if(!user){
        if (splitCateg.includes("tourist_facilities")) {
            if (splitCateg.includes("banks")) {
                return (bank)
            } 
            else if (splitCateg.includes("foods")) {
                if (splitCateg.includes("restaurants") || splitCateg.includes("food_courts") || splitCateg.includes("fast_food")) {
                    return (restaurant)
                } 
                else {
                    return (cafe)
                }
    
            } 
            else if (splitCateg.includes("shops")) {
                return (shop)
            } 
            else if (splitCateg.includes("transport")) {
                if (splitCateg.includes("bicycle_rental")) {
                    return (bicycle)
                } 
                else if (splitCateg.includes("boat_sharing")) {
                    return (boat)
                } 
                else if (splitCateg.includes("charging_station") || splitCateg.includes("fuel")) {
                    return (gasstation)
                } 
                else {
                    return (car)
                }
            } 
            else {
                return (tourist)
            }
        }
        else if (splitCateg.includes("accomodations")) {
            return (hotel)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment)
        } 
        else if (splitCateg.includes("sport")) {
            return (sport)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment)
        } 
        else if (splitCateg.includes("interesting_places")) {
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
        } 
        else {
            return (others)
        }
    }
    else if(user & isPublic){
        if (splitCateg.includes("tourist_facilities")) {
            if (splitCateg.includes("banks")) {
                return (bank1)
            } 
            else if (splitCateg.includes("foods")) {
                if (splitCateg.includes("restaurants") || splitCateg.includes("food_courts") || splitCateg.includes("fast_food")) {
                    return (restaurant1)
                } 
                else {
                    return (cafe1)
                }
    
            } 
            else if (splitCateg.includes("shops")) {
                return (shop1)
            } 
            else if (splitCateg.includes("transport")) {
                if (splitCateg.includes("bicycle_rental")) {
                    return (bicycle1)
                } 
                else if (splitCateg.includes("boat_sharing")) {
                    return (boat1)
                } 
                else if (splitCateg.includes("charging_station") || splitCateg.includes("fuel")) {
                    return (gasstation1)
                } 
                else {
                    return (car1)
                }
            } 
            else {
                return (tourist1)
            }
        }
        else if (splitCateg.includes("accomodations")) {
            return (hotel1)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment1)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment1)
        } 
        else if (splitCateg.includes("sport")) {
            return (sport1)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment1)
        } 
        else if (splitCateg.includes("interesting_places")) {
            if (splitCateg.includes("architecture")) {
                return (architecture1)
            } else if (splitCateg.includes("religion")) {
                return (religion1)
            } else if (splitCateg.includes("cultural")) {
                return (culture1)
            } else if (splitCateg.includes("historic")) {
                return (historic1)
            } else if (splitCateg.includes("industrial_facilities")) {
                return (industry1)
            } else if (splitCateg.includes("natural")) {
                return (natural1)
            } else {
                return (others1)
            }
        } 
        else {
            return (others1)
        }
    }
    else if(user & !isPublic){
        if (splitCateg.includes("tourist_facilities")) {
            if (splitCateg.includes("banks")) {
                return (bank2)
            } 
            else if (splitCateg.includes("foods")) {
                if (splitCateg.includes("restaurants") || splitCateg.includes("food_courts") || splitCateg.includes("fast_food")) {
                    return (restaurant2)
                } 
                else {
                    return (cafe2)
                }
    
            } 
            else if (splitCateg.includes("shops")) {
                return (shop2)
            } 
            else if (splitCateg.includes("transport")) {
                if (splitCateg.includes("bicycle_rental")) {
                    return (bicycle2)
                } 
                else if (splitCateg.includes("boat_sharing")) {
                    return (boat2)
                } 
                else if (splitCateg.includes("charging_station") || splitCateg.includes("fuel")) {
                    return (gasstation2)
                } 
                else {
                    return (car2)
                }
            } 
            else {
                return (tourist2)
            }
        }
        else if (splitCateg.includes("accomodations")) {
            return (hotel2)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment2)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment2)
        } 
        else if (splitCateg.includes("sport")) {
            return (sport2)
        } 
        else if (splitCateg.includes("amusements")) {
            return (amusment2)
        } 
        else if (splitCateg.includes("interesting_places")) {
            if (splitCateg.includes("architecture")) {
                return (architecture2)
            } else if (splitCateg.includes("religion")) {
                return (religion2)
            } else if (splitCateg.includes("cultural")) {
                return (culture2)
            } else if (splitCateg.includes("historic")) {
                return (historic2)
            } else if (splitCateg.includes("industrial_facilities")) {
                return (industry2)
            } else if (splitCateg.includes("natural")) {
                return (natural2)
            } else {
                return (others2)
            }
        } 
        else {
            return (others2)
        }
    }
    
}

export default iconHandler;