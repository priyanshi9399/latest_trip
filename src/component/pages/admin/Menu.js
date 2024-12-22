import {NavLink,Link} from "react-router-dom";
import NavigationMenu from "../../../_nav";

import { FaHome,FaUserFriends,FaWallet,FaRegWindowRestore } from "react-icons/fa";
import { useLocation } from 'react-router-dom';





export default function Menu(){

  const currentPath = window.location.pathname;
   const isActive = (path) => {
        return currentPath === path;
    };

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
          <li className={`nav-item ${isActive(menu.url) ? 'active' : ''}`} key={key}>
            
            <NavLink to={menu.url} className="nav-link">
            <span className="menu-title">{menu.name}</span>
            <i className={menu.icon}></i> 
            </NavLink>
          </li>
          )
        }   
        return(
          
              <li  className={`nav-item ${isActive(menu.url) ? 'active' : ''}`} key={key}>
                    <a
                      class="nav-link"
                      data-bs-toggle="collapse"
                      href={`#${menu.id}`}
                      aria-expanded="false"
                      aria-controls="ui-basic"
                    >
                      <span class="menu-title"> {menu.name}</span>
                      <i class="menu-arrow"></i>
                      <i className={menu.icon}></i>
                    </a>

                    <div class="collapse" id={menu.id}>
                      <ul class="nav flex-column sub-menu">

                        {menu.children.map((childData,key2)=> { 
                          return(
                          <li class="nav-item " key={key2}>
                            <NavLink to={childData.url} className="nav-link"  activeClassName="active">
                            {childData.name}
                            </NavLink>
                          </li>
                          )
                        })}
                      </ul>
                    </div>
            </li>  
          )

	})

return(
		<>

    {myMenu}

   
   
    </>
	)
	
}