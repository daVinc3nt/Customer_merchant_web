import { useState, useEffect } from "react";

const SignupForm = () => {
  interface FormValues {
    name: string;
    email: string;
    phoneNum: string;
  }
  interface ErrorValues {
    name: string;
    email: string;
    phoneNum: string;
  }
  const initialValues: FormValues = { name: "", email: "", phoneNum: "" };
  const initialValues2: ErrorValues = { name: "", email: "", phoneNum: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
  
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
    const updatedFormValues = { ...formValues, phoneNum: value };
    setFormValues(updatedFormValues);
    setFormErrors({...formErrors, phoneNum: validate(updatedFormValues, 3)});
  };
    const validate = (values: FormValues, type: number): string => {
      var errors: string = "";
      const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const PhoneRegex = /^\d+$/;
      if (type == 1 && !values.name) {
        errors = "Thiếu tên mất rồi.";
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
        if (values.phoneNum === "") {
        errors = "Nhập số điện thoại vào nè!";
      } else if (!PhoneRegex.test(values.phoneNum)) {
        errors= "Số này không hợp lệ rồi!";
      } else if (values.phoneNum.length < 10) {
        errors = "Hình như bạn nhập thiếu số nào rồi!";
      } else if (values.phoneNum.length > 10) {
        errors = "Bạn mình ơi, dư số nào rồi!";
      }
    }
      return errors;
    };
  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-4 sm:p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="text-center">
              <h1 className="text-xl sm:text-4xl font-bold text-indigo-900">
                Tạo tài khoản
              </h1>

              <form className="mt-5 sm:mt-10" action="" method="POST">
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
                    className=" absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Tên
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.name}</p>
                </div>
                <div className="mt-5 sm:mt-10 relative">
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
                    className=" absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.email}</p>
                </div>
                <div className="mt-5 sm:mt-10 relative">
                  <input
                    type="tel"
                    className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Số điện thoại"
                    onChange={handleNum} 
                  />
                  <label
                    htmlFor="phoneNum"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Số điện thoại
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.phoneNum}</p>
                </div>

                <input
                  type="submit"
                  value="Sign up"
                  className="mt-10 py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500
                   text-white font-bold uppercase text-xs text-center block w-full focus:outline-none 
                   focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 
                   cursor-pointer sm:text-sm"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
