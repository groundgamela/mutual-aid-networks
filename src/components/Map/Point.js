class Point {
    constructor(resource) {
        this.type = 'Feature';
        this.geometry = {
            coordinates: [Number(resource.lng), Number(resource.lat)],
            type: 'Point',
        };
        const scale = resource.bbox[3] - resource.bbox[1];
        this.properties = {
            region: resource.region,
            contact: resource.contact || null,
            socials: resource.social || null,
            website: resource.website || null,
            state: resource.state,
            city: resource.city,
            title: resource.title,
            generalForm: resource.generalForm,
            supportRequestForm: resource.supportRequestForm,
            supportOfferForm: resource.supportOfferForm,
            category: resource.category,
            bbox: resource.bbox,
            lat: resource.lat,
            lng: resource.lng,
            scale: scale * 10,
            hours: resource.hours || null,
            notes: resource.notes || "",
        };
        this.id = resource.id;
    }
}

export default Point;
