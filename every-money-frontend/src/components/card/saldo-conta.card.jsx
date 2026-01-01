import { Card, Header, Title } from "./saldo-conta.card.styles";
import { FaMoneyBillWave } from "react-icons/fa";
import PriceLabel from "../label/price.label";

function SaldoContaCard({ saldoConta }) {

    const saldo = saldoConta?.saldo;
    const nomeConta = saldoConta?.nome;
    const background = saldoConta?.background;

  return (
    <Card background={background}>
      <Header>
        <FaMoneyBillWave size={20} />
        <Title>{nomeConta}</Title>
      </Header>
      
      <PriceLabel valor={saldo} />
      
    </Card>
  );
}

export default SaldoContaCard;
