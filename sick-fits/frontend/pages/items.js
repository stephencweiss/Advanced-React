import {Items} from '../components'
function Home(props) {
  return (
    <div>
      <Items page={props.query.page} />
    </div>
  );
}

export default Home;
