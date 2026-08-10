-- Database Creation
CREATE DATABASE IF NOT EXISTS `onlypropfirms_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `onlypropfirms_db`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Default Admin: admin / admin123 (bcrypt hash)
INSERT INTO `admins` (`username`, `email`, `password`) VALUES
('admin', 'admin@onlypropfirms.com', '$2y$10$4.a8lE/V5P3R.fN1Bq4GauJtPzC3Lh3U3v3G1T2O5M7N9P0Q1R2S3')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- 2. Companies Table
CREATE TABLE IF NOT EXISTS `companies` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `logo` VARCHAR(500) NOT NULL,
  `short_description` VARCHAR(500) NOT NULL,
  `full_description` TEXT NOT NULL,
  `website_url` VARCHAR(500) NOT NULL,
  `discount` VARCHAR(100) DEFAULT '10% OFF',
  `promo_code` VARCHAR(100) DEFAULT 'ONLYPROP',
  `deal_url` VARCHAR(500) NOT NULL,
  `featured` TINYINT(1) DEFAULT 0,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `max_funding` VARCHAR(100) DEFAULT '$200,000',
  `profit_split` VARCHAR(100) DEFAULT '90/10',
  `start_price` VARCHAR(100) DEFAULT '$49',
  `rating` DECIMAL(3,1) DEFAULT 4.8,
  `platform` VARCHAR(255) DEFAULT 'MT4, MT5, cTrader',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Sample Companies
INSERT INTO `companies` 
(`company_name`, `slug`, `logo`, `short_description`, `full_description`, `website_url`, `discount`, `promo_code`, `deal_url`, `featured`, `status`, `max_funding`, `profit_split`, `start_price`, `rating`, `platform`) 
VALUES
('FTMO', 'ftmo', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&auto=format&fit=crop&q=80', 
'Industry leading prop firm with up to 90% profit split, instant scaling up to $2,000,000, and fast bi-weekly payouts.', 
'FTMO is a widely acclaimed proprietary trading platform operating globally. Traders receive evaluation accounts up to $200,000 with comprehensive educational resources, performance coaching, and top-tier liquidity execution.', 
'https://ftmo.com', '10% OFF', 'ONLYPROP', 'https://ftmo.com', 1, 'active', '$200,000', '90/10', '$170', 4.9, 'MT4, MT5, cTrader, DXtrade'),

('Funding Pips', 'funding-pips', 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=200&auto=format&fit=crop&q=80', 
'Built by traders for traders. Lowest evaluation fees, zero minimum trading days, and 5-day payout cycles.', 
'Funding Pips provides an accessible, trader-centric environment designed to maximize funded capital growth. Enjoy 5-day payout intervals, raw spreads, and flexible risk parameters.', 
'https://fundingpips.com', '20% OFF', 'PIPS20', 'https://fundingpips.com', 1, 'active', '$300,000', '85/15 - 90%', '$32', 4.8, 'cTrader, Match-Trader'),

('Apex Trader Funding', 'apex-trader-funding', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&auto=format&fit=crop&q=80', 
'The #1 Futures prop firm offering massive evaluation sales, 100% of first $25k profits, and daily payouts.', 
'Apex Trader Funding leads the futures trading industry with generous evaluation discounts, rapid evaluation pass rates, and smooth payout distributions through Tradovate and NinjaTrader.', 
'https://apextraderfunding.com', '80% OFF', 'APEX80', 'https://apextraderfunding.com', 1, 'active', '$300,000', '90/10', '$147', 4.7, 'Rithmic, Tradovate, NinjaTrader'),

('The 5%ers', 'the-5ers', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&auto=format&fit=crop&q=80', 
'Hyper-growth account scaling, instant real capital funding, and risk-free scaling program for forex traders.', 
'The 5%ers offers immediate funding models and traditional evaluation pathways designed for long-term career traders.', 
'https://the5ers.com', '10% OFF', 'FIVEOPF', 'https://the5ers.com', 0, 'active', '$4,000,000', '100%', '$95', 4.8, 'MT5'),

('FundedNext', 'fundednext', 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80', 
'Get paid 15% profit split even during the evaluation phase! No time limits and raw spread execution.', 
'FundedNext rewards consistent traders from day one with a unique 15% profit share during challenge phases, robust trading dashboards, and dedicated account manager support.', 
'https://fundednext.com', '15% OFF', 'NEXT15', 'https://fundednext.com', 1, 'active', '$200,000', '90/10', '$49', 4.9, 'MT4, MT5, cTrader')
ON DUPLICATE KEY UPDATE `company_name`=`company_name`;

-- 3. Giveaway Entries Table
CREATE TABLE IF NOT EXISTS `giveaway_entries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `youtube_username` VARCHAR(150) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `consent` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Initial Giveaway Submissions
INSERT INTO `giveaway_entries` (`first_name`, `last_name`, `youtube_username`, `email`, `consent`) VALUES
('Alex', 'Rivers', '@AlexTraderFX', 'alex.rivers@example.com', 1),
('David', 'Kovac', '@D_Kovac_Trades', 'david.k@example.com', 1),
('Sophia', 'Chen', '@SophiaPips', 'sophia.c@example.com', 1);
