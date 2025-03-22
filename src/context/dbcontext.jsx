import { db } from "../config/dbconfig";
import { collection,doc, getDoc,setDoc,getDocs } from "firebase/firestore";
import { query,where } from "firebase/firestore";

const usersCollectionRef = collection(db, "users")


export const saveUserCode = async (user, code, active) => {
    if (!user) {
        console.error("User not logged in")
        return
    }

    try {
        await  setDoc(doc(db, "users", user.uid), {
            email: user.email,
            code: code,
            language : active
        })
        console.log("code saved successfully")
    }
    catch (error) {
        console.error("error saving code", error)
    }
};

export const getUserCode = async (user) => {
    if (!user) {
        console.error("User not logged in")
        return
    }
    try {
        const query_result = await getDoc(doc(usersCollectionRef,user.uid))
        return query_result.data() || ""
        
    }
    catch (error) {
        console.error("error getting code", error)
    }
};