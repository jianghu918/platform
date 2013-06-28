/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : platfrom

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2013-06-27 16:25:37
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `api_case`
-- ----------------------------
DROP TABLE IF EXISTS `api_case`;
CREATE TABLE `api_case` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` varchar(4000) DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `update_at` datetime NOT NULL,
  `suite_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK39A1FA35B8A79EBD` (`suite_id`),
  CONSTRAINT `FK39A1FA35B8A79EBD` FOREIGN KEY (`suite_id`) REFERENCES `api_suite` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_case
-- ----------------------------

-- ----------------------------
-- Table structure for `api_node_attr`
-- ----------------------------
DROP TABLE IF EXISTS `api_node_attr`;
CREATE TABLE `api_node_attr` (
  `node_id` varchar(64) NOT NULL,
  `attr_key` varchar(64) NOT NULL,
  `value` longtext,
  PRIMARY KEY (`node_id`,`attr_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_node_attr
-- ----------------------------

-- ----------------------------
-- Table structure for `api_step`
-- ----------------------------
DROP TABLE IF EXISTS `api_step`;
CREATE TABLE `api_step` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(1024) DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `seq` smallint(6) NOT NULL,
  `update_at` datetime NOT NULL,
  `case_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK39A985D18DACA757` (`case_id`),
  CONSTRAINT `FK39A985D18DACA757` FOREIGN KEY (`case_id`) REFERENCES `api_case` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_step
-- ----------------------------

-- ----------------------------
-- Table structure for `api_suite`
-- ----------------------------
DROP TABLE IF EXISTS `api_suite`;
CREATE TABLE `api_suite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` varchar(4000) DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_suite
-- ----------------------------

-- ----------------------------
-- Table structure for `api_value_history`
-- ----------------------------
DROP TABLE IF EXISTS `api_value_history`;
CREATE TABLE `api_value_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `count` int(11) NOT NULL,
  `node_id` varchar(255) DEFAULT NULL,
  `update_at` datetime NOT NULL,
  `value` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_value_history
-- ----------------------------

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '用户类型',
  `phone` varchar(11) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `sex` int(1) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `qq` varchar(20) DEFAULT NULL,
  `msn` varchar(255) DEFAULT NULL,
  `weixin` varchar(255) DEFAULT NULL,
  `blog` varchar(255) DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `y1` varchar(255) DEFAULT NULL,
  `y2` varchar(255) DEFAULT NULL,
  `y3` varchar(255) DEFAULT NULL,
  `y4` varchar(255) DEFAULT NULL,
  `y5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
