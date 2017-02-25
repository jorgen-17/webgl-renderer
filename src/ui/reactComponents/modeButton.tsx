import * as React from "react";

export interface IModeButtonProps extends React.Props<any>
{
    idBase: string;
    additionalClass?: string;
    toolTip: string;
    mode:string;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class ModeButton extends React.Component<IModeButtonProps, {}>
{
    render()
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

export class ShapeModeButton extends ModeButton
{
    render()
    {
        return (
            <ModeButton 
                idBase={this.props.idBase}
                additionalClass={`shape-button ${this.props.additionalClass || ""}`}
                toolTip={this.props.toolTip}
                mode={this.props.mode}
                clickHandler={this.props.clickHandler}
            />
        );
    }
}


export class RenderModeButton extends ModeButton
{
    render()
    {
        return (
            <ModeButton 
                idBase={this.props.idBase}
                additionalClass={`mode-button ${this.props.additionalClass || ""}`}
                toolTip={this.props.toolTip}
                mode={this.props.mode}
                clickHandler={this.props.clickHandler}
            />
        );
    }
}