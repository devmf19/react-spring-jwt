import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://localhost:8081/products"
const user = JSON.parse(localStorage.getItem('user'));

export const ProductsTable = () => {
    const [products, setProducts] = useState([]);

    const getData = async () => {
        await axios.get(
            API_URL,
            { headers: { Authorization: `Bearer ${user.token}` } }
        ).then((response) => {
            const data = response.data;
            setProducts(data)
        });
    }

    const updateProduct = (id, name, price) => {
        Swal.fire({
            title: 'Actualizar producto',
            html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre del producto" value="${name}">
            <input type="number" id="price" class="swal2-input" placeholder="Precio" value="${price}">`,
            confirmButtonText: 'Guardar cambios',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            preConfirm: () => {
                const newName = Swal.getPopup().querySelector('#name').value
                const newPrice = Swal.getPopup().querySelector('#price').value
                if (!newName || !newPrice) {
                    Swal.showValidationMessage(`Ingrese un valor en cada campo`)
                } else {
                    name = newName;
                    price = newPrice;
                    axios.put(
                        API_URL.concat('/' + id),
                        { name, price },
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    ).then(() => {
                        window.location.reload();
                    });
                }
            }
        });
    }

    const deleteProduct = (id, name) => {
        Swal.fire({
            title: 'Desea eliminar el poducto ' + name + '?',
            text: "No podrá deshacer esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(
                    API_URL.concat('/' + id),
                    { headers: { Authorization: `Bearer ${user.token}` } }
                ).then(() => {
                    window.location.reload();
                });
            }
        })
    }

    useEffect(() => { getData() }, []);

    const columns = [
        {
            title: "Id",
            field: "id"
        },
        {
            title: "Nombre",
            field: "name"
        },
        {
            title: "Precio",
            field: "price"
        }
    ]

    const defaultMaterialTheme = createTheme();

    return (
        <div>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    title="Lista de productos"
                    columns={columns}
                    data={products}

                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar producto',
                            onClick: (event, rowData) => updateProduct(rowData.id, rowData.name, rowData.price)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Eliminar producto',
                            onClick: (event, rowData) => deleteProduct(rowData.id, rowData.name)
                        }
                    ]}

                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#EEE',
                            fontWeight: "bold"
                        }
                    }}

                    localization={{
                        header: {
                            actions: 'Opciones'
                        },
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'filas',
                            labelRowsPerPage: 'Ver',
                            firstAriaLabel: 'Primera página',
                            firstTooltip: 'Primera página',
                            previousAriaLabel: 'Anterior',
                            previousTooltip: 'Anterior',
                            nextAriaLabel: 'Siguiente',
                            nextTooltip: 'Siguiente',
                            lastAriaLabel: 'Última página',
                            lastTooltip: 'Última página'
                        },
                        toolbar: {
                            searchTooltip: 'Buscar',
                            searchPlaceholder: 'Buscar'
                        }
                    }}
                />
            </ThemeProvider>

        </div>
    );
}