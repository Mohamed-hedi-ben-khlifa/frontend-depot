import React from "react";
import io from "socket.io-client";

export const socket = io("wss://backend-depot.herokuapp.com")
export const SocketContext = React.createContext();



