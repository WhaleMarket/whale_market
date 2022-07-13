import ChatProfileHeader from '../../../components/main/ChatProfileHeader';
import UserProfileSection from '../../../components/main/mainProfile/UserProfileSection';
import ProductSection from '../../../components/main/mainProfile/ProductSection';
import Navbar from '../../../components/main/Navbar';


function MainProfile(){
    return(
        <>  
        <ChatProfileHeader />
        <UserProfileSection/>
        <ProductSection/>
        <Navbar/>
        </>
    )
}

export default MainProfile;