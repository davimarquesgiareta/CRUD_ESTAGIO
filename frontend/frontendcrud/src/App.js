import React, {useState, useEffect} from "react";
import { Button } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
        <button id="updateButton" onClick={updateProduct}>Save Changes</button>
        
      </div>

      
      {productsList.map((val)=>{
        
        let badgeColor = ""
        let status = ""
        if (val.quantity<=20){badgeColor= "badgered" 
        status="CRITIC"}
        else if(val.quantity>=21 && val.quantity<=50){badgeColor= "badgeyellow"
        status="WARNING"}
        else if(val.quantity >=51){badgeColor= "badgegreen"
        status="OK"}

        return(
          
            <div className={"card"}> 
            <h1>Name: {val.name}</h1>
            <p>Description: <b>{val.description}</b> </p>
            <p>Price: R$<b>{val.price} </b></p>
            <p>Quantity: <b>{val.quantity}</b></p>
            <label className={`${badgeColor}`}>Status: {status}</label>
            <br></br>

            <div className="buttonsCard">
            <Button className="deleteButton"
             onClick={ (e)=> deleteProduct(val.id)}
            variant="contained" 
            color="secondary" 
            startIcon={<DeleteIcon/>}>
             Delete
            </Button>

            <Button
            variant="contained"
            color="default"
            startIcon={<EditIcon/>}
            className="updateButton"
            onClick={ (e)=> updateForm(
              {id: val.id,
              name: val.name, 
              description: val.description,
              price: val.price,
              quantity: val.quantity}
            )}
            >Update</Button>
            </div>
            
            </div>
          ) 
        })} 
    </div>
  );
}

export default App;
