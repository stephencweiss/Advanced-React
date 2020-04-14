import {UpdateItem} from '../components/UpdateItem'
import Link from "next/link";
const Update = ({query}) => {
  return (
    <div>
      <UpdateItem id={query.id}/>
    </div>
  );
};

export default Update
