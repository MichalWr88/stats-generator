import NextAuth, { type Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
        };
      },

    }),

  ],
  onerror: (error, req, res) => {
    console.log("error", error);
    return res.status(500).json({ error: error.message });
  },
  jwt: {
    encryption: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,

};



const handler:Session = NextAuth(authOptions) as unknown as Session;

export { handler as GET, handler as POST };



// console.log(process.env.GOOGLE_SCOPE);
// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       requestTokenUrl: "https://accounts.google.com/o/oauth2/auth",
//       clientId: process.env.CLIENT_ID || "",
//       clientSecret: process.env.CLIENT_SECRET || "",
//       authorization: {
//         params: {
//           authorizationUrl:
//             "https://accounts.google.com/o/oauth2/auth?response_type=code",
//           scope: process.env.GOOGLE_SCOPE || "",
//           prompt: "consent",
//           access_type: "online",
//           response_type: "code",
//         },
//       },
//     }),
//   ],
//     jwt: {
//       encryption: true,
//       secret: process.env.JWT_SECRET,
//     },
//     secret: process.env.JWT_SECRET,
//   callbacks: {
//     async session({ session, token }: { session: Session; token: JWT }) {
//       const ss: Session & Record<string, unknown> = { ...session };

//       //   ss.user?.id = token.id;
//       ss.accessToken = token.accessToken;
//       ss.refreshToken = token.refreshToken;
//       ss.account = token.account;
//       return ss;
//     },

//     // async signIn(params) {
//     //   // console.log("signIn", params);

//     //   return params; // Do different verification for other providers that don't have `email_verified`
//     // },

//     jwt: async ({
//       token,
//       user,
//       account,
//     }: {
//       token: JWT;
//       user?: User | AdapterUser | undefined;
//       account?: Account | null | undefined;
//       profile?: Profile | undefined;
//       isNewUser?: boolean | undefined;
//     }) => {
//       console.log("tokeno", JSON.stringify(user));
//       console.log("account", account);
//       // console.log("account", account);
//       if (user?.id) {
//         token.id = user.id;
//       }
//       if (account) {
//         token.account = account;
//         token.accessToken = account.access_token;
//         token.refreshToken = account.refresh_token;
//       }
//       return await token;
//     },

//     // Getting the JWT token from API response
//     // jwt: async (token, user, account) => {
//     //   const isSignIn = user ? true : false;
//     //   console.log("token",token)
//     //   console.log("user",user)
//     //   if (isSignIn) {
//     //     token.jwt = user.jwt;
//     //     token.id = user.user.id;
//     //     token.name = user.user.username;
//     //     token.email = user.user.email;
//     //   }
//     //   return Promise.resolve(token);
//     // },

//     // session: async (session, user) => {
//     //   // session.jwt = user.jwt;
//     //   // session.id = user.id;
//     //   return Promise.resolve(session);
//     // },

//     // async signIn(params) {
//     //   console.log("profile", params);
//     //   return params; // Do different verification for other providers that don't have `email_verified`
//     // },
//     // async session({ session, token, user }) { console.log("session",session, token, user);return session },
//     // // async jwt(token, user, account, profile) {
//     // //   console.log("account", account, profile, user);
//     // //   if (account?.accessToken) {
//     // //     token.accessToken = account.accessToken;
//     // //     profile.accessToken = account.accessToken;
//     // //   }
//     // //   return token;
//     // // },
//   },
//   debug: false,
// };

// export default NextAuth(authOptions);

// if (!process.env.AZURE_TENANT_ID || !process.env.AZURE_CLIENT_ID || !process.env.AZURE_CLIENT_SECRET)
//   throw new Error('AZURE_TENANT_ID || AZURE_CLIENT_ID || AZURE_CLIENT_SECRET is undefined');

// export default NextAuth(authOptions);



