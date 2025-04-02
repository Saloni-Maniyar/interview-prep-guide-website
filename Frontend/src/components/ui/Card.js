// import React from "react";

// const Card = ({ children }) => {
//     return (
//         <div className="border border-gray-300 rounded-lg shadow-md p-6 bg-white">
//             {children}
//         </div>
//     );
// };

// export default Card;


import React from "react";

export const Card = ({ children, className }) => {
    return <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow ${className}`}>{children}</div>;
};

export const CardContent = ({ children }) => {
    return <div className="p-4">{children}</div>;
};
