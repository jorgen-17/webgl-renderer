// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { ModeButton } from "./modeButton";

export class ColorModeButton extends ModeButton
{
    public render()
    {
        return (
            <ModeButton
                idBase={`${this.props.idBase}-color`}
                additionalClass={`color-button ${this.props.idBase}-background ${this.props.additionalClass || ""}`}
                toolTip={this.props.toolTip}
                mode={this.props.mode}
                clickHandler={this.props.clickHandler}
            />
        );
    }
}