import { Form, ButtonUpLoad, Input, SendButton } from './index.style';
import UpLoadFile from '../../../../assets/upload-file.png';

function ChatForm() {
    return (
        <Form>
            <label htmlFor="">
                <ButtonUpLoad src={UpLoadFile} alt="" />
            </label>
            <label htmlFor="">
                <Input 
                    type='text' 
                    placeholder='메시지 입력하기...'
                />
            </label>
            <SendButton>전송</SendButton>
        </Form>
    );
}

export default ChatForm;