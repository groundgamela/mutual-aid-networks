import { map } from "lodash";
import { FOOD_RESOURCE, FOOD_RESOURCE_TYPES_DISPLAY_MAP } from "../../state/constants";

const { standardizePhoneNumber } = require("../../utils");

const renderNetworkPopover = (feature) => {
    const { properties } = feature;
   
      let link;
      if (properties.generalForm) {
          link = `<a rel="noopener noreferrer" target="_blank" href=${properties.generalForm}>Link to form</a>`;
      } else if (
          properties.supportOfferForm &&
          properties.supportRequestForm
      ) {
          link = `<a rel="noopener noreferrer" class="side-by-side" target="_blank" href=${properties.supportOfferForm}>Offer support</a><a class="side-by-side" target="_blank" href=${properties.supportRequestForm}>Request support</a>`;
      } else if (properties.supportOfferForm) {
          link = `<a rel="noopener noreferrer" href=${properties.supportOfferForm}>Offer support</a>`;
      } else if (properties.supportRequestForm) {
          link = `<a rel="noopener noreferrer" href=${properties.supportRequestForm}>Request support</a>`;
      } else {
          link = `<a rel="noopener noreferrer" href=${properties.facebookPage}>Link to group</a>`;
      }
      let location = properties.city ?
          `${properties.city}, ${properties.state}` :
          properties.state;
        return `
            <h4>${properties.title}</h4>
            <div>${location}</div>
            <div>${standardizePhoneNumber(properties.hotlineNumber)}</div>
            <div>${link}</div>`
}


const renderResourcePopover = (feature) => {
    const {
        properties
    } = feature;
    const resources = JSON.parse(properties.resources);
    const tags = map(resources, (item) => `<span class="tag">${FOOD_RESOURCE_TYPES_DISPLAY_MAP[item]}</span>`).join("");
    return `<h4>${properties.title}</h4>
        <div>${properties.address}</div>
        ${properties.hours ? ` <div>Open: ${properties.hours}</div>` : ""}
        <div class="tag-container">${tags}</div>`
}

export const renderPopover = (feature) => {
    if (feature.properties.category === FOOD_RESOURCE) {
        return renderResourcePopover(feature)
    } 
    return renderNetworkPopover(feature)
}