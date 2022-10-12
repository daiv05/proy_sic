module.exports = {
  software: {
    node: '^18.7.0',
    nginx: {
      semver: '^666.x',
      optional: true       // won't fail if missing or wrong version
    },
    // httpd: {
    //   semver: '^2.x',
    //   flag: '-v',       // custom flag to print version
    //   installMessage: '<install instruction>',     // custom message when binary is not found
    //   updateMessage: '<update instruction>',       // custom message when binary has wrong version
    // },
  }
};