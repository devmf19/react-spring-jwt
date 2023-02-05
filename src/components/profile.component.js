import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
let url = "";

class Profile extends Component {

  render() {

    const { user: currentUser } = this.props;
    console.log(currentUser);
    if (!currentUser) { return <Redirect to="/login" />; }

    return (
      <div>
        <section style={{ backgroundColor: "#eee" }} >
          <div className="container-lg py-2">
            <div className="row">
              <div className="col">
                <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href={url}>Inicio</a></li>
                    <li className="breadcrumb-item"><a href={url}>Usuario</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Perfil</li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">

                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                      className="rounded-circle img-fluid" style={{ width: "150px" }} />
                    <h5 className="my-3">{currentUser.username}</h5>
                    {/* <p className="text-muted mb-1">{(currentUser.roles).replace("[", "").replace("]", "")}</p> */}
                  </div>
                </div>

              </div>

              <div className="col-lg-8">
                <div className="card mb-4">

                  <div className="card-header">
                    <h5 className="my-3"><strong>Información del usuario</strong></h5>
                  </div>

                  <div className="card-body">

                    <div className="row">
                      <div className="col-sm-4">
                        <p className="mb-0"><strong>Nombre:</strong></p>
                      </div>
                      <div className="col-sm-8">
                        <p className="text-muted mb-0">{currentUser.name}</p>
                      </div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-sm-4">
                        <p className="mb-0"><strong>Correo:</strong></p>
                      </div>
                      <div className="col-sm-8">
                        <p className="text-muted mb-0">{currentUser.email}</p>
                      </div>
                    </div>

                    {/* <hr />

                    <div className="row">
                      <div className="col-sm-4">
                        <p className="mb-0">Usuario:</p>
                      </div>
                      <div className="col-sm-8">
                        <p className="text-muted mb-0">{currentUser.username}</p>
                      </div>
                    </div> */}

                    <hr />

                    <div className="row">
                      <div className="col-sm-4">
                        <p className="mb-0"><strong>Roles:</strong></p>
                      </div>
                      <div className="col-sm-8">
                        <p className="text-muted mb-0">{(currentUser.roles).replace("[", "").replace("]", "")}</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);