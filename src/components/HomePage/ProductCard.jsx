import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Minus, Plus } from "lucide-react";
import NutriScore from "../ProductDetails/NutriScore";
import Nova from "../ProductDetails/Nova";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCount } from "@/redux/CartReducer/Cart";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
    const [data, setData] = useState([]);


    const trimText = (text) => {
        if (text.length > 30) {
            return text.slice(0, 35) + "...";
        }
        return text;
    };

    useEffect(() => {
        if (item.labels) {
            const labelData = item.labels.includes(",") ? item.labels.split(",") : [item.labels];
            if (labelData.length >= 2) {
                setData(labelData.slice(0, 2));
            } else {
                setData(labelData);
            }
        } else {
            setData([]);
        }
    }, [item.labels]);


    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart.cart)

    const upperCase = (str) => str.charAt(0).toUpperCase();

    return (
        <>
            {/* All this is done conditionally as all the details werent available so they were distorting the ui  */}
            {(item.image_url && item.product_name && item.labels) 
                && 
            <div 
                className="select-none w-[220px] mr-2 mt-2 rounded-[8px] border pb-3 cursor-pointer border-2 border-[white] hover:border-2 hover:border-[#078246] transition-shadow duration-300"
            >
                <Link
                    key={item.code}
                    to={`/product/${item.code}/price/${item.price}/discount/${item.discount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-inherit"
                >
                    <div 
                        className="w-[100%] flex items-center justify-center pt-2 pb-2 px-2 bg-[whitesmoke] rounded-t-[8px]"
                    >
                        <img src={item.image_url} className="h-[25vh] max-w-full rounded-[3px]" alt="Product" />
                    </div>
                    <div 
                        className="w-[100%] flex flex-col px-2 mt-1"
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <p
                                        className="font-[Inter] font-[500] text-[#383838] text-ellipsis overflow-hidden whitespace-nowrap text-[0.9rem]"
                                        title={item.product_name}
                                    >
                                        {item.product_name}
                                    </p>
                                    <p className="text-[0.8rem] font-[450] text-[gray]">
                                        Qty: {item.quantity ? item.quantity : "Not Specified"}
                                    </p>
                                    <TooltipContent className="cursor-default text-[0.6rem] font-medium py-1 px-2 font-[Inter] transition duration-200 ease-in-out">
                                        <p className="font-[Inter] text-[0.7rem]">{item.product_name}</p>
                                    </TooltipContent>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div 
                        className="w-[100%] px-3"
                    >
                        <p className="text-[#171717] font-[Inter] text-[0.65rem] text-ellipsis overflow-hidden whitespace-nowrap">
                            {trimText(`Categories: ${item.categories}`)}
                        </p>
                    </div>
                    <div 
                        className="flex justify-start"
                    >
                        <div className="pl-3 flex flex-wrap items-center gap-[0.2rem] mt-1">
                            {data.map((element) => (
                                <p
                                    key={nanoid()}
                                    className="text-[#171717] font-[Inter] text-[0.6rem] rounded-[20px] bg-[#FBF6E9] inline-flex px-1 py-0.5 text-[black] text-ellipsis overflow-hidden whitespace-nowrap"
                                    style={{ maxWidth: "100px" }}
                                >
                                    {element}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div 
                        className="w-[100%] px-3 py-1 flex items-center mt-1"
                    >
                        <p className="font-[Inter] font-[450] text-[#5c5c5c]">₹{item.discountedPrice}</p>
                        <div className="ml-auto flex items-center gap-[0.5rem]">
                            <div className="ml-auto">
                                <NutriScore
                                    score={`${upperCase(item.nutriscore_grade)}`}
                                    width={3}
                                    height={4}
                                />
                            </div>
                            <Nova
                                novaScore={item.nova_group ? item.nova_group : "Not Available"}
                                pd={"px-1 py-0.5"}
                                text={`text-[0.7rem]`}
                            />
                        </div>
                    </div>
                </Link>

                <div className="w-[100%] px-3 mt-2">
                    {cart.some((element)=>element.code==item.code) ?
                        <div className="w-[100%] flex items-center justify-center mt-1 gap-[0.5rem]">
                            <div 
                                className="px-1.5 py-1.5 bg-[#138B4F] cursor-pointer rounded-full"
                                onClick={()=>dispatch(decreaseCount(item))}
                            >
                                <Minus size={15} color="white"/>
                            </div>
                            <p className="flex justify-center border-2 px-5 items-center flex-1">{cart.find(element=>element.code===item.code)?.qty || 0 }</p>
                            <div 
                                className="px-1.5 py-1.5 bg-[#138B4F] cursor-pointer rounded-full"
                                onClick={()=>dispatch(addToCart(item))}
                            >
                                <Plus size={15} color="white"/>
                            </div>
                        </div>
                        :
                        <button 
                            className="w-[100%] bg-[#118B50] active:bg-[#0e7342] transition duration-150 ease-in-out py-1 flex items-center gap-[0.5rem] justify-center rounded-[3px] text-[white]"
                            onClick={()=>dispatch(addToCart(item))}
                        >
                            <Plus color="white" size={18} />
                            Add
                        </button>
                    }
                </div>
            </div>}
        </>
    );
};

ProductCard.propTypes = {
    item: PropTypes.object,
    getIdOfItem: PropTypes.func,
};

export default ProductCard;
