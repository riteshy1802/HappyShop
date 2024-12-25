import PropTypes from "prop-types";

const NutriScore = ({ score, width, height }) => {
    const nutriScores = ["A", "B", "C", "D", "E"];
    const scoreColors = {
        A: "bg-green-500 text-white",
        B: "bg-lime-500 text-white",
        C: "bg-yellow-400 text-black",
        D: "bg-orange-400 text-white",
        E: "bg-red-500 text-white",
    };

    return (
        <div className="flex items-center rounded-md">
            <>
                {nutriScores.map((item) => (
                <div
                    key={item}
                    className={`w-${width} h-${height} p-2 p-2 flex items-center justify-center font-[500] transition-transform ${
                    scoreColors[item]
                    } ${item === score ? "scale-[1.15] shadow-md font-[700]" : "opacity-100"}`}
                    title={`Nutri-Score: ${item}`}
                >
                    {item}
                </div>
                ))}
            </>
        </div>
    );
};

NutriScore.propTypes={
    score : PropTypes.string,
    width : PropTypes.number,
    height : PropTypes.number,
}

export default NutriScore;