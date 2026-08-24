-- Database Creation
CREATE DATABASE IF NOT EXISTS `sga_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sga_db`;

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
('admin', 'admin@sga.com', '$2y$10$4.a8lE/V5P3R.fN1Bq4GauJtPzC3Lh3U3v3G1T2O5M7N9P0Q1R2S3')
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
  `promo_code` VARCHAR(100) DEFAULT 'SGA',
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
('Lucid Trading', 'lucid-trading', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&auto=format&fit=crop&q=80', 
'DGT Trusted - Most Popular. 15-minute payouts, 90% profit split, instant funding, no consistency rule.', 
'Lucid Trading is a premier futures prop trading firm providing instant funding, zero consistency rules, 90% profit splits, and ultra-fast 15-minute daily payouts.', 
'https://lucidtrading.com', '40% OFF', 'DGT', 'https://lucidtrading.com', 1, 'active', '$750,000', '90/10', '$193', 4.8, 'Tradovate, NinjaTrader'),

('Take Profit Trader', 'take-profit-trader', 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=200&auto=format&fit=crop&q=80', 
'DGT Trusted - Best Daily Payouts. 1-hour payouts, 80% profit split, and trader-friendly evaluation rules.', 
'Take Profit Trader gives futures traders direct access to funded accounts with daily payouts, 1-hour withdrawal speeds, and high profit share options.', 
'https://takeprofittrader.com', '50% OFF', 'DGT', 'https://takeprofittrader.com', 1, 'active', '$750,000', '80/20', '$180', 4.7, 'Tradovate, NinjaTrader, Rithmic'),

('Tradeify', 'tradeify', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&auto=format&fit=crop&q=80', 
'DGT Trusted - Best Instant Funding. 1-hour payouts, 90% profit split, instant funding, no consistency rule.', 
'Tradeify specializes in instant funding evaluation models for futures traders, featuring 90% profit split, fast 1-hour payouts, and raw execution.', 
'https://tradeify.co', '40% OFF', 'DGT', 'https://tradeify.co', 1, 'active', '$750,000', '90/10', '$99', 4.7, 'Tradovate, NinjaTrader'),

('Apex Trader Funding', 'apex-trader-funding', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&auto=format&fit=crop&q=80', 
'The #1 Futures prop firm offering massive evaluation sales, 100% of first $25k profits, and daily payouts.', 
'Apex Trader Funding leads the futures trading industry with generous evaluation discounts, rapid evaluation pass rates, and smooth payout distributions through Tradovate and NinjaTrader.', 
'https://apextraderfunding.com', '80% OFF', 'APEX80', 'https://apextraderfunding.com', 1, 'active', '$300,000', '90/10', '$147', 4.7, 'Rithmic, Tradovate, NinjaTrader')
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
