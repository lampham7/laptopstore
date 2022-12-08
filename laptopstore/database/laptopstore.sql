-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 29, 2022 lúc 09:19 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `laptopstore`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `image` text COLLATE utf8_vietnamese_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `brands`
--

INSERT INTO `brands` (`id`, `name`, `image`, `created_by`, `created_at`, `updated_at`) VALUES
(8, 'DELL', '16552165891653968485dell.webp', 21, '2022-05-30 09:55:54', '2022-07-28 03:22:37'),
(9, 'ACER', '1653968513acer.webp', 21, '2022-05-31 10:41:53', '2022-05-31 10:41:53'),
(10, 'ASUS', '1653968528asus.webp', 21, '2022-05-31 10:42:08', '2022-05-31 10:42:08'),
(11, 'GIGABYTE', '1653968550gigabyte.webp', 21, '2022-05-31 10:42:30', '2022-05-31 10:42:30'),
(12, 'LENOVO', '1653968567lenovo.webp', 21, '2022-05-31 10:42:47', '2022-05-31 10:42:47'),
(13, 'MSI', '1653968577msi.webp', 21, '2022-05-31 10:42:57', '2022-05-31 10:42:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status_id`, `created_at`, `updated_at`) VALUES
(42, 21, 10, '2022-06-19 11:12:11', '2022-06-19 11:12:11'),
(43, 21, 10, '2022-06-22 04:01:18', '2022-06-22 04:01:18'),
(44, 34, 10, '2022-06-23 04:59:23', '2022-06-23 04:59:23'),
(45, 34, 10, '2022-06-23 05:17:44', '2022-06-23 05:17:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `capacity_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `capacity_id`, `quantity`, `price`) VALUES
(42, 42, 15, 10, 1, 11950800),
(43, 43, 54, 82, 1, 103191400),
(44, 44, 14, 9, 1, 35000000),
(45, 44, 14, 8, 1, 22790000),
(46, 45, 17, 14, 1, 13974800);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `model` text COLLATE utf8_vietnamese_ci NOT NULL,
  `screen` text COLLATE utf8_vietnamese_ci NOT NULL,
  `RAM` text COLLATE utf8_vietnamese_ci NOT NULL,
  `hardware` text COLLATE utf8_vietnamese_ci NOT NULL,
  `OS` text COLLATE utf8_vietnamese_ci NOT NULL,
  `CPU` text COLLATE utf8_vietnamese_ci NOT NULL,
  `VGA` text COLLATE utf8_vietnamese_ci NOT NULL,
  `background` text COLLATE utf8_vietnamese_ci NOT NULL,
  `warranty` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `discount` float NOT NULL DEFAULT 0,
  `color` varchar(50) COLLATE utf8_vietnamese_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `brand_id`, `model`, `screen`, `RAM`, `hardware`, `OS`, `CPU`, `VGA`, `background`, `warranty`, `discount`, `color`, `created_by`, `created_at`, `updated_at`) VALUES
(14, 8, 'Laptop Gaming Dell G15 5511', '                                                                        15.6\" FHD (1920 x1080) 120Hz, 250 nits, WVA, Anti-Glare, LED Backlit, Narrow Border Display\r\n                \r\n                \r\n                \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        ', '8GB (8x1) DDR4 3200MHz (2x SO-DIMM socket, up to 32GB SDRAM)', '256GB SSD M.2 PCIe', 'Windows 11 Home + Office Home and Student 2021', 'Intel Core i5-11400H 2.7GHz up to 4.5GHz 12MB', '                                                                                        NVIDIA GeForce RTX 3050 4GB GDDR6\r\n                \r\n                \r\n                \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        ', '1654489750dell_g5.webp', 'Bảo hành chính hãng 12 tháng.', 0, 'Dark Shadow Grey', 21, '2022-06-06 06:29:10', '2022-07-28 09:55:03'),
(15, 8, 'Laptop Dell Vostro 3510 V5I3305W Black', '15.6 inch, Full HD (1920 x 1080), 60Hz, chống chói Anti Glare, WVA, LED Backlit', '8GB DDR4 2666MHz (Hỗ trợ tối đa 16GB)', '256 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 2TB (2280) / 1TB (2230))Hỗ trợ khe cắm HDD SATA (nâng cấp tối đa 2TB)', 'Windows 11 Home SL + Office Home&Student 2021', 'Intel Core i3-1115G4, 2 nhân 4 luồng (3.0GHz - Turbo Boost 4.1GHz)', '	\r\nIntel UHD Graphics', '1654490413vostro_3510.webp', 'Bảo hành: 12 Tháng', 8, 'black', 21, '2022-06-06 06:40:13', '2022-06-06 06:40:13'),
(16, 8, 'Laptop gaming Dell G15 5515 P105F004 70266674', '15.6 inch FHD (1920 x1080) 120Hz, 250 nits, WVA, Anti-Glare, LED Backlit, Narrow Border', 'DDR4 8GB (1 x 8GB) 3200MHz, 2 khe cắm tối đa 32GB', '512GB SSD NVMe M.2 PCIe', 'Windows 11 Home + Office Home & Student', 'AMD Ryzen 7 5800H 3.2GHz up to 4.4GHz 16MB', 'NVIDIA GeForce RTX™ 3050 4GB GDDR6', '1654695500g15_74.webp', 'Bảo hành chính hãng 12 tháng', 5, 'Phantom Grey', 21, '2022-06-08 03:38:20', '2022-06-08 03:38:20'),
(17, 8, 'Laptop Dell Vostro 3400 P132G003 70270644', '14\'\' FHD (1920 x 1080), Anti-Glare, 45% NTSC, 220 Nits', '8GB DDR4 2666MHz (2x SO-DIMM socket, up to 16GB SDRAM)', '256GB SSD M.2 PCIE, 1x slot SATA3 2.5\"', 'Windows 11 Home SL + Office Home&Student 2021', 'Intel Core i3-1115G4 1.7GHz up to 4.1GHz 6MB', 'Intel® UHD Graphics', '1654695759dellvostro3400.webp', 'Bảo hành: 12 Tháng', 8, 'Đen', 21, '2022-06-08 03:42:39', '2022-06-08 03:42:39'),
(18, 8, 'Laptop gaming Dell G15 5515 P105F004 70266675', '15.6 inch FHD (1920 x1080) 120Hz, 250 nits, WVA, Anti-Glare, LED Backlit, Narrow Border', '16GB (2x8GB) DDR4 3200hz (2x SO-DIMM socket, up to 32GB SDRAM)', '512GB SSD M.2 PCIe (2 slots)', 'Windows 11 Home + Office Home & Student', 'AMD Ryzen 7 5800H 3.2GHz up to 4.4GHz 16MB', 'NVIDIA GeForce RTX 3050Ti 4GB GDDR6', '165469618915_75.jpg', 'Bảo hành chính hãng 12 tháng', 8, 'Phantom Grey', 21, '2022-06-08 03:49:49', '2022-06-08 03:49:49'),
(19, 8, 'Laptop Dell Inspiron 3511 P112F001CBL', 'Góc nhìn rộng 15,6 inch FHD (1920 x 1080), Chống lóa ', '4GB DDR4 3200MHz, 2 khe', 'SSD  256GB M.2 PCIe Gen3 x4 NVMe', 'Windows 11 Home + Office Home and Student 2021', 'Intel Core i3-1115G4 4.10GHz, 2 nhân 4 luồng', 'Đồ họa Intel UHD', '1654696569gearvnlaptopdellinspiron3511.webp', 'Bảo hành: 12 Tháng', 2, 'Đen', 21, '2022-06-08 03:56:09', '2022-06-08 03:56:09'),
(20, 8, 'Laptop Gaming Dell Alienware M15 70262921', '15.6\" FHD (1920 x 1080) WVA, 165Hz, 3ms with ComfortView Plus, 100% sRGB, 300nits', '16GB (2x8GB) DDR4 3200Mhz (2 khe, max 64GB RAM)', '1TB SSD M.2 PCIE', 'Windows 10 Home + Office Home & Student 2019', 'AMD Ryzen™ 9-5900HX (3.3GHz Up to 4.6GHz, 16MB', 'NVIDIA® GeForce RTX 3070 8GB GDDR6', '1654696744sieusoc.webp', 'Bảo hành chính hãng 12 tháng', 8, 'Đen', 21, '2022-06-08 03:59:04', '2022-06-08 03:59:04'),
(21, 8, 'Laptop Dell XPS 17 9700 XPS7I7001W1 Silve', '                17 inch 4K/UHD (3840 x 2400), 60Hz, WVA, Anti-Reflective, 500 nits, có cảm ứng\r\n                ', '16GB (2 x 8GB) DDR4 3200MHz, nâng tối đa 64GB', '1 TB SSD M.2 PCIe (Có thể tháo ra, lắp thanh khác tối đa 2TB)Hỗ trợ thêm 1 khe cắm SSD M.2 PCIe mở rộng (nâng cấp tối đa 2TB)', 'Windows 10 Home + Office Home & Student 2021', 'Intel Core i7-11800H 2.3GHz up to 4.6GHz 24MB, 8 nhân, 16 luồng', '                NVIDIA GeForce RTX 3050 4GB GDDR6\r\n                ', '1654697051LaptopDellXPS179700XPS7I7001W1Silve.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Bạc', 21, '2022-06-08 04:04:11', '2022-06-08 04:05:01'),
(22, 8, 'Laptop Dell Inspiron 15 3511 P112F002 70270650', '15.6 Inch FHD (1920 x 1080) Wide View Angle, Anti-Glare', '8GB DDR4 3200MHz (2x SO-DIMM socket, up to 16GB SDRAM)', '512GB SSD M.2 PCIE (1 x M.2 PCIE + 1 x Slot 2.5\" HDD/SSD)', 'Windows 11 Home SL + Office Home & Student 2021', 'Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB', 'NVIDIA GeForce MX350 2GB GDDR5 + Intel Iris Xe Graphic', '1654697283LaptopDellInspiron153511P112F00270270650.webp', 'Bảo hành chính hãng 12 tháng', 5, 'Bạc', 21, '2022-06-08 04:08:03', '2022-06-08 04:08:03'),
(23, 9, 'Laptop Gaming Acer Aspire 7 A715 42G R4XX', '15.6\" FHD (1920 x 1080) IPS, Anti-Glare, 60Hz', '8GB DDR4 (2x SO-DIMM socket, up to 32GB SDRAM)', '256GB PCIe® NVMe™ M.2 SSD', 'Windows 11 Home', 'AMD Ryzen 5 – 5500U (6 nhân 12 luồng)', 'NVIDIA GeForce GTX 1650 4GB GDDR6', '16546975561.webp', 'Bảo hành chính hãng 12 tháng', 8, 'Đen, Có đèn bàn phím', 21, '2022-06-08 04:12:36', '2022-06-08 04:12:36'),
(24, 9, 'Laptop Acer Aspire 5 A515 57 52Y2', '15.6 inch FHD (1920 x 1080) IPS, Acer ComfyView LCD', '8GB (4GBx2) DDR4 3200MHz (2x SO-DIMM socket, up to 32GB SDRAM)', '512GB SSD M.2 PCIE (2 slots)', 'Windows 11 Home', 'Intel Core i5-1235U 3.30GHz upto 4.40GHz, 12MB Cache', 'Intel® Iris® Xe Graphics', '16546978232.webp', 'Bảo hành chính hãng 12 tháng', 16, 'Iron', 21, '2022-06-08 04:17:03', '2022-06-08 04:17:03'),
(25, 9, 'Laptop Acer Aspire 7 A715 75G 58U4', '15.6\" FHD (1920 x 1080) IPS, Acer ComfyView, 60Hz                ', '8GB DDR4 3200MHz (2x SO-DIMM socket, up to 32GB SDRAM', '512GB PCIe® NVMe™ M.2 SSD', 'Windows 11 Home', 'Intel Core i5-10300H 2.5GHz up to 4.5GHz 8MB', 'NVIDIA GeForce GTX 1650 4GB GDDR6 + Intel UHD Graphics', '16546982083.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Đen, Có đèn bàn phím', 21, '2022-06-08 04:23:28', '2022-06-08 04:23:28'),
(26, 10, 'Laptop ASUS TUF Gaming F15 FX506LHB HN188W', '15.6\" FHD (1920 x 1080) IPS, 144Hz Value IPS-level, 45% NTSC, 62.5% SRGB, Anti-glare display', '8GB DDR4 2933MHz (2 khe ram, nâng cấp tối đa 32GB RAM)', '512GB SSD M.2 PCIE G3X2, 1 khe SATA3 2.5\"', 'Windows 11 Home', 'Intel Core i5-10300H 2.5GHz up to 4.5GHz 8MB', 'NVIDIA GeForce GTX 1650 4GB GDDR6 + Đồ họa Intel® UHD', '16546985701.webp', 'Bảo hành chính hãng 12 tháng', 8, 'Bonfire Black', 21, '2022-06-08 04:29:30', '2022-06-08 04:29:30'),
(27, 11, 'Laptop gaming GIGABYTE G5 GD 51S1123SO', '15.6 inch Thin Bezel FHD (1920x1080) IPS-level Anti-glare Display LCD, 144Hz, 72% NTSC, 100% sRGB.', '16GB (2x8GB) DDR4-3200Mhz (2 khe ram, nâng cấp tối đa 64GB RAM)', '512GB SSD M.2 PCIE G3X4 (Còn trống 1 khe SSD M.2 PCIE và 1 khe 2.5\" SATA)', 'Windows 11 Home', 'Intel Core i5-11400H upto 4.50GHz, 6 nhân 12 luồng', 'NVIDIA GeForce RTX 3050 4GB GDDR6 + Intel UHD Graphics', '16546989211.webp', 'Bảo hành chính hãng 12 tháng', 8, 'Đen', 21, '2022-06-08 04:35:21', '2022-06-08 04:35:21'),
(28, 11, 'Laptop GIGABYTE U4 UD 50S1823SO', 'Màn hình LCD 14 inch FHD (1920x1080) IPS chống chói ~ 100% sRGB', '16GB (8GB onboard + 1 khe 8GB) DDR4-3200Mhz ', '512GB SSD M.2 2242 PCIe NVMe 3.0x4, 1 slot nâng cấp', 'Windows 11 Home', 'Intel® Core™ i5-1155G7 (2.5GHz~4.5GHz)', 'Intel Iris Xe graphics', '16546997472.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Đen', 21, '2022-06-08 04:49:07', '2022-06-08 04:49:07'),
(29, 12, 'Laptop Lenovo IdeaPad Gaming 3 15ACH6 82K201B', '15.6\" FHD (1920x1080) IPS 250nits Anti-glare, 120Hz, 45% NTSC, DC dimmer', '8GB (8x1) DDR4 3200MHz (2x SO-DIMM socket, up to 16GB SDRAM)', '256GB SSD M.2 2242 PCIe 3.0x4 NVMe', 'Windows 11 Home', 'AMD Ryzen 5 5600H 3.3GHz up to 4.2GHz 16MB', 'NVIDIA GeForce GTX 1650 4GB GDDR6', '16546999721.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Shadow Black', 21, '2022-06-08 04:52:52', '2022-06-08 04:52:52'),
(30, 13, 'Laptop Gaming MSI Bravo 15 B5DD 276VN', '15.6 inch FHD (1920*1080), 60Hz 45%NTSC IPS-Level', 'DDR4 8GB (1 x 8GB) 3200MHz; 2 slots, Up to 64GB', '512GB NVMe PCIe Gen3x4 SSD', 'Windows 11 Home', 'AMD Ryzen 5-5600H 3.30GHz upto 4.20GHz, 6 cores 12 threads', 'Radeon RX5500M 4GB', '16547001631.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Đen', 21, '2022-06-08 04:56:03', '2022-06-08 04:56:03'),
(31, 12, 'Laptop Lenovo IdeaPad Gaming 3 15ACH6 82K201BCVN', '15.6\" FHD (1920x1080) IPS 250nits Anti-glare, 120Hz, 45% NTSC, DC dimmer\r\n                ', '8GB (8x1) DDR4 3200MHz (2x SO-DIMM socket, up to 16GB SDRAM)', '512GB SSD M.2 2242 PCIe 3.0x4 NVMe', 'Windows 11 Home', 'AMD Ryzen 5 5600H 3.3GHz up to 4.2GHz 16MB', '                NVIDIA GeForce GTX 1650 4GB GDDR6\r\n                ', '165470035521.webp', 'Bảo hành chính hãng 12 tháng', 8, 'Shadow Black', 21, '2022-06-08 04:59:15', '2022-06-08 05:00:41'),
(32, 11, 'Laptop Gaming Gigabyte AERO 16 XE5 73VN938AH', '15.6\" UHD+ (3840x2400) Samsung AMOLED Display (VESA DisplayHDR 500 True Black, 100% DCI-P3)\r\n                ', '16GB (8x2) DDR5 4800MHz (2x SO-DIMM socket, up to 64GB SDRAM)', '2TB (2x1TB) Gen4 7K SSD (2 Slots)', 'Windows 10 Home', 'Intel Core i7-12700H 3.6GHz up to 4.9GHz 25MB', '                NVIDIA® GeForce RTX™ 3070 Ti 8GB GDDR6 Boost Clock 1035 MHz / Maximum Graphics Power 105 W\r\n                ', '16547006833.webp', 'Bảo hành chính hãng 12 tháng', 6, 'Bạc', 21, '2022-06-08 05:04:43', '2022-06-08 05:04:59'),
(33, 10, 'Laptop Asus VivoBook A415EA EB1750W', '14\" FHD (1920 x 1080), IPS, Anti-Glare with 45% NTSC, NanoEdge', '8GB DDR4 2666MHz Onboard', '256GB SSD M.2 PCIE G3X4 (Còn trống 1 khe SSD M.2 PCIE)', 'Windows 11 Home', 'Intel Core i3-1115G4 1.7GHz up to 4.1GHz 6MB', 'Intel UHD Graphics ', '16547008732.webp', 'Bảo hành: 12 Tháng', 6, 'Bạc', 21, '2022-06-08 05:07:53', '2022-06-08 05:07:53'),
(34, 9, 'Laptop Acer Aspire 3 A315 58 59LY', '15.6 inch FHD (1920 x 1080) Acer ComfyView LCD, Anti-Glare', '8GB DDR4 2400MHz Onboard (1x onboard 4GB + 1x SO-DIMM 4GB socket, up to 12GB SDRAM)', '512GB SSD M.2 PCIE NVME, 1x slot SATA3 2.5\"', 'Windows 10 Home', 'Intel Core i5-1135G7 upto 4.2 GHz, 4 nhân 8 luồng', 'Intel Iris Xe Graphics            ', '16547012534.webp', 'Bảo hành chính hãng 12 tháng', 8, 'Pure Silver (Bạc)', 21, '2022-06-08 05:14:13', '2022-06-08 05:14:13'),
(35, 10, 'Laptop Gaming Asus ROG Strix G15 G513IH HN015W', '15.6 inch FHD (1920 x 1080) IPS, Non-Glare, 144Hz AdaptiveSync, Nanoedge', '8GB DDR4 3200MHz (2x SO-DIMM socket)', '512GB M.2 NVMe™ PCIe® 3.0 SSD (+1 khe M.2 PCIe trống)', 'Windows 11 Home', 'AMD Ryzen 7-4800H 2.9GHz up to 4.2GHz, 8 cores 16 threads', 'NVIDIA Geforce GTX 1650 4GB GDDR6', '16547014343.webp', 'Bảo hành chính hãng 12 tháng', 8, 'Eclipse Gray', 21, '2022-06-08 05:17:14', '2022-06-08 05:17:14'),
(36, 11, 'Laptop GIGABYTE U4 UD 70S1823SO', 'Màn hình LCD 14 inch FHD (1920x1080) IPS chống chói ~ 100% sRGB', '16GB (8GB onboard + 1 khe 8GB) DDR4-3200Mhz ', '512GB SSD M.2 2242 PCIe NVMe 3.0x4, 1 slot nâng cấp', 'Windows 11 Home', 'Intel Core i7-1195G7 (4 lõi, 8 luồng, tối đa 5,0 GHz)', 'Intel Iris Xe graphics', '16547016754.png', 'Bảo hành chính hãng 12 tháng', 8, 'Phantom Grey', 21, '2022-06-08 05:21:15', '2022-06-08 05:21:15'),
(37, 12, 'Laptop Lenovo V14 G2 ITL 82KA00RXVN', '14\" FHD (1920x1080) TN 250nits Anti-glare, 45% NTSC', '8GB DDR4 3200MHz (1x4GB onboard + 1x4GB SO-DIMM, upto 12GB)', '512GB SSD M.2 2242 PCIe 3.0x4 NVMe (1x 2.5\" HDD + 1x M.2 SSD 2242)', 'Windows 11 Home', 'Intel Core i3-1115G4 (2C / 4T, 3.0 / 4.1GHz, 6MB)', 'Intel UHD Graphics', '16547018933.png', 'Bảo hành chính hãng 12 tháng', 12, 'Đen', 21, '2022-06-08 05:24:53', '2022-06-08 05:24:53'),
(38, 13, 'Laptop MSI Modern 14 B11MOU 1028VN', '14 inch FHD (1920 x 1080) IPS-Level, 60Hz, 45% NTSC, viền mỏng', '8GB DDR4 3200MHz (2 Khe, tối đa 64GB)', '256GB PCIe NVMe™ M.2 SSD', 'Windows 11 Home', 'Intel Core i3-1115G4 1.7GHz lên đến 4.1GHz ', 'Đồ họa Intel UHD ', '16547020312.webp', 'Bảo hành: 12 Tháng', 12, 'Carbon gray', 21, '2022-06-08 05:27:11', '2022-06-08 05:27:11'),
(39, 12, 'Laptop Lenovo ThinkBook 15 G3 ACL 21A400CFVN', '15,6 \"FHD (1920x1080) IPS 250nits chống chói, 45% NTSC', '8GB DDR4 3200MHz tích hợp + (1 x khe cắm DDR4 SO-DIMM)', '512GB SSD M.2 PCIe + Empty HDD Bay', 'Windows 11 Home', 'AMD Ryzen ™ 5 5500U (2,10Ghz lên đến 4,0 GHz, 6 lõi, 12 luồng, 8MB Cache)', 'AMD Radeon™ Graphics Vega', '16547030454.webp', 'Bảo hành chính hãng 12 tháng', 8, 'Xám', 21, '2022-06-08 05:44:05', '2022-06-08 05:44:05'),
(40, 11, 'Laptop GIGABYTE AORUS 15P XD 73S1324GO', '15.6 inch Thin Bezel FHD (1920x1080) IPS-level Anti-glare Display LCD (240Hz, 72% NTSC)', '16GB (2x8GB) DDR4-3200Mhz (2x khe ram nâng cấp tối đa 64GB RAM)', '1TB SSD M.2 2242 PCIe NVMe 3.0x4', 'Windows 11 Home', 'Intel Core i7-11800H 2.30GHz up to 4.60GHz, 8 nhân 16 luồng', 'NVIDIA GeForce RTX 3070 8GB GDDR6 Boost Clock 1560 MHz, Maximum Graphics Power 130 W  ', '16547032755.webp', 'Bảo hành chính hãng 12 tháng', 5, 'Đen', 21, '2022-06-08 05:47:55', '2022-06-08 05:47:55'),
(41, 10, 'Laptop Asus X415EA EB640W', '14.0-inch FHD (1920 x 1080) 16:9, LED Backlit, 220nits, NTSC: 45%', '4GB DDR4 onboard, 1 khe DDR4 SO-DIMM', '512GB M.2 NVMe PCIe 3.0 SSD', 'Windows 11 Home', 'Intel Core i5-1135G7 up to 4.20GHz, 4 nhân 8 luồng', 'Intel UHD Graphics', '16547036694.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Bạc', 21, '2022-06-08 05:54:29', '2022-06-08 05:54:29'),
(42, 9, 'Laptop Gaming Acer Aspire 7 A715 42G R05G', '15.6\" FHD (1920 x 1080) IPS, Anti-Glare, 144Hz', '8GB DDR4 (2x SO-DIMM socket, up to 32GB SDRAM)', '512GB PCIe® NVMe™ M.2 SSD', 'Windows 11 Home', 'AMD Ryzen 5 – 5500U (6 nhân 12 luồng)', 'NVIDIA GeForce GTX 1650 4GB GDDR6  ', '16547040045.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Đen, Có đèn bàn phím', 21, '2022-06-08 06:00:04', '2022-06-08 06:00:04'),
(43, 10, 'Laptop Asus TUF Gaming FX706HCB HX105W', '17.3\" FHD (1920 x 1080) IPS, 144Hz, Wide View, 250nits, Narrow Bezel, Non-Glare with 45% NTSC, 63% sRGB', '8GB DDR4 3200MHz (2x SO-DIMM socket, up to 32GB SDRAM)', '512GB SSD M.2 PCIE G3X2, 1x slot M.2', 'Windows 11 Home', 'Intel® Core™ i5-11400H Processor 2.7 GHz (12M Cache, up to 4.5 GHz, 6 Cores)', 'NVIDIA® GeForce RTX™ 3050 Laptop GPU + Intel® UHD Graphics          ', '16547042155.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Graphite Black', 21, '2022-06-08 06:03:35', '2022-06-08 06:03:35'),
(44, 11, 'Laptop GIGABYTE AERO 15 OLED KD 72S1623GH', '15.6 inch Thin Bezel UHD (3840x2160) Samsung AMOLED Display (VESA DisplayHDR 400 True Black, 100% DCI-P3)', '16GB (2x8GB) DDR4-3200Mhz (2x khe ram, nâng cấp tối đa 64GB)', '512GB SSD M.2 2242 PCIe NVMe 3.0x4', 'Windows 10 Home', 'Intel Core i7-11800H (up to 4.60GHz, 8 nhân 16 luồng 24MB Cache)', 'NVIDIA GeForce RTX 3060 6GB GDDR6 + Intel UHD Graphics', '16547044206.webp', 'Bảo hành: 12 Tháng', 12, 'Đen', 21, '2022-06-08 06:07:00', '2022-06-08 06:07:00'),
(45, 12, 'Laptop Lenovo ThinkBook 14s G2 ITL 20VA003NVN', '14inch FHD (1920x1080) IPS 300nits Anti-glare, 100% sRGB, Dolby Vision', '8GB LPDDR4x-4266MHz Onboard Dual-Channel (Không nâng cấp) ', '512GB SSD M.2 2242 PCIe 3.0x4 NVMe (1 Slot)', 'Windows 11 Home', 'Intel Core i5-1135G7 (4C / 8T, 2.4 / 4.2GHz, 8MB)', 'Intel Iris Xe Graphics', '16547046425.webp', 'Bảo hành: 24 Tháng', 12, 'Mineral Grey', 21, '2022-06-08 06:10:42', '2022-06-08 06:10:42'),
(46, 13, 'Laptop MSI Gaming GF63 10SC 804VN', '15.6\" FHD (1920 x 1080) IPS, Thin Bezel', '8GB DDR4 3200MHz (2x SO-DIMM socket, up to 64GB SDRAM)', '512GB SSD M.2 PCIE', 'Windows 10 Home', 'Intel® Core i5-10500H 2.50GHz upto 4.50GHz, 6 cores 12 threads', 'NVIDIA GeForce GTX 1650 4GB GDDR6 with Max-Q Design + Intel UHD Graphics 630', '16547048163.webp', 'Bảo hành chính hãng 12 tháng', 12, 'Đen', 21, '2022-06-08 06:13:36', '2022-06-08 06:13:36'),
(47, 12, 'Laptop Lenovo V15 G2 ITL 82KB00R2VN', '15.6\" FHD (1920x1080) TN 250nits Anti-glare, 45% NTSC', '8GB DDR4 3200MHz onboard (Còn 1 slot, nâng cấp tối đa 16GB)', '512GB SSD M.2 2242 PCIe 3.0x4 NVMe (1x 2.5\" HDD + 1x M.2 SSD 2242)', 'Windows 11 Home', 'Intel Core i7-1165G7 (4C / 8T, 2.8 / 4.7GHz, 12MB)', 'Intel Iris Xe Graphics', '16547049946.webp', 'Bảo hành: 12 Tháng', 12, 'Iron Grey', 21, '2022-06-08 06:16:34', '2022-06-08 06:16:34'),
(48, 11, 'Laptop gaming Gigabyte AORUS 17 XE4 73VN514GH', '17.3 inch Thin Bezel FHD (1920x1080) IPS-level Anti-glare Display LCD (360Hz, 72% NTSC)', '16GB (8x2) DDR4 3200MHz (2x SO-DIMM socket, up to 32GB SDRAM)', '1TB SSD M.2 PCIE G4X4 ( supports 2x NVMe PCIe Gen4)', 'Windows 11 Home', 'Intel Core i7-12700H 3.6GHz up to 4.9GHz 25MB', 'NVIDIA® GeForce RTX™ 3070 Ti Laptop GPU 8GB GDDR6\r\nBoost Clock 1410 MHz / Maximum Graphics Power 130 W', '16547051337.webp', 'Bảo hành chính hãng 24 tháng', 12, 'Đen', 21, '2022-06-08 06:18:53', '2022-06-08 06:18:53'),
(49, 10, 'Laptop Asus Vivobook Pro M3401QA KM006W', '14 inch, OLED WQXGA+ (2880 x 1800) 16:10, 90 Hz, 600nits, 100% DCI-P3, PANTONE Validated', '8GB (Onboard) DDR4 3200MHz (không nâng cấp)', '512GB SSD M.2 PCIE G3X2 ', 'Windows 11 Home', 'AMD Ryzen 5-5600H up to 4.2GHz, 16MB cache', 'AMD Radeon™ Graphics             ', '16547053016.webp', 'Bảo hành chính hãng 24 tháng', 8, 'Bạc', 21, '2022-06-08 06:21:41', '2022-06-08 06:21:41'),
(50, 9, 'Laptop Acer Aspire 5 A514 54 5127', '14\" FHD (1920 x 1080) IPS, Acer ComfyView LCD', '8GB (4GBx2) DDR4 2666MHz  (1x SO-DIMM socket, up to 20GB SDRAM)', '512GB SSD M.2 PCIE, 1x slot SATA3 2.5\"', 'Windows 11 Home', 'Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB', 'Intel® Iris® Xe Graphics', '16547055666.webp', 'Bảo hành chính hãng 24 tháng', 12, 'Pure Silver ', 21, '2022-06-08 06:26:06', '2022-06-08 06:26:06'),
(51, 10, 'Laptop ASUS ROG Zephyrus G14 GA401QH K2091W', '14\" WQHD (2560 x 1440) 16:9, IPS with 72% NTSC, 120Hz, 100% DCI-P3, Pantone Validated, 300nits', '8GB Onboard DDR4 3200MHz (1x SO-DIMM socket, up to 24GB SDRAM)', '512GB M.2 NVMe™ PCIe® 3.0 SSD', 'Windows 11 Home', 'AMD Ryzen™ 7-5800HS 2.8GHz up to 4.4GHz, 8 cores 16 threads', 'NVIDIA GeForce GTX 1650 4GB GDDR6, With ROG Boost up to 1515MHz at 50W (65W with Dynamic Boost)', '16547057407.webp', 'Bảo hành chính hãng 12 tháng.', 8, 'Eclipse Gray', 21, '2022-06-08 06:29:00', '2022-06-08 06:29:00'),
(52, 11, 'Laptop GIGABYTE AORUS 15P XD 73S1324GH', '15.6 inch Thin Bezel FHD (1920x1080) IPS-level Anti-glare Display LCD (240Hz, 72% NTSC)', '16GB (2x8GB) DDR4-3200Mhz (2x khe ram nâng cấp tối đa 64GB RAM)', '1TB SSD M.2 2242 PCIe NVMe 3.0x4', 'Windows 11 Home', 'Intel Core i7-11800H 2.30GHz up to 4.60GHz, 8 nhân 16 luồng', 'NVIDIA GeForce RTX 3070 8GB GDDR6 + Intel UHD Graphics', '16547058938.png', 'Bảo hành chính hãng 12 tháng', 5, 'Đen', 21, '2022-06-08 06:31:33', '2022-06-08 06:31:33'),
(53, 13, 'Laptop gaming MSI Stealth GS77 12UH 075VN', '17.3\" QHD (2560x1440) IPS with Anti-Glare, 240Hz, DCI-P3 100% typical', '32GB (16GBx2) DDR5 4800MHz (2x SO-DIMM socket, up to 64GB SDRAM)', '2TB SSD PCIE G4X4 (2 slots)', 'Windows 11 Home', 'Intel Core i9-12900H 3.8GHz up to 5.0GHz 24MB', 'NVIDIA GeForce RTX3080 Max-Q 8GB GDDR6, Up to 1345MHz Boost Clock, 105W Maximum Graphics Power with Dynamic Boost.    ', '16547060224.jpg', 'Bảo hành chính hãng 24 tháng', 10, 'Core Black', 21, '2022-06-08 06:33:42', '2022-06-08 06:33:42'),
(54, 13, 'Laptop gaming MSI Raider GE76 12UHS 480VN', '17.3\" UHD (3840 x 2160) IPS, 120Hz, 100% sRGB, 100% Adobe RGB, NanoEdge ', '64GB (32GB x2) DDR5 4800MHz (2x SO-DIMM socket, up to 64GB SDRAM)', '2TB SSD PCIE G4X4 (2 slots)', 'Windows 11 Home', 'Intel Core i9-12900HK 3.8GHz up to 5.0GHz 24MB', 'NVIDIA GeForce RTX 3080Ti 16GB GDDR6 Up to 1690MHz Boost Clock, 175W Maximum Graphics Power with Dynamic Boost. Max. 220W CPU-GPU Power with MSI OverBoost Technology', '16547061385.webp', 'Bảo hành chính hãng 24 tháng', 14, 'Titanium Blue', 21, '2022-06-08 06:35:38', '2022-06-08 06:35:38'),
(55, 13, 'tesst', '       sdfs         ', 'sfs', 'sfs', 'sfds', 'sf', '    sfsd            ', '1658999613cuteness.jpg', 'sfs', 2, 'sd', 21, '2022-07-28 04:13:33', '2022-07-28 04:13:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_capacities`
--

CREATE TABLE `product_capacities` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `capacity_name` text COLLATE utf8_vietnamese_ci NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `product_capacities`
--

INSERT INTO `product_capacities` (`id`, `product_id`, `capacity_name`, `price`, `quantity`) VALUES
(8, 14, '8GB/ 120GB SSD ', 22790000, 18009991),
(9, 14, '16GB/ 256GB SSD', 35000000, 190050502),
(10, 15, '8GB/ 120GB SSD ', 12990000, 100046),
(11, 15, '16GB/ 256GB SSD', 15000000, 5000),
(12, 16, '8GB/ 120GB SSD ', 30990000, 4997),
(13, 16, '16GB/ 256GB SSD', 35000000, 4998),
(14, 17, '8GB/ 120GB SSD ', 15190000, 999),
(15, 17, '16GB/ 256GB SSD', 17190000, 1000),
(16, 18, '16GB/ 256GB SSD', 33990000, 2000),
(17, 17, '32GB/ 500GB SSD', 39990000, 1000),
(18, 18, '32GB/ 500GB SSD', 40990000, 1000),
(19, 19, '4GB/ 120GB SSD ', 15290000, 100),
(20, 19, '8GB/ 120GB SSD ', 17290000, 100),
(21, 20, '16GB/ 256GB SSD', 59990000, 100),
(22, 20, '32GB/ 500GB SSD', 65990000, 100),
(23, 21, '16GB/ 256GB SSD', 75000000, 10),
(24, 21, '32GB/ 500GB SSD', 78990000, 10),
(25, 22, '8GB/ 120GB SSD ', 20990000, 200),
(26, 22, '16GB/ 256GB SSD', 21990000, 200),
(27, 23, '8GB/ 120GB SSD ', 19990000, 10),
(28, 23, '16GB/ 256GB SSD', 21990000, 10),
(29, 24, '8GB/ 120GB SSD ', 18990000, 10),
(30, 24, '16GB/ 256GB SSD', 19990000, 10),
(31, 25, '8GB/ 120GB SSD ', 21990000, 10),
(32, 25, '16GB/ 256GB SSD', 22990000, 10),
(33, 26, '8GB/ 120GB SSD ', 19990000, 100),
(34, 26, '16GB/ 256GB SSD', 20990000, 100),
(35, 27, '16GB/ 256GB SSD', 26990000, 100),
(36, 27, '32GB/ 500GB SSD', 28000000, 100),
(37, 28, '16GB/ 256GB SSD', 25490000, 100),
(38, 28, '32GB/ 500GB SSD', 26990000, 100),
(39, 29, '8GB/ 120GB SSD ', 19990000, 100),
(40, 29, '16GB/ 256GB SSD', 20990000, 10),
(41, 30, '8GB/ 120GB SSD ', 22490000, 10),
(42, 30, '16GB/ 256GB SSD', 23490000, 10),
(43, 31, '8GB/ 120GB SSD ', 20990000, 10),
(44, 31, '16GB/ 256GB SSD', 21990000, 10),
(45, 32, '16GB/ 256GB SSD', 82990000, 9),
(46, 32, '32GB/ 500GB SSD', 83990000, 10),
(47, 33, '8GB/ 120GB SSD ', 14990000, 10),
(48, 33, '16GB/ 256GB SSD', 15990000, 10),
(49, 34, '8GB/ 120GB SSD ', 16990000, 10),
(50, 34, '16GB/ 256GB SSD', 17990000, 10),
(51, 35, '8GB/ 120GB SSD ', 23990000, 100),
(52, 35, '16GB/ 256GB SSD', 24990000, 10),
(53, 36, '16GB/ 256GB SSD', 25390000, 500),
(54, 36, '32GB/ 500GB SSD', 26390000, 10),
(55, 37, '8GB/ 120GB SSD ', 13590000, 200),
(56, 37, '16GB/ 256GB SSD', 14590000, 20),
(57, 38, '8GB/ 120GB SSD ', 14490000, 10),
(58, 38, '16GB/ 256GB SSD', 15490000, 10),
(59, 39, '8GB/ 120GB SSD ', 16990000, 10),
(60, 39, '16GB/ 256GB SSD', 17990000, 10),
(61, 40, '16GB/ 256GB SSD', 53990000, 20),
(62, 40, '32GB/ 500GB SSD', 54990000, 20),
(63, 41, '4GB/ 120GB SSD ', 16990000, 10),
(64, 41, '8GB/ 120GB SSD ', 17990000, 20),
(65, 42, '8GB/ 120GB SSD ', 22990000, 100),
(66, 42, '16GB/ 256GB SSD', 23990000, 10),
(67, 43, '8GB/ 120GB SSD ', 23990000, 100),
(68, 43, '16GB/ 256GB SSD', 24990000, 10),
(69, 44, '16GB/ 256GB SSD', 46990000, 10),
(70, 44, '32GB/ 500GB SSD', 49990000, 10),
(71, 45, '8GB/ 120GB SSD ', 24290000, 10),
(72, 45, '16GB/ 256GB SSD', 25290000, 10),
(73, 46, '8GB/ 120GB SSD ', 18290000, 10),
(74, 46, '16GB/ 256GB SSD', 17290000, 10),
(75, 47, '8GB/ 120GB SSD ', 19990000, 10),
(76, 48, '16GB/ 256GB SSD', 56990000, 10),
(77, 49, '8GB/ 120GB SSD ', 20990000, 20),
(78, 50, '8GB/ 120GB SSD ', 18490000, 20),
(79, 51, '8GB/ 120GB SSD ', 29990000, 100),
(80, 52, '16GB/ 256GB SSD', 53990000, 100),
(81, 53, '32GB/ 500GB SSD', 89990000, 10),
(82, 54, '64GB/ 500GB SSD', 119990000, 8),
(83, 55, 'OO la la', 3, 3),
(84, 14, '32GB/SSD 1TB', 40000000, 6),
(85, 15, '32GB/SSD 1TB', 38000000, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'Chờ shop xác nhận'),
(2, 'Shop đã xác nhận'),
(3, 'Shop đang chuẩn bị hàng'),
(4, 'Đơn vị đang vận chuyển'),
(5, 'Shiper đang giao hàng'),
(6, 'Giao hàng thành công'),
(7, 'Yêu cầu trả hàng'),
(8, 'Shop xác nhận trả hàng'),
(9, 'Trả hàng thành công'),
(10, 'Đơn hàng bị hủy.'),
(11, 'Trả hàng thất bại'),
(12, 'Khách không nhận.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `account` varchar(50) COLLATE utf8_vietnamese_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `phone_number` varchar(20) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `address` text COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `avatar` text COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `role_id`, `account`, `password`, `name`, `phone_number`, `address`, `avatar`, `email`, `created_at`, `updated_at`) VALUES
(21, 2, 'admin', '25d55ad283aa400af464c76d713c07ad', 'tô văn tài', '973867269', 'Xóm 4, thôn Gia Lễ, xã Đông Mỹ, thành phố Thái Bình, tỉnh Thái Bình', '1653793675sexygirl.jpg', 'tovantaidz2001@gmail.com', '2022-05-29 10:06:46', '2022-06-04 02:58:01'),
(33, 1, 'account1', '827ccb0eea8a706c4c34a16891f84e7b', 'van tai', '0973867269', 'Xóm 3, thôn Gia Lễ, xã Đông Mỹ, thành phố Thái Bình', '1655597592cuteness.jpg', 'tovantaidz2002@gmail.com', '2022-06-18 11:24:30', '2022-06-19 07:13:12'),
(34, 1, 'account2', '25d55ad283aa400af464c76d713c07ad', 'to van tai', '0973867269', 'Xom 4, thon gia le, xa dong my, thanh pho thai binh', NULL, 'tovantaidz2001@gmail.com', '2022-06-19 07:18:52', '2022-06-23 04:24:21'),
(35, 1, 'account5', '827ccb0eea8a706c4c34a16891f84e7b', 'to van tai', '015423454', 'THAI BINH', NULL, 'tovantaidz2001@gmail.com', '2022-07-24 04:34:33', '2022-07-24 04:35:11');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `capacity_id` (`capacity_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Chỉ mục cho bảng `product_capacities`
--
ALTER TABLE `product_capacities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `product_capacities`
--
ALTER TABLE `product_capacities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`capacity_id`) REFERENCES `product_capacities` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `product_capacities`
--
ALTER TABLE `product_capacities`
  ADD CONSTRAINT `product_capacities_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
