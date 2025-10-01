import { getServerSession } from "next-auth";
import { authOptions } from "./AuthOptions";


export const getUserSession =async()=> getServerSession(authOptions)
