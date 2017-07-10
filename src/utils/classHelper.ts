export class ClassHelper {
    public static getMethodName(obj: any): string
    {
        if (obj.name)
        {
            return obj.name;
        }

        let funcNameRegex = /function (.{1,})\(/;
        let results = (funcNameRegex).exec(obj.toString());
        let result: string | boolean | null | undefined = results && results.length > 1 && results[1];

        if (!result)
        {
            funcNameRegex = /return .([^;]+)/;
            results = (funcNameRegex).exec(obj.toString());
            result = results && results.length > 1 && results[1].split(".").pop();
        }

        return result || "";
    }
}