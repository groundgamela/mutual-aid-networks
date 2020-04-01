import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import './style.scss';

const NetworksTable = (props) => {

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
        <span>
          {record.neighborhood && <>{record.neighborhood}, </>}
          {record.address && <>{record.address}</>}
        </span>
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
        <span>
          <ul className='resources'>
            {record.generalForm && <li><a href={record.generalForm} target='blank'> Information </a></li>}
            {record.supportOfferForm && <li><a href={record.supportOfferForm} target='blank'> Offer Support </a></li>}
            {record.supportRequestForm && <li><a href={record.supportRequestForm} target='blank'> Request Support </a></li>}
            {record.facebookPage && <li><a href={record.facebookPage} target='blank'> Social Media </a></li>}
          </ul>
        </span>
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
    <div>
      <Table
        rowKey={network => network.id}
        columns={tableColumns}
        dataSource={allNetworks}
        pagination={{pageSize: 40, hideOnSinglePage: true}}
      />
    </div>
  )
}

export default NetworksTable