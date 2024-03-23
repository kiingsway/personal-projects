import { Form, FormProps, Modal, Switch } from 'antd';
import React from 'react';
import styles from './styles.module.scss';
import { IChatConfig, IUseChatConfig } from '../useChatConfig';

interface Props {
  configModal: boolean;
  chatConfigState: IUseChatConfig;
  hideConfigModal: () => void;
}

export default function ConfigModal({ configModal, hideConfigModal, chatConfigState }: Props): JSX.Element {

  const [form] = Form.useForm<IChatConfig>();
  const { chatConfig, setChatConfig } = chatConfigState;

  const onFinish: FormProps<IChatConfig>["onFinish"] = new_config => {
    setChatConfig(new_config);
    hideConfigModal();
  };

  React.useEffect(() => {
    if (!configModal) form.setFieldsValue(chatConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configModal]);

  return (
    <Modal
      open={configModal}
      onOk={form.submit}
      onCancel={hideConfigModal}
      title='Configurações'>

      <div className={styles.main}>
        <Form<IChatConfig>
          form={form}
          initialValues={chatConfig}
          onFinish={onFinish}
          layout="inline"
          autoComplete="off">

          <Form.Item label="Hide Avatar" valuePropName="checked" name="hide_avatar">
            <Switch />
          </Form.Item>

          <Form.Item label="Hide Author" valuePropName="checked" name="hide_author">
            <Switch />
          </Form.Item>

          <Form.Item label="Hide Clock" valuePropName="checked" name="hide_clock">
            <Switch />
          </Form.Item>

        </Form>
      </div>
    </Modal>
  );
}