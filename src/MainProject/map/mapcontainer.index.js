import React, {useState} from "react";
import Map from './mapbase.index'
import Mapir from "mapir-react-component";
import markerUrl from "../../assets/images/mapmarker.svg"
import location from "../../assets/images/volcano.svg"
import { APIPath } from "../../data";
import { get,responseValidator} from "../../scripts/api";
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

    const markercordinate=(lng,lt)=>{
      detailsSideBar.set(true)
      let url = APIPath.map.details+`?long=${lng}&lat=${lt}`
      return new Promise((resolve) => {
        get(url).then((data) => {
            resolve(true);
            if (responseValidator(data.status) && data.data) {
                console.log(data.data)
                setDetail(data.data[0])
                
                
            }
        });
    });
    
      
      
    }

    const reverseFunction=(map,e)=> {
        let url = APIPath.map.nearby+`?long=${e.lngLat.lng}&lat=${e.lngLat.lat}`
        
        get(url).then((data) => {
            let array=[]
            data.data.map(arr=>(
              array.push(<Mapir.Marker
                coordinates={[arr.longitude,arr.latitude]}
                onClick={()=>markercordinate(arr.longitude,arr.latitude)}
                anchor="bottom"
                Image={location}
                >
              </Mapir.Marker>)))
            setLocationArray(array)
            
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
                title={detail.loc_name}
                category={detail.category}
                description={detail.description}
                cover={detail.loc_picture}
                /> : null}
        </div>
    )
}

export default MapContainer;