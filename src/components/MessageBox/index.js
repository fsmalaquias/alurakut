import Message from "../Message";

const MessageItem = ({recado}) => {
  return (
    <Message>
      <h4 className="from">De: {recado.from}</h4>
      <div className="message">{recado.message}</div>
    </Message>
  )
}

export default function MessageBox(props){
  return (
    props.recados.slice(0,props.maxItensToShow).reverse().map(recadoAtual => {
      return <MessageItem recado={recadoAtual} key={recadoAtual.id}/>
    })
  )
}