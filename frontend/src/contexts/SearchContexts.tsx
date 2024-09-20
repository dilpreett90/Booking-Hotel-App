import React, { useContext, useState } from "react";
import { newDate } from "react-datepicker/dist/date_utils";

type SearchContext ={
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchValues:(destination: string, checkIn: Date, checkOut: Date, adultCount: number,childCount: number, hotelId?: string)=>void;
};

type SeacrhContextProviderProps={
    children: React.ReactNode;
}


const SearchContext=React.createContext<SearchContext|undefined>(undefined);


export const SearchContextProvider=({children}:SeacrhContextProviderProps)=>{
    const [destination,setDestination]=useState<string>(()=>sessionStorage.getItem("destination") || "");
    const [checkIn,setCheckIn]=useState<Date>(()=>new Date(sessionStorage.getItem("checkIn") || newDate().toISOString()));
    const [checkOut,setCheckout]=useState<Date>(()=>new Date(sessionStorage.getItem("checkOut") || newDate().toISOString()));
    const [adultCount,setAdultCount]=useState<number>(()=>parseInt(sessionStorage.getItem("adultCount") || "1"));
    const [childCount,setChildCount]=useState<number>(()=>parseInt(sessionStorage.getItem("childCount") || "1"));
    const [hotelId,setHotelId]=useState<string>(()=>sessionStorage.getItem("hotelID") || "");

    const saveSearchValues=(destination: string, checkIn: Date, checkOut: Date, adultCount: number,childCount: number, hotelId ?: string )=>{
            setDestination(destination);
            setCheckIn(checkIn);
            setCheckout(checkOut);
            setChildCount(childCount);
            setAdultCount(adultCount);
            if(hotelId){
                setHotelId(hotelId)
            }
            sessionStorage.setItem("destination",destination);
            sessionStorage.setItem("checkIn",checkIn.toISOString());
            sessionStorage.setItem("checkOut",checkOut.toISOString());
            sessionStorage.setItem("adultCount",adultCount.toString());
            sessionStorage.setItem("childCount",childCount.toString());

            if(hotelId){
                sessionStorage.setItem("hotelId",hotelId);
            }
    }
    
    return(
        <SearchContext.Provider value={{
            destination,checkIn,checkOut,adultCount,childCount,hotelId,saveSearchValues
        }}>
            {children}
        </SearchContext.Provider>
    )
}



export const useSearchContext=()=>{
    const context=useContext(SearchContext)
    return context as SearchContext;
}