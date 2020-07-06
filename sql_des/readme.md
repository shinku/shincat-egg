user 表
|  字段   | 类型  |
|  - | -  |
| id  | 自增ID |
| username  | string |
| userid  | string |
| pwd  | 加密密码 |

porjects 表
|  字段   | 类型  |
|  - | -  |
| id  | 自增ID |
| projectid  | string |

project_user 表
|  字段   | 类型  |
|  - | -  |
| id  | 自增ID |
| userid  | 自增ID |
| projectid  | string |

interface_project 表
|  字段   | 类型  ||
|  - | -  |-|
| id  | 自增ID |-|
| projectid  | string |项目ID|
| interfaceid  | string |api id|
| apiurl | string | API 地址 |
| method | string |GET/POST/PUT/DELETE|
|response|long|返回内容长字符串|

params_interface 表
用于关联 字段和接口
|  字段   | 类型  |
|  - | -  |
| id  | 自增ID |
| paramsname  |  string |
| paramtype| string |


