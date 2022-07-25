import ChatProfileHeader from '../../../components/main/ChatProfileHeader';
import UserProfileSection from '../../../components/main/mainProfile/user_profile/UserProfileSection';
import ProductSection from '../../../components/main/mainProfile/user_profile/ProductSection';
import Navbar from '../../../components/main/Navbar';


function UserProfile(){
    return(
        <>  
        <ChatProfileHeader />
        <UserProfileSection/>
        <ProductSection/>
        <Navbar/>
        </>
    )
}

export default UserProfile;