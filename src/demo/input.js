import React from 'react';


export default class Input extends React.Component{
    state={
        value:'hello',
        inputValue:''
    }
    handleChange=(event)=>{
        this.setState({
            inputValue:event.target.value
        })
        
    }
    handleClick=()=>{
        this.setState({
            value:this.state.inputValue,
            inputValue:''
        })
    }


    render(){
        return <div>
            <input 
            value={this.state.inputValue} 
            type="text" 
            onChange={this.handleChange}/>
            <button 
            onClick={this.handleClick}>
            Add
            </button>
            <h2>{this.state.value}</h2>
        </div>
    }
}
