// import axios from "axios";
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

// function Crud() {

//   const [data, setData] = useState([]);  
//   const [edituser, setEditUser] = useState(null);

//   const [formData, setFormData] = useState({ id: "", name: "", email: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const fetchUser = async () => {
//     const resp = await fetch("http://localhost:8000/users");
//     const data = await resp.json();
//     setData(data);
//     console.log(data);
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleSubmit = async () => {
   

//     console.log(formData);

//     const res = await axios.post("http://localhost:8000/users", formData);
//     console.log(res.data);
//     fetchUser();
//     setFormData({ id: "", name: "", email: "" });
//   };
//   const deleteData = async(id) => {
//    const res = await axios.delete(`http://localhost:8000/users/ ${id}`);
//    console.log(res.data)
//     fetchUser();
//   };
//   const edituUser1 = (user) => {
//     setFormData({ id: user.id, name: user.name, email: user.email });
//     setEditUser(user.id);
//   };
//   const updateUser = async() => {
//    const res = await axios.put(`http://localhost:8000/users/${edituser}`, formData);
//    console.log(res.data)
//     fetchUser();
//     setEditUser(null);
//     setFormData({ id: "", name: "", email: "" });
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
            
//             <th>name</th>
//             <th>email</th>
//             <th>actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item ,ind) => (
//             <tr key={ind}>
              
//               <td>{item.name}</td>
//               <td>{item.email}</td>

//               <td>
//                 {edituser === item.id ? (
//                   <>
//                     <button onClick={updateUser}>save</button>
//                     <button>cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => edituUser1(item)}>edit</button>
//                     <button
//                       onClick={() => {
//                         deleteData(item.id);
//                       }}>
//                       delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <form onSubmit={(e)=>e.preventDefault()}>
//         <input
//           type="text"
//           placeholder="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <button onClick={handleSubmit}>Add user</button>
//       </form>
//     </div>
//   );
// }

// export default Crud;
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Crud() {
  const [users, setUsers] = useState([]);
  const [filterUsers ,setFilterUsers ] = useState([])
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingUserId, setEditingUsrId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formErrors,setFormErrors] = useState({})
  const [isSubmitted,setIssubmitted] = useState(false)
  const [search ,setSearch] = useState('')
  const [searchMsg ,setSearchMsg] = useState('')

  const fetchusers = async () => {
    const user = await axios.get("http://localhost:8000/users");
    setUsers(user.data);
    setFilterUsers(user.data)
  };
  const  handleSearch = ()=>{
    
   
      let filtereseachData = users.filter(user=>user.name.toLowerCase().includes(search.toLowerCase()))
 
      
      if (filtereseachData.length === 0) {
        setSearchMsg("User not found");
      } else {
        setFilterUsers(filtereseachData)
        setSearchMsg("");
      }

  }
  const handleClear = ()=>{
   
   
    setFilterUsers(users)
  
  }
  useEffect(() => {
    fetchusers();
  }, []);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; 


  const validateForm =()=>{
    const newErrors = {}
    const regxemail =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!formData.name){
      newErrors.name='name is required'
    }else if(!formData.name.length >8){
      newErrors.name='name is not less than 8 characters'
    }
    if(!formData.email){
      newErrors.email='email is required'
    }else if(!regxemail.test(formData.email)){
      newErrors.email = 'please enter the valid email address'
    }
    return newErrors
  }
const handleSubmit = (e)=>{
  e.preventDefault()
//  const newErrors =  validateForm()
//  setFormErrors(newErrors)
//  if(Object.keys(newErrors).length===0){
//   setIssubmitted(true)
//   setFormData({ name: "", email: "" })
  

//  }
}
  const handleAddUser = async () => {
    const newErrors =  validateForm()
    setFormErrors(newErrors)
    if(Object.keys(newErrors).length===0){
     setIssubmitted(true)
     setFormData({ name: "", email: "" })
     try {
      const res = await axios.post(
        "http://localhost:8000/users",
        // {
        // name,
        // email,
        // }
        formData
      );
      console.log("user is crated", res.data);
      fetchusers();
      // setName("");
      // setEmail("");
    } catch (error) {
      console.log("there was an error", error);
    }
     
   
    }else{
      setIssubmitted(false)
    }
   
  };
  const handleDeleteUser  = async(userId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/users/${userId}`);
      console.log("user is deleted successfully", res.data);
      fetchusers();
    } catch (error) {
      console.log("there was an error", error.message);
    }
  };
  const handleEeditUser = (user) => {
    // setName(user.name);
    // setEmail(user.email);
    setFormData({ name: user.name, email: user.email });
    console.log(user.email);
    setEditingUsrId(user.id);
    setEdit(true);
  };
  const handleSaveuser = async () => {
    try {
      const res = await axios.put(
       ` http://localhost:8000/users/${editingUserId}`,
        formData
        // { name, email }
      );
      console.log("user is updated", res.data);
      fetchusers();
      // setName("");
      // setEmail("");
      setFormData({ name: "", email: "" });
      setEdit(false);
    } catch (error) {
      console.log("there was an error", error.message);
    }
  };
  return (
    <div>
      <h1>{edit ? "SaveUser" : "AddUser"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label>Enter Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="enter your name"
          // onChange={(e) => setName(e.target.value)}
          onChange={handleChange}
        />
        </div>
      
        {formErrors.name&&<p style={{color:'red'}}>{formErrors.name}</p>}
        <br/>
        <br/> 
        <div>
        <label>Enter Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
            placeholder="enter your email"
          //onChange={(e) => setEmail(e.target.value)}
          onChange={handleChange}
        />
        </div>
     
                {formErrors.email&&<p style={{color:'red'}}>{formErrors.email}</p>}
        <button onClick={edit ? handleSaveuser : handleAddUser} style={{marginTop:'30px'}}>
          {edit ? "Save" : "Add"}
        </button>
      </form>
      <div style={{marginTop:'30px' ,marginBottom:'30px'}}>
<input type='search' placeholder="search here" onChange={e=>setSearch(e.target.value)}/>
{searchMsg&&<p style={{color:'red'}}>{searchMsg}</p>}
<button onClick={ handleSearch}>search</button>
<button onClick={handleClear}>clear</button>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ paddingRight: "60px" }}>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td style={{ paddingRight: "90px" }}>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    delete
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEeditUser(user)}>edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Crud; 
