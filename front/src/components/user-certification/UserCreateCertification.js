import React, { useState } from "react";
import * as Api from "../../api";

export default function UserCreateCertification() {
  const [title, setTitle] = useState("");
  const [licence, setLicence] = useState("");
  const [issuers, setIssuers] = useState("");
  const [issureDate, setIssureDate] = useState("");
  const [langscore, setLangscore] = useState("");

  const onCreateCertification = async () => {
    const formData = {
      title,
      licence,
      issuers,
      issureDate,
      langscore,
    };
    const res = await Api.post("crtfc", formData);
    if (res.status === 200) {
      alert("자격증 등록 완료");
    } else {
      alert("자격증 등록 중 에러가 발생했습니다.");
    }
  };
  return (
    <div>
      자격증 등록 페이지로
      <input value={title} placeholder="추가할 자격증 이름을 입력하세요" />
      <input value={title} />
      <input value={title} />
      <input value={title} />
      <button onClick={onCreateCertification}>자격증 추가하기</button>
    </div>
  );
}
