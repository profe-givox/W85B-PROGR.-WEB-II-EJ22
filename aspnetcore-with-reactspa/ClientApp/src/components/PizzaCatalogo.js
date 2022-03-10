import React, {Component} from "react";
import { Container, Table, Button, Modal, ModalBody, 
    ModalHeader, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


export class PizzaCatalogo extends Component{
    constructor(props){
        super(props);
        this.state = {data: [],salsas:[], ingredientes: [], accion: 0,  
             name: "", salsa: 1, toppings: []  };

        this.handleClick = this.handleClick.bind(this);
    }

     componentDidMount(){
        const datos = {
            pizzas: [],
            salsas: [],
            ingredientes: []
        };

         fetch('pizza').then((response )=>{
              return response.json();   
         }).then(
             (dataApi) => {
                datos.pizzas = dataApi;
                return fetch('pizza/sauce');
                /*
                console.log(dataApi); 
                
                this.setState({data: dataApi}
                    );
                */
                }
                
               
         ).then(
             (response) => {
                 return response.json();
             }
         ).then(
             (dataSalsa) => {
                 datos.salsas = dataSalsa;
                 return fetch('pizza/topping');
             }
         ).then(
             (response) => {return  response.json()}
         ).then(
             (dataTopping) => {
                 datos.ingredientes = dataTopping;
                 this.setState({data: datos.pizzas,
                    salsas: datos.salsas, ingredientes: datos.ingredientes});
                    console.log(this.state);
             }
         );
        
    }

    mitoogle = () => {
        this.setState({accion: 0});
    }

    handleClick  () {
        /*
        console.log('this is:', this);
        console.log('e:', e.target);
        console.log('e:', e);*/
  
        this.setState({ modalUpdate: true });
    }

    editar  = (item) => {
        /*console.log(item);
        this.setState({ modalInsertar: 2, form: {...this.state.form, sauce: item.id,}, });*/
    }

    mostrarModalInsertar = () => {
        this.setState({
          accion: 1,
        });
      };
    
    handleChange = (e) => {
        if(e.target.name=='toppings'){
            const toppi = Array.from(e.target.selectedOptions, option => option.value);
            console.log(toppi);
            this.setState({toppings: toppi});
            console.log(this.state);
        }else{
            this.setState({[e.target.name]: e.target.value});
        }
    };

    render(){
        return (
            <div>
                <Container>
                    <h1 id="tabelLabel" >Catalogo de pizza</h1>
                    <p>Este componente demuestra el uso de Fetch para ir a la API server</p>
                    <Button color="success" onClick={this.mostrarModalInsertar}>Crear</Button>
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
                                        <td><Button color="primary" onClick={() => this.editar(pizza) } >
                                                Edit
                                            </Button> {' '}
                                            <Button color="primary" >
                                                X
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                        </Table>
                    </Container>
                    <Modal
                        isOpen={this.state.accion}
                        centered
                        toggle={ this.mitoogle }
                        
                    >
                        <ModalHeader toggle={this.mitoogle}>
                        Modal title
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="name">
                                        Pizza
                                    </Label>
                                    <Input
                                    id="name"
                                    name="name"
                                    placeholder="Nombre Pizza"
                                    onChange={this.handleChange}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label for="salsa">
                                    Salsa
                                    </Label>
                                    <Input
                                    id="salsa"
                                    name="salsa"
                                    type="select"
                                    onChange={this.handleChange}
                                    >
                                        {
                                            this.state.salsas.map(
                                            salsa => 
                                                <option value={salsa.id} selected={this.state.salsa===salsa.id}>{salsa.name}</option>
                                        )
                                        }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="toppings">
                                    Ingredientes
                                    </Label>
                                    <Input
                                    id="toppings"
                                    multiple
                                    name="toppings"
                                    type="select"
                                    onChange={this.handleChange}
                                    >
                                        {
                                            this.state.ingredientes.map(
                                            topping => 
                                                <option value={topping.id}>{topping.name}</option>
                                        )
                                        }
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                        <Button
                            color="primary"
                            onClick={function noRefCheck(){}}
                        >
                            Guardar
                        </Button>
                        {' '}
                        <Button onClick={function noRefCheck(){}}>
                            Cancelar
                        </Button>
                        </ModalFooter>
                    </Modal>
 
            </div>
        );
    }
}