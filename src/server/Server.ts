import { io, Socket } from 'socket.io-client';
import Entity from '../entities/entitity.interface';

class Server {
  private _server: Socket;
  private _entities: Entity[];

  constructor() {
    this._server = io('http://localhost:8080');
    this._entities = [];

    this._server.on('connect', () => {
      console.log('connected');
    });
  }

  get server() {
    return this._server;
  }

  get entities() {
    return this._entities;
  }
}

export default Server;