import jsCookie from 'js-cookie'

class Cookies {
  setCookie(name: string, value: string) {
    jsCookie.set(name, value, {
      expires: 7,
    })
  }

  deleteCookie(name: string) {
    jsCookie.remove(name)
  }

  getCookie(name: string) {
    return jsCookie.get(name)
  }
}

export const cookies = new Cookies()
