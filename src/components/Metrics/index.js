import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';

// eslint-disable-next-line no-new-wrappers
const fn = val => new Number(val).toLocaleString('en');

class Metrics extends Component {
  constructor (props) {
    super(props);
    this.state = {data: null};
  }

  componentWillMount () {
    this.load();
  }

  load () {
    const url = `/api/metrics`;
    fetch(url, {})
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({data});
      })
      .catch(err => {
        console.log('parsing failed', err);
      });
  }

  renderData () {
    const {data} = this.state;
    if (!data || !data.metrics) {
      return null;
    }
    return (
      <Row>
        {data.metrics.map(m => (
          <Col key={`metrics-${m.corpus.name}`} lg={6} sm={12} xs={12}>
            <h3>
              <Link to={`/${m.corpus.name}`}>{m.corpus.title}</Link>
            </h3>
            <table className="table">
              <tbody>
                <tr>
                  <th>Number of plays</th>
                  <td>{fn(m.plays)}</td>
                </tr>
                <tr>
                  <th>
                    <code>person</code>
                  </th>
                  <td>
                    {fn(m.characters)} (male: {m.male}, female: {m.female})
                  </td>
                </tr>
                <tr>
                  <th>
                    <code>text</code>
                  </th>
                  <td>{fn(m.text)}</td>
                </tr>
                <tr>
                  <th>
                    <code>sp</code>
                  </th>
                  <td>{fn(m.sp)}</td>
                </tr>
                <tr>
                  <th>
                    <code>stage</code>
                  </th>
                  <td>{fn(m.stage)}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        ))}
      </Row>
    );
  }

  render () {
    const {data} = this.state;
    return data ? this.renderData() : <em>loading...</em>;
  }
}

export default Metrics;
