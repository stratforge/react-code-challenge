
import AppRouter from './Routes';
import './App.css';
import LinkRoute from './elements/Link';

function App() {  
  return (
    <div className="App">
      <div className='app-header flex'>
        <span className='font-large margin-x'>SpaceX</span>
        <div className='menu-bar'>
          <div className='col'><LinkRoute to='/' name='Home' /></div>
          <div className='col'><LinkRoute to='/history' name='History' /></div>
          <div className='col'><LinkRoute to='/launches' name='Launches' /></div>
          <div className='col'><LinkRoute to='/rockets' name='Rockets' /></div>
        </div>
      </div>
      <div className='router-view'>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
