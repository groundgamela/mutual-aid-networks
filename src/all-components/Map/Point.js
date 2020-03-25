class Point {
    constructor(network) {
        const jitterSide = Number(network.id) % 2 ? - (Number(network.id) % 2) * 0.008 : (Number(network.id) % 2) * 0.008;
        const jitterUp = !Number(network.id) % 2 ? - (Number(network.id) % 3) * 0.008 : (Number(network.id) % 3) * 0.008;
        this.type = 'Feature';
        this.geometry = {
            coordinates: [Number(network.lng + jitterUp), Number(network.lat) + jitterSide],
            type: 'Point',
        };
        const scale = network.bbox[3] - network.bbox[1];
        this.properties = {
            region: network.region,
            contact: network.contact || null,
            socials: network.social || null,
            facebookPage: network.facebookPage,
            state: network.state,
            city: network.city,
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
