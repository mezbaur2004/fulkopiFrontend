import {toast} from "react-hot-toast";

let EmailRegex = /\S+@\S+\.\S+/;
const MobileRegex = /^(?:\+88|0088)?01[3456789]\d{8}$/;


class FormHelper {
    IsEmpty(value) {
        return value.length === 0;
    }

    IsMobile(value) {
        return MobileRegex.test(value);
    }

    IsEmail(value) {
        return EmailRegex.test(value);
    }

    ErrorToast(msg) {
        toast.error(msg, {position: "bottom-center"});
    }

    SuccessToast(msg) {
        toast.success(msg, {position: "bottom-center"});
    }

}

export const {IsEmpty, IsMobile, IsEmail, ErrorToast, SuccessToast} = new FormHelper();