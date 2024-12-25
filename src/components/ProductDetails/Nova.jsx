import PropTypes from "prop-types"

const Nova = ({novaScore, pd, text}) => {

    const novaScoreColors = {
        1: { 
            bg: "bg-green-500 text-black", 
            title: "Minimally Processed (Healthy)" 
        },
        2: { 
            bg: "bg-teal-400 text-black", 
            title: "Slightly Processed" 
        },
        3: { 
            bg: "bg-yellow-300 text-black", 
            title: "Moderately Processed" 
        },
        4: { 
            bg: "bg-orange-400 text-black", 
            title: "Heavily Processed" 
        },
        5: { 
            bg: "bg-red-600 text-white", 
            title: "Ultra-Processed (Unhealthy)" 
        },
    };
    

    return (
        <div 
            className={`w-[5] h-[10] ${pd} rounded-[3px] flex items-center flex-wrap gap-[0.3rem] ${novaScore!=='Not Available' ? (novaScore ? novaScoreColors[novaScore]?.bg : null) : (`bg-[#e0e0e0]`)}`}
            title={novaScore!=='Not Available' ? (novaScoreColors[novaScore]?.title) : "Unknown score"}
        >
            <p className={`text-[0.7rem] ${novaScoreColors[novaScore]?.text} ${text} font-[Inter] font-[400]`}>Nova - </p>
            <p className={`${novaScoreColors[novaScore]?.text}  ${text} text-[0.8rem] font-[Inter] font-[700]`}>{novaScore==="Not Available" ? "?" : novaScore}</p>
        </div>
    )
}

Nova.propTypes={
    pd : PropTypes.string,
    text : PropTypes.string,
}

Nova.default = {
    novaScore : 'Not Available'
}

export default Nova