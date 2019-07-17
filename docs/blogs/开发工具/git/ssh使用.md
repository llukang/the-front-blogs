## git ssh使用

#### 配置git的用户名和邮箱

```bash
$ git config --global user.name "xuhaiyan"
$ git config --global user.email "haiyan.xu.vip@gmail.com"
```

#### 检查是否已拥有ssh密匙

```bash
$ cd ~/.ssh
$ ls
authorized_keys2  id_dsa       known_hosts
config            id_dsa.pub
```

我们需要寻找一对以 `id_dsa` 或 `id_rsa` 命名的文件，其中一个带有 `.pub` 扩展名。 `.pub` 文件是你的公钥，另一个则是私钥。 如果找不到这样的文件（或者根本没有 .ssh 目录），你可以通过运行 `ssh-keygen` 程序来创建它们。

#### 生成密匙

```bash
$ ssh-keygen -t rsa -C "haiyan.xu.vip@gmail.com"
```

首先 ssh-keygen 会确认密钥的存储位置（默认是 `.ssh/id_rsa`），然后它会要求你输入两次密钥口令。如果你不想在使用密钥时输入口令，将其留空即可。按3个回车，密码为空。最后得到了两个文件：`id_rsa`和`id_rsa.pub`

#### 查看密匙

```bash
$ cat ~/.ssh/id_rsa.pub 
```


#### 在git仓库上添加ssh密钥
添加`id_rsa.pub`里面的公钥到`Git`仓库上的`SSH keys`即可.

#### 常见问题

```
Access denied.
fatal: The remote end hung up unexpectedly
```

>这是因为没有生成ssh-key, 或者ssh-key不对，重新生成添加即可。

### 反馈与建议

- 开源中国：[@刘录康](http://git.oschina.net/liulukang)
- 邮箱：<275432465@qq.com>


感谢阅读这份帮助文档。
---------
