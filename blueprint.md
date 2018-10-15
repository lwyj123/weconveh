# 使用路径

1. 用户在项目中安装weconveh
2. weconveh扫描项目结构，提取webpack配置并列一个表（同时保存一个webpack的一个描述，放入framework中）
3. 用户通过weconveh进行config自动配置（配置的意思是自动更新webpack的config以及添加新文件等），配置完成后更新一个framwork文件


# 脑洞
1. 从单一webpack扩展到任意的东西（需要提供一个通用的规则限制，参考pholcus？）

# TODO
如何应对版本问题以及依赖问题
为mod提供scan机制