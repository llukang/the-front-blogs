// 获取项目名称
const getRepositoryName = (repository = '') => {
  return repository
    .split('/')
    .pop()
    .split('.')
    .shift();
};

module.exports = {
  getRepositoryName
};
