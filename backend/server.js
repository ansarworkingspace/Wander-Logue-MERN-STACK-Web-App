// import express from "express";//ORGINAL CODE
// import dotenv from 'dotenv'
// import cors from 'cors'
// dotenv.config()
// import {notFound,errorHandler} from './middleware/errorMiddleware.js'
// import connectDB from "./config/db.js";
// import cookieParser from "cookie-parser";

// const port = process.env.PORT || 4000
// import userRoutes from './routes/userRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'

// connectDB();

// const app = express()

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use('/api/users',userRoutes)
// app.use('/api/admin',adminRoutes)

// app.get('/',(req,res)=>res.send('server is ready'));
// app.use(notFound);
// app.use(errorHandler);



// app.listen(port,()=>console.log(`server start on port ${port}`));



import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from 'path'
const port = process.env.PORT || 4000
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

connectDB();

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
  origin: ["https://ansaren.online","https://www.ansaren.online"],
  credentials: true,
};

app.use(cors(corsOptions));




app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)


if (process.env.NODE_ENV === 'production'){
   const __dirname = path.resolve();
   app.use(express.static(path.join(__dirname, 'frontend/dist')));


   app.get('*', (req,res)=> 
   res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
   
   );

  }else{

  app.get('/',(req,res)=>res.send('server is ready'));
}







app.use(notFound);
app.use(errorHandler);



import { Server } from 'socket.io'
const server = app.listen(port,()=>console.log(`server start on port ${port}`));




const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["https://ansaren.online","https://www.ansaren.online"],
    
  },
});


io.on("connection",(socket)=>{
  console.log("connected with socket io");

socket.on("setup",(userData)=>{
   socket.join(userData._id);
  //  console.log(userData._id);
   socket.emit("connected");
})

socket.on("join chat",(room)=>{
  socket.join(room)
  console.log("User join room : "+room);
})

//typing animation
socket.on("typing", (room) => socket.in(room).emit("typing"));
socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
//typing animation


socket.on('new message', (newMessageRecived) => {
  const chat = newMessageRecived.room;

  if (!chat || !chat.participants) {
    return console.log('chat.participants not defined');
  }

  chat.participants.forEach((user) => {
    if (user._id === newMessageRecived.sender._id.toString()) {
      return;
    }

    // Emit the message to each participant in the chat
    socket.to(user._id).emit('message received', {
      room: chat, // Use the entire chat object
      sender: newMessageRecived.sender, // Use the sender information
      ...newMessageRecived, // Use the rest of the message content
    });

//*real time show bell icon

// Emit a real-time notification with the entire message object
socket.to(user._id).emit('new message notification', newMessageRecived);



  });

});





socket.on("leaveRoom", ({ room }) => {
  socket.leave(room);
  console.log("leave this room: "+room);
});


// socket.off("setup", () => {
//   console.log("USER DISCONNECTED");
//   socket.leave(userData._id);
// });


socket.off("setup", (userId) => {
  console.log("User disconnected:", userId);
  // Additional cleanup if needed
});


})