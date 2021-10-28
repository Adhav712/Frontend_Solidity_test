import React from 'react';
import Web3 from 'web3';
import {SimpleStorageContract_Address,SimpleStorageContract_abi} from './config';
import  './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
      this.state= {
        account: '',
        input: 0,
        output: '',
        instantupdate: 0
      }
  }

 
  
  onSubmit = async(event) =>{
  event.preventDefault();

   var Web3 = require('web3');
   const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545"); 

   const SimpleStorage = new web3.eth.Contract(SimpleStorageContract_abi,SimpleStorageContract_Address);
   
   const accounts = await web3.eth.getAccounts()
   this.setState({account: accounts[0]}) 
   console.log(accounts);

   const setData = await SimpleStorage.methods.set(this.state.input).send({from: accounts[0]})
   console.log('return: ',setData)

   const Listenevent = await SimpleStorage.getPastEvents('getstoredData',{},(function(err,result){
      console.log(result[0].returnValues.storedData);
      return result[0].returnValues.storedData; 
      this.setState({instantupdate: result[0].returnValues.storedData});  
    }));
   
   console.log(Listenevent);
   
  }

  Getoutput = async(event)=> {
   var Web3 = require('web3');
   const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545"); 
   const SimpleStorage = new web3.eth.Contract(SimpleStorageContract_abi,SimpleStorageContract_Address);
   

   const getData = await SimpleStorage.methods.get().call()
   this.setState({output: getData})
   console.log(getData);
  }

  ListenToEvents = async(event)=>{
   var Web3 = require('web3');
   const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545"); 
   const SimpleStorage = new web3.eth.Contract(SimpleStorageContract_abi,SimpleStorageContract_Address); 

   // const Listenevent = await SimpleStorage.getPastEvents('getstoredData',{});
   // console.log(Listenevent);
   // let getstoredDataEvents = SimpleStorage.getstoredData;
    // const Listenevent = await SimpleStorage.getPastEvents('getstoredData',(function(err,result){
    //   console.log(result[0].returnValues.storedData);
    //   return result[0].returnValues.storedData;
    //   this.setState({instantupdate: result[0].returnValues.storedData})
    // }))
    // this.setState({instantupdate: Listenevent});
    console.log(this.state.instantupdate);

  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(this.state.input)
  }

  render(){
    return(
      <div className='container'>
        <h1>Welcome to decentralized world</h1>
        <p>Hey this your public address: {this.state.account}</p>
        <input placeholder="Enter Something in number" 
        onChange ={this.onInputChange}
        />
        <button type="submit" onClick={this.onSubmit}>Submit</button>
        <p>Click here to get the value: {this.state.output}</p>
        <button type='get' onClick={this.Getoutput}>Getvalue</button>
        <h1>This is for events{this.state.instantupdate}</h1>
        <button onClick = {this.ListenToEvents} >events</button>
      </div>
    ); 
  }
} 

export default App;


