# Lex Moscua Data Model

The database uses PostgreSQL with Prisma ORM. All timestamps stored in UTC (`TIMESTAMPTZ`). Soft deletes rely on `deleted_at` columns where applicable.

## Entity relationship overview

```
[User] 1---* [Enrollment] *---1 [Course]
  |                           |
  |                           *---* [Module]
  |                                 |
  |                                 *---* [Lesson]
  |                                       |
  |                                       *---* [LessonBlock]
  |                                             *---* [Activity]
  |
  *---* [UserAchievement]
  *---* [UserStreak]
  *---* [UserInventory] *---1 [StoreItem]
  *---* [LeagueMembership] *---1 [LeagueSeason]
```

## Core tables

### `users`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Generated via `uuid_generate_v4()` |
| email | CITEXT | Unique, indexed |
| password_hash | TEXT | Argon2 hash; nullable for SSO accounts |
| name | TEXT | Display name |
| avatar_url | TEXT | Optional |
| role | ENUM(`learner`,`admin`) | RBAC |
| locale | TEXT | Default `ru` |
| created_at | TIMESTAMPTZ | default now |
| updated_at | TIMESTAMPTZ | trigger managed |
| last_login_at | TIMESTAMPTZ | nullable |

### `courses`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| slug | TEXT | Unique identifier |
| title | JSONB | Localised titles |
| description | JSONB | Localised descriptions |
| icon | TEXT | Media key |
| difficulty | ENUM(`intro`,`intermediate`,`advanced`) | Optional |
| status | ENUM(`draft`,`published`,`archived`) | Controls visibility |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### `modules`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| course_id | UUID | FK -> courses.id |
| order_index | INT | Display order |
| title | JSONB | Localised |
| summary | JSONB | Localised |
| trophy_asset | TEXT | Optional |

### `lessons`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| module_id | UUID | FK |
| order_index | INT | Sequence inside module |
| title | JSONB | |
| mastery_threshold | SMALLINT | Percentage required for ⭐ |
| xp_reward | SMALLINT | Base XP |
| status | ENUM(`locked`,`available`,`retired`) | |

### `lesson_blocks`

Defines ordered blocks inside a lesson. Types allow text, media, quiz, case study, etc.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| lesson_id | UUID | FK |
| order_index | INT | |
| kind | ENUM(`theory`,`quiz`,`scenario`,`review`) | |
| content | JSONB | Structured payload (rich text, quiz config) |

### `activities`

Atomic questions/tasks referenced by quiz blocks.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| block_id | UUID | FK -> lesson_blocks.id |
| activity_type | ENUM(`multiple_choice`,`true_false`,`ordering`,`fill_blank`,`case_eval`) | |
| prompt | JSONB | Supports localisation |
| options | JSONB | Answers/choices |
| solution | JSONB | Correct answer schema |
| explanation | JSONB | Feedback text |
| difficulty | SMALLINT | Adaptive weighting |

## Progress & gamification tables

### `enrollments`

Tracks user's relationship to a course.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| user_id | UUID | FK -> users |
| course_id | UUID | FK -> courses |
| current_module_id | UUID | FK -> modules |
| current_lesson_id | UUID | FK -> lessons |
| xp_total | INT | Accumulated XP |
| level | SMALLINT | Calculated level |
| streak_count | INT | Current streak |
| longest_streak | INT | Historical best |
| daily_goal | SMALLINT | XP target |
| last_goal_completed_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

Unique constraint `(user_id, course_id)`.

### `lesson_attempts`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| enrollment_id | UUID | FK |
| lesson_id | UUID | FK |
| attempt_no | SMALLINT | Incremental counter |
| score | SMALLINT | 0-100 |
| earned_xp | SMALLINT | |
| passed | BOOLEAN | |
| mastery | BOOLEAN | ⭐ flag |
| started_at | TIMESTAMPTZ | |
| completed_at | TIMESTAMPTZ | |

### `activity_responses`

Stores granular answers for analytics and remediation.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| attempt_id | UUID | FK -> lesson_attempts |
| activity_id | UUID | FK -> activities |
| response | JSONB | Learner answer |
| correct | BOOLEAN | |
| time_spent_ms | INT | |

### `user_achievements`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| user_id | UUID | FK |
| achievement_code | TEXT | e.g. `MODULE_COMPLETE`, `FLAWLESS_LESSON` |
| awarded_at | TIMESTAMPTZ | |
| metadata | JSONB | Additional context |

### `league_seasons`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| start_at | TIMESTAMPTZ | |
| end_at | TIMESTAMPTZ | |
| tier | ENUM(`bronze`,`silver`,`gold`,`ruby`,`emerald`,`diamond`) | |

### `league_memberships`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| season_id | UUID | FK -> league_seasons |
| user_id | UUID | FK -> users |
| xp_weekly | INT | Reset after season |
| rank | SMALLINT | Calculated snapshot |

### `store_items`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| sku | TEXT | Unique |
| title | JSONB | |
| description | JSONB | |
| price_currency | TEXT | Defaults to `coins` |
| price_amount | INT | |
| category | ENUM(`booster`,`cosmetic`,`utility`) | |
| available | BOOLEAN | |

### `user_inventory`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| user_id | UUID | FK |
| item_id | UUID | FK -> store_items |
| quantity | INT | |
| acquired_at | TIMESTAMPTZ | |
| expires_at | TIMESTAMPTZ | Nullable |

## Administrative support tables

- `media_assets`: stores metadata for uploaded files (original filename, mime type, storage key, owner, size).
- `audit_log`: append-only record capturing admin actions with JSON payload, hashed chain for tamper detection.
- `feature_flags`: toggle experiments per environment.
- `scheduled_jobs`: tracks background tasks and their state (queued, running, failed, completed).

## Indices & performance

- Partial indexes on `lesson_attempts(passed)` for analytics queries.
- Composite index on `activity_responses(activity_id, correct)` to measure distractor efficacy.
- Materialised view `leaderboard_snapshots` maintained by cron job for fast leaderboard rendering.
- Table partitioning for `activity_responses` by month to keep query performance as dataset grows.

## Data privacy & retention

- Allow users to request deletion: mark related rows with `deleted_at` and asynchronously purge PII (GDPR compliance).
- Retain aggregated analytics in anonymised tables (e.g., `activity_stats`) detached from personal identifiers.
- Encrypt sensitive columns at rest using pgcrypto or application-level encryption for optional fields (e.g., phone numbers if added later).

