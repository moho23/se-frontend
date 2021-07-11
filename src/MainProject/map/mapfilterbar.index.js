import React, {useEffect, useState} from "react";
import "./map.style.scss";
import {Checkbox, Tooltip, Tree} from 'antd';
import 'antd/dist/antd.css';
import {Input, Radio, Select} from 'antd';
import * as Actions from "../../redux/map/actions"
import {connect} from "react-redux";
import {toast} from "react-toastify";
import markerUrl from "../../assets/images/redmapmarker.png"
import Mapir from "mapir-react-component";
import {get} from "../../scripts/api";
import {APIPath} from "../../data";
import Button from "../../utilities/components/button/button.index";
import {TreeData} from "./treeData";

const {Option} = Select;

const {Search} = Input;

const Mapfilterbar = (props) => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [desableFilters, setDesableFilters] = useState(true);
    const [status, setStatus] = useState(props.isFilterOpen);
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        setStatus(props.isFilterOpen);
    }, [props.isFilterOpen]);

    const options = [
        {label: 'کمتر شناخته شده', value: '3'},
        {label: 'معروف', value: '1'},
        {label: 'کمترمعروف', value: '2'},
        {label: 'همه مکان ها', value: 'all'},
    ];

    const onSearchClick = (arr) => {
        console.log(arr)
        let name = null
        let image = null
        let address = null
        let description = null
        let category = ""
        let array = [];
        setIsntClicked(true)
        let url = APIPath.map.details + arr.xid

        get(url).then((data) => {
                console.log(data)

                if (data.data) {
                    props.setModal()
                    if (data.data.address.city) {
                        address = (data.data.address.city)
                        if (data.data.address.neighbourhood) {
                            address = (data.data.address.city + "," + data.data.address.neighbourhood)
                            if (data.data.address.road) {
                                address = (data.data.address.city + "," + data.data.address.neighbourhood + "," + data.data.address.road)
                            }
                        } else if (data.data.address.road) {
                            address = (data.data.address.city + "," + data.data.address.neighbourhood + "," + data.data.address.road)
                        }
                    } else if (data.data.address) {
                        address = (data.data.address)
                    }
                    if (data.data.wikipedia_extracts) {
                        description = (data.data.wikipedia_extracts.text)
                    } else if (data.data.description) {
                        description = (data.data.description)
                    }
                    if (data.data.name) {
                        name = (data.data.name)
                    }
                    if (data.data.kinds) {
                        // categoryHandler(data.data.kinds)
                        category = ((data.data.kinds))
                    }
                    if (data.data.image) {
                        if (!data.data.image[0]) {
                            image = (null)
                        } else {
                            image = (data.data.image)
                        }
                    }
                } else {
                    // props.setModal()
                    // toast.warning("متاسفانه برای این مکان جزئیاتی ثبت نشده است")
                    // console.log("very bad")
                    // name= arr.display_name
                    // image= arr.icon
                    // address= null
                    // description= null
                    // category= ""
                    // array = [];
                }
                array.push(<Mapir.Marker
                    coordinates={[arr.lon, arr.lat]}
                    onClick={() => setIsntClicked(false)}
                    anchor="bottom"
                    Image={markerUrl}
                    style={{cursor: "pointer"}}
                >
                </Mapir.Marker>);
                if (isntClicked) {
                    props.onSearch(array);
                    props.cordinate(arr.lat, arr.lon, name, image, address, description, category)
                } else {
                    props.onSearch(null);
                }
            }
        )


    }

    const onSearch = value => {

        // const searchInput = encodeURIComponent(value)
        const searchInput = value
        // const searchInput = value.replace(" ","%20")
        let url = APIPath.map.searchByName + "?search=" + searchInput
        if (searchInput !== "") {
            get(url).then((data) => {
                console.log(data)
                if (data.data) {
                    const array = [];
                    setIsntClicked(true)
                    data.data.map(arr => {
                        array.push(arr.display_name);
                    })

                    setSearchResult(array)
                } else {
                    toast.warn("چنین مکانی ثبت نشده است.")
                }

            })
        } else {
            toast.warn("لطفا مکان مورد نظر خود را در محل جستجو وارد کنید")
            setSearchResult([])
        }

    };

    const setNearPlacesActive = (e) => {
        props.isRadius(e)
        setDesableFilters(!e)
    }

    return (
        <div className={`main-filter-bar ${status ? "is-open" : ""}`}>
            <div className="filterBar-container">
                <div className={`trigger-div d-md-none d-block ${status ? "change-width" : ""}`}>
                    <Button className="trigger" onClick={() => setStatus(!status)}
                            text={<i className="material-icons icon">dehaze</i>}/>
                </div>
                <div className="content">
                    <p className="search-label">جستجو</p>
                    <Search className="search-box" placeholder="آدرس، مکان ..."
                            onSearch={onSearch}/>
                    {
                        searchResult && searchResult.map((item, index) => (
                            <div onClick={() => onSearchClick(item)} className="search-results" style={{cursor: "pointer"}}>{item}
                                {/*<hr/>*/}
                            </div>
                        ))
                    }
                    <p className="selector-label">محدوده جستجو</p>
                    <Select defaultValue={props.searchArea + ' متر'} disabled={desableFilters}
                            className="simple-selector"
                            onChange={(e) => props.setSearchArea(e)}>
                        <Option style={{textAlign: "right"}} value="1000">1000 متر</Option>
                        <Option style={{textAlign: "right"}} value="2000">2000 متر</Option>
                        <Option style={{textAlign: "right"}} value="5000">5000 متر</Option>
                    </Select>
                    <hr/>
                    <div className="around-places">
                        <Tooltip className="tool-tip" title={<p>با زدن این تیک
                            می توانید قابلیت جستجوی مکان های اطراف خود را فعال کنید.
                            همچنین میتوانید با استفاده از فیلترهای پایین
                            و بعد از کلیک روی نقشه
                            مکان های اطراف آن را ببینید</p>}>
                            <p>جستجو مکان های اطراف</p>
                        </Tooltip>

                        <Checkbox className="around" onChange={e => setNearPlacesActive(e.target.checked)}/>
                    </div>
                    <hr/>
                    <p className="stepper-label">فیلتر بر اساس محبوبیت</p>
                    <Radio.Group className="stepper" disabled={desableFilters} options={options}
                                 onChange={(e) => props.setCurrent(e.target.value)}/>
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
                        treeData={TreeData}
                        className="check-box"
                        disabled={desableFilters}
                    />
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        setModal: () => dispatch({type: Actions.MODALDETAILSHOW}),
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