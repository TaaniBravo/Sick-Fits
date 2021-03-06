// Import files needed.
import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions
} from "@keystone-next/keystone/session";
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { CartItem } from "./schemas/CartItem";
import { OrderItem } from "./schemas/OrderItem";
import { Order } from "./schemas/Order";
import { Role } from "./schemas/Role";
import { insertSeedData } from "./seed-data";
import { sendPasswordResetEmail } from "./lib/mail";
import { extendGraphqlSchema } from "./mutations";
import { permissionsList } from "./schemas/fields";

const MONGODB =
  process.env.MONGODB_URI || "mongodb://localhost/keystone-sick-fits";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long should they say signed in?
  secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
    // todo add in initial roles
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    }
  }
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL || process.env.PORT],
        credentials: true
      }
    },
    db: {
      adapter: "mongoose",
      url: MONGODB,
      async onConnect(keystone) {
        if (process.argv.includes("--seed-data"))
          await insertSeedData(keystone);
      }
    },
    lists: createSchema({
      // schema items go in here.
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role
    }),
    extendGraphqlSchema,
    ui: {
      isAccessAllowed: ({ session }) => {
        // console.log(session)
        return !!session?.data;
      }
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id name email role {${permissionsList.join(" ")}}`
    })
  })
);
