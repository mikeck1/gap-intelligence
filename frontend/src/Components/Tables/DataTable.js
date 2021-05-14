import React, { Component } from 'react'
import { Table } from 'reactstrap';

class DataTable extends Component {

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <td><span class="badge bg-light">{item.newsorg}</span>  <a href={item.link}>{item.title}</a>
            <br></br>
            {item.date}
          </td>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable