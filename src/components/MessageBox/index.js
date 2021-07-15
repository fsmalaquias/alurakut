import Message from "../Message";

const MessageItem = ({recado}) => {
  console.log(recado);
  return (
    <Message>
      <h4 className="from">{recado.from}</h4>
      <div className="message">{recado.message}</div>
    </Message>
  )
}

export default function MessageBox({recados}){
  console.log(recados);
  return (
    recados.map(recadoAtual => {
      return <MessageItem recado={recadoAtual} key={recadoAtual.id}/>
    })
  )
}