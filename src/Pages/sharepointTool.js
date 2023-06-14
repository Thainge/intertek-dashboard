import styles from './sharepointTool.module.css';
import { addSharepointRow, deleteSharepointRow, updateSharepointRow } from '../Hooks/Sharepoint';
import SharepointForm from '../Components/sharepointForm';
import { useState } from 'react';
import UpdateTool from '../Components/updateTool';

function SharepointTool() {
    return (
        <div>
            <button onClick={() => setCurrentTab(() => 0)}>Add Tab</button>
            <button onClick={() => setCurrentTab(() => 1)}>Update Tab</button>
            <button onClick={() => setCurrentTab(() => 2)}>Delete Tab</button>
            <UpdateTool />
            {/* {
                currentTab === 0
                    ? <SharepointForm />
                    : currentTab === 1
                        ? <SharepointForm updating={true} />
                        : <button onClick={deleteRow}>Delete Row</button>
            } */}
        </div>
    )
}

export default SharepointTool;