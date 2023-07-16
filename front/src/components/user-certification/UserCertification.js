import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import UserCertificationCard from "./UserCertificationCard";
import UserCertificationAdd from "./UserCertificationAdd";

/**
 * 테스트용 데이터입니다.
 */
// const mockup = [
//   {
//     _id: 1,
//     title: "AWS 자격증",
//     license: 12341234,
//     issuedDate: 2020 - 12 - 12,
//     issuer: "Amazon",
//     langscore: null,
//     author: "진채영",
//   },
//   {
//     _id: 2,
//     title: "토익",
//     license: 12341234,
//     issuedDate: 2020 - 12 - 12,
//     issuer: "YBM",
//     langscore: 990,
//     author: "진채영",
//   },
//   {
//     _id: 3,
//     title: "토익",
//     license: 12341234,
//     issuedDate: 2020 - 12 - 12,
//     issuer: "YBM",
//     langscore: 990,
//     author: "진채영",
//   },
//   {
//     _id: 4,
//     title: "토익",
//     license: 12341234,
//     issuedDate: 2020 - 12 - 12,
//     issuer: "YBM",
//     langscore: 990,
//     author: "진채영",
//   },
// ];

/**
 * 기존 자격증 데이터를 받아옵니다.
 * @param {*} param0
 * @returns
 */
function UserCertification({ portfolioOwnerId, isEditable }) {
  const [certifications, setCertifications] = useState([]);
  // const [certifications, setCertifications] = useState(mockup);
  /**
   * 개인 자격증 리스트를 받아오는 API 함수입니다.
   */
  const fetchCertifications = async () => {
    const res = await Api.get("crtfc", portfolioOwnerId);

    const data = res.data;
    if (Array.isArray(data)) {
      setCertifications(data);
    } else {
      setCertifications([]);
    }
  };

  /**
   * 자격증을 certifications 상태에 추가하는 함수입니다.
   * @parms certification : 추가할 자격증 데이터
   */
  const addCertification = (certification) => {
    setCertifications(certifications.concat(certification));
  };
  const deleteCertification = (id) => {
    setCertifications(
      certifications.filter((certification) => certification._id !== id)
    );
  };

  const updateCertification = (id, data) => {
    const newState = certifications.map((certification) =>
      certification.id === id ? { ...data } : certification
    );
    setCertifications(newState);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => [fetchCertifications()], []);

  return (
    /**
     * certification자격증 정보가 없는 유저면 추가할 수 있는 컴포넌트로 이동하는 Button 넣을 예정
     */
    <div>
      {isEditable && (
        <>
          <h1>자격증 추가하기</h1>
          <UserCertificationAdd addCertification={addCertification} />
        </>
      )}

      <div className="certification-list">
        {certifications.map((certification) => (
          <UserCertificationCard
            key={certification._id}
            certification={certification}
            isEditable={isEditable}
            updateCertification={updateCertification}
            deleteCertification={deleteCertification}
          />
        ))}
      </div>
    </div>
  );
}

export default UserCertification;
