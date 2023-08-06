import { Socket } from "socket.io";

var io: any;
var socket: Socket;
var isSetup = false;
export const ConnectSocketIo = (ioInit, socketInit: Socket) => {
    console.log("socket connected");

    io = ioInit;
    socket = socketInit;
    isSetup = true;
}

export const EventEmitter =  (event, payload ) => {

    if(!isSetup){
        // console.log("io not setup");
        return;
    }

    io.emit(event, payload);
}

// this is the function that will be called from anywhere in the app, to emit events for the frontend

