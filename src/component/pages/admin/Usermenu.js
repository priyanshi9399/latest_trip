import {NavLink,Link} from "react-router-dom";
import NavigationMenu from "../../../_nav";

import { FaHome,FaUserFriends,FaWallet,FaRegWindowRestore } from "react-icons/fa";





export default function Usermenu(){

  let userDta =  JSON.parse(localStorage.getItem("userDta"));
  const menul_filter = NavigationMenu.filter((menu)=> {
      if(menu.urlAccess.indexOf(userDta.user.user_group) !== -1){
        return true;
      }
      if (userDta.user.user_group === "Admin") {
    
        return menu.urlAccess.includes("Admin");
      } else {
       
        return menu.urlAccess.includes("Users");
      }
  })
 
const myMenu = menul_filter.map((menu,key)=> {
      
        if (!menu.children ) {
        return(
          <li class="nav-item" key={key}>
            
            <NavLink to={menu.url} className="nav-link">
            <i className={menu.icon}></i> {menu.name}
            </NavLink>
          </li>
          )
        }
   
        return(

            <li class="nav-item" key={key}>
                    <a href="#" class="nav-link">
                      <i className={menu.icon}></i> {menu.name}
                      <p>
                        
                        <i class="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul class="nav nav-treeview">
                        {menu.children.map((childData,key2)=> { 
                          return(
                          <li class="nav-item " key={key2}>
                            
                            <NavLink to={childData.url} className="nav-link">
                            <i className={childData.icon}></i> {childData.name}
                            </NavLink>
                          </li>
                          )
                        })}
                    </ul>

            </li>  
          )

	})

return(
		<>

    {myMenu}

   
   
    </>
	)
	
}