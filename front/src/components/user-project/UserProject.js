// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
// import * as Api from "../../api";

// const UserProject = ( project, setProject, setIsEditing ) => {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [role, setRole] = useState('');
//   const [description, setDescription] = useState('');
//   const [projectData, setProjectData] = useState([]);
//   const [editIndex, setEditIndex] = useState(-1);


//   // 프로젝트 추가
//   const addProject= () => {
//     const project = {
//       startDate: new Date(startDate),
//       endDate: new Date(endDate),
//       title: title,
//       role: role,
//       description: description,
//     };

//     if (editIndex !== -1) {
//       const updatedData = [...projectData];
//       updatedData[editIndex] = project;
//       setProjectData(updatedData);
//       setEditIndex(-1);
//     } else {
//       setProjectData([...projectData, project]);
//     }

//     setStartDate('');
//     setEndDate('');
//     setTitle('');
//     setRole('');
//     setDescription('');
//   };

//   // 프로젝트 삭제
//   const deleteProject = (index) => {
//     const updatedData = [...projectData];
//     updatedData.splice(index, 1);
//     setProjectData(updatedData);
//   };

//   // 수정 시 선택한 데이터 입력 채워주는 함수
//   const editProject = (index) => {
//     const project = projectData[index];
//     setStartDate(project.startdDate.toISOString().split('T')[0]);
//     setEndDate(project.enddDate.toISOString().split('T')[0]);
//     setTitle(project.title);
//     setRole(project.role);
//     setDescription(project.description);
//     setEditIndex(index);
//   };
  
//     // 프로젝트 시작일 입력 여부 확인
//     // const isStartDatelValid = typeof Number(startDate.length) === "number";
//     // 프로젝트 종료일 입력 여부 확인
//     // const isEndDatelValid = typeof Number(endDate.length) === "number";
//     // 프로젝트명 입력 여부 확인
//     const isTitleValid = title.length > 1;
//     // 프로젝트 담당 업무 입력 여부 확인
//     const isRoleValid = role.length > 1;
//     // 프로젝트 내용 입력 여부 확인
//     const isDescriptionValid = description.length > 1;


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // "users/유저id" 엔드포인트로 PUT 요청함.
//     const res = await Api.put(`project/${project.id}`, {
//       projectData,
//       startDate,
//       endDate,
//       title,
//       role,
//       description
//     });
//     // 유저 정보는 response의 data임.
//     const updateProject = res.data;
//     // 해당 유저 정보로 user을 세팅함.
//     setProject(updateProject);

//     // isEditing을 false로 세팅함.
//     setIsEditing(false);
//   };


//   return (
//     <Container>
//       <div>
//         <h1>프로젝트</h1>
//         <Row className="justify-content-md-center mt-5">
//           <Col lg={8}>
//             <Form.Group>
//               <Form.Label>프로젝트</Form.Label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 placeholder="프로젝트 이름을 입력해주세요"
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               {!isTitleValid && (
//                     <Form.Text className="text-success">
//                       프로젝트가 입력되지 않았습니다.
//                     </Form.Text>
//                   )}
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>시작</Form.Label>
//               <input
//                 type="date"
//                 id="startDate"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//               {/* {!isStartDateValid && (
//                     <Form.Text className="text-success">
//                       숫자만 입력해주세요
//                     </Form.Text>
//                   )} */}
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>종료</Form.Label>
//               <input
//                 type="date"
//                 id="endDate"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//               {/* {!isEndDateeValid && (
//                     <Form.Text className="text-success">
//                       숫자만 입력해주세요
//                     </Form.Text>
//                   )} */}
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>담당 없무</Form.Label>
//               <input
//                 type="text"
//                 id="role"
//                 value={role}
//                 placeholder="담당 업무를 입력해주세요"
//                 onChange={(e) => setRole(e.target.value)}
//               />
//               {!isRoleValid && (
//                     <Form.Text className="text-success">
//                       담당 업무가 입력되지 않았습니다
//                     </Form.Text>
//                   )}
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>업무 내용</Form.Label>
//               <input
//                 type="text"
//                 id="rdescription"
//                 value={description}
//                 placeholder="내용을 입력해주세요"
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//               {!isDescriptionValid && (
//                     <Form.Text className="text-success">
//                       프로젝트 내용이 입력되지 않았습니다
//                     </Form.Text>
//                   )}
//             </Form.Group>

//             <Form.Group as={Row} className="mt-3 text-center">
//                 <Col sm={{ span: 20 }}>
//                   <Button variant="primary" type="submit" onClick={addProject}>
//                   {editIndex !== -1 ? '완료' : '추가'}
//                   </Button>
//                 </Col>
//               </Form.Group>

          
//             {projectData.length === 0 ? (
//                 <p>프로젝트 내용이 없습니다..</p>
//               ) : (
//                 <Table striped="columns">
//                   <thead>
//                     <tr>
//                       <th>프로젝트</th>
//                       <th>시작일</th>
//                       <th>종료일</th>
//                       <th>담당 업무</th>
//                       <th>내용</th>
//                       <th>수정</th>
//                       <th>삭제</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {projectData.map((project, index) => (
//                       <tr key={index}>
//                         <td>
//                           {project.projectData.getFullYear()}.
//                           {project.projectData.getMonth() + 1}.
//                           {project.projectData.getDate()}
//                         </td>
//                         <td>{project.title}</td>
//                         <td>{project.starDate}</td>
//                         <td>{project.endDate}</td>
//                         <td>{project.role}</td>
//                         <td>{project.description}</td>
//                         <td>
//                           <Button variant="primary" onClick={() => editProject(index)}>
//                             수정
//                           </Button>
//                         </td>
//                         <td>
//                           <Button variant="danger" onClick={() => deleteProject(index)}>
//                             삭제
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>     
//               )};
//           </Col>
//         </Row>
//       </div>
//     </Container>
//   );
// };

// export default UserProject;
