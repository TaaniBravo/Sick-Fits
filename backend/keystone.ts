// Import files needed.
import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import { withItemData, statelessSessions } from "@keystone-next/keystone/session"
import {User} from "./schemas/User";
import {Product} from "./schemas/Product";
import {ProductImage} from "./schemas/ProductImage";
import { insertSeedData } from "./seed-data";

const MONGODB = process.env.MONGODB_URI || "mongodb://localhost/keystone-sick-fits";

const sessionConfig = {
    maxAge: 60*60*24*360, // how long should they say signed in?
    secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: [
            'name',
            'email',
            'password'
        ]
        // todo add in initial roles
    },
    passwordResetLink: {
        async sendToken(args) {
            console.log(args)
        }
    }
});

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        }
    },
    db: {
        adapter: 'mongoose',
        url: MONGODB,
        async onConnect(keystone) {
            if (process.argv.includes('--seed-data')) await insertSeedData(keystone);
        }
    },
    lists: createSchema({
        // schema items go in here.
        User,
        Product,
        ProductImage
    }),
    ui: {
        // todo change this for roles
        isAccessAllowed: ({ session }) => {
            console.log(session);
            return !!session?.data
        }
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: 'id name email'
    })
}));