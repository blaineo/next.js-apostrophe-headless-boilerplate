import { GOOGLE_CLOUD_PROJECT, API_DOMAIN, PROD_ENV } from 'babel-dotenv'

export function formatDate (dateString) {
  const dateArray = dateString.split('-')
  return `${dateArray[1]}.${dateArray[2]}.${dateArray[0].slice(2)}`
}

export function getAPIUrl (path, paramString) {
  const requestVars = buildRequestVars(paramString)
  const urlBase = `${API_DOMAIN}api/v1/`
  return `${urlBase}${path}${requestVars}`
}

function buildRequestVars (paramString) {
  let rvars = GOOGLE_CLOUD_PROJECT === PROD_ENV ? '?env=prod' : ''

  if (paramString && paramString.length > 0) {
    rvars += rvars.length > 0 ? `&${paramString}` : `?${paramString}`
  }
  return rvars
}
