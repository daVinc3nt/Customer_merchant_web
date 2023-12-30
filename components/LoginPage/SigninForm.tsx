import { useState } from "react";
import OTPField from "../OtpField/OtpField";
const SigninForm = () => {
  const [PhoneNum, setPhoneNum] = useState<string>("");
  const [Errors, setErrors] = useState<string>("");
  const [showOtp, setshowOtp] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(validate(e.target.value));
    setPhoneNum(e.target.value);
  };

  const validate = (values: string) => {
    var errors : string = "";
    const regex = /^\d+$/;
    if (!values) {
      errors = "Nhập số điện thoại vào nè!";
      console.log(errors);
    } else if (!regex.test(values)) {
      errors = "Số này không hợp lệ rồi!";
      console.log(errors);
    } else if (values.length < 10) {
      errors = "Hình như bạn nhập thiếu số nào rồi!";
      console.log(errors);
    } else if (values.length > 10) {
      errors = "Bạn mình ơi, dư số nào rồi!";
      console.log(errors);
    }
    return errors;
  };

  return (
    <div>
    { !showOtp ? (
      <div className="selection:bg-indigo-500 selection:text-white">
        <div className="flex justify-center items-center">
          <div className="p-6 sm:p-8 flex-1">
            <div className="mx-auto overflow-hidden">
              <div className="text-center">
                <h1 className="text-2xl sm:text-5xl font-bold text-indigo-900">
                  XIN CHÀO!
                </h1>

                <form className="mt-5 sm:mt-12" action="" method="POST">
                  <div className="mt-5 sm:mt-8 relative">
                    <input
                      type="tel"
                      className=" peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                      placeholder="Số điện thoại"
                      onChange={handleChange} 
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Số điện thoại
                    </label>
                    <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{Errors}</p>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => setshowOtp(!showOtp)}
                    className="mt-10 py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500
                    text-white font-bold uppercase text-xs text-center block w-full focus:outline-none 
                    cursor-pointer sm:mt-20 sm:text-sm"
                  >
                    Xác thực qua SMS
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
      <div> 
         <div className="flex justify-center items-center">
          <div className="p-6 sm:p-8 flex-1">
            <div className="mx-auto overflow-hidden">
              <div className="text-center">
                <h1 className="text-xl sm:text-5xl font-bold text-indigo-900">
                  Đợi chốc lát bạn nhé!
                </h1>

                <form className="mt-5 sm:mt-12" action="" method="POST">
                  <OTPField 
                  showOtp={showOtp}
                  setshowOtp={setshowOtp}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
    </div>
  );
};

export default SigninForm;
