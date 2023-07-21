import React, { useContext, useState, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Stack } from "react-bootstrap";
import { UserStateContext } from "../App";
import { LoadingStateContext } from "./mainRouterComponent/MainRouterComponent";
import * as Api from "../api";
import User from "./user/User";
// import Education from "./user-education/Education";
import UserCertification from "./user-certification/UserCertification";
import UserAward from "./user-award/UserAward";
import ProfileForest from "./ProfileForest";
import Education from "./user-education/Education";
import Project from "./user-Project/Project";

export const ForestStateContext = createContext(null);

const COMPONENTSLIST = [
  { title: "학력", component: Education },
  { title: "자격증", component: UserCertification },
  { title: "프로젝트", component: Project },
  { title: "수상경력", component: UserAward },
];

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  //context 가져옴
  const { isFetchCompleted, setIsFetchCompleted } =
    useContext(LoadingStateContext);
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [forestLength, setForestLength] = useState({
    education: false,
    certification: false,
    award: false,
    project: false,
  });

  const forestState = { forestLength, setForestLength };
  // fetchPortfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.

  const userState = useContext(UserStateContext);

  const fetchPortfolioOwner = async (ownerId) => {
    //페치가 컴플릿 된 상태에서 하지 않으면 로딩바 중복적으로 돌아감
    isFetchCompleted && setIsFetchCompleted(false);
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("user", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    // portfolioOwner을 해당 사용자 정보로 세팅함.

    setPortfolioOwner(ownerData);
    // fetchPortfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user && !params.id && !sessionStorage.getItem("userToken")) {
      navigate("/login", { replace: true });
      return;
    }

    if (!portfolioOwner) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.id ?? userState.user._id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPortfolioOwner(ownerId);
    }
  }, []);

  if (!portfolioOwner) return <></>;
  return (
    <ForestStateContext.Provider value={forestState}>
      <div className="portfolio-container">
        <div className="usercard-wrapper mr-5">
          <div className="card-wrapper">
            <User
              portfolioOwnerId={portfolioOwner._id}
              // isEditable : 현재 url에서 userid와 로그인 되어있는 user의 id가 같으면 에딧가능!
              isEditable={portfolioOwner._id === userState.user?._id}
            />
          </div>

          <div className="profile-forest-wrapper">
            <ProfileForest />
          </div>
        </div>

        <div className="portfolio-wrapper">
          <Stack gap={3} flaot-right>
            {COMPONENTSLIST.map((item) => {
              const Component = item.component;
              return (
                <Col style={{ textAlign: "center" }}>
                  <h2 className="portfolio-title">{item.title}</h2>
                  <Component
                    portfolioOwnerId={portfolioOwner._id}
                    // isEditable : 현재 url에서 userid와 로그인 되어있는 user의 id가 같으면 에딧가능!
                    isEditable={portfolioOwner._id === userState.user?._id}
                  />
                </Col>
              );
            })}
          </Stack>
        </div>
      </div>
    </ForestStateContext.Provider>
  );
}

export default Portfolio;
