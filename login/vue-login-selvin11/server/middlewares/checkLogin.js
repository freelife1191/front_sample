module.exports = {
  // 주심 판사로 프론트 json을 반환하면서 세션의 존재를 판단

  checkLogin(req, res, next) {
    if (!req.session.user) {
      return res.json({
        error: '로그인하지 않았습니다.',
        session: false
      });
    }
    next();
  },

  checkNotLogin(req, res, next) {
    if (req.session.user) {
      return res.json({
        error: '로그인',
        session: true
      });
    }
    next();
  }
};