import React, {useState} from "react";
import Map from './mapbase.index'
import Mapir from "mapir-react-component";
import markerUrl from "../../assets/images/mapmarker.svg"
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
import { APIPath } from "../../data";
import { get,responseValidator,post} from "../../scripts/api";
import {detailsSideBar} from "../../scripts/storage"
import Details from "../detailsLandscapes/detailsLandscapes.index";
import "./map.style.scss"

const MapContainer = () => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [markerArray, setMarkerArray] = useState();
    const [locationArray, setLocationArray] = useState(null);
    const [detail, setDetail] = useState(null);
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);
    const [radius, setRadius] = useState(5000);
    const [rate, setRate] = useState('all');
    const [kinds, setKinds] = useState('');

    const markercordinate=(xid)=>{
      detailsSideBar.set(true)
      let url = APIPath.map.details+xid
      return new Promise((resolve) => {
        get(url).then((data) => {
            resolve(true);
            if (responseValidator(data.status) && data.data) {
                console.log(data)
                setDetail(data.data)
                
                
            }
        });
    });
    
      
      
    }

    const filterHandler=(rad,rat,kin)=>{
      if (rad){
        setRadius(rad)
      }
      if(rat){
        setRate(rat)
      }
      if(kin){
        setKinds(kinds+','+kin)
      }
    }
    
    const iconHandler=(categ)=>{
      const splitCateg = categ.split(",")
      if (splitCateg.includes("interesting_places")){
        if(splitCateg.includes("architecture")){
          return(architecture)
        }
        else if(splitCateg.includes("religion")){
          return(religion)
        }
        else if(splitCateg.includes("cultural")){
          return(culture)
        }
        else if(splitCateg.includes("historic")){
          return(historic)
        }
        else if(splitCateg.includes("industrial_facilities")){
          return(industry)
        }
        else if(splitCateg.includes("natural")){
          return(natural)
        }
        else{
          return(others)
        }
      }

      else if (splitCateg.includes("accomodations")){
        return(hotel)
      }

      else if (splitCateg.includes("amusements")){
        return(amusment)
      }

      else if (splitCateg.includes("amusements")){
        return(amusment)
      }

      else if (splitCateg.includes("sport")){
        return(sport)
      }

      else if (splitCateg.includes("amusements")){
        return(amusment)
      }

      else if (splitCateg.includes("tourist_facilities")){
        if (splitCateg.includes("banks")){
          return(bank)
        }
        else if (splitCateg.includes("foods")){
          if (splitCateg.includes("restaurants") || splitCateg.includes("food_courts") || splitCateg.includes("fast_food")){
            return(restaurant)
          }
          else{
            return(cafe)
          }
          
        }
        else if (splitCateg.includes("shops")){
          return(shop)
        }
        else if (splitCateg.includes("transport")){
          if (splitCateg.includes("bicycle_rental")){
            return(bicycle)
          }
          else if (splitCateg.includes("boat_sharing")){
            return(boat)
          }
          else if (splitCateg.includes("charging_station") || splitCateg.includes("fuel") ){
            return(gasstation)
          }
          else{
            return(car)
          }
        }
        else{
          return(tourist)
        }
      }
      else{
        return(others)
      }   
    }

    const reverseFunction=(map,e)=> {
        let url = APIPath.map.nearby+`?lon=${e.lngLat.lng}&lat=${e.lngLat.lat}&radius=${radius}&rate=${rate}&kinds=${kinds}`
        console.log(e.lngLat.lng)

        get(url).then((data) => {
            let array=[]
            data.data.map(arr=>(
              array.push(<Mapir.Marker
                coordinates={[arr.point.lon,arr.point.lat]}
                onClick={()=>markercordinate(arr.xid)}
                anchor="bottom"
                Image={iconHandler(arr.kinds)}
                >
              </Mapir.Marker>)))
            setLocationArray(array)
            console.log(data)
            })
        const array = [];
        setIsntClicked(true)
        array.push(<Mapir.Marker
          coordinates={[e.lngLat.lng, e.lngLat.lat]}
          onClick={()=>setIsntClicked(false)}
          anchor="bottom"
          Image={markerUrl}
          >
        </Mapir.Marker>);
        setMarkerArray(array);
        setLat(e.lngLat.lat);
        setLon(e.lngLat.lng);
      }

    return (
        <div className="map-main-page">
            <Mapir
                    center={[lon, lat]}
                    Map={Map}
                    userLocation 
                    onClick={reverseFunction}
                >
                
                    <Mapir.Layer
                        type="symbol"
                        layout={{ "icon-image": "harbor-15" }}>
                    </Mapir.Layer>
                    <Mapir.RotationControl />
                    <Mapir.ScaleControl />
                    <Mapir.ZoomControl position={'bottom-left'} />
                    {isntClicked ? markerArray :null}
                    {locationArray? locationArray.map(e=>{return e}): null}
            </Mapir>
            {detail? <Details 
                title={detail.name}
                category={detail.kinds}
                description={detail.wikipedia_extracts.text}
                cover={detail.image}
                // cover={"https://upload.wikimedia.org/wikipedia/commons/1/17/2007_Sai_Park_Tehran_495226240.jpg"}
                /> : null}
        </div>
    )
}

export default MapContainer;