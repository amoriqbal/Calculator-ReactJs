import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InputPad from "./InputPad";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FormControl from "react-bootstrap/FormControl";
import Accordion from "react-bootstrap/Accordion";
import "@fortawesome/react-fontawesome/index.es";
import DownloadLink from "react-download-link";

import downloadCsv from "./downloadCsv";
import FormFileInput from "react-bootstrap/esm/FormFileInput";

const operators = {
  ADD: "+",
  SUB: "-",
  MUL: "*",
  DIV: "/",
};

function App() {
  const [resultMode, setResultMode] = React.useState(true);
  const [ans, setAns] = React.useState(0);
  const [input, setInput] = React.useState("");
  const [oprt, setOprt] = React.useState(null);
  const history = React.useRef([]);
  const [hlen, setHlen] = React.useState(0);
  const [evals, setEvals] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const dref= React.useRef(null)

  useEffect(() => {
    history.current.push(ans);
    setHlen((h) => h + 1);
  }, [evals, ans]);
  const display_string = () => {
    if (resultMode) {
      return `${ans}`;
    }

    if (oprt) {
      return `${ans} ${oprt}`;
    }
    return `${ans}`;
  };

  const isOprt = (char) => {
    if (Object.values(operators).indexOf(char) !== -1) {
      return true;
    }
    return false;
  };

  const isNumber = (char) => {
    if (!isNaN(parseInt(char))) {
      return true;
    }
    return false;
  };

  const evaluate = () => {
    if (isOprt(oprt) && isNumber(input)) {
      var answer;
      if (oprt === operators.MUL) {
        answer = ans * parseFloat(input);
      } else if (oprt === operators.ADD) {
        answer = ans + parseFloat(input);
      } else if (oprt === operators.SUB) {
        answer = ans - parseFloat(input);
      } else if (oprt === operators.DIV) {
        if (parseFloat(input) === 0) {
          alert("Division by zero is not allowed");
          return;
        }
        answer = ans / parseFloat(input);
      }
      setAns(answer);
    }

    if (!isOprt(oprt)) {
      if (isNumber(input)) {
        setAns(parseFloat(input));
      }
    }

    setEvals(evals + 1);
    setInput("");
    setResultMode(true);
    setOprt(null);
  };
  const onInput = (e) => {
    //backspace
    if (e.target.value.length < input.length) {
      setInput(e.target.value);
      return;
    }

    var lastChar = e.target.value[e.target.value.length - 1];

    console.log(`LAST CHAR |${lastChar}|`);
    if (lastChar === "=") {
      console.log("EVAUATION TRIGGERED");
      evaluate();
      return;
    }

    //there is nothing
    if (input === "") {
      if (isOprt(lastChar)) {
        setOprt(lastChar);
        setResultMode(false);
        return;
      }
      if (isNumber(lastChar) || lastChar === ".") {
        if (lastChar === ".") setInput("0.");
        else setInput(e.target.value);

        setResultMode(false);
        return;
      }
      return;
    }

    //there is number
    if (isNumber(input)) {
      if (isNumber(lastChar) || lastChar === ".") {
        setInput(e.target.value);
        return;
      }
      if (isOprt(lastChar)) {
        evaluate();
        setOprt(lastChar);
        setResultMode(false);
        return;
      }
      return;
    }
  };

  const inputHandleForPad = (val) => {
    if (val === "b") {
      var e = {
        target: {
          value: input.substr(0, input.length - 1),
        },
      };
      onInput(e);
      return;
    }
    if (val === "AC") {
      setAns(0);
      setOprt("");
      setResultMode(true);
      setInput("");
    }
    var e = {
      target: {
        value: `${input}${val}`,
      },
    };
    onInput(e);
  };

  return (
    <Container>
      <Form>
        <Card body>
          <Row>
            <h1>{display_string()}</h1>
          </Row>
          <Row>
            <FormControl
              className="large-text"
              type="text"
              onChange={onInput}
              value={`${input}`}
            />
          </Row>
        </Card>

        <Row className="space-top large-text">
          <InputPad inputHandle={inputHandleForPad} />
        </Row>
        <Row>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Button} variant="dark" eventKey="0" className="fix-width">
                <Card.Title className='large-text'>History</Card.Title>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="v-flex">
                  {history.current
                    .slice(1, history.current.length)
                    .map((v, i) => (
                      <Button
                        key={i}
                        onClick={(e) => setInput(v)}
                        variant="outline-dark"
                      >{`${v}`}</Button>
                    ))}
                  {history.current.length < 2 ? (
                    "No History"
                  ) : (
                    
                    <DownloadLink
                      className="btn btn-primary btn-text space-top"
                      label="Export CSV"
                      filename="history.csv"
                      exportFile={() => downloadCsv(history.current)}
                    />
                    
                  )}
                  <Accordion>
                    <Accordion.Toggle as={Button} eventKey="0">
                      Import CSV
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" >
                      <div classNames="v-flex">
                        <FormFileInput
                          type="file"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                        />
                        {(file?<Button                        
                          onClick={async (e) => {                            
                            var txt = await file.text();
                            history.current = txt.split(",");
                            setEvals(evals + 1);
                          }}
                        >
                          Import
                        </Button>
                        :null)}
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
      </Form>
    </Container>
  );
}

export default App;
