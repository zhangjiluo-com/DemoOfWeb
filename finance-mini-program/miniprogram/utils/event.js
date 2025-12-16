const events = [];

export const on = (type, fx, ctx) => {
  if (Array.isArray(type)) {
    return events.concat(
      type.map(item => ({
        type: item,
        fx,
        ctx
      }))
    );
  } else {
    return events.push({ type, fx, ctx });
  }
};

export const off = prop => {
  const key = typeof prop === "string" ? "type" : "fx";
  const index = events.findIndex(item => item[key] === prop);
  remove(index);
};

export const remove = index => {
  events.splice(index, 1);
};

export const trigger = (type, data) => {
  events.forEach(item => {
    if (item.type === type) {
      item.fx.call(item.ctx, data, () => remove(item.fx));
    }
  });
};
