import FolderIcon from "@material-ui/icons/Folder";
import React from "react";
import normalizeName from "../functions/normalizeName";

export default function (folder, isSelected, theme) {
    return (
        <div
            style={{
                width: 70,
                height: 95,
                margin: '10px 0 0 10px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid transparent',
                borderRadius: 5,
                ...(isSelected ? {
                    border: `1px solid ${theme.selectedItemBorderColor}`,
                    backgroundColor: theme.selectedItemBackgroundColor
                } : {})
            }}
        >
            <FolderIcon style={{color: theme.itemColor, width: 60, height: 60}}/>
            <p
                style={{
                    color: theme.itemTextColor,
                    fontSize: 12,
                    wordBreak: 'break-word',
                    textAlign: 'center'
                }}
            >
                {normalizeName(folder.name)}
            </p>
        </div>
    )
};