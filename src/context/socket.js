import React from "react";
import io from "socket.io-client";

export const socket = io("ws://localhost:4040")
export const SocketContext = React.createContext();



