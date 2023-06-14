import { useEffect, useState } from 'react';
import styles from './consultants.module.css';
import { getSharepointData, updateSharepointData } from "../Hooks/Sharepoint";
import { ContextFunction } from '../Context/ContextProvider';
import ListTable from '../Components/listTable';
import ListTableHeader from '../Components/listTableHeader';
import ls from 'local-storage';
import sortByDay from '../Hooks/sortByDay';

function Consultants() {
    const obj = ContextFunction();
    const { user } = obj;

    // Consultant data
    const [loading, setLoading] = useState(false);
    const [consulantList, setConsultantList] = useState([]);
    const [cleanConsulantList, setCleanConsultantList] = useState([]);

    // Runs every time page loads
    useEffect(() => {
        if (user) {
            fetchSharepointData();
        }
    }, [user])

    async function FetchAndUpdateSharepointData() {
        setLoading(() => true);
        await updateSharepointData();
        await fetchSharepointData();
        setLoading(() => false);
    }

    async function fetchSharepointData() {
        setLoading(() => true);
        const responseData = await getSharepointData();

        const data = responseData.filter((item, index) => index !== 0);
        let readyData = [];
        data.forEach((item) => {
            let readyItem = {
                _id: item._id,
                rowIndex: item.rowIndex,
                ...item.rowData
            }
            readyData.push(readyItem);
        });

        readyData.sort((a, b) => a.Order_Date - b.Order_Date);

        let filtersLS = ls.get('IntertekFiltersConsultants') || 2;
        console.log(filtersLS)
        let foundDay = filtersLS.days === 0 ? 7 : filtersLS.days === 1 ? 30 : filtersLS.days === 2 ? 120 : 9999;
        let readySort = sortByDay(foundDay, readyData);

        setConsultantList(() => readySort);
        setCleanConsultantList(() => readyData);
        setLoading(() => false);
    }

    const columns = [
        {
            Header: 'Consultants',
            columns: [
                {
                    Header: 'Primary Consultant',
                    accessor: 'Primary_Consultant'
                },
                {
                    Header: 'Secondary Consultant',
                    accessor: 'Secondary_Consultant'
                },
                {
                    Header: 'Project Status',
                    accessor: 'Project_Status'
                },
                {
                    Header: 'Total Job Amount',
                    accessor: 'Total_Job_Amount'
                },
                {
                    Header: 'Order Date',
                    accessor: 'Order_Date'
                },
            ],
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.h1}>All Consultants</div>
                <div className={styles.refresh} onClick={fetchSharepointData}>
                    <img className={styles.refreshIcon} src={require('../Assets/spinner2.png')} />
                    <div>Refresh</div>
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
            <ListTableHeader setConsultantList={setConsultantList} cleanConsulantList={cleanConsulantList} searchTerm1={'Primary_Consultant'} searchTerm2={'Secondary_Consultant'} />
            <ListTable loadText={'Retrieving consultants...'} loading={loading} columns={columns} data={consulantList} />
        </div>
    )
}

export default Consultants;