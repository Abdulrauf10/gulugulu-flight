import axios from "axios"

export type FlightFilter = {
  originSkyId: string
  destinationSkyId: string
  originEntityId: string
  destinationEntityId: string
  date: string
  returnDate?: string
  cabinClass: string
  adults: number
}

export const getAirPort = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/flights/searchAirport`,
      {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_API_HOST
        },
        params: { query: "new" }
      }
    )

    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

export const getFlights = async (filters: FlightFilter) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v2/flights/searchFlights`,
      {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_API_HOST
        },
        params: filters
      }
    )

    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}
