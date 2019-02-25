import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
    title: 'FirstName',
    dataIndex: 'firstName',
    key: 'firstName',
  }, {
    title: 'Lastname',
    dataIndex: 'lastname',
    key: 'lastname',
  }, {
    title: 'Phone Number',
    dataIndex: 'phonenumber',
    key: 'phonenumber',
  },
  {
    title: 'Language',
    dataIndex: 'language',
    key: 'language',
  }
];

export default class List extends Component{

    render(){
        let dataarr = [];
        this.props.Ddata.map(
            (item,index) =>{
                let languagearr = [];
                item.profile.languages.map(
                    (litem,index) => {
                        languagearr.push(
                            litem.name
                        )
                    }
                )
                dataarr.push(
                    {
                        key         : index,
                        firstName   : item.profile.first_name,
                        lastname    : item.profile.last_name,
                        phonenumber : item.npi,
                        language    : languagearr.toString()
                    }
                )
            }
        )
        console.log(this.props.Ddata)
        return (
            <div style={{paddingTop:'30px'}}>
                <Table columns={columns} dataSource={dataarr} />
            </div>
        )
    }
}