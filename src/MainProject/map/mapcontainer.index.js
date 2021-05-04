import React, {useState} from "react";
import Map from './mapbase.index'
import Mapir from "mapir-react-component";
import markerUrl from "../../assets/images/mapmarker.svg"
import location from "../../assets/images/volcano.svg"
import {APIPath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {detailsSideBar} from "../../scripts/storage"
import "./map.style.scss";
import {TreeSelect, Tree} from 'antd';
import 'antd/dist/antd.css';

const {TreeNode} = TreeSelect;

const MapContainer = () => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [markerArray, setMarkerArray] = useState();
    const [locationArray, setLocationArray] = useState(null);
    const [detail, setDetail] = useState(null);
    const [lat, setLat] = useState(35.72);
    const [lon, setLon] = useState(51.42);
    const [expandedKeys, setExpandedKeys] = useState(['volley', 'toopi']);
    const [checkedKeys, setCheckedKeys] = useState(['places']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [value, setValue] = useState(undefined);


    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const markercordinate = (lng, lt) => {
        const temp = detailsSideBar.get()
        console.log(!temp)
        detailsSideBar.set(true)
        let url = APIPath.map.details + `?long=${lng}&lat=${lt}`
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

    const reverseFunction = (map, e) => {
        let url = APIPath.map.nearby + `?long=${e.lngLat.lng}&lat=${e.lngLat.lat}`
        get(url).then((data) => {
            let array = []
            data.data.map(arr => (
                array.push(<Mapir.Marker
                    coordinates={[arr.longitude, arr.latitude]}
                    onClick={() => markercordinate(arr.longitude, arr.latitude)}
                    anchor="bottom"
                    Image={location}
                    style={{cursor: "pointer"}}
                >
                </Mapir.Marker>)))
            setLocationArray(array)

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

    const onChange = (value) => {
        console.log(value);
        setValue({value});
    };

    const treeData = [
        {
            title: 'sport',
            key: 'sport',
            children: [
                {
                    title: 'toopi',
                    key: 'toopi',
                    children: [
                        {title: 'soccer', key: 'soccer'},
                        {title: 'volley', key: 'volley'},
                        {title: 'basket', key: 'basket'},
                    ],
                },
                {
                    title: 'fiziki',
                    key: 'jodo',
                },
            ],
        },
        {
            title: 'places',
            key: 'places',
        },
    ];

    return (
        <div className="map-main-page">
            <div className="first-item">
                <TreeSelect
                    showSearch
                    style={{width: '100%'}}
                    value={value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto', direction: "rtl"}}
                    placeholder="انتخاب کنید"
                    allowClear={true}
                    multiple={true}
                    treeDefaultExpandAll
                    onChange={onChange}
                    className="selector"
                >
                    <TreeNode value="interesting_places" title="Interesting places">
                        <TreeNode value="religion" title="religion"/>
                        <TreeNode value="cultural" title="cultural"/>
                        <TreeNode value="historic" title="historic"/>
                        <TreeNode value="industrial_facilities" title="Industrial facilities"/>
                        <TreeNode value="natural" title="natural"/>
                    </TreeNode>
                    <TreeNode value="accomodations" title="Accomodations">
                    </TreeNode>
                </TreeSelect>
            </div>
            <div className="second-item">
                <Mapir
                    center={[lon, lat]}
                    Map={Map}
                    userLocation
                    onClick={reverseFunction}
                    className="mapp"
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
            {/*{detail ? <Details*/}
            {/*    title={detail.loc_name}*/}
            {/*    category={detail.category}*/}
            {/*    description={detail.description}*/}
            {/*    cover={detail.loc_picture}*/}
            {/*/> : null}*/}
        </div>
    )
}

export default MapContainer;