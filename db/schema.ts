import {
  bigint,
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

// Auth tables are at the bottom of this file (Better Auth).
// Roles are defined now so adding roles later needs no migration.
export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "editor",
  "project_manager",
  "inquiry_manager",
])

export const projectStatusEnum = pgEnum("project_status", [
  "completed",
  "ongoing",
  "upcoming",
])

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "read",
  "replied",
  "closed",
])

const id = () => integer().primaryKey().generatedAlwaysAsIdentity()
const createdAt = () => timestamp({ withTimezone: true }).defaultNow().notNull()
const updatedAt = () =>
  timestamp({ withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())

export const services = pgTable(
  "services",
  {
    id: id(),
    slug: varchar({ length: 160 }).notNull().unique(),
    title: varchar({ length: 160 }).notNull(),
    shortDescription: text("short_description").notNull(),
    content: text().notNull().default(""),
    icon: varchar({ length: 60 }),
    image: text(),
    sortOrder: integer("sort_order").notNull().default(0),
    published: boolean().notNull().default(true),
    createdAt: createdAt().notNull(),
    updatedAt: updatedAt(),
  },
  (t) => [index("services_published_sort_idx").on(t.published, t.sortOrder)]
)

export const projects = pgTable(
  "projects",
  {
    id: id(),
    slug: varchar({ length: 200 }).notNull().unique(),
    name: varchar({ length: 200 }).notNull(),
    location: varchar({ length: 200 }).notNull(),
    type: varchar({ length: 120 }).notNull(),
    description: text().notNull(),
    content: text().notNull().default(""),
    status: projectStatusEnum().notNull().default("ongoing"),
    startDate: date("start_date", { mode: "string" }),
    completionDate: date("completion_date", { mode: "string" }),
    featured: boolean().notNull().default(false),
    coverImage: text("cover_image"),
    published: boolean().notNull().default(false),
    createdAt: createdAt().notNull(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("projects_published_status_idx").on(t.published, t.status),
    index("projects_featured_idx").on(t.featured),
  ]
)

export const projectImages = pgTable(
  "project_images",
  {
    id: id(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    url: text().notNull(),
    alt: varchar({ length: 200 }).notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("project_images_project_idx").on(t.projectId, t.sortOrder)]
)

export const posts = pgTable(
  "posts",
  {
    id: id(),
    slug: varchar({ length: 200 }).notNull().unique(),
    title: varchar({ length: 200 }).notNull(),
    excerpt: text().notNull().default(""),
    content: text().notNull().default(""),
    coverImage: text("cover_image"),
    published: boolean().notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: createdAt().notNull(),
    updatedAt: updatedAt(),
  },
  (t) => [index("posts_published_at_idx").on(t.published, t.publishedAt)]
)

export const inquiries = pgTable(
  "inquiries",
  {
    id: id(),
    fullName: varchar("full_name", { length: 160 }).notNull(),
    company: varchar({ length: 200 }),
    email: varchar({ length: 254 }).notNull(),
    phone: varchar({ length: 40 }).notNull(),
    serviceRequired: varchar("service_required", { length: 160 }),
    projectLocation: varchar("project_location", { length: 200 }),
    estimatedBudget: varchar("estimated_budget", { length: 80 }),
    description: text().notNull(),
    status: inquiryStatusEnum().notNull().default("new"),
    createdAt: createdAt().notNull(),
  },
  (t) => [index("inquiries_status_created_idx").on(t.status, t.createdAt)]
)

export const media = pgTable("media", {
  id: id(),
  url: text().notNull(),
  storageKey: text("storage_key").notNull().unique(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  size: integer().notNull(),
  contentType: varchar("content_type", { length: 100 }).notNull(),
  alt: varchar({ length: 200 }).notNull().default(""),
  createdAt: createdAt().notNull(),
})

// --- Auth (Better Auth core tables; table names must stay singular) ---

export const user = pgTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text(),
  role: userRoleEnum().notNull().default("editor"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
})

export const session = pgTable(
  "session",
  {
    id: text().primaryKey(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    token: text().notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("session_user_idx").on(t.userId)]
)

export const account = pgTable(
  "account",
  {
    id: text().primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      withTimezone: true,
    }),
    scope: text(),
    password: text(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("account_user_idx").on(t.userId)]
)

export const verification = pgTable(
  "verification",
  {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("verification_identifier_idx").on(t.identifier)]
)

// Login rate limiting storage (survives serverless restarts).
export const rateLimit = pgTable("rate_limit", {
  id: text().primaryKey(),
  key: text().notNull().unique(),
  count: integer().notNull(),
  lastRequest: bigint("last_request", { mode: "number" }).notNull(),
})
