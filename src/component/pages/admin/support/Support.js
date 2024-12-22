import React , {useEffect,useState} from "react"; 

import {PostAPI} from "../../../../services/Service";

import {SERVER_IMG_PATH,SUPPORT_NUMBER,SUPPORT_EMAIL
} from "../../../../utils/Constants.js";



export default function Support() {
  const support_call3 =  SERVER_IMG_PATH + "public/img/support_call3.png";
  const support_massege3 =  SERVER_IMG_PATH + "public/img/support_massege3.png";
  const support_user3 =  SERVER_IMG_PATH + "public/img/support_user3.png";
  const support =  SERVER_IMG_PATH + "public/img/support.png";

    return (
        <div class="content-wrapper">
            <main role="main" class="col-md-12 pt-3 px-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">Support</h1>
              
              </div>

            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6">
    
                        <ul >
                            <li><img src="./img/support_call3.png"  width="25"/>  Support Number :   {SUPPORT_NUMBER}</li>
                            <li><img src="./img/support_massege3.png" width="25"/>  Email :   {SUPPORT_EMAIL} </li>
                     
                        </ul>
                 </div>
                 <div class="col-md-6">
                  <img class="" src="./img/support.png" width="50%"/>
                 </div>
               </div>
            </div>

    
          
            </main>
        </div>
      );
}