import * as React from "react";

export interface IModeButtonProps extends React.Props<any>
{
    idBase: string;
    additionalClass?: string;
    toolTip: string;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class ModeButton<T extends IModeButtonProps> extends React.Component<T, {}>
{
    render()
    {
        return (
            <div
                id={`${this.props.idBase}-button`}
                className={`buttons ${this.props.additionalClass}`}
                data-tooltip={this.props.toolTip}
                onClick={this.props.clickHandler}
            ></div>
        );
    }
}

export interface IShapeModeProps extends IModeButtonProps
{
    shape: string;
}

export class ShapeModeButton extends ModeButton<IShapeModeProps>
{
    render()
    {
        return (
            <ModeButton 
                idBase={this.props.idBase}
                additionalClass={`shape-button ${this.props.additionalClass}`}
                toolTip={this.props.toolTip}
                data-shape={this.props.shape}
                clickHandler={this.props.clickHandler}
            />
        );
    }
}


export interface IRenderModeProps extends IModeButtonProps
{
    renderMode: string;
}

export class RenderModeButton extends ModeButton<IRenderModeProps>
{
    render()
    {
        return (
            <ModeButton 
                idBase={this.props.idBase}
                additionalClass={`mode-button ${this.props.additionalClass}`}
                toolTip={this.props.toolTip}
                data-mode={this.props.renderMode}
                clickHandler={this.props.clickHandler}
            />
        );
    }
}