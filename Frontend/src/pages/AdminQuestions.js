// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminQuestions = () => {
//     const [questions, setQuestions] = useState([]);
//     const [editQuestion, setEditQuestion] = useState(null);

//     useEffect(() => {
//         fetchQuestions();
//     }, []);

//     const fetchQuestions = async () => {
//         const res = await axios.get("http://localhost:5000/api/admin/questions", { withCredentials: true });
//         setQuestions(res.data);
//     };

//     const handleDelete = async (id) => {
//         await axios.delete(`http://localhost:5000/api/admin/question/${id}`, { withCredentials: true });
//         fetchQuestions();
//     };

//     const handleEditSave = async () => {
//         await axios.put(`http://localhost:5000/api/admin/question/${editQuestion._id}`, editQuestion, { withCredentials: true });
//         setEditQuestion(null);
//         fetchQuestions();
//     };

//     const handleChange = (e) => {
//         setEditQuestion({ ...editQuestion, [e.target.name]: e.target.value });
//     };

//     return (
//         <div>
//             <h2>All Questions</h2>
//             <table border="1" cellPadding="5">
//                 <thead>
//                     <tr>
//                         <th>Question</th>
//                         <th>Topic</th>
//                         <th>Difficulty</th>
//                         <th>Correct Answer</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {questions.map(q => (
//                         <tr key={q._id}>
//                             <td>{q.questionText}</td>
//                             <td>{q.topic}</td>
//                             <td>{q.difficulty}</td>
//                             <td>{q.correctAnswer}</td>
//                             <td>
//                                 <button onClick={() => setEditQuestion(q)}>Edit</button>
//                                 <button onClick={() => handleDelete(q._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {editQuestion && (
//                 <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
//                     <h3>Edit Question</h3>
//                     <label>Question Text: </label>
//                     <input type="text" name="questionText" value={editQuestion.questionText} onChange={handleChange} /><br /><br />

//                     <label>Topic: </label>
//                     <input type="text" name="topic" value={editQuestion.topic} onChange={handleChange} /><br /><br />

//                     <label>Difficulty: </label>
//                     <select name="difficulty" value={editQuestion.difficulty} onChange={handleChange}>
//                         <option value="easy">Easy</option>
//                         <option value="medium">Medium</option>
//                         <option value="hard">Hard</option>
//                     </select><br /><br />

//                     <label>Correct Answer: </label>
//                     <input type="text" name="correctAnswer" value={editQuestion.correctAnswer} onChange={handleChange} /><br /><br />

//                     <label>Options (comma separated): </label>
//                     <input type="text" name="options" value={editQuestion.options.join(",")} onChange={(e) => setEditQuestion({ ...editQuestion, options: e.target.value.split(",") })} /><br /><br />

//                     <label>Explanation: </label>
//                     <input type="text" name="explanation" value={editQuestion.explanation} onChange={handleChange} /><br /><br />

//                     <button onClick={handleEditSave}>Save</button>
//                     <button onClick={() => setEditQuestion(null)}>Cancel</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminQuestions;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Add this import

const AdminQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [editQuestion, setEditQuestion] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const res = await axios.get("http://localhost:5000/api/admin/questions", { withCredentials: true });
        setQuestions(res.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/admin/question/${id}`, { withCredentials: true });
        fetchQuestions();
    };

    const handleEditSave = async () => {
        await axios.put(`http://localhost:5000/api/admin/question/${editQuestion._id}`, editQuestion, { withCredentials: true });
        setEditQuestion(null);
        fetchQuestions();
    };

    const handleChange = (e) => {
        setEditQuestion({ ...editQuestion, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Container for button */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <h2>All Questions</h2>
                {/* ✅ Add Question Button */}
                <Link to="/admin/questions/add">
                    <button
                        style={{
                            padding: "8px 16px",
                            background: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            position: "sticky",
                            top: "20px",
                            zIndex: "10",
                        }}>
                        + Add Question
                    </button>
                </Link>
            </div>

            {/* Table for Questions */}
            <table border="1" cellPadding="5" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Topic</th>
                        <th>Difficulty</th>
                        <th>Correct Answer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map(q => (
                        <tr key={q._id}>
                            <td>{q.questionText}</td>
                            <td>{q.topic}</td>
                            <td>{q.difficulty}</td>
                            <td>{q.correctAnswer}</td>
                            <td>
                                <button onClick={() => setEditQuestion(q)} style={{ marginRight: "5px" }}>Edit</button>
                                <button onClick={() => handleDelete(q._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Question Modal */}
            {editQuestion && (
                <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
                    <h3>Edit Question</h3>
                    <label>Question Text: </label>
                    <input type="text" name="questionText" value={editQuestion.questionText} onChange={handleChange} /><br /><br />

                    <label>Topic: </label>
                    <input type="text" name="topic" value={editQuestion.topic} onChange={handleChange} /><br /><br />

                    <label>Difficulty: </label>
                    <select name="difficulty" value={editQuestion.difficulty} onChange={handleChange}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select><br /><br />

                    <label>Correct Answer: </label>
                    <input type="text" name="correctAnswer" value={editQuestion.correctAnswer} onChange={handleChange} /><br /><br />

                    <label>Options (comma separated): </label>
                    <input type="text" name="options" value={editQuestion.options.join(",")} onChange={(e) => setEditQuestion({ ...editQuestion, options: e.target.value.split(",") })} /><br /><br />

                    <label>Explanation: </label>
                    <input type="text" name="explanation" value={editQuestion.explanation} onChange={handleChange} /><br /><br />

                    <button onClick={handleEditSave}>Save</button>
                    <button onClick={() => setEditQuestion(null)} style={{ marginLeft: "10px" }}>Cancel</button>
                </div>
            )}
        </div>
    );
};


export default AdminQuestions;
