import React, { forwardRef } from 'react';
import { Paper, IconButton } from '@material-ui/core';
import MaterialTable from 'material-table';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Clear from '@material-ui/icons/Clear';

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <i {...props} className="tim-icons icon-zoom-split search-icon" />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
}

export default function TabelaJogadores(props) {
    const { jogadores } = props;

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                components={{
                    Container: props => <Paper {...props} elevation={0} />
                }}
                style={{ backgroundColor: "#BBB8CC" }}
                columns={[
                    {
                        title: '',
                        field: 'icon',
                        render: (rowData) => (
                            <IconButton
                                style={{ outline: 'none' }}
                                color="primary"
                                aria-label="add"
                            // onClick={adicionarTabela}
                            >
                                <Clear />
                            </IconButton>
                        )
                    },
                    { title: 'Jogadores', field: 'nome', },
                    { title: 'Pontos', field: 'pontos', type: 'numeric' },
                    { title: 'Infrações', field: 'infracoes', type: 'numeric' },
                ]}
                options={{
                    showTitle: false,
                    header: true,
                    maxBodyHeight: 300,
                    headerStyle: {
                        color: '#000',
                        fontWeight: 'bold',
                        backgroundColor: '#BBB8CC'
                    },
                    search: false,
                    paging: false,
                    toolbar: false
                }}
                icons={tableIcons}
                data={jogadores}
            />
        </div>
    );
}