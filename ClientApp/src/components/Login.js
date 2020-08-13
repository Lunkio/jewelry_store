import React, { useState, useEffect } from 'react';
import loginService from '../services/loginService';
import jewelryService from '../services/jewelryService';
import buyerService from '../services/buyerService';
import { DivWrapper } from './DivWrapper';

const Login = () => {
    const [admin, setAdmin] = useState(null);
    const [addJewelry, setAddJewelry] = useState(true);
    const [boughtJewelry, setBoughtJewelry] = useState(false);
    const [onSaleJewelry, setOnSaleJewelry] = useState(false);

    const [type, setType] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [price, setPrice] = useState(1);
    const [story, setStory] = useState('');

    const [buyers, setBuyers] = useState([]);
    const [jewelriesOnSale, setJewelriesOnSale] = useState([]);

    // Gets buyers and jewelries from db
    useEffect(() => {
        const fetch = async () => {
            try {
                const fetchedBuyers = await buyerService.getBuyers();
                const fetchedJewelries = await jewelryService.getAll();
                console.log('fetchedJewelries', fetchedJewelries);
                setBuyers(fetchedBuyers);
                setJewelriesOnSale(fetchedJewelries);
            } catch (e) {
                console.log('error', e);
            }
        }
        fetch();
    }, []);

    // Checks if admin is in local storage
    useEffect(() => {
        const loggedAdminJSON = window.localStorage.getItem('loggedAdmin');
        if (loggedAdminJSON) {
            const loggedAdminParse = JSON.parse(loggedAdminJSON);
            setAdmin(loggedAdminParse);
        }
    }, [])

    //Takes care of login
    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        try {
            const admin = await loginService.login({ username, password });
            setAdmin(admin);
            window.localStorage.setItem('loggedAdmin', JSON.stringify(admin));
        } catch (e) {
            window.alert('Login failed');
            console.log('login failed', e);
        }
    }

    // The next 3 functions are for adding a new item to the databse
    const jewelryTypeSelector = (value) => { setType(value) };

    const fileSelectedHandler = (event) => { setUploadedFile(event.target.files[0]) };

    const fileUploadHandler = async (event) => {
        event.preventDefault();

        const jewelryFormObj = new FormData();
        jewelryFormObj.append('image', uploadedFile);
        jewelryFormObj.append('type', type);
        jewelryFormObj.append('price', price);
        jewelryFormObj.append('availability', true);
        jewelryFormObj.append('description', story);
        //console.log('jewelryFormObj', Array.from(jewelryFormObj));

        if (type === '' || uploadedFile === null || story === '') {
            window.alert('Please check jewelry details again, all the fields must be filled');
            return;
        }

        try {
            const result = await jewelryService.uploadJewelry(jewelryFormObj);
            //console.log('imageResult', imageResult);
            if (result.status !== 200) {
                window.alert('Something went wrong, please check jewelry details again');
                return;
            }

            setType('');
            setUploadedFile(null);
            setPrice(1);
            setStory('');
            const fetchedJewelries = await jewelryService.getAll();
            setJewelriesOnSale(fetchedJewelries);
            window.alert('Jewelry added successfully!');
        } catch (e) {
            console.log('error', e);
        }
    };

    // Shows login form
    const loginForm = () => {
        return (
            <DivWrapper className='container'>
                <form onSubmit={handleLogin}>
                    <div className='form-group'>
                        <label className='text_contour'>Username: </label>
                        <input className='form-control' id='un' type='text' name='username' />
                    </div>
                    <div className='form-group'>
                        <label className='text_contour'>Password: </label>
                        <input className='form-control' id='pw' type='password' name='password' />
                    </div>
                    <button className='btn btn-primary' type='submit'>Login</button>
                </form>
            </DivWrapper>
        )
    };

    // Shows form for adding jewelry
    const addJewelryForm = () => {
        return (
            <div>
                <h2 className='text_contour'>Add Jewelry</h2><hr />
                <form onSubmit={fileUploadHandler}>
                    Earring <input type='radio' name='type' id='ear' onChange={() => jewelryTypeSelector('earring')} /> <br />
                    Necklace <input type='radio' name='type' id='neck' onChange={() => jewelryTypeSelector('necklace')} /> <br />
                    Terrarium <input type='radio' name='type' id='terra' onChange={() => jewelryTypeSelector('terrarium')} /> <br /> <hr />
                    Select image <input type='file' name='img' id='selImg' onChange={fileSelectedHandler} /> <br /> <hr />
                    Price: <input type='number' id='price' value={price} min='2' max='999' onChange={e => setPrice(e.target.value)} /> <br /> <hr />
                    Story: <textarea className='form-control' id='story' rows='5' value={story} onChange={e => setStory(e.target.value)} ></textarea> <br /> <hr />
                    <button className='btn upload-btn' type='submit'>Upload</button>
                </form>
            </div>
        )
    };

    // Shows all the bought items
    const boughtJewelryForm = () => {

        const setAsDone = async (buyer) => {
            //console.log(buyer);
            if (window.confirm(`Are you sure you want to remove this order, id of ${buyer.id}. This will also delete the bought jewelry from the database forever.`)) {
                try {
                    for (let i = 0; i < buyer.items.length; i++) {
                        await jewelryService.deleteJewelry(buyer.items[i].id);
                    }
                    await buyerService.deleteBuyer(buyer.id);
                    setBuyers(buyers.filter(b => b.id !== buyer.id));
                } catch (e) {
                    window.alert('Something went wrong, please try again later');
                    console.log('error', e);
                }
            }
        };

        if (buyers.length === 0) {
            return <h2 className='text_contour'>No buyers</h2>;
        }

        if (buyers.length > 0) {
            return (
                <div>
                    {buyers.map(buyer =>
                        <div key={buyer.id} className='text_contour'>
                            <p>PayerID: <span style={{ 'fontWeight': 'bold' }}>{buyer.payerID}</span></p>
                            <p>Buyerid: {buyer.id}</p>
                            <div className='name-email'>
                                <h4>{buyer.firstName} {buyer.lastName} /</h4>
                                <p className='email'>{buyer.email}</p>
                            </div>
                            <p>Time of purchase: {buyer.timeOfPurchase}</p>
                            {buyer.items.map(item =>
                                <div key={item.id}>
                                    <div className='admin-item-img-box'>
                                        <img src={`data:image/jpg;base64,${item.img}`} alt='item' />
                                    </div>
                                    <p>ID of jewelry: {item.id}</p>
                                </div>
                            )}
                            <button onClick={() => setAsDone(buyer)} className='btn done-btn'>Mark as Done</button>
                            <p style={{ 'fontSize': '0.7rem' }}>Warning, setting order as done will remove this buyer and all the details forever!</p>
                            <hr />
                        </div>
                    )}
                </div>
            );
        }
    };

    // Shows all jewelries on sale
    const onSaleJewelryForm = () => {

        const deleteJewelry = async (jewelry) => {
            //console.log(jewelry)
            if (window.confirm(`Are you sure you want to delete the item with id ${jewelry.id}`)) {
                try {
                    await jewelryService.deleteJewelry(jewelry.id);
                    setJewelriesOnSale(jewelriesOnSale.filter(item => item.id !== jewelry.id));
                } catch (e) {
                    window.alert('Something went wrong, please try again later');
                    console.log('error', e);
                }
            }
        };

        if (jewelriesOnSale.length === 0) {
            return <h2 className='text_contour'>No jewelries on sale</h2>;
        } 

        if (jewelriesOnSale.length > 0) {
            return (
                <div>
                    {jewelriesOnSale
                        .filter(item => item.availability === true)
                        .map(item =>
                            <div key={item.id} className='text_contour'>
                                <h5>id: {item.id}</h5>
                                <p>Price: {item.price}€</p>
                                <div className='admin-item-container'>
                                    <div className='admin-item-img-box'>
                                        <img src={`data:image/jpg;base64,${item.img}`} alt='item' />
                                    </div>
                                    <p>{item.story}</p>
                                </div>
                                <button className='btn delete-btn' onClick={() => deleteJewelry(item)}>Delete</button>
                                <p style={{ 'fontSize': '0.7rem' }}>Warning, deleting the item can't be undone and it will be gone forever</p>
                                <hr />
                            </div>
                        )}
                </div>
            );
        }
    }

    // Sets the view
    const setBought = () => {
        setBoughtJewelry(true);
        setAddJewelry(false);
        setOnSaleJewelry(false);
    };

    //Sets the view
    const setAdd = () => {
        setAddJewelry(true);
        setBoughtJewelry(false);
        setOnSaleJewelry(false);
    };

    //Sets the view
    const setOnSale = () => {
        setAddJewelry(false);
        setBoughtJewelry(false);
        setOnSaleJewelry(true);
    };

    return (
        <DivWrapper className='container'>
            {admin !== null &&
                <div>
                    <div className='login-btn-container'>
                        <button className='btn add-btn' onClick={() => setAdd()}>Add Jewelry</button>
                        <button className='btn bought-btn' onClick={() => setBought()}>Bought Jewelry</button>
                        <button className='btn onsale-btn' onClick={() => setOnSale()}>Jewelry On Sale</button>
                    </div><hr className='divider' />
                </div>
            }
            {admin === null && loginForm()}
            {admin !== null && addJewelry && addJewelryForm()}
            {admin !== null && boughtJewelry && boughtJewelryForm()}
            {admin !== null && onSaleJewelry && onSaleJewelryForm()}
        </DivWrapper>
    );
}

export default Login;