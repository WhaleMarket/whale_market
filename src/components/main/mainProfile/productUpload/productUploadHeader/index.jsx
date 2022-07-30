import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditButton from '../productUploadHeader/Edit_btn';
import BackButton from '../productUploadHeader/Back_btn';
import SaveButton from '../productUploadHeader/Save_btn';

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 54px;
    padding: 9px 12px 9px 16px;
    border-bottom: 0.5px solid #bdbdbd;
    background-color: #ffffff;
    box-sizing: border-box;
`;

function ProductUploadHeader() {
    return (
        <Head>
            <BackButton />
            {useParams().postId ? <EditButton /> : <SaveButton />}
        </Head>
    );
}

export default ProductUploadHeader;
