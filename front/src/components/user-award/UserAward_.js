// // import React, { useState, useEffect } from "react";
// // import UserAwardEditForm from "./UserAwardEditForm";
// // import UserAwardCard from "./UserAwardCard";
// // import UserEditForm from "./UserEditForm";
// // import UserCard from "./UserAwardCard";
// // import * as Api from "../../api";


// // function User({ portfolioOwnerId, isEditable }) {
// //   // useState 훅을 통해 isEditing 상태를 생성함.
// //   const [isEditing, setIsEditing] = useState(false);
// //   // useState 훅을 통해 user 상태를 생성함.
// //   const [award, setAward] = useState(null);

// //   useEffect(() => {
// //     // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
// //     Api.get("award", portfolioOwnerId).then((res) => setUser(res.data));
// //   }, [portfolioOwnerId]);

// //   return (
// //     <>
// //       {isEditing ? (
// //         <UserAwardEditForm
// //         //   user={user}
// //         //   setIsEditing={setIsEditing}
// //         //   setUser={setUser}
// //         />
// //       ) : (
// //         <AwardCard
// //         //   user={user}
// //         //   setIsEditing={setIsEditing}
// //         //   isEditable={isEditable}
// //         />
// //       )}
// //     </>
// //   );
// // }

// // export default User;



//   //수상내역 추가하기ㄴ
//   const addAward = () => {
//     const award = {
//       awardDate: new Date(awardDate),
//       issuer: issuer,
//       title: title,
//     };

//     if (editIndex !== -1) {
//       const updatedData = [...awardData];
//       updatedData[editIndex] = award;
//       setAwardData(updatedData);
//       setEditIndex(-1);
//     } else {
//       setAwardData([...awardData, award]);
//     }

//     setAwardDate('');
//     setIssuer('');
//     setTitle('');
//   };

//   // 수상내역 삭제
//   const deleteAward = (index) => {
//     const updatedData = [...awardData];
//     updatedData.splice(index, 1);
//     setAwardData(updatedData);
//   };

//   // 수정 시 선택한 데이터 입력 채워주는 함수
//   const editAward = (index) => {
//     const award = awardData[index];
//     setAwardDate(award.awardDate.toISOString().split('T')[0]);
//     setIssuer(award.issuer);
//     setTitle(award.title);
//     setEditIndex(index);
//   };
  
//   // 수상일자 입력 여부 확인
//   const isAwardDatelValid = typeof Number(awardDate.length) === "number";
//   // 주최사 입력 여부 확인
//   const isOrganizerValid = issuer.length > 1;
//   // 수상내용 입력 여부 확인
//   const isDescriptionValid = title.length > 1;


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // "users/유저id" 엔드포인트로 PUT 요청함.
//     const res = await Api.put(`award/${award.id}`, {
//       awardData,
//       issuer,
//       title
//     });
//     // 유저 정보는 response의 data임.
//     const updateAward = res.data;
//     // 해당 유저 정보로 user을 세팅함.
//     setAward(updateAward);

//     // isEditing을 false로 세팅함.
//     setIsEditing(false);
//   };