// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import AuthContext from "../context/AuthProvider";
// import { API_URL } from "../constants/defaultUrl";

// export default function useProductInfo() {
//   const [InfoState, setInfoState] = useContext(AuthContext);
//   //   const [tokenIsValid, setTokenIsValid] = useState();

//   useEffect(() => {
//     async function getProductName() {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
//             "Content-type": "application/json",
//           },
//         };
//         const response = await axios.get(
//           `${API_URL}/product/${InfoState.MyInformations[0].myAccountname}`,
//           config
//         );
//         response.data.product.map((value) => {
//           setInfoState((InfoState) => {
//             InfoState.MyInformations[2] = {
//               ...InfoState.MyInformations[2],
//               itemName: [
//                 ...InfoState.MyInformations[2].itemName,
//                 value.itemName,
//               ],
//               price: [...InfoState.MyInformations[2].price, value.price],
//               link: [...InfoState.MyInformations[2].link, value.link],
//               itemImage: [
//                 ...InfoState.MyInformations[2].itemImage,
//                 value.itemImage,
//               ],
//             };
//           });
//           return { MyInformations: InfoState.MyInformations };
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     InfoState.MyInformations[0].token &&
//       InfoState.MyInformations[0].myAccountname !== "" &&
//       getProductName();
//   }, [InfoState.MyInformations, setInfoState]);
// }
