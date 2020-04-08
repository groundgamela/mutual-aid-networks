import React, { useState } from 'react'
import { Button, Input, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

import './style.scss';

const NetworksTable = (props) => {
  const [searchCol, setSearchCol] = useState('')

  const {
    networks
  } = props

  const getColumnSearchProps = (dataIndex, description, secondaryDataIndex='') => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${description}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      if (secondaryDataIndex) {
        return (
          record[dataIndex].toLowerCase().includes(value.toLowerCase())
          || record[secondaryDataIndex].toLowerCase().includes(value.toLowerCase())
        )
      } else {
        return record[dataIndex].toLowerCase().includes(value.toLowerCase())
      }
    },
    render: text => searchCol === dataIndex && text
  })

  const handleSearch = (confirm, dataIndex) => {
    confirm();
    setSearchCol(dataIndex)
  }

  const tableColumns = [
    {
      title: 'Organization',
      width: '15vw',
      fixed: 'left',
      dataIndex: 'title',
      key: 'title',
      sorter: (a,b) => a.title.localeCompare(b.title),
      ...getColumnSearchProps('title', 'organizations'),
      render: text => text,
    },
    {
      title: 'City',
      width: '20vw',
      dataIndex: 'city',
      key: 'city',
      sorter: (a,b) => a.city.localeCompare(b.city),
      ...getColumnSearchProps('city', 'cities'),
      render: text => text,
    },
    {
      title: 'State',
      width: '10vw',
      dataIndex: 'state',
      key: 'state',
      sorter: (a,b) => a.state.localeCompare(b.state),
      defaultSortOrder: 'ascend',
      ...getColumnSearchProps('state', 'states'),
      render: text => text,
    },
    {
      title: 'Languages',
      width: '20vw',
      dataIndex: 'language',
      key: 'language',
      sorter: (a,b) => a.language.localeCompare(b.language),
      ...getColumnSearchProps('language', 'languages'),
      render: text => text,
    },
    {
      title: 'Get Involved',
      width: '20vw',
      filters: [
        { text: 'General', value: 'generalForm'},
        { text: 'Offer Support', value: 'supportOfferForm' },
        { text: 'Request Support', value: 'supportRequestForm' },
        { text: 'Community', value: 'facebookPage' },
      ],
      dataIndex: 'forms',
      onFilter: (value, record) => record[value],
      key: 'forms',
      render: (form, record) => (
        <ul key="resources" className='resources'>
          {record.generalForm && <li key={`${record.generalForm}-general`} className="form-link"><Button ghost href={record.generalForm} target='blank' className='general'>General</Button></li>}
          {record.supportOfferForm && <li key={`${record.supportOfferForm}-offer`} className="form-link"><Button ghost href={record.supportOfferForm} target='blank' className='offer'>Offer Support</Button></li>}
          {record.supportRequestForm && <li key={`${record.supportRequestForm}-request`} className="form-link"><Button ghost href={record.supportRequestForm} target='blank' className='request'>Request Support</Button></li>}
          {record.facebookPage && <li key={`${record.facebookPage}-facebook`} className="form-link"><Button ghost href={record.facebookPage} target='blank' className='other'>Community</Button></li>}
        </ul>
      )
    },
  ]

  return (
    <>
      <Table
        rowKey={network => network.id}
        columns={tableColumns}
        dataSource={networks}
        pagination={{pageSize: 20, hideOnSinglePage: true}}
        scroll={{x: 768}}
        size='small'
      />
    </>
  )
}

export default NetworksTable