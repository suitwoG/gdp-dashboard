# Lex Moscua API Design

The API surface is versioned (`/api/v1`) and uses JSON over HTTPS. Authentication relies on HTTP-only cookie-based JWT sessions issued via NextAuth. All endpoints require a CSRF token for state-changing operations.

## Authentication & session management

### POST `/api/v1/auth/register`
- **Body**: `{ email, password, name, locale }`
- **Responses**:
  - `201 Created`: account created; verification email sent.
  - `409 Conflict`: email already registered.
- **Notes**: triggers email verification token; rate limited.

### POST `/api/v1/auth/login`
- **Body**: `{ email, password }`
- **Responses**: `200 OK` with session cookie; `401 Unauthorized` on failure.
- **Notes**: on success returns user profile snapshot.

### POST `/api/v1/auth/logout`
- Invalidates session cookie server-side.

### POST `/api/v1/auth/refresh`
- Exchanges refresh token for new access token (used by mobile/PWA clients).

### POST `/api/v1/auth/password-reset`
- Starts password reset flow via email.

## Learner-facing endpoints

### GET `/api/v1/courses`
- Returns list of published courses with progress summary per user.

### GET `/api/v1/courses/:courseId`
- Detailed course metadata, module summaries, current streak/XP data.

### GET `/api/v1/courses/:courseId/modules/:moduleId`
- Returns module timeline with lessons and status flags (locked, available, mastered).

### GET `/api/v1/lessons/:lessonId`
- Delivers lesson blocks (theory, quiz config). For locked lessons returns `403` with prerequisites.

### POST `/api/v1/lessons/:lessonId/start`
- Creates `lesson_attempt` record, returns attempt ID and initial blocks.

### POST `/api/v1/attempts/:attemptId/submit`
- Body contains `{ responses: ActivityResponse[] }` with question-level answers.
- Validates, calculates score, updates XP, streak, achievements.

### POST `/api/v1/attempts/:attemptId/retry`
- Allows reattempting a failed lesson.

### GET `/api/v1/progress/summary`
- Aggregated stats (XP totals, streak status, goals) for dashboard.

### POST `/api/v1/daily-goal`
- Updates daily XP goal for current enrollment.

### GET `/api/v1/leaderboards/current`
- Returns weekly leaderboard for user’s league with pagination.

### POST `/api/v1/shop/purchase`
- Body: `{ itemId }`. Validates virtual currency balance, updates inventory.

### GET `/api/v1/notifications`
- Lists actionable notifications (daily goal reminder, new module unlocked).

## Admin endpoints

Admin routes require `role=admin`. Additional audit logging occurs for every write operation.

### POST `/api/v1/admin/courses`
- Creates a new course with metadata.

### PATCH `/api/v1/admin/courses/:courseId`
- Updates course details, status toggles.

### POST `/api/v1/admin/courses/:courseId/modules`
- Adds module; supports bulk creation via array payload.

### PATCH `/api/v1/admin/modules/:moduleId`
- Updates module fields and order.

### POST `/api/v1/admin/lessons`
- Creates or clones lesson templates.

### PATCH `/api/v1/admin/lessons/:lessonId`
- Updates lesson metadata, status, XP reward.

### POST `/api/v1/admin/lessons/:lessonId/blocks`
- Adds blocks (theory or quiz) using JSON schema validated content.

### PATCH `/api/v1/admin/blocks/:blockId`
- Updates block content; supports draft/publish states.

### POST `/api/v1/admin/activities`
- Adds question to bank; can be reused across lessons.

### PATCH `/api/v1/admin/activities/:activityId`
- Edits question content, options, solutions.

### POST `/api/v1/admin/publish`
- Publishes staged changes (course wide) after validation pass; triggers cache invalidation.

### GET `/api/v1/admin/analytics/overview`
- Returns metrics: active users, completion rates, popular lessons.

### POST `/api/v1/admin/users/:userId/actions`
- Executes admin actions: `{ action: "reset_progress" | "suspend" | "unsuspend" }`.

## WebSocket / real-time channels

- **`/ws/leaderboard`**: live updates when league standings change.
- **`/ws/notifications`**: push daily goal reminders and admin announcements.

## Error handling

Responses include `error.code`, `error.message`, and optional `details`. Standard codes:
- `400 Bad Request`: validation errors (list of fields).
- `401 Unauthorized`: missing or invalid session.
- `403 Forbidden`: lacking permissions or locked content.
- `404 Not Found`: resource absent.
- `409 Conflict`: e.g. purchasing already owned consumable.
- `422 Unprocessable Entity`: semantic errors (e.g. answer submission after timeout).
- `429 Too Many Requests`: rate limits reached.
- `500 Internal Server Error`: unexpected issues (logged with correlation ID).

## Versioning & deprecation policy

- Minor changes (new optional fields) indicated via `X-API-Warnings` header.
- Breaking changes require bump to `/api/v2` with parallel support for at least one release cycle.
- OpenAPI spec published at `/api/docs` and stored alongside code for CI schema validation.

## Pagination & filtering

- Default pagination uses `?page=1&limit=20` with `X-Total-Count` header.
- Cursor-based pagination available for leaderboards via `?cursor=rank:42` for scalability.
- Filter parameters support `?status=available` or `?moduleId=` etc.

## Rate limiting

- Auth endpoints: 5 attempts/minute per IP.
- Lesson submissions: 60/minute per user to prevent spam.
- Admin writes: 120/hour per admin to avoid accidental loops.

## Monitoring

- Every request logs correlation ID, user ID, latency.
- Prometheus metrics: `http_request_duration_seconds`, `lesson_attempts_total`, `xp_awarded_total`.
- Alerts trigger when error rate > 2% or queue backlog grows beyond threshold.

