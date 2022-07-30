import { createContext, useState } from 'react';

const ProductModificationContext = createContext();

export const ProductModificationProvider = ({ children }) => {
    const ProductModificationState = useState({
        product: [
            {
                itemName: '',
                image: '',
                price: '',
                url: '',
            },
        ],
    });
    return (
        <ProductModificationContext.Provider value={ProductModificationState}>
            {children}
        </ProductModificationContext.Provider>
    );
};

export default ProductModificationContext;
