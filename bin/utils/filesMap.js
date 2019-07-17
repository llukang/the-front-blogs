/* eslint-disable no-console */
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// 需要忽略的文件夹
const ignoreFiles = [
  'node_modules',
  'dist',
  '.git',
  'README.md',
  'TODO.md',
  'CHANGELOG.md'
];
const targetFilesReg = /\.(md)?$/; // 目标文件

// 获取文件结构
const readFilePath = (filePath, parentPath) => {
  const files = fs.readdirSync(filePath); // 同步读取文件列表
  const fileMap = [];
  files.forEach((fileName) => {
    const stats = fs.statSync(`${filePath}/${fileName}`);
    const isFile = stats.isFile(); // 是否是文件
    const isDirectory = stats.isDirectory(); // 是否是文件夹
    if (
      !ignoreFiles.includes(fileName)
      && (isDirectory || (isFile && targetFilesReg.test(fileName)))
    ) {
      fileMap.push({
        name: fileName,
        path: `${parentPath}/${fileName}`,
        childrens: isFile
          ? []
          : readFilePath(`${filePath}/${fileName}`, `${parentPath}/${fileName}`)
      });
    }
  });

  return fileMap;
};

// 清理无效结构
const formatFiles = (fileMap = [], parentKey = '/1') => {
  return fileMap
    .filter(({ name, childrens }) => {
      if (childrens.length) {
        return !!formatFiles(childrens).length;
      }
      return targetFilesReg.test(name);
    })
    .map(({ childrens, ...other }, index) => {
      return {
        ...other,
        key: `${parentKey}/${index + 1}`,
        childrens: childrens.length
          ? formatFiles(childrens, `${parentKey}/${index + 1}`)
          : undefined
      };
    });
};

// 写入文件
const writeFile = (targetFilePath, data) => {
  const dataStr = JSON.stringify(data);
  const fileName = `${targetFilePath}/routes.json`;
  try {
    fs.unlinkSync(fileName);
  } catch (err) {
    console.log(err);
  }

  fs.writeFile(fileName, `${dataStr}`, (err) => {
    if (err) {
      console.log(chalk.red(`————————————更新${fileName}失败————————————`));
      console.log(err);
    }
  });
};

// 创建文件结构map
module.exports.createFileMaps = (blogName) => {
  const rootFilePath = path.resolve(process.cwd(), `${blogName}`);
  const targetFilePath = path.resolve(process.cwd(), 'src/configs');

  const fileMap = readFilePath(rootFilePath, `/${blogName}`);
  const routes = formatFiles(fileMap);
  writeFile(targetFilePath, routes);
};
