import {Items} from '../components'
function Home(props) {
  return (
    <div>
      <Items page={props.query.page || 1} />
    </div>
  );
}

export default Home;
