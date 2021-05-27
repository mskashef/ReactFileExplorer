import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import React from "react";
import {colors} from "./ReactExplorer";
import fileItemRenderer from "./defaultRenderers/fileItemRenderer";
import folderItemRenderer from "./defaultRenderers/folderItemRenderer";

const normalizeName = name => name.length > 20 ? name.slice(0, 15) + '...' : name;

const emptyFunction = () => {};

const defaultProps = {
    fileList: [],
    enableShortcuts: true,
    shortcuts: [],
    onFileOpen: emptyFunction,
    onFolderOpen: emptyFunction,
    request: () => [],
    defaultDir: '/',
    renderFolder: folderItemRenderer,
    renderFile: fileItemRenderer,
    itemContainerStyle: {},
    onWindowRedButtonPressed: emptyFunction(),
    onWindowYellowButtonPressed: emptyFunction(),
    onWindowGreenButtonPressed: emptyFunction(),
    windowTitle: 'React Explorer',
    enableSideBar: true,
    toolbar: [],
    theme: {
        headerBackgroundColor: '#4C4A4A',
        windowRedButtonColor: '#EF3224',
        windowYellowButtonColor: '#F9BD18',
        windowGreenButtonColor: '#62B146',
        windowTitleColor: '#FFFFFF',
        toolbarBackgroundColor: '#283844',
        toolbarDividerColor: '#FFFFFF14',
        sidebarBackgroundColor: '#293742',
        mainBackgroundColor: '#232F38',
        addressBarBackgroundColor: '#00000030',
        sidebarTextColor: '#FFFFFF',
        mainTextColor: '#FFFFFF',
        toolbarTextColor: '#FFFFFF',
        headerTextColor: '#FFFFFF',
        refreshIconColor: '#A8B6C1',
        addressBarTextColor: '#FFFFFF',
        dividerColor: '#00000050',
        itemColor: '#A8B6C1',
        itemTextColor: '#FFFFFF',
        selectedItemBorderColor: '#A8B6C1',
        selectedItemBackgroundColor: '#FFFFFF22',
        navigationIconColor: '#A8B6C1',
        navigationButtonColor: '#31414E',
        toolbarIconColor: '#A8B6C1',
        loadingColor: '#FFFFFF'
    }
}

export default defaultProps;