import React, {useState} from "react";
import Map from './mapbase.index'
import Mapir from "mapir-react-component";
import markerUrl from "../../assets/images/mapmarker.svg"
import {APIPath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {detailsSideBar} from "../../scripts/storage"
import "./map.style.scss";
import 'antd/dist/antd.css';
import ModalDetails from "../modalDetailsLand/modalDetailsLands.index"
import Mapfilterbar from "./mapfilterbar.index"
import {connect} from "react-redux";
import * as Actions from "../../redux/map/actions"
import iconHandler from "./iconhandler.index"

const MapContainer = (props) => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [markerArray, setMarkerArray] = useState();
    const [locationArray, setLocationArray] = useState(null);
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);
    
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [address, setAddress] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)

    
    function markercordinate(xid) {
        console.log("details")
        detailsSideBar.set(true)
        let url = APIPath.map.details + xid
        return new Promise((resolve) => {
            get(url).then((data) => {
                resolve(true);
                if (responseValidator(data.status) && data.data) {
                    console.log(data)
                    props.setModal()
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

    const reverseFunction = (map, e) => {
        e.preventDefault();
        console.log("checkedKeys=",props.checkedKeys)
        console.log("searchArea=",props.searchArea)
        console.log("current=",props.current)
        let checkedKeys=props.checkedKeys
        let searchArea=props.searchArea
        let current=props.current
        if(!checkedKeys){
            checkedKeys=[]
        }
        if(!searchArea){
            searchArea=1000
        }
        if(!current){
            current="all"
        }
        const kinds=checkedKeys.join()
        // console.log("kinds=",kinds)
        let url = APIPath.map.nearby + `?lon=${e.lngLat.lng}&lat=${e.lngLat.lat}&radius=${searchArea}&rate=${current}&kinds=${kinds}`

        get(url).then((data) => {
            let array = []
            console.log(data)
            if(data.data){
                data.data.map(arr => (
                array.push(<Mapir.Marker
                    coordinates={[arr.point.lon, arr.point.lat]}
                    onClick={() => markercordinate(arr.xid)}
                    anchor="bottom"
                    Image={iconHandler(arr.kinds)}
                >
                </Mapir.Marker>)))
            setLocationArray(array)
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
                {props.modalDetailsShow ? <ModalDetails
                    title={name}
                    category={category}
                    description={description}
                    cover={image}
                    address={address}
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
                        {props.searchMarker}
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
    searchMarker: state.map.searchMarkerArray,
    modalDetailsShow: state.map.modalDetailsShow,
    current: state.map.current,
    
});

const mapDispatchToProps=(dispatch)=>{
    return{
        setModal:()=>dispatch({type:Actions.MODALDETAILSHOW}),
        
    }
}

const connector = connect(mapStateToProps,mapDispatchToProps);
export default connector(MapContainer);