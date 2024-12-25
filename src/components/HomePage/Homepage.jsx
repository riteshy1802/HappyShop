import { useState } from "react";
import FilterSection from "./FilterSection"
import ProductsPage from "./ProductsPage"

const Homepage = () => {
        const [mainLoading, setMainLoading] = useState(true);
    
    return (
        <div className="flex w-[100%] mt-20 items-center justify-center gap-[3rem]">
            <div className="w-[100%] h-auto relative flex px-2">
                <div className="w-[20%] top-0 mt-20 fixed overflow-default"> 
                    <FilterSection
                        setMainLoading={setMainLoading}
                        mainLoading={mainLoading}
                    />
                </div>
                <div className=" ml-[20%] w-[85%] pb-5">
                    <ProductsPage
                        setMainLoading={setMainLoading}
                        mainLoading={mainLoading}
                    />
                </div>
            </div>
        </div>
    )
}
// 🎉 New Year, New Deals! Enjoy a Flat 30% OFF on All Your Favorites 🛍️ Hurry, Offer Ends Soon!
export default Homepage