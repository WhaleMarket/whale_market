import ProfileEditSection from '../../../components/main/mainProfile/profile_edit/index';
import { ProfileModificationProvider } from '../../../context/ProfileModification';

function ProfileEdit() {
    return (
        <ProfileModificationProvider>
            <ProfileEditSection />
        </ProfileModificationProvider>
    );
}

export default ProfileEdit;
