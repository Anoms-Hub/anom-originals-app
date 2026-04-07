CREATE TABLE `cart_items` (
	`id` varchar(36) NOT NULL,
	`user_id` int NOT NULL,
	`product_id` varchar(255) NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`color` varchar(100),
	`size` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cart_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` varchar(36) NOT NULL,
	`order_id` varchar(36) NOT NULL,
	`product_id` varchar(255) NOT NULL,
	`product_name` varchar(255) NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`price_per_unit` decimal(10,2) NOT NULL,
	`color` varchar(100),
	`size` varchar(100),
	`printful_product_id` varchar(255),
	`printful_variant_id` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `order_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(36) NOT NULL,
	`user_id` int NOT NULL,
	`stripe_payment_intent_id` varchar(255),
	`stripe_session_id` varchar(255),
	`status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
	`total_amount` decimal(10,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`printful_order_id` varchar(255),
	`fulfillment_status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
	`tracking_number` varchar(255),
	`tracking_url` text,
	`customer_email` varchar(255) NOT NULL,
	`customer_name` varchar(255),
	`shipping_address` text,
	`metadata` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_stripe_payment_intent_id_unique` UNIQUE(`stripe_payment_intent_id`),
	CONSTRAINT `orders_stripe_session_id_unique` UNIQUE(`stripe_session_id`)
);
