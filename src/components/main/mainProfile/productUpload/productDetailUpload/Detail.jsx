import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import SaveProductContext from '../../../../../context/SaveProductProvider';
import DetailInput from './DetailInput';
import DetailLabel from './DetailLabel';
import ErrorMessage from './ErrorMessage';
import ProductModificationContext from '../../../../../context/ProductModification';

function Detail() {
    const [saveStates] = useContext(SaveProductContext);
    const [ProductModificationState] = useContext(ProductModificationContext);
    const postId = useParams().postId;

    const nameState = ProductModificationState.product[0].itemName === '' ? 
        saveStates.required[1].value.split('').length < 2 ||
        saveStates.required[1].value.split('').length > 15 : ((saveStates.required[1].value === '') ? false : saveStates.required[1].value.split('').length < 2 ||
        saveStates.required[1].value.split('').length > 15);

    const numberpattern = /^[0-9]*$/;
    const priceState =
        !numberpattern.test(saveStates.required[2].value.replace(/,/g, '')) ||
        parseInt(saveStates.required[2].value) === 0;

    const urlpattern =
        /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const urlState = ProductModificationState.product[0].itemName === '' ? !urlpattern.test(saveStates.required[3].value) : ((saveStates.required[3].value === '') ? false : !urlpattern.test(saveStates.required[3].value));

    return (
        <>
            <legend className="a11yhidden">Product</legend>
            <DetailLabel id="name" title="상품명" />
            <DetailInput
                errorName={nameState}
                index="0"
                id="name"
                type="text"
                placeholder="2~15자 이내여야 합니다."
                defaultValue={
                    postId && ProductModificationState.product[0].itemName
                }
            />
            {saveStates.required[1].error && (
                <ErrorMessage message="2~15자 이내로 입력해주세요." />
            )}
            <DetailLabel id="price" title="가격" />
            <DetailInput
                errorName={priceState}
                index="1"
                id="price"
                type="text"
                placeholder="0보다 큰 숫자만 입력 가능합니다."
                defaultValue={
                    postId &&
                    (!isNaN(ProductModificationState.product[0].price) && (ProductModificationState.product[0].price !== null)
                        ? ProductModificationState.product[0].price.toLocaleString(
                              'ko-KR'
                          )
                        : ProductModificationState.product[0].price)
                }
            />
            {saveStates.required[2].error && (
                <ErrorMessage message="0보다 큰 숫자만 입력해주세요." />
            )}
            <DetailLabel id="link" title="판매 링크" />
            <DetailInput
                errorName={urlState}
                index="2"
                id="link"
                type="url"
                placeholder="URL을 입력해 주세요."
                defaultValue={postId && ProductModificationState.product[0].url}
            />
            {saveStates.required[3].error && (
                <ErrorMessage message="URL을 입력해 주세요." />
            )}
        </>
    );
}

export default Detail;
