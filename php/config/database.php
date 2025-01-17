<?php
// +----------------------------------------------------------------------
// | Description: 数据库配置文件
// +----------------------------------------------------------------------
// | Author: linchuangbin <linchuangbin@honghaiweb.com>
// +----------------------------------------------------------------------
return [
    // 数据库类型
    'type'           => getenv('DB_TYPE'),
    // 服务器地址
    'hostname'       => getenv('DB_HOSTNAME'),
    // 数据库名
    'database'       => getenv('DB_DATABASE'),
    // 用户名
    'username'       => getenv('DB_USERNAME'),
    // 密码
    'password'       => getenv('DB_PASSWORD'),
    // 端口
    'hostport'       => getenv('DB_HOSTPORT'),
    // 连接dsn
    'dsn'            => '',
    // 数据库连接参数
    'params'         => [],
    // 数据库编码默认采用utf8
    'charset'        => getenv('DB_CHARSET'),
    // 数据库表前缀
    'prefix'         => getenv('DB_PREFIX'),
    // 数据库调试模式
    'debug'          => true,
    // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
    'deploy'         => 0,
    // 数据库读写是否分离 主从式有效
    'rw_separate'    => false,
    // 读写分离后 主服务器数量
    'master_num'     => 1,
    // 指定从服务器序号
    'slave_no'       => '',
    // 是否严格检查字段是否存在
    'fields_strict'  => true,
    // 数据集返回类型 array 数组 collection Collection对象
    'resultset_type' => 'array',
    // 是否自动写入时间戳字段
    'auto_timestamp' => false,
    // 是否需要进行SQL性能分析
    'sql_explain'    => false,
    // 时间字段是否自动格式化输出
    'datetime_format' => false,
];
