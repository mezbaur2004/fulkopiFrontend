import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";
import {getToken, setToken, setUserDetails} from "../helper/sessionHelper.js";
import {SetUserList} from "../redux/state-slice/user-slice.js";

const url=import.meta.env.VITE_BASE_URL;
const AxiosHeader={headers:{"token":getToken()}}

export async function LoginRequest(email, password) {
    try {
        store.dispatch(ShowLoader());
        let URL=`${url}/login`;
        let PostBody = { email, password };
        let res = await axios.post(URL, PostBody);
        if (res.data.status === 200) {
            setToken(res.data.token);
            setUserDetails(res.data.data);
            SuccessToast("Login Success");
            store.dispatch(HideLoader());
            return true;
        } else {
            ErrorToast(res.data.message || "Invalid Email or Password");
            store.dispatch(HideLoader());
            return false;
        }
    }catch (error) {
        store.dispatch(HideLoader());
        ErrorToast("Something went wrong. Please try again.");
        return false;
    }
}

export async function RegistrationRequest(email,firstName,lastName,mobile,password,photo){
    try {
        store.dispatch(ShowLoader())
        let URL=`${url}/registration`;
        let PostBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password, photo:photo}
        let res=await axios.post(URL,PostBody)
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                if(res.data['data']['keyPattern']['email']===1){
                    ErrorToast("Email Already Exist")
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else {
                SuccessToast("Registration Success")
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    }
}

export async function userDetails(){
    try{
        store.dispatch(ShowLoader())
        let URL=`${url}profiledetails`;
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetUserList(res.data.data));
        }
    }catch(error){

    }
}

