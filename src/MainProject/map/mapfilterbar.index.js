import React, {useState} from "react";
import "./map.style.scss";
import {Tree} from 'antd';
import 'antd/dist/antd.css';
import {Input, Radio, Select} from 'antd';
import * as Actions from "../../redux/map/actions"
import {connect} from "react-redux";
import { toast } from "react-toastify";
import markerUrl from "../../assets/images/mapmarker.svg"
import Mapir from "mapir-react-component";
import {get} from "../../scripts/api";
import {APIPath} from "../../data";


const {Option} = Select;

const {Search} = Input;

const Mapfilterbar = (props) => {
    const [isntClicked, setIsntClicked] = useState(true);




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
        {label: 'کمتر شناخته شده', value: '3'},
        {label: 'معروف', value: '1'},
        {label: 'کمترمعروف', value: '2'},
        {label: 'همه مکان ها', value: 'all'},
    ];

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
                if(isntClicked){
                    props.onSearch(array);
                }
                else{
                    props.onSearch(null);
                }
            }
            else{
                toast.warn("چنین مکانی ثبت نشده است.")
            }
            
        })
    };

    return (
                <div className="first-item">
                    <p className="search-label">جستجو</p>
                    <Search className="search-box" placeholder="آدرس، مکان ..."
                            onSearch={onSearch}/>
                    <hr/>
                    <p className="selector-label">محدوده جستجو</p>
                    <Select defaultValue={props.searchArea + ' متر'} className="simple-selector"
                            onChange={(e) => props.setSearchArea(e)}>
                        <Option style={{textAlign: "right"}} value="1000">1000 متر</Option>
                        <Option style={{textAlign: "right"}} value="2000">2000 متر</Option>
                        <Option style={{textAlign: "right"}} value="5000">5000 متر</Option>
                    </Select>
                    <hr/>
                    <p className="stepper-label">فیلتر بر اساس محبوبیت</p>
                    <Radio.Group className="stepper" options={options} onChange={(e) => props.setCurrent(e.target.value)}/>
                    <hr/>
                    <Tree
                        checkable
                        onExpand={(e)=>props.onExpand(e)}
                        expandedKeys={props.expandedKeys}
                        autoExpandParent={props.autoExpandParent}
                        onCheck={(e)=>props.onCheck(e)}
                        checkedKeys={props.checkedKeys}
                        onSelect={(e)=>props.onSelect(e)}
                        selectedKeys={props.selectedKeys}
                        treeData={treeData}
                        className="check-box"
                    />
                </div>
    )}

const mapStateToProps = (state) => ({
    searchArea: state.map.searchArea,
    expandedKeys: state.map.expandedKeys,
    autoExpandParent: state.map.autoExpandParent,
    checkedKeys: state.map.checkedKeys,
    selectedKeys: state.map.selectedKeys,
});

const mapDispatchToProps=(dispatch)=>{
    return{
        onExpand:(expandedKeysValue)=>dispatch({type:Actions.EXPAND,expandedKeysValue:expandedKeysValue}),
        onCheck:(checkedKeysValue)=>dispatch({type:Actions.CHECK,checkedKeysValue:checkedKeysValue}),
        onSelect:(selectedKeysValue)=>dispatch({type:Actions.SELECT,selectedKeysValue:selectedKeysValue}),
        setSearchArea:(searchareaValue)=>dispatch({type:Actions.SEARCHAREA,searchareaValue:searchareaValue}),
        setCurrent:(currentValue)=>dispatch({type:Actions.CURRENT,currentValue:currentValue}),
        onSearch:(searchMarker)=>dispatch({type:Actions.ONSERACH,searchMarker:searchMarker}),
    }
}

const connector = connect(mapStateToProps,mapDispatchToProps);
export default connector(Mapfilterbar);