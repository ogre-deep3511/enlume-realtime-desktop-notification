const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const routeUrls = require('./routes/routes');

mongoose.connect(process.env.DATABASE,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }).then(() => {
      console.log("Database connected successfully!!!");
});

app.use(express.json());
app.use(cors());
app.use('/api', routeUrls);

io.on('connection', function (socket) {
  socket.on( 'show_notification', function( data ) {
    console.log(data.title,data.message);
    io.sockets.emit( 'show_notification', { 
      title: data.title, 
      message: data.message, 
      icon: data.icon, 
    });
  });
});

http.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});