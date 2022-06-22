import './App.css';
import Connexion from './connexion/Connexion'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Admin from './route/Admin';
import Vendeur from './route/Vendeur';
import Gerant from './route/Gerant'
import { useDispatch } from 'react-redux';
import { information } from './store/boutiqueSlice';
import { SocketContext, socket } from './context/socket'




function App() {




  const dispatch = useDispatch()
  useEffect(() => { dispatch(information()) }, [dispatch])


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  useEffect(() => { setUser((JSON.parse(localStorage.getItem('user')))) }, [setUser])


  return (

    <SocketContext.Provider value={socket}>
      <div className="App">

        {user && (user.role === 'admin') ?
          <Admin setUser={setUser} user={user}>

          </Admin>

          

            : user && user.role === 'Gérant' ?
              <Gerant setUser={setUser} user={user}>

              </Gerant>

              : user && user.role === 'Vendeur' ?
                <Vendeur setUser={setUser} user={user}>

                </Vendeur>


                : <Routes>
                  < Route path="" exact element={
                    <Connexion setUser={setUser}></Connexion>
                  } />
                </Routes>
        }


      </div>
    </SocketContext.Provider>


  );
}

export default App;
