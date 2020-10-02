# env-config

#### 安装

##### (c)npm install env-config -D

#### 使用

```javascript
const EnvConfig = require('env-config')
const envConfig = new EnvConfig('env file path')
```

#### API

- constructor
    - EnvConfig
        - param
            - 配置文件路径 \<String\>
- methods
    - get
        - param
            - key <String | Null>
        - return 
            - value <String | Object>
    - has
        - param
            - key <String | Null>
        - return 
            - has \<Boolean\>

#### 例子

- 基础

```text
# mysql
MYSQL_HOST   =  localhost
MYSQL_PORT   =  3306

# redis
REDIS_HOST   = localhost

#
KEY          = value

# ENV
IS_DEV       = false
ENV          = dev
```
```javascript
const path = require('path')
const EnvConfig = require('env-config')
const envConfig = new EnvConfig(path.resolve(__dirname, './.env'))
console.log(envConfig.get('IS_DEV'))            // false
console.log(envConfig.has('MYSQL_PORT'))        // true
console.log(envConfig.get('MYSQL_HOST'))        // 'localhost'
console.log(envConfig.get('MYSQL_PORT'))        // 3306
```

- 其他

以`#`开头的则认为是注释说明

```text
# 这是注释
HOST = localhost
```

通过`键值`分割的是以第一个`=`为基准

```text
user===long
```

```javascript
console.log(envConfig.get('user'))        // ==long
```

第一位为`=`将进行忽略，因为这是不标准的配置格式

```text
===long
```

以`=`结尾并且只有一个`=`将匹配到`''`值

```text
HOST  =   
```
```javascript
console.log(envConfig.get('PORT') === '')        // true
```

程序会自动识别`boolean`以及`number`类型

```text
IS_DEV      = false
PORT        = 3306
```

```javascript
console.log(typeof envConfig.get('IS_DEV'))        // boolean
console.log(typeof envConfig.get('PORT'))          // number
```
