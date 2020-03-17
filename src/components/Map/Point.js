class Point {
    constructor(network) {
        this.type = 'Feature';
        this.geometry = {
            coordinates: [Number(network.lng), Number(network.lat)],
            type: 'Point',
        };
        this.properties = {
            region: network.region,
            contact: network.contact || null,
            socials: network.social || null,
            state: network.state,
            title: network.title,
            form: network.form,
            category: network.category || 'General',
            bbox: network.bbox,
            lat: network.lat,
            lng: network.lng,
        };
    }
}

export default Point;
