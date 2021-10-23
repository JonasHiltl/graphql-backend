import { verify } from 'jsonwebtoken'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import nodemailer from 'nodemailer'

interface Token {
  userId: string
}

export function getUserId(request: ExpressContext) {
  const authHeader = request.req.get('Authorization')
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    let verifiedToken
    if (process.env.APP_SECRET)
      verifiedToken = verify(token, process.env.APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}

export async function sendEmail(to: string, html: string, subject: string) {
  //let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'fbbausxrtwbr33oc@ethereal.email', // generated ethereal user
      pass: 'ndwT7jWzxtgnry76Jb', // generated ethereal password
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
