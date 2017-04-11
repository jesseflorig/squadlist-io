const Config = {
  get: () => {
    const env = process.env.NODE_ENV
    return require(`../config/${env}.json`)
  }
}

export default Config
