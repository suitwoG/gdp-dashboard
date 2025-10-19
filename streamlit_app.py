import streamlit as st
from dataclasses import dataclass
from pathlib import Path
from typing import List, Literal

st.set_page_config(
    page_title="LEX MOSCUA — Skill Path",
    page_icon="🦬",
    layout="wide",
)

NodeKind = Literal["material", "lesson", "chest"]
NodeState = Literal["locked", "available", "not-passed", "done", "current"]


@dataclass
class SkillNode:
    id: str
    title: str
    kind: NodeKind
    state: NodeState


def load_svg(name: str) -> str:
    svg_path = Path(__file__).parent / "data" / "icons" / f"{name}.svg"
    if not svg_path.exists():
        return ""
    return svg_path.read_text(encoding="utf-8")


if "active_nav" not in st.session_state:
    st.session_state.active_nav = "learning"

if "active_node" not in st.session_state:
    st.session_state.active_node = "skill-2"

if "lesson" not in st.session_state:
    st.session_state.lesson = {
        "current": 0,
        "lives": 3,
        "xp": 0,
        "streak": 4,
        "answers": {},
        "completed": False,
    }

if "sound_muted" not in st.session_state:
    st.session_state.sound_muted = False


LESSON_QUESTIONS = [
    {
        "id": "q1",
        "prompt": "Выберите перевод слова «Москва».",
        "options": ["Moscow", "London", "Berlin", "Madrid"],
        "answer": "Moscow",
    },
    {
        "id": "q2",
        "prompt": "Как сказать «Спасибо» по-английски?",
        "options": ["Thanks", "Bitte", "Grazie", "Merci"],
        "answer": "Thanks",
    },
    {
        "id": "q3",
        "prompt": "Что означает «Book»?",
        "options": ["Книга", "Дом", "Дорога", "Мост"],
        "answer": "Книга",
    },
]


SKILL_NODES: List[SkillNode] = [
    SkillNode("skill-1", "Повторение", "material", "done"),
    SkillNode("skill-2", "Приветствия", "lesson", "current"),
    SkillNode("skill-3", "Жильё", "lesson", "available"),
    SkillNode("skill-4", "Путешествия", "lesson", "not-passed"),
    SkillNode("skill-5", "Чекпоинт", "chest", "available"),
    SkillNode("skill-6", "Профессии", "lesson", "locked"),
]


def reset_lesson():
    st.session_state.lesson = {
        "current": 0,
        "lives": 3,
        "xp": 0,
        "streak": 4,
        "answers": {},
        "completed": False,
    }


def toggle_sound():
    st.session_state.sound_muted = not st.session_state.sound_muted


def set_active_nav(target: str):
    st.session_state.active_nav = target


def select_node(node_id: str):
    node = next((item for item in SKILL_NODES if item.id == node_id), None)
    if not node:
        return
    if node.state == "locked":
        st.toast("Скилл ещё недоступен", icon="🚫")
        return
    st.session_state.active_node = node_id
    if node.kind == "lesson":
        reset_lesson()


def handle_answer(question_id: str, choice: str):
    lesson_state = st.session_state.lesson
    if lesson_state["completed"]:
        return
    question = LESSON_QUESTIONS[lesson_state["current"]]
    if question_id in lesson_state["answers"]:
        return

    correct = choice == question["answer"]
    lesson_state["answers"][question_id] = {
        "selected": choice,
        "correct": correct,
    }

    if correct:
        lesson_state["xp"] += 10
        lesson_state["streak"] += 1
        st.toast("Верно! +10 XP", icon="🎉")
    else:
        lesson_state["lives"] -= 1
        lesson_state["streak"] = 0
        st.toast("Неверно. Жизнь потеряна", icon="💔")

    if lesson_state["lives"] <= 0:
        lesson_state["completed"] = True
        st.toast("Урок завершён — нет жизней", icon="☠️")


def go_to_next_question():
    lesson_state = st.session_state.lesson
    if lesson_state["completed"]:
        return
    question = LESSON_QUESTIONS[lesson_state["current"]]
    if question["id"] not in lesson_state["answers"]:
        st.toast("Выберите ответ", icon="ℹ️")
        return
    if lesson_state["current"] >= len(LESSON_QUESTIONS) - 1:
        lesson_state["completed"] = True
        st.toast("Урок завершён!", icon="🏆")
        return
    lesson_state["current"] += 1


def render_styles():
    google_fonts = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
    st.markdown(
        f"""
        <style>
        @import url('{google_fonts}');
        :root {{
            --bg-base: #0B171A;
            --bg-panel: #0F1E22;
            --bg-muted: #1A2D33;
            --line: #24363B;
            --brand-red: #E11D2E;
            --brand-green: #35C422;
            --text-primary: #E6F0F3;
            --text-muted: #C7DAE0;
            --node-pass: #39C74A;
            --node-material: #2FB04D;
            --node-warn: #FFC91A;
            --node-lock: #2A3A3F;
            --prog-track: #1E3740;
            --prog-fill: #F6C41C;
        }}

        html, body, [class^="css"] {{
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-base) !important;
        }}

        .main .block-container {{
            padding: 0 32px 32px;
            max-width: 1400px;
        }}

        .lex-layout {{
            display: grid;
            grid-template-columns: 272px minmax(640px, 720px) 360px;
            gap: 24px;
            width: 100%;
            margin-top: 32px;
        }}

        .lex-panel {{
            background: var(--bg-panel);
            border: 1px solid #14282D;
            border-radius: 20px;
            padding: 24px;
            color: var(--text-primary);
            box-shadow: 0 12px 28px rgba(0,0,0,.35);
        }}

        .lex-sidebar {{
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #0F1E22;
            border-radius: 20px;
            padding: 24px;
            border: 1px solid #14282D;
        }}

        .lex-nav-item {{
            border-left: 3px solid transparent;
            border-radius: 16px;
        }}

        .lex-nav-item .stButton>button {{
            background: transparent;
            color: var(--text-muted);
            font-size: 16px;
            font-weight: 700;
            border-radius: 16px;
            border: none;
            padding: 12px 16px;
            text-align: left;
        }}

        .lex-nav-item .stButton>button:hover {{
            background: #10262B;
            color: var(--text-primary);
        }}

        .lex-nav-item.active {{
            border-left-color: var(--brand-red);
        }}

        .lex-nav-item.active .stButton>button {{
            background: #123136;
            color: var(--text-primary);
        }}

        .lex-top-counters {{
            display: flex;
            justify-content: flex-end;
            gap: 16px;
            padding-top: 32px;
        }}

        .lex-counter {{
            display: flex;
            align-items: center;
            gap: 8px;
            background: #0F1E22;
            border-radius: 16px;
            padding: 12px 16px;
            border: 1px solid #1D2E33;
            color: var(--text-primary);
            font-weight: 700;
        }}

        .lex-module-banner {{
            background: linear-gradient(135deg, #1F8C45, #31B04F);
            border-radius: 20px;
            padding: 24px 20px;
            color: #F2FFF5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
            box-shadow: 0 14px 30px rgba(30, 120, 70, 0.4);
        }}

        .lex-module-banner h2 {{
            margin: 0;
            font-size: 20px;
            font-weight: 700;
        }}

        .lex-module-banner p {{
            margin: 4px 0 0;
            font-size: 16px;
            font-weight: 600;
        }}

        .lex-skill-path {{
            position: relative;
            padding: 24px 0 80px;
        }}

        .lex-skill-path::before {{
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            background: var(--line);
        }}

        .lex-node-wrapper {{
            position: relative;
            margin: 0 auto 200px;
            width: 112px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }}

        .lex-node-wrapper .stButton {{
            width: 112px;
            height: 112px;
            margin: 0;
        }}

        .lex-node-wrapper .stButton>button {{
            width: 112px;
            height: 112px;
            border-radius: 56px;
            border: 6px solid rgba(0,0,0,0.35);
            box-shadow: 0 8px 16px rgba(0,0,0,.35), inset 0 4px 8px rgba(255,255,255,.06);
            background: linear-gradient(180deg, #FFD43B, #F6B51C);
            color: transparent;
            position: relative;
        }}

        .lex-node-wrapper[data-kind="material"] .stButton>button {{
            background: linear-gradient(180deg, #34C353, #249140);
        }}

        .lex-node-wrapper[data-state="done"] .stButton>button {{
            background: linear-gradient(180deg, #3FD155, #2EAD43);
            border-color: rgba(62, 230, 120, .45);
        }}

        .lex-node-wrapper[data-state="locked"] .stButton>button {{
            background: linear-gradient(180deg, #2A3A3F, #1B272B);
            border-color: rgba(10, 18, 21, .65);
            color: transparent;
            cursor: not-allowed;
        }}

        .lex-node-wrapper[data-kind="chest"] .stButton>button {{
            border-radius: 32px;
            height: 128px;
            background: linear-gradient(180deg, #FFD15C, #FFAF0F);
        }}

        .lex-node-wrapper[data-state="current"] .stButton>button {{
            box-shadow: 0 0 0 6px rgba(225,29,46,.35), 0 12px 24px rgba(0,0,0,.45);
        }}

        .lex-node-icon svg {{
            width: 44px;
            height: 44px;
        }}

        .lex-node-icon {{
            position: absolute;
            top: 34px;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
        }}

        .lex-node-title {{
            color: var(--text-muted);
            font-weight: 700;
            font-size: 14px;
            text-align: center;
            margin-top: 120px;
        }}

        .lex-module-banner .stButton>button {{
            background: rgba(15,30,34,0.35);
            color: #F2FFF5;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.15);
            font-weight: 700;
        }}

        .lex-module-banner .stButton>button:hover {{
            background: rgba(10,26,30,0.55);
        }}

        .lex-material .stButton>button {{
            background: var(--brand-red);
            color: white;
            border-radius: 14px;
            font-weight: 700;
            border: none;
            padding: 12px 18px;
        }}

        .lex-material .stButton:nth-child(2)>button {{
            background: #14282D;
            color: var(--text-muted);
        }}

        .lex-right-card {{
            background: #0F1E22;
            border-radius: 16px;
            border: 1px solid #1D2E33;
            padding: 24px;
            margin-bottom: 24px;
            color: var(--text-primary);
            box-shadow: 0 10px 26px rgba(0,0,0,.35);
        }}

        .lex-progress {{
            width: 100%;
            background: var(--prog-track);
            border-radius: 8px;
            height: 12px;
            position: relative;
            overflow: hidden;
        }}

        .lex-progress span {{
            display: block;
            height: 100%;
            background: var(--prog-fill);
            border-radius: 8px;
        }}

        .lex-mascot {{
            margin-top: 24px;
            display: flex;
            justify-content: center;
        }}

        .lex-mascot-shape {{
            width: 200px;
            height: 200px;
            background: radial-gradient(circle at 50% 40%, #FFE6A8, #F6C41C);
            border-radius: 48% 48% 45% 45% / 55% 55% 45% 45%;
            position: relative;
            box-shadow: 0 12px 24px rgba(0,0,0,.35);
            animation: float 3s ease-in-out infinite;
        }}

        .lex-mascot-face {{
            position: absolute;
            top: 58px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 80px;
        }}

        .lex-mascot-face .eye {{
            width: 24px;
            height: 24px;
            background: #2A2A2A;
            border-radius: 50%;
            position: absolute;
        }}

        .lex-mascot-face .eye::after {{
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            top: 5px;
            left: 5px;
        }}

        .lex-mascot-face .eye-left {{
            left: 18px;
        }}

        .lex-mascot-face .eye-right {{
            right: 18px;
        }}

        .lex-mascot-face .smile {{
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 70px;
            height: 40px;
            border: 6px solid #2A2A2A;
            border-top: none;
            border-radius: 0 0 90px 90px;
        }}

        @keyframes float {{
            0%, 100% {{ transform: translateY(0); }}
            50% {{ transform: translateY(-12px); }}
        }}

        .lex-lesson-card {{
            background: #0F1E22;
            border-radius: 16px;
            border: 1px solid #1D2E33;
            padding: 24px;
            color: var(--text-primary);
            box-shadow: 0 12px 32px rgba(0,0,0,.35);
        }}

        .lex-lesson-prompt {{
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 24px;
        }}

        .lex-material {{
            background: #0F1E22;
            border-radius: 16px;
            padding: 24px;
            border: 1px solid #1D2E33;
            color: var(--text-primary);
            box-shadow: 0 12px 32px rgba(0,0,0,.35);
        }}

        .lex-material h3 {{
            margin-top: 0;
            font-size: 20px;
            font-weight: 700;
        }}

        .lex-quest {{
            display: grid;
            grid-template-columns: 40px 1fr 48px;
            gap: 12px;
            align-items: center;
            margin-bottom: 20px;
        }}

        .lex-quest:last-child {{
            margin-bottom: 0;
        }}

        .lex-quest-icon {{
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: rgba(246,196,28,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #F6C41C;
            font-size: 18px;
        }}

        .lex-quest span {{
            font-size: 14px;
            color: var(--text-muted);
        }}

        .lex-button {{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 20px;
            border-radius: 14px;
            font-weight: 700;
            cursor: pointer;
            border: none;
        }}

        .lex-button.primary {{
            background: var(--brand-red);
            color: white;
        }}

        .lex-button.secondary {{
            background: #14282D;
            color: var(--text-muted);
        }}

        .lex-top-actions {{
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        .lex-mute-toggle {{
            padding: 8px 12px;
            border-radius: 12px;
            border: 1px solid #1D2E33;
            background: #0F1E22;
            color: var(--text-muted);
            cursor: pointer;
        }}

        </style>
        """,
        unsafe_allow_html=True,
    )


def render_top_counters():
    counters = [
        ("🇷🇺", "Русский → Английский"),
        ("❤️", "{}/3".format(st.session_state.lesson["lives"])),
        ("💰", "1520"),
        ("✨", f"XP {st.session_state.lesson['xp']}")
    ]
    items = "".join(
        f"<div class='lex-counter'><span class='lex-counter-icon'>{icon}</span><span>{label}</span></div>"
        for icon, label in counters
    )
    st.markdown(f"<div class='lex-top-counters'>{items}</div>", unsafe_allow_html=True)


def render_sidebar_nav():
    nav_items = [
        ("learning", "Обучение", "🛣"),
        ("practice", "Тренировка", "🎯"),
        ("leaderboard", "Рейтинги", "🏆"),
        ("quests", "Задания", "📋"),
        ("shop", "Магазин", "🛒"),
        ("profile", "Профиль", "👤"),
        ("more", "Ещё", "⋯"),
    ]
    st.markdown("<div class='lex-sidebar'>", unsafe_allow_html=True)
    for key, label, emoji in nav_items:
        active = "active" if st.session_state.active_nav == key else ""
        st.markdown(f"<div class='lex-nav-item {active}'>", unsafe_allow_html=True)
        if st.button(f"{emoji}  {label}", key=f"nav-{key}", use_container_width=True):
            set_active_nav(key)
        st.markdown("</div>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)


def render_module_banner():
    status = "выкл" if st.session_state.sound_muted else "вкл"
    st.markdown("<div class='lex-module-banner'>", unsafe_allow_html=True)
    left, right = st.columns([3, 2])
    with left:
        st.markdown("<h2>Модуль 3, Раздел 2</h2><p>Приветствия и вежливые фразы</p>", unsafe_allow_html=True)
    with right:
        col_a, col_b = st.columns([1, 1])
        with col_a:
            if st.button(f"🔈 Звук {status}", key="toggle-sound"):
                toggle_sound()
        with col_b:
            st.button("Справочник", key="open-handbook")
    st.markdown("</div>", unsafe_allow_html=True)


def render_skill_path():
    st.markdown("<div class='lex-skill-path'>", unsafe_allow_html=True)
    for node in SKILL_NODES:
        icon_name = {
            "material": "book",
            "lesson": "star" if node.state in {"not-passed", "available"} else "check",
            "chest": "chest",
        }[node.kind]
        if node.state == "locked":
            icon_name = "lock"
        svg = load_svg(icon_name)
        data_uri = svg.replace("\n", " ") if svg else ""
        st.markdown(
            f"<div class='lex-node-wrapper' data-kind='{node.kind}' data-state='{node.state}'>",
            unsafe_allow_html=True,
        )
        button_label = " "
        if st.button(button_label, key=f"node-{node.id}"):
            select_node(node.id)
        st.markdown(
            f"<div class='lex-node-icon'>{data_uri}</div><div class='lex-node-title'>{node.title}</div>",
            unsafe_allow_html=True,
        )
        st.markdown("</div>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)


def render_mascot():
    st.markdown(
        """
        <div class='lex-mascot'>
            <div class='lex-mascot-shape'>
                <div class='lex-mascot-face'>
                    <div class='eye eye-left'></div>
                    <div class='eye eye-right'></div>
                    <div class='smile'></div>
                </div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def render_material_view():
    st.markdown("<div class='lex-material'>", unsafe_allow_html=True)
    st.markdown(
        """
        <h3>Материал урока</h3>
        <p>🔥 Серия: 5 дней</p>
        <p>Сегодня вы изучите базовые приветствия и отработаете реакцию на знакомство.</p>
        <ul>
            <li>How are you? — Как дела?</li>
            <li>I am glad to see you — Рад вас видеть</li>
            <li>Have a great day — Хорошего дня</li>
        </ul>
        """,
        unsafe_allow_html=True,
    )
    col1, col2 = st.columns(2)
    with col1:
        if st.button("Перейти к уроку", key="material-to-lesson"):
            select_node("skill-2")
    with col2:
        st.button("К карте", key="material-to-map")
    st.markdown("</div>", unsafe_allow_html=True)


def render_question(question, answer_state):
    st.markdown(f"<div class='lex-lesson-prompt'>{question['prompt']}</div>", unsafe_allow_html=True)
    choice = st.radio(
        "", question["options"], key=f"radio-{question['id']}", label_visibility="collapsed"
    )
    if st.button("Проверить", key=f"check-{question['id']}"):
        handle_answer(question["id"], choice)
    if answer_state:
        feedback = "Верно!" if answer_state["correct"] else "Неверно"
        color = "#35C422" if answer_state["correct"] else "#E11D2E"
        st.markdown(
            f"<div style='margin-top:12px; font-weight:700; color:{color};'>{feedback}</div>",
            unsafe_allow_html=True,
        )
    st.button("Далее", key=f"next-{question['id']}", on_click=go_to_next_question)


def render_lesson_player():
    lesson_state = st.session_state.lesson
    streak = lesson_state["streak"]
    lives = lesson_state["lives"]
    xp = lesson_state["xp"]

    st.markdown(
        f"<div style='display:flex; gap:16px; margin-bottom:16px;'>"
        f"<div class='lex-counter'>🔥 Серия {streak}</div>"
        f"<div class='lex-counter'>❤️ Жизни {lives}</div>"
        f"<div class='lex-counter'>✨ Опыт {xp}</div>"
        "</div>",
        unsafe_allow_html=True,
    )

    st.markdown("<div class='lex-lesson-card'>", unsafe_allow_html=True)
    if lesson_state["completed"]:
        st.success("Урок завершён! Вы заработали {} XP".format(xp))
        st.button("К карте", on_click=lambda: select_node("skill-3"))
    else:
        question = LESSON_QUESTIONS[lesson_state["current"]]
        answer_state = lesson_state["answers"].get(question["id"])
        render_question(question, answer_state)
    st.markdown("</div>", unsafe_allow_html=True)


def render_right_panel():
    st.markdown(
        """
        <div class='lex-right-card'>
            <h3 style='margin-top:0;'>Лига «Аметист»</h3>
            <p style='color:var(--text-muted);'>Текущее место: <strong>#4</strong></p>
            <div style='display:flex; align-items:center; gap:12px; margin-top:16px;'>
                <div style='width:64px; height:64px; border-radius:20px; background:linear-gradient(180deg,#B28BFF,#7D4DFF); display:flex; align-items:center; justify-content:center; font-size:28px;'>💠</div>
                <div>
                    <p style='margin:0; color:var(--text-muted);'>До повышения</p>
                    <div class='lex-progress'><span style='width:68%;'></span></div>
                </div>
            </div>
        </div>
        <div class='lex-right-card'>
            <h3 style='margin-top:0;'>Задания дня</h3>
            <div class='lex-quest'>
                <div class='lex-quest-icon'>⚡</div>
                <div>
                    <strong>Получите 50 XP</strong>
                    <span>32 / 50</span>
                    <div class='lex-progress'><span style='width:64%;'></span></div>
                </div>
                <div>🔒</div>
            </div>
            <div class='lex-quest'>
                <div class='lex-quest-icon'>🎯</div>
                <div>
                    <strong>Пройдите 2 урока без ошибок</strong>
                    <span>1 / 2</span>
                    <div class='lex-progress'><span style='width:50%;'></span></div>
                </div>
                <div>🧰</div>
            </div>
            <div class='lex-quest'>
                <div class='lex-quest-icon'>🔥</div>
                <div>
                    <strong>Дайте 5 верных подряд</strong>
                    <span>3 / 5</span>
                    <div class='lex-progress'><span style='width:60%;'></span></div>
                </div>
                <div>🧰</div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def main():
    render_styles()
    render_top_counters()

    st.markdown("<div class='lex-layout'>", unsafe_allow_html=True)
    col1, col2, col3 = st.columns([272, 680, 360])

    with col1:
        render_sidebar_nav()

    with col2:
        render_module_banner()
        render_skill_path()
        active_node = next((node for node in SKILL_NODES if node.id == st.session_state.active_node), None)
        if active_node and active_node.kind == "material":
            render_material_view()
        elif active_node and active_node.kind == "lesson":
            render_lesson_player()
        render_mascot()

    with col3:
        render_right_panel()

    st.markdown("</div>", unsafe_allow_html=True)


if __name__ == "__main__":
    main()
