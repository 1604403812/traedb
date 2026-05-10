# 个人综合应用系统 - 技术方案

## 1. 项目概述

### 1.1 项目背景

构建一个面向个人使用的综合性管理应用，整合音声、小说、TWICE Wiki、拼豆库存、OneDrive云盘等多个功能模块，支持 Web 端和 Android 端访问，采用前后端完全分离架构部署于轻量服务器。

### 1.2 项目目标

- 提供统一的个人数据管理平台
- 实现跨平台访问（Web + Android）
- 支持本地管理与云端部署的数据同步
- 确保界面精致美观

### 1.3 技术栈选择

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| 前端 | Vue 3 + Vite + TypeScript | 现代化前端框架，性能优异 |
| UI组件库 | Ant Design Vue | 企业级组件，精致美观 |
| 移动端 | PWA (Progressive Web App) | 一次开发，多端适配 |
| 后端 | Django 4 + Django REST Framework | 成熟稳定的 Python Web 框架 |
| 数据库 | MySQL (sqlpub 云端) | 关系型数据库，支持远程访问 |
| 媒体存储 | OneDrive + Alist API | 云端存储媒体文件 |
| 认证 | JWT Token | 无状态认证，适合分布式部署 |
| API规范 | RESTful API | 成熟的设计规范 |
| 部署 | Docker Compose + Nginx | 容器化部署，统一管理 |
| 服务器 | 轻量服务器 | 低成本部署方案 |

---

## 2. 系统架构设计

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────┐
│                      客户端层                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Web 端     │  │  Android 端  │  │    PWA      │     │
│  │ (Vue 3 SPA)  │  │ (PWA 包装)   │  │  (手机浏览器) │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
└─────────┼────────────────┼────────────────┼────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      网关层                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │                  Nginx (反向代理)                 │   │
│  │  - SSL/TLS 终止                                  │   │
│  │  - 静态资源服务                                   │   │
│  │  - 请求分发                                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────┬─────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   API 网关层     │ │   静态资源层     │ │   WebSocket 层   │
│  (Django DRF)   │ │   (Nginx)       │ │   (Django)       │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
┌─────────────────────────────────────────────────────────┐
│                      服务层                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  用户认证    │  │   数据服务    │  │  文件服务    │     │
│  │  服务       │  │  (业务逻辑)   │  │  (媒体处理)  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                      数据层                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   MySQL     │  │  OneDrive    │  │   Redis     │     │
│  │  (sqlpub)   │  │  (Alist)     │  │  (缓存/队列) │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### 2.2 前端架构

```
┌────────────────────────────────────────────┐
│             Vue 3 应用架构                   │
├────────────────────────────────────────────┤
│  Views (页面层)                             │
│  ├─ Dashboard (仪表盘)                       │
│  ├─ Audio (音声管理)                         │
│  ├─ Novel (小说管理)                         │
│  ├─ Wiki (TWICE Wiki)                       │
│  ├─ Bead (拼豆库存)                          │
│  └─ Drive (云盘管理)                         │
├────────────────────────────────────────────┤
│  Components (组件层)                        │
│  ├─ Common (通用组件)                        │
│  ├─ Audio (音声组件)                         │
│  ├─ Novel (小说组件)                         │
│  ├─ Wiki (Wiki组件)                         │
│  ├─ Bead (拼豆组件)                          │
│  └─ Drive (云盘组件)                         │
├────────────────────────────────────────────┤
│  Store (状态管理 - Pinia)                   │
│  ├─ user (用户状态)                          │
│  ├─ audio (音声状态)                         │
│  ├─ novel (小说状态)                         │
│  ├─ wiki (Wiki状态)                         │
│  ├─ bead (拼豆状态)                          │
│  └─ drive (云盘状态)                         │
├────────────────────────────────────────────┤
│  Services (服务层)                          │
│  ├─ api (HTTP 请求封装)                      │
│  ├─ auth (认证服务)                          │
│  ├─ storage (本地存储)                       │
│  └─ websocket (实时通信)                    │
├────────────────────────────────────────────┤
│  Router (路由管理 - Vue Router)             │
│  └─ 路由守卫、权限控制、懒加载                │
└────────────────────────────────────────────┘
```

### 2.3 后端架构

```
┌────────────────────────────────────────────┐
│           Django REST Framework            │
├────────────────────────────────────────────┤
│  API Views (视图层)                         │
│  ├─ Auth (认证相关)                          │
│  ├─ Audio (音声API)                         │
│  ├─ Novel (小说API)                         │
│  ├─ Wiki (Wiki API)                        │
│  ├─ Bead (拼豆API)                          │
│  └─ Drive (云盘API)                         │
├────────────────────────────────────────────┤
│  Serializers (序列化层)                     │
│  ├─ 数据验证                                 │
│  ├─ 数据转换                                 │
│  └─ 嵌套序列化                               │
├────────────────────────────────────────────┤
│  Models (模型层)                            │
│  ├─ User (用户)                             │
│  ├─ Audio (音声)                            │
│  ├─ Novel (小说)                            │
│  ├─ Wiki (Wiki)                             │
│  ├─ Bead (拼豆)                             │
│  └─ Drive (云盘)                            │
├────────────────────────────────────────────┤
│  Services (业务逻辑层)                      │
│  ├─ audio_service (音声业务)                │
│  ├─ novel_service (小说业务)                │
│  ├─ wiki_service (Wiki业务)                │
│  ├─ bead_service (拼豆业务)                │
│  ├─ drive_service (云盘业务)                │
│  └─ alist_service (Alist集成)              │
├────────────────────────────────────────────┤
│  Utils (工具层)                             │
│  ├─ crawler (爬虫工具)                       │
│  ├─ storage (存储工具)                       │
│  └─ helpers (辅助函数)                      │
└────────────────────────────────────────────┘
```

---

## 3. 数据库设计

### 3.1 ER 图

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │     │    Audio    │     │    Novel    │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ username    │◄───┐│ code        │     │ title       │
│ email       │     │ title       │     │ author      │
│ password    │     │ cv          │     │ summary     │
│ created_at  │     │ circle      │     │ cover_url   │
└─────────────┘     │ series      │     │ file_path    │
                    │ summary     │     │ status      │
                    │ cover_url   │     │ created_at  │
                    │ folder_path  │     └─────────────┘
                    │ status       │              │
                    │ created_at   │              │
                    └─────────────┘              │
                           │                      │
                           ▼                      ▼
                    ┌─────────────┐     ┌─────────────┐
                    │AudioTag(M2M) │     │ NovelTag(M2M│
                    └─────────────┘     └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Member     │     │   Album     │     │    Bead     │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │◄───┐│ id          │     │ id          │
│ name        │     │ title       │     │ name        │
│ korean_name  │     │ release_date│     │ brand       │
│ english_name │     │ album_type  │     │ color_code  │
│ birth_date   │     │ track_count │     │ quantity    │
│ position     │     │ cover_url   │     │ unit        │
│ mbti         │     │ member_ids  │     │ min_stock   │
│ image_url    │     │ description │     │ created_at  │
│ description  │     └─────────────┘     └─────────────┘
└─────────────┘            │
                          ▼
                    ┌─────────────┐
                    │   Song      │
                    ├─────────────┤
                    │ id          │
                    │ title       │
                    │ album_id    │
                    │ track_order │
                    │ duration    │
                    │ lyrics      │
                    └─────────────┘
```

### 3.2 数据表详细设计

#### 3.2.1 用户表 (User)

```sql
CREATE TABLE `user` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(50) UNIQUE NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(500) NULL,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 3.2.2 音声表 (Audio)

```sql
CREATE TABLE `audio` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `code` VARCHAR(50) UNIQUE NOT NULL COMMENT '音声编号',
    `title` VARCHAR(200) NOT NULL,
    `circle_id` BIGINT NULL COMMENT '社团ID',
    `series` VARCHAR(100) NULL COMMENT '系列',
    `summary` TEXT NULL,
    `cover_url` VARCHAR(500) NULL,
    `folder_path` VARCHAR(500) NOT NULL COMMENT 'OneDrive文件夹路径',
    `release_date` DATE NULL,
    `status` VARCHAR(20) DEFAULT 'owned' COMMENT 'owned/wishlist/lend',
    `rating` TINYINT NULL COMMENT '评分1-5',
    `is_favorite` BOOLEAN DEFAULT FALSE,
    `play_count` INT DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`circle_id`) REFERENCES `circle`(`id`) ON DELETE SET NULL,
    INDEX `idx_code` (`code`),
    INDEX `idx_title` (`title`)
);
```

#### 3.2.3 音声-声优关联表 (AudioVoiceActor)

```sql
CREATE TABLE `audio_voice_actor` (
    `audio_id` BIGINT NOT NULL,
    `voice_actor_id` BIGINT NOT NULL,
    `role` VARCHAR(50) NULL COMMENT '角色(主演/助演/龙套)',
    PRIMARY KEY (`audio_id`, `voice_actor_id`),
    FOREIGN KEY (`audio_id`) REFERENCES `audio`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`voice_actor_id`) REFERENCES `voice_actor`(`id`) ON DELETE CASCADE
);
```

#### 3.2.4 音声标签表 (AudioTag)

```sql
CREATE TABLE `audio_tag` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) UNIQUE NOT NULL,
    `category` VARCHAR(50) NULL COMMENT '标签分类'
);

CREATE TABLE `audio_tags` (
    `audio_id` BIGINT NOT NULL,
    `tag_id` BIGINT NOT NULL,
    PRIMARY KEY (`audio_id`, `tag_id`),
    FOREIGN KEY (`audio_id`) REFERENCES `audio`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `audio_tag`(`id`) ON DELETE CASCADE
);

#### 3.2.5 社团表 (Circle)

```sql
CREATE TABLE `circle` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `name_japanese` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `website` VARCHAR(500) NULL,
    `logo_url` VARCHAR(500) NULL,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_name` (`name`)
);
```

#### 3.2.6 声优表 (VoiceActor)

```sql
CREATE TABLE `voice_actor` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `name_japanese` VARCHAR(100) NULL,
    `name_english` VARCHAR(100) NULL,
    `gender` VARCHAR(10) NULL COMMENT 'male/female/other',
    `birth_date` DATE NULL,
    `agency` VARCHAR(100) NULL COMMENT '所属事务所',
    `description` TEXT NULL,
    `avatar_url` VARCHAR(500) NULL,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_name` (`name`)
);
```

#### 3.2.7 作者表 (Author)

```sql
CREATE TABLE `author` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `name_pseudonym` VARCHAR(100) NULL COMMENT '笔名',
    `gender` VARCHAR(10) NULL COMMENT 'male/female/other',
    `birth_date` DATE NULL,
    `country` VARCHAR(50) NULL COMMENT '所属国家',
    `description` TEXT NULL,
    `avatar_url` VARCHAR(500) NULL,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_name` (`name`)
);
```

#### 3.2.9 平台表 (Platform)

```sql
CREATE TABLE `platform` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `website` VARCHAR(500) NULL,
    `logo_url` VARCHAR(500) NULL,
    `description` TEXT NULL,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_name` (`name`)
);
```

#### 3.2.10 小说表 (Novel)

```sql
CREATE TABLE `novel` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `author_id` BIGINT NULL,
    `platform_id` BIGINT NULL,
    `short_summary` VARCHAR(500) NULL COMMENT '一句话简介',
    `summary` TEXT NULL,
    `cover_url` VARCHAR(500) NULL,
    `file_path` VARCHAR(500) NOT NULL COMMENT 'OneDrive文件路径',
    `file_size` BIGINT NULL COMMENT '文件大小(字节)',
    `word_count` INT NULL COMMENT '字数',
    `read_count` INT DEFAULT 0 COMMENT '阅读次数',
    `status` VARCHAR(20) DEFAULT 'owned' COMMENT 'owned/reading/completed',
    `reading_progress` INT DEFAULT 0 COMMENT '阅读进度(百分比)',
    `rating` TINYINT NULL COMMENT '评分1-5',
    `is_favorite` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`author_id`) REFERENCES `author`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`platform_id`) REFERENCES `platform`(`id`) ON DELETE SET NULL,
    INDEX `idx_title` (`title`)
);

#### 3.2.11 小说标签表 (NovelTag)

```sql
CREATE TABLE `novel_tag` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) UNIQUE NOT NULL,
    `category` VARCHAR(50) NULL
);

CREATE TABLE `novel_tags` (
    `novel_id` BIGINT NOT NULL,
    `tag_id` BIGINT NOT NULL,
    PRIMARY KEY (`novel_id`, `tag_id`),
    FOREIGN KEY (`novel_id`) REFERENCES `novel`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `novel_tag`(`id`) ON DELETE CASCADE
);
```

#### 3.2.12 TWICE成员表 (Member)

```sql
CREATE TABLE `member` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL COMMENT '艺名',
    `korean_name` VARCHAR(50) NULL,
    `english_name` VARCHAR(50) NULL,
    `birth_date` DATE NULL,
    `birthplace` VARCHAR(100) NULL,
    `position` VARCHAR(100) NULL,
    `mbti` VARCHAR(10) NULL,
    `image_url` VARCHAR(500) NULL,
    `description` TEXT NULL,
    `social_links` JSON NULL COMMENT '社交媒体链接',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 3.2.13 TWICE专辑表 (Album)

```sql
CREATE TABLE `album` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `title_korean` VARCHAR(200) NULL,
    `release_date` DATE NOT NULL,
    `album_type` VARCHAR(50) NOT NULL COMMENT 'mini/full/single/digital',
    `track_count` INT NOT NULL,
    `cover_url` VARCHAR(500) NULL,
    `description` TEXT NULL,
    `debut_album` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_release_date` (`release_date`)
);
```

#### 3.2.14 专辑-成员关联表

```sql
CREATE TABLE `album_members` (
    `album_id` BIGINT NOT NULL,
    `member_id` BIGINT NOT NULL,
    PRIMARY KEY (`album_id`, `member_id`),
    FOREIGN KEY (`album_id`) REFERENCES `album`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE CASCADE
);
```

#### 3.2.15 歌曲表 (Song)

```sql
CREATE TABLE `song` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `title_korean` VARCHAR(200) NULL,
    `album_id` BIGINT NOT NULL,
    `track_order` INT NOT NULL,
    `duration` INT NULL COMMENT '时长(秒)',
    `lyrics` TEXT NULL,
    `song_type` VARCHAR(50) DEFAULT 'title' COMMENT 'title/side_a/side_b/unit',
    `unit_name` VARCHAR(50) NULL COMMENT '小分队名称',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`album_id`) REFERENCES `album`(`id`) ON DELETE CASCADE,
    INDEX `idx_album_id` (`album_id`)
);
```

#### 3.2.16 拼豆库存表 (Bead)

```sql
CREATE TABLE `bead` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `brand` VARCHAR(50) NOT NULL COMMENT '品牌(Perler/Hama/Mitsubishi)',
    `color_code` VARCHAR(20) NULL COMMENT '色号',
    `color_hex` VARCHAR(7) NULL COMMENT '十六进制颜色值',
    `quantity` INT NOT NULL DEFAULT 0,
    `unit` VARCHAR(20) DEFAULT '颗' COMMENT '单位',
    `min_stock` INT DEFAULT 50 COMMENT '最低库存提醒',
    `purchase_price` DECIMAL(10,2) NULL,
    `purchase_date` DATE NULL,
    `supplier` VARCHAR(100) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_brand` (`brand`),
    INDEX `idx_color_code` (`color_code`)
);
```

#### 3.2.17 OneDrive云盘表 (FileItem)

```sql
CREATE TABLE `file_item` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(1000) NOT NULL COMMENT '完整路径',
    `parent_path` VARCHAR(1000) NULL,
    `type` VARCHAR(20) NOT NULL COMMENT 'file/folder',
    `mime_type` VARCHAR(100) NULL,
    `size` BIGINT NULL COMMENT '文件大小',
    `extension` VARCHAR(20) NULL,
    `drive_type` VARCHAR(20) DEFAULT 'onedrive' COMMENT 'onedrive/local',
    `alist_path` VARCHAR(500) NULL COMMENT 'Alist虚拟路径',
    `thumbnail_url` VARCHAR(500) NULL,
    `download_url` VARCHAR(500) NULL,
    `last_modified` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_path` (`path`),
    INDEX `idx_parent_path` (`parent_path`)
);
```


#### 3.2.18 爬虫记录表 (CrawlLog)

```sql
CREATE TABLE `crawl_log` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `source` VARCHAR(50) NOT NULL COMMENT '爬虫来源',
    `target_id` VARCHAR(100) NULL COMMENT '目标ID',
    `status` VARCHAR(20) NOT NULL COMMENT 'success/failed/pending',
    `error_message` TEXT NULL,
    `data_snapshot` JSON NULL COMMENT '抓取的数据快照',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. API 接口设计

### 4.1 API 规范

**基础规范：**
- 协议：HTTPS
- 数据格式：JSON
- 字符编码：UTF-8
- 认证方式：Bearer Token (JWT)

**统一响应格式：**
```json
{
  "code": 200,
  "message": "Success",
  "data": { },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**错误响应格式：**
```json
{
  "code": 400,
  "message": "Bad Request",
  "errors": [
    {
      "field": "title",
      "message": "标题不能为空"
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 4.2 认证接口

#### POST /api/v1/auth/register
注册新用户

**请求体：**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "password_confirm": "string"
}
```

**响应：**
```json
{
  "code": 201,
  "message": "注册成功",
  "data": {
    "user": {
      "id": 1,
      "username": "string",
      "email": "string"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/v1/auth/login
用户登录

**请求体：**
```json
{
  "username": "string",
  "password": "string"
}
```

**响应：**
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "user": {
      "id": 1,
      "username": "string",
      "email": "string",
      "avatar": "url"
    },
    "token": "jwt_token_here",
    "expires_in": 86400
  }
}
```

#### POST /api/v1/auth/refresh
刷新Token

**请求头：**
```
Authorization: Bearer <refresh_token>
```

**响应：**
```json
{
  "code": 200,
  "data": {
    "token": "new_jwt_token",
    "expires_in": 86400
  }
}
```

### 4.3 音声管理接口

#### GET /api/v1/audio
获取音声列表

**查询参数：**
- `page` (int): 页码，默认1
- `page_size` (int): 每页数量，默认20
- `search` (string): 搜索关键词
- `status` (string): 状态过滤 (owned/wishlist/lend)
- `tags` (string): 标签ID，多个用逗号分隔
- `ordering` (string): 排序字段 (title/-title, created_at/-created_at)

**响应：**
```json
{
  "code": 200,
  "data": {
    "total": 100,
    "page": 1,
    "page_size": 20,
    "results": [
      {
        "id": 1,
        "code": "Audio001",
        "title": "音声标题",
        "cv": "声优名",
        "circle": "社团名",
        "series": "系列名",
        "cover_url": "封面URL",
        "status": "owned",
        "rating": 5,
        "is_favorite": true,
        "tags": [
          {"id": 1, "name": "BL", "category": "genre"}
        ]
      }
    ]
  }
}
```

#### POST /api/v1/audio
创建音声

**请求体：**
```json
{
  "code": "Audio001",
  "title": "音声标题",
  "cv": "声优名",
  "circle": "社团名",
  "series": "系列名",
  "summary": "简介",
  "folder_path": "/audio/Audio001",
  "release_date": "2024-01-01",
  "tags": [1, 2, 3]
}
```

#### GET /api/v1/audio/{id}
获取音声详情

**响应：**
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "code": "Audio001",
    "title": "音声标题",
    "cv": "声优名",
    "circle": "社团名",
    "series": "系列名",
    "summary": "简介",
    "cover_url": "封面URL",
    "folder_path": "/audio/Audio001",
    "release_date": "2024-01-01",
    "status": "owned",
    "rating": 5,
    "is_favorite": true,
    "play_count": 10,
    "tags": [],
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT /api/v1/audio/{id}
更新音声

#### DELETE /api/v1/audio/{id}
删除音声

#### POST /api/v1/audio/{id}/favorite
切换收藏状态

#### POST /api/v1/audio/crawl
爬取音声信息

**请求体：**
```json
{
  "source_url": "https://example.com/audio/123"
}
```

**响应：**
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "code": "Audio001",
    "title": "音声标题",
    "cv": "声优名",
    "circle": "社团名",
    "cover_url": "封面URL"
  }
}
```

### 4.4 小说管理接口

#### GET /api/v1/novel
获取小说列表

**查询参数：**
- `page`, `page_size`, `search`, `status`, `tags`, `ordering`

**响应：**
```json
{
  "code": 200,
  "data": {
    "total": 100,
    "page": 1,
    "page_size": 20,
    "results": [
      {
        "id": 1,
        "title": "小说标题",
        "author": "作者名",
        "cover_url": "封面URL",
        "status": "reading",
        "reading_progress": 50,
        "rating": 4,
        "is_favorite": true,
        "word_count": 50000,
        "tags": []
      }
    ]
  }
}
```

#### POST /api/v1/novel
创建小说

**请求体：**
```json
{
  "title": "小说标题",
  "author": "作者名",
  "summary": "简介",
  "file_path": "/novel/test.txt",
  "tags": [1, 2]
}
```

#### GET /api/v1/novel/{id}
获取小说详情

#### GET /api/v1/novel/{id}/content
获取小说内容（在线阅读）

**响应：**
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "title": "小说标题",
    "content": "小说正文...",
    "word_count": 50000,
    "current_position": 1000
  }
}
```

#### PUT /api/v1/novel/{id}/progress
更新阅读进度

**请求体：**
```json
{
  "progress": 75
}
```

#### DELETE /api/v1/novel/{id}
删除小说

### 4.5 TWICE Wiki 接口

#### GET /api/v1/wiki/members
获取成员列表

**响应：**
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "娜琏",
      "korean_name": "나연",
      "english_name": "Nayeon",
      "image_url": "url",
      "position": "主唱"
    }
  ]
}
```

#### GET /api/v1/wiki/members/{id}
获取成员详情

**响应：**
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "name": "娜琏",
    "korean_name": "나연",
    "english_name": "Nayeon",
    "birth_date": "1995-09-22",
    "birthplace": "首尔",
    "position": "主唱",
    "mbti": "ENFP",
    "image_url": "url",
    "description": "简介...",
    "social_links": {
      "instagram": "url"
    }
  }
}
```

#### GET /api/v1/wiki/albums
获取专辑列表

**查询参数：**
- `type` (string): 专辑类型 (mini/full/single/digital)
- `year` (int): 发布年份

**响应：**
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "title": "TWICEcoaster: LANE 1",
      "title_korean": "트와이스코스터 : 레인 1",
      "release_date": "2016-10-24",
      "album_type": "mini",
      "track_count": 7,
      "cover_url": "url",
      "debut_album": false
    }
  ]
}
```

#### GET /api/v1/wiki/albums/{id}
获取专辑详情（含歌曲列表）

**响应：**
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "title": "TWICEcoaster: LANE 1",
    "release_date": "2024-01-01",
    "album_type": "mini",
    "track_count": 7,
    "cover_url": "url",
    "description": "简介...",
    "members": [
      {"id": 1, "name": "娜琏"},
      {"id": 2, "name": "定延"}
    ],
    "songs": [
      {
        "id": 1,
        "title": "LIKEY",
        "track_order": 1,
        "duration": 198,
        "song_type": "title"
      }
    ]
  }
}
```

#### GET /api/v1/wiki/songs
获取歌曲列表

**查询参数：**
- `album_id` (int): 专辑ID
- `search` (string): 搜索关键词

### 4.6 拼豆库存接口

#### GET /api/v1/bead
获取拼豆库存列表

**查询参数：**
- `page`, `page_size`, `search`, `brand`, `low_stock` (boolean: 仅显示低库存)

**响应：**
```json
{
  "code": 200,
  "data": {
    "total": 100,
    "page": 1,
    "page_size": 50,
    "results": [
      {
        "id": 1,
        "name": "白色",
        "brand": "Perler",
        "color_code": "000",
        "color_hex": "#FFFFFF",
        "quantity": 500,
        "unit": "颗",
        "is_low_stock": false
      }
    ]
  }
}
```

#### POST /api/v1/bead
添加拼豆

**请求体：**
```json
{
  "name": "白色",
  "brand": "Perler",
  "color_code": "000",
  "color_hex": "#FFFFFF",
  "quantity": 500,
  "min_stock": 50
}
```

#### PUT /api/v1/bead/{id}
更新拼豆信息

#### PUT /api/v1/bead/{id}/stock
更新库存数量

**请求体：**
```json
{
  "quantity": 480,
  "action": "decrease",
  "notes": "制作图案使用"
}
```

#### DELETE /api/v1/bead/{id}
删除拼豆

#### GET /api/v1/bead/stats
获取库存统计

**响应：**
```json
{
  "code": 200,
  "data": {
    "total_types": 100,
    "total_quantity": 50000,
    "low_stock_count": 5,
    "by_brand": {
      "Perler": 60,
      "Hama": 30,
      "Mitsubishi": 10
    }
  }
}
```

### 4.7 云盘管理接口

#### GET /api/v1/drive/browse
浏览云盘目录

**查询参数：**
- `path` (string): 目录路径，默认"/"

**响应：**
```json
{
  "code": 200,
  "data": {
    "current_path": "/audio",
    "parent_path": "/",
    "items": [
      {
        "id": 1,
        "name": "Audio001",
        "type": "folder",
        "size": 0,
        "last_modified": "2024-01-01T00:00:00Z"
      },
      {
        "id": 2,
        "name": "cover.jpg",
        "type": "file",
        "size": 1024000,
        "mime_type": "image/jpeg",
        "extension": "jpg",
        "download_url": "url",
        "thumbnail_url": "url",
        "last_modified": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

#### GET /api/v1/drive/download
下载文件

**查询参数：**
- `path` (string): 文件路径

**响应：** 文件流

#### POST /api/v1/drive/upload
上传文件

**请求体：** multipart/form-data
- `file`: 文件
- `path`: 上传目录路径

**响应：**
```json
{
  "code": 200,
  "data": {
    "name": "test.txt",
    "path": "/audio/test.txt",
    "size": 1024
  }
}
```

#### POST /api/v1/drive/sync
同步云盘信息

**响应：**
```json
{
  "code": 200,
  "message": "同步任务已创建",
  "data": {
    "task_id": "sync_001"
  }
}
```

### 4.8 标签管理接口

#### GET /api/v1/tags/audio
获取音声标签列表

#### POST /api/v1/tags/audio
创建音声标签

#### GET /api/v1/tags/novel
获取小说标签列表

#### POST /api/v1/tags/novel
创建小说标签

---

## 5. 前端应用设计

### 5.1 目录结构

```
web/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── api/                    # API 请求封装
│   │   ├── index.ts           # Axios 实例配置
│   │   ├── auth.ts            # 认证接口
│   │   ├── audio.ts           # 音声接口
│   │   ├── novel.ts           # 小说接口
│   │   ├── wiki.ts            # Wiki接口
│   │   ├── bead.ts            # 拼豆接口
│   │   └── drive.ts           # 云盘接口
│   ├── assets/                 # 静态资源
│   │   ├── images/
│   │   ├── fonts/
│   │   └── styles/
│   │       ├── variables.scss  # 主题变量
│   │       ├── mixins.scss     # 混入
│   │       └── global.scss     # 全局样式
│   ├── components/             # 通用组件
│   │   ├── common/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppSidebar.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── PageTitle.vue
│   │   │   ├── SearchInput.vue
│   │   │   ├── EmptyState.vue
│   │   │   └── LoadingSpinner.vue
│   │   ├── audio/
│   │   │   ├── AudioCard.vue
│   │   │   ├── AudioList.vue
│   │   │   ├── AudioPlayer.vue
│   │   │   └── AudioDetail.vue
│   │   ├── novel/
│   │   │   ├── NovelCard.vue
│   │   │   ├── NovelList.vue
│   │   │   ├── NovelReader.vue
│   │   │   └── NovelDetail.vue
│   │   ├── wiki/
│   │   │   ├── MemberCard.vue
│   │   │   ├── MemberDetail.vue
│   │   │   ├── AlbumCard.vue
│   │   │   └── SongList.vue
│   │   ├── bead/
│   │   │   ├── BeadCard.vue
│   │   │   ├── BeadGrid.vue
│   │   │   ├── BeadForm.vue
│   │   │   └── StockAlert.vue
│   │   └── drive/
│   │       ├── FileList.vue
│   │       ├── FileItem.vue
│   │       └── FolderTree.vue
│   ├── composables/            # 组合式函数
│   │   ├── useAuth.ts
│   │   ├── usePagination.ts
│   │   ├── useSearch.ts
│   │   └── useToast.ts
│   ├── layouts/                # 布局组件
│   │   ├── DefaultLayout.vue
│   │   ├── AuthLayout.vue
│   │   └── BlankLayout.vue
│   ├── router/                 # 路由配置
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   └── guards.ts
│   ├── stores/                 # Pinia 状态管理
│   │   ├── index.ts
│   │   ├── auth.ts
│   │   ├── audio.ts
│   │   ├── novel.ts
│   │   ├── wiki.ts
│   │   ├── bead.ts
│   │   └── drive.ts
│   ├── types/                  # TypeScript 类型定义
│   │   ├── api.d.ts
│   │   ├── audio.d.ts
│   │   ├── novel.d.ts
│   │   ├── wiki.d.ts
│   │   ├── bead.d.ts
│   │   └── drive.d.ts
│   ├── utils/                  # 工具函数
│   │   ├── request.ts          # Axios 封装
│   │   ├── storage.ts          # 本地存储
│   │   ├── format.ts           # 格式化函数
│   │   └── validate.ts         # 表单验证
│   ├── views/                  # 页面视图
│   │   ├── auth/
│   │   │   ├── Login.vue
│   │   │   └── Register.vue
│   │   ├── dashboard/
│   │   │   └── Index.vue
│   │   ├── audio/
│   │   │   ├── Index.vue
│   │   │   ├── Detail.vue
│   │   │   └── Crawl.vue
│   │   ├── novel/
│   │   │   ├── Index.vue
│   │   │   ├── Detail.vue
│   │   │   └── Reader.vue
│   │   ├── wiki/
│   │   │   ├── Index.vue
│   │   │   ├── Members.vue
│   │   │   ├── MemberDetail.vue
│   │   │   ├── Albums.vue
│   │   │   └── AlbumDetail.vue
│   │   ├── bead/
│   │   │   ├── Index.vue
│   │   │   └── Stats.vue
│   │   └── drive/
│   │       ├── Index.vue
│   │       └── Viewer.vue
│   ├── App.vue
│   ├── main.ts
│   └── registerServiceWorker.ts
├── tests/                      # 测试文件
│   └── unit/
├── .env                        # 环境变量
├── .env.development
├── .env.production
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

### 5.2 核心页面设计

#### 5.2.1 仪表盘页面

```
┌─────────────────────────────────────────────────────────┐
│  Logo   Dashboard  Audio  Novel  Wiki  Bead  Drive  👤 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ 音声收藏      │ │ 小说阅读进度  │ │ 低库存提醒    │    │
│  │   45         │ │   12/50      │ │   5          │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│                                                         │
│  最近添加                                                 │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                      │
│  │ 🎵  │ │ 📚  │ │ 🎤  │ │ 🎨  │                      │
│  │音声  │ │小说  │ │专辑  │ │拼豆  │                      │
│  └─────┘ └─────┘ └─────┘ └─────┘                      │
│                                                         │
│  最近播放                                                 │
│  ┌──────────────────────────────────────────────┐      │
│  │ ▶ 音声标题 - 声优  |  小说标题 - 进度75%      │      │
│  └──────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 5.2.2 音声管理页面

```
┌─────────────────────────────────────────────────────────┐
│  🎵 音声管理                                    [+] 添加 │
├─────────────────────────────────────────────────────────┤
│  🔍 搜索...    状态: [全部▼]  标签: [多选▼]  排序: [最新▼] │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │   [封面]    │ │   [封面]    │ │   [封面]    │       │
│  │             │ │             │ │             │       │
│  │ Audio001   │ │ Audio002   │ │ Audio003   │       │
│  │ 标题        │ │ 标题        │ │ 标题        │       │
│  │ 声优名      │ │ 声优名      │ │ 声优名      │       │
│  │ ❤️ 5.0     │ │ ❤️ 4.5     │ │ ❤️ 4.0     │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│                                                         │
│  ... 更多音声卡片 ...                                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  < 上一页   1 2 3 ... 10   下一页 >                     │
└─────────────────────────────────────────────────────────┘
```

#### 5.2.3 小说阅读页面

```
┌─────────────────────────────────────────────────────────┐
│  ← 返回    《小说标题》                    ⚙️ 设置  📥 下载 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│    ┌─────────────────────────────────────────────────┐  │
│    │                                                 │  │
│    │  第一章  序                                      │  │
│    │                                                 │  │
│    │  这是一个阳光明媚的早晨...                       │  │
│    │                                                 │  │
│    │  主角走在熙熙攘攘的街道上...                     │  │
│    │                                                 │  │
│    │  ...                                            │  │
│    │                                                 │  │
│    │                           75% ████████░░░░    │  │
│    │                                                 │  │
│    └─────────────────────────────────────────────────┘  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  字号: [A-] [A+]   背景: [白天] [夜间] [护眼]   亮度: ─●─ │
│                                                         │
│  [上一章]     进度: 75% (第15章/共20章)      [下一章]   │
└─────────────────────────────────────────────────────────┘
```

#### 5.2.4 TWICE Wiki 页面

```
┌─────────────────────────────────────────────────────────┐
│  🎤 TWICE WIKI                            [全部] 成员 专辑 │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │           [TWICE 官方图片]                        │   │
│  │                                                 │   │
│  │  TWICE (트와이스)                                │   │
│  │  九人女子偶像组合 · JYP Entertainment            │   │
│  │  出道日期: 2015年10月20日                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  成员                                                    │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ │
│  │娜琏│ │定延│ │Momo│ │Sana│ │子瑜│ │彩瑛│ │多贤│ │mina│ │志效│ │
│  │ 🎤│ │ 🎤│ │ 🎤│ │ 🎤│ │ 🎤│ │ 🎤│ │ 🎤│ │ 🎤│ │ 🎤│ │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ │
│                                                         │
│  专辑                                                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │ [封面]  │ │ [封面]  │ │ [封面]  │ │ [封面]  │        │
│  │ WITH    │ │ READY   │ │ Celebrate│ │Formula  │        │
│  │ 2023    │ │ TO BE   │ │  2022    │ │ OF LOVE │        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 5.2.5 拼豆库存页面

```
┌─────────────────────────────────────────────────────────┐
│  🎨 拼豆库存                        [+] 添加   📊 统计   │
├─────────────────────────────────────────────────────────┤
│  🔍 搜索...    品牌: [全部▼]  库存: [全部▼]  排序: [名称▼] │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │  ⚠️ 低库存提醒 (5)                               │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │   │
│  │  │ ⚠️  │ │ ⚠️  │ │ ⚠️  │ │ ⚠️  │ │ ⚠️  │ │   │
│  │  │ 白色  │ │ 黑色  │ │ 红色  │ │ 蓝色  │ │ 黄色  │ │   │
│  │  │ 30   │ │ 25   │ │ 40   │ │ 35   │ │ 45   │ │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  全部库存 (100)                                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ │
│  │ ●  │ │ ●  │ │ ●  │ │ ●  │ │ ●  │ │ ●  │ │ ●  │ │ ●  │ │
│  │白色│ │黑色│ │红色│ │蓝色│ │黄色│ │绿色│ │橙色│ │粉色│ │
│  │500 │ │480 │ │350 │ │420 │ │380 │ │300 │ │200 │ │150 │ │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ │
│                                                         │
│  ... 更多颜色 ...                                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 5.2.6 云盘管理页面

```
┌─────────────────────────────────────────────────────────┐
│  ☁️ 云盘管理                           [🔄 同步] [📤 上传] │
├─────────────────────────────────────────────────────────┤
│  路径: / audio novel wiki bead                          │
├─────────────────────────────────────────────────────────┤
│  📁 audio/                                               │
│  ├── 📁 Audio001/                                        │
│  │   ├── 🎵 audio.mp3                                    │
│  │   ├── 📄 subtitle.lrc                                 │
│  │   ├── 🎬 video.mp4                                    │
│  │   └── 🖼️ cover.jpg                                    │
│  ├── 📁 Audio002/                                        │
│  └── 📁 Audio003/                                        │
│                                                         │
│  📁 novel/                                               │
│  ├── 📄 小说1.txt                                        │
│  ├── 📄 小说2.txt                                        │
│  └── 📄 小说3.txt                                        │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  已选择: 0 项    存储空间: 5.2 GB / 15 GB                 │
└─────────────────────────────────────────────────────────┘
```

### 5.3 响应式设计

页面将采用响应式设计，支持以下断点：

| 设备类型 | 宽度范围 | 列数 | 卡片大小 |
|----------|----------|------|----------|
| 手机 (Portrait) | < 576px | 1-2 | 小 |
| 手机 (Landscape) | 576px - 768px | 2-3 | 中 |
| 平板 | 768px - 992px | 3-4 | 中 |
| 桌面 | 992px - 1200px | 4-6 | 大 |
| 大屏 | > 1200px | 6+ | 大 |

### 5.4 主题切换

应用支持浅色/深色主题切换：

```typescript
// 主题变量示例
:root {
  --color-primary: #1890ff;
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-error: #ff4d4f;
  
  --bg-color: #ffffff;
  --text-color: #333333;
  --border-color: #e8e8e8;
}

[data-theme="dark"] {
  --bg-color: #141414;
  --text-color: #ffffff;
  --border-color: #303030;
}
```

---

## 6. 功能模块设计

### 6.1 音声管理模块

#### 功能列表

1. **音声列表管理**
   - 分页展示音声列表
   - 支持搜索、筛选、排序
   - 卡片/列表视图切换
   - 批量操作（删除、移动）

2. **音声详情**
   - 显示完整音声信息
   - 标签管理
   - 评分和收藏
   - 播放次数统计

3. **音声播放**
   - 内置音频播放器
   - 支持字幕同步（LRC）
   - 播放列表管理
   - 进度记忆

4. **爬虫功能**
   - 从指定网站抓取音声信息
   - 自动识别音声编号
   - 下载封面和元信息
   - 支持多个数据源

5. **文件夹同步**
   - 扫描OneDrive指定目录
   - 自动创建音声记录
   - 识别文件类型（音频/字幕/视频/图片）
   - 保持与云盘同步

#### 音声文件结构

```
/OneDrive/
└── Audio/
    └── [音声编号]/
        ├── [音声编号].mp3        # 主音频文件
        ├── [音声编号].flac       # 无损音频（可选）
        ├── [音声编号].lrc        # 歌词字幕
        ├── [音声编号].srt        # 时间轴字幕
        ├── [音声编号].ass        # ASS字幕
        ├── [音声编号]_cover.jpg  # 封面图
        ├── [音声编号]_video.mp4  # 视频版（可选）
        └── readme.txt           # 说明文件（可选）
```

### 6.2 小说管理模块

#### 功能列表

1. **小说列表管理**
   - 分页展示小说列表
   - 支持搜索、筛选、排序
   - 状态标记（未读/阅读中/已读完）
   - 批量操作

2. **小说详情**
   - 显示小说信息
   - 标签管理
   - 评分和收藏
   - 阅读进度追踪

3. **在线阅读**
   - 章节分页显示
   - 阅读进度自动保存
   - 字体大小调整
   - 主题切换（白天/夜间/护眼）
   - 上下章切换

4. **云盘备份**
   - 小说文件上传至OneDrive
   - 支持TXT格式
   - 自动按作者/类型分类
   - 下载到本地

#### 小说存储结构

```
/OneDrive/
└── Novel/
    ├── [作者名]/
    │   └── [小说标题].txt
    └── backup/
        └── [小说标题]_[日期].txt
```

### 6.3 TWICE Wiki 模块

#### 功能列表

1. **成员管理**
   - 成员列表展示
   - 成员详情页
   - 社交媒体链接
   - 个人资料编辑

2. **专辑管理**
   - 专辑列表（按时间/类型筛选）
   - 专辑详情（含歌曲列表）
   - 封面图展示
   - 成员参与展示

3. **歌曲管理**
   - 歌曲列表
   - 歌词展示
   - 歌曲时长统计
   - 搜索功能

4. **演出记录**
   - 演唱会列表
   - 打歌舞台记录
   - 时间线展示

#### Wiki 数据结构

```typescript
// 成员
Member: {
  id: number;
  name: string;           // 艺名
  korean_name: string;    // 韩文名
  english_name: string;   // 英文名
  birth_date: string;
  birthplace: string;
  position: string;       // 队内定位
  mbti: string;
  image_url: string;
  description: string;
  social_links: {
    instagram?: string;
    twitter?: string;
    weibo?: string;
  };
}

// 专辑
Album: {
  id: number;
  title: string;
  title_korean: string;
  release_date: string;
  album_type: 'mini' | 'full' | 'single' | 'digital';
  track_count: number;
  cover_url: string;
  description: string;
  members: Member[];
  songs: Song[];
}

// 歌曲
Song: {
  id: number;
  title: string;
  title_korean: string;
  album_id: number;
  track_order: number;
  duration: number;
  lyrics: string;
  song_type: 'title' | 'side_a' | 'side_b' | 'unit';
  unit_name?: string;
}
```

### 6.4 拼豆库存模块

#### 功能列表

1. **库存管理**
   - 颜色列表展示
   - 品牌筛选
   - 库存数量编辑
   - 批量导入/导出

2. **库存操作**
   - 入库记录
   - 出库记录
   - 库存调整
   - 操作日志

3. **低库存提醒**
   - 设置最低库存阈值
   - 低库存预警显示
   - 微信/邮件通知（可选）

4. **统计分析**
   - 库存总量统计
   - 按品牌分类统计
   - 库存变化趋势
   - 采购建议

#### 拼豆数据模型

```typescript
// 拼豆
Bead: {
  id: number;
  name: string;           // 颜色名称
  brand: string;          // 品牌 (Perler/Hama/Mitsubishi)
  color_code: string;      // 色号
  color_hex: string;       // 十六进制颜色
  quantity: number;       // 当前库存
  unit: string;           // 单位 (颗/包)
  min_stock: number;       // 最低库存提醒
  purchase_price?: number; // 采购价格
  purchase_date?: string; // 采购日期
  supplier?: string;       // 供应商
  notes?: string;          // 备注
  created_at: string;
  updated_at: string;
}

// 库存操作记录
StockOperation: {
  id: number;
  bead_id: number;
  operation_type: 'increase' | 'decrease' | 'adjust';
  quantity: number;
  before_quantity: number;
  after_quantity: number;
  notes?: string;
  created_at: string;
}
```

### 6.5 云盘管理模块

#### 功能列表

1. **文件浏览**
   - 目录树导航
   - 文件列表展示
   - 缩略图预览
   - 面包屑导航

2. **文件操作**
   - 上传文件/文件夹
   - 下载文件
   - 新建文件夹
   - 重命名
   - 移动/复制
   - 删除（到回收站）

3. **Alist 集成**
   - 统一管理多个存储源
   - OneDrive 直链访问
   - 文件预览（图片/视频/音频/文档）
   - 断点续传

4. **文件同步**
   - 扫描指定目录
   - 自动创建数据库记录
   - 与其他模块关联（音声/小说）
   - 定时同步任务

#### Alist API 集成

```typescript
// Alist 配置
interface AlistConfig {
  url: string;           // Alist 服务地址
  token: string;         // 认证Token
  storage_id: number;   // 存储ID
}

// 文件对象
interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  mime_type?: string;
  extension?: string;
  thumbnail_url?: string;
  download_url?: string;
  last_modified?: string;
}
```

---

## 7. 安全设计

### 7.1 认证与授权

#### JWT Token 认证流程

```
用户登录
    │
    ▼
POST /api/v1/auth/login
    │
    ▼
验证用户名密码
    │
    ▼
生成 Access Token (15分钟) + Refresh Token (7天)
    │
    ▼
返回 Token 给客户端
    │
    ▼
客户端存储 Token
    │
    ▼
请求时携带 Authorization: Bearer <token>
    │
    ▼
后端验证 Token 有效性
    │
    ├── 有效 → 处理请求
    │
    └── 无效/过期 → 返回 401，客户端刷新 Token
```

#### 权限控制

```python
# 权限级别
class PermissionLevel:
    PUBLIC = 0      # 公开（无需登录）
    USER = 1       # 普通用户
    ADMIN = 10     # 管理员

# 视图权限装饰器
@permission_required(PermissionLevel.ADMIN)
def admin_only_view(request):
    pass
```

### 7.2 数据安全

1. **密码加密**：使用 Django 内置 PBKDF2 算法加密
2. **敏感数据**：API Key、密码等敏感字段加密存储
3. **输入验证**：所有输入进行严格的格式验证
4. **SQL注入防护**：使用 ORM 避免 SQL 注入
5. **XSS防护**：前端转义用户输入，后端验证数据类型

### 7.3 接口安全

1. **限流**：单IP每分钟最多60次请求
2. **CORS**：仅允许配置的域名跨域访问
3. **CSRF**：表单提交使用 CSRF Token
4. **敏感操作**：删除、修改需要二次确认

---

## 8. 部署方案

### 8.1 Docker Compose 架构

```yaml
version: '3.8'

services:
  # Nginx 反向代理
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - static_volume:/app/static
      - media_volume:/app/media
    depends_on:
      - backend
    networks:
      - app_network

  # Django 后端
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DEBUG=False
      - DATABASE_URL=mysql://user:password@host:3306/dbname
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=your-secret-key
    volumes:
      - media_volume:/app/media
    depends_on:
      - redis
    networks:
      - app_network

  # Redis 缓存
  redis:
    image: redis:alpine
    volumes:
      - redis_volume:/data
    networks:
      - app_network

  # Celery Worker (异步任务)
  celery:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: celery -A application worker -l info
    environment:
      - DATABASE_URL=mysql://user:password@host:3306/dbname
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - media_volume:/app/media
    depends_on:
      - redis
      - backend
    networks:
      - app_network

volumes:
  static_volume:
  media_volume:
  redis_volume:

networks:
  app_network:
    driver: bridge
```

### 8.2 Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # 前端静态文件
    location / {
        root /app/static;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # API 代理
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket 代理
    location /ws/ {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # 媒体文件
    location /media/ {
        alias /app/media/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # 静态文件
    location /static/ {
        alias /app/static/;
        expires 7d;
    }
}
```

### 8.3 环境变量配置

```bash
# .env.production

# Django
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=your-domain.com

# 数据库
DATABASE_URL=mysql://user:password@sqlpub-host:3306/dbname

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_LIFETIME=15m
JWT_REFRESH_TOKEN_LIFETIME=7d

# OneDrive / Alist
ALIST_URL=https://alist.example.com
ALIST_TOKEN=your-alist-token

# 文件上传
MAX_UPLOAD_SIZE=100M
MEDIA_ROOT=/app/media

# CORS
CORS_ALLOWED_ORIGINS=https://your-domain.com

# 日志
LOG_LEVEL=INFO
```

---

## 9. 开发计划

### 9.1 开发阶段划分

#### 第一阶段：基础架构 (2周)

- [ ] 项目脚手架搭建
- [ ] Django 后端框架搭建
- [ ] Vue 3 前端框架搭建
- [ ] 数据库设计实现
- [ ] JWT 认证系统
- [ ] 基础 API 编写

#### 第二阶段：核心功能开发 (4周)

- [ ] 音声管理模块
- [ ] 小说管理模块
- [ ] 云盘管理模块
- [ ] 基础爬虫功能

#### 第三阶段：内容模块开发 (2周)

- [ ] TWICE Wiki 模块
- [ ] 拼豆库存模块

#### 第四阶段：完善与优化 (2周)

- [ ] PWA 支持
- [ ] 响应式设计完善
- [ ] 性能优化
- [ ] 安全加固
- [ ] 文档编写

### 9.2 技术选型理由

| 技术 | 选择理由 |
|------|----------|
| Vue 3 | Composition API 适合复杂应用，TypeScript 支持好 |
| Ant Design Vue | 组件丰富，精致美观，企业级品质 |
| Django DRF | 成熟稳定，ORM 强大，适合快速开发 |
| JWT | 无状态认证，适合分布式部署 |
| MySQL | 关系型数据为主，sqlpub 云端托管 |
| OneDrive + Alist | 媒体集中管理，减少服务器存储压力 |
| Docker Compose | 容器化部署，环境一致性好 |
| PWA | 一次开发，多端适配，无需应用商店审核 |

---

## 10. 总结

本技术方案为你的个人综合应用提供了完整的前后端分离架构设计：

**前端**：Vue 3 + TypeScript + Ant Design Vue，提供精致的用户界面和良好的用户体验

**后端**：Django + DRF，提供稳健的 API 服务和丰富的数据管理功能

**数据存储**：MySQL（sqlpub 云端）+ OneDrive（Alist 集成），实现数据的云端管理和备份

**部署方案**：Docker Compose + Nginx，适合轻量服务器部署

**移动端**：PWA，通过浏览器实现接近原生应用的使用体验

本方案具有较好的可扩展性和维护性，可以根据实际需求逐步迭代完善。
