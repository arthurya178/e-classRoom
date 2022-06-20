import axios from "axios";
const state={
    usrData:{}
}
const mutations={
    UPDATE_ALL_DATA(state,receiveData){

        state.usrData.account_id = receiveData.data.user_id
        state.usrData.user_department = receiveData.data.user_department;
        state.usrData.user_class = receiveData.data.user_class;
        state.usrData.user_name = receiveData.data.user_name
        state.usrData.user_std_id = receiveData.data.user_std_id
        state.usrData.user_Permission = receiveData.data.user_permission
        console.log(state.usrData)
    }
}

const actions={
    fetchUserFromSever({commit}){
        console.log("Execute Fetch")
        axios.defaults.withCredentials = true
        axios.get("/api/user/information").then((res)=>{
            console.log("Got Data")
            console.log(res)
            commit("UPDATE_ALL_DATA",res)
        })
    },

}
const getters={
    usr_data:(state)=>state.usrData
}

const accountModule = {
    state,
    mutations,
    actions,
    getters
}

export default accountModule;