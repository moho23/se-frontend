import React, {useState} from "react";
import Map from './mapbase.index'
import Mapir from "mapir-react-component";
import markerUrl from "../../assets/images/mapmarker.svg"
import {APIPath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {detailsSideBar} from "../../scripts/storage"
import "./map.style.scss";
import 'antd/dist/antd.css';
import {Input, Radio, Select} from 'antd';
import {Steps} from 'antd';
import ModalDetails from "../modalDetailsLand/modalDetailsLands.index"
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
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);
    
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [address, setAddress] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)

    
    function markercordinate(xid) {
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
                    Image={props.iconHandler(arr.kinds)}
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
                {props.modalDetailsShow ? <ModalDetails
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
});

const mapDispatchToProps=(dispatch)=>{
    return{
        iconHandler:(categ)=>dispatch({type:Actions.ICONHANDLER,categ:categ}),
        setModal:()=>dispatch({type:Actions.MODALDETAILSHOW}),
        
    }
}

const connector = connect(mapStateToProps,mapDispatchToProps);
export default connector(MapContainer);