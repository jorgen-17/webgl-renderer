import * as React from "react";

export interface IModeButtonProps extends React.Props<any>

{
    idBase: string;
    additionalClass?: string;
    toolTip: string;
    mode: string;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export class ModeButton extends React.Component<IModeButtonProps, {}>
{
    public render()
    {
        return (
            <div
                id={`${this.props.idBase}-button`}
                className={`buttons ${this.props.additionalClass || ""}`}
                data-tooltip={this.props.toolTip}
                data-mode={this.props.mode}
                onClick={this.props.clickHandler}
            ></div>
        );
    }
}