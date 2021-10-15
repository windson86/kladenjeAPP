import React from "react";
import { userService } from "../servisi/korisnicki.servisi";
import Button from "react-bootstrap/Button";
import { BsFillXCircleFill } from "react-icons/bs";
import { BsCheckBox } from "react-icons/bs";
import Footer from "../Footer/Footer";

import { withTranslation } from "react-i18next";

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

class Home extends React.Component {
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
    this.ispisAlerta("zahtjev poslan administratoru");
  }
  ispisAlerta(text) {
    const { t } = this.props;

    this.setState({
      alertOn: true,
      alertText: t(text),
    });
  }

  brisiListic(e) {
    this.setState({
      parovi: [],
      ukupniKef: 1,
    });
  }
  igrajListic() {
    const { parovi, ulog } = this.state;

    userService
      .igrajListic(ulog, parovi, this.calculateKoef(parovi), user.id)
      .then((res) => {
        this.setState({
          listic: [],
          parovi: [],
          ulog: 0,
        });
        this.ispisAlerta(res.poruka);
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
    const { t, i18n } = this.props;
    const { oklade, sviListici, ulog, porez, parovi, isUser } = this.state;
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
    return (
      <Container fluid="md" className="bg-secondary">
        <div className="App-header text-white">
          <h2>
            {t("welcome")}

            {user.ime}
          </h2>
          <button onClick={() => changeLanguage("de")}>de</button>
          <button onClick={() => changeLanguage("en")}>en</button>
          <button onClick={() => changeLanguage("hr")}>hr</button>
        </div>
        {this.AlertSuccessDismissible()}
        <Row>
          <Col>
            <div className="text-white">
              <div>{this.state.novcanik.toFixed(2)} Kn</div>
              {isUser && (
                <Button
                  variant="primary"
                  onClick={() => {
                    this.dodajKune(50);
                  }}
                >
                  {t("Add funds")}
                </Button>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={8}>
            <div className="text-white">{t("bets")}:</div>

            <ListGroup className="bg-secondary">
              {oklade.map((oklade, index) => (
                <div key={index}>
                  <ListGroupItem className="bg-info" key={oklade.id}>
                    {oklade.opisOklade}
                    <span>
                      {" "}
                      {oklade.sanse.map((sanse, index) => (
                        <Card
                          body
                          key={index}
                          className="bg-secondary text-white"
                        >
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
              <span className="text-white">{t("betting slip")}:</span>
              <br />
              {parovi.map((par, index) => (
                <div key={index} className="text-white">
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
              <Button onClick={() => this.brisiListic()}>
                {t("clear betting slip")}
              </Button>
              <input
                type="number"
                label="ulog"
                className="text-white form-control bg-secondary"
                name="ulog"
                value={ulog}
                onChange={this.promjenaUloga}
              />
              {isUser && (
                <Button onClick={() => this.igrajListic()}>
                  {t("subbmit betting slip")}
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <span className="text-white">{t("betting slips")}:</span>
          {sviListici.map((listici, index) => (
            <Card body key={index} className="text-white bg-secondary">
              <Button
                value={listici._id}
                onClick={this.deleteListicFromDatabase}
              >
                x
              </Button>
              <br />
              {listici.parovi.map((parovi, index) => (
                <span key={index}>
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
        <Footer></Footer>
      </Container>
    );
  }
}
export default withTranslation("translations")(Home);
