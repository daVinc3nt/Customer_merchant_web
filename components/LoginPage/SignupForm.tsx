import { useState, useEffect } from "react";
import OTPField from "../OtpField/OtpField";
import { OTP, User } from "./fetching";
const SignupForm = () => {
  interface FormValues {
    name: string;
    email: string;
    phoneNumber: string;
  }
  interface ErrorValues {
    name: string;
    email: string;
    phoneNumber: string;
  }
  const initialValues: FormValues = { name: "", email: "", phoneNumber: "" };
  const initialValues2: ErrorValues = { name: "", email: "", phoneNumber: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
  const [showOtp, setshowOtp] = useState(false);
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedFormValues = { ...formValues, name: value };
    setFormValues(updatedFormValues);
    setFormErrors({...formErrors, name: validate(updatedFormValues, 1)});
  };
  
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedFormValues = { ...formValues, email: value };
    setFormValues(updatedFormValues);
    setFormErrors({...formErrors, email: validate(updatedFormValues, 2)});
  };
  
  const handleNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues, phoneNumber: value };
    setFormValues(updatedFormValues);
    setFormErrors({...formErrors, phoneNumber: validate(updatedFormValues, 3)});
  };
  const validate = (values: FormValues, type: number): string => {
    var errors: string = "";
    const NameRegex =/^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/i;
    const EmailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/i;
    const PhoneRegex = /^\d+$/;
    if (type == 1 && !values.name) {
      errors = "Thiếu tên mất rồi.";
    }
    else if(!NameRegex.test(values.name.toLowerCase())) {
      errors = "Mình ghi đầy đủ họ tên bạn nhé!";
    }
    if (type == 2)
    {
        if (!values.email) {
        errors = "Thêm email nữa nghen!";
      } else if (!EmailRegex.test(values.email)) {
        errors = "Email không hợp lệ.";
      }
    }
    if (type ==3 )
    {
      if (values.phoneNumber === "") {
      errors = "Nhập số điện thoại vào nè!";
    } else if (!PhoneRegex.test(values.phoneNumber)) {
      errors= "Số này không hợp lệ rồi!";
    } else if (values.phoneNumber.length < 10) {
      errors = "Hình như bạn nhập thiếu số nào rồi!";
    } else if (values.phoneNumber.length > 10) {
      errors = "Bạn mình ơi, dư số nào rồi!";
    }
  }
    return errors;
  };
  const SignUp = async () =>{
    setshowOtp(!showOtp);
    await Auth();
  }

  const Auth = () => {
    const {name, email, phoneNumber} = formValues;
    console.log("hello")
    if (!name ||!email || !phoneNumber)
      return null;
    const otpCode = new OTP(phoneNumber,email);
    const user = new User(name, phoneNumber, email);
    // Send OTP
    otpCode.sendOTP()
    .then( () => otpCode.verifyOTP({phone_number: "0981430418", otp: 123456}))
    .catch(error => console.log(error));
  }
  return (
    <div>
    { !showOtp ? (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-6 sm:p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="text-center">
              <h1 className="text-xl pt-10 sm:text-4xl font-bold text-indigo-900">
                Tạo tài khoản
              </h1>

              <form className="mt-5" action="" method="POST">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Name"
                    onChange={handleName} 
                  />
                  <label
                    htmlFor="name"
                    className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Tên
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.name}</p>
                </div>
                <div className="mt-8 sm:mt-10 relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
                    onChange={handleEmail} 
                  />
                  <label
                    htmlFor="email"
                    className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.email}</p>
                </div>
                <div className="mt-8 sm:mt-10 relative">
                  <input
                    type="tel"
                    className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Số điện thoại"
                    onChange={handleNum} 
                  />
                  <label
                    htmlFor="phoneNumber"
                    className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Số điện thoại
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.phoneNumber}</p>
                </div>
                <button
                    type="submit"
                    onClick={SignUp}
                    className="mt-5 py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500
                    text-white font-bold uppercase text-xxs text-center block w-full focus:outline-none 
                    cursor-pointer sm:mt-10 sm:text-sm"
                  >
                    Xác thực SMS
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>) : (
      <div> 
      <div className="flex justify-center items-center">
       <div className="p-6 sm:p-8 flex-1">
         <div className="mx-auto overflow-hidden">
           <div className="text-center">
             <h1 className="text-lg pt-5 sm:text-5xl font-bold text-indigo-900">
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
    )}
    </div>
  );
};

export default SignupForm;
