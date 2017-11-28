import React from 'react';
import  './ServiceSelector.css'
import Team from './Service/Service.jsx'
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ServiceSelector extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(val) {
    const findService = (arr, name) => {
      for(let x in arr) {
        if(name == arr[x].name) {return arr[x]}
      }
      return arr[0]
    }
    this.props.setActiveTeam(findTeam(this.props.data, val))
  }
  render(props) {
    var services = this.props.data.map((team, index) => {
      return ( <Service key={index} name={service.name} logo={service.logo} handleClick={this.handleClick}/> );
    })

    return (
      <div className={this.props.active ? "services-c active" : "teams"}>
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {services}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

