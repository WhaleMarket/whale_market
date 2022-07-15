import { useEffect, useRef, useState } from 'react';
import { Form, UpLoadImg, HiddenUpLoadInput, Input, SendButton } from './index.style';
import UpLoadFile from '../../../../assets/upload-file.png';

function ChatForm() {
    const [textInput, setTextInput] = useState('');
    const [success, setSuccess] = useState(false);
    const textRef = useRef();

    useEffect(() => {
        textRef.current.focus();
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setTextInput('');
    };

    // 버튼 활성상태 관리
    const [isDisabled, setIsDisabled] = useState(true);
    const isPassedMessage = () => {
        return textInput.length > 0 ? setIsDisabled(false) : setIsDisabled(true); 
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor="upLoad">
                <UpLoadImg src={UpLoadFile} />
                <HiddenUpLoadInput id='upLoad' type='file' accept='image/*' />
            </label>
            <label htmlFor="text">
                <Input 
                    id='text'
                    type='text' 
                    placeholder='메시지 입력하기...'
                    ref={textRef}
                    onChange={(event) => setTextInput(event.target.value)}
                    onKeyUp={isPassedMessage}
                />
            </label>
            <SendButton type='submit' disabled={isDisabled}>전송</SendButton>
        </Form>
    );
}

export default ChatForm;