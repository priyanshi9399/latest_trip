import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:5000');

export default socket;

