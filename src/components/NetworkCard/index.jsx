import React from "react";
import { Card, Row } from "antd";
import { FormOutlined, FacebookOutlined } from "@ant-design/icons";
import "./style.scss";
import { standardizePhoneNumber } from "../../utils/index";
import NetworkIcon from "../../assets/network-green.svg";

const { Meta } = Card;

const NetworkCard = (props) => {
  const { network } = props;
  const {
    address,
    title,
    neighborhood,
    facebookPage,
    hotlineNumber,
    community,
    language,
    generalForm,
    supportRequestForm,
    supportOfferForm,
    geocodeStatus,
    state,
    country,
    id,
  } = network;
  const actions = [];
  if (generalForm) {
    actions.push(
      <a
        key={`${id}-generalForm`}
        href={generalForm}
        target="_blank"
        rel="noopener noreferrer"
        className="button text"
      >
        General <FormOutlined />
      </a>
    );
  }
  if (supportRequestForm) {
    actions.push(
      <a
        key={`${id}-supportRequestForm`}
        href={supportRequestForm}
        rel="noopener noreferrer"
        target="_blank"
        className="button text"
      >
        Request help <FormOutlined />
      </a>
    );
  }
  if (supportOfferForm) {
    actions.push(
      <a
        key={`${id}-supportOfferForm`}
        href={supportOfferForm}
        rel="noopener noreferrer"
        target="_blank"
        className="button text"
      >
        Offer help <FormOutlined />
      </a>
    );
  }
  if (facebookPage) {
    actions.push(
      <a
        key={`${id}-facebookPage`}
        href={facebookPage}
        rel="noopener noreferrer"
        target="_blank"
        className="button text"
      >
        Community <FacebookOutlined />
      </a>
    );
  }
  return (
    <Card
      className="network-card"
      title={
        <>
          <img src={NetworkIcon} alt="network" />{" "}
          {title}
        </>
      }
      key={id}
      actions={actions}
      onMouseEnter={() => props.setHoveredPoint(id)}
      onMouseLeave={() => props.setHoveredPoint(null)}
    >
      <ul className="list-inline">
        {geocodeStatus === "hide city" ? (
          <li>
            {neighborhood || ""}, {state}, {country}
          </li>
        ) : (
          <>
            {neighborhood && <li>{neighborhood}</li>}
            {address && <li>{address}</li>}
          </>
        )}
        {hotlineNumber && <li>{standardizePhoneNumber(hotlineNumber)}</li>}
        {language && language.length ? <li>{language.join(", ")}</li> : null}
        {community && <li>{community}</li>}
      </ul>

      <Row justify="space-between" className="community-buttons"></Row>
    </Card>
  );
};

export default NetworkCard;
