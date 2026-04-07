CREATE TABLE `products` (
	`id` varchar(36) NOT NULL,
	`design_name` varchar(255) NOT NULL,
	`design_slug` varchar(255) NOT NULL,
	`description` text,
	`image_url` text NOT NULL,
	`product_type` enum('tshirt','hoodie','mug','water_bottle','coffee_bottle','phone_case') NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`printful_product_id` varchar(255),
	`printful_variant_id` varchar(255),
	`category` varchar(100),
	`tags` text,
	`is_active` int DEFAULT 1,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_design_slug_unique` UNIQUE(`design_slug`)
);
