import React, { useState } from 'react'
import { Button, Input, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { translations } from "./language";

// import './style.scss';

const FoodResourcesTable = ({ resources, siteLanguage }) => {
  const [searchCol, setSearchCol] = useState("");

  const getSearchColValues = (searchColValues) => {
    let searchValue = searchColValues;
    if (Array.isArray(searchColValues)) {
      searchValue = searchColValues.join(", ");
    }
    if (typeof searchValue === "string") {
      return searchValue.toLowerCase();
    }
    return "";
  };

  const handleSearch = (confirm, dataIndex) => {
    confirm();
    setSearchCol(dataIndex);
  };

  const getColumnSearchProps = (dataIndex, description) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${description}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const searchColValues = getSearchColValues(record[dataIndex]);
      return searchColValues.includes(value.toLowerCase());
    },
    render: (text) => searchCol === dataIndex && text,
  });

  const tableColumns = [
    {
      title: "Title",
      width: "10vw",
      fixed: "left",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...getColumnSearchProps("title", "titles"),
      render: (text) => text,
    },
    {
      title: translations.organization[siteLanguage],
      width: "10vw",
      dataIndex: "organization",
      key: "organization",
      sorter: (a, b) =>
        (a.organization || "").localeCompare(b.organization || ""),
      ...getColumnSearchProps("organization", "organizations"),
      render: (text) => text,
    },
    {
      title: "Address",
      width: "15vw",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address", "addresses"),
      render: (text) => text,
    },
    {
      title: "Hours",
      width: "10vw",
      dataIndex: "hours",
      key: "hours",
      ...getColumnSearchProps("hours", "hours"),
      render: (text) => text,
    },
    {
      title: translations.resources[siteLanguage],
      width: "7vw",
      dataIndex: "resources",
      key: "resources",
      filters: [
        { text: "Food bank", value: "foodBank" },
        { text: "Freezer", value: "freezer" },
        { text: "Fridge", value: "fridge" },
        { text: "Pantry", value: "pantry" },
      ],
      onFilter: (value, record) => record.resources[value],
      render: (text, record) => (
        <ul key="resources" className="resources">
          {record.resources.foodBank && <li>Food Bank</li>}
          {record.resources.fridge && <li>Fridge</li>}
          {record.resources.freezer && <li>Freezer</li>}
          {record.resources.pantry && <li>Pantry</li>}
        </ul>
      ),
    },
    {
      title: "Contact",
      width: "7vw",
      dataIndex: "contact",
      key: "contact",
      render: (text, record) => (
        <ul key="contact" className="resources">
          {record.contact && (
            <li>
              <a href={`mailto:${record.contact}`} target="blank">
                Email
              </a>
            </li>
          )}
          {record.website && (
            <li>
              <a href={record.website} target="blank">
                Website
              </a>
            </li>
          )}
          {record.facebook && (
            <li>
              <a
                href={`https://www.facebook.com/${record.facebook}`}
                target="blank"
              >
                Facebook
              </a>
            </li>
          )}
          {record.instagram && (
            <li>
              <a
                href={`https://www.instagram.com/${record.instagram.slice(1)}`}
                target="blank"
              >
                Instagram
              </a>
            </li>
          )}
          {record.twitter && (
            <li>
              <a
                href={`https://www.twitter.com/${record.twitter.slice(1)}`}
                target="blank"
              >
                Twitter
              </a>
            </li>
          )}
        </ul>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey={(resource) => resource.id}
        columns={tableColumns}
        dataSource={resources}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
        scroll={{ x: 1080 }}
        size="small"
        locale={{ filterConfirm: "Filter" }}
      />
    </>
  );
};

export default FoodResourcesTable
