import React from 'react';
import { Card, Tag } from "antd";
import { map } from "lodash";
import {
  LinkOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
} from "@ant-design/icons";

import './style.scss';
import { standardizePhoneNumber } from '../../utils/index'
import FoodResourceIcon from "../../assets/food-resource-purple.svg"
import { FOOD_RESOURCE_TYPES_DISPLAY_MAP } from '../../state/constants';

const { Meta } = Card;

const FoodResourceCard = (props) => {
    const { resource } = props;
      const {
        address,
        title,
        hours,
        website,
        facebook,
        twitter,
        instagram,
        contact,
        number,
        resources,
        id,
        notes,
        distance,
      } = resource;
      const actions = [];
      if (website) {
        actions.push(
          <a
            key={`${id}-website`}
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="button text"
          >
            <LinkOutlined />
            Website
          </a>
        );
      }
      if (contact) {
        actions.push(
          <a
            key={`${id}-contact`}
            href={`mailto:${contact}`}
            rel="noopener noreferrer"
            target="_blank"
            className="button text"
          >
            <MailOutlined />
          </a>
        );
      }
      if (facebook) {
        actions.push(
          <a
            key={`${id}-facebook`}
            href={facebook}
            rel="noopener noreferrer"
            target="_blank"
            className="button text"
          >
            <FacebookOutlined />
          </a>
        );
      }
      if (instagram) {
        actions.push(
          <a
            key={`${id}-instagram`}
            href={instagram}
            rel="noopener noreferrer"
            target="_blank"
            className="button text"
          >
            <InstagramOutlined />
          </a>
        );
      }
      if (twitter) {
        actions.push(
          <a
            key={`${id}-twitter`}
            href={twitter}
            rel="noopener noreferrer"
            target="_blank"
            className="button text"
          >
            <TwitterOutlined />
          </a>
        );
      }

      return (
        <Card
          className="resource-card"
          title={
            <>
              <img src={FoodResourceIcon} alt="network" /> {title}
            </>
          }
          key={id}
          actions={actions}
          onMouseEnter={() => props.setHoveredPoint(id)}
          onMouseLeave={() => props.setHoveredPoint(null)}
        >
          <Meta 
            description={notes || ""} 
          />
          {hours && (
            <div>
              <strong>Open: </strong>
              {hours}
            </div>
          )}
          <ul className="list-inline">
            <li>{address.split(", USA")[0]}</li>
            <li>{distance} miles away</li>
            {number && <li>{standardizePhoneNumber(number)}</li>}
          </ul>

          <div className="community-buttons">
            {map(resources, (value, key) => {
              if (value) {
                return (
                  <Tag key={key} color="#8048f3">{FOOD_RESOURCE_TYPES_DISPLAY_MAP[key]}</Tag>
                );
              }
            })}
          </div>
        </Card>
      );
}
  


export default FoodResourceCard
