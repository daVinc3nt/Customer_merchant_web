/* 
Author: Minh Lu Xuan
Last update: 02/01/2024
*/


/**
 * OTP class to operate with OTP.
 */
export class OTP {
    /**
     * Method to construct an OTP object.
     * @param {string} phoneNumber 
     * @param {string} email 
     */
    private _phoneNumber: string;
    private _email: string;
    private _baseUrl: string;

    constructor(phoneNumber: string, email: string) {
        if (!phoneNumber || !email) {
            throw new Error("Số điện thoại và email không được rỗng.");
        }
        this._phoneNumber = phoneNumber;
        this._email = email;
        this._baseUrl = "https://tdlogistics.onrender.com/api/v1/otp";
    }
    /**
     * Method to get phone number
     */
    get phoneNumber() {
        return this._phoneNumber;
    }

    /**
     * Method to get email
     */
    get email() {
        return this._email;
    }

    /**
     * Method to send OTP
     * @returns {string} - Response's message 
     */
    async sendOTP(): Promise<any> {
        try {
            const response = await fetch(`${this._baseUrl}/send_otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone_number: this._phoneNumber,
                    email: this._email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
            }

            return data.message;
        } catch (error) {
            throw new Error((error as Error).message || "Lỗi mạng.");
        }
    }
    /**
     * Method to verify OTP.
     * @param {object} info 
     * @returns 
     */
    async verifyOTP(info: { phone_number: string, email: string, otp: string }): Promise<boolean> {
        const { phone_number, email, otp } = info;

        if (!phone_number || !email || !otp) {
            throw new Error("Không trường thông tin nào được để trống!");
        }

        // if (phoneNumber !== this._phoneNumber || email !== this._email) {
        //     throw new Error("Số điện thoại hoặc email không khớp!");
        // }

        try {
            const response = await fetch(`${this._baseUrl}/verify_otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đã xảy ra lỗi.")
            }

            return data.valid;
        } catch (error) {
            throw new Error((error as Error).message || "Lỗi mạng.");
        }
    }
}

/**
 * User class to operate with users
 */
export class User {
    private _phoneNumber: string;
    private _email: string | null;
    private _fullname: string | null;
    private _baseUrl: string;
    constructor(phoneNumber: string, email: string | null = null, 
        fullname: string | null = null) {
        if (!phoneNumber) {
            throw new Error("Không được để trống trường số điện thoại.");
        }

        this._phoneNumber = phoneNumber,
        this._email = email,
        this._fullname = fullname,
        this._baseUrl = "https://tdlogistics.onrender.com/api/v1/users";
    }

    /**
     * Get user's phone number
     */
    get phoneNumber() {
        return this._phoneNumber;
    }

    /**
     * Get user's email
     */
    get email() {
        return this._email;
    }

    /**
     * Get user's fullname
     */
    get fullname() {
        return this._fullname;
    }

    /**
     * Set user's email
     */
    set email(email) {
        this._email = email;
    }

    /**
     * Set user's fullname
     */
    set fullname(fullname) {
        this._fullname = fullname;
    }

    /**
     * Method to check whether user has existed or not.
     * @returns {boolean} - True if phone number has existed, opposite, false. 
     */
    async checkExistUser(): Promise<any>{
        try {
            if (!this._phoneNumber) {
                throw new Error("Không được để trống số điện thoại!");
            }

            const response = await fetch(`${this._baseUrl}/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phoneNumber: this._phoneNumber,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
            }

            return data.existed;
        } catch (error) {
            throw new Error((error as Error).message || "Lỗi mạng. Vui lòng thử lại!");
        }
    }

    /**
     * Method to get user information
     * @returns {object} - User's information
     */
    async getUserInfo(): Promise<any> {
        const response = await fetch(`${this._baseUrl}/search?phone_number = ${this._phoneNumber}`);

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
        }

        return data.data;
    }

    /**
     * Method to get user's information by other phone number.
     * @param {string} phoneNumber 
     * @returns {object} - User's info
     */
    async getUserInfobyphoneNumber(phoneNumber: string): Promise<any> {
        try {
            if (!phoneNumber) {
                throw new Error("Số điện thoại không được để trống!");
            }
    
            const response = await fetch(`${this._baseUrl}/search?phone_number = ${phoneNumber}`);
    
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
            }
    
            return data.data;
        } catch (error) {
            throw new Error((error as Error).message || "Lỗi mạng. Vui lòng thử lại!");
        }
    }

    /**
     * Method to create a new user 
     * @param {object} info 
     * @returns Response's message
     */
    async createUser(): Promise<string> {
        try {
            if (!this._phoneNumber || !this._email || !this._fullname) {
                throw new Error("Không trường thông tin nào được để trống!");
            }

            const response = await fetch(`${this._baseUrl}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phoneNumber: this._phoneNumber,
                    email: this._email,
                    fullname: this._fullname
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
            }

            return data.message;
        } catch (error) {
            throw new Error((error as Error).message || "Lỗi mạng. Vui lòng thử lại!");
        }
    }

    /**
     * Method to update user's info. An info is a set which is a subset of {email, fullname, avatar} \ null.
     * @param {object} newInfo
     * @returns {string} - Response's message
     */
    async updateUserInfo(newInfo: any): Promise<string> {
        try {
            if (!newInfo) {
                throw new Error("Thông tin không được phép rỗng!");
            }

            const response = await fetch(`${this._baseUrl}/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newInfo)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
            }

            return data.message;
        } catch (error) {
            throw new Error((error as Error).message || "Lỗi mạng. Vui lòng thử lại!");
        }
    }

    /**
     * Method to log out
     * @returns {string} - Response's message
     */
    async logout() {
        try {
            const response = await fetch(`${this._baseUrl}/logout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đã xảy ra lỗi.");
            }

            return data.message;
        } catch (error) {
            throw new Error((error as Error).message || "Lỗi mạng.");
        }   
    }
}

        /*------------------------------------------USAGE----------------------------------------------*/

// 1. Send OTP

// Define an OTP receiver object
// const OTPReceiver = new Object({
//     phoneNumber: "0981428116",
//     email: "minh.luxuanhcmc@hcmut.edu.vn",
// });

// // Define a new otp object
// const otp = new OTP(OTPReceiver.phoneNumber, OTPReceiver.email);

// // Send OTP
// otp.sendOTP()
//     .then(message => console.log(message))
//     .catch(error => console.log(error));


// // 2. Verify OTP

// // Define an OTP verifier object
// const OTPVerifier = new Object({
//     phoneNumber: "0981428116",
//     email: "minh.luxuanhcmc@hcmut.edu.vn",
//     otp: 324185
// });

// Verify OTP
// otp.verifyOTP(OTPVerifier)
//     .then(valid => {
//         if (!valid) {
//             return console.log("OTP không hợp lệ. Vui lòng thử lại!");
//         }
//         // Do somethings
//     })
//     .catch(error => console.log(error));

// Similar to User class
