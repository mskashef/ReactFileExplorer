import React, {useEffect, useState} from 'react';

Array.prototype.getLast = function () {
    if (this.length > 0) return this[this.length - 1];
    return null;
}

const useExplorer = (fileList, initiallyOpenDirectory = '~') => {
    const [navStack, setNavStack] = useState([initiallyOpenDirectory]);
    const [forwardStack, setForwardStack] = useState([]);
    const [selectedPaths, setSelectedPaths] = useState([]);

    const handleSelectedItem = (e, id, name) => {
        if (e.ctrlKey) setSelectedPaths(data => data.includes(name) ? data.filter(d => d !== name) : [...data, name]);
        else setSelectedPaths([name]);
    }

    const back = () => {
        setNavStack(navStack => {
            if (navStack.length === 1) return [...navStack];
            let res = [...navStack];
            let popped = res.pop();
            pushToForwardNavStack(popped);
            return res;
        })
    }

    const goto = (folder) => {
        setNavStack(navStack => {
            let res = [...navStack];
            res.push(res.getLast() + '/' + folder);
            return res;
        });
        setForwardStack([]);
        setSelectedPaths([]);
    }

    const goToCompleteDir = dir => {
        setNavStack(navStack => {
            let res = [...navStack];
            if (res.length > 0) {
                if (navStack.getLast() === dir)
                    return res;
            }
            res.push(dir);
            return res;
        });
        setForwardStack([]);
        setSelectedPaths([]);
    }

    const pushToForwardNavStack = folder => {
        setForwardStack(forwardStack => {
            let res = [...forwardStack];
            res.push(folder);
            return res;
        });
        setSelectedPaths([]);
    }

    const shouldRender = dir => dir !== '?>props';

    const forward = () => {
        setForwardStack(navStack => {
            let res = [...navStack];
            let popped = res.pop();
            setNavStack(navStack => {
                let res = [...navStack];
                res.push(popped);
                return res;
            });
            return res;
        });
        setSelectedPaths([]);
    }

    const handleItemOpen = name => {
        goto(name);
    }

    const handleFileOpen = file => {
        // setOpenedFile(file);
    }


    const noBack = navStack.length === 1;
    const noForward = forwardStack.length === 0;

    const backSpaceListener = e => {
        if (e.key !== 'Backspace' || e.target.tagName === 'Input') return;
        if (!['commandText', 'searchText'.includes(e.tagName.name)]) {
            console.log('back');
            e.preventDefault();
            back();
        }
    }

    const handleBreadcrumbItemSelected = index => {
        console.log(index);
        let url = navStack.getLast().split('/').slice(0, index + 1).join('/');
        goToCompleteDir(url);
    }

    let breadcrumbItems = navStack.getLast().split('/');
    if (breadcrumbItems.length > 5) breadcrumbItems = breadcrumbItems.slice(breadcrumbItems.length - 5, breadcrumbItems.length);

    const refresh = () => {
        // TODO refresh
    }

    const selectAll = () => {
        // console.log(openedDir);
        // let displayFiles = Object.keys(openedDir).filter(dir => shouldRender(dir));
        // if (selectedPaths.length === displayFiles.length)
        //     selectedPaths([]);
        // else selectedPaths(displayFiles);
    }

    return {
        goBack: back,
        goForward: forward,
        goToAbsoluteDir: goToCompleteDir,
        openFolder: handleItemOpen,
        noBack: noBack,
        noForward: noForward,
        handleSelectItem: handleSelectedItem,
        selectedFolders: selectedPaths,
        currentPath: navStack.getLast()
    }

}

export default useExplorer;