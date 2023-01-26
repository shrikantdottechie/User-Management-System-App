import React,{Component} from 'react';
import axios from 'axios'
import RegFormComponent from './RegFormComponent'


class RegForm extends Component{
    

    professions = ['Accountant', 'Engineer', 'Lawyer', 'Mechanic', 
                        'Scientist', 'Teacher', 'Technician', 'Other'];
    state = {
        type: (this.props.match.url === '/addUser' ? "Registration" : "Edit"),
        loading: false,

        firstName: '',
        firstNameError: '',

        lastName: '',
        lastNameError: '',

        gender: 'male',
        genderError: '',

    
        email: '',
        emailError: '',
        confirmEmail: '',
        confirmEmailError: '',
    
        password: '',
        passwordError: '',
        confirmPassword: '',
        confirmPasswordError: '',
    
        address: '',
        addressError: '',

        profession: 'Select profession',
        professionError: '',

        message: '',
        color: 'info'
    }


    emailChange=(event)=>{
        // for edit procedure we do not accept changes in email
        if (this.state.type === 'Edit') return;
        var {name, value} = event.target;
        // update the value of the required field
        this.setState({[name] : value, 
            [name + "Error"] : (value === '' ? "This field is required" : "")}, 
        function(){
            // take decision
            if (name === 'email'){
                // if we are updating email then we clean the confirm email field
                this.setState({confirmEmail: ''});
                // now check if the data provided by the user represents a valid email
                var emailPattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*\.[a-z]{2,}$/;
                var isValidEmail = emailPattern.test(this.state.email);
                // update the email error
                this.setState({emailError : (isValidEmail ? '' : "Please provide a valid email")});
            } else if (name === 'confirmEmail'){
                // compare emails
                var matched = (this.state.email === this.state.confirmEmail);
                // update the confirm email error
                this.setState({confirmEmailError: (matched ? '' : "Didn't match with one you have provided")});
            }
        });
    }

    passwordChange=(event)=>{
        const {name, value} = event.target;
        // update the value of the required field
        this.setState({[name] : value, 
                        [name + "Error"] : (value === '' ? "This field is required" : "")}, 
        function(){
            // take decision
            if (name === 'password'){
                // clear the text for confirm password
                this.setState({confirmPassword: ''});
            } else if (name === 'confirmPassword'){
                // compare passwords
                var matched = (this.state.password === this.state.confirmPassword);
                // update the confirm passwrod error
                this.setState({confirmPasswordError: (matched ? '' : "Didn't match with one you have provided")});
            }
        });
    }

    // for fields where we just need to update the values in state
    // no validation required
    // we can use single handler for all such fields
    onChange=(event)=>{
        const {name, value} = event.target;
        // for this line to work we have to make sure that
        // name provided in fields matches with keys in state
        this.setState({[name]: value});
        // if updated field is empty then update error message to required
        this.setState({[name + "Error"] : (value === '' ? "This field is required" : "")});
    }



    


    // handles the submit event for form
    // we have to check all fields for valid data
    onSubmit=(event)=> {
        // prevent the default operattion
        event.preventDefault();


        // stores true if all fieldsa are valid
        var areAllValid = true;

        // validate firstName
        if (this.state.firstName === ''){
            // update the error message for first name
            this.setState({firstNameError: "Please provide your first name"});
            // update the state to false
            areAllValid = false;
        }

        // validate lastName
        if (this.state.lastName === ''){
            // update the error message for last name
            this.setState({lastNameError: "Please provide your last name"});
            // update the state to false
            areAllValid = false;
        }


        // validate gender
        if (this.state.gender !== 'male' && this.state.gender !== 'female'){
            // update the error message for gender
            this.setState({genderError: 'Please select your gender'});
            // update the state to false
            areAllValid = false;
        }

        // validate email
        // now check if the data provided by the user represents a valid email
        var emailPattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*\.[a-z]{2,}$/;
        var isValidEmail = emailPattern.test(this.state.email);
        // update the email error
        this.setState({emailError : (isValidEmail ? '' : "Please provide a valid email")});
        // update error if email is empty [empty emails satifiy the pattern]
        this.setState({emailError: (this.state.email === '' ? "Please provide an email" : '')});
        // update the status
        if (!isValidEmail || this.state.email === ' ')  areAllValid = false;

        // validate confirm email
        var matched1 = (this.state.email === this.state.confirmEmail);
        // update the confirm email error
        this.setState({confirmEmailError: (matched1 ? '' : "Didn't match with one you have provided")});
        // update the status
        if (!matched1)   areAllValid = false;


        // validate passwords
        if (this.state.password === ''){
            // not valid password
            this.setState({passwordError: "Please provide a password"});
            // update the status
            areAllValid = false;
        }

        // validate confirm password
        var matched2 = (this.state.password === this.state.confirmPassword);
        // update the confirm passwrod error
        this.setState({confirmPasswordError: (matched2 ? '' : "Didn't match with one you have provided")});
        // update the status
        if (!matched2)  areAllValid = false;


        // validate address
        if (this.state.address === ''){
            // not valid address
            this.setState({addressError: "Please provide your address"});
            // update the status
            areAllValid = false;
        }

        // validate profession
        if (this.professions.indexOf(this.state.profession) < 0){
            // profession selected by user is not withing one we accept
            this.setState({professionError: "Please select a valid profession"});
            // update the status
            areAllValid = false;
        }



        // if all fields are valid then create a new user
        if (areAllValid){
            // set state to loading
            this.setState({
                loading:true
            })
            // create a new user to save in database
            var user = {
                firstName : this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                profession: this.state.profession
            };

            // make a request to server
            const id = this.props.match.params.id;
            const url = (this.state.type === 'Edit' ? 
                                'http://localhost:9000/users/editUser/' + id + "/" :
                                'http://localhost:9000/users/addUser/');
            axios.post(url, {user}).then(response => {
                console.log(response);
                // fetch the data
                const data = response.data;
                const status = data.status;
                this.setState(prevState => {
                    return ({
                        loading: false,
                        message: data.message,
                        color: (status ? "info" : "danger"),
                        firstName: (status ? '' : prevState.firstName),
                        lastName : (status ? '' : prevState.lastName),
                        gender: (status ? 'male' : prevState.gender),
                        email: (status ? '' : prevState.email),
                        confirmEmail: (status? '' : prevState.confirmEmail),
                        password: (status ? '' : prevState.password),
                        confirmPassword: (status? '' : prevState.confirmPassword),
                        address: (status ? '' : prevState.address),
                        profession: (status ? '' : prevState.profession)
                    });
                });
            }).catch( err => {
                console.log(err);
                this.setState({message: "Failed to connect to server!",
                                         color: "danger", loading: false});
            });
        }
    }

    componentDidMount(){
        if(this.state.type === 'Edit'){
            this.setState({loading: true});
            const id = this.props.match.params.id;
            axios.get("http://localhost:9000/users/userById/"+ id + "/")
            .then(res => {
                const data = res.data;
                if(data){
                    this.setState({
                        loading: false,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        gender: data.gender,
                        email: data.email,
                        confirmEmail: data.email,
                        password: data.password,
                        confirmPassword: data.password,
                        address: data.address,
                        profession: data.profession
                    })
                } else {
                    this.setState({
                        loading: false,
                        color: "danger",
                        message: "Invalid userId"
                    });                    
                }
            }).catch(err => {
                this.setState({
                    loading: false,
                    color: "danger",
                    message: "Failed to connect to server!"
                })
            });
        }
    }

    render(){
        const handler = {
            onChange: this.onChange,
            emailChange: this.emailChange,
            passwordChange: this.passwordChange,
            onSubmit: this.onSubmit
        }
        return (
            <RegFormComponent state={this.state} handler={handler}/>
        );
    }
}



export default RegForm;