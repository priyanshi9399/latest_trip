import react from 'react';

const AuthReducer = (state={isLogin:false},action) => {
        if(action.type==="LOGIN"){
            return {isLogin:true}
        }

        if(action.type==="LOGOUT"){
            console.log("logout dispached work");
            return {isLogin:false}   
        }
        return state;
}

export default AuthReducer;