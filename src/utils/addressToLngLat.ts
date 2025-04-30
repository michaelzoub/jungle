

export async function addressToLongLat(address: string) {

    //sanitate address:
    const splitAddress = address.split(" ");

    const addressArray= [splitAddress[0]];
    const streetNameArray = [];

    for (let i = 1; i < splitAddress.length; i++) {
        streetNameArray.push(splitAddress[i]);
    }
    addressArray.push(streetNameArray.join());

    //no postal code for now

    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?country=ca&address_number=${Number(addressArray[0])}&street=${addressArray[1]}&place=Montreal&access_token=pk.eyJ1IjoibWljaGFlbHpvdWJrb2ZmIiwiYSI6ImNtMnBobzl6NjBzbnYybXByb2xuM2kzMTQifQ.RSHQO2_-m5bd15lQNxvvBA`)
}