import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "@/redux/Filter/Filter";
const Dropdown = ({elements, selectedItems, setSelectedItems}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const popupRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const dispatch = useDispatch();
    const filters = useSelector((state)=>state.filters);

    const toggleCheckbox = (elementId, element, isChecked) => {
        setSelectedItems((prev) =>
            prev.includes(elementId)
                ? prev.filter((id) => id !== elementId)
                : [...prev, elementId]
        );
        const allergies = filters.allergicItems;
        if (isChecked) {
            const newAllergies = [...allergies, element];
            dispatch(updateFilters({ key: "allergicItems", value: newAllergies }));
        } else {
            const newData = allergies.filter((item) => item.id !== elementId);
            dispatch(updateFilters({ key: "allergicItems", value: newData }));
        }
    };

    const filteredElements = elements.filter((el) =>
        el.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const removecolonsCapitalize = (str) => {
        const stringWithoutColons = str.replace(/:/g, ' ');
        const capitalize = stringWithoutColons.charAt(0).toUpperCase()+stringWithoutColons.slice(1)
        return capitalize;
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full max-w-sm" ref={popupRef}>
            <button
                onClick={toggleDropdown}
                className="w-full px-4 font-[Inter] flex items-center text-[0.85rem] font-[450] text-[#171717] py-1.5 border border-[#d4d4d4] rounded-[5px] text-left bg-white shadow-sm "
            >
                Select Items
                <ChevronDown size={15} className="ml-auto mr-0.5" strokeWidth={2.5} color="gray"/>
            </button>

            {dropdownOpen && (
                <div className="absolute w-full mt-1 max-h-[40vh] border border-gray-300 bg-white rounded-[5px] z-10">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-1 text-[0.8rem] font-[Inter] border-b border-gray-300 rounded-[5px    ] focus:outline-none"
                />
                <ul className="overflow-y-auto max-h-[20vh]">
                    {filteredElements.length > 0 ? (
                        filteredElements.map((element) => (
                            <li
                                key={element.id}
                                className="flex items-center px-4 py-2 hover:bg-gray-100"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(element.id)}
                                    onChange={(e) => toggleCheckbox(element.id, element,e.target.checked)}
                                    className="form-checkbox h-3 w-3 border-0 rounded-[2px] focus:ring-0"
                                />
                                <span className="ml-3 truncate font-[Inter] text-[0.8rem]">
                                    {removecolonsCapitalize(element.name)}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 flex items-center justify-center font-[600] py-2 text-[Inter] text-[0.8rem] text-gray-500">
                            No items found
                        </li>
                    )}
                </ul>
            </div>
            
            )}
        </div>
    );
};

Dropdown.propTypes = {
    elements : PropTypes.array,
    allergens : PropTypes.array,
    setAllergens : PropTypes.func,
    selectedItems : PropTypes.array,
    setSelectedItems : PropTypes.func,
}

export default Dropdown