/**
 * 下载文件
 * @param res
 */
export function downLoadFile(res: any) {
    const a = document.createElement("a");
    let fileName = decodeURI(res.headers["content-disposition"]).split("filename=")[1];
    const blob = new Blob([res.data], {
        type: "application/octet-stream"
    });
    if (!fileName.includes(".xlsx") && !fileName.includes(".xls")) {
        fileName = fileName + ".xlsx";
    }
    const url = window.URL.createObjectURL(blob);
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
