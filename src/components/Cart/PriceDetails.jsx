import { useRef, useState, useMemo } from "react"
import toast from "react-hot-toast";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useSelector } from "react-redux";

const DISCOUNT_PERCENTAGE = 7;
const COUPON_CODE = 'FA_NEW_YEAR_2024';

const PriceDetails = () => {
    const { width, height } = useWindowSize()
    const cart = useSelector((state) => state.cart.cart);
    const [couponApplied, setCouponApplied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const couponRef = useRef(null);

    const total = useMemo(() => {
        return cart.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.qty * currentValue.discountedPrice);
        }, 0);
    }, [cart]);

    const { discountAmount, grandTotal } = useMemo(() => {
        if (!couponApplied) return { discountAmount: 0, grandTotal: total };
        const discount = (total * DISCOUNT_PERCENTAGE / 100);
        return {
            discountAmount: parseFloat(discount.toFixed(2)),
            grandTotal: Math.floor(total - discount)
        };
    }, [total, couponApplied]);

    const applyCoupon = () => {
        const value = couponRef.current.value;
        if (!value) {
            toast("☹️ Please enter a coupon code!", {
                position: 'top-right'
            });
            return;
        }

        if (couponApplied) {
            toast(value === COUPON_CODE 
                ? "😀 Coupon already applied!" 
                : "Invalid Coupon Applied!", {
                position: 'top-right'
            });
            return;
        }

        if (value === COUPON_CODE) {
            toast.success("🎉 Coupon Applied Successfully", {
                position: 'top-right'
            });
            couponRef.current.value = "";
            setCouponApplied(true);
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
            }, 5000);
        } else {
            toast.error("Invalid Coupon Applied!", {
                position: 'top-right'
            });
        }
    };

    return (
        <>
            {showConfetti && <Confetti width={width} height={height} />}
            <div className="w-[30%] overflow-x-hidden">
                {cart.length>0 ? 
                    <>
                        <div className="w-[100%] px-4 py-3 border-2 border-[#f5f5f5] rounded-[6px] shadow-md">
                        <div className="w-[100%]">
                            <p className="font-[Inter] font-[700] text-[0.9rem] mb-3 text-[#858585]">PRICE DETAILS</p>
                            <hr/>
                        </div>
                        <div className="mt-3">
                            {cart?.map((item) => (
                                <div key={item.code} className="flex mt-2 mb-2 items-center justify-between gap-[2rem]">
                                    <p className="font-[Inter] text-[0.8rem] text-[#323333] font-[500]">
                                        {item.product_name}
                                        <span className="text-[gray]">(x{item.qty})</span>
                                    </p>
                                    <p className="font-[Inter] font-[500] text-[0.9rem] text-[#323333]">
                                        ₹{item.qty * item.discountedPrice}
                                    </p>
                                </div>
                            ))}
                            <hr className="mt-3"/>
                            <div className="w-[100%] flex mt-1 items-center justify-between gap-[2rem]">
                                <p className="font-[Inter] text-[0.8rem] text-[#323333] font-[600] text-[1rem]">
                                    {couponApplied ? "SubTotal" : "Total"}
                                </p>
                                <p className="ml-auto font-[Inter] font-[500] text-[0.9rem] mb-2 text-[#323333] mt-2">
                                    ₹{total}
                                </p>
                            </div>
                            {couponApplied && (
                                <>
                                    <div className="w-[100%] flex mt-1 items-center justify-between gap-[2rem]">
                                        <p className="font-[Inter] text-[0.8rem] text-[#323333] font-[550] text-[0.85rem]">
                                            Discount
                                        </p>
                                        <p className="ml-auto font-[Inter] font-[500] text-[0.9rem] mb-2 mt-2 text-[green]">
                                            <span className="text-[black]">-</span> ₹{discountAmount}
                                        </p>
                                    </div>
                                    <hr/>
                                    <div className="w-[100%] flex mt-1 items-center justify-between gap-[2rem]">
                                        <p className="font-[Inter] text-[0.8rem] text-[#323333] font-[600] text-[1rem]">
                                            Grand Total
                                        </p>
                                        <p className="ml-auto font-[Inter] font-[500] text-[0.9rem] mb-2 text-[#323333] mt-2">
                                            ₹{grandTotal}
                                        </p>
                                    </div>
                                    <div className="w-[100%] bg-[#E3F0AF] rounded-[5px] px-4 py-2">
                                        <p className="font-[Inter] text-[0.8rem] font-[500] text-[#363636]">
                                            🥳 You scored big—{DISCOUNT_PERCENTAGE}% savings on your purchase!
                                        </p>
                                    </div>
                                </>
                            )}
                            <div>
                                <button className="bg-[#0c7842] hover:bg-[#0d693b] active:bg-[#05592f] transition duration-200 ease-in-out mt-2 rounded-[3px] px-3 py-2 font-[Inter] font-[500] text-[whitesmoke] w-[100%]">
                                        Pay
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 bg-[white] px-4 py-3 rounded-[6px] border-2 border-[#f5f5f5] shadow-md">
                            <div>
                                <p className="font-[Inter] font-[700] text-[0.9rem] mb-1 text-[#858585]">Coupon</p>
                                <p className="text-[0.75rem] text-[gray]">Got a coupon? Save even more by entering it below!</p>
                            </div>
                            <div className="w-[100%] flex items-center mt-2 gap-[1rem]">
                                <input 
                                    placeholder="eg. AYE28ks"
                                    className="w-[80%] font-[Inter] indent-[2px] text-[0.85rem] px-2 py-1.5 border border-3-gray rounded-[6px] focus:outline-none"
                                    ref={couponRef}
                                />
                                <button 
                                    type="button" 
                                    className="w-[20%] font-[Inter] bg-[#138B4F] text-[white] px-3 py-2 rounded-[6px] hover:bg-[#166b41] active:scale-[0.97] active:bg-[#12633b] transition duration-200 ease-in-out text-[0.8rem]"
                                    onClick={applyCoupon}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 bg-[#095931] text-[whitesmoke] mt-3 rounded-[4px] px-4 py-3">
                            <p className="font-[Inter] text-[0.85rem]">
                                🥳 Kickstart 2024 with a Bang! Use code <span className="font-[700]">{COUPON_CODE}</span> and enjoy exclusive savings!
                            </p>
                        </div>
                    </>
                    :
                    <div className="w-[100%] px-4 py-3 border-2 border-[#f5f5f5] rounded-[6px]">
                        <div className="w-[100%]">
                            <p className="font-[Inter] font-[700] text-[0.9rem] mb-3 text-[#858585]">PRICE DETAILS</p>
                            <hr/>
                        </div>
                        <div className="flex p-4 items-center justify-center">
                            <p className="mt-2 font-[Inter] text-[1rem] text-[#171717] font-[500]">Add items to see the price details.</p>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default PriceDetails;