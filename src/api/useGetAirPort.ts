import { getAirPort } from "./flightApi"
import { useQuery } from "@tanstack/react-query"

export const useGetAirports = () => {
  return useQuery({
    queryKey: ["airports"],
    queryFn: getAirPort
  })
}
