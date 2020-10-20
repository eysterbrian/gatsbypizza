const nodemailer = require('nodemailer');

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateOrderEmail(order, total) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>We'll have your order ready in the next 20 minutes!</p>
    <ul>
    ${order
      .map(
        (item) => `<li> 
      <img src="${item.thumbnail}" alt="${item.name}">
      ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
    </ul>
    <p>Your order total of <strong>${total}</strong> is due at pickup </p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>`;
}

//
// Netlify function for placing the order
//
exports.handler = async (event, context) => {
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
