import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [productsList, setProductsList] = useState([])

  useEffect(()=>{
    Axios.get('http://localhost:4000/products').then((response)=>{
      setProductsList(response.data)
    })
  },[])

  const submitProduct = () =>{ 
    Axios.post('http://localhost:4000/products',{
        name: name,
        description: description,
        price: price,
        quantity: quantity 
    })
        setProductsList([
          ...productsList,
          {name: name, description: description, price: price, quantity: quantity},
        ])
        alert('sucess insert')
        window.location.href = '/'   
  }

  const deleteProduct = (id) => {
    Axios.delete('http://localhost:4000/products/'+id) 
    window.location.href = '/'
  }

  return (
    <div className="App">
      <div className="form" id="productForm">
        <h1>CRUD APLLICATION</h1>

        <label>Name</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>

        <label>Description</label>
        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>

        <label>Price</label>
        <input type="number" name="price" onChange={(e) => setPrice(e.target.value)}/>

        <label>Quantity</label>
        <input type="number" name="quantity" onChange={(e) => setQuantity(e.target.value)} />

        <button onClick={submitProduct}>Submit</button>
       
      </div>
      {productsList.map((val)=>{
          return(
            <div className="card"> 
            <h2>id: {val.id}</h2>
            <h1>Name: {val.name}</h1>
            <p>Description: {val.description} </p>
            <p>Price: <b>{val.price} </b></p>
            <p>Quantity: <b>{val.quantity}</b></p>
            <button onClick={ (e)=> deleteProduct(val.id)}>Delete</button>
            <input type="text"/>
            <button>Update</button>
            </div>
            
          ) 
        })}
    </div>
  );
}

export default App;
