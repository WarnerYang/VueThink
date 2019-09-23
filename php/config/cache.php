<?php
// +----------------------------------------------------------------------
// | 缓存设置
// +----------------------------------------------------------------------
$cache = [];
if (strtolower(getenv('CACHE_TYPE')) === 'file') {
    $cache = [
        // 驱动方式
        'type' => 'File',
        // 缓存保存目录
        'path' => CACHE_PATH,
        // 缓存前缀
        'prefix' => getenv('CACHE_FILE_PREFIX'),
        // 缓存有效期 0表示永久缓存
        'expire' => int(getenv('CACHE_FILE_EXPIRE')),
    ];
}
if (strtolower(getenv('CACHE_TYPE')) === 'redis') {
    $cache = [
        // 驱动方式
        'type' => 'redis',
        // 缓存保存目录
        'host' => getenv('CACHE_REDIS_HOST'),
        'password' => getenv('CACHE_REDIS_PASSWORD'),
        // 缓存前缀
        'prefix' => getenv('CACHE_REDIS_PREFIX'),
        'select' => getenv('CACHE_REDIS_SELECT'),
    ];
}
return $cache;
