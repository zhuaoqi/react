import React, { Component } from 'react';
import axios from 'axios';

export default class Ddata extends Component{

    constructor(props) {
        super(props);
        this.state = { ddata : [] };
    }

    async componentDidMount(){
        let { data } = await axios.get('https://api.betterdoctor.com/2016-03-01/practices/1c966a62ce8e18707cf239389dc8e378/doctors/?limit=20&user_key=2d90accf45edb19e93e1b50a009d5a62');
        this.setState({
            ddata : data.data
        })

        console.log(this.state.ddata)
    }



    render(){
        return(
            <div>
                {this.props.render(this.state.ddata)}
            </div>
        )
    }
}