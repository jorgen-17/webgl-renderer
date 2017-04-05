// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { ModeButton } from "./modeButton";

export class ShapeModeButton extends ModeButton
{
    public render()
    {
        return (
            <ModeButton
                idBase={`${this.props.idBase}-shape`}
                additionalClass={`shape-button ${this.props.additionalClass || ""}`}
                toolTip={this.props.toolTip}
                mode={this.props.mode}
                clickHandler={this.props.clickHandler}
            />
        );
    }
}