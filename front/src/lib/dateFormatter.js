/**
 * Date객체를 2023-01-01 형태로 변환해주는 함수입니다.
 * @param {*date} date 객체 입니다. ex) new Date(issuuedDate)
 * @returns
 */
export function dateFormat(date) {
  let dateFormat2 =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
  return dateFormat2;
}
