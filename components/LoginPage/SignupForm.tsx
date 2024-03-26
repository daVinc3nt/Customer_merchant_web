import { useState, useEffect } from "react";
import OTPField from "../OtpField/OtpField";
import { OTP, User } from "./fetching";
import classNames from "classnames";
import LoginLangSelector from "@/components/LangSelector/LoginLangSelector"
import { FormattedMessage, useIntl, IntlShape, } from "react-intl";
import { AdministrativeOperation, BusinessOperation } from "@/TDLib/tdlogistics";
const business = new BusinessOperation()
const fetch_city_ward_district = new AdministrativeOperation()
const SignupForm = () => {
  interface FormValues {
    // Representor of business information
    user_fullname: string,
    user_phone_number: string,
    user_email: string,
    user_date_of_birth: string,
    user_cccd: string,
    user_province: string,
    user_district: string,
    user_town: string,
    user_detail_address: string,
    user_bin: string,
    user_bank: string,

    // Business information
    username: string,
    password: string,
    business_name: string,
    email: string,
    phone_number: string,
    tax_number: string, 
    province: string,
    district: string,
    town: string,
    detail_address: string,
    bin: string,
    bank: string,
  }
  interface ErrorValues {
    nameEr: string;
    emailEr: string;
    phoneNumberEr: string;
  }
  let user, otpCode;
  const initialValues: FormValues = 
  { 
    // Representor of business information
    user_fullname: "",
    user_phone_number: "",
    user_email: "",
    user_date_of_birth: "",
    user_cccd: "",
    user_province: "",
    user_district: "",
    user_town: "",
    user_detail_address: "",
    user_bin: "",
    user_bank: "",

    // Business information
    username: "",
    password: "",
    business_name: "",
    email: "",
    phone_number: "",
    tax_number: "", 
    province: "",
    district: "",
    town: "",
    detail_address: "",
    bin: "",
    bank: "",
};
  const initialValues2: ErrorValues = 
  { 
    nameEr: "",
    emailEr: "", 
    phoneNumberEr: "",

  };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setformErrors] = useState<ErrorValues>(initialValues2);
  const [shake, setshake] = useState(false);
  const [city, setCity] = useState([])
  const [district, setDistrict] = useState([])
  const [town, setWard] =useState([])

  // chỗ này dùng để lấy thành phố huyện xã
  useEffect(() => {
    const fetchCity = async () => {
      console.log("hello")
      const get = await fetch_city_ward_district.get({})
      console.log(get)
      setCity(get.data)
    };
    fetchCity();
    console.log("city",city)
  }, []);
  useEffect(() => {
    const fetchDistrict = async () => {
      if (formValues.province !== "")
      {
        const get = await fetch_city_ward_district.get({province: formValues.province})
        setDistrict(get.data)
      }
    };
    fetchDistrict();
  }, [formValues.province]);
  useEffect(() => {
    const fetchWard = async () => {
    if (formValues.district)
      {
        console.log("ne",formValues.district )
        const get = await fetch_city_ward_district.get({province: formValues.province, district: formValues.district})
        setWard(get.data)
      }
    };
    console.log(formValues.district)
    fetchWard();
  }, [formValues.district]);

  useEffect(() => {
    const fetchDistrict = async () => {
      if (formValues.user_province !== "")
      {
        const get = await fetch_city_ward_district.get({province: formValues.user_province})
        setDistrict(get.data)
      }
    };
    fetchDistrict();
  }, [formValues.user_province]);
  useEffect(() => {
    const fetchWard = async () => {
    if (formValues.user_district)
      {
        console.log("ne",formValues.user_district )
        const get = await fetch_city_ward_district.get({province: formValues.user_province, district: formValues.user_district})
        setWard(get.data)
      }
    };
    console.log(formValues.district)
    fetchWard();
  }, [formValues.user_district]);


  const buttonstyle = classNames(
    "py-3 px-4 w-[calc(80%)] rounded-full text-white font-bold uppercase text-xs text-center block w-calc(100%) focus:outline-none cursor-pointer sm:mt-8 sm:text-sm transition duration-150",
    {
      ["bg-indigo-200 animate-shake"]: shake,
      ["bg-indigo-600"]: !shake,
    }
  );
  const [showOtp, setshowOtp] = useState(false);


  //xử lý input
  const handleOther= (change: string, name: string) =>{
    const value = change;
    const updatedFormValues = { ...formValues, [name]: value };
    setFormValues(updatedFormValues);
  }
  const validate = (values: FormValues, type: number)=> {
    var errors: string = "";
    const NameRegex =/^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/i;
    const EmailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/i;
    const PhoneRegex = /^\d+$/;
    if (type == 1 && !values.business_name) {
      formErrors.nameEr = "Thiếu tên mất rồi.";
    }
    else if(!NameRegex.test(values.business_name.toLowerCase())) {
      formErrors.nameEr = "Mình ghi đầy đủ họ tên bạn nhé!";
    }
    else formErrors.nameEr ="";
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
      if (!values.phone_number) {
      formErrors.phoneNumberEr = "Nhập số điện thoại vào nè!";
    } else if (!PhoneRegex.test(values.phone_number)) {
      formErrors.phoneNumberEr= "Số này không hợp lệ rồi!";
    } else if (values.phone_number.length < 10) {
      formErrors.phoneNumberEr = "Hình như bạn nhập thiếu số nào rồi!";
    } else if (values.phone_number.length > 10) {
      formErrors.phoneNumberEr = "Bạn mình ơi, dư số nào rồi!";
    }
      else formErrors.phoneNumberEr ="";
    }
    if (!formErrors.phoneNumberEr && !formErrors.emailEr && !formErrors.nameEr)
    {setshake(false);}
  };
  const SignUp = () =>{
    console.log(formValues)
    const {business_name, email, phone_number} = formValues;
    const {nameEr, emailEr, phoneNumberEr} = formErrors;
    setshowOtp(!showOtp);
    Auth();
  }
  const Auth =() => {
    const {business_name, email, phone_number} = formValues;

    business.signup(formValues)
    .then(e => window.alert(e.error.message))
    .catch(e => window.alert(e.error.message))
  }
  return (
    <div>
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-4 sm:p-8 flex-1">
          <div className="mt-5 mx-auto">
            <div className="text-center flex flex-col h-120 items-center">  
                <h1 className="text-2xl w-full sm:text-3xl font-bold text-indigo-900">
                  <FormattedMessage id="signinpage.createaccount" />
                </h1>
              <form className="mt-5 p-4 flex flex-col  items-center w-full" action="" method="POST">
                <div className="flex flex-col h-80 overflow-y-scroll  items-center w-full">  
                  <div>
                    {/* name mail pass plapla */}
                    <h2 className="font-bold text-indigo-900">
                      <FormattedMessage id="signinpage.businessinfo" />
                    </h2>

                    <div id="username" className="relative mt-6 sm:mt-8">
                          <input
                            id="username"
                            name="username"
                            type="text"
                            className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                            placeholder="Name"
                            onChange={(e) =>handleOther(e.target.value,"username")} 
                            required
                          />
                          <label
                            htmlFor="username"
                            className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            <FormattedMessage id="signuppage.username" />
                          </label>
                    </div>

                    <div id="business_name" className="relative mt-8 sm:mt-10">
                      <input
                        id="business_name"
                        name="business_name"
                        type="text"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="Name"
                        onChange={(e) =>handleOther(e.target.value,"business_name")} 
                        required
                      />
                      <label
                        htmlFor="business_name"
                        className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signinpage.name" />
                      </label>
                    </div>

                    <div id="password" className="relative mt-8 sm:mt-10">
                      <input
                        id="password"
                        name="password"
                        type="text"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="Name"
                        onChange={(e) =>handleOther(e.target.value,"password")} 
                        required
                      />
                      <label
                        htmlFor="password"
                        className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signinpage.password" />
                      </label>
                    </div>

                    <div id="email" className="mt-8 sm:mt-10 relative">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="john@doe.com"
                        onChange={(e) => handleOther(e.target.value,"email")} 
                        required
                      />
                      <label
                        htmlFor="email"
                        className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email
                      </label>
                    </div>

                    <div id="phone_number" className="mt-8 sm:mt-10 relative">
                    <input
                      type="tel"
                      className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                      placeholder="Số điện thoại"
                      onChange={(e) => handleOther(e.target.value,"phone_number")}
                      required 
                    />
                    <label
                      htmlFor="phoneNumber"
                      className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      <FormattedMessage id="signinpage.phoneNumber" />
                    </label>
                    </div>

                    {/* chỗ này là bin và bank */}
                    <div className="flex gap-10">
                      <div className="mt-8 sm:mt-10 relative">
                        <input
                          id="bin"
                          type="text"
                          className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                          placeholder="Bin"
                          onChange={(e) =>handleOther(e.target.value,"bin")} 
                          required
                        />
                        <label
                          className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Bin
                        </label>
                      </div>

                      <div className="mt-8 sm:mt-10 relative">
                        <input
                          id="bank"
                          type="text"
                          className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                          placeholder="Bank"
                          onChange={(e) =>handleOther(e.target.value,"bank")} 
                          required
                        />
                        <label
                          className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Bank
                        </label>
                      </div>
                    </div>

                    <div className="mt-8 sm:mt-10 flex gap-10">
                    {/* chỗ này là địa chỉ chi tiết và thuế */}
                      <div className="w-3/5">
                        <div className="relative">
                            <input
                              id="business_name"
                              name="business_name"
                              type="text"
                              className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                              placeholder="Name"
                              onChange={(e) =>handleOther(e.target.value, "detail_address")} 
                              required
                            />
                            <label
                              htmlFor="business_name"
                              className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              <FormattedMessage id="signuppage.detail_address" />
                            </label>
                        </div>
                        <div className="relative mt-8 sm:mt-10">
                          <input
                            id="tax_number"
                            name="business_name"
                            type="text"
                            className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                            placeholder="Name"
                            onChange={(e) =>handleOther(e.target.value,"tax_number")} 
                            required
                          />
                          <label
                            htmlFor="tax_number"
                            className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            <FormattedMessage id="signuppage.taxnumber" />
                          </label>
                        </div>
                        
                      </div>
                    {/* chỗ này là thành quận huyện */}
                      <div className="w-3/5 relative flex flex-col gap-2">
                        <select
                          className={`text-xs md:text-sm border border-gray-300 rounded h-10 p-2 w-full`}
                          id="city"
                          aria-label=".form-select-sm"
                          value={formValues.province}
                          onChange={e =>  setFormValues({ ...formValues, province: e.target.value })}
                          required
                        >
                          <option value="">
                            <FormattedMessage id="signuppage.city"/>
                          </option>
                          {city.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>

                        <select
                          className={`text-xs md:text-sm border border-gray-300 rounded h-10 p-2 w-full`}
                          id="district"
                          aria-label=".form-select-sm"
                          value={formValues.district}
                          onChange={e =>  setFormValues({ ...formValues, district: e.target.value })}
                          required
                        >
                          <option value="">
                            <FormattedMessage id="signuppage.district"/>
                          </option>
                          {district.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>

                        <select
                          className={`text-xs md:text-sm border border-gray-300 rounded h-10 p-2 w-full`}
                          id="town"
                          aria-label=".form-select-sm"
                          value={formValues.town}
                          onChange={e =>  setFormValues({ ...formValues, town: e.target.value })}
                          required
                        >
                          <option value="">
                          <FormattedMessage id="signuppage.town"/>
                          </option>
                          {town.map((town) => (
                            <option key={town} value={town}>
                              {town}
                            </option>
                          ))}
                        </select>
                        
                      </div>
                      
                    </div>

                  </div>


                  {/* chỗ này là user info  */}
                  <div>
                    <h2 className="font-bold mt-10 text-indigo-900">
                      <FormattedMessage id="signinpage.userinfo" />
                    </h2>

                    <div id="fullname" className="relative mt-8 sm:mt-10">
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="Name"
                        onChange={(e) =>handleOther(e.target.value,"user_fullname")} 
                        required
                      />
                      <label
                        htmlFor="business_name"
                        className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signinpage.fullname" />
                      </label>
                    </div>

                    <div id="user_cccd" className="relative mt-8 sm:mt-10">
                      <input
                        type="text"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="Name"
                        onChange={(e) =>handleOther(e.target.value,"user_cccd")}
                        required 
                      />
                      <label
                        htmlFor="user_cccd"
                        className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signinpage.user_cccd" />
                      </label>
                    </div>

                    <div id="user_email" className="mt-8 sm:mt-10 relative">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="john@doe.com"
                        onChange={(e) => handleOther(e.target.value,"user_email")} 
                        required
                      />
                      <label
                        htmlFor="email"
                        className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email
                      </label>
                    </div>

                    <div id="user_phone_number" className="mt-8 sm:mt-10 relative">
                      <input
                        type="tel"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="Số điện thoại"
                        onChange={(e) => handleOther(e.target.value,"user_phone_number")} 
                        required
                      />
                      <label
                        htmlFor="phoneNumber"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signinpage.phoneNumber" />
                      </label>
                    </div>

                    <div id="user_date_of_birth" className="mt-8 sm:mt-10 relative">
                      <input
                        type="date"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="date_of_birth"
                        onChange={(e) => handleOther(e.target.value,"user_date_of_birth")}
                        required 
                      />
                      <label
                        htmlFor="phoneNumber"
                        className="absolute left-0 -top-4 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signinpage.dateofbirth" />
                      </label>
                    </div>


                    {/* chỗ này là bin và bank */}
                    <div className="flex gap-10">
                      <div className="mt-8 sm:mt-10 relative">
                        <input
                          id="bin"
                          type="text"
                          className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                          placeholder="Bin"
                          onChange={(e) =>handleOther(e.target.value,"user_bin")} 
                          required
                        />
                        <label
                          className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Bin
                        </label>
                      </div>

                      <div className="mt-8 sm:mt-10 relative">
                        <input
                          id="bank"
                          type="text"
                          className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                          placeholder="Bank"
                          onChange={(e) =>handleOther(e.target.value,"user_bank")}
                          required 
                        />
                        <label
                          className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Bank
                        </label>
                      </div>
                    </div>

                    <div className="mt-8 sm:mt-10 flex gap-10">
                    {/* chỗ này là địa chỉ chi tiết và thuế */}
                      <div className="w-3/5">
                        <div className="relative">
                            <input
                              id="business_name"
                              name="business_name"
                              type="text"
                              className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                              placeholder="Name"
                              onChange={(e) =>handleOther(e.target.value, "user_detail_address")} 
                              required
                            />
                            <label
                              htmlFor="business_name"
                              className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              <FormattedMessage id="signuppage.detail_address" />
                            </label>
                        </div>
                      </div>
                    {/* chỗ này là thành quận huyện */}
                      <div className="w-3/5 relative flex flex-col gap-2">
                        <select
                          className={`text-xs md:text-sm border border-gray-300 rounded h-10 p-2 w-full`}
                          id="city"
                          aria-label=".form-select-sm"
                          value={formValues.user_province}
                          onChange={e =>  setFormValues({ ...formValues, user_province: e.target.value })}
                          required
                        >
                          <option value="">
                            <FormattedMessage id="signuppage.city"/>
                          </option>
                          {city.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>

                        <select
                          className={`text-xs md:text-sm border border-gray-300 rounded h-10 p-2 w-full`}
                          id="district"
                          aria-label=".form-select-sm"
                          value={formValues.user_district}
                          onChange={e =>  setFormValues({ ...formValues, user_district: e.target.value })}
                          required
                        >
                          <option value="">
                            <FormattedMessage id="signuppage.district"/>
                          </option>
                          {district.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>

                        <select
                          className={`text-xs md:text-sm border border-gray-300 rounded h-10 p-2 w-full`}
                          id="town"
                          aria-label=".form-select-sm"
                          value={formValues.user_town}
                          onChange={e =>  setFormValues({ ...formValues, user_town: e.target.value })}
                          required
                        >
                          <option value="">
                          <FormattedMessage id="signuppage.town"/>
                          </option>
                          {town.map((town) => (
                            <option key={town} value={town}>
                              {town}
                            </option>
                          ))}
                        </select>
                        
                      </div>
                      
                    </div>
                  </div>
                </div>  
                <button
                type="submit"
                onClick={SignUp}
                className={buttonstyle}
                >
                    <FormattedMessage id="signinpage.verify" />
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignupForm;