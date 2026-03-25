CREATE DATABASE IF NOT EXISTS donation_db;
USE donation_db;

CREATE TABLE IF NOT EXISTS donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_name VARCHAR(120) NOT NULL,
  donor_email VARCHAR(160),
  donor_phone VARCHAR(30),
  donation_type ENUM('money', 'clothes', 'essentials', 'other') NOT NULL,
  amount DECIMAL(10, 2),
  item_category VARCHAR(120),
  quantity INT,
  description TEXT,
  location VARCHAR(255),
  status VARCHAR(40) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS help_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  requester_name VARCHAR(120) NOT NULL,
  requester_email VARCHAR(160),
  requester_phone VARCHAR(30),
  request_type VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  urgency VARCHAR(40) NOT NULL DEFAULT 'medium',
  status VARCHAR(40) NOT NULL DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
