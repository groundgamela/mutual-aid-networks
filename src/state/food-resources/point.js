import {
    map,
    filter
} from 'lodash';

class Point {
    constructor(resource) {
        this.type = 'Feature';
        this.geometry = {
            coordinates: [Number(resource.lng), Number(resource.lat)],
            type: 'Point',
        };
        const scale = resource.bbox[3] - resource.bbox[1];
        const resources = filter(map(resource.resources, (item, key) => item ? key : false));

        this.properties = {
            address: resource.address,
            region: resource.region,
            contact: resource.contact || "",
            website: resource.website || "",
            state: resource.state,
            city: resource.city,
            title: resource.title,
            category: resource.category,
            bbox: resource.bbox,
            lat: resource.lat,
            lng: resource.lng,
            resources: resources,
            scale: scale * 10,
            hours: resource.hours || "",
            notes: resource.notes || "",
            phone: resource.phone || "",
        };
        this.id = resource.id;
    }
}

export default Point;
