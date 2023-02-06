import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import {register} from "../actions/product";
import { ProductsTable } from "../tables/productsTable";

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

const validatePrice = (value) => {
    if (value < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡El precio debe ser mayor o igual a $0.1!
            </div>
        );
    }
};

class Products extends Component {
    constructor(props) {
        super(props);
        this.handleProducts = this.handleProducts.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);

        this.state = {
            name: "",
            price: "",
            successful: false,
        };
    }

    onChangeName(e) {
        this.setState({ name: e.target.value, });
    }

    onChangePrice(e) {
        this.setState({ price: e.target.value, });
    }

    handleProducts(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    register(this.state.name, this.state.price),
                        window.location.reload()
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

            <div className="row">

                <div className="col-md-4">
                    <div className="card bg-light text-dark">
                        <h1><center>Nuevo producto</center></h1>
                        <Form onSubmit={this.handleProducts} ref={(c) => { this.form = c; }} >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre:</label>
                                        <Input type="text" className="form-control" name="name" value={this.state.name}
                                            onChange={this.onChangeName} validations={[required, validateName]} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Precio:</label>
                                        <Input type="number" className="form-control" name="price" value={this.state.email}
                                            onChange={this.onChangePrice} validations={[required, validatePrice]} />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-dark btn-block">Registrar producto</button>
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

                <div className="col-md-8">
                    <br/>
                    <br/>
                    <ProductsTable />

                </div>


            </div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return { message, };
}

export default connect(mapStateToProps)(Products);
