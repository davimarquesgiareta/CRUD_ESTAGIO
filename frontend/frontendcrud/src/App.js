import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';
var idaux=0

function App() {
  var subButton = document.getElementById("subButton")
  var updateButton = document.getElementById("updateButton")
  
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

  const updateForm = (product) => {
    
    subButton.style.display = 'none'
    updateButton.style.display = 'block'
    
    document.getElementById("name").value = product.name ;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price ;
    document.getElementById("quantity").value = product.quantity ;

  idaux = product.id
  setName(document.getElementById("name").value)
  setDescription(document.getElementById("description").value)
  setPrice(document.getElementById("price").value)
  setQuantity(document.getElementById("quantity").value)
    
  window.scrollTo(0, 0);
  }

 const updateProduct = () => {
  //Axios.put('http://localhost:4000/products/'+id) 
  //window.location.href = '/'
  setName(document.getElementById("name").value)
  setDescription(document.getElementById("description").value)
  setPrice(document.getElementById("price").value)
  setQuantity(document.getElementById("quantity").value)
  
  Axios.put('http://localhost:4000/products/'+idaux,{
        name: name,
        description: description,
        price: price,
        quantity: quantity 
    })
  alert('sucess update')
  window.location.href = '/'
 }

  return (
    <div className="App">
      <div className="form" id="productForm">
        <h1>CRUD APLLICATION</h1>

        <label>Name</label>
        <input id="name" type="text" name="name" onChange={(e) => setName(e.target.value)}/>

        <label>Description</label>
        <input id="description" type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>

        <label>Price</label>
        <input id="price" type="number" name="price" onChange={(e) => setPrice(e.target.value)}/>

        <label>Quantity</label>
        <input id="quantity" type="number" name="quantity" onChange={(e) => setQuantity(e.target.value)} />

       
        <button id="subButton" onClick={submitProduct}>Submit</button>
        <button id="updateButton" onClick={updateProduct}>Save</button>

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
            <button onClick={ (e)=> updateForm(
              {id: val.id,
              name: val.name, 
              description: val.description,
              price: val.price,
              quantity: val.quantity}
            )
              }>Update</button>
            </div>
            
          ) 
        })} 
    </div>
  );
}

export default App;
