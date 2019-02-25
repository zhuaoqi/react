import React, { Component } from 'react';
import { Card } from 'antd';
import './index.css';

const { Meta } = Card;

export default class Cardset extends Component{

    state={
        Ddata : []
    }

    async componentDidMount(){
        await this.setState({
            Ddata : this.props.Ddata
        })
    }

    
    render(){
        if(this.props.Ddata.length>0){
            let cardset = [];
            this.props.Ddata.slice(this.props.page*8-8,this.props.page*8).map(
                (item,index) => {
                    cardset.push(
                        <div key={index} className="cardset">

                            <Card
                            hoverable
                            style={{ width: 340,height: 360 }}
                            cover={<img className="setimg" alt="example" src={item.profile.image_url} />}
                            >
                            <Meta
                            style={{textOverflow: 'ellipsis'}}
                            title={item.profile.first_name +'  '+ item.profile.last_name}
                            description={
                                <div>
                                <p>{item.npi}</p>
                                {
                                    item.profile.languages.map(
                                        (litem,index) => {
                                            return index == item.profile.languages.length-1?<div style={{textOverflow: 'ellipsis'}} key={index}><p>{litem.name}</p></div>
                                            :<div style={{textOverflow: 'ellipsis'}} key={index}><p>{litem.name}</p>+','</div>
                                            
                                        }
                                    )
                                }
                                <p>
                                    {item.profile.bio}
                                </p>
                                </div>
                            }
                            />
                            </Card>
                        </div>
                        
                    )
                }
            );
            return cardset
        }else{
            return(
                <div></div>
            );
        }
        
        
    }
}