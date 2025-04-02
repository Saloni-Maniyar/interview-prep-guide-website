// import React from "react";

// const Button = ({ children, onClick }) => {
//     return (
//         <button
//             onClick={onClick}
//             className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
//         >
//             {children}
//         </button>
//     );
// };

// export default Button;



import React from "react";

export const Button = ({ children, onClick, type = "button", className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 ${className}`}
        >
            {children}
        </button>
    );
};
