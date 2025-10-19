# Lex Moscua documentation workspace

This repository now hosts planning assets for the **Lex Moscua** educational platform (a Duolingo-inspired web experience for legal studies). Historical Streamlit GDP dashboard files are preserved for reference, but the focus of active development is the Lex Moscua application.

## Documentation

The `docs/lex-moscua` directory contains foundational artefacts for the platform:

- [`architecture.md`](docs/lex-moscua/architecture.md) – system design, deployment topology and key technical decisions.
- [`data-model.md`](docs/lex-moscua/data-model.md) – relational schema for courses, progress tracking, gamification and admin tooling.
- [`api-design.md`](docs/lex-moscua/api-design.md) – REST API contract covering learner, admin and real-time interfaces.

Additional documents (product specs, UX flows, backlog) can be added alongside these files as the project evolves.

## Legacy Streamlit demo

To run the original GDP dashboard example that previously lived in this repository:

1. Install the requirements

   ```
   pip install -r requirements.txt
   ```

2. Launch the Streamlit app

   ```
   streamlit run streamlit_app.py
   ```

> **Note:** the Streamlit demo is unrelated to the Lex Moscua roadmap and will eventually be removed once the new application codebase is established.
