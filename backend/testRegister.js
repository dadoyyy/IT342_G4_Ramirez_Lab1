import http from 'http'

const postData = JSON.stringify({ firstName: 'Rose', lastName: 'Ramirez', email: 'roseramirez+test@example.com', password: 'Pass1234' })

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}

const req = http.request(options, (res) => {
  console.log('STATUS:', res.statusCode)
  console.log('HEADERS:', res.headers)
  let data = ''
  res.setEncoding('utf8')
  res.on('data', (chunk) => { data += chunk })
  res.on('end', () => { console.log('BODY:', data) })
})

req.on('error', (e) => {
  console.error('problem with request:', e.message)
})

req.write(postData)
req.end()
