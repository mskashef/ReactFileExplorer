import React, {useEffect, useState} from 'react';
import classes from './ReactExplorer.module.css';
import './scrollbar.css';
import {
    ArrowLeftRounded,
    ArrowRightRounded,
    RefreshRounded
} from '@material-ui/icons';
import {CircularProgress, Divider, Grid, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import propTypes from "./propTypes";
import defaultProps from "./defaultProps";
import ItemContainer from "./components/ItemContainer";

Array.prototype.getLast = function () {
    if (this.length > 0) return this[this.length - 1];
    return null;
}

const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
        color: 'white'
    },
});

const ReactExplorer = props => {
    let {request, theme} = props;
    theme = {...ReactExplorer.defaultProps.theme, ...theme};
    const [expandedNodes, setExpandedNodes] = useState(new Set());
    const [selectedPaths, setSelectedPaths] = useState([]);
    const [openDir, setOpenDir] = useState(props.defaultDir);
    const [fileList, setFileList] = useState([]);
    const [currentPath, setCurrentPath] = useState(props.defaultDir);
    const folders = fileList.filter(item => !item.isFile);
    const files = fileList.filter(item => item.isFile);
    const [navStack, setNavStack] = useState([props.defaultDir]);
    const [forwardStack, setForwardStack] = useState([]);
    const noBack = navStack.length === 1;
    const noForward = forwardStack.length === 0;
    const [editingAddress, setEditingAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const back = () => {
        setNavStack(navStack => {
            if (navStack.length === 1) return [...navStack];
            let res = [...navStack];
            let popped = res.pop();
            setOpenDir(res.getLast())
            pushToForwardNavStack(popped);
            return res;
        })
    }

    const openFolder = path => {
        setNavStack(navStack => ([
            ...navStack,
            path
        ]));
        setSelectedPaths([]);
        setForwardStack([])
        setOpenDir(path);
    }

    const pushToForwardNavStack = folder => {
        setForwardStack(forwardStack => {
            let res = [...forwardStack];
            res.push(folder);
            return res;
        });
        setSelectedPaths([]);
    }

    const forward = () => {
        setForwardStack(forwardStack => {
            let res = [...forwardStack];
            let popped = res.pop();
            setOpenDir(popped);
            setNavStack(navStack => {
                let res = [...navStack];
                res.push(popped);
                return res;
            });
            return res;
        });
        setSelectedPaths([]);
    }

    const handleItemSelect = (e, id, name) => {
        if (e.ctrlKey) setSelectedPaths(data => data.includes(name) ? data.filter(d => d !== name) : [...data, name]);
        else setSelectedPaths([name]);
    }

    const goBack = () => {
        back();
    }

    const goForward = () => {
        forward();
    }

    const handleFolderOpen = folder => {
        props.onFolderOpen(folder);
        openFolder(folder.absolutePath)
    }

    const handleFileOpen = file => {
        props.onFileOpen(file)
    }

    const getDir = dir => {
        setLoading(true);
        setCurrentPath(dir);
        setFileList([])
        request(dir)
            .then(paths => {
                setFileList(paths);
                setLoading(false);
            })
            .catch((err) => {
                // console.log(err)
                setLoading(false);
            });
    }

    useEffect(() => {
        props.onFolderOpen(openDir);
        getDir(openDir);
    }, [openDir]);

    const backSpaceListener = e => {
        if (e.key !== 'Backspace' || e.target.tagName === 'INPUT') return;
        back();
    }

    useEffect(() => {
        window.addEventListener('keydown', backSpaceListener);
        return () => window.removeEventListener('keydown', backSpaceListener);
    }, [])

    const renderItem = item => {
        const isSelected = selectedPaths.includes(item.name);
        const {isFile} = item;
        return (
            <ItemContainer
                style={props.itemContainerStyle}
                onDoubleClick={() => isFile ? handleFileOpen(item) : handleFolderOpen(item)}
                onClick={(e) => {
                    e.stopPropagation()
                    handleItemSelect(e, null, item.name)
                }}
            >
                {(isFile ? props.renderFile : props.renderFolder)(item, isSelected, theme)}
            </ItemContainer>
        )
    }

    const renderTreeViewItem = item => {
        if (!expandedNodes.has(item.title))
            setExpandedNodes(expandedNodes => new Set([...expandedNodes, item.title]));
        return <TreeItem
            onClick={() => openFolder(item.path)}
            style={{height: 25, color: theme.sidebarTextColor}}
            nodeId={item.title}
            label={item.title}
            icon={item.icon}
        />
    }

    const renderTreeViewSection = section => {
        if (!expandedNodes.has(section.title))
            setExpandedNodes(expandedNodes => new Set([...expandedNodes, section.title]));
        return (
            <TreeItem nodeId={section.title} label={section.title} style={{color: theme.sidebarTextColor}}>
                {section.children.map(renderTreeViewItem)}
            </TreeItem>
        )
    }

    const renderTreeView = shortcuts => {
        return (
            <TreeView
                defaultExpanded={[...expandedNodes]}
                className={treeViewClasses.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {shortcuts.map(renderTreeViewSection)}
            </TreeView>
        )
    }

    const handleUnselectAll = () => {
        setSelectedPaths([])
    }

    const handleNavWindowButtonPressed = e => {
        if (e.target.id === 'red_RE_window_button')
            props.onWindowRedButtonPressed();
        else if (e.target.id === 'yellow_RE_window_button')
            props.onWindowYellowButtonPressed();
        else if (e.target.id === 'green_RE_window_button')
            props.onWindowGreenButtonPressed();
    }

    const handleAddressKeyPressed = e => {
        if (e.code === 'Enter') {
            setEditingAddress('');
            openFolder(editingAddress);
            // setOpenDir(res.getLast())
        }
    }

    const handleRefresh = () => {
        console.log('a')
        getDir(openDir);

    }

    const treeViewClasses = useStyles();
    return (
        <div className={classes.container}
             style={{'--header-bgcolor': theme.headerBackgroundColor, '--textColor': theme.textColor}}>
            <div className={classes.header} style={{borderBottom: `1px solid ${theme.dividerColor}`}}>
                <div
                    className={classes.title}
                    style={{color: theme.windowTitleColor}}
                >
                    {props.windowTitle}
                </div>
                <div className={classes.headerButtonsContainer}>
                    <button
                        className={classes.headerButton}
                        id={'red_RE_window_button'}
                        style={{background: theme.windowRedButtonColor}}
                        onClick={handleNavWindowButtonPressed}
                    />
                    <button
                        className={classes.headerButton}
                        id={'yellow_RE_window_button'}
                        style={{background: theme.windowYellowButtonColor}}
                        onClick={handleNavWindowButtonPressed}
                    />
                    <button
                        className={classes.headerButton}
                        id={'green_RE_window_button'}
                        style={{background: theme.windowGreenButtonColor}}
                        onClick={handleNavWindowButtonPressed}
                    />
                </div>
            </div>
            <Grid
                container
                className={classes.topRow}
                alignItems="center"
                style={{
                    backgroundColor: theme.toolbarBackgroundColor,
                    borderBottom: `1px solid ${theme.dividerColor}`
                }}
            >
                <Grid alignItems="center" className={classes.navButtons}
                      style={{backgroundColor: theme.navigationButtonColor}}>
                    <IconButton style={{width: 30, height: 30, color: theme.navigationIconColor}}
                                onClick={() => !noBack && goBack()}
                                disabled={noBack}>
                        <ArrowLeftRounded style={{width: 40, height: 40, opacity: noBack ? 0.2 : 1}}/>
                    </IconButton>
                    <Divider light orientation="vertical" flexItem
                             style={{height: 30, backgroundColor: theme.toolbarDividerColor}}/>
                    <IconButton style={{width: 30, height: 30, color: theme.navigationIconColor}}
                                onClick={() => !noForward && goForward()} disabled={noForward}>
                        <ArrowRightRounded style={{width: 40, height: 40, opacity: noForward ? 0.2 : 1}}/>
                    </IconButton>
                </Grid>
                <Divider light orientation="vertical" flexItem
                         style={{
                             height: 50,
                             backgroundColor: theme.toolbarDividerColor,
                             marginLeft: 10,
                             marginRight: 10
                         }}/>
                <Grid container style={{
                    flex: 1,
                    backgroundColor: theme.addressBarBackgroundColor,
                    borderRadius: 5,
                    height: 30,
                    paddingLeft: 5,
                    lineHeight: '30px'
                }}>
                    <div style={{flex: 1}}>
                        <input
                            onKeyPress={handleAddressKeyPressed}
                            onBlur={e => {
                                setEditingAddress('')
                            }}
                            onChange={(e) => {
                                setEditingAddress(e.target.value)
                            }}
                            type={'text'}
                            value={editingAddress.length > 0 ? editingAddress : currentPath}
                            style={{
                                outline: 'none',
                                width: '100%',
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: theme.addressBarTextColor
                            }}/>
                    </div>
                    <IconButton style={{width: 30, height: 30, color: theme.refreshIconColor}}>
                        <RefreshRounded onClick={handleRefresh} style={{width: 20, height: 20}}/>
                    </IconButton>
                </Grid>
                {
                    (props.toolbar && props.toolbar.length > 0) ? (
                        <Divider
                            light
                            orientation="vertical"
                            flexItem
                            style={{
                                height: 50,
                                backgroundColor: theme.toolbarDividerColor,
                                marginLeft: 10,
                                marginRight: 10
                            }}
                        />
                    ) : (
                        <div style={{width: 10}}/>
                    )
                }
                {props.toolbar.map(tool => {
                    const Icon = tool.iconComponent;
                    return (
                        <IconButton
                            onClick={() => tool.onClick(openDir, selectedPaths)}
                            title={tool.hoverTitle}
                            style={{width: 30, height: 30, color: theme.toolbarIconColor, marginRight: 5}}
                        >
                            <Icon style={{width: 30, height: 30}}/>
                        </IconButton>
                    )
                })}
            </Grid>
            <div className={classes.body}>
                {props.enableSideBar && (
                    <div className={classes.side} style={{backgroundColor: theme.sidebarBackgroundColor}}>
                        {renderTreeView(props.shortcuts)}
                    </div>
                )}
                <div className={classes.main}
                     style={{backgroundColor: theme.mainBackgroundColor, '--textColor': theme.mainTextColor}}
                     onClick={() => handleUnselectAll()}>
                    {folders.map(renderItem)}
                    {files.map(renderItem)}
                    {loading && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            left: 0,
                            top: 0
                        }}>
                            <CircularProgress style={{color: theme.loadingColor}} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReactExplorer;

ReactExplorer.propTypes = propTypes;

ReactExplorer.defaultProps = defaultProps;