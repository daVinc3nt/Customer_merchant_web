import * as React from "react";

function AddIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" 
        viewBox="0 0 24 24" fill="none" stroke="#990012" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"/>
    </svg>
  );
}

export default AddIcon;
