import { ShoppingCart } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import avatar from "../../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import happyLogo from "../../assets/happy.png"
import { useSelector } from "react-redux";

const Navbar = () => {

    const navigate = useNavigate();
    const cart = useSelector((state)=>state.cart.cart);
    const goToHome = () => {
        if(window.location.pathname!=='/'){
            navigate('/')
        }
    }


    return (
        <div className="w-full text-white bg-[#046e39] py-3 rounded-b-[5px] z-[9] fixed top-0 left-0">
            <div className="w-[98%] px-2 mx-auto flex items-center justify-between">
                <div className="flex">
                    <img src={happyLogo} onClick={goToHome} className="w-[15%] cursor-pointer" />
                </div>
                <div className="avatar--cart flex items-center gap-[1.5rem]">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <img src={avatar} className="w-12 h-12 rounded-full cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent className="cursor-default text-[0.6rem] font-medium py-1 px-2 font-[Inter] transition duration-200 ease-in-out">
                                <p>Profile</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    to={'/cart'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="no-underline text-inherit"
                                >
                                    <div 
                                        className="bg-[#2c7a5d] p-2 flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-[#3b8a6b] transition duration-200 ease-in-out relative"
                                    >
                                        <ShoppingCart />
                                        {cart.length>0 && <p className="absolute px-1 right-0 bottom-0 bg-red-500 rounded-full text-[0.6rem]">{cart.length}</p>}
                                    </div>
                                    <TooltipContent className="cursor-default text-[0.6rem] font-medium py-1 px-2 font-[Inter] transition duration-200 ease-in-out">
                                        <p>Show Cart</p>
                                    </TooltipContent>
                                </Link>
                            </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
