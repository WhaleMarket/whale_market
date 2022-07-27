import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import home_icon_fill from "../../assets/icon-home-fill.png";
import home_icon from "../../assets/icon-home.png";
import award_icon_fill from "../../assets/icon-award-fill.png";
import award_icon from "../../assets/icon-award.png";
import posting_icon from "../../assets/icon-edit.png";
import user_icon_fill from "../../assets/icon-user-fill.png";
import user_icon from "../../assets/icon-user.png";
import Wave from "react-wavify";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

const Bottomnav = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 6px;
  background-color: transparent;
  box-sizing: border-box;
`;

const List = styled.li`
  width: 64px;
  padding-bottom: 6px;
  color: ${(props) => (props.current ? "#607D8B" : "#767676")};
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  & a {
    text-decoration: none;
    color: inherit;
  }
`;

const Logo = styled.img`
  display: block;
  width: 1.5rem;
  padding: 12px 0 4px 0;
  margin: 0 auto;
`;

const Navbar = ({ location }) => {
  const [InfoState] = useContext(AuthContext);
  return (
    <>
      <Wave
        style={{
          position: "fixed",
          bottom: "0",
          background: "linear-gradient(transparent 95%, #ffffff 5%)",
        }}
        fill="url(#gradient)"
        paused={false}
        mask="url(#mask)"
        options={{
          height: 70,
          amplitude: 20,
          speed: 0.3,
          points: 4,
        }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor="#039be5" />
            <stop offset="90%" stopColor="#fff" />
          </linearGradient>
        </defs>
      </Wave>
      <Bottomnav>
        <List
          className="home"
          current={location.pathname.substr(0, 5) === "/home"}
        >
          <Link to="/home">
            <Logo
              className="Home"
              src={
                location.pathname.substr(0, 5) === "/home"
                  ? home_icon_fill
                  : home_icon
              }
              alt="home icon"
            />
            홈
          </Link>
        </List>
        <List className="chatting" current={location.pathname === "/chatting"}>
          <Link to="/chatting">
            <Logo
              className="Home"
              src={
                location.pathname === "/chatting"
                  ? award_icon_fill
                  : award_icon
              }
              alt="home icon"
            />
            리워드
          </Link>
        </List>
        <List className="posting" current={location.pathname === "/posting"}>
          <Link to="/posting">
            <Logo className="Home" src={posting_icon} alt="home icon" />
            게시물 작성
          </Link>
        </List>
        <List
          className="profile"
          current={
            location.pathname ===
            `/profile/${InfoState.MyInformations[0].myAccountname}`
          }
        >
          <Link to={`/profile/${InfoState.MyInformations[0].myAccountname}`}>
            <Logo
              className="Home"
              src={
                location.pathname ===
                `/profile/${InfoState.MyInformations[0].myAccountname}`
                  ? user_icon_fill
                  : user_icon
              }
              alt="home icon"
            />
            프로필
          </Link>
        </List>
      </Bottomnav>
    </>
  );
};

export default withRouter(Navbar);
