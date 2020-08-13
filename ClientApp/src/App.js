import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { initJewelries } from './reducers/jewelryReducer';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Necklaces from './components/Necklaces';
import Earrings from './components/Earrings';
import Terrariums from './components/Terrariums';
import ClickedJewelry from './components/ClickedJewelry';
import Login from './components/Login';
import Cart from './components/cart/Cart';
import Success from './components/Success';
import Cancel from './components/Cancel';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            try {
                dispatch(initJewelries());
            } catch (e) {
                console.log('error', e);
            }
        };
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Router>
                <NavBar />
                <Route exact path='/' render={() => <Home />} />
                <Route path='/necklaces' render={() => <Necklaces />} />
                <Route path='/earrings' render={() => <Earrings />} />
                <Route path='/terrariums' render={() => <Terrariums />} />
                <Route path='/cart' render={() => <Cart />} />
                <Route path='/item/:id' render={() => <ClickedJewelry />} />
                <Route path='/admin/login' render={() => <Login />} />
                <Route path='/success' render={() => <Success />} />
                <Route path='/cancel' render={() => <Cancel />} />
                <Footer />
            </Router>
        </React.Fragment>
    );
}

export default App;
