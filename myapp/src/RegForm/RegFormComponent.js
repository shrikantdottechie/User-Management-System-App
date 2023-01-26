import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledAlert} from 'reactstrap';
import './RegForm.css';

function RegFormComponent (props){
    const state = props.state;
    const handler = props.handler;
    const loading = state.loading;
    const emailDisabled=state.type==='Edit'?true:false;
    let display=<center><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></center>
    if(!loading){
        display = <div>
            <Form className="Form" autoComplete="off" onSubmit={handler.onSubmit}>
            <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Input type="text" name="firstName" id="firstName" 
                        placeholder="your first name here" value={state.firstName}
                        onChange={handler.onChange}/>
                    <FormText color="muted error-message">
                        {state.firstNameError}
                    </FormText>
            </FormGroup>
            <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" 
                        placeholder="your last name here" value={state.lastName}
                        onChange={handler.onChange}/>
                    <FormText color="muted error-message">
                        {state.lastNameError}
                    </FormText>
            </FormGroup>
            <FormGroup tag="fieldset" id="gender">
                    <Label for="gender" style={{display: 'inline-block', width: "100px"}}>
                        Gender:</Label>
                    <FormGroup check style={{display: 'inline-block', width: "100px"}}>
                    <Label check>
                        <Input type="radio" name="gender" value='male'
                            checked={state.gender === 'male'}
                            onChange={handler.onChange}/>{' '}
                        Male
                    </Label>
                    </FormGroup>
                    <FormGroup check style={{display: 'inline-block', width: "100px"}}>
                    <Label check>
                        <Input type="radio" name="gender" value='female'
                            checked={state.gender === 'female'}
                            onChange={handler.onChange}/>{' '}
                        Female
                    </Label>
                    </FormGroup>
                    <FormText color="muted error-message">
                        {state.genderError}
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" 
                        placeholder="your email here" disabled={emailDisabled} value={state.email}
                        onChange={handler.emailChange}/>
                    <FormText color="muted error-message">
                        {state.emailError}
                    </FormText>
            </FormGroup> 
                <FormGroup>
                    <Label for="confirmEmail">Confirm Email</Label>
                    <Input type="email" name="confirmEmail" id="confirmEmail" 
                        placeholder="confirm your email here" disabled={emailDisabled} value={state.confirmEmail} 
                        onChange={handler.emailChange}/>
                    <FormText color="muted error-message">
                        {state.confirmEmailError}
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" 
                        placeholder="password" value={state.password}
                        onChange={handler.passwordChange}/>
                    <FormText color="muted error-message">
                        {state.passwordError}
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input type="password" name="confirmPassword" id="confirmPassword" 
                        placeholder="confirm password" value={state.confirmPassword}
                        onChange={handler.passwordChange}/>
                    <FormText color="muted error-message">
                        {state.confirmPasswordError}
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="textarea" name="address" id="address"
                    placeholder="your address here"
                        onChange={handler.onChange} value={state.address}/>
                    <FormText color="muted error-message">
                        {state.addressError}
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="profession">Profession</Label>
                    <Input type="select" name="profession" id="profession"
                        onChange={handler.onChange} value={state.profession}>
                        <option defaultValue="true" disabled>Select profession</option>
                        <option>Accountant</option>
                        <option>Engineer</option>
                        <option>Lawyer</option>
                        <option>Mechanic</option>
                        <option>Scientist</option>
                        <option>Teacher</option>
                        <option>Technician</option>
                        <option>Other</option>
                    </Input>
                    <FormText color="muted error-message">
                        {state.professionError}
                    </FormText>
                </FormGroup>
                <center><Button className="btn-lg">{state.type==='Registration'?'Submit':'Update'}</Button></center>
            </Form>
        </div>
    }

    return (
        <div className="container">
            {state.message !== '' && 
                <UncontrolledAlert color={state.color} 
                style={{"marginLeft": "10%", "marginRight" : "10%"}}>
                    {state.message}
                </UncontrolledAlert>
            }
            <center><h1 className="heading"> {state.type} FORM</h1></center>  
            <a className="btn btn-secondary backbutton" href="/">Back</a> 
            {display}
        </div>
    );
}

export default RegFormComponent;