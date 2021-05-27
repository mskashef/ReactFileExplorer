import './App.css';
import ReactExplorer from './components/ReactExplorer/ReactExplorer';
import {shortcuts} from "./views/data/data";
import {getDir} from "./Requests";
import {Settings, CloudUploadRounded, CreateNewFolderRounded, GetAppRounded, NoteAddRounded} from "@material-ui/icons";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const handleRedButtonPressed = () => {
        alert('Red')
    }
    const handleYellowButtonPressed = () => {
        alert('yellow')
    }
    const handleGreenButtonPressed = () => {
        alert('green')
    }

    const handleToolClicked = (workDir, selectedItems) => {
        console.log(workDir, selectedItems);
        toast(
            <div>
                Test Handler
                <br />
                -----------------
                <br />
                work dir: {workDir}
                <br />
                <br />
                Selected Items: {selectedItems.join(', ')}
            </div>
        )
    }

    const handleFileOpen = (file) => {
        toast(`You Opened file: ${file.name}`)
    }


    return (
        <div className="App">
            <ReactExplorer
                defaultDir={'C:\\Users\\MSKASHEF\\Desktop'}
                request={getDir}
                enableShortcuts={true}
                onFileOpen={handleFileOpen}
                shortcuts={shortcuts}
                onWindowRedButtonPressed={handleRedButtonPressed}
                onWindowYellowButtonPressed={handleYellowButtonPressed}
                onWindowGreenButtonPressed={handleGreenButtonPressed}
                toolbar={[
                    {
                        iconComponent: CreateNewFolderRounded,
                        onClick: handleToolClicked,
                        hoverTitle: 'Create New Folder'
                    },
                    {
                        iconComponent: NoteAddRounded,
                        onClick: handleToolClicked,
                        hoverTitle: 'Create New Folder'
                    },
                    {
                        iconComponent: GetAppRounded,
                        onClick: handleToolClicked,
                        hoverTitle: 'Create New Folder'
                    },
                    {
                        iconComponent: CloudUploadRounded,
                        onClick: handleToolClicked,
                        hoverTitle: 'Create New Folder'
                    }
                ]}
                enableSideBar={true}
            />
            <div style={{position: 'absolute'}}>
                <ToastContainer />
            </div>
        </div>
    );
}

export default App;
