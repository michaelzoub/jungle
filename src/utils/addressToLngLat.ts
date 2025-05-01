export async function addressToLongLat(address: string) {
    try {
      const splitAddress = address.trim().split(/\s+/);
      const addressNumber = splitAddress[0];
      const street = splitAddress.slice(1).join(" ");
  
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?country=ca&address_number=${encodeURIComponent(addressNumber)}&street=${encodeURIComponent(street)}&place=Montreal&access_token=pk.eyJ1IjoibWljaGFlbHpvdWJrb2ZmIiwiYSI6ImNtMnBobzl6NjBzbnYybXByb2xuM2kzMTQifQ.RSHQO2_-m5bd15lQNxvvBA`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      const data = await response.json();
  
      if (!data.features || data.features.length === 0) {
        throw new Error("No location found.");
      }
  
      const coordinates = data.features[0].geometry.coordinates;
      return {
        longitude: coordinates[0],
        latitude: coordinates[1],
      };
    } catch (error) {
      console.error("Error in addressToLongLat:", error);
      return null;
    }
  }
  