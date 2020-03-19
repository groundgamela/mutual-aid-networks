class Point {
    constructor(network) {
        this.type = 'Feature';
        this.geometry = {
            coordinates: [Number(network.lng), Number(network.lat)],
            type: 'Point',
        };
        const scale = network.bbox[3] - network.bbox[1];
        this.properties = {
            region: network.region,
            contact: network.contact || null,
            socials: network.social || null,
            facebookPage: network.facebookPage,
            state: network.state,
            title: network.title,
            generalForm: network.generalForm,
            supportRequestForm: network.supportRequestForm,
            supportOfferForm: network.supportOfferForm,
            category: network.category,
            bbox: network.bbox,
            lat: network.lat,
            lng: network.lng,
            scale: scale * 10,
        };
        this.id = network.id;
    }
}

export default Point;
