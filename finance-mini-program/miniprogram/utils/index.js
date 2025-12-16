export function getValueByPath(obj, path) {
  if (!path) {
    return obj;
  } else if (!obj || typeof path !== "string") {
    throw new Error("参数错误");
  }
  const getValue = (obj, keys) => {
    const current = obj[keys[0]];
    if (keys.length === 1) {
      return current;
    } else if (current !== null && current !== undefined) {
      keys.shift(0);
      return getValue(current, keys);
    }
  };
  return getValue(obj, path.split("."));
}

export function circleCheck(obj, conditionFx, startPath = "") {
  let path = startPath;
  let stainPaths = [];

  Object.keys(obj).forEach(key => {
    path = startPath ? startPath + "." + key : key;
    const value = obj[key];
    if (conditionFx(obj, key, path)) {
      stainPaths.push({
        path,
        value,
        key
      });
    }
    if (typeof value === "object" && value !== null) {
      stainPaths = stainPaths.concat(circleCheck(value, conditionFx, path));
    }
  });

  return stainPaths;
}

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
export function getDateTimeString(datetime) {
  const date = datetime || new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(
    seconds
  )}`;
}

export function getPathExtension(path) {
  const ext = path.replace(/^.*\.(\w+)$/g, "$1");
  return ext.length > 6 ? "unknown" : ext;
}

function getFileCode(ext) {
  const IMAGE = "IMAGE";
  const VIDEO = "VIDEO";
  const DOCUMENT = "DOCUMENT";
  const COMPRESS = "COMPRESS";
  const fileCodes = {
    jpg: IMAGE,
    jpeg: IMAGE,
    png: IMAGE,
    gif: IMAGE,
    svg: IMAGE,
    mp4: VIDEO,
    pdf: DOCUMENT,
    doc: DOCUMENT,
    docx: DOCUMENT,
    xls: DOCUMENT,
    xlsx: DOCUMENT,
    ppt: DOCUMENT,
    pptx: DOCUMENT,
    zip: COMPRESS,
    rar: COMPRESS
  };
  return fileCodes[ext];
}

export function formatFileData(file, defaultType) {
  const url = file.path || file.url || file.src;
  const fragments = url.split("/");
  const name = file.name || fragments[fragments.length - 1];
  let ext = url.replace(/^.*\.(\w+)$/g, "$1");
  if (ext.length > 6) {
    ext = "unknown";
  }
  return {
    url,
    ext,
    name,
    size: file.size,
    width: file.width,
    height: file.height,
    type: getFileCode(ext) || defaultType || "UNKNOWN"
  };
}
