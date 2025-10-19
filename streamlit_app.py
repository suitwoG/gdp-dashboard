import json
import sqlite3
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional

import bcrypt
import streamlit as st

APP_TITLE = "Lex Moscua"
DB_PATH = Path(__file__).parent / "data" / "lex_moscua.db"
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

st.set_page_config(
    page_title=f"{APP_TITLE} • Геймифицированное обучение праву",
    page_icon="⚖️",
    layout="wide",
)


# -----------------------------------------------------------------------------
# Database utilities
# -----------------------------------------------------------------------------


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_connection()
    with conn:
        conn.executescript(
            """
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                display_name TEXT NOT NULL,
                password_hash BLOB NOT NULL,
                role TEXT DEFAULT 'learner',
                xp INTEGER DEFAULT 0,
                coins INTEGER DEFAULT 0,
                streak INTEGER DEFAULT 0,
                best_streak INTEGER DEFAULT 0,
                last_activity DATE,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                slug TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                icon TEXT DEFAULT '📚',
                difficulty TEXT DEFAULT 'Начальный',
                is_active INTEGER DEFAULT 1
            );

            CREATE TABLE IF NOT EXISTS modules (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
                title TEXT NOT NULL,
                description TEXT,
                order_index INTEGER NOT NULL,
                reward_coins INTEGER DEFAULT 75,
                reward_badge TEXT
            );

            CREATE TABLE IF NOT EXISTS lessons (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
                title TEXT NOT NULL,
                summary TEXT,
                theory TEXT,
                order_index INTEGER NOT NULL,
                xp_reward INTEGER DEFAULT 15,
                question TEXT,
                question_data TEXT
            );

            CREATE TABLE IF NOT EXISTS user_lessons (
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
                status TEXT NOT NULL,
                best_score INTEGER DEFAULT 0,
                completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, lesson_id)
            );

            CREATE TABLE IF NOT EXISTS user_daily (
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                activity_date DATE NOT NULL,
                xp_earned INTEGER DEFAULT 0,
                lessons_completed INTEGER DEFAULT 0,
                PRIMARY KEY (user_id, activity_date)
            );

            CREATE TABLE IF NOT EXISTS shop_items (
                item_key TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                cost INTEGER NOT NULL,
                benefit TEXT
            );

            CREATE TABLE IF NOT EXISTS purchases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                item_key TEXT NOT NULL REFERENCES shop_items(item_key),
                purchased_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS achievements (
                achievement_key TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                xp_reward INTEGER DEFAULT 25
            );

            CREATE TABLE IF NOT EXISTS user_achievements (
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                achievement_key TEXT NOT NULL REFERENCES achievements(achievement_key) ON DELETE CASCADE,
                unlocked_at TEXT DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, achievement_key)
            );
            """
        )
    conn.close()

def seed_initial_data() -> None:
    conn = get_connection()
    with conn:
        existing_courses = conn.execute("SELECT COUNT(*) FROM courses").fetchone()[0]
        if existing_courses:
            conn.close()
            return

        courses_payload = [
            {
                "slug": "legal-theory",
                "title": "Теория права",
                "description": "Основные понятия и источники российского права.",
                "icon": "📘",
                "difficulty": "Начальный",
                "modules": [
                    {
                        "title": "Основы правовой системы",
                        "description": "Учим базовые принципы права и его роль в обществе.",
                        "lessons": [
                            {
                                "title": "Что такое право?",
                                "summary": "Сущность права и его отличия от морали.",
                                "theory": """Право — система общеобязательных норм поведения, установленных или
санкционированных государством. Норма права закреплена в официальных источниках и
подкрепляется мерами государственного принуждения.""",
                                "xp": 20,
                                "question": "Какое определение лучше всего раскрывает понятие права?",
                                "options": [
                                    "Совокупность исторически сложившихся обычаев",
                                    "Система общеобязательных правил, обеспеченных государственным принуждением",
                                    "Локальные корпоративные инструкции",
                                    "Собрание моральных принципов"
                                ],
                                "answer": 1,
                                "explanation": "Право обязательно для всех и обеспечивается государственными санкциями.",
                            },
                            {
                                "title": "Отрасли права",
                                "summary": "Какие отрасли выделяют и по какому признаку.",
                                "theory": """Отрасль права — совокупность норм, регулирующих однородную сферу общественных
отношений. Критерий деления — предмет правового регулирования и метод воздействия.
Например, гражданское право регулирует имущественные отношения, уголовное — вопросы
преступлений и наказаний.""",
                                "xp": 18,
                                "question": "Что является главным критерием выделения отрасли права?",
                                "options": [
                                    "Количество нормативных актов",
                                    "Предмет и метод правового регулирования",
                                    "Степень ответственности",
                                    "Исторический период принятия законов"
                                ],
                                "answer": 1,
                                "explanation": "Именно предмет и метод регулирования отличают одну отрасль от другой.",
                            },
                        ],
                        "reward_badge": "База права",
                    },
                    {
                        "title": "Источники права",
                        "description": "Разбираем законы, подзаконные акты и правовые обычаи.",
                        "lessons": [
                            {
                                "title": "Нормативные акты",
                                "summary": "Иерархия нормативных правовых актов.",
                                "theory": """Конституция имеет высшую юридическую силу. Ниже — федеральные конституционные и
федеральные законы, указы президента, постановления правительства, акты министерств.
Иерархия важна: акт нижестоящего уровня не может противоречить высшему.""",
                                "xp": 22,
                                "question": "Какой документ обладает высшей юридической силой в России?",
                                "options": [
                                    "Федеральный закон",
                                    "Постановление Правительства",
                                    "Конституция РФ",
                                    "Указ Президента"
                                ],
                                "answer": 2,
                                "explanation": "Конституция — основа правовой системы, остальные акты должны ей соответствовать.",
                            },
                            {
                                "title": "Правовой обычай",
                                "summary": "Когда обычай приобретает силу права.",
                                "theory": """Правовой обычай — правило поведения, сложившееся исторически и признанное
государством обязательным. Он применяется, если закон прямо отсылает к обычаю или
если нет подходящей нормы, а обычай не противоречит законодательству.""",
                                "xp": 25,
                                "question": "В каком случае правовой обычай применяют в современной России?",
                                "options": [
                                    "Когда его поддерживает большинство граждан",
                                    "Когда отсутствует регулирование и обычай признан государством",
                                    "Во всех отношениях, связанных с предпринимательством",
                                    "Правовые обычаи не признаются"
                                ],
                                "answer": 1,
                                "explanation": "Обычай используется субсидиарно, если он официально признан и не противоречит закону.",
                            },
                        ],
                        "reward_badge": "Знаток источников",
                    },
                ],
            },
            {
                "slug": "constitutional-law",
                "title": "Конституционное право",
                "description": "Права человека, устройство государства и функции органов власти.",
                "icon": "🏛️",
                "difficulty": "Средний",
                "modules": [
                    {
                        "title": "Основы конституционного строя",
                        "description": "Фундаментальные принципы Конституции РФ.",
                        "lessons": [
                            {
                                "title": "Принципы строя",
                                "summary": "Народовластие, разделение властей, федерализм.",
                                "theory": """Принципы конституционного строя закреплены в главе 1 Конституции.
Народовластие означает, что власть принадлежит народу и осуществляется им непосредственно или
через органы власти. Разделение властей — распределение полномочий между законодательной,
исполнительной и судебной ветвями.""",
                                "xp": 20,
                                "question": "Какой принцип отражает принадлежность власти народу?",
                                "options": [
                                    "Федерализм",
                                    "Народовластие",
                                    "Идеологическое многообразие",
                                    "Социальное государство"
                                ],
                                "answer": 1,
                                "explanation": "Народовластие закрепляет источник власти — многонациональный народ РФ.",
                            },
                            {
                                "title": "Конституционная законность",
                                "summary": "Какие механизмы защищают верховенство Конституции.",
                                "theory": """Верховенство Конституции обеспечивают конституционный контроль, судебная система и
обязанность органов власти соблюдать Основной закон. Особая роль у Конституционного Суда,
который проверяет нормативные акты на соответствие Конституции.""",
                                "xp": 24,
                                "question": "Какой орган осуществляет конституционный контроль в России?",
                                "options": [
                                    "Совет Федерации",
                                    "Государственная Дума",
                                    "Конституционный Суд РФ",
                                    "Счётная палата"
                                ],
                                "answer": 2,
                                "explanation": "Конституционный Суд рассматривает дела о соответствии актов Конституции.",
                            },
                        ],
                        "reward_badge": "Страж Конституции",
                    },
                    {
                        "title": "Права и свободы человека",
                        "description": "Классификация прав и механизмы их защиты.",
                        "lessons": [
                            {
                                "title": "Личные права",
                                "summary": "Неотъемлемые права личности и способы их защиты.",
                                "theory": """Личные права — право на жизнь, достоинство личности, неприкосновенность частной
жизни, тайну переписки и др. Ограничения возможны только законом и должны быть необходимы
для защиты конституционных ценностей.""",
                                "xp": 23,
                                "question": "Какое право относится к личным?",
                                "options": [
                                    "Право избирать и быть избранным",
                                    "Право на охрану здоровья",
                                    "Право на тайну переписки",
                                    "Право на труд"
                                ],
                                "answer": 2,
                                "explanation": "Тайна переписки относится к личным правам, защищающим частную сферу гражданина.",
                            },
                            {
                                "title": "Социальные права",
                                "summary": "Гарантии государства в социальной сфере.",
                                "theory": """Социальные права включают право на труд, отдых, социальное обеспечение,
образование и охрану здоровья. Их реализация требует активных действий государства.""",
                                "xp": 26,
                                "question": "Какое из перечисленных является социальным правом?",
                                "options": [
                                    "Право на свободу слова",
                                    "Право на охрану здоровья",
                                    "Право на неприкосновенность жилища",
                                    "Право на судебную защиту"
                                ],
                                "answer": 1,
                                "explanation": "Право на охрану здоровья входит в группу социальных прав.",
                            },
                        ],
                        "reward_badge": "Адвокат прав человека",
                    },
                ],
            },
        ]

        for course in courses_payload:
            cursor = conn.execute(
                """
                INSERT INTO courses (slug, title, description, icon, difficulty)
                VALUES (?, ?, ?, ?, ?)
                """,
                (course["slug"], course["title"], course["description"], course["icon"], course["difficulty"]),
            )
            course_id = cursor.lastrowid

            for module_index, module in enumerate(course["modules"], start=1):
                cursor = conn.execute(
                    """
                    INSERT INTO modules (course_id, title, description, order_index, reward_badge)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (course_id, module["title"], module["description"], module_index, module.get("reward_badge")),
                )
                module_id = cursor.lastrowid

                for lesson_index, lesson in enumerate(module["lessons"], start=1):
                    conn.execute(
                        """
                        INSERT INTO lessons (
                            module_id, title, summary, theory, order_index, xp_reward, question, question_data
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        """,
                        (
                            module_id,
                            lesson["title"],
                            lesson["summary"],
                            lesson["theory"],
                            lesson_index,
                            lesson["xp"],
                            lesson["question"],
                            json.dumps({
                                "options": lesson["options"],
                                "answer": lesson["answer"],
                                "explanation": lesson["explanation"],
                            }),
                        ),
                    )

        conn.executemany(
            """
            INSERT INTO shop_items (item_key, title, description, cost, benefit)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(item_key) DO NOTHING
            """,
            [
                ("extra_life", "Дополнительная попытка", "Ещё один шанс при ошибке", 120, "Можно пересдать урок без потери серии"),
                ("xp_boost", "Ускоритель XP", "Удваивает опыт за следующий урок", 200, "Действует на один урок"),
                ("lex_avatar", "Тога наставника", "Особый наряд для талисмана", 150, "Косметическое улучшение"),
            ],
        )

        conn.executemany(
            """
            INSERT INTO achievements (achievement_key, title, description, xp_reward)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(achievement_key) DO NOTHING
            """,
            [
                ("first_lesson", "Первые шаги", "Пройдите первый урок", 40),
                ("perfect_module", "Мастер модуля", "Пройдите модуль без ошибок", 70),
                ("streak_3", "На волне", "Держите серию из трёх дней", 60),
            ],
        )

        if not conn.execute("SELECT 1 FROM users WHERE email = ?", ("admin@lexmoscua.ru",)).fetchone():
            password_hash = bcrypt.hashpw("LexAdmin2024!".encode(), bcrypt.gensalt())
            conn.execute(
                """
                INSERT INTO users (email, display_name, password_hash, role, coins)
                VALUES (?, ?, ?, 'admin', 500)
                """,
                ("admin@lexmoscua.ru", "Lex Admin", password_hash),
            )
    conn.close()

def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())


def verify_password(password: str, password_hash: bytes) -> bool:
    try:
        return bcrypt.checkpw(password.encode(), password_hash)
    except ValueError:
        return False


def register_user(email: str, name: str, password: str) -> Optional[str]:
    conn = get_connection()
    with conn:
        existing = conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
        if existing:
            conn.close()
            return "Пользователь с таким email уже зарегистрирован"
        conn.execute(
            """
            INSERT INTO users (email, display_name, password_hash, role, coins)
            VALUES (?, ?, ?, 'learner', 200)
            """,
            (email, name, hash_password(password)),
        )
    conn.close()
    return None


def authenticate_user(email: str, password: str) -> Optional[sqlite3.Row]:
    conn = get_connection()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    conn.close()
    if not user:
        return None
    if verify_password(password, user["password_hash"]):
        return user
    return None

def get_user(user_id: int) -> Optional[sqlite3.Row]:
    conn = get_connection()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    return user


def get_courses() -> List[sqlite3.Row]:
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM courses WHERE is_active = 1 ORDER BY id"
    ).fetchall()
    conn.close()
    return rows


def get_course_overview(user_id: int, course_id: int) -> Dict[str, int]:
    conn = get_connection()
    row = conn.execute(
        """
        SELECT
            SUM(CASE WHEN ul.status IS NOT NULL THEN 1 ELSE 0 END) AS completed,
            SUM(CASE WHEN ul.status = 'mastered' THEN 1 ELSE 0 END) AS mastered,
            COUNT(l.id) AS total
        FROM lessons l
        LEFT JOIN user_lessons ul ON ul.lesson_id = l.id AND ul.user_id = ?
        WHERE l.module_id IN (SELECT id FROM modules WHERE course_id = ?)
        """,
        (user_id, course_id),
    ).fetchone()
    conn.close()
    return {
        "completed": row["completed"] or 0,
        "mastered": row["mastered"] or 0,
        "total": row["total"] or 0,
    }


def get_modules(course_id: int) -> List[sqlite3.Row]:
    conn = get_connection()
    rows = conn.execute(
        """
        SELECT m.*, COUNT(l.id) AS lessons_total
        FROM modules m
        LEFT JOIN lessons l ON l.module_id = m.id
        WHERE m.course_id = ?
        GROUP BY m.id
        ORDER BY m.order_index
        """,
        (course_id,),
    ).fetchall()
    conn.close()
    return rows


def get_module_lessons(module_id: int) -> List[sqlite3.Row]:
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM lessons WHERE module_id = ? ORDER BY order_index",
        (module_id,),
    ).fetchall()
    conn.close()
    return rows


def get_lesson(lesson_id: int) -> Optional[sqlite3.Row]:
    conn = get_connection()
    row = conn.execute("SELECT * FROM lessons WHERE id = ?", (lesson_id,)).fetchone()
    conn.close()
    return row


def get_lesson_status(user_id: int, lesson_id: int) -> Optional[str]:
    conn = get_connection()
    row = conn.execute(
        "SELECT status FROM user_lessons WHERE user_id = ? AND lesson_id = ?",
        (user_id, lesson_id),
    ).fetchone()
    conn.close()
    return row["status"] if row else None


def get_previous_lesson_id(lesson_id: int) -> Optional[int]:
    conn = get_connection()
    row = conn.execute(
        """
        SELECT l2.id
        FROM lessons l1
        JOIN lessons l2 ON l2.module_id = l1.module_id AND l2.order_index = l1.order_index - 1
        WHERE l1.id = ?
        """,
        (lesson_id,),
    ).fetchone()
    if row:
        conn.close()
        return row[0]

    row = conn.execute(
        """
        SELECT l.id
        FROM lessons l
        JOIN modules m ON m.id = l.module_id
        WHERE m.course_id = (
            SELECT course_id FROM modules WHERE id = (
                SELECT module_id FROM lessons WHERE id = ?
            )
        )
        AND m.order_index = (
            SELECT m.order_index - 1
            FROM lessons l2
            JOIN modules m ON m.id = l2.module_id
            WHERE l2.id = ?
        )
        ORDER BY l.order_index DESC
        LIMIT 1
        """,
        (lesson_id, lesson_id),
    ).fetchone()
    conn.close()
    return row[0] if row else None


def lesson_unlocked(user_id: int, lesson_id: int) -> bool:
    previous = get_previous_lesson_id(lesson_id)
    if not previous:
        return True
    return get_lesson_status(user_id, previous) is not None

def get_user_lessons(user_id: int) -> List[int]:
    conn = get_connection()
    rows = conn.execute(
        "SELECT lesson_id FROM user_lessons WHERE user_id = ?",
        (user_id,),
    ).fetchall()
    conn.close()
    return [row[0] for row in rows]


def get_module_by_lesson(lesson_id: int) -> Optional[sqlite3.Row]:
    conn = get_connection()
    row = conn.execute(
        """
        SELECT m.* FROM modules m
        JOIN lessons l ON l.module_id = m.id
        WHERE l.id = ?
        """,
        (lesson_id,),
    ).fetchone()
    conn.close()
    return row


def module_stats(user_id: int, module_id: int) -> Dict[str, int]:
    conn = get_connection()
    row = conn.execute(
        """
        SELECT
            SUM(CASE WHEN ul.status IS NOT NULL THEN 1 ELSE 0 END) AS completed,
            SUM(CASE WHEN ul.status = 'mastered' THEN 1 ELSE 0 END) AS mastered,
            COUNT(l.id) AS total
        FROM lessons l
        LEFT JOIN user_lessons ul ON ul.lesson_id = l.id AND ul.user_id = ?
        WHERE l.module_id = ?
        """,
        (user_id, module_id),
    ).fetchone()
    conn.close()
    return {
        "completed": row["completed"] or 0,
        "mastered": row["mastered"] or 0,
        "total": row["total"] or 0,
    }


def update_daily_activity(user_id: int, xp_gain: int) -> Dict[str, int]:
    today = date.today()
    today_str = today.isoformat()
    yesterday = (today - timedelta(days=1)).isoformat()

    conn = get_connection()
    with conn:
        row = conn.execute(
            "SELECT xp_earned, lessons_completed FROM user_daily WHERE user_id = ? AND activity_date = ?",
            (user_id, today_str),
        ).fetchone()
        if row:
            conn.execute(
                """
                UPDATE user_daily
                SET xp_earned = xp_earned + ?, lessons_completed = lessons_completed + 1
                WHERE user_id = ? AND activity_date = ?
                """,
                (xp_gain, user_id, today_str),
            )
        else:
            conn.execute(
                """
                INSERT INTO user_daily (user_id, activity_date, xp_earned, lessons_completed)
                VALUES (?, ?, ?, 1)
                """,
                (user_id, today_str, xp_gain),
            )

        user = conn.execute(
            "SELECT streak, best_streak, last_activity FROM users WHERE id = ?",
            (user_id,),
        ).fetchone()
        streak = user["streak"] or 0
        best = user["best_streak"] or 0
        last = user["last_activity"]

        if last == yesterday:
            streak += 1
        elif last == today_str:
            streak = streak
        else:
            streak = 1

        best = max(best, streak)
        conn.execute(
            """
            UPDATE users SET xp = xp + ?, coins = coins + 15, streak = ?, best_streak = ?, last_activity = ?
            WHERE id = ?
            """,
            (xp_gain, streak, best, today_str, user_id),
        )
    conn.close()
    return {"streak": streak, "best": best}


def mark_lesson_completion(user_id: int, lesson: sqlite3.Row, mastered: bool) -> Dict[str, int]:
    status = "mastered" if mastered else "completed"
    conn = get_connection()
    with conn:
        conn.execute(
            """
            INSERT INTO user_lessons (user_id, lesson_id, status, best_score)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(user_id, lesson_id) DO UPDATE SET status = excluded.status, best_score = MAX(best_score, excluded.best_score), completed_at = CURRENT_TIMESTAMP
            """,
            (user_id, lesson["id"], status, 100 if mastered else 70),
        )
    conn.close()
    xp_gain = lesson["xp_reward"] if mastered else lesson["xp_reward"] // 2
    return update_daily_activity(user_id, xp_gain)


def unlock_module_reward(user_id: int, module_row: sqlite3.Row) -> Optional[str]:
    stats = module_stats(user_id, module_row["id"])
    if not stats["total"] or stats["completed"] < stats["total"]:
        return None

    conn = get_connection()
    with conn:
        key = f"module_reward_{module_row['id']}"
        already = conn.execute(
            "SELECT 1 FROM purchases WHERE user_id = ? AND item_key = ?",
            (user_id, key),
        ).fetchone()
        if already:
            conn.close()
            return None
        conn.execute(
            "INSERT INTO purchases (user_id, item_key) VALUES (?, ?)",
            (user_id, key),
        )
        conn.execute(
            "UPDATE users SET coins = coins + ? WHERE id = ?",
            (module_row["reward_coins"] or 100, user_id),
        )
    conn.close()
    return module_row["reward_badge"]


def unlock_achievement(user_id: int, key: str) -> Optional[sqlite3.Row]:
    conn = get_connection()
    with conn:
        exists = conn.execute(
            "SELECT 1 FROM user_achievements WHERE user_id = ? AND achievement_key = ?",
            (user_id, key),
        ).fetchone()
        if exists:
            conn.close()
            return None
        achievement = conn.execute(
            "SELECT * FROM achievements WHERE achievement_key = ?",
            (key,),
        ).fetchone()
        if not achievement:
            conn.close()
            return None
        conn.execute(
            "INSERT INTO user_achievements (user_id, achievement_key) VALUES (?, ?)",
            (user_id, key),
        )
        conn.execute(
            "UPDATE users SET xp = xp + ? WHERE id = ?",
            (achievement["xp_reward"], user_id),
        )
    conn.close()
    return achievement


def evaluate_achievements(user_id: int, lesson: sqlite3.Row, mastered: bool, streak_info: Dict[str, int]) -> List[sqlite3.Row]:
    unlocked: List[sqlite3.Row] = []
    if len(get_user_lessons(user_id)) == 1:
        ach = unlock_achievement(user_id, "first_lesson")
        if ach:
            unlocked.append(ach)

    module = get_module_by_lesson(lesson["id"])
    if module:
        reward = unlock_module_reward(user_id, module)
        if mastered and reward:
            ach = unlock_achievement(user_id, "perfect_module")
            if ach:
                unlocked.append(ach)

    if streak_info["streak"] >= 3:
        ach = unlock_achievement(user_id, "streak_3")
        if ach:
            unlocked.append(ach)

    return unlocked


def get_daily_goal_status(user_id: int) -> Dict[str, int]:
    conn = get_connection()
    today = date.today().isoformat()
    row = conn.execute(
        "SELECT xp_earned, lessons_completed FROM user_daily WHERE user_id = ? AND activity_date = ?",
        (user_id, today),
    ).fetchone()
    conn.close()
    return {
        "xp": row["xp_earned"] if row else 0,
        "lessons": row["lessons_completed"] if row else 0,
    }


def get_leaderboard(limit: int = 10) -> List[sqlite3.Row]:
    conn = get_connection()
    rows = conn.execute(
        "SELECT display_name, xp, best_streak FROM users ORDER BY xp DESC, best_streak DESC LIMIT ?",
        (limit,),
    ).fetchall()
    conn.close()
    return rows


def get_shop_items() -> List[sqlite3.Row]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM shop_items ORDER BY cost").fetchall()
    conn.close()
    return rows


def purchase_item(user_id: int, item_key: str) -> Optional[str]:
    conn = get_connection()
    with conn:
        user = conn.execute("SELECT coins FROM users WHERE id = ?", (user_id,)).fetchone()
        item = conn.execute("SELECT * FROM shop_items WHERE item_key = ?", (item_key,)).fetchone()
        if not item:
            conn.close()
            return "Товар не найден"
        if user["coins"] < item["cost"]:
            conn.close()
            return "Недостаточно монет"
        conn.execute("UPDATE users SET coins = coins - ? WHERE id = ?", (item["cost"], user_id))
        conn.execute(
            "INSERT INTO purchases (user_id, item_key) VALUES (?, ?)",
            (user_id, item_key),
        )
    conn.close()
    return None


def list_user_purchases(user_id: int) -> List[sqlite3.Row]:
    conn = get_connection()
    rows = conn.execute(
        """
        SELECT si.title, si.description, p.purchased_at
        FROM purchases p
        JOIN shop_items si ON si.item_key = p.item_key
        WHERE p.user_id = ? AND p.item_key NOT LIKE 'module_reward_%'
        ORDER BY p.purchased_at DESC
        """,
        (user_id,),
    ).fetchall()
    conn.close()
    return rows


def list_user_achievements(user_id: int) -> List[sqlite3.Row]:
    conn = get_connection()
    rows = conn.execute(
        """
        SELECT a.title, a.description, ua.unlocked_at
        FROM user_achievements ua
        JOIN achievements a ON a.achievement_key = ua.achievement_key
        WHERE ua.user_id = ?
        ORDER BY ua.unlocked_at DESC
        """,
        (user_id,),
    ).fetchall()
    conn.close()
    return rows

# -----------------------------------------------------------------------------
# UI helpers
# -----------------------------------------------------------------------------


def toast(message: str, success: bool = True) -> None:
    if success:
        st.success(message)
    else:
        st.error(message)


def render_auth() -> None:
    tab_login, tab_register = st.tabs(["Вход", "Регистрация"])

    with tab_login:
        st.subheader("Добро пожаловать в Lex Moscua")
        email = st.text_input("Email", key="login_email")
        password = st.text_input("Пароль", type="password", key="login_password")
        if st.button("Войти", type="primary"):
            user = authenticate_user(email.lower(), password)
            if user:
                st.session_state["user_id"] = user["id"]
                st.session_state.pop("lesson_id", None)
                st.experimental_rerun()
            else:
                toast("Неверный email или пароль", success=False)

    with tab_register:
        st.subheader("Создать аккаунт")
        reg_email = st.text_input("Email", key="register_email")
        reg_name = st.text_input("Имя", key="register_name")
        reg_password = st.text_input("Пароль", type="password", key="register_password")
        reg_repeat = st.text_input("Повторите пароль", type="password", key="register_repeat")
        if st.button("Зарегистрироваться", type="primary"):
            if reg_password != reg_repeat:
                toast("Пароли не совпадают", success=False)
            elif len(reg_password) < 8:
                toast("Пароль должен быть не короче 8 символов", success=False)
            else:
                error = register_user(reg_email.lower(), reg_name.strip(), reg_password)
                if error:
                    toast(error, success=False)
                else:
                    toast("Аккаунт создан! Теперь можно войти.")


def render_sidebar(user: sqlite3.Row, current_page: str) -> str:
    with st.sidebar:
        st.markdown("## ⚖️ Lex Moscua")
        st.markdown(f"**{user['display_name']}**")
        st.metric("Опыт", f"{user['xp']} XP")
        st.metric("Монеты", user["coins"])
        st.metric("Серия", f"{user['streak']} дней")

        pages = ["Учёба", "Ежедневные цели", "Лиги", "Магазин", "Профиль"]
        if user["role"] == "admin":
            pages.append("Администрирование")

        choice = st.radio("Навигация", pages, index=pages.index(current_page) if current_page in pages else 0)

        if st.button("Выйти"):
            st.session_state.clear()
            st.experimental_rerun()
    return choice


def render_course_selector(user: sqlite3.Row) -> Optional[int]:
    courses = get_courses()
    if not courses:
        st.info("Курсы пока не добавлены")
        return None

    titles = [f"{course['icon']} {course['title']}" for course in courses]
    stored = st.session_state.get("course_id", courses[0]["id"])
    default_index = next((i for i, course in enumerate(courses) if course["id"] == stored), 0)

    selected_title = st.selectbox("Выберите дисциплину", titles, index=default_index)
    selected_course = courses[titles.index(selected_title)]
    st.session_state["course_id"] = selected_course["id"]

    overview = get_course_overview(user["id"], selected_course["id"])
    st.progress(overview["completed"] / overview["total"] if overview["total"] else 0)
    st.caption(
        f"Пройдено уроков: {overview['completed']} из {overview['total']} • С отличием: {overview['mastered']}"
    )
    return selected_course["id"]


def render_lesson_card(user: sqlite3.Row, lesson: sqlite3.Row, unlocked: bool) -> None:
    status = get_lesson_status(user["id"], lesson["id"])
    icon = "📘"
    label = "Новый"
    if status == "completed":
        icon = "✅"
        label = "Пройден"
    elif status == "mastered":
        icon = "⭐"
        label = "С отличием"
    elif not unlocked:
        icon = "🔒"
        label = "Закрыт"

    with st.container(border=True):
        st.markdown(f"#### {icon} {lesson['title']}")
        st.caption(lesson["summary"])
        st.text(f"Награда: {lesson['xp_reward']} XP")
        st.markdown(f"**Статус:** {label}")
        if unlocked:
            if st.button("Перейти", key=f"lesson_{lesson['id']}"):
                st.session_state["lesson_id"] = lesson["id"]
                st.experimental_rerun()
        else:
            st.button("Заблокировано", key=f"locked_{lesson['id']}", disabled=True)

def render_learning_path(user: sqlite3.Row) -> None:
    course_id = render_course_selector(user)
    if not course_id:
        return

    modules = get_modules(course_id)
    lesson_to_open = st.session_state.get("lesson_id")
    target_lesson: Optional[sqlite3.Row] = None

    for module in modules:
        st.divider()
        st.subheader(module["title"])
        st.caption(module["description"])
        stats = module_stats(user["id"], module["id"])
        st.progress(stats["completed"] / stats["total"] if stats["total"] else 0)

        lessons = get_module_lessons(module["id"])
        cols = st.columns(2)
        for idx, lesson in enumerate(lessons):
            unlocked = lesson_unlocked(user["id"], lesson["id"])
            with cols[idx % 2]:
                render_lesson_card(user, lesson, unlocked)
            if lesson_to_open == lesson["id"]:
                target_lesson = lesson

    if target_lesson:
        st.divider()
        render_lesson_view(user, target_lesson)


def render_question_block(lesson: sqlite3.Row) -> Dict[str, Optional[bool]]:
    st.markdown("### Викторина")
    question_data = json.loads(lesson["question_data"] or "{}")
    options = question_data.get("options", [])
    answer_index = question_data.get("answer")
    explanation = question_data.get("explanation")

    st.write(lesson["question"])
    choice = st.radio("Выберите ответ", options, key=f"answer_{lesson['id']}")
    submitted = st.button("Отправить", type="primary", key=f"submit_{lesson['id']}")
    if not submitted:
        return {"submitted": False, "correct": None, "explanation": explanation}

    try:
        selected_index = options.index(choice)
    except ValueError:
        selected_index = -1

    return {
        "submitted": True,
        "correct": selected_index == answer_index,
        "explanation": explanation,
    }


def render_lesson_view(user: sqlite3.Row, lesson: sqlite3.Row) -> None:
    st.markdown(f"## {lesson['title']}")
    st.info(lesson["theory"], icon="📖")

    result = render_question_block(lesson)
    if not result["submitted"]:
        return

    mastered = bool(result["correct"])
    streak_info = mark_lesson_completion(user["id"], lesson, mastered)
    achievements = evaluate_achievements(user["id"], lesson, mastered, streak_info)

    if mastered:
        st.success("Отлично! Вы справились с уроком.")
        st.balloons()
    else:
        st.error("Ответ неверный. Награда уменьшена, но вы всё равно продвинулись.")
        if result.get("explanation"):
            st.info(f"Подсказка: {result['explanation']}")

    if achievements:
        with st.expander("Полученные достижения"):
            for ach in achievements:
                st.write(f"🏆 {ach['title']} — {ach['description']} (+{ach['xp_reward']} XP)")

    st.session_state.pop("lesson_id", None)
    st.experimental_rerun()


def render_daily_goals(user: sqlite3.Row) -> None:
    st.subheader("Ежедневные задачи")
    status = get_daily_goal_status(user["id"])
    progress = min(status["lessons"], 1)
    st.progress(progress)
    if status["lessons"] >= 1:
        st.success("Цель выполнена! Серия продолжается")
    else:
        st.warning("Пройдите сегодня хотя бы один урок, чтобы удержать серию")

    col1, col2 = st.columns(2)
    col1.metric("Уроков сегодня", status["lessons"])
    col2.metric("Заработано XP", status["xp"])

    st.subheader("Достижения")
    achievements = list_user_achievements(user["id"])
    if achievements:
        for ach in achievements:
            st.markdown(f"- **{ach['title']}** ({ach['unlocked_at']}): {ach['description']}")
    else:
        st.info("Пока нет достижений — начните с первого урока!")


def render_leagues(user: sqlite3.Row) -> None:
    st.subheader("Лиги Lex Moscua")
    leaderboard = get_leaderboard()
    st.table(
        {
            "Участник": [row["display_name"] for row in leaderboard],
            "Опыт": [row["xp"] for row in leaderboard],
            "Лучшая серия": [row["best_streak"] for row in leaderboard],
        }
    )
    st.info("Еженедельные лиги формируются по количеству опыта. Старайтесь удержаться в топе!")


def render_shop(user: sqlite3.Row) -> None:
    st.subheader("Магазин наград")
    items = get_shop_items()
    cols = st.columns(3)
    for idx, item in enumerate(items):
        with cols[idx % 3]:
            st.markdown(f"#### {item['title']}")
            st.caption(item["description"])
            st.text(f"Цена: {item['cost']} монет")
            if st.button("Купить", key=f"buy_{item['item_key']}"):
                error = purchase_item(user["id"], item["item_key"])
                if error:
                    toast(error, success=False)
                else:
                    toast("Покупка успешно совершена")
                    st.experimental_rerun()

    purchases = list_user_purchases(user["id"])
    if purchases:
        st.divider()
        st.subheader("Мои предметы")
        for purchase in purchases:
            st.markdown(f"- {purchase['title']} ({purchase['purchased_at']}): {purchase['description']}")


def render_profile(user: sqlite3.Row) -> None:
    st.subheader("Профиль")
    st.write(f"**Имя:** {user['display_name']}")
    st.write(f"**Email:** {user['email']}")
    st.write(f"**Роль:** {'Администратор' if user['role'] == 'admin' else 'Учащийся'}")
    st.metric("Всего опыта", user["xp"])
    st.metric("Монеты", user["coins"])
    st.metric("Текущая серия", user["streak"])
    st.metric("Лучшая серия", user["best_streak"])

    st.divider()
    st.subheader("Обновление профиля")
    new_name = st.text_input("Отображаемое имя", value=user["display_name"], key="profile_name")
    if st.button("Сохранить изменения"):
        conn = get_connection()
        with conn:
            conn.execute(
                "UPDATE users SET display_name = ? WHERE id = ?",
                (new_name.strip(), user["id"]),
            )
        conn.close()
        toast("Имя обновлено")
        st.experimental_rerun()


def render_admin(user: sqlite3.Row) -> None:
    st.subheader("Администрирование контента")
    st.info("Добавляйте новые курсы, модули и уроки через формы ниже.")

    tab_courses, tab_modules, tab_lessons = st.tabs(["Курсы", "Модули", "Уроки"])

    with tab_courses:
        st.markdown("### Новый курс")
        title = st.text_input("Название курса")
        slug = st.text_input("Системный идентификатор")
        description = st.text_area("Описание")
        icon = st.text_input("Иконка", value="⚖️")
        difficulty = st.selectbox("Уровень", ["Начальный", "Средний", "Продвинутый"])
        if st.button("Создать курс"):
            conn = get_connection()
            try:
                with conn:
                    conn.execute(
                        """
                        INSERT INTO courses (slug, title, description, icon, difficulty)
                        VALUES (?, ?, ?, ?, ?)
                        """,
                        (slug, title, description, icon, difficulty),
                    )
                toast("Курс добавлен")
            except sqlite3.IntegrityError:
                toast("Курс с таким идентификатором уже существует", success=False)
            finally:
                conn.close()

    with tab_modules:
        courses = get_courses()
        if not courses:
            st.warning("Сначала добавьте курс")
        else:
            course_map = {f"{course['title']} ({course['difficulty']})": course for course in courses}
            course_title = st.selectbox("Курс", list(course_map.keys()))
            selected_course = course_map[course_title]
            module_title = st.text_input("Название модуля")
            module_description = st.text_area("Описание модуля")
            order = st.number_input("Порядок", min_value=1, value=1, step=1)
            badge = st.text_input("Значок за модуль", value="Новый значок")
            reward = st.number_input("Награда монет", min_value=0, value=100, step=10)
            if st.button("Добавить модуль"):
                conn = get_connection()
                with conn:
                    conn.execute(
                        """
                        INSERT INTO modules (course_id, title, description, order_index, reward_badge, reward_coins)
                        VALUES (?, ?, ?, ?, ?, ?)
                        """,
                        (
                            selected_course["id"],
                            module_title,
                            module_description,
                            order,
                            badge,
                            reward,
                        ),
                    )
                conn.close()
                toast("Модуль создан")

    with tab_lessons:
        modules = []
        for course in get_courses():
            modules.extend(get_modules(course["id"]))
        if not modules:
            st.warning("Нет модулей — создайте их сначала")
        else:
            module_map = {f"{module['title']} ({module['id']})": module for module in modules}
            module_title = st.selectbox("Модуль", list(module_map.keys()))
            module = module_map[module_title]
            lesson_title = st.text_input("Название урока")
            lesson_summary = st.text_area("Краткое описание")
            lesson_theory = st.text_area("Теоретический материал")
            order = st.number_input("Порядок урока", min_value=1, value=1, step=1)
            xp_reward = st.number_input("XP за урок", min_value=5, value=20, step=5)
            question = st.text_area("Вопрос для проверки")
            options = st.text_area("Варианты ответа (каждый с новой строки)")
            answer_index = st.number_input("Номер правильного ответа", min_value=1, value=1, step=1)
            explanation = st.text_input("Пояснение к правильному ответу")
            if st.button("Создать урок"):
                choices = [opt.strip() for opt in options.splitlines() if opt.strip()]
                if answer_index < 1 or answer_index > len(choices):
                    toast("Неверный номер правильного ответа", success=False)
                else:
                    conn = get_connection()
                    with conn:
                        conn.execute(
                            """
                            INSERT INTO lessons (
                                module_id, title, summary, theory, order_index, xp_reward, question, question_data
                            )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                            """,
                            (
                                module["id"],
                                lesson_title,
                                lesson_summary,
                                lesson_theory,
                                order,
                                xp_reward,
                                question,
                                json.dumps(
                                    {
                                        "options": choices,
                                        "answer": answer_index - 1,
                                        "explanation": explanation,
                                    }
                                ),
                            ),
                        )
                    conn.close()
                    toast("Урок добавлен")

# -----------------------------------------------------------------------------
# Main application
# -----------------------------------------------------------------------------


def main() -> None:
    init_db()
    seed_initial_data()

    st.title("Lex Moscua — Академия права")
    st.caption("Геймифицированная платформа обучения юридическим дисциплинам")

    user_id = st.session_state.get("user_id")
    if not user_id:
        render_auth()
        return

    user = get_user(user_id)
    if not user:
        st.session_state.clear()
        render_auth()
        return

    page = st.session_state.get("page", "Учёба")
    page = render_sidebar(user, page)
    st.session_state["page"] = page

    if page == "Учёба":
        render_learning_path(user)
    elif page == "Ежедневные цели":
        render_daily_goals(user)
    elif page == "Лиги":
        render_leagues(user)
    elif page == "Магазин":
        render_shop(user)
    elif page == "Профиль":
        render_profile(user)
    elif page == "Администрирование" and user["role"] == "admin":
        render_admin(user)
    else:
        st.warning("У вас нет доступа к этой секции")


if __name__ == "__main__":
    main()
