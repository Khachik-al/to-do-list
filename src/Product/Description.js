import React,{Component} from "react";

export default class Description extends Component{

    render(){
        return(
            <h4>{this.props.description}</h4>
        )
    }
}