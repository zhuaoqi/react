import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import { Layout, Menu, Icon, Button, Pagination, Input} from 'antd';
import Ddata from './components/ddata/index';
import Cardset from './components/cardset/index';
import Doclist from './components/list/index';
import Echart from './components/echart/index';
import './App.css';

const { Header, Content, Sider } = Layout;
const Search = Input.Search;

export default class App extends Component {

    constructor(){
        super();
    }

    state = {
        collapsed: false,
        layouttype: 'doctor',
        showtype: 'card',
        page: 1,
        searchkey: ''
    };

    async toggle(type){
        await this.setState({
          collapsed: !this.state.collapsed,
          layouttype: type
        });
    };

    async showtoggle(type){
        await this.setState({
            showtype: type,
            page: 1
          });
    }


    render() {
        let windowheight = window.innerHeight;
        return ( 
        
            <Layout>
                <Sider
                style={{height:windowheight}}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => { console.log(broken); }}
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item onClick={ this.toggle.bind(this,'doctor') } key="1">
                    <Icon type="user" />
                    <span className="nav-text">医生名单</span>
                    </Menu.Item>
                    <Menu.Item  onClick={ this.toggle.bind(this,'analysis') } key="2">
                    <Icon type="pie-chart" />
                    <span  className="nav-text">分析</span>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout>
                <Header style={{ background: 'rgba(0, 0, 0, 0)', padding: 0}} >
                    {
                        this.state.layouttype=='doctor'?
                        <h2 style={{ marginLeft: '30px' }}>
                        医生名单
                        <Button onClick={ this.showtoggle.bind(this,'card') } style={{marginLeft:'20px'}} type={this.state.showtype=='card'?'primary':''}>
                            <Icon type="appstore" />
                        </Button>
                        <Button onClick={ this.showtoggle.bind(this,'list') } style={{marginLeft:'20px'}} type={this.state.showtype=='list'?'primary':''}>
                            <Icon type="bars" />
                        </Button>
                        <Search
                        placeholder="请输入医生姓名"
                        onChange={e => this.setState({ searchkey : e.target.value}) }
                        style={{ width: 200,marginLeft: '20px' }}
                        />
                        </h2>:<h2 style={{ marginLeft: '30px' }}>分析</h2>
                    }
                    
                </Header>
                <Content>
                    <div>
                    {
                        this.state.layouttype=='doctor'?
                            <Ddata render = {
                                this.state.showtype=='card'?
                                (Ddata) => {
                                    return(
                                        <div>
                                            <Cardset page={this.state.page}  Ddata={this.state.searchkey==''?Ddata:Ddata.filter((item)=>{return (item.profile.first_name+item.profile.last_name).indexOf(this.state.searchkey)!= -1})} />
                                            <Pagination style={{marginRight: '30px',float:'right'}} onChange={(page, pageSize) => { this.setState({ page: page }) }} defaultPageSize={8} defaultCurrent={1} total={Ddata.length} />
                                        </div>
                                    )
                                } :(Ddata) => {
                                    return(
                                        <div>
                                            <Doclist page={this.state.page}  Ddata={this.state.searchkey==''?Ddata:Ddata.filter( (item) =>{return (item.profile.first_name+item.profile.last_name).indexOf(this.state.searchkey)!= -1})} />
                                        </div>
                                    )
                                    
                                }
                            } />:<Ddata render ={ (Ddata) => { return <Echart Ddata={Ddata}/>}} />
                        
                        
                    }
                    
                    </div>
                </Content>

                </Layout>
            </Layout>
        
        );
    }
}