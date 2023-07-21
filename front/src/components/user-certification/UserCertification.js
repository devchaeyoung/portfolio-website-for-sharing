import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";
import UserCertificationCard from "./UserCertificationCard";
import UserCertificationAdd from "./UserCertificationAdd";
import { ForestStateContext } from "../Portfolio";
import { LoadingStateContext } from "../mainRouterComponent/MainRouterComponent";

/**
 * 기존 자격증 데이터를 받아옵니다.
 * @param {*} param0
 * @returns
 */
function UserCertification({ portfolioOwnerId, isEditable }) {
  const [certifications, setCertifications] = useState([]);
  const { setForestLength } = useContext(ForestStateContext);
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);
  /**
   * 개인 자격증 리스트를 받아오는 API 함수입니다.
   */
  const fetchCertifications = async () => {
    const res = await Api.get("crtfc", portfolioOwnerId);
    const data = res.data;
    //이건 숲 이미지
    res.data.length !== 0
      ? setForestLength((prev) => {
          return { ...prev, certification: true };
        })
      : setForestLength((prev) => {
          return { ...prev, certification: false };
        });
    if (Array.isArray(data)) {
      setCertifications(data);
    } else {
      setCertifications([]);
    }
  };

  const refreshCertifications = () => {
    fetchCertifications();
  };

  /**
   * 자격증을 certifications 상태에 추가하는 함수입니다.
   * @parms certification : 추가할 자격증 데이터
   */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    isFetchCompleted && setIsFetchCompleted(false);
    fetchCertifications();
    setIsFetchCompleted(true);
  }, []);

  return (
    /**
     * certification자격증 정보가 없는 유저면 추가할 수 있는 컴포넌트로 이동하는 Button 넣을 예정
     */
    <div>
      <div className="certification-list">
        {certifications.map((certification) => (
          <UserCertificationCard
            key={certification._id}
            certification={certification}
            setCertifications={setCertifications}
            isEditable={isEditable}
            refresh={refreshCertifications}
          />
        ))}
        {isEditable && (
          <>
            <UserCertificationAdd refresh={refreshCertifications} />
          </>
        )}
      </div>
    </div>
  );
}

export default UserCertification;
