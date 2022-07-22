import User from './User';

function UserList({ followerList }) {
    const list = followerList.map((user) => {
        return (
            <User 
                key={user._id}
                accountname={user.accountname}
                username={user.username}
                image={user.image}
                intro={user.intro}
                followers={user.followers}
                isfollow={user.isfollow}
            />
        );
    });
    return (
        <>{list}</>
    )
}

export default UserList;