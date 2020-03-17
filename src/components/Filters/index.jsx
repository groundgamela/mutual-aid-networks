import React from "react";
import { Checkbox } from 'antd';

import './style.scss';

const CheckboxGroup = Checkbox.Group;
const options = ["General", "Support Request", "Support Offer", "Other"];

class Filters extends React.Component {
    state = {
        checkedList: options,
        indeterminate: false,
        checkAll: true,
    };

    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < options.length,
            checkAll: checkedList.length === options.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? options : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    render() {
        return (
            <div className="filter-container">
                <div className="site-checkbox-all-wrapper">
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Select all
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup
                    value={this.state.checkedList}
                    onChange={this.onChange}
                >
                    {options.map((ele) => <Checkbox className={ele.replace(' ', '-').toLowerCase()} value={ele}>{ele}</Checkbox>)}
                </CheckboxGroup>
            </div>
        );
    }
}

export default Filters;