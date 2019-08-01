const React = require('react');
const ReactDOM = require('react-dom');
const fetch = require('node-fetch')
require('./index.css');
const apiKey = '_WobXiZPIZDcbd8yfEnheZM2Zic-WiIE-ITtLM-jqEE-wn-Nu2wFu1wZrs2z-h6CZfURGVkw903yjxBS24ZqNcZZ6332WY6v2DSLLlpGYXA5lmmag-XWs8gLtM5AXXYx';
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            zipcode: '',
            optionChoice:'',
            validZip:false, 
            apiCall:false,
            data:null,
      };    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setOption = this.setOption.bind(this);
        this.fetchreq = this.fetchreq.bind(this);
        this.fetchdata = this.fetchdata.bind(this);
      }
      setOption(event){
          this.setState({optionChoice:event.target.value})
      }
      handleChange(event) {
        this.setState({zipcode: event.target.value});
      }
      handleSubmit(event) {
        this.setState({validZip:true});
        event.preventDefault();
      }
      fetchreq(event){
        this.setState({apiCall:true})
        event.preventDefault();
      }
      fetchdata(){
        let dankdata;
        let bodyterms = {zipcode:this.state.zipcode, term:this.state.optionChoice};
           fetch('/api', {
           method: 'POST',
           accept: 'application/json',
           headers:{'Content-Type': 'application/json'},
           body:JSON.stringify(bodyterms),
       }).then(response=>response.json())
       .then(data=>{
           dankdata = (data.slice(0,5))
           //this.setState({data:data})
           this.setState({apiCall:false});
           this.setState({data:dankdata});
           console.log('checking to seeif we get data')
          })
       .catch(err =>{
           console.log('err is ' + err)
       })
      }

    render(){
        const validZip = this.state.validZip;
        let restaurant;
        let frontEnd;
        if(validZip){
            restaurant = <Restaurants id="restaurants" key="restaurants" 
            zipcode={this.state.zipcode} optionChoice={this.state.optionChoice}
            fetchreq={this.fetchreq} apiCall ={this.state.apiCall} fetchdata={this.fetchdata}
            data = {this.state.data}
            />
            frontEnd=undefined;
        }

        if(!validZip){
            {/* handles userinput */}
           frontEnd =
            <form id = "inputPage" onSubmit={this.handleSubmit}>
                <label>
                <input type='text' placeholder='Enter A ZipCode' zipcode={this.state.zipcode} onChange={this.handleChange}/>
                </label>
                <select id="race" onChange={this.setOption}>
                <option value='' selected>Choose an Option</option>
                <option value='mexican'>Mexican</option>
                <option value='chinese' >Chinese</option>
                <option value='thai'>Thai</option>
                <option value='American'>American</option>
                <option value='Indian'>Indian</option>
                <option value='Fast'>Fast</option>
                <option value='Italian'>Italian</option>
                <option value='Vietnamese'>Vietnamese</option>
                </select>
                <input id="fuck" type='submit' value="Enter"/>
            </form>               
            {/*ends userinput */}
            restaurant=undefined
        }

        return(
            <div>
                {frontEnd}
                {restaurant}
            </div>
        )
    }
}
function Restaurants(props){
//props has zipcode and restaurant race preference
//here I want to make an API call 
if(props.data){
        return(
            <div>
                <div className = "column">
                <div>
               <ul>
               <img id="Rest1" src={props.data[0].image_url}/> 
               <li>
               Restaurant Name:{props.data[0].name}
               </li>
               <li>
               rating: {props.data[0].rating}
               </li>
               <li>
               price: {props.data[0].price}
               </li>
               <li>
               location: {props.data[0].location.display_address[0]}
               </li>               
               </ul>
                </div>
                <div>
               <ul>
               <img id="Rest2" src={props.data[1].image_url}/> 
               <li>
               Restaurant Name:{props.data[1].name}
               </li>
               <li>
               rating: {props.data[1].rating}
               </li>
               <li>
               price: {props.data[1].price}
               </li>
               <li>
               location: {props.data[1].location.display_address[0]}
               </li>               
               </ul>
                </div>
                <div>
               <ul>
               <img id="Rest3" src={props.data[2].image_url}/> 
               <li>
               Restaurant Name:{props.data[2].name}
               </li>
               <li>
               rating: {props.data[2].rating}
               </li>
               <li>
               price: {props.data[2].price}
               </li>
               <li>
               location: {props.data[2].location.display_address[0]}
               </li>               
               </ul>
                </div>
                </div>
                
            </div>
        )
    }
if(props.apiCall){
    props.fetchdata();
    console.log('fetching data')
}
if(!props.apiCall && props.data === null){
    return(
        <div>
            <button className="bounce" onClick={props.fetchreq}>
                Confirm
            </button>
            <p id="loadingPage">
        Zipcode {' ' + props.zipcode} and type of food is {' '+ props.optionChoice}    
            </p>
            </div>
    )
}
else{
    return(
        <div>
        Quickie Loading page 
        </div>
    )
}
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
export default App