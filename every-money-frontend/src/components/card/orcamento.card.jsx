import React from 'react';

import PriceLabel from '../label/price.label';
import { CardContainer, CategoryBadge, Title, Content, ActionLink } from './orcamento.card.styles.jsx';

const OrcamentoCard = ({ orcamento }) => {

  return (
    <CardContainer borderColor="#10b981">
      <CategoryBadge>{orcamento.mesReferencia}</CategoryBadge>
      <Title>Categoria: {orcamento.tipoCategoria}</Title>
      <Content>
        <PriceLabel valor={orcamento.limite} />
      </Content>
      <ActionLink href="#">
        Editar   
        <span style={{ marginLeft: '8px' }}>→</span>
      </ActionLink>
    </CardContainer>
  );
};

export default OrcamentoCard;