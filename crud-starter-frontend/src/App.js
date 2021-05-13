import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"

class App extends Component {
  state = {
    items: []
  }

  getItems() {
    fetch('http://localhost:3003/articles')
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .then(items => console.log(items))
      .catch(err => console.log(err))
  }

  updateItems() {
    fetch('http://localhost:3001/update')
      .then(response => response.json())
      .catch(err => console.log(err))
  }


  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentWillMount() {
    this.updateItems()
  }

  componentDidMount() {
    this.getItems()
    setInterval(() => { this.getItems(); console.log("updated!") }, 60000);
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Headlines</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App