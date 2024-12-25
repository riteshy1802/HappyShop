import { Check, ChevronsUpDown, Filter, RotateCcw, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateAllergensIfChanged, updateCategoryIfAdded } from "@/redux/Categories/Category";
import toast from "react-hot-toast";
import Dropdown from "./Dropdown";
import { updateFilters } from "@/redux/Filter/Filter";
import { updateCategoryBasedFetching } from "@/redux/CategoryBasedFetching/CategoryBasedFetching";
import PropTypes from "prop-types";
import { compiledFunctionFilter } from "../Filters/CompiledFilters";
import { updateTempoState } from "@/redux/TempoState/TempoState";

const FilterSection = ({setMainLoading}) => {
    const [value, setValue] = useState("Shuffled");
    const [selectedItems, setSelectedItems] = useState([]);



    const dispatch = useDispatch();
    const categories = useSelector((state)=>state.category.category);
    const allergies = useSelector((state)=>state.category.allergens);

    useEffect(() => {
        const fetchData = async () => {
            const fromStorageCategories = JSON.parse(localStorage.getItem("categories"));
            if (!fromStorageCategories) {
                await fetchCategories(); 
            } else {
                dispatch(updateCategoryIfAdded(fromStorageCategories));
            }
    
            const fromStorageAllergens = JSON.parse(localStorage.getItem("allergens"));
            if (!fromStorageAllergens) {
                await fetchAllergens();
            } else {
                dispatch(updateAllergensIfChanged(fromStorageAllergens));
            }
        };
    
        fetchData();
    }, []);
    
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://world.openfoodfacts.org/categories.json');
            const data = response.data.tags;
            const newData = [{ id: 'en:Shuffled', known: '1', name: 'Shuffled', products: '-', url: '-' }, ...data];
            // console.log("Fetched Categories:", newData);
            localStorage.setItem("categories", JSON.stringify(newData));
            dispatch(updateCategoryIfAdded(newData));
        } catch (error) {
            toast.error("Error occurred while fetching categories.", {
                position: 'top-right',
            });
            console.error(error);
        }
    };
    
    const fetchAllergens = async () => {
        try {
            const response = await axios.get('https://world.openfoodfacts.org/allergens.json');
            const data = response.data.tags;
            // console.log("Fetched Allergens:", data);
            localStorage.setItem("allergens", JSON.stringify(data));
            dispatch(updateAllergensIfChanged(data));
        } catch (error) {
            toast.error("Error occurred while fetching allergens.", {
                position: 'top-right',
            });
            console.error(error);
        }
    };
    const removeHyphens = (str) => {
        const withoutHyphens = str.replace(/-/g, " ");
        return withoutHyphens;
    }

    const handleAllergenDelete = (id) => {
        const allergies = filters.allergicItems;
        const updatedAllergens = allergies.filter((item)=>item.id !== id);
        dispatch(updateFilters({key:"allergicItems", value:updatedAllergens}))
        setSelectedItems((prev) => prev.filter((selectedId) => selectedId !== id));
    };
    

    const removecolonsCapitalize = (str) => {
        const stringWithoutColons = str.replace(/:/g, ' ');
        const capitalize = stringWithoutColons.charAt(0).toUpperCase()+stringWithoutColons.slice(1)
        return capitalize;
    }

    const filters = useSelector((state)=>state.filters);
    const [open, setOpen] = useState(false);
    const resetAllFilters = () => {
        // console.log("Resetting all filters..");
        setValue("Shuffled")
        dispatch(updateFilters({key:"category", value:"Shuffled"}))
        dispatch(updateFilters({key:"sortBy", value:"random"}))
        dispatch(updateFilters({key:"nutriGrade", value:"default"}))
        dispatch(updateFilters({key:"energy", value:"default"}))
        dispatch(updateFilters({key:"allergicItems", value:[]}))
        dispatch(updateCategoryBasedFetching([]));
    }

    const handleChangeInFilters = (field, value) => {
        if(Array.isArray(value)){
            const newAllergens = [...filters.allergicItems, ...value];
            dispatch(updateFilters({key:field, value:newAllergens}))
        }else if(typeof(value)==="string"){
            dispatch(updateFilters({key:field, value:value}))
        }
    }

    const CategoryBasedFetching = useSelector((state)=>state.categoryBasedFetching.categoryBasedFetching);

    useEffect(() => {
        const fetchByCategory = async () => {
            try {
                setMainLoading(true);
                // console.log('Filters:', filters);
                
                if (filters.category !== 'Shuffled') {
                    const categ = filters.category;
                    // console.log(categ);
                    const url = `https://world.openfoodfacts.org/category/${categ}.json`;
                    const response = await axios.get(url, {
                        params: {
                            page_size: 100,
                            fields: 'product_name_en,product_name,brands,nutriscore_grade,nova_group,code,ingredients_tags,nutriments,image_url,image_packaging_url,image_nutrition_url,image_ingredients_url,labels,categories,quantity,allergens_tags',
                        },
                    });
    
                    // console.log('Fetched products:', response.data.products);
                    const shuffledProducts = response.data.products
                        .sort(() => Math.random() - 0.5)
                        .map((product) => {
                            const randomDiscount = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
                            const randomPrice = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
                            const discountedPrice = Math.floor(randomPrice - (randomPrice * randomDiscount) / 100);
                            return {
                                ...product,
                                price: randomPrice,
                                discount: randomDiscount,
                                discountedPrice,
                                qty: 0,
                            };
                        });
    
                    // console.log('Shuffled products:', shuffledProducts);
    
                    const filteredProducts = compiledFunctionFilter(shuffledProducts, filters);
                    // console.log('Filtered products:', filteredProducts);
    
                    dispatch(updateCategoryBasedFetching(filteredProducts));
                    dispatch(updateTempoState(filteredProducts));
                    setMainLoading(false);
                } else {
                    dispatch(updateCategoryBasedFetching([]));
                    setMainLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setMainLoading(false);
            }
        };
    
        fetchByCategory();
    }, [filters.category]);    


    useEffect(()=>{
        //we listen for the change in the category if there is a change we will change the local state and then the local state will be making a fetch and then we pass it through a bunch of sorting functions and then set the reduc state and the data will be accordingly populated on the screen : 
        const newData = compiledFunctionFilter(CategoryBasedFetching, filters);
        // console.log("Categorical data : ", CategoryBasedFetching);
        // console.log("New data : ", newData);
        dispatch(updateTempoState(newData));
    },[filters])

    return (
        <div className="min-h-[90vh] border-r-2 h-auto ml-* py-2 px-4 sticky top-[6rem] left-0 overflow-y-auto">
            <div className="flex items-center w-[100%]">
                <p className="font-[Inter] text-[0.9rem] text-[#2e2e2e] font-[500] underline decoration-[#118B50] flex items-center decoration-[1.5px] gap-[0.4rem]">
                    <Filter
                        size={15}
                    />
                    Filters
                </p>
                <div className="ml-auto flex items-center gap-[0.4rem]">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div 
                                    className="p-2 flex ml-auto bg-[#f2f2f2] hover:bg-[#c9c9c9] active:rotate-[-30deg] transition duration-100 ease-in-out cursor-pointer rounded-full"
                                    onClick={()=>resetAllFilters()}
                                >
                                    <RotateCcw size={15} color="#383838"/>
                                </div>
                                <TooltipContent 
                                    className="cursor-default text-[0.6rem] font-medium py-1 px-2 font-[Inter] transition duration-200 ease-in-out"
                                >
                                    <p>Reset all changes</p>
                                </TooltipContent>
                            </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="mt-4">
                <div className="mt-2">
                    <p className="font-[Inter] text-[gray] mb-1 text-[0.7rem]">Category</p>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[100%] font-[Inter] text-[0.83rem]"
                            >
                                <p className="w-[90%] flex items-start text-ellipsis whitespace-nowrap overflow-hidden">
                                {value
                                    ? categories.find((category) => category.name === value)?.name
                                    : "Shuffled"}
                                </p>
                            <ChevronsUpDown className="ml-1 h-2 w-2 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[100%] p-0">
                            <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandList>
                                <CommandEmpty>No category found.</CommandEmpty>
                                <CommandGroup>
                                {categories.map((category) => (
                                    <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue)
                                        handleChangeInFilters("category", currentValue);
                                        setOpen(false);
                                    }}
                                    >
                                    <Check
                                        className={cn(
                                        "h-3 w-3",
                                        value === category.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {removeHyphens(category.name)}
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                            </Command>
                        </PopoverContent>
                        </Popover>

                    {/* Sort Functionality */}
                    <div className="mt-3">
                        <p className="font-[Inter] text-[gray] mb-1 text-[0.7rem]">Sort By</p>
                        <Select value={filters.sortBy} onValueChange={(value)=>handleChangeInFilters("sortBy", value)}>
                            <SelectTrigger className="w-[100%] h-8 font-[Inter] text-[0.8rem]">
                                <SelectValue placeholder="Random"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem className="text-[0.8rem]" value="random">Random</SelectItem>
                                    <SelectItem className="text-[0.8rem]" value="a-z">A-Z</SelectItem>
                                    <SelectItem className="text-[0.8rem]" value="z-a">Z-A</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Nutrition grade */}
                    <div className="mt-3">
                        <p className="font-[Inter] text-[gray] mb-1 text-[0.7rem]">Nutrition grade</p>
                        <Select value={filters.nutriGrade} onValueChange={(value)=>handleChangeInFilters("nutriGrade", value)}>
                            <SelectTrigger className="w-[100%] h-8 font-[Inter] text-[0.8rem]">
                                <SelectValue placeholder="Default" defaultValue="default"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem className="text-[0.8rem]" value="default">Default</SelectItem>
                                    <SelectItem className="text-[0.8rem]" value="asc">Ascending</SelectItem>
                                    <SelectItem className="text-[0.8rem]" value="desc">Descending</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Energy Inputs */}
                    <div className="mt-3">
                        <p className="font-[Inter] text-[gray] mb-1 text-[0.7rem]">Energy(Calories)</p>
                        <Select value={filters.energy} onValueChange={(value)=>handleChangeInFilters("energy", value)}>
                            <SelectTrigger className="w-[100%] h-8 font-[Inter] text-[0.8rem]">
                                <SelectValue placeholder="Default" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem className="text-[0.8rem]" value="default">Default</SelectItem>
                                    <SelectItem className="text-[0.8rem]" value="inc">Increasing</SelectItem>
                                    <SelectItem className="text-[0.8rem]" value="dec">Decreasing</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mt-3  w-[100%] h-auto">
                        <p className="font-[Inter] text-[gray] mb-1 text-[0.7rem]">Allergic To</p>
                        <div>
                            <Dropdown
                                elements={allergies}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                            />                        
                        </div>
                        <div className="mt-2 py-2 rounded-[4px] px-2 bg-[#f5f5f5] flex flex-wrap items-center gap-[0.5rem]">
                            {filters.allergicItems.length>0 ? filters.allergicItems.map(({id,name})=>(
                                <div key={id} className="px-2.5 py-0.5 bg-[#c7eadd]  rounded-[10px] inline-flex items-center justify-between gap-[0.2rem]">
                                    <p className="text-[0.8rem] w-[90%]">{removecolonsCapitalize(name)}</p>
                                    <X 
                                        size={12} 
                                        className="cursor-pointer"
                                        onClick={()=>handleAllergenDelete(id)}
                                    /> 
                                </div>
                            ))
                            :
                                <div className="w-[100%] flex items-center justify-center">
                                    <p className="text-[#171717] font-[450] text-[0.8rem] font-[Inter]">No Allergens Specified</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
FilterSection.propTypes={
    mainLoading:PropTypes.bool,
    setMainLoading:PropTypes.func,
}

export default FilterSection
