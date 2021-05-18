import React, {useState} from "react";
import "./map.style.scss";
import {Checkbox, Tooltip, Tree} from 'antd';
import 'antd/dist/antd.css';
import {Input, Radio, Select} from 'antd';
import * as Actions from "../../redux/map/actions"
import {connect} from "react-redux";
import {toast} from "react-toastify";
import markerUrl from "../../assets/images/mapmarker.svg"
import Mapir from "mapir-react-component";
import {get} from "../../scripts/api";
import {APIPath} from "../../data";
import {englishCategorytoPersian} from "./mapcontainer.index"

const {Option} = Select;

const {Search} = Input;

const Mapfilterbar = (props) => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [desableFilters, setDesableFilters] = useState(true);


    const treeData = [
        {
            title: englishCategorytoPersian['interesting_places'],
            key: 'interesting_places',
            children: [
                {
                    title: englishCategorytoPersian['religion'],
                    key: 'religion',
                },
                {
                    title: englishCategorytoPersian['cultural'],
                    key: 'cultural',
                },
                {
                    title: englishCategorytoPersian['historic'],
                    key: 'historic',
                },
                {
                    title: englishCategorytoPersian['industrial_facilities'],
                    key: 'industrial_facilities',
                },
                {
                    title: englishCategorytoPersian['natural'],
                    key: 'natural',
                },
                {
                    title: englishCategorytoPersian['other'],
                    key: 'other',
                },
            ],
        },
        {
            title: englishCategorytoPersian['tourist_facilities'],
            key: 'tourist_facilities',
            children: [
                {
                    title: englishCategorytoPersian['transport'],
                    key: 'transport',
                    children: [
                        {
                            title: englishCategorytoPersian['car_rental'],
                            key: 'car_rental',
                        },
                        {
                            title: englishCategorytoPersian['car_sharing'],
                            key: 'car_sharing',
                        },
                        {
                            title: englishCategorytoPersian['car_wash'],
                            key: 'car_wash',
                        },
                        {
                            title: englishCategorytoPersian['bicycle_rental'],
                            key: 'bicycle_rental',
                        },
                        {
                            title: englishCategorytoPersian['boat_sharing'],
                            key: 'boat_sharing',
                        },
                        {
                            title: englishCategorytoPersian['fuel'],
                            key: 'fuel',
                        },
                    ],
                },
                {
                    title: englishCategorytoPersian['shops'],
                    key: 'shops',
                },
                {
                    title: englishCategorytoPersian['foods'],
                    key: 'foods',
                    children: [
                        {
                            title: englishCategorytoPersian['restaurants'],
                            key: 'restaurants',
                        },
                        {
                            title: englishCategorytoPersian['cafes'],
                            key: 'cafes',
                        },
                        {
                            title: englishCategorytoPersian['fast_food'],
                            key: 'fast_food',
                        },
                        {
                            title: englishCategorytoPersian['food_courts'],
                            key: 'food_courts',
                        },
                    ],
                },
                {
                    title: englishCategorytoPersian['banks'],
                    key: 'banks',
                },
            ],
        },
        {
            title: englishCategorytoPersian['sport'],
            key: 'sport',
        },
        {
            title: englishCategorytoPersian['amusements'],
            key: 'amusements',
        },
        {
            title: englishCategorytoPersian['accomodations'],
            key: 'accomodations',
        },
    ];

    const options = [
        {label: 'کمتر شناخته شده', value: '3'},
        {label: 'معروف', value: '1'},
        {label: 'کمترمعروف', value: '2'},
        {label: 'همه مکان ها', value: 'all'},
    ];

    const onSearch = value => {

        const searchInput = encodeURIComponent(value)
        let url = APIPath.map.searchByName + searchInput
        get(url).then((data) => {
            console.log(data)
            if (data.data) {
                const array = [];
                setIsntClicked(true)
                array.push(<Mapir.Marker
                    coordinates={[data.data.lon, data.data.lat]}
                    onClick={() => setIsntClicked(false)}
                    anchor="bottom"
                    Image={markerUrl}
                >
                </Mapir.Marker>);
                if (isntClicked) {
                    props.onSearch(array);
                } else {
                    props.onSearch(null);
                }
            } else {
                toast.warn("چنین مکانی ثبت نشده است.")
            }

        })
    };

    const setNearPlacesActive=(e)=>{
        // console.log(e)
        props.isRadius(e)
        setDesableFilters(!e)
    }

    return (
        <div className="first-item">
            <p className="search-label">جستجو</p>
            <Search className="search-box" placeholder="آدرس، مکان ..."
                    onSearch={onSearch}/>
            <hr/>
            <p className="selector-label">محدوده جستجو</p>
            <Select defaultValue={props.searchArea + ' متر'} disabled={desableFilters} className="simple-selector"
                    onChange={(e) => props.setSearchArea(e)}>
                <Option style={{textAlign: "right"}} value="1000">1000 متر</Option>
                <Option style={{textAlign: "right"}} value="2000">2000 متر</Option>
                <Option style={{textAlign: "right"}} value="5000">5000 متر</Option>
            </Select>
            <hr/>
            <div className="around-places">
                <Tooltip className="tool-tip" title={<p>با زدن این تیک
                    میتوانید قابلیت جستجوی مکان های اطراف مکان مورد نظرتان را فعال کنید
                    همچنین میتوانید فیلترهای مورد نظرتان را فعال کنید
                    و بعد از کلیک روی نقشه
                    مکان های اطراف آن مکان را ببینید</p>}>
                    <p>جستجو مکان های اطراف</p>
                </Tooltip>
                
                <Checkbox className="around" onChange={e => setNearPlacesActive(e.target.checked)}/>
            </div>
            <hr/>
            <p className="stepper-label">فیلتر بر اساس محبوبیت</p>
            <Radio.Group className="stepper" disabled={desableFilters} options={options} onChange={(e) => props.setCurrent(e.target.value)}/>
            <hr/>
            <Tree
                checkable
                onExpand={(e) => props.onExpand(e)}
                expandedKeys={props.expandedKeys}
                autoExpandParent={props.autoExpandParent}
                onCheck={(e) => props.onCheck(e)}
                checkedKeys={props.checkedKeys}
                onSelect={(e) => props.onSelect(e)}
                selectedKeys={props.selectedKeys}
                treeData={treeData}
                className="check-box"
                disabled={desableFilters}
            />
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

const mapDispatchToProps = (dispatch) => {
    return {
        onExpand: (expandedKeysValue) => dispatch({type: Actions.EXPAND, expandedKeysValue: expandedKeysValue}),
        onCheck: (checkedKeysValue) => dispatch({type: Actions.CHECK, checkedKeysValue: checkedKeysValue}),
        onSelect: (selectedKeysValue) => dispatch({type: Actions.SELECT, selectedKeysValue: selectedKeysValue}),
        setSearchArea: (searchareaValue) => dispatch({type: Actions.SEARCHAREA, searchareaValue: searchareaValue}),
        setCurrent: (currentValue) => dispatch({type: Actions.CURRENT, currentValue: currentValue}),
        onSearch: (searchMarker) => dispatch({type: Actions.ONSERACH, searchMarker: searchMarker}),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Mapfilterbar);