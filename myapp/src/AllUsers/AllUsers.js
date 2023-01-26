import React,{Component} from 'react';
import ReactTable from "react-table-v6";  
import 'react-table-v6/react-table.css';
import axios from 'axios';
import './AllUsers.css';
import { UncontrolledAlert, Label, Input } from 'reactstrap';

class AllUsers extends Component{
 
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            users: [],
            message: '',
            color: 'info',
            sortBy: 'firstName'
        }

        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:9000/users/users/").then(response => {
            this.setState({
                loading:false,
                users:response.data
            })
        }).catch( err => {
            
            this.setState({
                loading:false,
                users:null
            })
        });
    }


    deleteUser(id){
        const result = confirm("Are you sure want to delete this user?");
        if (!result)    return;
        this.setState({ loading: true});
        axios.post("http://localhost:9000/users/deleteUser", {id}).then(response => {
            const data  = response.data;
            if (data.status){
                axios.get("http://localhost:9000/users/users").then(res => {
                    const data = res.data;
                    this.setState({
                        message: "User deleted successfully",
                        color: "info",
                        loading: false,
                        users: data
                    });
                }).catch(err => {
                    this.setState({
                        message: "Failed to fetch updated list of users!",
                        color: "danger",
                        loading: false,
                        users: null                      
                    }); 
                });
            } else {
                this.setState({
                    message: data.message,
                    color: "danger",
                    loading: false
                });
            }
        }).catch(err => {
            this.setState({
                message: "Failed to connect to server!",
                color: "danger",
                loading: false
            });
        });        
    }

    onChangeSortBy = (event) => {
        // set loading to true
        this.setState({loading: true});
        const users = this.state.users;
        const {value} = event.target; 
        users.sort( function(item1, item2){
            switch(value){
                case 'lastName': return item1.lastName.localeCompare(item2.lastName);
                case 'email': return item1.email.localeCompare(item2.email);
                case 'profession': return item1.profession.localeCompare(item2.profession);
                default : return item1.firstName.localeCompare(item2.firstName);
            }
        });
        this.setState({
            sortBy : value,
            loading: false,
            users: users
        })
    };

    render(){
     
        const columns =[
            {Header : 'First Name', accessor: 'firstName'},
            {Header : 'Last Name', accessor: 'lastName'},
            {Header : 'Gender', accessor: 'gender'},
            {Header : 'Email', accessor: 'email'},
            {Header : 'Password', accessor: 'password'},
            {Header : 'Address', accessor: 'address'},
            {Header : 'Profession', accessor: 'profession'},
            {Header: 'Actions', accessor: '_id',
                Cell: (props) => {
                    let userId = props.row._id;
                    return <span><a href={"/editUser/" + userId}>Edit</a> or <a onClick={this.deleteUser.bind(this, userId)} href="#">Delete</a></span>
                }
            } 
        ]
        
        let display=<center><div className="lds-ring"><div></div><div></div><div></div><div></div></div></center>
        if(!this.state.loading){
            const users = this.state.users;
            display = (users === null) ? 
                        (<p className="message">Failed to fetch data from server!</p>) : 
                        (users.length === 0 ? 
                            (<div>
                                <a className="btn btn-success" href="/addUser">Add User</a>
                                <p className="message" style={{"color": "black"}}>No users found!</p>
                            </div>) : 
                            (
                                <div>
                                    <a className="btn btn-success" href="/addUser">Add User</a>
                                    <Label for="sortBy" style={{
                                        paddingLeft: "50px"
                                    }}>Sort by</Label>
                                    <Input type="select" name="sortBy" id="sortBy"
                                            value={this.state.sortBy}
                                            onChange={this.onChangeSortBy}
                                            style={{
                                                display: "inline-block",
                                                width: "200px",
                                                marginLeft: "10px"}}>
                                        <option value="firstName">First name</option>
                                        <option value="lastName">Last name</option>
                                        <option value="email">Email</option>
                                        <option value="profession">Profession</option>
                                    </Input>




                                    <br/> <br/>
                                    <ReactTable data={users}  
                                        columns={columns}  
                                        defaultPageSize={5}  
                                        pageSizeOptions={[5,10, 20, 50]}  
                                    />                      
                                </div>
                            )
                        );
            
        }

        return (
            <div className="container">
            {this.state.message !== '' && 
                <UncontrolledAlert color={this.state.color}>
                    {this.state.message}
                </UncontrolledAlert>}
                <center> <h1 className="heading-all-users">All Users</h1></center>
               {display}
            </div> 
        );
    }
}

export default AllUsers;