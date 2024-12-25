import Spinner from "./Spinner"

const LoadingPage = () => {
    return (
        <div className="flex items-center w-[100%] justify-center overflow-y-hidden pt-10">
            <Spinner
                width={12}
                height={12}
                fillColor="green"
            />
        </div>
    )
}

export default LoadingPage