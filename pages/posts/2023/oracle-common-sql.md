---
layout: post
title: Oracle 常用语句
subtitle:
date: 2022-08-02
permalinkPattern: /post/:year/:month/:day/:slug/
headerImage: /img/oracle.png
useHeaderImage: true
hide: false
tags: [Oracle, Database, SQL]
---

<!-- | 表名        | 描述         |
| ----------- | ------------ |
| user_tables | 用户表信息   |
| all_tables  | 全局表信息   |
| user_source | 用户资源信息 |
| all_source  | 全局资源信息 |
| dba_db_links  | 全局DBLink信息 |
 -->

## 表的元数据

### 当前用户

- 表与表注释

```sql
SELECT t.owner,
       t.table_name AS tableName,
       f.comments   AS comments
  FROM all_tables t
       INNER JOIN user_tab_comments f
       ON t.table_name = f.table_name;
```

- 表与字段注释

```sql
SELECT a.table_name,
       b.comments,
       c.column_name,
       c.comments
  FROM user_tables a
       LEFT JOIN user_tab_comments b
       ON a.table_name = b.table_name
       LEFT JOIN user_col_comments c
       ON a.table_name = c.table_name
```

### 所有用户

- 表与注释

```sql
SELECT t.owner,
       t.table_name AS tablename,
       f.comments   AS comments
  FROM all_tables t
       INNER JOIN all_tab_comments f
       ON t.table_name = f.table_name;
```

- 表与字段注释

```sql
SELECT a.owner,
       a.table_name,
       b.comments,
       c.column_name,
       c.comments
  FROM all_tables a
       LEFT JOIN all_tab_comments b
       ON a.table_name = b.table_name
       LEFT JOIN all_col_comments c
       ON a.table_name = c.table_name
```

## 任务

```sql
select * from DBA_JOBS;
select * from dba_jobs_running;
select * from user_jobs;
```

## 会话

```sql
select a.username, a.STATUS, a.OSUSER, a.sid, a.SERIAL#, a.program, b.spid, c.sql_text, c.SQL_ID
  from v$session a, v$process b, v$sqlarea c
 where a.paddr = b.addr
   and a.sql_hash_value = c.hash_value
   and a.username is not null;

-- kill 会话
alter system kill session ‘sid,serial#’;
```

### 锁

```sql
select l.session_id      as sid,
       s.serial#,
       l.locked_mode     as 锁模式,
       l.oracle_username as 登录用户,
       l.os_user_name    as 登录机器用户名,
       s.machine         as 机器名,
       s.terminal        as 终端用户名,
       o.object_name     as 被锁对象名,
       s.logon_time      as 登录数据库时间
  from v$locked_object l, all_objects o, v$session s
 where l.object_id = o.object_id
   and l.session_id = s.sid
 order by sid, s.serial#;
```

### 表大小

```sql
SELECT owner,
       segment_name,
       segment_type,
       ceil(max_size / (1024 * 1024 * 1024)) AS "上限(G)",
       bytes / (1024 * 1024 * 1024)          AS "空间大小(G)"
  FROM dba_segments a

-- 用户所有表的大小，按大小排序
SELECT owner,
       table_name,
       TRUNC(sum(bytes) / 1024 / 1024)           AS Meg,
       ROUND(ratio_to_report(sum(bytes)) OVER () * 100) AS Percent
  FROM (SELECT segment_name AS table_name, owner, bytes
          FROM dba_segments
         WHERE segment_type IN ('TABLE', 'TABLE PARTITION', 'TABLE SUBPARTITION')
         UNION ALL
        SELECT i.table_name, i.owner, s.bytes
          FROM dba_indexes i, dba_segments s
         WHERE s.segment_name = i.index_name AND s.owner = i.owner
           AND s.segment_type IN ('INDEX', 'INDEX PARTITION', 'INDEX SUBPARTITION')
         UNION ALL
        SELECT l.table_name, l.owner, s.bytes
          FROM dba_lobs l, dba_segments s
         WHERE s.segment_name = l.segment_name AND s.owner = l.owner
           AND s.segment_type IN ('LOBSEGMENT', 'LOB PARTITION')
         UNION ALL
        SELECT l.table_name, l.owner, s.bytes
          FROM dba_lobs l, dba_segments s
         WHERE s.segment_name = l.index_name AND s.owner = l.owner AND s.segment_type = 'LOBINDEX'
       )
 WHERE owner IN UPPER('TRACEUSER')
 GROUP BY table_name, owner
HAVING SUM(bytes) / 1024 / 1024 > 10 /* Ignore really small tables */
 ORDER BY SUM(bytes) DESC;
```

## 表

### 修改表名

```sql
rename table table_name to table_name1;
```

## privilege

```sql
GRANT CREATE SESSION TO USERNAME; -- 允许用户登录到数据库
GRANT SELECT,DELETE ANY TABLE TO USERNAME; -- 使用户能够查询和删除数据库中的任何表
GRANT CONNECT, RESOURCE, DBA TO USERNAME; -- 赋予用户更广泛的数据库访问和管理权限
GRANT CREATE SESSION GRANT ANY PRIVILEGE TO USERNAME; -- 允许用户用户登录和为其他用户分配权限
GRANT UNLIMITED TABLESPACE TO USERNAME; -- 允许用户在数据库中创建表并使用无限的表空间
GRANT SELECT, INSERT, UPDATE, DELETE ON schema.tableName TO USERNAME; -- 限定用户的权限，仅适用于特定表
```

### create user

```sql
CREATE USER USERNAME IDENTIFIED BY PASSWORD;
```

## Data Management

### Deduplication

```sql
DELETE
  FROM TABLE_NAME
 WHERE ROWID IN (SELECT max(t.ROWID)
                   FROM TABLE_NAME t
                  GROUP BY BUSINESS_PRIMARY_KEY
                 HAVING count(1) > 1);
```
