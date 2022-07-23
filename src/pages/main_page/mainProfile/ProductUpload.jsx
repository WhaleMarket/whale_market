import { SaveProductProvider } from "../../../context/SaveProductProvider";
import ProductUploadHeader from "../../../components/main/mainProfile/productUpload/productUploadHeader";
import ProductImgUploadSection from "../../../components/main/mainProfile/productUpload/productImgUpload";
import ProductDetail from "../../../components/main/mainProfile/productUpload/productDetailUpload";

function ProductUpload() {
  return (
    <>
      <SaveProductProvider>
        <ProductUploadHeader />
        <ProductImgUploadSection />
        <ProductDetail />
      </SaveProductProvider>
    </>
  );
}

export default ProductUpload;
