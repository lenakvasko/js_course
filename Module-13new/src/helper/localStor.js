export const set = (label, value ) => {
    localStorage.setItem(label, JSON.stringify(value));
  };
  
  export const get = ( label ) => {
    const res = localStorage.getItem(label);
    return res ? JSON.parse(res) : null;
  };