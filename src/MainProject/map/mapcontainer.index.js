import React, {useState} from "react";
import Map from './mapbase.index'
import Mapir from "mapir-react-component";
import markerUrl from "../../assets/images/mapmarker.svg"
import location from "../../assets/images/volcano.svg"
import { APIPath } from "../../data";
import { get} from "../../scripts/api";

const MapContainer = () => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [markerArray, setMarkerArray] = useState();
    const [locationArray, setLocationArray] = useState(null);
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);



    const reverseFunction=(map,e)=> {
        var url = APIPath.map.nearby+`?long=${e.lngLat.lat}&lat=${e.lngLat.lng}`
        
        get(url).then((data) => {
            var array=[]
            data.data.map(arr=>(
              array.push(<Mapir.Marker
                coordinates={[arr.latitude, arr.longitude]}
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
        <div>
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
        </div>
    )
}

export default MapContainer;