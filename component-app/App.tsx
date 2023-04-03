import React from 'react';
import Logo from './src/Logo'
import Button from './src/Button'
export default class App extends React.Component<{}, { dialogVisible: boolean }>{
  constructor(props) {
    super(props)
    this.state = {
      dialogVisible:false
    }
    this.handleClick = this.handleClick.bind(this);
    this.HanldeSwitchVisible = this.HanldeSwitchVisible.bind(this);
  }
  handleClick(ev){
    this.setState({
      dialogVisible:true
    })
  }
  HanldeSwitchVisible(visible){
    this.setState({
      dialogVisible:visible
    })
  }
  render(){
    
    return (<div>
      <Logo/>
      <br />
      <Button/>
      <br/>
    </div>)
  }
}