// Import files needed.
import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema"
import {User} from "./schemas/User"

const MONGODB = process.env.MONGODB_URI || "mongodb://localhost/keystone-sick-fits";

const sessionConfig = {
    maxAge: 60*60*24*360, // how long should they say signed in?
    secret: process.env.COOKIE_SECRET
};

export default config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        }
    },
    db: {
        adapter: 'mongoose',
        url: MONGODB,
        // TODO add data seeding.
    },
    lists: createSchema({
        // schema items go in here.
        User
    }),
    ui: {
        // todo change this for roles
        isAccessAllowed: () => true
    },
    // add session values here.
})