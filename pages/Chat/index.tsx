import { Avatar, Button, Input, Tooltip } from 'antd';
import React from 'react';
import styles from './Chat.module.scss';
import useBoolean from '@/app/hooks/useBoolean';
import { readChatCache, updateChatCache } from './requests';
import { IChat } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { IoMdPerson } from "react-icons/io";
import { AiOutlineRobot } from "react-icons/ai";
import VirtualizedList, { TRowRenderer } from '@/pages-components/VirtualizedList';
import { VscError } from "react-icons/vsc";
import Buttons from '@/pages-components/Buttons';
import { LuSettings } from "react-icons/lu";
import ConfigModal from './ConfigModal';
import useChatConfig, { IChatConfig } from './useChatConfig';

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: ''
});

export default function Chat(): JSX.Element {

  const [chat, setChat] = React.useState('');
  const [chatCache, setChatCache] = React.useState<IChat[]>([]);
  const [loading, { setTrue: startLoad, setFalse: stopLoad }] = useBoolean();
  const [configModal, { setTrue: openConfigModal, setFalse: hideConfigModal }] = useBoolean();
  const chatConfigState = useChatConfig();

  React.useEffect(() => {
    startLoad();
    readChatCache()
      .then(chats => {
        if (!chats) throw new Error('Error getting saved chats from local storage');
        setChatCache(chats);
      }).finally(stopLoad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMsg = (message: string, author: 'me' | 'ia' | 'er') => {
    setChatCache(prev => {
      const newChats = [...prev, { author, message, datetime: DateTime.now().toISO() as string }];
      updateChatCache(newChats);
      return newChats;
    });
  };



  const handleChat = () => {
    if (!chat) return;
    const msg = chat;
    setChat('');
    addMsg(msg, 'me');
    startLoad();
    sendChat(msg)
      .then(chat_from_ia => {
        const iamsg = chat_from_ia;
        addMsg(iamsg, 'ia');
        setChat('');
      })
      .catch(error => {
        const iamsg = error;
        addMsg(iamsg, 'er');
      })
      .finally(stopLoad);
  };

  const rowRenderer: TRowRenderer = ({ index, style }) => {
    const i = chatCache.length - 1 - index;
    const chat = chatCache[i];
    return <ChatItem chatConfig={chatConfigState.chatConfig} key={uuidv4()} chat={chat} style={style} />;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleChat();
  };

  return (
    <div className={styles.main}>
      <div className={styles.main_header}>
        <Input
          value={chat}
          onChange={e => setChat(e.target.value)}
          // title='Insira sua mensagem...'
          // placeholder='Mensagem...'
          onKeyDown={handleKeyPress}
        />
        <Button
          onClick={handleChat}
          disabled={Boolean(loading || !chat)}
          type='primary'
          loading={loading}>
          Enviar
        </Button>
        <Buttons.Icon title='Configurações' icon={<LuSettings />} onClick={openConfigModal} />
      </div>

      <div className={styles.chats}>
        <VirtualizedList rowRenderer={rowRenderer} rowCount={chatCache.length} />
      </div>


      <ConfigModal
        chatConfigState={chatConfigState}
        configModal={configModal}
        hideConfigModal={hideConfigModal} />

    </div>
  );
}

interface ChatProps {
  chat: IChat;
  chatConfig: IChatConfig;
  style?: React.CSSProperties;
}

const ChatItem = ({ chat, style, chatConfig }: ChatProps): JSX.Element => {

  const all_props = {
    me: {
      icon: <IoMdPerson />,
      title: 'Eu',
      backgroundColor: '#9B59B6',
      titleStyle: undefined,
    },
    ia: {
      icon: <AiOutlineRobot fontSize={24} />,
      title: 'Chat',
      backgroundColor: 'rgb(25, 195, 125, 0.7)',
      titleStyle: undefined,
    },
    er: {
      icon: <VscError />,
      title: 'Error',
      backgroundColor: 'red',
      titleStyle: {
        color: 'red',
        fontWeight: 500,
      }
    },
  };

  const { backgroundColor, icon, title, titleStyle } = all_props[chat.author];

  const ChatTitle = () => {
    if (chatConfig.hide_author) return <></>;
    return <p style={titleStyle}>{title}</p>;
  };

  const ChatAvatar = () => {
    if (chatConfig.hide_avatar) return <></>;
    return <Avatar size={24} icon={icon} style={{ backgroundColor }} />;
  };

  const ChatTime = () => {
    if (chatConfig.hide_clock) return <></>;
    return (
      <Tooltip title={DateTime.fromISO(chat.datetime).toFormat('dd/LL/yyyy HH:mm:ss')}>
        <span>{DateTime.fromISO(chat.datetime).toFormat('HH:mm')}</span>
      </Tooltip>
    );
  };

  return (
    <div className={styles.chats_container} style={style}>
      <div className={styles.chats_item}>
        <div className={styles.chats_item_details}>
          <ChatAvatar />
          <ChatTime />
        </div>
        <div className={styles.chats_item_text}>
          <ChatTitle />
          <span>{chat.message}</span>
        </div>
      </div>
    </div>
  );
};

const sendChat = async (msg: string): Promise<string> => {


  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: "Who won the world series in 2020?" },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });

  console.log('completion', completion.choices[0].message.content);


  return new Promise((resolve, reject) => {
    const isError = Math.random() <= 0.3;
    setTimeout(() => {
      if (isError) reject('Não foi possível obter a mensagem. ERRO');
      resolve(`FINGE QUE É UMA RESPOSSTA DA IA PARA A SUA PERGUNTA: ${msg}`);
    }, 3000);
  });
};