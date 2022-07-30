import { createContext, useState } from 'react';

const ProfileModificationContext = createContext();

export const ProfileModificationProvider = ({ children }) => {
    const ProfileModificationState = useState({
        profile: [
            {
                label: 'username',
                error: false,
                editPossible: false,
                value: '',
            },
            {
                label: 'accountname',
                error: false,
                editPossible: false,
                value: '',
            },
            {
                label: 'intro',
                error: false,
                editPossible: false,
                value: '',
            },
            {
                label: 'image',
                error: false,
                editPossible: false,
                value: '',
            },
        ],
    });
    return (
        <ProfileModificationContext.Provider value={ProfileModificationState}>
            {children}
        </ProfileModificationContext.Provider>
    );
};

export default ProfileModificationContext;
