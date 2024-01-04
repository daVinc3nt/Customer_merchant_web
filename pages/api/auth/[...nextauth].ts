// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import {OTP, User} from "../auth/fetching"
// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         name: {
//             label: "Name",
//             type: "Name",
//             placeholder: "Họ và tên",
//           },
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@example.com",
//         },
//         phoneNumber:{
//             label: "Number",
//             type: "Tel",
//             placeholder: "Số điện thoại",
//         },
//         otp: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//             // Verify OTP
//             const {name, email, phoneNumber, otp} = credentials;
//             if (!name || !email || !phoneNumber || !otp)
//                 return null;
//             const otpCode = new OTP(phoneNumber,email);
//             const user = new User(phoneNumber, email, name);
//             user.checkExistUser();
//             if (otpCode.verifyOTP({email, phoneNumber, otp})) 
//             return {name, email, phoneNumber};
//         }
//     }),
//   ],
// };
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
