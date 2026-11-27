CREATE TYPE "public"."inquiry_status" AS ENUM('new', 'read', 'replied', 'closed');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('completed', 'ongoing', 'upcoming');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'editor', 'project_manager', 'inquiry_manager');--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "inquiries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"full_name" varchar(160) NOT NULL,
	"company" varchar(200),
	"email" varchar(254) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"service_required" varchar(160),
	"project_location" varchar(200),
	"estimated_budget" varchar(80),
	"description" text NOT NULL,
	"status" "inquiry_status" DEFAULT 'new' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "media_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url" text NOT NULL,
	"storage_key" text NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"size" integer NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"alt" varchar(200) DEFAULT '' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_storage_key_unique" UNIQUE("storage_key")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(200) NOT NULL,
	"title" varchar(200) NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"cover_image" text,
	"published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "project_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "project_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer NOT NULL,
	"url" text NOT NULL,
	"alt" varchar(200) DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(200) NOT NULL,
	"name" varchar(200) NOT NULL,
	"location" varchar(200) NOT NULL,
	"type" varchar(120) NOT NULL,
	"description" text NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"status" "project_status" DEFAULT 'ongoing' NOT NULL,
	"start_date" date,
	"completion_date" date,
	"featured" boolean DEFAULT false NOT NULL,
	"cover_image" text,
	"published" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(160) NOT NULL,
	"title" varchar(160) NOT NULL,
	"short_description" text NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"icon" varchar(60),
	"image" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "inquiries_status_created_idx" ON "inquiries" USING btree ("status","createdAt");--> statement-breakpoint
CREATE INDEX "posts_published_at_idx" ON "posts" USING btree ("published","published_at");--> statement-breakpoint
CREATE INDEX "project_images_project_idx" ON "project_images" USING btree ("project_id","sort_order");--> statement-breakpoint
CREATE INDEX "projects_published_status_idx" ON "projects" USING btree ("published","status");--> statement-breakpoint
CREATE INDEX "projects_featured_idx" ON "projects" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "services_published_sort_idx" ON "services" USING btree ("published","sort_order");