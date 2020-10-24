import React from 'react';
import {
  Card,
  Row
} from 'antd';
import './style.scss';
import { standardizePhoneNumber } from '../../utils/index'
import FoodResourceIcon from "../../assets/food-resource-purple.svg"

const { Meta } = Card;

const FoodResourceCard = (props) => {
    const { resource } = props;
      const {
        address,
        title,
        hours,
        website,
        contact,
        number,
        id,
        notes,
      } = resource;
      return (
        <Card
          className="resource-card"
          title={
            <>
              <img src={FoodResourceIcon} alt="network" /> {title}
            </>
          }
          key={id}
          onMouseEnter={() => props.setHoveredPoint(id)}
          onMouseLeave={() => props.setHoveredPoint(null)}
        >
          <ul className="list-inline">
            <li>{address}</li>

            {number && <li>{standardizePhoneNumber(number)}</li>}
            {hours && <li>Open: {hours}</li>}
          </ul>
          <Meta description={notes || ""} />
          <Row justify="space-between" className="community-buttons">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="button text-general"
              >
                Website
              </a>
            )}
            {contact && (
              <a
                href={`mailto:${contact}`}
                rel="noopener noreferrer"
                target="_blank"
                className="button text-request-support"
              >
                Contact
              </a>
            )}
          </Row>
        </Card>
      );
}
  


export default FoodResourceCard
