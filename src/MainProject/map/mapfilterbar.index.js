import React, {useEffect, useState} from "react";
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
import Button from "../../utilities/components/button/button.index";
import {TreeData} from "./treeData";

const {Option} = Select;

const {Search} = Input;

const Mapfilterbar = (props) => {
    const [isntClicked, setIsntClicked] = useState(true);
    const [desableFilters, setDesableFilters] = useState(true);
    const [status, setStatus] = useState(props.isFilterOpen);

    useEffect(() => {
        setStatus(props.isFilterOpen);
    }, [props.isFilterOpen]);

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
                    <hr/>
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