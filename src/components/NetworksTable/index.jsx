import React, { useState } from 'react'
import { Table } from 'antd'

import './style.scss';

const NetworksTable = (props) => {
  const [searchText, setSearchText] = useState('')
  const [searchCol, setSearchCol] = useState('')

  const tableColumns = [
    {
      title: 'Organization',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location, record) => (
        <>
          {record.neighborhood && <>{record.neighborhood}, </>}
          {record.address && <>{record.address}</>}
        </>
        )
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Get involved',
      dataIndex: 'forms',
      key: 'forms',
      render: (form, record) => (
        <ul className='resources'>
          {record.generalForm && <li><a href={record.generalForm} target='blank' className='general'>Information</a></li>}
          {record.supportOfferForm && <li><a href={record.supportOfferForm} target='blank' className='offer'>Offer Support</a></li>}
          {record.supportRequestForm && <li><a href={record.supportRequestForm} target='blank' className='request'>Request Support</a></li>}
          {record.facebookPage && <li><a href={record.facebookPage} target='blank' className='other'>Community</a></li>}
        </ul>
      )
    },
    {
      title: 'Languages',
      dataIndex: 'language',
      key: 'language',
    },
  ]

  const {
    allNetworks
  } = props

  return (
    <>
      <Table
        rowKey={network => network.id}
        columns={tableColumns}
        dataSource={allNetworks}
        pagination={{pageSize: 40, hideOnSinglePage: true}}
      />
    </>
  )
}

export default NetworksTable