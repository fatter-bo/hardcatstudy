import { exec } from 'child_process';

export function ReplaceLine(filename: string, srcStr: string, dstStr: string): void {
    let cmdStr = "sed -i -e   's/" + srcStr + "/" + dstStr + "/g' " + filename
    console.log(cmdStr);
    exec(cmdStr, function (err, stdout, stderr) { });
}
