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
import {APIPath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {detailsSideBar} from "../../scripts/storage"
import "./map.style.scss";
import 'antd/dist/antd.css';
import {Input, Radio, Select} from 'antd';
import {Steps} from 'antd';
import ModalDetails from "../modalDetailsLand/modalDetailsLands.index"
import { toast } from "react-toastify";
import Mapfilterbar from "./mapfilterbar.index"
import {connect} from "react-redux";
import * as Actions from "../../redux/map/actions"


const {Step} = Steps;
const {Option} = Select;

const {Search} = Input;

const MapContainer = (props) => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [markerArray, setMarkerArray] = useState();
    const [locationArray, setLocationArray] = useState(null);
    const [detail, setDetail] = useState(null);
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);
    //string[] => baba ha hast toosh
    
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [address, setAddress] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)

    const onSearch = value =>{

        const searchInput = encodeURIComponent(value)
        let url = APIPath.map.searchByName + searchInput
        get(url).then((data)=>{
            console.log(data)
            if (data.data){
                const array = [];
                setIsntClicked(true)
                array.push(<Mapir.Marker
                    coordinates={[data.data.lon, data.data.lat]}
                    onClick={() => setIsntClicked(false)}
                    anchor="bottom"
                    Image={markerUrl}
                >
                </Mapir.Marker>);
                setMarkerArray(array);
            }
            else{
                toast.warn("چنین مکانی ثبت نشده است.")
            }
            
        })
    };

    function markercordinate(xid) {
        detailsSideBar.set(true)
        let url = APIPath.map.details + xid
        return new Promise((resolve) => {
            get(url).then((data) => {
                resolve(true);
                if (responseValidator(data.status) && data.data) {
                    console.log(data)
                    setDetail(data.data)

                    if (data.data){
                        if (data.data.address.city){
                          setAddress(data.data.address.city)
                          if(data.data.address.neighbourhood){
                            setAddress(data.data.address.city+","+data.data.address.neighbourhood)
                          }
                          if(data.data.address.road){
                            setAddress(data.data.address.city+","+data.data.address.neighbourhood+","+data.data.address.road)
                          }
                        }
                        if(data.data.wikipedia_extracts){
                          setDescription(data.data.wikipedia_extracts.text)
                        }
                        if(data.data.name){
                          setName(data.data.name)
                        }
                        if(data.data.kinds){
                          setCategory(data.data.kinds)
                        }
                        if(data.data.image){
                          setImage(data.data.image)
                        }
                      }
  
                      
                  }
                
            })
        })
    }

    

    

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

    const reverseFunction = (map, e) => {
        // let kindsarray= expandedKeys.concat(checkedKeys)
        let kindsarray= props.checkedKeys
        const kinds=kindsarray.join()
        console.log(kinds)
        let url = APIPath.map.nearby + `?lon=${e.lngLat.lng}&lat=${e.lngLat.lat}&radius=${props.searchArea}&rate=${props.current}&kinds=${kinds}`
        console.log(props.current)

        get(url).then((data) => {
            let array = []
            console.log(data)
            if(data.data){
                console.log(data.data)
                data.data.map(arr => (
                array.push(<Mapir.Marker
                    coordinates={[arr.point.lon, arr.point.lat]}
                    onClick={() => markercordinate(arr.xid)}
                    anchor="bottom"
                    Image={iconHandler(arr.kinds)}
                >
                </Mapir.Marker>)))
            setLocationArray(array)
            console.log(data.data)
            }
            
        })
        const array = [];
        setIsntClicked(true)
        array.push(<Mapir.Marker
            coordinates={[e.lngLat.lng, e.lngLat.lat]}
            onClick={() => setIsntClicked(false)}
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
            <div className="content">
            <Mapfilterbar/>
                {detail ? <ModalDetails
                    title={name}
                    category={category}
                    description={description}
                    cover={image}
                    address={address}
                    show={true}
                /> : null}
                <div className="second-item">
                    <Mapir
                        center={[lon, lat]}
                        Map={Map}
                        userLocation
                        onClick={reverseFunction}
                    >
                        <Mapir.Layer
                            type="symbol"
                            layout={{"icon-image": "harbor-15"}}>
                        </Mapir.Layer>
                        <Mapir.RotationControl/>
                        <Mapir.ScaleControl/>
                        <Mapir.ZoomControl position={'bottom-left'}/>
                        {isntClicked ? markerArray : null}
                        {locationArray ? locationArray.map(e => {
                            return e
                        }) : null}
                    </Mapir>
                </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    searchArea: state.map.searchArea,
    expandedKeys: state.map.expandedKeys,
    autoExpandParent: state.map.autoExpandParent,
    checkedKeys: state.map.checkedKeys,
    selectedKeys: state.map.selectedKeys,
});

const mapDispatchToProps=(dispatch)=>{
    return{
        onMarker:(xid)=>dispatch({type:Actions.CLICKONMARKER,xid:xid}),
        
    }
}

const connector = connect(mapStateToProps,mapDispatchToProps);
export default connector(MapContainer);