// import React from "react";

// const Checkbox = ({ label, checked, onChange }) => {
//     return (
//         <label className="flex items-center space-x-2">
//             <input type="checkbox" checked={checked} onChange={onChange} />
//             <span>{label}</span>
//         </label>
//     );
// };

// export default Checkbox;



import React from "react";

export const Checkbox = ({ id, checked, onChange }) => {
    return (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="cursor-pointer"
        />
    );
};
