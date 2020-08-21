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
        title: 'State',
        dataIndex: 'state',
        render: (value, row, index) => {
            return <span key={`${index} ${value}`}>{value}</span>
        },
        sorter: (a, b) => {
            const stateA = a.state.toLowerCase();
            const stateB = b.state.toLowerCase();
            if (stateA.includes('national') && stateB.includes('national')) {
                return 0;
            }
            // sort national to the ends
            if (stateA.includes('national')) {
                return -300;
            }
            if (stateB.includes('national')) {
                return 300;
            }
            if (stateA < stateB) {
                return -1;
            }
            if (stateA > stateB) {
                return 1;
            }
            return 0;
        }
    },
    {
        title: 'Title',
        dataIndex: 'title',
        render: (value, record, index) => {
            const rowClass = index % 2 === 0 ? "press-title-even" : "press-title-odd";
            return <a href={record.link} target="_blank" rel="noopener noreferrer" key={`${index} ${value}`}><span className={'press-title ' + rowClass} key={`${index} ${value}`}>{value}</span></a>
        },
        width: 500
    },
];

function onChange(filters, sorter, extra) {
    console.log('params', filters, sorter, extra);
}

const Press = (props) => {
    return (
        <div className='page-container'>
            <h2 class='title'>Mutual Aid Press</h2>
            <Table columns={columns} dataSource={pressData} onChange={onChange} pagination={false} />
        </div>
    )
}

export default Press;
