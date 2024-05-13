import {Container, Navbar} from "react-bootstrap";
import logo from '../img/logo.png'

export default function NavigationBar(){
    return <Navbar className="bg-body-tertiary" style={{height:"8%"}}>
        <Container>
            <Navbar.Brand href="#home" style={{fontSize:"medium"}}>
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Horse Weight Estimation AI
            </Navbar.Brand>
        </Container>
    </Navbar>
}