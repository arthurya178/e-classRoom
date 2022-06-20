import {createStore} from "vuex";
import account from "@/vuex/account"
import classroom from "@/vuex/classRoom"


export default createStore({
    modules: {
        account,
        classroom
    }
});