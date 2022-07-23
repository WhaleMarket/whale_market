import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 75px;
    & > * {
        :not(:last-child) {
            margin-bottom: 20px;
        }
    }
`;