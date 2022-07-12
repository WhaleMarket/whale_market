import ProfileSection from '../../components/profile/index';

function Profile({ userInfo }) {
    return (
        <>
        <ProfileSection userInfo={userInfo} />
        </>
    );
}

export default Profile;