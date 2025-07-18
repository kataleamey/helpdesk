import Tiledesk from '@tiledesk/tiledesk-client';

class TiledeskService {
  constructor() {
    this.client = null;
    this.listeners = {};
  }

  initialize(config) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        console.log('Tiledesk client already initialized.');
        return resolve(this.client);
      }
      
      this.client = new Tiledesk({
        projectid: config.projectId,
        token: config.token,
        APIURL: config.apiUrl || 'https://api.tiledesk.com/v3/',
        log: config.log !== undefined ? config.log : false,
      });

      this.client.on('auth.token.valid', (token) => {
        console.log('Tiledesk authentication successful.');
        this.setupEventListeners();
        resolve(this.client);
      });
      
      this.client.on('auth.error', (error) => {
        console.error('Tiledesk authentication error:', error);
        reject(new Error('Tiledesk authentication failed'));
      });

      this.client.on('ws.open', () => {
        console.log('Tiledesk WebSocket connection opened.');
      });

      this.client.on('ws.close', () => {
        console.log('Tiledesk WebSocket connection closed.');
      });
    });
  }
  
  setupEventListeners() {
    this.client.on('message.received', (message) => {
      this.emit('message.received', message);
    });

    this.client.on('message.sent', (message) => {
        this.emit('message.sent', message);
    });

    this.client.on('conversation.updated', (conversation) => {
        this.emit('conversation.updated', conversation);
    });
  }
  
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  sendMessage(messageData) {
    if (!this.client) {
      throw new Error('Tiledesk client not initialized.');
    }
    return this.client.sendMessage(messageData);
  }

  getConversations() {
    if (!this.client) {
        throw new Error('Tiledesk client not initialized.');
    }
    return this.client.getConversations();
  }

  getConversationById(conversationId) {
    if (!this.client) {
        throw new Error('Tiledesk client not initialized.');
    }
    return this.client.getConversationById(conversationId);
  }
  
  close() {
    if (this.client) {
      this.client.close();
      this.client = null;
      this.listeners = {};
    }
  }
}

const tiledeskService = new TiledeskService();
export default tiledeskService;