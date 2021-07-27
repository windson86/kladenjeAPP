import React from "react";
import { userService } from "../servisi/korisnicki.servisi";
import Button from "react-bootstrap/Button";
import { BsFillXCircleFill } from "react-icons/bs";
import { BsCheckBox } from "react-icons/bs";

import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
  Alert,
} from "react-bootstrap";

let user = JSON.parse(localStorage.getItem("user")) || [];

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alertText: "",
      alertOn: false,
      isUser: false,
      ulog: 0,
      porez: 0.2,
      ukupniKef: 1,
      sviListici: [],
      novcanik: 0,
      oklade: [],
      listic: [],
      parovi: [],
    };
    this.promjenaUloga = this.promjenaUloga.bind(this);
    this.makniPar = this.makniPar.bind(this);
    this.brisiListic = this.brisiListic.bind(this);
    this.deleteListicFromDatabase = this.deleteListicFromDatabase.bind(this);
  }

  makniPar(e) {
    const { value } = e.target;
    const { parovi } = this.state;

    if (value > -1) {
      parovi.splice(value, 1);
      console.log(parovi);
      this.setState({
        parovi: parovi,
      });
    }
  }

  promjenaUloga(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    userService.getAccInfo(user.id).then((odgovor) => {
      this.setState({
        isUser: true,
        novcanik: odgovor.novcanik,
        sviListici: odgovor.listici,
      });
    });

    userService.prikazsvihSlobodnihOklada().then((odgovor) => {
      this.setState({ oklade: odgovor });
    });
  }
  dodajKune(iznos) {
    userService.zahtjevUplate(user.username, iznos);
  }

  brisiListic(e) {
    this.setState({
      parovi: [],
      ukupniKef: 1,
      alertText: "Obrisano",
      alertOn: true,
    });
  }
  igrajListic() {
    const { parovi, ulog } = this.state;

    userService
      .igrajListic(ulog, parovi, this.calculateKoef(parovi), user.id)
      .then((res) => {
        this.setState({
          alertText: res.poruka,
          alertOn: true,
          listic: [],
          parovi: [],
          ulog: 0,
        });
      });
  }

  AlertSuccessDismissible() {
    const { alertOn, alertText } = this.state;

    if (alertOn) {
      return (
        <Alert
          variant="success"
          onClose={() => this.setState({ alertOn: false })}
          dismissible
        >
          <Alert.Heading>{user.ime}</Alert.Heading>
          <p>{alertText}</p>
        </Alert>
      );
    }
  }

  dodajParNaListic(oklade, i) {
    const { parovi } = this.state;
    var postoji = false;
    var jindex = 0;
    for (let index = 0; index < parovi.length; index++) {
      if (parovi[index].opisOklade === oklade.opisOklade) {
        postoji = true;
        jindex = index;
        break;
      }
    }

    if (!postoji) {
      this.setState((prevState) => ({
        parovi: [
          ...prevState.parovi,
          {
            opisOklade: oklade.opisOklade,
            odigraniTip: oklade.tipovi[i],
            odigraniIndex: i,
            IdOklade: oklade._id,
            koef: (100 / oklade.sanse[i]).toFixed(2) - this.state.porez,
          },
        ],
      }));
    } else {
      let noviparovi = [...this.state.parovi];
      let par = { ...noviparovi[jindex] };
      par.opisOklade = oklade.opisOklade;
      par.odigraniTip = oklade.tipovi[i];
      par.odigraniIndex = i;
      par.IdOklade = oklade._id;
      par.koef = (100 / oklade.sanse[i]).toFixed(2) - this.state.porez;
      noviparovi[jindex] = par;
      console.log(parovi[jindex].koef);
      this.setState({
        parovi: noviparovi,
      });
    }
  }
  deleteListicFromDatabase(e) {
    console.log("target", e.target.value);
    userService.obrisiListic(user.id, e.target.value);
  }

  calculateKoef(parovi) {
    let koef = 1;
    parovi.forEach((par) => {
      koef *= par.koef;
    });

    return koef.toFixed(2);
  }

  render() {
    const { oklade, sviListici, ulog, porez, parovi, isUser } = this.state;

    return (
      <Container fluid="md" className="bg-secondary">
        {this.AlertSuccessDismissible()}
        <Row>
          <Col>
            <div className="text-white">
              <div>{user.username}</div>
              <div>{this.state.novcanik.toFixed(2)} Kn</div>
              {isUser && (
                <Button
                  variant="primary"
                  onClick={() => {
                    this.dodajKune(50);
                  }}
                >
                  dodaj 50 Kuna
                </Button>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="text-white">oklade:</div>

            <ListGroup className="bg-secondary">
              {oklade.map((oklade, index) => (
                <div>
                  <ListGroupItem className="bg-info" key={oklade.id}>
                    {oklade.opisOklade}
                    <span>
                      {" "}
                      {oklade.sanse.map((sanse, index) => (
                        <Card body className="bg-secondary text-white">
                          <span className="d-flex justify-content-center">
                            koef {(100 / sanse - porez).toFixed(2)}
                            <Button
                              variant="primary"
                              onClick={() =>
                                this.dodajParNaListic(oklade, index)
                              }
                              value={index}
                            >
                              {oklade.tipovi[index]}
                            </Button>
                          </span>
                        </Card>
                      ))}
                    </span>
                  </ListGroupItem>
                </div>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <div className="sticky-top">
              <span className="text-white">listić:</span>
              <br />
              {parovi.map((par, index) => (
                <div className="text-white">
                  {par.opisOklade} TIP: {par.odigraniTip} - koef{" "}
                  {par.koef.toFixed(2)}
                  <Button value={index} onClick={this.makniPar}>
                    X
                  </Button>
                </div>
              ))}
              <span className="text-white">
                koef:{this.calculateKoef(parovi)}
              </span>
              <Button onClick={() => this.brisiListic()}>obrisi listić</Button>
              <input
                type="number"
                className="text-white form-control bg-secondary"
                name="ulog"
                value={ulog}
                onChange={this.promjenaUloga}
              />
              {isUser && (
                <Button onClick={() => this.igrajListic()}>
                  odigraj listić
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <span className="text-white">listići:</span>
          {sviListici.map((listici, index) => (
            <Card body className="text-white bg-secondary">
              <Button
                value={listici._id}
                onClick={this.deleteListicFromDatabase}
              >
                x
              </Button>
              <br />
              {listici.parovi.map((parovi, index) => (
                <span>
                  {" "}
                  {parovi.opisOklade}
                  TIP:{parovi.odigraniTip} <br />
                </span>
              ))}{" "}
              <br />
              ulog: {listici.ulog} dobitni:
              {!listici.dobitni && <BsFillXCircleFill></BsFillXCircleFill>}
              {listici.dobitni && <BsCheckBox></BsCheckBox>}
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}
