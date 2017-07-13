export class BrowserHelper
{
    public isIE (): boolean
    {
        return /*@cc_on!@*/false || !!(document as any).documentMode;
    }

    public isEdge (): boolean
    {
        return !this.isIE() && !!(window as any).StyleMedia;
    }
}