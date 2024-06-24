import React, {Component} from 'react'
import Naitems from './Navitem'

class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            'NavItemActive' : ''
        }
    }

    render(){
        return(

            <nav>
                <ul>
                    <Navitems item = "home" tolink="/"></Navitems>
                    <Navitems item = "Assignment" tolink="/assignment"></Navitems>
                    <Navitems item = "Report" tolink="/tolink"></Navitems>
                </ul>
            </nav>
        )
    }
}

export default Navbar