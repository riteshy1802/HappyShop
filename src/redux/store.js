import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './Products/Products';
import categoryReducer from './Categories/Category';
import barcodeReducer from './Barcode/Barcode';
import productArrayReducer from "./Products/ProductHome";
import cartReducer from "./CartReducer/Cart";
import searchReducer from "./Search/Search";
import filterReducers from "./Filter/Filter";
import categoryBasedFetchingReducer from "./CategoryBasedFetching/CategoryBasedFetching";
import tempoStateReducer from "./TempoState/TempoState";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, productsReducer);

const store = configureStore({
    reducer: {
        product: persistedReducer,
        category: categoryReducer,
        barcode: barcodeReducer,
        allProducts:productArrayReducer,
        cart:cartReducer,
        search:searchReducer,
        filters:filterReducers,
        categoryBasedFetching:categoryBasedFetchingReducer,
        tempoState:tempoStateReducer
    },
});

const persistor = persistStore(store);

export default store;

export { persistor };
