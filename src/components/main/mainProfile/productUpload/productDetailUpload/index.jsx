import styled from 'styled-components';
import Detail from './Detail';

const Fieldset = styled.fieldset`
    margin: 0 34px auto;
    display: flex;
    flex-direction: column;
`;

function ProductDetail() {
    return (
        <>
            <Fieldset>
                <Detail />
            </Fieldset>
        </>
    );
}

export default ProductDetail;
