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
import {get, responseValidator, post} from "../../scripts/api";
import {detailsSideBar} from "../../scripts/storage"
import "./map.style.scss";
import {Tree} from 'antd';
import 'antd/dist/antd.css';
import {Input, Radio, Select} from 'antd';
import {Steps} from 'antd';
import ModalDetails from "../modalDetailsLand/modalDetailsLands.index"

const {Step} = Steps;
const {Option} = Select;

const {Search} = Input;

const MapContainer = () => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [markerArray, setMarkerArray] = useState();
    const [locationArray, setLocationArray] = useState(null);
    const [detail, setDetail] = useState(null);
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);

    //string[] => baba ha hast toosh
    const [expandedKeys, setExpandedKeys] = useState([]);
    //string[] bache hayi ke check boxesh tik khorde
    const [checkedKeys, setCheckedKeys] = useState([]);
    //string ooni ke roosh click beshe
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    //سرچ باکس
    const [searchInput, setSearchInput] = useState(null);

    //فیلتر بر اساس محبوبیت
    const [current, setCurrent] = useState('all')

    //محدوده جستجو   : radius
    const [searchArea, setSearchArea] = useState(1000)

    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [address, setAddress] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)

    const onSearch = value => setSearchInput(value);

    function markercordinate(xid) {
        detailsSideBar.set(true)
        let url = APIPath.map.details + xid
        return new Promise((resolve) => {
            get(url).then((data) => {
                resolve(true);
                if (responseValidator(data.status) && data.data) {
                    console.log(data)
                    setDetail(data.data)
                }
            })
        })
    }

    const onExpand = (expandedKeysValue) => {
        // console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        // console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        // console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const filterHandler = (rad, rat, kin) => {
        if (rad) {
            setSearchArea(rad)
        }
        if (rat) {
            setCurrent(rat)
        }
        if (kin) {
            // setKinds(kinds + ',' + kin)
        }
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
        let url = APIPath.map.nearby + `?lon=${e.lngLat.lng}&lat=${e.lngLat.lat}&radius=${searchArea}&rate=${current}&kinds=${''}`
        console.log(e.lngLat.lng)

        get(url).then((data) => {
            let array = []
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

    const treeData = [
        {
            title: 'interesting places',
            key: 'interesting_places',
            children: [
                {
                    title: 'religion',
                    key: 'religion',
                },
                {
                    title: 'cultural',
                    key: 'cultural',
                },
                {
                    title: 'historic',
                    key: 'historic',
                },
                {
                    title: 'industrial facilities',
                    key: 'industrial_facilities',
                },
                {
                    title: 'natural',
                    key: 'natural',
                },
                {
                    title: 'other',
                    key: 'other',
                },
            ],
        },
        {
            title: 'tourist facilities',
            key: 'tourist_facilities',
            children: [
                {
                    title: 'transport',
                    key: 'transport',
                    children: [
                        {
                            title: 'car rental',
                            key: 'car_rental',
                        },
                        {
                            title: 'car sharing',
                            key: 'car_sharing',
                        },
                        {
                            title: 'car wash',
                            key: 'car_wash',
                        },
                        {
                            title: 'bicycle rental',
                            key: 'bicycle_rental',
                        },
                        {
                            title: 'boat sharing',
                            key: 'boat_sharing',
                        },
                        {
                            title: 'fuel',
                            key: 'fuel',
                        },
                    ],
                },
                {
                    title: 'shops',
                    key: 'shops',
                },
                {
                    title: 'foods',
                    key: 'foods',
                    children: [
                        {
                            title: 'restaurants',
                            key: 'restaurants',
                        },
                        {
                            title: 'cafes',
                            key: 'cafes',
                        },
                        {
                            title: 'fast food',
                            key: 'fast_food',
                        },
                        {
                            title: 'food courts',
                            key: 'food_courts',
                        },
                        {
                            title: 'picnic sites',
                            key: 'picnic_sites',
                        },
                    ],
                },
                {
                    title: 'banks',
                    key: 'banks',
                },
            ],
        },
        {
            title: 'sport',
            key: 'sport',
        },
        {
            title: 'amusements',
            key: 'amusements',
        },
        {
            title: 'accomodations',
            key: 'accomodations',
        },
    ];

    const options = [
        {label: 'کمتر شناخته شده', value: 'little_known'},
        {label: 'معروف', value: 'very_famous'},
        {label: 'کمترمعروف', value: 'famous'},
        {label: 'همه مکان ها', value: 'all'},
    ];


    return (
        <div className="map-main-page">
            <div className="content">
                <div className="first-item">
                    <p className="search-label">جستجو</p>
                    <Search className="search-box" placeholder="آدرس، مکان ..."
                            onSearch={onSearch}/>
                    <hr/>
                    <p className="selector-label">محدوده جستجو</p>
                    <Select defaultValue={searchArea + ' متر'} className="simple-selector"
                            onChange={(e) => setSearchArea(e)}>
                        <Option style={{textAlign: "right"}} value="1000">1000 متر</Option>
                        <Option style={{textAlign: "right"}} value="2000">2000 متر</Option>
                        <Option style={{textAlign: "right"}} value="5000">5000 متر</Option>
                    </Select>
                    <hr/>
                    <p className="stepper-label">فیلتر بر اساس محبوبیت</p>
                    <Radio.Group className="stepper" options={options} onChange={(e) => setCurrent(e.target.value)}/>
                    <hr/>
                    <Tree
                        checkable
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                        treeData={treeData}
                        className="check-box"
                    />
                </div>
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
                {detail ? <ModalDetails
                    title={name}
                    category={category}
                    description={description}
                    cover={image}
                    address={address}
                /> : null}
            </div>
        </div>
    )
}

export default MapContainer;