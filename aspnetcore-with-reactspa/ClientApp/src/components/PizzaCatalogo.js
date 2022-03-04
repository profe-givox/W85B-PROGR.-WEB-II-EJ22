import React, {Component} from "react";
import {  Container, Table, Button } from 'reactstrap';

export class PizzaCatalogo extends Component{
    constructor(props){
        super(props);
        this.state = {data: []}
    }

     componentDidMount(){

         fetch('pizza').then((response )=>{
              return response.json();   
         }).then(
             (dataApi) => {
                console.log(dataApi); 
                
                this.setState({data: dataApi}
                    );
                }
         );
        
    }

    handleClick  (e) {
        console.log('this is:', this);
        console.log('e:', e.target);
    }

    render(){
        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <Table hover>
                    <thead>
                        <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Pizza
                        </th>
                        <th>
                            Salza
                        </th>
                        <th>
                            Action
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map( pizza => 
                                <tr key={pizza.id}>
                                    <th scope="row">{pizza.id}</th>
                                    <td>{pizza.name}</td>
                                    <td>{pizza.sauce}</td>
                                    <td><Button color="primary" onClick={(e)=>this.handleClick(e)} >
                                            +
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        
                    </tbody>
                    </Table>
            </div>
        );
    }
}