import React, {useState} from "react";
import Map from './mapbase.index'
import Mapir from "mapir-react-component";

const MapContainer = () => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [markerArray, setMarkerArray] = useState();
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);



    const reverseFunction=(map,e)=> {
        var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`
        fetch(url,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJmNTFlOTBjMjRhZmE3YmVhYzRjY2FlMjVkN2IxNjFmZDEzYzliMjIwZDc0NTg4OGY5M2Q5ZDdkNTc5MTM3ZTVhY2JhMTY3MTBjZWQ3OWRhIn0.eyJhdWQiOiIxMzUzNyIsImp0aSI6IjJmNTFlOTBjMjRhZmE3YmVhYzRjY2FlMjVkN2IxNjFmZDEzYzliMjIwZDc0NTg4OGY5M2Q5ZDdkNTc5MTM3ZTVhY2JhMTY3MTBjZWQ3OWRhIiwiaWF0IjoxNjE4MzIzMzcyLCJuYmYiOjE2MTgzMjMzNzIsImV4cCI6MTYyMDkxNTM3Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.HoKU6OckiAbRBHCc2gd6yKIRGmCqmpEX57KDMvBVpKtGdXYf0NbyvElcA_ATjtfedpujXSmoNZvoRkPPQX8rpyWtbM1UfgTY4iJEQU6qvjdodI1DOpQlYsJrG2JXcwHtTIMAoSoWez_U5yBxzCQH7dRb_10y2Sqtm787wyoLqmVCSqUbhYQd3sBwBXNVnVd0mDle0Wn8Xarg8DHhJRW_s6CIZSJtAPGGQdp1iB7K5lGMNPxOCbGg3zMeSZ5WteyThWxnddeAbYxMDRLuhDTv2X26nNqswLiptRfg9ioryBBTs2HllJNBH-aeh2qccPvfA27GzQuObBBAOC5s9fwh5Q'
            }
          })
          .then(response => response.json())
          .then(data => { console.log(data) })
        const array = [];
        setIsntClicked(true)
        array.push(<Mapir.Marker
          coordinates={[e.lngLat.lng, e.lngLat.lat]}
          onClick={()=>setIsntClicked(false)}
          anchor="bottom"
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
            </Mapir>
        </div>
    )
}

export default MapContainer;