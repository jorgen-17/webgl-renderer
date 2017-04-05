// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { ModeButton } from "./modeButton";

export class RenderModeButton extends ModeButton
{
    public render()
    {
        return (
            <ModeButton
                idBase={`${this.props.idBase}-mode`}
                additionalClass={`mode-button ${this.props.additionalClass || ""}`}
                toolTip={this.props.toolTip}
                mode={this.props.mode}
                clickHandler={this.props.clickHandler}
            />
        );
    }
}