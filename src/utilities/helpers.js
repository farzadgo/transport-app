export const debounce = (callback, wait) => {
  let timeout = null
  return (...args) => {
    const next = () => callback(...args)
    clearTimeout(timeout)
    timeout = setTimeout(next, wait)
  }
}

export const convertIsoTime = (when) => {
  let x = new Date(when)
  let hours = x.getHours()

  let minutes = x.getMinutes().toString()
  minutes = minutes.length == 1 ? 0 + minutes : minutes;
  
  let month = (x.getMonth() + 1).toString()
  month = month.length == 1 ? 0 + month : month;
  
  let dt = x.getDate().toString()
  dt = dt.length == 1 ? 0 + dt : dt;
  
  let date = dt + "." + month + "." + x.getFullYear()
	let time = hours + ":" +  minutes;
  
  return { date, time }
}