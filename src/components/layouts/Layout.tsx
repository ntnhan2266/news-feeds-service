import Header from "../Header";
import '../../../styles/main.scss';

const Layout = props => (
  <div className='container'>
    <Header />
    {props.children}
  </div>
);

export default Layout;
