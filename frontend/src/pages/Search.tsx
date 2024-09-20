import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContexts"
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search=()=>{
    const search=useSearchContext();
    const [page,setPage]=useState<number>(1)
    const [SelectedStars,setSelectedStars]=useState<string[]>([])
    const [SelectedHotelTypes,setSelectedHotelTypes]=useState<string[]>([])
    const [SelectedFacilities,setSelectedFacilities]=useState<string[]>([])
    const [SelectedPrice,setSelectedPrice]=useState<number | undefined>();
    const [sortOption,setSortOption]=useState<string>("");

   const SearchParams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        stars:SelectedStars,
        types:SelectedHotelTypes,
        facilities:SelectedFacilities,
        maxPrice:SelectedPrice?.toString(),
        sortOption,
      }
      


    const {data:hotelData}=useQuery(["searchHotels",SearchParams],()=>apiClient.searchHotels(SearchParams));
    console.log(search);
    const handleStarsChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
     const starRating=event.target.value;

     setSelectedStars((prevStars)=> event.target.checked ? [...prevStars,starRating]:prevStars.filter((star)=>star !==starRating));
    };
    const handleHotelTypeChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const hotelType=event.target.value;
   
        setSelectedHotelTypes((prevHotelTypes)=> event.target.checked ? [...prevHotelTypes,hotelType]:prevHotelTypes.filter((hotelTypee)=>hotelTypee !==hotelType));
       };
       const handleFacilityChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const facility=event.target.value;
   
        setSelectedFacilities((prevFacilities)=> event.target.checked ? [...prevFacilities,facility]:prevFacilities.filter((prevFacility)=>prevFacility !==facility));
       };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
                    <StarRatingFilter selectedStars={SelectedStars} onChange={handleStarsChange}/>
                    <HotelTypesFilter selectedHotelTypes={SelectedHotelTypes} onChange={handleHotelTypeChange}/>
                    <FacilitiesFilter selectedFacilities={SelectedFacilities} onChange={handleFacilityChange}/>
                    <PriceFilter selectedPrice={SelectedPrice} onChange={(value?:number)=>setSelectedPrice(value)}/>
                </div>
            </div>
             <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{hotelData?.pagination.total}Hotels found
                        {search.destination ?`in ${search.destination}`:""}
                    </span>
                <select value={sortOption} onChange={(event)=>setSortOption(event.target.value)}
                    className="p-2 border-rounded-md  ">
                       <option value="">Sort By </option>
                       <option value="starRating">Star Rating </option>
                       <option value="pricePerNightAsc">Price Per Night(low to high) </option>
                       <option value="pricePerNightDesc">Price Per Night(high to low) </option>
                       </select>

                </div>
                {hotelData?.data.map((hotel)=>(
                    <SearchResultsCard hotel={hotel}/>
                ))}
                <div><Pagination page={hotelData?.pagination.page || 1}
                 pages={hotelData?.pagination.page || 1}
                onPageChange={(page)=>setPage(page)}/></div>
             </div>
        </div>
    )
};
export default Search;