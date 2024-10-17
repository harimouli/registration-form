import {Component} from 'react'

import './index.css'
class RegistrationForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    isSubmitted: false,
    focusForFirstName: false,
    focusForLastName: false,
  }
  onChangeFirstname = event => {
    this.setState({firstname: event.target.value})
  }
  onChangeLastName = event => {
    this.setState({lastname: event.target.value})
  }
  onHandleBlurFirstName = () => {
    const {firstname} = this.state

    if (firstname === '') this.setState({focusForFirstName: true});
    else this.setState({focusForFirstName: false});
  }
  onHandleBlurLastName = () => {
    const {lastname} = this.state
    if (lastname === '') this.setState({focusForLastName: true})
    else this.setState({focusForLastName: false})
  }
  submitAnotherRes =()=>{
    this.setState({isSubmitted: false, firstname: "", lastname: "", focusForFirstName: false, focusForLastName: false});
  }
  onSubmitForm = event => {
    event.preventDefault()
    const {firstname, lastname} = this.state
    if (firstname === '' && lastname === '') {
      this.setState({focusForFirstName: true, focusForLastName: true})
      return
    } else if (lastname === '') {
      this.setState({focusForLastName: true})
      return
    } else if (firstname === '') {
      this.setState({focusForFirstName: true})
      return
    }
    this.setState({isSubmitted: true})
  }
  renderFirstNameField = () => {
    const {firstname, focusForFirstName} = this.state
    const inputElementClassName = focusForFirstName
      ? 'error-input-element input-element'
      : 'input-element'
    return (
      <>
        <label className="label-element" htmlFor="firstname">
          FIRST NAME
        </label>
        <input
          type="text"
          value={firstname}
          id="firstname"
          className={inputElementClassName}
          placeholder="First name"
          onChange={this.onChangeFirstname}
          onBlur={this.onHandleBlurFirstName}
        />
      </>
    )
  }

  renderLastNameField = () => {
    const {lastname} = this.state
    const {focusForLastName} = this.state
    const inputElementClassName = focusForLastName
      ? 'input-element error-input-element'
      : 'input-element'
    return (
      <>
        <label className="label-element" htmlFor="lastname">
          LAST NAME
        </label>
        <input
          type="text"
          value={lastname}
          id="lastname"
          className={inputElementClassName}
          placeholder="Last name"
          onChange={this.onChangeLastName}
          onBlur={this.onHandleBlurLastName}
        />
      </>
    )
  }

  renderRegistrationForm = () => {
    const {focusForFirstName, focusForLastName} = this.state
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <div className="input-container">
          {this.renderFirstNameField()}
          {focusForFirstName && <p className="error-msg">Required</p>}
        </div>
        <div className="input-container">
          {this.renderLastNameField()}
          {focusForLastName && <p className="error-msg">Required</p>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    )
  }
  renderRegistrationCompletedPopUp = () => (
    <div className="completed-pop-up-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="correct-icon"
      />
      <p>Submitted Successfully</p>
      <button onClick = {this.submitAnotherRes} className="submit-btn">Submit Another Response</button>
    </div>
  )
  render() {
    const {isSubmitted} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Registration</h1>
        <div className="resgistration-container">
          {!isSubmitted
            ? this.renderRegistrationForm()
            : this.renderRegistrationCompletedPopUp()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
