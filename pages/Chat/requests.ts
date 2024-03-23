import axios from 'axios';
import { IChat } from './interfaces';

export function readChatCache(): Promise<IChat[] | undefined> {
  return new Promise((resolve, reject) => {
    try {
      const chatCache = localStorage.getItem('chat_cache');
      if (chatCache) {
        const chatCacheArray = JSON.parse(chatCache) as IChat[];
        resolve(chatCacheArray);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function updateChatCache(chatCacheArray: IChat[]): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const updatedChatCache = JSON.stringify(chatCacheArray);
      localStorage.setItem('chat_cache', updatedChatCache);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}