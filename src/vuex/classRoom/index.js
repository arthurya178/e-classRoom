import axios from "axios";
const state={
    userStatus:0,
    classroomAll:[],
    classroomTitle:"第 1-1 章",
    fixMode:false
}
const mutations={
    UPDATE_CLASSROOM_ALL(state,receiveData){
        state.classroomAll = receiveData
    },
    UPDATE_CLASSROOM_TITLE(state,receiveData){
        state.classroomTitle = receiveData
    },
    UPDATE_USER_STATUS(state,receiveData){
        state.userStatus = receiveData
    },
    UPDATE_FIX_MODE(state,receiveData){
        state.fixMode = receiveData
    }
}

const actions={
    fetchClassRoomFromSV({commit}){
        console.log("ClassRoom|AllData |Got Data")
        axios.defaults.withCredentials = true
        axios.get("/api/classroom").then((res)=>{
            console.log(res)
            commit("UPDATE_CLASSROOM_ALL",res.data)
        })
        console.log("Run Title")
        axios.get("/api/classroom/title/get").then((res)=>{
            console.log(res.data.title)
            commit("UPDATE_CLASSROOM_TITLE",res.data.title)
        })
    },
    fetchClassroomTitle({commit}){
        axios.get("/api/classroom/title/get").then((res)=>{
            console.log(res.data.title)
            commit("UPDATE_CLASSROOM_TITLE",res.title)
        })
    }
    ,
    changeStatus({commit,state},data){
        commit("UPDATE_USER_STATUS",data)
        console.log("ClassRoom|Update Data")
        console.log(state.userStatus)
        axios.defaults.withCredentials = true
        axios.post("/api/classroom/update",{stat:state.userStatus}).then((res)=>{
            console.log(res)
        })
    },
    fetchControlFromSV({commit}){
        axios.defaults.withCredentials = true
        axios.get("/api/classroom/control").then((res)=>{
            console.log(res)
            commit("UPDATE_FIX_MODE",true)
        })
    },
    setClassroomTitle({commit},data){
        console.log("SETTING")
        axios.defaults.withCredentials = true
        axios.post("/api/classroom/title/set",{title:data}).then((res)=>{
            console.log(data)
            commit("UPDATE_CLASSROOM_TITLE",data)
        })
    }


}
const getters={
    classroomAll:(state)=> state.classroomAll,
    classroomTitle:(state)=> state.classroomTitle,
    userStatus:(state)=> state.userStatus,
    fixMode:(state)=> state.fixMode
}

const classroomModule = {
    state,
    mutations,
    actions,
    getters
}

export default classroomModule;