// At it's simplest, access controls returns a yes or no val depending on the users session
import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export const isSignedIn = ({ session }: ListAccessArgs) => {
  return !!session;
};

const generatedPermissions = Object.fromEntries(
  permissionsList.map(permission => [
    permission,
    ({ session }: ListAccessArgs) => !!session?.data.role?.[permission]
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageProducts({ session }) {
    // Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) return true;

    return { user: { id: session.itemId } };
  },

  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) return true; // They can read everything

    // Otherwise the should only see products based on status.
    return { status: "AVAILABLE" };
  }
};
