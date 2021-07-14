import { ProfileRelationsBoxWrapper } from "../ProfileRelations";


const ListItem = ({item}) => {
  return (
    <li>
      <a href={item.link} target="_blank">
        <img src={item.image} />
        <span>{item.name}</span>
      </a>
    </li>
  )
}

export default function ProfileRelationsBox (props) {
  // console.log('ProfileRelationsBox.props:', props);
  let list = props.relationList;
  if(props.showRecentFirst){
    list = list.reverse();
  }
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({list.length})
      </h2>

      <ul>
        {list.slice(0,props.maxItensToShow).map((itemAtual) => {
          return <ListItem item={itemAtual} key={itemAtual.id} />;
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}