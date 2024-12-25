import {
    sortAlphabetically,
    sortEnergetically,
    sortByNutritionGrade,
    filterOutAllergens,
    filterOutCategory,
} from './Filters';


export const compiledFunctionFilter = (products, filters) => {
    let sortByOrder = false;
    let nutriGradeOrder = false;
    let energyOrder = false;
    const sortBy = filters.sortBy;
    const nutriGrade = filters.nutriGrade;
    const energy = filters.energy;

    if (sortBy === 'a-z') {
        sortByOrder = true; // ascending true...
    }
    if (nutriGrade === 'asc') {
        nutriGradeOrder = true; // ascending
    }
    if (energy === 'inc') {
        energyOrder = true; // ascending
    }

    let filteredProducts = products;

    if (filters.category !== 'Shuffled') {
        filteredProducts = filterOutCategory(filteredProducts, filters.category);
    }

    if (filters.allergicItems.length > 0) {
        filteredProducts = filterOutAllergens(filteredProducts, filters.allergicItems);
    }

    if (sortBy !== 'random') {
        filteredProducts = sortAlphabetically(filteredProducts, sortByOrder, filters);
    }

    if (energy !== 'default') {
        filteredProducts = sortEnergetically(filteredProducts, energyOrder);
    }

    if (nutriGrade !== 'default') {
        filteredProducts = sortByNutritionGrade(filteredProducts, nutriGradeOrder);
    }

    return filteredProducts;
};
