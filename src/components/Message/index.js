import styled from 'styled-components';

const Message = styled.div`
  background-color: rgba(200,200,200,0.5);
  backdrop-filter: blur(6px);
  border-radius: 8px;
  padding: 15px;
  font-size: 14px;
  margin-bottom: 10px;

  .from, .message{
    padding: 5px;
  }
  
`

export default Message;