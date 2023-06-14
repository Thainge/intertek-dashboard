import { useEffect, useState } from 'react';
import { addSharepointRow, getColumnHeaders, updateSharepointRow } from '../Hooks/Sharepoint';
import styles from './sharepointForm.module.css';

function SharepointForm({ updating }) {
    const [headerColumns, setHeaderColumns] = useState([]);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        fetchHeaderInfo();
    }, []);

    async function fetchHeaderInfo() {
        const rowResponse = await getColumnHeaders();

        let newObj = {};

        Object.keys(rowResponse.rowData).forEach((item) => {
            newObj[item] = '';
        });

        setFormValues(() => newObj);
        setHeaderColumns(() => Object.keys(rowResponse.rowData));
    }

    async function SubmitForm(e) {
        e.preventDefault();

        let data = [];

        if (updating) {
            let updatingIndex = 2;
            data = await updateSharepointRow(formValues, updatingIndex);
        } else {
            data = await addSharepointRow(formValues);
        }

        console.log(data);
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormValues((prev) => {
            let newData = { ...prev, [name]: value };
            return newData;
        });
    }

    return (
        <div>
            <h1>{updating ? 'Update row' : 'Add New Row'}</h1>
            <form onSubmit={SubmitForm}>
                {
                    headerColumns.map((item, index) => (
                        <label className={styles.label} key={index}>
                            {item}
                            <input name={item} onChange={handleChange} type={'text'}></input>
                        </label>
                    ))
                }
                <input type={'submit'} value={'submit'}></input>
            </form>
        </div>
    )
}

export default SharepointForm;