import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from '../../components/Panel';
import { pick, entries } from 'lodash';
import './Summary.scss';

class Summary extends Component {

  renderTagStats (tags) {
    return entries(this.props.tasks.tags)
      .map(([name, { valid, probes }], index) => {
        return <tr key={index}>
          <td><span className='summary__highlight'>{name}</span></td>
          <td>{probes}</td>
          <td>{valid}</td>
          <td>{Math.round(valid / probes * 100)}%</td>
        </tr>;
      });
  }

  render () {
    const { summary, tasks, points } = this.props;
    if (summary.show) {
      return <Panel title='Congratulations!' className='summary'>
        You finished the game,<br />
        completing <span className='summary__highlight'>{tasks.current}</span> tasks<br />
        and scoring <span className='summary__highlight'>{Math.round(points.value)}</span> points!
        <div className='summary__stats'>
          Here are some stats, showing how you managed with certain topics:
          <table className='summary__table'>
            <tr>
              <th>Topic</th>
              <th>Probes</th>
              <th>Hits</th>
              <th>Score</th>
            </tr>
            {this.renderTagStats()}
          </table>
        </div>
      </Panel>;
    }

    return null;
  }
}

const mapStateToProps = state => pick(state, ['summary', 'tasks', 'points']);
export default connect(mapStateToProps)(Summary);
