import bcrypt from 'bcryptjs';
const users=[
    { 
      name:"Gorge",
      email:"Gorge@example.com",
      password:bcrypt.hashSync("12345678",10),
      isAdmain:true,
    },
    { 
        name:"Remon",
        email:"Remon@example.com",
        password:bcrypt.hashSync("12345678",10),
        isAdmain:false
        
    },
    { 
        name:"Mario",
        email:"Mario@example.com",
        password:bcrypt.hashSync("12345678",10),
        isAdmain:false
    },
];

export default users;