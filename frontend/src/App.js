import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"
class App extends Component {
  state = {
    items: []
  }

  getItems() {
    fetch('http://localhost:3003/articles')           // call ruby api
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.log(err))
  }

  updateItems() {
    fetch('http://localhost:3001/update')             // call web crawler
      .then(response => response.json())
      .catch(err => console.log(err))
  }

  componentWillMount() {
    this.updateItems()
  }

  componentDidMount() {
    this.getItems()                                   // Update immediately
    setInterval(() => { this.getItems(); }, 60000);   // Update after one minute, and every minute after
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col><h1 style={{ margin: "20px 0" }}>Headlines</h1></Col>
          <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px", height: '42px', marginTop: '20px' }}
            className="btn btn-primary"
            data={this.state.items}>
            Download CSV
            </CSVLink>
        </Row>
        <Row>
          <Col><DataTable items={this.state.items} deleteItemFromState={this.deleteItemFromState} /></Col>
        </Row>
      </Container>
    )
  }
}

export default App