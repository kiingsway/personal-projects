import React from "react";

export interface IChatConfig {
  hide_avatar: boolean;
  hide_author: boolean;
  hide_clock: boolean;
}

export interface IUseChatConfig {
  chatConfig: IChatConfig;
  // eslint-disable-next-line no-unused-vars
  setChatConfig: (new_config: IChatConfig) => void;
}

const chatConfig_default: IChatConfig = {
  hide_author: false,
  hide_avatar: false,
  hide_clock: false,
};


export default function useChatConfig(): IUseChatConfig {


  const [state, setState] = React.useState<IChatConfig>(chatConfig_default);

  React.useEffect(() => {
    setState(loadChatConfig());
  }, []);

  function setChatConfig(new_config: IChatConfig): void {
    setState(new_config);
    saveChatConfig(new_config);
  }

  return { chatConfig: state, setChatConfig };

}

const isChatConfig = (data: any): data is IChatConfig => {
  const ischatconfig = (
    typeof data === 'object' &&
    'hide_avatar' in data &&
    typeof data.hide_avatar === 'boolean' &&
    'hide_author' in data &&
    typeof data.hide_author === 'boolean' &&
    'hide_clock' in data &&
    typeof data.hide_clock === 'boolean'
  );
  
  return ischatconfig;
};

const saveChatConfig = (config: IChatConfig): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const browser_support_localstorage = typeof window !== 'undefined' && window.localStorage;
      if (browser_support_localstorage) {
        localStorage.setItem('chat_config', JSON.stringify(config));
        resolve();
      } else {
        reject('LocalStorage não suportado ou indisponível no navegador.');
      }
    } catch (error) {
      reject(`Erro ao salvar configuração do chat: ${error}`);
    }
  });
};

const loadChatConfig = (): IChatConfig => {

  try {

    if (!(typeof window !== 'undefined' && window.localStorage)) return chatConfig_default;

    const savedConfigString = localStorage.getItem('chat_config');

    if (!savedConfigString) return chatConfig_default;

    const savedConfig = JSON.parse(savedConfigString);

    if (isChatConfig(savedConfig)) return savedConfig;

    return chatConfig_default;

  } catch (error) {

    return chatConfig_default;

  }

};