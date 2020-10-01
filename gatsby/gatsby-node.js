import path from 'path'; // Built-in Node API

async function createPizzaPages({ graphql, actions }) {
  // Query just enough info to know which pages to generate.
  // Each page component will perform its own query to populate the actual page
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current, // $slug is used as variable in page query
      },
    });
    console.log(`Creating page for ${pizza.slug.current}`);
  });
}

async function createToppingPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);

  const toppingTemplate = path.resolve('./src/templates/Topping.js');
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `/topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        toppingName: topping.name,
      },
    });
    console.log(`Creating topping page for: ${topping.name}`);
  });
}

// TODO: Create pages for slicemasters

export async function createPages(params) {
  console.log(' **** Calling createPages');

  // Both these createXXXPages methods are async, but they're independent of each other,
  // so we can run them concurrently!!
  // Make sure to await this!!
  await Promise.all([createPizzaPages(params), createToppingPages(params)]);
}
