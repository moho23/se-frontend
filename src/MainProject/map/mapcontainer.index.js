import React, {useState,useEffect} from "react";
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
import {EnglishCategoryToPersian} from "./translateCategory";
import {Tooltip} from "antd";
import DriverModal from "../DriverModal/drivermodal.index";
import {authToken} from "../../scripts/storage";


const MapContainer = (props) => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [isSearchByRadius, setIsSearchByRadius] = useState(null);
    const [markerArray, setMarkerArray] = useState();
    const [locationArray, setLocationArray] = useState(null);
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [address, setAddress] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState(null);


    useEffect(() => {
        setToken(authToken.get());
    }, []);

    const categoryHandler = (categ) => {
        let splitcateg = categ.split(",");
        // console.log(splitcateg)
        const persianCategArray = []
        splitcateg.map(cat => {
                if (EnglishCategoryToPersian[cat]) {
                    persianCategArray.push(EnglishCategoryToPersian[cat])
                }
            }
        )
        // console.log(persianCategArray)
        const persianCategString = persianCategArray.join()
        // console.log(persianCategString)
        return (persianCategString)
    }

    function markercordinate(xid) {
        setName(null)
        setImage(null)
        setAddress(null)
        setDescription(null)
        setCategory(null)
        // console.log("details")
        detailsSideBar.set(true)
        let url = APIPath.map.details + xid
        return new Promise((resolve) => {
            get(url).then((data) => {
                resolve(true);
                if (responseValidator(data.status) && data.data) {
                    console.log(data)
                    props.setModal()
                    if (data.data) {
                        if (data.data.address.city) {
                            setAddress(data.data.address.city)
                            if (data.data.address.neighbourhood) {
                                setAddress(data.data.address.city + "," + data.data.address.neighbourhood)
                                if (data.data.address.road) {
                                    setAddress(data.data.address.city + "," + data.data.address.neighbourhood + "," + data.data.address.road)
                                }
                            } else if (data.data.address.road) {
                                setAddress(data.data.address.city + "," + data.data.address.neighbourhood + "," + data.data.address.road)
                            }
                        } else if (data.data.address) {
                            setAddress(data.data.address)
                        }
                        if (data.data.wikipedia_extracts) {
                            setDescription(data.data.wikipedia_extracts.text)
                        } else if (data.data.description) {
                            setDescription(data.data.description)
                        }
                        if (data.data.name) {
                            setName(data.data.name)
                        }
                        if (data.data.kinds) {
                            // categoryHandler(data.data.kinds)
                            setCategory(categoryHandler(data.data.kinds))
                        }
                        if (data.data.image) {
                            if (!data.data.image[0]) {
                                setImage(null)
                            } else {
                                setImage(data.data.image)
                            }
                        }
                    }
                }
            })
        })
    }

    const handleIsSearchByRadius = (mapfilterData) => {
        setIsSearchByRadius(mapfilterData)
    }

    const handleSearchByName =(lat,lon,name,image,address,description,category)=>{
        setName(name)
        setImage(image)
        setAddress(address)
        setDescription(description)
        setCategory(()=>categoryHandler(category))
        setLat(lat)
        setLon(lon)
    }

    const onMapClicked = (map, e) => {
        e.preventDefault();
        console.log("token=",authToken.get())
        console.log("checkedKeys=", props.checkedKeys)
        console.log("searchArea=", props.searchArea)
        console.log("current=", props.current)
        console.log("mapcontainer=", isSearchByRadius)
        if (isSearchByRadius) {
            let checkedKeys = props.checkedKeys
            let searchArea = props.searchArea
            let current = props.current
            if (!checkedKeys) {
                checkedKeys = []
            }
            if (!searchArea) {
                searchArea = 1000
            }
            if (!current) {
                current = "all"
            }
            const kinds = checkedKeys.join()
            // console.log("kinds=",kinds)
            let url = APIPath.map.nearby + `?lon=${e.lngLat.lng}&lat=${e.lngLat.lat}&radius=${searchArea}&rate=${current}&kinds=${kinds}&token=${token}`

            get(url).then((data) => {
                let loc_array = []
                console.log(data)
                let isPublic = true
                let user = false
                if (data.data) {
                    data.data.map(arr => {
                        isPublic = true
                        user = false
                        if (arr.creator_username) {
                            user = true
                            if (arr.is_private) {
                                isPublic = false
                            }
                        }
                        loc_array.push(<Mapir.Marker
                            coordinates={[arr.point.lon, arr.point.lat]}
                            onClick={() => markercordinate(arr.xid)}
                            anchor="bottom"
                            Image={iconHandler(arr.kinds, user, isPublic)}
                            style={{cursor: "pointer"}}
                        >
                        </Mapir.Marker>)
                    })
                }
                setLocationArray(loc_array)

            })

        }
        const array = [];
        setIsntClicked(true)
        array.push(<Mapir.Marker
            coordinates={[e.lngLat.lng, e.lngLat.lat]}
            onClick={() => setIsntClicked(false)}
            anchor="bottom"
            Image={markerUrl}
            style={{cursor: "pointer"}}
        >
        </Mapir.Marker>);
        setMarkerArray(array);
        setLat(e.lngLat.lat);
        setLon(e.lngLat.lng);
    }

    return (
        <div className="map-main-page">
            <Mapfilterbar isFilterOpen={isOpen} isRadius={handleIsSearchByRadius} cordinate={handleSearchByName} />
            {props.modalDetailsShow ? <ModalDetails
                title={name}
                category={category}
                description={description}
                cover={image}
                address={address}
            /> : null}
            {props.driverModalShow ? <DriverModal/> : null}
            <div className="hitchhike">
                <Tooltip style={{direction: "rtl"}} placement="left"
                         title="سفیر هیچ هایک">
                    <i onClick={() => props.setDriverModal()} className="material-icons icon">thumb_down_alt</i>
                    {/*<img onClick={() => props.setDriverModal()} className="sss" src={hitchhiker} alt="mmd"/>*/}
                </Tooltip>
            </div>
            <div className="second-item">
                <Mapir
                    center={[lon, lat]}
                    Map={Map}
                    userLocation
                    onClick={onMapClicked}
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
    driverModalShow: state.map.driverModalShow,
    current: state.map.current,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setModal: () => dispatch({type: Actions.MODALDETAILSHOW}),
        setDriverModal: () => dispatch({type: Actions.DRIVERMODALSHOW}),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MapContainer);