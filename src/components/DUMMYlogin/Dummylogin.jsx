// import axios from 'axios';
// import React,{useState} from 'react'
// import './Dummylogin.css'
// import { Navigate,useNavigate } from 'react-router-dom';
// const API_URL = process.env.REACT_APP_API_URL;
// const Dummylogin = () => {

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate('');
//     const handleSubmit = async (e) => {
//       // e.preventDefault();
//      try{
//         const response = await axios.post(`${API_URL}/api/auth/local`, {
//               identifier: username,
//               password: password,
//           });
//           console.log("Response:", response.data);
//           const jwtToken = response.data.jwt;
//           localStorage.setItem('JwtToken',jwtToken)
//           localStorage.setItem('User',response.data);
//           localStorage.setItem('UserId',response.data.user.id);
//           localStorage.setItem('EmailId',response.data.user.email)
//           navigate('/');
//      }catch(e) {
//         console.error(e);
//      }
//     };



//   return (
//     <div className="login">
//       <div className="login-container">
//         <h2>LOGIN</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Username:</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button className='button1' type="submit">Login</button>


//           <div style={{marginBottom:'20px'}}></div>
//            <button className='gButton' onClick={() =>
//           (window.location =`${API_URL}/api/connect/google`)} >
//           <div  className='searchImg'>
//             <img src='https://res.cloudinary.com/dx78kzenz/image/upload/v1702027041/google_logo_ff05da96f9.png' alt="" />
//           </div>
//           <p className='gText'>
//             Login with Google
//           </p>
//         </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Dummylogin