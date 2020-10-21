const nodemailer = require('nodemailer');
const mjml2html = require('mjml');

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
  console.log('Inside generateOrder...');

  // Destructure the return value which is MJMLParseResults object
  const { html, errors } = mjml2html(`
  <mjml>
  <mj-head>
    <mj-title>Your Order from Slick's Slices</mj-title>
  </mj-head>
  <mj-body background-color="white">
    <mj-section>
      <mj-column>
        <mj-text font-size="20px">Your recent order for ${total}</mj-text>
        <mj-text>We'll have your order ready in the next 20 minutes!</mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-table>
          ${order
            .map(
              (item) => `<tr>
            <td><img src="${item.thumbnail}" alt="${item.name}"></td>
            <td>${item.size} ${item.name} - ${item.price}</td>
          </tr>`
            )
            .join('')}
        </mj-table>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>Your order total of <strong>${total}</strong> is due at pickup </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `);

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
  await wait(2000);

  const body = JSON.parse(event.body);
  console.log(body);

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
