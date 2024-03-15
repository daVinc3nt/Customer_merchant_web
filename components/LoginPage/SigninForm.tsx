import { useState } from "react";
import {useRouter } from "next/navigation";
import OTPField from "../OtpField/OtpField";
import Link from "next/link";;
import classNames from "classnames";
import LoginLangSelector from "@/components/LangSelector/LoginLangSelector"
import { FormattedMessage, useIntl, IntlShape, } from "react-intl";
import { BusinessAuthenticate, UsersAuthenticate } from "@/TDLib/tdlogistics";
const userAuth =new UsersAuthenticate()
const SigninForm = () => {
  const welcome = <FormattedMessage id="signup.welcome.message" />
  const router = useRouter()
  interface FormValues {
    email?: string;
    phoneNumber?: string;
    otp?: string;
    name?: string;
    pass?:string
  }
  interface ErrorValues {
    emailEr: string;
    phoneNumberEr: string;
    nameEr: string;
    passEr: string;
  }
  const initialValues: FormValues = {  email: "", phoneNumber: "", otp: "", name: "", pass:""};
  const initialValues2: ErrorValues = { emailEr: "", phoneNumberEr: "" , nameEr: "", passEr:""};
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
  const [showOtp, setshowOtp] = useState(false);
  const [shake, setshake] = useState(false);
  const [role, setRole] =useState(null);

  const buttonstyle = classNames(
    "mt-7 py-3 px-4  w-[calc(95%)] rounded-full text-white font-bold uppercase text-xs text-center block focus:outline-none cursor-pointer sm:mt-10 sm:text-sm transition duration-150",
    {
      ["bg-indigo-200 animate-shake"]: shake,
      ["bg-indigo-600"]: !shake,
    }
  );
  const handleName = async (change: string) => {
    const value = change
    const updatedFormValues = { ...formValues, name: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 1);
  };

  const handleEmail = async (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, email: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 2);
  };
  const handleNum = (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, phoneNumber: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 3);
  };
  const handlePass = async (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, pass: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 2);
  };

  const signIn = async () =>{
    const {name, pass, email, phoneNumber} = formValues;
    const {nameEr, passEr, emailEr, phoneNumberEr} = formErrors;
    if (role =="Business")
    {
      handleName(name);
      console.log(nameEr)
      handlePass(pass);
      console.log(passEr)
      if (nameEr || passEr) {setshake(true); return}
      await BusAuth();
    }
    else {
      handleEmail(email);
      handleNum(phoneNumber);
      if ( emailEr !== "" || phoneNumberEr !== "") {setshake(true);return;}
      setshowOtp(!showOtp);
      await Auth();
    }
  }
  const BusAuth = async () =>
  {
    const {name, pass} = formValues;
    if (!name || !pass)
      return null;
    const busAuth =new BusinessAuthenticate();
    await busAuth.login(name, pass)
    // setInfo(res.data);
    router.push("/dashboard")
    // const staffsAuthenticate = new StaffsAuthenticate();
    // const staffsOperation= new StaffsOperation();
    // await staffsAuthenticate.login(name, pass)
    // .then(result => console.log(result))
    // .catch(error => console.log(error))
    // const res = await staffsOperation.getAuthenticatedStaffInfo();
    // setInfo(res.data);
    // router.push("/dashboard")
  }
  const Auth =async () => {
    const {email, phoneNumber} = formValues;
    if (!email || !phoneNumber)
      return null;
    userAuth.sendOTP(phoneNumber, email)
    .then(e => console.log(e))
    .catch(e => console.log(e));
  }

  const validate = (values: FormValues, type: number)=> {
    var errors: string = "";
    const NameRegex =/^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/i;
    const EmailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/i;
    const PhoneRegex = /^\d+$/;
    if (role === "Business") {
      if (type == 1)
      {
        if ( !values.name) {
          formErrors.nameEr = "Thiếu tên mất rồi.";
        }
        else formErrors.nameEr ="";
      }
      if (type == 2)
      {
          if (!values.pass) {
          formErrors.passEr = "Thiếu password nè";
          }
          else formErrors.passEr ="";
      }
      if (!formErrors.nameEr && !formErrors.passEr)
      {setshake(false);}
    }

    else {
      if (type == 2)
      {
          if (!values.email) {
          formErrors.emailEr = "Thêm email nữa nghen!";
        } else if (!EmailRegex.test(values.email)) {
          formErrors.emailEr = "Email không hợp lệ.";
        }
          else formErrors.emailEr ="";
      }
      if (type ==3 )
      {
        if (!values.phoneNumber) {
        formErrors.phoneNumberEr = "Nhập số điện thoại vào nè!";
      } else if (!PhoneRegex.test(values.phoneNumber)) {
        formErrors.phoneNumberEr= "Số này không hợp lệ rồi!";
      } else if (values.phoneNumber.length < 10) {
        formErrors.phoneNumberEr = "Hình như bạn nhập thiếu số nào rồi!";
      } else if (values.phoneNumber.length > 10) {
        formErrors.phoneNumberEr = "Bạn mình ơi, dư số nào rồi!";
      }
        else formErrors.phoneNumberEr ="";
      }
      if (!formErrors.phoneNumberEr && !formErrors.emailEr)
      {setshake(false);}
    }
  };

  return (
    <div>
    <div className="pl-8">
      <LoginLangSelector/>
    </div>
    {
    !role ?
    <>
    <div className="selection:bg-indigo-500 selection:text-white">
        <div className="flex justify-center items-center">
          <div className="p-6 sm:p-8 flex-1">
            <div className="mx-auto overflow-hidden">
              <div className="text-center">
                <h1 className="text-2xl sm:text-5xl font-bold text-indigo-900 mb-10">
                <FormattedMessage id="signin.role"/>
                </h1>
                <select 
                name="business or not"
                className="border border-black rounded-sm text-center " 
                onChange={e => setRole(e.target.value)}
                value ={role}
                >
                  <option value=""><FormattedMessage id="signin.select"/></option>
                  <option value="Business"> <FormattedMessage id="signin.business"/></option>
                  <option value="Customer"><FormattedMessage id="signin.customer"/></option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
    : role=="Business" ?
      <div>
        <div className="selection:bg-indigo-500 selection:text-white">
          <div className="flex justify-center items-center">
            <div className="p-6 sm:p-8 flex-1">
              <div className="mx-auto">
                <div className="text-center">
                  <h1 className="text-2xl sm:text-5xl w-72 font-bold text-indigo-900">
                    <FormattedMessage id="signup.welcome.message" />
                  </h1>
                  <form className="mt-5 sm:mt-12" action="" method="POST">
                    <div className="mt-5 sm:mt-10 relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                      placeholder="john@doe.com"
                      onChange={(e) => handleName(e.target.value)} 
                    />
                    <label
                      htmlFor="text"
                      className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      <FormattedMessage id="signin.username"/>
                    </label>
                    <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.nameEr}</p>
                    </div>
                    <div className="mt-5 sm:mt-10 relative">
                      <input
                        type="tel"
                        className=" peer h-10 w-full border-b-2 bg-white border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="Số điện thoại"
                        onChange={(e) => handlePass(e.target.value)} 
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signin.password"/>
                      </label>
                      <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.passEr}</p>
                      {/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
                    </div>
                  </form>
                  <div className="flex">
                    <button
                        onClick={signIn}
                        className={buttonstyle}
                      >
                        <FormattedMessage id="signinpage.verify" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> :
    !showOtp ? (
      <div className="selection:bg-indigo-500 selection:text-white">
        <div className="flex justify-center items-center">
          <div className="p-6 sm:p-8 flex-1">
            <div className="mx-auto overflow-hidden">
              <div className="text-center">
                <h1 className="text-2xl sm:text-5xl font-bold text-indigo-900">
                  <FormattedMessage id="signup.welcome.message" />
                </h1>
                <form className="mt-5 sm:mt-12" action="" method="POST">
                  <div className="mt-5 sm:mt-10 relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
                    onChange={(e) => handleEmail(e.target.value)} 
                  />
                  <label
                    htmlFor="email"
                    className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.emailEr}</p>
                  </div>
                  <div className="mt-5 sm:mt-10 relative">
                    <input
                      type="tel"
                      className=" peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                      placeholder="Số điện thoại"
                      onChange={(e) => handleNum(e.target.value)} 
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      <FormattedMessage id="signup.phonenumber"/>
                    </label>
                    <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p>
                  </div>
                </form>
                <div className="">
                  <button
                      onClick={signIn}
                      className={buttonstyle}
                    >
                     <FormattedMessage id="signup.verify" />
                  </button>
                </div>
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
                  <FormattedMessage id="sms.wait" />
                </h1>
                <form className="mt-5 sm:mt-12" action="" method="POST">
                  <OTPField 
                  showOtp={showOtp}
                  setshowOtp={setshowOtp}
                  email={formValues.email}
                  phone={formValues.phoneNumber}
                  otp = {userAuth}
               />
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
