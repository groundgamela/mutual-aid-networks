class Point {
    constructor(network) {
        this.type = 'Feature';
        this.geometry = {
            coordinates: [Number(network.longitude), Number(network.latitude)],
            type: 'Point',
        };
        this.properties = {
            region: network.region,
            contact: network.contact || null,
            socials: network.social || null,
            state: network.state,
            title: network.title,
            form: network.form,
            category: network.category,
        };
    }
}

export default Point;
