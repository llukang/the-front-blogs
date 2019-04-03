## bash 使用

  - 环境变量
    ```bash
      export # 显示所有的环境变量
      echo $VARIABLE_NAME # 获取某个变量的详细信息
    ``` 
    
  - 文件夹操作
    ```bash
      mkdir dirname # 创建文件夹,逐层创建
      cd dirname # 切换目录
      pwd # 获取当前目录
      ls  [option] # 查看当前目录下的文件或文件夹
      option = -al # 列出文件相关信息
      option = -a # 列出所有文件，包括隐藏文件
    ```

  - 文件操作

    ```bash
      touch filename # 创建文件
      cat filename # 查看文件内容
      mv filename1 filename2 # 移动
      cp filename1 filename2 # 复制文件
      rm filename # 删除文件
      gzip filename # 压缩当前文件，解压当前文件
      gunzip filename # 解压当前文件，不会产生新文件
      gzcat filename # 查看压缩文件，不需要解压再查看 bash 不支持
      grep pattern filename # 使用grep搜索与一个或多个正则表达式匹配的文本行，并仅输出匹配的行
      wc filename # 获取文件中有多少行，多少单词和多少字符
      head filename # 输出文件的前10行
      tail filename # 输出文件的最后10行
      diff filename1 filename2 # 比较文件，并列出他们的差异
    ```
  - 进程操作
    ```bash
      ps  #列出所有进程
      kill PID # 使用您所提供的ID杀死（结束）进程。
    ```

  - 其他
    ```bash
      ping host # Pings主机并输出结果
      whoami # 返回当前登录用户名
      date # 显示当前日期和时间
      df # 显示磁盘使用情况

    ```
    
## bash 脚本使用

 - 创建脚本 `bash.sh`
 - 脚本默认首行 `#!/bin/bash` 
 - 退出脚本 `exit 0` 
 - 执行脚本 `bash $HOME/bin/hello1.sh`
 - 调试脚本
   - `-v` 逐行详细地查看脚本的内容
   - `-x` 执行时显示命令，更常用
 - 参数标识符
   - `$0` 文件本身的名字
   - `$1` 表示位置的参数，第一个参数传递给脚本
   - `${10}` 在超过两位数的参数时，使用大括号限定起来
   - `$#`	参数的个数
   - `$*` 表示所有的参数


## bash 语法

  - 变量声明
    ```bash
      str="hello world"
      echo $str   # hello world
    ```

  - 数组声明
    ```bash
      # bash中创建数组有几种方法
      array[0] = val
      array[1] = val
      array[2] = val

      array=([2]=val [0]=val [1]=val)

      array(val val val)

      {array[i]} # 获取索引处值
      {#array[@]} # 获取所有值
    ```
    
  - 三元运算符

    ```bash
    ${varname:-word}    # 如果varname存在且不为null，则返回其值; 否则返回word
    ${varname:=word}    # 如果varname存在且不为null，则返回其值;否则设置它，然后返回其值
    ${varname:+word}    # 如果varname存在并且不为null，返回word; 否则返回null 
    ${varname:offset:length}    # 执行子字符串扩展。它返回$ varname的子字符串，从offset开始，最多为length的字符
    ```
  - 条件控制 
    ```bash
      if [expression]; then
      will execute only if expression is true
      else
          will execute if expression is false
      fi
    ```

  - 分支控制 
    ```bash
     case expression in
        pattern1 )
            statements ;;
        pattern2 )
            statements ;;
      esac
    ```

  - 循环 
    - for 循环
      ```bash
        for x := 1 to 10 do
        begin
          statements
        end

        for name in list
        do
          statements that can use $name
        done

        for (( initialisation ; ending condition ; update ))
        do
          statements...
        done
      ```

    - while 循环
      ```bash
      while condition; do
        statements
      done
      ```

    - until 循环

      ```bash
        until condition; do
          statements
        done
      ```

  - 函数2

    ```bash
      function hello {
        echo world!
      }
      hello # 返回 world

      function say {
        echo $1
      }
      say "hello world!" # 返回 hello world!
    ```

  - 常用表达式

    ```bash
      statement1 && statement2  # 两边的条件都为true
      statement1 || statement2  # 其中一边为true

      str1=str2       # str1 匹配 str2
      str1!=str2      # str1 不匹配 str2
      str1<str2       # str1 是否小于 str2
      str1>str2       # str1 是否大于 str2
      -n str1         # str1 不为空(长度大于 0)
      -z str1         # str1 为空(长度为 0)

      -a file         # 文件存在 
      -d file         # 文件存在，是一个目录 
      -e file         # 文件存在; 相同的-a 
      -f file         # 文件存在，是一个常规文件（即不是目录或其他特殊类型的文件） 
      -r file         # 你有读权限 
      -r file         # 文件存在，不为空 
      -w file         # 你有写权限 
      -x file         # 你有文件的执行权限

      file1 -nt file2     # file1 is newer than file2
      file1 -ot file2     # file1 is older than file2

      -lt     # 小于
      -le     # 小于或等于
      -eq     # 等于
      -ge     # 大于或等于
      -gt     # 大于
      -ne     # 不等于
    ```

## 其他知识

- `type cd` 用于显示命令类型
- 双引号与单引号
- `echo "Hello $1"` // 打印传递的值，例如 Tim。
- `echo 'Hello $1'` // 把$1原样打印出来

## linux shell(bash) 和 windows cmd 区别

- shell是一个命令解释器(也是一种应用程序)，处于内核和用户之间，负责把用户的指令传递给内核并且把执行结果回显给用户，同时，shell也可以作为一门强大的编程语言。在linux/unix平台上，shell多半默认为 `Bash shell`。

- cmd是 `Command shell` 的简写，CommandShell是一个独立的应用程序，它为用户提供对操作系统直接通信的功能，它为基于字符的应用程序和工具提供了非图形界面的运行环境，它执行命令并在屏幕上回显MS-DOS风格的字符

- 可以近似地认为 `linux shell=bash` 而 `windows=cmd`，都是命令行解释器，都是用户与操作系统的交互接口。但是bash要比cmd强大很多，windows也有强大的shell叫 `windows power shell`。

## 参考文档

- [常用bash命令-英文](https://github.com/Idnan/bash-guide)
- [常用bash命令-中文](https://www.cnblogs.com/savorboard/p/bash-guide.html)
- [常用bash编程-中文](https://www.cnblogs.com/qingjiaowoxiaoxioashou/p/7007615.html)
  