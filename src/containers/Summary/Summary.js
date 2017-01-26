import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import './Summary.scss';

class Summary extends Component {

  renderTagStats (tags) {
    const tagArray = Object.entries(tags).map(
      ([name, stats]) => ({ name: name, valid: stats.valid, probes: stats.probes }));
    return tagArray.map((tag, index) => {
      return <div key={index} className='summary__tag'>
        <span className='summary__tag-name'>{tag.name}</span> - correct {tag.valid}/{tag.probes}
        ({tag.valid / tag.probes * 100}%)
      </div>;
    });
  }

  renderStats () {
    const { tasks } = this.props;
    return <div className='summary__stats'>
      <p>Here are some stats, showing how you managed with certain topics:</p>
      {this.renderTagStats(tasks.tags)}
    </div>;
  }

  render () {
    const { summary, tasks, points } = this.props;
    if (summary.show) {
      return <div className='summary'>
        <h2 className='summary__heading'>Congratulations</h2>
        <div className='summary__content'>
          <p>You finished the game,<br />
            completing <span className='summary__tasks-completed'>{tasks.current}</span> tasks
            and scoring <span className='summary__points'>{Math.round(points.value)}</span> points!</p>
          {this.renderStats()}
        </div>
      </div>;
    }
    return null;
  }
}

const mapStateToProps = state => pick(state, ['summary', 'tasks', 'points']);
export default connect(mapStateToProps)(Summary);
