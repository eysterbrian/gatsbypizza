const nodemailer = require('nodemailer');
const mjml2html = require('mjml');
const fs = require('fs');
const ejs = require('ejs');

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Creates the raw HTML for the order email
 * @param {Object} order object
 * @param {string} total as a formatted string
 */
function generateOrderEmail(order, total) {
  let mjmlTemplate;
  try {
    const data = fs.readFileSync(require.resolve('./email.mjml'));
    mjmlTemplate = data.toString();
  } catch (err) {
    console.log(err);
  }

  // Parse the EJS template values
  const mjml = ejs.render(mjmlTemplate, { order, total });
  console.log('MJML =====', mjml);

  // Destructure the return value which is MJMLParseResults object
  const { html, errors } = mjml2html(mjml);

  console.log('HTML ======', html);

  if (errors) {
    console.log(errors.formattedMessage);
  }
  return html;
}

/**
 * Returns a Promise that resolves after ms milliseconds
 * Can be used with async/await to pause program execution to view intermediate states
 *
 * @param {number} ms time until the Promise resolves
 */
function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Netlify function which places an order by sending an email
 *
 * @param {*} event request object
 * @param {*} context current state of this function
 */
exports.handler = async (event, context) => {
  // await wait(2000);

  const body = JSON.parse(event.body);
  console.log(body);

  // Check for honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Are you sure about that? Error 4323"`,
      }),
    };
  }

  // Validate the incoming data
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops, you are missing the required "${field}" field"`,
        }),
      };
    }
  }

  // Make sure the order isn't empty
  if (body.order.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Hmmm, your order appears to be empty.  Please add some food!`,
      }),
    };
  }

  // send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail(body.order, body.total),
  });
  console.log(info);

  // send success or error message
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
