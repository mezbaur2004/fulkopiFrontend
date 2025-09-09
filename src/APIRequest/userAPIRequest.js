import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";

const url=import.meta.env.VITE_BASE_URL;