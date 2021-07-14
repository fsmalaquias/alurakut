import { ProfileRelationsBoxWrapper } from "../ProfileRelations";


const ListItem = ({item}) => {
  return (
    <li>
      <a href={item.link} target="_blank">
        <img src={item.image} />
        <span>{item.title}</span>
      </a>
    </li>
  )
}

export default function ProfileRelationsBox (props) {
  console.log('ProfileRelationsBox.props:', props);
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.relationList.length})
      </h2>

      <ul>
        {props.relationList.slice(0,props.maxItensToShow).map((itemAtual) => {
          return <ListItem item={itemAtual} key={itemAtual.id} />;
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}