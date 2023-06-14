import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ListTable from '../Components/listTable';
import { getSingleBusinessUnit } from '../Hooks/Sharepoint';
import { getSingleConsultant } from '../Hooks/Sharepoint';
import styles from './dashboard.module.css';
import Fade from 'react-reveal/Fade';

function Dashboard() {
    const location = useLocation();
    const params = useParams();

    const [userProjects, setUserProjects] = useState([]);
    const [cleanUserProjects, setCleanUserProjects] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [activeData, setActiveData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, [])

    async function loadData() {
        setLoading(() => true);
        let responseData = [];

        if (location.pathname.includes('businessunit')) {
            responseData = await getSingleBusinessUnit(params.id, params.name);
        } else {
            responseData = await getSingleConsultant(params.id, params.name);
        }

        let readyData = [];
        responseData.forEach((item) => {
            let readyItem = {
                _id: item._id,
                rowIndex: item.rowIndex,
                ...item.rowData
            }
            readyData.push(readyItem);
        });

        let readySort = sortByDay(120, readyData);
        setUserProjects(() => readySort);
        setCleanUserProjects(() => readyData);

        setInitialSummary(readySort);
        setInitialActive(readyData);

        setLoading(() => false);
    }

    function setInitialSummary(readyData) {
        let readySumData = [];
        let readySumObj = {
            Primary_Consultant: params.name,
            Secondary_Consultant: '',
            Project_Status: '',
            Total_Job_Amount: null,
            Order_Date: '',
        }

        let foundTotal = 0;
        let foundLength = readyData.length;
        readyData.forEach((item) => {
            let foundAmount = item.Total_Job_Amount;
            if (foundAmount > 0) {
                foundTotal = foundTotal + parseInt(foundAmount);
            }
        });

        let foundAverage = foundTotal / foundLength;
        readySumObj.Total_Job_Amount = foundAverage.toFixed(0);
        readySumData.push(readySumObj);

        setSummaryData(() => readySumData);
    }

    function setInitialActive(readyData) {
        let readyActiveData = [];

        readyData.forEach((item, index) => {
            if (item.Project_Status.toLowerCase() === 'ongoing') {
                readyActiveData.push(item);
            }
        });

        readyActiveData.sort((a, b) => a.Order_Date - b.Order_Date);

        setActiveData(() => readyActiveData);
    }

    // Tracks number of days shown
    const [days, setDays] = useState(120);

    // Changes days from 7, 30, 120
    function changeDays() {
        let newDays = days;
        newDays = days === 7 ? 30 : newDays;
        newDays = days === 30 ? 120 : newDays;
        newDays = days === 120 ? 7 : newDays;
        setDays(() => newDays);
        let readySort = sortByDay(newDays, cleanUserProjects);
        setUserProjects(() => readySort);
    }

    function sortByDay(newDays, cleanData) {
        let intervalTime = 1000 * 60 * 60 * 24 * newDays;

        let todayDate = new Date();
        let todayTime = todayDate.getTime();

        let readyData = cleanData.filter((item) => {
            let newDate = new Date(item.Order_Date);
            let itemTime = newDate.getTime();

            let difference = todayTime - itemTime;

            if (difference < intervalTime) {
                return item;
            }
        });

        readyData.sort((a, b) => a.Order_Date - b.Order_Date);

        return readyData;
    }

    const summaryColumns = [
        {
            Header: `${days} day summary`,
            columns: [
                {
                    Header: 'Primary Consultant',
                    accessor: 'Primary_Consultant'
                },
                {
                    Header: 'Job Manager',
                    accessor: 'Job_Manager'
                },
                {
                    Header: 'Job Billing Status',
                    accessor: 'Job_Billing_Status'
                },
                {
                    Header: 'Average Job Amount',
                    accessor: 'Total_Job_Amount'
                },
                {
                    Header: 'Order Date',
                    accessor: 'Order_Date'
                },
            ],
        },
    ];

    const projectsColumns = [
        {
            Header: `Projects from the last ${days} days`,
            columns: [
                {
                    Header: 'Primary Consultant',
                    accessor: 'Primary_Consultant'
                },
                {
                    Header: 'Job Manager',
                    accessor: 'Job_Manager'
                },
                {
                    Header: 'Job Billing Status',
                    accessor: 'Job_Billing_Status'
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
    ];

    const activeColumns = [
        {
            Header: `Active projects`,
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
    ];

    return (
        <div className={styles.container}>
            <Fade when={loading}>
                <div className={`${styles.overlay} ${loading ? styles.activeOverlay : styles.inactiveOverlay}`} />
            </Fade>
            <div className={styles.header}>
                <div className={styles.h1}>{params.name}</div>
                <div className={styles.headerButton} onClick={changeDays}>Last {days} days</div>
            </div>
            <div>
                <hr></hr>
            </div>
            <ListTable loadText={`Retrieving data for ${params.name}...`} loading={loading} columns={summaryColumns} data={summaryData} disableLinks={true} />
            <ListTable loading={false} columns={projectsColumns} data={userProjects} disableLinks={true} />
            <ListTable loading={false} columns={activeColumns} data={activeData} disableLinks={true} />
        </div>
    )
}

export default Dashboard;