import * as React from "react";

export interface IModeButtonBarProps extends React.Props<any>
{
    baseId: string;
    mainButtonTooltip: string;
    mainButtonBaseId: string;
}

export class ModeButtonBar extends React.Component<IModeButtonBarProps, {}>
{
    public render()
    {
        return (
            <div id={`${this.props.baseId}-container`} className="button-container">
                {this.props.children}
                <div
                    id={`${this.props.mainButtonBaseId}-button`}
                    className="buttons"
                    data-tooltip={this.props.mainButtonTooltip}>
                </div>
            </div>
        );
    }
}