export const __APIPath = {
    register: {
        signup: "account/register/",
        signin: "account/login/"
    },
    account: {
        profile: "account/profile/"
    },
    map: {
        nearby: "location/get_locations/",
        details: "location/location_detail/",
        myLandscapes: "location/creator_locations/",
        categories: "location/getCategory/",
        searchByName: "location/search_by_name/",
    },
    location: {
        create: "location/create/",
        update: "location/creator_locations/"
    },
    hichhike: {
        driverTravels: "hichhike/list/",
        create: 'hichhike/create/',
        timeLine: "hichhike/suggest_hichhike/",
        update: "hichhike/list/",
        myTravels: "hichhike/my_travels/",
        passengerAccepted: "hichhike/my_passengers/",
        join:"hichhike/passenger_joinrequest/",
        passengerPending: "hichhike/driver_joinrequest/"
    }
};
