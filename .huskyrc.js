module.exports = {
  hooks: {
    'applypatch-msg': 'echo "[Husky] applypatch-msg"',
    'pre-applypatch': 'echo "[Husky] pre-applypatch"',
    'post-applypatch': 'echo "[Husky] post-applypatch"',
    'pre-commit': 'lint-staged'
  }
};
