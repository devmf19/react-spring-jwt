import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡Este campo es requerido!
      </div>
    );
  }
};

const validateName = (value) => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡El nombre debe contener entre 3 y 50 caracteres!
      </div>
    );
  }
};

const validateEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡Ingrese un correo válido!
      </div>
    );
  }
};

const validateUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡El usuario debe contener entre 3 y 20 caracteres!
      </div>
    );
  }
};

const validatePassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡La contraseña debe contenener al menos 6 caracteres!
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      successful: false,
    };
  }

  onChangeName(e) {
    this.setState({ name: e.target.value, });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value, });
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value, });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value, });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.name, this.state.email, this.state.username, this.state.password)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (

      <div className="col-md-12">
        <div className="card bg-light text-dark">
          <h1><center>Registro de usuario</center></h1>
          <Form onSubmit={this.handleRegister} ref={(c) => { this.form = c; }} >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <Input type="text" className="form-control" name="name" value={this.state.name}
                    onChange={this.onChangeName} validations={[required, validateName]} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico:</label>
                  <Input type="text" className="form-control" name="email" value={this.state.email}
                    onChange={this.onChangeEmail} validations={[required, validateEmail]} />
                </div>
                <div className="form-group">
                  <label htmlFor="username">nombreUsuario</label>
                  <Input type="text" className="form-control" name="username" value={this.state.username}
                    onChange={this.onChangeUsername} validations={[required, validateUsername]} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input type="password" className="form-control" name="password" value={this.state.password}
                    onChange={this.onChangePassword} validations={[required, validatePassword]} />
                </div>
                <div className="form-group">
                  <button className="btn btn-dark btn-block">Registrarme</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={(c) => { this.checkBtn = c; }} />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return { message, };
}

export default connect(mapStateToProps)(Register);
