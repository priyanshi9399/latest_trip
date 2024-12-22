import React from "react";
const AlertMessage = (props) => {
  const { title,message,type } = props;

  return (

        <div class="alert alert-info alert-dismissible">
            <button type="button" class="close" data-dismiss={type} aria-hidden="true">×</button>
            <h5> {title}!</h5>
            {message}
        </div>
   
  );
};

export default AlertMessage;
