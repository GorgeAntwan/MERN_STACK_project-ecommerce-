import bcrypt from 'bcryptjs';
const users=[
    { 
      name:"Gorge",
      email:"Gorge@example.com",
      password:bcrypt.hashSync("12345678",10),
      isAdmin:true,
    },
    { 
        name:"Remon",
        email:"Remon@example.com",
        password:bcrypt.hashSync("12345678",10),
        isAdmin:false
        
    },
    { 
        name:"Mario",
        email:"Mario@example.com",
        password:bcrypt.hashSync("12345678",10),
        isAdmin:false
    },
];

export default users;