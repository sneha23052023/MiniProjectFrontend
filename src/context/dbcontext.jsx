import { db } from "../config/dbconfig";
import { collection, addDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "users")

export const saveUserCode = async (user, code) => {
    if (!user) {
        console.error("User not logged in")
        return
    }

    try {
        await addDoc(usersCollectionRef, {
            email: user.email,
            code: code,
        })
        console.log("code saved successfully")
    }
    catch (error) {
        console.error("error saving code", error)
    }
};

