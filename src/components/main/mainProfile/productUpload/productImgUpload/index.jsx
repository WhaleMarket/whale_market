import styled from 'styled-components';
import ProductImgUploadTitle from '../productImgUpload/Title';
import UploadSection from '../productImgUpload/Upload_section';

const Wrapper = styled.section`
    margin: 0 34px auto;
`;

function ProductImgUploadSection() {
    return (
        <Wrapper>
            <ProductImgUploadTitle />
            <UploadSection />
        </Wrapper>
    );
}

export default ProductImgUploadSection;
