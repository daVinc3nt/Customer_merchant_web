import React from "react";
import SubmitExport from "./SubmitProblem/SubmitExport";
const HelpOther = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="mx-5 my-5">
      <h1 className="text-2xl font-semibold text-gray-600">Các vấn đề khác</h1>
      <p className="font-normal text-sm text-gray-500 mt-5">
        Các vấn đề về tài khoản, chương trình ưu đãi, lỗi ứng dụng,... có thể
        được báo cáo tại đây
      </p>
      <button
        onClick={handleClick}
        className="text-blue-500 hover:text-sky-700 font-medium text-sm mt-5"
      >
        <span>Gửi yêu cầu trợ giúp</span>
      </button>
      {isClicked && <SubmitExport onClose={handleClick} />}
    </div>
  );
};

export default HelpOther;
