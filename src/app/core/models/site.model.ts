class LocationGeo{
    latitude: number;
    longtitude: number;
}

export class Site{
    objectId: string;
    name: string;
    phone: string;
    location: string;
    country: string;
    website: string; 
    email: string;
    postalCode: string;
    locationGeo: LocationGeo
    description: string;
}