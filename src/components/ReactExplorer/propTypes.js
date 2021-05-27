import PropTypes from "prop-types";

const propTypes = {
    fileList: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string,
            isFile: PropTypes.bool,
            fileUrl: PropTypes.string,
            length: PropTypes.number,
            modified: PropTypes.instanceOf(Date)
        })
    ),
    defaultDir: PropTypes.string,
    onFileOpen: PropTypes.func,
    onFolderOpen: PropTypes.func,
    enableShortcuts: PropTypes.bool,
    request: PropTypes.func,
    shortcuts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    icon: PropTypes.any,
                    title: PropTypes.string,
                    path: PropTypes.string
                })
            )
        })
    ),
    toolbar: PropTypes.array,
    renderFolder: PropTypes.func,
    renderFile: PropTypes.func,
    itemContainerStyle: PropTypes.object,
    onWindowRedButtonPressed: PropTypes.func,
    onWindowYellowButtonPressed: PropTypes.func,
    onWindowGreenButtonPressed: PropTypes.func,
    theme: PropTypes.object,
    enableSideBar: PropTypes.bool
}

export default propTypes;