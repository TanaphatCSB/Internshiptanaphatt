-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2024 at 05:33 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `accepttable`
--

CREATE TABLE `accepttable` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `schedule_id` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `serial` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `left_side` varchar(255) DEFAULT NULL,
  `right_side` varchar(255) DEFAULT NULL,
  `test_report` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `submission_date` date DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `round` int(11) NOT NULL,
  `sticker` varchar(255) NOT NULL,
  `durable` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accepttable`
--

INSERT INTO `accepttable` (`id`, `device_id`, `schedule_id`, `brand`, `model`, `serial`, `status`, `left_side`, `right_side`, `test_report`, `note`, `submission_date`, `device_name`, `user_id`, `name`, `submission_id`, `round`, `sticker`, `durable`) VALUES
(110, 18, 64, 'KYORITSU', 'KEW 2117R', '1474216', 'ผ่าน', 'ผ่าน', 'ผ่าน', 'สว372', '', '2024-06-27', 'CLIP ON VOLT AMMETER 1000A.600V.', 22, 'มนตรี', 252, 3, 'BH-021', 'ISO ควบคุม');

-- --------------------------------------------------------

--
-- Table structure for table `action_logs`
--

CREATE TABLE `action_logs` (
  `id` int(11) NOT NULL,
  `action` varchar(20) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `note` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `submission_id` int(11) DEFAULT NULL,
  `change_id` int(11) NOT NULL,
  `hisaddchange_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `action_logs`
--

INSERT INTO `action_logs` (`id`, `action`, `assignment_id`, `note`, `status`, `time`, `submission_id`, `change_id`, `hisaddchange_id`) VALUES
(509, 'approve', 564, '', 'ผ่าน', '2024-06-27 01:13:36', 252, 0, 0),
(510, 'reject', 0, NULL, NULL, '2024-06-27 02:41:01', NULL, 210, 210);

-- --------------------------------------------------------

--
-- Table structure for table `changeaddhistory`
--

CREATE TABLE `changeaddhistory` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `selected_device_id` int(11) DEFAULT NULL,
  `new_device_id` int(11) DEFAULT NULL,
  `selectedSticker` varchar(255) NOT NULL,
  `selecteddevice` varchar(255) NOT NULL,
  `selecteddeviceserial` varchar(255) NOT NULL,
  `newdevices` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `sticker` varchar(255) NOT NULL,
  `durable` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `changeaddhistory`
--

INSERT INTO `changeaddhistory` (`id`, `user_id`, `selected_device_id`, `new_device_id`, `selectedSticker`, `selecteddevice`, `selecteddeviceserial`, `newdevices`, `username`, `brand`, `model`, `serial_number`, `sticker`, `durable`) VALUES
(212, 11, NULL, 10, '', '', '', 'TELESCOPIC UNIVERSAL POLE', 'ไตรมิตร', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `changedevicestatus`
--

CREATE TABLE `changedevicestatus` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `change_id` int(11) NOT NULL,
  `status` enum('ส่งแล้ว','อนุมัติแล้ว','ปฎิเสธแล้ว') NOT NULL DEFAULT 'ส่งแล้ว',
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `changedevicestatus`
--

INSERT INTO `changedevicestatus` (`id`, `user_id`, `change_id`, `status`, `submitted_at`, `at`) VALUES
(113, 11, 210, 'ส่งแล้ว', '2024-06-27 02:40:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `name`) VALUES
(1, 'CLAMP ON POWER METER'),
(2, 'CLIP ON VOLT AMMETER 1mA.200A.500V'),
(3, 'CLIP ON VOLD AMMETER 400A.600V'),
(4, 'CLIP ON VOLD AMMETER 600A.600V'),
(5, 'HV.DETECTOR (กระบอกเหลือง)'),
(6, 'CLAMP STICK 8'),
(7, 'INSULATING BLANKET'),
(8, 'PHASE ROTATION METER'),
(9, 'PHASE ROTATION METER PD3129-10'),
(10, 'TELESCOPIC UNIVERSAL POLE'),
(11, 'UNIVERSAL POLE 8'),
(12, 'WIRELESS CURRENT METER'),
(13, 'CLIP ON VOLT AMP.(จ้าง)'),
(14, 'PHASE ROTATION METER(จ้าง)'),
(15, 'RUBBER GLOVES 1000V.(จ้าง)'),
(16, 'RUBBER GLOVES 1000V.(ถุงแดง)'),
(17, 'INSULATING BLACNKET(ผ้าห่มยาง)'),
(18, 'CLIP ON VOLT AMMETER 1000A.600V.');

-- --------------------------------------------------------

--
-- Table structure for table `devices_in_repair`
--

CREATE TABLE `devices_in_repair` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `submission_id` int(11) DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `recycle_id` int(11) NOT NULL,
  `sticker` varchar(255) NOT NULL,
  `durable` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pendingacceptchange`
--

CREATE TABLE `pendingacceptchange` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `selectedSticker` varchar(255) NOT NULL,
  `selected_device_id` int(11) DEFAULT NULL,
  `new_device_id` int(11) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `selecteddevice` varchar(255) NOT NULL,
  `selecteddeviceserial` varchar(255) NOT NULL,
  `newdevices` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `change_id` int(11) NOT NULL,
  `durable` varchar(255) NOT NULL,
  `sticker` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pendingapprovals`
--

CREATE TABLE `pendingapprovals` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `schedule_id` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `serial` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `left_side` varchar(255) DEFAULT NULL,
  `right_side` varchar(255) DEFAULT NULL,
  `test_report` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `submission_date` date DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `submission_id` int(11) DEFAULT NULL,
  `round` int(11) NOT NULL,
  `sticker` varchar(255) NOT NULL,
  `durable` varchar(255) NOT NULL,
  `submitted_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pending_approvals`
--

CREATE TABLE `pending_approvals` (
  `id` int(11) NOT NULL,
  `device` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `serial` varchar(255) NOT NULL,
  `remark` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `left` varchar(255) NOT NULL,
  `right` varchar(255) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  `Testreport` varchar(255) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `schedule_id` int(11) DEFAULT NULL,
  `left_side` varchar(255) DEFAULT NULL,
  `right_side` varchar(255) DEFAULT NULL,
  `test_report` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `submission_date` date DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recyclebin`
--

CREATE TABLE `recyclebin` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `schedule_id` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `serial` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `left_side` varchar(255) DEFAULT NULL,
  `right_side` varchar(255) DEFAULT NULL,
  `test_report` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `submission_date` date DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `round` int(11) NOT NULL,
  `sticker` varchar(255) NOT NULL,
  `durable` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `urole` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `department` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `name`, `surname`, `email`, `password`, `urole`, `create_at`, `department`) VALUES
(10, 'ก', 'ก', 'petchliv@gmail.com', '1234', 'admin', '2024-05-17 04:00:13', 'บค.'),
(11, 'ไตรมิตร', 'มณีกัญญ์', 'v@gmail.com', 'v', 'users', '2024-05-17 04:19:44', 'บค.'),
(20, 'รัชพงศ์', 'จูเปีย', 's6404062663169@email.kmutnb.ac.th', 'c', 'users', '2024-05-17 07:27:17', 'บค.'),
(22, 'มนตรี', 'จันทร์หอม', 'o@gmail.com', 'o', 'users', '2024-06-25 08:13:55', 'บค.'),
(23, 'สมพร', 'อ่ำกรด', 'somporn@gmail.com', '1234', 'users', '2024-06-26 15:48:03', 'บค.'),
(24, 'สมบัติ ', 'แป้นกล่ำ', 'sombut@gmail.com', '1234', 'users', '2024-06-26 15:53:08', 'บค.'),
(25, 'ธนพล ', ' บุคคล', 'tanapol@gmail.com', '1234', 'users', '2024-06-26 16:00:45', 'บค.'),
(26, 'ฐานวัฒน์ ', 'ธนฐิติภูรีนนท์', 'thanawatt@gmail.com', '1234', 'users', '2024-06-26 16:05:38', 'บค.'),
(27, 'ประเทือง', 'สุ่มสุวรรณ', 'patueng@gmail.com', '1234', 'users', '2024-06-26 16:11:12', 'บค.'),
(28, 'ปกรณ์', 'ม่วงหวัง', 'pakorn@gmail.com', '1234', 'users', '2024-06-26 16:21:17', 'บค.'),
(29, 'นิกรณ์', 'ภาคสมบัติ', 'nikorn@gmail.com', '1234', 'users', '2024-06-26 16:25:36', 'บค.\r\n'),
(30, 'พูลศักดิ์', 'พิกุลทอง', 'poolsuk@gmail.com', '1234', 'users', '2024-06-26 16:33:48', 'บค.'),
(31, 'นัทธพงศ์ ', 'สีสุนาม', 'nattapong@gmail.com', '1234', 'users', '2024-06-26 16:40:07', 'บค.'),
(32, 'นิพนธิ์ ', 'สุกรี', 'niporn@gmail.com', '1234', 'users', '2024-06-26 16:43:30', 'บค.'),
(33, 'อรรถพร', 'มะหมัด', 'attaporn@gmail.com', '1234', 'users', '2024-06-26 16:46:59', 'บค.'),
(34, 'ธนารัชต์ ', 'เสนาจอหอ', 'tanaracht@gmail.com', '1234', 'users', '2024-06-26 16:51:10', 'บค.'),
(35, 'ดนัย ', 'พรสง่า', 'danai@gmail.com', '1234', 'users', '2024-06-26 16:57:22', 'บค.'),
(36, 'สุรเชษฐ์ ', 'สาระยาม', 'surechet@gmail.com', '1234', 'users', '2024-06-26 17:00:48', 'บค.'),
(37, 'เรวัต', 'แสงวิสุทธิ์สิงห์', 'rewat@gmail.com', '1234', 'users', '2024-06-26 17:04:34', 'บค.'),
(38, 'อำนวย', 'สิงห์ดี', 'aumnuy@gmail.com', '1234', 'users', '2024-06-26 17:06:51', 'บค.'),
(39, 'นพดล', 'จันทร์สวัสดิ์', 'noppadol@gmail.com', '1234', 'users', '2024-06-26 17:08:42', 'บค.'),
(40, 'ยงศักดิ์', 'เหลืองอร่าม', 'yongsak@gmail.com', '1234', 'users', '2024-06-26 17:11:10', 'บค.'),
(41, 'ประจักร์', 'นาคสนิท', 'prajak@gmail.com', '1234', 'users', '2024-06-26 17:13:38', 'บค.'),
(42, 'จันทร์', 'แก้วสายทอง', 'jan@gmail.com', '1234', 'users', '2024-06-26 17:15:35', 'บค.'),
(43, 'ณัฐสิทธิ์', 'เดชสงคราม', 'nattasit@gmail.com', '1234', 'users', '2024-06-26 17:17:10', 'บค.'),
(44, 'อนนท์', 'แก้วกระจ่าง', 'arnon@gmail.com', '1234', 'users', '2024-06-26 17:19:18', 'บค.'),
(45, 'นพดล', 'ทาระพันธ์', 'noppadol2@gmail.com', '1234', 'users', '2024-06-26 17:22:02', 'บค.'),
(46, 'ภาคภูมิ', 'สุขแสง', 'pakpoom@gmail.com', '1234', 'users', '2024-06-26 17:25:09', 'บค.'),
(47, 'ธงชัย', 'ใจมูล', 'tongchai@gmail.com', '1234', 'users', '2024-06-26 17:27:34', 'บค.'),
(48, 'ทิวา', 'สิงห์ดี', 'tiwa@gmail.com', '1234', 'users', '2024-06-26 17:29:21', 'บค.'),
(49, 'สมชาย', 'ดัดแวว', 'somchai@gmail.com', '1234', 'users', '2024-06-26 17:31:27', 'บค.'),
(50, 'วิชัย', 'พินิจพรประภา', 'vichai@gmail.com', '1234', 'users', '2024-06-26 17:33:00', 'บค.'),
(51, 'นัทธี', 'พยัคฆ์รังสี', 'natthee@gmail.com', '1234', 'users', '2024-06-26 17:35:19', 'บค.'),
(52, 'สมพงษ์', 'การนา', 'sompong@gmail.com', '1234', 'users', '2024-06-26 17:37:07', 'บค.'),
(53, 'สมพร', 'อภัย', 'sompornapai@gmail.com', '1234', 'users', '2024-06-26 17:39:05', 'บค.'),
(54, 'วนิกสิทธิ์', 'พยัคฆ์รังสี', 'vaniksit@gmail.com', '1234', 'users', '2024-06-26 17:41:31', 'บค.'),
(55, 'สุรศักดิ์', 'คนไทย', 'surasak@gmail.com', '1234', 'users', '2024-06-26 17:43:39', 'บค.'),
(56, 'สมเกียรติ', 'กุลวงศ์', 'somkriet@gmail.com', '1234', 'users', '2024-06-26 17:46:06', 'บค.'),
(57, 'ประดิษฐ์', 'ศรียันต์', 'pradit@gmail.com', '1234', 'users', '2024-06-26 17:48:37', 'บค.'),
(58, 'วสันต์', 'บุญเหลือ', 'vasant@gmail.com', '1234', 'users', '2024-06-26 17:50:30', 'บค.'),
(59, 'วรศิลป์', 'จันทร์ฉาย', 'vorasit@gmail.com', '1234', 'users', '2024-06-26 17:53:08', 'บค.'),
(60, 'ทัชชกร', 'รุ่งแสงธนลาภ', 'tacchakorn@gmail.com', '1234', 'users', '2024-06-26 17:55:55', 'บค.'),
(61, 'อนุชา', 'เริงวัย', 'anucha@gmail.com', '1234', 'users', '2024-06-26 17:58:55', 'บค.'),
(62, 'รณชัย', 'สุกรี', 'ronnachai@gmail.com', '1234', 'users', '2024-06-26 18:04:15', 'บค.'),
(63, 'อานนท์', 'คล้ายเพ็ง', 'arnonc@gmail.com', '1234', 'users', '2024-06-26 18:07:37', 'บค.');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `round` int(11) NOT NULL,
  `due_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `device_id`, `device_name`, `round`, `due_date`) VALUES
(1, 1, 'CLAMP ON POWER METER', 2, '2026-06-23 00:00:00'),
(2, 1, 'CLAMP ON POWER METER', 3, '2067-06-02 00:00:00'),
(3, 1, 'CLAMP ON POWER METER', 4, '2067-06-03 00:00:00'),
(4, 2, 'CLIP ON VOLT AMMETER 1mA.200A.500V', 2, '2067-06-01 00:00:00'),
(5, 2, 'CLIP ON VOLT AMMETER 1mA.200A.500V', 3, '2067-06-02 00:00:00'),
(6, 2, 'CLIP ON VOLT AMMETER 1mA.200A.500V', 4, '2067-06-03 00:00:00'),
(7, 3, 'CLIP ON VOLD AMMETER 400A.600V', 2, '2067-06-01 00:00:00'),
(8, 3, 'CLIP ON VOLD AMMETER 400A.600V', 3, '2067-06-02 00:00:00'),
(9, 3, 'CLIP ON VOLD AMMETER 400A.600V', 4, '2067-06-03 00:00:00'),
(10, 4, 'CLIP ON VOLD AMMETER 600A.600V', 2, '2067-06-01 00:00:00'),
(11, 4, 'CLIP ON VOLD AMMETER 600A.600V', 3, '2067-06-02 00:00:00'),
(12, 4, 'CLIP ON VOLD AMMETER 600A.600V', 4, '2067-06-03 00:00:00'),
(13, 5, 'HV.DETECTOR(กระบอกเหลือง)', 2, '2024-06-11 00:00:00'),
(14, 5, 'HV.DETECTOR(กระบอกเหลือง)', 3, '2024-06-11 00:00:00'),
(15, 5, 'HV.DETECTOR(กระบอกเหลือง)', 4, '2024-06-11 00:00:00'),
(16, 6, 'CLAMP STICK 8', 2, '2024-06-11 00:00:00'),
(17, 6, 'CLAMP STICK 8', 3, '2024-06-11 00:00:00'),
(18, 6, 'CLAMP STICK 8', 4, '2024-06-11 00:00:00'),
(19, 7, 'INSULATING BLANKET', 2, '2024-06-27 00:00:00'),
(20, 7, 'INSULATING BLANKET', 3, '2024-06-21 00:00:00'),
(21, 7, 'INSULATING BLANKET', 4, '2024-06-21 00:00:00'),
(22, 8, 'PHASE ROTATION METER', 2, '2024-06-23 15:52:20'),
(23, 8, 'PHASE ROTATION METER', 3, '2024-06-23 15:54:00'),
(24, 8, 'PHASE ROTATION METER', 4, '2024-06-23 15:55:00'),
(25, 9, 'PHASE ROTATION METER PD3129-10', 2, '0000-00-00 00:00:00'),
(29, 9, 'PHASE ROTATION METER PD3129-10', 3, '0000-00-00 00:00:00'),
(30, 9, 'PHASE ROTATION METER PD3129-10', 4, '0000-00-00 00:00:00'),
(39, 10, 'TELESCOPIC UNIVERSAL POLE', 2, '2024-06-27 08:42:04'),
(40, 10, 'TELESCOPIC UNIVERSAL POLE', 3, '0000-00-00 00:00:00'),
(41, 10, 'TELESCOPIC UNIVERSAL POLE', 4, '0000-00-00 00:00:00'),
(42, 11, 'UNIVERSAL POLE 8', 2, '0000-00-00 00:00:00'),
(43, 11, 'UNIVERSAL POLE 8', 3, '0000-00-00 00:00:00'),
(44, 11, 'UNIVERSAL POLE 8', 4, '0000-00-00 00:00:00'),
(45, 12, 'WIRELESS CURRENT METER -12', 2, '2024-06-21 00:00:00'),
(46, 12, 'WIRELESS CURRENT METER -12', 3, '2024-06-29 00:00:00'),
(47, 12, 'WIRELESS CURRENT METER -12', 4, '2024-06-30 00:00:00'),
(48, 13, 'CLIP ON VOLT AMP.(จ้าง) ', 2, '2024-06-21 00:00:00'),
(49, 13, 'CLIP ON VOLT AMP.(จ้าง) ', 3, '2024-06-29 00:00:00'),
(50, 13, 'CLIP ON VOLT AMP.(จ้าง) ', 4, '2024-06-30 00:00:00'),
(51, 14, 'PHASE ROTATION METER(จ้าง)', 2, '2024-06-21 00:00:00'),
(52, 14, 'PHASE ROTATION METER(จ้าง)', 3, '2024-06-29 00:00:00'),
(53, 14, 'PHASE ROTATION METER(จ้าง)', 4, '2024-06-30 00:00:00'),
(54, 15, 'RUBBER GLOVES 1000V.(จ้าง)', 2, '2024-06-21 00:00:00'),
(55, 15, 'RUBBER GLOVES 1000V.(จ้าง)', 3, '2024-06-29 00:00:00'),
(56, 15, 'RUBBER GLOVES 1000V.(จ้าง)', 4, '2024-06-30 00:00:00'),
(57, 16, 'RUBBER GLOVES 1000V. (ถุงแดง)', 2, '2024-06-21 00:00:00'),
(58, 16, 'RUBBER GLOVES 1000V. (ถุงแดง)', 3, '2024-06-29 00:00:00'),
(59, 16, 'RUBBER GLOVES 1000V. (ถุงแดง)', 4, '2024-06-30 00:00:00'),
(60, 17, 'INSULATING BLANCKET(ผ้าห่มยาง)', 2, '2024-06-27 03:08:32'),
(61, 17, 'INSULATING BLANCKET(ผ้าห่มยาง)', 3, '2024-06-27 03:08:32'),
(62, 17, 'INSULATING BLANCKET(ผ้าห่มยาง)', 4, '2024-06-27 03:08:32'),
(63, 18, 'CLIP ON VOLT AMMETER 1000A.600V.', 2, '2024-06-27 03:09:27'),
(64, 18, 'CLIP ON VOLT AMMETER 1000A.600V.', 3, '2024-06-27 03:09:27'),
(65, 18, 'CLIP ON VOLT AMMETER 1000A.600V.', 4, '2024-06-27 03:09:27');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `left_side` varchar(255) DEFAULT NULL,
  `right_side` varchar(255) DEFAULT NULL,
  `test_report` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `submission_date` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `serial` varchar(255) NOT NULL,
  `round` int(11) NOT NULL,
  `submission_id` int(11) DEFAULT NULL,
  `sticker` varchar(255) DEFAULT NULL,
  `durable` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `device_id`, `schedule_id`, `device_name`, `brand`, `model`, `status`, `left_side`, `right_side`, `test_report`, `note`, `submission_date`, `user_id`, `name`, `serial`, `round`, `submission_id`, `sticker`, `durable`) VALUES
(252, 18, 64, 'CLIP ON VOLT AMMETER 1000A.600V.', 'KYORITSU', 'KEW 2117R', 'ผ่าน', 'ผ่าน', 'ผ่าน', 'สว372', '', '2024-06-27', 22, 'มนตรี', '1474216', 3, NULL, 'BH-021', 'ISO ควบคุม');

-- --------------------------------------------------------

--
-- Table structure for table `submissionstatus`
--

CREATE TABLE `submissionstatus` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `status` enum('ส่งแล้ว','อนุมัติแล้ว','ปฏิเสธแล้ว','ส่งซ่อมแล้ว') NOT NULL DEFAULT 'ส่งแล้ว',
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissionstatus`
--

INSERT INTO `submissionstatus` (`id`, `user_id`, `submission_id`, `status`, `submitted_at`, `at`) VALUES
(245, 22, 252, 'อนุมัติแล้ว', '2024-06-27 01:13:19', '2024-06-27 01:13:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`) VALUES
(10, 'ก'),
(11, 'ABCD'),
(20, 'c'),
(22, 'มนตรี'),
(23, 'สมพร'),
(24, 'สมบัติ'),
(25, 'ธนพล'),
(26, 'ฐานวัฒน์'),
(27, 'ประเทือง'),
(28, 'ปกรณ์'),
(29, 'นิกรณ์'),
(30, 'พูลศักดิ์'),
(31, 'นัทธพงศ์'),
(32, 'นิพนธิ์'),
(33, 'อรรถพร'),
(34, 'ธนารัชต์'),
(35, 'ดนัย'),
(36, 'สุรเชษฐ์'),
(37, 'เรวัต'),
(38, 'อำนวย'),
(39, 'นพดล'),
(40, 'ยงศักดิ์'),
(41, 'ประจักร์'),
(42, 'จันทร์'),
(43, 'ณัฐสิทธิ์'),
(44, 'อนนท์'),
(45, 'นพดล'),
(46, 'ภาคภูมิ'),
(47, 'ธงชัย'),
(48, 'ทิวา'),
(49, 'สมชาย'),
(50, 'วิชัย'),
(51, 'นัทธี'),
(52, 'สมพงษ์'),
(53, 'สมพร'),
(54, 'วนิกสิทธิ์'),
(55, 'สุรศักดิ์'),
(56, 'สมเกียรติ'),
(57, 'ประดิษฐ์'),
(58, 'วสันต์'),
(59, 'วรศิลป์'),
(60, 'ทัชชกร'),
(61, 'อนุชา'),
(62, 'รณชัย'),
(63, 'อานนท์');

-- --------------------------------------------------------

--
-- Table structure for table `user_devices`
--

CREATE TABLE `user_devices` (
  `user_device_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `sticker` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `durable` varchar(255) NOT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_devices`
--

INSERT INTO `user_devices` (`user_device_id`, `user_id`, `device_id`, `sticker`, `username`, `durable`, `device_name`, `brand`, `model`, `serial_number`) VALUES
(104, 11, 1, 'BH-001', 'ไตรมิตร', 'ISO ควบคุม', 'CLAMP ON POWER METER', 'HIOKI', '3286-20', '334519'),
(105, 11, 1, 'BH-002', 'ไตรมิตร', 'ISO ควบคุม', 'CLAMP ON POWER METER', 'HIOKI', '3286-20', '334520'),
(106, 11, 2, 'BH-019', 'ไตรมิตร', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.200A.500V.', 'DIGICION', 'DM-632', '160622415'),
(107, 11, 9, 'BH-001', 'ไตรมิตร', 'ISO ควบคุุม', 'PHASE ROTATION METER   PD3129-10', 'HIOKI', 'PD3129-10', '210308510'),
(108, 11, 11, 'BH-020', 'ไตรมิตร', '406010001011', 'UNIVERSAL POLE 8\'', 'HASTINGS', '567-8', '---'),
(109, 11, 12, 'BH-001', 'ไตรมิตร', 'ISO ควบคุม', 'WIRELESS CURRENT METER', 'SENSORLINK', '221265', 'REMOTE S/N.220853 RADIO S/N.221265'),
(110, 20, 17, 'BH-001', 'รัชพงษ์', 'ISO ควบคุม', 'INSULATING BLANKET(ผ้าห่มยาง)', 'NOVAX', 'เบิก ก.ย.66', NULL),
(111, 20, 10, 'BH-002', 'รัชพงษ์', '406020004752', 'TELESCOPIC UNIVERSAL POLE', 'HASTINGS', 'HV-235', '---'),
(112, 20, 12, 'BH-004', 'รัชพงษ์', 'ISO ควบคุม', 'WIRELESS CURRENT METER', 'SENSORLINK', 'OPENED LOOP', 'REMOTE S/N.276740และ RADIO S/N.276624'),
(113, 20, 12, 'BH-005', 'รัชพงษ์', 'ISO ควบคุม', 'WIRELESS CURRENT METER', 'SENSORLINK', '6-120', 'REMOTE S/N.278882 และ RADIO S/N.278903'),
(114, 20, 12, 'BH-006', 'รัชพงษ์', 'ISO ควบคุม', 'WIRELESS CURRENT METER', 'SENSORLINK', '6-120', 'REMOTE S/N.278905 และ RADIO S/N.278883'),
(115, 22, 18, 'BH-021', 'มนตรี', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1000A.600V.', 'KYORITSU', 'KEW 2117R', '1474216'),
(116, 22, 2, 'BH-009', 'มนตรี', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.200A.500V.', 'KYORITSU', '2006', '28499'),
(117, 22, 17, 'BH-004', 'มนตรี', 'ISO ควบคุม', 'INSULATING BLANKET(ผ้าห่มยาง)', 'NOVAX', 'เบิก ก.ย.66', NULL),
(118, 22, 8, 'BH-034', 'มนตรี', 'ISO ควบคุม', 'PHASE ROTATION METER', 'HIOKI', '3126-01', '807330'),
(119, 22, 9, 'BH-015', 'มนตรี', 'ISO ควบคุุม', 'PHASE ROTATION METER   PD3129-10', 'HIOKI', 'PD3129-10', '221156544'),
(120, 22, 16, 'BH-372', 'มนตรี', '', 'RUBBER GLOVES 1000 V.(ถุงแดง)', '9 NOVAX', '1740276', '1736178'),
(121, 23, 2, 'BH-002', 'สมพร', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.200A.500V.', 'DIGICION', 'DM-632', '13016604'),
(122, 23, 16, 'BH-525', 'สมพร', '41306', 'RUBBER GLOVES 1000 V.(ถุงแดง)', '9 NOVAX', '1740297', '1734069'),
(123, 24, 18, 'BH-002', 'สมบัติ', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1000A.600V.', 'KYORITSU', 'KEW 2117R', '1129344'),
(124, 24, 6, 'BH-017', 'สมบัติ', '3940005540', 'CLAMP STICK 8\'', 'A.B.CHANCE', '', ''),
(125, 24, 16, 'BH-401', 'สมบัติ', '', 'RUBBER GLOVES 1000 V.(ถุงแดง)', '9 NOVAX', '2607019', '2606949'),
(126, 24, 8, 'BH-037', 'สมบัติ', 'ISO ควบคุม', 'PHASE ROTATION METER', 'HIOKI', '3126-01', '807333'),
(127, 25, 2, 'BH-004', 'ธนพล', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.200A.500V.', 'KYORITSU', '2006', '16583'),
(128, 25, 2, 'BH-010', 'ธนพล', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.200A.500V.', 'DIGICION', 'DM-632', '140911962'),
(129, 25, 3, 'BH-020', 'ธนพล', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.400A.600V.', 'DIGICION', 'DM-632', '191019242'),
(130, 26, 18, 'BH-005', 'ฐานวัฒน์ ', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1000A.600V.', 'KYORITSU', 'KEW 2117R', '1129999'),
(131, 26, 9, 'BH-011', 'ฐานวัฒน์ ', 'ISO ควบคุุม', 'PHASE ROTATION METER   PD3129-10', 'HIOKI', 'PD3129-10', '220508241'),
(132, 26, 16, 'BH-489', 'ฐานวัฒน์', 'เบิก & ส่งทดสอบ  22/5/66 ', 'RUBBER GLOVES 1000 V.(ถุงแดง)', '9 NOVAX', '1734975', '1734189'),
(133, 27, 2, 'BH-007', 'ประเทือง', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.200A.500V.', 'KYORITSU', 'DM-632', '140911984'),
(134, 28, 2, 'BH-013', 'ปกรณ์', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.200A.500V.', 'DIGICION', 'DM-632', '170714638'),
(135, 28, 9, 'BH-013', 'ปกรณ์', 'ISO ควบคุุม', 'PHASE ROTATION METER   PD3129-10', 'HIOKI', 'PD3129-10', '220505120'),
(136, 29, 3, 'BH-003', 'นิกรณ์', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.400A.600V.', 'DIGICION', 'DM-632', '160622387'),
(137, 29, 3, 'BH-014', 'นิกรณ์', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.400A.600V.', 'DIGICION', 'DM-632', '13016639'),
(138, 29, 9, 'BH-006', 'นิกรณ์ ', 'ISO ควบคุุม', 'PHASE ROTATION METER   PD3129-10', 'HIOKI', 'PD3129-10', '210308550'),
(139, 29, 9, 'BH-009', 'นิกรณ์', 'ISO ควบคุุม', 'PHASE ROTATION METER   PD3129-10', 'HIOKI', 'PD3129-10', '220505127'),
(140, 29, 16, 'BH-309', 'นิกรณ์', '12/2014', 'RUBBER GLOVES 1000 V.(ถุงแดง)', '9 NOVAX', '2322005', '2322119'),
(141, 29, 10, 'BH-003', 'นิกรณ์', '406020004753', 'TELESCOPIC UNIVERSAL POLE', 'HASTINGS', 'HV-235', '---'),
(142, 30, 3, 'BH-006', 'พูลศักดิ์', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.400A.600V.', 'DIGICION', 'DM-632', '160622409'),
(143, 30, 9, 'BH-008', 'พูลศักดิ์', 'ISO ควบคุุม', 'PHASE ROTATION METER   PD3129-10', 'HIOKI', 'PD3129-10', '221156551'),
(144, 30, 9, 'BH-010', 'พูลศักดิ์', 'ISO ควบคุุม', 'PHASE ROTATION METER   PD3129-10', 'HIOKI', 'PD3129-10', '220528242'),
(145, 30, 16, 'BH-407', 'พูลศักดิ์ ', '41306', 'RUBBER GLOVES 1000 V.(ถุงแดง)', '9 NOVAX', '1734939', '1735358'),
(146, 31, 4, 'BH-016', 'นัทธพงศ์', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 600A.600V.', 'KYORITSU', '2017', '5154909'),
(147, 32, 2, 'BH-015', 'นิพนธิ์', 'ISO ควบคุม', 'CLIP ON VOLT AMMETER 1mA.200A.500V.', 'KYORITSU', '2006', '140911981'),
(148, 33, 13, 'บางเขน-001', 'อรรถพร', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'UNI-T', 'ut203', 'C191562389'),
(149, 33, 15, 'บางเขน-001', 'อรรถพร', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(150, 34, 13, 'บางเขน-002', 'ธนารัชต์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2608A แบบเข็ม', '41919'),
(151, 34, 15, 'บางเขน-002', 'ธนารัชต์ ', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(152, 35, 13, 'บางเขน-006', 'ดนัย', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154425'),
(153, 35, 15, 'บางเขน-028', 'ดนัย', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(154, 36, 13, 'บางเขน-007', 'สุรเชษฐ์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154429'),
(155, 36, 15, 'บางเขน-017', 'สุรเชษฐ์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(156, 37, 13, 'บางเขน-008', 'เรวัต ', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154431'),
(157, 37, 15, 'บางเขน-027', 'เรวัต ', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(158, 38, 13, 'บางเขน-009', 'อำนวย', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154436'),
(159, 38, 15, 'บางเขน-015', 'อำนวย ', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(160, 39, 13, 'บางเขน-010', 'นพดล', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154437'),
(161, 39, 15, 'บางเขน-020', 'นพดล', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(162, 40, 13, 'บางเขน-013', 'ยงศักดิ์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154447'),
(163, 40, 15, 'บางเขน-029', 'ยงศักดิ์ ', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(164, 41, 13, 'บางเขน-015', 'ประจักร์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154450'),
(165, 41, 15, 'บางเขน-023', 'ประจักร์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(166, 42, 13, 'บางเขน-016', 'จันทร์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154451'),
(167, 42, 15, 'บางเขน-018', 'จันทร์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(168, 43, 13, 'บางเขน-017', 'ณัฐสิทธิ์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1154927'),
(169, 43, 15, 'บางเขน-014', 'ณัฐสิทธิ์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(170, 44, 13, 'บางเขน-018', 'อนนท์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'UNI-T', 'UT202', '110088986'),
(171, 44, 15, 'บางเขน-036', 'อนนท์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(172, 45, 13, 'บางเขน-019', 'นพดล', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', 'SNAP 200', '1250804'),
(173, 45, 15, 'บางเขน-007', 'นพดล', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(174, 46, 13, 'บางเขน-020', 'ภาคภูมิ', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '86600'),
(175, 46, 15, 'บางเขน-019', 'ภาคภูมิ', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(176, 47, 13, 'บางเขน-021', 'ธงชัย', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '200222'),
(177, 47, 15, 'บางเขน-040', 'ธงชัย', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(178, 48, 13, 'บางเขน-022', 'ทิวา', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '200268'),
(179, 48, 15, 'บางเขน-042', 'ทิวา', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(180, 49, 13, 'บางเขน-023', 'สมชาย', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '200269'),
(181, 49, 15, 'บางเขน-041', 'สมชาย', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(182, 50, 13, 'บางเขน-024', 'วิชัย', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202482'),
(183, 50, 15, 'บางเขน-011', 'วิชัย', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(184, 51, 13, 'บางเขน-025', 'นัทธี', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202483'),
(185, 51, 15, 'บางเขน-016', 'นัทธี', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(186, 52, 13, 'บางเขน-026', 'สมพงษ์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202485'),
(187, 52, 15, 'บางเขน-037', 'สมพงษ์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(188, 53, 13, 'บางเขน-027', 'สมพร', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202489'),
(189, 53, 15, 'บางเขน-022', 'สมพร', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(190, 54, 13, 'บางเขน-028', 'วนิกสิทธิ์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202490'),
(191, 54, 15, 'บางเขน-012', 'วนิกสิทธิ์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(192, 55, 13, 'บางเขน-029', 'สุรศักดิ์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202491'),
(193, 55, 15, 'บางเขน-032', 'สุรศักดิ์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(194, 56, 13, 'บางเขน-030', 'สมเกียรติ', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202492'),
(195, 56, 15, 'บางเขน-006', 'สมเกียรติ', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(196, 57, 13, 'บางเขน-032', 'ประดิษฐ์ ', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202499'),
(197, 57, 15, 'บางเขน-008', 'ประดิษฐ์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(198, 58, 13, 'บางเขน-033', 'วสันต์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '2017', '202500'),
(199, 58, 15, 'บางเขน-031', 'วสันต์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(200, 59, 13, 'บางเขน-034', 'วรศิลป์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1213692'),
(201, 59, 15, 'บางเขน-044', 'วรศิลป์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(202, 60, 13, 'บางเขน-035', 'ทัชชกร', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1189820'),
(203, 60, 15, 'บางเขน-009', 'ทัชชกร', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(204, 61, 13, 'บางเขน-036', 'อนุชา', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'DT', 'DT3266L', '1811088849'),
(205, 61, 15, 'บางเขน-043', 'อนุชา', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(206, 62, 13, 'บางเขน-037', 'รณชัย', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'KYORITSU', '200', '1219928'),
(207, 62, 15, 'บางเขน-046', 'รณชัย', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL),
(208, 63, 13, 'บางเขน-047', 'อานนท์', 'ISO ควบคุม', 'CLIP ON VOLT AMP.  (จ้าง)', 'DT', 'DT3266L', '047'),
(209, 63, 15, 'บางเขน-047', 'อานนท์', '', 'RUBBER GLOVES 1000 V.(จ้าง)', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accepttable`
--
ALTER TABLE `accepttable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`),
  ADD KEY `schedule_id` (`schedule_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- Indexes for table `action_logs`
--
ALTER TABLE `action_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_action_logs_submissions` (`submission_id`),
  ADD KEY `change_id` (`change_id`),
  ADD KEY `hisaddchange_id` (`hisaddchange_id`);

--
-- Indexes for table `changeaddhistory`
--
ALTER TABLE `changeaddhistory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `selected_device_id` (`selected_device_id`),
  ADD KEY `new_device_id` (`new_device_id`);

--
-- Indexes for table `changedevicestatus`
--
ALTER TABLE `changedevicestatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `change_id` (`change_id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devices_in_repair`
--
ALTER TABLE `devices_in_repair`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recycle_id` (`recycle_id`);

--
-- Indexes for table `pendingacceptchange`
--
ALTER TABLE `pendingacceptchange`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `selected_device_id` (`selected_device_id`),
  ADD KEY `new_device_id` (`new_device_id`),
  ADD KEY `change_id` (`change_id`);

--
-- Indexes for table `pendingapprovals`
--
ALTER TABLE `pendingapprovals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`),
  ADD KEY `schedule_id` (`schedule_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `submission_id` (`submission_id`) USING BTREE;
ALTER TABLE `pendingapprovals` ADD FULLTEXT KEY `sticker` (`sticker`);

--
-- Indexes for table `pending_approvals`
--
ALTER TABLE `pending_approvals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recyclebin`
--
ALTER TABLE `recyclebin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`),
  ADD KEY `schedule_id` (`schedule_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`),
  ADD KEY `schedule_id` (`schedule_id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- Indexes for table `submissionstatus`
--
ALTER TABLE `submissionstatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_devices`
--
ALTER TABLE `user_devices`
  ADD PRIMARY KEY (`user_device_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `device_id` (`device_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accepttable`
--
ALTER TABLE `accepttable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `action_logs`
--
ALTER TABLE `action_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=511;

--
-- AUTO_INCREMENT for table `changeaddhistory`
--
ALTER TABLE `changeaddhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `changedevicestatus`
--
ALTER TABLE `changedevicestatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `devices_in_repair`
--
ALTER TABLE `devices_in_repair`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `pendingacceptchange`
--
ALTER TABLE `pendingacceptchange`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT for table `pendingapprovals`
--
ALTER TABLE `pendingapprovals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=565;

--
-- AUTO_INCREMENT for table `pending_approvals`
--
ALTER TABLE `pending_approvals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recyclebin`
--
ALTER TABLE `recyclebin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT for table `submissionstatus`
--
ALTER TABLE `submissionstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT for table `user_devices`
--
ALTER TABLE `user_devices`
  MODIFY `user_device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `action_logs`
--
ALTER TABLE `action_logs`
  ADD CONSTRAINT `fk_action_logs_submissions` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`);

--
-- Constraints for table `pendingacceptchange`
--
ALTER TABLE `pendingacceptchange`
  ADD CONSTRAINT `pendingacceptchange_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `register` (`id`),
  ADD CONSTRAINT `pendingacceptchange_ibfk_2` FOREIGN KEY (`selected_device_id`) REFERENCES `devices` (`id`),
  ADD CONSTRAINT `pendingacceptchange_ibfk_3` FOREIGN KEY (`new_device_id`) REFERENCES `devices` (`id`);

--
-- Constraints for table `pendingapprovals`
--
ALTER TABLE `pendingapprovals`
  ADD CONSTRAINT `fk_submission` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`),
  ADD CONSTRAINT `pendingapprovals_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`),
  ADD CONSTRAINT `pendingapprovals_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`),
  ADD CONSTRAINT `pendingapprovals_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`);

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `register` (`id`),
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`),
  ADD CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`);

--
-- Constraints for table `submissionstatus`
--
ALTER TABLE `submissionstatus`
  ADD CONSTRAINT `user_submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `register` (`id`),
  ADD CONSTRAINT `user_submissions_ibfk_2` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `register` (`id`);

--
-- Constraints for table `user_devices`
--
ALTER TABLE `user_devices`
  ADD CONSTRAINT `user_devices_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `register` (`id`),
  ADD CONSTRAINT `user_devices_ibfk_2` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
