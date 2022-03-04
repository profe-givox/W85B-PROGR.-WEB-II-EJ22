import React, {Component} from "react";
import { Table, Button } from 'reactstrap';
import PizzaReg from './PizzaReg.js'

export class PizzaCatalogo extends Component{
    constructor(props){
        super(props);
        this.state = {data: [], modal: false , ide: 0};

        this.handleClick = this.handleClick.bind(this);
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
        this.setState({modal: true, ide: 0});
    }

    render(){
        return (
            <div>
                <h1 id="tabelLabel" >Catalogo de pizza</h1>
                <p>Este componente demuestra el uso de Fetch para ir a la API server</p>
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
                            Salsa
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
                                    <td><Button color="primary" onClick={this.handleClick} >
                                            Edit
                                        </Button>
                                        <Button color="primary" onClick={this.handleClick} >
                                            X
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        
                    </tbody>
                    </Table>
                    <PizzaReg modal={this.state.modal}  ide={this.state.ide} />
            </div>
        );
    }
}