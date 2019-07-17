

import 'whatwg-fetch';


// 判断是否是路径
// eslint-disable-next-line
const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
export const isUrl = (path) => {
  return urlReg.test(path);
};


// 请求
export const request = (mdPath) => {
  return fetch(`${window.location.origin}${mdPath}`)
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
      throw new Error('文档不存在');
    });
};

// 移除文件后缀名
export const removeFileExtension = (fileName = '') => {
  return fileName.replace(/\.md$/, '');
};

// 深层遍历路由配置=>navs
export function getNavs(data = [], parentPath = '/') {
  return data.map((item) => {
    const { key, path } = item;
    const keyPath = `${parentPath}${key}/`;
    const result = { ...item, path: isUrl(path) ? path : keyPath };
    if (item.children) {
      result.children = getNavs(item.children, keyPath);
    }
    return result;
  });
}

// 深层遍历路由配置=>routers
export const getRouters = (data = [], parentPath = '/', keys = []) => {
  return data.reduce((routers, item) => {
    const { children, key, path } = item;
    let newRouters = routers;
    const keyPath = `${parentPath}${key}/`;

    if (children) {
      newRouters = newRouters.concat(getRouters(children, keyPath, [...keys, key]));
    } else {
      newRouters.push({ ...item, keys: [...keys, key], path: isUrl(path) ? path : keyPath });
    }
    return newRouters;
  }, []);
};


// 深层遍历路由配置md=>routers
export const getMdRouters = (data = []) => {
  return data.reduce((routers, item) => {
    const { childrens, key, path } = item;
    let newRouters = routers;

    if (childrens && childrens.length) {
      newRouters = newRouters.concat(getMdRouters(childrens));
    } else {
      newRouters.push({ key, mdPath: path });
    }
    return newRouters;
  }, []);
};


// 获取当前面包屑导航
export const getBreadcrumbs = (routers, pathname) => {
  return routers.reduce((breadcrumbs, route) => {
    const { key, childrens } = route;
    if (pathname.startsWith(key)) {
      breadcrumbs.push(route);
      if (childrens && childrens.length) {
        const subBreadcrumbs = getBreadcrumbs(childrens, pathname);
        breadcrumbs = [...breadcrumbs, ...subBreadcrumbs];
      }
    }
    return breadcrumbs;
  }, []);
};


// 函数防抖
export const throttle = (fn, time = 1000) => {
  let lastTime = null;
  return () => {
    clearTimeout(lastTime);
    lastTime = setTimeout(() => {
      fn();
    }, time);
  };
};
