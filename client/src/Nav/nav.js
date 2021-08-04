import React from "react";
import { ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userService } from "../servisi/korisnicki.servisi";
let user = JSON.parse(localStorage.getItem("user")) || [];

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
    };
  }

  componentDidMount() {
    userService.isAdmin(user.id).then((odgovor) => {
      this.setState({ isAdmin: odgovor.admin });
    });
  }

  render() {
    const { isAdmin } = this.state;

    return (
      <Container className=" bg-secondary container-fluid border-primary">
        <nav className="Nav ">
          <div className="Nav__container ">
            <Link to="/" className="Nav__brand"></Link>

            <div className=" Nav__right">
              <ListGroup horizontal>
                <ListGroupItem className="bg-warning Nav__item">
                  <Link className="Nav__link" to="/home">
                    Home
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="bg-warning Nav__item">
                  <Link className="Nav__link" to="/login">
                    Login
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="bg-warning Nav__item">
                  <Link className="Nav__link" to="/register">
                    Register
                  </Link>
                </ListGroupItem>
                {isAdmin && (
                  <ListGroupItem className="bg-danger Nav__item">
                    <Link className="Nav__link" to="/admin">
                      ADMIN
                    </Link>
                  </ListGroupItem>
                )}
              </ListGroup>
            </div>
          </div>
        </nav>
      </Container>
    );
  }
}
