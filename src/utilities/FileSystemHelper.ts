var RNFS = require('react-native-fs');
const FS_PATH = RNFS.DocumentDirectoryPath + '/';

export class FileSystemHelper {

    readFileAsync = async (fileName: string): Promise<string> => {
        return new Promise((resolve) => {
            if (!fileName) resolve('');
            RNFS.readFile(FS_PATH + fileName, 'utf8')
                .then((data: any) => {
                    if (data) {
                        resolve(data)
                    }
                })
                .catch((err: { message: string; }) => {
                    console.log(err.message);
                    resolve('');
                });
        });
    }

    writeFileAsync(fileData: string, fileName: string): Promise<boolean> {
        return new Promise((resolve) => {
            if (!fileData) resolve(false);
            const fullPath = FS_PATH + fileName;
            RNFS.writeFile(fullPath, fileData, 'utf8')
                .then((success: string) => {
                    resolve(true)
                })
                .catch((err: { message: string; }) => {
                    resolve(false);
                    console.log(err.message);
                });
        });
    }
}

export const fileSystemHelper = new FileSystemHelper();