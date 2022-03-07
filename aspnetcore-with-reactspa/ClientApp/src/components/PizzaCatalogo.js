import React, {Component} from "react";
import { Container, Table, Button, Modal, ModalBody, 
    ModalHeader, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


export class PizzaCatalogo extends Component{
    constructor(props){
        super(props);
        this.state = {data: [], modalUpdate: false };

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

    mitoogle = () => {
        this.setState({modalUpdate: false});
    }

    handleClick  (e) {
        console.log('this is:', this);
        console.log('e:', e.target);
        this.setState({ modalUpdate: true });
    }

    render(){
        return (
            <div>
                <Container>
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
                                            </Button> {' '}
                                            <Button color="primary" onClick={() => {this.setState({data: this.state.data, modal: !this.state.modal , ide: 1})}} >
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
                        isOpen={this.state.modalUpdate}
                        centered
                        toggle={ this.mitoogle }
                    >
                        <ModalHeader toggle={this.mitoogle}>
                        Modal title
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="nombre">
                                        Nombre
                                    </Label>
                                    <Input
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nombre Pizza"
                                    
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label for="exampleSelect">
                                    Select
                                    </Label>
                                    <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    >
                                    <option>
                                        1
                                    </option>
                                    <option>
                                        2
                                    </option>
                                    <option>
                                        3
                                    </option>
                                    <option>
                                        4
                                    </option>
                                    <option>
                                        5
                                    </option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelectMulti">
                                    Select Multiple
                                    </Label>
                                    <Input
                                    id="exampleSelectMulti"
                                    multiple
                                    name="selectMulti"
                                    type="select"
                                    >
                                    <option>
                                        1
                                    </option>
                                    <option>
                                        2
                                    </option>
                                    <option>
                                        3
                                    </option>
                                    <option>
                                        4
                                    </option>
                                    <option>
                                        5
                                    </option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                        <Button
                            color="primary"
                            onClick={function noRefCheck(){}}
                        >
                            Do Something
                        </Button>
                        {' '}
                        <Button onClick={function noRefCheck(){}}>
                            Cancel
                        </Button>
                        </ModalFooter>
                    </Modal>
 
            </div>
        );
    }
}