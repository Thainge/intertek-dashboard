import { Providers } from "@microsoft/mgt";

const NODE_URL = 'http://localhost:3080/sharepoint';

async function getSharepointData() {
    const response = await fetch(`${NODE_URL}/consultants`, {
        method: 'GET',
    });
    return await response.json();
}

async function updateSharepointData() {
    const accessToken = await Providers.globalProvider.getAccessToken({ scopes: ['User.Read', 'Files.ReadWrite'] })
    const response = await fetch(`${NODE_URL}/databaseupdate/${accessToken}`, {
        method: 'POST',
    });
    return await response.json();
}

async function addSharepointRow(data) {
    const response = await fetch(`${NODE_URL}/addrow`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

async function deleteSharepointRow(index) {
    const response = await fetch(`${NODE_URL}/deleterow`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }),
    });
    return await response.json();
}

async function updateSharepointRow(row, index) {
    const response = await fetch(`${NODE_URL}/updaterow`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rowIndex: index,
            rowData: row
        }),
    });
    return await response.json();
}

async function getColumnHeaders() {
    const response = await fetch(`${NODE_URL}/headercolumns`, {
        method: 'GET',
    });
    return await response.json();
}

async function getBusinessUnits() {
    const response = await fetch(`${NODE_URL}/businessunits`, {
        method: 'GET',
    });
    return await response.json();
}

async function getSingleConsultant(id, name) {
    const response = await fetch(`${NODE_URL}/consultant/${id}/${name}`, {
        method: 'GET',
    });
    return await response.json();
}

async function getSingleBusinessUnit(id, name) {
    const response = await fetch(`${NODE_URL}/business/${id}/${name}`, {
        method: 'GET',
    });
    return await response.json();
}

export {
    updateSharepointData,
    addSharepointRow,
    deleteSharepointRow,
    updateSharepointRow,

    // Consultants
    getSharepointData,
    getColumnHeaders,
    getSingleConsultant,

    // Business Units
    getBusinessUnits,
    getSingleBusinessUnit,
}