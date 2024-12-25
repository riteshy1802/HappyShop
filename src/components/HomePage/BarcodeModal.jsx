import axios from "axios";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { updateBarcode } from "@/redux/Barcode/Barcode";
import NutriScore from "../ProductDetails/NutriScore";
import Nova from "../ProductDetails/Nova";
import { Link } from "react-router-dom";

const BarcodeModal = ({ modalOpenFunction }) => {
    const barcodeInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [randomPrice, setRandomPrice] = useState(null);
    const [randomDiscount, setRandomDiscount] = useState(null);
    const [barcode, setBarcode] = useState(null);
    const [getProduct,setGetProduct] = useState(null);

    const dispatch = useDispatch();

    const fetchProductUsingBarcode = async () => {
        const barcodeInput = barcodeInputRef.current.value;
        try {
            setLoading(true);
            const { data } = await axios.get(
                `https://world.openfoodfacts.org/api/v2/product/${barcodeInput}?fields=product_name_en,nutriscore_grade,nova_group,`
            );

            if (data.status === 0) {
                toast.error("Product not Found! Please recheck your barcode number.");
                setLoading(false);
            } else {
                dispatch(updateBarcode(barcodeInput));
                setBarcode(barcodeInput);
                setRandomPrice(Math.floor(Math.random() * (500 - 100 + 1)) + 100);
                setRandomDiscount(Math.floor(Math.random() * (50 - 10 + 1)) + 10);
                setGetProduct(data.product);
                setLoading(false);
            }
        } catch (error) {
            toast.error("Some error occurred. Please retry!");
            console.log(error);
            setLoading(false);
        }
    };

    const upperCase = (str) => str.charAt(0).toUpperCase();

    const closeModalBarcode = () => {
        barcodeInputRef.current.value = "";
        modalOpenFunction();
        setGetProduct(null);
    }


    return (
        <div className="w-[20rem] px-5 py-3 rounded-[5px] shadow-sm bg-white border-2">
            <div className="flex items-center mb-1">
                <p className="mb-2 font-[Inter] text-[#171717] text-[0.9rem]">Search using Barcode</p>
                <div
                    className="ml-auto cursor-pointer rounded-[4px] border-2 hover:bg-[#ededed] transition duration-200 ease-in-out"
                    onClick={closeModalBarcode}
                >
                    <X size={15} color="#171717" />
                </div>
            </div>
            <div className="flex items-center gap-[2rem] w-[100%]">
                <input
                    ref={barcodeInputRef}
                    className="px-2 py-1 w-[100%] focus:outline-none font-[Inter] border rounded-[4px] text-[0.8rem] font-[Inter]"
                    placeholder="eg. 737628064502"
                />
            </div>
            <div className="w-[100%] flex justify-end">
                {loading ? (
                    <button
                        className="bg-[#71c99d] flex items-center justify-center gap-[0.5rem] font-[500] px-3 py-1 text-[white] text-[0.8rem] mt-2 ml-auto items-center justify-center rounded-[3px]"
                        disabled
                    >
                        <Spinner width={4} height={4} fillColor="red" />
                        <p>Finding</p>
                    </button>
                ) : (
                    <button
                        className="bg-[#118B50] hover:bg-[#0d7a46] flex items-center justify-center gap-[0.5rem] transition duration-200 ease-in-out font-[500] px-3 py-1 text-[white] text-[0.8rem] mt-2 ml-auto items-center justify-center rounded-[3px]"
                        onClick={fetchProductUsingBarcode}
                    >
                        <p>Find</p>
                    </button>
                )}
            </div>
            {getProduct &&
                <div>
                    <p className="mt-1 text-[0.9rem] font-[500] mb-1">Product found!</p>
                    <div className="bg-[whitesmoke] rounded-[5px] p-3 flex flex-col gap-[0.3rem]">
                        <div className="text-[0.8rem] font-[500] text-[#575757] flex items-center gap-[0.5rem]">
                            <p className="text-[0.8rem] font-[500] text-[#575757] flex items-center gap-[0.5rem]">
                                Product name :
                                <Link 
                                    to={`/product/${barcode}/price/${randomPrice}/discount/${randomDiscount}`} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="no-underline text-inherit"
                                >
                                    <span className="font-[500] hover:underline hover:text-[green] cursor-pointer text-[0.9rem] font-[400] text-[#171717]">
                                        {getProduct.product_name_en}
                                    </span>
                                </Link>
                            </p>
                        </div>
                        <p className="text-[0.8rem] font-[500] text-[#575757] flex items-center gap-[0.5rem]">NutriScore : 
                            <NutriScore
                                score={`${upperCase(getProduct?.nutriscore_grade)}`}
                                width={3}
                                height={2}
                            />
                        </p>
                        <p className="text-[0.8rem] font-[500] text-[#575757] flex inline-block gap-[0.4rem] mt-1">Nova : 
                            <Nova
                                novaScore={getProduct.nova_group ? getProduct.nova_group : "Not Available"}
                                pd={"px-1 py-0.5"}
                                text={`text-[0.7rem]`}
                            />
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

BarcodeModal.propTypes = {
    modalOpenFunction: PropTypes.func,
};

export default BarcodeModal;
