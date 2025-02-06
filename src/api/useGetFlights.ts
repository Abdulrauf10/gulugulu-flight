import { useQuery } from "@tanstack/react-query"
import { getFlights } from "./flightApi"

export const useGetFlights = (filters: any) => {
  const isEnabled =
    filters.originSkyId.trim() !== "" &&
    filters.destinationSkyId.trim() !== "" &&
    filters.originEntityId.trim() !== "" &&
    filters.destinationEntityId.trim() !== "" &&
    filters.date.trim() !== "" &&
    filters.cabinClass.trim() !== "" &&
    filters.adults > 0

  return useQuery({
    queryKey: ["flights", filters],
    queryFn: () => getFlights(filters),
    enabled: isEnabled
  })
}
