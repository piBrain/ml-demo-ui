import React from 'react';
import  './TeamSelector.css'
import Team from './Team/Team.jsx'
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TeamSelector extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(val) {
    const findTeam = (arr, name) => {
      for(let x in arr) {
        if(name == arr[x].name) {return arr[x]}
      }
      return arr[0]
    }
    this.props.setActiveTeam(findTeam(this.props.data, val))
  }
  render(props) {
    var teams = []
    if(this.props.data) {
      teams = this.props.data.map((team, index) => {
        return ( <Team key={index} name={team.name} logo={team.logo} handleClick={this.handleClick}/> );
      })
    }
    return (
      <ol className={this.props.active ? "teams active" : "teams"}>
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {teams}
        </ReactCSSTransitionGroup>
      </ol>
    );
  }
}

