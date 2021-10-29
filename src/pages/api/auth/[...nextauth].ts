import { FmdBadTwoTone } from "@mui/icons-material"
import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { getMongoDb } from "utils/mongodb"


export default async function auth(req: any, res: any) {
    return await NextAuth(req, res, {
        session: {
            jwt: true,
            maxAge: 30 * 24 * 60 * 60 // 30 days
        },

        jwt: {
            secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnX', //use a random secret token here
            encryption: true
        },

        debug: true,
        callbacks: {
            async session({ session, user }) {
                return session
            }
        },
        adapter: MongoDBAdapter({ db: (await getMongoDb())}),
        providers: [
            Email({
                type: "email",
                id: "email-auth",
                name: "Email Auth",
                server: {
                    host: process.env.EMAIL_SERVER_HOST,
                    port: process.env.EMAIL_SERVER_PORT,
                    auth: {
                        user: process.env.EMAIL_SERVER_USER,
                        pass: process.env.EMAIL_SERVER_PASSWORD
                    }
                },
                from: process.env.EMAIL_FROM,

            }),
            // Providers.Credentials({
            //     // The name to display on the sign in form (e.g. 'Sign in with...')   
            //     name: 'Credentials',
            //     // The credentials is used to generate a suitable form on the sign in page.    
            //     // You can specify whatever fields you are expecting to be submitted.    
            //     // e.g. domain, username, password, 2FA token, etc.    
            //     credentials: {
            //         username: { label: "Username", type: "text", placeholder: "jsmith" },
            //         password: { label: "Password", type: "password" }
            //     },
            //     async authorize(credentials, req) {
            //         // Add logic here to look up the user from the credentials supplied     
            //         const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            //         if (user) {
            //             // Any object returned will be saved in `user` property of the JWT      
            //             return user
            //         } else {
            //             // If you return null or false then the credentials will be rejected        
            //             return null
            //             // You can also Reject this callback with an Error or with a URL:       
            //             // throw new Error('error message') 
            //             // Redirect to error page        
            //             // throw '/path/to/redirect'       
            //             // Redirect to a URL      
            //         }
            //     }
            // })
        ],
    })
}
