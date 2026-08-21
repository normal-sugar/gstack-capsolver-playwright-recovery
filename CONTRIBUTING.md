# Contributing

Keep every test deterministic and offline by default. New live adapters must
preserve the explicit authorization check, bounded execution, and redacted
logging. Never add production captures, credentials, cookies, or personal data.

Run `python -m unittest discover -s tests -v` and `python -m compileall -q src`
before opening a pull request.
