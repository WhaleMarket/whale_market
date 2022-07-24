import { useEffect, useRef, useState } from 'react';
import { Fieldset, UpLoadImg, HiddenUpLoadInput, Input, SendButton } from './index.style';
import UpLoadFile from '../../../../assets/upload-file.png';

function ChatForm({ sendMessage, popMessage }) {
    const [textInput, setTextInput] = useState('');
    const upLoadFileRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        textRef.current.focus();
    });
    
    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(textInput);
        setTextInput('');
        popMessage();
        textRef.current.value = '';
    };

    const onClickUpLoadFile = () => {
        upLoadFileRef.current.click();
    };

    // 버튼 활성상태 관리
    const [isDisabled, setIsDisabled] = useState(true);
    const isPassedMessage = () => {
        return textInput.length > 0 ? setIsDisabled(false) : setIsDisabled(true); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset>
                <legend></legend>
                <label htmlFor='upLoad'></label>
                    <UpLoadImg src={UpLoadFile} onClick={onClickUpLoadFile}/>
                    <HiddenUpLoadInput 
                        id='upLoad' 
                        type='file' 
                        accept='image/*' 
                        ref={upLoadFileRef}
                    />
                <label htmlFor='text'></label>
                    <Input 
                        id='text'
                        type='text' 
                        placeholder='메시지 입력하기...'
                        ref={textRef}
                        onChange={(event) => setTextInput(event.target.value)}
                        onKeyUp={isPassedMessage}
                    />
                <SendButton type='submit' disabled={isDisabled}>전송</SendButton>
            </Fieldset>
        </form>
    );
}

export default ChatForm;