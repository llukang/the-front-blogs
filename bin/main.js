#!/usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const program = require('commander');
const shell = require('shelljs');
const chalk = require('chalk');
const packageJSON = require('../package.json');

const utils = require('./utils');
const filesMap = require('./filesMap');

const targetFiles = 'blogs';

// 写入文件
const updatePackageJson = (data) => {
  const dataStr = JSON.stringify(data, null, 2);
  const fileName = './package.json';
  try {
    fs.unlinkSync(fileName);
  } catch (err) {
    console.log(err);
  }
  console.log(dataStr);

  fs.writeFile(fileName, `${dataStr}`, (err) => {
    if (err) {
      console.log(`————————————更新${fileName}失败————————————`);
      console.log(err);
    }
  });
};

// 初始化文档项目
const initDocs = (repository) => {
  try {
    const fileName = utils.getRepositoryName(repository);
    shell.exec(`rm -fr ${targetFiles}`);
    const cloneResult = shell.exec(`git clone "${repository}"`);
    shell.exec(`mv ${fileName} ${targetFiles}`);
    filesMap.createFileMaps(); // 创建文件映射
    updatePackageJson({ ...packageJSON, blogs: repository });
    console.log(
      !cloneResult.code
        ? chalk.green('docs文档下载成功！')
        : chalk.red('docs文档下载失败！')
    );
  } catch (err) {
    console.log(err);
    console.log(chalk.red('docs文档下载失败！'));
  }
};

// 更新文档项目
const updateDocs = () => {
  try {
    const pullResult = shell.exec(
      `cd ${targetFiles} &&
       git checkout ./ &&
       git pull`
    );
    console.log(
      !pullResult.code
        ? chalk.green('docs文档更新成功！')
        : chalk.red('docs文档更新失败！')
    );
    filesMap.createFileMaps(); // 创建文件映射
  } catch (err) {
    console.log(chalk.red('docs文档更新失败！'));
  }
};

program
  .version('0.1.0', '-v,--version')
  .usage('[options] <file ...>')
  .option('-i, --integer <n>', 'An integer argument', parseInt)
  .option('-f, --float <n>', 'A float argument', parseFloat)
  .parse(process.argv);

// 初始化项目文档
program
  .command('init <repository>')
  .description('初始化项目docs文档')
  .action((repository) => {
    initDocs(repository);
  });

// 更新项目文档
program
  .command('update')
  .description('更新文件映射')
  .action(() => {
    filesMap.createFileMaps();
    console.log(chalk.green('项目文件映射已更新'));
  });

// 更新项目映射
program
  .command('fetch')
  .description('更新项目docs文档')
  .action(() => {
    // 判断文档仓库是否存在
    fs.stat(path.resolve(__dirname, '../docs/.git'), (err) => {
      if (err) {
        initDocs();
      } else {
        updateDocs();
      }
    });
  });

// 运行项目文档
program
  .command('run <name>')
  .description('运行docs文档')
  .action((name) => {
    // 判断文档仓库是否存在
    fs.stat(path.resolve(__dirname, '../docs/.git'), (err) => {
      if (err) {
        console.log(chalk.red('请先初始化项目'));
      } else {
        switch (name) {
          case 'start':
          case 'dev':
            shell.exec('npm run dev');
            break;
          case 'build':
            shell.exec('npm run build');
            break;
          case 'publish':
            shell.exec('npm run publish');
            break;
          default:
            console.log(chalk.red('运行命令不存在'));
            break;
        }
      }
    });
  });

program.parse(process.argv);
