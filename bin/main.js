#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const shell = require('shelljs');
const chalk = require('chalk');
const fs = require('fs-extra');
const packageJSON = require('../package.json');

const filesMap = require('./utils/filesMap');

const blogName = 'blogs';

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

// init blog
const fetchBlog = (repository) => {
  try {
    // save blog's git repository
    if (repository) {
      updatePackageJson({ ...packageJSON, [blogName]: repository });
    } else {
      repository = packageJSON[blogName];
    }
    // check git repository
    if (!repository) {
      throw new Error(`${blogName} repository 不存在`);
    }

    const blogFolderPath = path.resolve(__dirname, `../${blogName}`);
    const blogExists = fs.existsSync(blogFolderPath);

    if (!blogExists) {
      const cloneResult = shell.exec(`git clone ${repository}  ${blogName}`);
      if (cloneResult.code) {
        throw new Error('初始化blog失败！');
      }
    } else {
      const pullResult = shell.exec(
        `cd ${blogName} && git checkout ./ && git pull`
      );
      if (pullResult.code) {
        throw new Error('同步blog失败！');
      }
    }

    filesMap.createFileMaps(blogName);
  } catch (error) {
    console.log(chalk.red(error.message));
    console.log(error);
  }
};

program
  .version('0.1.0', '-v,--version')
  .usage('[options] <file ...>')
  .option('-i, --integer <n>', 'An integer argument', parseInt)
  .option('-f, --float <n>', 'A float argument', parseFloat)
  .parse(process.argv);

// 初始化文档
program
  .command('init [repository]')
  .description(`初始化${blogName}文档`)
  .action((repository) => {
    fetchBlog(repository);
  });

// 更新文档
program
  .command('update')
  .description(`更新${blogName}文档`)
  .action(() => {
    fetchBlog();
  });

// 运行项目文档
program
  .command('run <name>')
  .description('运行项目')
  .action((name) => {
    // 判断文档仓库是否存在
    fs.stat(path.resolve(__dirname, `../${blogName}`), (err) => {
      if (err) {
        console.log(chalk.red('请先初始化项目'));
      } else {
        switch (name) {
          case 'dev':
            require('./commands/dev.js')();
            break;
          case 'build':
            require('./commands/build.js')();
            break;
          case 'analyze':
            require('./commands/build.js')({ analyze: true });
            break;
          default:
            console.log(chalk.red('运行命令不存在'));
            break;
        }
      }
    });
  });

program.parse(process.argv);
