import React from "react";
import { Checkbox } from 'antd';
import classNames from 'classnames';
import { options }  from '../../state/selections/reducers';

import './style.scss';

const CheckboxGroup = Checkbox.Group;

class Filters extends React.Component {
    state = {
        // checkedList: this.props.selectedCategories,
        indeterminate: false,
        checkAll: true,
    };

    onChange = checkedList => {
        
        this.props.setFilters(checkedList);
        this.setState({
            indeterminate: !!checkedList.length && checkedList.length < options.length,
            checkAll: checkedList.length === options.length,
        });
    };

    onCheckAllChange = e => {
        const checkedList = e.target.checked ? options : [];
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.props.setFilters(checkedList);
    };

    render() {
        if (!this.props.visible) {
            return null;
        }
        return (
            <div className={classNames("filter-container", {'absolute-pos': this.props.absolute})}>
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
                    value={this.props.selectedCategories}
                    onChange={this.onChange}
                >
                    {options.map((ele) => <Checkbox key={ele.replace(' ', '-').toLowerCase()} className={ele.replace(' ', '-').toLowerCase()} value={ele}>{ele}</Checkbox>)}
                </CheckboxGroup>
            </div>
        );
    }
}

export default Filters;