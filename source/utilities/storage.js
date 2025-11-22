import EncryptedStorage from 'react-native-encrypted-storage';
import navigate from "../navigation";
import { showGlobalModal } from "./ModalView";


export class DeviceStorage{
    static async insert(key, jsonValue={}){
        try {
            await EncryptedStorage.setItem(
                key,
                JSON.stringify(jsonValue)
            );
            return true
        } catch (error) {
            console.error("DeviceStorage InsertItem Error - ", error)
            showGlobalModal("Internal Issue Occured")
            navigate("login")
            return false
        }
    }

    static async delete(key){
        try {
            await EncryptedStorage.removeItem(key)
            return true
        } catch (error) {
            console.error("DeviceStorage DeleteItem Error - ", error)
            showGlobalModal("Internal Issue Occured")
            navigate("login")
            return false
        }
    }

    static async get(key, doNavigate=true){
        try {
            const data = await EncryptedStorage.getItem(key)
            return JSON.parse(data)
        } catch (error) {
            console.error("DeviceStorage GetItem Error - ", error)
            showGlobalModal("Internal Issue Occured")
            if(doNavigate){
                navigate("login")
            }
            return false
        }
    }
}
