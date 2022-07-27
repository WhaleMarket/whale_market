import { SaveProductProvider } from "../../../context/SaveProductProvider";
import ProductUploadHeader from "../../../components/main/mainProfile/productUpload/productUploadHeader";
import ProductImgUploadSection from "../../../components/main/mainProfile/productUpload/productImgUpload";
import ProductDetail from "../../../components/main/mainProfile/productUpload/productDetailUpload";
import { ProductModificationProvider } from "../../../context/ProductModification";

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