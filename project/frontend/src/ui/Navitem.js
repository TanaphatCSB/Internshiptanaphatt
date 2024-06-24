import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Navitems extends Component {
    render(){
        return(
            <li id={this.props.item}>
                <link to ={this.props.tolink}>{this.props.item}</link>
            </li>
        )
    }
}
export default Navitems