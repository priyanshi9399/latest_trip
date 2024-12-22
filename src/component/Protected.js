import { Navigate,Outlet,useHistory } from "react-router-dom";
import DashboardIndex from "./../component/pages/admin/Index";
const Protected = ({UserGroup}) => {
    debugger;
    var isLogged=false;
    let token =  localStorage.getItem("token");
    let userDta =  JSON.parse(localStorage.getItem("userDta"));
     if(token){
        //isLogged =true;    
        let groups = UserGroup.split("|");
        //console.log(groups);
        
        if(groups.indexOf(userDta.user.user_group) !== -1){
            isLogged =true;    
        }

     }

     return isLogged ? <DashboardIndex><Outlet /></DashboardIndex> : <Navigate to="/login" replace />;
    
};
export default Protected;

