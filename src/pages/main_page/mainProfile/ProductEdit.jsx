import { SaveProductProvider } from '../../../context/SaveProductProvider';
import { ProductModificationProvider } from '../../../context/ProductModification';
import ProductImgUploadSection from '../../../components/main/mainProfile/productUpload/productImgUpload';
import ProductUploadHeader from '../../../components/main/mainProfile/productUpload/productUploadHeader';
import ProductDetail from '../../../components/main/mainProfile/productUpload/productDetailUpload';

function ProductEdit() {
    return (
        <>
            <ProductModificationProvider>
                <SaveProductProvider>
                    <ProductUploadHeader />
                    <ProductImgUploadSection />
                    <ProductDetail />
                </SaveProductProvider>
            </ProductModificationProvider>
        </>
    );
}

export default ProductEdit;
