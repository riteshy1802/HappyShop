import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import PriceDetails from "./PriceDetails";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import axios from "axios";
// import { updateBarcode } from "@/redux/Barcode/Barcode";
// import toast from "react-hot-toast";
import cartEmpty from "../../assets/CartEmpty/cartEmpty.png";

const Cart = () => {

    const navigate = useNavigate();
    const handleBackToShoppping = () => {
        navigate('/')
    }

    const cart = useSelector((state)=>state.cart.cart);

    useEffect(()=>{
        document.title = "Happy Shop :) | Cart"
    },[])

    const totalItems = (cartItems) => {
        // console.log(cartItems);
        const sum = cartItems.reduce((accumulator, currentValue)=>accumulator+currentValue.qty,0);
        return sum;
    }


    return (
        <div className="w-[100%] mt-20 px-6 py-3 mb-10 flex justify-center">
            <div className="w-[80%] flex items-start gap-[1rem]">
                <div className="w-[70%]">
                    {/* Heading */}
                    <div>
                        <div className="shadow-md rounded-[5px] pb-10">
                            <div className="w-[100%] bg-[#036E39] rounded-[5px] p-4 flex items-center">
                                <div className="w-[100] flex items-center">
                                    <div 
                                        className="p-1 bg-[#f7f7f7] border-2 mr-5 rounded-[5px] hover:bg-[#e0e0e0] transition duration-200 cursor-pointer"
                                        onClick={handleBackToShoppping}
                                    >
                                        <ArrowLeft size={18} color="#171717"/>
                                    </div>
                                    <p className="font-[550] text-[1.2rem] text-[whitesmoke] font-[Inter]">Shopping Cart</p>
                                </div>
                                <div className="ml-auto">
                                    <p className="font-[Inter] font-[450] text-[0.85rem] text-[whitesmoke]">Total items : {totalItems(cart)}</p>
                                </div>
                            </div>

                            {/* Product CartItems */}
                            {cart?.length>0 ?
                                    cart.map((item, index)=>(
                                    <div key={item.id} className="">
                                        <CartItem
                                            element={item}
                                        />
                                        {index!==cart.length-1 && 
                                            <div className="w-[100%] px-5">
                                            <hr className="mt-5"/>
                                        </div>}
                                    </div>
                                ))
                                :
                                <div className="flex flex-col items-center justify-center mt-10">
                                    <img src={cartEmpty} className="w-[35%] select-none" draggable={false} alt="No cart Items"/>
                                    <p className="font-[Inter] text-[1.2rem] font-[550] text-[#696969] mt-5">Find Something You Love to Add Here.</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <PriceDetails/>
            </div>
        </div>
    )
}

export default Cart