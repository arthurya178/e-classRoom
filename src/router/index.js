import {createRouter, createWebHistory} from 'vue-router'
import register from '../components/register/index.vue'
import classRoom from "../components/classRoom/index.vue";
import home from "../components/Home/index"
import error404 from "../components/error404"
import editData from "@/components/editData";
import systemCtrl from "@/components/systemCtrl";



let routes = [
    {
        path: '/',
        name: "home",
        component: home
    },
    {
        path: '/register',
        name: "register",
        component: register
    },
    {
        path: '/classroom',
        name: "classRoom",
        component: classRoom
    },
    {
        path: '/edit',
        name: "editUser",
        component: editData
    },
    {
        path: '/control',
        name: "systemControl",
        component: systemCtrl
    },
    {
      path:"/:pathMatch(.*)*",
      name:"error404",
      component: error404
    }
]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.name == "classRoom")
    {
        if($cookies.get("session") != undefined )
        {
            next()
        }
        else
        {
            next({name:"register"})
        }
    }
    else{
        next()
    }
})
export default router