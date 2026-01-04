import { FormatDate } from "./date.label.styles.jsx";

function formatarData(data) {
    const dataFormatada = new Date(data);
    return new Intl.DateTimeFormat('pt-BR').format(dataFormatada);
}


const DateLabel = ({ date }) => {
 
  const formatDate = date ? formatarData(date) : '';
  
  return (
    
      <FormatDate>
        {formatDate}
      </FormatDate>
  );
};

export default DateLabel;