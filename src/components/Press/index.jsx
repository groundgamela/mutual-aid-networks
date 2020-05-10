import React from 'react'
import moment from 'moment';
import { Table } from 'antd'
import pressData from '../../data/press';

import './style.scss';

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        defaultSortOrder: 'descend',
        key: 'date-col',
        render: (value, row, index) => {
            console.log(value);
            const date = value !== '0' ? moment.unix(value).format("M/D/YY") : "";
            return <span key={`${index} ${date}`}>{date}</span>
        },
        sorter: (a, b) =>  moment.unix(a.date) - moment.unix(b.date)
    },
    {
        title: 'Outlet',
        dataIndex: 'outlet',
        render: (value, row, index) => {
            return <span key={`${index} ${value}`}>{value}</span>
        },
    },
    {
        title: 'Title',
        dataIndex: 'title',
        render: (value, row, index) => {
            const rowClass = index % 2 === 0 ? "press-title-even" : "press-title-odd";
            return <span className={'press-title ' + rowClass} key={`${index} ${value}`}>{value}</span>
        },
        width: 500
    },
    {
        title: 'Link',
        dataIndex: 'link',
        render: (value, row, index) => {
            return <a href={value} target="_blank" rel="noopener noreferrer" key={`${index} ${value}`}>Link</a>
        },
    },
];

function onChange(filters, sorter, extra) {
    console.log('params', filters, sorter, extra);
}

const Press = (props) => {
    return (
        <div className='page-container'>
            <Table columns={columns} dataSource={pressData} onChange={onChange} pagination={false} />
        </div>
    )
}

export default Press;