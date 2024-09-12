import React, { useContext, useState } from "react";

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
    const [destination,setDestination]=useState<string>("");
    const [checkIn,setCheckIn]=useState<Date>(new Date());
    const [checkOut,setCheckout]=useState<Date>(new Date());
    const [adultCount,setAdultCount]=useState<number>(1);
    const [childCount,setChildCount]=useState<number>(0);
    const [hotelId,setHotelId]=useState<string>("");

    const saveSearchValues=(destination: string, checkIn: Date, checkOut: Date, adultCount: number,childCount: number, hotelId ?: string )=>{
            setDestination(destination);
            setCheckIn(checkIn);
            setCheckout(checkOut);
            setChildCount(childCount);
            setAdultCount(adultCount);
            if(hotelId){
                setHotelId(hotelId)
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