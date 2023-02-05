import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import axios from "axios";

export const ProductsTable = () => {
    const [products, setProducts] = useState([]);

    const endpoint = "http://localhost:8081/products"
    const token = JSON.parse(localStorage.getItem('user')).token;
    console.log(token);
    const getData = async () => {
        await axios.get(endpoint,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                const data = response.data;
                console.log(data);
                setProducts(data)
            });
    }

    useEffect(() => {
        getData()
    }, []);

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
                            onClick: (event, rowData) => alert("Editando:" + rowData.id)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Eliminar producto',
                            onClick: (event, rowData) => alert("Eliminando:" + rowData.id)
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