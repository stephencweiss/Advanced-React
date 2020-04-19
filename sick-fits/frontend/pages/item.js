import {SingleItem} from '../components/SingleItem'
function Item(props) {
  console.log({props})
  return (
    <div>
      <SingleItem id={props.query.id}/>
    </div>
  );
}

export default Item;
