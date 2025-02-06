import React, { useEffect, useState } from "react"
import { useThemeMode } from "./ThemeContex"
import BedtimeIcon from "@mui/icons-material/Bedtime"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { Person, CompareArrows } from "@mui/icons-material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { FlightFilter } from "./api/flightApi"
import { Autocomplete, Skeleton, TextField } from "@mui/material"
import { useGetAirports } from "./api/useGetAirPort"
import { useGetFlights } from "./api/useGetFlights"

const App: React.FC = () => {
  const [filters, setFilters] = useState<FlightFilter>({
    originSkyId: "",
    destinationSkyId: "",
    originEntityId: "",
    destinationEntityId: "",
    date: "",
    returnDate: "",
    cabinClass: "",
    adults: 1
  })
  const [trip, setTrip] = useState<string>("Round trip")

  const { toggleTheme, mode } = useThemeMode()
  const cabinOptions = [
    { label: "Economy", value: "economy" },
    { label: "Business", value: "business" },
    { label: "First class", value: "first" }
  ]

  const { data } = useGetAirports()
  const { data: dataFlights, isLoading } = useGetFlights(filters)

  interface AirportOption {
    name: string
    origin: string
    id: string
  }

  const airPortOptions: AirportOption[] =
    data?.data?.map((data: any) => ({
      name: data?.navigation?.relevantFlightParams?.localizedName,
      origin: data?.navigation?.relevantFlightParams?.skyId,
      id: data?.navigation?.relevantFlightParams?.entityId
    })) || []

  useEffect(() => {
    console.log("filters updated:", filters)
  }, [filters])

  return (
    <div
      className={`min-h-screen w-full ${
        mode === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      } `}
    >
      <header
        className={`flex justify-between p-[15px] text-white text-center items-center border-b-1 ${
          mode === "light" ? "border-b-[#DBDCE0]" : "border-b-[#5F6368]"
        }`}
      >
        <div className="flex items-center gap-1 ml-[30px]">
          <img src="/src/assets/gulugulu.png" width={"50px"} alt="" />
          <h1 className={`${mode === "light" ? "text-black" : "text-white"}`}>
            GuluGulu Flight
          </h1>
        </div>

        <div className=" mr-[30px]">
          <button
            className={`shadow-md cursor-pointer ${
              mode === "light"
                ? "bg-white text-black"
                : "bg-gray-900 text-white"
            }`}
            onClick={toggleTheme}
          >
            {mode === "light" ? <WbSunnyIcon /> : <BedtimeIcon />}
          </button>
        </div>
      </header>
      <div
        className="h-fit bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `${
            mode === "light"
              ? "url('/src/assets/light-theme.png')"
              : "url('/src/assets/dark-theme.png')"
          }`
        }}
      >
        <p
          className={` flex justify-center lg:pt-[235px]  lg:text-[35px] md:pt-[125px] text-[20px] pt-[50px] ${
            mode === "light" ? "text-black" : "text-white"
          }`}
        >
          I believe i can fly
        </p>
      </div>

      <main className="w-full flex flex-col items-center ">
        <div
          className={`w-[90%] lg:w-[80%] flex flex-col justify-start p-[10px] rounded-lg shadow-lg gap-2 mt-[20px]  ${
            mode === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <div className="flex items-center lg:justify-start justify-center gap-2 mb-[10px]">
            <div className="flex items-center gap-1">
              <CompareArrows fontSize="small" />
              <Select
                value={trip}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className={`border border-gray-300 lg:w-[150px] w-[90px] h-[45px] rounded-md p-1 outline-none focus:ring-2 focus:ring-blue-500 ${
                  mode === "light" ? "border-b-[#DBDCE0]" : "border-b-[#5F6368]"
                }`}
                onChange={(event: SelectChangeEvent) => {
                  setTrip(event.target.value)
                }}
              >
                <MenuItem value={"One way"}>One way</MenuItem>
                <MenuItem value={"Round trip"}>Round trip</MenuItem>
              </Select>
            </div>

            <div className="flex items-center gap-1">
              <Person fontSize="small" />
              <input
                className={`border border-gray-300 lg:w-[50px] w-[40px] h-[45px] rounded-md p-1 outline-none focus:ring-2 focus:ring-blue-500 ${
                  mode === "light" ? "border-[#DBDCE0]" : "border-[#5F6368]"
                }`}
                type="number"
                value={filters.adults}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    adults: Number(e.target.value)
                  }))
                }
              />
            </div>

            <div className="flex items-center gap-1">
              <Autocomplete
                freeSolo
                options={cabinOptions}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.label
                }
                value={
                  cabinOptions.find(
                    (opt) => opt.value === filters.cabinClass
                  ) ||
                  filters.cabinClass ||
                  null
                }
                onChange={(_, newValue: any) => {
                  setFilters((prev) => ({
                    ...prev,
                    cabinClass: newValue ? newValue.value : ""
                  }))
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    sx={{
                      width: "95px",
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        border:
                          mode === "light"
                            ? "1px solid #DBDCE0"
                            : "1px solid #5F6368",
                        "&.Mui-focused": {
                          borderColor: "#007BFF",
                          boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)"
                        }
                      },
                      "& .MuiInputBase-input": {
                        height: "45px",
                        padding: "10px"
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-2">
            <div className="flex gap-2 ">
              <Autocomplete
                freeSolo
                options={airPortOptions}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  airPortOptions.find(
                    (opt) => opt.origin === filters.originSkyId
                  ) ||
                  filters.originSkyId ||
                  null
                }
                onChange={(_, newValue: any) => {
                  setFilters((prev) => ({
                    ...prev,
                    originSkyId: newValue ? newValue.origin : "",
                    originEntityId: newValue ? newValue.id : ""
                  }))
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="From"
                    sx={{
                      width: "100%",
                      minWidth: "150px",
                      maxWidth: "550px",
                      "@media (max-width: 768px)": { width: "100%" },
                      "@media (min-width: 1024px)": { width: "300px" },
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        border:
                          mode === "light"
                            ? "1px solid #DBDCE0"
                            : "1px solid #5F6368",
                        "&.Mui-focused": {
                          borderColor: "#007BFF",
                          boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)"
                        }
                      },
                      "& .MuiInputBase-input": {
                        height: "45px",
                        padding: "10px"
                      }
                    }}
                  />
                )}
              />

              <Autocomplete
                freeSolo
                options={airPortOptions}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  airPortOptions.find(
                    (opt) => opt.origin === filters.destinationSkyId
                  ) ||
                  filters.destinationSkyId ||
                  null
                }
                onChange={(_, newValue: any) => {
                  setFilters((prev) => ({
                    ...prev,
                    destinationSkyId: newValue ? newValue.origin : "",
                    destinationEntityId: newValue ? newValue.id : ""
                  }))
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="To"
                    sx={{
                      width: "100%",
                      minWidth: "150px",
                      maxWidth: "550px",
                      "@media (max-width: 768px)": { width: "100%" },
                      "@media (min-width: 1024px)": { width: "300px" },
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        border:
                          mode === "light"
                            ? "1px solid #DBDCE0"
                            : "1px solid #5F6368",
                        "&.Mui-focused": {
                          borderColor: "#007BFF",
                          boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)"
                        }
                      },
                      "& .MuiInputBase-input": {
                        height: "45px",
                        padding: "10px"
                      }
                    }}
                  />
                )}
              />
            </div>

            <div className="flex gap-2 ">
              <input
                className={`border border-gray-300 lg:w-[250px] w-[150px] h-[45px] rounded-md p-1 outline-none focus:ring-2 focus:ring-blue-500 ${
                  mode === "light" ? "border-[#DBDCE0]" : "border-[#5F6368]"
                }`}
                type="date"
                value={filters.date}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    date: e.target.value
                  }))
                }
              />

              {trip === "Round trip" && (
                <input
                  className={`border border-gray-300 lg:w-[250px] w-[150px] h-[45px] rounded-md p-1 outline-none focus:ring-2 focus:ring-blue-500 ${
                    mode === "light" ? "border-[#DBDCE0]" : "border-[#5F6368]"
                  }`}
                  type="date"
                  value={filters.returnDate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      returnDate: e.target.value
                    }))
                  }
                />
              )}
            </div>
          </div>
        </div>

        <div className={`mt-[25px] w-[90%] lg:w-[80%] `}>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton
                variant="rectangular"
                height={80}
                className={`w-full ${
                  mode === "light" ? "border-[#DBDCE0]" : "border-[#5F6368]"
                }`}
              />
              <Skeleton
                variant="rectangular"
                height={80}
                className={`w-full ${
                  mode === "light" ? "border-[#DBDCE0]" : "border-[#5F6368]"
                }`}
              />
              <Skeleton
                variant="rectangular"
                height={80}
                className={`w-full ${
                  mode === "light" ? "border-[#DBDCE0]" : "border-[#5F6368]"
                }`}
              />
            </div>
          ) : dataFlights?.data?.itineraries?.length ? (
            dataFlights.data.itineraries.map((itinerary: any) => (
              <div
                key={itinerary.id}
                className={`flex flex-col lg:flex-row justify-between items-center border rounded-md p-4 shadow hover:shadow-lg transition-shadow ${
                  mode === "light" ? "border-[#DBDCE0]" : "border-[#5F6368]"
                }`}
              >
                <div className="w-full lg:w-3/4">
                  {itinerary.legs.map((leg: any, index: number) => (
                    <div key={leg.id} className="flex items-center mb-2">
                      <div className="flex-1">
                        <div className="font-bold text-lg">
                          {typeof leg.origin === "object"
                            ? leg.origin.name
                            : leg.origin}{" "}
                          &rarr;{" "}
                          {typeof leg.destination === "object"
                            ? leg.destination.name
                            : leg.destination}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(leg.departure).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}{" "}
                          -{" "}
                          {new Date(leg.arrival).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                          {leg.durationInMinutes && (
                            <span className="ml-2">
                              ({Math.floor(leg.durationInMinutes / 60)}h{" "}
                              {leg.durationInMinutes % 60}m)
                            </span>
                          )}
                        </div>
                      </div>
                      {index < itinerary.legs.length - 1 && (
                        <div className="mx-4 text-xs text-gray-500 uppercase">
                          Stop
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-full lg:w-1/4 text-right mt-2 lg:mt-0">
                  <div className="text-xl font-bold">
                    {itinerary.price.formatted}
                  </div>
                  {itinerary.tags && itinerary.tags.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {itinerary.tags.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={`${mode === "light" ? "text-black" : "text-white"}`}>
              No flights available.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
