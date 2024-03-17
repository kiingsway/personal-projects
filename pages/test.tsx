import Buttons from "./_components/Buttons";

export default function Tests() {

  const btn0 = <button title="a">Teste1</button>;
  const btn1 = <button>Teste1</button>;
  const btn2 = <Buttons.Icon>Teste1</Buttons.Icon>
  const btn3 = <Buttons.Link>Teste1</Buttons.Link>;

  return (
    <button>Teste1</button>
  );
}